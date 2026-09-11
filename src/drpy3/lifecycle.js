// lifecycle：Source 实例模型与状态机 Cold/Hot（设计 §4.2-§4.6、附录 D 阶段1/2）。
// W2：实例构造/ctx 调度/this 绑定/headers 基线/并发契约。
// W3：LRU+水位驱逐、signature 惰性热更、headers 快照恢复、in-flight 排空。
import {buildCtx} from './context.js';
import {makeCache} from './lib/cache.js';
import {makeStore} from './lib/store.js';
import {resolveUaConstants} from './lib/utils.js';
import {Drpy3Error} from './errors.js';

export const HOOKS = ['init', 'home', 'homeVod', 'category', 'detail', 'play', 'search', 'proxy', 'action', 'sniffer', 'isVideo'];

/** 形态判定（§4.1）：纯对象=纯声明式源；含钩子/defineSource 包装=增强源（defineSource 恒等） */
export function detectForm(def) {
    if (!def || typeof def !== 'object') throw new Drpy3Error('load', '', '源必须导出对象（{meta, rule, ...钩子}）');
    for (const h of HOOKS) {
        if (typeof def[h] === 'function') return 'enhanced';
    }
    return 'declarative';
}

// ═══ 实例内部与壳子分发方法（createSource 绑定为实例自身属性/原型链）═══
export const sourceProto = {
    /** 实例状态字段初始化（由 createSource 调用） */
    initFields(rt, def, opts = {}) {
        this.rt = rt;
        this.def = def;
        this.form = detectForm(def);
        this.path = opts.path || '';
        this.extend = opts.extend;
        this.meta = def.meta || {};
        this.rawRule = def.rule || {};
        this.key = opts.key || 'drpy_' + (this.meta.title || this.meta.host || Math.random().toString(36).slice(2));
        this.rule = null;            // init 后定稿（ctx.rule 投影）
        this.headers = {};           // 实例请求头基线（可变，§4.4）
        this.fetchParamsBaseline = {headers: {}, timeout: 5000, encoding: 'utf-8'};
        this.cache = makeCache();    // 进程内 TTL 缓存（实例存活期）
        this.store = makeStore(rt.resolve('store'), this.key); // 源级持久 KV（按源隔离）
        // ═══ 生命周期状态机（W3 充实）═══
        this.hot = false;
        this.lastUsed = 0;
        this.inFlight = 0;
        this.signature = opts.signature || '';
        this.headersSnapshot = null; // 驱逐时的 headers 快照（层次 B，§4.6）
        this.stateVersion = this.meta.stateVersion || '';
        this.pinned = (rt.pinList || []).includes(this.key);
        this.destroying = false;
    },

    /** Cold → Hot 复温（调用到达时触发）。W3 接管：签名比对/快照回填/in-flight 排队 */
    async ensureHot() {
        if (!this.hot) await this._warm();
        this.lastUsed = Date.now();
    },

    async _warm(resumed = false) {
        // ① rule 定稿（W2 基础版：浅拷贝 + headers UA 常量解析 + 默认值；W6 扩展 url 拼接/filter 解压/模板继承）
        const rule = {...this.rawRule};
        rule.headers = resolveUaConstants({...((rule.headers && typeof rule.headers === 'object') ? rule.headers : {})});
        rule.timeout = rule.timeout || 5000;
        rule.encoding = rule.encoding || rule.编码 || 'utf-8';
        this.rule = rule;
        // ② 实例请求头基线 + fetchParams 基线（§4.4）
        this.headers = {...rule.headers};
        this.fetchParamsBaseline = {headers: {...rule.headers}, timeout: rule.timeout, encoding: rule.encoding};
        // ③ init 钩子（this=实例，def 成员经原型链可达；ctx.headers 可变基线已就位）
        if (typeof this.def.init === 'function') {
            const ctx = buildCtx(this, {stage: 'init', resumed});
            await this.def.init.call(this, ctx, this.extend);
        }
        this.hot = true;
    },

    /** 驱逐（W3 详细治理）：in-flight 排空后释放实例态；headers 快照存档供复温回填 */
    async evict() {
        if (!this.hot) return true;
        if (this.inFlight > 0) return false; // 有 in-flight 调用不驱逐（§4.6）
        this.headersSnapshot = {...this.headers};
        this.hot = false;
        this.cache = makeCache();
        this.rule = null;
        return true;
    },

    /** 通用调度：ensureHot → 构造 ctx → 钩子(优先)/声明式默认实现 → 工程化报错包装 */
    async _dispatch(stage, args, callCtx, hook) {
        await this.ensureHot();
        this.inFlight++;
        try {
            const ctx = buildCtx(this, {stage, ...callCtx});
            const fn = (hook && typeof this.def[hook] === 'function') ? this.def[hook] : null;
            if (fn) {
                const r = await fn.call(this, ctx, ...args);
                return r === undefined ? {} : r;
            }
            const defaults = this.rt.defaults;
            if (defaults && typeof defaults[stage] === 'function') {
                const r = await defaults[stage].call(this, ctx, ...args);
                return r === undefined ? {} : r;
            }
            throw new Drpy3Error(stage, '', `源未实现 ${hook || stage} 钩子，且无声明式默认实现`);
        } catch (e) {
            if (e instanceof Drpy3Error) throw e;
            throw new Drpy3Error(stage, '', e, this.meta.title || this.key);
        } finally {
            this.inFlight--;
            this.lastUsed = Date.now();
        }
    },

    // ═══ 六环节 + 扩展通道（壳子签名；createSource 绑定为实例自身属性）═══
    async init(extend) {
        if (extend !== undefined) this.extend = extend;
        this.hot = false;
        await this.ensureHot();
    },

    async home(filter) {
        return this._dispatch('home', [filter], {}, 'home');
    },

    async homeVod(params) {
        return this._dispatch('homeVod', [params], {}, 'homeVod');
    },

    async category(tid, pg, filter, extend) {
        return this._dispatch('category', [tid, pg, filter, extend], {fl: extend || {}, pg: pg || 1}, 'category');
    },

    async detail(id) {
        return this._dispatch('detail', [id], {input: id, url: ''}, 'detail');
    },

    async play(flag, id, flags) {
        return this._dispatch('play', [flag, id, flags], {flag, input: id, url: id}, 'play');
    },

    async search(wd, quick, pg) {
        return this._dispatch('search', [wd, quick, pg], {wd, quick: !!quick, pg: pg || 1}, 'search');
    },

    async proxy(params) {
        return this._dispatch('proxy', [params], {input: params}, 'proxy');
    },

    async action(action, value) {
        return this._dispatch('action', [action, value], {input: value}, 'action');
    },

    async sniffer() {
        return this._dispatch('sniffer', [], {}, 'sniffer');
    },

    async isVideo(url) {
        return this._dispatch('isVideo', [url], {input: url, url}, 'isVideo');
    },
};

// 壳子侧分发器：绑定为实例自身属性，优先于 def 原型链上的同名裸钩子（壳子签名稳定）
const SHELL_METHODS = ['init', 'home', 'homeVod', 'category', 'detail', 'play', 'search', 'proxy', 'action', 'sniffer', 'isVideo'];

/**
 * 创建实例：原型链 instance → def 成员 → sourceProto（§4.3.6）。
 * 钩子的 this=实例：def 的辅助方法与实例自定义字段（this.columns=...）经原型可达；
 * 实例内复用钩子逻辑请抽辅助方法（如 readColumns()），经 this.助手名() 调用。
 */
export function createSource(rt, def, opts = {}) {
    const proto = Object.assign(Object.create(sourceProto), def);
    const inst = Object.create(proto);
    sourceProto.initFields.call(inst, rt, def, opts);
    for (const name of SHELL_METHODS) {
        inst[name] = sourceProto[name].bind(inst);
    }
    return inst;
}
