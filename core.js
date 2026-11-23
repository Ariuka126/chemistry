/* core.js (chemistry) — shared helpers, learner progress (saved in this browser), and the question widgets (MCQ + numeric with hint ladder). */
(() => {
"use strict";
const PX = window.PX = window.PX || {};
PX.units = []; PX.sims = {};

/* ---------- small helpers ---------- */
const $ = PX.$ = (s, el = document) => el.querySelector(s);
const $$ = PX.$$ = (s, el = document) => [...el.querySelectorAll(s)];
PX.esc = s => String(s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
PX.K = (t, d = false) => {
  try { return window.katex ? katex.renderToString(t, { displayMode: d, throwOnError: false, strict: false }) : `<code>${PX.esc(t)}</code>`; }
  catch (e) { return `<code>${PX.esc(t)}</code>`; }
};
/* render $$..$$ (display) and $..$ (inline) TeX inside an HTML string */
PX.md = s => PX.emph(String(s ?? "")).replace(/\{\{([\s\S]+?)\}\}/g, (_, t) => PX.ce(t)).replace(/\$\$([\s\S]+?)\$\$/g, (_, t) => PX.K(t, true)).replace(/\$([^$\n]+?)\$/g, (_, t) => PX.K(t, false));
/* light emphasis: **bold** and *italic* (outside maths) */
PX.emph = s => s.replace(/\*\*([^*]+?)\*\*/g, "<b>$1</b>").replace(/(^|[\s("“])\*([^*\s][^*]*?)\*(?=[\s.,;:!?)”]|$)/g, "$1<i>$2</i>");
/* chemistry: {{H2SO4}}, {{2H2 + O2 -> 2H2O}}, {{N2 + 3H2 <=> 2NH3}} via mhchem; plain-text fallback with sub/superscripts */
PX.ce1 = t => {
  if (window.katex) { try { return katex.renderToString("\\ce{" + t + "}", { throwOnError: true, strict: false }); } catch (e) {} }
  return `<span class="cef">${PX.esc(PX.sub(t))}</span>`;
};
/* equations are rendered species by species so long ones can wrap on a phone */
PX.ce = t => {
  const parts = String(t).split(/\s+(\+|<=>|->(?:\[[^\]]*\])?)\s+/);
  if (parts.length < 3) return PX.ce1(t);
  return `<span class="ceq">${parts.map((p, i) => i % 2 ? `<span class="op">${p === "+" ? "+" : p === "<=>" ? "⇌" : PX.ce1(p)}</span> ` : `<span style="white-space:nowrap">${PX.ce1(p)}</span>`).join(" ")}</span>`;
};
/* unicode formula for canvas/SVG text: H2SO4 -> H₂SO₄, SO4^2- -> SO₄²⁻ */
PX.sub = t => String(t).replace(/<=>/g, "⇌").replace(/->/g, "→").replace(/\^\{?([0-9]*[+-])\}?/g, (_, c) => c.replace(/[0-9+-]/g, d => "⁰¹²³⁴⁵⁶⁷⁸⁹⁺⁻"["0123456789+-".indexOf(d)])).replace(/([A-Za-z)\]])([0-9]+)/g, (_, a, n) => a + n.replace(/[0-9]/g, d => "₀₁₂₃₄₅₆₇₈₉"[d])).replace(/([A-Za-z)\]₀-₉])([+-])(?=$|[\s,.;)])/g, (_, a, c) => a + (c === "+" ? "⁺" : "⁻"));
PX.h = html => { const t = document.createElement("template"); t.innerHTML = html.trim(); return t.content.firstElementChild; };
PX.clamp = (x, a, b) => Math.min(b, Math.max(a, x));
PX.round = (x, dp) => Math.round(x * 10 ** dp) / 10 ** dp;
PX.sig = (x, n = 3) => Number(Number(x).toPrecision(n));
PX.pick = a => a[Math.floor(Math.random() * a.length)];
PX.rnd = (lo, hi, dp = 2) => PX.round(lo + Math.random() * (hi - lo), dp);
PX.shuffle = a => { const b = [...a]; for (let i = b.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [b[i], b[j]] = [b[j], b[i]]; } return b; };
PX.fmt = (x, n = 3) => {
  if (!isFinite(x)) return "∞";
  if (x === 0) return "0";
  const a = Math.abs(x);
  if (a >= 1e5 || a < 1e-3) { const [m, e] = x.toExponential(n - 1).split("e"); return `${m}×10^${+e}`; }
  return String(Number(x.toPrecision(n)));
};
/* TeX-friendly number: 3 s.f., scientific as a × 10^{b} */
PX.tn = (x, n = 3) => {
  if (!isFinite(x)) return "\\infty";
  if (x === 0) return "0";
  const a = Math.abs(x);
  if (a >= 1e5 || a < 1e-3) { const [m, e] = x.toExponential(n - 1).split("e"); return `${m}\\times10^{${+e}}`; }
  return String(Number(x.toPrecision(n)));
};
PX.today = (d = new Date()) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
PX.addDays = (ds, n) => { const d = new Date(ds + "T12:00:00"); d.setDate(d.getDate() + n); return PX.today(d); };
PX.reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
PX.niceCeil = x => { if (x <= 0) return 1; const p = 10 ** Math.floor(Math.log10(x)); for (const m of [1, 1.2, 1.5, 2, 2.5, 3, 4, 5, 6, 8, 10]) if (m * p >= x - 1e-12) return m * p; return 10 * p; };
PX.niceStep = (range, target = 5) => { const raw = range / target, p = 10 ** Math.floor(Math.log10(raw)); for (const m of [1, 2, 2.5, 5, 10]) if (m * p >= raw - 1e-12) return m * p; return 10 * p; };

/* ---------- theme colours for canvas ---------- */
PX.C = {};
PX.readColors = () => {
  const cs = getComputedStyle(document.documentElement);
  ["bg", "panel", "panel-2", "panel-3", "line", "fg", "muted", "accent", "accent-2", "accent-ink", "good", "bad", "warn", "phys", "inorg", "org", "prac", "c1", "c2", "c3", "c4", "font-mono", "font-body"].forEach(k => PX.C[k] = cs.getPropertyValue("--" + k).trim());
};
PX.rgba = (hex, a) => { let h = (hex || "#888").replace("#", ""); if (h.length === 3) h = h.split("").map(c => c + c).join(""); const n = parseInt(h, 16); return `rgba(${(n >> 16) & 255},${(n >> 8) & 255},${n & 255},${a})`; };
PX.mix = (h1, h2, t) => {
  const p = h => { let s = h.replace("#", ""); if (s.length === 3) s = s.split("").map(c => c + c).join(""); const n = parseInt(s, 16); return [(n >> 16) & 255, (n >> 8) & 255, n & 255]; };
  const a = p(h1), b = p(h2); return `rgb(${a.map((v, i) => Math.round(v + (b[i] - v) * t)).join(",")})`;
};
PX.readColors();
PX.themeListeners = new Set();
const themeChanged = () => { PX.readColors(); PX.themeListeners.forEach(f => { try { f(); } catch (e) {} }); };
matchMedia("(prefers-color-scheme: dark)").addEventListener("change", themeChanged);
new MutationObserver(themeChanged).observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme", "class"] });

/* ---------- canvas helper: DPR, resize, visible-only animation ---------- */
PX.canvas = (host, { aspect = 0.62, minH = 220, maxH = 520, draw, tick } = {}) => {
  const cv = document.createElement("canvas"); host.appendChild(cv);
  const ctx = cv.getContext("2d");
  const st = { W: 1, H: 1, dpr: 1, w: 1, h: 1, dirty: true, visible: true, alive: true, t: 0, last: 0, cv, ctx };
  const resize = () => {
    const w = host.clientWidth || 600, h = PX.clamp(Math.round(w * aspect), minH, maxH);
    st.dpr = Math.min(2, devicePixelRatio || 1); st.w = w; st.h = h;
    cv.style.height = h + "px"; cv.width = Math.round(w * st.dpr); cv.height = Math.round(h * st.dpr);
    st.W = cv.width; st.H = cv.height; st.dirty = true;
  };
  resize();
  const ro = new ResizeObserver(resize); ro.observe(host);
  const io = new IntersectionObserver(es => { st.visible = es[0].isIntersecting; st.dirty = true; }); io.observe(cv);
  const redraw = () => { st.dirty = true; };
  PX.themeListeners.add(redraw);
  const loop = now => {
    if (!st.alive) return;
    const dt = st.last ? Math.min(0.05, (now - st.last) / 1000) : 0; st.last = now;
    if (st.visible && !document.hidden) {
      if (tick) { if (tick(dt, st) !== false) st.dirty = true; }
      if (st.dirty) { ctx.setTransform(st.dpr, 0, 0, st.dpr, 0, 0); ctx.clearRect(0, 0, st.w, st.h); draw(ctx, st); st.dirty = false; }
    }
    requestAnimationFrame(loop);
  };
  requestAnimationFrame(loop);
  st.destroy = () => { st.alive = false; ro.disconnect(); io.disconnect(); PX.themeListeners.delete(redraw); cv.remove(); };
  st.redraw = redraw;
  return st;
};
/* text helper for canvas */
PX.text = (ctx, s, x, y, { color, size = 12, align = "left", base = "middle", weight = 500, mono = true } = {}) => {
  ctx.font = `${weight} ${size}px ${mono ? PX.C["font-mono"] : PX.C["font-body"]}`;
  ctx.fillStyle = color || PX.C.fg; ctx.textAlign = align; ctx.textBaseline = base; ctx.fillText(s, x, y);
};
PX.arrow = (ctx, x1, y1, x2, y2, color, w = 2, head = 8) => {
  const a = Math.atan2(y2 - y1, x2 - x1), L = Math.hypot(x2 - x1, y2 - y1);
  if (L < 1) return;
  const hh = Math.min(head, L * 0.6);
  ctx.strokeStyle = color; ctx.fillStyle = color; ctx.lineWidth = w; ctx.setLineDash([]);
  ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2 - Math.cos(a) * hh * 0.8, y2 - Math.sin(a) * hh * 0.8); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(x2, y2); ctx.lineTo(x2 - hh * Math.cos(a - 0.45), y2 - hh * Math.sin(a - 0.45)); ctx.lineTo(x2 - hh * Math.cos(a + 0.45), y2 - hh * Math.sin(a + 0.45)); ctx.closePath(); ctx.fill();
};

