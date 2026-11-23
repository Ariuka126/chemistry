/* sims-org.js — live models for Units 14–18 and P1: molecules, mechanisms, reaction map, IR, tests, titration. */
(() => {
"use strict";
const { $, $$, h, md, K, clamp, round } = PX;
const sub = PX.sub;
const reduce = PX.reduceMotion;
const chips = (host, items, onPick, sel) => {
  const row = h(`<div class="pick" role="group"></div>`);
  items.forEach(([k, label]) => { const b = h(`<button class="chip" type="button" aria-pressed="${String(k) === String(sel)}" data-k="${k}">${label}</button>`); b.onclick = () => { set(k); onPick(k); }; row.appendChild(b); });
  const set = k => $$(".chip", row).forEach(c => c.setAttribute("aria-pressed", String(c.dataset.k === String(k))));
  host.appendChild(row);
  return { el: row, set };
};
const note = (host, html = "") => { const n = h(`<div class="sim-note">${md(html)}</div>`); host.appendChild(n); return v => { n.innerHTML = md(v); }; };

/* ======================= MOLECULE DATA ======================= */
/* atoms [el, x, y] on a grid; bonds [i, j, order]. H atoms are added automatically for displayed formulae. */
const chain = n => ({ a: Array.from({ length: n }, (_, i) => ["C", i, 0]), b: Array.from({ length: n - 1 }, (_, i) => [i, i + 1, 1]) });
const M = (name, mf, series, a, b, extra = {}) => ({ name, mf, series, a, b, ...extra });
const MOL = {};
[
  M("butane", "C4H10", "alkane", chain(4).a, chain(4).b),
  M("methylpropane", "C4H10", "alkane", [["C", 0, 0], ["C", 1, 0], ["C", 2, 0], ["C", 1, -1]], [[0, 1, 1], [1, 2, 1], [1, 3, 1]]),
  M("pentane", "C5H12", "alkane", chain(5).a, chain(5).b),
  M("2-methylbutane", "C5H12", "alkane", [...chain(4).a, ["C", 1, -1]], [...chain(4).b, [1, 4, 1]]),
  M("2,2-dimethylpropane", "C5H12", "alkane", [["C", 0, 0], ["C", 1, 0], ["C", 2, 0], ["C", 1, -1], ["C", 1, 1]], [[0, 1, 1], [1, 2, 1], [1, 3, 1], [1, 4, 1]]),
  M("but-1-ene", "C4H8", "alkene", chain(4).a, [[0, 1, 2], [1, 2, 1], [2, 3, 1]]),
  M("cis-but-2-ene", "C4H8", "alkene", [["C", 0, 1], ["C", 1, 0], ["C", 2, 0], ["C", 3, 1]], [[0, 1, 1], [1, 2, 2], [2, 3, 1]], { asis: true, note: "cis (Z): both CH₃ on the same side" }),
  M("trans-but-2-ene", "C4H8", "alkene", [["C", 0, 1], ["C", 1, 0], ["C", 2, 0], ["C", 3, -1]], [[0, 1, 1], [1, 2, 2], [2, 3, 1]], { asis: true, note: "trans (E): CH₃ groups on opposite sides" }),
  M("methylpropene", "C4H8", "alkene", [["C", 0, 0], ["C", 1, 0], ["C", 2, 0], ["C", 1, -1]], [[0, 1, 2], [1, 2, 1], [1, 3, 1]]),
  M("propan-1-ol", "C3H8O", "alcohol (primary)", [...chain(3).a, ["O", 3, 0]], [...chain(3).b, [2, 3, 1]]),
  M("propan-2-ol", "C3H8O", "alcohol (secondary)", [...chain(3).a, ["O", 1, -1]], [...chain(3).b, [1, 3, 1]]),
  M("methoxyethane", "C3H8O", "ether (functional group isomer)", [["C", 0, 0], ["O", 1, 0], ["C", 2, 0], ["C", 3, 0]], [[0, 1, 1], [1, 2, 1], [2, 3, 1]]),
  M("butan-1-ol", "C4H10O", "alcohol (primary)", [...chain(4).a, ["O", 4, 0]], [...chain(4).b, [3, 4, 1]]),
  M("butan-2-ol", "C4H10O", "alcohol (secondary), chiral", [...chain(4).a, ["O", 1, -1]], [...chain(4).b, [1, 4, 1]]),
  M("2-methylpropan-2-ol", "C4H10O", "alcohol (tertiary)", [["C", 0, 0], ["C", 1, 0], ["C", 2, 0], ["C", 1, -1], ["O", 1, 1]], [[0, 1, 1], [1, 2, 1], [1, 3, 1], [1, 4, 1]]),
  M("2-bromopropane", "C3H7Br", "halogenoalkane (secondary)", [...chain(3).a, ["Br", 1, -1]], [...chain(3).b, [1, 3, 1]]),
  M("1-bromopropane", "C3H7Br", "halogenoalkane (primary)", [...chain(3).a, ["Br", 3, 0]], [...chain(3).b, [2, 3, 1]]),
  M("propanal", "C3H6O", "aldehyde", [...chain(3).a, ["O", 2, -1]], [...chain(3).b, [2, 3, 2]]),
  M("propanone", "C3H6O", "ketone", [...chain(3).a, ["O", 1, -1]], [...chain(3).b, [1, 3, 2]]),
  M("ethanoic acid", "C2H4O2", "carboxylic acid", [["C", 0, 0], ["C", 1, 0], ["O", 1, -1], ["O", 2, 0]], [[0, 1, 1], [1, 2, 2], [1, 3, 1]]),
  M("ethyl ethanoate", "C4H8O2", "ester", [["C", 0, 0], ["C", 1, 0], ["O", 1, -1], ["O", 2, 0], ["C", 3, 0], ["C", 4, 0]], [[0, 1, 1], [1, 2, 2], [1, 3, 1], [3, 4, 1], [4, 5, 1]]),
  M("propanenitrile", "C3H5N", "nitrile", [...chain(3).a, ["N", 3, 0]], [...chain(3).b, [2, 3, 3]]),
  M("ethylamine", "C2H7N", "amine (primary)", [["C", 0, 0], ["C", 1, 0], ["N", 2, 0]], [[0, 1, 1], [1, 2, 1]]),
  M("4-methylpentan-2-ol", "C6H14O", "alcohol (secondary)", [...chain(5).a, ["O", 1, -1], ["C", 3, 1]], [...chain(5).b, [1, 5, 1], [3, 6, 1]]),
  M("2-bromo-3-methylbutane", "C5H11Br", "halogenoalkane (secondary)", [...chain(4).a, ["Br", 1, -1], ["C", 2, 1]], [...chain(4).b, [1, 4, 1], [2, 5, 1]]),
  M("3-methylbut-1-ene", "C5H10", "alkene", [...chain(4).a, ["C", 2, -1]], [[0, 1, 2], [1, 2, 1], [2, 3, 1], [2, 4, 1]]),
  M("2-methylpropanoic acid", "C4H8O2", "carboxylic acid", [["C", 0, 0], ["C", 1, 0], ["C", 2, 0], ["O", 2, -1], ["O", 3, 0], ["C", 1, 1]], [[0, 1, 1], [1, 2, 1], [2, 3, 2], [2, 4, 1], [1, 5, 1]]),
  M("3-ethylhexane", "C8H18", "alkane", [...chain(6).a, ["C", 2, -1], ["C", 2, -2]], [...chain(6).b, [2, 6, 1], [6, 7, 1]]),
].forEach(m => MOL[m.name] = m);
PX.MOL = MOL;
const VAL = { C: 4, O: 2, N: 3, Br: 1, Cl: 1, I: 1 };
const DIRS = [[0, -1], [0, 1], [-1, 0], [1, 0]];
const withH = m => {
  const atoms = m.a.map(x => [...x]), bonds = m.b.map(x => [...x]), heavy = atoms.length;
  for (let i = 0; i < heavy; i++) {
    const [el, x, y] = atoms[i]; let used = bonds.filter(b => b[0] === i || b[1] === i).reduce((s, b) => s + b[2], 0), need = (VAL[el] || 1) - used;
    const occ = (px, py) => atoms.some(a => Math.abs(a[1] - px) < 0.3 && Math.abs(a[2] - py) < 0.3);
    const order = el === "O" || el === "N" ? [[1, 0], [0, -1], [0, 1], [-1, 0]] : DIRS;
    for (const [dx, dy] of order) { if (need <= 0) break; const px = x + dx * 0.85, py = y + dy * 0.85; if (!occ(px, py) && !occ(x + dx, y + dy)) { atoms.push(["H", px, py]); bonds.push([i, atoms.length - 1, 1]); need--; } }
    for (const [dx, dy] of [[-0.6, -0.6], [0.6, -0.6], [-0.6, 0.6], [0.6, 0.6]]) { if (need <= 0) break; const px = x + dx, py = y + dy; if (!occ(px, py)) { atoms.push(["H", px, py]); bonds.push([i, atoms.length - 1, 1]); need--; } }
  }
  return { atoms, bonds };
};
const bondLines = (x1, y1, x2, y2, o, t1, t2) => {
  const dx = x2 - x1, dy = y2 - y1, L = Math.hypot(dx, dy) || 1, ux = dx / L, uy = dy / L, nx = -uy * 3.2, ny = ux * 3.2;
  const a = t1 ? 11 : 0, b2 = t2 ? 11 : 0, sx = x1 + ux * a, sy = y1 + uy * a, ex = x2 - ux * b2, ey = y2 - uy * b2;
  const offs = o === 1 ? [0] : o === 2 ? [-1, 1] : [-1.6, 0, 1.6];
  return offs.map(k => `<line x1="${sx + nx * k}" y1="${sy + ny * k}" x2="${ex + nx * k}" y2="${ey + ny * k}" style="stroke:var(--fg);stroke-width:1.8;stroke-linecap:round"/>`).join("");
};
const COLEL = { O: "var(--c3)", N: "var(--c1)", Br: "#a8452a", Cl: "var(--org)", H: "var(--muted)", C: "var(--fg)" };
PX.drawDisplayed = (m, U = 46) => {
  const { atoms, bonds } = withH(m), xs = atoms.map(a => a[1]), ys = atoms.map(a => a[2]);
  const minx = Math.min(...xs), miny = Math.min(...ys), W = (Math.max(...xs) - minx) * U + 50, H = (Math.max(...ys) - miny) * U + 44, P = a => [(a[1] - minx) * U + 25, (a[2] - miny) * U + 22];
  let s = bonds.map(([i, j, o]) => { const [x1, y1] = P(atoms[i]), [x2, y2] = P(atoms[j]); return bondLines(x1, y1, x2, y2, o, true, true); }).join("");
  s += atoms.map(a => { const [x, y] = P(a); return `<text x="${x}" y="${y + 5}" text-anchor="middle" style="font-family:var(--font-body);font-size:${a[0] === "H" ? 14 : 16}px;font-weight:700;fill:${COLEL[a[0]] || "var(--fg)"}">${a[0]}</text>`; }).join("");
  return `<svg viewBox="0 0 ${W} ${H}" style="width:100%;max-width:${W * 1.1}px;height:auto">${s}</svg>`;
};
PX.drawSkeletal = (m, U = 44, nums = null) => {
  const pos = m.a.map(([el, x, y]) => m.asis ? [x * 0.9, y * 0.75] : [x * 0.866, y + (x % 2 ? -0.5 : 0)]);
  const xs = pos.map(p => p[0]), ys = pos.map(p => p[1]), minx = Math.min(...xs), miny = Math.min(...ys);
  const W = (Math.max(...xs) - minx) * U + 60, H = (Math.max(...ys) - miny) * U + 44, P = i => [(pos[i][0] - minx) * U + 30, (pos[i][1] - miny) * U + 22];
  const hcount = i => { const used = m.b.filter(b => b[0] === i || b[1] === i).reduce((s, b) => s + b[2], 0); return (VAL[m.a[i][0]] || 1) - used; };
  const label = i => { const el = m.a[i][0]; if (el === "C") return ""; const n = hcount(i); return el + (n > 0 ? "H" + (n > 1 ? "₂" : "") : ""); };
  let s = m.b.map(([i, j, o]) => { const [x1, y1] = P(i), [x2, y2] = P(j); return bondLines(x1, y1, x2, y2, o, !!label(i), !!label(j)); }).join("");
  s += m.a.map((a, i) => { const l = label(i); if (!l) return ""; const [x, y] = P(i); return `<text x="${x}" y="${y + 5}" text-anchor="middle" style="font-family:var(--font-body);font-size:15px;font-weight:700;fill:${COLEL[a[0]]}">${l}</text>`; }).join("");
  if (nums) Object.entries(nums).forEach(([i, n]) => { const [x, y] = P(+i), up = m.asis ? false : (m.a[i][1] % 2 === 1 && m.a[i][2] === 0); s += `<circle cx="${x}" cy="${y + (up ? -16 : 16)}" r="8" style="fill:var(--accent)"/><text x="${x}" y="${y + (up ? -12 : 20)}" text-anchor="middle" style="font-family:var(--font-mono);font-size:11px;font-weight:700;fill:var(--accent-ink)">${n}</text>`; });
  return `<svg viewBox="0 0 ${W} ${H}" style="width:100%;max-width:${W * 1.2}px;height:auto">${s}</svg>`;
};
const structural = m => {
  const parts = m.a.map((a, i) => { if (a[0] === "C" || a[0] === "N" || a[0] === "O") { const used = m.b.filter(b => b[0] === i || b[1] === i).reduce((s, b) => s + b[2], 0), n = (VAL[a[0]] || 1) - used; return a[0] + (n > 0 ? "H" + (n > 1 ? n : "") : ""); } return a[0]; });
  return parts;
};
const empirical = f => { const c = {}; f.replace(/([A-Z][a-z]?)(\d*)/g, (_, e, n) => c[e] = (c[e] || 0) + (+n || 1)); const g = Object.values(c).reduce((a, b) => { while (b) [a, b] = [b, a % b]; return a; }); return Object.entries(c).map(([e, n]) => e + (n / g > 1 ? n / g : "")).join(""); };


/* wedge-and-dash drawing of a tetrahedral carbon. g = [up, left (in plane), wedge (towards you), dash (away)] */
PX.wedgeSVG = (g, { w = 230, centre = "C", mirror = false } = {}) => {
  const cx = 115, cy = 92, P = { up: [cx, cy - 66], left: [cx - 66, cy + 34], wedge: [cx + 60, cy + 44], dash: [cx + 70, cy - 8] };
  if (mirror) Object.keys(P).forEach(k => P[k] = [2 * cx - P[k][0], P[k][1]]);
  const col = t => t.startsWith("Br") ? "#a8452a" : t.startsWith("Cl") ? "var(--org)" : t.includes("O") ? "var(--c3)" : t.startsWith("F") ? "var(--good)" : "var(--fg)";
  const lab = (k, t) => { const [x, y] = P[k], dx = x - cx, dy = y - cy, L = Math.hypot(dx, dy); return `<text x="${x + dx / L * 16}" y="${y + dy / L * 14 + 5}" text-anchor="middle" style="font-family:var(--font-body);font-size:16px;font-weight:700;fill:${col(t)}">${t}</text>`; };
  const end = k => { const [x, y] = P[k], dx = x - cx, dy = y - cy, L = Math.hypot(dx, dy); return [cx + dx / L * 12, cy + dy / L * 12, x, y, dx / L, dy / L]; };
  let s = "";
  ["up", "left"].forEach(k => { const [x1, y1, x2, y2] = end(k); s += `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" style="stroke:var(--fg);stroke-width:2.2;stroke-linecap:round"/>`; });
  { const [x1, y1, x2, y2, ux, uy] = end("wedge"), nx = -uy * 7, ny = ux * 7; s += `<path d="M${x1},${y1} L${x2 + nx},${y2 + ny} L${x2 - nx},${y2 - ny}Z" style="fill:var(--fg)"/>`; }
  { const [x1, y1, x2, y2, ux, uy] = end("dash"); for (let t = 0.12; t <= 1; t += 0.15) { const x = x1 + (x2 - x1) * t, y = y1 + (y2 - y1) * t, hw = 1 + 6 * t; s += `<line x1="${x - uy * hw}" y1="${y + ux * hw}" x2="${x + uy * hw}" y2="${y - ux * hw}" style="stroke:var(--fg);stroke-width:2"/>`; } }
  s += `<text x="${cx}" y="${cy + 6}" text-anchor="middle" style="font-family:var(--font-body);font-size:17px;font-weight:700;fill:var(--fg)">${centre}</text>`;
  s += lab("up", g[0]) + lab("left", g[1]) + lab("wedge", g[2]) + lab("dash", g[3]);
  return `<svg viewBox="0 0 230 180" style="width:100%;max-width:${w}px;height:auto" role="img" aria-label="wedge and dash drawing">${s}</svg>`;
};
const WEDGE_MOLS = {
  methane: { g: ["H", "H", "H", "H"], note: "Every carbon with four single bonds is tetrahedral (109.5°). The page can only show two bonds flat; the other two stick out." },
  "bromochlorofluoromethane": { g: ["H", "F", "Cl", "Br"], chiral: true, note: "Four different groups: a **chiral centre**. Flip to the mirror image: wedge and dash can't be swapped back by turning it." },
  "butan-2-ol (C2)": { g: ["H", "CH₃", "OH", "C₂H₅"], chiral: true, note: "This is how exam papers draw one enantiomer of butan-2-ol. The other enantiomer swaps two groups (or is drawn as the mirror image)." },
  "2-hydroxypropanoic acid": { g: ["H", "CH₃", "OH", "COOH"], chiral: true, note: "Lactic acid. Questions often ask you to draw *both* optical isomers: draw one, then its mirror image beside it." },
};
const GCOL = { H: "#cfd4dc", F: "#3fae5a", Cl: "#2f9e5b", Br: "#a8452a", OH: "#d9473d", "CH₃": "#5b606c", "C₂H₅": "#2f3340", COOH: "#b0472a" };
/* IUPAC breakdowns: parts [text, role, why]; num = {atomIndex: carbonNumber} */
const NAMES = {
  "propan-2-ol": { parts: [["propan", "stem", "3 carbons in the longest chain: prop-, all single C–C bonds: -an-"], ["-2-", "loc", "the OH is on carbon 2 (the same from either end)"], ["ol", "suf", "suffix for an alcohol, –OH"]], num: { 0: 1, 1: 2, 2: 3 } },
  "butan-2-ol": { parts: [["butan", "stem", "4 carbons: but-; single bonds: -an-"], ["-2-", "loc", "number from the end nearer the OH: carbon 2, not 3"], ["ol", "suf", "alcohol suffix"]], num: { 0: 1, 1: 2, 2: 3, 3: 4 } },
  "4-methylpentan-2-ol": { parts: [["4-", "loc", "the methyl branch sits on carbon 4"], ["methyl", "pre", "a one-carbon branch, –CH₃, written as a prefix"], ["pentan", "stem", "the longest chain containing the C–OH carbon has 5 carbons"], ["-2-", "loc", "numbering starts at the end nearer the OH, so OH gets 2 (not 4)"], ["ol", "suf", "alcohol suffix; the suffix group decides the numbering direction"]], num: { 0: 1, 1: 2, 2: 3, 3: 4, 4: 5 } },
  "2-bromo-3-methylbutane": { parts: [["2-", "loc", "bromo on carbon 2"], ["bromo", "pre", "halogens are always prefixes: fluoro-, chloro-, bromo-, iodo-"], ["-3-", "loc", "methyl on carbon 3"], ["methyl", "pre", "prefixes go in **alphabetical** order: b(romo) before m(ethyl)"], ["butane", "stem", "4-carbon chain, all single bonds, no suffix group, so the name ends -ane"]], num: { 0: 1, 1: 2, 2: 3, 3: 4 }, tip: "Numbered from the right it would be 2-methyl-3-bromo: the same locants {2,3}. When there's a tie, the group first in the alphabet gets the lower number." },
  "2-methylbutane": { parts: [["2-", "loc", "branch on carbon 2: number from the end nearer the branch"], ["methyl", "pre", "–CH₃ branch"], ["butane", "stem", "the longest chain has 4 carbons, not 5: the branch is not part of it"]], num: { 0: 1, 1: 2, 2: 3, 3: 4 } },
  "3-ethylhexane": { parts: [["3-", "loc", "the branch is on carbon 3"], ["ethyl", "pre", "a two-carbon branch, –C₂H₅"], ["hexane", "stem", "the longest chain has 6 carbons. It runs straight along the bottom here, but chains can also bend through a branch: always count every possible path"]], num: { 0: 1, 1: 2, 2: 3, 3: 4, 4: 5, 5: 6 } },
  "but-1-ene": { parts: [["but", "stem", "4 carbons"], ["-1-", "loc", "the C=C starts at carbon 1; quote the lower-numbered carbon of the double bond"], ["ene", "suf", "-ene means a C=C double bond"]], num: { 0: 1, 1: 2, 2: 3, 3: 4 } },
  "3-methylbut-1-ene": { parts: [["3-", "loc", "methyl on carbon 3"], ["methyl", "pre", "branch"], ["but", "stem", "4-carbon chain containing the C=C"], ["-1-", "loc", "number so that the C=C gets the lowest number: it beats the branch"], ["ene", "suf", "C=C"]], num: { 0: 1, 1: 2, 2: 3, 3: 4 } },
  "2-bromopropane": { parts: [["2-", "loc", "Br on the middle carbon"], ["bromo", "pre", "halogen prefix"], ["propane", "stem", "3 carbons, alkane ending"]], num: { 0: 1, 1: 2, 2: 3 } },
  "propanone": { parts: [["propan", "stem", "3 carbons"], ["one", "suf", "-one is a ketone: C=O inside the chain. No number needed: in propanone it can only be on carbon 2"]], num: { 0: 1, 1: 2, 2: 3 } },
  "propanal": { parts: [["propan", "stem", "3 carbons, counting the CHO carbon"], ["al", "suf", "-al is an aldehyde: C=O at the end of the chain, always carbon 1, so no number"]], num: { 2: 1, 1: 2, 0: 3 } },
  "2-methylpropanoic acid": { parts: [["2-", "loc", "methyl on carbon 2"], ["methyl", "pre", "branch"], ["propan", "stem", "3 carbons, **including** the COOH carbon"], ["oic acid", "suf", "carboxylic acid: the COOH carbon is always carbon 1"]], num: { 2: 1, 1: 2, 0: 3 } },
  "ethyl ethanoate": { parts: [["ethyl", "pre", "the alkyl group from the **alcohol** (ethanol), attached to the single-bonded O"], ["ethanoate", "suf", "the part from the **acid** (ethanoic acid), the side with C=O. Written second, though it's drawn first in CH₃COOC₂H₅"]], num: { 1: 1, 0: 2 } },
  "propanenitrile": { parts: [["propane", "stem", "3 carbons, **counting the C of C≡N**"], ["nitrile", "suf", "–C≡N; the nitrile carbon is carbon 1"]], num: { 2: 1, 1: 2, 0: 3 } },
};
const ROLE = { stem: ["stem (chain length + bonds)", "var(--accent)"], loc: ["locant (position number)", "var(--muted)"], pre: ["prefix (branch or halogen)", "var(--c2)"], suf: ["suffix (main functional group)", "var(--c3)"] };

PX.sim("molecule", { title: "Molecule viewer", mount(host) {
  return PX.tabbed(host, [
    { name: "Formulae", mount(b, arg) {
      let cur = arg.mol || "butan-1-ol";
      const sel = h(`<label class="row small" style="gap:10px"><span class="muted">Molecule</span><select>${Object.keys(MOL).map(k => `<option ${k === cur ? "selected" : ""}>${k}</option>`).join("")}</select></label>`); b.appendChild(sel);
      const out = h(`<div style="display:grid;gap:10px"></div>`); b.appendChild(out);
      $("select", sel).onchange = e => { cur = e.target.value; draw(); };
      function draw() {
        const m = MOL[cur];
        out.innerHTML = `<div class="readouts"><div class="ro"><dt>Name</dt><dd>${m.name}</dd></div><div class="ro"><dt>Molecular formula</dt><dd>${PX.ce(m.mf)}</dd></div><div class="ro"><dt>Empirical formula</dt><dd>${PX.ce(empirical(m.mf))}</dd></div><div class="ro"><dt>Series</dt><dd style="font-family:var(--font-body)">${m.series}</dd></div></div>
          <div class="grid2" style="gap:10px"><div class="svgwrap" style="padding:10px;display:grid;gap:6px;justify-items:center"><div class="small muted" style="justify-self:start">Displayed: every atom and bond</div>${PX.drawDisplayed(m)}</div><div class="svgwrap" style="padding:10px;display:grid;gap:6px;justify-items:center"><div class="small muted" style="justify-self:start">Skeletal: each corner or end is a C</div>${PX.drawSkeletal(m)}</div></div>${m.note ? `<div class="sim-note">${m.note}</div>` : ""}`;
      }
      draw();
      return { cmd: x => { if (x.mol) { cur = x.mol; $("select", sel).value = cur; draw(); } } };
    } },
    { name: "Isomers", mount(b, arg) {
      const SETS = { C4H10: ["butane", "methylpropane"], C5H12: ["pentane", "2-methylbutane", "2,2-dimethylpropane"], C4H8: ["but-1-ene", "cis-but-2-ene", "trans-but-2-ene", "methylpropene"], C3H8O: ["propan-1-ol", "propan-2-ol", "methoxyethane"], C3H6O: ["propanal", "propanone"], C3H7Br: ["1-bromopropane", "2-bromopropane"] };
      const TYPE = { C4H10: "chain isomers", C5H12: "chain isomers", C4H8: "chain, positional and geometrical (cis/trans) isomers", C3H8O: "positional and functional group isomers", C3H6O: "functional group isomers", C3H7Br: "positional isomers" };
      let f = arg.f || "C5H12";
      chips(b, Object.keys(SETS).map(k => [k, sub(k)]), k => { f = k; draw(); }, f);
      const out = h(`<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(150px,1fr));gap:10px"></div>`); b.appendChild(out);
      const say = note(b);
      function draw() { out.innerHTML = SETS[f].map(n => `<div class="svgwrap" style="padding:10px;display:grid;gap:4px;justify-items:center">${PX.drawSkeletal(MOL[n], 36)}<b class="small">${n}</b></div>`).join(""); say(`${SETS[f].length} isomers of ${sub(f)} (at AS): ${TYPE[f]}.`); }
      draw();
      return { cmd: x => { if (x.f) { f = x.f; draw(); } } };
    } },
    { name: "Optical isomers", mount(b) {
      const holder = h(`<div class="svgwrap"></div>`); b.appendChild(holder);
      const G = [["H", "#cfd4dc", 10, "#222"], ["OH", "#d9473d", 14, "#fff"], ["CH₃", "#5b606c", 14, "#fff"], ["C₂H₅", "#2f3340", 16, "#fff"]];
      const TETd = [[0, 1, 0], [0.943, -0.333, 0], [-0.471, -0.333, 0.816], [-0.471, -0.333, -0.816]];
      const scene = () => {
        const atoms = [], bonds = [];
        [-1, 1].forEach((side, s) => { const cx = side * 1.25; atoms.push({ p: [cx, 0, 0], c: "#4a4f5c", t: "C", r: 15 }); const ci = atoms.length - 1; TETd.forEach((d, i) => { const [t, c, r, tc] = G[i]; atoms.push({ p: [cx + d[0] * 0.75 * (side < 0 ? 1 : -1), d[1] * 0.75, d[2] * 0.75], c, t, r, tc }); bonds.push([ci, atoms.length - 1, 1]); }); });
        return { atoms, bonds, label: "butan-2-ol and its mirror image · drag to rotate" };
      };
      const v = PX.view3d(holder, scene, { aspect: 0.55, minH: 240 });
      note(b, "The central carbon has **four different groups**: H, OH, CH₃ and C₂H₅. However you turn them, the two can't be superimposed. They are **enantiomers** (optical isomers), and rotate plane-polarised light in opposite directions.");
      return { destroy: v.destroy };
    } },
    { name: "3D notation", mount(b, arg) {
      let cur = arg.w || "bromochlorofluoromethane", mir = false;
      const c = chips(b, Object.keys(WEDGE_MOLS).map(k => [k, k]), k => { cur = k; mir = false; draw(); }, cur);
      const grid = h(`<div class="grid2" style="gap:10px"></div>`); b.appendChild(grid);
      const left = h(`<div class="svgwrap" style="padding:10px;display:grid;gap:6px;justify-items:center"><div class="small muted" style="justify-self:start">On paper</div><div data-d style="width:100%;display:grid;justify-items:center"></div></div>`);
      const right = h(`<div class="svgwrap" style="display:grid"><div class="small muted" style="padding:10px 10px 0">In 3D: drag to turn it</div><div data-v></div></div>`);
      grid.append(left, right);
      const row = h(`<div class="row"><button class="btn sm" type="button">Turn the model to match the drawing</button><button class="chip" type="button" aria-pressed="false">Mirror image</button></div>`); b.appendChild(row);
      const key = h(`<div class="tbl-wrap"><table class="board"><tr><th>You see</th><th>It means</th></tr><tr><td>plain line ─</td><td>bond in the plane of the paper</td></tr><tr><td>solid wedge ▶</td><td>bond coming <b>towards you</b>, out of the page</td></tr><tr><td>hashed wedge ┊┊┊</td><td>bond going <b>away from you</b>, behind the page</td></tr></table></div>`); b.appendChild(key);
      const say = note(b);
      const DIR = { up: [0, 1, 0], left: [-0.943, -0.333, 0], wedge: [0.471, -0.333, -0.816], dash: [0.471, -0.333, 0.816] };
      const scene = () => { const m = WEDGE_MOLS[cur], atoms = [{ p: [0, 0, 0], c: "#4a4f5c", t: "C", r: 16 }], bonds = []; ["up", "left", "wedge", "dash"].forEach((k, i) => { const d = DIR[k], t = m.g[i]; atoms.push({ p: [(mir ? -d[0] : d[0]) * 0.95, d[1] * 0.95, d[2] * 0.95], c: GCOL[t] || "#5b606c", t, r: t === "H" ? 11 : 15, tc: t === "H" ? "#222" : "#fff" }); bonds.push([0, i + 1, 1]); }); return { atoms, bonds }; };
      const v = PX.view3d($("[data-v]", right), scene, { aspect: 0.8, minH: 220, maxH: 300 });
      const snap = () => { v.st.rx = -0.2; v.st.ry = mir ? -0.25 : 0.25; v.st.auto = false; v.redraw(); };
      $(".btn", row).onclick = snap;
      $(".chip", row).onclick = e => { mir = !mir; e.currentTarget.setAttribute("aria-pressed", String(mir)); draw(); };
      function draw() { const m = WEDGE_MOLS[cur]; $("[data-d]", left).innerHTML = PX.wedgeSVG(m.g, { mirror: mir }); $(".chip", row).hidden = !m.chiral; v.redraw(); say(m.note + " Press **Turn the model to match the drawing**: the wedged group points straight at you, the hashed one straight away."); }
      draw();
      return { destroy: v.destroy, cmd: x => { if (x.w) { cur = x.w; c.set(cur); mir = false; draw(); } if (x.snap) snap(); } };
    } },
    { name: "Naming", mount(b, arg) {
      let cur = arg.name || "4-methylpentan-2-ol";
      const sel = h(`<label class="small" style="display:grid;grid-template-columns:minmax(0,1fr);gap:4px;max-width:360px"><span class="muted">Pick a name to take apart</span><select style="width:100%">${Object.keys(NAMES).map(k => `<option ${k === cur ? "selected" : ""}>${k}</option>`).join("")}</select></label>`); b.appendChild(sel);
      const out = h(`<div style="display:grid;gap:10px"></div>`); b.appendChild(out);
      $("select", sel).onchange = e => { cur = e.target.value; draw(); };
      note(b, "Recipe: **1** find the longest chain that contains the main group → stem. **2** add the suffix for the main group. **3** number from the end that gives the main group (or C=C) the lowest number. **4** add branches and halogens as prefixes, in alphabetical order, with di-/tri- for repeats. **5** commas between numbers, hyphens between numbers and letters.");
      function draw() {
        const n = NAMES[cur], m = MOL[cur];
        out.innerHTML = `<div class="svgwrap" style="padding:14px;display:grid;gap:10px;justify-items:center">${PX.drawSkeletal(m, 46, n.num)}<div style="font-family:var(--font-display);font-size:clamp(1.3rem,4vw,1.9rem);font-weight:600;display:flex;flex-wrap:wrap;justify-content:center">${n.parts.map(([t, r]) => `<span style="color:${ROLE[r][1]};border-bottom:3px solid ${ROLE[r][1]};padding:0 1px">${t}</span>`).join("")}</div></div>
          <div style="display:grid;gap:6px">${n.parts.map(([t, r, why]) => `<div class="mine-item" style="grid-template-columns:auto minmax(0,1fr);align-items:start"><b style="color:${ROLE[r][1]};font-family:var(--font-mono)">${t}</b><div><span class="small muted">${ROLE[r][0]}</span><div>${md(why)}</div></div></div>`).join("")}</div>${n.tip ? `<div class="callout key"><div>${md(n.tip)}</div></div>` : ""}<div class="small muted">Blue circles are the carbon numbers used in the name.</div>`;
      }
      draw();
      return { cmd: x => { if (x.name && NAMES[x.name]) { cur = x.name; $("select", sel).value = cur; draw(); } } };
    } },
  ]);
} });

/* ======================= MECHANISMS ======================= */
/* scene: atoms [{t, x, y, q (charge), d (δ), lp: [[dx,dy],...]}], bonds [[i,j,order,dash]], arrows [[x1,y1,x2,y2,bend,half]], txt [[x,y,str,style]] */
const MECH = {
  frs: { name: "Free-radical substitution", eq: "{{CH4 + Cl2 ->[uv] CH3Cl + HCl}}", steps: [
    { cap: "**Initiation.** UV light breaks Cl–Cl **homolytically**: one electron to each atom (half-headed arrows).", out: "{{Cl2 -> 2Cl.}}", atoms: [{ t: "Cl", x: 240, y: 120 }, { t: "Cl", x: 330, y: 120 }], bonds: [[0, 1, 1]], arrows: [[285, 113, 250, 100, -30, 1], [285, 127, 322, 140, -30, 1]], txt: [[285, 60, "UV light", "fill:var(--c2)"]] },
    { cap: "**Propagation 1.** A chlorine radical takes an H atom from methane, making HCl and a methyl radical.", out: "{{Cl. + CH4 -> HCl + .CH3}}", atoms: [{ t: "Cl", x: 150, y: 120, rad: [14, -8] }, { t: "H", x: 280, y: 120 }, { t: "CH₃", x: 370, y: 120 }], bonds: [[1, 2, 1]], arrows: [[166, 108, 228, 108, -26, 1], [325, 113, 240, 104, -34, 1], [325, 127, 360, 140, -24, 1]] },
    { cap: "**Propagation 2.** The methyl radical takes a Cl atom from Cl₂, making chloromethane and a new Cl· that keeps the chain going.", out: "{{.CH3 + Cl2 -> CH3Cl + Cl.}}", atoms: [{ t: "H₃C", x: 150, y: 120, rad: [22, -8] }, { t: "Cl", x: 280, y: 120 }, { t: "Cl", x: 370, y: 120 }], bonds: [[1, 2, 1]], arrows: [[174, 108, 228, 108, -26, 1], [325, 113, 240, 104, -34, 1], [325, 127, 360, 140, -24, 1]] },
    { cap: "**Termination.** Two radicals meet and pair their electrons. The chain stops. Other termination products: Cl₂ and C₂H₆.", out: "{{.CH3 + Cl. -> CH3Cl}}", atoms: [{ t: "H₃C", x: 200, y: 120, rad: [22, -8] }, { t: "Cl", x: 360, y: 120, rad: [-14, -8] }], bonds: [], arrows: [[224, 108, 280, 104, -26, 1], [346, 108, 290, 104, 26, 1]] },
  ] },
  ea: { name: "Electrophilic addition: Br₂", eq: "{{CH2=CH2 + Br2 -> CH2BrCH2Br}}", steps: [
    { cap: "As Br₂ approaches the electron-rich π bond it becomes **polarised** (induced dipole). The π electrons attack Brδ+; the Br–Br bond breaks **heterolytically**.", out: "", atoms: [{ t: "C", x: 250, y: 160 }, { t: "C", x: 330, y: 160 }, { t: "H", x: 210, y: 130 }, { t: "H", x: 210, y: 190 }, { t: "H", x: 370, y: 130 }, { t: "H", x: 370, y: 190 }, { t: "Br", x: 290, y: 95, d: "δ+" }, { t: "Br", x: 290, y: 30, d: "δ−" }], bonds: [[0, 1, 2], [0, 2, 1], [0, 3, 1], [1, 4, 1], [1, 5, 1], [6, 7, 1]], arrows: [[290, 155, 286, 108, 22, 0], [294, 62, 312, 34, -22, 0]] },
    { cap: "A **carbocation** forms, and a bromide ion. The Br⁻ lone pair attacks the positive carbon.", out: "", atoms: [{ t: "C", x: 250, y: 160, q: "+" }, { t: "C", x: 330, y: 160 }, { t: "H", x: 210, y: 130 }, { t: "H", x: 210, y: 190 }, { t: "Br", x: 330, y: 95 }, { t: "H", x: 375, y: 160 }, { t: "H", x: 330, y: 205 }, { t: "Br", x: 140, y: 80, q: "−", lp: [[-14, -10], [-16, 6]] }], bonds: [[0, 1, 1], [0, 2, 1], [0, 3, 1], [1, 4, 1], [1, 5, 1], [1, 6, 1]], arrows: [[152, 92, 244, 148, 24, 0]] },
    { cap: "Product: **1,2-dibromoethane**. Bromine water is decolourised (orange → colourless).", out: "{{CH2BrCH2Br}}", atoms: [{ t: "C", x: 250, y: 160 }, { t: "C", x: 330, y: 160 }, { t: "H", x: 210, y: 160 }, { t: "H", x: 250, y: 205 }, { t: "Br", x: 250, y: 95 }, { t: "Br", x: 330, y: 95 }, { t: "H", x: 375, y: 160 }, { t: "H", x: 330, y: 205 }], bonds: [[0, 1, 1], [0, 2, 1], [0, 3, 1], [0, 4, 1], [1, 5, 1], [1, 6, 1], [1, 7, 1]], arrows: [] },
  ] },
  ea2: { name: "Electrophilic addition: HBr + propene", eq: "{{CH3CH=CH2 + HBr -> CH3CHBrCH3}}", steps: [
    { cap: "The π bond attacks the δ+ hydrogen of HBr; H–Br breaks heterolytically.", out: "", atoms: [{ t: "H₂C", x: 230, y: 160 }, { t: "CH", x: 320, y: 160 }, { t: "CH₃", x: 410, y: 160 }, { t: "H", x: 275, y: 95, d: "δ+" }, { t: "Br", x: 275, y: 30, d: "δ−" }], bonds: [[0, 1, 2], [1, 2, 1], [3, 4, 1]], arrows: [[275, 155, 272, 108, 22, 0], [279, 62, 298, 34, -22, 0]] },
    { cap: "H adds to the **end** carbon, giving the **secondary** carbocation (two alkyl groups push electrons towards C⁺: more stable). The primary carbocation hardly forms.", out: "", atoms: [{ t: "H₃C", x: 200, y: 150 }, { t: "C", x: 290, y: 150, q: "+" }, { t: "CH₃", x: 380, y: 150 }, { t: "H", x: 290, y: 95 }, { t: "Br", x: 290, y: 225, q: "−", lp: [[-14, 8], [14, 8]] }], bonds: [[0, 1, 1], [1, 2, 1], [1, 3, 1]], arrows: [[284, 210, 288, 164, 20, 0]], txt: [[470, 60, "secondary: major", "fill:var(--good);font-weight:600"], [470, 80, "⁺CH₂CH₂CH₃: minor", "fill:var(--muted)"]] },
    { cap: "Major product: **2-bromopropane**. (Markovnikov: H goes to the carbon that already has more H atoms.)", out: "{{CH3CHBrCH3}}", atoms: [{ t: "H₃C", x: 200, y: 150 }, { t: "C", x: 290, y: 150 }, { t: "CH₃", x: 380, y: 150 }, { t: "H", x: 290, y: 95 }, { t: "Br", x: 290, y: 210 }], bonds: [[0, 1, 1], [1, 2, 1], [1, 3, 1], [1, 4, 1]], arrows: [] },
  ] },
  sn2: { name: "SN2 (primary)", eq: "{{CH3CH2Br + OH- -> CH3CH2OH + Br-}}", steps: [
    { cap: "The OH⁻ lone pair attacks the δ+ carbon from the side **opposite** Br. At the same time the C–Br bond starts to break.", out: "", atoms: [{ t: "HO", x: 120, y: 130, q: "−", lp: [[16, -10], [16, 10]] }, { t: "C", x: 270, y: 130, d: "δ+" }, { t: "H", x: 245, y: 75 }, { t: "H", x: 235, y: 185 }, { t: "CH₃", x: 305, y: 190 }, { t: "Br", x: 370, y: 130, d: "δ−" }], bonds: [[1, 2, 1], [1, 3, 1], [1, 4, 1], [1, 5, 1]], arrows: [[146, 122, 256, 124, -26, 0], [318, 124, 362, 112, -20, 0]] },
    { cap: "**Transition state**: partial bonds to both OH and Br; the three other groups are flattened into a plane. One step, two species involved: **SN2**.", out: "", atoms: [{ t: "HO", x: 160, y: 130 }, { t: "C", x: 270, y: 130 }, { t: "H", x: 270, y: 70 }, { t: "H", x: 240, y: 190 }, { t: "CH₃", x: 305, y: 190 }, { t: "Br", x: 380, y: 130 }], bonds: [[0, 1, 1, 1], [1, 2, 1], [1, 3, 1], [1, 4, 1], [1, 5, 1, 1]], arrows: [], txt: [[120, 70, "[", "font-size:120px;fill:var(--muted)"], [400, 70, "]⁻", "font-size:60px;fill:var(--muted)"]] },
    { cap: "Products: **ethanol** and a bromide ion. The molecule has been turned inside out (inversion).", out: "{{CH3CH2OH + Br-}}", atoms: [{ t: "HO", x: 180, y: 130 }, { t: "C", x: 270, y: 130 }, { t: "H", x: 300, y: 75 }, { t: "H", x: 300, y: 185 }, { t: "CH₃", x: 340, y: 130 }, { t: "Br", x: 460, y: 130, q: "−" }], bonds: [[0, 1, 1], [1, 2, 1], [1, 3, 1], [1, 4, 1]], arrows: [] },
  ] },
  sn1: { name: "SN1 (tertiary)", eq: "{{(CH3)3CBr + OH- -> (CH3)3COH + Br-}}", steps: [
    { cap: "**Slow step.** The C–Br bond breaks heterolytically on its own. Only the halogenoalkane is involved: **SN1**.", out: "", atoms: [{ t: "C", x: 270, y: 130 }, { t: "CH₃", x: 210, y: 80 }, { t: "CH₃", x: 200, y: 180 }, { t: "CH₃", x: 300, y: 200 }, { t: "Br", x: 360, y: 110, d: "δ−" }], bonds: [[0, 1, 1], [0, 2, 1], [0, 3, 1], [0, 4, 1]], arrows: [[316, 114, 352, 96, -20, 0]] },
    { cap: "A **tertiary carbocation** forms, stabilised by three electron-donating CH₃ groups. **Fast step**: OH⁻ attacks C⁺ (from either side, since it's planar).", out: "", atoms: [{ t: "C", x: 270, y: 130, q: "+" }, { t: "CH₃", x: 220, y: 75 }, { t: "CH₃", x: 210, y: 185 }, { t: "CH₃", x: 335, y: 150 }, { t: "Br", x: 470, y: 70, q: "−" }, { t: "HO", x: 120, y: 130, q: "−", lp: [[16, -10], [16, 10]] }], bonds: [[0, 1, 1], [0, 2, 1], [0, 3, 1]], arrows: [[146, 124, 258, 126, -24, 0]] },
    { cap: "Product: **2-methylpropan-2-ol**.", out: "{{(CH3)3COH}}", atoms: [{ t: "C", x: 270, y: 130 }, { t: "CH₃", x: 210, y: 80 }, { t: "CH₃", x: 200, y: 180 }, { t: "CH₃", x: 300, y: 200 }, { t: "OH", x: 350, y: 110 }], bonds: [[0, 1, 1], [0, 2, 1], [0, 3, 1], [0, 4, 1]], arrows: [] },
  ] },
  nadd: { name: "Nucleophilic addition: HCN + ethanal", eq: "{{CH3CHO + HCN -> CH3CH(OH)CN}}", steps: [
    { cap: "The cyanide ion's lone pair attacks the δ+ carbonyl carbon; the π electrons of C=O move onto oxygen.", out: "", atoms: [{ t: "NC", x: 130, y: 140, q: "−", lp: [[18, -9], [18, 9]] }, { t: "C", x: 280, y: 140, d: "δ+" }, { t: "O", x: 280, y: 65, d: "δ−" }, { t: "CH₃", x: 225, y: 195 }, { t: "H", x: 335, y: 195 }], bonds: [[1, 2, 2], [1, 3, 1], [1, 4, 1]], arrows: [[156, 132, 266, 134, -24, 0], [284, 102, 300, 66, -22, 0]] },
    { cap: "An **intermediate** with O⁻ forms. Its lone pair takes H⁺ from an HCN molecule, regenerating CN⁻ (so KCN acts as a catalyst source of CN⁻).", out: "", atoms: [{ t: "NC", x: 190, y: 140 }, { t: "C", x: 280, y: 140 }, { t: "O", x: 280, y: 70, q: "−", lp: [[16, -8], [16, 8]] }, { t: "CH₃", x: 240, y: 200 }, { t: "H", x: 330, y: 195 }, { t: "H", x: 390, y: 60 }, { t: "CN", x: 470, y: 60 }], bonds: [[0, 1, 1], [1, 2, 1], [1, 3, 1], [1, 4, 1], [5, 6, 1]], arrows: [[298, 64, 380, 58, -18, 0], [430, 54, 462, 40, -20, 0]] },
    { cap: "Product: **2-hydroxypropanenitrile**. C2 is chiral; attack from either face of the planar C=O gives a **racemic mixture**.", out: "{{CH3CH(OH)CN + CN-}}", atoms: [{ t: "NC", x: 190, y: 140 }, { t: "C", x: 280, y: 140 }, { t: "OH", x: 280, y: 70 }, { t: "CH₃", x: 240, y: 200 }, { t: "H", x: 330, y: 195 }], bonds: [[0, 1, 1], [1, 2, 1], [1, 3, 1], [1, 4, 1]], arrows: [] },
  ] },
};
PX.MECH = MECH;
const curly = ([x1, y1, x2, y2, bend = 20, half = 0]) => {
  const mx = (x1 + x2) / 2, my = (y1 + y2) / 2, dx = x2 - x1, dy = y2 - y1, L = Math.hypot(dx, dy) || 1, cx = mx - dy / L * bend, cy = my + dx / L * bend;
  const tx = x2 - cx, ty = y2 - cy, tl = Math.hypot(tx, ty) || 1, ux = tx / tl, uy = ty / tl, hs = 9;
  const l = [x2 - ux * hs - uy * hs * 0.55, y2 - uy * hs + ux * hs * 0.55], r = [x2 - ux * hs + uy * hs * 0.55, y2 - uy * hs - ux * hs * 0.55];
  return `<path d="M${x1},${y1} Q${cx},${cy} ${x2},${y2}" style="fill:none;stroke:var(--c3);stroke-width:2.2"/><path d="M${l[0]},${l[1]} L${x2},${y2}${half ? "" : ` L${r[0]},${r[1]}`}" style="fill:none;stroke:var(--c3);stroke-width:2.2;stroke-linejoin:round"/>`;
};
const drawScene = sc => {
  let s = "";
  const W = t => Math.max(12, t.length * 9);
  (sc.bonds || []).forEach(([i, j, o, dash]) => { const a = sc.atoms[i], b = sc.atoms[j], dx = b.x - a.x, dy = b.y - a.y, L = Math.hypot(dx, dy), ux = dx / L, uy = dy / L, ta = W(a.t) * 0.75 + 4, tb = W(b.t) * 0.75 + 4, offs = o === 1 ? [0] : o === 2 ? [-1, 1] : [-1.6, 0, 1.6]; offs.forEach(k => { s += `<line x1="${a.x + ux * ta - uy * 3.5 * k}" y1="${a.y + uy * ta + ux * 3.5 * k}" x2="${b.x - ux * tb - uy * 3.5 * k}" y2="${b.y - uy * tb + ux * 3.5 * k}" style="stroke:var(--fg);stroke-width:2;${dash ? "stroke-dasharray:4 4" : ""}"/>`; }); });
  sc.atoms.forEach(a => {
    s += `<text x="${a.x}" y="${a.y + 6}" text-anchor="middle" style="font-family:var(--font-body);font-size:18px;font-weight:700;fill:${a.t.startsWith("Br") ? "#a8452a" : a.t.startsWith("Cl") ? "var(--org)" : a.t.includes("O") ? "var(--c3)" : a.t.includes("N") ? "var(--c1)" : "var(--fg)"}">${a.t}</text>`;
    if (a.q) s += `<text x="${a.x + W(a.t) / 2 + 8}" y="${a.y - (a.lp ? 16 : 8)}" style="font-size:16px;font-weight:700;fill:var(--fg)">${a.q}</text>`;
    if (a.d) s += `<text x="${a.x + W(a.t) / 2 + 6}" y="${a.y - 10}" style="font-size:13px;fill:var(--muted);font-style:italic">${a.d}</text>`;
    (a.lp || []).forEach(([dx, dy]) => { s += `<circle cx="${a.x + dx - 2.5}" cy="${a.y + dy}" r="2.2" style="fill:var(--fg)"/><circle cx="${a.x + dx + 2.5}" cy="${a.y + dy}" r="2.2" style="fill:var(--fg)"/>`; });
    if (a.rad) s += `<circle cx="${a.x + a.rad[0]}" cy="${a.y + a.rad[1]}" r="3" style="fill:var(--c3)"/>`;
  });
  (sc.arrows || []).forEach(ar => s += curly(ar));
  (sc.txt || []).forEach(([x, y, t, st]) => s += `<text x="${x}" y="${y}" text-anchor="middle" style="${st || ""}">${t}</text>`);
  return s;
};
PX.mountMech = (host, list, start) => {
  let m = start || list[0], i = 0;
  const c = list.length > 1 ? chips(host, list.map(k => [k, MECH[k].name]), k => { m = k; i = 0; draw(); }, m) : null;
  const eq = h(`<div class="eq"></div>`); host.appendChild(eq);
  const wrap = h(`<div class="svgwrap"><svg class="sim" viewBox="60 0 480 240"></svg></div>`); host.appendChild(wrap);
  const svg = $("svg", wrap);
  const nav = h(`<div class="row"><button class="btn ghost sm" type="button">Back</button><button class="btn sm" type="button">Next step</button><span class="small muted"></span></div>`); host.appendChild(nav);
  const cap = h(`<div class="callout"></div>`); host.appendChild(cap);
  note(host, "Curly arrows show the movement of a **pair** of electrons, from a lone pair or bond to an atom or bond. Half-headed (fish-hook) arrows move one electron.");
  $$("button", nav)[0].onclick = () => { i = Math.max(0, i - 1); draw(); };
  $$("button", nav)[1].onclick = () => { i = (i + 1) % MECH[m].steps.length; draw(); };
  function draw() {
    const M2 = MECH[m], st = M2.steps[i];
    eq.innerHTML = md(M2.eq); svg.innerHTML = drawScene(st);
    $("span", nav).textContent = `Step ${i + 1} of ${M2.steps.length}`;
    $$("button", nav)[1].textContent = i === M2.steps.length - 1 ? "Start again" : "Next step";
    cap.innerHTML = md(st.cap) + (st.out ? `<div class="eq" style="margin-top:6px">${md(st.out)}</div>` : "");
  }
  draw();
  return { cmd: x => { if (x.mech && MECH[x.mech]) { m = x.mech; i = 0; c && c.set(m); draw(); } } };
};
PX.sim("mech-hc", { title: "Mechanisms: hydrocarbons", mount: host => PX.mountMech(host, ["frs", "ea", "ea2"]) });
PX.sim("mech-hal", { title: "Mechanisms: halogenoalkanes", mount: host => PX.mountMech(host, ["sn2", "sn1"]) });

/* ======================= REACTION MAP ======================= */
const NODES = {
  alkane: ["alkane", 70, 50], alkene: ["alkene", 250, 50], polymer: ["poly(alkene)", 430, 50], diol: ["diol", 590, 50],
  hal: ["halogenoalkane", 70, 165], alc1: ["1° alcohol", 250, 165], ald: ["aldehyde", 430, 165], hn: ["hydroxynitrile", 590, 165],
  nitrile: ["nitrile", 70, 280], alc2: ["2° alcohol", 250, 280], ket: ["ketone", 430, 280],
  amine: ["amine", 70, 395], acid: ["carboxylic acid", 250, 395], ester: ["ester", 430, 395], salt: ["carboxylate salt", 590, 395],
};
const EDGES = [
  ["alkane", "hal", "Cl₂ or Br₂", "UV light", "free-radical substitution"],
  ["alkene", "alkane", "H₂", "Ni catalyst, heat (≈140 °C)", "addition (hydrogenation)"],
  ["alkene", "alc1", "steam, H₂O(g)", "H₃PO₄ catalyst, 300 °C, 6 MPa", "electrophilic addition (ethene → ethanol)"],
  ["alkene", "alc2", "steam, H₂O(g)", "H₃PO₄ catalyst, 300 °C, 6 MPa", "electrophilic addition (e.g. propene → propan-2-ol, major)"],
  ["alkene", "hal", "HBr (or HCl, Br₂)", "room temperature", "electrophilic addition"],
  ["alkene", "diol", "KMnO₄, H⁺", "cold, dilute", "oxidation"],
  ["alkene", "acid", "KMnO₄, H⁺", "hot, concentrated (=CHR ends)", "oxidative cleavage"],
  ["alkene", "ket", "KMnO₄, H⁺", "hot, concentrated (=CR₂ ends)", "oxidative cleavage"],
  ["alkene", "polymer", "(many monomers)", "high pressure or catalyst", "addition polymerisation"],
  ["hal", "alc1", "NaOH(aq)", "heat under reflux", "nucleophilic substitution (hydrolysis)"],
  ["hal", "nitrile", "KCN in ethanol", "heat under reflux", "nucleophilic substitution (+1 C)"],
  ["hal", "amine", "excess NH₃ in ethanol", "heat in a sealed tube", "nucleophilic substitution"],
  ["hal", "alkene", "NaOH in ethanol", "heat", "elimination of HX"],
  ["alc1", "hal", "HBr (KBr + conc H₂SO₄), PCl₅, PCl₃ or SOCl₂", "PCl₃: heat", "substitution"],
  ["alc1", "alkene", "Al₂O₃, or conc H₂SO₄ / H₃PO₄", "heat", "dehydration (elimination)"],
  ["alc1", "ald", "K₂Cr₂O₇, H₂SO₄", "warm, distil off the aldehyde as it forms", "oxidation"],
  ["alc1", "acid", "K₂Cr₂O₇, H₂SO₄", "heat under reflux", "oxidation"],
  ["alc1", "ester", "carboxylic acid, conc H₂SO₄ catalyst", "heat", "esterification (condensation)"],
  ["alc2", "ket", "K₂Cr₂O₇, H₂SO₄", "heat", "oxidation"],
  ["alc2", "alkene", "Al₂O₃, or conc H₂SO₄ / H₃PO₄", "heat", "dehydration (elimination)"],
  ["alc2", "hal", "HBr, PCl₅, PCl₃ or SOCl₂", "", "substitution"],
  ["ald", "acid", "K₂Cr₂O₇, H₂SO₄ (or Tollens' / Fehling's)", "heat under reflux", "oxidation"],
  ["ald", "alc1", "NaBH₄ (or LiAlH₄ in dry ether)", "room temperature", "reduction"],
  ["ket", "alc2", "NaBH₄ (or LiAlH₄ in dry ether)", "room temperature", "reduction"],
  ["ald", "hn", "HCN with KCN", "room temperature", "nucleophilic addition (+1 C)"],
  ["ket", "hn", "HCN with KCN", "room temperature", "nucleophilic addition (+1 C)"],
  ["nitrile", "acid", "dilute HCl (aq)", "heat under reflux", "hydrolysis"],
  ["acid", "ester", "alcohol, conc H₂SO₄ catalyst", "heat", "esterification (condensation)"],
  ["acid", "alc1", "LiAlH₄ in dry ether", "room temperature", "reduction"],
  ["acid", "salt", "NaOH, Na₂CO₃ or a reactive metal", "room temperature", "neutralisation"],
  ["ester", "acid", "dilute acid", "heat under reflux", "acid hydrolysis (reversible)"],
  ["ester", "salt", "NaOH(aq)", "heat under reflux", "base hydrolysis (complete)"],
];
PX.EDGES = EDGES; PX.NODES = NODES;
PX.mountMap = (host, arg = {}) => {
  let sel = arg.node || "alc1";
  const wrap = h(`<div class="svgwrap"><svg class="sim" viewBox="0 0 660 440"></svg></div>`); host.appendChild(wrap);
  const svg = $("svg", wrap);
  const list = h(`<div style="display:grid;gap:6px"></div>`); host.appendChild(list);
  const rf = h(`<div class="box"><div class="tag">Route finder</div><div class="row small"><label>from <select data-r="a">${Object.entries(NODES).map(([k, v]) => `<option value="${k}">${v[0]}</option>`).join("")}</select></label><label>to <select data-r="b">${Object.entries(NODES).map(([k, v]) => `<option value="${k}" ${k === "ester" ? "selected" : ""}>${v[0]}</option>`).join("")}</select></label><button class="btn sm" type="button">Find a route</button></div><div data-out class="small"></div></div>`);
  host.appendChild(rf);
  let path = [];
  const pos = k => [NODES[k][1], NODES[k][2]];
  function draw() {
    let s = "";
    EDGES.forEach((e, i) => {
      const [x1, y1] = pos(e[0]), [x2, y2] = pos(e[1]), onPath = path.some(p => p === i), out = e[0] === sel, inn = e[1] === sel;
      const col = onPath ? "var(--c2)" : out ? "var(--accent)" : inn ? "var(--c4)" : "var(--line)", w = onPath || out || inn ? 2.6 : 1.4;
      const dx = x2 - x1, dy = y2 - y1, L = Math.hypot(dx, dy), ux = dx / L, uy = dy / L, rev = EDGES.some(f => f[0] === e[1] && f[1] === e[0]), off = rev ? 6 : 0;
      const sx = x1 + ux * 48 - uy * off, sy = y1 + uy * 18 + ux * off, ex = x2 - ux * 50 - uy * off, ey = y2 - uy * 20 + ux * off;
      s += `<line x1="${sx}" y1="${sy}" x2="${ex}" y2="${ey}" style="stroke:${col};stroke-width:${w}"/><path d="M${ex - ux * 8 - uy * 4},${ey - uy * 8 + ux * 4} L${ex},${ey} L${ex - ux * 8 + uy * 4},${ey - uy * 8 - ux * 4}" style="fill:none;stroke:${col};stroke-width:${w}"/>`;
    });
    Object.entries(NODES).forEach(([k, [lab, x, y]]) => { const on = k === sel; s += `<g data-n="${k}" style="cursor:pointer"><rect x="${x - 58}" y="${y - 17}" width="116" height="34" rx="12" style="fill:${on ? "var(--accent)" : "var(--panel)"};stroke:${on ? "var(--accent)" : "var(--line)"};stroke-width:1.5"/><text x="${x}" y="${y + 5}" text-anchor="middle" style="fill:${on ? "var(--accent-ink)" : "var(--fg)"};font-family:var(--font-body);font-size:13px;font-weight:700">${lab}</text></g>`; });
    svg.innerHTML = s;
    $$("[data-n]", svg).forEach(g => g.onclick = () => { sel = g.dataset.n; path = []; draw(); });
    const outs = EDGES.filter(e => e[0] === sel), ins = EDGES.filter(e => e[1] === sel);
    list.innerHTML = `<div class="small"><b style="color:var(--accent)">From ${NODES[sel][0]}</b></div>` + (outs.length ? outs.map(e => `<div class="mine-item" style="gap:2px"><b>→ ${NODES[e[1]][0]}</b><span class="small">${e[2]}${e[3] ? "; " + e[3] : ""}</span><span class="small muted">${e[4]}</span></div>`).join("") : `<div class="small muted">No onward reactions at AS.</div>`) + (ins.length ? `<div class="small muted">Made from: ${ins.map(e => NODES[e[0]][0]).join(", ")}</div>` : "");
  }
  $("button", rf).onclick = () => {
    const a = $("[data-r=a]", rf).value, b2 = $("[data-r=b]", rf).value, out = $("[data-out]", rf);
    const prev = { [a]: null }, q = [a];
    while (q.length) { const u = q.shift(); if (u === b2) break; EDGES.forEach((e, i) => { if (e[0] === u && !(e[1] in prev)) { prev[e[1]] = i; q.push(e[1]); } }); }
    if (a === b2) { out.innerHTML = "Same group: nothing to do."; return; }
    if (!(b2 in prev)) { out.innerHTML = "No route using AS reactions."; path = []; draw(); return; }
    path = []; let v = b2; while (prev[v] != null) { path.unshift(prev[v]); v = EDGES[prev[v]][0]; }
    sel = a; draw();
    out.innerHTML = `<ol style="margin:6px 0 0;padding-left:1.2em;display:grid;gap:4px">${path.map(i => { const e = EDGES[i]; return `<li>${NODES[e[0]][0]} → <b>${NODES[e[1]][0]}</b>: ${e[2]}${e[3] ? "; " + e[3] : ""}</li>`; }).join("")}</ol>`;
  };
  draw();
  return { cmd: x => { if (x.node) { sel = x.node; path = []; draw(); } } };
};
PX.sim("reactionmap", { title: "Organic reaction map", mount: (host) => { const c = PX.mountMap(host); return c; } });

/* ======================= CARBONYL: IR, mechanism, tests, routes ======================= */
const IR = {
  ethanol: [[3350, 160, 0.75, "O–H (alcohol), broad"], [2970, 40, 0.6, "C–H"], [2890, 30, 0.35, ""], [1380, 20, 0.3, ""], [1090, 22, 0.55, ""], [1050, 24, 0.8, "C–O"], [880, 18, 0.4, ""]],
  "ethanoic acid": [[3000, 300, 0.6, "O–H (acid), very broad"], [1715, 28, 0.92, "C=O"], [1410, 22, 0.4, ""], [1290, 26, 0.65, "C–O"], [940, 26, 0.4, ""]],
  propanone: [[2970, 30, 0.3, "C–H"], [1715, 24, 0.95, "C=O"], [1365, 18, 0.55, ""], [1220, 22, 0.45, ""], [530, 18, 0.4, ""]],
  "ethyl ethanoate": [[2985, 30, 0.35, "C–H"], [1742, 22, 0.92, "C=O"], [1375, 16, 0.4, ""], [1240, 30, 0.9, "C–O"], [1048, 22, 0.6, "C–O"]],
  propanenitrile: [[2950, 36, 0.45, "C–H"], [2250, 16, 0.6, "C≡N"], [1460, 20, 0.45, ""], [1080, 18, 0.3, ""]],
  ethylamine: [[3370, 26, 0.35, "N–H"], [3290, 26, 0.32, "N–H"], [2960, 34, 0.6, "C–H"], [1600, 26, 0.3, ""], [1080, 22, 0.35, ""]],
  "hex-1-ene": [[3080, 20, 0.3, "=C–H"], [2930, 40, 0.75, "C–H"], [1642, 18, 0.45, "C=C"], [1460, 20, 0.4, ""], [910, 18, 0.6, ""]],
  hexane: [[2930, 46, 0.85, "C–H"], [1465, 20, 0.5, ""], [1380, 18, 0.35, ""], [725, 14, 0.3, ""]],
};
const BANDS = [["O–H alcohol", 3200, 3600, "var(--c3)"], ["O–H acid", 2500, 3000, "var(--c2)"], ["N–H", 3300, 3500, "var(--c1)"], ["C–H", 2850, 2950, "var(--muted)"], ["C≡N", 2200, 2250, "var(--c4)"], ["C=O", 1670, 1740, "var(--accent)"], ["C=C", 1500, 1680, "var(--org)"], ["C–O", 1040, 1300, "var(--inorg)"]];
const TESTS = {
  dnph: ["2,4-DNPH", c => c.ald || c.ket ? ["orange", "orange precipitate"] : null],
  tollens: ["Tollens', warm", c => c.ald ? ["#c8c8c8", "silver mirror"] : null],
  fehling: ["Fehling's, warm", c => c.ald ? ["#b0472a", "blue → red-brown precipitate"] : null],
  iodo: ["alkaline I₂, warm", c => c.ch3co || c.ch3choh ? ["#f0e07a", "pale yellow precipitate of CHI₃"] : null],
  dich: ["K₂Cr₂O₇ / H⁺, warm", c => c.alc === 1 || c.alc === 2 || c.ald ? ["#3e9a5a", "orange → green"] : null],
  na: ["sodium", c => c.alc || c.acid ? ["rgba(200,220,240,.5)", c.acid ? "vigorous fizzing (H₂)" : "fizzing (H₂)"] : null],
  carb: ["Na₂CO₃(aq)", c => c.acid ? ["rgba(200,220,240,.5)", "fizzing (CO₂)"] : null],
};
const COMP = { ethanal: { ald: 1, ch3co: 1 }, propanal: { ald: 1 }, propanone: { ket: 1, ch3co: 1 }, butanone: { ket: 1, ch3co: 1 }, "pentan-3-one": { ket: 1 }, ethanol: { alc: 1, ch3choh: 1 }, "propan-1-ol": { alc: 1 }, "propan-2-ol": { alc: 2, ch3choh: 1 }, "2-methylpropan-2-ol": { alc: 3 }, "ethanoic acid": { acid: 1 } };
const NEG = { dnph: ["orange", "no precipitate (stays orange solution)"], tollens: ["rgba(220,220,230,.6)", "no change"], fehling: ["#4a7fd0", "stays blue"], iodo: ["#e8b46a", "no precipitate"], dich: ["#e08a2a", "stays orange"], na: ["rgba(200,220,240,.5)", "no reaction"], carb: ["rgba(200,220,240,.5)", "no fizzing"] };
PX.sim("carbonyl", { title: "Carbonyls and IR", mount(host) {
  return PX.tabbed(host, [
    { name: "IR spectra", mount(b, arg) {
      let s0 = arg.s || "ethanoic acid", band = null;
      const c = chips(b, Object.keys(IR).map(k => [k, k]), k => { s0 = k; draw(); }, s0);
      const svg = h(`<svg></svg>`); const w = h(`<div class="svgwrap" style="padding:6px"></div>`); w.appendChild(svg); b.appendChild(w);
      chips(b, BANDS.map((x, i) => [i, x[0]]), k => { band = +k; draw(); }, null);
      const say = note(b);
      function draw() {
        const pk = IR[s0], pts = [];
        for (let x = 4000; x >= 500; x -= 5) { let T = 98; pk.forEach(([c0, wd, dp]) => { T -= dp * 90 * Math.exp(-((x - c0) ** 2) / (2 * wd * wd)); }); T -= 3 * Math.abs(Math.sin(x / 37)) * (x < 1500 ? 1 : 0.2); pts.push([4000 - x, Math.max(2, T)]); }
        const W = 560, H = 250, m = { l: 44, r: 12, t: 12, b: 36 }, X = v => m.l + (4000 - v) / 3500 * (W - m.l - m.r), Y = t => H - m.b - t / 100 * (H - m.t - m.b);
        let s = "";
        if (band != null) { const [n, a, z, col] = BANDS[band]; s += `<rect x="${X(z)}" y="${m.t}" width="${X(a) - X(z)}" height="${H - m.t - m.b}" style="fill:${col};opacity:.18"/><text x="${(X(a) + X(z)) / 2}" y="${m.t + 12}" text-anchor="middle" style="fill:${col};font-weight:600">${n}</text>`; }
        [4000, 3500, 3000, 2500, 2000, 1500, 1000, 500].forEach(v => s += `<line class="grid" x1="${X(v)}" x2="${X(v)}" y1="${m.t}" y2="${H - m.b}"/><text x="${X(v)}" y="${H - m.b + 14}" text-anchor="middle">${v}</text>`);
        s += `<rect x="${X(1500)}" y="${m.t}" width="${X(500) - X(1500)}" height="${H - m.t - m.b}" style="fill:var(--panel-3);opacity:.35"/><text x="${(X(1500) + X(500)) / 2}" y="${H - m.b - 6}" text-anchor="middle">fingerprint region</text>`;
        s += `<path d="${pts.map((p, i) => `${i ? "L" : "M"}${X(4000 - p[0]).toFixed(1)},${Y(p[1]).toFixed(1)}`).join("")}" style="fill:none;stroke:var(--accent);stroke-width:1.8"/>`;
        pk.filter(p => p[3]).forEach(([c0, , dp, lab]) => s += `<text x="${X(c0)}" y="${Y(98 - dp * 90) + 16}" text-anchor="middle" style="fill:var(--fg);font-weight:600">${lab.split(",")[0]}</text>`);
        s += `<text x="${(m.l + W - m.r) / 2}" y="${H - 4}" text-anchor="middle">wavenumber / cm⁻¹</text><text transform="translate(12 ${H / 2}) rotate(-90)" text-anchor="middle">transmittance / %</text>`;
        svg.setAttribute("viewBox", `0 0 ${W} ${H}`); svg.classList.add("chart"); svg.innerHTML = s;
        say(`Key absorptions for **${s0}**: ${pk.filter(p => p[3]).map(p => `${p[3]} at ${p[0]} cm⁻¹`).join("; ")}. Tap a bond below the graph to shade its range from the data table.`);
      }
      draw();
      return { cmd: x => { if (x.s) { s0 = x.s; c.set(s0); draw(); } } };
    } },
    { name: "Nucleophilic addition", mount: b => PX.mountMech(b, ["nadd"]) },
    { name: "Tests", mount(b) {
      let comp = "propanal", test = "tollens";
      const sel = h(`<label class="row small" style="gap:10px"><span class="muted">Compound</span><select>${Object.keys(COMP).map(k => `<option ${k === comp ? "selected" : ""}>${k}</option>`).join("")}</select></label>`); b.appendChild(sel);
      chips(b, Object.entries(TESTS).map(([k, v]) => [k, v[0]]), k => { test = k; draw(); }, test);
      const out = h(`<div class="svgwrap" style="padding:14px;display:flex;gap:16px;align-items:center;flex-wrap:wrap"></div>`); b.appendChild(out);
      $("select", sel).onchange = e => { comp = e.target.value; draw(); };
      function draw() {
        const r = TESTS[test][1](COMP[comp]), [col, txt] = r || NEG[test];
        const mirror = r && test === "tollens", ppt = r && ["dnph", "fehling", "iodo"].includes(test);
        out.innerHTML = `<svg viewBox="0 0 80 180" style="width:80px"><path d="M15 10 V150 a25 25 0 0 0 50 0 V10" style="fill:var(--panel);stroke:var(--fg);stroke-width:${mirror ? 4 : 2}${mirror ? ";stroke:#9aa0a8" : ""}"/><path d="M17 70 V150 a23 23 0 0 0 46 0 V70z" style="fill:${ppt ? (test === "fehling" ? "#4a7fd0" : test === "iodo" ? "#f3eecf" : "#f0b860") : col};opacity:.85"/>${ppt ? `<path d="M18 145 a22 22 0 0 0 44 0 q-22 -14 -44 0z" style="fill:${col}"/>` : ""}${r && (test === "na" || test === "carb") && !reduce ? [0, 1, 2].map(i => `<circle cx="${32 + i * 8}" cy="140" r="3" style="fill:none;stroke:var(--muted)"><animate attributeName="cy" from="150" to="75" dur="${0.8 + i * 0.3}s" repeatCount="indefinite"/></circle>`).join("") : ""}</svg><div style="flex:1;min-width:180px"><b>${r ? "Positive" : "Negative"}:</b> ${txt}.<div class="small muted" style="margin-top:6px">${{ dnph: "Detects C=O in aldehydes and ketones.", tollens: "Aldehydes reduce Ag⁺ to silver.", fehling: "Aldehydes reduce Cu²⁺ to Cu₂O.", iodo: "Needs CH₃CO– or CH₃CH(OH)–.", dich: "Oxidises 1° and 2° alcohols and aldehydes.", na: "Reacts with O–H groups.", carb: "Only acids are strong enough." }[test]}</div></div>`;
      }
      draw();
      return {};
    } },
    { name: "Route finder", mount: (b, arg) => PX.mountMap(b, arg) },
  ]);
} });

/* ======================= TITRATION (P1) ======================= */
PX.sim("titration", { title: "Titration bench", mount(host) {
  const wrap = h(`<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(150px,1fr));gap:12px;align-items:start"></div>`); host.appendChild(wrap);
  const svg = h(`<svg viewBox="0 0 190 360" style="width:100%;max-width:190px"></svg>`); const sw = h(`<div class="svgwrap" style="padding:6px"></div>`); sw.appendChild(svg); wrap.appendChild(sw);
  const right = h(`<div style="display:grid;gap:10px;min-width:0"></div>`); wrap.appendChild(right);
  right.appendChild(h(`<div class="small">25.0 cm³ of NaOH(aq) (unknown concentration) + phenolphthalein in the flask. 0.100 mol dm⁻³ HCl in the burette.</div>`));
  const btns = h(`<div class="pick"><button class="btn sm" type="button" data-v="1">Run 1.00 cm³</button><button class="btn ghost sm" type="button" data-v="0.1">Run 0.10 cm³</button><button class="btn ghost sm" type="button" data-v="0.05">One drop</button></div>`); right.appendChild(btns);
  const btn2 = h(`<div class="pick"><button class="btn sm" type="button" data-a="rec">Record this titration</button><button class="btn ghost sm" type="button" data-a="new">Refill, new flask</button></div>`); right.appendChild(btn2);
  const zoom = h(`<div class="svgwrap" style="padding:6px"><svg viewBox="0 0 220 70" class="sim" style="width:100%"></svg></div>`); right.appendChild(zoom);
  const tbl = h(`<div class="tbl-wrap"></div>`); host.appendChild(tbl);
  const say = note(host, "Read the burette at the bottom of the meniscus, to the nearest 0.05 cm³. Do a rough titration first, then go drop by drop near the end point.");
  const cTrue = round(0.08 + Math.random() * 0.04, 4), Vend = cTrue * 25 / 0.1;
  let start = 0, V = 0, rows = [];
  const newRun = () => { start = [0.0, 0.5, 1.0, 1.2, 0.3, 0.8][Math.floor(Math.random() * 6)]; V = 0; draw(); };
  const reading = () => Math.round((start + V) * 20) / 20;
  function draw() {
    const pink = clamp((Vend - V) / 0.06, 0, 1), over = V > Vend + 0.1;
    const lvl = 20 + (start + V) * 5.2;
    let s = `<rect x="80" y="10" width="22" height="270" rx="4" style="fill:var(--panel);stroke:var(--fg);stroke-width:1.5"/><rect x="82" y="${Math.min(278, lvl)}" width="18" height="${Math.max(0, 278 - lvl)}" style="fill:rgba(160,200,240,.5)"/>`;
    for (let v = 0; v <= 50; v += 5) s += `<line x1="80" x2="88" y1="${20 + v * 5.2}" y2="${20 + v * 5.2}" style="stroke:var(--fg)"/><text x="76" y="${24 + v * 5.2}" text-anchor="end" style="font-size:9px">${v}</text>`;
    s += `<path d="M86 280 L86 300 L96 300 L96 280" style="fill:var(--panel);stroke:var(--fg)"/><rect x="74" y="288" width="34" height="6" rx="2" style="fill:var(--muted)"/>`;
    s += `<path d="M70 306 h42 v12 l26 34 h-94 l26 -34z" style="fill:var(--panel);stroke:var(--fg);stroke-width:1.5"/><path d="M52 336 h78 l12 16 h-102z" style="fill:rgba(230,70,160,${(0.08 + 0.7 * pink).toFixed(2)})"/>`;
    svg.innerHTML = s;
    const r = start + V, z = $("svg", zoom); let zs = "";
    for (let t = Math.floor((r - 1) * 10); t <= Math.ceil((r + 1) * 10); t++) { const x = 110 + (t / 10 - r) * 100; if (x < 0 || x > 220) continue; zs += `<line x1="${x}" x2="${x}" y1="20" y2="${t % 10 === 0 ? 46 : t % 5 === 0 ? 40 : 34}" style="stroke:var(--fg)"/>${t % 10 === 0 ? `<text x="${x}" y="60" text-anchor="middle" class="lbl">${t / 10}</text>` : ""}`; }
    zs += `<line x1="110" x2="110" y1="8" y2="50" style="stroke:var(--c3);stroke-width:2.5"/><text x="110" y="10" text-anchor="middle" style="fill:var(--c3)">meniscus</text>`;
    z.innerHTML = zs;
    const done = rows.filter(x => !x.rough), conc = [];
    for (let i = 0; i < done.length; i++) for (let j = i + 1; j < done.length; j++) if (Math.abs(done[i].t - done[j].t) <= 0.1001) { if (!conc.includes(done[i])) conc.push(done[i]); if (!conc.includes(done[j])) conc.push(done[j]); }
    tbl.innerHTML = rows.length ? `<table class="board"><tr><th></th>${rows.map(x => `<th>${x.rough ? "rough" : x.n}</th>`).join("")}</tr><tr><th>final reading / cm³</th>${rows.map(x => `<td>${x.f.toFixed(2)}</td>`).join("")}</tr><tr><th>initial reading / cm³</th>${rows.map(x => `<td>${x.i.toFixed(2)}</td>`).join("")}</tr><tr><th>titre / cm³</th>${rows.map(x => `<td ${conc.includes(x) ? 'style="color:var(--good);font-weight:700"' : ""}>${x.t.toFixed(2)}</td>`).join("")}</tr></table>` : "";
    if (conc.length >= 2) { const mean = conc.reduce((a, x) => a + x.t, 0) / conc.length, c = 0.1 * mean / 25; say(`Concordant titres (green) agree within 0.10 cm³. Mean = **${mean.toFixed(2)} cm³**. n(HCl) = 0.100 × ${mean.toFixed(2)}/1000; NaOH : HCl = 1 : 1, so c(NaOH) = **${c.toFixed(4)} mol dm⁻³** (true value ${cTrue.toFixed(4)}).`); }
    else if (over) say("Overshot: the flask went colourless a while ago. Record it as a rough titration, or refill and start again.");
  }
  $$("[data-v]", btns).forEach(bt => bt.onclick = () => { V = Math.min(49 - start, V + +bt.dataset.v); draw(); });
  $("[data-a=rec]", btn2).onclick = () => { if (V <= 0) return; const t = round(reading() - start, 2); rows.push({ rough: rows.length === 0, n: rows.length, i: start, f: reading(), t }); if (rows.length > 6) rows.shift(); newRun(); };
  $("[data-a=new]", btn2).onclick = newRun;
  newRun();
  return {};
} });
})();
