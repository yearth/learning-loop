# Mission: Codex Harness 概念地图

## Why

OpenAI 把 Codex 的 agent 内核开源了（openai/codex，Rust 实现的 codex-rs workspace）：CLI、桌面 App、IDE 扩展共用这一套内核。我重度使用 coding agent，也整理过 harness engineering 的概念框架，但还没系统理解过任何一个生产级 harness 的内部构造。目标：把"概念框架"落到"真实实现"上——以后遇到任何 harness 机制问题，能说出 Codex 怎么解决、证据在哪个 crate、取舍是什么。

## Success looks like

- 对任一机制问题（沙箱拦截、会话恢复、工具结果回填、上下文预算），能说出 Codex 的解法、所在 crate 与大致取舍。
- 默画出 codex-rs 分层地图：入口层（cli / tui / exec / app-server / mcp-server）→ 内核（core / protocol / tools）→ 基础设施（sandboxing / rollout / …），并解释这样切分的理由。
- 用 harness engineering 框架（context / tools / permissions / proof / feedback）逐项映射 Codex 的具体机制。
- 与 DSH / Claude Code 对照同一机制的不同设计时，能基于结构而非参数下判断。
- 能在 137 个 crate 的仓库里快速定位某机制的实现位置（不要求读懂 Rust 细节）。

## Constraints

- 概念级理解：以机制与取舍为主线，不学 Rust 语法；源码仅作证据锚点（crate / 文件 / 类型名）。
- 每课 15-25 分钟，一课一个可完成的小目标，含预测与检索练习。
- 事实以一手来源为准：openai/codex 仓库与 OpenAI 官方文档；二手材料只做导览。
- 教学语言中文，术语保留英文原名。

## Out of scope

- Rust 语言学习（除非某机制非懂语法不可）。
- 向 codex-rs 贡献代码或深度二次开发。
- Codex 的使用技巧与工作流（橙皮书已覆盖，不重复）。
- 其他 harness 的完整源码课。
