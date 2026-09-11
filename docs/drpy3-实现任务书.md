# drpy3 实现任务书（跨会话执行手册）

> 读者：任何要实现 drpy3 引擎的新会话 agent / 开发者。
> 配套：[drpy3-设计文档.md](./drpy3-设计文档.md)（**设计唯一真相源**，本文只管"怎么干"）。
> 用法：新会话开场说"按 docs/drpy3-实现任务书.md 继续执行 W<N>"即可无缝续作。

---

## 0. 使命与边界

**使命**：实现 drpy3-core（ESM 类库 `src/drpy3/`），使三份演示稿可真实运行：
`docs/百忙无果1-4.js`（声明式/全钩子/模块化/js:片段四形态）、`docs/央视频-1-4.js`（wasm 解密/生命周期/proxy 五元组/action）。

**边界（不做）**：不做 UI；不做源安全沙箱；不做远端 require；不改 TVBox 返回结构；
不重新发明 pdfh/pdfa/pd（HostEnv 注入，参考实现见 drpy2 对接指南 §4.2）。

**铁律**：
1. 设计冲突时以设计文档为准；要改设计先改文档再改码（附录 A 记录了已否决策，禁止重提）。
2. 每个工作包（W）先写验收测试再实现；完成一个提交一个（commit 前缀 `drpy3(W#):`）。
3. 进度表（§4）用 ✅/🚧/⬜ 维护——它是跨会话的唯一进度真相源。

---

## 1. 仓库结构规划

```
src/drpy3/
  index.js            # 导出 Runtime/defineSource/lib
  runtime.js          # Runtime：HostEnv 校验/use()/capabilities（§7）
  lifecycle.js        # 状态机 Cold/Hot/驱逐：LRU+水位+signature 惰性热更（§4.6）
  context.js          # ctx 构造：调用态/实例投影/快捷别名（§4.2/4.5）
  lib/
    net.js parse.js crypto.js text.js utils.js store.js cache.js wasm.js
  rules/
    parseRule.js      # 字符串规则解析器（json:/jsp:/jq:/js: + 一级/二级/搜索语义）
    jsFragment.js     # js: 片段 AsyncFunction 包装 + 老名字参数化注入（§5.3）
  modules/
    loader.js         # 模式 A 原生 loader 接口 / 模式 C 内置 CJS shim（§8）
  compat/
    drpy2.js          # load2x：伪全局映射 + 串行队列（§11）
  errors.js           # 工程化报错 {stage, rule, line, error, hint}（§14.4）
  types/drpy3.d.ts    # 类型面（§14.2）
cli/
  drpy3-test.mjs      # drpy3 test 六环节冒烟 + --record/--replay（§14.3）
test/                 # node:test 单测（每 W 一个测试文件）
docs/fixtures/        # drpy3 test --record 的录制回放数据
```

依赖决策：**库全局复用 `dist/drpy-core-lite.min.js`**（CryptoJS/cheerio/模板/pako/gbkTool/
JSEncrypt/NODERSA/JSON5/jinja 是 drpy2 生态资产，不重造）；drpy3-core 以 peer 方式引用，
纯声明式/增强源经 `import 'drpy3'` 获得封装后的 `lib`。

---

## 2. 运行时对接矩阵（多样化保证）

