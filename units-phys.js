/* units-phys.js — Units 1–9 (physical chemistry). Content format is documented in README.md.
   Chemical formulas: {{H2SO4}}, {{2H2 + O2 -> 2H2O}}, {{N2 + 3H2 <=> 2NH3}}. Maths: $...$ or $$...$$. */
(() => {
const R = String.raw;
const { pick, rnd, round, sig, tn, fmt } = PX;
const f3 = x => +Number(x).toPrecision(3);

/* ======================= UNIT 1 ======================= */
PX.unit({
  id: "1", n: 1, short: "Atomic structure", title: "Atomic structure", strand: "phys", sim: "atom",
  intents: ["describe the atom as mostly empty space around a tiny nucleus of protons and neutrons, with electrons in shells", "state the relative charges and masses of protons, neutrons and electrons", "use the terms atomic (proton) number and mass (nucleon) number", "deduce how beams of protons, neutrons and electrons behave in an electric field", "deduce the numbers of protons, neutrons and electrons in atoms and ions", "define isotope and use the notation $^{A}_{Z}\\text{X}$", "explain why isotopes have the same chemical properties but different physical properties"],
  lesson: [
    { t: "predict", h: "Carbon-12 and carbon-14", body: "Carbon-14 has two more neutrons than carbon-12. A sample of each is burned in oxygen.", q: "What happens?",
      o: [["Both form {{CO2}} in exactly the same way", true, "Chemistry is decided by electrons, and both isotopes have 6 electrons arranged 2,4."], ["Carbon-14 reacts more slowly because it is heavier", false, "Mass hardly matters for the reaction itself. The electron arrangement is identical."], ["Carbon-14 forms {{CO3}} because it has more particles", false, "Formulas depend on how many electrons an atom shares or transfers, not on neutrons."], ["Carbon-14 doesn't burn because it is radioactive", false, "Radioactivity is a nuclear property. It doesn't stop the atom bonding."]],
      after: "Hold on to this: **neutrons change mass, electrons change chemistry.** It's the idea behind half of this unit." },
    { t: "bridge", h: "From IGCSE to AS", igcse: ["An atom has protons, neutrons and electrons", "Electrons sit in shells: 2, 8, 8", "Isotopes: same protons, different neutrons", "Proton number and mass number"],
      as: ["Exact relative masses and charges, including the electron's 1/1836", "The nucleus is about $10^{-15}$ m across; the atom about $10^{-10}$ m", "How beams of particles bend in an electric field", "Counting particles in **ions**, and why isotopes share chemical properties"],
      note: "Nothing you learned is wrong. AS adds precision: numbers, evidence and the word *why*.",
      ask: { q: "How many electrons are in a {{Mg^2+}} ion? (Mg has proton number 12.)", o: [["10", true, "12 − 2 = 10. A 2+ ion has lost two electrons."], ["12", false, "That's the atom. The 2+ charge means two electrons have gone."], ["14", false, "A positive ion has *fewer* electrons than protons, not more."], ["24", false, "24 is the mass number, protons plus neutrons."]] } },
    { t: "explain", h: "Inside the atom",
      body: R`<div class="tbl-wrap"><table class="board"><tr><th>Particle</th><th>Relative mass</th><th>Relative charge</th><th>Where</th></tr><tr><td>proton</td><td>1</td><td>+1</td><td>nucleus</td></tr><tr><td>neutron</td><td>1</td><td>0</td><td>nucleus</td></tr><tr><td>electron</td><td>$\frac{1}{1836}$</td><td>−1</td><td>shells around the nucleus</td></tr></table></div><p>Almost all the mass and all the positive charge is packed in the nucleus. The rest of the atom is mostly empty space, with electrons moving in energy levels (shells). If the nucleus were a pea, the atom would be a football stadium.</p>`,
      sim: { tab: 0, p: 6, n: 6, e: 6 }, simLabel: "Build carbon-12",
      ask: { q: "Which statement about an atom is correct?", o: [["The electrons make up most of the mass", false, "Each electron is only 1/1836 of a proton's mass."], ["The nucleus takes up most of the volume", false, "The nucleus is about 100 000 times smaller across than the atom."], ["Nearly all the mass is in a tiny, positive nucleus", true, "Protons and neutrons, each of relative mass 1, sit in a nucleus about $10^{-15}$ m across."], ["Neutrons carry a small negative charge", false, "Neutrons are neutral: relative charge 0."]] } },
    { t: "explain", h: "Beams in an electric field",
      body: R`<p>Fire beams of protons, neutrons and electrons, all at the same speed, between charged plates:</p><ul><li><b>Protons</b> bend towards the negative plate.</li><li><b>Electrons</b> bend towards the positive plate, and much more sharply.</li><li><b>Neutrons</b> go straight through.</li></ul><div class="callout key">Angle of deflection $\propto\dfrac{\text{charge}}{\text{mass}}$</div><p>An electron has the same size of charge as a proton but 1/1836 of the mass, so it bends far more. A {{^2H+}} ion has the same charge as {{H+}} but twice the mass, so it bends half as much.</p>`,
      sim: { tab: 1 }, simLabel: "Open the beam experiment",
      ask: { q: "Beams of {{H+}}, {{He^2+}} and electrons enter the same field at the same speed. Which is deflected least?", o: [["{{H+}} (charge/mass = 1)", false, "{{He^2+}}: charge 2, mass 4, so charge/mass = 0.5, which is smaller."], ["{{He^2+}} (charge/mass = 0.5)", true, "Smallest charge-to-mass ratio, so smallest angle."], ["The electrons", false, "Electrons have by far the largest charge/mass, so they bend most."], ["All bend equally because speed is the same", false, "Equal speed is the condition for comparing; the angle still depends on charge/mass."]] } },
    { t: "explain", h: "Counting particles in atoms and ions",
      body: R`<p>The notation $^{A}_{Z}\text{X}$ gives the <b>mass (nucleon) number</b> $A$ = protons + neutrons and the <b>atomic (proton) number</b> $Z$.</p><div class="callout key">protons = $Z$ &nbsp;&nbsp; neutrons = $A - Z$ &nbsp;&nbsp; electrons = $Z - \text{charge}$</div><p>Ions form when atoms (or molecules) gain or lose electrons. Only the electron count changes: {{^{32}_{16}S^2-}} has 16 protons, 16 neutrons and 18 electrons.</p>`,
      sim: { tab: 0, p: 16, n: 16, e: 18 }, simLabel: "Build a sulfide ion",
      ask: { q: "How many neutrons are in {{^{37}_{17}Cl-}}?", o: [["17", false, "17 is the number of protons."], ["18", false, "18 is the number of electrons in the ion."], ["20", true, "37 − 17 = 20. The charge doesn't affect neutrons."], ["37", false, "37 is protons + neutrons."]] } },
    { t: "explain", h: "Isotopes: same chemistry, different physics",
      body: R`<p><b>Isotopes</b> are atoms of the same element with the same number of protons but different numbers of neutrons.</p><ul><li><b>Same chemical properties:</b> same number of electrons in the same arrangement, and chemistry depends on electrons.</li><li><b>Different physical properties:</b> different mass, so different density (and rate of diffusion).</li></ul><p>Exam phrasing: "same number <i>and arrangement</i> of electrons" earns the mark; "same number of protons" alone doesn't.</p>`,
      ask: { q: "Why do {{^{35}Cl}} and {{^{37}Cl}} react identically with sodium?", o: [["They have the same number of neutrons", false, "They don't: 18 and 20."], ["They have the same electronic configuration", true, "Both have 17 electrons arranged 2,8,7, so they gain one electron in the same way."], ["They have the same mass number", false, "35 and 37 are different mass numbers."], ["Chlorine-37 is not radioactive", false, "Neither is radioactive; that isn't the reason anyway."]] } },
    { t: "worked", h: "Worked example: counting in ions",
      prob: R`Give the numbers of protons, neutrons and electrons in {{^{56}_{26}Fe^3+}}.`,
      steps: [
        { s: R`Protons = $Z$ = 26.` },
        { s: R`Neutrons = $A - Z = 56 - 26 = 30$.`, why: { q: "Why subtract Z from A?", o: [["A counts protons and neutrons together", true, "The mass number counts every nucleon."], ["A counts electrons too", false, "Electrons are too light to count in the mass number."], ["It's a rule of thumb that works for iron", false, "It works for every nucleus."]] } },
        { s: R`Electrons = $26 - 3 = 23$, because a 3+ ion has lost three electrons.` },
      ], after: "Check: the charge is protons − electrons = 26 − 23 = +3. ✓" },
    { t: "complete", h: "Your turn",
      prob: R`A bromide ion is {{^{81}_{35}Br-}}.`, shown: [R`The charge is −1, so the ion has gained one electron.`],
      q: { q: "How many electrons does it have?", ans: 36, unit: "", label: "electrons =", hints: ["A negative ion has *more* electrons than protons.", "Start from the proton number.", "35 + 1"], sol: ["<p>Electrons = 35 + 1 = 36.</p>"], wrongs: [[34, "That's for a 1+ ion. Negative means gained an electron."], [35, "That's the neutral atom."], [46, "46 is the number of neutrons."]] } },
    { t: "solo", h: "On your own: atoms and ions", gen: "particles" },
  ],
  mcq: [
    { q: "Which particle has the largest charge-to-mass ratio?", o: [["proton", false, "Charge 1, mass 1."], ["neutron", false, "No charge at all."], ["electron", true, "Charge 1, mass 1/1836: ratio 1836."], ["{{He^2+}}", false, "Charge 2, mass 4: ratio 0.5."]] },
    { q: "Which species has the same number of electrons as an argon atom?", o: [["{{K+}}", true, "K has 19 electrons; {{K+}} has 18, like Ar."], ["{{Na+}}", false, "{{Na+}} has 10 electrons, like Ne."], ["{{Cl}}", false, "A chlorine atom has 17."], ["{{Ca}}", false, "A calcium atom has 20."]] },
    { q: "Isotopes of an element differ in their…", o: [["number of protons", false, "Then they'd be different elements."], ["number of electrons in neutral atoms", false, "Neutral atoms of one element all have Z electrons."], ["density", true, "Different neutron numbers mean different masses, so different density."], ["reaction with oxygen", false, "Same electrons, same chemistry."]] },
    { q: "A particle has 16 protons, 18 neutrons and 18 electrons. What is it?", o: [["{{^{34}S^2-}}", true, "Z = 16 is sulfur; A = 16 + 18 = 34; charge = 16 − 18 = −2."], ["{{^{34}Ar}}", false, "Argon has 18 protons."], ["{{^{32}S^2-}}", false, "A = 16 + 18 = 34, not 32."], ["{{^{34}S^2+}}", false, "More electrons than protons means a negative ion."]] },
    { q: "In an electric field, a beam of neutrons is…", o: [["deflected towards the positive plate", false, "Only negative particles do that."], ["deflected towards the negative plate", false, "Only positive particles do that."], ["not deflected", true, "No charge, no force from the field."], ["deflected slightly because of its large mass", false, "Mass reduces deflection, but with no charge there is none to reduce."]] },
    { q: "Which pair are isotopes?", o: [["{{^{40}_{19}K}} and {{^{40}_{20}Ca}}", false, "Different proton numbers: different elements."], ["{{^{16}_{8}O}} and {{^{16}_{8}O^2-}}", false, "Same nucleus; one is an ion of the other."], ["{{^{12}_{6}C}} and {{^{13}_{6}C}}", true, "Same Z (6), different A."], ["{{O2}} and {{O3}}", false, "Those are allotropes: different molecules of the same element."]] },
  ],
  gens: {
    particles: () => {
      const sp = pick([["Al", 13, 27, 3], ["O", 8, 16, -2], ["Ca", 20, 40, 2], ["Cl", 17, 35, -1], ["Fe", 26, 56, 2], ["Na", 11, 23, 1], ["S", 16, 34, -2], ["N", 7, 15, -3], ["Cu", 29, 63, 2], ["Br", 35, 79, -1], ["Mg", 12, 26, 2], ["K", 19, 39, 1]]);
      const [s, Z, A, c] = sp, what = pick(["protons", "neutrons", "electrons"]);
      const ch = c === 0 ? "" : (Math.abs(c) > 1 ? Math.abs(c) : "") + (c > 0 ? "+" : "-");
      const ans = what === "protons" ? Z : what === "neutrons" ? A - Z : Z - c;
      return { topic: "particles in atoms and ions", q: `How many ${what} are in one {{^{${A}}_{${Z}}${s}^${ch}}} ion?`, ans, unit: "", label: `${what} =`,
        hints: ["Z gives protons, A gives protons + neutrons, the charge gives the electron change.", what === "electrons" ? "Positive ions have lost electrons; negative ions have gained them." : what === "neutrons" ? "Neutrons = A − Z. The charge doesn't matter here." : "Protons = Z, whatever the charge.", what === "electrons" ? `${Z} − (${c})` : what === "neutrons" ? `${A} − ${Z}` : `${Z}`],
        sol: [`<p>${what} = ${what === "electrons" ? `${Z} − (${c}) = ${ans}` : what === "neutrons" ? `${A} − ${Z} = ${ans}` : ans}</p>`],
        wrongs: [[Z + c, "You moved the electrons the wrong way: a positive ion has *fewer* electrons."], [A, "That's the mass number."], [Z, what !== "protons" ? "That's the number of protons." : ""], [A - Z, what !== "neutrons" ? "That's the number of neutrons." : ""]].filter(w => w[1] && w[0] !== ans) };
    },
    deflect: () => {
      const a = pick([["H+", 1, 1], ["He^2+", 2, 4], ["^2H+", 1, 2], ["Li+", 1, 7], ["^3He^2+", 2, 3], ["Be^2+", 2, 9]]);
      const b = pick([["H+", 1, 1], ["He^2+", 2, 4], ["^2H+", 1, 2]].filter(x => x[0] !== a[0]));
      const ans = (a[1] / a[2]) / (b[1] / b[2]);
      return { topic: "deflection and charge/mass", q: `Beams of {{${a[0]}}} and {{${b[0]}}} enter the same electric field at the same speed. Calculate the angle of deflection of {{${a[0]}}} divided by the angle for {{${b[0]}}}. (Take relative masses as whole numbers.)`, ans, unit: "", label: "ratio =", tol: 0.02,
        hints: ["Angle of deflection ∝ charge/mass.", `Work out charge/mass for each: {{${a[0]}}} is ${a[1]}/${a[2]}.`, `(${a[1]}/${a[2]}) ÷ (${b[1]}/${b[2]})`],
        sol: [R`\frac{\theta_1}{\theta_2}=\frac{${a[1]}/${a[2]}}{${b[1]}/${b[2]}}=${f3(ans)}`], wrongs: [[1 / ans, "Upside down: you divided the second by the first."], [a[2] / b[2], "Mass alone isn't enough; include the charges."]] };
    },
  },
  ex: [
    { q: "Explain why {{^{35}Cl}} and {{^{37}Cl}} have the same chemical properties but different densities.", pts: ["Same number of electrons / same electronic configuration (2,8,7)", "Chemical reactions involve (outer) electrons, so reactions are the same", "Different numbers of neutrons, so different masses", "Different mass (per unit volume) gives different density"] },
    { q: "Describe the distribution of mass and charge in an atom.", pts: ["Almost all the mass is in the nucleus", "The nucleus contains protons (positive) and neutrons (neutral), so it is positively charged", "Electrons (negative) are in shells around the nucleus / occupy most of the volume", "The atom is mostly empty space; the nucleus is very small compared with the atom"] },
  ],
  traps: ["The electron's relative mass is 1/1836, not zero. Write it that way in a table.", "Deflection depends on charge ÷ mass, not on mass alone. {{He^2+}} and {{^2H+}} bend by the same angle.", "In an ion only the electrons change. Protons and neutrons stay put.", "Isotopes: \"same number and arrangement of electrons\" explains same chemistry. \"Same protons\" alone isn't enough."],
  defs: [["Atomic (proton) number, Z", "The number of protons in the nucleus of an atom."], ["Mass (nucleon) number, A", "The total number of protons and neutrons in the nucleus of an atom."], ["Isotopes", "Atoms of the same element with the same number of protons but different numbers of neutrons."], ["Ion", "An atom or group of atoms that has gained or lost one or more electrons, giving it an overall charge."]],
});

/* ======================= UNIT 2 ======================= */
const CFG_ORDER = [["1s", 2], ["2s", 2], ["2p", 6], ["3s", 2], ["3p", 6], ["4s", 2], ["3d", 10], ["4p", 6]];
const SYM = "H He Li Be B C N O F Ne Na Mg Al Si P S Cl Ar K Ca Sc Ti V Cr Mn Fe Co Ni Cu Zn Ga Ge As Se Br Kr".split(" ");
PX.chem = PX.chem || {};
PX.chem.SYM = SYM;
/* ground-state configuration as {sub: count}, with Cr/Cu exceptions and 4s-first removal for ions */
PX.chem.config = (Z, charge = 0) => {
  const fill = n => { const c = {}; let left = n; for (const [s, cap] of CFG_ORDER) { if (left <= 0) break; c[s] = Math.min(cap, left); left -= c[s]; } return c; };
  let c = fill(Z);
  if (Z === 24) c = Object.assign(fill(18), { "4s": 1, "3d": 5 });
  if (Z === 29) c = Object.assign(fill(18), { "4s": 1, "3d": 10 });
  let rem = charge;
  if (rem > 0) { for (const s of ["4p", "4s", "3d", "3p", "3s", "2p", "2s", "1s"]) { while (rem > 0 && c[s] > 0) { c[s]--; rem--; } } }
  if (rem < 0) c = fill(Z - charge);
  Object.keys(c).forEach(k => { if (!c[k]) delete c[k]; });
  return c;
};
PX.chem.cfgText = c => CFG_ORDER.map(([s]) => s).filter(s => c[s]).sort((a, b) => (+a[0] - +b[0]) || ("spd".indexOf(a[1]) - "spd".indexOf(b[1]))).map(s => `${s}^{${c[s]}}`).join("\\,");
PX.chem.unpaired = c => Object.entries(c).reduce((t, [s, n]) => { const o = { s: 1, p: 3, d: 5 }[s[1]]; return t + (n <= o ? n : 2 * o - n); }, 0);
const IE1 = [1312, 2372, 520, 900, 801, 1086, 1402, 1314, 1681, 2081, 496, 738, 578, 787, 1012, 1000, 1251, 1521, 419, 590, 633, 659, 651, 653, 717, 762, 760, 737, 745, 906, 579, 762, 947, 941, 1140, 1351];
PX.chem.IE1 = IE1;
const SUCC = {
  Na: [496, 4562, 6910, 9543, 13354, 16613, 20117, 25496, 28932, 141362, 159076],
  Mg: [738, 1451, 7733, 10543, 13630, 18020, 21711, 25661, 31653, 35458, 169988, 189368],
  Al: [578, 1817, 2745, 11577, 14842, 18379, 23326, 27465, 31853, 38473, 42647, 201266, 222316],
  Si: [787, 1577, 3232, 4356, 16091, 19805, 23780, 29287, 33878, 38726, 45962, 50502, 235196, 257923],
  P: [1012, 1907, 2914, 4964, 6274, 21267, 25431, 29872, 35905, 40950, 46261, 54110, 59024, 271791, 296195],
  S: [1000, 2252, 3357, 4556, 7004, 8496, 27107, 31719, 36621, 43177, 48710, 54460, 62930, 68216],
  Cl: [1251, 2298, 3822, 5159, 6542, 9362, 11018, 33604, 38600, 43961, 51068, 57119, 63363],
  K: [419, 3052, 4420, 5877, 7975, 9590, 11343, 14944, 16963, 48610, 54490],
  Ca: [590, 1145, 4912, 6491, 8153, 10496, 12270, 14206, 18191, 20385, 57110],
};
PX.chem.SUCC = SUCC;
const GROUP = { Na: 1, K: 1, Mg: 2, Ca: 2, Al: 13, Si: 14, P: 15, S: 16, Cl: 17 };
PX.chem.GROUP = GROUP;
PX.unit({
  id: "2", n: 2, short: "Electrons in atoms", title: "Electrons in atoms", strand: "phys", sim: "electrons",
  intents: ["use the terms shell, sub-shell, orbital, principal quantum number and ground-state configuration", "describe the numbers of orbitals and electrons in s, p and d sub-shells and the order of filling up to 4p", "write full and shorthand electronic configurations for atoms and ions, and use electrons-in-boxes notation", "describe the shapes of s and p orbitals, and a free radical as a species with an unpaired electron", "define first ionisation energy and write equations for successive ionisation energies", "explain trends in ionisation energy across a period and down a group, and the variation in successive ionisation energies"],
  lesson: [
    { t: "predict", h: "Magnesium or aluminium?", body: "Ionisation energy is the energy needed to pull an electron off an atom. Across Period 3, atoms get smaller and the nuclear charge rises.", q: "Which has the larger first ionisation energy?",
      o: [["Aluminium, because it has one more proton", false, "That's the general trend, but here it breaks. Al's outer electron is in a new, higher-energy sub-shell."], ["Magnesium", true, "Surprising! Al's outer electron is in 3p, higher in energy and slightly shielded by 3s, so it's easier to remove."], ["They're equal", false, "They differ by 160 kJ mol⁻¹: Mg 738, Al 578."]],
      after: "The overall trend across a period is *up*, but there are two dips. Explaining them needs **sub-shells**, which IGCSE never mentioned." },
    { t: "bridge", h: "From IGCSE to AS", igcse: ["Electrons in shells: 2, 8, 8, 2", "Outer electrons decide the group", "Reactivity trends down groups"],
      as: ["Each shell splits into **sub-shells** s, p, d", "Each sub-shell is made of **orbitals** that hold 2 electrons each", "Configurations like {{1s^2 2s^2 2p^6 3s^1}}", "Ionisation energies give the evidence for all of this"],
      note: "Your 2,8,8 is still right: shell 2 holds 8 because 2s (2) + 2p (6) = 8. AS shows what's inside each shell.",
      ask: { q: "Shell 3 can hold 18 electrons. Which sub-shells make that up?", o: [["3s, 3p, 3d: 2 + 6 + 10", true, "That's why shell 3 can hold 18, though at AS only 8 are filled before 4s starts."], ["3s and 3p only: 2 + 6", false, "That makes 8. Shell 3 also has a 3d sub-shell."], ["3s, 3p, 3d, 3f", false, "f sub-shells start at shell 4."]] } },
    { t: "explain", h: "Shells, sub-shells and orbitals",
      body: R`<div class="tbl-wrap"><table class="board"><tr><th>Sub-shell</th><th>Orbitals</th><th>Max electrons</th><th>Shape</th></tr><tr><td>s</td><td>1</td><td>2</td><td>sphere</td></tr><tr><td>p</td><td>3</td><td>6</td><td>dumbbell (along x, y, z)</td></tr><tr><td>d</td><td>5</td><td>10</td><td>(not needed)</td></tr></table></div><p>An <b>orbital</b> is a region of space where there is a high probability of finding an electron; each holds up to <b>two</b> electrons with opposite spins.</p><div class="callout key">Filling order: 1s 2s 2p 3s 3p <b>4s 3d</b> 4p</div><p>4s fills before 3d because 4s is slightly lower in energy for these atoms.</p>`,
      sim: { tab: 0, Z: 11, c: 0 }, simLabel: "Fill sodium's electrons",
      ask: { q: "How many orbitals are in the 2p sub-shell, and how many electrons can it hold?", o: [["1 orbital, 2 electrons", false, "That's an s sub-shell."], ["3 orbitals, 6 electrons", true, "p sub-shells have three orbitals (px, py, pz), two electrons each."], ["3 orbitals, 3 electrons", false, "Each orbital holds two electrons, not one."], ["5 orbitals, 10 electrons", false, "That's a d sub-shell."]] } },
    { t: "explain", h: "Filling rules and the two exceptions",
      body: R`<ul><li>Fill the lowest-energy sub-shell first.</li><li>In a sub-shell, electrons go into separate orbitals <b>singly</b> with parallel spins before pairing (pairing costs energy through repulsion).</li><li>Two electrons in one orbital have opposite spins.</li></ul><p><b>Exceptions:</b> chromium is {{[Ar] 3d^5 4s^1}} and copper is {{[Ar] 3d^{10} 4s^1}}.</p><p><b>Ions of d-block elements lose 4s electrons first:</b> Fe is {{[Ar] 3d^6 4s^2}} but {{Fe^2+}} is {{[Ar] 3d^6}}.</p><p>A <b>free radical</b> is a species with one or more unpaired electrons, such as {{Cl.}}</p>`,
      sim: { tab: 0, Z: 26, c: 2 }, simLabel: "Show Fe²⁺ in boxes",
      ask: { q: "What is the configuration of {{Cu^2+}}? (Cu is Z = 29.)", o: [["{{[Ar] 3d^9}}", true, "Cu is [Ar] 3d¹⁰ 4s¹. Remove the 4s electron, then one 3d electron."], ["{{[Ar] 3d^7 4s^2}}", false, "Ions lose 4s electrons first, so no 4s remains."], ["{{[Ar] 3d^{10} 4s^1}}", false, "That's the copper atom."], ["{{[Ar] 3d^8 4s^1}}", false, "The 4s electron goes before any 3d electron."]] } },
    { t: "explain", h: "Ionisation energy and what controls it",
      body: R`<p>The <b>first ionisation energy</b> is the energy needed to remove one electron from each atom in one mole of gaseous atoms to form one mole of gaseous 1+ ions.</p><div class="eq">{{Ca(g) -> Ca+(g) + e-}} &nbsp; IE₁ &nbsp;&nbsp;&nbsp; {{Ca+(g) -> Ca^2+(g) + e-}} &nbsp; IE₂</div><p>Four factors decide how strongly the outer electron is held:</p><ol><li><b>Nuclear charge</b>: more protons, stronger attraction.</li><li><b>Distance</b> (atomic radius): further away, weaker attraction.</li><li><b>Shielding</b> by inner shells: more shielding, weaker attraction.</li><li><b>Spin-pair repulsion</b>: a paired electron is pushed out slightly more easily.</li></ol><p>Across a period IE rises: nuclear charge increases, shielding hardly changes, radius shrinks. Down a group IE falls: more shells, more distance and shielding, which outweigh the extra protons.</p>`,
      sim: { tab: 1 }, simLabel: "Show the first IE graph",
      ask: { q: "Which equation represents the second ionisation energy of oxygen?", o: [["{{O+(g) -> O^2+(g) + e-}}", true, "Gaseous 1+ ion to gaseous 2+ ion."], ["{{O(g) -> O^2+(g) + 2e-}}", false, "That's IE₁ + IE₂ together."], ["{{O(g) + 2e- -> O^2-(g)}}", false, "That's gaining electrons."], ["{{O+(aq) -> O^2+(aq) + e-}}", false, "Ionisation energies are for gaseous species."]] } },
    { t: "explain", h: "The dips, and successive ionisation energies",
      body: R`<ul><li><b>Be → B</b> and <b>Mg → Al</b>: the outer electron is now in a p sub-shell, higher in energy and shielded by the s electrons.</li><li><b>N → O</b> and <b>P → S</b>: the new electron pairs up in a p orbital; spin-pair repulsion makes it easier to remove.</li></ul><p><b>Successive</b> IEs always increase (each electron leaves a more positive ion). A <b>big jump</b> means the next electron comes from a shell nearer the nucleus. The number of electrons before the first big jump = the group number (Groups 1–2) or group − 10 (Groups 13–17).</p>`,
      sim: { tab: 2, el: "Al" }, simLabel: "Successive IEs of aluminium",
      ask: { q: "An element's first five IEs are 578, 1817, 2745, 11 577, 14 842 kJ mol⁻¹. Which group is it in?", o: [["Group 2", false, "The big jump is after the third electron, not the second."], ["Group 13", true, "Three outer electrons come off easily, then a jump to an inner shell."], ["Group 15", false, "Group 15 would show five easy electrons."], ["Group 3", false, "Cambridge uses Groups 1, 2 and 13–18 for the main groups."]] } },
    { t: "worked", h: "Worked example: explaining an anomaly",
      prob: "Explain why the first ionisation energy of sulfur is lower than that of phosphorus.",
      steps: [
        { s: R`Configurations: P is {{[Ne] 3s^2 3p^3}}; S is {{[Ne] 3s^2 3p^4}}.` },
        { s: R`In P, the three 3p electrons are each alone in an orbital. In S, the fourth 3p electron must <b>pair</b> with another in the same orbital.`, why: { q: "Why does that matter?", o: [["Paired electrons repel each other, so that electron is easier to remove", true, "Spin-pair repulsion offsets the extra nuclear charge."], ["S has fewer protons", false, "S has 16, P has 15."], ["The electron in S is in a new shell", false, "Both outer electrons are in shell 3, sub-shell 3p."]] } },
        { s: R`This repulsion outweighs sulfur's extra proton, so less energy is needed. Same shell and similar shielding, so those aren't the reason.` },
      ], after: "Mark-scheme phrasing: \"In S, electron removed from a doubly occupied (paired) 3p orbital; spin-pair repulsion.\"" },
    { t: "complete", h: "Your turn: unpaired electrons",
      prob: "Iron atoms are {{[Ar] 3d^6 4s^2}}.", shown: [R`Fill the five 3d orbitals singly first: that uses 5 electrons. The sixth pairs up.`],
      q: { q: "How many unpaired electrons does an iron atom have?", ans: 4, unit: "", label: "unpaired =", hints: ["The 4s² pair has no unpaired electrons.", "Five 3d boxes, six electrons: five go in singly, then one pairs.", "5 singles − 1 paired = 4"], sol: ["<p>3d: ↑↓ ↑ ↑ ↑ ↑ → 4 unpaired; 4s² is paired. Total 4.</p>"], wrongs: [[6, "Two of those six 3d electrons share an orbital."], [2, "Fill singly before pairing."], [5, "Only five can sit singly; the sixth pairs, leaving 4 single."]] } },
    { t: "solo", h: "On your own: configurations and IEs", gen: "unpaired" },
  ],
  mcq: [
    { q: "Which element has the highest first ionisation energy?", o: [["Li", false, "Group 1: one electron in a new shell, easy to remove."], ["N", false, "High, but neon is higher."], ["Ne", true, "Full shell 2, highest nuclear charge in the period."], ["Na", false, "Even lower than Li: further from the nucleus."]] },
    { q: "Which is the configuration of {{Cr}} (Z = 24)?", o: [["{{[Ar] 3d^4 4s^2}}", false, "That's what the simple rule predicts, but Cr is an exception."], ["{{[Ar] 3d^5 4s^1}}", true, "One of the two exceptions, along with Cu."], ["{{[Ar] 3d^6}}", false, "Neutral Cr still has a 4s electron."], ["{{[Ar] 4s^2 4p^4}}", false, "3d fills before 4p."]] },
    { q: "Why does the first ionisation energy decrease down Group 2?", o: [["Nuclear charge decreases", false, "Nuclear charge increases down the group."], ["The outer electron is further from the nucleus and more shielded", true, "Extra shells add distance and shielding, which outweigh the extra protons."], ["Spin-pair repulsion increases", false, "The outer s orbital is full in every Group 2 atom; that doesn't change."], ["The atoms have fewer electrons", false, "They have more."]] },
    { q: "Successive IEs (kJ mol⁻¹): 738, 1451, 7733, 10 543… This element is most likely:", o: [["Na", false, "Sodium's jump comes after the 1st electron."], ["Mg", true, "Two easy electrons, then a big jump: Group 2."], ["Al", false, "Aluminium's jump comes after the 3rd electron."], ["Si", false, "Silicon's jump comes after the 4th electron."]] },
    { q: "Which species is a free radical?", o: [["{{Cl-}}", false, "{{[Ne]3s^2 3p^6}}: all paired."], ["{{Cl.}}", true, "A chlorine atom has one unpaired electron."], ["{{Cl2}}", false, "The bonding pair is shared; no unpaired electrons."], ["{{Ar}}", false, "Full sub-shells."]] },
    { q: "The shape of a p orbital is best described as:", o: [["spherical", false, "That's an s orbital."], ["dumbbell-shaped", true, "Two lobes either side of the nucleus, along one axis."], ["a circular orbit", false, "Orbitals are regions of probability, not paths."], ["tetrahedral", false, "That's a molecular shape."]] },
    { q: "How many electrons are in the 3p sub-shell of a sulfur atom (Z = 16)?", o: [["4", true, "1s² 2s² 2p⁶ 3s² 3p⁴."], ["6", false, "That would be argon."], ["2", false, "Count again: 16 − 12 = 4."], ["16", false, "That's all the electrons."]] },
  ],
  gens: {
    unpaired: () => {
      const opts = [[7, 0], [8, 0], [15, 0], [16, 0], [26, 0], [26, 2], [26, 3], [24, 0], [29, 0], [29, 2], [25, 2], [27, 2], [28, 2], [22, 0], [23, 0], [6, 0], [14, 0], [17, 0], [8, -2], [21, 3], [30, 2]];
      const [Z, c] = pick(opts), cf = PX.chem.config(Z, c), ans = PX.chem.unpaired(cf);
      const name = SYM[Z - 1] + (c ? (c > 0 ? `^${Math.abs(c) > 1 ? Math.abs(c) : ""}+` : `^${Math.abs(c) > 1 ? Math.abs(c) : ""}-`) : "");
      return { topic: "electronic configurations and unpaired electrons", q: `How many unpaired electrons are in a ground-state {{${name}}} ${c ? "ion" : "atom"}? (Z = ${Z})`, ans, unit: "", label: "unpaired =",
        hints: [c > 0 && Z > 20 ? "For d-block ions, remove 4s electrons before 3d." : "Write the configuration first.", "Fill each orbital singly before pairing (p: 3 boxes, d: 5 boxes).", R`Configuration: $${PX.chem.cfgText(cf)}$`],
        sol: [R`\text{${SYM[Z - 1]}}${c ? (c > 0 ? "^{" + c + "+}" : "^{" + (-c) + "-}") : ""}\text{: }${PX.chem.cfgText(cf)}`, `<p>Count single arrows in the part-filled sub-shell: ${ans}.</p>`], wrongs: [] };
    },
    group: () => {
      const el = pick(Object.keys(SUCC)), ie = SUCC[el].slice(0, Math.min(SUCC[el].length, GROUP[el] <= 2 ? GROUP[el] + 3 : GROUP[el] - 10 + 2));
      const ans = GROUP[el];
      return { topic: "group from successive ionisation energies", q: `The successive ionisation energies of element X (kJ mol⁻¹) are: ${ie.join(", ")}. Which group of the Periodic Table is X in? (Use 1, 2, 13–17.)`, ans, unit: "", label: "Group",
        hints: ["Look for the biggest jump between consecutive values.", "Count the electrons removed before that jump.", "For three or more outer electrons, add 10 to get the group number (13–17)."],
        sol: [`<p>The big jump comes after electron ${ans <= 2 ? ans : ans - 10}, so X has ${ans <= 2 ? ans : ans - 10} outer electrons: Group ${ans}.</p>`], wrongs: [[ans <= 2 ? ans + 1 : ans - 10, "Count the electrons *before* the jump, and use group 13–17 numbering for p-block elements."]] };
    },
  },
  ex: [
    { q: "Explain why the first ionisation energy of aluminium is lower than that of magnesium.", pts: ["Al outer electron is in the 3p sub-shell; Mg's is in 3s", "3p is higher in energy than 3s / further from the nucleus", "The 3p electron is shielded by the 3s electrons", "So less energy is needed to remove it, despite the extra proton"] },
    { q: "Explain the general increase in first ionisation energy across Period 3.", pts: ["Nuclear charge / number of protons increases", "Electrons are added to the same shell, so shielding is similar", "Atomic radius decreases", "Stronger attraction between nucleus and outer electron, so more energy needed"] },
    { q: "Explain why the second ionisation energy of sodium is much larger than the first.", pts: ["The second electron is removed from the 2p sub-shell / second shell", "That shell is closer to the nucleus", "It is less shielded (only 1s electrons shield it)", "It is removed from a positive ion, so attraction is greater"] },
  ],
  traps: ["Ions of d-block elements lose 4s electrons before 3d, even though 4s filled first.", "Cr and Cu: {{[Ar] 3d^5 4s^1}} and {{[Ar] 3d^{10} 4s^1}}.", "Ionisation energy equations need gaseous state symbols on both sides: {{X(g) -> X+(g) + e-}}.", "Successive IEs: count electrons *before* the big jump. The jump shows a change of shell.", "For the N→O and P→S dip, say \"spin-pair repulsion in a doubly occupied p orbital\", not just \"half-filled is stable\"."],
  defs: [["First ionisation energy", "The energy needed to remove one electron from each atom in one mole of gaseous atoms to form one mole of gaseous 1+ ions."], ["Orbital", "A region of space around the nucleus that can hold up to two electrons with opposite spins."], ["Free radical", "A species with one or more unpaired electrons."], ["Shielding", "The reduction in attraction between the nucleus and outer electrons caused by electrons in inner shells (and sub-shells)."], ["Ground state", "The lowest-energy electronic configuration of an atom or ion."]],
});

/* ======================= UNIT 3 ======================= */
const AR = { H: 1.0, C: 12.0, N: 14.0, O: 16.0, Na: 23.0, Mg: 24.3, Al: 27.0, S: 32.1, Cl: 35.5, K: 39.1, Ca: 40.1, Fe: 55.8, Cu: 63.5, Zn: 65.4, Br: 79.9, Ag: 107.9, Ba: 137.3, I: 126.9 };
PX.chem.AR = AR;
const Mr = f => { let m = 0; f.replace(/([A-Z][a-z]?)(\d*)/g, (_, e, n) => { m += AR[e] * (+n || 1); }); return round(m, 1); };
PX.chem.Mr = Mr;
PX.unit({
  id: "3", n: 3, short: "Moles & stoichiometry", title: "Atoms, molecules and stoichiometry", strand: "phys", sim: "spectrum",
  intents: ["define the unified atomic mass unit and use relative atomic, isotopic, molecular and formula mass", "define the mole in terms of the Avogadro constant", "write formulae of ionic compounds and recall common ions ({{NO3-}}, {{CO3^2-}}, {{SO4^2-}}, {{OH-}}, {{NH4+}}, {{Zn^2+}}, {{Ag+}}, {{HCO3-}}, {{PO4^3-}})", "analyse mass spectra: relative atomic mass, molecular ion, [M+1] and [M+2] peaks", "write balanced and ionic equations with state symbols", "calculate empirical and molecular formulae, and use the terms anhydrous, hydrated and water of crystallisation", "calculate reacting masses, percentage yield, gas volumes, concentrations, limiting reagents"],
  lesson: [
    { t: "predict", h: "Same mass, same number?", body: "You have 12 g of carbon and 12 g of magnesium.", q: "Which contains more atoms?",
      o: [["They contain the same number of atoms", false, "Equal masses, but each Mg atom is twice as heavy as a C atom."], ["Carbon", true, "12 g of C is 1 mol; 12 g of Mg is about 0.5 mol, because Mg atoms are about twice as heavy."], ["Magnesium", false, "Heavier atoms means fewer of them in the same mass."]],
      after: "That's why chemists count in **moles**, not grams. Equal moles means equal numbers of particles." },
    { t: "bridge", h: "From IGCSE to AS", igcse: ["Moles = mass ÷ Mr", "Concentration in mol/dm³", "1 mol of gas = 24 dm³ at room temperature", "Balanced equations"],
      as: ["Where Ar values come from: isotopes and the **mass spectrometer**", "Organic mass spectra: [M+1] and [M+2] peaks", "Limiting reagents, % yield, water of crystallisation", "Ionic equations without spectator ions"],
      note: "The three IGCSE formulas still do 90% of the work. AS questions just chain more steps together.",
      ask: { q: "How many moles are in 25.0 cm³ of 0.200 mol dm⁻³ HCl?", o: [["0.00500 mol", true, "n = cV = 0.200 × 25.0/1000."], ["5.00 mol", false, "Convert cm³ to dm³ first: divide by 1000."], ["0.125 mol", false, "That's c ÷ V. Multiply instead."], ["8.00 mol", false, "Check the operation and the units."]] } },
    { t: "explain", h: "Relative masses and the mass spectrometer",
      body: R`<p>All relative masses compare with <b>one twelfth of the mass of a carbon-12 atom</b> (the unified atomic mass unit, u).</p><p>A mass spectrometer measures the mass-to-charge ratio and abundance of each isotope. Then:</p><div class="callout key">$$A_r=\frac{\sum(\text{isotopic mass}\times\text{abundance})}{\sum\text{abundance}}$$</div><p>Chlorine: 75% ³⁵Cl and 25% ³⁷Cl gives $A_r = (35\times75 + 37\times25)/100 = 35.5$.</p>`,
      sim: { tab: 0, el: "Cl" }, simLabel: "Open chlorine's mass spectrum",
      ask: { q: "Boron is 20% ¹⁰B and 80% ¹¹B. What is its Ar?", o: [["10.2", false, "Weight towards the more abundant isotope, ¹¹B."], ["10.5", false, "That's a simple average, ignoring abundance."], ["10.8", true, "(10 × 20 + 11 × 80)/100 = 10.8."], ["11.0", false, "Some ¹⁰B pulls it below 11."]] } },
    { t: "explain", h: "Mass spectra of molecules",
      body: R`<ul><li>The <b>molecular ion</b> peak $M^+$ (largest m/z, apart from small isotope peaks) gives $M_r$.</li><li><b>[M+1]</b> comes from molecules with one ¹³C atom (1.1% of carbon): $$n=\frac{100}{1.1}\times\frac{\text{abundance of }[M+1]}{\text{abundance of }M}$$</li><li><b>[M+2]</b>: one Cl atom gives M : M+2 ≈ 3 : 1; one Br atom gives ≈ 1 : 1.</li><li><b>Fragments</b>: m/z 15 is {{CH3+}}, 29 is {{C2H5+}} or {{CHO+}}, 43 is {{C3H7+}} or {{CH3CO+}}.</li></ul>`,
      sim: { tab: 1, n: 4, cl: 1, br: 0 }, simLabel: "Build a molecular-ion pattern",
      ask: { q: "The M peak has height 40 and the [M+1] peak has height 2.2. How many carbon atoms are in the molecule?", o: [["2", false, "n = (100/1.1) × (2.2/40) = 5."], ["5", true, "2.2/40 = 0.055; 0.055 × 100/1.1 = 5."], ["11", false, "Use the ratio of the heights, not the difference."], ["22", false, "Check: (100/1.1) × 0.055."]] } },
    { t: "explain", h: "The mole and the three working formulas",
      body: R`<p>One <b>mole</b> contains $6.02\times10^{23}$ particles (the Avogadro constant, $L$).</p><div class="callout key">$$n=\frac{m}{M}\qquad n=c\times V\,(\text{dm}^3)\qquad n=\frac{V_\text{gas}}{24.0\ \text{dm}^3}\ \text{(r.t.p.)}$$</div><p>Every reacting-quantity problem has the same skeleton: <b>convert what you know into moles → use the equation's ratio → convert moles into what you want.</b></p><p><b>Limiting reagent</b>: the one that runs out first. Work out moles of each reactant, divide by its coefficient; the smallest is limiting. <b>% yield</b> = actual ÷ theoretical × 100.</p>`,
      ask: { q: "What mass of {{MgO}} forms when 4.86 g of Mg burns completely? ({{2Mg + O2 -> 2MgO}}; Ar Mg = 24.3, O = 16.0)", o: [["8.06 g", true, "4.86/24.3 = 0.200 mol Mg → 0.200 mol MgO × 40.3 = 8.06 g."], ["4.03 g", false, "The ratio Mg : MgO is 2 : 2, i.e. 1 : 1, not 2 : 1."], ["16.1 g", false, "You doubled the moles; the ratio is 1 : 1."], ["4.86 g", false, "Mass isn't conserved per substance; oxygen adds mass."]] } },
    { t: "explain", h: "Formulae, ionic equations and water of crystallisation",
      body: R`<ul><li><b>Empirical formula</b>: simplest whole-number ratio of atoms. <b>Molecular formula</b>: actual numbers. Divide each mass (or %) by Ar, then by the smallest.</li><li><b>Ions to know</b>: {{NO3-}}, {{CO3^2-}}, {{SO4^2-}}, {{OH-}}, {{NH4+}}, {{Zn^2+}}, {{Ag+}}, {{HCO3-}}, {{PO4^3-}}.</li><li><b>Ionic equations</b> leave out spectator ions: {{Ag+(aq) + Cl-(aq) -> AgCl(s)}}.</li><li><b>Hydrated</b> salts contain water of crystallisation, {{CuSO4.5H2O}}; heating gives the <b>anhydrous</b> salt. Find $x$ from the ratio of moles of water to moles of anhydrous salt.</li></ul>`,
      ask: { q: "A compound is 40.0% C, 6.7% H and 53.3% O by mass. What is its empirical formula?", o: [["{{CH2O}}", true, "40.0/12 = 3.33; 6.7/1 = 6.7; 53.3/16 = 3.33. Ratio 1 : 2 : 1."], ["{{C2H4O2}}", false, "That has the right ratio but isn't the simplest; it could be the molecular formula."], ["{{CHO}}", false, "H : C is 2 : 1."], ["{{C3H6O3}}", false, "Simplify by dividing by 3."]] } },
    { t: "worked", h: "Worked example: a titration",
      prob: R`25.0 cm³ of 0.100 mol dm⁻³ {{Na2CO3}} needs 22.50 cm³ of hydrochloric acid for neutralisation. {{Na2CO3 + 2HCl -> 2NaCl + CO2 + H2O}}. Find the concentration of the acid.`,
      steps: [
        { s: R`Moles of {{Na2CO3}} $= 0.100\times\dfrac{25.0}{1000}=2.50\times10^{-3}$ mol.` },
        { s: R`Moles of HCl $= 2\times2.50\times10^{-3}=5.00\times10^{-3}$ mol.`, why: { q: "Why multiply by 2?", o: [["The equation shows 2 HCl react with each 1 {{Na2CO3}}", true, "Mole ratio from the balanced equation."], ["HCl has two atoms", false, "Atom count isn't the ratio; coefficients are."], ["Titrations always double", false, "Only when the equation says so."]] } },
        { s: R`$c=\dfrac{n}{V}=\dfrac{5.00\times10^{-3}}{22.50/1000}=0.222\ \text{mol dm}^{-3}$` },
      ], after: "Skeleton: known → moles → ratio → moles → wanted. Give 3 significant figures, matching the data." },
    { t: "complete", h: "Your turn: water of crystallisation",
      prob: R`2.50 g of hydrated copper(II) sulfate, {{CuSO4.xH2O}}, is heated to constant mass. 1.60 g of anhydrous {{CuSO4}} remains. ($M_r$ {{CuSO4}} = 159.6, {{H2O}} = 18.0)`,
      shown: [R`Mass of water lost = 2.50 − 1.60 = 0.90 g, so $n(\text{H}_2\text{O})=0.90/18.0=0.0500$ mol.`, R`$n(\text{CuSO}_4)=1.60/159.6=0.01003$ mol.`],
      q: { q: "What is the value of x?", ans: 5, unit: "", label: "x =", hints: ["x is the mole ratio of water to anhydrous salt.", "Divide the moles of water by the moles of CuSO₄.", "0.0500 ÷ 0.01003"], sol: [R`x=\frac{0.0500}{0.01003}=4.99\approx5`], wrongs: [[0.2, "Upside down: water ÷ salt."], [0.56, "Use moles, not masses."]] } },
    { t: "solo", h: "On your own: mole calculations", gen: "titration" },
  ],
  mcq: [
    { q: "Which contains the greatest number of atoms?", o: [["1 mol of {{He}}", false, "1 mol of atoms."], ["1 mol of {{H2O}}", true, "3 mol of atoms per mole of molecules."], ["1 mol of {{O2}}", false, "2 mol of atoms."], ["0.5 mol of {{CH4}}", false, "0.5 × 5 = 2.5 mol of atoms."]] },
    { q: "What volume of {{CO2}} at r.t.p. forms when 10.0 g of {{CaCO3}} (Mr 100) reacts with excess acid?", o: [["2.40 dm³", true, "0.100 mol CaCO₃ → 0.100 mol CO₂ × 24.0."], ["24.0 dm³", false, "That's for 1 mol; you have 0.100 mol."], ["0.240 dm³", false, "0.100 × 24.0 = 2.40, not 0.240."], ["4.80 dm³", false, "The ratio CaCO₃ : CO₂ is 1 : 1."]] },
    { q: "In a mass spectrum, a compound shows peaks at m/z 78 and 80 of almost equal height. It probably contains:", o: [["one chlorine atom", false, "Cl gives a 3 : 1 ratio."], ["one bromine atom", true, "⁷⁹Br and ⁸¹Br are nearly 50 : 50."], ["two chlorine atoms", false, "That gives M, M+2, M+4 in 9 : 6 : 1."], ["one more carbon atom", false, "¹³C gives a small M+1 peak, not an M+2."]] },
    { q: "Which is the correct ionic equation for the reaction of barium chloride solution with sodium sulfate solution?", o: [["{{Ba^2+(aq) + SO4^2-(aq) -> BaSO4(s)}}", true, "Na⁺ and Cl⁻ are spectators."], ["{{BaCl2 + Na2SO4 -> BaSO4 + 2NaCl}}", false, "That's the full equation, with spectators and no state symbols."], ["{{Na+(aq) + Cl-(aq) -> NaCl(s)}}", false, "NaCl stays dissolved."], ["{{Ba^2+(aq) + SO4^2-(aq) -> BaSO4(aq)}}", false, "Barium sulfate is the precipitate: (s)."]] },
    { q: "3.0 g of {{H2}} reacts with 16 g of {{O2}}. Which is the limiting reagent? ({{2H2 + O2 -> 2H2O}})", o: [["{{H2}}", false, "1.5 mol H₂ needs only 0.75 mol O₂."], ["{{O2}}", true, "0.50 mol O₂ needs 1.0 mol H₂; there's 1.5 mol, so O₂ runs out first."], ["Neither; they're in the exact ratio", false, "Exact ratio would be 1.0 mol H₂ : 0.5 mol O₂."], ["Can't tell without volumes", false, "Masses → moles is enough."]] },
    { q: "Relative atomic mass is defined relative to:", o: [["the mass of a hydrogen atom", false, "That was an old standard."], ["1/12 of the mass of a carbon-12 atom", true, "The unified atomic mass unit."], ["the mass of a proton", false, "Close, but not the definition."], ["1/16 of an oxygen atom", false, "Not the modern standard."]] },
    { q: "Which formula is correct?", o: [["ammonium sulfate, {{NH4SO4}}", false, "{{NH4+}} is 1+ and {{SO4^2-}} is 2−, so two ammonium ions: {{(NH4)2SO4}}."], ["calcium hydrogencarbonate, {{Ca(HCO3)2}}", true, "{{Ca^2+}} needs two {{HCO3-}}."], ["zinc nitrate, {{ZnNO3}}", false, "{{Zn^2+}} needs two nitrates: {{Zn(NO3)2}}."], ["silver phosphate, {{AgPO4}}", false, "{{PO4^3-}} needs three {{Ag+}}: {{Ag3PO4}}."]] },
  ],
  gens: {
    ar: () => {
      const el = pick([["Cl", 35, 37], ["Br", 79, 81], ["Cu", 63, 65], ["B", 10, 11], ["Ga", 69, 71], ["Li", 6, 7], ["Rb", 85, 87]]);
      const p = rnd(10, 90, 1), ans = (el[1] * p + el[2] * (100 - p)) / 100;
      return { topic: "relative atomic mass from isotopes", q: `A sample of ${el[0]} is ${p}% $^{${el[1]}}$${el[0]} and ${round(100 - p, 1)}% $^{${el[2]}}$${el[0]}. Calculate its relative atomic mass.`, ans, unit: "", label: "Ar =", tol: 0.003,
        hints: ["Ar is a weighted mean of isotopic masses.", "Multiply each mass by its percentage, add, divide by 100.", `(${el[1]} × ${p} + ${el[2]} × ${round(100 - p, 1)}) / 100`],
        sol: [R`A_r=\frac{${el[1]}\times${p}+${el[2]}\times${round(100 - p, 1)}}{100}=${round(ans, 2)}`], wrongs: [[(el[1] + el[2]) / 2, "That ignores the abundances."], [(el[2] * p + el[1] * (100 - p)) / 100, "You paired the percentages with the wrong isotopes."]] };
    },
    titration: () => {
      const acid = pick([["HCl", 1], ["H2SO4", 2]]), cb = pick([0.100, 0.0950, 0.120, 0.150, 0.200]), Vb = pick([20.0, 25.0, 10.0]), Va = rnd(15, 30, 2);
      const nb = cb * Vb / 1000, na = nb / acid[1], ans = na / (Va / 1000);
      return { topic: "titration calculation", q: `${Vb.toFixed(1)} cm³ of ${cb} mol dm⁻³ NaOH is neutralised by ${Va.toFixed(2)} cm³ of {{${acid[0]}}}. ${acid[1] === 2 ? "{{H2SO4 + 2NaOH -> Na2SO4 + 2H2O}}. " : ""}Calculate the concentration of the acid.`, ans, unit: "mol dm⁻³", label: "c =",
        hints: ["Find moles of NaOH first (n = cV, with V in dm³).", `Use the ratio: ${acid[1] === 2 ? "1 H₂SO₄ : 2 NaOH" : "1 HCl : 1 NaOH"}.`, `n(acid) ÷ (${Va.toFixed(2)}/1000)`],
        sol: [R`n(\text{NaOH})=${cb}\times\frac{${Vb}}{1000}=${tn(nb)}`, R`n(\text{acid})=${tn(nb)}${acid[1] === 2 ? "\\div2" : ""}=${tn(na)}`, R`c=\frac{${tn(na)}}{${Va}/1000}=${tn(ans)}`], wrongs: [[acid[1] === 2 ? nb / (Va / 1000) : 0, "Divide by 2: H₂SO₄ reacts with two NaOH."], [ans * 1000, "Convert cm³ to dm³."]].filter(w => w[0]) };
    },
    gasvol: () => {
      const r = pick([["CaCO3", 100.1, "CO2", 1, 1, "{{CaCO3 + 2HCl -> CaCl2 + H2O + CO2}}"], ["Mg", 24.3, "H2", 1, 1, "{{Mg + 2HCl -> MgCl2 + H2}}"], ["Zn", 65.4, "H2", 1, 1, "{{Zn + H2SO4 -> ZnSO4 + H2}}"], ["NaHCO3", 84.0, "CO2", 2, 1, "{{2NaHCO3 -> Na2CO3 + H2O + CO2}}"], ["C3H8", 44.0, "CO2", 1, 3, "{{C3H8 + 5O2 -> 3CO2 + 4H2O}}"]]);
      const m = rnd(0.5, 6, 2), n = m / r[1] / r[3] * r[4], ans = n * 24.0;
      return { topic: "gas volume from reacting mass", q: `${m} g of {{${r[0]}}} (Mr ${r[1]}) reacts completely: ${r[5]}. What volume of {{${r[2]}}} forms at room temperature and pressure? (1 mol gas = 24.0 dm³)`, ans, unit: "dm³", label: "V =",
        hints: ["Moles of the solid first: n = m/M.", `Ratio ${r[0]} : ${r[2]} = ${r[3]} : ${r[4]}.`, "Multiply moles of gas by 24.0."],
        sol: [R`n=\frac{${m}}{${r[1]}}=${tn(m / r[1])}`, R`n(\text{gas})=${tn(n)}`, R`V=${tn(n)}\times24.0=${tn(ans)}\ \text{dm}^3`], wrongs: [[m / r[1] * 24.0, r[3] !== r[4] ? "Use the mole ratio from the equation." : ""], [ans * 1000, "Answer in dm³, not cm³."]].filter(w => w[1] !== "") };
    },
    yield_: () => {
      const m = rnd(2, 10, 2), theo = m / 46.0 * 88.0, act = round(theo * rnd(0.45, 0.9, 2), 2);
      const ans = act / theo * 100;
      return { topic: "percentage yield", q: `${m} g of ethanol ({{C2H5OH}}, Mr 46.0) is heated with excess ethanoic acid: {{C2H5OH + CH3COOH <=> CH3COOC2H5 + H2O}}. ${act} g of ethyl ethanoate (Mr 88.0) is obtained. Calculate the percentage yield.`, ans, unit: "%", label: "yield =",
        hints: ["Theoretical yield: moles of ethanol × Mr of the ester (1 : 1 ratio).", `${m}/46.0 = ${tn(m / 46)} mol, so at best ${tn(m / 46)} mol of ester.`, "% yield = actual mass ÷ theoretical mass × 100"],
        sol: [R`\text{theoretical}=\frac{${m}}{46.0}\times88.0=${tn(theo)}\ \text{g}`, R`\%=\frac{${act}}{${tn(theo)}}\times100=${tn(ans)}\%`], wrongs: [[act / m * 100, "Compare with the theoretical mass of ester, not the mass of ethanol."]] };
    },
    carbons: () => {
      const n = pick([2, 3, 4, 5, 6, 7, 8]), M = rnd(20, 90, 0), M1 = round(M * 0.011 * n, 1);
      return { topic: "number of carbon atoms from [M+1]", q: `In the mass spectrum of a hydrocarbon, the M peak has relative abundance ${M} and the [M+1] peak has relative abundance ${M1}. How many carbon atoms are in the molecule?`, ans: n, unit: "", label: "n =", tol: 0.06,
        hints: ["[M+1] comes from molecules with one ¹³C atom (1.1% of carbon atoms).", R`$n=\frac{100}{1.1}\times\frac{[M+1]}{M}$`, `(100/1.1) × (${M1}/${M})`],
        sol: [R`n=\frac{100}{1.1}\times\frac{${M1}}{${M}}=${f3(100 / 1.1 * M1 / M)}\approx${n}`], wrongs: [] };
    },
  },
  ex: [
    { q: "Describe how the [M+1] peak in a mass spectrum allows you to find the number of carbon atoms in a molecule.", pts: ["The [M+1] peak is due to molecules containing one ¹³C atom", "¹³C is 1.1% of naturally occurring carbon", "So the [M+1] : M ratio increases with the number of carbon atoms", "n = 100 × abundance of [M+1] ÷ (1.1 × abundance of M)"] },
    { q: "Explain how you would find the value of x in {{MgSO4.xH2O}} by experiment.", pts: ["Weigh a crucible empty, then with the hydrated salt", "Heat, cool, reweigh; repeat until constant mass (all water removed)", "Mass of water = mass before − mass after", "Moles of water ÷ moles of anhydrous {{MgSO4}} gives x"] },
  ],
  traps: ["cm³ → dm³: divide by 1000 before using n = cV.", "Molar gas volume 24.0 dm³ only at room temperature and pressure; otherwise use pV = nRT (Unit 5).", "Empirical formula: divide by Ar, *then* by the smallest. Don't round 1.5 to 2; double everything.", "[M+2] ratios: Cl gives 3 : 1, Br gives 1 : 1.", "Ionic equations: leave out spectator ions and always include state symbols."],
  defs: [["Relative atomic mass, Ar", "The weighted mean mass of the atoms of an element relative to one twelfth of the mass of an atom of carbon-12."], ["Relative isotopic mass", "The mass of an atom of an isotope relative to one twelfth of the mass of an atom of carbon-12."], ["Mole", "The amount of substance containing $6.02\\times10^{23}$ (the Avogadro constant) specified particles."], ["Empirical formula", "The simplest whole-number ratio of the atoms of each element in a compound."], ["Molecular formula", "The actual number of atoms of each element in one molecule of a compound."], ["Water of crystallisation", "Water molecules that form an essential part of the crystal structure of a hydrated salt."]],
});

/* ======================= UNIT 4 ======================= */
const SHAPES = [
  ["CO2", "carbon dioxide", 2, 0, 180, "linear"], ["BeCl2", "beryllium chloride", 2, 0, 180, "linear"], ["BF3", "boron trifluoride", 3, 0, 120, "trigonal planar"], ["CH4", "methane", 4, 0, 109.5, "tetrahedral"], ["NH4+", "the ammonium ion", 4, 0, 109.5, "tetrahedral"], ["NH3", "ammonia", 3, 1, 107, "trigonal pyramidal"], ["H2O", "water", 2, 2, 104.5, "non-linear (bent)"], ["PF5", "phosphorus pentafluoride", 5, 0, 90, "trigonal bipyramidal (90° and 120°)"], ["SF6", "sulfur hexafluoride", 6, 0, 90, "octahedral"], ["SiCl4", "silicon tetrachloride", 4, 0, 109.5, "tetrahedral"], ["BF4-", "the tetrafluoroborate ion", 4, 0, 109.5, "tetrahedral"], ["PCl3", "phosphorus trichloride", 3, 1, 107, "trigonal pyramidal"], ["H3O+", "the oxonium ion", 3, 1, 107, "trigonal pyramidal"], ["AlCl3", "aluminium chloride (gas, monomer)", 3, 0, 120, "trigonal planar"], ["SCl2", "sulfur dichloride", 2, 2, 104.5, "non-linear (bent)"],
];
PX.unit({
  id: "4", n: 4, short: "Chemical bonding", title: "Chemical bonding", strand: "phys", sim: "shapes",
  intents: ["define electronegativity and explain its trends; use electronegativity differences to predict ionic or covalent bonding", "describe ionic, covalent, co-ordinate (dative) and metallic bonding with dot-and-cross diagrams", "describe expanded octets ({{SO2}}, {{PCl5}}, {{SF6}})", "describe σ and π bonds and sp, sp², sp³ hybridisation", "define bond energy and bond length", "explain shapes and bond angles using VSEPR", "describe intermolecular forces (instantaneous dipole–induced dipole, permanent dipole–permanent dipole, hydrogen bonding) and their effect on physical properties"],
  lesson: [
    { t: "predict", h: "Why 104.5°?", body: "Methane, ammonia and water all have four pairs of electrons around the central atom. Methane's bond angle is 109.5°.", q: "Why is water's H–O–H angle smaller, at 104.5°?",
      o: [["Oxygen is smaller than carbon", false, "Atom size isn't what VSEPR uses. It counts electron pairs and how hard they repel."], ["The two lone pairs repel more strongly than bonding pairs and squeeze the bonds together", true, "Lone pairs are held closer to the central atom, so they repel more."], ["Hydrogen bonds pull the hydrogens together", false, "Hydrogen bonds act *between* molecules, not inside one."], ["Water is ionic", false, "O–H is polar covalent."]],
      after: "This one idea, **lone pairs repel more than bonding pairs**, explains almost every bond angle you'll be asked about." },
    { t: "bridge", h: "From IGCSE to AS", igcse: ["Ionic: electrons transferred, giant lattice", "Covalent: shared pairs, dot-and-cross", "Simple molecular vs giant covalent", "Metals: ions in a sea of electrons"],
      as: ["**Electronegativity** decides how equally a pair is shared", "Dative bonds and expanded octets ({{SF6}})", "Orbital overlap: σ and π bonds; sp, sp², sp³", "Shapes from **VSEPR**", "Three kinds of intermolecular force, including hydrogen bonding"],
      note: "\"Weak forces between molecules\" at IGCSE becomes \"which intermolecular force, and why is it stronger here?\" at AS.",
      ask: { q: "Electronegativities: Na 0.9, Cl 3.0, H 2.1, C 2.5. Which bond is most polar?", o: [["C–H", false, "Difference 0.4: nearly non-polar."], ["H–Cl", false, "Difference 0.9: polar, but not the most."], ["Na–Cl", true, "Difference 2.1: so large the bonding is ionic."], ["Cl–Cl", false, "Difference 0: non-polar."]] } },
    { t: "explain", h: "Electronegativity and bond polarity",
      body: R`<p><b>Electronegativity</b> is the power of an atom in a covalent bond to attract the bonding pair of electrons towards itself.</p><ul><li>Increases across a period: more protons, smaller radius, similar shielding.</li><li>Decreases down a group: more shells, more shielding.</li><li>Most electronegative: F (4.0) > O (3.5) > Cl ≈ N (3.0).</li></ul><p>Equal electronegativity: non-polar bond. Small difference: <b>polar covalent</b>, with partial charges δ+ and δ−. Large difference (roughly > 1.8): <b>ionic</b>.</p>`,
      ask: { q: "Why is fluorine more electronegative than chlorine?", o: [["It has more protons", false, "Chlorine has more protons (17 vs 9)."], ["Its bonding electrons are closer to the nucleus and less shielded", true, "Fewer shells, so stronger attraction for the bonding pair."], ["It has more electrons", false, "Fewer, and that wouldn't explain it anyway."], ["It is a gas", false, "Both are gases."]] } },
    { t: "explain", h: "Dative bonds and expanded octets",
      body: R`<p>In a <b>co-ordinate (dative covalent) bond</b>, one atom provides <i>both</i> electrons of the shared pair. Shown with an arrow from donor to acceptor.</p><ul><li>{{NH3 + H+ -> NH4+}}: N's lone pair bonds to {{H+}}.</li><li>{{Al2Cl6}}: a Cl lone pair on each {{AlCl3}} donates into the other Al, which has only 6 outer electrons.</li></ul><p>Period 3 atoms can <b>expand the octet</b> because they have empty 3d orbitals: P in {{PCl5}} has 10 outer electrons; S in {{SF6}} has 12; {{SO2}} has S with two double bonds.</p>`,
      ask: { q: "Which molecule contains a co-ordinate bond?", o: [["{{CH4}}", false, "Each C–H pair has one electron from each atom."], ["{{NH4+}}", true, "One N–H bond formed from N's lone pair and an H⁺ ion. Once formed, all four N–H bonds are identical."], ["{{H2O}}", false, "Normal covalent bonds only."], ["{{NaCl}}", false, "Ionic."]] } },
    { t: "explain", h: "Shapes from VSEPR",
      body: R`<p>Electron pairs around the central atom repel and get as far apart as possible. Repulsion: <b>lone–lone > lone–bond > bond–bond</b>. Each lone pair closes the bond angle by about 2.5°.</p><div class="tbl-wrap"><table class="board"><tr><th>Pairs (bond + lone)</th><th>Shape</th><th>Angle</th><th>Example</th></tr><tr><td>2 + 0</td><td>linear</td><td>180°</td><td>{{CO2}}, {{BeCl2}}</td></tr><tr><td>3 + 0</td><td>trigonal planar</td><td>120°</td><td>{{BF3}}</td></tr><tr><td>4 + 0</td><td>tetrahedral</td><td>109.5°</td><td>{{CH4}}, {{NH4+}}</td></tr><tr><td>3 + 1</td><td>trigonal pyramidal</td><td>107°</td><td>{{NH3}}</td></tr><tr><td>2 + 2</td><td>non-linear</td><td>104.5°</td><td>{{H2O}}</td></tr><tr><td>5 + 0</td><td>trigonal bipyramidal</td><td>90°, 120°</td><td>{{PF5}}</td></tr><tr><td>6 + 0</td><td>octahedral</td><td>90°</td><td>{{SF6}}</td></tr></table></div><p>A double bond counts as one "region" (so {{CO2}} is linear).</p>`,
      sim: { tab: 0, mol: "NH3" }, simLabel: "Spin ammonia in 3D",
      ask: { q: "What is the shape of {{PCl3}}?", o: [["trigonal planar", false, "P has a lone pair as well as three bonds."], ["trigonal pyramidal", true, "3 bonding pairs + 1 lone pair, like NH₃: about 107°."], ["tetrahedral", false, "The electron pairs are tetrahedral, but the *shape* describes atoms only."], ["T-shaped", false, "That needs five pairs."]] } },
    { t: "explain", h: "σ and π bonds, and hybridisation",
      body: R`<ul><li>A <b>σ bond</b> forms by end-on (head-on) overlap of orbitals, along the line between the nuclei.</li><li>A <b>π bond</b> forms by sideways overlap of p orbitals, above and below that line. It's weaker and stops rotation.</li><li>Single = 1σ; double = 1σ + 1π; triple = 1σ + 2π.</li></ul><p><b>Hybridisation</b> mixes s and p orbitals: <b>sp³</b> (4 σ bonds, 109.5°, ethane), <b>sp²</b> (3 σ + 1 π, 120°, ethene), <b>sp</b> (2 σ + 2 π, 180°, HCN, {{N2}}).</p><p><b>Bond length</b> is the distance between two bonded nuclei; <b>bond energy</b> is the energy to break one mole of a bond in the gaseous state. Shorter bonds are usually stronger.</p>`,
      ask: { q: "How many σ and π bonds are in HCN (H–C≡N)?", o: [["2 σ, 2 π", true, "C–H is σ; C≡N is 1σ + 2π."], ["3 σ, 1 π", false, "A triple bond has two π bonds."], ["1 σ, 3 π", false, "Every bond has exactly one σ component."], ["4 σ, 0 π", false, "Triple bonds contain π bonds."]] } },
    { t: "explain", h: "Forces between molecules",
      body: R`<ol><li><b>Instantaneous dipole–induced dipole</b> (London) forces: in all molecules; stronger with more electrons and larger contact area.</li><li><b>Permanent dipole–permanent dipole</b>: between polar molecules (e.g. HCl, propanone).</li><li><b>Hydrogen bonding</b>: H bonded to N, O or F is attracted to a lone pair on N, O or F of another molecule. The strongest of the three.</li></ul><p>Water's hydrogen bonds explain its high boiling point, high surface tension, and why ice is less dense than water (open lattice). <b>Metallic bonding</b>: attraction between positive ions and delocalised electrons.</p>`,
      sim: { tab: 1 }, simLabel: "Compare hydride boiling points",
      ask: { q: "Why does {{H2O}} boil at 100 °C but {{H2S}} at −60 °C?", o: [["The O–H bond is stronger than S–H", false, "Boiling doesn't break covalent bonds."], ["Water molecules form hydrogen bonds with each other; {{H2S}} molecules don't", true, "S isn't electronegative enough. More energy is needed to separate water molecules."], ["{{H2S}} has fewer electrons", false, "{{H2S}} has *more* electrons; that would raise its b.p., not lower it."], ["Water is ionic", false, "Covalent."]] } },
    { t: "worked", h: "Worked example: predicting a shape",
      prob: "Predict the shape and bond angle of the {{BF4-}} ion.",
      steps: [
        { s: R`B has 3 outer electrons. The 1− charge adds one more: 4 electrons. Four F atoms each share one: 8 electrons = 4 pairs.` },
        { s: R`All four pairs are bonding pairs; no lone pairs.`, why: { q: "Why does it matter whether a pair is bonding or lone?", o: [["Lone pairs repel more and change the angle", true, "No lone pairs means a perfect tetrahedron."], ["Lone pairs aren't counted at all", false, "They count for arrangement; they're just invisible in the shape."], ["It doesn't matter", false, "Compare CH₄ (109.5°) with NH₃ (107°)."]] } },
        { s: R`Four bonding pairs repel equally: <b>tetrahedral, 109.5°</b>.` },
      ], after: "Steps: outer electrons of central atom → adjust for charge → add one per bonded atom → halve → split into bonding and lone pairs." },
    { t: "complete", h: "Your turn",
      prob: "Predict the H–N–H bond angle in the ammonium ion, {{NH4+}}.", shown: [R`N has 5 outer electrons, 4 H add 4, the + charge removes 1: 8 electrons, 4 pairs, all bonding.`],
      q: { q: "What is the H–N–H bond angle?", ans: 109.5, unit: "°", label: "angle =", tol: 0.005, hints: ["Four pairs, how many lone?", "Four bonding pairs give the regular shape.", "Same as methane."], sol: ["<p>4 bonding pairs, 0 lone pairs: tetrahedral, 109.5°.</p>"], wrongs: [[107, "That's ammonia, which keeps its lone pair. In NH₄⁺ it bonds to H⁺."], [120, "That's for 3 pairs."]] } },
    { t: "solo", h: "On your own: shapes", gen: "angle" },
  ],
  mcq: [
    { q: "Which molecule is non-polar even though it contains polar bonds?", o: [["{{H2O}}", false, "Bent, so the dipoles don't cancel."], ["{{NH3}}", false, "Pyramidal: dipoles don't cancel."], ["{{CO2}}", true, "Linear and symmetrical: the two C=O dipoles cancel."], ["{{HCl}}", false, "One polar bond, nothing to cancel it."]] },
    { q: "Which substance has hydrogen bonding between its molecules?", o: [["{{CH4}}", false, "C isn't electronegative enough."], ["{{HCl}}", false, "Cl is electronegative but too large; HCl has permanent dipole forces only."], ["{{CH3OH}}", true, "O–H group: H on O, lone pairs on O."], ["{{CH3OCH3}}", false, "No H on O; it can accept hydrogen bonds but not form them with itself."]] },
    { q: "The bond angle in {{SF6}} is:", o: [["90°", true, "Octahedral: six bonding pairs at 90°."], ["109.5°", false, "That's four pairs."], ["120°", false, "That's three pairs in a plane."], ["180°", false, "Opposite bonds are at 180°, but the bond angle quoted is 90°."]] },
    { q: "Why does the boiling point of the noble gases increase down the group?", o: [["Hydrogen bonding increases", false, "Noble gases can't form hydrogen bonds."], ["More electrons, so stronger instantaneous dipole–induced dipole forces", true, "Larger electron clouds are more polarisable."], ["Covalent bonds get stronger", false, "Noble gases are single atoms."], ["Atoms get lighter", false, "They get heavier."]] },
    { q: "Ice is less dense than liquid water because:", o: [["ice molecules move faster", false, "They vibrate less."], ["hydrogen bonds hold molecules in an open lattice", true, "Each molecule makes four hydrogen bonds in a tetrahedral arrangement, leaving gaps."], ["covalent bonds lengthen when water freezes", false, "Intramolecular bonds barely change."], ["ice contains trapped air", false, "Pure ice still floats."]] },
    { q: "The carbon atoms in ethene are:", o: [["sp³ hybridised", false, "That's ethane."], ["sp² hybridised", true, "Three σ bonds at 120° plus one π bond from the leftover p orbital."], ["sp hybridised", false, "That's ethyne."], ["not hybridised", false, "The model uses hybrid orbitals for the σ framework."]] },
    { q: "Which explains why graphite conducts electricity?", o: [["Each C forms four covalent bonds", false, "That's diamond, which doesn't conduct."], ["Each C forms three bonds; one electron per atom is delocalised", true, "Delocalised electrons move along the layers."], ["Weak forces between layers", false, "That explains softness, not conduction."], ["It contains ions", false, "It's covalent."]] },
  ],
  gens: {
    angle: () => {
      const [f, name, bp, lp, ang, shape] = pick(SHAPES);
      return { topic: "VSEPR shape and bond angle", q: `Predict the bond angle in ${name}, {{${f}}}. ${bp === 5 ? "(Give the smallest angle.)" : ""}`, ans: ang, unit: "°", label: "angle =", tol: 0.006,
        hints: ["Count electron pairs around the central atom: its outer electrons, ± charge, plus one per bonded atom; halve.", "Split them into bonding pairs and lone pairs.", `${bp} bonding pair(s) and ${lp} lone pair(s).`],
        sol: [`<p>${bp} bonding + ${lp} lone pairs: ${shape}, ${ang}°.</p>`], wrongs: [[109.5, lp ? "The lone pairs squeeze the angle below 109.5°." : ""], [107, lp === 2 ? "Two lone pairs squeeze it further than one." : ""]].filter(w => w[1] && w[0] !== ang) };
    },
    sigmapi: () => {
      const m = pick([["C2H4", 5, 1], ["C2H2", 3, 2], ["HCN", 2, 2], ["N2", 1, 2], ["CO2", 2, 2], ["C2H6", 7, 0], ["CH3CHO", 6, 1], ["CH2=CHCN", 6, 3], ["C3H6 (propene)", 8, 1], ["HCOOH", 4, 1]]);
      const which = pick(["σ", "π"]), ans = which === "σ" ? m[1] : m[2];
      return { topic: "σ and π bonds", q: `How many ${which} bonds are in one molecule of {{${m[0].replace(/ \(.+\)/, "")}}}${m[0].includes("(") ? " (propene)" : ""}?`, ans, unit: "", label: `${which} bonds =`,
        hints: ["Draw the displayed formula first.", "Every bond has one σ; a double bond adds one π, a triple bond adds two.", `Total bonds: ${m[1]} with ${m[2]} extra π.`],
        sol: [`<p>${m[1]} σ bonds and ${m[2]} π bonds.</p>`], wrongs: [[which === "σ" ? m[1] + m[2] : m[1], "Separate σ from π: a double bond is 1σ + 1π."]] };
    },
  },
  ex: [
    { q: "Explain why the boiling point of {{HF}} is much higher than that of {{HCl}}.", pts: ["HF molecules form hydrogen bonds with each other", "F is highly electronegative and small, H–F is very polar; F has lone pairs", "HCl has only permanent dipole–dipole and id–id forces", "Hydrogen bonds are stronger, so more energy is needed to separate HF molecules"] },
    { q: "Describe the bonding in {{Al2Cl6}}.", pts: ["Two {{AlCl3}} units join (dimerise)", "A chlorine atom on each unit donates a lone pair to the aluminium of the other", "Forming two co-ordinate (dative covalent) bonds", "Each Al then has 8 outer electrons / tetrahedral arrangement"] },
    { q: "Explain, in terms of VSEPR, why the bond angle in {{NH3}} is 107°.", pts: ["N has four electron pairs: three bonding pairs and one lone pair", "Electron pairs repel to get as far apart as possible (tetrahedral arrangement)", "Lone pair–bond pair repulsion is greater than bond pair–bond pair", "So the H–N–H angle is reduced from 109.5° to about 107°"] },
  ],
  traps: ["Boiling a simple molecular substance breaks *intermolecular* forces, never covalent bonds.", "Hydrogen bonding needs H bonded to N, O or F, *and* a lone pair on N, O or F of another molecule.", "Name the force precisely: \"instantaneous dipole–induced dipole\", not \"van der Waals\" or \"weak forces\".", "A shape describes atoms only: NH₃ is pyramidal, not tetrahedral.", "Polar bonds don't guarantee a polar molecule: {{CO2}}, {{BF3}}, {{CCl4}} are non-polar."],
  defs: [["Electronegativity", "The power of an atom in a covalent bond to attract the bonding pair of electrons towards itself."], ["Co-ordinate (dative covalent) bond", "A covalent bond in which both electrons of the shared pair come from the same atom."], ["Bond energy", "The energy needed to break one mole of a particular covalent bond in the gaseous state."], ["Bond length", "The distance between the nuclei of two covalently bonded atoms."], ["Hydrogen bond", "An attraction between a lone pair on an electronegative atom (N, O or F) and a hydrogen atom bonded to another electronegative atom (N, O or F)."], ["Metallic bonding", "The electrostatic attraction between positive metal ions and delocalised electrons."], ["σ bond", "A covalent bond formed by end-on (head-on) overlap of orbitals, with electron density along the line between the nuclei."], ["π bond", "A covalent bond formed by sideways overlap of p orbitals, with electron density above and below the line between the nuclei."]],
});

/* ======================= UNIT 5 ======================= */
PX.unit({
  id: "5", n: 5, short: "States of matter", title: "States of matter", strand: "phys", sim: "gas",
  intents: ["explain gas pressure in terms of collisions with the container walls", "state that ideal gases have zero particle volume and no intermolecular forces", "use $pV=nRT$, including finding relative molecular mass", "describe giant ionic, simple molecular, giant molecular and giant metallic lattices", "describe, interpret and predict how structure and bonding affect melting point, conductivity and solubility"],
  lesson: [
    { t: "predict", h: "Heating a sealed can", body: "A sealed can of gas is heated from 27 °C to 327 °C. The volume can't change.", q: "What happens to the pressure?",
      o: [["It goes up about 12 times (327 ÷ 27)", false, "Gas laws use kelvin. 27 °C = 300 K; 327 °C = 600 K."], ["It doubles", true, "300 K → 600 K: absolute temperature doubles, so pressure doubles."], ["It stays the same because the volume is fixed", false, "Faster molecules hit the walls harder and more often."], ["It halves", false, "Hotter gas pushes harder."]],
      after: "Always convert to kelvin: $T/\\text{K} = \\theta/°\\text{C} + 273$." },
    { t: "bridge", h: "From IGCSE to AS", igcse: ["Particle model of solids, liquids and gases", "Gas pressure from particles hitting walls", "Giant ionic, simple molecular and giant covalent structures"],
      as: ["**Ideal gas** assumptions and when real gases deviate", "The ideal gas equation $pV = nRT$ in SI units", "Lattices: {{NaCl}}, {{MgO}}, {{I2}}, {{C60}}, ice, {{SiO2}}, graphite, diamond, copper", "Predicting properties from bonding"],
      note: "IGCSE described; AS calculates. The new tool is one equation, and nearly every mistake with it is a unit.",
      ask: { q: "Which is the correct SI unit set for $pV = nRT$?", o: [["p in Pa, V in m³, T in K", true, "With R = 8.31 J K⁻¹ mol⁻¹."], ["p in kPa, V in dm³, T in °C", false, "kPa × dm³ happens to work (both ×10³ apart), but T must be in kelvin."], ["p in atm, V in cm³, T in K", false, "Not consistent with R = 8.31."], ["p in Pa, V in dm³, T in K", false, "V must be in m³: 1 dm³ = 10⁻³ m³."]] } },
    { t: "explain", h: "Ideal gases, and why real ones misbehave",
      body: R`<p>An <b>ideal gas</b> obeys $pV=nRT$ exactly. The model assumes:</p><ul><li>molecules have <b>zero volume</b>;</li><li>there are <b>no intermolecular forces</b>;</li><li>collisions are elastic, and motion is random.</li></ul><p>Real gases are closest to ideal at <b>high temperature and low pressure</b> (molecules far apart and fast). They deviate at high pressure (molecular volume matters) and low temperature (attractions matter). Polar molecules like {{NH3}} deviate more than {{He}}.</p>`,
      sim: { T: 300, V: 3, n: 1 }, simLabel: "Watch the molecules",
      ask: { q: "Under which conditions does a gas behave most ideally?", o: [["low T, high p", false, "Molecules crowd together and attract: least ideal."], ["high T, low p", true, "Far apart and fast: volume and attractions don't matter."], ["high T, high p", false, "High pressure squeezes molecules close."], ["low T, low p", false, "Low T lets attractions matter."]] } },
    { t: "explain", h: "Using pV = nRT",
      body: R`<div class="callout key">$$pV=nRT\qquad R=8.31\ \text{J K}^{-1}\text{mol}^{-1}$$</div><ul><li>p in <b>Pa</b> (1 kPa = 1000 Pa)</li><li>V in <b>m³</b> (1 dm³ = $10^{-3}$ m³; 1 cm³ = $10^{-6}$ m³)</li><li>T in <b>K</b> (add 273)</li></ul><p>To find $M_r$ of a volatile liquid, measure the mass $m$ of vapour in volume V at known p and T: $$M_r=\frac{mRT}{pV}$$</p>`,
      ask: { q: "What is 250 cm³ in m³?", o: [["0.250 m³", false, "That's dm³."], ["$2.50\\times10^{-4}$ m³", true, "250 × 10⁻⁶ = 2.50 × 10⁻⁴."], ["$2.50\\times10^{-1}$ m³", false, "Divide by a million, not a thousand."], ["$2.50\\times10^{5}$ m³", false, "m³ is much bigger than cm³, so the number gets smaller."]] } },
    { t: "explain", h: "Lattices: four kinds of solid",
      body: R`<div class="tbl-wrap"><table class="board"><tr><th>Structure</th><th>Examples</th><th>Particles held by</th><th>m.p.</th><th>Conducts?</th></tr><tr><td>giant ionic</td><td>{{NaCl}}, {{MgO}}</td><td>ionic bonds</td><td>high</td><td>when molten or dissolved</td></tr><tr><td>simple molecular</td><td>{{I2}}, {{C60}}, ice</td><td>weak intermolecular forces</td><td>low</td><td>no</td></tr><tr><td>giant molecular</td><td>diamond, graphite, {{SiO2}}</td><td>covalent bonds throughout</td><td>very high</td><td>graphite only</td></tr><tr><td>giant metallic</td><td>{{Cu}}</td><td>metallic bonding</td><td>usually high</td><td>yes, solid and liquid</td></tr></table></div><p>{{MgO}} has a higher m.p. than {{NaCl}}: {{Mg^2+}} and {{O^2-}} have double charges and are smaller, so the attraction is stronger. Graphene is a single layer of graphite; nanotubes are rolled graphene; {{C60}} (buckminsterfullerene) is simple molecular.</p>`,
      ask: { q: "Iodine sublimes easily on gentle warming. What does this tell you?", o: [["The I–I covalent bond is weak", false, "Sublimation doesn't break I–I bonds; the I₂ molecules stay intact."], ["Iodine is a simple molecular solid with weak forces between molecules", true, "Only weak id–id forces need to be overcome."], ["Iodine is a giant covalent lattice", false, "Giant lattices have very high melting points."], ["Iodine is ionic", false, "I₂ is a non-polar covalent molecule."]] } },
    { t: "worked", h: "Worked example: finding Mr",
      prob: "0.120 g of a volatile liquid vaporises to occupy 50.0 cm³ at 100 °C and 101 kPa. Calculate its Mr.",
      steps: [
        { s: R`Convert: $p=101\,000$ Pa; $V=50.0\times10^{-6}=5.00\times10^{-5}$ m³; $T=373$ K.`, why: { q: "Why convert before substituting?", o: [["R = 8.31 is in SI units, so p, V and T must be too", true, "Mixed units are the commonest way to lose these marks."], ["To make the numbers smaller", false, "The aim is consistency, not size."], ["Only the temperature needs converting", false, "All three do."]] } },
        { s: R`$n=\dfrac{pV}{RT}=\dfrac{101000\times5.00\times10^{-5}}{8.31\times373}=1.63\times10^{-3}$ mol` },
        { s: R`$M_r=\dfrac{m}{n}=\dfrac{0.120}{1.63\times10^{-3}}=73.7$` },
      ], after: "Sense check: 74 could be butan-1-ol (C₄H₁₀O = 74). Reasonable for a volatile liquid." },
    { t: "complete", h: "Your turn",
      prob: "What volume does 0.0500 mol of an ideal gas occupy at 298 K and 100 kPa?", shown: [R`$V=\dfrac{nRT}{p}=\dfrac{0.0500\times8.31\times298}{100\,000}$`],
      q: { q: "Give V in dm³.", ans: 1.238, unit: "dm³", label: "V =", hints: ["Work out V in m³ first.", "nRT/p = 1.24 × 10⁻³ m³.", "×1000 to get dm³."], sol: [R`V=1.24\times10^{-3}\ \text{m}^3=1.24\ \text{dm}^3`], wrongs: [[1.238e-3, "That's in m³. Multiply by 1000 for dm³."], [1238, "That's cm³."]] } },
    { t: "solo", h: "On your own: gas calculations", gen: "gasMr" },
  ],
  mcq: [
    { q: "Which assumption is part of the ideal gas model?", o: [["Molecules attract each other weakly", false, "Ideal gases have no intermolecular forces."], ["Molecules have negligible volume", true, "Zero particle volume compared with the container."], ["Collisions lose energy", false, "Collisions are elastic."], ["Molecules move in straight lines along the walls", false, "Motion is random."]] },
    { q: "Which substance has a giant molecular structure?", o: [["{{I2}}", false, "Simple molecular."], ["{{SiO2}}", true, "Each Si bonded to four O, each O to two Si, throughout the crystal."], ["{{NaCl}}", false, "Giant ionic."], ["{{C60}}", false, "Simple molecular (fullerene)."]] },
    { q: "Why does {{MgO}} have a higher melting point than {{NaCl}}?", o: [["{{MgO}} is covalent", false, "Both are ionic."], ["{{Mg^2+}} and {{O^2-}} have higher charges and smaller radii, so stronger attraction", true, "Stronger electrostatic forces need more energy to overcome."], ["{{MgO}} has hydrogen bonds", false, "No hydrogen at all."], ["Mg is heavier than Na", false, "Mass isn't the cause."]] },
    { q: "At constant pressure, the volume of a fixed mass of gas is doubled. The kelvin temperature must have:", o: [["halved", false, "V ∝ T at constant p."], ["doubled", true, "pV = nRT: V doubles when T doubles."], ["stayed the same", false, "Then V would stay the same."], ["quadrupled", false, "The relationship is direct, not squared."]] },
    { q: "Which solid conducts electricity when solid AND when molten?", o: [["{{NaCl}}", false, "Ions are fixed in the solid."], ["copper", true, "Delocalised electrons move in both states."], ["diamond", false, "No mobile charge carriers."], ["iodine", false, "Neutral molecules."]] },
  ],
  gens: {
    gasMr: () => {
      const Mrv = pick([58.1, 46.1, 74.1, 60.1, 88.1, 32.0, 72.2, 86.2]), V = pick([40.0, 50.0, 60.0, 80.0, 100.0]), Tc = pick([90, 100, 110, 120]), p = pick([100, 101, 102]);
      const n = p * 1000 * V * 1e-6 / (8.31 * (Tc + 273)), m = round(n * Mrv, 3), ans = m * 8.31 * (Tc + 273) / (p * 1000 * V * 1e-6);
      return { topic: "relative molecular mass from gas data", q: `${m} g of a volatile liquid vaporises to give ${V.toFixed(1)} cm³ of gas at ${Tc} °C and ${p} kPa. Calculate its Mr. (R = 8.31 J K⁻¹ mol⁻¹)`, ans, unit: "", label: "Mr =",
        hints: ["Convert to SI: Pa, m³, K.", `p = ${p * 1000} Pa, V = ${V}×10⁻⁶ m³, T = ${Tc + 273} K.`, "Mr = mRT/(pV)"],
        sol: [R`M_r=\frac{mRT}{pV}=\frac{${m}\times8.31\times${Tc + 273}}{${p * 1000}\times${V}\times10^{-6}}=${f3(ans)}`], wrongs: [[ans * 1000, "Volume in m³: cm³ × 10⁻⁶."], [ans / 1000, "Volume in m³: cm³ × 10⁻⁶, not dm³."], [m * 8.31 * Tc / (p * 1000 * V * 1e-6), "Temperature in kelvin."]] };
    },
    gasV: () => {
      const n = rnd(0.02, 0.5, 3), T = pick([273, 298, 300, 350, 400]), p = pick([100, 101, 150, 200, 50]);
      const ans = n * 8.31 * T / (p * 1000) * 1000;
      return { topic: "ideal gas volume", q: `Calculate the volume, in dm³, of ${n} mol of an ideal gas at ${T} K and ${p} kPa.`, ans, unit: "dm³", label: "V =",
        hints: ["V = nRT/p with p in Pa gives V in m³.", `p = ${p * 1000} Pa.`, "Multiply the m³ answer by 1000."],
        sol: [R`V=\frac{${n}\times8.31\times${T}}{${p * 1000}}=${tn(ans / 1000)}\ \text{m}^3=${tn(ans)}\ \text{dm}^3`], wrongs: [[ans / 1000, "That's m³; convert to dm³."], [ans * 1000, "Check the kPa → Pa conversion."]] };
    },
  },
  ex: [
    { q: "Explain why real gases deviate from ideal behaviour at high pressure and low temperature.", pts: ["At high pressure, molecules are close together", "So the volume of the molecules is not negligible compared with the container", "At low temperature, molecules move slowly", "So intermolecular attractions become significant (reduce pressure)"] },
    { q: "Explain why graphite conducts electricity but diamond does not.", pts: ["In graphite each C is covalently bonded to three others", "The fourth outer electron is delocalised (between layers / along layers)", "Delocalised electrons can move and carry charge", "In diamond all four outer electrons are used in bonds, so none are free"] },
  ],
  traps: ["Kelvin, always: add 273 to °C.", "V in m³: dm³ × 10⁻³, cm³ × 10⁻⁶.", "Melting a simple molecular solid breaks intermolecular forces, not covalent bonds.", "Ionic compounds conduct only when molten or in solution, when ions are mobile. Say \"ions\", not \"electrons\"."],
  defs: [["Ideal gas", "A gas that obeys pV = nRT exactly: its molecules have zero volume and there are no intermolecular forces between them."], ["Lattice", "A regular, repeating three-dimensional arrangement of particles in a crystalline solid."], ["Giant molecular (covalent) structure", "A lattice in which atoms are held together by covalent bonds throughout the whole structure."]],
});

/* ======================= UNIT 6 ======================= */
const BE = { "H-H": 436, "Cl-Cl": 242, "H-Cl": 431, "C-H": 410, "O=O": 496, "C=O": 805, "O-H": 460, "C-C": 350, "C=C": 610, "Br-Br": 193, "H-Br": 366, "C-Cl": 340, "N≡N": 944, "N-H": 390, "C-Br": 280, "I-I": 151, "H-I": 299, "F-F": 158, "H-F": 562 };
PX.chem.BE = BE;
PX.unit({
  id: "6", n: 6, short: "Enthalpy changes", title: "Enthalpy changes", strand: "phys", sim: "energy",
  intents: ["use ΔH for exothermic (negative) and endothermic (positive) reactions; draw reaction pathway diagrams with activation energy", "define standard conditions and the standard enthalpy changes of reaction, formation, combustion and neutralisation", "explain energy transfers in terms of breaking and making bonds; use (average) bond energies", "calculate enthalpy changes from experiments using $q = mc\\Delta T$", "use Hess's law and energy cycles"],
  lesson: [
    { t: "predict", h: "Breaking bonds", body: "In any reaction, some bonds in the reactants break and new bonds form in the products.", q: "Breaking a chemical bond is…",
      o: [["exothermic: it releases energy", false, "A very common misconception. Energy is needed to pull atoms apart."], ["endothermic: it needs energy", true, "Bond breaking always takes in energy. Bond making always releases it."], ["sometimes one, sometimes the other", false, "Breaking is always endothermic; the overall reaction can be either."]],
      after: "A reaction is exothermic when **more energy is released making new bonds than is taken in breaking old ones**." },
    { t: "bridge", h: "From IGCSE to AS", igcse: ["Exothermic gives out heat; endothermic takes in heat", "Energy level diagrams", "Bond energy calculations", "ΔH negative = exothermic"],
      as: ["**Standard conditions**: 298 K, 101 kPa, 1 mol dm⁻³", "Precise definitions: ΔHf, ΔHc, ΔHneut, ΔHr", "Calorimetry: $q = mc\\Delta T$", "**Hess's law** cycles for reactions you can't measure", "Bond energies are often **averages**"],
      note: "Definitions are worth easy marks at AS. Learn them word for word, including \"under standard conditions\" and the states.",
      ask: { q: "What are standard conditions?", o: [["298 K and 101 kPa (solutions 1 mol dm⁻³)", true, "That's the ⦵ in ΔH⦵."], ["273 K and 101 kPa", false, "That's s.t.p. for gases, not thermochemical standard conditions."], ["298 K and 1 kPa", false, "Pressure is 101 kPa (1 atmosphere)."], ["Room temperature, any pressure", false, "Both temperature and pressure are fixed."]] } },
    { t: "explain", h: "Enthalpy change and pathway diagrams",
      body: R`<p>$\Delta H$ is the heat energy change at constant pressure. Exothermic: products lower than reactants, $\Delta H<0$. Endothermic: $\Delta H>0$.</p><p>A <b>reaction pathway diagram</b> plots enthalpy against reaction progress. The hump is the <b>activation energy</b> $E_a$: the minimum energy colliding particles need to react.</p>`,
      sim: { tab: 0, dH: -90, Ea: 120 }, simLabel: "Draw an exothermic profile",
      ask: { q: "On a pathway diagram for an endothermic reaction, the products are…", o: [["below the reactants", false, "That's exothermic."], ["above the reactants", true, "Energy was taken in, so the products have more enthalpy."], ["at the same level", false, "Then ΔH = 0."], ["at the top of the hump", false, "That's the transition state."]] } },
    { t: "explain", h: "The standard enthalpy definitions",
      body: R`<ul><li><b>$\Delta H_r^\ominus$ (reaction)</b>: enthalpy change when the amounts shown in the equation react under standard conditions.</li><li><b>$\Delta H_f^\ominus$ (formation)</b>: one mole of a compound formed from its <b>elements in their standard states</b>. {{H2(g) + 1/2O2(g) -> H2O(l)}}. ΔHf of an element = 0.</li><li><b>$\Delta H_c^\ominus$ (combustion)</b>: one mole of a substance burned completely in oxygen. {{CH4(g) + 2O2(g) -> CO2(g) + 2H2O(l)}}.</li><li><b>$\Delta H_{neut}^\ominus$ (neutralisation)</b>: one mole of water formed by reaction of an acid with an alkali.</li></ul><p>All under standard conditions, all substances in their standard states.</p>`,
      ask: { q: "Which equation represents the standard enthalpy change of formation of ethanol?", o: [["{{2C(s) + 3H2(g) + 1/2O2(g) -> C2H5OH(l)}}", true, "One mole of product, from elements in their standard states."], ["{{2C(g) + 6H(g) + O(g) -> C2H5OH(l)}}", false, "The elements must be in their standard states: C(s), H₂(g), O₂(g)."], ["{{C2H4(g) + H2O(g) -> C2H5OH(l)}}", false, "Formation is from elements, not compounds."], ["{{4C(s) + 6H2(g) + O2(g) -> 2C2H5OH(l)}}", false, "Must be exactly one mole of product."]] } },
    { t: "explain", h: "Measuring it: q = mcΔT",
      body: R`<div class="callout key">$$q=mc\Delta T\qquad\Delta H=-\frac{q}{n}$$</div><p>$m$ = mass of solution or water heated (assume 1.00 g per cm³), $c$ = 4.18 J g⁻¹ K⁻¹, $\Delta T$ = temperature change. Divide by the moles of the limiting reactant, and add the sign: a temperature <b>rise</b> means exothermic, so $\Delta H$ is <b>negative</b>.</p><p>Results are usually less exothermic than data-book values because of heat losses to the surroundings, incomplete combustion, and heat absorbed by the container.</p>`,
      sim: { tab: 1 }, simLabel: "Open the calorimeter",
      ask: { q: "50.0 cm³ of solution warms by 4.0 K. How much heat is released? (c = 4.18 J g⁻¹ K⁻¹)", o: [["836 J", true, "50.0 × 4.18 × 4.0 = 836 J."], ["209 J", false, "Multiply by ΔT, don't divide."], ["0.836 J", false, "836 J is 0.836 kJ, not J."], ["16.7 J", false, "Use the mass of solution, 50.0 g."]] } },
    { t: "explain", h: "Hess's law",
      body: R`<p><b>Hess's law</b>: the total enthalpy change for a reaction is independent of the route taken, provided the initial and final conditions are the same.</p><div class="callout key">From formation data: $\Delta H_r=\sum\Delta H_f(\text{products})-\sum\Delta H_f(\text{reactants})$<br>From combustion data: $\Delta H_r=\sum\Delta H_c(\text{reactants})-\sum\Delta H_c(\text{products})$</div><p>Draw the cycle: reactants → products along the top; both down (or up) to the common set of substances (elements for ΔHf, combustion products for ΔHc). Go round the cycle, reversing signs when you go against an arrow.</p>`,
      sim: { tab: 2 }, simLabel: "Step through a Hess cycle",
      ask: { q: "ΔHf: {{CO2}} −394, {{H2O(l)}} −286, {{C2H4}} +52 kJ mol⁻¹. What is ΔHc of ethene? ({{C2H4 + 3O2 -> 2CO2 + 2H2O}})", o: [["−1412 kJ mol⁻¹", true, "2(−394) + 2(−286) − (+52) = −1360 − 52 = −1412."], ["−1308 kJ mol⁻¹", false, "Subtract ΔHf of ethene (+52); don't add it."], ["−628 kJ mol⁻¹", false, "Multiply by the coefficients (2 each)."], ["+1412 kJ mol⁻¹", false, "Combustion is exothermic."]] } },
    { t: "explain", h: "Bond energies",
      body: R`<div class="callout key">$$\Delta H_r=\sum E(\text{bonds broken})-\sum E(\text{bonds formed})$$</div><p>Many values are <b>average</b> bond energies, averaged over many compounds (the C–H in methane differs slightly from C–H in ethanol). Some are exact, like H–H and Cl–Cl, which only occur in one molecule. Bond energies also refer to <b>gases</b>; if a substance is liquid (water), the answer differs from Hess values. So bond-energy answers are approximate.</p>`,
      ask: { q: "Use H–H 436, Cl–Cl 242, H–Cl 431 kJ mol⁻¹ to find ΔH for {{H2 + Cl2 -> 2HCl}}.", o: [["−184 kJ mol⁻¹", true, "(436 + 242) − 2 × 431 = 678 − 862 = −184."], ["+184 kJ mol⁻¹", false, "Broken − formed; forming bonds releases more, so negative."], ["+247 kJ mol⁻¹", false, "You made only one H–Cl bond; there are two."], ["−1109 kJ mol⁻¹", false, "Bonds broken are positive, bonds formed negative; you added them."]] } },
    { t: "worked", h: "Worked example: calorimetry",
      prob: "50.0 cm³ of 1.00 mol dm⁻³ HCl is mixed with 50.0 cm³ of 1.00 mol dm⁻³ NaOH. The temperature rises by 6.8 K. Calculate ΔH of neutralisation.",
      steps: [
        { s: R`$q=mc\Delta T=100\times4.18\times6.8=2842$ J`, why: { q: "Why is m = 100 g, not 50 g?", o: [["Both solutions are heated: 50.0 + 50.0 cm³ ≈ 100 g", true, "The whole mixture warms up."], ["Because NaOH is heavier", false, "We assume density 1.00 g cm⁻³ for both."], ["It's always 100 g", false, "Only here, by coincidence."]] } },
        { s: R`$n(\text{H}_2\text{O})=1.00\times\dfrac{50.0}{1000}=0.0500$ mol` },
        { s: R`$\Delta H=-\dfrac{2842}{0.0500}=-56\,840$ J mol⁻¹ $=-56.8$ kJ mol⁻¹` },
      ], after: "Data book: −57.1 kJ mol⁻¹. The difference comes from heat losses." },
    { t: "complete", h: "Your turn: a Hess cycle",
      prob: "Calculate ΔHf of propane, {{3C(s) + 4H2(g) -> C3H8(g)}}, from ΔHc: C −394, {{H2}} −286, {{C3H8}} −2219 kJ mol⁻¹.",
      shown: [R`Using combustion data: $\Delta H_f=\sum\Delta H_c(\text{reactants})-\sum\Delta H_c(\text{products})$`, R`$=[3(-394)+4(-286)]-(-2219)$`],
      q: { q: "What is ΔHf of propane?", ans: -107, unit: "kJ mol⁻¹", label: "ΔHf =", hints: ["Reactants: 3 C and 4 H₂.", "3(−394) = −1182; 4(−286) = −1144.", "−2326 − (−2219)"], sol: [R`\Delta H_f=(-1182-1144)+2219=-107\ \text{kJ mol}^{-1}`], wrongs: [[107, "Reactants minus products for combustion data; check the sign."], [-4545, "Subtract ΔHc of propane, don't add it."]] } },
    { t: "solo", h: "On your own: enthalpy calculations", gen: "calor" },
  ],
  mcq: [
    { q: "Which enthalpy change is always negative?", o: [["formation", false, "Some compounds have positive ΔHf (e.g. {{C2H4}}, +52)."], ["combustion", true, "Burning always releases energy."], ["reaction", false, "Can be either sign."], ["bond breaking", false, "Always positive."]] },
    { q: "Why are bond-energy calculations less accurate than Hess calculations from ΔHf data?", o: [["Bond energies are average values", true, "Actual bond strengths vary with the molecule."], ["Bond energies ignore activation energy", false, "ΔH doesn't involve Ea."], ["Hess's law only works for gases", false, "It works for any states."], ["Bond energies are measured at 0 K", false, "That isn't the reason."]] },
    { q: "Experimental ΔHc values found with a spirit burner are usually less negative than data-book values because:", o: [["heat is lost to the surroundings", true, "Not all the energy released heats the water."], ["the fuel burns completely", false, "Incomplete combustion would make it *less* exothermic, which is the observation, but complete combustion isn't a cause."], ["the water absorbs too much heat", false, "Heat absorbed by water is what we measure."], ["ΔT is too large", false, "A large ΔT reduces percentage error."]] },
    { q: "The standard enthalpy change of formation of {{O2(g)}} is:", o: [["−249 kJ mol⁻¹", false, "Elements in their standard states have ΔHf = 0."], ["0", true, "Forming an element from itself involves no change."], ["+498 kJ mol⁻¹", false, "That's the O=O bond energy."], ["undefined", false, "It's defined as zero."]] },
    { q: "In a reaction pathway diagram, the activation energy is measured from:", o: [["reactants to products", false, "That's ΔH."], ["reactants to the top of the hump", true, "The barrier the reactants must climb."], ["products to the top of the hump", false, "That's Ea for the reverse reaction."], ["zero to the reactants", false, "Absolute enthalpy isn't measured."]] },
    { q: "Hess's law is a consequence of:", o: [["conservation of energy", true, "If two routes gave different ΔH, you could create energy by cycling."], ["conservation of mass", false, "That's about atoms, not energy."], ["Le Chatelier's principle", false, "That's about equilibria."], ["the ideal gas law", false, "Unrelated."]] },
  ],
  gens: {
    calor: () => {
      const V = pick([25.0, 50.0, 100.0]), c = pick([0.500, 1.00, 2.00]), dT = round(6.83 * c * rnd(0.86, 0.98, 3), 1), Vt = V * 2;
      const q = Vt * 4.18 * dT, n = c * V / 1000, ans = -q / n / 1000;
      return { topic: "enthalpy change from a temperature rise", q: `${V.toFixed(1)} cm³ of ${c.toFixed(2)} mol dm⁻³ HCl is mixed with ${V.toFixed(1)} cm³ of ${c.toFixed(2)} mol dm⁻³ NaOH. The temperature rises by ${dT} K. Calculate the enthalpy change of neutralisation in kJ mol⁻¹. (c = 4.18 J g⁻¹ K⁻¹; density 1.00 g cm⁻³)`, ans, unit: "kJ mol⁻¹", label: "ΔH =",
        hints: [`q = mcΔT, where m is the total mass of solution (${Vt} g).`, `n(H₂O) = ${c} × ${V}/1000.`, "ΔH = −q/n, then J → kJ. A temperature rise means a negative ΔH."],
        sol: [R`q=${Vt}\times4.18\times${dT}=${round(q, 0)}\ \text{J}`, R`n=${tn(n)}\ \text{mol}`, R`\Delta H=-\frac{${round(q, 0)}}{${tn(n)}}=${tn(ans)}\ \text{kJ mol}^{-1}`], wrongs: [[-ans, "Temperature rose, so the reaction is exothermic: negative."], [ans / 2, "Use the total volume of both solutions for m."], [ans * 1000, "Convert J to kJ."]] };
    },
    hessF: () => {
      const r = pick([
        ["{{CH4 + 2O2 -> CO2 + 2H2O}}", [[-75, 1]], [[-394, 1], [-286, 2]], "ΔHc of methane", "ΔHf: {{CH4}} −75, {{CO2}} −394, {{H2O(l)}} −286"],
        ["{{C2H5OH + 3O2 -> 2CO2 + 3H2O}}", [[-277, 1]], [[-394, 2], [-286, 3]], "ΔHc of ethanol", "ΔHf: {{C2H5OH}} −277, {{CO2}} −394, {{H2O(l)}} −286"],
        ["{{2NaHCO3 -> Na2CO3 + H2O + CO2}}", [[-951, 2]], [[-1131, 1], [-286, 1], [-394, 1]], "ΔHr", "ΔHf: {{NaHCO3}} −951, {{Na2CO3}} −1131, {{H2O(l)}} −286, {{CO2}} −394"],
        ["{{Fe2O3 + 3CO -> 2Fe + 3CO2}}", [[-824, 1], [-111, 3]], [[0, 2], [-394, 3]], "ΔHr", "ΔHf: {{Fe2O3}} −824, {{CO}} −111, {{CO2}} −394"],
        ["{{C2H4 + H2 -> C2H6}}", [[52, 1]], [[-85, 1]], "ΔHr", "ΔHf: {{C2H4}} +52, {{C2H6}} −85"],
      ]);
      const sp = r[2].reduce((s, [v, k]) => s + v * k, 0), sr = r[1].reduce((s, [v, k]) => s + v * k, 0), ans = sp - sr;
      return { topic: "Hess's law with formation data", q: `Use the data to calculate ${r[3]} for ${r[0]}. ${r[4]} kJ mol⁻¹.`, ans, unit: "kJ mol⁻¹", label: "ΔH =", tol: 0.005,
        hints: ["ΔHr = ΣΔHf(products) − ΣΔHf(reactants).", "Multiply each ΔHf by its coefficient. Elements have ΔHf = 0.", `Products: ${sp}; reactants: ${sr}.`],
        sol: [R`\Delta H=(${sp})-(${sr})=${ans}\ \text{kJ mol}^{-1}`], wrongs: [[-ans, "Products minus reactants for formation data."], [r[2].reduce((s, [v]) => s + v, 0) - r[1].reduce((s, [v]) => s + v, 0), "Multiply by the coefficients in the equation."]].filter(w => w[0] !== ans) };
    },
    bonds: () => {
      const r = pick([
        ["{{CH4 + 2O2 -> CO2 + 2H2O}} (all gases)", { "C-H": 4, "O=O": 2 }, { "C=O": 2, "O-H": 4 }],
        ["{{H2 + Br2 -> 2HBr}}", { "H-H": 1, "Br-Br": 1 }, { "H-Br": 2 }],
        ["{{C2H4 + H2 -> C2H6}}", { "C=C": 1, "H-H": 1 }, { "C-C": 1, "C-H": 2 }],
        ["{{N2 + 3H2 -> 2NH3}}", { "N≡N": 1, "H-H": 3 }, { "N-H": 6 }],
        ["{{CH4 + Cl2 -> CH3Cl + HCl}}", { "C-H": 1, "Cl-Cl": 1 }, { "C-Cl": 1, "H-Cl": 1 }],
        ["{{C2H4 + Br2 -> C2H4Br2}}", { "C=C": 1, "Br-Br": 1 }, { "C-C": 1, "C-Br": 2 }],
        ["{{H2 + F2 -> 2HF}}", { "H-H": 1, "F-F": 1 }, { "H-F": 2 }],
      ]);
      const b = Object.entries(r[1]).reduce((s, [k, n]) => s + BE[k] * n, 0), f = Object.entries(r[2]).reduce((s, [k, n]) => s + BE[k] * n, 0), ans = b - f;
      const keys = [...new Set([...Object.keys(r[1]), ...Object.keys(r[2])])];
      return { topic: "enthalpy change from bond energies", q: `Use bond energies (kJ mol⁻¹: ${keys.map(k => `${k} ${BE[k]}`).join(", ")}) to calculate ΔH for ${r[0]}.`, ans, unit: "kJ mol⁻¹", label: "ΔH =", tol: 0.01,
        hints: ["Draw displayed formulas and list every bond broken and formed.", `Bonds broken: ${Object.entries(r[1]).map(([k, n]) => `${n} × ${k}`).join(", ")}.`, `Broken = ${b}; formed = ${f}. ΔH = broken − formed.`],
        sol: [R`\Delta H=${b}-${f}=${ans}\ \text{kJ mol}^{-1}`], wrongs: [[-ans, "Broken minus formed, not the other way."]] };
    },
  },
  ex: [
    { q: "Define standard enthalpy change of combustion and explain why experimental values are often less exothermic than data-book values.", pts: ["Enthalpy change when one mole of a substance is burned completely in (excess) oxygen", "Under standard conditions (298 K, 101 kPa), substances in standard states", "Heat lost to the surroundings / container", "Incomplete combustion; evaporation of fuel"] },
    { q: "State Hess's law and explain why bond-energy values give only an approximate ΔH.", pts: ["The enthalpy change for a reaction is independent of the route taken", "(provided initial and final conditions are the same)", "Bond energies are average values over many compounds", "Bond energies apply to gaseous species, but some substances (e.g. water) may be liquid"] },
  ],
  traps: ["A temperature *rise* means ΔH is *negative*. Put the sign in your final answer.", "In q = mcΔT, m is the mass of solution being heated, not the mass of the solid added.", "ΔHf definitions need one mole of product from elements in their standard states; ΔHc needs one mole of fuel.", "Bond energies: broken − formed. Hess with formation data: products − reactants. With combustion data: reactants − products.", "Convert J to kJ before quoting kJ mol⁻¹."],
  defs: [["Standard conditions", "A temperature of 298 K and a pressure of 101 kPa, with solutions at a concentration of 1 mol dm⁻³."], ["Standard enthalpy change of formation, ΔHf⦵", "The enthalpy change when one mole of a compound is formed from its elements in their standard states under standard conditions."], ["Standard enthalpy change of combustion, ΔHc⦵", "The enthalpy change when one mole of a substance is burned completely in oxygen under standard conditions."], ["Standard enthalpy change of neutralisation", "The enthalpy change when one mole of water is formed by the reaction of an acid with an alkali under standard conditions."], ["Standard enthalpy change of reaction, ΔHr⦵", "The enthalpy change when the amounts of reactants shown in the equation react to give products under standard conditions."], ["Hess's law", "The total enthalpy change for a chemical reaction is independent of the route by which the reaction takes place, provided the initial and final conditions are the same."], ["Activation energy", "The minimum energy that colliding particles must possess for a reaction to occur."]],
});

/* ======================= UNIT 7 ======================= */
const OX = [["S", "H2SO4", 6], ["S", "SO2", 4], ["S", "H2S", -2], ["S", "SO3^2-", 4], ["N", "NO3-", 5], ["N", "NH4+", -3], ["N", "NO2", 4], ["N", "N2O", 1], ["Mn", "MnO4-", 7], ["Mn", "MnO2", 4], ["Cr", "Cr2O7^2-", 6], ["Cr", "CrO4^2-", 6], ["Cl", "ClO3-", 5], ["Cl", "ClO-", 1], ["Cl", "HClO4", 7], ["Fe", "Fe3O4", 8 / 3], ["P", "P4O10", 5], ["P", "PO4^3-", 5], ["C", "CO", 2], ["C", "C2O4^2-", 3], ["V", "VO2+", 5], ["O", "H2O2", -1], ["H", "NaH", -1], ["I", "IO3-", 5]];
PX.chem.OX = OX;
PX.unit({
  id: "7", n: 7, short: "Redox", title: "Redox reactions", strand: "phys", sim: "oxnum",
  intents: ["calculate oxidation numbers of elements in compounds and ions", "explain redox, oxidation, reduction and disproportionation in terms of electron transfer and oxidation number change", "explain and use the terms oxidising agent and reducing agent", "use changes in oxidation number to balance equations", "use Roman numerals to name compounds"],
  lesson: [
    { t: "predict", h: "No oxygen in sight", body: "Chlorine water is added to potassium bromide solution: {{Cl2 + 2Br- -> 2Cl- + Br2}}. No oxygen is gained or lost.", q: "Is this a redox reaction?",
      o: [["No: oxidation needs oxygen", false, "That's the narrow IGCSE definition. Redox is about electrons."], ["Yes: bromide ions lose electrons and chlorine gains them", true, "OIL RIG still works: Br⁻ is oxidised, Cl₂ is reduced."], ["No: it's a displacement, not redox", false, "Displacement reactions like this one are redox."]],
      after: "At AS you track electrons with a bookkeeping tool: **oxidation numbers**." },
    { t: "bridge", h: "From IGCSE to AS", igcse: ["Oxidation: gain of oxygen / loss of electrons", "Reduction: loss of oxygen / gain of electrons", "OIL RIG", "Iron(II) and iron(III)"],
      as: ["**Oxidation numbers** for every atom", "Oxidation = increase in oxidation number", "Oxidising and reducing agents", "Balancing tricky equations by matching electron changes", "**Disproportionation**: one element both up and down"],
      note: "Oxidation numbers turn \"which thing lost electrons?\" into simple arithmetic.",
      ask: { q: "In {{Mg + Cu^2+ -> Mg^2+ + Cu}}, which species is the oxidising agent?", o: [["Mg", false, "Mg is oxidised, so it's the reducing agent."], ["{{Cu^2+}}", true, "It takes electrons from Mg and is itself reduced."], ["{{Mg^2+}}", false, "That's a product."], ["Cu", false, "That's a product."]] } },
    { t: "explain", h: "Oxidation number rules",
      body: R`<ol><li>Uncombined elements: 0 ({{Na}}, {{O2}}, {{S8}}).</li><li>Simple ions: the charge ({{Fe^3+}} is +3).</li><li>The oxidation numbers in a compound add up to 0; in an ion, to the charge.</li><li>Usual values: Group 1 +1, Group 2 +2, Al +3, F −1, H +1 (−1 in metal hydrides like NaH), O −2 (−1 in peroxides, +2 in {{OF2}}), Cl −1 (unless bonded to O or F).</li></ol><p>Example: S in {{SO4^2-}}: $x+4(-2)=-2$, so $x=+6$.</p>`,
      sim: { pick: "SO4^2-" }, simLabel: "Explore sulfate",
      ask: { q: "What is the oxidation number of Cr in {{Cr2O7^2-}}?", o: [["+6", true, "2x + 7(−2) = −2, so 2x = 12, x = +6."], ["+7", false, "Don't forget the 2− charge."], ["+12", false, "That's both Cr atoms together."], ["+3", false, "That's Cr in Cr³⁺."]] } },
    { t: "explain", h: "Redox in oxidation-number terms",
      body: R`<div class="callout key">Oxidation: oxidation number <b>increases</b> (electrons lost).<br>Reduction: oxidation number <b>decreases</b> (electrons gained).</div><p>An <b>oxidising agent</b> takes electrons and is itself reduced. A <b>reducing agent</b> gives electrons and is itself oxidised.</p><p>In {{Fe2O3 + 3CO -> 2Fe + 3CO2}}: Fe +3 → 0 (reduced), C +2 → +4 (oxidised). CO is the reducing agent.</p>`,
      ask: { q: "In {{2KI + Cl2 -> 2KCl + I2}}, what happens to iodine's oxidation number?", o: [["−1 → 0: oxidised", true, "Increase in oxidation number."], ["0 → −1: reduced", false, "Iodine starts as I⁻ in KI."], ["+1 → 0: reduced", false, "K is +1; I is −1."], ["no change", false, "It changes from −1 to 0."]] } },
    { t: "explain", h: "Naming with Roman numerals",
      body: R`<p>The Roman numeral is the oxidation number of the element before it:</p><ul><li>{{FeCl2}} iron(II) chloride; {{FeCl3}} iron(III) chloride</li><li>{{NaClO}} sodium chlorate(I); {{NaClO3}} sodium chlorate(V)</li><li>{{SO4^2-}} sulfate(VI); {{SO3^2-}} sulfate(IV); {{NO3-}} nitrate(V); {{NO2-}} nitrate(III)</li><li>{{KMnO4}} potassium manganate(VII)</li></ul>`,
      ask: { q: "What is {{Na2SO3}}?", o: [["sodium sulfate(VI)", false, "S in SO₃²⁻ is +4."], ["sodium sulfate(IV)", true, "x + 3(−2) = −2, x = +4."], ["sodium sulfide", false, "Sulfide is S²⁻."], ["sodium sulfate(III)", false, "Work it out: +4."]] } },
    { t: "explain", h: "Balancing with oxidation numbers, and disproportionation",
      body: R`<p>Total increase in oxidation number = total decrease. So:</p><ol><li>Find the elements that change and by how much.</li><li>Multiply so the increase equals the decrease.</li><li>Balance O with {{H2O}}, then H with {{H+}}, then check charges.</li></ol><p><b>Disproportionation</b>: the same element is simultaneously oxidised and reduced. {{Cl2 + 2NaOH -> NaCl + NaClO + H2O}}: Cl 0 → −1 and 0 → +1.</p>`,
      ask: { q: "Which is a disproportionation?", o: [["{{2H2O2 -> 2H2O + O2}}", true, "O goes −1 → −2 (in water) and −1 → 0 (in O₂)."], ["{{2Mg + O2 -> 2MgO}}", false, "Two different elements change."], ["{{CaCO3 -> CaO + CO2}}", false, "Not redox at all."], ["{{Zn + Cu^2+ -> Zn^2+ + Cu}}", false, "Two different elements."]] } },
    { t: "worked", h: "Worked example: balancing manganate(VII) and iron(II)",
      prob: "Balance: {{MnO4- + Fe^2+ + H+ -> Mn^2+ + Fe^3+ + H2O}}",
      steps: [
        { s: R`Mn: +7 → +2, decrease of 5. Fe: +2 → +3, increase of 1.` },
        { s: R`To balance, 5 {{Fe^2+}} for each {{MnO4-}}: {{MnO4- + 5Fe^2+ -> Mn^2+ + 5Fe^3+}}`, why: { q: "Why five iron ions?", o: [["Total increase (5 × 1) must equal total decrease (5)", true, "Electrons lost = electrons gained."], ["Iron has five d electrons", false, "Coincidence; it's the electron count that matters."], ["To balance the charge only", false, "Charge balances last."]] } },
        { s: R`4 O on the left → {{4H2O}} on the right; that needs {{8H+}} on the left: {{MnO4- + 5Fe^2+ + 8H+ -> Mn^2+ + 5Fe^3+ + 4H2O}}` },
        { s: R`Charge check: left $-1+10+8=+17$; right $+2+15=+17$. ✓` },
      ] },
    { t: "complete", h: "Your turn",
      prob: "Find the oxidation number of nitrogen in the nitrate ion, {{NO3-}}.", shown: [R`$x + 3(-2) = -1$`],
      q: { q: "Oxidation number of N:", ans: 5, unit: "", label: "N =", hints: ["The three oxygens contribute −6.", "The total must equal the ion's charge, −1.", "x = −1 + 6"], sol: [R`x=-1+6=+5`], wrongs: [[7, "The sum is −1 (the charge), not 0. You added 1 instead of subtracting it."], [6, "Include the ion's charge."], [-5, "Sign: x = −1 + 6."]] } },
    { t: "solo", h: "On your own: oxidation numbers", gen: "ox" },
  ],
  mcq: [
    { q: "What is the oxidation number of oxygen in {{H2O2}}?", o: [["−2", false, "Peroxides are the exception."], ["−1", true, "2(+1) + 2x = 0, so x = −1."], ["0", false, "That's O₂."], ["+1", false, "Check the sum."]] },
    { q: "In which change is nitrogen reduced?", o: [["{{NH3 -> NO}}", false, "−3 → +2: oxidised."], ["{{NO2 -> NO3-}}", false, "+4 → +5: oxidised."], ["{{NO3- -> NO2}}", true, "+5 → +4: decrease."], ["{{N2 -> NO}}", false, "0 → +2: oxidised."]] },
    { q: "In {{2Fe^3+ + 2I- -> 2Fe^2+ + I2}}, the reducing agent is:", o: [["{{Fe^3+}}", false, "It gains electrons, so it's the oxidising agent."], ["{{I-}}", true, "It loses electrons and is oxidised."], ["{{Fe^2+}}", false, "A product."], ["{{I2}}", false, "A product."]] },
    { q: "Which compound contains chlorine with oxidation number +5?", o: [["{{NaClO}}", false, "+1."], ["{{NaClO3}}", true, "x + 3(−2) = −1 for ClO₃⁻, so x = +5."], ["{{NaClO4}}", false, "+7."], ["{{NaCl}}", false, "−1."]] },
    { q: "Hot NaOH reacts with chlorine: {{3Cl2 + 6NaOH -> 5NaCl + NaClO3 + 3H2O}}. The oxidation numbers of chlorine in the products are:", o: [["−1 and +5", true, "Disproportionation: some Cl reduced to −1, some oxidised to +5."], ["−1 and +1", false, "That's the cold reaction (chlorate(I))."], ["0 and +5", false, "NaCl contains Cl⁻."], ["−1 and +7", false, "ClO₃⁻ is +5."]] },
    { q: "What is the oxidation number of hydrogen in {{CaH2}}?", o: [["+1", false, "Metal hydrides are the exception."], ["−1", true, "Ca is +2; two H must total −2."], ["0", false, "Not an element."], ["−2", false, "Each H is −1."]] },
  ],
  gens: {
    ox: () => {
      const [el, sp, ans] = pick(OX.filter(o => Number.isInteger(o[2])));
      return { topic: "oxidation numbers", q: `What is the oxidation number of ${el} in {{${sp}}}?`, ans, unit: "", label: `${el} =`, tol: 0.001,
        hints: ["Use the rules for O (−2), H (+1), Group 1 (+1)… and remember exceptions.", "The oxidation numbers add up to the overall charge.", "Write an equation in x and solve."],
        sol: [`<p>Set the sum of oxidation numbers equal to the charge of {{${sp}}} and solve: ${el} = ${ans > 0 ? "+" : ""}${ans}.</p>`], wrongs: [[-ans, "Check the sign."]] };
    },
  },
  ex: [
    { q: "Explain, using oxidation numbers, why the reaction of chlorine with cold aqueous sodium hydroxide is a disproportionation.", pts: ["{{Cl2 + 2NaOH -> NaCl + NaClO + H2O}}", "Cl in Cl₂ is 0", "Cl in NaCl is −1 (reduced) and in NaClO is +1 (oxidised)", "The same element is both oxidised and reduced"] },
  ],
  traps: ["Oxidation numbers are per atom: Cr in {{Cr2O7^2-}} is +6, not +12.", "Exceptions: O is −1 in peroxides; H is −1 in metal hydrides.", "Oxidising agent = the species that is *reduced*.", "Write oxidation numbers with the sign first: +6, not 6+ (that's a charge)."],
  defs: [["Oxidation", "Loss of electrons, or an increase in oxidation number."], ["Reduction", "Gain of electrons, or a decrease in oxidation number."], ["Oxidising agent", "A species that oxidises another by accepting electrons; it is itself reduced."], ["Reducing agent", "A species that reduces another by donating electrons; it is itself oxidised."], ["Disproportionation", "A redox reaction in which the same element is simultaneously oxidised and reduced."]],
});

/* ======================= UNIT 8 ======================= */
PX.unit({
  id: "8", n: 8, short: "Equilibria", title: "Equilibria", strand: "phys", sim: "equilibrium",
  intents: ["explain reversible reactions and dynamic equilibrium; why a closed system is needed", "use Le Chatelier's principle for changes in temperature, concentration, pressure and catalysts", "deduce expressions for Kc and Kp; use mole fraction and partial pressure; calculate equilibrium quantities", "state which factors change the equilibrium constant", "describe the conditions used in the Haber and Contact processes", "describe the Brønsted–Lowry theory; strong and weak acids and bases", "sketch pH titration curves and choose suitable indicators"],
  lesson: [
    { t: "predict", h: "The brown gas", body: "A sealed tube contains brown {{NO2}} in equilibrium with colourless {{N2O4}}: {{2NO2(g) <=> N2O4(g)}}, ΔH = −57 kJ mol⁻¹. You put the tube into ice water.", q: "What happens to the colour?",
      o: [["Gets darker brown", false, "Cooling favours the exothermic direction, which makes N₂O₄."], ["Gets paler", true, "The equilibrium shifts towards colourless N₂O₄, giving out heat to oppose the cooling."], ["No change; it's sealed", false, "Sealed only means closed. The position can still shift."]],
      after: "That's **Le Chatelier's principle**: the system shifts to oppose the change you made." },
    { t: "bridge", h: "From IGCSE to AS", igcse: ["Reversible reactions use ⇌", "Equilibrium in a closed system", "Some idea of shifting with conditions", "Acids give H⁺; pH scale"],
      as: ["**Dynamic**: both reactions still happening, at equal rates", "Le Chatelier for T, p, concentration, catalyst", "Equilibrium constants **Kc** and **Kp**, and calculations", "Industrial compromises (Haber, Contact)", "Brønsted–Lowry acids and bases; titration curves"],
      note: "The big upgrade is numbers: Kc tells you *how far* a reaction goes, and only temperature changes it.",
      ask: { q: "At dynamic equilibrium…", o: [["the forward and backward reactions have stopped", false, "That would be static. Molecules keep reacting both ways."], ["the forward and backward rates are equal, so concentrations stay constant", true, "That's what \"dynamic\" means."], ["concentrations of reactants and products are equal", false, "Constant, not equal."], ["the reaction is complete", false, "Reactants and products coexist."]] } },
    { t: "explain", h: "Le Chatelier's principle",
      body: R`<p><b>If a change is made to a system at dynamic equilibrium, the position of equilibrium moves to minimise that change.</b></p><ul><li><b>Concentration</b>: add a reactant → shifts right to use it up.</li><li><b>Pressure</b> (gases): increase → shifts to the side with <b>fewer gas moles</b>.</li><li><b>Temperature</b>: increase → shifts in the <b>endothermic</b> direction.</li><li><b>Catalyst</b>: no shift; equilibrium is reached faster.</li></ul>`,
      sim: { tab: 0 }, simLabel: "Push the N₂O₄ equilibrium",
      ask: { q: "For {{N2(g) + 3H2(g) <=> 2NH3(g)}}, increasing the pressure:", o: [["shifts right: 4 gas moles → 2", true, "Fewer molecules reduce the pressure."], ["shifts left", false, "Left has more gas moles."], ["has no effect", false, "Gas moles differ on each side."], ["changes Kc", false, "Only temperature changes Kc."]] } },
    { t: "explain", h: "The equilibrium constant Kc",
      body: R`<p>For $a\text{A}+b\text{B}\rightleftharpoons c\text{C}+d\text{D}$:</p><div class="callout key">$$K_c=\frac{[\text{C}]^c[\text{D}]^d}{[\text{A}]^a[\text{B}]^b}$$</div><p>Square brackets are equilibrium concentrations in mol dm⁻³. Units come from cancelling. Large Kc: equilibrium lies to the right.</p><p><b>Only temperature changes K.</b> Concentration and pressure change the position but K stays the same. For an exothermic forward reaction, raising T lowers K.</p>`,
      ask: { q: "For {{H2(g) + I2(g) <=> 2HI(g)}}, what are the units of Kc?", o: [["mol dm⁻³", false, "Top: (mol dm⁻³)²; bottom: (mol dm⁻³)²."], ["no units", true, "They cancel completely."], ["mol⁻¹ dm³", false, "Check the powers: 2 on top, 1 + 1 on the bottom."], ["mol² dm⁻⁶", false, "Divide, don't multiply."]] } },
    { t: "explain", h: "Kp: equilibria in gases",
      body: R`<p>For gases we use <b>partial pressures</b>: the pressure each gas would exert if it were alone.</p><div class="callout key">mole fraction $x_A=\dfrac{n_A}{n_\text{total}}$ &nbsp;&nbsp; $p_A=x_A\times p_\text{total}$</div><p>For {{N2 + 3H2 <=> 2NH3}}: $$K_p=\frac{p_{\text{NH}_3}^2}{p_{\text{N}_2}\,p_{\text{H}_2}^3}\quad(\text{units: Pa}^{-2}\text{ or kPa}^{-2})$$ Solids and liquids are left out of Kp.</p>`,
      ask: { q: "A mixture at 200 kPa contains 0.30 mol {{N2O4}} and 0.20 mol {{NO2}}. What is the partial pressure of {{NO2}}?", o: [["80 kPa", true, "x = 0.20/0.50 = 0.40; 0.40 × 200 = 80 kPa."], ["40 kPa", false, "That's ignoring total pressure."], ["133 kPa", false, "Mole fraction uses the total moles (0.50), not N₂O₄ alone."], ["120 kPa", false, "That's N₂O₄."]] } },
    { t: "explain", h: "Industrial compromises",
      body: R`<div class="tbl-wrap"><table class="board"><tr><th></th><th>Haber</th><th>Contact</th></tr><tr><td>equation</td><td>{{N2 + 3H2 <=> 2NH3}}, ΔH = −92</td><td>{{2SO2 + O2 <=> 2SO3}}, ΔH = −197</td></tr><tr><td>temperature</td><td>400–450 °C</td><td>400–450 °C</td></tr><tr><td>pressure</td><td>about 200 atm (20 MPa)</td><td>1–2 atm</td></tr><tr><td>catalyst</td><td>iron</td><td>vanadium(V) oxide, {{V2O5}}</td></tr></table></div><p>Low T gives more product (exothermic) but too slowly; ~450 °C is a compromise between rate and yield. High pressure costs money and needs strong plant. Contact uses low pressure because conversion is already ~99%.</p>`,
      ask: { q: "Why isn't the Haber process run at a lower temperature, which would raise the equilibrium yield?", o: [["The rate would be too slow", true, "Fewer molecules have E ≥ Ea, and the iron catalyst works poorly when cold."], ["Ammonia would decompose", false, "Low T favours ammonia."], ["Kc would fall", false, "Kc rises as T falls for an exothermic reaction."], ["Nitrogen would liquefy", false, "Not at a few hundred °C."]] } },
    { t: "explain", h: "Acids, bases and titration curves",
      body: R`<p><b>Brønsted–Lowry</b>: an acid is a <b>proton donor</b>; a base is a <b>proton acceptor</b>. {{HCl + H2O -> H3O+ + Cl-}}. In {{NH3 + H2O <=> NH4+ + OH-}}, water is the acid.</p><p><b>Strong</b> acids/bases dissociate fully (HCl, {{H2SO4}}, {{HNO3}}, NaOH, KOH); <b>weak</b> ones partially ({{CH3COOH}}, {{NH3}}). Same concentration: a weak acid has higher pH, lower conductivity and reacts more slowly with Mg.</p><p>In a titration curve the steep vertical section must cover the indicator's colour-change range: <b>methyl orange</b> (3.1–4.4) for strong acid + weak base; <b>phenolphthalein</b> (8.3–10) for weak acid + strong base; either for strong + strong; none for weak + weak.</p>`,
      sim: { tab: 1, combo: 1 }, simLabel: "Draw a titration curve",
      ask: { q: "Which indicator suits ethanoic acid titrated with sodium hydroxide?", o: [["methyl orange", false, "Changes at pH 3–4, before the steep part (about pH 7–11)."], ["phenolphthalein", true, "Its range 8.3–10 sits inside the vertical section."], ["either", false, "Only for strong acid + strong base."], ["neither", false, "Only weak acid + weak base has no sharp end point."]] } },
    { t: "worked", h: "Worked example: calculating Kc",
      prob: "1.00 mol {{H2}} and 1.00 mol {{I2}} are heated in a 1.00 dm³ sealed flask. At equilibrium there is 1.56 mol HI. Calculate Kc for {{H2 + I2 <=> 2HI}}.",
      steps: [
        { s: R`Use an I–C–E table. Making 1.56 mol HI uses $1.56/2=0.78$ mol of each reactant.`, why: { q: "Why divide by 2?", o: [["The equation makes 2 HI for each H₂ used", true, "Mole ratio H₂ : HI = 1 : 2."], ["There are two reactants", false, "It's the ratio, not the number of reactants."], ["HI has two atoms", false, "Coefficients, not atom counts."]] } },
        { s: R`Equilibrium: $[\text{H}_2]=[\text{I}_2]=1.00-0.78=0.22$ mol dm⁻³; $[\text{HI}]=1.56$ mol dm⁻³.` },
        { s: R`$K_c=\dfrac{1.56^2}{0.22\times0.22}=50.3$ (no units)` },
      ], after: "Always use **equilibrium** amounts in K, never the starting amounts." },
    { t: "complete", h: "Your turn: Kp",
      prob: "{{N2O4(g) <=> 2NO2(g)}}. At equilibrium the total pressure is 100 kPa and the mole fraction of {{NO2}} is 0.40.", shown: [R`$p(\text{NO}_2)=0.40\times100=40$ kPa; $p(\text{N}_2\text{O}_4)=0.60\times100=60$ kPa.`],
      q: { q: "Calculate Kp in kPa.", ans: 26.67, unit: "kPa", label: "Kp =", hints: ["Write the expression: product over reactant, powers from coefficients.", R`$K_p=p(\text{NO}_2)^2/p(\text{N}_2\text{O}_4)$`, "40² ÷ 60"], sol: [R`K_p=\frac{40^2}{60}=26.7\ \text{kPa}`], wrongs: [[0.667, "Square the NO₂ partial pressure."], [0.0375, "Upside down: products on top."]] } },
    { t: "solo", h: "On your own: equilibrium constants", gen: "kc" },
  ],
  mcq: [
    { q: "For an exothermic forward reaction, increasing the temperature will:", o: [["increase Kc", false, "The endothermic (backward) direction is favoured, so Kc falls."], ["decrease Kc", true, "Equilibrium shifts left, so the ratio products/reactants falls."], ["leave Kc unchanged", false, "Temperature is the one thing that changes K."], ["only speed up the forward reaction", false, "Both directions speed up."]] },
    { q: "Adding a catalyst to a system at equilibrium:", o: [["shifts it to the right", false, "A catalyst speeds both directions equally."], ["increases Kc", false, "No effect on K."], ["has no effect on position but equilibrium is reached faster", true, "Lower Ea for both forward and backward reactions."], ["increases the yield", false, "The yield at equilibrium is unchanged."]] },
    { q: "In {{HCO3- + H2O <=> CO3^2- + H3O+}}, the conjugate base of {{HCO3-}} is:", o: [["{{H2CO3}}", false, "That's its conjugate acid."], ["{{CO3^2-}}", true, "Remove one proton from HCO₃⁻."], ["{{H3O+}}", false, "That's the conjugate acid of water."], ["{{OH-}}", false, "Not in this equilibrium."]] },
    { q: "Which change shifts {{CO(g) + 2H2(g) <=> CH3OH(g)}}, ΔH = −91 kJ mol⁻¹, to the right?", o: [["increase temperature", false, "Favours the endothermic backward reaction."], ["increase pressure", true, "3 gas moles → 1."], ["add a catalyst", false, "No shift."], ["remove some {{H2}}", false, "Shifts left to replace it."]] },
    { q: "0.1 mol dm⁻³ HCl and 0.1 mol dm⁻³ {{CH3COOH}}: which statement is correct?", o: [["They have the same pH", false, "HCl dissociates fully: lower pH."], ["{{CH3COOH}} conducts better", false, "Fewer ions, so poorer conduction."], ["HCl reacts faster with magnesium", true, "Higher [H⁺]."], ["They need different volumes of NaOH to neutralise", false, "Same moles of acid, same volume of NaOH."]] },
    { q: "In the Contact process the catalyst is:", o: [["iron", false, "That's Haber."], ["vanadium(V) oxide", true, "{{V2O5}}."], ["platinum", false, "Used in catalytic converters and nitric acid manufacture."], ["nickel", false, "Used for hydrogenating alkenes."]] },
    { q: "Why must an equilibrium be in a closed system?", o: [["So products and reactants can't escape", true, "If a gas escaped, the reverse reaction could not happen at its rate."], ["To keep the temperature constant", false, "A closed system can still exchange heat."], ["To stop the catalyst working", false, "Irrelevant."], ["To make Kc equal to 1", false, "Unrelated."]] },
  ],
  gens: {
    kc: () => {
      const a0 = rnd(0.5, 2, 2), b0 = rnd(0.5, 2, 2), V = pick([1.00, 2.00, 0.500]), K0 = rnd(2, 5, 1);
      const qa = 1 - K0, qb = K0 * (a0 + b0), qc = -K0 * a0 * b0, disc = Math.sqrt(qb * qb - 4 * qa * qc);
      const x = round([(-qb + disc) / (2 * qa), (-qb - disc) / (2 * qa)].find(r => r > 0 && r < Math.min(a0, b0)), 2);
      const A = (a0 - x) / V, B = (b0 - x) / V, C = x / V, D = x / V, ans = (C * D) / (A * B);
      return { topic: "Kc from equilibrium amounts", q: `For {{CH3COOH + C2H5OH <=> CH3COOC2H5 + H2O}}, ${a0} mol of ethanoic acid and ${b0} mol of ethanol are mixed in ${V.toFixed(2)} dm³. At equilibrium ${x} mol of ethyl ethanoate has formed. Calculate Kc.`, ans, unit: "", label: "Kc =",
        hints: ["Use I–C–E: each reactant drops by the amount of ester formed; water forms equally.", `Equilibrium: acid ${round(a0 - x, 2)}, ethanol ${round(b0 - x, 2)}, ester ${x}, water ${x} mol.`, "Here the volumes cancel (2 on top, 2 on the bottom)."],
        sol: [R`K_c=\frac{(${x})(${x})}{(${round(a0 - x, 2)})(${round(b0 - x, 2)})}=${tn(ans)}`], wrongs: [[1 / ans, "Products go on top."], [(x * x) / (a0 * b0), "Use equilibrium amounts, not initial amounts."]] };
    },
    kp: () => {
      const P = pick([100, 150, 200, 250]), x = rnd(0.2, 0.7, 2);
      const pN = x * P, pM = (1 - x) * P, ans = pN * pN / pM;
      return { topic: "Kp from mole fractions", q: `For {{N2O4(g) <=> 2NO2(g)}} at equilibrium, the total pressure is ${P} kPa and the mole fraction of {{NO2}} is ${x}. Calculate Kp in kPa.`, ans, unit: "kPa", label: "Kp =",
        hints: ["Partial pressure = mole fraction × total pressure.", `p(NO₂) = ${f3(pN)} kPa; p(N₂O₄) = ${f3(pM)} kPa.`, "Kp = p(NO₂)² / p(N₂O₄)"],
        sol: [R`K_p=\frac{${f3(pN)}^2}{${f3(pM)}}=${tn(ans)}\ \text{kPa}`], wrongs: [[pN / pM, "Square p(NO₂): its coefficient is 2."], [pM / (pN * pN), "Products on top."]] };
    },
  },
  ex: [
    { q: "Explain, using Le Chatelier's principle, the effect of increasing temperature on the equilibrium yield of ammonia in the Haber process. Suggest why 450 °C is used.", pts: ["The forward reaction is exothermic (ΔH negative)", "Increasing temperature shifts equilibrium in the endothermic direction / to the left", "So the equilibrium yield of ammonia decreases", "450 °C is a compromise: a reasonable yield at an acceptable rate (and catalyst activity)"] },
    { q: "Explain the differences between a strong acid and a weak acid of the same concentration.", pts: ["A strong acid is fully dissociated into ions; a weak acid only partially dissociated", "The strong acid has higher [H⁺], so lower pH", "The strong acid conducts electricity better (more ions)", "The strong acid reacts faster with reactive metals / carbonates"] },
  ],
  traps: ["K changes only with temperature. Pressure, concentration and catalysts don't change it.", "Use equilibrium concentrations in K, not starting amounts.", "Kp leaves out solids and liquids; partial pressure = mole fraction × total pressure.", "\"Position of equilibrium shifts\" is the phrase; don't say \"the equilibrium increases\".", "A catalyst doesn't increase the yield. It gets you to equilibrium sooner."],
  defs: [["Dynamic equilibrium", "A state in a closed system where the rates of the forward and backward reactions are equal and the concentrations of reactants and products remain constant."], ["Le Chatelier's principle", "If a change is made to a system at dynamic equilibrium, the position of equilibrium moves to minimise this change."], ["Partial pressure", "The pressure a gas in a mixture would exert if it alone occupied the container; mole fraction × total pressure."], ["Brønsted–Lowry acid", "A proton (H⁺) donor."], ["Brønsted–Lowry base", "A proton (H⁺) acceptor."], ["Strong acid", "An acid that is completely dissociated into ions in aqueous solution."], ["Weak acid", "An acid that is only partially dissociated into ions in aqueous solution."]],
});

/* ======================= UNIT 9 ======================= */
PX.unit({
  id: "9", n: 9, short: "Rates of reaction", title: "Rates of reaction", strand: "phys", sim: "boltzmann",
  intents: ["explain rate of reaction, frequency of collisions, effective and non-effective collisions", "explain the effect of concentration and pressure on rate", "calculate rate from experimental data", "define activation energy and use the Boltzmann distribution to explain its importance and the effect of temperature", "explain catalysis in terms of activation energy and an alternative mechanism, including on the Boltzmann distribution and on pathway diagrams"],
  lesson: [
    { t: "predict", h: "A 10 °C rise", body: "Raising the temperature from 20 °C to 30 °C increases how often molecules collide by only about 2%. Yet many reactions go about twice as fast.", q: "What's the main reason?",
      o: [["The activation energy falls", false, "Ea is fixed for a given pathway; only a catalyst lowers it."], ["Many more collisions now have energy ≥ Ea", true, "A small shift in the energy distribution greatly increases the fraction above Ea."], ["The molecules get bigger", false, "Molecules don't swell with temperature."], ["The equilibrium shifts", false, "Rate and equilibrium are different questions."]],
      after: "The **Boltzmann distribution** shows why: the tail above Ea grows a lot for a small rise in temperature." },
    { t: "bridge", h: "From IGCSE to AS", igcse: ["Particles must collide to react", "Rate increases with concentration, temperature, surface area, catalyst", "Measuring rate: gas volume, mass loss"],
      as: ["**Effective** collisions: right energy (≥ Ea) and orientation", "**Boltzmann distribution** curves", "Catalysts provide an **alternative route** with lower Ea", "Calculating rates from data"],
      note: "\"Particles move faster so collide more\" isn't enough at AS for temperature. The key point is more particles with E ≥ Ea.",
      ask: { q: "What makes a collision effective?", o: [["The particles collide with energy at least Ea (and the right orientation)", true, "Only then can bonds break and reaction happen."], ["The particles collide at all", false, "Most collisions just bounce."], ["The particles are hot", false, "Individual energy matters, not bulk temperature."], ["A catalyst is present", false, "Catalysts help, but aren't required for an effective collision."]] } },
    { t: "explain", h: "Rate and how to measure it",
      body: R`<p>Rate of reaction = change in amount (or concentration) of a reactant or product per unit time. Units: mol dm⁻³ s⁻¹ (or cm³ s⁻¹ for gas volume).</p><ul><li><b>Mean rate</b> = total change ÷ total time.</li><li><b>Rate at an instant</b> = gradient of the tangent to a concentration–time graph.</li></ul><p>The curve is steepest at the start (highest concentration), then levels off as reactants are used up.</p>`,
      ask: { q: "In 40 s the concentration of a reactant falls from 0.80 to 0.50 mol dm⁻³. What is the mean rate?", o: [["0.0075 mol dm⁻³ s⁻¹", true, "0.30/40 = 0.0075."], ["0.30 mol dm⁻³ s⁻¹", false, "Divide by the time."], ["0.0125 mol dm⁻³ s⁻¹", false, "Use the change (0.30), not the final value (0.50)."], ["12 mol dm⁻³ s⁻¹", false, "Divide change by time, not time by change."]] } },
    { t: "explain", h: "Collisions, concentration and pressure",
      body: R`<p>Higher concentration (or gas pressure) means more particles per unit volume, so <b>more frequent collisions</b>, and so more frequent <b>effective</b> collisions. The fraction of collisions that succeed doesn't change.</p><p>Larger surface area of a solid works the same way: more particles exposed, more frequent collisions.</p>`,
      ask: { q: "Doubling the pressure of a gas reaction increases the rate mainly because:", o: [["the particles have more energy", false, "Energy depends on temperature."], ["the activation energy decreases", false, "Ea is unchanged."], ["there are more particles per unit volume, so more frequent collisions", true, "Collision frequency rises; the fraction with E ≥ Ea is the same."], ["the reaction becomes exothermic", false, "ΔH doesn't depend on pressure."]] } },
    { t: "explain", h: "The Boltzmann distribution",
      body: R`<p>The curve shows how many molecules have each energy:</p><ul><li>starts at the origin (no molecules with zero energy);</li><li>has a peak (most likely energy);</li><li>never touches the energy axis at high energy;</li><li>area under the curve = total number of molecules.</li></ul><p>At a <b>higher temperature</b> the peak moves right and down, the curve spreads out, the area stays the same, and the area beyond $E_a$ (molecules able to react) is much larger.</p>`,
      sim: { T: 300, T2: 310 }, simLabel: "Compare 300 K and 310 K",
      ask: { q: "When temperature increases, the area under the Boltzmann curve:", o: [["increases", false, "The number of molecules hasn't changed."], ["stays the same", true, "The curve changes shape, not total area."], ["decreases", false, "Same number of molecules."], ["moves to the left", false, "The peak moves right."]] } },
    { t: "explain", h: "Catalysts",
      body: R`<p>A <b>catalyst</b> increases the rate of a reaction without being used up. It provides an <b>alternative pathway with a lower activation energy</b>.</p><ul><li>On a pathway diagram: a lower hump; ΔH unchanged.</li><li>On a Boltzmann curve: the <b>curve doesn't change</b>, the Ea line moves left, so a larger area is beyond it.</li><li><b>Homogeneous</b>: same phase as reactants (e.g. {{NO2}} catalysing {{SO2}} oxidation in air). <b>Heterogeneous</b>: different phase (iron in Haber; Pt/Rh in catalytic converters).</li></ul>`,
      sim: { cat: true }, simLabel: "Add a catalyst",
      ask: { q: "On a Boltzmann distribution, adding a catalyst:", o: [["shifts the curve to the right", false, "That's a temperature rise."], ["leaves the curve unchanged but moves Ea to lower energy", true, "Same molecules, lower barrier."], ["increases the area under the curve", false, "Same number of molecules."], ["moves Ea to higher energy", false, "Catalysts lower Ea."]] } },
    { t: "worked", h: "Worked example: rate from gas volume",
      prob: "Marble chips react with acid. 36 cm³ of {{CO2}} is collected in the first 20 s and 52 cm³ in the first 40 s. Find the mean rate over the first 20 s and over the second 20 s.",
      steps: [
        { s: R`First 20 s: $36/20=1.8$ cm³ s⁻¹.` },
        { s: R`Second 20 s: $(52-36)/20=0.80$ cm³ s⁻¹.`, why: { q: "Why is the second rate lower?", o: [["The acid concentration has fallen, so collisions are less frequent", true, "Reactant is being used up."], ["The temperature has fallen", false, "This reaction is exothermic, if anything."], ["The CO₂ blocks the chips", false, "Not the main reason."]] } },
      ], after: "Rate falls as reactants are used up, so the curve flattens." },
    { t: "complete", h: "Your turn",
      prob: "The concentration of {{H2O2}} falls from 1.20 to 0.75 mol dm⁻³ in 90 s.", shown: [R`Change = 1.20 − 0.75 = 0.45 mol dm⁻³.`],
      q: { q: "Mean rate of decomposition, in mol dm⁻³ s⁻¹:", ans: 0.005, unit: "mol dm⁻³ s⁻¹", label: "rate =", hints: ["Rate = change in concentration ÷ time.", "0.45 ÷ 90", "Give 0.0050 or 5.0 × 10⁻³."], sol: [R`\text{rate}=\frac{0.45}{90}=5.0\times10^{-3}\ \text{mol dm}^{-3}\text{s}^{-1}`], wrongs: [[200, "Change ÷ time, not time ÷ change."], [0.00833, "Use the change (0.45), not the final concentration."]] } },
    { t: "solo", h: "On your own: rates", gen: "rate" },
  ],
  mcq: [
    { q: "Why does increasing temperature increase the rate of reaction? Choose the best explanation.", o: [["Particles collide more often", false, "True, but a minor effect."], ["A greater proportion of collisions have energy ≥ Ea", true, "This is the main reason."], ["Activation energy decreases", false, "Ea stays the same."], ["Equilibrium shifts to the right", false, "Rate ≠ equilibrium."]] },
    { q: "A catalyst increases the rate because it:", o: [["increases the energy of molecules", false, "Only heating does that."], ["provides a route with lower activation energy", true, "More molecules have enough energy."], ["makes ΔH more negative", false, "ΔH is unchanged."], ["increases the collision frequency", false, "Not the mechanism."]] },
    { q: "Which is an example of heterogeneous catalysis?", o: [["{{NO2}} in the oxidation of {{SO2}} in the atmosphere", false, "All gases: homogeneous."], ["iron in the Haber process", true, "Solid catalyst, gaseous reactants."], ["{{H+(aq)}} catalysing ester hydrolysis", false, "Same phase: homogeneous."], ["enzymes in solution", false, "Usually counted as homogeneous."]] },
    { q: "The Boltzmann distribution curve for a gas at a lower temperature has:", o: [["a lower, broader peak further right", false, "That's higher temperature."], ["a higher, narrower peak further left", true, "Fewer high-energy molecules."], ["a larger area", false, "Same number of molecules."], ["no molecules above Ea", false, "Some always exceed Ea; the tail never reaches zero."]] },
    { q: "Powdered {{CaCO3}} reacts faster with acid than lumps of the same mass because:", o: [["it has a larger surface area, so more frequent collisions", true, "More particles exposed to the acid."], ["powder has lower activation energy", false, "Same reaction, same Ea."], ["powder is more concentrated", false, "Same substance."], ["powder is hotter", false, "No."]] },
  ],
  gens: {
    rate: () => {
      const c1 = rnd(0.5, 2, 2), c2 = round(c1 * rnd(0.3, 0.8, 2), 2), t = pick([20, 30, 40, 50, 60, 90, 120]);
      const ans = (c1 - c2) / t;
      return { topic: "mean rate from concentration data", q: `The concentration of a reactant falls from ${c1.toFixed(2)} to ${c2.toFixed(2)} mol dm⁻³ in ${t} s. Calculate the mean rate of reaction.`, ans, unit: "mol dm⁻³ s⁻¹", label: "rate =",
        hints: ["Rate = change in concentration ÷ time.", `Change = ${c1.toFixed(2)} − ${c2.toFixed(2)}.`, `${round(c1 - c2, 2)} ÷ ${t}`],
        sol: [R`\text{rate}=\frac{${round(c1 - c2, 2)}}{${t}}=${tn(ans)}\ \text{mol dm}^{-3}\text{s}^{-1}`], wrongs: [[c2 / t, "Use the change, not the final concentration."], [t / (c1 - c2), "Change ÷ time."]] };
    },
    gasrate: () => {
      const v1 = rnd(20, 60, 0), t = pick([10, 20, 30]), v2 = v1 + rnd(5, 25, 0);
      const ans = (v2 - v1) / t;
      return { topic: "mean rate from gas volume", q: `In a reaction, ${v1} cm³ of gas has been collected after ${t} s and ${v2} cm³ after ${2 * t} s. What is the mean rate between ${t} s and ${2 * t} s?`, ans, unit: "cm³ s⁻¹", label: "rate =",
        hints: ["Use only the interval asked for.", `Volume change = ${v2} − ${v1}.`, `÷ ${t} s`],
        sol: [R`\text{rate}=\frac{${v2}-${v1}}{${t}}=${tn(ans)}\ \text{cm}^3\,\text{s}^{-1}`], wrongs: [[v2 / (2 * t), "That's the mean over the whole 0–" + 2 * t + " s, not the second interval."], [v1 / t, "That's the first interval."]] };
    },
  },
  ex: [
    { q: "Use the Boltzmann distribution to explain why a small increase in temperature causes a large increase in rate.", pts: ["At higher T the curve flattens and its peak moves to higher energy", "Area under the curve (total molecules) stays the same", "A much larger proportion of molecules have energy ≥ Ea (area beyond Ea increases)", "So the frequency of effective collisions increases significantly"] },
    { q: "Explain, with reference to a Boltzmann distribution, how a catalyst increases the rate of a reaction.", pts: ["A catalyst provides an alternative reaction pathway", "with a lower activation energy", "The distribution curve is unchanged; Ea moves to the left", "More molecules have energy ≥ Ea, so more frequent effective collisions"] },
  ],
  traps: ["Temperature: the main reason is more particles with E ≥ Ea, not just \"more collisions\".", "Concentration and pressure: more frequent collisions; the fraction with E ≥ Ea doesn't change.", "Boltzmann curves start at the origin and never touch the energy axis at high energy.", "A catalyst doesn't change the Boltzmann curve or ΔH. Only Ea moves.", "Rate units: mol dm⁻³ s⁻¹ (or cm³ s⁻¹ for gas volume)."],
  defs: [["Rate of reaction", "The change in the amount or concentration of a reactant or product per unit time."], ["Activation energy, Ea", "The minimum energy that colliding particles must possess for a reaction to occur."], ["Catalyst", "A substance that increases the rate of a reaction but remains chemically unchanged at the end of the reaction; it provides an alternative route with a lower activation energy."], ["Effective collision", "A collision between particles with energy at least equal to the activation energy (and correct orientation), which results in reaction."], ["Homogeneous catalysis", "Catalysis in which the catalyst is in the same phase as the reactants."], ["Heterogeneous catalysis", "Catalysis in which the catalyst is in a different phase from the reactants."]],
});
})();
