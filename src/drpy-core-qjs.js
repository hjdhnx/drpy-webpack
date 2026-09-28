// drpy-core-qjs.js —— QJS so 适配版库包 v2（drpy-core-lite 的 so 化变体，导出面兼容）
//
// 目标宿主：libquickjs_bridge.so（DsPlayer plugin_qjs，与 drpy2 同引擎）——启动即注入
// 全局 cheerio(Lexbor C)/Buffer/TextEncoder(GBK)/TextDecoder/zlib/WebAssembly(wasm3)。
//
// v3（2026-09-28）：库来源对齐 dr2 适配包（assets/qjs/drpy2，真机跑通的精简封装）——
//   jsencrypt.min.js+node-rsa.min.js(394KB) → jsencrypt-d2.min.js(4.7KB)
//     WebCrypto subtle 同步实现（so 的 subtle 是同步 C 桥，dr2 真机验证）+
//     UTF-8 分段（encrypt 本身即 encryptUnicodeLong 语义，下方补别名）；
//     NODERSA 导出保留但恒 undefined——dr3 crypto.js rsaX 的
//     `typeof JSEncrypt === 'function'` 恒真，NODERSA 分支为死代码。
//     dll/真机 acceptance 实测 rsaX 中英文往返全过
//   JSON5 砍（dr3 引擎零消费；JSON 容错在宿主 Dart 侧 JsonUtils）
// 导出面与 drpy-core-lite 兼容（peer.js / src/drpy3/lib/* 零改动）。
// ⚠️ 实测教训（勿重蹈）：crypto-d2 的 AES encrypt 静默返回空密文——对称
// 加密面必须用官方实现；jinja 任何 esbuild 模块化打包都必炸——必须全局 eval。
import template from './libs/模板.js';

//   CryptoJS：**官方 crypto-js 全量单文件 UMD**（src/libs/crypto-js.min.js），
//     装载与 jinja 同机制（?global 插件转字符串 + (0,eval) 全局求值 + UMD 三
//     分支屏蔽）。⚠️ 实测教训（勿重蹈）：①dr2 适配包 crypto-d2 的 AES encrypt
//     静默返回空密文（cipher 面被砍坏的壳）；②crypto-js 官方子模块链经 esbuild
//     模块化打包后 AES 产物非合法 UTF-8；③UMD 直接 import（side-effect 或
//     default）在 esbuild bundle 里 CJS 分支挂到包装局部，globalThis.CryptoJS
//     恒 undefined（v1 起就如此，六环节不踩 crypto 没暴露）——只有 eval 全局
//     求值形态在 dll acceptance 上实测通过。
import cryptoJsSrc from './libs/crypto-js.min.js?global';
import JSEncrypt from './libs/jsencrypt-d2.min.js';
import './libs/jsonpathplus.min.js';
// jinja 脚本语义装载：build 时经 jinja-global 插件转字符串（见 esbuild.config.cjs），
// 下方 (0,eval) 全局执行——jinja-js 模板编译器 new Function 引用闭包内名，
// esbuild 模块化打包必炸（"i is not defined" 实锤），全局求值是唯一正确形态。
// 用 jinja.min.js（12KB 混淆版，dll 六环节验证过）；jinja2-slim(22KB 可读版)
// 在真引擎 loadSource 报 SyntaxError unexpected character 原因未查明，勿换回
import jinjaSrc from './libs/jinja.min.js?global';

// ── so 全局（libquickjs_bridge.so 注入）。缺失直接抛可诊断错误——勿静默回落
// JS 版：回落会让 bundle 体积回涨且掩盖宿主装配问题 ──
const soRequire = (name) => {
    const v = globalThis[name];
    if (!v) throw new Error(`[drpy-core-qjs] 缺少 so 全局 ${name}（需 libquickjs_bridge.so 宿主）`);
    return v;
};
const Buffer = soRequire('Buffer');
const WebAssembly = soRequire('WebAssembly');
const TextEncoder = soRequire('TextEncoder'); // so 扩展版：构造可传编码（GBK），非 WHATWG 仅 UTF-8
const TextDecoder = soRequire('TextDecoder');
const zlib = soRequire('zlib');

