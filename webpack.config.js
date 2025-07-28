// import {createRequire} from 'module';
// import {fileURLToPath} from "url";
// import path from "path";
// const require = createRequire(import.meta.url);
// const module = {};
// const __dirname = path.dirname(fileURLToPath(import.meta.url));


const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');


module.exports = {
    mode: 'production',
    entry: './src/drpy-core.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'drpy-core.min.js',
        library: {
            type: 'module'
        },
        environment: {
            module: true
        }
    },
    performance: {
        maxEntrypointSize: 2048000, // 默认250kb，单位字节
        maxAssetSize: 2048000
    },
    experiments: {
        outputModule: true
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            ['@babel/preset-env', {
                                targets: {
                                    browsers: ['last 2 versions', 'not dead', '> 0.2%']
                                },
                                modules: false,
                            }]
                        ],
                        plugins: [
                            '@babel/plugin-proposal-class-properties',
                            '@babel/plugin-proposal-optional-chaining'
                        ]
                    }
                }
            },
            {
                test: /\.min\.js$/, // 处理第三方.min.js文件
                resolve: {
                    fullySpecified: false
                },
                use: ['babel-loader?cacheDirectory=true']
            },
            {
                // 匹配需要作为全局脚本加载的文件
                test: /(gb18030|crypto-js|jsencrypt|node-rsa|pako|json5|jsonpathplus|jinja|polywasm|encoding|xxhash-wasm)\.min\.js$/,
                use: ['script-loader']
            }
        ]
    },
    optimization: {
        minimize: true,
        minimizer: [
            new TerserPlugin({
                parallel: true,
                extractComments: false,
                terserOptions: {
                    ecma: 2015,
                    compress: {
                        drop_console: false,
                        passes: 2,
                        // 关键：保留全局变量引用
                        keep_fnames: true,
                        keep_classnames: true
                    },
                    mangle: {
                        // reserved: ['模板','CryptoJS','gbkTool','jinja'], // 保留中文标识符
                        properties: false // 关键：不混淆全局变量名称
                    },
                    format: {
                        comments: false
                    }
                }
            })
        ]
    },
    resolve: {
        extensions: ['.js'],
        alias: {
            // 如果模板.js文件路径需要别名
            '模板': path.resolve(__dirname, 'src/模板.js')
        }
    },
};