/* ---------- SVG line chart ---------- */
PX.chart = (svg, o) => {
  const W = o.W || 520, H = o.H || 260, m = Object.assign({ l: 52, r: 16, t: 16, b: 40 }, o.m || {});
  svg.setAttribute("viewBox", `0 0 ${W} ${H}`); svg.classList.add("chart");
  const xmin = o.xmin ?? 0, xmax = o.xmax ?? 1, ymin = o.ymin ?? 0, ymax = o.ymax ?? 1;
  const X = x => m.l + (x - xmin) / (xmax - xmin || 1) * (W - m.l - m.r), Y = y => H - m.b - (y - ymin) / (ymax - ymin || 1) * (H - m.t - m.b);
  let s = "";
  const xs = o.xstep || PX.niceStep(xmax - xmin, 5), ys = o.ystep || PX.niceStep(ymax - ymin, 5);
  const lbl = v => { const r = +v.toPrecision(6); return Math.abs(r) >= 1e4 || (Math.abs(r) < 1e-2 && r !== 0) ? r.toExponential(0) : String(r); };
  for (let x = Math.ceil(xmin / xs - 1e-9) * xs; x <= xmax + 1e-9; x += xs) s += `<line class="grid" x1="${X(x)}" x2="${X(x)}" y1="${m.t}" y2="${H - m.b}"/><text x="${X(x)}" y="${H - m.b + 15}" text-anchor="middle">${lbl(x)}</text>`;
  for (let y = Math.ceil(ymin / ys - 1e-9) * ys; y <= ymax + 1e-9; y += ys) s += `<line class="grid" x1="${m.l}" x2="${W - m.r}" y1="${Y(y)}" y2="${Y(y)}"/><text x="${m.l - 6}" y="${Y(y) + 4}" text-anchor="end">${lbl(y)}</text>`;
  const y0 = PX.clamp(Y(0), m.t, H - m.b), x0 = PX.clamp(X(0), m.l, W - m.r);
  s += `<line class="ax" x1="${m.l}" x2="${W - m.r}" y1="${y0}" y2="${y0}"/><line class="ax" x1="${x0}" x2="${x0}" y1="${m.t}" y2="${H - m.b}"/>`;
  if (o.xLabel) s += `<text x="${(m.l + W - m.r) / 2}" y="${H - 6}" text-anchor="middle">${o.xLabel}</text>`;
  if (o.yLabel) s += `<text transform="translate(13 ${(m.t + H - m.b) / 2}) rotate(-90)" text-anchor="middle">${o.yLabel}</text>`;
  (o.areas || []).forEach(a => { if (a.pts.length < 2) return; s += `<path d="M${X(a.pts[0][0])},${Y(a.base ?? 0)}${a.pts.map(p => `L${X(p[0]).toFixed(1)},${Y(p[1]).toFixed(1)}`).join("")}L${X(a.pts[a.pts.length - 1][0])},${Y(a.base ?? 0)}Z" fill="${a.color}" opacity="${a.opacity ?? .18}"/>`; });
  (o.series || []).forEach(se => {
    if (!se.pts.length) return;
    s += `<path d="${se.pts.map((p, i) => `${i ? "L" : "M"}${X(p[0]).toFixed(1)},${Y(PX.clamp(p[1], ymin - (ymax - ymin), ymax + (ymax - ymin))).toFixed(1)}`).join("")}" fill="none" stroke="${se.color}" stroke-width="${se.width || 2.2}" ${se.dash ? `stroke-dasharray="${se.dash}"` : ""} stroke-linejoin="round" stroke-linecap="round"/>`;
    if (se.label) { const p = se.pts[se.labelAt ?? se.pts.length - 1]; s += `<text x="${X(p[0]) + (se.lx || -4)}" y="${Y(p[1]) + (se.ly || -8)}" text-anchor="${se.anchor || "end"}" style="fill:${se.color}">${se.label}</text>`; }
  });
  (o.dots || []).forEach(d => { s += `<circle cx="${X(d[0])}" cy="${Y(d[1])}" r="${d[3] || 5}" fill="${d[2] || "var(--accent)"}" stroke="var(--panel)" stroke-width="2"/>`; if (d[4]) s += `<text x="${X(d[0]) + 8}" y="${Y(d[1]) - 8}" style="fill:${d[2] || "var(--accent)"}">${d[4]}</text>`; });
  (o.crosses || []).forEach(d => { const x = X(d[0]), y = Y(d[1]); s += `<path d="M${x - 4},${y - 4}L${x + 4},${y + 4}M${x - 4},${y + 4}L${x + 4},${y - 4}" stroke="${d[2] || "var(--fg)"}" stroke-width="1.8"/>`; });
  (o.vlines || []).forEach(v => { s += `<line x1="${X(v.x)}" x2="${X(v.x)}" y1="${m.t}" y2="${H - m.b}" stroke="${v.color}" stroke-dasharray="4 3"/>${v.label ? `<text x="${X(v.x) + 4}" y="${m.t + 12}" style="fill:${v.color}">${v.label}</text>` : ""}`; });
  (o.hlines || []).forEach(v => { s += `<line x1="${m.l}" x2="${W - m.r}" y1="${Y(v.y)}" y2="${Y(v.y)}" stroke="${v.color}" stroke-dasharray="4 3"/>${v.label ? `<text x="${W - m.r - 4}" y="${Y(v.y) - 5}" text-anchor="end" style="fill:${v.color}">${v.label}</text>` : ""}`; });
  (o.notes || []).forEach(n => { s += `<text x="${X(n.x)}" y="${Y(n.y)}" text-anchor="${n.anchor || "middle"}" style="fill:${n.color || "var(--muted)"}">${n.text}</text>`; });
  svg.innerHTML = s;
  return { X, Y };
};