| 运行时 | 异步档位（§5.4） | 模块模式（§8） | wasm（§6） | store 介质 | 对接顺序 |
|--------|------------------|----------------|-----------|-----------|----------|
| Node ≥22 | 档 A（原生 loop，真并发） | 模式 A（原生 ESM） | native | 文件 JSON | **第 1 个**（开发主环境） |
| QuickJS + python 同步桥（hipy 系） | 档 C（req 同步桥，功能全可用） | 模式 C shim / 预打包 | polywasm | 内存/SQLite | 第 2 个 |
| quickjs-ng | 档 A/B（job 泵） | 模式 A（JS_SetModuleLoaderFunc） | native | 宿主定 | 可选样例 |
| Flutter [fjs](https://github.com/fluttercandies/fjs) | **近档 A**：内置 Promise/timer/fetch 驱动（`JsEvalOptions.withPromise` + `drainUnhandledJobErrors`） | 模式 A 变体：`declareNewModule` 逐个注册模块 | **预计 none**（QuickJS 本体无 wasm）：polywasm 兜底，或 §12.1 性能阶梯第三级——Dart/Rust 原生解密经 bridge 注入 | shared_prefs/SQLite | 第 3 个（跨平台终态） |

fjs 对接要点（基于其 README 核实）：
- 异步：`JsEvalOptions.withPromise()` 允许顶层 await，内置驱动自动推进 job——drpy3 的
  ensureHot/钩子 Promise 链原生可用，宿主只需实现 `fetch`/`timers` builtin 或经 bridge 注入 `req`；
- 注入：`engine.init(bridge:)` 承接 HostEnv 全部函数（JS 侧 `fjs.bridge_call` 进 Dart）——
  req/pdfh/pdfa/pd/store 全走桥，签名对齐 HostEnv 契约即可，drpy3-core 零改动；
- 模块：`declareNewModule` 把源文件与 `./lib/*` 依赖逐个注册（把 §8 模式 A 的 loader 语义
  平移成"宿主预注册"）；
- wasm：`capabilities.wasm` 按 'none' 报告；央视频解密在 Flutter 上二选一：
  polywasm（能跑）或经 bridge 注入原生解密（推荐，§12.1 阶梯第三级）。

---

## 3. 工作包分解（严格按序）

| WP | 内容 | 设计依据 | 验收（可执行） | 状态 |
|----|------|----------|----------------|------|
| W0 | 工程脚手架：`src/drpy3/` 骨架 + node:test 基建 + 复刻 `.smoke/` 为 `test/smoke.mjs`（附录 C 六环节，跑 drpy2 当回归锚） | 附录 C | `node --test test/` 通过（空壳+锚点用例） | ⬜ |
| W1 | Runtime/HostEnv：构造期校验、use() 覆盖、能力查找顺序、capabilities | §7 | 单测：缺注入打印清单；use 覆盖生效；三层查找顺序正确 | ⬜ |
| W2 | ctx 与生命周期：defineSource/纯对象判定/ctx 构造/this 绑定/并发契约/headers 基线/resumed | §4.2-4.5 | 单测：同源双实例对拍不串数据；钩子 this=实例；ctx 快捷别名=lib 投影 | ⬜ |
| W3 | 生命周期治理：LRU+水位驱逐、signature 惰性热更、headers 快照恢复、in-flight 排空 | §4.6 | 单测：驱逐后排空；改源内容→下次调用重建；快照恢复置 resumed | ⬜ |
| W4 | 标准库 net/utils/store/cache：req 适配（同步宿主自动 await）、all、batchFetch 兜底、getProxyUrl | §9 net | 单测：mock req 下 all/batchFetch 语义（按序对齐/单项失败不中断） | ⬜ |
| W5 | 标准库 parse/crypto/wasm：parseRule、pdfl 回退、jp/jinja2/模板接入、ungzip、wasm.load（含 emscripten 垫片接口） | §9/§6 | 单测：'json:...' 规则解析；wasm.load 缓存命中 | ⬜ |
| W6 | 规则引擎 + js: 片段：一级/二级/搜索/lazy 语义 + 老名字参数化注入 + 工程化报错 | §5.3/§9/§14.4 | **里程碑**：百忙无果1.js 六环节跑通（对照附录 C 金标准） | ⬜ |
| W7 | proxy 五元组 + action 通道 | §10.1/§10.2 | 单测：toBytes 1/2/3 分支路由；action 超时与返回透传 | ⬜ |
| W8 | 模块化：CJS shim + 原生 loader 接口 + esbuild `drpy3 build` | §8 | 百忙无果3.js（依赖 ./lib）三模式均可跑 | ⬜ |
| W9 | 兼容层 load2x：伪全局映射 + 串行队列 | §11 | **金标准**：`docs/百忙无果[官].js` 零改动六环节通过 | ⬜ |
| W10 | `drpy3 test` CLI：六环节 + record/replay + 结构化报错 | §14.3 | 百忙无果1-4 与央视频-1/2 全部 test 全绿（fixtures 录制） | ⬜ |
| W11 | 运行时对接：Node 完全体（fetch+cheario+fs store，档 A 真并发） | §5.4 | 并发基准：多请求墙钟 ≤ 串行 50% | ⬜ |
| W12 | 运行时对接：QuickJS 同步桥（档 C；python 或 quickjs 绑定） | §5.4 档C | 百忙无果1 六环节在 QuickJS 内跑通 | ⬜ |
| W13 | 运行时对接：Flutter fjs（bridge 注入 HostEnv + declareNewModule 模块 + polywasm/原生解密决策） | §5.4/§8/§12.1 | 央视频-1 六环节在 fjs 模拟器跑通；capabilities.wasm 报告正确 | ⬜ |

依赖链：W0→W1→W2→W3→(W4,W5)→W6→(W7,W8,W9)→W10→(W11,W12,W13 可并行)。

---

## 4. 进度表（跨会话唯一真相源）

> 完成一个 WP：把 ⬜ 改 ✅（部分完成 🚧 并注明余项），随该 WP 的 commit 一起提交。

- W0 ⬜ ｜ W1 ⬜ ｜ W2 ⬜ ｜ W3 ⬜ ｜ W4 ⬜ ｜ W5 ⬜ ｜ W6 ⬜
- W7 ⬜ ｜ W8 ⬜ ｜ W9 ⬜ ｜ W10 ⬜ ｜ W11 ⬜ ｜ W12 ⬜ ｜ W13 ⬜

---

## 5. 新会话工作法（给 agent 的纪律）

1. **必读顺序**：设计文档 §0-§4（模型）→ §7（注入）→ §9（标准库）→ 本任务书；§5/§6/§8/§10-§15
   按所在 WP 查阅。演示稿 `docs/百忙无果1-4.js`、`docs/央视频-1-4.js` 是 API 的**可执行规范**
   ——实现必须让它们原样跑通，不得改动演示稿来迁就实现。
2. **先测后码**：每个 WP 先把"验收"列翻译成 node:test 用例（先红后绿）。
3. **金标准不可妥协**：W6 百忙无果1、W9 原版百忙无果[官].js、W10 央视频-1——这三个跑不过
   就是不完成，没有"基本能用"。
4. **防跑偏**：附录 A 是已否决策清单（全 native 化/纯配置化 DSL/全局注入回归/把全局名挂回
   globalThis……）；提议与之冲突时先停下向用户说明。
5. **fjs 专项注意**（W13）：其 QuickJS 无原生 wasm（以实测为准，跑 `typeof WebAssembly` 探测
   后回填 capabilities）；异步靠内置驱动，宿主桥只需对齐 HostEnv 契约；模块用 declareNewModule
   预注册而非 loader 回调。
6. **跨会话续作**：本文件 §4 进度表 + git log（`drpy3(W#):` 前缀）即是断点；开场白模板：
   "读 docs/drpy3-实现任务书.md，从进度表第一个 ⬜ 的 WP 继续"。
