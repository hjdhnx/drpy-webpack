#!/usr/bin/env node
// 构建 drpy3 主产物（§1 产物清单），一次产出两个形态：
//   dist/drpy3.js        可读可维护单文件（esbuild 非压缩，原始标识符，drpy2.js 同款用法）
//   dist/drpy3.esm.min.js 压缩单文件（分发/内嵌用）
// ⚠️ core-lite 必须保持 peer 引用（external，不内联）——jinja 模板编译器依赖原 webpack bundle
// 的 script-loader 作用域语义，esbuild 内联会破坏之（仓库历史 5063ef5"esbuild打包最终失败告终"、
// e18961a 事故同理）。两个产物与 dist/drpy-core-lite.min.js 同目录分发（drpy2.js 双文件同款）。
// 源码唯一真相源是 src/drpy3/**——本脚本只是打包器，勿手改产物，改源码后重新构建。
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import esbuild from 'esbuild';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(HERE, '..');

const peerExternalPlugin = {
    name: 'drpy3-peer-external',
    setup(b) {
        // 库全局（CryptoJS/jinja/模板/pako/gbkTool…）走 peer：产物内保留对同目录 core-lite 的相对引用
        b.onResolve({filter: /drpy-core-lite\.min\.js$/}, () => ({path: './drpy-core-lite.min.js', external: true}));
    },
};

const BANNER = `/*
 * drpy3.js —— drpy3 引擎单文件形态（可读版，drpy2.js 同款用法）
 *
 * ⚠️ 本文件由 cli/build-drpy3.mjs 从 src/drpy3/** 打包生成——请勿手改；维护请改源码后重新构建：
 *     npm run build:drpy3
 *
 * 用法（与 drpy2.js 双文件形态一致，引擎与库包同目录分发）：
 *   你的目录/
 *   ├── drpy3.js                    ← 本文件
 *   └── drpy-core-lite.min.js       ← 库全局包（CryptoJS/jinja/模板/pako/gbkTool…，peer 引用）
 *
 *   import { Runtime } from './drpy3.js';
 *   const rt = new Runtime({ req, pdfh, pdfa, pd });   // HostEnv 注入，详见设计文档 §7
 *   const src = await rt.load(sourceCode, { key: '_x' });
 *   const home = await src.home('');
 *
 * 设计唯一真相源：docs/drpy3-设计文档.md；执行手册：docs/drpy3-实现任务书.md
 * 模块索引（对应 src/drpy3/ 下同名源文件）：
 *   runtime.js   Runtime：HostEnv 校验/use()/capabilities
 *   lifecycle.js Source 实例与生命周期治理（LRU/signature 热更/快照复温）
 *   context.js   两层上下文的调用态（ctx 构造与快捷别名投影）
 *   lib/net.js lib/parse.js lib/crypto.js lib/text.js lib/utils.js lib/store.js lib/cache.js lib/wasm.js
 *   rules/parseRule.js rules/jsFragment.js rules/defaults.js（声明式默认引擎）
 *   modules/loader.js（模式 A/B/C 源装载）compat/drpy2.js（load2x 兼容层）errors.js（工程化报错）
 */
`;

await Promise.all([
    // 可读单文件：drpy2.js 同款用法
    esbuild.build({
        entryPoints: [path.join(ROOT, 'src', 'drpy3', 'index.js')],
        bundle: true,
        platform: 'neutral',
        format: 'esm',
        target: 'es2020',
        outfile: path.join(ROOT, 'dist', 'drpy3.js'),
        minify: false,
        banner: {js: BANNER},
        logLevel: 'silent',
        plugins: [peerExternalPlugin],
    }),
    // 压缩单文件
    esbuild.build({
        entryPoints: [path.join(ROOT, 'src', 'drpy3', 'index.js')],
        bundle: true,
        platform: 'neutral',
        format: 'esm',
        target: 'es2020',
        outfile: path.join(ROOT, 'dist', 'drpy3.esm.min.js'),
        minify: true,
        logLevel: 'silent',
        plugins: [peerExternalPlugin],
    }),
]);
console.log('[drpy3] 构建完成: dist/drpy3.js（可读单文件）+ dist/drpy3.esm.min.js（压缩），peer 引用 ./drpy-core-lite.min.js');
