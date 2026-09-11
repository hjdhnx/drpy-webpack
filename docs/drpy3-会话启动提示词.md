# drpy3 实现会话启动提示词（复制以下全文作为新会话第一条消息）

> 用法：新开会话，工作目录切到本仓库，把下方分隔线内的全文粘贴为第一条消息。
> 适用场景：从零开始实现 drpy3.js 并借助 Node 运行时把两个标杆源走通（对应任务书 W0-W10 + Node HostEnv 最小实现）。

---

你是 drpy3 引擎的实现者。工作目录 `E:\gitwork\drpy-webpack`（Windows + Git Bash，Node ≥21 <23，node:test 可用无需装框架）。

## 使命

实现 drpy3 引擎（任务书 W0-W10 + Node HostEnv 最小实现），最终让两个标杆源在你的 Node 运行时上走通六环节冒烟（init/home/category/search/detail/play）：
1. `docs/百忙无果1.js`（零样板·纯声明式形态）
2. `docs/央视频-1.js`（wasm 解密播放形态）

并让 drpy2 原版 `docs/百忙无果[官].js` 经 load2x 兼容层**零改动**跑通（金标准 C）。

## 开工前必读（按序，不要跳）

1. `AGENTS.md`（仓库协作须知）
2. `docs/drpy3-实现任务书.md` —— 执行手册：W0-W13 工作包与验收标准、§4 进度表（**跨会话唯一进度真相源**）、§2 运行时对接矩阵、§5 工作法纪律
3. `docs/drpy3-设计文档.md` —— 设计唯一真相源。先精读 §0-§4（实例模型/状态管理/API 手感/生命周期）、§7（HostEnv）、§9（标准库）、附录 D（全生命周期调用链）；§5/§6/§8/§10-§15 按所在 WP 查阅。**附录 A = 已否决决策清单，禁止重提**（全 native 化/纯配置化 DSL/全局注入回归/把全局名挂回 globalThis 等）。
4. 演示稿是**可执行规范**：`docs/百忙无果1-4.js`、`docs/央视频-1-4.js`——实现必须让它们原样跑通，**不得修改演示稿来迁就实现**。
5. drpy2 契约参考：`docs/drpy2-移植对接指南.md`（注意其中的 req 同步契约是 drpy2 的；drpy3 的 HostEnv.req 可同步可异步，框架统一 await）。

## 硬性验收（不可妥协）

1. **金标准 A**：`docs/百忙无果1.js` 在你的 Node HostEnv 上六环节全绿（数据形态对照设计文档附录 C）。
2. **金标准 B**：`docs/央视频-1.js` 六环节全绿。wasm 可用桩，但 `lib.wasm.load` 的托管语义（Emscripten 胶水识别/垫片环境/就绪等待/按路径缓存）必须真实现并有单测。
3. **金标准 C**：`docs/百忙无果[官].js` 原版零改动经 load2x 六环节跑通（对照附录 C 实测结果）。
4. **产物纪律**：`src/drpy3/**` 零平台专属导入（禁 `node:` 等），以 `esbuild --platform=neutral` 打包通过为准；Node 专属代码只允许出现在 test/ 与 HostEnv 的 node 实现层。
5. **网络不可达时**：以独立进程的本地 mock 喂真实形状数据完成端到端验证（重要：drpy3 的同步 req 实现会阻塞同进程事件循环，mock 必须独立进程；形态参考本地 `.smoke/` 的 test.mjs/mock.mjs——已 gitignore 但磁盘上有，mock 数据形状与同步 curl 版 req 可照抄思路），并把 mock 响应录制为 fixtures 供后续 `drpy3 test --replay`。

## 资源与参考

- pdfh/pdfa/pd 参考实现：`E:\gitwork\drpy-node\libs_drpy\htmlParser.js`（drpy-node 生产级实现，直接复用/移植；**严禁手写正则解析器**）。
- 库全局复用 `dist/drpy-core-lite.min.js`（CryptoJS/cheerio/模板/pako/gbkTool/JSEncrypt/NODERSA/JSON5/jinja），drpy3 以 peer 方式引用，勿重造。
- 仓库已有 `AGENTS.md` 会自动生效；`src/drpy2.js` 与 `dist/` 是 drpy2 现网资产，非任务书范围不要动。

## 纪律

1. 严格按任务书 WP 顺序（W0→W1→W2→W3→W4/W5→W6→W7/W8/W9→W10），先写验收测试（node:test）再实现，先红后绿。
2. 完成一个 WP：更新任务书 §4 进度表 + commit（前缀 `drpy3(W#):`）+ push——进度表是跨会话断点，续作会话从第一个 ⬜ 继续。
3. `src/drpy3/**` 禁止 `import ... from 'node:*'`；Node 专属代码只允许在 test/ 与 HostEnv 的 node 实现层。
4. 遇设计冲突、或想引入设计文档没有的范式：停下，向用户说明并引用设计文档具体章节，不要自行改设计。
5. 上下文告急时：先把当前 WP 收尾提交、更新进度表，再结束会话——宁可留干净的 🚧 也不要留半成品。

## 完成定义（本会话）

- 任务书 §4：W0-W6 至少全部 ✅；W7-W10 尽力推进，未完成项标 🚧 并注明余项。
- 两个标杆源在 Node 上六环节走通（mock 数据亦可，但必须端到端经过真实 drpy3-core 代码路径）。
- 全部提交并推送 origin/main，进度表与实际状态一致。
