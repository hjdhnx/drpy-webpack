// wasm：wasm 一等公民标准库（设计 §6/§9 wasm）。W5 实现 emscripten 胶水托管。
// 三态来源：相对路径(loadAsset)/字节(Uint8Array)/远程(req)；按路径缓存；就绪等待。
import {Drpy3Error} from '../errors.js';

export function makeWasm(rt) {
    return {
        async load(source) {
            throw new Drpy3Error('wasm', 'load', 'lib.wasm.load 尚未接入（W5）');
        },
    };
}
