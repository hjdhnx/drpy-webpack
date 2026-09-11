# AGENTS.md — drpy-webpack 仓库协作须知

## 本仓库是什么

drpy2 源规则引擎的 webpack/esbuild 打包仓库（`src/drpy2.js` + `dist/drpy-core*.min.js`），
同时承载 **drpy3 下一代引擎的设计与实现**（`docs/` 与 `src/drpy3/`）。

## 关键文档（新会话必读顺序）

1. `docs/drpy3-实现任务书.md` —— **实现执行手册**：工作包分解（W0-W13）、进度表（跨会话真相源）、
   运行时对接矩阵（Node/QuickJS/Flutter fjs）、新会话工作法纪律。实现 drpy3 从这里进。
2. `docs/drpy3-设计文档.md` —— 设计唯一真相源（v0.3）：两层 ctx/生命周期治理/HostEnv/标准库/
   proxy 五元组/action 通道/wasm 托管/Agent-Native。**附录 A 是已否决决策清单，禁止重提**；
   **附录 D 是全生命周期调用链**。
3. `docs/drpy2-移植对接指南.md` —— drpy2 壳子注入契约（含 req 必须同步等实测契约）。
4. `docs/百忙无果[官].js` + 附录 C —— drpy2 基准冒烟金标准；`docs/百忙无果1-4.js`、
   `docs/央视频-1-4.js(+lib)` —— drpy3 四形态演示稿，**是可执行规范，实现不得改它们迁就实现**。

## 工作纪律

- 实现 drpy3：按任务书 WP 顺序，先写验收测试再实现；完成一个 WP 提交一个（`drpy3(W#):` 前缀），
  并更新任务书 §4 进度表。
- 涉及设计变更：先改 `drpy3-设计文档.md` 并在附录 A 记录理由，再改代码。
- 验证命令：`node --test test/*.test.mjs`（本机 Git Bash 下 `node --test test/` 目录参数有兼容问题）；
  drpy3 单测/CLI：`npm run test:drpy3`、`node cli/drpy3-test.mjs <源.js> --replay`；演示稿语法检查可用 `node --check`（ESM）。
- `src/drpy2.js` 与 `dist/` 是 drpy2 现网资产，非任务书范围不要动。
- 本地 `.smoke/` 是 drpy2 冒烟脚手架（已 gitignore，不入库）。

## 环境

Windows + Git Bash；Node >21 <23（node:test 可用，无需装测试框架）；pdfh/pdfa/pd 参考实现
在 `E:\gitwork\drpy-node\libs_drpy\htmlParser.js`（drpy-node 生产实现，勿手写解析器）。
