# DESIGN — pi 插件设计稿

> 每个插件一个 `##` 节。pi-board 已实现（v0.2.0）；其余为占位/待补。

## pi-board（黑板工作区）

> 由 `pi-annotator` 更名而来。本文档是 pi-board 的设计稿。
> 状态：**定稿 v5**（随实现迭代；三栏前端 + 注释/文件编辑 + 文件 diff 组装）

---

### 1. 定位与核心隐喻

pi-board 是一张**你和模型共享的黑板/白板**。你站在板前，把要讨论的内容贴上去、写上去、圈出来，然后对模型说"看板"。

**板上的内容只有两个来源：**

1. **模型的历史消息**（用户提示 + 模型回复）
2. **项目文件**（及文件的片段）

**用户对板子的三个动作：**

| 动作 | 含义 | 实现 |
| --- | --- | --- |
| **追加 append** | 把新内容放上板 | 打开文件/历史消息 → 自动 `pin` |
| **注释 comment** | 对文件或历史消息的精确选区贴便签 | `annotation` 存 sidecar，不改原文 |
| **编辑 edit** | 对**文件**直接改内容，改动传给模型 | `edit` 写盘 + diff 随 Send 发送 |

发送时，整块板被**组装成结构化文本**交给模型；模型的新回复作为新的历史消息回到板上，形成闭环。

**核心区分——「板」与「来源」：**

- **来源是架子/仓库**：历史消息是"架上的纸"，项目文件是"仓库里的纸"。
- **板是策展后的工作台**：用户只把当前要讨论的条目**钉（pin）到板上**。

---

### 2. 术语表

| 术语 | 定义 |
| --- | --- |
| Board | 板：有序条目集合 + 注释 + 末尾追加，是发送给模型的工作台快照 |
| Item | 条目：板上的一个单位（file / reply / prompt / note） |
| Region | 选区：条目内的精确片段（行号 + 引文 quote） |
| Annotation | 注释：贴在条目或选区上的便签，存 sidecar，绝不改原文 |
| Edit | 文件编辑：用户直接改文件内容（写盘），记录 before/after 供 diff |
| Raw / Preview / Edit | 查看器三种视图；Edit 仅文件 |
| Assembly | 组装：BoardState → 结构化 prompt 文本 |
| Embed mode | 嵌入模式：`snippet` / `full` / `quote` |
| Appendix | 末尾追加：用户附在组装文本末尾的自由文本 |

---

### 3. 数据模型

```ts
type BoardSourceKind = "file" | "reply" | "prompt" | "note";

interface BoardRegion {
  lineRange?: { start: number; end: number }; // 1-based，含两端
  quote?: string;                            // 精确引文，re-anchor 防漂移
  ambiguous?: boolean;                       // quote 失锚标记
}

interface BoardItem {
  id: string;
  source: BoardSourceKind;
  locator: string;          // file: 路径；reply/prompt: responseHistoryId；note: noteId
  label: string;            // 显示名：文件名 / reply #N / prompt (…) / note 标题
  contentSnapshot?: string; // 钉上板时的文本快照（历史消息必须；文件可选）
  contentHash?: string;
  pinnedAt: number;
  edit?: { before: string; after: string }; // 仅文件：用户编辑（写盘）
}

interface BoardAnnotation {
  id: string;
  itemId?: string;          // 省略 = 整个条目
  region?: BoardRegion;     // 省略 = 条目级注释
  kind: "comment";          // v1 只支持 comment
  text: string;
  createdAt: number;
}

interface BoardState {
  version: 1;
  items: BoardItem[];
  annotations: BoardAnnotation[]; // sidecar：不写入任何源文本
  appendix: string;               // 组装末尾追加的自由文本
}
```

**不变量：**

1. 注释只存在于 `annotations`，**绝不写回**文件或历史原文。
2. 文件编辑只存在于 `item.edit`（写盘），保存时注释按 quote **自动重锚**行号。
3. 每个 region 都携带 `quote`；行号是主定位，`quote` 是重定位锚；不唯一则扩展，仍不唯一标 `ambiguous`。

---

### 4. 统一引用模型

