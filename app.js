/* app.js — router, pages (book, unit lessons, practice, reference, flashcards, my material) and the lesson engine. */
(() => {
"use strict";
const { $, $$, h, md, esc } = PX;
const view = $("#view");
let cleanup = [];
const onLeave = f => cleanup.push(f);

/* ---------- stickers: one pictogram per unit ---------- */
const ICON = {
  "1": `<circle class="f" cx="24" cy="24" r="4.5"/><ellipse cx="24" cy="24" rx="18" ry="8"/><ellipse cx="24" cy="24" rx="18" ry="8" transform="rotate(60 24 24)"/><circle class="f" cx="42" cy="24" r="2.4"/>`,
  "2": `<rect x="5" y="17" width="11" height="14" rx="2"/><rect x="18.5" y="17" width="11" height="14" rx="2"/><rect x="32" y="17" width="11" height="14" rx="2"/><path d="M9 28v-8l-2 2.5M12 20v8l2-2.5M24 28v-8l-2 2.5M37.5 28v-8l-2 2.5"/>`,
  "3": `<path d="M24 6v6M10 12h28M10 12l-6 14h12zM38 12l-6 14h12z"/><path d="M18 42h12M24 12v30"/>`,
  "4": `<circle cx="13" cy="24" r="7"/><circle cx="35" cy="24" r="7"/><path d="M20 21h8M20 27h8"/>`,
  "5": `<rect x="6" y="8" width="36" height="32" rx="5"/><circle class="f" cx="15" cy="18" r="2.6"/><circle class="f" cx="30" cy="15" r="2.6"/><circle class="f" cx="22" cy="28" r="2.6"/><circle class="f" cx="35" cy="31" r="2.6"/><path d="M15 18l5-3M22 28l-4 4"/>`,
  "6": `<path d="M24 42c-8 0-12-6-12-12 0-8 8-10 8-20 6 4 8 8 8 12 2-2 3-4 3-6 4 4 5 8 5 14 0 6-4 12-12 12z"/>`,
  "7": `<circle cx="11" cy="24" r="6"/><circle cx="37" cy="24" r="6"/><path d="M17 18c4-5 10-5 14 0M28 15l3 3-4 1"/><path d="M31 30c-4 5-10 5-14 0M20 33l-3-3 4-1"/>`,
  "8": `<path d="M6 19h34l-6-5M42 29H8l6 5"/>`,
  "9": `<circle cx="24" cy="27" r="15"/><path d="M24 27l6-7M20 6h8M24 6v6"/>`,
  "10": `<rect x="5" y="10" width="8" height="8" rx="1.5"/><rect x="5" y="20" width="8" height="8" rx="1.5"/><rect x="35" y="10" width="8" height="8" rx="1.5"/><rect x="15" y="20" width="8" height="8" rx="1.5"/><rect x="25" y="20" width="8" height="8" rx="1.5"/><rect x="35" y="20" width="8" height="8" rx="1.5"/><rect x="5" y="30" width="38" height="8" rx="1.5" class="f" style="opacity:.35"/>`,
  "11": `<path d="M17 6v28a7 7 0 0 0 14 0V6M14 6h20"/><circle class="f" cx="24" cy="32" r="3"/><circle cx="22" cy="22" r="1.8"/><circle cx="26" cy="15" r="1.4"/>`,
  "12": `<path d="M17 6v28a7 7 0 0 0 14 0V6M14 6h20"/><path class="f" d="M18 33a6 6 0 0 0 12 0c-3-2-9-2-12 0z"/><path d="M18 22h12"/>`,
  "13": `<circle cx="12" cy="24" r="6"/><circle cx="36" cy="24" r="6"/><path d="M18 19h12M18 24h12M18 29h12"/>`,
  "14": `<path d="M4 30l10-12 10 12 10-12 10 12"/><circle class="f" cx="14" cy="18" r="2.4"/><circle class="f" cx="34" cy="18" r="2.4"/>`,
  "15": `<path d="M4 30l10-12 10 12"/><path d="M24 30l10-12M27 33l10-12"/><path d="M34 18l10 12"/>`,
  "16": `<path d="M4 32l10-12 10 12 9-11"/><text x="34" y="20" font-size="12" font-weight="700" stroke="none" fill="currentColor" font-family="sans-serif">Br</text>`,
  "17": `<path d="M4 32l10-12 10 12 9-11"/><text x="31" y="20" font-size="12" font-weight="700" stroke="none" fill="currentColor" font-family="sans-serif">OH</text>`,
  "18": `<path d="M6 34l10-12 10 12"/><path d="M16 22V8M20 22V8"/><text x="27" y="38" font-size="11" font-weight="700" stroke="none" fill="currentColor" font-family="sans-serif">C=O</text>`,
  "p1": `<path d="M20 4h8v26l-4 6-4-6z"/><path d="M20 10h3M20 16h3M20 22h3"/><path d="M12 44l6-8h12l6 8z"/>`,
};
const STAR = `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.5l2.8 6 6.5.7-4.9 4.4 1.4 6.4L12 16.8 6.2 20l1.4-6.4L2.7 9.2l6.5-.7z"/></svg>`;
const tilt = u => ["-4deg", "3deg", "-2deg", "4deg", "-3deg", "2deg"][u.n % 6];
const sticker = (u, big = false, mastered = false) => `<span class="sticker${big ? " big" : ""}" style="--sc:${PX.STRANDS[u.strand][1]};--tilt:${tilt(u)}" aria-hidden="true"><svg viewBox="0 0 48 48">${ICON[u.id] || ""}</svg>${mastered ? `<span class="star">${STAR}</span>` : ""}</span>`;

/* ---------- helpers ---------- */
const unitHref = u => `#unit-${u.id}`;
const unitName = u => u.id === "p1" ? "Practical skills" : `Unit ${u.n}`;
const unitShort = u => u.id === "p1" ? "P1" : String(u.n);
const stagesOf = u => u.lesson.length + 1;
const doneCount = u => { const us = PX.S().units[u.id]; if (!us) return 0; return Object.keys(us.done).length + (us.gate.passed ? 1 : 0); };
const dots = u => { const d = doneCount(u); return `<span class="dots" aria-label="${d} of ${stagesOf(u)} steps done">${Array.from({ length: stagesOf(u) }, (_, i) => `<i class="${i < d ? "on" : ""}"></i>`).join("")}</span>`; };
const nextUnit = () => { const S = PX.S(); return PX.units.find(u => S.units[u.id] && !S.units[u.id].gate.passed) || PX.units.find(u => !S.units[u.id]?.gate?.passed) || PX.units[0]; };
const stripTags = s => String(s).replace(/<[^>]+>/g, "");

/* ---------- written (explain) question with mark-scheme self-marking ---------- */
PX.written = (host, ex, opts = {}) => {
  host.appendChild(h(`<div class="qtext">${md(ex.q)}</div>`));
  const ta = h(`<textarea placeholder="Write your answer. Aim for one clear point per mark (${ex.pts.length} marks)."></textarea>`); host.appendChild(ta);
  const row = h(`<div class="row"><button class="btn" type="button">Show the mark scheme</button><span class="small muted"></span></div>`); host.appendChild(row);
  const out = h(`<div style="display:grid;gap:8px"></div>`); host.appendChild(out);
  const btn = $("button", row);
  let shown = false;
  btn.onclick = () => {
    if (shown) return;
    if (ta.value.trim().length < 15 && !btn.dataset.ok) { $("span", row).textContent = "Have a go first: even a rough answer helps you notice what's missing. Press again to see it anyway."; btn.dataset.ok = 1; return; }
    shown = true; btn.disabled = true; $("span", row).textContent = "";
    out.innerHTML = `<div class="tag small muted">Tick each point your answer makes clearly:</div><ul class="marks">${ex.pts.map((p, i) => `<li><input type="checkbox" id="mk${i}${ex.q.length}"><label for="mk${i}${ex.q.length}">${md(p)}</label></li>`).join("")}</ul><div class="row"><button class="btn sm" type="button">Done marking</button></div>`;
    $(".row .btn", out).onclick = e => {
      const got = $$("input", out).filter(c => c.checked).length, n = ex.pts.length;
      e.currentTarget.disabled = true;
      out.insertAdjacentHTML("beforeend", `<div class="fb ${got >= n - 1 ? "good" : got >= n / 2 ? "warn" : "bad"}"><b>${got} / ${n}.</b> ${got === n ? "Every point made. Examiners reward exactly this kind of precise wording." : "Look at the points you missed: rewrite your answer once more including them, out loud or on paper."}</div>`);
      opts.onResult && opts.onResult(got, n);
    };
  };
};

/* ---------- BOOK (home) ---------- */
function pageHome() {
  const S = PX.S(), nu = nextUnit(), started = !!S.units[nu.id], due = dueCards().length, mineN = PX.mine.all().length;
  const strands = [...new Set(PX.units.map(u => u.strand))];
  view.innerHTML = `
  <section class="hello">
    <div>
      <h1>${started ? "Welcome back. Ready for some chemistry?" : "From IGCSE to AS chemistry, one step at a time."}</h1>
      <p class="lede">All ${PX.units.length} units of your AS coursebook. Each one starts from what you learned at IGCSE, gives you a model to play with, and asks before it tells. A quick check at the end shows what's stuck.</p>
    </div>
    <div class="resume" style="--sc:${PX.STRANDS[nu.strand][1]}">
      ${sticker(nu, true)}
      <div>
        <div class="eyebrow">${started ? "Carry on with" : "Start with"} ${unitName(nu)}</div>
        <h2>${nu.title}</h2>
        ${dots(nu)}
        <div class="row"><a class="btn" href="${unitHref(nu)}">${started ? "Continue" : "Start"}</a>${due ? `<a class="btn ghost" href="#cards">Review ${due} card${due > 1 ? "s" : ""}</a>` : ""}</div>
      </div>
    </div>
  </section>
  <section style="display:grid;gap:16px">
    <div class="book-head"><h2>Your book</h2><div class="legend-row">${strands.map(k => `<span><i style="background:${PX.STRANDS[k][1]}"></i>${PX.STRANDS[k][0]}</span>`).join("")}</div></div>
    <div class="map">${PX.units.map(u => { const m = S.units[u.id]?.gate?.passed; return `<a class="tile" style="--sc:${PX.STRANDS[u.strand][1]}" href="${unitHref(u)}">${sticker(u, false, m)}<span style="min-width:0"><span class="num">${unitName(u)}</span><b>${u.title}</b>${dots(u)}</span></a>`; }).join("")}</div>
    <p class="small muted">A dot fills for each lesson step you finish. A green star means you've passed that unit's check.</p>
  </section>
  <section class="panel" style="display:grid;gap:10px">
    <h2 style="font-size:1.35rem">Bring your own material</h2>
    <p class="lede" style="max-width:70ch">Paste notes, definitions, past-paper questions or mark-scheme points into <a href="#mine">My material</a>. They join the right unit, your flashcards and your practice. ${mineN ? `You've added ${mineN} item${mineN > 1 ? "s" : ""} so far.` : ""}</p>
  </section>`;
}

/* ---------- UNIT PAGE + LESSON ENGINE ---------- */
function pageUnit(id) {
  const u = PX.getUnit(id) || PX.units[0];
  const us = PX.unitState(u.id);
  const idx = PX.units.indexOf(u), prevU = PX.units[idx - 1], nextU = PX.units[idx + 1];
  const mine = PX.mine.forUnit(u.id);
  view.innerHTML = `
  <div class="unit-head">
    <div class="who">${sticker(u, true, us.gate.passed)}<div><div class="eyebrow" style="color:${PX.STRANDS[u.strand][1]}">${unitName(u)}, ${PX.STRANDS[u.strand][0].toLowerCase()}</div><h1>${u.title}</h1></div></div>
    <div class="row">${prevU ? `<a class="btn ghost sm" href="${unitHref(prevU)}">Previous unit</a>` : ""}${nextU ? `<a class="btn ghost sm" href="${unitHref(nextU)}">Next unit</a>` : ""}</div>
  </div>
  <details class="intents panel" style="padding:12px 18px"><summary>What the coursebook says you'll learn</summary><ul>${u.intents.map(i => `<li>${md(i)}</li>`).join("")}</ul></details>
  <div class="unit-grid">
    <section class="panel sim-panel" aria-label="Live model"><div class="sim-head"><h3 id="simTitle"></h3><span class="small muted">Try changing things</span></div><div id="simHost" style="display:grid;gap:10px;min-width:0"></div></section>
    <section class="lesson" aria-label="Lesson"><ol class="steps" id="steps"></ol><article class="panel stage" id="stage"></article><div class="nav-row"><button class="btn ghost" id="prevS">Back</button><button class="btn" id="nextS">Next</button></div></section>
  </div>
  <section class="panel" style="display:grid;gap:12px"><div class="page-head"><h2 style="font-size:1.35rem">Exam traps</h2></div><div class="traps">${u.traps.map(t => `<div class="trap"><span class="ic">!</span><div>${md(t)}</div></div>`).join("")}</div></section>
  <section class="panel" style="display:grid;gap:12px"><div class="page-head"><h2 style="font-size:1.35rem">Definitions to learn word for word</h2><div class="row"><a class="btn ghost sm" href="#cards">Flashcards</a><button class="btn ghost sm" id="pracU">Practise this unit</button></div></div><div class="defs">${u.defs.map(([t, d]) => `<div class="def"><b>${md(t)}</b><p>${md(d)}</p></div>`).join("")}${mine.filter(x => x.kind === "card").map(x => `<div class="def yours"><b>${md(esc(x.t))}</b><p>${md(esc(x.d))}</p></div>`).join("")}</div></section>
  <section class="panel" style="display:grid;gap:12px"><div class="page-head"><h2 style="font-size:1.35rem">Explain it like the mark scheme</h2><span class="small muted">Write, then mark yourself point by point.</span></div><div id="exHost" style="display:grid;gap:12px"></div></section>
  <section class="panel" style="display:grid;gap:12px"><div class="page-head"><h2 style="font-size:1.35rem">Your material for this unit</h2><a class="btn ghost sm" href="#mine" id="addMine">Add material</a></div>${mine.length ? `<div class="mine-list">${mine.map(x => `<div class="mine-item yours"><span class="small muted">${{ note: "Note", card: "Flashcard", mcq: "Multiple-choice question", explain: "Explain question" }[x.kind]}</span><div>${x.kind === "note" ? md(esc(x.text).replace(/\n/g, "<br>")) : x.kind === "card" ? `<b>${md(esc(x.t))}</b>: ${md(esc(x.d))}` : md(esc(x.q))}</div></div>`).join("")}</div>` : `<p class="small muted">Nothing yet. Paste notes, past-paper questions or definitions for ${unitName(u).toLowerCase()} and they'll appear here, in your flashcards and in practice.</p>`}</section>`;
  $("#addMine").onclick = () => { PX.mineUnit = u.id; };

  /* explain questions */
  const exs = [...(u.ex || []), ...PX.mine.explains([u.id])];
  if (!exs.length) $("#exHost").innerHTML = `<p class="small muted">No explain questions for this unit yet.</p>`;
  exs.forEach((ex, i) => { const d = h(`<details class="box"><summary style="cursor:pointer;font-weight:700">${md(stripTags(ex.q).length > 110 ? ex.q.slice(0, 106) + "…" : ex.q)} <span class="small muted">(${ex.pts.length} marks)${ex.mine ? " · yours" : ""}</span></summary><div style="display:grid;gap:10px;margin-top:10px"></div></details>`); $("#exHost").appendChild(d); let built = false; d.addEventListener("toggle", () => { if (d.open && !built) { built = true; PX.written($("div", d), ex, { onResult: () => PX.award() }); } }); });

  const sim = PX.sims[u.sim];
  let simCtl = null;
  if (sim) { $("#simTitle").textContent = sim.title; simCtl = sim.mount($("#simHost")) || null; onLeave(() => simCtl && simCtl.destroy && simCtl.destroy()); }
  const simCmd = c => { if (simCtl && simCtl.cmd) simCtl.cmd(c); if (matchMedia("(max-width:1020px)").matches) $("#simHost").scrollIntoView({ behavior: PX.reduceMotion ? "auto" : "smooth", block: "start" }); };
  $("#pracU").onclick = () => { PX.practiceSel = [u.id]; location.hash = "#practice"; };

  const N = stagesOf(u);
  let cur = Math.min(us.cur || 0, N - 1);
  const canOpen = i => i === 0 || us.done[i - 1] || us.done[i] || (i === N - 1 && us.gate.tries > 0) || i <= (us.cur || 0);
  const label = (st, i) => i === N - 1 ? "Check" : st.t === "explain" ? (st.h.length > 26 ? st.h.slice(0, 24).replace(/[\s:,]+\S*$/, "") + "…" : st.h).replace(/\$/g, "") : ({ predict: "Predict", bridge: "IGCSE → AS", worked: "Worked example", complete: "Your turn", solo: "On your own" }[st.t]);
  function renderSteps() {
    $("#steps").innerHTML = [...u.lesson, { t: "gate" }].map((st, i) => { const done = i === N - 1 ? us.gate.passed : us.done[i]; return `<li><button data-i="${i}" ${i === cur ? 'aria-current="step"' : ""} class="${done ? "done" : ""}" ${canOpen(i) ? "" : "disabled"}><span class="n">${done ? "✓" : i + 1}</span>${label(st, i)}</button></li>`; }).join("");
    $$("#steps button").forEach(b => b.onclick = () => go(+b.dataset.i));
    const c = $('#steps [aria-current="step"]'); if (c) c.scrollIntoView({ block: "nearest", inline: "nearest" });
    $("#prevS").disabled = cur === 0;
    const nx = $("#nextS");
    if (cur === N - 1) { nx.textContent = us.gate.passed && nextU ? "Next unit" : "Back to the book"; nx.disabled = false; }
    else { nx.textContent = cur === N - 2 ? "Go to the check" : "Next"; nx.disabled = !us.done[cur]; }
  }
  const complete = i => { if (!us.done[i]) { us.done[i] = 1; us.cur = Math.max(us.cur || 0, i + 1); PX.award(); } renderSteps(); };
  function go(i, scroll = true) {
    cur = i; us.cur = Math.max(us.cur || 0, Math.min(i, N - 1)); PX.save();
    const box = $("#stage"); box.innerHTML = "";
    if (i === N - 1) renderGate(box); else renderStage(box, u.lesson[i], i);
    renderSteps();
    if (scroll) { const s = $("#steps"); if (s.getBoundingClientRect().top < 70) s.scrollIntoView({ block: "start", behavior: PX.reduceMotion ? "auto" : "smooth" }); }
  }
  $("#prevS").onclick = () => cur > 0 && go(cur - 1);
  $("#nextS").onclick = () => { if (cur < N - 1) go(cur + 1); else location.hash = us.gate.passed && nextU ? unitHref(nextU) : "#home"; };

  function head(box, st, i) {
    box.appendChild(h(`<div class="kicker">Step ${i + 1} of ${N}</div>`));
    if (st.h) box.appendChild(h(`<h2>${md(st.h)}</h2>`));
    if (st.body) box.appendChild(h(`<div class="body">${md(st.body)}</div>`));
    if (st.sim) { const b = h(`<div class="row"><button class="btn ghost sm" type="button">${st.simLabel || "Show me in the model"}</button></div>`); $("button", b).onclick = () => simCmd(st.sim); box.appendChild(b); }
  }
  function askOrGotIt(box, st, i) {
    if (st.ask) { const b = h(`<div class="box"><div class="tag">Quick check</div></div>`); box.appendChild(b); PX.mcq(b, st.ask, { onResult: ft => { if (ft) PX.S().stats.mcqFirst++; PX.S().stats.mcq++; complete(i); } }); }
    else { const b = h(`<div class="row"><button class="btn" type="button">Got it</button></div>`); box.appendChild(b); $("button", b).onclick = () => { complete(i); if (cur < N - 1) go(i + 1); }; }
  }
  function renderStage(box, st, i) {
    head(box, st, i);
    if (st.t === "predict") {
      const b = h(`<div class="box"><div class="tag">Make a guess first. Wrong guesses help too.</div></div>`); box.appendChild(b);
      PX.mcq(b, st, { anyAnswer: true, onResult: () => { if (st.after) b.insertAdjacentHTML("beforeend", `<div class="body">${md(st.after)}</div>`); complete(i); } });
    } else if (st.t === "bridge") {
      box.appendChild(h(`<div class="bridge"><div class="col igcse"><b>What you know from IGCSE</b><ul>${st.igcse.map(x => `<li>${md(x)}</li>`).join("")}</ul></div><div class="arr" aria-hidden="true">→</div><div class="col as"><b>What AS adds</b><ul>${st.as.map(x => `<li>${md(x)}</li>`).join("")}</ul></div></div>`));
      if (st.note) box.appendChild(h(`<div class="callout key">${md(st.note)}</div>`));
      askOrGotIt(box, st, i);
    } else if (st.t === "explain") askOrGotIt(box, st, i);
    else if (st.t === "worked") {
      box.appendChild(h(`<div class="callout key"><b>The problem</b><div>${md(st.prob)}</div></div>`));
      const ol = h(`<ol class="worked"></ol>`); box.appendChild(ol);
      const btn = h(`<div class="row"><button class="btn" type="button">Show the next step</button></div>`); box.appendChild(btn);
      let k = 0;
      const next = () => {
        if (k >= st.steps.length) return;
        const s = st.steps[k++];
        const li = h(`<li><div><div>${md(s.s)}</div></div></li>`); ol.appendChild(li);
        if (s.why) { $("button", btn).disabled = true; const w = h(`<div class="box"><div class="tag">Before going on: why does this step work?</div></div>`); $("div", li).appendChild(w); PX.mcq(w, s.why, { onResult: () => { $("button", btn).disabled = false; if (k >= st.steps.length) finishW(); } }); }
        else if (k >= st.steps.length) finishW();
      };
      const finishW = () => { btn.remove(); if (st.after) box.appendChild(h(`<div class="callout">${md(st.after)}</div>`)); complete(i); };
      $("button", btn).onclick = next; next();
    } else if (st.t === "complete") {
      box.appendChild(h(`<div class="callout key"><b>The problem</b><div>${md(st.prob)}</div></div>`));
      if (st.shown) box.appendChild(h(`<ol class="worked">${st.shown.map(s => `<li><div>${md(s)}</div></li>`).join("")}</ol>`));
      const b = h(`<div class="box"><div class="tag">Now you finish it</div></div>`); box.appendChild(b);
      PX.numeric(b, st.q, { onResult: r => { score(r); complete(i); } });
    } else if (st.t === "solo") {
      const b = h(`<div class="box"></div>`); box.appendChild(b);
      const run = () => { b.innerHTML = `<div class="tag">New numbers every time</div>`; const q = u.gens[st.gen](); PX.numeric(b, q, { onResult: r => { score(r); if (r.how !== "walkthrough") complete(i); }, onTransfer: run }); };
      run();
    }
  }
  function score(r) { const S = PX.S(); S.stats.calc++; if (r.firstTry) S.stats.calcFirst++; PX.save(); }

  function renderGate(box) {
    box.appendChild(h(`<div class="kicker">Step ${N} of ${N}</div>`));
    box.appendChild(h(`<h2>Check: ${u.title}</h2>`));
    if (us.gate.passed) box.appendChild(h(`<div class="fb good"><b>Passed.</b> You can take it again with new questions any time.</div>`));
    const nG = Math.min(2, Object.keys(u.gens).length);
    box.appendChild(h(`<div class="body"><p>Four new questions: ${4 - nG} multiple choice (one try each)${nG ? ` and ${nG} calculation${nG > 1 ? "s" : ""} (two tries each, no hints)` : ""}. Get 3 right to pass. If you miss, you'll see what to look at again, and the next set is different.</p></div>`));
    const pred = h(`<div class="box"><div class="tag">First, a guess: how many will you get right?</div><div class="gate-pred">${[0, 1, 2, 3, 4].map(n => `<button type="button" data-n="${n}">${n}</button>`).join("")}</div><p class="small muted">Guessing your own score helps you notice what you really know.</p></div>`);
    box.appendChild(pred);
    $$("button", pred).forEach(b => b.onclick = () => startGate(box, +b.dataset.n));
  }
  function startGate(box, predicted) {
    box.innerHTML = "";
    box.appendChild(h(`<div class="kicker">Check, you guessed ${predicted} out of 4</div>`));
    const gens = PX.shuffle(Object.keys(u.gens)).slice(0, 2).map(g => ({ k: "g", g }));
    const mc = PX.shuffle([...u.mcq, ...PX.mine.mcqs([u.id])]).slice(0, 4 - gens.length).map(m => ({ k: "m", m }));
    const items = PX.shuffle([...mc, ...gens]);
    const res = [];
    items.forEach((it, n) => {
      const b = h(`<div class="box" data-q="${n}"><div class="tag">Question ${n + 1} of ${items.length}</div></div>`); box.appendChild(b);
      if (n > 0) b.hidden = true;
      const done = ok => { res[n] = { ok, it }; const nb = $(`[data-q="${n + 1}"]`, box); if (nb) nb.hidden = false; if (res.filter(Boolean).length === items.length) finishGate(box, res, predicted); };
      if (it.k === "m") PX.mcq(b, it.m, { gateMode: true, onResult: ft => done(ft) });
      else { const q = u.gens[it.g](); it.q = q; PX.numeric(b, q, { gateMode: true, onResult: r => done(r.how === "solved") }); }
    });
  }
  function finishGate(box, res, predicted) {
    const got = res.filter(r => r.ok).length, S = PX.S();
    us.gate.tries++; us.gate.best = Math.max(us.gate.best || 0, got);
    S.calib.push({ pred: predicted, got, u: u.id }); if (S.calib.length > 60) S.calib.shift();
    const calibLine = predicted === got ? "You guessed your score exactly." : predicted > got ? `You guessed ${predicted} and got ${got}. Feeling more ready than you are is really common, so it's worth noticing.` : `You guessed ${predicted} and got ${got}. You know more than you think.`;
    const out = h(`<div class="box"></div>`);
    if (got >= 3) {
      us.gate.passed = true;
      out.innerHTML = `<div class="fb good"><b>${got} out of 4. Unit passed.</b> ${calibLine}</div><p>This unit's definitions are now in your flashcards, so they'll come back for review.</p><div class="row">${nextU ? `<a class="btn" href="${unitHref(nextU)}">Start ${unitName(nextU).toLowerCase()}</a>` : ""}<a class="btn ghost" href="#cards">Review flashcards</a></div>`;
      PX.award();
    } else {
      const missed = res.filter(r => !r.ok).map(r => r.it.k === "m" ? (r.it.m.topic || stripTags(md(r.it.m.q)).slice(0, 90) + "…") : (r.it.q.topic || ""));
      out.innerHTML = `<div class="fb bad"><b>${got} out of 4. Not yet, and that's fine.</b> ${calibLine}</div><p>The ideas that slipped:</p><ul>${missed.map(m => `<li>${esc(m)}</li>`).join("")}</ul><p class="small muted">Look at the matching step again and try it in the model. The next check uses different questions.</p><div class="row"><button class="btn" type="button" data-a="again">Try a new check</button><button class="btn ghost" type="button" data-a="lesson">Back to the lesson</button></div>`;
      PX.save();
      setTimeout(() => { $("[data-a=again]", out).onclick = () => go(N - 1); $("[data-a=lesson]", out).onclick = () => go(0); });
    }
    box.appendChild(out); renderSteps();
    if (us.gate.passed) { const st = $(".unit-head .sticker"); if (st && !$(".star", st)) st.insertAdjacentHTML("beforeend", `<span class="star">${STAR}</span>`); }
    out.scrollIntoView({ block: "nearest", behavior: PX.reduceMotion ? "auto" : "smooth" });
  }
  go(cur, false);
}

/* ---------- PRACTICE ---------- */
function pagePractice() {
  const S = PX.S();
  let sel = PX.practiceSel || PX.units.filter(u => S.units[u.id]).map(u => u.id);
  if (!sel.length) sel = PX.units.map(u => u.id);
  PX.practiceSel = null;
  let mode = 0, sess = { tried: 0, first: 0 }, requeue = [];
  view.innerHTML = `<div class="page-head"><div><h1>Practice</h1><p class="lede">Paper 1 multiple choice, Paper 2 calculations with new numbers each time, and explain questions marked against mark-scheme points. Mixing topics is harder, and it's what the exam tests.</p></div></div>
  <section class="panel" style="display:grid;gap:14px"><div class="row" id="modes"></div><div class="row" id="uchips"></div><div class="row small"><button class="btn ghost sm" id="allU">All units</button><button class="btn ghost sm" id="startedU">Units I've started</button></div></section>
  <section class="panel qcard" id="qcard"></section>
  <p class="small muted" id="sess"></p>`;
  PX.tabs($("#modes"), ["Mixed", "Multiple choice", "Calculations", "Explain"], i => { mode = i; next(); });
  const drawChips = () => { $("#uchips").innerHTML = PX.units.map(u => `<button class="chip" aria-pressed="${sel.includes(u.id)}" data-u="${u.id}">${unitShort(u)} ${u.short}</button>`).join(""); $$("#uchips .chip").forEach(c => c.onclick = () => { const id = c.dataset.u; sel = sel.includes(id) ? sel.filter(x => x !== id) : [...sel, id]; if (!sel.length) sel = [id]; drawChips(); next(); }); };
  $("#allU").onclick = () => { sel = PX.units.map(u => u.id); drawChips(); next(); };
  $("#startedU").onclick = () => { const s = PX.units.filter(u => S.units[u.id]).map(u => u.id); sel = s.length ? s : [PX.units[0].id]; drawChips(); next(); };
  drawChips();
  const sessLine = () => { $("#sess").textContent = sess.tried ? `This session: ${sess.first} of ${sess.tried} right first time.` : ""; };
  function next() {
    const card = $("#qcard"); card.innerHTML = "";
    const pool = PX.units.filter(u => sel.includes(u.id));
    let item;
    if (mode !== 3 && requeue.length && Math.random() < 0.35) item = requeue.shift();
    else if (mode === 3) {
      const all = pool.flatMap(u => [...(u.ex || []).map(ex => ({ u, ex })), ...PX.mine.explains([u.id]).map(ex => ({ u, ex }))]);
      item = all.length ? { k: "w", ...PX.pick(all) } : null;
      if (!item) { card.innerHTML = `<p class="muted">No explain questions in these units yet.</p>`; return; }
    } else {
      const u = PX.pick(pool), gk = Object.keys(u.gens), mcqs = [...u.mcq, ...PX.mine.mcqs([u.id])];
      const useM = mode === 1 || (mode === 0 && Math.random() < 0.5) || !gk.length;
      item = useM ? { u, k: "m", m: PX.pick(mcqs) } : { u, k: "g", g: PX.pick(gk) };
      if (mode === 2 && !gk.length) { const withG = pool.filter(x => Object.keys(x.gens).length); if (!withG.length) { card.innerHTML = `<p class="muted">No calculations in these units.</p>`; return; } const u2 = PX.pick(withG); item = { u: u2, k: "g", g: PX.pick(Object.keys(u2.gens)) }; }
    }
    const u = item.u;
    card.appendChild(h(`<div class="qmeta"><span class="pill" style="color:${PX.STRANDS[u.strand][1]}">${unitName(u)}: ${u.short}</span><span class="small muted">${item.k === "m" ? (item.m.mine ? "Your question" : "Paper 1 style") : item.k === "g" ? "Paper 2 style" : "Explain (self-marked)"}</span></div>`));
    const body = h(`<div style="display:grid;gap:12px"></div>`); card.appendChild(body);
    const after = () => { const b = h(`<div class="row"><button class="btn" type="button">Next question</button></div>`); $("button", b).onclick = next; card.appendChild(b); sessLine(); };
    const track = (ok, sure) => { sess.tried++; if (ok) sess.first++; if (sure === 2 && !ok) requeue.push(item); };
    if (item.k === "m") PX.mcq(body, item.m, { confidence: true, onResult: (ft, sure) => { track(ft, sure); S.stats.mcq++; if (ft) S.stats.mcqFirst++; PX.award(); after(); } });
    else if (item.k === "g") { const q = u.gens[item.g](); PX.numeric(body, q, { confidence: true, focus: true, onResult: r => { track(r.firstTry, r.sure); S.stats.calc++; if (r.firstTry) S.stats.calcFirst++; PX.award(); after(); }, onTransfer: () => { requeue.unshift({ u, k: "g", g: item.g }); next(); } }); }
    else PX.written(body, item.ex, { onResult: (got, n) => { track(got >= n - 1, 1); PX.award(); after(); } });
  }
  next(); sessLine();
}

/* ---------- REFERENCE ---------- */
function pageRef() {
  view.innerHTML = `<div class="page-head"><div><h1>Quick reference</h1><p class="lede">Equations, trends, tests and reactions on one page. Search for anything, or jump to the reaction map.</p></div><input type="search" id="rq" placeholder="Search, e.g. sulfate, Kp, Tollens" aria-label="Search the reference" style="min-width:min(320px,100%)"></div>
  <div class="ref-grid" id="refg"></div>
  <section class="panel" style="display:grid;gap:12px"><h2 style="font-size:1.35rem">Organic reactions: reagents and conditions</h2><div class="tbl-wrap"><table class="board" id="rxn"></table></div></section>
  <section class="panel" style="display:grid;gap:12px"><h2 style="font-size:1.35rem">All definitions</h2><div class="defs" id="alldefs"></div></section>`;
  const cards = [...PX.REF];
  const draw = q => {
    const t = (q || "").toLowerCase().trim();
    const hit = c => !t || (c.title + " " + c.tags + " " + stripTags(c.html)).toLowerCase().includes(t);
    $("#refg").innerHTML = cards.filter(hit).map(c => `<div class="ref-card"><h3>${c.title}</h3>${md(c.html)}</div>`).join("") || `<p class="muted">No sheet matches "${esc(q)}".</p>`;
    $("#rxn").innerHTML = `<tr><th>From</th><th>To</th><th>Reagents</th><th>Conditions</th><th>Type</th></tr>` + PX.EDGES.filter(e => !t || e.join(" ").toLowerCase().includes(t) || PX.NODES[e[0]][0].includes(t) || PX.NODES[e[1]][0].includes(t)).map(e => `<tr><td>${PX.NODES[e[0]][0]}</td><td>${PX.NODES[e[1]][0]}</td><td>${e[2]}</td><td>${e[3]}</td><td>${e[4]}</td></tr>`).join("");
    $("#alldefs").innerHTML = PX.units.flatMap(u => u.defs.map(d => [u, ...d])).filter(([u, a, b]) => !t || (a + " " + b).toLowerCase().includes(t)).map(([u, a, b]) => `<div class="def"><b>${md(a)}</b><p>${md(b)}</p><span class="small muted">${unitName(u)}</span></div>`).join("");
  };
  $("#rq").addEventListener("input", e => draw(e.target.value));
  draw("");
}

/* ---------- FLASHCARDS ---------- */
const INTERVALS = [0, 1, 3, 7, 16, 35];
function allCards(includeAll) {
  const S = PX.S();
  const base = PX.units.filter(u => includeAll || S.units[u.id]).flatMap(u => u.defs.map(([t, d], i) => ({ id: `${u.id}:${i}`, u, t, d })));
  const mine = PX.mine.cards().map(x => ({ id: "mine:" + x.id, u: PX.getUnit(x.unit) || PX.units[0], t: esc(x.t), d: esc(x.d), mine: true }));
  return [...base, ...mine];
}
function dueCards(includeAll = false) { const S = PX.S(), t = PX.today(); return allCards(includeAll).filter(c => !S.cards[c.id] || S.cards[c.id].due <= t); }
function pageCards() {
  const S = PX.S();
  let includeAll = false, queue = [];
  view.innerHTML = `<div class="page-head"><div><h1>Flashcards</h1><p class="lede">Say the definition out loud, then reveal it. Cards you know come back after longer and longer gaps; cards you miss come back today. A unit's cards appear once you start it; your own cards are always in.</p></div></div>
  <section class="panel" style="display:grid;gap:12px"><div class="row"><button class="chip" id="incl" aria-pressed="false">Include units I haven't started</button><span class="small muted" id="cstat"></span></div><div class="boxes" id="boxes"></div></section>
  <section class="panel flash" id="flash"></section>`;
  const load = () => { queue = PX.shuffle(dueCards(includeAll)).slice(0, 25); stat(); show(); };
  $("#incl").onclick = e => { includeAll = !includeAll; e.currentTarget.setAttribute("aria-pressed", String(includeAll)); load(); };
  const stat = () => { const cards = allCards(includeAll), by = [0, 0, 0, 0, 0, 0]; cards.forEach(c => by[Math.min(5, S.cards[c.id]?.b ?? 0)]++); $("#cstat").textContent = `${dueCards(includeAll).length} due today, ${cards.length} in your deck`; $("#boxes").innerHTML = ["New", "Tomorrow", "In 3 days", "In a week", "In 2 weeks", "In a month"].map((n, i) => `<span>${n}: ${by[i]}</span>`).join(""); };
  const show = () => {
    const f = $("#flash");
    if (!queue.length) { f.innerHTML = `<div class="term">All caught up</div><p class="muted">${allCards(includeAll).length ? "Nothing due right now. Come back tomorrow, or try some practice questions." : "Start a unit and its definitions will show up here."}</p><div class="row"><a class="btn" href="#practice">Practice questions</a><a class="btn ghost" href="#home">Back to the book</a></div>`; return; }
    const c = queue[0];
    f.innerHTML = `${sticker(c.u)}<div class="term">${md(c.t)}</div><div class="defn" hidden>${md(c.d)}</div><div class="row" data-r><button class="btn" type="button" data-a="show">Show the definition</button></div><p class="small muted">${c.mine ? "Your card · " : ""}${queue.length} left in this round</p>`;
    $("[data-a=show]", f).onclick = () => { $(".defn", f).hidden = false; $("[data-r]", f).innerHTML = `<button class="btn ghost" data-g="0">Missed it</button><button class="btn ghost" data-g="1">Got it, just</button><button class="btn" data-g="2">Knew it</button>`; $$("[data-g]", f).forEach(b => b.onclick = () => grade(c, +b.dataset.g)); };
  };
  const grade = (c, g) => { const cs = S.cards[c.id] || { b: 0, due: PX.today() }; if (g === 0) { cs.b = 0; cs.due = PX.today(); queue.push(queue.shift()); } else { cs.b = Math.min(5, cs.b + g); cs.due = PX.addDays(PX.today(), INTERVALS[cs.b]); queue.shift(); } S.cards[c.id] = cs; PX.award(); stat(); show(); };
  load();
}

/* ---------- MY MATERIAL ---------- */
function pageMine() {
  const pre = PX.mineUnit || PX.units[0].id; PX.mineUnit = null;
  view.innerHTML = `<div class="page-head"><div><h1>My material</h1><p class="lede">Paste notes, definitions, past-paper questions or mark-scheme points. Pick the unit, paste, check the preview, save. Everything stays in this browser; use Export to keep a copy or move it to another device.</p></div></div>
  <section class="panel" style="display:grid;gap:12px">
    <div><label class="small" style="display:grid;grid-template-columns:minmax(0,1fr);gap:4px;max-width:520px"><span class="muted">Unit</span><select id="mu" style="width:100%">${PX.units.map(u => `<option value="${u.id}" ${u.id === pre ? "selected" : ""}>${unitShort(u)}. ${u.title}</option>`).join("")}</select></label></div>
    <textarea id="mt" style="min-height:200px" placeholder="Paste here. Lines like 'Term :: definition' become flashcards. Use the headings below for questions."></textarea>
    <div class="row"><button class="btn" id="mprev" type="button">Preview</button><button class="btn ghost" id="msave" type="button" disabled>Save to this unit</button><span class="small muted" id="mmsg"></span></div>
    <div id="mpv" style="display:grid;gap:8px"></div>
    <details><summary class="small" style="cursor:pointer;font-weight:700">How to format questions</summary><pre class="fmt" style="margin-top:8px">## card
Electronegativity :: The power of an atom in a covalent bond to attract the bonding pair.

## mcq
Q: Which oxide is amphoteric?
- MgO | Basic only.
* Al2O3 | Reacts with acids and with bases.
- SO2 | Acidic only.

## explain
Q: Explain why HF has a higher boiling point than HCl.
+ HF forms hydrogen bonds between molecules
+ HCl has only permanent dipole and id–id forces
+ More energy is needed to separate HF molecules

## note
Anything else: teacher tips, summaries. Write formulas as {{H2SO4}} and equations as {{N2 + 3H2 <=> 2NH3}}.</pre></details>
  </section>
  <section class="panel" style="display:grid;gap:12px"><div class="page-head"><h2 style="font-size:1.35rem">Saved material</h2><div class="row"><button class="btn ghost sm" id="mexp" type="button">Export</button><label class="btn ghost sm" style="cursor:pointer">Import<input type="file" id="mimp" accept=".json,application/json" hidden></label></div></div><div id="mlist" class="mine-list"></div><textarea id="mjson" hidden readonly style="min-height:120px"></textarea></section>`;
  let parsed = [];
  const preview = () => {
    parsed = PX.mine.parse($("#mt").value, $("#mu").value);
    const by = k => parsed.filter(x => x.kind === k).length;
    $("#mmsg").textContent = parsed.length ? `Found ${[["note", "note"], ["card", "flashcard"], ["mcq", "multiple-choice question"], ["explain", "explain question"]].map(([k, n]) => by(k) ? `${by(k)} ${n}${by(k) > 1 ? "s" : ""}` : "").filter(Boolean).join(", ")}.` : "Nothing recognised yet.";
    $("#mpv").innerHTML = parsed.map(x => `<div class="mine-item yours">${item(x)}</div>`).join("");
    $("#msave").disabled = !parsed.length;
  };
  const item = x => `<span class="small muted">${{ note: "Note", card: "Flashcard", mcq: "Multiple choice", explain: "Explain question" }[x.kind]}</span>` + (x.kind === "note" ? `<div>${md(esc(x.text).replace(/\n/g, "<br>"))}</div>` : x.kind === "card" ? `<div><b>${md(esc(x.t))}</b>: ${md(esc(x.d))}</div>` : x.kind === "mcq" ? `<div>${md(esc(x.q))}</div><ul class="small" style="margin:0;padding-left:1.2em">${x.o.map(o => `<li>${o[1] ? "<b>✓</b> " : ""}${md(esc(o[0]))} <span class="muted">${md(esc(o[2]))}</span></li>`).join("")}</ul>` : `<div>${md(esc(x.q))}</div><ul class="small" style="margin:0;padding-left:1.2em">${x.pts.map(p => `<li>${md(esc(p))}</li>`).join("")}</ul>`);
  const list = () => {
    const all = PX.mine.all();
    $("#mlist").innerHTML = all.length ? PX.units.filter(u => all.some(x => x.unit === u.id)).map(u => `<div style="display:grid;gap:8px"><h3 style="font-size:1.05rem">${unitName(u)}: ${u.title}</h3>${all.filter(x => x.unit === u.id).map(x => `<div class="mine-item">${item(x)}<div class="row"><button class="btn ghost sm" data-del="${x.id}" type="button">Remove</button></div></div>`).join("")}</div>`).join("") : `<p class="small muted">Nothing saved yet.</p>`;
    $$("[data-del]").forEach(b => b.onclick = () => { PX.mine.remove(b.dataset.del); list(); });
  };
  $("#mprev").onclick = preview;
  $("#mt").addEventListener("input", () => { $("#msave").disabled = true; });
  $("#msave").onclick = () => { if (!parsed.length) return; PX.mine.add(parsed); PX.toast("Saved", `${parsed.length} item${parsed.length > 1 ? "s" : ""} added`); $("#mt").value = ""; $("#mpv").innerHTML = ""; $("#mmsg").textContent = ""; $("#msave").disabled = true; parsed = []; list(); };
  $("#mexp").onclick = () => { const t = $("#mjson"); t.hidden = false; t.value = PX.mine.exportJSON(); t.select(); try { navigator.clipboard.writeText(t.value).then(() => PX.toast("Copied", "Paste it into a file to keep it"), () => {}); } catch (e) {} };
  $("#mimp").onchange = e => { const f = e.target.files[0]; if (!f) return; const r = new FileReader(); r.onload = () => { try { const n = PX.mine.importJSON(r.result); PX.toast("Imported", `${n} new item${n === 1 ? "" : "s"}`); list(); } catch (err) { PX.toast("Couldn't import", "That file isn't a material export."); } }; r.readAsText(f); };
  list();
}

/* ---------- router ---------- */
function route() {
  cleanup.forEach(f => { try { f(); } catch (e) {} }); cleanup = [];
  const r = (location.hash || "#home").slice(1);
  let nav = "home";
  if (r.startsWith("unit-")) pageUnit(r.slice(5));
  else if (r === "practice") { pagePractice(); nav = "practice"; }
  else if (r === "ref") { pageRef(); nav = "ref"; }
  else if (r === "cards") { pageCards(); nav = "cards"; }
  else if (r === "mine") { pageMine(); nav = "mine"; }
  else pageHome();
  $$(".nav a").forEach(a => { if (a.dataset.nav === nav) a.setAttribute("aria-current", "page"); else a.removeAttribute("aria-current"); });
  window.scrollTo(0, 0);
}
addEventListener("hashchange", route);
route();
})();