/* ---------- controls builder for sims ---------- */
PX.controls = (host, defs, onChange) => {
  const vals = {}, wrap = PX.h(`<div class="ctrls"></div>`);
  defs.forEach(d => {
    vals[d.k] = d.v;
    const id = "c-" + d.k + "-" + Math.random().toString(36).slice(2, 7);
    const c = PX.h(`<div class="ctl"><label for="${id}"><span>${d.label}</span><output></output></label><input type="range" id="${id}" min="${d.min}" max="${d.max}" step="${d.step}" value="${d.v}"></div>`);
    const inp = $("input", c), out = $("output", c);
    const show = () => { out.textContent = (d.fmt ? d.fmt(vals[d.k]) : vals[d.k]) + (d.unit ? " " + d.unit : ""); };
    inp.addEventListener("input", () => { vals[d.k] = +inp.value; show(); onChange(vals, d.k); });
    d._set = v => { vals[d.k] = v; inp.value = v; show(); };
    show(); wrap.appendChild(c);
  });
  host.appendChild(wrap);
  return { vals, set: (k, v) => { const d = defs.find(x => x.k === k); if (d) { d._set(v); } }, el: wrap };
};
PX.readouts = (host, items) => {
  const dl = PX.h(`<dl class="readouts" style="margin:0"></dl>`);
  const map = {};
  items.forEach(([k, label, color]) => { const d = PX.h(`<div class="ro"><dt>${label}</dt><dd ${color ? `style="color:${color}"` : ""}>–</dd></div>`); map[k] = $("dd", d); dl.appendChild(d); });
  host.appendChild(dl);
  return (k, v) => { if (map[k]) map[k].innerHTML = v; };
};
PX.tabs = (host, names, onPick, start = 0) => {
  const t = PX.h(`<div class="tabs" role="tablist">${names.map((n, i) => `<button role="tab" aria-selected="${i === start}" data-i="${i}">${n}</button>`).join("")}</div>`);
  $$("button", t).forEach(b => b.onclick = () => { $$("button", t).forEach(x => x.setAttribute("aria-selected", String(x === b))); onPick(+b.dataset.i); });
  host.appendChild(t);
  return { el: t, select: i => { const b = $$("button", t)[i]; if (b) b.click(); } };
};

