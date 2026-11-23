/* units-inorg.js — Units 10–13 (inorganic chemistry). */
(() => {
const R = String.raw;
const { pick, rnd, round, tn } = PX;
const f3 = x => +Number(x).toPrecision(3);

/* ======================= UNIT 10 ======================= */
PX.unit({
  id: "10", n: 10, short: "Periodicity", title: "Periodicity", strand: "inorg", sim: "period3",
  intents: ["describe and explain the variation in atomic radius, ionic radius, melting point and electrical conductivity across Period 3", "write equations for the reactions of Period 3 elements with oxygen and chlorine, and of Na and Mg with water", "explain the oxidation numbers of the oxides and chlorides in terms of outer electrons", "describe the reactions of the oxides with water and their acid/base behaviour, including the amphoteric behaviour of {{Al2O3}} and {{Al(OH)3}}", "describe the reactions of the chlorides with water and the pH of the solutions", "explain these trends in terms of bonding and electronegativity, and deduce the identity of unknown elements"],
  lesson: [
    { t: "predict", h: "Highest melting point in Period 3", body: "Period 3 runs Na, Mg, Al, Si, P, S, Cl, Ar.", q: "Which element has the highest melting point?",
      o: [["Aluminium: the most delocalised electrons", false, "Al is high (933 K), but one element beats it by a long way."], ["Silicon", true, "1683 K. Melting silicon means breaking strong covalent bonds throughout a giant lattice."], ["Sulfur: the biggest molecules", false, "S₈ molecules are held by weak intermolecular forces: 392 K."], ["Argon: the heaviest atom", false, "Ar has the lowest melting point (84 K)."]],
      after: "Melting points across a period follow **structure**: metallic → giant covalent → simple molecular." },
    { t: "bridge", h: "From IGCSE to AS", igcse: ["Metals on the left, non-metals on the right", "Metal oxides are basic; non-metal oxides are acidic", "Trends down Groups 1 and 7"],
      as: ["Explaining each trend from **structure and bonding**", "Equations for Period 3 elements with O₂, Cl₂ and water", "Oxides and chlorides with water, and the **pH** you'd get", "**Amphoteric** aluminium oxide", "Using electronegativity to explain ionic → covalent"],
      note: "Every question in this unit comes back to one change across the period: bonding goes from ionic to covalent as electronegativity difference falls.",
      ask: { q: "What is the formula of the oxide made when phosphorus burns in excess oxygen?", o: [["{{P2O5}}", false, "That's the empirical formula; the molecule is P₄O₁₀."], ["{{P4O10}}", true, "Phosphorus(V) oxide, a simple molecular solid."], ["{{P4O6}}", false, "That forms in limited oxygen."], ["{{PO2}}", false, "Not a real oxide of P."]] } },
    { t: "explain", h: "Radii across the period",
      body: R`<p><b>Atomic radius decreases</b> from Na to Cl: nuclear charge increases while the outer electrons stay in shell 3 with similar shielding, so they're pulled closer.</p><p><b>Ionic radii</b>: {{Na+}}, {{Mg^2+}}, {{Al^3+}}, {{Si^4+}} have lost shell 3, so they're much smaller than their atoms, and shrink further as nuclear charge rises (all have 10 electrons). {{P^3-}}, {{S^2-}}, {{Cl-}} have gained electrons into shell 3, so they're large; they shrink from {{P^3-}} to {{Cl-}} as nuclear charge rises (all 18 electrons).</p>`,
      sim: { tab: 0, prop: "ionic" }, simLabel: "Chart the ionic radii",
      ask: { q: "Why is {{Mg^2+}} smaller than {{Na+}}?", o: [["Same number of electrons, but Mg²⁺ has more protons", true, "Both have 10 electrons; 12 protons pull them closer than 11."], ["Mg²⁺ has fewer shells", false, "Both have two shells."], ["Mg²⁺ has more electrons", false, "Both have 10."], ["Mg is a smaller atom only because it's in Group 2", false, "That's a description, not an explanation."]] } },
    { t: "explain", h: "Melting points and conductivity",
      body: R`<ul><li><b>Na → Mg → Al</b>: giant metallic. More delocalised electrons per atom (1, 2, 3) and smaller, more highly charged ions: stronger metallic bonding, higher m.p., better conductors.</li><li><b>Si</b>: giant covalent (like diamond). Very high m.p.; a semiconductor.</li><li><b>P₄, S₈, Cl₂, Ar</b>: simple molecular. Low m.p. set by instantaneous dipole–induced dipole forces, so bigger molecules melt higher: S₈ > P₄ > Cl₂ > Ar. Non-conductors.</li></ul>`,
      sim: { tab: 0, prop: "mp" }, simLabel: "Chart the melting points",
      ask: { q: "Why is the melting point of sulfur higher than that of phosphorus?", o: [["S–S bonds are stronger than P–P bonds", false, "Melting doesn't break the covalent bonds in S₈ or P₄."], ["S₈ molecules have more electrons than P₄, so stronger id–id forces", true, "S₈ has 128 electrons; P₄ has 60."], ["Sulfur is a giant covalent lattice", false, "Sulfur is simple molecular (S₈ rings)."], ["Sulfur is metallic", false, "Non-metal."]] } },
    { t: "explain", h: "Reactions with oxygen, chlorine and water",
      body: R`<div class="tbl-wrap"><table class="board"><tr><th>Element</th><th>with oxygen</th><th>with chlorine</th></tr><tr><td>Na</td><td>{{4Na + O2 -> 2Na2O}} (yellow flame)</td><td>{{2Na + Cl2 -> 2NaCl}}</td></tr><tr><td>Mg</td><td>{{2Mg + O2 -> 2MgO}} (bright white)</td><td>{{Mg + Cl2 -> MgCl2}}</td></tr><tr><td>Al</td><td>{{4Al + 3O2 -> 2Al2O3}}</td><td>{{2Al + 3Cl2 -> 2AlCl3}}</td></tr><tr><td>Si</td><td>{{Si + O2 -> SiO2}}</td><td>{{Si + 2Cl2 -> SiCl4}}</td></tr><tr><td>P</td><td>{{P4 + 5O2 -> P4O10}}</td><td>{{2P + 5Cl2 -> 2PCl5}}</td></tr><tr><td>S</td><td>{{S + O2 -> SO2}} (blue flame)</td><td>(not required)</td></tr></table></div><p>The oxidation number in the highest oxide/chloride rises from +1 to +5 (+6 in {{SO3}}): it equals the number of <b>outer electrons</b> used in bonding.</p><p>With water: {{2Na + 2H2O -> 2NaOH + H2}} (vigorous); {{Mg + 2H2O -> Mg(OH)2 + H2}} (very slow, cold water); {{Mg + H2O -> MgO + H2}} (steam).</p>`,
      ask: { q: "What is the oxidation number of Si in {{SiCl4}}, and why?", o: [["+4: Si uses all four outer electrons", true, "Max oxidation number = number of outer electrons."], ["−4: chlorine is less electronegative", false, "Cl is more electronegative than Si, so Si is positive."], ["+2", false, "That would leave outer electrons unused."], ["0: it's covalent", false, "Covalent compounds still have oxidation numbers."]] } },
    { t: "explain", h: "Oxides with water: basic → amphoteric → acidic",
      body: R`<div class="tbl-wrap"><table class="board"><tr><th>Oxide</th><th>Bonding</th><th>With water</th><th>pH</th></tr><tr><td>{{Na2O}}</td><td>ionic</td><td>{{Na2O + H2O -> 2NaOH}}</td><td>13–14</td></tr><tr><td>{{MgO}}</td><td>ionic</td><td>{{MgO + H2O -> Mg(OH)2}} (slightly soluble)</td><td>≈ 9</td></tr><tr><td>{{Al2O3}}</td><td>ionic, some covalent character</td><td>insoluble</td><td>7</td></tr><tr><td>{{SiO2}}</td><td>giant covalent</td><td>insoluble</td><td>7</td></tr><tr><td>{{P4O10}}</td><td>simple covalent</td><td>{{P4O10 + 6H2O -> 4H3PO4}}</td><td>≈ 2</td></tr><tr><td>{{SO2}} / {{SO3}}</td><td>simple covalent</td><td>{{SO2 + H2O -> H2SO3}}; {{SO3 + H2O -> H2SO4}}</td><td>≈ 2–3 / 1</td></tr></table></div><p><b>Amphoteric</b> {{Al2O3}} reacts with acids and bases: {{Al2O3 + 6HCl -> 2AlCl3 + 3H2O}} and {{Al2O3 + 2NaOH + 3H2O -> 2NaAl(OH)4}}. {{SiO2}} is acidic: it reacts with hot concentrated NaOH, {{SiO2 + 2NaOH -> Na2SiO3 + H2O}}.</p>`,
      sim: { tab: 1, sel: "Al2O3" }, simLabel: "Open the oxide table",
      ask: { q: "Which oxide reacts with both hydrochloric acid and sodium hydroxide?", o: [["{{MgO}}", false, "Basic only."], ["{{Al2O3}}", true, "Amphoteric."], ["{{SO2}}", false, "Acidic only."], ["{{Na2O}}", false, "Basic only."]] } },
    { t: "explain", h: "Chlorides with water",
      body: R`<div class="tbl-wrap"><table class="board"><tr><th>Chloride</th><th>Bonding</th><th>With water</th><th>pH</th></tr><tr><td>{{NaCl}}</td><td>ionic</td><td>dissolves, no reaction</td><td>7</td></tr><tr><td>{{MgCl2}}</td><td>ionic</td><td>dissolves, very slight hydrolysis</td><td>≈ 6.5</td></tr><tr><td>{{AlCl3}}</td><td>covalent ({{Al2Cl6}})</td><td>hydrolyses, white fumes of HCl</td><td>≈ 3</td></tr><tr><td>{{SiCl4}}</td><td>covalent</td><td>{{SiCl4 + 2H2O -> SiO2 + 4HCl}}</td><td>≈ 2</td></tr><tr><td>{{PCl5}}</td><td>covalent</td><td>{{PCl5 + 4H2O -> H3PO4 + 5HCl}}</td><td>≈ 2</td></tr></table></div><p>Ionic chlorides just dissolve. Covalent chlorides are <b>hydrolysed</b>: water attacks the central atom, releasing HCl, so the solution is acidic.</p>`,
      sim: { tab: 1, sel: "SiCl4" }, simLabel: "Open the chloride table",
      ask: { q: "Why is a solution of {{SiCl4}} in water strongly acidic?", o: [["{{SiCl4}} is an ionic compound", false, "It's a simple covalent molecule."], ["It is hydrolysed, producing HCl", true, "{{SiCl4 + 2H2O -> SiO2 + 4HCl}}."], ["Chloride ions are acidic", false, "{{Cl-}} alone gives pH 7 (as in NaCl)."], ["Si forms {{H2SiO3}}, a strong acid", false, "The acidity comes from HCl."]] } },
    { t: "worked", h: "Worked example: identify the element",
      prob: "Element X is in Period 3. Its oxide is a white solid with a high melting point that reacts with both dilute HCl and NaOH(aq). Its chloride sublimes at about 180 °C. Identify X and explain.",
      steps: [
        { s: R`Oxide reacts with acid <b>and</b> alkali: amphoteric. In Period 3, that's aluminium oxide.` },
        { s: R`A chloride that sublimes at a low temperature is covalent (simple molecular {{Al2Cl6}}), not ionic like {{NaCl}} or {{MgCl2}}.`, why: { q: "Why does a low sublimation point point to covalent bonding?", o: [["Only weak intermolecular forces need overcoming", true, "Ionic lattices melt at hundreds of °C higher."], ["Covalent bonds are weak", false, "The covalent bonds aren't broken on subliming."], ["Chlorine is a gas", false, "The compound's structure matters, not chlorine's state."]] } },
        { s: R`So X is <b>aluminium</b>.` },
      ] },
    { t: "complete", h: "Your turn",
      prob: "Phosphorus forms {{P4O10}} when burned in excess oxygen.", shown: [R`$4x + 10(-2) = 0$`],
      q: { q: "What is the oxidation number of P?", ans: 5, unit: "", label: "P =", hints: ["Oxygen is −2.", "4x = 20", "x = 5"], sol: [R`x=\frac{20}{4}=+5`], wrongs: [[20, "That's all four P atoms together."], [10, "There are 4 P atoms."]] } },
    { t: "solo", h: "On your own", gen: "oxP3" },
  ],
  mcq: [
    { q: "Which Period 3 element is the best electrical conductor?", o: [["Na", false, "One delocalised electron per atom."], ["Al", true, "Three delocalised electrons per atom."], ["Si", false, "A semiconductor."], ["S", false, "A non-conductor."]] },
    { q: "Which oxide dissolves in water to give the solution with the lowest pH?", o: [["{{Na2O}}", false, "Strongly alkaline."], ["{{MgO}}", false, "Weakly alkaline."], ["{{SO3}}", true, "Forms sulfuric acid, pH ≈ 1."], ["{{SiO2}}", false, "Insoluble, pH 7."]] },
    { q: "Which chloride gives a neutral solution in water?", o: [["{{NaCl}}", true, "Ionic: dissolves without hydrolysis."], ["{{AlCl3}}", false, "Hydrolysed: acidic."], ["{{SiCl4}}", false, "Hydrolysed: strongly acidic."], ["{{PCl5}}", false, "Hydrolysed: strongly acidic."]] },
    { q: "Atomic radius decreases across Period 3 because:", o: [["electrons are added to new shells", false, "They stay in shell 3."], ["nuclear charge increases with similar shielding", true, "Stronger pull on the same shell."], ["the atoms get lighter", false, "Mass increases."], ["metallic bonding gets stronger", false, "Not a reason for atomic radius."]] },
    { q: "{{SiO2}} reacts with hot, concentrated sodium hydroxide. This shows that {{SiO2}} is:", o: [["basic", false, "Basic oxides react with acids."], ["acidic", true, "{{SiO2 + 2NaOH -> Na2SiO3 + H2O}}."], ["amphoteric", false, "It doesn't react with acids."], ["ionic", false, "It's giant covalent."]] },
    { q: "Why does argon have the lowest melting point in Period 3?", o: [["It is a single atom with very weak id–id forces", true, "Only 18 electrons; single atoms."], ["It has the most protons", false, "That doesn't lower melting point."], ["It is giant covalent", false, "Monatomic."], ["It has hydrogen bonds", false, "No H."]] },
    { q: "The highest oxidation number of chlorine in its compounds with oxygen is +7. This is because chlorine:", o: [["has 7 outer electrons", true, "All seven can be used in bonding to the more electronegative oxygen."], ["is in Period 3", false, "Period doesn't set the number."], ["has 7 shells", false, "Three shells."], ["forms {{Cl-}}", false, "That's −1."]] },
  ],
  gens: {
    oxP3: () => {
      const s = pick([["Na", "Na2O", 1], ["Mg", "MgO", 2], ["Al", "Al2O3", 3], ["Si", "SiO2", 4], ["P", "P4O10", 5], ["S", "SO2", 4], ["S", "SO3", 6], ["Al", "AlCl3", 3], ["Si", "SiCl4", 4], ["P", "PCl5", 5], ["P", "P4O6", 3], ["P", "PCl3", 3], ["Mg", "MgCl2", 2]]);
      return { topic: "oxidation numbers in Period 3 compounds", q: `What is the oxidation number of ${s[0]} in {{${s[1]}}}?`, ans: s[2], unit: "", label: `${s[0]} =`,
        hints: ["O is −2 and Cl is −1 in these compounds.", "The total is zero for a neutral compound.", "Divide by the number of atoms of the element."],
        sol: [`<p>${s[0]} = +${s[2]}</p>`], wrongs: [[-s[2], "The less electronegative element is positive."]] };
    },
  },
  ex: [
    { q: "Explain the variation in melting point from sodium to aluminium.", pts: ["All three have giant metallic structures", "Number of delocalised electrons per atom increases (1, 2, 3)", "Ionic charge increases and ionic radius decreases", "So metallic bonding gets stronger and more energy is needed to melt"] },
    { q: "Describe and explain the reaction of aluminium chloride with water.", pts: ["{{AlCl3}} is covalent", "It is hydrolysed by water", "White fumes of HCl are given off", "The solution is acidic, pH about 3"] },
    { q: "Describe, with equations, the amphoteric nature of aluminium oxide.", pts: ["Amphoteric: reacts with both acids and bases", "{{Al2O3 + 6HCl -> 2AlCl3 + 3H2O}}", "{{Al2O3 + 2NaOH + 3H2O -> 2NaAl(OH)4}}", "(or with OH⁻ to form {{Al(OH)4-}})"] },
  ],
  traps: ["Melting simple molecular elements (P₄, S₈, Cl₂) breaks intermolecular forces, not covalent bonds.", "Silicon is giant covalent; its very high m.p. comes from breaking covalent bonds.", "{{Al2O3}} and {{SiO2}} are insoluble: pH 7. Their acid/base nature shows only with acids and alkalis.", "Phosphorus(V) oxide is {{P4O10}}, not {{P2O5}}, in AS mark schemes.", "Ionic chlorides dissolve; covalent chlorides are *hydrolysed*. Use that word."],
  defs: [["Periodicity", "The repeating pattern of physical and chemical properties across periods of the Periodic Table."], ["Amphoteric", "Able to react with both acids and bases."], ["Hydrolysis", "A reaction in which a compound is broken down by water."]],
});

/* ======================= UNIT 11 ======================= */
PX.unit({
  id: "11", n: 11, short: "Group 2", title: "Group 2", strand: "inorg", sim: "group2",
  intents: ["describe and write equations for reactions of Group 2 elements with oxygen, water and dilute acids", "describe reactions of Group 2 oxides, hydroxides and carbonates with water and with dilute acids", "describe the thermal decomposition of Group 2 nitrates and carbonates", "describe and predict trends in properties of Group 2 elements and compounds", "state the variation in solubility of Group 2 hydroxides and sulfates"],
  lesson: [
    { t: "predict", h: "Magnesium versus barium", body: "A piece of magnesium and a piece of barium are each dropped into cold water.", q: "What do you expect?",
      o: [["Both fizz equally", false, "Reactivity increases down Group 2."], ["Barium reacts vigorously; magnesium barely reacts", true, "Ba loses its two outer electrons much more easily."], ["Magnesium reacts faster because it's lighter", false, "Lightness isn't the factor; ionisation energy is."], ["Neither reacts with water", false, "Ca, Sr and Ba react readily."]],
      after: "Like Group 1 at IGCSE, Group 2 gets **more reactive down the group** because the outer electrons are easier to remove." },
    { t: "bridge", h: "From IGCSE to AS", igcse: ["Group 1 reactivity increases down the group", "Metal + water → hydroxide + hydrogen", "Metal + acid → salt + hydrogen", "Limestone: {{CaCO3 -> CaO + CO2}}"],
      as: ["Group 2 equations with O₂, water, acids", "**Solubility trends** of hydroxides and sulfates", "**Thermal decomposition** of carbonates and nitrates, and its trend", "Uses: {{Ca(OH)2}} for acidic soils, {{BaSO4}} test"],
      note: "Group 2 elements form 2+ ions in all their compounds. That one fact writes most formulas for you: {{MO}}, {{M(OH)2}}, {{MCO3}}, {{M(NO3)2}}.",
      ask: { q: "What is the formula of strontium nitrate?", o: [["{{SrNO3}}", false, "Sr²⁺ needs two NO₃⁻."], ["{{Sr(NO3)2}}", true, "One Sr²⁺, two NO₃⁻."], ["{{Sr2NO3}}", false, "Charges: 2(+2) + (−1) doesn't balance."], ["{{Sr(NO2)2}}", false, "That's strontium nitrite."]] } },
    { t: "explain", h: "Trends down the group",
      body: R`<p>Down Group 2 (Be, Mg, Ca, Sr, Ba):</p><ul><li>atomic radius <b>increases</b> (an extra shell each time);</li><li>first and second ionisation energies <b>decrease</b> (outer electrons further away and more shielded);</li><li>so <b>reactivity increases</b>: the metals lose 2 electrons more easily to form {{M^2+}}.</li></ul>`,
      sim: { tab: 0, prop: "ie" }, simLabel: "Chart the ionisation energies",
      ask: { q: "Why is barium more reactive than calcium?", o: [["Barium's outer electrons are further from the nucleus and more shielded, so easier to lose", true, "Lower IE₁ + IE₂."], ["Barium has fewer protons", false, "Many more (56 vs 20)."], ["Barium is a transition metal", false, "Group 2."], ["Barium's ions are smaller", false, "Ba²⁺ is larger."]] } },
    { t: "explain", h: "Reactions with oxygen, water and acids",
      body: R`<ul><li><b>Oxygen</b>: {{2M + O2 -> 2MO}}. Mg burns with a brilliant white flame.</li><li><b>Water</b>: {{M + 2H2O -> M(OH)2 + H2}}. Mg: very slow with cold water; with steam {{Mg + H2O -> MgO + H2}}. Ca, Sr, Ba: increasingly vigorous.</li><li><b>Dilute HCl</b>: {{M + 2HCl -> MCl2 + H2}}.</li><li><b>Dilute H₂SO₄</b>: Ca, Sr, Ba quickly stop because an insoluble sulfate coats the metal.</li><li><b>Oxides</b> with water give hydroxides ({{CaO + H2O -> Ca(OH)2}}); oxides, hydroxides and carbonates neutralise acids.</li></ul>`,
      sim: { tab: 1 }, simLabel: "Open the reaction bench",
      ask: { q: "What is the equation for calcium reacting with water?", o: [["{{Ca + 2H2O -> Ca(OH)2 + H2}}", true, "Hydroxide plus hydrogen."], ["{{Ca + H2O -> CaO + H2}}", false, "That's the steam reaction (for Mg)."], ["{{2Ca + 2H2O -> 2CaOH + H2}}", false, "Ca forms Ca²⁺, so Ca(OH)₂."], ["{{Ca + 2H2O -> CaH2 + O2}}", false, "Not a real reaction."]] } },
    { t: "explain", h: "Solubility trends",
      body: R`<div class="callout key"><b>Hydroxides</b> get <b>more</b> soluble down the group. <b>Sulfates</b> get <b>less</b> soluble down the group.</div><ul><li>{{Mg(OH)2}} is sparingly soluble (used as an antacid); {{Ba(OH)2}} is fairly soluble. So a saturated solution's pH rises down the group.</li><li>{{MgSO4}} is soluble; {{BaSO4}} is insoluble. Test for sulfate: add acidified {{BaCl2(aq)}}, a white precipitate of {{BaSO4}} forms.</li><li>{{Ca(OH)2}} (slaked lime) neutralises acidic soil.</li></ul>`,
      ask: { q: "Which is least soluble in water?", o: [["{{MgSO4}}", false, "Very soluble."], ["{{BaSO4}}", true, "Sulfates get less soluble down the group."], ["{{Ba(OH)2}}", false, "Hydroxides get more soluble down the group."], ["{{CaSO4}}", false, "Sparingly soluble, but more than BaSO₄."]] } },
    { t: "explain", h: "Thermal decomposition",
      body: R`<ul><li>Carbonates: {{MCO3 -> MO + CO2}}</li><li>Nitrates: {{2M(NO3)2 -> 2MO + 4NO2 + O2}} (brown {{NO2}} gas)</li></ul><p><b>Thermal stability increases down the group</b>: {{MgCO3}} decomposes at about 540 °C, {{BaCO3}} only above 1300 °C. The smaller {{Mg^2+}} ion has a higher charge density, so it distorts (polarises) the large carbonate ion more and weakens its C–O bonds.</p>`,
      sim: { tab: 2 }, simLabel: "Chart decomposition temperatures",
      ask: { q: "Which carbonate decomposes at the lowest temperature?", o: [["{{MgCO3}}", true, "Least thermally stable: Mg²⁺ polarises the carbonate ion most."], ["{{CaCO3}}", false, "About 900 °C."], ["{{SrCO3}}", false, "Higher still."], ["{{BaCO3}}", false, "The most stable."]] } },
    { t: "worked", h: "Worked example: decomposing a carbonate",
      prob: "5.00 g of calcium carbonate is heated to constant mass. What mass of calcium oxide remains? (Mr {{CaCO3}} 100.1, {{CaO}} 56.1)",
      steps: [
        { s: R`$n(\text{CaCO}_3)=5.00/100.1=0.04995$ mol` },
        { s: R`{{CaCO3 -> CaO + CO2}}: ratio 1 : 1, so $n(\text{CaO})=0.04995$ mol.`, why: { q: "Why heat to constant mass?", o: [["To make sure decomposition is complete", true, "No more CO₂ is being lost."], ["To dry the sample", false, "Different purpose."], ["To make the oxide react with air", false, "We want to avoid that."]] } },
        { s: R`$m=0.04995\times56.1=2.80$ g` },
      ] },
    { t: "complete", h: "Your turn",
      prob: "0.0200 mol of magnesium nitrate is heated: {{2Mg(NO3)2 -> 2MgO + 4NO2 + O2}}.", shown: [R`Each 2 mol of nitrate gives 4 + 1 = 5 mol of gas.`],
      q: { q: "Total volume of gas at r.t.p. (24.0 dm³ mol⁻¹), in dm³:", ans: 1.2, unit: "dm³", label: "V =", hints: ["Moles of gas = 0.0200 × 5/2.", "= 0.0500 mol.", "× 24.0"], sol: [R`n=0.0200\times\frac52=0.0500;\ V=0.0500\times24.0=1.20\ \text{dm}^3`], wrongs: [[0.96, "Include the oxygen as well as NO₂."], [2.4, "The ratio is 5 gas : 2 nitrate."]] } },
    { t: "solo", h: "On your own", gen: "decomp" },
  ],
  mcq: [
    { q: "A white solid gives off a brown gas and a gas that relights a glowing splint when heated. It could be:", o: [["{{CaCO3}}", false, "Gives only CO₂ (colourless)."], ["{{Ca(NO3)2}}", true, "NO₂ (brown) and O₂ (relights splint)."], ["{{Ca(OH)2}}", false, "Gives water vapour."], ["{{CaSO4}}", false, "Very stable."]] },
    { q: "Which Group 2 hydroxide gives the most alkaline saturated solution?", o: [["{{Mg(OH)2}}", false, "Least soluble."], ["{{Ca(OH)2}}", false, "Sparingly soluble."], ["{{Sr(OH)2}}", false, "More soluble than Ca(OH)₂ but less than Ba(OH)₂."], ["{{Ba(OH)2}}", true, "Most soluble, highest [OH⁻]."]] },
    { q: "Why does the reaction between barium and dilute sulfuric acid soon stop?", o: [["Barium is unreactive", false, "Barium is very reactive."], ["Insoluble barium sulfate coats the metal", true, "A layer of BaSO₄ blocks the acid."], ["The acid becomes concentrated", false, "It's being used up, not concentrated."], ["Hydrogen gas forms a barrier", false, "Gas escapes."]] },
    { q: "Magnesium reacts with steam to form:", o: [["{{Mg(OH)2}} and {{H2}}", false, "That's with cold water."], ["{{MgO}} and {{H2}}", true, "{{Mg + H2O -> MgO + H2}}."], ["{{MgO}} and {{O2}}", false, "Hydrogen is released, not oxygen."], ["{{MgH2}}", false, "Not formed."]] },
    { q: "Down Group 2, which property increases?", o: [["first ionisation energy", false, "Decreases."], ["solubility of sulfates", false, "Decreases."], ["thermal stability of carbonates", true, "Larger cations polarise the anion less."], ["electronegativity", false, "Decreases."]] },
    { q: "Which compound is used to neutralise acidic soil?", o: [["{{CaCO3}} or {{Ca(OH)2}}", true, "Limestone or slaked lime."], ["{{BaSO4}}", false, "Insoluble and not basic."], ["{{MgSO4}}", false, "A neutral salt."], ["{{CaCl2}}", false, "Neutral."]] },
  ],
  gens: {
    decomp: () => {
      const c = pick([["MgCO3", 84.3, "MgO", 40.3], ["CaCO3", 100.1, "CaO", 56.1], ["SrCO3", 147.6, "SrO", 103.6], ["BaCO3", 197.3, "BaO", 153.3]]);
      const m = rnd(1, 10, 2), ans = m / c[1] * c[3];
      return { topic: "thermal decomposition mass", q: `${m} g of {{${c[0]}}} (Mr ${c[1]}) is heated to constant mass. What mass of {{${c[2]}}} (Mr ${c[3]}) remains?`, ans, unit: "g", label: "mass =",
        hints: ["Write the equation: MCO₃ → MO + CO₂.", "Moles of carbonate = moles of oxide.", `(${m}/${c[1]}) × ${c[3]}`],
        sol: [R`n=\frac{${m}}{${c[1]}}=${tn(m / c[1])};\ m=${tn(m / c[1])}\times${c[3]}=${tn(ans)}\ \text{g}`], wrongs: [[m - m / c[1] * c[3], "That's the mass of CO₂ lost."]] };
    },
    h2: () => {
      const e = pick([["Ca", 40.1], ["Sr", 87.6], ["Ba", 137.3], ["Mg", 24.3]]), m = rnd(0.2, 2.5, 2);
      const ans = m / e[1] * 24.0 * 1000;
      return { topic: "hydrogen volume from a Group 2 metal", q: `${m} g of ${e[0]} (Ar ${e[1]}) reacts completely with ${e[0] === "Mg" ? "dilute hydrochloric acid" : "water"}. What volume of hydrogen forms at r.t.p., in cm³? (24 000 cm³ mol⁻¹)`, ans, unit: "cm³", label: "V =",
        hints: ["One mole of metal gives one mole of H₂.", `n = ${m}/${e[1]}`, "× 24 000 cm³"],
        sol: [R`V=\frac{${m}}{${e[1]}}\times24000=${tn(ans)}\ \text{cm}^3`], wrongs: [[ans / 1000, "In cm³, not dm³."], [ans * 2, "1 mol metal → 1 mol H₂."]] };
    },
  },
  ex: [
    { q: "Describe the trends in solubility of the Group 2 hydroxides and sulfates, and give one use that depends on each.", pts: ["Hydroxides become more soluble down the group", "Sulfates become less soluble down the group", "e.g. {{Ca(OH)2}} / {{Mg(OH)2}} used to neutralise acid (soil / antacid)", "e.g. {{BaCl2}} test for sulfate ions (white {{BaSO4}} ppt) / {{BaSO4}} meal"] },
    { q: "Explain why the thermal stability of Group 2 carbonates increases down the group.", pts: ["Cation radius increases down the group (same 2+ charge)", "Charge density of the cation decreases", "So the cation polarises / distorts the carbonate ion less", "The C–O bonds are weakened less, so a higher temperature is needed"] },
  ],
  traps: ["Hydroxides: more soluble down. Sulfates: less soluble down. They go opposite ways.", "Mg with cold water gives {{Mg(OH)2}}; with steam gives {{MgO}}.", "Nitrate decomposition gives three products: oxide, {{NO2}} and {{O2}}. Balance with 2 : 2 : 4 : 1.", "Group 2 metal ions are always 2+: Ba(OH)₂, not BaOH."],
  defs: [["Thermal decomposition", "The breakdown of a compound into simpler substances by heating."], ["Thermal stability", "How resistant a compound is to decomposition on heating; higher stability means a higher decomposition temperature."]],
});

/* ======================= UNIT 12 ======================= */
PX.unit({
  id: "12", n: 12, short: "Group 17", title: "Group 17", strand: "inorg", sim: "halogens",
  intents: ["describe the colours of chlorine, bromine and iodine and explain the trend in volatility", "describe and explain the reactivity of the halogens as oxidising agents and the halide ions as reducing agents", "describe the reactions of the elements with hydrogen and explain the thermal stability of the hydrides", "describe the reactions of halide ions with aqueous silver ions followed by ammonia, and with concentrated sulfuric acid", "describe the disproportionation of chlorine with cold and hot aqueous sodium hydroxide", "explain the use of chlorine in water purification"],
  lesson: [
    { t: "predict", h: "Will iodine displace bromide?", body: "Iodine solution is added to potassium bromide solution.", q: "What happens?",
      o: [["Bromine forms and the solution turns orange", false, "That would need iodine to be a stronger oxidising agent than bromine."], ["No reaction", true, "Iodine is a weaker oxidising agent than bromine, so it can't take electrons from Br⁻."], ["A yellow precipitate forms", false, "That's silver iodide, a different test."]],
      after: "Oxidising power **decreases** down Group 17. A halogen only displaces halides *below* it." },
    { t: "bridge", h: "From IGCSE to AS", igcse: ["Colours and states of Cl₂, Br₂, I₂", "Reactivity decreases down the group", "Displacement reactions"],
      as: ["Explain volatility with intermolecular forces", "Halogens as **oxidising agents**; halides as **reducing agents**", "H–X bond strength and **thermal stability**", "Halide tests: {{AgNO3}} then {{NH3}}; concentrated {{H2SO4}}", "Chlorine's **disproportionation** in NaOH; water treatment"],
      note: "IGCSE said \"more reactive\". AS says *why*: a smaller halogen atom attracts an extra electron more strongly.",
      ask: { q: "In {{Cl2 + 2Br- -> 2Cl- + Br2}}, chlorine acts as:", o: [["an oxidising agent", true, "It takes electrons from Br⁻ and is reduced to Cl⁻."], ["a reducing agent", false, "It gains electrons."], ["a catalyst", false, "It's consumed."], ["an acid", false, "No protons are transferred."]] } },
    { t: "explain", h: "Colours and volatility",
      body: R`<div class="tbl-wrap"><table class="board"><tr><th>Element</th><th>State (r.t.p.)</th><th>Colour</th><th>In hexane / vapour</th></tr><tr><td>{{Cl2}}</td><td>gas</td><td>pale yellow-green</td><td>pale yellow-green</td></tr><tr><td>{{Br2}}</td><td>liquid</td><td>red-brown</td><td>orange (red-brown vapour)</td></tr><tr><td>{{I2}}</td><td>solid</td><td>grey-black</td><td>purple vapour, violet in hexane</td></tr></table></div><p><b>Volatility decreases</b> down the group: larger molecules with more electrons have stronger instantaneous dipole–induced dipole forces, so more energy is needed to separate them.</p>`,
      sim: { tab: 2 }, simLabel: "See the colours",
      ask: { q: "Why is iodine a solid but chlorine a gas at room temperature?", o: [["I–I bonds are stronger than Cl–Cl bonds", false, "I–I (151) is weaker than Cl–Cl (242); and bonds aren't broken on melting."], ["{{I2}} has more electrons, so stronger id–id forces between molecules", true, "More polarisable electron cloud."], ["Iodine forms hydrogen bonds", false, "No H."], ["Iodine is ionic", false, "Covalent molecules."]] } },
    { t: "explain", h: "Oxidising power and reducing power",
      body: R`<p>Halogens oxidise by gaining an electron. A <b>smaller atom</b> attracts the incoming electron more strongly (less shielding, closer to the nucleus), so <b>oxidising power: Cl₂ > Br₂ > I₂</b>.</p><ul><li>{{Cl2 + 2Br- -> 2Cl- + Br2}} (orange/yellow)</li><li>{{Cl2 + 2I- -> 2Cl- + I2}} (brown)</li><li>{{Br2 + 2I- -> 2Br- + I2}} (brown)</li></ul><p>The halide ions work the other way: <b>reducing power: I⁻ > Br⁻ > Cl⁻</b>, because a larger ion loses its outer electron more easily.</p>`,
      sim: { tab: 2 }, simLabel: "Try displacement",
      ask: { q: "Which halide ion is the strongest reducing agent?", o: [["{{F-}}", false, "The weakest of all."], ["{{Cl-}}", false, "Weak."], ["{{Br-}}", false, "Stronger than Cl⁻, but…"], ["{{I-}}", true, "Largest ion: outer electron furthest from the nucleus and most shielded."]] } },
    { t: "explain", h: "Hydrogen halides and thermal stability",
      body: R`<p>{{H2 + X2 -> 2HX}}: fluorine explodes even in the dark; chlorine explodes in sunlight; bromine needs heat and a catalyst; iodine reacts slowly and reversibly.</p><div class="tbl-wrap"><table class="board"><tr><th>Bond</th><th>H–F</th><th>H–Cl</th><th>H–Br</th><th>H–I</th></tr><tr><td>Bond energy / kJ mol⁻¹</td><td>562</td><td>431</td><td>366</td><td>299</td></tr></table></div><p><b>Thermal stability decreases down the group</b> because the H–X bond gets longer and weaker. A hot glass rod in HI gives violet iodine vapour; HCl is unchanged.</p>`,
      ask: { q: "Why does hydrogen iodide decompose more easily than hydrogen chloride?", o: [["The H–I bond is weaker", true, "Longer bond, less overlap: 299 vs 431 kJ mol⁻¹."], ["HI is ionic", false, "Polar covalent."], ["Iodine is more electronegative", false, "Less electronegative."], ["HI has weaker intermolecular forces", false, "Decomposition breaks covalent bonds, not intermolecular forces."]] } },
    { t: "explain", h: "Testing for halide ions",
      body: R`<div class="tbl-wrap"><table class="board"><tr><th>Ion</th><th>+ {{AgNO3(aq)}} (with dilute {{HNO3}})</th><th>+ dilute {{NH3}}</th><th>+ conc. {{NH3}}</th></tr><tr><td>{{Cl-}}</td><td>white ppt {{AgCl}}</td><td>dissolves</td><td>dissolves</td></tr><tr><td>{{Br-}}</td><td>cream ppt {{AgBr}}</td><td>no change</td><td>dissolves</td></tr><tr><td>{{I-}}</td><td>yellow ppt {{AgI}}</td><td>no change</td><td>no change</td></tr></table></div><p><b>Concentrated {{H2SO4}}</b> with solid sodium halides:</p><ul><li>NaCl: {{NaCl + H2SO4 -> NaHSO4 + HCl}}: steamy fumes only. {{Cl-}} isn't a strong enough reducing agent to reduce {{H2SO4}}.</li><li>NaBr: HBr, then {{2HBr + H2SO4 -> Br2 + SO2 + 2H2O}}: orange-brown fumes. S goes +6 → +4.</li><li>NaI: HI, then {{I2}} (purple fumes / black solid), {{SO2}}, yellow S and {{H2S}} (rotten eggs). S reduced to +4, 0 and −2.</li></ul>`,
      sim: { tab: 0 }, simLabel: "Open the test tubes",
      ask: { q: "A solution gives a cream precipitate with acidified silver nitrate that dissolves in concentrated, but not dilute, ammonia. The ion is:", o: [["{{Cl-}}", false, "AgCl is white and dissolves in dilute NH₃."], ["{{Br-}}", true, "Cream AgBr, soluble only in concentrated NH₃."], ["{{I-}}", false, "AgI is yellow and insoluble in both."], ["{{SO4^2-}}", false, "Tested with BaCl₂."]] } },
    { t: "explain", h: "Chlorine with sodium hydroxide, and in water",
      body: R`<ul><li><b>Cold</b> dilute NaOH: {{Cl2 + 2NaOH -> NaCl + NaClO + H2O}}. Cl: 0 → −1 and 0 → +1 (sodium chlorate(I), bleach).</li><li><b>Hot</b> concentrated NaOH: {{3Cl2 + 6NaOH -> 5NaCl + NaClO3 + 3H2O}}. Cl: 0 → −1 and 0 → +5.</li></ul><p>Both are <b>disproportionation</b>. In water, {{Cl2 + H2O <=> HCl + HClO}}; chloric(I) acid, HClO, kills bacteria, which is why chlorine is used to treat drinking water.</p>`,
      ask: { q: "What is the oxidation number of chlorine in {{NaClO3}}?", o: [["+1", false, "That's NaClO."], ["+3", false, "Calculate: +1 + x − 6 = 0."], ["+5", true, "x = 6 − 1 = +5: sodium chlorate(V)."], ["+7", false, "That's NaClO₄."]] } },
    { t: "worked", h: "Worked example: explaining the sulfuric acid results",
      prob: "Explain why sodium bromide with concentrated sulfuric acid gives orange-brown fumes, but sodium chloride gives only steamy fumes.",
      steps: [
        { s: R`Both first give the hydrogen halide: {{NaX + H2SO4 -> NaHSO4 + HX}} (steamy fumes).` },
        { s: R`{{Br-}} is a stronger reducing agent than {{Cl-}}, because it's larger and loses an electron more easily.`, why: { q: "Why does ion size matter for reducing power?", o: [["The outer electron of a larger ion is further from the nucleus and more shielded", true, "So it's lost more easily."], ["Larger ions have more protons pulling harder", false, "Shielding and distance outweigh that."], ["Smaller ions dissolve better", false, "Not relevant."]] } },
        { s: R`So HBr reduces {{H2SO4}} (S +6 → +4 in {{SO2}}) and is oxidised to {{Br2}} (orange-brown). HCl can't reduce {{H2SO4}}.` },
      ] },
    { t: "complete", h: "Your turn",
      prob: "Chlorine reacts with hot sodium hydroxide: {{3Cl2 + 6NaOH -> 5NaCl + NaClO3 + 3H2O}}.", shown: [R`In {{NaClO3}}: $+1 + x + 3(-2)=0$`],
      q: { q: "Change in oxidation number of the chlorine that is oxidised (from 0):", ans: 5, unit: "", label: "change =", hints: ["Solve for x in NaClO₃.", "x = +5", "From 0 to +5"], sol: [R`0\to+5:\ \text{an increase of }5`], wrongs: [[1, "That's the cold reaction, chlorate(I)."], [-1, "That's the chlorine that is reduced, to Cl⁻."]] } },
    { t: "solo", h: "On your own", gen: "agcl" },
  ],
  mcq: [
    { q: "Which reagent distinguishes {{NaBr(aq)}} from {{NaI(aq)}}?", o: [["dilute HCl", false, "No reaction with either."], ["{{AgNO3(aq)}} followed by concentrated {{NH3}}", true, "AgBr dissolves in conc. NH₃; AgI doesn't."], ["{{BaCl2(aq)}}", false, "Test for sulfate."], ["NaOH(aq)", false, "No reaction with either."]] },
    { q: "Which hydrogen halide is least thermally stable?", o: [["HF", false, "Strongest H–X bond."], ["HCl", false, "Stable to heat."], ["HBr", false, "Partly decomposes."], ["HI", true, "Weakest H–X bond."]] },
    { q: "What colour is iodine vapour?", o: [["orange", false, "Bromine solution."], ["purple", true, "Violet/purple vapour."], ["yellow-green", false, "Chlorine."], ["colourless", false, "No."]] },
    { q: "Which products form when solid NaI reacts with concentrated {{H2SO4}}?", o: [["HI only", false, "I⁻ is a strong reducing agent, so it goes further."], ["HI, {{I2}}, {{SO2}}, S and {{H2S}}", true, "Sulfur is reduced to +4, 0 and −2."], ["{{I2}} and {{SO3}}", false, "Sulfur is reduced, not oxidised."], ["{{NaHSO4}} and {{Cl2}}", false, "No chlorine involved."]] },
    { q: "Chlorine is added to drinking water because:", o: [["it forms HClO, which kills bacteria", true, "{{Cl2 + H2O <=> HCl + HClO}}."], ["it removes hardness", false, "No."], ["it neutralises acids", false, "It makes acids."], ["it adds fluoride", false, "Different element."]] },
    { q: "Why does oxidising power decrease from chlorine to iodine?", o: [["Atomic radius increases, so an incoming electron is attracted less strongly", true, "More shielding and distance."], ["Nuclear charge decreases", false, "Increases."], ["Bond energy decreases", false, "Not the main reason for gaining electrons."], ["Electronegativity increases", false, "Decreases."]] },
  ],
  gens: {
    agcl: () => {
      const s = pick([["NaCl", "AgCl", 143.4, 58.5], ["KBr", "AgBr", 187.8, 119.0], ["KI", "AgI", 234.8, 166.0], ["NaBr", "AgBr", 187.8, 102.9]]);
      const m = rnd(0.2, 3, 2), ans = m / s[3] * s[2];
      return { topic: "mass of silver halide precipitate", q: `${m} g of {{${s[0]}}} (Mr ${s[3]}) is dissolved and excess acidified {{AgNO3(aq)}} is added. What mass of {{${s[1]}}} (Mr ${s[2]}) precipitates?`, ans, unit: "g", label: "mass =",
        hints: ["Moles of halide = moles of silver halide (1 : 1).", `n = ${m}/${s[3]}`, `× ${s[2]}`],
        sol: [R`m=\frac{${m}}{${s[3]}}\times${s[2]}=${tn(ans)}\ \text{g}`], wrongs: [[m / s[2] * s[3], "Mr values are swapped."]] };
    },
    oxcl: () => {
      const s = pick([["HCl", -1], ["Cl2", 0], ["HClO", 1], ["NaClO", 1], ["ClO2", 4], ["NaClO3", 5], ["KClO4", 7], ["Cl2O7", 7], ["ClO-", 1], ["ClO3-", 5]]);
      return { topic: "oxidation numbers of chlorine", q: `What is the oxidation number of chlorine in {{${s[0]}}}?`, ans: s[1], unit: "", label: "Cl =",
        hints: ["O is −2, H is +1, Na and K are +1.", "Sum = overall charge.", "Solve for x."], sol: [`<p>Cl = ${s[1] > 0 ? "+" : ""}${s[1]}</p>`], wrongs: [[-s[1], "Check the sign."]].filter(w => w[0] !== s[1]) };
    },
  },
  ex: [
    { q: "Describe how you would show that a solution contains bromide ions and not chloride or iodide ions.", pts: ["Add dilute nitric acid, then silver nitrate solution", "A cream precipitate forms (AgBr)", "Add dilute ammonia: precipitate does not dissolve (AgCl would)", "Add concentrated ammonia: precipitate dissolves (AgI would not)"] },
    { q: "Explain why the volatility of the halogens decreases from chlorine to iodine.", pts: ["Halogens are simple molecular / diatomic", "Down the group, molecules have more electrons", "Stronger instantaneous dipole–induced dipole forces", "More energy needed to separate molecules, so less volatile"] },
  ],
  traps: ["Acidify with dilute nitric acid (not HCl, which adds Cl⁻) before adding AgNO₃.", "AgCl: white, dissolves in dilute NH₃. AgBr: cream, only concentrated. AgI: yellow, neither.", "Thermal stability of HX depends on H–X bond strength, not on intermolecular forces.", "Cold NaOH → chlorate(I) (+1); hot NaOH → chlorate(V) (+5).", "Volatility is about intermolecular forces; reactivity is about gaining electrons."],
  defs: [["Volatility", "The tendency of a substance to vaporise; a volatile substance has a low boiling point."], ["Oxidising agent", "A species that accepts electrons and is itself reduced."], ["Disproportionation", "A redox reaction in which the same element is simultaneously oxidised and reduced."]],
});

/* ======================= UNIT 13 ======================= */
PX.unit({
  id: "13", n: 13, short: "Nitrogen", title: "Nitrogen and its compounds", strand: "inorg", sim: "nitrogen",
  intents: ["describe and explain the lack of reactivity of nitrogen gas", "describe the basicity of ammonia and the formation and structure of the ammonium ion", "describe the displacement of ammonia from ammonium salts", "state the natural and human-made sources of oxides of nitrogen and their catalytic removal from car exhausts", "explain why atmospheric oxides of nitrogen are pollutants, including their role in photochemical smog and in the catalytic oxidation of sulfur dioxide"],
  lesson: [
    { t: "predict", h: "78% of the air", body: "Nitrogen makes up 78% of the air we breathe in, yet we breathe out almost exactly the same amount.", q: "Why is nitrogen so unreactive?",
      o: [["It's a noble gas", false, "Nitrogen is in Group 15."], ["The N≡N triple bond is very strong and the molecule is non-polar", true, "944 kJ mol⁻¹, and no δ+ or δ− sites to attract other reactants."], ["It has no electrons to share", false, "It has five outer electrons."], ["It's too light", false, "Mass isn't the issue."]],
      after: "It takes extreme conditions (lightning, car engines, the Haber process with a catalyst) to break that triple bond." },
    { t: "bridge", h: "From IGCSE to AS", igcse: ["Air is 78% nitrogen", "Haber process and fertilisers", "Test for ammonia: damp red litmus turns blue", "Oxides of nitrogen and acid rain"],
      as: ["Why N₂ is unreactive (bond energy, non-polar)", "Ammonia as a **Brønsted–Lowry base**; the {{NH4+}} ion", "Displacing ammonia with a base", "Catalytic converters: equations", "**Photochemical smog**; {{NO2}} as a catalyst for {{SO2}} oxidation"],
      note: "This short unit links back to bonding (Unit 4), equilibria (Unit 8) and catalysis (Unit 9).",
      ask: { q: "What is the shape of the ammonium ion?", o: [["trigonal pyramidal", false, "That's NH₃, with a lone pair."], ["tetrahedral", true, "Four bonding pairs, no lone pairs: 109.5°."], ["trigonal planar", false, "That needs three pairs."], ["square planar", false, "Needs six pairs with two lone pairs."]] } },
    { t: "explain", h: "Why nitrogen is so unreactive",
      body: R`<ul><li>The <b>N≡N triple bond</b> (1 σ + 2 π) has a bond energy of 944 kJ mol⁻¹, among the strongest bonds known. Reactions need a very high activation energy.</li><li>{{N2}} is <b>non-polar</b>: no partial charges to attract electrophiles or nucleophiles.</li></ul>`,
      ask: { q: "Which is NOT a reason for the low reactivity of {{N2}}?", o: [["high bond energy of N≡N", false, "That is a reason."], ["the molecule is non-polar", false, "That is a reason."], ["N has a full outer shell of 8 electrons as an atom", true, "False: an N atom has 5 outer electrons. The molecule's stability comes from the triple bond."], ["high activation energy for its reactions", false, "That follows from the strong bond."]] } },
    { t: "explain", h: "Ammonia and the ammonium ion",
      body: R`<p>Ammonia's lone pair accepts a proton, so it's a <b>Brønsted–Lowry base</b>:</p><div class="eq">{{NH3 + H2O <=> NH4+ + OH-}} &nbsp;&nbsp; {{NH3 + HCl -> NH4Cl}}</div><p>In {{NH4+}}, the new N–H bond is a <b>co-ordinate (dative) bond</b>. Once formed, all four N–H bonds are identical; the ion is tetrahedral, 109.5°.</p><p>Ammonia is a <b>weak</b> base: only partly protonated in water.</p>`,
      ask: { q: "Why can ammonia act as a base?", o: [["It contains hydrogen", false, "Acids donate H⁺; bases accept it."], ["N has a lone pair that can accept a proton", true, "Forming a dative bond to H⁺."], ["It is a gas", false, "Irrelevant."], ["It contains OH⁻", false, "OH⁻ forms only when it reacts with water."]] } },
    { t: "explain", h: "Displacing ammonia from ammonium salts",
      body: R`<p>Warm an ammonium salt with a base (NaOH, {{Ca(OH)2}}): the stronger base takes the proton, releasing ammonia gas.</p><div class="eq">{{NH4+ + OH- -> NH3 + H2O}}<br>{{2NH4Cl + Ca(OH)2 -> CaCl2 + 2NH3 + 2H2O}}</div><p>Test: ammonia turns damp red litmus blue. Farmers must not add lime to soil at the same time as ammonium fertiliser, or ammonia is lost.</p>`,
      ask: { q: "Which gives ammonia when warmed?", o: [["{{NH4Cl}} with NaOH(aq)", true, "OH⁻ removes H⁺ from NH₄⁺."], ["{{NH4Cl}} with HCl(aq)", false, "Acids don't release ammonia."], ["{{NaNO3}} with NaOH(aq)", false, "No ammonium ion."], ["{{NH4Cl}} with water", false, "Just dissolves."]] } },
    { t: "explain", h: "Oxides of nitrogen and catalytic converters",
      body: R`<p>Lightning and hot car engines provide the energy for {{N2 + O2 -> 2NO}}; then {{2NO + O2 -> 2NO2}}.</p><p><b>Catalytic converters</b> (Pt, Rh, Pd on a ceramic honeycomb) remove NO and CO together:</p><div class="eq">{{2CO + 2NO -> 2CO2 + N2}}</div><p>They also oxidise unburned hydrocarbons to {{CO2}} and {{H2O}}.</p>`,
      sim: { tab: 0 }, simLabel: "Open the exhaust model",
      ask: { q: "In {{2CO + 2NO -> 2CO2 + N2}}, which species is reduced?", o: [["CO", false, "C goes +2 → +4: oxidised."], ["NO", true, "N goes +2 → 0."], ["{{CO2}}", false, "Product."], ["{{N2}}", false, "Product."]] } },
    { t: "explain", h: "Smog and acid rain",
      body: R`<p><b>Photochemical smog</b>: sunlight splits {{NO2}}, and the oxygen atoms make ozone, which with unburned hydrocarbons forms irritants such as PAN (peroxyacetyl nitrate):</p><div class="eq">{{NO2 ->[uv] NO + O}} &nbsp;&nbsp; {{O + O2 -> O3}}</div><p><b>Catalytic oxidation of {{SO2}}</b>: {{NO2}} oxidises {{SO2}} and is regenerated, so it acts as a homogeneous catalyst:</p><div class="eq">{{SO2 + NO2 -> SO3 + NO}}<br>{{NO + 1/2O2 -> NO2}}</div><p>{{SO3}} then forms sulfuric acid in rain. {{NO2}} also forms nitric acid: {{4NO2 + O2 + 2H2O -> 4HNO3}}.</p>`,
      sim: { tab: 1 }, simLabel: "Step through the catalytic cycle",
      ask: { q: "Why is {{NO2}} described as a catalyst in the atmospheric oxidation of {{SO2}}?", o: [["It is used up and replaced by {{NO}}", false, "It's regenerated from NO."], ["It takes part but is regenerated, so the overall equation doesn't include it", true, "Overall: {{SO2 + 1/2O2 -> SO3}}."], ["It absorbs sunlight", false, "That's for smog, not this cycle."], ["It reacts with water", false, "That makes nitric acid, a different process."]] } },
    { t: "worked", h: "Worked example: making ammonia",
      prob: "What volume of ammonia (at r.t.p.) forms when 5.35 g of ammonium chloride ({{NH4Cl}}, Mr 53.5) is heated with excess calcium hydroxide?",
      steps: [
        { s: R`{{2NH4Cl + Ca(OH)2 -> CaCl2 + 2NH3 + 2H2O}}` },
        { s: R`$n(\text{NH}_4\text{Cl})=5.35/53.5=0.100$ mol, so $n(\text{NH}_3)=0.100$ mol.`, why: { q: "Why is the ratio 1 : 1?", o: [["2 NH₄Cl give 2 NH₃", true, "Each ammonium ion gives one ammonia molecule."], ["Ca(OH)₂ has two OH⁻", false, "That's why 2 NH₄Cl react per Ca(OH)₂; the NH₄Cl : NH₃ ratio is still 1 : 1."], ["Gases are always 1 : 1", false, "No such rule."]] } },
        { s: R`$V=0.100\times24.0=2.40$ dm³` },
      ] },
    { t: "complete", h: "Your turn",
      prob: "Nitrogen dioxide is {{NO2}}.", shown: [R`$x+2(-2)=0$`],
      q: { q: "Oxidation number of N in {{NO2}}:", ans: 4, unit: "", label: "N =", hints: ["O is −2.", "x − 4 = 0", "x = +4"], sol: [R`x=+4`], wrongs: [[2, "That's NO."]] } },
    { t: "solo", h: "On your own", gen: "nox" },
  ],
  mcq: [
    { q: "Which equation shows ammonia acting as a base?", o: [["{{NH3 + HCl -> NH4Cl}}", true, "NH₃ accepts a proton."], ["{{4NH3 + 5O2 -> 4NO + 6H2O}}", false, "Oxidation, not acid–base."], ["{{2NH3 -> N2 + 3H2}}", false, "Decomposition."], ["{{NH3 + 3Cl2 -> NCl3 + 3HCl}}", false, "Substitution/redox."]] },
    { q: "Which pollutant is formed in a car engine when nitrogen and oxygen combine?", o: [["CO", false, "From incomplete combustion of fuel."], ["NO", true, "{{N2 + O2 -> 2NO}} at high temperature."], ["{{SO2}}", false, "From sulfur impurities in fuel."], ["{{O3}}", false, "Formed later in sunlight."]] },
    { q: "Which is a role of {{NO2}} in photochemical smog?", o: [["It absorbs UV and releases O atoms that form ozone", true, "{{NO2 -> NO + O}}; {{O + O2 -> O3}}."], ["It removes ozone", false, "It helps form it at ground level."], ["It neutralises acid rain", false, "It's acidic."], ["It is inert", false, "Highly reactive."]] },
    { q: "The bonding in {{N2}} consists of:", o: [["one σ and two π bonds", true, "A triple bond."], ["three σ bonds", false, "Only one σ between two atoms."], ["two σ and one π", false, "Only one σ."], ["an ionic bond", false, "Same atoms."]] },
    { q: "Why is ammonium fertiliser not applied with lime ({{Ca(OH)2}})?", o: [["Lime reacts with ammonium ions to release ammonia gas", true, "Nitrogen is lost to the air."], ["Lime makes the soil acidic", false, "Lime is basic."], ["Ammonium salts are insoluble in lime", false, "No."], ["Lime oxidises nitrogen", false, "No."]] },
  ],
  gens: {
    nh3: () => {
      const s = pick([["NH4Cl", 53.5, 1], ["(NH4)2SO4", 132.1, 2], ["NH4NO3", 80.0, 1]]), m = rnd(1, 8, 2);
      const ans = m / s[1] * s[2] * 24.0;
      return { topic: "volume of ammonia from an ammonium salt", q: `${m} g of {{${s[0]}}} (Mr ${s[1]}) is warmed with excess NaOH(aq). What volume of ammonia forms at r.t.p.? (24.0 dm³ mol⁻¹)`, ans, unit: "dm³", label: "V =",
        hints: ["Each NH₄⁺ ion gives one NH₃ molecule.", `{{${s[0]}}} contains ${s[2]} NH₄⁺ per formula unit.`, `n(NH₃) = ${s[2]} × ${m}/${s[1]}; × 24.0`],
        sol: [R`V=${s[2]}\times\frac{${m}}{${s[1]}}\times24.0=${tn(ans)}\ \text{dm}^3`], wrongs: [[m / s[1] * 24.0, s[2] === 2 ? "Ammonium sulfate has two NH₄⁺ ions." : ""]].filter(w => w[1]) };
    },
    nox: () => {
      const s = pick([["N2", 0], ["NO", 2], ["NO2", 4], ["N2O", 1], ["HNO3", 5], ["NH3", -3], ["NH4+", -3], ["N2O4", 4], ["NO3-", 5], ["NO2-", 3], ["HNO2", 3]]);
      return { topic: "oxidation numbers of nitrogen", q: `What is the oxidation number of nitrogen in {{${s[0]}}}?`, ans: s[1], unit: "", label: "N =",
        hints: ["O is −2; H is +1.", "Sum = overall charge.", "Solve for x."], sol: [`<p>N = ${s[1] > 0 ? "+" : ""}${s[1]}</p>`], wrongs: [[-s[1], "Check the sign."]].filter(w => w[0] !== s[1]) };
    },
  },
  ex: [
    { q: "Explain why nitrogen gas is unreactive.", pts: ["N₂ contains a triple bond (one σ, two π)", "The N≡N bond energy is very high (944 kJ mol⁻¹)", "So reactions have a very high activation energy", "The molecule is non-polar, so it doesn't attract electrophiles/nucleophiles"] },
    { q: "Explain how oxides of nitrogen act as catalysts in the formation of acid rain from sulfur dioxide.", pts: ["{{SO2 + NO2 -> SO3 + NO}}", "{{NO + 1/2O2 -> NO2}}", "{{NO2}} is regenerated, so it is a catalyst (homogeneous)", "{{SO3}} dissolves in water to form {{H2SO4}}"] },
  ],
  traps: ["The dative bond in {{NH4+}} is indistinguishable from the others once formed.", "NH₃ is pyramidal (107°); NH₄⁺ is tetrahedral (109.5°).", "In the catalytic converter, NO is reduced and CO is oxidised in the same reaction.", "\"Catalyst\" for NO₂ in acid rain: show both steps and that NO₂ is regenerated."],
  defs: [["Photochemical smog", "Air pollution formed when sunlight acts on oxides of nitrogen and unburned hydrocarbons, producing ozone and other irritants such as PAN."], ["Catalytic converter", "A device in a car exhaust containing Pt/Rh/Pd catalysts that converts CO, NO and unburned hydrocarbons into CO₂, N₂ and H₂O."]],
});
})();
