// Node HostEnv 最小实现（W11 的"Node 完全体"前置；本会话仅作开发验证介质）。
// 异步档位 A（原生 loop 真并发，§5.4）。
// ⚠️ req 必须用 node:http 实现：dist/drpy-core-lite.min.js 会用自带 node-fetch polyfill 覆盖
// globalThis.fetch，且其 http 底座是浏览器 shim（对本地端口连接失败）——原生 http 不可被污染。
// pdf 三件套复用 drpy-node 生产实现 htmlParser.js（cheerio 版 jsoup 封装）——严禁手写解析器。
import fs from 'node:fs';
import path from 'node:path';
import http from 'node:http';
import https from 'node:https';
import {pathToFileURL} from 'node:url';

// pdf 三件套实现位置：默认 drpy-node 生产实现（DRPY_HTML_PARSER 环境变量可覆盖）
const PARSER_URL = process.env.DRPY_HTML_PARSER
    ? pathToFileURL(process.env.DRPY_HTML_PARSER).href
    : 'file:///E:/gitwork/drpy-node/libs_drpy/htmlParser.js';
const {jsoup} = await import(PARSER_URL);

const BINARY_EXT = new Set(['.wasm', '.ts', '.mp4', '.m4s', '.jpg', '.png', '.gif', '.webp']);

/** 单次 HTTP 请求（node:http，重定向不跟随）→ {status, headers, body:Buffer} */
function rawRequest(url, {method = 'GET', headers = {}, body = null, timeoutMs = 5000}) {
    return new Promise((resolve, reject) => {
        const u = new URL(url);
        const mod = u.protocol === 'https:' ? https : http;
        const req = mod.request(
            {
                protocol: u.protocol,
                hostname: u.hostname,
                port: u.port || (u.protocol === 'https:' ? 443 : 80),
                path: u.pathname + u.search,
                method,
                headers,
            },
            (res) => {
                const chunks = [];
                res.on('data', (c) => chunks.push(c));
                res.on('end', () => resolve({status: res.statusCode, headers: res.headers, body: Buffer.concat(chunks)}));
            },
        );
        req.setTimeout(timeoutMs, () => req.destroy(new Error(`timeout ${timeoutMs}ms`)));
        req.on('error', reject);
        if (body != null && method !== 'GET' && method !== 'HEAD') req.write(body);
        req.end();
    });
}

/** fetch 语义的请求：跟随重定向（≤5 跳），返回 {status, headers(普通对象), body:Buffer} */
async function httpRequest(url, init = {}) {
    let current = String(url);
    let method = (init.method || 'GET').toUpperCase();
    const headers = {...(init.headers || {})};
    let body = init.body != null ? init.body : null;
    for (let hop = 0; hop < 5; hop++) {
        const res = await rawRequest(current, {method, headers, body, timeoutMs: init.timeoutMs});
        if ([301, 302, 303, 307, 308].includes(res.status) && res.headers.location) {
            const next = new URL(res.headers.location, current).href;
            if (res.status === 303 || ((res.status === 301 || res.status === 302) && method === 'POST')) {
                method = 'GET';
                body = null;
            }
            current = next;
            continue;
        }
        const flat = {};
        for (const [k, v] of Object.entries(res.headers)) flat[k] = Array.isArray(v) ? v.join(', ') : v;
        return {status: res.status, headers: flat, body: res.body};
    }
    throw new Error('too many redirects');
}

/**
 * 组装 Node HostEnv
 * @param opts {sourceDir: 源文件目录（相对资产解析基准）, store: 可选持久介质, log: 可选日志}
 */
export function makeNodeHost(opts = {}) {
    const sourceDir = opts.sourceDir ? path.resolve(opts.sourceDir) : process.cwd();
    const host = {
        engine: 'node',
        version: process.version,

        // ═══ req：异步 HTTP（drpy3 契约 {content, headers}；buffer:1→Uint8Array / 2→base64）═══
        async req(url, obj = {}) {
            const o = obj || {};
            try {
                let finalUrl = String(url);
                const method = (o.method || 'GET').toUpperCase();
                const headers = {...(o.headers || {})};
                let body = null;
                if (o.data && method === 'GET') {
                    const u = new URL(finalUrl);
                    for (const [k, v] of Object.entries(o.data)) u.searchParams.set(k, String(v));
                    finalUrl = u.href;
                } else if (o.body != null && o.body !== '' && method !== 'GET') {
                    body = String(o.body);
                } else if (o.data && method !== 'GET') {
                    const hasCt = Object.keys(headers).some((k) => k.toLowerCase() === 'content-type');
                    const ctKey = Object.keys(headers).find((k) => k.toLowerCase() === 'content-type') || '';
                    if (String(headers[ctKey] || '').includes('json')) {
                        body = JSON.stringify(o.data);
                    } else {
                        body = new URLSearchParams(o.data).toString();
                        if (!hasCt) headers['Content-Type'] = 'application/x-www-form-urlencoded';
                    }
                }
                const res = await httpRequest(finalUrl, {method, headers, body, timeoutMs: Math.min(o.timeout || 5000, 60000)});
                const outHeaders = {status: `HTTP/1.1 ${res.status}`};
                Object.assign(outHeaders, res.headers);
                let content;
                if (o.buffer === 1) {
                    content = new Uint8Array(res.body);
                } else if (o.buffer === 2) {
                    content = res.body.toString('base64');
                } else {
                    const charset =
                        (String(res.headers['content-type'] || '').match(/charset=([\w-]+)/i) || [])[1]
                        || o.encoding || 'utf-8';
                    try {
                        content = new TextDecoder(charset).decode(res.body);
                    } catch {
                        content = res.body.toString('utf8');
                    }
                }
                return {content, headers: outHeaders};
            } catch (e) {
                // 出错不抛：返回 {content:'', headers:{error}}（drpy2 契约，个别源 try/catch 依赖）
                return {content: '', headers: {error: String(e && e.message || e)}};
            }
        },

        // ═══ pdf 三件套：drpy-node 生产实现 ═══
        pdfh: (html, parse, base_url = '') => new jsoup(base_url || '').pdfh(html, parse, base_url || ''),
        pdfa: (html, parse) => new jsoup('').pdfa(html, parse),
        pd: (html, parse, base_url = '') => new jsoup(base_url || '').pd(html, parse, base_url || ''),
        pdfl: (html, parse, list_text, list_url, my_url) => new jsoup(my_url || '').pdfl(html, parse, list_text, list_url, my_url),

        // ═══ 随源资产（wasm 等）：相对源目录读文件；二进制扩展名按字节读 ═══
        loadAsset: async (p) => {
            const abs = path.isAbsolute(p) ? p : path.join(sourceDir, p);
            if (BINARY_EXT.has(path.extname(abs).toLowerCase())) {
                return new Uint8Array(fs.readFileSync(abs));
            }
            return fs.readFileSync(abs, 'utf8');
        },

        // ═══ 持久介质：内存兜底（壳子可换成文件/数据库）═══
        store: opts.store || undefined,
        log: opts.log || ((...args) => console.log('[drpy3]', ...args)),
        getProxy: () => 'http://127.0.0.1:9978/proxy?do=js',
        env: {},
    };
    return host;
}

/** 文本读取（测试/CLI 用） */
export function readSourceFile(p) {
    return fs.readFileSync(p, 'utf8');
}
