// js: 片段执行器（设计 §5.3/§4.3.4）：
// AsyncFunction + with(scope) 受控包装——drpy2 全部老名字（request/pdfh/setResult/VODS/MY_URL/...）
// 作为 scope 属性参数化注入，不触碰 globalThis；片段内可 await，可直用 ctx/lib 并发。
import {UA, urlencode, forceOrder, 是否正版, urlDeal} from '../lib/utils.js';
import {md5, base64Encode, base64Decode, gzip, ungzip, aesX, desX, rc4, rsaX} from '../lib/crypto.js';
import {cut} from '../lib/text.js';

const ASYNC_FN = Object.getPrototypeOf(async function () {
}).constructor;

/** drpy2 setResult 映射语义：{title,url,desc,content,pic_url/img,...} → TVBox vod 条目 */
export function mapSetResult(d) {
    if (!Array.isArray(d)) return [];
    return d.map((it) => {
        const obj = {
            vod_id: it.url || '',
            vod_name: it.title || '',
            vod_remarks: it.desc || '',
            vod_content: it.content || '',
            vod_pic: it.pic_url || it.img || '',
        };
        if ('tname' in it) obj.type_name = it.tname || '';
        if ('tid' in it) obj.type_id = it.tid || '';
        if ('year' in it) obj.vod_year = it.year || '';
        if ('actor' in it) obj.vod_actor = it.actor || '';
        if ('director' in it) obj.vod_director = it.director || '';
        if ('area' in it) obj.vod_area = it.area || '';
        return obj;
    });
}

/**
 * 构造片段作用域：drpy2 老名字全量原名注入（§5.3）
 * @param ctx 调用上下文
 * @param extra 环节专属变量（KEY/TYPE/MY_PAGE/MY_FL/detailUrl/play_url/desc/flag...）
 */
export function buildFragmentScope(ctx, extra = {}) {
    const scope = {
        // ═══ 调用态回显（drpy2 全局名）═══
        input: ctx.input !== undefined ? ctx.input : (ctx.url || ''),
        MY_URL: ctx.url || '',
        MY_FLAG: ctx.flag || '',
        flag: ctx.flag || '',
        KEY: ctx.wd || '',
        wd: ctx.wd || '',
        MY_PAGE: ctx.pg || 1,
        MY_FL: ctx.fl || {},
        fetch_params: ctx.fetchParams,
        // ═══ net（老名 request/fetch/post/batchFetch）═══
        request: (u, o) => ctx.lib.net.request(u, o),
        fetch: (u, o) => ctx.lib.net.request(u, o),
        post: (u, o) => ctx.lib.net.post(u, o),
        reqCookie: (u, o, a) => ctx.lib.net.reqCookie(u, o, a),
        batchFetch: (items) => ctx.lib.net.batchFetch(items),
        // ═══ parse（pdf 三件套 + jsp/jq 句柄 + pdfl）═══
        pdfh: (h, p, b) => ctx.lib.parse.pdfh(h, p, b),
        pdfa: (h, p) => ctx.lib.parse.pdfa(h, p),
        pd: (h, p, b) => ctx.lib.parse.pd(h, p, b),
        pdfl: (h, p, lt, lu, mu) => ctx.lib.parse.pdfl(h, p, lt, lu, mu),
        jsp: {
            pdfh: (h, p, b) => ctx.lib.parse.pdfh(h, p, b),
            pdfa: (h, p) => ctx.lib.parse.pdfa(h, p),
            pd: (h, p, b) => ctx.lib.parse.pd(h, p, b),
            jj: (p, j) => ctx.lib.parse.jp(p, j),
        },
        jq: {
            pdfh: (h, p, b) => ctx.lib.parse.pdfh(h, p, b),
            pdfa: (h, p) => ctx.lib.parse.pdfa(h, p),
            pd: (h, p, b) => ctx.lib.parse.pd(h, p, b),
        },
        jinja2: (t, o) => ctx.lib.parse.jinja2(t, o),
        jp: (p, j) => ctx.lib.parse.jp(p, j),
        // ═══ setResult 系列（写 scope.VODS，不碰全局）═══
        setResult: (d) => {
            scope.VODS = mapSetResult(d);
            return scope.VODS;
        },
        setResult2: (res) => {
            scope.VODS = (res && res.list) || [];
            return scope.VODS;
        },
        setHomeResult: (res) => {
            scope.VODS = mapSetResult((res && res.list) || []);
            return scope.VODS;
        },
        VOD: {},
        VODS: [],
        TABS: [],
        LISTS: [],
        // ═══ crypto/text/utils（drpy2 全局名）═══
        md5, base64Encode, base64Decode, gzip, ungzip, aesX, desX, rc4, rsaX,
        cut,
        urlencode,
        encodeUrl: (s) => encodeURI(s),
        joinUrl: (a, b) => ctx.lib.utils.joinUrl(a, b),
        urljoin: (a, b) => ctx.lib.utils.joinUrl(a, b),
        getHome: (u) => ctx.lib.utils.getHome(u),
        urlDeal,
        是否正版,
        forceOrder,
        stringUtils: () => ctx.lib.text.stringUtils(),
        getProxyUrl: () => ctx.lib.utils.getProxyUrl(),
        // ═══ UA 常量 ═══
        MOBILE_UA: UA.MOBILE_UA,
        PC_UA: UA.PC_UA,
        IOS_UA: UA.IOS_UA,
        UC_UA: UA.UC_UA,
        UA: UA.UA,
        // ═══ drpy3 能力 ═══
        lib: ctx.lib,
        ctx,
        log: (...a) => ctx.log(...a),
        print: (...a) => ctx.log(...a),
    };
    Object.assign(scope, extra);
    return scope;
}

/**
 * 执行 js: 片段（去掉 'js:' 前缀的代码）
 * @returns scope（片段执行后可读 VOD/VODS/TABS/LISTS/input 等回写值）
 */
export async function runJsFragment(code, ctx, extra = {}) {
    const scope = buildFragmentScope(ctx, extra);
    const body = 'with(__scope) {\n' + code + '\n}';
    const fn = new ASYNC_FN('__scope', body);
    await fn(scope);
    return scope;
}

/** 'js:...' 规则串 → 代码体 */
export function stripJsPrefix(ruleStr) {
    return String(ruleStr).trim().replace(/^js:/, '').trim();
}