/* ---------- learner state ---------- */
const KEY = "as-chem-v1";
const fresh = () => ({ v: 1, name: "", xp: 0, days: [], units: {}, cards: {}, stats: { attempts: 0, firstTry: 0, mcq: 0, mcqFirst: 0, calc: 0, calcFirst: 0, sure: 0, sureRight: 0, lab: 0 }, badges: {}, lab: { done: {} }, calib: [], updatedAt: 0, joined: false });
let S;
try { S = JSON.parse(localStorage.getItem(KEY) || "null"); } catch (e) { S = null; }
if (!S || S.v !== 1) S = fresh();
S = Object.assign(fresh(), S); S.stats = Object.assign(fresh().stats, S.stats);
PX.S = () => S;
const listeners = new Set();
PX.onState = f => { listeners.add(f); return () => listeners.delete(f); };
PX.save = (sync = true) => {
  S.updatedAt = Date.now();
  try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) {}
  listeners.forEach(f => { try { f(S); } catch (e) {} });
};
PX.resetAll = () => { S = fresh(); PX.save(); };
PX.unitState = id => (S.units[id] = S.units[id] || { done: {}, cur: 0, gate: { passed: false, tries: 0, best: 0 } });

PX.markStudy = () => { const t = PX.today(); if (!S.days.includes(t)) { S.days.push(t); if (S.days.length > 400) S.days = S.days.slice(-400); } };
PX.toast = (title, sub = "") => {
  const box = $("#toasts"); if (!box) return;
  const t = PX.h(`<div class="toast"><div>${title}${sub ? `<small>${sub}</small>` : ""}</div></div>`);
  box.appendChild(t); while (box.children.length > 2) box.firstElementChild.remove(); setTimeout(() => t.remove(), 3000);
};
/* progress is kept quietly: no points, just a record of what's done */
PX.award = () => { PX.markStudy(); PX.save(); };
PX.mastered = () => Object.values(S.units).filter(u => u.gate && u.gate.passed).length;

