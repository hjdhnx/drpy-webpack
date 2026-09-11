import {test} from 'node:test';
import {spawn} from 'node:child_process';
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {Runtime} from '../src/drpy3/index.js';
import {makeNodeHost} from '../cli/node-host.mjs';
const HERE = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(HERE, '..');

test('dbg2', {timeout: 30000}, async () => {
    const mock = spawn(process.execPath, [path.join(HERE, 'helpers', 'mock-server.mjs')], {env: {...process.env, MOCK_PORT: '19795'}, stdio: 'ignore'});
    await new Promise((resolve) => {
        const req = http.get('http://127.0.0.1:19795/rider/list?probe=1', (res) => { res.resume(); resolve(); });
        req.on('error', () => setTimeout(resolve, 500));
    });
    const B = 'http://127.0.0.1:19795';
    let code = fs.readFileSync(path.join(ROOT, 'docs', '百忙无果1.js'), 'utf8');
    for (const h of ['https://pianku.api.%6d%67%74%76.com', 'https://mobileso.bz.%6d%67%74%76.com', 'https://pcweb.api.mgtv.com', 'https://www.mgtv.com']) code = code.replaceAll(h, B);
    const rt = new Runtime(makeNodeHost({sourceDir: path.join(ROOT, 'docs')}));
    const src = await rt.load(code, {key: '_dbg2'});
    await src.init('');
    const cate = await src.category('3', 1, false, {});
    console.log('LEN', cate.list.length, 'first', JSON.stringify(cate.list[0]).slice(0, 120));
    mock.kill();
});
