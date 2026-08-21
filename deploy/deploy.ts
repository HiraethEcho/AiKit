/**
 * deploy/deploy.ts — AiKit 部署工具（TypeScript 版）
 *
 * 这段代码是给你（编程初学者）看的，所以注释写得非常详细、啰嗦。
 * 目标是：你能读懂每一行「在做什么」以及「为什么」。
 *
 * 用法（在 deploy/ 目录里）：
 *   npm install          # 先装依赖（一次即可）
 *   npm run list         # 列出所有 skills/agents/commands/mcp
 *   npm run doctor       # 检查 manifest 里写的路径是否真实存在
 *   npm run gen          # 把 manifest.toml 转成 manifest.json（给本脚本读）
 *   npm run deploy       # 交互式部署
 */

// ---------------------------------------------------------------------------
// 第 1 步：导入我们要用到的「工具」（Node 自带的功能包）
// ---------------------------------------------------------------------------
import { readFile, writeFile, symlink, mkdir, access, realpath, rm, rename } from 'node:fs/promises';
// 这些是 Node 提供的「文件系统」函数，都是异步的（async），后面会讲。
import { basename, dirname, isAbsolute, join, resolve } from 'node:path';
// 处理「路径」的工具：拼路径、取文件名、转绝对路径等。（我们不 import readline，见下方自定义输入）
import { parse } from 'smol-toml';
// smol-toml 用来把 .toml 文本解析成 JS 对象。npm 里装的第三方包。

// ---------------------------------------------------------------------------
// 第 2 步：定义常量（这些值不会变，所以叫 constant）
// ---------------------------------------------------------------------------
import { fileURLToPath } from 'node:url';

// __dirname 是 CommonJS 的老写法，在 ESM（我们用的）里没有。
// 所以要用 fileURLToPath 自己算出来「当前文件所在的文件夹」。
const currentFile = fileURLToPath(import.meta.url); // "/home/.../deploy/deploy.ts"
const DEPLOY_DIR = dirname(currentFile);            // "/home/.../deploy"
const ROOT = resolve(DEPLOY_DIR, '..');             // 仓库根，deploy/ 的上一级

// 部署时，每种资源要放进目标项目的哪个子目录。
const TARGET_DIRS: Record<string, string> = {
  skills: '.agents/skills',
  agents: '.agents/agents',
  commands: '.agents/commands',
  mcp: '.agents/mcp',
};

// 所有资源的「类型」。Record 表示「对象，key 是字符串」。
const SECTIONS = ['skills', 'agents', 'commands', 'mcp'] as const;

// ---------------------------------------------------------------------------
// 第 3 步：告诉 TypeScript 数据「长什么样」（这叫 interface / 类型）
// ---------------------------------------------------------------------------
// interface 就是「约定一个对象的形状」。这里规定：一个资源必须有这些字段。
interface Resource {
  id: string;          // 唯一标识，例如 "paperkit:math-beamer"
  kit: string;         // 来自哪个 kit，例如 "paperkit"
  category: string;    // 分类，例如 "math"
  tags: string[];      // 标签，是一个字符串数组
  path: string;        // 源文件相对仓库根的位置
  description: string; // 描述
}

interface Preset {
  id: string;
  kit: string;
  description: string;
  kits: string[];
  skills: string[];
  agents: string[];
  commands: string[];
  mcp: string[];
}

// Manifest 就是「整个资源清单」，按类型分组。
interface Manifest {
  version: string;
  skills: Resource[];
  agents: Resource[];
  commands: Resource[];
  mcp: Resource[];
}

// ---------------------------------------------------------------------------
// 第 4 步：小工具函数（helper）—— 都是一些可复用的短逻辑
// ---------------------------------------------------------------------------

// async 表示「异步函数」：它需要等文件读完才继续，所以返回的是 Promise。
async function readJson<T>(file: string): Promise<T> {
  const text = await readFile(file, 'utf-8'); // 读文件，编码 utf-8
  return JSON.parse(text) as T;               // 把文本解析成 JS 对象
  // as T 是在告诉 TS：「相信我，这个 JSON 的形状就是 T」
}

// 把用户输入的路径转成绝对路径。处理 ~ 和相对路径两种情况。
function resolvePath(p: string, cwd: string): string {
  let path = p;
  if (path === '~' || path === '') {
    path = process.env.HOME ?? path; // ?? 是「如果左边是 null/undefined 就用右边」
  } else if (path.startsWith('~/')) {
    path = (process.env.HOME ?? '') + path.slice(1); // slice(1) 去掉开头的 "~"
  }
  if (!isAbsolute(path)) {
    path = join(cwd, path); // 相对路径 → 拼上当前工作目录
  }
  return resolve(path); // 规范化（处理 .. 和 .）
}

