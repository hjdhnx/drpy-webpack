const esbuild = require('esbuild')
const {NodeModulesPolyfillPlugin} = require('@esbuild-plugins/node-modules-polyfill')
const path = require('path')

// 多入口配置
const entryPoints = {
    'drpy-core': './src/drpy-core.js',
    'drpy-core-lite': './src/drpy-core-lite.js'
}

// 共享配置
const sharedConfig = {
    entryPoints,
    bundle: true,
    minify: true,
    sourcemap: false,
    target: ['es2020'],
    legalComments: 'none',
    charset: 'utf8',
    platform: 'browser',
    format: 'esm',
    // format: 'iife', // 使用立即执行函数
    // globalName: 'globalThis', // 设置全局命名空间
    outdir: 'dist',
    outExtension: {'.js': '.min.js'},
    keepNames: true, // 保留函数/类名
    alias: {
        '模板': path.resolve(__dirname, 'src/模板.js')
    },
    plugins: [
        // 处理 Node.js 模块 polyfill
        NodeModulesPolyfillPlugin()
    ],
    loader: {
        '.js': 'js'
    },
    define: {
        'process.env.NODE_ENV': '"production"',
        'globalThis': 'globalThis',
        'window.globalThis': 'globalThis'
    },
    logOverride: {
        // 忽略这个特定警告
        'suspicious-boolean-not': 'silent'
    },
    // 关键修复：确保全局导出可用
    banner: {
        js: `const g = typeof window !== 'undefined' ? window : 
        typeof global !== 'undefined' ? global : globalThis;`
    }
}

// 执行构建
esbuild.build(sharedConfig)
    .then(() => console.log('构建完成!'))
    .catch(() => process.exit(1))