# OCX — OpenCode Extensions

OCX 是 opencode 的组件管理 CLI。管理插件、技能、代理、命令，以及 profile 系统。

`ocx` v2.0.11，位于 `/usr/bin/ocx`。

## 快速开始

```sh
ocx --version                    # 版本
ocx --help                       # 全部命令
ocx config show                  # 查看当前解析后的配置
ocx search <query>               # 搜索 registry 中的组件
```

## 命令参考

### 管理组件

```sh
ocx add alias/component          # 从 registry 安装组件
ocx add npm:package-name         # 安装 npm 插件
ocx add npm:package-name@1.2.3   # 指定版本

ocx add --global alias/component # 安装到全局 ~/.config/opencode
ocx add --profile <name> ...     # 安装到指定 profile
ocx add --dry-run ...            # 预览不执行

ocx remove alias/component       # 移除组件
ocx update                       # 更新所有组件
ocx update alias/component       # 更新指定组件
ocx verify                       # 验证组件完整性
```

### 搜索与列表

```sh
ocx search <query>               # 搜索 registry
ocx list --installed             # 列出已安装组件
ocx list --profile <name>        # 按 profile 过滤
```

### Profile 管理

```sh
ocx profile list --global        # 列出全局 profile
ocx profile show <name> --global # 查看 profile 内容
ocx profile add <name> --global  # 创建新 profile
ocx profile rm <name> --global   # 删除 profile
ocx profile mv <old> <new>       # 重命名 profile
```

现有全局 profile：`as`（当前）、`default`、`omos`。

### 配置

```sh
ocx config show                  # 查看当前完整配置
ocx config edit                  # 在编辑器中打开配置
```

### 启动

```sh
ocx oc                           # 以当前 profile 启动 opencode
ocx opencode                     # 同上
ocx oc -p "prompt"               # 打印模式
```

## Profile 系统架构

```
~/.config/opencode/
  profiles/
    default/                     # 默认 profile
      ocx.jsonc                  # ocx 配置（registries、exclude 模式）
      opencode.jsonc             # opencode 配置覆盖
      AGENTS.md                  # profile 级上下文
    as/                          # "as" profile
      ...
    omos/                        # "omos" profile
      ...
  opencode.jsonc                 # 全局基础配置
  plugins/
    mcp-loader.ts                # 全局插件
    agent-commands.ts
    rtk.ts
```

Profile 的 `opencode.jsonc` 与全局 `opencode.jsonc` **深度合并**。profile 中的插件/权限/模型会叠加到全局之上。

## 与本仓库的关系

本仓库的 `configs/*.conf` 是**人类可读的 profile 定义源**。ocx 的 `~/.config/opencode/profiles/` 是**目标部署位置**。

工作流：

```
configs/code.conf  ──→  scripts/setup.sh  ──→  ocx profile / .opencode/
                          (读取 .conf)           (写入 ocx profile 或直接部署)
```

现在 setup.sh 尚未实现，ocx 可直接管理 opencode 组件：

```sh
ocx add mcp-agent/agent-commands    # 安装 agent-commands 插件
ocx add npm:oc-plugin-caching       # 安装 npm 缓存插件
```

## 参见

- `opencode.md` — opencode 完整配置参考
- `../configs/*.conf` — 本仓库的 profile 定义
