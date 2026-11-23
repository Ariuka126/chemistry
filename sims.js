/* sims.js — live models for Units 1–13. Each sim: PX.sim(id, { title, mount(host) -> { destroy, cmd } }). */
(() => {
"use strict";
const { $, $$, h, md, K, clamp, round, fmt } = PX;
const C = () => PX.C;
const sub = PX.sub;

/* ---------- shared helpers ---------- */
/* tabbed sim: defs [{name, mount(body, arg) -> {destroy, cmd}}] */
PX.tabbed = (host, defs, start = 0) => {
  const bar = h(`<div class="tabs" role="tablist">${defs.map((d, i) => `<button role="tab" type="button" aria-selected="false" data-i="${i}">${d.name}</button>`).join("")}</div>`);
  const body = h(`<div style="display:grid;gap:10px;min-width:0"></div>`);
  if (defs.length > 1) host.appendChild(bar);
  host.appendChild(body);
  let cur = null, idx = -1;
  const show = (i, arg = {}) => {
    if (i === idx && cur) { cur.cmd && cur.cmd(arg); return; }
    if (cur && cur.destroy) cur.destroy();
    body.innerHTML = ""; idx = i;
    $$("button", bar).forEach((b, k) => b.setAttribute("aria-selected", String(k === i)));
    cur = defs[i].mount(body, arg) || {};
  };
  $$("button", bar).forEach(b => b.onclick = () => show(+b.dataset.i));
  show(start);
  return { destroy: () => cur && cur.destroy && cur.destroy(), cmd: c => show(c.tab ?? idx, c) };
};
const chips = (host, items, onPick, sel) => {
  const row = h(`<div class="pick" role="group"></div>`);
  items.forEach(([k, label]) => { const b = h(`<button class="chip" type="button" aria-pressed="${k === sel}" data-k="${k}">${label}</button>`); b.onclick = () => { set(k); onPick(k); }; row.appendChild(b); });
  const set = k => $$(".chip", row).forEach(c => c.setAttribute("aria-pressed", String(c.dataset.k === String(k))));
  host.appendChild(row);
  return { el: row, set };
};
const note = (host, html = "") => { const n = h(`<div class="sim-note">${md(html)}</div>`); host.appendChild(n); return v => { n.innerHTML = md(v); }; };
const svgBox = (host, w, hgt, cls = "sim") => { const wrap = h(`<div class="svgwrap"><svg class="${cls}" viewBox="0 0 ${w} ${hgt}" role="img"></svg></div>`); host.appendChild(wrap); return $("svg", wrap); };
const reduce = PX.reduceMotion;
const ELNAME = ["hydrogen", "helium", "lithium", "beryllium", "boron", "carbon", "nitrogen", "oxygen", "fluorine", "neon", "sodium", "magnesium", "aluminium", "silicon", "phosphorus", "sulfur", "chlorine", "argon", "potassium", "calcium", "scandium", "titanium", "vanadium", "chromium", "manganese", "iron", "cobalt", "nickel", "copper", "zinc", "gallium", "germanium", "arsenic", "selenium", "bromine", "krypton"];

/* ======================= ATOM (Unit 1) ======================= */
PX.sim("atom", { title: "Atom builder", mount(host) {
  return PX.tabbed(host, [
    { name: "Build an atom", mount(b, arg) {
      const svg = svgBox(b, 460, 300);
      const ro = PX.readouts(b, [["el", "Element"], ["not", "Symbol"], ["Z", "Proton number Z"], ["A", "Mass number A"], ["q", "Charge"], ["kind", "This is"]]);
      const ctl = PX.controls(b, [{ k: "p", label: "Protons", v: arg.p ?? 6, min: 1, max: 20, step: 1 }, { k: "n", label: "Neutrons", v: arg.n ?? 6, min: 0, max: 24, step: 1 }, { k: "e", label: "Electrons", v: arg.e ?? 6, min: 0, max: 22, step: 1 }], () => draw());
      const say = note(b);
      function draw() {
        const { p, n, e } = ctl.vals, el = PX.chem.SYM[p - 1], q = p - e, A = p + n;
        let s = "";
        const shells = [2, 8, 8, 8], R0 = [56, 86, 116, 142];
        let left = e;
        shells.forEach((cap, i) => { s += `<circle cx="230" cy="150" r="${R0[i]}" style="fill:none;stroke:var(--line);stroke-dasharray:3 4"/>`; const k = Math.min(cap, left); left -= k; for (let j = 0; j < k; j++) { const a = -Math.PI / 2 + j * 2 * Math.PI / cap + (i % 2 ? 0.2 : 0); s += `<circle cx="${230 + R0[i] * Math.cos(a)}" cy="${150 + R0[i] * Math.sin(a)}" r="6" style="fill:var(--c1)"/><text x="${230 + R0[i] * Math.cos(a)}" y="${153 + R0[i] * Math.sin(a)}" text-anchor="middle" style="fill:#fff;font-size:9px">−</text>`; } });
        const nuc = [...Array(p).fill(1), ...Array(n).fill(0)].sort(() => 0.5 - ((p * 7 + n * 3) % 5) / 10);
        nuc.forEach((t, i) => { const r = 4.6 * Math.sqrt(i), a = i * 2.4; s += `<circle cx="${230 + r * Math.cos(a)}" cy="${150 + r * Math.sin(a)}" r="5.5" style="fill:${t ? "var(--c3)" : "var(--muted)"};stroke:var(--panel);stroke-width:1"/>`; });
        s += `<g transform="translate(14 22)"><circle r="6" cx="6" cy="0" style="fill:var(--c3)"/><text x="18" y="4">proton</text><circle r="6" cx="6" cy="20" style="fill:var(--muted)"/><text x="18" y="24">neutron</text><circle r="6" cx="6" cy="40" style="fill:var(--c1)"/><text x="18" y="44">electron</text></g>`;
        s += `<text x="446" y="290" text-anchor="end">not to scale: the real nucleus is ~100 000× smaller</text>`;
        svg.innerHTML = s;
        const ch = q === 0 ? "" : `^{${Math.abs(q) > 1 ? Math.abs(q) : ""}${q > 0 ? "+" : "-"}}`;
        ro("el", ELNAME[p - 1]); ro("not", K(`{}^{${A}}_{${p}}\\text{${el}}${ch}`)); ro("Z", p); ro("A", A); ro("q", q === 0 ? "0" : (q > 0 ? "+" : "−") + Math.abs(q));
        ro("kind", q === 0 ? "a neutral atom" : q > 0 ? "a positive ion" : "a negative ion");
        say(q === 0 ? `Electrons = protons, so it's neutral. Changing neutrons makes a different **isotope** of ${ELNAME[p - 1]}; changing protons makes a different element.` : q > 0 ? `${q} electron${q > 1 ? "s" : ""} short: a **cation** with charge +${q}. The nucleus is unchanged.` : `${-q} extra electron${q < -1 ? "s" : ""}: an **anion** with charge −${-q}.`);
      }
      draw();
      return { cmd: c => { ["p", "n", "e"].forEach(k => c[k] != null && ctl.set(k, c[k])); draw(); } };
    } },
    { name: "Beams in a field", mount(b) {
      const svg = svgBox(b, 520, 260);
      const sel = new Set(["p", "n", "e"]);
      const P = { p: ["protons", 1, 1, "var(--c3)"], n: ["neutrons", 0, 1, "var(--muted)"], e: ["electrons", -1, 1 / 1836, "var(--c1)"], he: ["He²⁺", 2, 4, "var(--c2)"], d: ["²H⁺", 1, 2, "var(--c4)"] };
      const row = h(`<div class="pick"></div>`); b.appendChild(row);
      Object.entries(P).forEach(([k, v]) => { const c = h(`<button class="chip" type="button" aria-pressed="${sel.has(k)}">${v[0]}</button>`); c.onclick = () => { sel.has(k) ? sel.delete(k) : sel.add(k); c.setAttribute("aria-pressed", String(sel.has(k))); draw(); }; row.appendChild(c); });
      const ctl = PX.controls(b, [{ k: "E", label: "Field strength", v: 5, min: 1, max: 10, step: 1 }], () => draw());
      const say = note(b, "Angle of deflection ∝ charge ÷ mass. The electron beam is drawn far less bent than reality: it would really bend 1836 times more than the protons.");
      function draw() {
        let s = `<rect x="120" y="30" width="330" height="10" rx="3" style="fill:var(--c3)"/><text x="285" y="24" text-anchor="middle" class="lbl">+ + + + + +</text><rect x="120" y="220" width="330" height="10" rx="3" style="fill:var(--c1)"/><text x="285" y="250" text-anchor="middle" class="lbl">− − − − − −</text><rect x="14" y="118" width="40" height="24" rx="6" style="fill:var(--panel-3)"/><text x="34" y="134" text-anchor="middle">source</text><line x1="54" y1="130" x2="120" y2="130" style="stroke:var(--line);stroke-width:2"/>`;
        const k = ctl.vals.E * 0.0012;
        [...sel].forEach(key => {
          const [name, q, m, col] = P[key];
          let qm = q / m; if (key === "e") qm = -18;
          let d = "M54,130 L120,130", hit = null;
          for (let x = 0; x <= 330; x += 6) { let y = 130 + k * qm * x * x; if (y < 42) { y = 42; hit = 120 + x; } if (y > 218) { y = 218; hit = 120 + x; } d += ` L${120 + x},${y.toFixed(1)}`; if (hit) break; }
          if (!hit) { const yEnd = 130 + k * qm * 330 * 330, slope = 2 * k * qm * 330; d += ` L510,${clamp(yEnd + slope * 60, 10, 250).toFixed(1)}`; }
          s += `<path d="${d}" style="fill:none;stroke:${col};stroke-width:2.6;stroke-linecap:round"/>`;
          if (!reduce) s += `<circle r="5" style="fill:${col}"><animateMotion dur="2.4s" repeatCount="indefinite" path="${d}"/></circle>`;
          const end = d.split(" ").pop().slice(1).split(",");
          s += `<text x="${Math.min(+end[0] + 4, 470)}" y="${clamp(+end[1] + (q > 0 ? 14 : q < 0 ? -6 : -6), 14, 254)}" style="fill:${col};font-weight:600">${name}</text>`;
        });
        svg.innerHTML = s;
      }
      draw();
      return {};
    } },
  ]);
} });

/* ======================= ELECTRONS (Unit 2) ======================= */
PX.sim("electrons", { title: "Electrons and ionisation energy", mount(host) {
  return PX.tabbed(host, [
    { name: "Electrons in boxes", mount(b, arg) {
      const box = h(`<div class="svgwrap" style="padding:12px 14px;display:grid;gap:10px"></div>`); b.appendChild(box);
      const ro = PX.readouts(b, [["sym", "Species"], ["full", "Full configuration"], ["short", "Shorthand"], ["un", "Unpaired electrons"]]);
      const ctl = PX.controls(b, [{ k: "Z", label: "Proton number Z", v: arg.Z ?? 11, min: 1, max: 36, step: 1, fmt: v => `${v} (${PX.chem.SYM[v - 1]})` }, { k: "c", label: "Charge", v: arg.c ?? 0, min: -3, max: 3, step: 1, fmt: v => v > 0 ? "+" + v : String(v) }], () => draw());
      const say = note(b);
      const ORDER = [["1s", 1], ["2s", 1], ["2p", 3], ["3s", 1], ["3p", 3], ["4s", 1], ["3d", 5], ["4p", 3]];
      function draw() {
        const Z = ctl.vals.Z, c = Math.min(ctl.vals.c, Z - 0), cf = PX.chem.config(Z, c);
        const lastIdx = Math.max(0, ...ORDER.map(([s2], i) => cf[s2] ? i : -1));
        box.innerHTML = `<div class="small muted">Filling order runs top to bottom (4s before 3d). Arrows are electron spins.</div>` + ORDER.slice(0, lastIdx + 1).map(([s2, o]) => {
          const n = cf[s2] || 0, boxes = Array.from({ length: o }, (_, i) => { const up = n > i, dn = n > o + i; return `<span style="display:inline-grid;place-items:center;width:30px;height:30px;border:1.5px solid var(--line);border-radius:6px;background:var(--panel);font-size:15px;color:var(--accent);font-weight:700">${up ? "↑" : ""}${dn ? "↓" : ""}</span>`; }).join("");
          return `<div style="display:flex;gap:10px;align-items:center"><b style="width:30px;font-family:var(--font-mono)">${s2}</b><span style="display:flex;gap:3px">${boxes}</span><span class="small muted">${n} e⁻</span></div>`;
        }).join("");
        const t = PX.chem.cfgText(cf), e = Z - c;
        const CORES = [[18, "Ar", ["1s", "2s", "2p", "3s", "3p"]], [10, "Ne", ["1s", "2s", "2p"]], [2, "He", ["1s"]]];
        const core = CORES.find(([n]) => e > n);
        const shortT = core ? `[\\text{${core[1]}}]\\,` + PX.chem.cfgText(Object.fromEntries(Object.entries(cf).filter(([k]) => !core[2].includes(k)))) : t;
        const sym = PX.chem.SYM[Z - 1] + (c ? `^{${Math.abs(c) > 1 ? Math.abs(c) : ""}${c > 0 ? "+" : "-"}}` : "");
        ro("sym", K(`\\text{${PX.chem.SYM[Z - 1]}}${c ? sym.slice(PX.chem.SYM[Z - 1].length) : ""}`)); ro("full", K(t)); ro("short", K(shortT)); ro("un", PX.chem.unpaired(cf));
        let msg = "Electrons fill the lowest-energy sub-shell first, and go into separate orbitals before pairing.";
        if (Z === 24 && c === 0) msg = "**Chromium is an exception**: 3d⁵ 4s¹, not 3d⁴ 4s². A half-filled 3d sub-shell is more stable.";
        else if (Z === 29 && c === 0) msg = "**Copper is an exception**: 3d¹⁰ 4s¹.";
        else if (Z > 20 && Z < 31 && c > 0) msg = "**d-block ions lose 4s electrons first**, even though 4s filled before 3d.";
        else if (c < 0) msg = "A negative ion: extra electrons go into the next available orbitals.";
        say(msg);
      }
      draw();
      return { cmd: x => { if (x.Z != null) ctl.set("Z", x.Z); if (x.c != null) ctl.set("c", x.c); draw(); } };
    } },
    { name: "First IE graph", mount(b) {
      const svg = h(`<svg></svg>`); const w = h(`<div class="svgwrap" style="padding:6px"></div>`); w.appendChild(svg); b.appendChild(w);
      const say = note(b);
      const DIPS = { "Be→B": [4, 5, "B's outer electron is in **2p**, higher in energy than 2s and shielded by the 2s electrons."], "N→O": [7, 8, "O's fourth 2p electron is **paired** in one orbital; spin-pair repulsion makes it easier to remove."], "Mg→Al": [12, 13, "Al's outer electron is in **3p**, higher in energy and shielded by 3s."], "P→S": [15, 16, "S has a **paired** 3p electron: spin-pair repulsion."], "Ne→Na": [10, 11, "Na starts a **new shell**: further away and shielded by 10 inner electrons."] };
      let hi = null;
      const draw = () => {
        const pts = PX.chem.IE1.slice(0, 36).map((v, i) => [i + 1, v]);
        const dots = pts.map(([z, v]) => [z, v, hi && (z === hi[0] || z === hi[1]) ? "var(--c3)" : "var(--accent)", hi && (z === hi[0] || z === hi[1]) ? 6 : 3.5, [2, 10, 18, 36].includes(z) || (hi && z === hi[1]) ? PX.chem.SYM[z - 1] : ""]);
        PX.chart(svg, { W: 560, H: 270, xmin: 0, xmax: 37, ymin: 0, ymax: 2600, xstep: 4, ystep: 500, xLabel: "proton number", yLabel: "IE₁ / kJ mol⁻¹", series: [{ pts, color: "var(--accent)", width: 1.6 }], dots, vlines: [2.5, 10.5, 18.5].map(x => ({ x, color: "var(--line)" })) });
      };
      const c = chips(b, Object.keys(DIPS).map(k => [k, k]), k => { hi = DIPS[k]; draw(); say(hi[2]); }, null);
      b.insertBefore(c.el, w.nextSibling);
      draw(); say("Rises across each period, drops at the start of the next. Pick a dip to see why it happens.");
      return {};
    } },
    { name: "Successive IEs", mount(b, arg) {
      const svg = h(`<svg></svg>`); const w = h(`<div class="svgwrap" style="padding:6px"></div>`); w.appendChild(svg);
      let el = arg.el || "Na", say = () => {};
      const draw = () => {
        const ie = PX.chem.SUCC[el], lg = ie.map(v => Math.log10(v));
        const grp = PX.chem.GROUP[el], jump = grp <= 2 ? grp : grp - 10;
        const W = 560, H = 260, m = { l: 48, r: 12, t: 14, b: 40 }, bw = (W - m.l - m.r) / ie.length;
        const Y = v => H - m.b - (v - 2.5) / (5.6 - 2.5) * (H - m.t - m.b);
        let s = `<line x1="${m.l}" x2="${W - m.r}" y1="${H - m.b}" y2="${H - m.b}" class="ax"/>`;
        [3, 4, 5].forEach(v => { s += `<line class="grid" x1="${m.l}" x2="${W - m.r}" y1="${Y(v)}" y2="${Y(v)}"/><text x="${m.l - 6}" y="${Y(v) + 4}" text-anchor="end">${v}</text>`; });
        ie.forEach((v, i) => { s += `<rect x="${m.l + i * bw + 3}" y="${Y(lg[i])}" width="${bw - 6}" height="${H - m.b - Y(lg[i])}" rx="3" style="fill:${i < jump ? "var(--accent)" : "var(--c2)"};opacity:.85"/><text x="${m.l + (i + 0.5) * bw}" y="${H - m.b + 14}" text-anchor="middle">${i + 1}</text>`; });
        if (jump) s += `<line x1="${m.l + jump * bw}" x2="${m.l + jump * bw}" y1="${m.t}" y2="${H - m.b}" style="stroke:var(--c3);stroke-dasharray:4 3"/><text x="${m.l + jump * bw + 4}" y="${m.t + 12}" style="fill:var(--c3)">big jump</text>`;
        s += `<text x="${(m.l + W - m.r) / 2}" y="${H - 6}" text-anchor="middle">electron removed</text><text transform="translate(13 ${H / 2}) rotate(-90)" text-anchor="middle">log₁₀(IE / kJ mol⁻¹)</text>`;
        svg.setAttribute("viewBox", `0 0 ${W} ${H}`); svg.classList.add("chart"); svg.innerHTML = s;
        const g = jump <= 2 ? jump : jump + 10;
        say(`${jump} electron${jump > 1 ? "s come" : " comes"} off before the big jump, so ${el} has ${jump} outer electron${jump > 1 ? "s" : ""}: **Group ${g}**. After the jump, electrons come from a shell closer to the nucleus with less shielding. A log scale is used because the values span 400 to 300 000 kJ mol⁻¹.`);
      };
      const c = chips(b, Object.keys(PX.chem.SUCC).map(k => [k, k]), k => { el = k; draw(); }, el);
      b.appendChild(w); say = note(b); draw();
      return { cmd: x => { if (x.el) { el = x.el; c.set(el); draw(); } } };
    } },
  ]);
} });

/* ======================= SPECTRUM (Unit 3) ======================= */
const ISO = { B: [[10, 19.9], [11, 80.1]], Ne: [[20, 90.48], [21, 0.27], [22, 9.25]], Mg: [[24, 78.99], [25, 10.0], [26, 11.01]], Cl: [[35, 75.78], [37, 24.22]], Cu: [[63, 69.15], [65, 30.85]], Br: [[79, 50.69], [81, 49.31]], Rb: [[85, 72.17], [87, 27.83]] };
PX.sim("spectrum", { title: "Mass spectrometer", mount(host) {
  return PX.tabbed(host, [
    { name: "Isotopes and Ar", mount(b, arg) {
      let el = arg.el || "Cl";
      const svg = h(`<svg></svg>`); const w = h(`<div class="svgwrap" style="padding:6px"></div>`); w.appendChild(svg);
      const c = chips(b, Object.keys(ISO).map(k => [k, k]), k => { el = k; draw(); }, el);
      b.appendChild(w);
      const res = h(`<div class="callout key"></div>`); b.appendChild(res);
      const draw = () => {
        const d = ISO[el], lo = d[0][0] - 2, hi = d[d.length - 1][0] + 2;
        PX.chart(svg, { W: 540, H: 230, xmin: lo, xmax: hi, ymin: 0, ymax: 100, xstep: 1, ystep: 20, xLabel: "m/z", yLabel: "abundance / %", series: d.map(([m, a]) => ({ pts: [[m, 0], [m, a]], color: "var(--accent)", width: 7 })), notes: d.map(([m, a]) => ({ x: m, y: Math.min(a + 6, 97), text: a + "%", color: "var(--fg)" })) });
        const ar = d.reduce((s, [m, a]) => s + m * a, 0) / d.reduce((s, [, a]) => s + a, 0);
        res.innerHTML = K(`A_r=\\frac{${d.map(([m, a]) => `${m}\\times${a}`).join("+")}}{${round(d.reduce((s, [, a]) => s + a, 0), 2)}}=${ar.toFixed(2)}`, true);
      };
      draw();
      return { cmd: x => { if (x.el) { el = x.el; c.set(el); draw(); } } };
    } },
    { name: "Molecular ion peaks", mount(b, arg) {
      const svg = h(`<svg></svg>`); const w = h(`<div class="svgwrap" style="padding:6px"></div>`); w.appendChild(svg); b.appendChild(w);
      const ro = PX.readouts(b, [["m1", "[M+1] : M"], ["n", "n = (100/1.1) × ratio"], ["m2", "M : [M+2]"]]);
      const ctl = PX.controls(b, [{ k: "n", label: "Carbon atoms", v: arg.n ?? 4, min: 1, max: 12, step: 1 }, { k: "cl", label: "Chlorine atoms", v: arg.cl ?? 0, min: 0, max: 2, step: 1 }, { k: "br", label: "Bromine atoms", v: arg.br ?? 0, min: 0, max: 2, step: 1 }], () => draw());
      const say = note(b);
      const conv = (a, b2) => { const r = Array(a.length + b2.length).fill(0); a.forEach((x, i) => b2.forEach((y, j) => r[i + j] += x * y)); return r; };
      function draw() {
        const { n, cl, br } = ctl.vals;
        let d = [1];
        const c13 = Array(n + 1).fill(0).map((_, k) => { let c = 1; for (let i = 0; i < k; i++) c = c * (n - i) / (i + 1); return c * 0.011 ** k * 0.989 ** (n - k); });
        d = conv(d, c13);
        for (let i = 0; i < cl; i++) d = conv(d, [0.7578, 0, 0.2422]);
        for (let i = 0; i < br; i++) d = conv(d, [0.5069, 0, 0.4931]);
        const top = Math.max(...d), rel = d.slice(0, 7).map(v => v / d[0] * 100), scale = Math.max(...rel);
        PX.chart(svg, { W: 540, H: 230, xmin: -0.8, xmax: 6.8, ymin: 0, ymax: Math.max(110, scale * 1.1), xstep: 1, xLabel: "peak (M + …)", yLabel: "height, M = 100", series: rel.map((v, i) => ({ pts: [[i, 0], [i, v]], color: i === 0 ? "var(--accent)" : i === 1 ? "var(--c2)" : "var(--c3)", width: 8 })), notes: rel.map((v, i) => v > 0.3 ? { x: i, y: v + scale * 0.05 + 3, text: v.toFixed(1), color: "var(--fg)" } : null).filter(Boolean) });
        ro("m1", `${rel[1].toFixed(1)} : 100`); ro("n", (100 / 1.1 * rel[1] / 100).toFixed(1)); ro("m2", cl + br ? `100 : ${rel[2].toFixed(0)}` : "no [M+2]");
        say(cl === 1 && !br ? "One Cl: M : [M+2] ≈ **3 : 1**." : br === 1 && !cl ? "One Br: M : [M+2] ≈ **1 : 1**." : cl === 2 && !br ? "Two Cl: M : [M+2] : [M+4] ≈ **9 : 6 : 1**." : br === 2 && !cl ? "Two Br: **1 : 2 : 1**." : cl + br ? "Mixed halogens give a more complex pattern." : "No halogens: just a small [M+1] from ¹³C, about 1.1% per carbon atom.");
      }
      draw();
      return { cmd: x => { ["n", "cl", "br"].forEach(k => x[k] != null && ctl.set(k, x[k])); draw(); } };
    } },
  ]);
} });

/* ======================= 3D renderer (shared) ======================= */
PX.view3d = (host, getScene, { aspect = 0.7, minH = 260, maxH = 400 } = {}) => {
  const st0 = { rx: -0.35, ry: 0.6, auto: !reduce, drag: null };
  const cv = PX.canvas(host, { aspect, minH, maxH,
    tick: dt => { if (st0.auto && !st0.drag) { st0.ry += dt * 0.5; return true; } return false; },
    draw: (ctx, st) => {
      const sc = getScene(), W = st.w, H = st.h, cx = W / 2, cy = H / 2, R = Math.min(W, H) * 0.32;
      const cr = Math.cos(st0.ry), sr = Math.sin(st0.ry), cxr = Math.cos(st0.rx), sxr = Math.sin(st0.rx);
      const P = ([x, y, z]) => { const x1 = x * cr + z * sr, z1 = -x * sr + z * cr, y1 = y * cxr - z1 * sxr, z2 = y * sxr + z1 * cxr, f = 3.2 / (3.2 + z2 * 0.6); return [cx + x1 * R * f, cy - y1 * R * f, z2, f]; };
      const items = [];
      (sc.lobes || []).forEach(l => { const p = P(l.at); items.push({ z: p[2], d: () => { ctx.fillStyle = PX.rgba(C().c4, 0.22); ctx.strokeStyle = PX.rgba(C().c4, 0.6); ctx.lineWidth = 1.5; ctx.beginPath(); ctx.arc(p[0], p[1], 15 * p[3], 0, 7); ctx.fill(); ctx.stroke(); ctx.fillStyle = C().c4; [-4, 4].forEach(o => { ctx.beginPath(); ctx.arc(p[0] + o, p[1], 2.4, 0, 7); ctx.fill(); }); } }); });
      sc.bonds.forEach(([i, j, o = 1, dash]) => { const a = P(sc.atoms[i].p), b2 = P(sc.atoms[j].p); items.push({ z: (a[2] + b2[2]) / 2 - 0.01, d: () => { ctx.strokeStyle = C().muted; ctx.lineWidth = 4; ctx.setLineDash(dash ? [5, 5] : []); const dx = b2[0] - a[0], dy = b2[1] - a[1], L = Math.hypot(dx, dy) || 1, nx = -dy / L * 4, ny = dx / L * 4; const offs = o === 1 ? [0] : o === 2 ? [-1, 1] : [-1.6, 0, 1.6]; offs.forEach(k => { ctx.beginPath(); ctx.moveTo(a[0] + nx * k, a[1] + ny * k); ctx.lineTo(b2[0] + nx * k, b2[1] + ny * k); ctx.stroke(); }); ctx.setLineDash([]); } }); });
      sc.atoms.forEach(at => { const p = P(at.p); items.push({ z: p[2], d: () => { const r = (at.r || 16) * p[3]; const g = ctx.createRadialGradient(p[0] - r * 0.35, p[1] - r * 0.35, r * 0.2, p[0], p[1], r); g.addColorStop(0, PX.mix(at.c, "#ffffff", 0.45)); g.addColorStop(1, at.c); ctx.fillStyle = g; ctx.beginPath(); ctx.arc(p[0], p[1], r, 0, 7); ctx.fill(); if (at.t) PX.text(ctx, at.t, p[0], p[1] + 1, { color: at.tc || "#fff", size: Math.max(10, r * 0.75), align: "center", weight: 700 }); } }); });
      items.sort((a, b2) => b2.z - a.z).forEach(it => it.d());
      if (sc.label) PX.text(ctx, sc.label, 12, H - 14, { color: C().muted, size: 12 });
    } });
  const cvEl = cv.cv;
  cvEl.style.touchAction = "none"; cvEl.style.cursor = "grab";
  cvEl.addEventListener("pointerdown", e => { st0.drag = [e.clientX, e.clientY, st0.rx, st0.ry]; st0.auto = false; cvEl.setPointerCapture(e.pointerId); });
  cvEl.addEventListener("pointermove", e => { if (!st0.drag) return; st0.ry = st0.drag[3] + (e.clientX - st0.drag[0]) * 0.01; st0.rx = clamp(st0.drag[2] + (e.clientY - st0.drag[1]) * 0.01, -1.5, 1.5); cv.redraw(); });
  cvEl.addEventListener("pointerup", () => { st0.drag = null; });
  return { destroy: cv.destroy, redraw: cv.redraw, st: st0 };
};

/* ======================= SHAPES (Unit 4) ======================= */
const n3 = v => { const L = Math.hypot(...v); return v.map(x => x / L); };
const TET = [[1, 1, 1], [1, -1, -1], [-1, 1, -1], [-1, -1, 1]].map(n3);
const MOLS = {
  BeCl2: { c: "Be", o: ["Cl", "Cl"], dirs: [[1, 0, 0], [-1, 0, 0]], lp: [], ang: "180°", shape: "linear", polar: "non-polar (dipoles cancel)" },
  CO2: { c: "C", o: ["O", "O"], dirs: [[1, 0, 0], [-1, 0, 0]], ord: 2, lp: [], ang: "180°", shape: "linear", polar: "non-polar (dipoles cancel)" },
  BF3: { c: "B", o: ["F", "F", "F"], dirs: [[1, 0, 0], [-0.5, 0.866, 0], [-0.5, -0.866, 0]], lp: [], ang: "120°", shape: "trigonal planar", polar: "non-polar" },
  CH4: { c: "C", o: ["H", "H", "H", "H"], dirs: TET, lp: [], ang: "109.5°", shape: "tetrahedral", polar: "non-polar" },
  "NH4+": { c: "N", o: ["H", "H", "H", "H"], dirs: TET, lp: [], ang: "109.5°", shape: "tetrahedral", polar: "(an ion)" },
  NH3: { c: "N", o: ["H", "H", "H"], dirs: TET.slice(1), lp: [TET[0]], ang: "107°", shape: "trigonal pyramidal", polar: "polar" },
  H2O: { c: "O", o: ["H", "H"], dirs: TET.slice(2), lp: TET.slice(0, 2), ang: "104.5°", shape: "non-linear (bent)", polar: "polar" },
  PF5: { c: "P", o: ["F", "F", "F", "F", "F"], dirs: [[0, 1, 0], [0, -1, 0], [1, 0, 0], [-0.5, 0, 0.866], [-0.5, 0, -0.866]], lp: [], ang: "90° and 120°", shape: "trigonal bipyramidal", polar: "non-polar" },
  SF6: { c: "S", o: ["F", "F", "F", "F", "F", "F"], dirs: [[1, 0, 0], [-1, 0, 0], [0, 1, 0], [0, -1, 0], [0, 0, 1], [0, 0, -1]], lp: [], ang: "90°", shape: "octahedral", polar: "non-polar" },
};
const ACOL = { H: "#b8bfcc", C: "#4a4f5c", N: "#3d6fd9", O: "#d9473d", F: "#3fae5a", Cl: "#2f9e5b", Br: "#a8452a", B: "#d9a05b", Be: "#8a8f99", P: "#d9772b", S: "#d4b21f", I: "#7b3fa8", Si: "#a08a6a" };
PX.ACOL = ACOL;
PX.sim("shapes", { title: "Molecular shapes", mount(host) {
  return PX.tabbed(host, [
    { name: "3D shapes (VSEPR)", mount(b, arg) {
      let mol = arg.mol || "NH3";
      const c = chips(b, Object.keys(MOLS).map(k => [k, sub(k)]), k => { mol = k; upd(); }, mol);
      const holder = h(`<div class="svgwrap"></div>`); b.appendChild(holder);
      const scene = () => { const m = MOLS[mol], atoms = [{ p: [0, 0, 0], c: ACOL[m.c], t: m.c, r: 20 }], bonds = []; m.dirs.forEach((d, i) => { atoms.push({ p: d.map(x => x * 1.05), c: ACOL[m.o[i]], t: m.o[i], r: m.o[i] === "H" ? 12 : 16, tc: m.o[i] === "H" ? "#222" : "#fff" }); bonds.push([0, i + 1, m.ord || 1]); }); return { atoms, bonds, lobes: m.lp.map(d => ({ at: d.map(x => x * 0.62) })), label: "drag to rotate" }; };
      const v = PX.view3d(holder, scene);
      const ro = PX.readouts(b, [["bp", "Bonding pairs"], ["lp", "Lone pairs"], ["sh", "Shape"], ["an", "Bond angle"], ["po", "Molecule"]]);
      const say = note(b);
      const upd = () => { const m = MOLS[mol]; ro("bp", m.dirs.length); ro("lp", m.lp.length); ro("sh", m.shape); ro("an", m.ang); ro("po", m.polar); v.redraw(); say(m.lp.length ? `The purple lobes are **lone pairs**. They repel more strongly than bonding pairs, closing the angle from 109.5° to ${m.ang}.` : m.dirs.length > 4 ? "Period 3 atoms can expand their octet and hold 5 or 6 pairs." : "All pairs are bonding pairs, so the shape is perfectly symmetrical."); };
      upd();
      return { destroy: v.destroy, cmd: x => { if (x.mol) { mol = x.mol; c.set(mol); upd(); } } };
    } },
    { name: "Boiling points", mount(b) {
      const svg = h(`<svg></svg>`); const w = h(`<div class="svgwrap" style="padding:6px"></div>`); w.appendChild(svg); b.appendChild(w);
      const D = { "Group 14": [[2, -162, "CH4"], [3, -112, "SiH4"], [4, -88, "GeH4"], [5, -52, "SnH4"]], "Group 15": [[2, -33, "NH3"], [3, -88, "PH3"], [4, -62, "AsH3"], [5, -17, "SbH3"]], "Group 16": [[2, 100, "H2O"], [3, -60, "H2S"], [4, -41, "H2Se"], [5, -2, "H2Te"]], "Group 17": [[2, 20, "HF"], [3, -85, "HCl"], [4, -67, "HBr"], [5, -35, "HI"]] };
      const cols = ["var(--muted)", "var(--c1)", "var(--c3)", "var(--c2)"];
      PX.chart(svg, { W: 540, H: 280, xmin: 1.6, xmax: 5.6, ymin: -180, ymax: 120, xstep: 1, ystep: 50, xLabel: "period", yLabel: "boiling point / °C", series: Object.entries(D).map(([k, pts], i) => ({ pts: pts.map(p => [p[0], p[1]]), color: cols[i], label: k, labelAt: 3, lx: 6, ly: 4, anchor: "start" })), dots: Object.values(D).flatMap((pts, i) => pts.filter(p => p[0] === 2).map(p => [p[0], p[1], cols[i], 5, sub(p[2])])) });
      note(b, "Down each group, boiling points rise as molecules get more electrons (stronger id–id forces). **NH₃, H₂O and HF break the pattern**: hydrogen bonding makes them boil far higher than the trend predicts. CH₄ can't hydrogen-bond, so Group 14 has no anomaly.");
      return {};
    } },
  ]);
} });

/* ======================= GAS (Unit 5) ======================= */
PX.sim("gas", { title: "Ideal gas box", mount(host) {
  const ctl = PX.controls(host, [{ k: "T", label: "Temperature", v: 300, min: 100, max: 900, step: 10, unit: "K" }, { k: "V", label: "Volume", v: 3, min: 1, max: 5, step: 0.1, unit: "dm³" }, { k: "n", label: "Amount", v: 1, min: 0.25, max: 3, step: 0.25, unit: "mol" }], () => { sync(); cv.redraw(); });
  const holder = h(`<div class="svgwrap"></div>`); host.insertBefore(holder, ctl.el);
  const ro = PX.readouts(host, [["p", "Pressure p = nRT/V"], ["hits", "Wall hits per second (model)"], ["chk", "pV / nT"]]);
  note(host, "Each dot stands for many molecules. Hotter means faster; smaller box or more molecules means more frequent hits on the walls. **Pressure comes from those collisions.**");
  let parts = [], hits = 0, hitT = 0, rate = 0;
  const sync = () => {
    const N = Math.round(ctl.vals.n * 28);
    while (parts.length < N) parts.push({ x: Math.random(), y: Math.random(), a: Math.random() * 6.28 });
    parts.length = N;
    const { T, V, n } = ctl.vals, p = n * 8.31 * T / (V * 1e-3);
    ro("p", `${fmt(p / 1000, 3)} kPa`); ro("chk", `${(p * V * 1e-3 / (n * T)).toFixed(2)} J K⁻¹ mol⁻¹ (= R)`);
  };
  sync();
  const cv = PX.canvas(holder, { aspect: 0.5, minH: 220, maxH: 320,
    tick: dt => {
      const { T, V } = ctl.vals, sp = 0.18 * Math.sqrt(T / 300), wFrac = V / 5;
      parts.forEach(q => { q.x += Math.cos(q.a) * sp * dt / wFrac; q.y += Math.sin(q.a) * sp * dt * 1.6; if (q.x < 0) { q.x = -q.x; q.a = Math.PI - q.a; hits++; } if (q.x > 1) { q.x = 2 - q.x; q.a = Math.PI - q.a; hits++; } if (q.y < 0) { q.y = -q.y; q.a = -q.a; hits++; } if (q.y > 1) { q.y = 2 - q.y; q.a = -q.a; hits++; } });
      hitT += dt; if (hitT > 1) { rate = hits / hitT; hits = 0; hitT = 0; ro("hits", Math.round(rate)); }
      return true;
    },
    draw: (ctx, st) => {
      const W = st.w, H = st.h, bw = (W - 40) * ctl.vals.V / 5, x0 = 20, y0 = 14, bh = H - 28;
      ctx.strokeStyle = C().fg; ctx.lineWidth = 3; ctx.strokeRect(x0, y0, bw, bh);
      ctx.fillStyle = PX.rgba(C().accent, 0.08); ctx.fillRect(x0, y0, bw, bh);
      ctx.fillStyle = C().muted; ctx.fillRect(x0 + bw, y0 - 4, 8, bh + 8);
      const col = PX.mix(C().c1, C().c3, clamp((ctl.vals.T - 100) / 800, 0, 1));
      ctx.fillStyle = col;
      parts.forEach(q => { ctx.beginPath(); ctx.arc(x0 + 6 + q.x * (bw - 12), y0 + 6 + q.y * (bh - 12), 4, 0, 7); ctx.fill(); });
    } });
  return { destroy: cv.destroy, cmd: x => { ["T", "V", "n"].forEach(k => x[k] != null && ctl.set(k, x[k])); sync(); } };
} });

/* ======================= ENERGY (Unit 6) ======================= */
PX.sim("energy", { title: "Enthalpy", mount(host) {
  return PX.tabbed(host, [
    { name: "Pathway diagram", mount(b, arg) {
      const svg = svgBox(b, 540, 280);
      let cat = false;
      const ctl = PX.controls(b, [{ k: "dH", label: "ΔH", v: arg.dH ?? -90, min: -300, max: 300, step: 10, unit: "kJ mol⁻¹" }, { k: "Ea", label: "Activation energy, Ea", v: arg.Ea ?? 120, min: 20, max: 400, step: 10, unit: "kJ mol⁻¹" }], () => draw());
      const tg = h(`<div class="row"><button class="chip" type="button" aria-pressed="false">Add a catalyst</button></div>`); b.appendChild(tg);
      $("button", tg).onclick = e => { cat = !cat; e.currentTarget.setAttribute("aria-pressed", String(cat)); draw(); };
      const ro = PX.readouts(b, [["type", "Reaction is"], ["ea", "Ea (forward)"], ["rev", "Ea (reverse) = Ea − ΔH"]]);
      function draw() {
        let { dH, Ea } = ctl.vals; Ea = Math.max(Ea, dH + 20);
        const Y = e => 230 - (e + 320) / 760 * 200, y0 = Y(0), y1 = Y(dH), yT = Y(Ea), yC = Y(Math.max(dH + 10, Ea * 0.55));
        const curve = yt => `M40,${y0} L150,${y0} C230,${y0} 230,${yt} 280,${yt} C330,${yt} 330,${y1} 410,${y1} L510,${y1}`;
        let s = `<line x1="30" y1="10" x2="30" y2="260" style="stroke:var(--fg);stroke-width:1.5"/><text transform="translate(18 140) rotate(-90)" text-anchor="middle">enthalpy</text><text x="270" y="275" text-anchor="middle">progress of reaction</text>`;
        s += `<path d="${curve(yT)}" style="fill:none;stroke:var(--accent);stroke-width:3"/>`;
        if (cat) s += `<path d="${curve(yC)}" style="fill:none;stroke:var(--good);stroke-width:2.5;stroke-dasharray:6 4"/><text x="282" y="${yC + 16}" text-anchor="middle" style="fill:var(--good)">with catalyst</text>`;
        s += `<text x="60" y="${y0 - 8}" class="lbl">reactants</text><text x="500" y="${y1 - 8}" text-anchor="end" class="lbl">products</text>`;
        const ar = (x, ya, yb, col, lab) => `<line x1="${x}" y1="${ya}" x2="${x}" y2="${yb}" style="stroke:${col};stroke-width:2"/><path d="M${x - 5},${yb + (yb > ya ? -8 : 8)} L${x},${yb} L${x + 5},${yb + (yb > ya ? -8 : 8)}" style="fill:none;stroke:${col};stroke-width:2"/><text x="${x + 8}" y="${(ya + yb) / 2 + 4}" style="fill:${col};font-weight:600">${lab}</text>`;
        s += `<line x1="150" y1="${y0}" x2="300" y2="${y0}" style="stroke:var(--line);stroke-dasharray:3 3"/>` + ar(240, y0, yT + 3, "var(--c2)", "Ea");
        s += `<line x1="410" y1="${y0}" x2="470" y2="${y0}" style="stroke:var(--line);stroke-dasharray:3 3"/>` + (Math.abs(dH) > 5 ? ar(450, y0, y1, dH < 0 ? "var(--c1)" : "var(--c3)", "ΔH") : "");
        svg.innerHTML = s;
        ro("type", dH < 0 ? "exothermic (ΔH < 0)" : dH > 0 ? "endothermic (ΔH > 0)" : "thermoneutral");
        ro("ea", `${cat ? Math.round(Math.max(dH + 10, Ea * 0.55)) : Ea} kJ mol⁻¹`); ro("rev", `${(cat ? Math.round(Math.max(dH + 10, Ea * 0.55)) : Ea) - dH} kJ mol⁻¹`);
      }
      draw();
      return { cmd: x => { if (x.dH != null) ctl.set("dH", x.dH); if (x.Ea != null) ctl.set("Ea", x.Ea); draw(); } };
    } },
    { name: "Calorimeter", mount(b) {
      const svg = h(`<svg></svg>`); const w = h(`<div class="svgwrap" style="padding:6px"></div>`); w.appendChild(svg); b.appendChild(w);
      const ctl = PX.controls(b, [{ k: "V", label: "Volume of each solution", v: 50, min: 20, max: 100, step: 5, unit: "cm³" }, { k: "c", label: "Concentration of each", v: 1, min: 0.5, max: 2, step: 0.1, unit: "mol dm⁻³" }, { k: "loss", label: "Heat loss (cooling rate)", v: 0.15, min: 0, max: 0.4, step: 0.05, unit: "K min⁻¹" }], () => draw());
      const ro = PX.readouts(b, [["dT", "ΔT (extrapolated)"], ["q", "q = mcΔT"], ["n", "n(H₂O)"], ["dH", "ΔH = −q/n"]]);
      note(b, "HCl + NaOH, mixed at 3 min. Extrapolating the cooling line back to the moment of mixing corrects for heat lost while the temperature was rising. True value: −57.1 kJ mol⁻¹.");
      function draw() {
        const { V, c, loss } = ctl.vals, n = c * V / 1000, m = 2 * V, dTtrue = 57100 * n / (m * 4.18), T0 = 20;
        const T = t => t < 3 ? T0 : T0 + dTtrue * (1 - Math.exp(-(t - 3) * 2.2)) - loss * (t - 3);
        const pts = []; for (let t = 0; t <= 10; t += 0.1) pts.push([t, T(t)]);
        const ex = [[3, T0 + dTtrue], [10, T0 + dTtrue - loss * 7]];
        PX.chart(svg, { W: 540, H: 240, xmin: 0, xmax: 10, ymin: T0 - 1, ymax: T0 + dTtrue * 1.15 + 1, xstep: 1, xLabel: "time / min", yLabel: "temperature / °C", series: [{ pts, color: "var(--accent)" }, { pts: ex, color: "var(--c3)", dash: "5 4", width: 1.6 }], vlines: [{ x: 3, color: "var(--muted)", label: "mix" }] });
        const q = m * 4.18 * dTtrue;
        ro("dT", `${dTtrue.toFixed(1)} K`); ro("q", `${fmt(q, 3)} J`); ro("n", `${fmt(n, 3)} mol`); ro("dH", `${(-q / n / 1000).toFixed(1)} kJ mol⁻¹`);
      }
      draw();
      return {};
    } },
    { name: "Hess cycle", mount(b) {
      const EX = [
        { name: "ΔHf of propane (combustion data)", top: "3C(s) + 4H₂(g)", right: "C₃H₈(g)", bottom: "3CO₂(g) + 4H₂O(l)", a: "3(−394) + 4(−286) = −2326", b: "−2219", q: "ΔHf", ans: "−2326 − (−2219) = −107 kJ mol⁻¹", rule: "Reactants → combustion products directly (left arrow) = via propane: ΔHf + ΔHc(propane). So ΔHf = −2326 − (−2219)." },
        { name: "ΔHc of ethene (formation data)", top: "C₂H₄(g) + 3O₂(g)", right: "2CO₂(g) + 2H₂O(l)", bottom: "2C(s) + 2H₂(g) + 3O₂(g)", a: "+52 (ΔHf of C₂H₄; O₂ is 0)", b: "2(−394) + 2(−286) = −1360", q: "ΔHc", ans: "−1360 − (+52) = −1412 kJ mol⁻¹", rule: "Elements → products directly = via reactants: ΣΔHf(reactants) + ΔHr. So ΔHr = ΣΔHf(products) − ΣΔHf(reactants)." },
      ];
      let ex = 0, step = 0;
      const c = chips(b, EX.map((e, i) => [i, e.name]), k => { ex = +k; step = 0; draw(); }, 0);
      const svg = svgBox(b, 560, 270);
      const row = h(`<div class="row"><button class="btn sm" type="button">Next step</button><button class="btn ghost sm" type="button">Start again</button></div>`); b.appendChild(row);
      const say = note(b);
      $$("button", row)[0].onclick = () => { step = Math.min(3, step + 1); draw(); };
      $$("button", row)[1].onclick = () => { step = 0; draw(); };
      function draw() {
        const e = EX[ex], formation = ex === 1;
        const box = (x, y, t) => `<rect x="${x - 95}" y="${y - 17}" width="190" height="34" rx="10" style="fill:var(--panel);stroke:var(--line)"/><text x="${x}" y="${y + 5}" text-anchor="middle" class="lbl">${t}</text>`;
        const arr = (x1, y1, x2, y2, col, lab, show) => show ? `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" style="stroke:${col};stroke-width:2.4"/><circle cx="${x2}" cy="${y2}" r="4" style="fill:${col}"/><text x="${(x1 + x2) / 2 + (x1 === x2 ? 8 : 0)}" y="${(y1 + y2) / 2 - 8}" text-anchor="${x1 === x2 ? "start" : "middle"}" style="fill:${col};font-weight:600">${lab}</text>` : "";
        let s = box(130, 50, e.top) + box(430, 50, e.right) + box(280, 220, e.bottom);
        s += arr(228, 50, 330, 50, "var(--accent)", e.q + " = ?", true);
        if (!formation) { s += arr(150, 70, 255, 200, "var(--c2)", "", step >= 1); s += arr(410, 70, 305, 200, "var(--c1)", "", step >= 2); if (step >= 1) s += `<text x="60" y="150" style="fill:var(--c2)">${e.a}</text>`; if (step >= 2) s += `<text x="420" y="150" style="fill:var(--c1)">${e.b}</text>`; }
        else { s += arr(255, 200, 150, 70, "var(--c2)", "", step >= 1); s += arr(305, 200, 410, 70, "var(--c1)", "", step >= 2); if (step >= 1) s += `<text x="40" y="150" style="fill:var(--c2)">${e.a}</text>`; if (step >= 2) s += `<text x="380" y="150" style="fill:var(--c1)">${e.b}</text>`; }
        svg.innerHTML = s;
        say(step === 0 ? "The top arrow is the one we want. Hess's law: any other route between the same start and finish has the same total. Press **Next step**." : step === 1 ? (formation ? "Elements → reactants: the enthalpies of formation of the reactants." : "Reactants → combustion products: burn the elements.") : step === 2 ? (formation ? "Elements → products: the enthalpies of formation of the products." : "Propane → combustion products: its ΔHc.") : `${e.rule} **${e.q} = ${e.ans}**`);
      }
      draw();
      return {};
    } },
  ]);
} });

/* ======================= OXIDATION NUMBERS (Unit 7) ======================= */
const OXS = [
  ["SO4^2-", -2, [["S", 1, 6], ["O", 4, -2]], "sulfate(VI)"], ["H2SO4", 0, [["H", 2, 1], ["S", 1, 6], ["O", 4, -2]], "sulfuric(VI) acid"], ["SO2", 0, [["S", 1, 4], ["O", 2, -2]], "sulfur(IV) oxide"], ["H2S", 0, [["H", 2, 1], ["S", 1, -2]], "hydrogen sulfide"],
  ["MnO4-", -1, [["Mn", 1, 7], ["O", 4, -2]], "manganate(VII)"], ["Cr2O7^2-", -2, [["Cr", 2, 6], ["O", 7, -2]], "dichromate(VI)"], ["NO3-", -1, [["N", 1, 5], ["O", 3, -2]], "nitrate(V)"], ["NH4+", 1, [["N", 1, -3], ["H", 4, 1]], "ammonium"],
  ["ClO-", -1, [["Cl", 1, 1], ["O", 1, -2]], "chlorate(I)"], ["ClO3-", -1, [["Cl", 1, 5], ["O", 3, -2]], "chlorate(V)"], ["H2O2", 0, [["H", 2, 1], ["O", 2, -1]], "hydrogen peroxide (O is −1)"], ["NaH", 0, [["Na", 1, 1], ["H", 1, -1]], "sodium hydride (H is −1)"],
  ["Fe2O3", 0, [["Fe", 2, 3], ["O", 3, -2]], "iron(III) oxide"], ["VO2+", 1, [["V", 1, 5], ["O", 2, -2]], "dioxovanadium(V)"], ["P4O10", 0, [["P", 4, 5], ["O", 10, -2]], "phosphorus(V) oxide"], ["OF2", 0, [["O", 1, 2], ["F", 2, -1]], "oxygen difluoride (O is +2)"],
];
PX.sim("oxnum", { title: "Oxidation number explorer", mount(host, arg = {}) {
  let cur = OXS[0][0];
  const c = chips(host, OXS.map(o => [o[0], sub(o[0])]), k => { cur = k; draw(); }, cur);
  const card = h(`<div class="svgwrap" style="padding:16px;display:grid;gap:12px"></div>`); host.appendChild(card);
  const say = note(host, "Rules: elements 0; F −1; O −2 (except peroxides and OF₂); H +1 (except metal hydrides); Group 1 +1; Group 2 +2; the sum equals the charge.");
  function draw() {
    const [f, q, parts, name] = OXS.find(o => o[0] === cur);
    const sum = parts.map(([e, n, o]) => `${n}(${o > 0 ? "+" : ""}${o})`).join(" + ");
    card.innerHTML = `<div style="font-size:26px;text-align:center">${PX.ce(f)}</div><div class="small muted" style="text-align:center">${name}</div><div style="display:flex;gap:10px;flex-wrap:wrap;justify-content:center">${parts.map(([e, n, o]) => `<div style="background:var(--panel);border-radius:12px;padding:10px 14px;text-align:center;box-shadow:inset 0 0 0 1.5px var(--line)"><div style="font-family:var(--font-display);font-size:20px">${e}</div><div class="small muted">× ${n}</div><div style="font-family:var(--font-mono);font-weight:700;font-size:18px;color:${o > 0 ? "var(--c3)" : o < 0 ? "var(--c1)" : "var(--muted)"}">${Number.isInteger(o) ? (o > 0 ? "+" : "") + o : o.toFixed(2)}</div></div>`).join("")}</div><div class="eq" style="font-family:var(--font-mono)">${sum} = ${q > 0 ? "+" : ""}${q} &nbsp;✓ (overall charge)</div>`;
  }
  draw();
  return { cmd: x => { if (x.pick) { cur = x.pick; c.set(cur); draw(); } } };
} });

/* ======================= EQUILIBRIUM (Unit 8) ======================= */
PX.sim("equilibrium", { title: "Equilibrium", mount(host) {
  return PX.tabbed(host, [
    { name: "N₂O₄ ⇌ 2NO₂", mount(b) {
      const top = h(`<div style="display:grid;grid-template-columns:110px minmax(0,1fr);gap:10px;align-items:center"></div>`); b.appendChild(top);
      const flask = h(`<svg viewBox="0 0 110 150" style="width:100%"><path d="M40 8h30v44l30 52c6 12-2 38-20 38H30c-18 0-26-26-20-38l30-52z" style="fill:var(--panel);stroke:var(--fg);stroke-width:2.5"/><path class="flask-fill" d="M40 30h30v22l30 52c6 12-2 38-20 38H30c-18 0-26-26-20-38l30-52z" style="fill:#c0612a;opacity:.4"/></svg>`); top.appendChild(flask);
      const svg = h(`<svg></svg>`); const w = h(`<div class="svgwrap" style="padding:4px"></div>`); w.appendChild(svg); top.appendChild(w);
      const btns = [["addA", "Add N₂O₄"], ["addB", "Add NO₂"], ["remB", "Remove NO₂"], ["heat", "Heat (+30 K)"], ["cool", "Cool (−30 K)"], ["comp", "Compress (½V)"], ["exp", "Expand (2V)"], ["cat", "Catalyst"]];
      const row = h(`<div class="pick">${btns.map(([k, l]) => `<button class="chip" type="button" data-k="${k}">${l}</button>`).join("")}</div>`); b.appendChild(row);
      const ro = PX.readouts(b, [["T", "Temperature"], ["a", "[N₂O₄]"], ["bb", "[NO₂]"], ["Q", "Qc = [NO₂]²/[N₂O₄]"], ["K", "Kc at this T"]]);
      const say = note(b, "{{N2O4(g) <=> 2NO2(g)}}, ΔH = +57 kJ mol⁻¹. N₂O₄ is colourless; NO₂ is brown. Make a change and watch the system respond.");
      const dH = 57200, K298 = 4.6e-3;
      let T = 298, cat = false, a = 0.05, bc = Math.sqrt(K298 * 0.05), hist = [], t = 0;
      const Kc = () => K298 * Math.exp(-dH / 8.31 * (1 / T - 1 / 298));
      const act = { addA: () => a += 0.03, addB: () => bc += 0.03, remB: () => bc *= 0.4, heat: () => T = Math.min(398, T + 30), cool: () => T = Math.max(238, T - 30), comp: () => { a *= 2; bc *= 2; }, exp: () => { a /= 2; bc /= 2; }, cat: () => { cat = !cat; } };
      const msgs = { addA: "More N₂O₄: equilibrium shifts **right** to use some of it up. Kc doesn't change.", addB: "More NO₂: shifts **left**. Kc doesn't change.", remB: "NO₂ removed: shifts **right** to replace some. Kc doesn't change.", heat: "Heating favours the **endothermic** forward reaction: more NO₂, darker. **Kc increases.**", cool: "Cooling favours the **exothermic** backward reaction: paler. **Kc decreases.**", comp: "Compressing doubles every concentration at once (darker instantly), then the system shifts **left**, to fewer gas molecules (1 vs 2).", exp: "Expanding: shifts **right**, to more gas molecules.", cat: "A catalyst speeds up both directions equally: equilibrium is reached faster, but the position and Kc don't change." };
      $$("button", row).forEach(bt => bt.onclick = () => { act[bt.dataset.k](); if (bt.dataset.k === "cat") bt.setAttribute("aria-pressed", String(cat)); say(msgs[bt.dataset.k]); });
      const cv = { alive: true };
      let last = 0;
      const loop = now => {
        if (!cv.alive) return;
        const dt = last ? Math.min(0.05, (now - last) / 1000) : 0; last = now;
        if (!document.hidden) {
          const kb = cat ? 60 : 12, kf = Kc() * kb;
          for (let i = 0; i < 10; i++) { const r = (kf * a - kb * bc * bc) * dt / 10; a = Math.max(1e-5, a - r); bc = Math.max(1e-5, bc + 2 * r); }
          t += dt; if (!hist.length || t - hist[hist.length - 1][0] > 0.1) { hist.push([t, a, bc]); if (hist.length > 300) hist.shift(); }
          const t0 = Math.max(0, t - 30), ymax = PX.niceCeil(Math.max(0.06, ...hist.map(x => Math.max(x[1], x[2]))) * 1.1);
          PX.chart(svg, { W: 460, H: 200, m: { l: 50, r: 12, t: 10, b: 30 }, xmin: t0, xmax: t0 + 30, ymin: 0, ymax, xstep: 5, xLabel: "time / s", yLabel: "mol dm⁻³", series: [{ pts: hist.filter(x => x[0] >= t0).map(x => [x[0], x[1]]), color: "var(--muted)", label: "N₂O₄" }, { pts: hist.filter(x => x[0] >= t0).map(x => [x[0], x[2]]), color: "#c0612a", label: "NO₂", ly: -10 }] });
          $(".flask-fill", flask).style.opacity = clamp(bc / 0.08, 0.05, 1).toFixed(2);
          ro("T", `${T} K`); ro("a", a.toFixed(4)); ro("bb", bc.toFixed(4)); ro("Q", (bc * bc / a).toExponential(2)); ro("K", Kc().toExponential(2));
        }
        requestAnimationFrame(loop);
      };
      requestAnimationFrame(loop);
      return { destroy: () => { cv.alive = false; } };
    } },
    { name: "Titration curves", mount(b, arg) {
      const COMBOS = [["Strong acid + strong base", 1e8, null], ["Weak acid + strong base", 1.8e-5, null], ["Strong acid + weak base", 1e8, 1.8e-5], ["Weak acid + weak base", 1.8e-5, 1.8e-5]];
      let combo = arg.combo ?? 0;
      const c = chips(b, COMBOS.map((x, i) => [i, x[0]]), k => { combo = +k; draw(); }, combo);
      const svg = h(`<svg></svg>`); const w = h(`<div class="svgwrap" style="padding:6px"></div>`); w.appendChild(svg); b.appendChild(w);
      const ro = PX.readouts(b, [["eq", "pH at equivalence"], ["jump", "Steep section"], ["ind", "Suitable indicator"]]);
      const say = note(b, "25.0 cm³ of 0.100 mol dm⁻³ acid in the flask; 0.100 mol dm⁻³ base added from the burette. Shaded bands: methyl orange (3.1–4.4) and phenolphthalein (8.3–10.0).");
      const Kw = 1e-14;
      const pH = (Va, Vb, Ka, Kb) => {
        const Vt = (Va + Vb) / 1000, Ca = 0.1 * Va / 1000 / Vt, Cb = 0.1 * Vb / 1000 / Vt;
        const f = lh => { const hh = 10 ** lh, oh = Kw / hh, A = Ca * Ka / (Ka + hh), BH = Kb ? Cb * (Kb * hh / Kw) / (1 + Kb * hh / Kw) : Cb; return hh + BH - oh - A; };
        let lo = -14.5, hi = 0.5; for (let i = 0; i < 60; i++) { const mid = (lo + hi) / 2; if (f(mid) > 0) hi = mid; else lo = mid; }
        return -(lo + hi) / 2;
      };
      function draw() {
        const [, Ka, Kb] = COMBOS[combo], pts = [];
        for (let v = 0; v <= 50; v += 0.25) pts.push([v, pH(25, v, Ka, Kb)]);
        const pe = pH(25, 25, Ka, Kb), lo = pH(25, 24.9, Ka, Kb), hi = pH(25, 25.1, Ka, Kb);
        PX.chart(svg, { W: 540, H: 260, xmin: 0, xmax: 50, ymin: 0, ymax: 14, xstep: 5, ystep: 2, xLabel: "volume of base added / cm³", yLabel: "pH", areas: [{ pts: [[0, 4.4], [50, 4.4]], base: 3.1, color: "var(--c3)", opacity: 0.15 }, { pts: [[0, 10], [50, 10]], base: 8.3, color: "var(--c4)", opacity: 0.15 }], series: [{ pts, color: "var(--accent)", width: 2.6 }], vlines: [{ x: 25, color: "var(--muted)", label: "equivalence" }] });
        const jumpTop = hi, jumpBot = lo, fits = (a, z) => jumpBot <= a && jumpTop >= z;
        const ind = fits(3.1, 4.4) && fits(8.3, 10) ? "methyl orange or phenolphthalein" : fits(8.3, 10) ? "phenolphthalein" : fits(3.1, 4.4) ? "methyl orange" : "none: no sharp end point";
        ro("eq", pe.toFixed(1)); ro("jump", jumpTop - jumpBot > 2 ? `pH ${jumpBot.toFixed(1)} to ${jumpTop.toFixed(1)}` : "no sharp jump"); ro("ind", ind);
      }
      draw();
      return { cmd: x => { if (x.combo != null) { combo = x.combo; c.set(combo); draw(); } } };
    } },
  ]);
} });

/* ======================= BOLTZMANN (Unit 9) ======================= */
PX.sim("boltzmann", { title: "Boltzmann distribution", mount(host) {
  const svg = h(`<svg></svg>`); const w = h(`<div class="svgwrap" style="padding:6px"></div>`); w.appendChild(svg); host.appendChild(w);
  let cat = false;
  const ctl = PX.controls(host, [{ k: "T", label: "Temperature T₁", v: 300, min: 200, max: 600, step: 10, unit: "K" }, { k: "T2", label: "Compare with T₂", v: 340, min: 200, max: 600, step: 10, unit: "K" }, { k: "Ea", label: "Activation energy", v: 6, min: 3, max: 10, step: 0.5, fmt: v => `${v} × RT(300 K)` }], () => draw());
  const tg = h(`<div class="row"><button class="chip" type="button" aria-pressed="false">Add a catalyst</button></div>`); host.appendChild(tg);
  $("button", tg).onclick = e => { cat = !cat; e.currentTarget.setAttribute("aria-pressed", String(cat)); draw(); };
  const ro = PX.readouts(host, [["f1", "Fraction ≥ Ea at T₁"], ["f2", "Fraction ≥ Ea at T₂"], ["r", "Rate ratio (approx.)"]]);
  note(host, "Area under each curve = total number of molecules, so it stays the same. Shaded area = molecules with enough energy to react.");
  const erfc = x => { const t = 1 / (1 + 0.3275911 * x), y = t * (0.254829592 + t * (-0.284496736 + t * (1.421413741 + t * (-1.453152027 + t * 1.061405429)))); return y * Math.exp(-x * x); };
  const frac = x => 2 * Math.sqrt(x / Math.PI) * Math.exp(-x) + erfc(Math.sqrt(x));
  const f = (E, T) => { const kT = T / 300; return 2 / Math.sqrt(Math.PI) * Math.sqrt(E) / kT ** 1.5 * Math.exp(-E / kT); };
  function draw() {
    const { T, T2 } = ctl.vals, Ea = cat ? ctl.vals.Ea * 0.6 : ctl.vals.Ea, E0 = ctl.vals.Ea;
    const curve = TT => { const p = []; for (let E = 0; E <= 12; E += 0.05) p.push([E, f(E, TT)]); return p; };
    const c1 = curve(T), c2 = curve(T2), ymax = Math.max(...c1.map(p => p[1]), ...c2.map(p => p[1])) * 1.12;
    const shade = cc => cc.filter(p => p[0] >= Ea);
    PX.chart(svg, { W: 540, H: 250, xmin: 0, xmax: 12, ymin: 0, ymax, xstep: 2, ystep: ymax * 2, xLabel: "energy (multiples of RT at 300 K)", yLabel: "number of molecules", areas: [{ pts: shade(c2), color: "var(--c3)", opacity: 0.22 }, { pts: shade(c1), color: "var(--accent)", opacity: 0.35 }], series: [{ pts: c1, color: "var(--accent)", label: `T₁ = ${T} K`, labelAt: 30, lx: 8, ly: -8, anchor: "start" }, { pts: c2, color: "var(--c3)", dash: "6 4", label: `T₂ = ${T2} K`, labelAt: 60, lx: 8, ly: -6, anchor: "start" }], vlines: [{ x: Ea, color: "var(--good)", label: cat ? "Ea (catalysed)" : "Ea" }, ...(cat ? [{ x: E0, color: "var(--muted)", label: "Ea (uncatalysed)" }] : [])] });
    const F1 = frac(Ea / (T / 300)), F2 = frac(Ea / (T2 / 300));
    ro("f1", (F1 * 100).toPrecision(3) + "%"); ro("f2", (F2 * 100).toPrecision(3) + "%"); ro("r", `× ${(F2 / F1).toFixed(2)}`);
  }
  draw();
  return { cmd: x => { if (x.T) ctl.set("T", x.T); if (x.T2) ctl.set("T2", x.T2); if (x.cat != null) { cat = x.cat; $("button", tg).setAttribute("aria-pressed", String(cat)); } draw(); } };
} });

/* ======================= PERIOD 3 (Unit 10) ======================= */
const P3 = ["Na", "Mg", "Al", "Si", "P", "S", "Cl", "Ar"];
const P3T = ["met", "met", "met", "gc", "sm", "sm", "sm", "sm"];
const P3D = {
  atomic: ["Atomic radius / pm", [186, 160, 143, 117, 110, 104, 99, null], "Decreases across: more protons pull the same shell closer (shielding barely changes)."],
  ionic: ["Ionic radius / pm", [95, 65, 50, 41, 212, 184, 181, null], "Cations (Na⁺–Si⁴⁺, 10 electrons) are small and shrink; anions (P³⁻–Cl⁻, 18 electrons) are large and shrink. The big jump is the extra shell."],
  mp: ["Melting point / K", [371, 923, 933, 1683, 317, 392, 172, 84], "Metallic bonding strengthens Na → Al; Si is giant covalent (highest); P₄, S₈, Cl₂, Ar are simple molecular: S₈ > P₄ > Cl₂ > Ar by number of electrons."],
  cond: ["Electrical conductivity / 10⁷ S m⁻¹", [2.1, 2.3, 3.8, 0.2, 0, 0, 0, 0], "Metals conduct (more delocalised electrons: better). Si is a semiconductor (bar exaggerated so you can see it). The rest don't conduct."],
  ie: ["First IE / kJ mol⁻¹", [496, 738, 578, 787, 1012, 1000, 1251, 1521], "Rises across, with dips at Al (3p) and S (paired 3p electron)."],
  en: ["Electronegativity (Pauling)", [0.9, 1.2, 1.5, 1.8, 2.1, 2.5, 3.0, null], "Rises across: more protons, smaller atoms. This drives ionic → covalent bonding in the oxides and chlorides."],
};
const P3C = {
  Na2O: ["giant ionic", "+1", "{{Na2O + H2O -> 2NaOH}}", 13.5, "basic: {{Na2O + 2HCl -> 2NaCl + H2O}}"], MgO: ["giant ionic", "+2", "{{MgO + H2O -> Mg(OH)2}} (slightly soluble)", 9, "basic: {{MgO + 2HCl -> MgCl2 + H2O}}"], Al2O3: ["giant ionic (some covalent character)", "+3", "insoluble", 7, "amphoteric: reacts with HCl and with NaOH to give {{NaAl(OH)4}}"], SiO2: ["giant covalent", "+4", "insoluble", 7, "acidic: {{SiO2 + 2NaOH -> Na2SiO3 + H2O}} (hot, conc.)"], P4O10: ["simple molecular", "+5", "{{P4O10 + 6H2O -> 4H3PO4}}", 2, "acidic: reacts with NaOH to give phosphates"], SO2: ["simple molecular", "+4", "{{SO2 + H2O -> H2SO3}}", 3, "acidic"], SO3: ["simple molecular", "+6", "{{SO3 + H2O -> H2SO4}}", 1, "acidic"],
  NaCl: ["giant ionic", "+1", "dissolves, no hydrolysis", 7, "neutral solution"], MgCl2: ["giant ionic", "+2", "dissolves, very slight hydrolysis", 6.5, "very slightly acidic"], AlCl3: ["covalent ({{Al2Cl6}} dimer)", "+3", "hydrolysed: white fumes of HCl", 3, "acidic"], SiCl4: ["simple molecular", "+4", "{{SiCl4 + 2H2O -> SiO2 + 4HCl}}", 2, "acidic, fumes of HCl"], PCl5: ["simple molecular (solid is ionic {{PCl4+ PCl6-}})", "+5", "{{PCl5 + 4H2O -> H3PO4 + 5HCl}}", 2, "acidic, fumes of HCl"],
};
PX.sim("period3", { title: "Period 3 trends", mount(host) {
  return PX.tabbed(host, [
    { name: "Physical trends", mount(b, arg) {
      let prop = arg.prop || "mp";
      const c = chips(b, Object.entries(P3D).map(([k, v]) => [k, v[0].split(" /")[0].replace(" (Pauling)", "")]), k => { prop = k; draw(); }, prop);
      const svg = svgBox(b, 540, 260);
      const say = note(b);
      const key = h(`<div class="legend-row small"><span><i style="background:var(--c2)"></i>giant metallic</span><span><i style="background:var(--c4)"></i>giant covalent</span><span><i style="background:var(--c1)"></i>simple molecular / atomic</span></div>`); b.appendChild(key);
      function draw() {
        const [lab, vals, txt] = P3D[prop], mx = Math.max(...vals.filter(v => v != null)), bw = 56;
        let s = `<text x="12" y="16">${lab}</text><line x1="30" x2="530" y1="225" y2="225" class="ax" style="stroke:var(--line)"/>`;
        vals.forEach((v, i) => { const x = 40 + i * 61; if (v == null) { s += `<text x="${x + bw / 2}" y="215" text-anchor="middle">n/a</text>`; } else { const hh = Math.max(prop === "cond" && v > 0 && v < 1 ? 8 : 0, v / mx * 185); s += `<rect x="${x}" y="${225 - hh}" width="${bw}" height="${hh}" rx="5" style="fill:var(--${{ met: "c2", gc: "c4", sm: "c1" }[P3T[i]]});opacity:.85"/><text x="${x + bw / 2}" y="${220 - hh}" text-anchor="middle" class="lbl">${prop === "ionic" ? (i < 4 ? P3[i] + ["⁺", "²⁺", "³⁺", "⁴⁺"][i] : P3[i] + ["³⁻", "²⁻", "⁻"][i - 4]) + " " : ""}${v}</text>`; } s += `<text x="${x + bw / 2}" y="245" text-anchor="middle" class="lbl">${P3[i]}</text>`; });
        svg.innerHTML = s; say(txt);
      }
      draw();
      return { cmd: x => { if (x.prop) { prop = x.prop; c.set(prop); draw(); } } };
    } },
    { name: "Oxides and chlorides", mount(b, arg) {
      let sel = arg.sel || "Na2O";
      const c = chips(b, Object.keys(P3C).map(k => [k, sub(k)]), k => { sel = k; draw(); }, sel);
      const card = h(`<div class="svgwrap" style="padding:16px;display:grid;gap:10px"></div>`); b.appendChild(card);
      function draw() {
        const [st, ox, wat, ph, ab] = P3C[sel], el = sel.match(/^[A-Z][a-z]?/)[0];
        const strip = Array.from({ length: 15 }, (_, i) => `<span style="flex:1;height:18px;background:hsl(${i < 7 ? i * 14 : i === 7 ? 120 : 120 + (i - 7) * 22} 70% 55%);${Math.round(ph) === i ? "outline:3px solid var(--fg);outline-offset:1px;border-radius:4px" : ""}"></span>`).join("");
        card.innerHTML = `<div style="font-size:24px;text-align:center">${PX.ce(sel)}</div><div class="tbl-wrap"><table class="board"><tr><th>Structure</th><td>${md(st)}</td></tr><tr><th>Oxidation number of ${el}</th><td>${ox}</td></tr><tr><th>With water</th><td>${md(wat)}</td></tr><tr><th>Acid–base</th><td>${md(ab)}</td></tr></table></div><div class="small muted">pH of the mixture with water ≈ ${ph}</div><div style="display:flex;gap:2px;border-radius:6px;overflow:hidden">${strip}</div><div class="small muted" style="display:flex;justify-content:space-between"><span>0</span><span>7</span><span>14</span></div>`;
      }
      draw();
      return { cmd: x => { if (x.sel) { sel = x.sel; c.set(sel); draw(); } } };
    } },
  ]);
} });

/* ======================= GROUP 2 (Unit 11) ======================= */
const G2 = ["Mg", "Ca", "Sr", "Ba"];
const G2D = {
  radius: ["Atomic radius / pm", [160, 197, 215, 224], false, "Increases: one more shell each time."],
  ie: ["IE₁ + IE₂ / kJ mol⁻¹", [2189, 1735, 1614, 1468], false, "Decreases: outer electrons further away and more shielded, so reactivity increases."],
  oh: ["Solubility of M(OH)₂ / g per 100 g water", [0.0009, 0.17, 1.77, 3.89], true, "Hydroxides get **more** soluble down the group (log scale)."],
  so4: ["Solubility of MSO₄ / g per 100 g water", [35.1, 0.21, 0.013, 0.00024], true, "Sulfates get **less** soluble down the group (log scale). BaSO₄ is insoluble: the sulfate test."],
  dec: ["Carbonate decomposition temperature / °C", [540, 900, 1280, 1360], false, "Thermal stability **increases**: larger M²⁺ ions polarise the carbonate ion less."],
};
const G2R = {
  O2: m => [`{{2${m} + O2 -> 2${m}O}}`, m === "Mg" ? "burns with a brilliant white flame; white solid" : m === "Ca" ? "burns with a brick-red flame" : m === "Sr" ? "burns with a crimson flame" : "burns with a pale green flame"],
  cold: m => m === "Mg" ? ["{{Mg + 2H2O -> Mg(OH)2 + H2}}", "very slow; a few bubbles after days"] : [`{{${m} + 2H2O -> ${m}(OH)2 + H2}}`, m === "Ca" ? "steady fizzing; cloudy (Ca(OH)₂ only slightly soluble)" : m === "Sr" ? "vigorous fizzing" : "very vigorous fizzing; colourless solution"],
  steam: m => [`{{${m} + H2O -> ${m}O + H2}}`, m === "Mg" ? "burns in steam with a white glow; white MgO" : "reacts very vigorously"],
  HCl: m => [`{{${m} + 2HCl -> ${m}Cl2 + H2}}`, "fizzes; metal dissolves; more vigorous down the group"],
  H2SO4: m => [`{{${m} + H2SO4 -> ${m}SO4 + H2}}`, m === "Mg" ? "fizzes; MgSO₄ is soluble, so the reaction continues" : `fizzes briefly, then stops: insoluble ${m}SO₄ coats the metal`],
  oxw: m => [`{{${m}O + H2O -> ${m}(OH)2}}`, m === "Mg" ? "slight reaction; pH ≈ 9" : "exothermic; alkaline solution, pH rises down the group"],
  carbacid: m => [`{{${m}CO3 + 2HCl -> ${m}Cl2 + H2O + CO2}}`, "fizzes (CO₂ turns limewater milky)"],
  carbheat: m => [`{{${m}CO3 -> ${m}O + CO2}}`, `decomposes at about ${G2D.dec[1][G2.indexOf(m)]} °C`],
  nitheat: m => [`{{2${m}(NO3)2 -> 2${m}O + 4NO2 + O2}}`, "brown fumes of NO₂; O₂ relights a glowing splint"],
};
PX.sim("group2", { title: "Group 2", mount(host) {
  return PX.tabbed(host, [
    { name: "Trends", mount(b, arg) {
      let prop = arg.prop || "ie";
      const c = chips(b, Object.entries(G2D).map(([k, v]) => [k, { radius: "radius", ie: "ionisation energy", oh: "hydroxide solubility", so4: "sulfate solubility", dec: "carbonate stability" }[k]]), k => { prop = k; draw(); }, prop);
      const svg = svgBox(b, 540, 250); const say = note(b);
      function draw() {
        const [lab, vals, log, txt] = G2D[prop], f = v => log ? Math.log10(v) + 4.5 : v, mx = Math.max(...vals.map(f));
        let s = `<text x="12" y="16">${lab}</text><line x1="30" x2="530" y1="215" y2="215" style="stroke:var(--line)"/>`;
        vals.forEach((v, i) => { const x = 60 + i * 115, hh = f(v) / mx * 175; s += `<rect x="${x}" y="${215 - hh}" width="80" height="${hh}" rx="6" style="fill:var(--inorg);opacity:.85"/><text x="${x + 40}" y="${210 - hh}" text-anchor="middle" class="lbl">${v}</text><text x="${x + 40}" y="236" text-anchor="middle" class="lbl">${G2[i]}</text>`; });
        svg.innerHTML = s; say(txt);
      }
      draw();
      return { cmd: x => { if (x.prop) { prop = x.prop; c.set(prop); draw(); } } };
    } },
    { name: "Reactions", mount(b) {
      let m = "Ca", r = "cold";
      chips(b, G2.map(x => [x, x]), k => { m = k; draw(); }, m);
      chips(b, [["O2", "+ oxygen"], ["cold", "+ cold water"], ["steam", "+ steam"], ["HCl", "+ dilute HCl"], ["H2SO4", "+ dilute H₂SO₄"], ["oxw", "oxide + water"], ["carbacid", "carbonate + acid"], ["carbheat", "heat carbonate"], ["nitheat", "heat nitrate"]], k => { r = k; draw(); }, r);
      const card = h(`<div class="svgwrap" style="padding:16px;display:grid;gap:8px"></div>`); b.appendChild(card);
      function draw() { const [eq, obs] = G2R[r](m); card.innerHTML = `<div class="eq">${md(eq)}</div><div>${md(obs)}</div>`; }
      draw();
      return {};
    } },
    { name: "Heat a carbonate", mount(b) {
      let m = "Ca";
      chips(b, G2.map(x => [x, x + "CO₃"]), k => { m = k; draw(); }, m);
      const svg = svgBox(b, 540, 200);
      const ctl = PX.controls(b, [{ k: "T", label: "Bunsen temperature", v: 600, min: 200, max: 1500, step: 20, unit: "°C" }], () => draw());
      const say = note(b);
      function draw() {
        const Td = G2D.dec[1][G2.indexOf(m)], on = ctl.vals.T >= Td;
        let s = `<rect x="60" y="40" width="34" height="110" rx="14" style="fill:var(--panel);stroke:var(--fg);stroke-width:2"/><rect x="64" y="120" width="26" height="26" rx="10" style="fill:${on ? "#f3f1ea" : "#dcd7ca"}"/><text x="77" y="170" text-anchor="middle">${on ? m + "O" : m + "CO₃"}</text><path d="M77 40 V20 H360 V110" style="fill:none;stroke:var(--fg);stroke-width:2"/><rect x="320" y="90" width="80" height="80" rx="10" style="fill:${on ? "#e9e6dc" : "var(--panel)"};stroke:var(--fg);stroke-width:2"/><text x="360" y="190" text-anchor="middle">limewater</text>`;
        s += `<path d="M66 180 q11 -${10 + ctl.vals.T / 60} 22 0" style="fill:var(--c2);opacity:${(ctl.vals.T / 1500).toFixed(2)}"/>`;
        if (on) for (let i = 0; i < 4; i++) s += `<circle cx="${352 + i * 6}" cy="${150 - i * 14}" r="3" style="fill:none;stroke:var(--muted)">${reduce ? "" : `<animate attributeName="cy" from="160" to="100" dur="${1 + i * 0.3}s" repeatCount="indefinite"/>`}</circle>`;
        s += `<text x="440" y="50" class="lbl">${on ? "CO₂ given off" : "no change yet"}</text><text x="440" y="70">decomposes ≈ ${Td} °C</text>`;
        svg.innerHTML = s;
        say(on ? `{{${m}CO3 -> ${m}O + CO2}}: limewater turns milky.` : `Not hot enough. ${m}CO₃ needs about ${Td} °C. Further down the group needs hotter: thermal stability increases.`);
      }
      draw();
      return {};
    } },
  ]);
} });

/* ======================= HALOGENS (Unit 12) ======================= */
const tube = (fill, ppt, label, extra = "") => `<svg viewBox="0 0 80 180" style="width:80px"><path d="M15 10 V150 a25 25 0 0 0 50 0 V10" style="fill:var(--panel);stroke:var(--fg);stroke-width:2"/><path d="M17 70 V150 a23 23 0 0 0 46 0 V70z" style="fill:${fill}"/>${ppt ? `<path d="M18 145 a22 22 0 0 0 44 0 q-22 -14 -44 0z" style="fill:${ppt}"/>` : ""}${extra}<text x="40" y="176" text-anchor="middle" style="font-size:10px">${label}</text></svg>`;
PX.sim("halogens", { title: "Halogens lab", mount(host) {
  return PX.tabbed(host, [
    { name: "Silver nitrate tests", mount(b) {
      let x = "Cl", step = 0;
      chips(b, [["Cl", "Cl⁻"], ["Br", "Br⁻"], ["I", "I⁻"]], k => { x = k; step = 0; draw(); }, x);
      const row = h(`<div class="pick"><button class="btn sm" type="button" data-s="1">Add AgNO₃(aq) + HNO₃</button><button class="btn ghost sm" type="button" data-s="2">Add dilute NH₃</button><button class="btn ghost sm" type="button" data-s="3">Add concentrated NH₃</button></div>`); b.appendChild(row);
      const out = h(`<div class="svgwrap" style="padding:14px;display:flex;gap:16px;align-items:center;flex-wrap:wrap"></div>`); b.appendChild(out);
      $$("button", row).forEach(bt => bt.onclick = () => { step = +bt.dataset.s; draw(); });
      const D = { Cl: ["#fbfbf8", "white", true, true], Br: ["#f1e6c4", "cream", false, true], I: ["#f2df6b", "yellow", false, false] };
      function draw() {
        const [col, name, dil, conc] = D[x];
        const dissolved = (step === 2 && dil) || (step === 3 && conc);
        const ppt = step >= 1 && !dissolved ? col : null;
        const txt = step === 0 ? "A colourless solution of the halide. Add acidified silver nitrate." : step === 1 ? `A **${name}** precipitate of Ag${x}.` : step === 2 ? (dil ? "The precipitate **dissolves** in dilute ammonia." : "**No change** in dilute ammonia.") : (conc ? "The precipitate **dissolves** in concentrated ammonia." : "**Insoluble** even in concentrated ammonia.");
        out.innerHTML = tube(step >= 1 && !dissolved ? "rgba(240,240,235,.8)" : "rgba(200,220,240,.35)", ppt, `${x}⁻ ${step ? "+ Ag⁺" : ""}`) + `<div style="flex:1;min-width:180px">${md(txt)}${step === 1 ? `<div class="eq" style="margin-top:8px">${md(`{{Ag+(aq) + ${x}-(aq) -> Ag${x}(s)}}`)}</div>` : ""}</div>`;
      }
      draw();
      return {};
    } },
    { name: "Concentrated H₂SO₄", mount(b) {
      let x = "Cl";
      chips(b, [["Cl", "NaCl"], ["Br", "NaBr"], ["I", "NaI"]], k => { x = k; draw(); }, x);
      const out = h(`<div class="svgwrap" style="padding:14px;display:grid;gap:10px"></div>`); b.appendChild(out);
      const D = {
        Cl: [["{{NaCl + H2SO4 -> NaHSO4 + HCl}}", "steamy fumes of HCl"]], Br: [["{{NaBr + H2SO4 -> NaHSO4 + HBr}}", "steamy fumes"], ["{{2HBr + H2SO4 -> Br2 + SO2 + 2H2O}}", "orange-brown fumes of Br₂; S: +6 → +4"]],
        I: [["{{NaI + H2SO4 -> NaHSO4 + HI}}", "steamy fumes"], ["{{2HI + H2SO4 -> I2 + SO2 + 2H2O}}", "purple fumes / black solid I₂; S +6 → +4"], ["{{6HI + H2SO4 -> 3I2 + S + 4H2O}}", "yellow solid S; S +6 → 0"], ["{{8HI + H2SO4 -> 4I2 + H2S + 4H2O}}", "rotten-egg smell of H₂S; S +6 → −2"]],
      };
      function draw() {
        out.innerHTML = D[x].map(([e, o]) => `<div class="eq" style="text-align:left">${md(e)}<div class="small muted" style="margin-top:4px">${o}</div></div>`).join("") + `<div class="sim-note">${x === "Cl" ? "Cl⁻ is too weak a reducing agent to reduce H₂SO₄: acid–base only." : x === "Br" ? "Br⁻ reduces S from +6 to +4." : "I⁻ is the strongest reducing agent: it reduces S all the way to −2."}</div>`;
      }
      draw();
      return {};
    } },
    { name: "Colours & displacement", mount(b) {
      const hal = [["Cl2", "Cl₂(aq)", "#e6efb0"], ["Br2", "Br₂(aq)", "#f2a64a"], ["I2", "I₂(aq)", "#9c5a2a"]], ions = [["Cl", "KCl"], ["Br", "KBr"], ["I", "KI"]];
      const grid = h(`<div class="tbl-wrap"><table class="board"><tr><th></th>${ions.map(i => `<th>${i[1]}(aq)</th>`).join("")}</tr>${hal.map(([k, n]) => `<tr><th>${n}</th>${ions.map(([i]) => `<td><button class="chip" type="button" data-h="${k}" data-i="${i}">${k[0] + k[1].toLowerCase() === i ? "—" : "mix"}</button></td>`).join("")}</tr>`).join("")}</table></div>`); b.appendChild(grid);
      const out = h(`<div class="svgwrap" style="padding:14px;display:flex;gap:16px;align-items:center;flex-wrap:wrap"></div>`); b.appendChild(out);
      const ORD = ["Cl", "Br", "I"], COL = { Cl: "#e6efb0", Br: "#f2a64a", I: "#9c5a2a" };
      $$("button", grid).forEach(bt => bt.onclick = () => {
        const ion = bt.dataset.i, H2 = bt.dataset.h === "Cl2" ? "Cl" : bt.dataset.h === "Br2" ? "Br" : "I";
        if (H2 === ion) { out.innerHTML = "No reaction: same halogen."; return; }
        const reacts = ORD.indexOf(H2) < ORD.indexOf(ion);
        out.innerHTML = tube(reacts ? COL[ion] : COL[H2], null, reacts ? `${ion}₂ formed` : "no change") + `<div style="flex:1;min-width:180px">${reacts ? md(`**Displacement.** {{${H2}2 + 2${ion}- -> 2${H2}- + ${ion}2}}. ${H2}₂ is the stronger oxidising agent.`) : md(`**No reaction.** ${H2}₂ is a weaker oxidising agent than ${ion}₂.`)}</div>`;
      });
      note(b, "Cl₂ pale yellow-green gas; Br₂ red-brown liquid (orange in water); I₂ grey-black solid (brown in water, purple vapour, violet in hexane).");
      out.innerHTML = "Pick a pair to mix.";
      return {};
    } },
  ]);
} });

/* ======================= NITROGEN (Unit 13) ======================= */
PX.sim("nitrogen", { title: "Nitrogen in the air", mount(host) {
  return PX.tabbed(host, [
    { name: "Car exhaust", mount(b) {
      let on = true;
      const tg = h(`<div class="row"><button class="chip" type="button" aria-pressed="true">Catalytic converter fitted</button></div>`); b.appendChild(tg);
      const svg = svgBox(b, 540, 230);
      const say = note(b);
      $("button", tg).onclick = e => { on = !on; e.currentTarget.setAttribute("aria-pressed", String(on)); draw(); };
      function draw() {
        const before = { CO: 1, NO: 0.8, HC: 0.6 }, after = on ? { CO: 0.08, NO: 0.1, HC: 0.06 } : before;
        let s = `<rect x="20" y="70" width="110" height="70" rx="10" style="fill:var(--panel-3)"/><text x="75" y="110" text-anchor="middle" class="lbl">engine</text><text x="75" y="160" text-anchor="middle">N₂ + O₂ → 2NO</text><line x1="130" y1="105" x2="200" y2="105" style="stroke:var(--fg);stroke-width:6"/><rect x="200" y="78" width="110" height="54" rx="12" style="fill:${on ? "var(--accent-soft)" : "var(--panel-2)"};stroke:var(--fg);stroke-width:2;stroke-dasharray:${on ? "0" : "5 4"}"/><text x="255" y="102" text-anchor="middle" class="lbl">${on ? "Pt / Rh / Pd" : "(none)"}</text><text x="255" y="120" text-anchor="middle">${on ? "honeycomb" : ""}</text><line x1="310" y1="105" x2="360" y2="105" style="stroke:var(--fg);stroke-width:6"/>`;
        Object.entries(after).forEach(([k, v], i) => { const x = 380 + i * 52; s += `<rect x="${x}" y="${190 - v * 140}" width="36" height="${v * 140}" rx="5" style="fill:${["var(--c3)", "#c0612a", "var(--muted)"][i]}"/><text x="${x + 18}" y="206" text-anchor="middle">${k === "HC" ? "CₓHᵧ" : k}</text>`; });
        s += `<text x="455" y="24" text-anchor="middle">pollutants out of the tailpipe</text>`;
        svg.innerHTML = s;
        say(on ? "{{2CO + 2NO -> 2CO2 + N2}}: CO is oxidised, NO is reduced, on the catalyst surface (heterogeneous catalysis). Hydrocarbons are oxidised to CO₂ and H₂O." : "Without a converter, CO (toxic), NO (smog, acid rain) and unburned hydrocarbons (smog) all leave the engine.");
      }
      draw();
      return {};
    } },
    { name: "NO₂ as a catalyst", mount(b) {
      const steps = [["{{SO2 + NO2 -> SO3 + NO}}", "NO₂ oxidises SO₂ to SO₃ and is reduced to NO."], ["{{NO + 1/2O2 -> NO2}}", "NO is oxidised by oxygen in the air: NO₂ is **regenerated**."], ["overall: {{SO2 + 1/2O2 -> SO3}}", "NO₂ doesn't appear in the overall equation: it's a **homogeneous catalyst**. Then {{SO3 + H2O -> H2SO4}} in rain."], ["{{NO2 ->[uv] NO + O}}, {{O + O2 -> O3}}", "In sunlight NO₂ also releases O atoms, making ground-level ozone. With hydrocarbons this gives **photochemical smog** (including PAN)."]];
      let i = 0;
      const svg = svgBox(b, 540, 220);
      const row = h(`<div class="row"><button class="btn sm" type="button">Next step</button></div>`); b.appendChild(row);
      const card = h(`<div class="callout key"></div>`); b.appendChild(card);
      $("button", row).onclick = () => { i = (i + 1) % steps.length; draw(); };
      function draw() {
        const act = k => i === k ? "var(--accent)" : "var(--line)";
        let s = `<circle cx="270" cy="110" r="70" style="fill:none;stroke:var(--line);stroke-width:2;stroke-dasharray:4 5"/><rect x="225" y="20" width="90" height="34" rx="10" style="fill:var(--panel);stroke:${act(0)};stroke-width:2.5"/><text x="270" y="42" text-anchor="middle" class="lbl">NO₂</text><rect x="225" y="166" width="90" height="34" rx="10" style="fill:var(--panel);stroke:${act(1)};stroke-width:2.5"/><text x="270" y="188" text-anchor="middle" class="lbl">NO</text>`;
        s += `<text x="350" y="100" style="fill:${i === 0 ? "var(--accent)" : "var(--muted)"}">SO₂ → SO₃</text><text x="120" y="120" text-anchor="end" style="fill:${i === 1 ? "var(--accent)" : "var(--muted)"}">½O₂ in</text>`;
        if (i >= 3) s += `<text x="460" y="40" style="fill:var(--c2)">+ sunlight</text><text x="460" y="60" style="fill:var(--c2)">→ O₃, smog</text>`;
        svg.innerHTML = s; card.innerHTML = `<div class="eq">${md(steps[i][0])}</div><div>${md(steps[i][1])}</div>`;
      }
      draw();
      return {};
    } },
  ]);
} });
})();
