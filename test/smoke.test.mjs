// W0 回归锚点：drpy2 原版 百忙无果[官].js 六环节冒烟（附录 C 基准，从 .smoke/ 复刻入库）。
// 作用：锚定宿主注入契约与 mock 数据形状——drpy3 的所有金标准测试复用同一 mock。
// 网络说明：本机沙箱无法直连 mgtv，用本地 mock（独立进程）端到端验证。
import {test} from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {spawn} from 'node:child_process';
import {fileURLToPath, pathToFileURL} from 'node:url';
import path from 'node:path';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(HERE, '..');
const PORT = 19771;

// pdfh/pdfa/pd：drpy-node 生产实现（cheerio 版 jsoup 封装），严禁手写解析器
import {jsoup} from 'file:///E:/gitwork/drpy-node/libs_drpy/htmlParser.js';

test('W0 drpy2 回归锚：百忙无果[官] 六环节', {timeout: 60000}, async () => {
    const mock = spawn(process.execPath, [path.join(HERE, 'helpers', 'mock-server.mjs')], {
        env: {...process.env, MOCK_PORT: String(PORT)}, stdio: 'inherit',
    });
    try {
        await new Promise((r) => setTimeout(r, 800));
        // ═══ 宿主全局注入（契约同 docs/drpy2-移植对接指南.md）═══
        globalThis.joinUrl = (base, p) => {
            try {
                return new URL(p, base || undefined).href;
            } catch {
                return (base || '') + p;
            }
        };
        const _store = new Map();
        globalThis.local = {
            get: (key, k, v) => (_store.has(key + '|' + k) ? _store.get(key + '|' + k) : v),
            set: (key, k, v) => void _store.set(key + '|' + k, v),
            delete: (key, k) => void _store.delete(key + '|' + k),
        };
        // req 必须【同步】返回 {content, headers}——drpy2 request() 立即消费 res.content
        const {execFileSync} = await import('node:child_process');
        globalThis.req = (url, obj = {}) => {
            const args = ['-sS', '-i', '--max-time', String(Math.min((obj.timeout || 5000) / 1000, 30))];
            if (obj.redirect !== 0) args.push('-L');
            for (const [k, v] of Object.entries(obj.headers || {})) args.push('-H', `${k}: ${v}`);
            const method = (obj.method || 'GET').toUpperCase();
            if (method !== 'GET') {
                args.push('-X', method);
                if (obj.body != null && obj.body !== '') args.push('--data-binary', String(obj.body));
                else if (obj.data && Object.keys(obj.data).length) args.push('--data-binary', JSON.stringify(obj.data));
            }
            args.push(encodeURI(url));
            try {
                const buf = execFileSync('curl', args, {encoding: 'buffer', maxBuffer: 64 * 1024 * 1024});
                const SEP = Buffer.from('\r\n\r\n');
                let pos = 0, bodyStart = 0, headerLines = [];
                while (true) {
                    const idx = buf.indexOf(SEP, pos);
                    if (idx < 0) break;
                    const section = buf.slice(pos, idx).toString('latin1');
                    if (/^HTTP\/[\d.]+\s/.test(section)) {
                        headerLines = section.split('\r\n');
                        bodyStart = idx + 4;
                        pos = bodyStart;
                    } else break;
                }
                const body = buf.slice(bodyStart);
                const headers = {status: headerLines[0] || ''};
                for (const line of headerLines.slice(1)) {
                    const i = line.indexOf(':');
                    if (i > 0) headers[line.slice(0, i).trim()] = line.slice(i + 1).trim();
                }
                const charset =
                    (String(headers['content-type'] || '').match(/charset=([\w-]+)/i) || [])[1] || obj.encoding || 'utf-8';
                let content;
                try {
                    content = new TextDecoder(charset).decode(body);
                } catch {
                    content = body.toString('utf8');
                }
                return {content: obj.buffer === 2 ? body.toString('base64') : content, headers};
            } catch (e) {
                return {content: '', headers: {error: String(e && e.message || e)}};
            }
        };
        globalThis.pdfh = (html, parse, base_url = '') => new jsoup(base_url).pdfh(html, parse, base_url);
        globalThis.pdfa = (html, parse) => new jsoup('').pdfa(html, parse);
        globalThis.pd = (html, parse, base_url = '') => new jsoup(base_url).pd(html, parse, base_url);

        // ═══ 加载 drpy2，标杆源指向 mock，跑六环节 ═══
        const drpy = (await import(pathToFileURL(path.join(ROOT, 'src', 'drpy2.js')))).default;
        const B = `http://127.0.0.1:${PORT}`;
        let sourceCode = fs.readFileSync(path.join(ROOT, 'docs', '百忙无果[官].js'), 'utf8');
        for (const h of ['https://pianku.api.%6d%67%74%76.com', 'https://mobileso.bz.%6d%67%74%76.com',
            'https://pcweb.api.mgtv.com', 'https://www.mgtv.com']) sourceCode = sourceCode.replaceAll(h, B);

        drpy.init(sourceCode);
        const rule = {title: drpy.getRule('title'), host: drpy.getRule('host')};
        assert.equal(rule.title, '百忙无果[官]');
        assert.equal(rule.host, B, 'init+getRule');

        const home = JSON.parse(drpy.home(''));
        assert.equal(home.class.length, 7, 'home class=7');
        assert.ok(Object.keys(home.filters).length > 0, 'home filters');

        const cate = JSON.parse(drpy.category('3', 1, false, {}));
        assert.equal(cate.list.length, 3, 'category json:一级');
        assert.equal(cate.list[0].vod_id, '3$vid1', 'category 分类$id 前缀');

        const search = JSON.parse(drpy.search('斗罗大陆', false, 1));
        assert.equal(search.list.length, 1, 'search js:规则');
        assert.equal(search.list[0].vod_name, '斗罗大陆');

        const detail = JSON.parse(drpy.detail(search.list[0].vod_id));
        const vod = detail.list[0];
        assert.equal(vod.vod_name, '测试影片全名', 'detail vod_name');
        assert.equal(vod.vod_pic, 'http://img.example.com/pic.jpg', 'detail vod_pic(pd)');
        assert.ok(String(vod.vod_play_url).includes('第1集$'), 'detail vod_play_url');

        const firstPlay = String(vod.vod_play_url).split('#')[0].split('$')[1];
        const play = JSON.parse(drpy.play(vod.vod_play_from, firstPlay, []));
        assert.equal(play.url, firstPlay, 'play url');
        assert.ok('parse' in play && 'jx' in play, 'play parse/jx');
    } finally {
        mock.kill();
    }
});
