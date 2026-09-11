// 原生全局快照（无任何 import——必须在本进程内最先求值）。
// core-lite 的 polywasm/node-fetch polyfill 会覆盖 WebAssembly/fetch；peer.js 装载 core-lite
// 前在此捕获原生引用，装载后恢复。详见 lib/peer.js 说明。
export const nativeWasm = globalThis.WebAssembly;
export const nativeFetch = globalThis.fetch;
export const nativeTextEncoder = globalThis.TextEncoder;
export const nativeConsoleError = console.error;

// core-lite 的 script-loader chunk 在 Node 上 eval 必然失败并 console.error 刷堆栈
// （chunk 内含 `export` token——附录 C 已知非致命告警，native wasm 引擎用不到该 polyfill）。
// 本模块先于 core-lite 求值，在此安装过滤器压掉该噪音，peer.js 求值完成后恢复。
console.error = function drpy3QuietConsoleError(...args) {
    if (typeof args[0] === 'string' && args[0].startsWith('[Script Loader]')) return;
    return nativeConsoleError.apply(this, args);
};
