// drpy-core.js
import template from './libs/模板.js'; // 使用英文名导入

// 轻量依赖
import './libs-lite/EncoderDecoder.min.js'
// import './libs-lite/jsencrypt.min.js'; // 此库亲自不行
// 导入所有依赖库
import './libs/jsencrypt.min.js';
import './libs/gb18030.min.js';
import './libs/crypto-js.min.js';
import './libs/node-rsa.min.js';
import './libs/pako.min.js';
import './libs/json5.min.js';
import './libs/jsonpathplus.min.js';
import './libs/jinja.min.js';
import './libs/polywasm.min.js';
import './libs/xxhash-wasm.min.js';


// 确保全局依赖可用

const gbkTool = globalThis.gbkTool;
const CryptoJS = globalThis.CryptoJS;
const JSEncrypt = globalThis.JSEncrypt;
const NODERSA = globalThis.NODERSA; // lite版弃用
const pako = globalThis.pako;
const JSON5 = globalThis.JSON5;
const JSONPath = globalThis.JSONPath;
const jinja = globalThis.jinja;
const WebAssembly = globalThis.WebAssembly;
const TextEncoder = globalThis.TextEncoder;
const TextDecoder = globalThis.TextDecoder;

/*
patch打补丁开始
1. cheerio对象 只保留在用的jinja2和jp函数，其他pdf系列交给壳子
2. JSEncrypt换库但是保留encryptUnicodeLong和decryptUnicodeLong函数
*/
const cheerio = {
    jinja2(template, obj) {
        return jinja.render(template, obj);
    },
    jp(path, json) {
        return JSONPath.JSONPath({
            path,
            json
        })[0];
    }
}
// JSEncrypt.encryptUnicodeLong = JSEncrypt.encryptLong;
// JSEncrypt.decryptUnicodeLong = JSEncrypt.decryptLong;
/*
patch打补丁结束
*/

// 导出所有需要暴露的内容
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