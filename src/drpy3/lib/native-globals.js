// 原生全局快照（无任何 import——必须在本进程内最先求值）。
// core-lite 的 polywasm/node-fetch polyfill 会覆盖 WebAssembly/fetch；peer.js 装载 core-lite
// 前在此捕获原生引用，装载后恢复。详见 lib/peer.js 说明。
export const nativeWasm = globalThis.WebAssembly;
export const nativeFetch = globalThis.fetch;
export const nativeTextEncoder = globalThis.TextEncoder;
