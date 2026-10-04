/* pi-board: client/board-client.js — three-pane UI.
   Left: sources (板/文件/历史/prompt tabs). Center: viewer (Raw/Preview/Edit) /
   prompt panel (editable message + appendix). Right: comments rail with add form. */
(function () {
  "use strict";

  var $ = function (id) { return document.getElementById(id); };

  var board = { items: [], annotations: [], history: [] };
  var cur = null; // {itemId, source, locator, label, content, contentHash, selStart, selEnd}
  var historyFilter = "";
  var appendixTimer = null;
  var viewMode = "raw"; // "raw" | "preview" | "edit"
  var historySig = null; // signature of the history list already rendered
  var HISTORY_POLL_MS = 2000;

  var CODE_EXTS = /\.(ts|tsx|js|jsx|mjs|cjs|py|go|rs|c|cpp|cc|h|hpp|java|sh|bash|zsh|json|yaml|yml|toml|xml|css|scss|sql|rb|php)$/i;

  function setStatus(msg, isError) {
    var el = $("statusLine");
    if (!el) return;
    el.textContent = msg;
    el.className = isError ? "error" : "status";
  }

  var toastTimer = null;
  function toast(msg, isError) {
    var t = $("toast");
    if (!t) {
      t = document.createElement("div");
      t.id = "toast";
      document.body.appendChild(t);
    }
    t.textContent = msg;
    t.className = isError ? "toast error" : "toast";
    t.hidden = false;
    if (toastTimer) window.clearTimeout(toastTimer);
    toastTimer = window.setTimeout(function () { t.hidden = true; }, 3000);
  }

  function sleep(ms) { return new Promise(function (r) { window.setTimeout(r, ms); }); }

  async function api(path, opts) {
    var res = await fetch(path, opts || {});
    var j = await res.json().catch(function () { return { ok: false, error: "invalid JSON response" }; });
    if (!j.ok) throw new Error(j.error || "request failed");
    return j;
  }
  function postAction(action, payload) {
    return api("/action", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(Object.assign({ action: action }, payload || {})),
    });
  }

  function el(tag, cls, text) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text !== undefined) n.textContent = text;
    return n;
  }
  function short(s, n) {
    var t = String(s || "");
    return t.length <= n ? t : t.slice(0, n - 1) + "…";
  }
  function esc(s) {
    return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  }

  // ── state refresh ──────────────────────────────────────────────
  async function refresh() {
    try {
      board = await api("/state");
      historySig = historySignature(board.history);
      renderBoardSummary();
      renderBoardItems();
      renderHistory();
      renderRails();
      renderViewer();
      syncAppendix();
    } catch (e) { setStatus("state: " + e.message, true); }
  }

  function renderBoardSummary() {
    var n = board.items.length, a = board.annotations.length;
    var edited = board.items.filter(function (i) { return i.edit; }).length;
    $("boardSummary").textContent = n + " 项 · " + a + " 注释" + (edited ? " · " + edited + " 已编辑" : "");
  }

  // ── left tabs / center prompt switch ──────────────────────────
  function setPromptActive(on) {
    var b = $("promptBtn");
    if (!b) return;
    b.classList.toggle("active", on);
    b.title = on ? "返回查看器" : "打开 prompt 面板";
  }
  function promptShown() {
    var a = $("viewerAssembly");
    return Boolean(a && !a.hidden);
  }
  function showAssemblyView() {
    $("viewerAssembly").hidden = false;
    $("viewerRaw").hidden = true;
    $("preview").hidden = true;
    $("viewerEdit").hidden = true;
    $("viewToggle").hidden = true;
    $("assemblyActions").hidden = false;
    setPromptActive(true);
    refreshAssembly();
  }
  function showNormalView() {
    $("viewerAssembly").hidden = true;
    $("viewToggle").hidden = false;
    $("assemblyActions").hidden = true;
    setPromptActive(false);
    setView(viewMode);
  }
  function initTabs() {
    var tabs = document.querySelectorAll("nav.tabs .tab");
    tabs.forEach(function (t) {
      t.addEventListener("click", function () {
        tabs.forEach(function (x) { x.classList.remove("active"); });
        t.classList.add("active");
        var tab = t.dataset.tab;
        ["board", "files", "history"].forEach(function (k) { $("pane-" + k).hidden = k !== tab; });
        showNormalView();
      });
    });
  }

  // ── board items (板 tab) ──────────────────────────────────────
  function renderBoardItems() {
    var ul = $("boardItems");
    ul.textContent = "";
    if (!board.items.length) {
      ul.appendChild(el("li", "", "（空板 — 手动打开文件/消息上板）"));
      return;
    }
    board.items.forEach(function (item) {
      var an = board.annotations.filter(function (a) { return a.itemId === item.id; }).length;
      var li = el("li");
      var b = el("button", "item", "[" + item.source + "] " + item.label);
      b.title = item.locator;
      b.addEventListener("click", function () { reopenItem(item); });
      li.appendChild(b);
      if (item.edit) li.appendChild(el("span", "count", "✎"));
      if (an) li.appendChild(el("span", "count", "💬" + an));
      var unpin = el("button", "icon danger", "×");
      unpin.title = "取消上板";
      unpin.addEventListener("click", function (ev) { ev.stopPropagation(); unpinItem(item.id); });
      li.appendChild(unpin);
      ul.appendChild(li);
    });
  }

  function reopenItem(item) {
    if (item.source === "file") openFile(item.locator);
    else openHistory(item.locator);
  }

  async function unpinItem(itemId) {
    try {
      await postAction("unpin", { itemId: itemId });
      if (cur && cur.itemId === itemId) { cur = null; clearViewer(); }
      await refresh();
    } catch (e) { setStatus("unpin: " + e.message, true); }
  }

  // ── file tree ─────────────────────────────────────────────────
  async function loadTree(li, path, depth) {
    if (depth > 6) return;
    try {
      var j = await api("/tree?path=" + encodeURIComponent(path || ""));
      if (!j.ok) { setStatus(j.error || "tree error", true); return; }
      var ul = el("ul");
      (j.dirs || []).forEach(function (dir) {
        var subLi = el("li");
        var det = el("details");
        var sum = el("summary", "", dir.name + "/");
        det.appendChild(sum);
        var placeholder = el("ul"); placeholder.appendChild(el("li", "", "…"));
        det.appendChild(placeholder);
        det.addEventListener("toggle", function () { if (det.open) loadTree(placeholder, dir.path, depth + 1); });
        subLi.appendChild(det);
        ul.appendChild(subLi);
      });
      (j.files || []).forEach(function (file) {
        var subLi = el("li");
        var b = el("button", "file-btn", file.name);
        b.dataset.path = file.path;
        b.addEventListener("click", function () { openFile(file.path); });
        subLi.appendChild(b);
        ul.appendChild(subLi);
      });
      li.textContent = "";
      li.appendChild(ul);
    } catch (e) { setStatus("tree: " + e.message, true); }
  }

  function initTree() {
    var ul = $("filesTree");
    ul.textContent = "";
    var rootLi = el("li");
    var det = el("details");
    det.open = true;
    var sum = el("summary", "", "项目根目录");
    det.appendChild(sum);
    var placeholder = el("ul"); placeholder.appendChild(el("li", "", "加载中…"));
    det.appendChild(placeholder);
    det.addEventListener("toggle", function () { if (det.open) loadTree(placeholder, "", 0); });
    rootLi.appendChild(det);
    ul.appendChild(rootLi);
    loadTree(placeholder, "", 0);
  }

  function highlightTreePath(path) {
    document.querySelectorAll("#filesTree .file-btn").forEach(function (b) {
      b.classList.toggle("active", b.dataset.path === path);
    });
  }

  // ── history list ──────────────────────────────────────────────
  function fmtTime(ts) {
    try {
      var d = new Date(ts);
      if (isNaN(d.getTime())) return "";
      var h = d.getHours(), m = d.getMinutes();
      return (h < 10 ? "0" + h : h) + ":" + (m < 10 ? "0" + m : m);
    } catch (e) { return ""; }
  }

  function renderHistory() {
    var ul = $("historyMessages");
    ul.textContent = "";
    var list = board.history || [];
    var kw = historyFilter.trim().toLowerCase();
    if (kw) list = list.filter(function (h) {
      return (h.label + " " + h.preview + " " + h.kind).toLowerCase().indexOf(kw) >= 0;
    });
    if (!list.length) {
      ul.appendChild(el("li", "empty", kw ? "（无匹配）" : "（暂无历史消息）"));
      return;
    }
    list.forEach(function (h, i) {
      var li = el("li", "msg " + (h.kind === "reply" ? "reply" : "prompt") + (i === 0 ? " latest" : ""));
      var b = el("button", "msg-btn");
      var head = el("span", "msg-head");
      head.appendChild(el("span", "bullet", h.kind === "reply" ? "●" : "◆"));
      head.appendChild(el("span", "msg-label", h.label));
      head.appendChild(el("span", "msg-time", fmtTime(h.ts)));
      b.appendChild(head);
      b.appendChild(el("span", "msg-preview", h.preview));
      b.addEventListener("click", function () { openHistory(h.locator); });
      li.appendChild(b);
      ul.appendChild(li);
    });
  }

  // ── history auto-refresh ──────────────────────────────────────
  // The server rebuilds its history on pi's turn_end, so a completed reply
  // appears here without a manual refresh. Poll cheaply, and re-render only
  // when the list actually changed, so the viewer / Edit text is never touched.
  function historySignature(list) {
    return (list || []).map(function (h) { return h.locator + ":" + h.ts; }).join("|");
  }
  async function pollHistory() {
    try {
      var st = await api("/state");
      var sig = historySignature(st.history);
      if (sig === historySig) return;
      historySig = sig;
      board.history = st.history || [];
      renderHistory();
    } catch (e) { /* keep polling: the server may be stopped */ }
  }
  function watchHistory() {
    window.setInterval(pollHistory, HISTORY_POLL_MS);
  }

  // ── open into viewer ──────────────────────────────────────────
  async function openFile(path) {
    try {
      var j = await postAction("open", { source: "file", locator: path });
      setCur(j, "file", path);
      highlightTreePath(path);
    } catch (e) { setStatus("open file: " + e.message, true); }
  }
  async function openHistory(locator) {
    try {
      var j = await postAction("open", { locator: locator });
      setCur(j, j.source || "reply", locator);
    } catch (e) { setStatus("open history: " + e.message, true); }
  }
  function setCur(j, source, locator) {
    cur = {
      itemId: j.itemId,
      source: source,
      locator: j.locator || locator,
      label: j.label || locator,
      content: j.content || "",
      contentHash: j.contentHash || "",
      selStart: 0,
      selEnd: 0,
    };
    if (source !== "file" && viewMode === "edit") setView("raw");
    setStatus("已上板: " + cur.label);
    showNormalView();
    refresh();
  }

  function clearViewer() {
    $("raw").value = "";
    $("gutter").textContent = "";
    $("backdropCode").textContent = "";
    $("editText").value = "";
    $("assemblyText").value = "";
    $("viewerTitle").textContent = "（未打开文件/消息）";
    $("preview").srcdoc = "";
    setView("raw");
    showNormalView();
  }

  // ── viewer render (gutter + backdrop highlight) ───────────────
  function offsetsForRegion(content, region) {
    if (!region || !region.lineRange) return null;
    var lines = content.split("\n");
    var ls = Math.max(1, region.lineRange.start);
    var le = Math.min(lines.length, Math.max(ls, region.lineRange.end));
    var start = 0, i;
    for (i = 0; i < ls - 1; i++) start += lines[i].length + 1;
    var end = start;
    for (i = ls - 1; i < le; i++) end += lines[i].length;
    end += (le - ls);
    return { start: start, end: Math.max(start, end) };
  }

  function collectRanges() {
    if (!cur) return [];
    var out = [];
    board.annotations.filter(function (a) { return a.itemId === cur.itemId && a.region; })
      .forEach(function (a) {
        var o = offsetsForRegion(cur.content, a.region);
        if (o) out.push({ start: o.start, end: o.end, cls: "an" });
      });
    return out;
  }

  function renderBackdrop() {
    var codeEl = $("backdropCode");
    if (!cur) { codeEl.textContent = ""; return; }
    var ranges = collectRanges().sort(function (a, b) { return a.start - b.start; });
    var html = "";
    var pos = 0;
    ranges.forEach(function (r) {
      var s = Math.max(pos, r.start), e = Math.max(s, r.end);
      if (s > pos) html += esc(cur.content.slice(pos, s));
      html += "<mark class=\"" + r.cls + "\">" + esc(cur.content.slice(s, e)) + "</mark>";
      pos = e;
    });
    html += esc(cur.content.slice(pos));
    codeEl.innerHTML = html;
  }

  function renderGutter() {
    var g = $("gutter");
    if (!cur) { g.textContent = ""; return; }
    var n = cur.content.split("\n").length;
    var nums = [];
    for (var i = 1; i <= n; i++) nums.push(i);
    g.textContent = nums.join("\n");
  }

  function renderViewer() {
    if (!cur) { if (!promptShown()) clearViewer(); return; }
    $("viewerTitle").textContent = "[" + cur.source + "] " + cur.label + (isEdited() ? " （已编辑）" : "");
    $("raw").value = cur.content;
    renderGutter();
    renderBackdrop();
    $("editBtn").hidden = cur.source !== "file";
    if (viewMode === "edit") $("editText").value = cur.content;
  }

  function isEdited() {
    if (!cur) return false;
    var item = board.items.find(function (i) { return i.id === cur.itemId; });
    return Boolean(item && item.edit);
  }

  function syncScroll() {
    var raw = $("raw");
    $("backdrop").scrollTop = raw.scrollTop;
    $("backdrop").scrollLeft = raw.scrollLeft;
    $("gutter").scrollTop = raw.scrollTop;
  }

  // ── Raw / Preview / Edit toggle ───────────────────────────────
  function setView(view) {
    if (view === "edit" && (!cur || cur.source !== "file")) view = "raw";
    viewMode = view;
    $("viewerRaw").hidden = view !== "raw";
    $("preview").hidden = view !== "preview";
    $("viewerEdit").hidden = view !== "edit";
    $("rawBtn").classList.toggle("active", view === "raw");
    $("previewBtn").classList.toggle("active", view === "preview");
    $("editBtn").classList.toggle("active", view === "edit");
    if (view === "edit" && cur) $("editText").value = cur.content;
    if (view === "preview" && cur && cur.content) $("preview").srcdoc = renderPreviewDoc(cur.content, cur.locator, isLight());
  }

  function captureSelection() {
    if (!cur) return;
    var ta = viewMode === "edit" ? $("editText") : $("raw");
    cur.selStart = ta.selectionStart || 0;
    cur.selEnd = ta.selectionEnd || 0;
  }

  // ── assembly panel (full editable message, then send) ────────
  function syncAppendix() {
    if (appendixTimer) return; // a debounced save is pending; don't clobber the draft
    var ta = $("appendixText");
    if (ta && document.activeElement !== ta && ta.value !== (board.appendix || "")) {
      ta.value = board.appendix || "";
    }
  }
  async function refreshAssembly() {
    syncAppendix();
    try {
      var j = await postAction("preview");
      $("assemblyText").value = j.text || "";
    } catch (e) { setStatus("refresh prompt: " + e.message, true); }
  }

  // ── comments rail ─────────────────────────────────────────────
  function railLabel(region) {
    if (!region || !region.lineRange) return "全文";
    return "L" + region.lineRange.start + "-" + region.lineRange.end;
  }
  function locateRegion(region) {
    if (!cur || !region) return;
    // in Edit mode, locate by quote inside the editable buffer
    if (viewMode === "edit") {
      var ta = $("editText");
      var idx = region.quote ? ta.value.indexOf(region.quote) : -1;
      if (idx >= 0) {
        try { ta.setSelectionRange(idx, idx + region.quote.length); ta.focus(); } catch (e) { /* ignore */ }
      }
      return;
    }
    var o = offsetsForRegion(cur.content, region);
    if (!o) return;
    setView("raw");
    var raw = $("raw");
    try {
      raw.setSelectionRange(o.start, o.end);
      raw.focus();
      var line = cur.content.slice(0, o.start).split("\n").length;
      raw.scrollTop = Math.max(0, (line - 3) * 1.55 * 12.5);
    } catch (e) { /* ignore */ }
  }

  function renderRails() {
    var annUl = $("annotationsRail");
    annUl.textContent = "";
    var anns = cur ? board.annotations.filter(function (a) { return a.itemId === cur.itemId; }) : [];
    if (!anns.length) annUl.appendChild(el("li", "empty", "（暂无注释）"));
    anns.forEach(function (a) {
      var li = el("li", "rail-item");
      var head = el("span", "rail-head", railLabel(a.region));
      head.addEventListener("click", function () { locateRegion(a.region); });
      li.appendChild(head);
      if (a.region && a.region.quote) {
        var q = el("span", "rail-quote", "「" + short(a.region.quote, 60) + "」");
        q.addEventListener("click", function () { locateRegion(a.region); });
        li.appendChild(q);
      }
      var textEl = el("span", "rail-text", a.text || "（无文字）");
      li.appendChild(textEl);
      var actions = el("div", "rail-actions");
      var edit = el("button", "", "编辑");
      edit.addEventListener("click", function () {
        editInline(li, textEl, a.text, async function (v) { await postAction("update_annotation", { annotationId: a.id, text: v }); });
      });
      actions.appendChild(edit);
      var del = el("button", "danger", "删除");
      del.addEventListener("click", function () { deleteAnnotation(a); });
      actions.appendChild(del);
      li.appendChild(actions);
      annUl.appendChild(li);
    });
  }

  function editInline(li, textEl, initial, onSave) {
    var ta = el("textarea", "edit-area");
    ta.value = initial || "";
    textEl.replaceWith(ta);
    var actions = li.querySelector(".rail-actions");
    actions.textContent = "";
    var save = el("button", "", "保存");
    var cancel = el("button", "", "取消");
    actions.appendChild(save);
    actions.appendChild(cancel);
    var done = false;
    function finish() {
      if (done) return;
      done = true;
      refresh();
    }
    save.addEventListener("click", async function () {
      if (done) return;
      done = true;
      try { await onSave(ta.value); } catch (e) { setStatus("保存失败: " + e.message, true); }
      refresh();
    });
    cancel.addEventListener("click", finish);
    ta.addEventListener("keydown", function (e) {
      if (e.key === "Escape") { e.preventDefault(); finish(); }
      if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) { e.preventDefault(); save.click(); }
    });
    ta.focus();
  }

  async function deleteAnnotation(a) {
    if (!window.confirm("删除这条注释？")) return;
    try { await postAction("delete_annotation", { annotationId: a.id }); await refresh(); }
    catch (e) { setStatus("delete annotation: " + e.message, true); }
  }

  // ── composer (annotate) + edit save/revert ────────────────────
  function wireViewer() {
    var raw = $("raw");
    raw.addEventListener("mouseup", captureSelection);
    raw.addEventListener("keyup", captureSelection);
    raw.addEventListener("scroll", syncScroll);
    var editText = $("editText");
    editText.addEventListener("mouseup", captureSelection);
    editText.addEventListener("keyup", captureSelection);

    $("annotateForm").addEventListener("submit", async function (ev) {
      ev.preventDefault();
      if (!cur) { setStatus("先打开文件/消息", true); return; }
      var text = $("annotateText").value;
      var isEdit = viewMode === "edit";
      var payload = { itemId: cur.itemId, offsetStart: cur.selStart, offsetEnd: cur.selEnd, text: text };
      if (isEdit) {
        payload.content = $("editText").value;
      } else {
        payload.contentHash = cur.contentHash;
      }
      try {
        await postAction("annotate", payload);
        $("annotateText").value = "";
        setStatus("已添加注释");
        refresh();
      } catch (e) { setStatus("annotate: " + e.message, true); }
    });

    $("editSaveBtn").addEventListener("click", async function () {
      if (!cur) return;
      try {
        var j = await postAction("save_edit", { itemId: cur.itemId, content: $("editText").value });
        cur.content = $("editText").value;
        cur.contentHash = j.contentHash || cur.contentHash;
        setStatus("已生成 diff（未写盘），将随 prompt 发送");
        refresh();
      } catch (e) { setStatus("save: " + e.message, true); }
    });

    $("editRevertBtn").addEventListener("click", async function () {
      if (!cur) return;
      if (!window.confirm("撤销本次编辑，清除 diff？")) return;
      try {
        var j = await postAction("revert_edit", { itemId: cur.itemId });
        if (j.content !== undefined) cur.content = j.content;
        cur.contentHash = j.contentHash || cur.contentHash;
        setStatus("已撤销（未写盘）");
        refresh();
      } catch (e) { setStatus("revert: " + e.message, true); }
    });
  }

  // ── side rails (left sources / right comments) ───────────────
  // railPref[side]: true/false = explicit user choice, null = follow viewport.
  var RAIL_NARROW = window.matchMedia("(max-width: 1100px)");
  var railPref = { left: null, right: null };

  function loadRailPref() {
    try {
      var raw = localStorage.getItem("pi-board-rails");
      if (!raw) return;
      var o = JSON.parse(raw) || {};
      if (typeof o.left === "boolean") railPref.left = o.left;
      if (typeof o.right === "boolean") railPref.right = o.right;
    } catch (e) { /* ignore */ }
  }
  function saveRailPref() {
    try { localStorage.setItem("pi-board-rails", JSON.stringify(railPref)); } catch (e) { /* ignore */ }
  }
  function railOpen(side) {
    if (railPref[side] !== null) return railPref[side];
    return !RAIL_NARROW.matches;
  }
  function markRailBtn(btn, open, name) {
    if (!btn) return;
    btn.classList.toggle("active", open);
    btn.title = (open ? "隐藏" : "显示") + name;
    btn.setAttribute("aria-label", btn.title);
    btn.setAttribute("aria-pressed", open ? "true" : "false");
  }
  function applyRails() {
    var ws = document.querySelector("main.workspace");
    if (!ws) return;
    var left = railOpen("left"), right = railOpen("right");
    ws.classList.toggle("hide-left", !left);
    ws.classList.toggle("hide-right", !right);
    markRailBtn($("leftRailBtn"), left, "左栏");
    markRailBtn($("rightRailBtn"), right, "右栏");
  }
  function toggleRail(side) {
    railPref[side] = !railOpen(side);
    saveRailPref();
    applyRails();
  }
  function wireRails() {
    loadRailPref();
    applyRails();
    var onViewport = function () { applyRails(); };
    if (RAIL_NARROW.addEventListener) RAIL_NARROW.addEventListener("change", onViewport);
    else if (RAIL_NARROW.addListener) RAIL_NARROW.addListener(onViewport);
    var lb = $("leftRailBtn"), rb = $("rightRailBtn");
    if (lb) lb.addEventListener("click", function () { toggleRail("left"); });
    if (rb) rb.addEventListener("click", function () { toggleRail("right"); });
  }

  // ── theme (dark/light) ───────────────────────────────────────
  function isLight() { return (document.documentElement.dataset.theme || "dark") === "light"; }
  function applyTheme(t) {
    document.documentElement.dataset.theme = t;
    try { localStorage.setItem("pi-board-theme", t); } catch (e) { /* ignore */ }
    var btn = $("themeBtn");
    if (btn) btn.textContent = t === "dark" ? "☀️" : "🌙";
    if (viewMode === "preview" && cur && cur.content) {
      $("preview").srcdoc = renderPreviewDoc(cur.content, cur.locator, t === "light");
    }
  }

  // ── actions / assembly ────────────────────────────────────────
  function wireActions() {
    $("refreshBtn").addEventListener("click", refresh);
    $("sendBtn").addEventListener("click", async function () {
      var btn = $("sendBtn");
      btn.disabled = true;
      try {
        var beforeReply = (board.history || []).find(function (h) { return h.kind === "reply"; });
        var beforeReplyLocator = beforeReply ? beforeReply.locator : null;
        var j = await postAction("send", { text: $("assemblyText").value, appendix: $("appendixText").value });
        toast(j.message || "已发送");
        setStatus(j.message || "已发送");
        // clear the comment composer and appendix (server resets on send)
        $("annotateText").value = "";
        $("appendixText").value = "";
        if (appendixTimer) { window.clearTimeout(appendixTimer); appendixTimer = null; }
        if (cur) { cur.selStart = 0; cur.selEnd = 0; }
        // poll until a new model reply lands in history, then refresh
        for (var i = 0; i < 30; i++) {
          await sleep(2000);
          try {
            var st = await api("/state");
            var newReply = (st.history || []).find(function (h) { return h.kind === "reply" && h.locator !== beforeReplyLocator; });
            if (newReply) { await refresh(); break; }
          } catch (e) { /* keep polling */ }
        }
        await refresh();
      } catch (e) {
        toast(e.message, true);
        setStatus("send: " + e.message, true);
      } finally {
        btn.disabled = false;
      }
    });
    $("assemblyRefreshBtn").addEventListener("click", refreshAssembly);
    var promptBtn = $("promptBtn");
    if (promptBtn) promptBtn.addEventListener("click", function () {
      if (promptShown()) showNormalView(); else showAssemblyView();
    });
    $("clearBtn").addEventListener("click", async function () {
      if (!window.confirm("清空整块板？")) return;
      try {
        await postAction("clear");
        var wasPrompt = promptShown();
        cur = null;
        clearViewer();
        await refresh();
        if (wasPrompt) showAssemblyView();
        setStatus("板已清空");
      } catch (e) { setStatus("clear: " + e.message, true); }
    });

    $("themeBtn").addEventListener("click", function () {
      applyTheme(isLight() ? "dark" : "light");
    });
    applyTheme((function () { try { return localStorage.getItem("pi-board-theme") || "dark"; } catch (e) { return "dark"; } })());

    var appendixTa = $("appendixText");
    appendixTa.addEventListener("input", function () {
      if (appendixTimer) window.clearTimeout(appendixTimer);
      appendixTimer = window.setTimeout(async function () {
        try {
          await postAction("set_appendix", { text: appendixTa.value });
        } catch (e) {
          setStatus("appendix: " + e.message, true);
        } finally {
          appendixTimer = null;
        }
      }, 500);
    });

    $("filesOpenForm").addEventListener("submit", function (ev) {
      ev.preventDefault();
      var v = $("filesPath").value.trim();
      if (v) openFile(v);
    });

    $("historyFilter").addEventListener("input", function () {
      historyFilter = this.value;
      renderHistory();
    });

    $("rawBtn").addEventListener("click", function () { setView("raw"); });
    $("previewBtn").addEventListener("click", function () { setView("preview"); });
    $("editBtn").addEventListener("click", function () { setView("edit"); });
  }

  // ── minimal markdown renderer ─────────────────────────────────
  function inline(s) {
    return esc(s)
      .replace(/`([^`]+)`/g, "<code>$1</code>")
      .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
      .replace(/(^|[^*])\*([^*]+)\*/g, "$1<em>$2</em>")
      .replace(/\[([^\]]+)\]\(([^)]+)\)/g, "<a href=\"$2\">$1</a>");
  }
  function renderMarkdown(src) {
    var lines = src.split("\n");
    var html = [];
    var inCode = false, inList = false, inQuote = false;
    function closeList() { if (inList) { html.push("</ul>"); inList = false; } }
    function closeQuote() { if (inQuote) { html.push("</blockquote>"); inQuote = false; } }
    for (var i = 0; i < lines.length; i++) {
      var line = lines[i];
      if (/^\s*```/.test(line)) {
        closeList(); closeQuote();
        if (!inCode) { inCode = true; html.push("<pre><code>"); }
        else { inCode = false; html.push("</code></pre>"); }
        continue;
      }
      if (inCode) { html.push(esc(line)); continue; }
      var h = line.match(/^(#{1,6})\s+(.*)$/);
      if (h) { closeList(); closeQuote(); var lv = h[1].length; html.push("<h" + lv + ">" + inline(h[2]) + "</h" + lv + ">"); continue; }
      if (/^\s*---+\s*$/.test(line)) { closeList(); closeQuote(); html.push("<hr>"); continue; }
      var quote = line.match(/^\s*>\s?(.*)$/);
      if (quote) { closeList(); if (!inQuote) { inQuote = true; html.push("<blockquote>"); } html.push("<p>" + inline(quote[1]) + "</p>"); continue; }
      var li = line.match(/^\s*[-*+]\s+(.*)$/) || line.match(/^\s*\d+\.\s+(.*)$/);
      if (li) { closeQuote(); if (!inList) { inList = true; html.push("<ul>"); } html.push("<li>" + inline(li[1]) + "</li>"); continue; }
      closeList(); closeQuote();
      if (line.trim() === "") continue;
      html.push("<p>" + inline(line) + "</p>");
    }
    closeList(); closeQuote();
    if (inCode) html.push("</code></pre>");
    return html.join("\n");
  }
  function renderPreviewDoc(content, locator, light) {
    var body;
    if (CODE_EXTS.test(locator || "")) {
      body = "<pre><code>" + esc(content) + "</code></pre>";
    } else {
      body = renderMarkdown(content);
    }
    var bg = light ? "#f5f6f8" : "#16181d";
    var fg = light ? "#1c1e21" : "#e0e0e0";
    var pre = light ? "#eceff3" : "#14161a";
    var accent = light ? "#1f6feb" : "#5aa7ff";
    var muted = light ? "#5f6670" : "#aaa";
    return "<!doctype html><html><head><meta charset='utf-8'><style>"
      + "body{font:14px/1.6 ui-sans-serif,system-ui,sans-serif;color:" + fg + ";background:" + bg + ";padding:12px;}"
      + "pre{background:" + pre + ";padding:8px;border-radius:4px;overflow:auto;}code{font-family:ui-monospace,Menlo,monospace;}"
      + "a{color:" + accent + ";}h1,h2,h3,h4,h5,h6{color:" + fg + ";margin:.4em 0;}"
      + "blockquote{border-left:3px solid " + accent + ";margin:.3em 0;padding-left:8px;color:" + muted + ";}"
      + "</style></head><body>" + body + "</body></html>";
  }

  // ── init ──────────────────────────────────────────────────────
  document.addEventListener("DOMContentLoaded", function () {
    wireRails();
    watchHistory();
    initTabs();
    initTree();
    wireViewer();
    wireActions();
    setView("raw");
    refresh();
  });
})();
