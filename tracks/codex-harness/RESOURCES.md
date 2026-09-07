# Codex Harness Resources

一手来源优先。仓库类事实以 openai/codex 为准；事实口径随课程推进在此登记。

## Knowledge

- [Repo: openai/codex — GitHub](https://github.com/openai/codex)
  Codex agent 内核本体，Apache-2.0，Rust workspace `codex-rs`（137 个 crate，口径 2026-08）。Use for: 一切机制问题的一手证据；crate 结构、类型定义、设计原则（根目录 AGENTS.md 记录了 context 纪律等内部工程规则）。
- [File: codex-rs/Cargo.toml — workspace members](https://github.com/openai/codex/blob/main/codex-rs/Cargo.toml)
  全部 crate 清单。Use for: 分层地图的事实底账。
- [File: codex-rs/protocol/src/protocol.rs](https://github.com/openai/codex/blob/main/codex-rs/protocol/src/protocol.rs)
  `Op` 与 `EventMsg` 两个枚举：前端与内核之间的操作/事件词汇表。Use for: 理解"协议层"到底协议了什么。
- [File: codex-rs/app-server/README.md](https://github.com/openai/codex/blob/main/codex-rs/app-server/README.md)
  app-server 协议文档：JSON-RPC 2.0、stdio / websocket / unix 传输、生命周期、审批、事件。Use for: CLI / App / IDE 如何共用一个内核。
- [File: codex-rs/execpolicy/README.md](https://github.com/openai/codex/blob/main/codex-rs/execpolicy/README.md)
  审批判定引擎的规则语言：Starlark 语法 prefix_rule、decision = allow / prompt / forbidden、match/not_match 随规则自带的单元测试。Use for: 权限层"怎么判"的一手说明。
- [Repo: bazelbuild/starlark](https://github.com/bazelbuild/starlark)
  Starlark 语言官方仓库（README 讲设计原则）。Use for: execpolicy 规则语言的出身——Python 方言、确定性、hermetic（无文件/网络/时钟访问），为 Bazel 安全执行不可信构建文件而设计。
- [Docs: OpenAI Codex 官方文档站](https://developers.openai.com/codex)
  安装、认证、安全模型、执行策略、非交互模式等主题（仓库 docs/ 下 sandbox.md、execpolicy.md、exec.md 均跳转至此）。Use for: 产品级语义与安全模型（/codex/security、/codex/exec-policy、/codex/noninteractive）。
- [Book: Codex 橙皮书 — 非官方中文指南](https://vink567.github.io/codex-orange-book/)
  产品视角的 Codex 全景：App / CLI / IDE / Web、自动化、Skill、MCP、云端。Use for: 使用层背景；本 track 只在机制课需要对照产品行为时引用。

## Wisdom (Communities)

- [openai/codex Discussions](https://github.com/openai/codex/discussions)
  官方仓库讨论区。Use for: 设计动机问答、机制变化的公告口径。
- [openai/codex Issues](https://github.com/openai/codex/issues)
  Use for: 具体机制的缺陷与演进讨论；判断"这是 bug 还是设计"之前先查这里。

## Gaps

- 尚未找到一篇经过验证的第三方 codex-rs 架构深度解析（中/英文）可作导览——找到再收录。
- 官方文档站暂无独立的 architecture 页；app-server/README.md 是最接近的子系统级文档。