// 根据资源类型，返回它该放进的子目录（相对目标项目根）。
function targetDirFor(sec: string): string {
  return TARGET_DIRS[sec] ?? ''; // 找不到就用空（理论上不会发生）
}

// 从 manifest 里根据 id 找一个资源。找不到返回 undefined。
function findResource(manifest: Manifest, id: string): Resource | undefined {
  // 遍历所有类型，在每个类型里 find 这个 id
  const all = [...manifest.skills, ...manifest.agents, ...manifest.commands, ...manifest.mcp];
  return all.find((r) => r.id === id);
}

// ---------------------------------------------------------------------------
// 自定义的「按行读输入」—— 为什么不直接用 readline？
// Node 的 readline 处理「管道(piped)输入」时，每次只能回答一个问题，
// 之后就会卡住。所以我们自己监听 process.stdin 的 'data' 事件逐行解析，
// 管道和普通终端都能用。这正好演示 Node 的「事件回调」概念。
// ---------------------------------------------------------------------------
const pendingInput: Array<(line: string) => void> = []; // 正在等答案的回调队列
const inputQueue: string[] = []; // 已经收到、但还没人消费的完整行
let inputBuffer = ''; // 还没遇到换行符的半截输入先存这

// 把缓冲区的完整行抽出来，放进队列；若有人在等，就直接派发。
function pumpInput(): void {
  let idx: number;
  while ((idx = inputBuffer.indexOf('\n')) !== -1) {
    const line = inputBuffer.slice(0, idx); // 取这一行的内容
    inputBuffer = inputBuffer.slice(idx + 1); // 剩下的留到下一次
    if (pendingInput.length > 0) {
      // 有人正在等答案 → 直接交给他
      pendingInput.shift()!(line);
    } else {
      // 没人等 → 先存进队列，等有人来问时再取
      inputQueue.push(line);
    }
  }
}

process.stdin.setEncoding('utf-8');
process.stdin.on('data', (chunk: string) => {
  inputBuffer += chunk; // 新数据追加到缓冲区
  pumpInput();
});
process.stdin.on('end', () => {
  pumpInput(); // 再处理一次，把剩下的行派发完
  if (pendingInput.length > 0) pendingInput.shift()?.(''); // 还有人等则补空行
});
// 让 process.stdin 开始读取数据。默认它是「暂停」状态，不加这行程序会一直等。
process.stdin.resume();

// 问用户一个问题，等待用户按回车，返回答案。
async function ask(q: string, def?: string): Promise<string> {
  const suffix = def ? ` [${def}]` : '';
  process.stdout.write(`${q}${suffix}: `); // 先打印问题文字
  const line = await new Promise<string>((resolve) => {
    if (inputQueue.length > 0) {
      resolve(inputQueue.shift()!); // 之前已经收到过 → 直接拿
    } else {
      pendingInput.push(resolve); // 否则排队等下一行
    }
  });
  const answer = line.trim(); // 去掉首尾空白
  return answer === '' && def ? def : answer;
}

// 多选菜单：给出一堆选项，让用户输入编号（逗号分隔）来勾选。
// selected 是一个 boolean 数组，记录每个选项是否被选中。
// 返回「被选中的选项下标」组成的数组。
async function multiselect(title: string, items: string[], selected: boolean[]): Promise<number[]> {
  while (true) {
    console.log(`\n===== ${title} =====`);
    // 打印所有选项，前面带编号和勾选标记
    items.forEach((label, i) => {
      const mark = selected[i] ? '[x]' : '[ ]';
      console.log(`  ${String(i + 1).padStart(3)} ${mark} ${label}`);
    });
    console.log('输入编号(逗号分隔)切换, a=全选, n=清空, d=完成, q=取消');

    const line = await ask('> ');
    if (line === 'q') return []; // 取消，返回空
    if (line === 'a') { // 全选
      selected.fill(true);
      continue; // 重新循环，重新打印列表
    }
    if (line === 'd') {
      // 返回所有被勾选的下标
      return selected.map((v, i) => (v ? i : -1)).filter((i) => i !== -1);
    }
    if (line === 'n') selected.fill(false);
    else {
      // 按逗号/空格拆开，逐个切换对应项
      for (const tok of line.split(/[, ]+/)) {
        const idx = Number(tok);
        if (idx >= 1 && idx <= items.length) selected[idx - 1] = !selected[idx - 1];
      }
    }
  }
}

