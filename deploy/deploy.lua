#!/usr/bin/env lua
-- AiKit deploy — Lua 版（phase 1 核心功能）
-- 读取 deploy/ 下生成的 manifest.lua / preset.lua；数字菜单交互。
local DEPLOY_DIR = (function()
  local f = io.popen("readlink -f " .. ("'" .. arg[0]:gsub("'", "'\\''") .. "'") .. " 2>/dev/null")
  local a = f and f:read("*a") or ""
  if f then f:close() end
  a = a:gsub("\n$", "")
  local dir = a:gsub("/[^/]+$", "")
  if dir == "" then dir = "." end
  return dir .. "/"
end)()

local ROOT = DEPLOY_DIR:gsub("/[^/]+/$", "/")  -- repo root
if ROOT == DEPLOY_DIR then ROOT = DEPLOY_DIR .. "../" end
local HOME = os.getenv("HOME") or "."

local SECTIONS = { "skills", "agents", "commands", "mcp" }
local TARGET_DIRS = {
  skills = ".agents/skills",
  agents = ".agents/agents",
  commands = ".agents/commands",
  mcp = ".agents/mcp",
}
local STATE_NAME = nil  -- 未使用（不写状态）

local function sh_quote(s)
  return "'" .. tostring(s):gsub("'", "'\\''") .. "'"
end

local function shell(cmd)
  return os.execute(cmd)
end

local function sh_out(cmd)
  local f = io.popen(cmd .. " 2>/dev/null")
  if not f then return nil end
  local out = f:read("*a")
  f:close()
  return out
end

local function exists(p)
  return os.execute("test -e " .. sh_quote(p) .. " 2>/dev/null") == true
end

local function is_dir(p)
  return os.execute("test -d " .. sh_quote(p) .. " 2>/dev/null") == true
end

local function is_link(p)
  return os.execute("test -L " .. sh_quote(p) .. " 2>/dev/null") == true
end

local function realpath(p)
  local out = sh_out("readlink -f " .. sh_quote(p))
  if out and out ~= "" then return out:gsub("\n$", "") end
  return nil
end

local function resolve_path(input)
  local p = input:gsub("^%s+", ""):gsub("%s+$", "")
  if p == "" then return nil end
  if p == "~" then p = HOME
  elseif p:sub(1, 2) == "~/" then p = HOME .. p:sub(2)
  elseif p:sub(1, 1) ~= "/" then p = (os.getenv("PWD") or ".") .. "/" .. p
  end
  local r = realpath(p)
  if r then return r end
  return p
end

local function mkdir_p(p)
  return os.execute("mkdir -p " .. sh_quote(p)) == true
end

local function symlink(src, dst)
  return os.execute("ln -s " .. sh_quote(src) .. " " .. sh_quote(dst)) == true
end

local function timestamp()
  return os.date("%Y%m%d-%H%M%S")
end

local function load_data(name)
  local path = DEPLOY_DIR .. name
  local f = io.open(path, "r")
  if not f then
    io.stderr:write("missing " .. path .. " — run: python3 deploy/deploy.py gen-lua\n")
    os.exit(1)
  end
  f:close()
  local chunk = loadfile(path)
  if not chunk then
    io.stderr:write("bad lua data: " .. path .. "\n")
    os.exit(1)
  end
  return chunk()
end
local function readline(prompt, default)
  io.write(prompt)
  if default and default ~= "" then io.write(" [" .. default .. "]") end
  io.write(": ")
  io.flush()
  local line = io.read("l")
  if not line then return nil end
  line = line:gsub("^%s+", ""):gsub("%s+$", "")
  if line == "" and default then return default end
  return line
end

local function confirm(prompt, default_yes)
  io.write(prompt)
  if default_yes then io.write(" [Y/n]: ") else io.write(" [y/N]: ") end
  io.flush()
  local a = io.read("l")
  if not a then return false end
  a = a:lower()
  if a == "" then return default_yes end
  return a == "y" or a == "yes"
end

local function menu(title, items)
  print("\n" .. title)
  for i, it in ipairs(items) do
    print(string.format("  %d. %s", i, it))
  end
  local n = readline("选择编号")
  if not n then return nil end
  local idx = tonumber(n)
  if not idx or idx < 1 or idx > #items then return nil end
  return idx
end