// crypto-js 全局求值（脚本语义，与 jinja 同机制）+ 从全局取回
(0, eval)('var exports=undefined, module=undefined, define=undefined;\n' + cryptoJsSrc);
const CryptoJS = soRequire('CryptoJS');

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

// ── gbkTool 契约复刻（drpy2 gb18030 同语义，走 so TextEncoder(GBK)）──
// encode(str)：逐码点——ASCII（含 0x20AC € 历史彩蛋）走 encodeURIComponent；
//   其余 so TextEncoder('gbk') 出字节，roundtrip 验证（解码回原文=原字符才算映射
//   成功，否则回退原字符，对齐原版 U2Ghash miss 语义）。roundtrip 同时覆盖两类
//   编码器错误形态：WHATWG 数字实体（&#x…;）与替换符（?/�）。
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

// ── jinja 装载（脚本语义）────────────────────────────────────────────
// jinja-js 的模板编译器 new Function 引用闭包内名，任何 esbuild 模块化打包都必炸
// （v2 实测打包后渲染报 "i is not defined"），必须全局求值：build 时经
// jinja-global 插件转字符串（见 esbuild.config.cjs），此处 (0,eval) 全局执行
//（drpy2 拍平前的 script-loader 等效形态）。globalThis.__DRPY3_NO_JINJA 是
// 二分诊断开关（宿主置 1 时用桩，验证 dll 上 loadSource 挂点是否在 jinja eval）。
let jinja;
if (globalThis.__DRPY3_NO_JINJA) {
    jinja = {render: () => { throw new Error('jinja stub（二分诊断模式）'); }};
} else {
    // 前置 var 屏蔽 UMD 三分支：node 的 indirect eval 环境注入了 exports
    // （typeof='object'），会走 factory(exports) 挂到 eval 局部而非 globalThis；
    // 真引擎是纯 ESM 环境无此问题，显式 undefined 化两边行为一致（均走全局挂载）
    (0, eval)('var exports=undefined, module=undefined, define=undefined;\n' + jinjaSrc);
    jinja = soRequire('jinja');
}

// ── JSEncrypt 补齐 dr3 crypto.js rsaX 消费的 UnicodeLong 别名 ──
// jsencrypt-d2 的 encrypt/decrypt 已内建 UTF-8 编码 + RSA 块分段（= 原
// encryptUnicodeLong/decryptUnicodeLong 语义；原 encryptLong 恰是同分段思路）
JSEncrypt.prototype.encryptUnicodeLong = JSEncrypt.prototype.encrypt;
JSEncrypt.prototype.decryptUnicodeLong = JSEncrypt.prototype.decrypt;

const JSONPath = globalThis.JSONPath; // jsonpathplus.min.js side-effect 挂全局

// ── cheerio 补丁（与 core-lite 一致）：只保留 jinja2/jp，pdf 系列交给壳子 ──
const cheerio = {
    jinja2(tpl, obj) {
        return jinja.render(tpl, obj);
    },
    jp(path, json) {
        return JSONPath.JSONPath({path, json})[0];
    },
};

// ── JSON5/NODERSA 说明 ──
// JSON5：dr3 引擎零消费（JSON 容错在宿主 Dart 侧 JsonUtils），不导出。
// NODERSA：rsaX 的 JSEncrypt 分支恒短路，无需实现；导出 undefined 仅保
// `import {NODERSA} from './peer.js'` 的模块链接合法性。
const NODERSA = globalThis.NODERSA;

// 导出（与 drpy-core-lite 兼容；JSON5 不再导出）
export {
    cheerio,
    template as 模板,
    gbkTool,
    CryptoJS,
    JSEncrypt,
    NODERSA,
    pako,
    JSONPath,
    jinja,
    WebAssembly,
    TextEncoder,
    TextDecoder,
};
export {Buffer};
