// import {cheerio, 模板} from '../dist/drpy-core.min.js';
import {cheerio, 模板} from '../dist/drpy-core-lite.min.js';
// import {cheerio, JSONPath, TextDecoder, TextEncoder, 模板} from './drpy-core.js';

console.log('typeof 模板:', typeof (模板))
console.log('typeof cheerio:', typeof (cheerio))
// console.log(模板)
console.log('typeof gbkTool:', typeof gbkTool);
console.log('typeof CryptoJS:', typeof CryptoJS);
console.log('typeof JSEncrypt:', typeof JSEncrypt);
console.log('typeof NODERSA:', typeof NODERSA);
console.log('typeof pako:', typeof pako);
console.log('typeof JSON5:', typeof JSON5);
console.log('typeof JSONPath:', typeof JSONPath);
console.log('typeof jinja:', typeof jinja);
console.log('typeof WebAssembly:', typeof WebAssembly);
console.log('typeof TextEncoder:', typeof TextEncoder);
console.log('typeof TextDecoder:', typeof TextDecoder);
console.log('typeof WXXH:', typeof WXXH);

console.log(gbkTool.encode('你好'));
console.log(gbkTool.decode('%C4%E3%BA%C3'));

const s = '{"method":"GET","timestamp":1745206708456,"path":"/index/fuck","parameters":{"timestamp":["1745206708456"]},"body":""}';
const seed = 1745206708;
const hash = WXXH.h64(s, seed).toString(16);
console.log(`WASM:${hash}`);

console.log(cheerio.jinja2('渲染一个变量{{hash}}', {hash}));
console.log('jsonpath取值测试:', cheerio.jp('$.name', {name: '道长', project: 'drpys'}));
