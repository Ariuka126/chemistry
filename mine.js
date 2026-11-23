/* mine.js — "My material": notes, flashcards, MCQs and explain-questions the learner pastes in. Saved in this browser; export/import as JSON. */
(() => {
"use strict";
const KEY = "as-chem-mine-v1";
let DB;
try { DB = JSON.parse(localStorage.getItem(KEY) || "null"); } catch (e) { DB = null; }
if (!DB || !Array.isArray(DB.items)) DB = { v: 1, items: [] };
const save = () => { try { localStorage.setItem(KEY, JSON.stringify(DB)); } catch (e) {} };
const uid = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 6);

/* Format (blocks start with a line "## note", "## card", "## mcq" or "## explain"):
   ## note            -> free text
   ## card            -> lines "Term :: Definition"
   ## mcq             -> "Q: question", then options: "* right | why" / "- wrong | why"; blank line starts the next question
   ## explain         -> "Q: question", then "+ mark point" lines
   Text with no header: lines containing "::" become cards, the rest a note. */
const parse = (text, unit) => {
  const out = [], blocks = [];
  let cur = null;
  String(text).replace(/\r/g, "").split("\n").forEach(line => {
    const m = line.match(/^\s*##\s*(note|notes|card|cards|mcq|mcqs|explain|question|questions)\s*$/i);
    if (m) { cur = { kind: m[1].toLowerCase().replace(/s$/, "").replace("question", "explain"), lines: [] }; blocks.push(cur); return; }
    if (!cur) { cur = { kind: "auto", lines: [] }; blocks.push(cur); }
    cur.lines.push(line);
  });
  blocks.forEach(b => {
    const L = b.lines;
    if (b.kind === "auto") {
      const cards = L.filter(l => l.includes("::")), rest = L.filter(l => !l.includes("::")).join("\n").trim();
      cards.forEach(l => { const [t, d] = l.split("::"); if (t.trim() && d && d.trim()) out.push({ kind: "card", t: t.trim(), d: d.trim() }); });
      if (rest) out.push({ kind: "note", text: rest });
    } else if (b.kind === "note") { const t = L.join("\n").trim(); if (t) out.push({ kind: "note", text: t }); }
    else if (b.kind === "card") L.forEach(l => { if (!l.includes("::")) return; const [t, d] = l.split("::"); if (t.trim() && d.trim()) out.push({ kind: "card", t: t.trim(), d: d.trim() }); });
    else {
      let q = null;
      const flush = () => { if (!q) return; if (b.kind === "mcq" && q.o.length >= 2 && q.o.some(o => o[1])) out.push({ kind: "mcq", q: q.q, o: q.o }); if (b.kind === "explain" && q.q) out.push({ kind: "explain", q: q.q, pts: q.pts.length ? q.pts : ["(no mark points given)"] }); q = null; };
      L.forEach(l => {
        const t = l.trim();
        if (!t) { if (q && (q.o.length || q.pts.length)) flush(); return; }
        const qm = t.match(/^(?:Q\d*[:.)]|\d+[.)])\s*(.+)$/i);
        if (qm) { flush(); q = { q: qm[1], o: [], pts: [] }; return; }
        if (!q) { q = { q: t, o: [], pts: [] }; return; }
        const om = t.match(/^([*\-]|[A-Da-d][.)]\*?|\*[A-Da-d][.)])\s*(.+)$/);
        if (b.kind === "mcq" && om) { const right = om[1].includes("*"); const [text, why] = om[2].split("|"); out.length; q.o.push([text.trim(), right, (why || (right ? "This is the correct answer." : "Not this one.")).trim()]); return; }
        const pm = t.match(/^[+•\-]\s*(.+)$/);
        if (b.kind === "explain" && pm) { q.pts.push(pm[1]); return; }
        if (b.kind === "mcq" && !q.o.length) q.q += " " + t; else if (b.kind === "explain" && !q.pts.length) q.q += " " + t;
      });
      flush();
    }
  });
  return out.map(x => Object.assign(x, { id: uid(), unit, at: Date.now() }));
};
PX.mine = {
  all: () => DB.items,
  forUnit: id => DB.items.filter(x => x.unit === id),
  parse,
  add: items => { DB.items.push(...items); save(); },
  remove: id => { DB.items = DB.items.filter(x => x.id !== id); save(); },
  exportJSON: () => JSON.stringify(DB, null, 1),
  importJSON: txt => { const d = JSON.parse(txt); if (!d || !Array.isArray(d.items)) throw new Error("Not a material file"); const have = new Set(DB.items.map(x => x.id)); const add = d.items.filter(x => x && x.id && !have.has(x.id)); DB.items.push(...add); save(); return add.length; },
  mcqs: unitIds => DB.items.filter(x => x.kind === "mcq" && unitIds.includes(x.unit)).map(x => ({ q: x.q, o: x.o, mine: true, topic: "your question" })),
  explains: unitIds => DB.items.filter(x => x.kind === "explain" && unitIds.includes(x.unit)).map(x => ({ q: x.q, pts: x.pts, mine: true })),
  cards: () => DB.items.filter(x => x.kind === "card"),
};
})();