/* ---------- answer checking ---------- */
PX.parseNum = s => {
  let t = String(s).trim().toLowerCase().replace(/\s+/g, "").replace(",", ".").replace(/×|x|\*/g, "e").replace(/e10\^?/, "e").replace("^", "");
  t = t.replace(/^\+/, "");
  const v = Number(t); return isFinite(v) && t !== "" ? v : NaN;
};
PX.near = (a, b, tol = 0.02) => Math.abs(a - b) <= Math.max(tol * Math.abs(b), 1e-12);
PX.judge = (val, q) => {
  if (isNaN(val)) return { ok: false, msg: "Type a number. Powers of ten work as 3.2e-4 or 3.2x10^-4." };
  if (PX.near(val, q.ans, q.tol || 0.02)) return { ok: true };
  const wt = Math.min(0.015, (q.tol || 0.02) * 0.75);
  for (const [v, m] of q.wrongs || []) if (isFinite(v) && m && !PX.near(v, q.ans, (q.tol || 0.02) * 1.5) && PX.near(val, v, wt)) return { ok: false, msg: m, diag: true };
  if (PX.near(-val, q.ans)) return { ok: false, msg: "Right size, wrong sign. Exothermic changes are negative; check the direction of your cycle, or the sign of the oxidation number.", diag: true };
  for (const p of [1e3, 1e-3, 1e6, 1e-6, 1e2, 1e-2, 1e9, 1e-9]) if (PX.near(val * p, q.ans)) return { ok: false, msg: "The digits look right but the power of ten is off. Check units: cm³ ↔ dm³ (÷1000), g ↔ kg, J ↔ kJ (÷1000).", diag: true };
  return { ok: false, msg: "Not yet. Check each substitution and its unit, then try again, or take a hint." };
};

