// modules/loader：源内模块化（设计 §8）。三种运行模式 A 原生 ESM / B 预打包 / C 内置 CJS shim。
// W2 先提供零依赖形态的中性求值（evalSourceNeutral）；W8 补齐三模式与 CJS shim。
import {Drpy3Error} from '../errors.js';

const ASYNC_FN = Object.getPrototypeOf(async function () {
}).constructor;

/**
 * 中性求值（平台无关兜底，无需引擎模块能力）：
 * 支持 `import {defineSource} from 'drpy3'` + `export default <对象/函数>` 的零相对依赖形态
 * （覆盖 百忙无果1/2/4、央视频-1/2/4 等演示稿）。含相对路径 import 的源请走模式 A/B/C（W8）。
 */
export async function evalSourceNeutral(code, opts = {}) {
    const src = String(code);
    const hasRelativeImport = /(?:^|\n)\s*import\s+[^'"]*['"]\.\.?\/([^'"]*)['"]/.test(src)
        || /(?:^|\n)\s*import\s+['"]\.\.?\/([^'"]*)['"]/.test(src);
    if (hasRelativeImport) {
        throw new Drpy3Error('load', 'module',
            `源含相对路径模块 import（${opts.path || '未命名源'}），当前引擎无模块能力——请使用模式 A 原生 loader / 模式 B 预打包 / 模式 C CJS shim（设计 §8.2）`);
    }
    let body = src
        .replace(/^[ \t]*import[ \t]+[^;'"]*['"]drpy3['"][ \t]*;?[ \t]*$/gm, '')   // import {defineSource} from 'drpy3'
        .replace(/^[ \t]*import[ \t]*['"]drpy3['"][ \t]*;?[ \t]*$/gm, '');        // import 'drpy3'
    const hasExportDefault = /(?:^|\n)[ \t]*export[ \t]+default[ \t]/.test(body);
    body = body.replace(/(?:^|\n)[ \t]*export[ \t]+default[ \t]*/g, '\nreturn ');
    // 其余命名导出（import 它们的源走打包模式，中性求值仅兜底 default 导出形态）
    body = body.replace(/(?:^|\n)[ \t]*export[ \t]+\{[^}]*\}[ \t]*;?[ \t]*(?=\n|$)/g, '\n');
    if (!hasExportDefault) {
        throw new Drpy3Error('load', 'module', `源未找到 export default（${opts.path || '未命名源'}）——drpy3 源必须 default 导出 rule 对象或 defineSource 包装`);
    }
    try {
        const fn = new ASYNC_FN('defineSource', 'lib', body);
        return await fn(_neutralDefineSource, undefined);
    } catch (e) {
        if (e instanceof SyntaxError) {
            throw new Drpy3Error('load', 'module', `源语法错误: ${e.message}（若源使用 require/ESM 混合语法，请走模式 B 预打包 §8.2）`);
        }
        throw e;
    }
}

// 中性求值里的 defineSource（恒等，§4.1）
function _neutralDefineSource(source) {
    return source;
}
