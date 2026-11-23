# AS Chemistry Study Desk

A static, no-build study site for Cambridge International AS Level Chemistry (9701), coursebook chapters 1–18 and P1.
Open `index.html` through any static host (Vercel, GitHub Pages, Netlify). Progress and pasted material are saved in the browser.

## Files

| File | What it holds |
|---|---|
| `index.html` | page shell, design tokens (light/dark), styles, script order |
| `core.js` | helpers, `{{formula}}` rendering (KaTeX + mhchem), saved progress, MCQ and numeric widgets |
| `units-phys.js` | Units 1–9 (physical chemistry) |
| `units-inorg.js` | Units 10–13 (inorganic chemistry) |
| `units-org.js` | Units 14–18 (organic) and P1 (practical skills) |
| `sims.js` | live models for Units 1–13 |
| `sims-org.js` | molecule viewer, mechanisms, reaction map, IR, tests, titration |
| `reference.js` | quick-reference sheets (`PX.REF`) |
| `mine.js` | "My material": learner-pasted notes, cards and questions |
| `app.js` | pages, router and lesson engine |

## Adding content

Each unit is one `PX.unit({...})` call:

```js
{
  id: "8", n: 8, short: "Equilibria", title: "Equilibria", strand: "phys", sim: "equilibrium",
  intents: ["coursebook learning intentions…"],
  lesson: [ /* stages, in order */ ],
  mcq:   [{ q: "…", o: [["option", true|false, "why it's right or wrong"], …] }],
  gens:  { name: () => ({ q, ans, unit, hints: [3 rungs], sol: [TeX or <html>], wrongs: [[value, "diagnosis"]] }) },
  ex:    [{ q: "explain question", pts: ["mark point", …] }],
  traps: ["exam trap", …],
  defs:  [["term", "definition"], …],
}
```

Lesson stage types: `predict`, `bridge` (IGCSE → AS, with `igcse`, `as`, `note`, optional `ask`), `explain` (with optional `ask` and `sim` command), `worked` (`steps` with optional `why` MCQ), `complete` (finish a half-done numeric question), `solo` (a generator).

Text supports `{{H2SO4}}`, `{{N2 + 3H2 <=> 2NH3}}` (mhchem), `$maths$`, `**bold**` and `*italic*`.

## Deploy on Vercel

Import the `chemistry` repository at vercel.com → Add New → Project. Framework Preset: **Other**. Leave the build command and output directory empty. Name the project `as-chemistry` so the site is served at `as-chemistry.vercel.app` (the name must contain "chemistry").