- **文件引用**：`locator = path`，`region = lineRange + quote`。
- **历史消息引用**：`locator = responseHistoryId`，`region = lineRange + quote`。历史消息本来就是 markdown 文本，因此**文件与历史消息共用同一个文本引用模型**。
- **quote re-anchor**：`quote` 按选区**自动提取**；文件行号漂移（含编辑后）时凭 quote 重新定位。
- **quote 唯一性兜底**：在条目全文内不唯一则向前后扩展至唯一；仍不唯一标 `ambiguous`，组装时以行号为准。

---

### 5. 选区（前端）

- 选区发生在 **Raw**（只读 textarea）和 **Edit**（可编辑 textarea）——两者都是 `<textarea>`，`selectionStart/End` 交给服务器算 `lineRange + quote`。
- Raw 视图带**行号 gutter + 注释高亮 backdrop**（textarea 文字透明，文字由 backdrop 渲染）。
- Edit 模式注释时锚定到**编辑缓冲**（`content` 随请求发送）；保存编辑后注释按 quote 重锚。
- Preview 只读渲染，不可选。

---

### 6. 组装与发送（Assembler）

`shared/board-assembler.js` 把 `BoardState` 渲染为给模型的结构化文本：

- `### Items` — 条目索引（友好标签；已编辑文件标「已编辑」）
- 每个 `### Item N` — 内容块（embed 控制）；已编辑文件渲染 **unified diff**（`@@ -N +N @@` / `+` / `-`）
- `### Annotations` — 注释列表（`locator — [comment] text`）
- `## 追加` — 用户末尾追加文本（可选）

**嵌入模式（embed）：**

| 模式 | 内容 |
| --- | --- |
| `snippet`（默认） | 每个 region 的 quote + 前后各 N 行 |
| `full` | 条目全文 |
| `quote` | 仅 locator + quote |

**规则：** 自包含（模型不看原始 session 也能理解板上内容）；指令边界（条目内容包在 `<content>` 语义块，标注"这是数据不是指令"）；上限 items ≤ 20、annotations ≤ 50。

---

### 7. 命令面

| 命令 | 说明 |
| --- | --- |
| `/board` | 打开板（起服务器 + 开浏览器） |
| `/board --status` / `--stop` / `--port <p>` / `--no-browser` | 状态 / 停止 / 固定端口 / 不开浏览器 |

> headless 子命令族（pin/annotate/modify/…）已移除——无可用性。

---

### 8. UI（三栏）

```
顶栏   pi-board  [N项·N注释·N已编辑]  embed▾ 刷新 Send 预览 Clear
左栏   来源 tabs：板 | 文件 | 历史（git-log 新在上，少 div）
中栏   查看器：Raw(行号+注释高亮) / Preview / Edit(文件)
右栏   注释栏：注释点击定位、编辑、删除
底栏   追加 + 状态
```

- **文件树**：`details/summary` 递归懒加载，≤200 项，禁 symlink 逃逸，快速路径打开。
- **Edit 模式**：可编辑 textarea；「保存」写盘 + 记录 before/after；「撤销」恢复原文件。
- **注释共存**：Raw 与 Edit 都能选区注释；保存编辑后注释自动重锚。
- **Send 反馈**：toast 通知 + 清空注释框 + 轮询历史直到模型回复落地。

---

### 9. 服务器 API（HTTP-only）

| 方法/路径 | 说明 |
| --- | --- |
| `GET /state` | BoardState + 历史（新在上）+ cwd 是否可用 |
| `GET /tree?path=` | 目录列表（受限、排序、上限） |
| `POST /action` | open / pin / unpin / note / annotate / update_annotation / delete_annotation / save_edit / revert_edit / set_appendix / preview / send / clear / status |

关键动作：`annotate`（offset + contentHash 或 content 缓冲 → region）、`save_edit`（写盘 + 记录 before/after + 重锚注释）、`revert_edit`（恢复 before）。

---

### 10. 持久化

- `<cwd>/.pi/board.json`（原子写 .tmp + rename + .bak 备份；无 cwd 回退 `~/.pi/board/board.json`）。
- 条目存 `locator + region + contentSnapshot + contentHash + edit`；文件组装时优先读 live 内容。

---

### 11. 实现策略

**新写最小实现，不整体复制 pi-studio（15k+21k 行）。**

