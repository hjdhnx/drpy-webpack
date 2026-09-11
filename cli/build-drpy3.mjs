#!/usr/bin/env node
// 构建 drpy3 主产物：dist/drpy3.esm.min.js（§1 产物清单）。
// ⚠️ core-lite 必须保持 peer 引用（external，不内联）——jinja 模板编译器依赖原 webpack bundle
// 的 script-loader 作用域语义，esbuild 内联会破坏之（仓库历史 5063ef5"esbuild打包最终失败告终"、
// 本次 e18961a 事故同理）。产物与 dist/drpy-core-lite.min.js 同目录分发。
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import esbuild from 'esbuild';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(HERE, '..');

await esbuild.build({
    entryPoints: [path.join(ROOT, 'src', 'drpy3', 'index.js')],
    bundle: true,
    platform: 'neutral',
    format: 'esm',
    target: 'es2020',
    outfile: path.join(ROOT, 'dist', 'drpy3.esm.min.js'),
    minify: true,
    logLevel: 'silent',
    plugins: [{
        name: 'drpy3-peer-external',
        setup(b) {
            // 库全局（CryptoJS/jinja/模板/pako…）走 peer：产物内保留对同目录 core-lite 的相对引用
            b.onResolve({filter: /drpy-core-lite\.min\.js$/}, () => ({path: './drpy-core-lite.min.js', external: true}));
        },
    }],
});
console.log('[drpy3] 构建完成: dist/drpy3.esm.min.js（peer 引用 ./drpy-core-lite.min.js）');