/* ---------- widgets ---------- */
const L = "ABCDEFG";
/* MCQ: item {q, o:[[text, ok, fb]]}. opts.onResult(firstTry, sure). Elaborated feedback per option. */
PX.mcq = (host, item, opts = {}) => {
  const order = opts.keepOrder ? item.o.map((_, i) => i) : PX.shuffle(item.o.map((_, i) => i));
  const wrap = PX.h(`<div class="opts"></div>`);
  if (item.q && !opts.noQ) host.appendChild(PX.h(`<div class="qtext">${PX.md(item.q)}</div>`));
  let conf = null;
  if (opts.confidence) conf = PX.confidence(host);
  host.appendChild(wrap);
  const slot = PX.h(`<div></div>`); host.appendChild(slot);
  let tries = 0, finished = false;
  order.forEach((oi, k) => {
    const [text, ok, fb] = item.o[oi];
    const b = PX.h(`<button class="opt" type="button"><span class="l">${L[k]}</span><span>${PX.md(text)}</span></button>`);
    b.onclick = () => {
      if (finished) return;
      tries++;
      const sure = conf ? conf.get() : null;
      if (opts.anyAnswer) {
        finished = true; b.classList.add(ok ? "right" : "picked"); $$(".opt", wrap).forEach(x => x.disabled = true);
        const right = item.o.find(o => o[1]);
        slot.innerHTML = `<div class="fb ${ok ? "good" : "info"}">${ok ? "<b>Good thinking.</b> " : "<b>Noted. A wrong guess now makes the right idea stick better.</b> "}${PX.md(fb || "")}${!ok && right && right[2] ? `<div style="margin-top:6px">${PX.md(right[2])}</div>` : ""}</div>`;
        opts.onResult && opts.onResult(!!ok, sure); return;
      }
      if (ok) {
        finished = true; b.classList.add("right"); $$(".opt", wrap).forEach(x => x.disabled = true);
        slot.innerHTML = `<div class="fb good"><b>${tries === 1 ? "Right." : "Got there."}</b> ${PX.md(fb || "")}</div>`;
        opts.onResult && opts.onResult(tries === 1, sure);
      } else {
        b.classList.add("wrong"); b.disabled = true;
        const hyper = tries === 1 && sure === 2 ? "<b>You were certain about this one, so it's a great moment to fix it.</b> " : "<b>Not quite.</b> ";
        slot.innerHTML = `<div class="fb bad">${hyper}${PX.md(fb || "Think about which idea this option misapplies.")}</div>`;
        if (tries === 1 && opts.onFirstWrong) opts.onFirstWrong(sure);
        if (opts.gateMode) { finished = true; $$(".opt", wrap).forEach(x => x.disabled = true); const r = order.findIndex(i => item.o[i][1]); $$(".opt", wrap)[r].classList.add("right"); opts.onResult && opts.onResult(false, sure); }
      }
    };
    wrap.appendChild(b);
  });
};
/* Confidence toggle: 0 guessing, 1 fairly sure, 2 certain */
PX.confidence = host => {
  let v = 1;
  const c = PX.h(`<div class="conf"><span>How sure are you?</span><button type="button" data-v="0" aria-pressed="false">Guessing</button><button type="button" data-v="1" aria-pressed="true">Fairly sure</button><button type="button" data-v="2" aria-pressed="false">Certain</button></div>`);
  $$("button", c).forEach(b => b.onclick = () => { v = +b.dataset.v; $$("button", c).forEach(x => x.setAttribute("aria-pressed", String(x === b))); });
  host.appendChild(c);
  return { get: () => v };
};
/* Numeric with the hint ladder: prompt -> cue -> narrow question -> partial step -> full walkthrough (only after an attempt). */
PX.numeric = (host, q, opts = {}) => {
  const id = "n" + Math.random().toString(36).slice(2, 8);
  host.appendChild(PX.h(`<div class="qtext">${PX.md(q.q)}</div>`));
  let conf = opts.confidence ? PX.confidence(host) : null;
  const row = PX.h(`<div class="ans"><label for="${id}" class="muted">${q.label ? PX.md(q.label) : "Answer"}</label><input type="text" id="${id}" inputmode="decimal" autocomplete="off" spellcheck="false"><span class="unit-lbl">${q.unit || ""}</span><button class="btn" type="button" data-a="check">Check</button><button class="btn ghost" type="button" data-a="hint">I'm stuck</button><span class="ladder" title="Hint level">${"<i></i>".repeat(5)}</span></div>`);
  host.appendChild(row);
  const fb = PX.h(`<div style="display:grid;gap:8px"></div>`); host.appendChild(fb);
  const inp = $("input", row);
  let attempts = 0, rung = 0, done = false, solved = false;
  const rungs = [
    "What do you know? Write each given quantity with its symbol and unit, then name the quantity you want. Which equation contains all of them?",
    ...(q.hints || []),
  ];
  const setLadder = () => $$(".ladder i", row).forEach((x, i) => x.classList.toggle("on", i < rung));
  const finish = (firstTry, how) => {
    if (done) return; done = true;
    $("[data-a=check]", row).disabled = true; $("[data-a=hint]", row).disabled = true; inp.readOnly = true;
    opts.onResult && opts.onResult({ firstTry, hints: rung, how, sure: conf ? conf.get() : null });
  };
  const check = () => {
    if (done) return;
    const r = PX.judge(PX.parseNum(inp.value), q); attempts++;
    if (r.ok) {
      solved = true;
      fb.innerHTML = `<div class="fb good"><b>Right: ${PX.fmt(q.ans)} ${q.unit || ""}.</b> ${attempts === 1 && rung === 0 ? "First time, no hints." : rung ? "The hints did their job; next time try one rung fewer." : "Persistence paid off."}${q.after ? " " + PX.md(q.after) : ""}</div>`;
      finish(attempts === 1 && rung === 0, "solved");
    } else {
      const s = conf ? conf.get() : 1;
      const hyper = attempts === 1 && s === 2 ? "<b>You were certain, so this is the best moment to find the slip.</b> " : "";
      fb.innerHTML = `<div class="fb bad">${hyper}${PX.md(r.msg)}</div>` + (attempts >= 1 && rung >= rungs.length ? solBtn() : "");
      if (opts.gateMode && attempts >= 2) { fb.innerHTML += `<div class="fb info">For the mastery check, two tries per question. The answer was ${PX.fmt(q.ans)} ${q.unit || ""}.</div>`; finish(false, "failed"); }
      wireSol();
    }
  };
  const solBtn = () => opts.gateMode ? "" : `<button class="btn ghost sm" type="button" data-a="sol">Walk through the full solution with me</button>`;
  const wireSol = () => { const b = $("[data-a=sol]", fb); if (b) b.onclick = walkthrough; };
  const hint = () => {
    if (done) return;
    if (rung < rungs.length) {
      rung++; setLadder();
      const labels = ["Prompt", "Cue", "Narrow question", "First step"];
      fb.innerHTML = `<div class="fb warn"><b>${labels[Math.min(rung - 1, 3)]}.</b> ${PX.md(rungs[rung - 1])}</div>` + (rung >= rungs.length && attempts > 0 ? solBtn() : "") + (rung >= rungs.length && attempts === 0 && !opts.gateMode ? `<div class="fb info">Have a go with these hints first. After one attempt you can walk through the full solution.</div>` : "");
      wireSol();
      if (rung >= rungs.length) $("[data-a=hint]", row).textContent = attempts ? "Full solution" : "Try first";
    } else if (attempts > 0 && !opts.gateMode) walkthrough();
    else fb.insertAdjacentHTML("beforeend", `<div class="fb info">Make one attempt with the hints above. A wrong answer is fine, because it tells you which step to check.</div>`);
  };
  const walkthrough = () => {
    rung = 5; setLadder();
    const steps = q.sol || [];
    let i = 0;
    const box = PX.h(`<div class="sol"><div class="eyebrow">Worked solution, one step at a time</div><div data-s></div><div class="row"><button class="btn sm" type="button" data-a="nxt">Next step</button></div></div>`);
    fb.innerHTML = ""; fb.appendChild(box);
    const showNext = () => {
      if (i < steps.length) { $("[data-s]", box).insertAdjacentHTML("beforeend", `<div>${steps[i].startsWith("<") ? PX.md(steps[i]) : PX.K(steps[i], true)}</div>`); i++; }
      if (i >= steps.length) { $("[data-a=nxt]", box).remove(); box.insertAdjacentHTML("beforeend", `<p class="muted">Answer: ${PX.fmt(q.ans)} ${q.unit || ""}. Before moving on, say in one sentence why the key step works.</p>`); finish(false, "walkthrough"); if (opts.onTransfer) box.insertAdjacentHTML("beforeend", `<button class="btn sm" type="button" data-a="tr">Try a similar one on your own</button>`), $("[data-a=tr]", box).onclick = opts.onTransfer; }
    };
    $("[data-a=nxt]", box).onclick = showNext; showNext();
  };
  $("[data-a=check]", row).onclick = check;
  $("[data-a=hint]", row).onclick = hint;
  inp.addEventListener("keydown", e => { if (e.key === "Enter") check(); });
  if (opts.focus) setTimeout(() => inp.focus({ preventScroll: true }), 30);
  return { solved: () => solved };
};

/* register units & sims */
PX.unit = def => { PX.units.push(def); PX.units.sort((a, b) => a.n - b.n); };
PX.sim = (id, def) => { PX.sims[id] = def; };
PX.getUnit = id => PX.units.find(u => u.id === id);
PX.STRANDS = { phys: ["Physical chemistry", "var(--phys)"], inorg: ["Inorganic chemistry", "var(--inorg)"], org: ["Organic chemistry", "var(--org)"], prac: ["Practical skills", "var(--prac)"] };
})();
