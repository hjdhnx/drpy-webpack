// drpy-core-qjs.js —— QJS so 适配版库包（drpy-core-lite 的 so 化变体，导出面完全一致）
//
// 目标宿主：libquickjs_bridge.so（DsPlayer plugin_qjs，与 drpy2 同引擎）——启动即注入
// 全局 cheerio(Lexbor C)/Buffer/TextEncoder(GBK)/TextDecoder/zlib/WebAssembly(wasm3)。
// 据此砍掉 JS 版重型库：pako/gb18030(66KB)/polywasm/EncoderDecoder/xxhash-wasm/buffer，
// DOM 解析等 C 能力铁律（DsPlayer CLAUDE.md：能用 so C 能力禁止 JS 手写重造）。
// 保留 JS 库（so 无等价物）：crypto-js / jsencrypt / node-rsa(NODERSA) / jinja /
// json5 / jsonpathplus / 模板。
// 产物 dist/drpy-core-qjs.min.js 供 drpy3 仓库 hosts/fjs/tools/build-qjs.mjs 打
// drpy3-qjs bundle 时 peer 替换 drpy-core-lite.min.js；导出名与 core-lite 一一对应，
// src/drpy3/lib/peer.js 零改动。
import template from './libs/模板.js'; // 使用英文名导入

// 导入库（side-effect 挂全局）
import './libs/jsencrypt.min.js';
import './libs/crypto-js.min.js';
import './libs/node-rsa.min.js';
import './libs/json5.min.js';
import './libs/jsonpathplus.min.js';
// jinja 特殊处理：以源码字符串内联（build 时经 jinja-global 插件转字符串），
// 下方运行时全局 eval——模板编译器 new Function（全局作用域）依赖 jinja 内部
// helper 泄漏全局（原 webpack script-loader 语义），普通模块化 import 会断供
// （模板渲染 ReferenceError "r is not defined" 实锤，见 esbuild.config.cjs 注释）
import jinjaSrc from './libs/jinja.min.js?global';

// 确保全局依赖可用
const g = globalThis;
const CryptoJS = g.CryptoJS;
const JSEncrypt = g.JSEncrypt;
const NODERSA = g.NODERSA; // lite版弃用
const JSON5 = g.JSON5;
const JSONPath = g.JSONPath;

// ── so 全局（libquickjs_bridge.so 注入）。缺失直接抛可诊断错误——勿静默回落
// JS 版：回落会让 bundle 体积回涨且掩盖宿主装配问题 ──
const soRequire = (name) => {
    const v = g[name];
    if (!v) throw new Error(`[drpy-core-qjs] 缺少 so 全局 ${name}（需 libquickjs_bridge.so 宿主）`);
    return v;
};
const Buffer = soRequire('Buffer');
const WebAssembly = soRequire('WebAssembly');
const TextEncoder = soRequire('TextEncoder'); // so 扩展版：构造可传编码（GBK），非 WHATWG 仅 UTF-8
const TextDecoder = soRequire('TextDecoder');
const zlib = soRequire('zlib');

// jinja 全局求值（script-loader 语义，import 见上）+ 从全局取回
(0, eval)(jinjaSrc);
const jinja = soRequire('jinja');

// ── pako API 语义对齐（消费面：drpy3 lib/crypto.js 的 gzip/ungzip）──
//   pako.gzip(String) → Uint8Array；pako.inflate(bytes, {to:'string'}) → string
// so zlib.gzip/gunzip 返回 Buffer；inflate 用 unzip（自动识别 gzip/zlib/deflate 封装，
// 覆盖面 ⊇ pako.inflate 的 zlib 格式——ungzip 场景实际数据是 gzip 封装，unzip 最稳）。
const pako = {
    gzip: (data) => new Uint8Array(zlib.gzip(typeof data === 'string' ? Buffer.from(data, 'utf8') : Buffer.from(data))),
    inflate: (data, opts) => {
        const out = zlib.unzip(Buffer.from(data));
        return opts && opts.to === 'string' ? Buffer.from(out).toString('utf8') : new Uint8Array(out);
    },
    gunzip: (data, opts) => {
        const out = zlib.gunzip(Buffer.from(data));
        return opts && opts.to === 'string' ? Buffer.from(out).toString('utf8') : new Uint8Array(out);
    },
};

// ── gbkTool 契约复刻（src/libs/gb18030.js）──
// encode(str)：逐码点——ASCII（含 0x20AC € 历史彩蛋）走 encodeURIComponent；
//   其余 so TextEncoder('gbk') 出字节，roundtrip 验证（解码回原文=原字符才算映射成功，
//   否则回退原字符，对齐原版 U2Ghash miss 语义）。roundtrip 同时覆盖两类编码器
//   错误形态：WHATWG 数字实体（&#x…;）与替换符（?/�），不依赖具体错误输出。
// decode(str)：%XX%XX 双字节组按 GBK 解码（无效序列原样，对齐 G2Uhash miss）；
//   剩余 %XX 单字节走 decodeURIComponent。
const _gbkEnc = new TextEncoder('gbk');
const _gbkDec = new TextDecoder('gbk', {fatal: true});
const _isAscii = (code) => code === 0x20AC || (code <= 0x7F && code >= 0x00);

const gbkTool = {
    encode(str) {
        const s = String(str);
        let out = '';
        for (const ch of s) {
            const code = ch.codePointAt(0);
            if (_isAscii(code)) {
                out += encodeURIComponent(ch);
                continue;
            }
            let valid = code <= 0xFFFF; // astral 无 GBK 映射，直接回退
            if (valid) {
                const bytes = _gbkEnc.encode(ch);
                try {
                    if (_gbkDec.decode(bytes) !== ch) valid = false; // roundtrip 不等 = 表外被替换
                } catch {
                    valid = false;
                }
                if (valid) {
                    for (let k = 0; k < bytes.length; k++) out += '%' + bytes[k].toString(16).toUpperCase();
                    continue;
                }
            }
            out += ch;
        }
        return out;
    },
    decode(str) {
        return String(str)
            .replace(/%[0-9A-F]{2}%[0-9A-F]{2}/g, (a) => {
                try {
                    const bytes = new Uint8Array([parseInt(a.slice(1, 3), 16), parseInt(a.slice(4, 6), 16)]);
                    return _gbkDec.decode(bytes);
                } catch {
                    return a; // 无效 GBK 序列原样（对齐 G2Uhash miss）
                }
            })
            .replace(/%[\w]{2}/g, (a) => decodeURIComponent(a));
    },
};

/*
patch打补丁（与 core-lite 一致）
cheerio对象 只保留在用的jinja2和jp函数，其他pdf系列交给壳子
*/
const cheerio = {
    jinja2(tpl, obj) {
        return jinja.render(tpl, obj);
    },
    jp(path, json) {
        return JSONPath.JSONPath({
            path,
            json
        })[0];
    }
};

// 导出（与 drpy-core-lite 完全一致）
export {
    cheerio,
    template as 模板, // 使用别名导出中文标识符
    gbkTool,
    CryptoJS,
    JSEncrypt,
    NODERSA,
    pako,
    JSON5,
    JSONPath,
    jinja,
    WebAssembly,
    TextEncoder,
    TextDecoder,
};
export {Buffer};
