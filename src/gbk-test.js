import './libs/gb18030.min.js';
import './libs/encoding.min.js';
import gbkTool1 from './libs-test/encoding-gbk.min.js';

console.log(gbkTool.encode('你好'));
console.log(gbkTool.decode('%C4%E3%BA%C3'));


console.log(gbkTool1.encode('你好'));
console.log(gbkTool1.decode('%C4%E3%BA%C3'));