// drpy-core.js
import cheerio from './libs/cheerio.min.js';
import template from './libs/模板.js'; // 使用英文名导入

// 导入所有依赖库
import './libs/gb18030.min.js';
import './libs/crypto-js.min.js';
import './libs/jsencrypt.min.js';
import './libs/node-rsa.min.js';
import './libs/pako.min.js';
import './libs/json5.min.js';
import './libs/jsonpathplus.min.js';
import './libs/jinja.min.js';
import './libs/polywasm.min.js';
import './libs/encoding.min.js'
import './libs/xxhash-wasm.min.js';

// 确保全局依赖可用

const gbkTool = globalThis.gbkTool;
const CryptoJS = globalThis.CryptoJS;
const JSEncrypt = globalThis.JSEncrypt;
const NODERSA = globalThis.NODERSA;
const pako = globalThis.pako;
const JSON5 = globalThis.JSON5;
const JSONPath = globalThis.JSONPath;
const jinja = globalThis.jinja;
const WebAssembly = globalThis.WebAssembly;
const TextEncoder = globalThis.TextEncoder;
const TextDecoder = globalThis.TextDecoder;


// const cheerio = {
//     jinja2(template, obj) {
//         return jinja.render(template, obj);
//     },
//     jp(path, json) {
//         return JSONPath.JSONPath({
//             path,
//             json
//         })[0];
//     }
// }

const _jinja2 = cheerio.jinja2;
cheerio.jinja2 = function (template, obj) {
    try {
        return jinja.render(template, obj);
    } catch (e) {
        console.log('新的jinja2库渲染失败,换回原始cheerio:' + e.message);
        return _jinja2(template, obj)
    }
};
cheerio.jp = function (path, json) {
    return JSONPath.JSONPath({
        path,
        json
    })[0];
};


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