// ---------------------------------------------------------------------------
// 第 5 步：各子命令的实现
// ---------------------------------------------------------------------------

/** 列表命令：打印所有资源 */
async function cmdList(manifest: Manifest): Promise<void> {
  for (const sec of SECTIONS) {
    const entries = manifest[sec];
    console.log(`\n[${sec}] ${entries.length}`);
    for (const e of entries) {
      console.log(`  ${e.id.padEnd(40)} cat=${e.category.padEnd(8)} tags=${e.tags.join(',')}`);
      console.log(`    path=${e.path}`);
      console.log(`    ${e.description}`);
    }
  }
}

/** 医生命令：检查 manifest 里写的路径是否真实存在 */
async function cmdDoctor(manifest: Manifest): Promise<number> {
  let bad = 0;
  for (const sec of SECTIONS) {
    for (const e of manifest[sec]) {
      const full = resolve(ROOT, e.path);
      try {
        await access(full); // access = 检查文件是否存在
      } catch {
        console.log(`[FAIL] 缺失路径: ${full} (${e.id})`);
        bad++;
      }
    }
  }
  console.log(bad === 0 ? '[OK] doctor' : `[FAIL] ${bad} 个问题`);
  return bad === 0 ? 0 : 1;
}

/** gen 命令：把 TOML 转成 JSON（也可以用 Python 生成，但这里用 TS 练手） */
async function cmdGen(): Promise<number> {
  const tomlText = await readFile(join(DEPLOY_DIR, 'manifest.toml'), 'utf-8');
  const parsed = parse(tomlText);
  // 简化版：不展开 includes，直接把解析结果写成 JSON
  await writeFile(join(DEPLOY_DIR, 'manifest.ts-gen.json'), JSON.stringify(parsed, null, 2), 'utf-8');
  console.log('gen: 已写 deploy/manifest.ts-gen.json（简化版，未展开 includes）');
  return 0;
}

// ---------------------------------------------------------------------------
// 第 6 步：交互式部署（核心功能）
// ---------------------------------------------------------------------------
async function cmdDeploy(manifest: Manifest): Promise<number> {
  // 问目标：1=项目 2=全局
  const choice = await ask('目标: 1=project 2=global', '1');
  let targetRoot: string;
  if (choice === '2') {
    targetRoot = process.env.HOME ?? '';
  } else {
    const p = await ask('项目路径', process.cwd());
    targetRoot = resolvePath(p, process.cwd());
  }
  // 检查目标目录是否存在
  try {
    await access(targetRoot);
  } catch {
    console.log(`不是目录: ${targetRoot}`);
    return 1;
  }

  // 先选 preset
  let presetsData: { preset: Preset[] } = { preset: [] };
  try {
    presetsData = await readJson(join(DEPLOY_DIR, 'preset.json'));
  } catch {
    console.log('读取 preset.json 失败，跳过预设');
  }

  // 用 Map 存「已选中的资源」，key 是 id，值是 Resource。Map 天然去重。
  const selected = new Map<string, Resource>();

  if (presetsData.preset.length > 0) {
    const chosen = await multiselect(
      'Preset 多选',
      presetsData.preset.map((p) => `${p.id} — ${p.description}`),
      new Array(presetsData.preset.length).fill(false),
    );
    for (const i of chosen) {
      const pre = presetsData.preset[i]!;
      // 这里简化：preset 可能用 kits 整包，也可能只列 skills 等。
      // 我们只处理「整包」或「各类型列出」两种情况，用 ids 收集。
      const ids: string[] = [];
      if (pre.kits.length > 0) {
        for (const kit of pre.kits) {
          for (const sec of SECTIONS) {
            for (const r of manifest[sec]) if (r.kit === kit) selected.set(r.id, r);
          }
        }
      } else {
        ids.push(...pre.skills, ...pre.agents, ...pre.commands, ...pre.mcp);
        for (const id of ids) {
          const r = findResource(manifest, id) ?? findResource(manifest, `${pre.kit}:${id}`);
          if (r) selected.set(r.id, r);
        }
      }
    }
  }

  // 分阶段选择：skills → agents → commands → mcp
  for (const sec of SECTIONS) {
    const entries = manifest[sec];
    if (entries.length === 0) continue;
    // 预先勾选：已在 selected 里的项
    const preselected = entries.map((e) => selected.has(e.id));
    const chosen = await multiselect(
      `[${sec}] 选择资源`,
      entries.map((e) => `${e.id}  cat=${e.category}  tags=${e.tags.join(',')}  ${e.description}`),
      preselected,
    );
    // 先删掉本类型旧选择，再加入新选择（合并逻辑）
    for (const r of entries) selected.delete(r.id);
    for (const i of chosen) selected.set(entries[i]!.id, entries[i]!);
  }

  if (selected.size === 0) {
    console.log('未选择任何资源');
    return 0;
  }

  // 正式目标路径 = 目标根 + 类型子目录 + 源文件名
  const targets = new Map<string, string>(); // id -> 目标绝对路径
  for (const e of selected.values()) {
    const sec = SECTIONS.find((s) => manifest[s].includes(e))!; // 找出 e 属于哪个类型
    const dst = join(targetRoot, targetDirFor(sec), basename(e.path));
    targets.set(e.id, dst);
    const ok = await exists(resolve(ROOT, e.path));
    console.log(`  ${ok ? 'OK      ' : 'MISSING '} ${e.id.padEnd(38)} -> ${dst}`);
  }
  const go = await ask('部署? [Y/n]', 'y');
  if (go.toLowerCase() === 'n') return 0;

  // 逐个部署（创建符号链接）
  for (const e of selected.values()) {
    const src = resolve(ROOT, e.path);
    const dst = targets.get(e.id)!;
    const sec = SECTIONS.find((s) => manifest[s].includes(e))!;
    await deployOne(sec, src, dst);
  }

  return 0;
}