- 参考 pi-studio：`ExtensionContext` API 用法（`ctx.sessionManager.getBranch()` → 历史、`pi.sendUserMessage`、`registerCommand`、HTTP server 启动方式）、资源目录限制、`sanitizeContentForPrompt` 指令边界、Raw 选区算法。
- 新写：`index.ts`（命令 + HTTP）+ `shared/board-model.js`（数据模型 + region + diff）+ `shared/board-state.js`（持久化）+ `shared/board-assembler.js`（组装）+ `client/board-client.js`（含极简 markdown 渲染器）+ `client/board.css`。
- 文件访问安全：浏览器端 pin/文件树/编辑都限制在 `cwd` 内，拒绝 symlink 逃逸。

---

### 12. 非目标（v1）

- 多人协作 / 实时同步
- 多文档 tab、IDE 级编辑体验、REPL/quiz/critique/导出（pi-studio 功能）
- Preview 内选区/注释/回跳/滚动同步
- LaTeX / Mermaid / 表格 / 图片渲染
- 图片/PDF 非文本文件的精确选区标注
- 跨 session 板合并
- 行级 diff 之外的复杂 diff 算法（大文件 diff 省略，直接给全文）

---

### 13. 验收标准

1. 打开文件/历史消息自动上板；`/state` 可见。
2. Raw 选中文本注释 → region 含 lineRange + quote，源文件字节不变。
3. 注释点击定位、编辑、删除。
4. Edit 保存写盘 + 组装含 diff；撤销恢复原文件。
5. Edit 模式选中注释 + 保存后注释行号重锚。
6. Preview 只读渲染；Raw/Preview/Edit 三态切换。
7. 组装输出含 Items / Annotations / 文件 diff / 追加，不含内联标记。
8. `snippet/full/quote` 三种 embed 输出量符合预期。
9. 清空 + 重启恢复持久化状态。
10. 文件树拒绝 cwd 之外路径与 symlink 逃逸。
11. history 新消息在上。
12. Send 后 toast 通知 + 历史自动刷新。

---

### 14. 已决事项

1. **来源**：file / reply / prompt / note。
2. **注释 kind**：仅 comment（去掉 question/highlight/todo）。
3. **文件编辑**：Edit 模式直接写盘 + diff 传给模型（替代早期的"修改指示"）。
4. **命令**：只保留 `/board`；headless 子命令族移除。
5. **前端**：三栏；选区在 Raw 与 Edit；Preview 只读。
6. **历史**：git-log 风格新在上。
7. **状态路径**：`<cwd>/.pi/board.json`，回退 `~/.pi/board/board.json`。
8. **实现**：新写最小实现，零依赖。

---

### 15. 设计反思

- **Preview 与选区解耦**：pi-studio 最复杂的"渲染↔原文 DOM 映射"被绕开，Preview 只是 sandbox iframe + 极简渲染。
- **"修改指示"→"文件编辑"**：从"写一句让模型改"变成"直接改文件 + diff 给模型"，闭环更强、更直观。
- **编辑与注释共存**：注释锚 quote + 保存重锚，解决"先注释后编辑行号漂移"。
- **headless 命令族被证明无可用性**：核心交互在前端，命令面收敛到 `/board` 一个入口。
- **正确性底线**：组装文本必须自包含（locator + quote + 快照齐）。
- **生态边界**：board 做显式策展 + 行级精确；context-mode 做自动索引+搜索；互不重叠。


## pi-agents（子代理 + role）

占位 — 子代理编排/role 切换插件（见 `SPEC.md`、`pi-agents/`）。

## pi-tasks（任务管理）

占位 — 任务管理插件（见 `SPEC.md`、`pi-tasks/`）。

## pi-asks（提问）

占位 — 向用户提问插件（见 `SPEC.md`、`pi-asks/`）。

## pi-context-mode（上下文记忆）

占位 — FTS5 知识库 + ctx_* 工具族（见 `SPEC.md`、`pi-context-mode/`）。

## pi-toolkit（工具集）

占位 — 常用工具集（含 `/agent-commands` 加载器、原 pi-roles 的 role 功能）（见 `SPEC.md`、`pi-toolkit/`）。