local function item_text(item)
  return string.format("[%s] %s  cat=%s  tags=%s  %s",
    item.sec or "", item.id, item.category or "", table.concat(item.tags or {}, ","), item.description or "")
end

local function multi_menu(title, items, selected)
  local filter = ""
  local function visible()
    local vis = {}
    local f = filter:lower()
    for i, it in ipairs(items) do
      local ok = true
      if f ~= "" then
        if f:sub(1, 4) == "cat:" then
          ok = ((it.category or ""):lower() == f:sub(5):gsub("^%s+", ""):gsub("%s+$", ""))
        elseif f:sub(1, 4) == "tag:" then
          local want = f:sub(5):gsub("^%s+", ""):gsub("%s+$", "")
          ok = false
          for _, t in ipairs(it.tags or {}) do
            if t:lower() == want then ok = true break end
          end
        else
          ok = item_text(it):lower():find(f, 1, true) ~= nil
        end
      end
      if ok then vis[#vis + 1] = i end
    end
    if #vis == 0 then for i = 1, #items do vis[#vis + 1] = i end end
    return vis
  end
  while true do
    print("\n" .. title)
    if filter ~= "" then print("filter: " .. filter .. "  (/ 改过滤, c 清除; cat:/tag: 支持)") end
    local vis = visible()
    for di, fi in ipairs(vis) do
      local it = items[fi]
      print(string.format("  %3d %s %s", di, selected[fi] and "[x]" or "[ ]", item_text(it)))
    end
    print("编号(逗号分隔)切换, a=全选, n=清空, ENTER/d=完成, q=取消, /=过滤(cat:/tag:)")
    local line = readline("选择")
    if not line or line == "q" then return nil end
    if line == "" or line == "d" then return selected end
    if line == "/" then
      filter = readline("filter") or ""
    elseif line == "c" then
      filter = ""
    elseif line == "a" then
      for _, fi in ipairs(vis) do selected[fi] = true end
    elseif line == "n" then
      for _, fi in ipairs(vis) do selected[fi] = false end
    else
      for tok in line:gmatch("[^,%s]+") do
        local idx = tonumber(tok)
        if idx and idx >= 1 and idx <= #vis then
          selected[vis[idx]] = not selected[vis[idx]]
        end
      end
    end
  end
end

local function expand_preset(pre, manifest)
  local out = {}
  local function add(e)
    for _, x in ipairs(out) do if x == e then return end end
    out[#out + 1] = e
  end
  local kits = pre.kits
  local has_refs = (#(pre.skills or {}) + #(pre.agents or {}) + #(pre.commands or {}) + #(pre.mcp or {})) > 0
  if not kits or #kits == 0 then
    if not has_refs and pre.kit and pre.kit ~= "" then kits = { pre.kit } end
  end
  for _, kit in ipairs(kits or {}) do
    for _, sec in ipairs(SECTIONS) do
      for _, e in ipairs(manifest[sec] or {}) do
        if e.kit == kit then add(e) end
      end
    end
  end
  for _, sec in ipairs(SECTIONS) do
    for _, ref in ipairs(pre[sec] or {}) do
      for _, e in ipairs(manifest[sec] or {}) do
        if e.id == ref or (pre.kit and e.kit == pre.kit and e.id:match("^" .. pre.kit .. ":(.*)$") == ref) then
          add(e)
        end
      end
    end
  end
  return out
end

local function link_name(path)
  return path:match("([^/]+)$")
end

local function target_for(e, root)
  return root .. "/" .. TARGET_DIRS[e._sec] .. "/" .. link_name(e.path)
end

local conflict_choice = nil

local function deploy_one(e, root)
  local src = ROOT .. e.path
  local dst = target_for(e, root)
  if not exists(src) then
    print("  [error] source missing: " .. src)
    return "error"
  end
  if is_link(dst) and realpath(dst) == realpath(src) then
    print("  [ok] up-to-date: " .. dst)
    return "uptodate"
  end
  if exists(dst) or is_link(dst) then
    local action
    if conflict_choice then
      action = conflict_choice
    else
      local a = readline("  冲突(对所有冲突生效): " .. dst .. "\n  [s]kip all/[o]verwrite all/[b]ackup all?")
      if a then action = a:lower():sub(1, 1) else action = "s" end
      conflict_choice = action
    end
    if action == "s" then
      print("  [skip] " .. dst)
      return "skip"
    elseif action == "o" then
      if not is_link(dst) and is_dir(dst) then
        local has = sh_out("ls -A " .. sh_quote(dst) .. " 2>/dev/null | head -1")
        if has and has ~= "" then
          local c = confirm("  非空目录，确认删除?", false)
          if not c then return "skip" end
        end
      end
      os.execute("rm -rf " .. sh_quote(dst))
    elseif action == "b" then
      local bp = dst .. ".bak-" .. timestamp()
      os.execute("mv " .. sh_quote(dst) .. " " .. sh_quote(bp))
      print("  [backup] " .. bp)
    else
      print("  [skip] " .. dst)
      return "skip"
    end
  end
  local parent = dst:gsub("/[^/]+$", "")
  mkdir_p(parent)
  if symlink(src, dst) then
    print("  [ok] " .. dst)
    return "ok"
  else
    print("  [error] symlink failed: " .. dst)
    return "error"
  end
end

local function cmd_list(manifest, cats, tags)
  for _, sec in ipairs(SECTIONS) do
    local entries = manifest[sec] or {}
    if cats or tags then
      local kept = {}
      for _, e in ipairs(entries) do
        local ok = true
        if cats then
          ok = false
          for _, c in ipairs(cats) do if (e.category or "") == c then ok = true break end end
        end
        if ok and tags then
          ok = false
          for _, t in ipairs(tags) do
            for _, et in ipairs(e.tags or {}) do if et == t then ok = true break end end
            if ok then break end
          end
        end
        if ok then kept[#kept + 1] = e end
      end
      entries = kept
    end
    print(string.format("\n[%s] %d", sec, #entries))
    for _, e in ipairs(entries) do
      print(string.format("  %-40s cat=%-12s tags=%s", e.id, e.category or "", table.concat(e.tags or {}, ",")))
      print("    " .. (e.description or ""))
    end
  end
end

local function cmd_doctor(manifest)
  local bad = 0
  for _, sec in ipairs(SECTIONS) do
    for _, e in ipairs(manifest[sec] or {}) do
      if not exists(ROOT .. e.path) then
        print("[FAIL] missing path: " .. e.path .. " (" .. e.id .. ")")
        bad = bad + 1
      end
    end
  end
  if bad == 0 then print("[OK] doctor") end
  return bad > 0 and 1 or 0
end

local function run_tui(manifest, presets)
  local idx = menu("目标", { "project", "global", "quit" })
  if not idx or idx == 3 then return 0 end
  local root
  if idx == 2 then
    root = HOME
  else
    local p = readline("项目路径", ".")
    if not p then return 0 end
    root = resolve_path(p)
    if not root or not is_dir(root) then
      print("不是目录: " .. tostring(root))
      return 1
    end
  end

  local selected = {}
  local function sel(e)
    for _, x in ipairs(selected) do if x == e then return end end
    selected[#selected + 1] = e
  end

  -- preset 多选
  if #presets > 0 then
    local items = {}
    for i, p in ipairs(presets) do
      local it = { sec = "preset", id = p.id, category = p.kit or "", tags = p.kits or {}, description = p.description or "" }
      items[i] = it
    end
    local chosen = {}
    for i = 1, #items do chosen[i] = false end
    local res = multi_menu("Preset 多选", items, chosen)
    if not res then return 0 end
    for i = 1, #presets do
      if res[i] then
        for _, e in ipairs(expand_preset(presets[i], manifest)) do sel(e) end
      end
    end
  end

  -- 分阶段选择：skills -> agents -> commands -> mcp
  for _, sec in ipairs(SECTIONS) do
    local entries = manifest[sec] or {}
    if #entries > 0 then
      for _, e in ipairs(entries) do
        e._sec = sec
      end
      local items = {}
      for i, e in ipairs(entries) do
        local it = { sec = sec, id = e.id, category = e.category or "", tags = e.tags or {}, description = e.description or "" }
        items[i] = it
      end
      local chosen = {}
      for i, e in ipairs(entries) do
        chosen[i] = false
        for _, s in ipairs(selected) do if s == e then chosen[i] = true break end end
      end
      local res = multi_menu("[" .. sec .. "] 选择资源", items, chosen)
      if not res then return 0 end
      -- 合并：保留其他 sec 已选，替换本 sec 选择
      local newsel = {}
      for _, s in ipairs(selected) do
        if s._sec ~= sec then newsel[#newsel + 1] = s end
      end
      selected = newsel
      for i = 1, #entries do
        if res[i] then selected[#selected + 1] = entries[i] end
      end
    end
  end

  if #selected == 0 then
    print("未选择资源")
    return 0
  end

  print("\n预览:")
  for _, e in ipairs(selected) do
    local src = ROOT .. e.path
    local st = exists(src) and "OK" or "MISSING"
    print(string.format("  %-8s %-40s -> %s", st, e.id, target_for(e, root)))
  end
  if not confirm("部署?", true) then return 0 end

  for _, e in ipairs(selected) do
    deploy_one(e, root)
  end
  print("完成")
  return 0
end

-- main
local function cmd_scan()
  local manifest_paths = {}
  for _, sec in ipairs(SECTIONS) do
    for _, e in ipairs(manifest[sec] or {}) do manifest_paths[e.path] = true end
  end
  local ignore = { [".git"] = true, ["node_modules"] = true, ["__pycache__"] = true,
                   [".opencode"] = true, ["templates"] = true }
  local dirs = {}
  for line in sh_out("ls -d " .. sh_quote(ROOT) .. "*/ 2>/dev/null"):gmatch("[^\n]+") do
    local d = line:gsub("/$", "")
    if exists(d .. "/manifest.toml") then dirs[#dirs + 1] = d end
  end
  local discovered = {}
  for _, base in ipairs(dirs) do
    local kit = base:match("([^/]+)$")
    for _, sec in ipairs(SECTIONS) do
      local b = base .. "/" .. sec
      if is_dir(b) then
        for name in sh_out("ls -A " .. sh_quote(b) .. " 2>/dev/null"):gmatch("[^\n]+") do
          if name:sub(1, 1) ~= "." and not ignore[name] then
            discovered[kit .. "/" .. sec .. "/" .. name] = true
          end
        end
      end
    end
  end
  local added, removed, n_add, n_rem = {}, {}, 0, 0
  for p in pairs(discovered) do
    if not manifest_paths[p] then n_add = n_add + 1; added[#added + 1] = p end
  end
  for _, sec in ipairs(SECTIONS) do
    for _, e in ipairs(manifest[sec] or {}) do
      if not discovered[e.path] then n_rem = n_rem + 1; removed[#removed + 1] = e.path end
    end
  end
  local function count(t) local n = 0 for _ in pairs(t) do n = n + 1 end return n end
  print(string.format("scan: discovered %d paths; manifest has %d", count(discovered), count(manifest_paths)))
  print(string.format("\n[+] in filesystem, not in manifest (%d):", n_add))
  for _, p in ipairs(added) do print("    " .. p) end
  print(string.format("\n[-] in manifest, missing on disk (%d):", n_rem))
  for _, p in ipairs(removed) do print("    " .. p) end
  if n_add == 0 and n_rem == 0 then print("\nin sync") end
  return (n_add > 0 or n_rem > 0) and 1 or 0
end

local cmd = arg[1]
local cats, tags, root_arg, want_write = {}, {}, nil, false
for i = 2, #arg do
  local a = arg[i]
  if a == "--cat" and arg[i + 1] then cats[#cats + 1] = arg[i + 1] end
  if a == "--tag" and arg[i + 1] then tags[#tags + 1] = arg[i + 1] end
  if a == "--write" then want_write = true end
  if a:sub(1, 2) ~= "--" and not root_arg then root_arg = a end
end

if cmd == "gen-lua" then
  io.stderr:write("请使用 python3 deploy/deploy.py gen-lua\n")
  os.exit(1)
end

local manifest = load_data("manifest.lua")
local presets_data = load_data("preset.lua")
local presets = presets_data.preset or {}

if cmd == "scan" then
  if want_write then
    io.stderr:write("Lua 版仅诊断；写回请用: python3 deploy/deploy.py scan --write\n")
  end
  os.exit(cmd_scan())
elseif cmd == "list" then
  cmd_list(manifest, #cats > 0 and cats or nil, #tags > 0 and tags or nil)
elseif cmd == "doctor" then
  os.exit(cmd_doctor(manifest))
else
  os.exit(run_tui(manifest, presets))
end