// 部署单个资源：处理「已存在」的冲突 + 创建链接
async function deployOne(sec: string, src: string, dst: string): Promise<void> {
  // 已经是正确链接 → 跳过
  if (await isLinkTo(src, dst)) {
    console.log(`  [ok] 已是最新 ${dst}`);
    return;
  }
  const has = await exists(dst);
  if (has) {
    const act = (await ask(`  冲突: ${dst} [s]kip/[o]verwrite/[b]ackup?`, 's')).toLowerCase();
    if (act === 's') return;
    if (act === 'o') {
      // overwrite：先删掉原来的
      try {
        await rm(dst, { recursive: true, force: true });
      } catch (e) {
        console.log('删除失败', e);
      }
    }
    if (act === 'b') {
      const bp = `${dst}.bak-${timestamp()}`;
      await rename(dst, bp);
      console.log(`  [backup] ${bp}`);
    }
  }
  await mkdir(dirname(dst), { recursive: true }); // 确保父目录存在
  await symlink(src, dst, sec === 'agents' ? 'file' : undefined);
  console.log(`  [ok] ${dst}`);
}

// 判断 dst 是否已经是「指向 src 的符号链接」
async function isLinkTo(src: string, dst: string): Promise<boolean> {
  try {
    const rS = await realpath(src);
    const rD = await realpath(dst);
    return rS === rD;
  } catch {
    return false; // 任一不存在或有错，就当作不是
  }
}

// 检查路径是否存在（用 catch 因为 Node 没有直接的存在判断）
async function exists(p: string): Promise<boolean> {
  try {
    await access(p);
    return true;
  } catch {
    return false;
  }
}

function timestamp(): string {
  const d = new Date();
  const p = (n: number) => String(n).padStart(2, '0');
  return `${d.getFullYear()}${p(d.getMonth() + 1)}${p(d.getDate())}-${p(d.getHours())}${p(d.getMinutes())}${p(d.getSeconds())}`;
}

// ---------------------------------------------------------------------------
// 第 7 步：入口 —— 根据命令行参数决定运行哪个命令
// ---------------------------------------------------------------------------
async function main(): Promise<number> {
  const cmd = process.argv[2] ?? 'deploy'; // 第一个参数；没填就默认 deploy

  if (cmd === 'gen') return cmdGen();

  // 读已经生成好的 manifest.json（由 python gen 或 ts gen 生成）
  let manifest: Manifest;
  try {
    manifest = await readJson(join(DEPLOY_DIR, 'manifest.json'));
  } catch {
    console.log('找不到 manifest.json，请先运行 npm run gen（或 python3 deploy/deploy.py gen）');
    return 1;
  }

  if (cmd === 'list') await cmdList(manifest);
  else if (cmd === 'doctor') return await cmdDoctor(manifest);
  else return await cmdDeploy(manifest);
  return 0;
}

// 通过设置 process.exitCode 让进程自然退出。
// （不要用 process.exit(码)，它会立刻退出、丢掉还没写完的输出。）
try {
  process.exitCode = await main();
} catch (e) {
  console.error('程序出错:', e);
  process.exitCode = 1;
}
