const esbuild = require('esbuild')
const {NodeModulesPolyfillPlugin} = require('@esbuild-plugins/node-modules-polyfill')
const path = require('path')
const fs = require('fs')

// ⚠️ 本脚本只构建 drpy-core-qjs（QJS so 适配版）。**禁止恢复 drpy-core /
// drpy-core-lite 的构建入口**——dist/drpy-core-lite.min.js 与 drpy-core.min.js
// 是字节级恢复的禁产物（9fe9b1d/e18961a 事故：esbuild 重打破坏 jinja 模板
// 编译器的 script-loader 全局作用域语义 → category 报 "e is not defined"）。
// core-qjs 不受此限：jinja.min.js / crypto-js.min.js（均为 UMD）经下方插件
// 转成源码字符串内联、运行时全局 eval（jinja-js 模板编译器 new Function 引用
// 闭包内名，esbuild 模块化打包必炸——"i is not defined" 实锤；crypto-js UMD
// 在 esbuild bundle 里 CJS 分支挂包装局部 exports，globalThis 取不到）。
// 勿换 jinja2-slim（真引擎 loadSource 报 SyntaxError unexpected character，
// 原因未查明）
const jinjaGlobalPlugin = {
    name: 'jinja-global-eval',
    setup(build) {
        build.onResolve({filter: /jinja\.min\.js\?global$|crypto-js\.min\.js\?global$/},
            (args) => ({
                // args.path = './libs/xxx.js'（相对 importer 的原始说明符）
                path: path.resolve(path.dirname(args.importer), args.path.replace(/\?global$/, '')),
                namespace: 'jinja-global',
            }));
        build.onLoad({filter: /.*/, namespace: 'jinja-global'}, (args) => {
            const src = fs.readFileSync(args.path, 'utf8');
            return {contents: 'export default ' + JSON.stringify(src) + ';', loader: 'js'};
        });
    },
};

const qjsConfig = {
    entryPoints: {'drpy-core-qjs': './src/drpy-core-qjs.js'},
    bundle: true,
    minify: true,
    sourcemap: false,
    target: ['es2020'],
    legalComments: 'none',
    charset: 'utf8',
    platform: 'browser',
    format: 'esm',
    outdir: 'dist',
    outExtension: {'.js': '.min.js'},
    keepNames: true,
    alias: {
        '模板': path.resolve(__dirname, 'src/模板.js')
    },
    plugins: [
        NodeModulesPolyfillPlugin(),
        jinjaGlobalPlugin,
    ],
    loader: {'.js': 'js'},
    define: {
        'process.env.NODE_ENV': '"production"',
        'globalThis': 'globalThis',
        'window.globalThis': 'globalThis'
    },
    logOverride: {'suspicious-boolean-not': 'silent'},
    banner: {
        js: `const g = typeof window !== 'undefined' ? window : 
        typeof global !== 'undefined' ? global : globalThis;`
    }
}

// 执行构建
esbuild.build(qjsConfig)
    .then(() => console.log('构建完成: dist/drpy-core-qjs.min.js'))
    .catch((e) => { console.error(e); process.exit(1) })
