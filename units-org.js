/* units-org.js — Units 14–18 (organic chemistry) and P1 (practical skills). */
(() => {
const R = String.raw;
const { pick, rnd, round, tn } = PX;
const f3 = x => +Number(x).toPrecision(3);
const MrCHO = (c, h, o = 0, n = 0, x = 0, xm = 0) => round(c * 12.0 + h * 1.0 + o * 16.0 + n * 14.0 + x * xm, 1);

/* ======================= UNIT 14 ======================= */
PX.unit({
  id: "14", n: 14, short: "Intro to organic", title: "Introduction to organic chemistry", strand: "org", sim: "molecule",
  intents: ["define hydrocarbon; describe alkanes as hydrocarbons with no functional group", "interpret and use general, structural, displayed and skeletal formulae; name alkanes, alkenes, halogenoalkanes, alcohols, aldehydes, ketones, carboxylic acids, esters, amines and nitriles", "use the terms functional group, homolytic and heterolytic fission, free radical, initiation, propagation, termination, nucleophile, electrophile, addition, substitution, elimination, hydrolysis, condensation, oxidation and reduction", "explain shapes in terms of sp, sp² and sp³ hybridisation and σ and π bonds", "describe structural isomerism and stereoisomerism (geometrical and optical); identify chiral centres; deduce isomers from a molecular formula"],
  lesson: [
    { t: "predict", h: "How many butanes?", body: "Butane has the molecular formula {{C4H10}}.", q: "How many different molecules have the formula {{C4H10}}?",
      o: [["1", false, "There's a branched version too."], ["2", true, "Butane (a straight chain) and methylpropane (branched). Same formula, different structures: **isomers**."], ["4", false, "Bending a chain doesn't make a new molecule; only different connections do."], ["10", false, "That's the number of H atoms."]],
      after: "Organic chemistry is mostly about **structure**: the same atoms joined differently make different compounds." },
    { t: "bridge", h: "From IGCSE to AS", igcse: ["Homologous series: alkanes, alkenes, alcohols, carboxylic acids", "General formulae like $\\mathrm{C_{n}H_{2n+2}}$", "Naming up to 4 carbons; structural isomers"],
      as: ["Four kinds of formula, including **skeletal**", "Naming ten functional groups with position numbers", "**Stereoisomers**: cis/trans and optical", "The vocabulary of mechanisms: nucleophile, electrophile, free radical…", "Shapes from hybridisation"],
      note: "This unit is the toolkit for Units 15–18. Learning the words now saves a lot of confusion later.",
      ask: { q: "Which is the general formula of the alkenes?", o: [["$\\mathrm{C_{n}H_{2n+2}}$", false, "Alkanes."], ["$\\mathrm{C_{n}H_{2n}}$", true, "One C=C means two fewer H than the alkane."], ["$\\mathrm{C_{n}H_{2n-2}}$", false, "Alkynes or dienes."], ["$\\mathrm{C_{n}H_{2n+1}OH}$", false, "Alcohols."]] } },
    { t: "explain", h: "Four ways to draw a molecule",
      body: R`<ul><li><b>Molecular</b>: atoms present, {{C4H10O}}.</li><li><b>Structural</b>: enough to be unambiguous, {{CH3CH2CH2CH2OH}}.</li><li><b>Displayed</b>: every atom and every bond drawn.</li><li><b>Skeletal</b>: lines for the carbon chain; each corner or end is a carbon with enough H to make four bonds. Functional groups drawn in.</li></ul><p>The <b>empirical</b> formula is the simplest ratio, e.g. {{C2H5}} for butane.</p>`,
      sim: { tab: 0, mol: "butan-1-ol" }, simLabel: "Compare the formulas",
      ask: { q: "A skeletal formula is a zig-zag of four lines with OH on the end. What is the molecule?", o: [["butan-1-ol", false, "Four lines join five points: five carbons."], ["pentan-1-ol", true, "Each end and corner is a C: 5 carbons, OH on C1."], ["propan-1-ol", false, "Count the corners and ends."], ["pentanoic acid", false, "No C=O drawn."]] } },
    { t: "explain", h: "Wedges and dashes: drawing in 3D",
      body: R`<p>Paper is flat, but a carbon with four single bonds is a 3D tetrahedron. Chemists show depth with three kinds of bond line:</p><div class="tbl-wrap"><table class="board"><tr><th>Bond drawn as</th><th>Means</th></tr><tr><td>plain line</td><td>in the plane of the paper</td></tr><tr><td>solid wedge (narrow at the carbon, widening towards you)</td><td>pointing <b>out of the page, towards you</b></td></tr><tr><td>hashed (dashed) wedge</td><td>pointing <b>into the page, away from you</b></td></tr></table></div><div style="display:flex;justify-content:center">${PX.wedgeSVG(["H", "H", "H", "H"], { w: 200 })}</div><p>Methane drawn this way: two bonds flat on the page, one towards you, one away. The usual set is <b>two plain + one wedge + one hash</b>. You'll use this most for <b>optical isomers</b>, where you draw a chiral molecule and its mirror image.</p>`,
      sim: { tab: 3, w: "methane" }, simLabel: "Compare the drawing with the 3D model",
      ask: { q: "In a wedge-and-dash drawing, the OH group is on a hashed wedge. Where is it?", o: [["Behind the page, pointing away from you", true, "Hashed = away; solid wedge = towards you."], ["In front of the page, pointing at you", false, "That's a solid wedge."], ["In the plane of the paper", false, "That's a plain line."], ["It shows a weaker bond", false, "The line style shows direction in space, not bond strength."]] } },
    { t: "explain", h: "Functional groups and names",
      body: R`<div class="tbl-wrap"><table class="board"><tr><th>Series</th><th>Group</th><th>Name ending</th><th>Example</th></tr><tr><td>alkene</td><td>C=C</td><td>-ene</td><td>but-2-ene</td></tr><tr><td>halogenoalkane</td><td>C–X</td><td>chloro-, bromo-</td><td>2-bromopropane</td></tr><tr><td>alcohol</td><td>–OH</td><td>-ol</td><td>propan-2-ol</td></tr><tr><td>aldehyde</td><td>–CHO</td><td>-al</td><td>ethanal</td></tr><tr><td>ketone</td><td>C=O (in chain)</td><td>-one</td><td>propanone</td></tr><tr><td>carboxylic acid</td><td>–COOH</td><td>-oic acid</td><td>ethanoic acid</td></tr><tr><td>ester</td><td>–COO–</td><td>-yl -oate</td><td>ethyl ethanoate</td></tr><tr><td>amine</td><td>–NH₂</td><td>-amine</td><td>ethylamine</td></tr><tr><td>nitrile</td><td>–C≡N</td><td>-nitrile</td><td>propanenitrile</td></tr></table></div><p>Stems: meth- 1, eth- 2, prop- 3, but- 4, pent- 5, hex- 6. Number the chain from the end that gives the functional group the lowest number. In nitriles, the C of C≡N counts in the chain.</p>`,
      ask: { q: "Name {{CH3CH(OH)CH2CH3}}.", o: [["butan-2-ol", true, "Four carbons, OH on C2 (counting from the nearer end)."], ["butan-3-ol", false, "Number from the end nearer the OH."], ["2-hydroxybutane", false, "Alcohols use the -ol ending."], ["propan-2-ol", false, "There are four carbons."]] } },
    { t: "explain", h: "IUPAC names, piece by piece",
      body: R`<p>Every systematic (IUPAC) name is built from the same parts:</p><div class="eq" style="font-family:var(--font-display);font-size:1.35rem"><span style="color:var(--muted)">4-</span><span style="color:var(--c2)">methyl</span><span style="color:var(--accent)">pentan</span><span style="color:var(--muted)">-2-</span><span style="color:var(--c3)">ol</span></div><ol><li><b>Stem</b>: the longest carbon chain that contains the main functional group (meth 1, eth 2, prop 3, but 4, pent 5, hex 6), plus <b>-an-</b> (all single C–C) or <b>-en-</b> (a C=C).</li><li><b>Suffix</b>: the main functional group: -ol, -al, -one, -oic acid, -amine, -nitrile. Alkanes just end -ane.</li><li><b>Numbers (locants)</b>: number the chain from the end that gives the suffix group (or the C=C) the <b>lowest</b> number.</li><li><b>Prefixes</b>: branches (methyl, ethyl) and halogens (chloro, bromo) go in front, in <b>alphabetical order</b>; repeats use di-, tri-, which don't count for the order: 2,2-dimethyl.</li><li><b>Punctuation</b>: commas between numbers (1,2-); hyphens between a number and a letter (2-bromo).</li></ol><p>No number is needed where there's no choice: propanone, ethanal, ethanoic acid.</p>`,
      sim: { tab: 4, name: "4-methylpentan-2-ol" }, simLabel: "Take a name apart",
      ask: { q: "Which is the correct name for {{CH3CHClCH2CH3}}?", o: [["2-chlorobutane", true, "4-carbon chain; numbering from the left puts Cl on C2."], ["3-chlorobutane", false, "Number from the end nearer the Cl: 2, not 3."], ["2-chlorobutan", false, "An alkane stem needs its ending: -ane."], ["chloro-2-butane", false, "The number goes directly before the group it locates: 2-chloro."]] } },
    { t: "worked", h: "Worked example: naming a branched alcohol",
      prob: "Name {{(CH3)2CHCH2CH(OH)CH3}}.",
      steps: [
        { s: R`Draw it out. The longest chain that includes the C–OH carbon has <b>5</b> carbons: stem <b>pentan</b>, suffix <b>-ol</b>.` },
        { s: R`Number from the right-hand end: OH is on C2 (from the left it would be C4).`, why: { q: "Why number from the right?", o: [["The suffix group must get the lowest possible number", true, "OH on 2 beats OH on 4."], ["The branch must get the lowest number", false, "The suffix group has priority over branches."], ["Always number right to left", false, "There's no fixed direction; it depends on the groups."]] } },
        { s: R`With that numbering the CH₃ branch is on C4: <b>4-methylpentan-2-ol</b>.` },
      ], after: "Check: count the carbons in the name (5 + 1 = 6) against the formula (C₆H₁₄O). ✓" },
    { t: "explain", h: "Other notation you'll meet",
      body: R`<div class="tbl-wrap"><table class="board"><tr><th>You see</th><th>It means</th></tr><tr><td>{{CH3CH(OH)CH3}}</td><td>brackets = a group joined to the carbon written just before them</td></tr><tr><td>{{(CH3)2CH-}}, {{(CH3)3C-}}</td><td>two or three CH₃ groups on the next carbon</td></tr><tr><td>R, R′</td><td>any alkyl group: RCOOH is any carboxylic acid</td></tr><tr><td>X</td><td>any halogen (Cl, Br, I)</td></tr><tr><td>δ+ / δ−</td><td>partial charges on a polar bond</td></tr><tr><td>curly arrow</td><td>movement of a <b>pair</b> of electrons</td></tr><tr><td>half-headed (fish-hook) arrow</td><td>movement of <b>one</b> electron (free radicals)</td></tr><tr><td>Cl·</td><td>the dot is an unpaired electron: a free radical</td></tr><tr><td>[O] / [H]</td><td>oxygen from an oxidising agent / hydrogen from a reducing agent</td></tr><tr><td>cis / trans</td><td>same side / opposite sides of a C=C</td></tr><tr><td>–[CH₂–CH₂]ₙ–</td><td>a polymer repeat unit, repeated n times</td></tr></table></div>`,
      ask: { q: "In {{CH3CH2CH(CH3)COOH}}, the (CH₃) is attached to:", o: [["the carbon written just before the bracket", true, "So C2 (the COOH carbon is C1) carries a methyl: 2-methylbutanoic acid."], ["the oxygen", false, "Brackets attach to the preceding carbon."], ["the end of the chain", false, "It's a branch on the CH."], ["nothing: it's a separate molecule", false, "It's part of the molecule."]] } },
    { t: "explain", h: "Structural isomers",
      body: R`<p><b>Structural isomers</b> have the same molecular formula but different structural formulae:</p><ul><li><b>chain</b>: different carbon skeleton (butane / methylpropane);</li><li><b>positional</b>: functional group in a different place (propan-1-ol / propan-2-ol);</li><li><b>functional group</b>: different functional group (propanal / propanone; ethanol / methoxymethane).</li></ul>`,
      sim: { tab: 1, f: "C5H12" }, simLabel: "Show the C₅H₁₂ isomers",
      ask: { q: "Propanal and propanone are:", o: [["chain isomers", false, "Both have a 3-carbon chain."], ["positional isomers", false, "They're different functional groups, not the same group moved."], ["functional group isomers", true, "Aldehyde vs ketone, both {{C3H6O}}."], ["stereoisomers", false, "Their atoms are bonded differently."]] } },
    { t: "explain", h: "Stereoisomers",
      body: R`<p><b>Stereoisomers</b> have the same structural formula but a different arrangement of atoms in space.</p><ul><li><b>Geometrical (cis/trans)</b>: needs a C=C (no rotation, because of the π bond) <i>and</i> two different groups on each carbon of the C=C. cis: same groups same side.</li><li><b>Optical</b>: a <b>chiral centre</b> is a carbon with four different groups. The molecule and its mirror image are non-superimposable: two <b>enantiomers</b>, which rotate plane-polarised light in opposite directions.</li></ul>`,
      sim: { tab: 2 }, simLabel: "Rotate a chiral molecule",
      ask: { q: "Which molecule has a chiral centre?", o: [["propan-2-ol, {{CH3CH(OH)CH3}}", false, "C2 has two identical CH₃ groups."], ["butan-2-ol, {{CH3CH(OH)CH2CH3}}", true, "C2 has H, OH, CH₃ and C₂H₅: four different groups."], ["ethanol", false, "No carbon has four different groups."], ["2-methylpropan-2-ol", false, "C2 has three CH₃ groups."]] } },
    { t: "explain", h: "The language of mechanisms",
      body: R`<ul><li><b>Homolytic fission</b>: a bond breaks evenly, one electron to each atom, giving <b>free radicals</b> ({{Cl-Cl -> 2Cl.}}).</li><li><b>Heterolytic fission</b>: both electrons go to one atom, giving ions.</li><li><b>Nucleophile</b>: an electron-pair donor, attracted to δ+ carbon ({{OH-}}, {{CN-}}, {{NH3}}, {{H2O}}).</li><li><b>Electrophile</b>: an electron-pair acceptor, attracted to electron-rich areas ({{H+}}, {{Br+}}, δ+ end of HBr).</li><li>Reaction types: <b>addition</b> (two become one), <b>substitution</b> (swap an atom or group), <b>elimination</b> (small molecule removed, often forming C=C), <b>hydrolysis</b> (split by water), <b>condensation</b> (join, losing water or similar), <b>oxidation</b> [O] and <b>reduction</b> [H].</li></ul><p>A curly arrow shows the movement of a <b>pair</b> of electrons; a half-headed (fish-hook) arrow, a single electron.</p>`,
      ask: { q: "Which species is a nucleophile?", o: [["{{H+}}", false, "No electrons to donate: an electrophile."], ["{{NH3}}", true, "Lone pair on N to donate."], ["{{Br+}}", false, "Electrophile."], ["{{CH4}}", false, "No lone pairs, no charge."]] } },
    { t: "worked", h: "Worked example: isomers of C₄H₈",
      prob: "Draw and name all the alkene isomers of {{C4H8}}, including stereoisomers.",
      steps: [
        { s: R`Straight chain, C=C at the end: <b>but-1-ene</b>. No cis/trans: C1 has two H atoms.` },
        { s: R`Straight chain, C=C in the middle: but-2-ene. Each C of the C=C has H and CH₃, so it has <b>cis</b> and <b>trans</b> forms.`, why: { q: "Why does but-2-ene have cis/trans isomers but but-1-ene doesn't?", o: [["Each C of the C=C in but-2-ene has two different groups", true, "C1 of but-1-ene carries two H atoms, so swapping them makes no difference."], ["But-2-ene is longer", false, "Same length."], ["But-1-ene can rotate around the C=C", false, "Neither can rotate about C=C."]] } },
        { s: R`Branched: <b>methylpropene</b>, {{(CH3)2C=CH2}}. No cis/trans.` },
      ], after: "Total: 4 alkene isomers (but-1-ene, cis-but-2-ene, trans-but-2-ene, methylpropene). Cyclobutane and methylcyclopropane are C₄H₈ too, but they're not alkenes." },
    { t: "complete", h: "Your turn",
      prob: "Pentane has the formula {{C5H12}}.", shown: [R`Straight chain: pentane. One branch: 2-methylbutane.`],
      q: { q: "How many structural isomers does {{C5H12}} have in total?", ans: 3, unit: "", label: "isomers =", hints: ["Try a 3-carbon main chain.", "Two methyl groups on the middle carbon of propane.", "Pentane, 2-methylbutane, 2,2-dimethylpropane."], sol: ["<p>3: pentane, 2-methylbutane, 2,2-dimethylpropane.</p>"], wrongs: [[2, "There's also 2,2-dimethylpropane."], [4, "3-methylbutane is the same as 2-methylbutane, numbered from the other end."]] } },
    { t: "solo", h: "On your own", gen: "isomers" },
  ],
  mcq: [
    { q: "What is the name of {{(CH3)2CHCH2OH}}?", o: [["2-methylpropan-1-ol", true, "3-carbon chain containing the C–OH carbon; OH on C1, methyl on C2."], ["butan-1-ol", false, "That's the straight-chain isomer; here the chain is branched."], ["2-methylpropan-3-ol", false, "Number from the end nearer the OH."], ["isobutanol", false, "A traditional name; IUPAC is expected."]] },
    { q: "In a wedge-and-dash drawing, a solid wedge shows a bond that:", o: [["points towards the viewer, out of the page", true, "Solid = towards you."], ["points away from the viewer", false, "That's a hashed wedge."], ["lies in the plane of the paper", false, "That's a plain line."], ["is a double bond", false, "Double bonds are drawn as two lines."]] },
    { q: "Which name is written correctly?", o: [["2-bromo-1-chloropropane", false, "The locants tie (1,2 from either end), so the prefix first in the alphabet, bromo, gets the lower number: 1-bromo-2-chloropropane."], ["2-chloro-1-bromopropane", false, "Prefixes go in alphabetical order: bromo before chloro."], ["2,2-dimethylbutane", true, "Commas between numbers, a hyphen before letters, di- for two methyls."], ["2,2-di-methylbutane", false, "No hyphen between di and methyl."]] },
    { q: "Which compound shows cis/trans isomerism?", o: [["propene", false, "C1 has two H atoms."], ["but-2-ene", true, "Each alkene carbon has H and CH₃."], ["2-methylpropene", false, "C2 has two CH₃ groups."], ["butane", false, "No C=C."]] },
    { q: "Homolytic fission produces:", o: [["two ions", false, "That's heterolytic."], ["two free radicals", true, "Each atom gets one electron."], ["a nucleophile and an electrophile", false, "That's heterolytic too."], ["a carbocation", false, "Heterolytic."]] },
    { q: "Which is the skeletal-formula count rule?", o: [["Each line is a C atom", false, "Lines are bonds."], ["Each end and each corner is a C atom", true, "With H atoms implied to make four bonds."], ["Only corners are C atoms", false, "Ends count too."], ["H atoms are always drawn", false, "H on carbon is left out."]] },
    { q: "What is the name of {{CH3CH2COOCH3}}?", o: [["methyl propanoate", true, "Alcohol part (methyl) first, acid part (propanoate) second."], ["propyl methanoate", false, "The acid part has the C=O: CH₃CH₂CO-, propanoate."], ["ethyl ethanoate", false, "Count again: 3 C in the acid part, 1 in the alcohol part."], ["methyl ethanoate", false, "The acid part has 3 carbons."]] },
    { q: "Which molecule has an sp-hybridised carbon?", o: [["ethane", false, "sp³."], ["ethene", false, "sp²."], ["ethanenitrile, {{CH3CN}}", true, "The C in C≡N forms two σ bonds and two π bonds: sp, 180°."], ["methanol", false, "sp³."]] },
    { q: "The reaction {{C2H5Br + OH- -> C2H5OH + Br-}} is:", o: [["electrophilic addition", false, "No C=C, and OH⁻ is a nucleophile."], ["nucleophilic substitution", true, "OH⁻ replaces Br."], ["elimination", false, "No small molecule removed to form C=C."], ["free-radical substitution", false, "Ions, not radicals."]] },
    { q: "How many chiral centres are in 2-hydroxypropanoic acid (lactic acid), {{CH3CH(OH)COOH}}?", o: [["0", false, "Check C2."], ["1", true, "C2: H, OH, CH₃ and COOH."], ["2", false, "Only C2 has four different groups."], ["3", false, "C1 (COOH) and C3 (CH₃) can't be chiral."]] },
  ],
  gens: {
    locant: () => {
      const s = pick([["CH3CH(OH)CH2CH2CH3", "pentan-?-ol", 2], ["CH3CH2CH(OH)CH2CH3", "pentan-?-ol", 3], ["CH2=CHCH2CH3", "but-?-ene", 1], ["CH3CH=CHCH2CH3", "pent-?-ene", 2], ["CH3COCH2CH2CH3", "pentan-?-one", 2], ["CH3CH2COCH2CH3", "pentan-?-one", 3], ["CH3CHBrCH3", "?-bromopropane", 2], ["CH3CH(CH3)CH2CH3", "?-methylbutane", 2], ["(CH3)2CHCH2CH(OH)CH3", "4-methylpentan-?-ol", 2], ["CH3CH(CH3)CH(OH)CH3", "?-methylbutan-2-ol", 3], ["CH2ClCH2CH2Cl", "1,?-dichloropropane", 3], ["CH3CH2CH(CH3)COOH", "?-methylbutanoic acid", 2], ["CH3CH2CH2CH(OH)CH3", "pentan-?-ol", 2], ["CH3CH2CH2CH2Br", "?-bromobutane", 1]]);
      return { topic: "IUPAC numbering", q: `{{${s[0]}}} is named <b>${s[1]}</b>. What number replaces the ?`, ans: s[2], unit: "", label: "number =",
        hints: ["Draw the structure and find the longest chain containing the main group.", "Number from the end that gives the suffix group (or C=C, or the first branch) the lowest number.", "In a carboxylic acid the COOH carbon is always C1."],
        sol: [`<p>Numbering from the correct end gives ${s[2]}: <b>${s[1].replace("?", s[2])}</b>.</p>`], wrongs: [] };
    },
    longest: () => {
      const s = pick([["CH3CH(C2H5)CH2CH3", 5, "3-methylpentane"], ["CH3CH(CH3)CH(CH3)CH3", 4, "2,3-dimethylbutane"], ["CH3CH2CH(C2H5)CH2CH2CH3", 6, "3-ethylhexane"], ["(CH3)3CCH2CH3", 4, "2,2-dimethylbutane"], ["HOCH2CH(C2H5)CH3", 4, "2-methylbutan-1-ol"], ["CH3CH(C2H5)CH(CH3)CH3", 5, "2,3-dimethylpentane"]]);
      return { topic: "finding the longest chain", q: `How many carbon atoms are in the longest chain (the one that sets the stem of the name) of {{${s[0]}}}?`, ans: s[1], unit: "", label: "carbons =",
        hints: ["Draw every carbon: a group in brackets hangs off the carbon before it.", "The longest chain can turn a corner through a branch: an ethyl branch adds two carbons to a path.", "Try every path from one end carbon to another and count."],
        sol: [`<p>Longest chain: ${s[1]} carbons, so the name is <b>${s[2]}</b>.</p>`], wrongs: [] };
    },
    isomers: () => {
      const s = pick([["C4H10", "structural isomers", 2], ["C5H12", "structural isomers", 3], ["C6H14", "structural isomers", 5], ["C3H7Cl", "structural isomers", 2], ["C4H9Br", "structural isomers", 4], ["C3H8O", "alcohol isomers", 2], ["C4H10O", "alcohol isomers (structural)", 4], ["C4H8", "alkene isomers, including stereoisomers", 4], ["C5H10", "alkene isomers (structural only)", 5]]);
      return { topic: "counting isomers", q: `How many ${s[1]} have the molecular formula {{${s[0]}}}?`, ans: s[2], unit: "", label: "number =",
        hints: ["Start with the longest chain, then shorten it by one and add branches.", "For a functional group, try every position on each skeleton.", "Check for duplicates by numbering from the other end."],
        sol: [`<p>There are ${s[2]}. Try drawing them all; the molecule viewer shows some of them.</p>`], wrongs: [] };
    },
    mrorg: () => {
      const s = pick([["propan-1-ol", 3, 8, 1], ["butanoic acid", 4, 8, 2], ["ethyl ethanoate", 4, 8, 2], ["propanone", 3, 6, 1], ["hexane", 6, 14, 0], ["pent-1-ene", 5, 10, 0], ["butanal", 4, 8, 1], ["methyl propanoate", 4, 8, 2], ["propane-1,2-diol", 3, 8, 2]]);
      const ans = MrCHO(s[1], s[2], s[3]);
      return { topic: "relative molecular mass of organic compounds", q: `Calculate the Mr of ${s[0]}. (C = 12.0, H = 1.0, O = 16.0)`, ans, unit: "", label: "Mr =", tol: 0.003,
        hints: ["Draw the structure and count each atom.", `Molecular formula: C${s[1]}H${s[2]}${s[3] ? "O" + (s[3] > 1 ? s[3] : "") : ""}.`, "Add up the masses."],
        sol: [R`M_r=${s[1]}(12.0)+${s[2]}(1.0)${s[3] ? `+${s[3]}(16.0)` : ""}=${ans}`], wrongs: [] };
    },
  },
  ex: [
    { q: "Explain why but-2-ene has stereoisomers but butane does not.", pts: ["But-2-ene has a C=C double bond", "The π bond prevents rotation about the C=C", "Each carbon of the C=C carries two different groups (H and CH₃)", "So cis and trans forms are possible; butane has free rotation about C–C"] },
    { q: "Explain what is meant by a chiral centre and by optical isomers.", pts: ["A chiral centre is a carbon atom bonded to four different groups", "The molecule has a non-superimposable mirror image", "The two forms are optical isomers / enantiomers", "They rotate plane-polarised light in opposite directions"] },
  ],
  traps: ["Number from the end that gives the functional group the lowest number.", "The longest chain can bend through a branch: CH₃CH(C₂H₅)CH₂CH₃ is 3-methylpentane, not 2-ethylbutane.", "Prefixes go in alphabetical order (bromo before chloro before methyl); di- and tri- don't count for the order.", "Commas between numbers (1,2-), hyphens between numbers and letters (2-bromo-).", "Solid wedge = towards you; hashed wedge = away from you.", "cis/trans needs two different groups on *each* carbon of the C=C.", "A chiral centre needs four *different* groups: check whole groups, not just the first atom.", "Curly arrows start from a lone pair or a bond and end at an atom or bond.", "Nucleophile = electron-pair donor; electrophile = electron-pair acceptor."],
  defs: [["Solid wedge (3D drawing)", "A bond pointing out of the plane of the paper, towards the viewer."], ["Hashed wedge (3D drawing)", "A bond pointing into the plane of the paper, away from the viewer."], ["Locant", "The number in a name that shows the position of a functional group, branch or double bond on the chain."], ["Homologous series", "A family of compounds with the same functional group and general formula, in which each member differs from the next by CH₂, showing a trend in physical properties and similar chemical properties."], ["Functional group", "An atom or group of atoms responsible for the characteristic reactions of a compound."], ["Structural isomers", "Compounds with the same molecular formula but different structural formulae."], ["Stereoisomers", "Compounds with the same structural formula but a different arrangement of atoms in space."], ["Chiral centre", "A carbon atom bonded to four different atoms or groups."], ["Nucleophile", "A species that can donate a pair of electrons to form a new covalent bond."], ["Electrophile", "A species that can accept a pair of electrons to form a new covalent bond."], ["Homolytic fission", "Breaking of a covalent bond in which each atom takes one of the bonding electrons, forming free radicals."], ["Heterolytic fission", "Breaking of a covalent bond in which one atom takes both bonding electrons, forming ions."]],
});

/* ======================= UNIT 15 ======================= */
PX.unit({
  id: "15", n: 15, short: "Hydrocarbons", title: "Hydrocarbons", strand: "org", sim: "mech-hc",
  intents: ["explain the general unreactivity of alkanes; describe complete and incomplete combustion", "explain free-radical substitution of alkanes by chlorine and bromine (initiation, propagation, termination)", "describe cracking", "describe the environmental consequences of burning hydrocarbons and the use of catalytic converters", "describe addition, oxidation and polymerisation reactions of alkenes", "describe the mechanism of electrophilic addition and explain the inductive effect of alkyl groups on carbocation stability", "describe the difficulty of disposing of poly(alkene)s"],
  lesson: [
    { t: "predict", h: "Methane and chlorine in the dark", body: "Methane and chlorine are mixed and kept in the dark. Later the mixture is put in sunlight.", q: "When does reaction happen?",
      o: [["In the dark: they're both gases", false, "Nothing happens in the dark. The Cl–Cl bond needs to be broken first."], ["Only once UV light is present", true, "UV light splits Cl₂ into chlorine radicals, which start a chain reaction."], ["Never: alkanes don't react", false, "Alkanes are unreactive but not inert."]],
      after: "UV light provides the energy for **homolytic fission**. The rest of the reaction runs itself as a chain." },
    { t: "bridge", h: "From IGCSE to AS", igcse: ["Alkanes burn; incomplete combustion gives CO", "Substitution with chlorine in UV light", "Cracking makes alkenes", "Alkenes decolourise bromine water; addition polymers"],
      as: ["**Why** alkanes are unreactive", "The three-step **free-radical mechanism**", "**Electrophilic addition** mechanism with curly arrows", "Which product is major: **carbocation stability**", "Oxidising alkenes with {{KMnO4}}", "Pollutants and catalytic converters; polymer disposal"],
      note: "IGCSE told you what happens. AS asks how electrons move to make it happen.",
      ask: { q: "Why are alkanes generally unreactive?", o: [["C–C and C–H bonds are strong and almost non-polar", true, "No δ+ or δ− sites to attract nucleophiles or electrophiles, and lots of energy needed to break bonds."], ["They have double bonds", false, "Alkanes have only single bonds."], ["They're gases", false, "Many are liquids or solids."], ["They contain ions", false, "Covalent."]] } },
    { t: "explain", h: "Alkanes: combustion and pollution",
      body: R`<p>Complete: {{C8H18 + 25/2O2 -> 8CO2 + 9H2O}}. Incomplete (limited oxygen): CO and soot (C).</p><p>Car exhausts contain CO (toxic), NOx (from {{N2 + O2}} in the hot engine), unburned hydrocarbons (smog) and {{CO2}} (greenhouse gas). <b>Catalytic converters</b>: {{2CO + 2NO -> 2CO2 + N2}}; hydrocarbons are oxidised to {{CO2}} and {{H2O}}.</p><p><b>Cracking</b> breaks large alkanes into smaller, more useful alkanes and alkenes (heat with a zeolite catalyst): {{C10H22 -> C8H18 + C2H4}}.</p>`,
      ask: { q: "Why is carbon monoxide toxic?", o: [["It binds to haemoglobin, reducing oxygen transport", true, "It binds more strongly than O₂."], ["It forms acid rain", false, "That's SO₂ and NOx."], ["It is a greenhouse gas", false, "Not the toxicity reason."], ["It is a free radical", false, "CO has no unpaired electrons."]] } },
    { t: "explain", h: "Free-radical substitution",
      body: R`<ol><li><b>Initiation</b> (UV light): {{Cl2 -> 2Cl.}}</li><li><b>Propagation</b>: {{Cl. + CH4 -> HCl + .CH3}} then {{.CH3 + Cl2 -> CH3Cl + Cl.}}. The radical is regenerated, so the chain continues.</li><li><b>Termination</b>: two radicals join: {{Cl. + Cl. -> Cl2}}, {{.CH3 + Cl. -> CH3Cl}}, {{.CH3 + .CH3 -> C2H6}}.</li></ol><p>A mixture of products forms ({{CH2Cl2}}, {{CHCl3}}, {{CCl4}}, ethane), because Cl· can attack the products too.</p>`,
      sim: { mech: "frs" }, simLabel: "Step through the mechanism",
      ask: { q: "Which step is a propagation step?", o: [["{{Cl2 -> 2Cl.}}", false, "Initiation: radicals made from a molecule."], ["{{.CH3 + Cl2 -> CH3Cl + Cl.}}", true, "A radical reacts and a new radical forms."], ["{{.CH3 + .CH3 -> C2H6}}", false, "Termination: radicals removed."], ["{{Cl. + Cl. -> Cl2}}", false, "Termination."]] } },
    { t: "explain", h: "Alkenes: addition reactions",
      body: R`<div class="tbl-wrap"><table class="board"><tr><th>Reagent</th><th>Conditions</th><th>Product (from ethene)</th></tr><tr><td>{{H2}}</td><td>Ni catalyst, heat (≈ 140 °C)</td><td>ethane</td></tr><tr><td>steam {{H2O(g)}}</td><td>{{H3PO4}} catalyst, 300 °C, 6 MPa</td><td>ethanol</td></tr><tr><td>HBr (g)</td><td>room temperature</td><td>bromoethane</td></tr><tr><td>{{Br2}} (aq or in organic solvent)</td><td>room temperature</td><td>1,2-dibromoethane; bromine water orange → colourless (test for C=C)</td></tr></table></div><p>The C=C is a region of high electron density (the π bond), so alkenes attract electrophiles.</p>`,
      ask: { q: "Which reagent and conditions convert propene to propane?", o: [["{{H2}}, nickel catalyst, heat", true, "Hydrogenation."], ["steam, {{H3PO4}}", false, "That gives an alcohol."], ["HBr", false, "That gives bromopropane."], ["UV light", false, "That's for free-radical substitution."]] } },
    { t: "explain", h: "Electrophilic addition and Markovnikov",
      body: R`<p>Ethene + {{Br2}}: as {{Br2}} approaches the π bond it becomes polarised (Brδ+–Brδ−). The π electrons attack Brδ+; Br–Br breaks heterolytically; a <b>carbocation</b> forms; then {{Br-}} attacks it.</p><p>With an unsymmetrical alkene and HBr (propene), two carbocations are possible. Alkyl groups push electron density towards C+ (<b>positive inductive effect</b>), so stability is <b>tertiary > secondary > primary</b>. The more stable carbocation forms faster, so the major product is <b>2-bromopropane</b>.</p>`,
      sim: { mech: "ea2" }, simLabel: "Show HBr adding to propene",
      ask: { q: "Why is 2-bromopropane the major product from propene + HBr?", o: [["Via the more stable secondary carbocation", true, "Two alkyl groups stabilise the positive charge."], ["Bromine prefers the middle carbon", false, "Bromide attacks wherever the positive charge is."], ["The primary carbocation is more stable", false, "Primary is least stable."], ["It's a free-radical reaction", false, "Ionic mechanism."]] } },
    { t: "explain", h: "Oxidising alkenes with manganate(VII)",
      body: R`<ul><li><b>Cold, dilute, acidified {{KMnO4}}</b>: purple → colourless; a <b>diol</b> forms: ethene → ethane-1,2-diol.</li><li><b>Hot, concentrated, acidified {{KMnO4}}</b>: the C=C splits. Each end becomes: =CH₂ → {{CO2}} + {{H2O}}; =CHR → RCOOH (carboxylic acid); =CR₂ → R₂C=O (ketone).</li></ul><p>Identifying the products tells you where the double bond was.</p>`,
      ask: { q: "Hot, concentrated, acidified {{KMnO4}} oxidises but-2-ene. The organic product is:", o: [["ethanoic acid", true, "Each half is =CH(CH₃), which becomes CH₃COOH."], ["ethanal", false, "Aldehydes are oxidised further under these conditions."], ["butane-2,3-diol", false, "That's the cold, dilute reaction."], ["propanone + CO₂", false, "That's from methylpropene."]] } },
    { t: "explain", h: "Addition polymers",
      body: R`<p>Many alkene monomers join: {{nCH2=CHCl -> -[CH2-CHCl]_n-}} (PVC). To find the repeat unit, open the C=C and put the side groups on a two-carbon unit with bonds sticking out.</p><p><b>Disposal</b>: poly(alkene)s are non-biodegradable (strong, non-polar C–C and C–H bonds), so they last in landfill. Burning releases toxic gases (HCl from PVC; CO). Recycling needs sorting.</p>`,
      ask: { q: "What is the monomer of {{-[CH2-CH(CH3)]_n-}}?", o: [["propene", true, "{{CH2=CHCH3}}."], ["propane", false, "Monomers need a C=C."], ["ethene", false, "That has no CH₃ side group."], ["but-2-ene", false, "That would give CH₃ on both carbons."]] } },
    { t: "worked", h: "Worked example: locating a double bond",
      prob: "An alkene {{C5H10}} reacts with hot concentrated acidified {{KMnO4}} to give propanone and ethanoic acid. Identify the alkene.",
      steps: [
        { s: R`Propanone, {{(CH3)2C=O}}, came from an end {{(CH3)2C=}}.` },
        { s: R`Ethanoic acid, {{CH3COOH}}, came from an end {{=CHCH3}}.`, why: { q: "Why acid rather than aldehyde?", o: [["Hot concentrated KMnO₄ oxidises the aldehyde further", true, "=CHR ends finish as RCOOH."], ["Aldehydes don't form from alkenes", false, "They form first, then get oxidised."], ["The question says so", false, "It follows from the conditions."]] } },
        { s: R`Join the two ends at the C=C: {{(CH3)2C=CHCH3}}, <b>2-methylbut-2-ene</b>.` },
      ] },
    { t: "complete", h: "Your turn",
      prob: "0.100 mol of propane burns completely: {{C3H8 + 5O2 -> 3CO2 + 4H2O}}.", shown: [R`Moles of {{CO2}} = 3 × 0.100 = 0.300 mol.`],
      q: { q: "Volume of {{CO2}} at r.t.p. (24.0 dm³ mol⁻¹):", ans: 7.2, unit: "dm³", label: "V =", hints: ["Multiply moles by 24.0.", "0.300 × 24.0", "= 7.20"], sol: [R`V=0.300\times24.0=7.20\ \text{dm}^3`], wrongs: [[2.4, "Three CO₂ per propane."]] } },
    { t: "solo", h: "On your own", gen: "combust" },
  ],
  mcq: [
    { q: "Which is a termination step in the chlorination of methane?", o: [["{{Cl2 -> 2Cl.}}", false, "Initiation."], ["{{Cl. + CH4 -> HCl + .CH3}}", false, "Propagation."], ["{{.CH3 + Cl. -> CH3Cl}}", true, "Two radicals combine."], ["{{.CH3 + Cl2 -> CH3Cl + Cl.}}", false, "Propagation."]] },
    { q: "Bromine water is added to an unknown liquid and stays orange. The liquid is probably:", o: [["an alkene", false, "Alkenes decolourise bromine water."], ["an alkane", true, "No C=C to react with."], ["ethene", false, "An alkene."], ["cyclohexene", false, "An alkene."]] },
    { q: "In electrophilic addition of {{Br2}} to ethene, the electrophile is:", o: [["{{Br-}}", false, "That's the nucleophile in the second step."], ["the δ+ bromine atom of a polarised {{Br2}} molecule", true, "Induced dipole as Br₂ approaches the π bond."], ["the C=C double bond", false, "That's the electron-rich region that attacks."], ["{{H+}}", false, "No acid involved."]] },
    { q: "Which carbocation is most stable?", o: [["{{CH3+}}", false, "No alkyl groups."], ["{{CH3CH2+}}", false, "Primary."], ["{{(CH3)2CH+}}", false, "Secondary."], ["{{(CH3)3C+}}", true, "Tertiary: three electron-donating alkyl groups."]] },
    { q: "Cold, dilute, acidified {{KMnO4}} with propene gives:", o: [["propane-1,2-diol", true, "Two OH groups added across the C=C."], ["propanoic acid", false, "That needs hot, concentrated conditions and the right alkene."], ["ethanoic acid and CO₂", false, "That's the hot concentrated reaction."], ["propan-2-ol", false, "That's hydration with steam."]] },
    { q: "Why are poly(alkene)s hard to dispose of?", o: [["They are non-biodegradable", true, "Strong non-polar bonds resist breakdown by microbes."], ["They are too reactive", false, "The opposite."], ["They dissolve in water", false, "Insoluble."], ["They contain C=C bonds", false, "The polymer has no C=C left."]] },
  ],
  gens: {
    combust: () => {
      const n = pick([1, 2, 3, 4, 5, 6, 7, 8]), mol = rnd(0.02, 0.5, 3), which = pick(["CO2", "O2"]);
      const o2 = (3 * n + 1) / 2, ans = (which === "CO2" ? n : o2) * mol * 24.0;
      const name = ["methane", "ethane", "propane", "butane", "pentane", "hexane", "heptane", "octane"][n - 1];
      return { topic: "combustion volumes", q: `${mol} mol of ${name}, {{C${n}H${2 * n + 2}}}, burns completely. What volume of ${which === "CO2" ? "{{CO2}} is produced" : "{{O2}} is needed"} at r.t.p.? (24.0 dm³ mol⁻¹)`, ans, unit: "dm³", label: "V =",
        hints: [R`Balance: {{C_nH_{2n+2} + \frac{3n+1}{2}O2 -> nCO2 + (n+1)H2O}}.`, `For n = ${n}: ${o2} O₂ → ${n} CO₂.`, `${which === "CO2" ? n : o2} × ${mol} × 24.0`],
        sol: [R`V=${which === "CO2" ? n : o2}\times${mol}\times24.0=${tn(ans)}\ \text{dm}^3`], wrongs: [[mol * 24.0, "Use the mole ratio from the balanced equation."]] };
    },
    br2: () => {
      const a = pick([["ethene", 28.0], ["propene", 42.0], ["but-1-ene", 56.0], ["cyclohexene", 82.0]]), m = rnd(0.5, 5, 2);
      const ans = m / a[1] * 159.8;
      return { topic: "mass of bromine that adds to an alkene", q: `What mass of bromine ({{Br2}}, Mr 159.8) reacts with ${m} g of ${a[0]} (Mr ${a[1]})?`, ans, unit: "g", label: "mass =",
        hints: ["One Br₂ adds across each C=C.", `n(alkene) = ${m}/${a[1]}`, "× 159.8"], sol: [R`m=\frac{${m}}{${a[1]}}\times159.8=${tn(ans)}\ \text{g}`], wrongs: [[ans / 2, "Use Mr of Br₂ (159.8), not Ar of Br."]] };
    },
  },
  ex: [
    { q: "Describe the mechanism of the reaction between methane and chlorine in UV light.", pts: ["Initiation: {{Cl2 -> 2Cl.}} (homolytic fission by UV)", "Propagation: {{Cl. + CH4 -> HCl + .CH3}}", "Propagation: {{.CH3 + Cl2 -> CH3Cl + Cl.}}", "Termination: two radicals combine, e.g. {{.CH3 + Cl. -> CH3Cl}}"] },
    { q: "Explain why the reaction of HBr with propene gives mainly 2-bromopropane.", pts: ["H⁺ (δ+ H of HBr) adds to the C=C, forming a carbocation", "Either a primary or a secondary carbocation can form", "The secondary carbocation is more stable: two alkyl groups donate electrons (positive inductive effect)", "So it forms preferentially; Br⁻ attacks it to give 2-bromopropane"] },
  ],
  traps: ["Free-radical radicals: show the dot (Cl·). Propagation steps must regenerate a radical.", "Bromine water test: orange → colourless (not \"clear\", which means transparent).", "Steam hydration conditions: {{H3PO4}} catalyst, 300 °C, 6 MPa.", "Curly arrow from the C=C to Brδ+, and from the Br–Br bond to Brδ−.", "Hot concentrated KMnO₄: =CH₂ ends give CO₂, not methanoic acid."],
  defs: [["Free-radical substitution", "A reaction in which an atom (usually H) in an alkane is replaced by a halogen via a free-radical chain mechanism with initiation, propagation and termination steps."], ["Electrophilic addition", "A reaction in which an electrophile attacks the electron-rich C=C, and atoms add across the double bond."], ["Carbocation", "An ion with a positively charged carbon atom."], ["Inductive effect", "The donation (or withdrawal) of electron density along σ bonds; alkyl groups are electron-donating and stabilise carbocations."], ["Cracking", "Breaking large hydrocarbon molecules into smaller alkanes and alkenes using heat and a catalyst."], ["Addition polymerisation", "The joining of many monomers containing C=C bonds to form a single long-chain polymer with no other product."]],
});

/* ======================= UNIT 16 ======================= */
PX.unit({
  id: "16", n: 16, short: "Halogenoalkanes", title: "Halogenoalkanes", strand: "org", sim: "mech-hal",
  intents: ["write equations for the main ways of making halogenoalkanes, with reagents and conditions", "write equations for nucleophilic substitution (hydrolysis, nitriles, primary amines with ammonia) and elimination of HBr", "describe and explain the SN1 and SN2 mechanisms", "interpret the different reactivities of halogenoalkanes"],
  lesson: [
    { t: "predict", h: "Which hydrolyses fastest?", body: "1-chlorobutane, 1-bromobutane and 1-iodobutane are each warmed with water and silver nitrate in ethanol. A precipitate of silver halide forms as the C–X bond breaks.", q: "Which gives a precipitate first?",
      o: [["1-chlorobutane: C–Cl is the most polar", false, "Polarity matters less than bond strength here."], ["1-iodobutane: C–I is the weakest bond", true, "C–I breaks most easily, so it reacts fastest."], ["All at the same time", false, "The rate depends on the halogen."]],
      after: "Rate depends on **C–X bond strength**: C–I < C–Br < C–Cl, so iodo fastest." },
    { t: "bridge", h: "From IGCSE to AS", igcse: ["Chloromethane from methane + chlorine", "That's about it"],
      as: ["Three ways to make halogenoalkanes", "Primary, secondary and tertiary", "**Nucleophilic substitution**: OH⁻, CN⁻, NH₃", "**Elimination** to alkenes", "SN1 and SN2 mechanisms"],
      note: "This unit is mostly new. The key idea: the C–X carbon is δ+, so nucleophiles attack it.",
      ask: { q: "Why is the carbon in C–Br attacked by nucleophiles?", o: [["Br is more electronegative, so C is δ+", true, "Nucleophiles are attracted to electron-poor carbon."], ["The C–Br bond is very strong", false, "It's fairly weak."], ["Carbon has a lone pair", false, "Not here."], ["Bromine is a nucleophile", false, "Br leaves as Br⁻."]] } },
    { t: "explain", h: "Making them, and classifying them",
      body: R`<ul><li>Free-radical substitution of alkanes ({{CH4 + Cl2 ->[uv] CH3Cl + HCl}})</li><li>Electrophilic addition of HX or {{X2}} to alkenes</li><li>From alcohols: HX (or KBr + conc {{H2SO4}}), {{PCl5}}, {{PCl3}} with heat, {{SOCl2}}</li></ul><p><b>Primary</b>: the C–X carbon is bonded to one other carbon. <b>Secondary</b>: two. <b>Tertiary</b>: three.</p>`,
      ask: { q: "2-bromo-2-methylpropane is:", o: [["primary", false, "C2 is bonded to three carbons."], ["secondary", false, "Count the C atoms attached to the C–Br carbon."], ["tertiary", true, "C2 is bonded to three CH₃ groups."], ["quaternary", false, "Not used for halogenoalkanes."]] } },
    { t: "explain", h: "Nucleophilic substitution reactions",
      body: R`<div class="tbl-wrap"><table class="board"><tr><th>Nucleophile</th><th>Conditions</th><th>Product</th></tr><tr><td>{{OH-}}</td><td>NaOH(aq), heat under reflux</td><td>alcohol: {{C2H5Br + OH- -> C2H5OH + Br-}}</td></tr><tr><td>{{CN-}}</td><td>KCN in ethanol, heat under reflux</td><td>nitrile, one more carbon: {{C2H5Br + CN- -> C2H5CN + Br-}}</td></tr><tr><td>{{NH3}}</td><td>excess {{NH3}} in ethanol, heat in a sealed tube</td><td>primary amine: {{C2H5Br + 2NH3 -> C2H5NH2 + NH4Br}}</td></tr></table></div><p>Water itself is a weak nucleophile (slow hydrolysis, used in the {{AgNO3}} rate test).</p>`,
      ask: { q: "How would you convert bromoethane into propanenitrile?", o: [["KCN in ethanol, heat under reflux", true, "CN⁻ replaces Br, adding one carbon."], ["HCN gas at room temperature", false, "HCN is used with carbonyls, not halogenoalkanes."], ["NaOH(aq)", false, "That gives ethanol."], ["NH₃ in ethanol", false, "That gives ethylamine."]] } },
    { t: "explain", h: "SN2: one step",
      body: R`<p>For <b>primary</b> halogenoalkanes. The nucleophile attacks the δ+ carbon from the side opposite the halogen while the C–X bond breaks, all in one step, through a <b>transition state</b> with five groups around carbon. "S" substitution, "N" nucleophilic, "2" because two species are involved in the rate-determining step.</p>`,
      sim: { mech: "sn2" }, simLabel: "Animate SN2",
      ask: { q: "In the SN2 mechanism, the nucleophile attacks:", o: [["the halogen atom", false, "It attacks carbon."], ["the δ+ carbon, from the side opposite the halogen", true, "Back-side attack."], ["a carbocation", false, "That's SN1."], ["a hydrogen atom", false, "That would be elimination."]] } },
    { t: "explain", h: "SN1: two steps",
      body: R`<p>For <b>tertiary</b> halogenoalkanes. Step 1 (slow): the C–X bond breaks heterolytically to form a <b>tertiary carbocation</b> and {{X-}}. Step 2 (fast): the nucleophile attacks the carbocation. "1" because only the halogenoalkane is in the rate-determining step.</p><p>Tertiary favours SN1 because the carbocation is stabilised by three alkyl groups, and the crowded carbon blocks back-side attack. Secondary can go either way.</p>`,
      sim: { mech: "sn1" }, simLabel: "Animate SN1",
      ask: { q: "Why do tertiary halogenoalkanes react by SN1?", o: [["The tertiary carbocation is stabilised by three alkyl groups", true, "Positive inductive effect; plus steric hindrance stops SN2."], ["They have no hydrogen atoms", false, "They have plenty of H."], ["Their C–X bonds are stronger", false, "Not the reason."], ["They are primary", false, "Tertiary."]] } },
    { t: "explain", h: "Substitution or elimination?",
      body: R`<p>The same reagent, NaOH, does different things depending on solvent:</p><ul><li><b>NaOH(aq)</b>, heat: OH⁻ acts as a nucleophile → <b>alcohol</b> (substitution).</li><li><b>NaOH in ethanol</b>, heat: OH⁻ acts as a base, removing H⁺ from the carbon next to C–X → <b>alkene</b> + HBr removed (elimination).</li></ul><div class="eq">{{CH3CHBrCH3 + NaOH ->[ethanol] CH2=CHCH3 + NaBr + H2O}}</div><p><b>Reactivity</b>: C–I > C–Br > C–Cl > C–F, set by bond strength (C–F very strong, so fluoroalkanes are very unreactive).</p>`,
      ask: { q: "2-bromopropane is heated with NaOH in ethanol. The main organic product is:", o: [["propan-2-ol", false, "That's with aqueous NaOH."], ["propene", true, "Elimination of HBr."], ["propane", false, "No reduction here."], ["2-methylpropanenitrile", false, "That needs KCN."]] } },
    { t: "worked", h: "Worked example: one compound, four reagents",
      prob: "Give the organic product when 1-bromopropane reacts with: (a) NaOH(aq) (b) NaOH in ethanol (c) KCN in ethanol (d) excess {{NH3}} in ethanol.",
      steps: [
        { s: R`(a) Substitution by {{OH-}}: <b>propan-1-ol</b>, {{CH3CH2CH2OH}}.` },
        { s: R`(b) Elimination of HBr: <b>propene</b>, {{CH3CH=CH2}}.`, why: { q: "What makes (b) elimination rather than substitution?", o: [["Ethanol as solvent, so OH⁻ acts as a base", true, "Hot ethanolic conditions favour elimination."], ["The bromine is on the end", false, "Same molecule in (a)."], ["NaOH is weaker in ethanol", false, "It's the role of OH⁻ that changes."]] } },
        { s: R`(c) Substitution by {{CN-}}: <b>butanenitrile</b>, {{CH3CH2CH2CN}}. Four carbons now, counting the nitrile C.` },
        { s: R`(d) Substitution by {{NH3}}: <b>propylamine</b> (propan-1-amine), {{CH3CH2CH2NH2}}.` },
      ] },
    { t: "complete", h: "Your turn",
      prob: "4.92 g of 2-bromopropane ({{C3H7Br}}, Mr 123.0) is hydrolysed to propan-2-ol (Mr 60.0).", shown: [R`$n=4.92/123.0=0.0400$ mol`],
      q: { q: "Maximum mass of propan-2-ol, in g:", ans: 2.4, unit: "g", label: "mass =", hints: ["1 : 1 ratio.", "0.0400 mol of alcohol.", "× 60.0"], sol: [R`m=0.0400\times60.0=2.40\ \text{g}`], wrongs: [[9.84, "Use moles, not masses."]] } },
    { t: "solo", h: "On your own", gen: "halyield" },
  ],
  mcq: [
    { q: "Which halogenoalkane reacts fastest with aqueous silver nitrate in ethanol?", o: [["1-chlorobutane", false, "Strong C–Cl bond."], ["1-bromobutane", false, "Faster than chloro, but…"], ["1-iodobutane", true, "Weakest C–X bond."], ["1-fluorobutane", false, "Very strong C–F bond; barely reacts."]] },
    { q: "Which reagent turns bromoethane into ethylamine?", o: [["excess ammonia in ethanol, heated under pressure", true, "NH₃ is the nucleophile."], ["NaOH(aq)", false, "Gives ethanol."], ["KCN in ethanol", false, "Gives propanenitrile."], ["{{H2}} with Ni", false, "Not a reaction of halogenoalkanes."]] },
    { q: "The rate-determining step of SN1 involves:", o: [["the nucleophile and the halogenoalkane", false, "That's SN2."], ["only the halogenoalkane", true, "Heterolytic fission of C–X to form a carbocation."], ["only the nucleophile", false, "The nucleophile joins in the fast step."], ["a free radical", false, "Ionic mechanism."]] },
    { q: "Which converts 2-bromobutane into but-2-ene?", o: [["NaOH in ethanol, heat", true, "Elimination."], ["NaOH(aq), heat", false, "Substitution: butan-2-ol."], ["HBr", false, "Adds to alkenes; doesn't make them."], ["KCN", false, "Substitution."]] },
    { q: "Which property mainly decides the reactivity order C–I > C–Br > C–Cl?", o: [["bond polarity", false, "C–Cl is most polar, so polarity would predict the opposite."], ["bond strength", true, "C–I is the weakest, so it breaks most easily."], ["molecular mass", false, "Not the cause."], ["solubility", false, "Not the cause."]] },
    { q: "Which can make chloroethane from ethanol?", o: [["{{PCl5}}", true, "{{C2H5OH + PCl5 -> C2H5Cl + POCl3 + HCl}}."], ["{{Cl2}} in UV", false, "That substitutes into alkanes."], ["NaCl(aq)", false, "No reaction."], ["{{HClO}}", false, "Not used."]] },
  ],
  gens: {
    halyield: () => {
      const h = pick([["1-bromobutane", 137.0, "butan-1-ol", 74.0], ["bromoethane", 109.0, "ethanol", 46.0], ["2-bromopropane", 123.0, "propan-2-ol", 60.0], ["1-chloropropane", 78.5, "propan-1-ol", 60.0], ["2-bromo-2-methylpropane", 137.0, "2-methylpropan-2-ol", 74.0]]);
      const m = rnd(2, 12, 2), theo = m / h[1] * h[3], act = round(theo * rnd(0.5, 0.92, 2), 2), ans = act / theo * 100;
      return { topic: "percentage yield of hydrolysis", q: `${m} g of ${h[0]} (Mr ${h[1]}) is heated under reflux with NaOH(aq). ${act} g of ${h[2]} (Mr ${h[3]}) is obtained. Calculate the percentage yield.`, ans, unit: "%", label: "yield =",
        hints: ["1 mol halogenoalkane → 1 mol alcohol.", `Theoretical: (${m}/${h[1]}) × ${h[3]} g.`, "% = actual/theoretical × 100"],
        sol: [R`\text{theoretical}=${tn(theo)}\ \text{g};\ \%=\frac{${act}}{${tn(theo)}}\times100=${tn(ans)}\%`], wrongs: [[act / m * 100, "Compare masses of the same substance: the alcohol."]] };
    },
    nitrile: () => {
      const h = pick([["bromomethane", 1], ["bromoethane", 2], ["1-bromopropane", 3], ["1-bromobutane", 4]]);
      const n = h[1] + 1, ans = MrCHO(n, 2 * n - 1, 0, 1);
      return { topic: "nitrile from a halogenoalkane", q: `${h[0]} is heated under reflux with KCN in ethanol. Calculate the Mr of the organic product. (C 12.0, H 1.0, N 14.0)`, ans, unit: "", label: "Mr =", tol: 0.003,
        hints: ["CN⁻ replaces Br: the chain gains one carbon.", `Product: {{C${n}H${2 * n - 1}N}}.`, "Add up the masses."],
        sol: [R`\text{C}_{${n}}\text{H}_{${2 * n - 1}}\text{N}:\ ${ans}`], wrongs: [] };
    },
  },
  ex: [
    { q: "Describe the SN2 mechanism for the reaction of bromoethane with hydroxide ions.", pts: ["Cδ+–Brδ− dipole shown", "Curly arrow from lone pair on OH⁻ to the δ+ carbon", "Curly arrow from the C–Br bond to Br", "Transition state with partial bonds to OH and Br (and overall charge −); products ethanol + Br⁻"] },
    { q: "Explain why 2-bromo-2-methylpropane reacts by SN1 and not SN2.", pts: ["It is a tertiary halogenoalkane", "The tertiary carbocation is stabilised by three electron-donating methyl groups (inductive effect)", "Three bulky methyl groups hinder attack by the nucleophile from the back", "So the C–Br bond breaks first (slow step), then OH⁻ attacks the carbocation"] },
  ],
  traps: ["Aqueous NaOH → alcohol (substitution); ethanolic NaOH → alkene (elimination).", "KCN adds a carbon: name the nitrile including the C of C≡N.", "Reactivity is set by bond strength, not bond polarity.", "SN1 = tertiary, carbocation; SN2 = primary, one step, transition state.", "In SN2 drawings, the arrow starts from the nucleophile's lone pair, not from the negative charge sign."],
  defs: [["Nucleophilic substitution", "A reaction in which a nucleophile replaces an atom or group (e.g. a halogen) in a molecule."], ["Elimination", "A reaction in which a small molecule (e.g. HBr or H₂O) is removed from a larger molecule, often forming a C=C bond."], ["Primary halogenoalkane", "A halogenoalkane in which the carbon bonded to the halogen is attached to one other carbon atom."], ["SN1", "A two-step nucleophilic substitution in which a carbocation forms in the slow step; one species is in the rate-determining step."], ["SN2", "A one-step nucleophilic substitution through a transition state; two species are in the rate-determining step."]],
});

/* ======================= UNIT 17 ======================= */
PX.unit({
  id: "17", n: 17, short: "Alcohols, esters & acids", title: "Alcohols, esters and carboxylic acids", strand: "org", sim: "reactionmap",
  intents: ["explain the acidity of alcohols compared with water", "recall reactions that produce alcohols", "recall reactions of alcohols: combustion, substitution to halogenoalkanes, with sodium, oxidation, dehydration, esterification", "classify primary, secondary and tertiary alcohols and suggest distinguishing reactions", "describe acid and base hydrolysis of esters", "describe the formation of carboxylic acids from alcohols, aldehydes and nitriles", "describe reactions of carboxylic acids to form salts, esters and (with {{LiAlH4}}) primary alcohols"],
  lesson: [
    { t: "predict", h: "The colour that doesn't change", body: "Three alcohols, propan-1-ol, propan-2-ol and 2-methylpropan-2-ol, are warmed with acidified potassium dichromate(VI) (orange).", q: "Which one leaves the mixture orange?",
      o: [["propan-1-ol", false, "Primary alcohols are oxidised: orange → green."], ["propan-2-ol", false, "Secondary alcohols are oxidised to ketones: orange → green."], ["2-methylpropan-2-ol", true, "Tertiary: no H on the C–OH carbon to remove, so no oxidation."]],
      after: "Dichromate distinguishes tertiary alcohols from the others. Telling primary from secondary needs the products." },
    { t: "bridge", h: "From IGCSE to AS", igcse: ["Ethanol by fermentation or hydration of ethene", "Ethanol burns; it's oxidised to ethanoic acid", "Acid + alcohol → ester"],
      as: ["Primary, secondary and tertiary alcohols", "**Oxidation** control: distil for aldehyde, reflux for acid", "**Dehydration** to alkenes; halogenation", "Reactions with sodium; alcohols as weak acids", "Ester hydrolysis (acid and base)", "Making carboxylic acids three ways; reducing them with {{LiAlH4}}"],
      note: "Use the reaction map in the model: every arrow is a reagent + conditions pair you need to know.",
      ask: { q: "What is the condition difference between oxidising a primary alcohol to an aldehyde and to a carboxylic acid?", o: [["Distil the aldehyde off as it forms; heat under reflux for the acid", true, "Removing the aldehyde stops further oxidation."], ["Use a different oxidising agent", false, "Same reagent: acidified K₂Cr₂O₇."], ["The aldehyde needs a catalyst", false, "No."], ["Use a lower concentration of alcohol", false, "Not the key control."]] } },
    { t: "explain", h: "Classifying and making alcohols",
      body: R`<p><b>Primary</b>: C–OH carbon has one alkyl group. <b>Secondary</b>: two. <b>Tertiary</b>: three.</p><p>Ways to make alcohols:</p><ul><li>steam + alkene, {{H3PO4}} catalyst (Unit 15)</li><li>halogenoalkane + NaOH(aq), reflux (Unit 16)</li><li>reduction of aldehydes/ketones with {{NaBH4}} (Unit 18), or acids with {{LiAlH4}}</li><li>ester hydrolysis</li><li>fermentation of glucose (yeast, 37 °C, no air)</li></ul>`,
      ask: { q: "Butan-2-ol is a:", o: [["primary alcohol", false, "The C–OH carbon has two alkyl groups."], ["secondary alcohol", true, "CH₃ and C₂H₅ on the C–OH carbon."], ["tertiary alcohol", false, "Needs three alkyl groups."], ["diol", false, "Only one OH."]] } },
    { t: "explain", h: "Sodium, acidity and halogenation",
      body: R`<p>{{2C2H5OH + 2Na -> 2C2H5O-Na+ + H2}}: bubbles, sodium ethoxide forms. Slower than sodium with water: <b>alcohols are weaker acids than water</b> because the alkyl group pushes electron density onto O⁻, making the alkoxide ion less stable (a stronger base).</p><p>Halogenation: {{C2H5OH + HBr -> C2H5Br + H2O}} (KBr + conc {{H2SO4}}); with {{PCl5}}: {{C2H5OH + PCl5 -> C2H5Cl + POCl3 + HCl}} (steamy fumes: test for –OH); also {{PCl3}} (heat) and {{SOCl2}}.</p>`,
      ask: { q: "Why is ethanol a weaker acid than water?", o: [["The ethyl group donates electrons, destabilising the ethoxide ion", true, "The negative charge is intensified, so ethoxide holds H⁺ more strongly."], ["Ethanol has no O–H bond", false, "It does."], ["Ethanol is less polar", false, "Partly true, but not the reason given at AS."], ["Ethanol doesn't dissolve", false, "Fully miscible."]] } },
    { t: "explain", h: "Oxidation: telling them apart",
      body: R`<p>Acidified {{K2Cr2O7}}, orange → green ({{Cr2O7^2-}} → {{Cr^3+}}). [O] = oxygen from the oxidising agent:</p><ul><li><b>Primary</b>: → aldehyde (distil off immediately) → carboxylic acid (heat under reflux). {{CH3CH2OH + [O] -> CH3CHO + H2O}}; {{CH3CHO + [O] -> CH3COOH}}</li><li><b>Secondary</b>: → ketone (no further oxidation). {{CH3CH(OH)CH3 + [O] -> CH3COCH3 + H2O}}</li><li><b>Tertiary</b>: no reaction, stays orange.</li></ul><p>Then test the product: aldehydes give a silver mirror with Tollens'; ketones don't (Unit 18).</p>`,
      sim: { node: "alc1" }, simLabel: "Explore the alcohol routes",
      ask: { q: "Propan-2-ol is heated under reflux with excess acidified dichromate. The product is:", o: [["propanal", false, "That's from propan-1-ol."], ["propanone", true, "Secondary → ketone, and no further."], ["propanoic acid", false, "Ketones aren't oxidised further."], ["no reaction", false, "Only tertiary alcohols resist."]] } },
    { t: "explain", h: "Dehydration",
      body: R`<p>Remove water to give an alkene (elimination):</p><div class="eq">{{C2H5OH -> CH2=CH2 + H2O}}</div><p>Conditions: pass vapour over heated {{Al2O3}}, or heat with concentrated {{H2SO4}} or {{H3PO4}}. Butan-2-ol can give but-1-ene and both cis- and trans-but-2-ene.</p>`,
      ask: { q: "How many alkene products (including stereoisomers) form when butan-2-ol is dehydrated?", o: [["1", false, "The H can be lost from either neighbouring carbon."], ["2", false, "But-2-ene has cis/trans forms."], ["3", true, "But-1-ene, cis-but-2-ene, trans-but-2-ene."], ["4", false, "Count again."]] } },
    { t: "explain", h: "Esters, and carboxylic acids",
      body: R`<p><b>Esterification</b>: {{CH3COOH + C2H5OH <=> CH3COOC2H5 + H2O}}, conc {{H2SO4}} catalyst, heat. Esters smell fruity.</p><p><b>Hydrolysis</b>: with dilute acid, heat under reflux: reversible, gives acid + alcohol. With NaOH(aq), heat under reflux: goes to completion, gives the <b>carboxylate salt</b> + alcohol.</p><p><b>Making carboxylic acids</b>: oxidise primary alcohols or aldehydes (reflux, {{K2Cr2O7}}/H⁺); hydrolyse nitriles with dilute acid, reflux: {{CH3CN + 2H2O + H+ -> CH3COOH + NH4+}}.</p><p><b>Reactions of acids</b>: metals (salt + {{H2}}), alkalis (salt + water), carbonates (salt + water + {{CO2}}, fizzing), alcohols (esters), {{LiAlH4}} in dry ether (reduction to primary alcohol).</p>`,
      sim: { node: "acid" }, simLabel: "Explore the acid routes",
      ask: { q: "Methyl propanoate is heated under reflux with NaOH(aq). The products are:", o: [["propanoic acid and methanol", false, "With alkali, the acid is deprotonated."], ["sodium propanoate and methanol", true, "Base hydrolysis gives the salt."], ["sodium methanoate and propanol", false, "Split the ester at the C(=O)–O bond: acid part is propanoate."], ["propanal and methanol", false, "Hydrolysis isn't reduction."]] } },
    { t: "worked", h: "Worked example: a two-step synthesis",
      prob: "Plan a synthesis of ethyl ethanoate using ethanol as the only organic starting material.",
      steps: [
        { s: R`Ethyl ethanoate needs ethanoic acid + ethanol.` },
        { s: R`Step 1: oxidise some ethanol to ethanoic acid: acidified {{K2Cr2O7}}, heat under reflux.`, why: { q: "Why reflux rather than distil?", o: [["To oxidise all the way to the acid", true, "Refluxing keeps the aldehyde in the flask so it oxidises further."], ["To make the aldehyde", false, "Distilling would give the aldehyde."], ["To remove water", false, "Not the purpose."]] } },
        { s: R`Step 2: heat ethanoic acid with more ethanol and a few drops of concentrated {{H2SO4}}.` },
      ] },
    { t: "complete", h: "Your turn",
      prob: "0.460 g of ethanol ({{C2H5OH}}, Mr 46.0) reacts with excess sodium: {{2C2H5OH + 2Na -> 2C2H5ONa + H2}}.", shown: [R`$n(\text{ethanol})=0.460/46.0=0.0100$ mol`],
      q: { q: "Volume of hydrogen at r.t.p., in cm³ (24 000 cm³ mol⁻¹):", ans: 120, unit: "cm³", label: "V =", hints: ["2 ethanol : 1 H₂.", "n(H₂) = 0.00500 mol.", "× 24 000"], sol: [R`V=0.00500\times24000=120\ \text{cm}^3`], wrongs: [[240, "The ratio is 2 : 1."]] } },
    { t: "solo", h: "On your own", gen: "ester" },
  ],
  mcq: [
    { q: "Which reagent gives steamy fumes with all alcohols?", o: [["{{PCl5}}", true, "HCl fumes form."], ["{{K2Cr2O7}}/H⁺", false, "Tertiary alcohols don't react."], ["Tollens' reagent", false, "Tests aldehydes."], ["bromine water", false, "Tests C=C."]] },
    { q: "What is the colour change when a primary alcohol is oxidised by acidified potassium dichromate(VI)?", o: [["orange to green", true, "Cr(VI) → Cr(III)."], ["purple to colourless", false, "That's manganate(VII)."], ["green to orange", false, "Backwards."], ["blue to red-brown", false, "Fehling's."]] },
    { q: "Ethanenitrile is heated under reflux with dilute HCl. The organic product is:", o: [["ethanoic acid", true, "Acid hydrolysis of a nitrile."], ["ethylamine", false, "That would need reduction."], ["ethanol", false, "No."], ["ethanamide only", false, "That's an intermediate."]] },
    { q: "Why is base hydrolysis of esters preferred over acid hydrolysis for making soap?", o: [["It goes to completion", true, "The carboxylate ion can't react back with the alcohol."], ["It's reversible", false, "Acid hydrolysis is reversible."], ["It needs no heating", false, "Both are heated."], ["It produces the acid directly", false, "It produces the salt."]] },
    { q: "Which converts propanoic acid into propan-1-ol?", o: [["{{LiAlH4}} in dry ether", true, "Strong reducing agent."], ["{{NaBH4}}", false, "Too weak to reduce carboxylic acids."], ["{{K2Cr2O7}}/H⁺", false, "An oxidising agent."], ["conc {{H2SO4}}", false, "A dehydrating agent."]] },
    { q: "Dehydration of propan-1-ol gives:", o: [["propene", true, "Loss of water across C1–C2."], ["propanal", false, "That's oxidation."], ["propane", false, "That's reduction."], ["1-chloropropane", false, "Needs a chlorinating agent."]] },
  ],
  gens: {
    ester: () => {
      const e = pick([["ethanoic acid", 60.0, "ethanol", "ethyl ethanoate", 88.0], ["methanoic acid", 46.0, "ethanol", "ethyl methanoate", 74.0], ["propanoic acid", 74.0, "methanol", "methyl propanoate", 88.0], ["ethanoic acid", 60.0, "propan-1-ol", "propyl ethanoate", 102.0]]);
      const m = rnd(3, 12, 2), theo = m / e[1] * e[4], act = round(theo * rnd(0.4, 0.8, 2), 2), ans = act / theo * 100;
      return { topic: "percentage yield of an ester", q: `${m} g of ${e[0]} (Mr ${e[1]}) is heated with excess ${e[2]} and a little concentrated {{H2SO4}}. ${act} g of ${e[3]} (Mr ${e[4]}) is collected. Calculate the percentage yield.`, ans, unit: "%", label: "yield =",
        hints: ["Acid : ester = 1 : 1.", `Theoretical mass = (${m}/${e[1]}) × ${e[4]}.`, "% = actual/theoretical × 100"],
        sol: [R`\text{theoretical}=${tn(theo)}\ \text{g};\ \%=${tn(ans)}\%`], wrongs: [[act / m * 100, "Compare with the theoretical mass of ester."]] };
    },
    naH2: () => {
      const a = pick([["methanol", 32.0], ["ethanol", 46.0], ["propan-1-ol", 60.0], ["butan-1-ol", 74.0]]), m = rnd(0.2, 3, 2);
      const ans = m / a[1] / 2 * 24000;
      return { topic: "hydrogen from an alcohol and sodium", q: `${m} g of ${a[0]} (Mr ${a[1]}) reacts with excess sodium. What volume of hydrogen forms at r.t.p., in cm³?`, ans, unit: "cm³", label: "V =",
        hints: ["2 ROH + 2 Na → 2 RONa + H₂.", "Moles of H₂ = half the moles of alcohol.", "× 24 000 cm³"], sol: [R`V=\frac{${m}}{${a[1]}}\times\frac12\times24000=${tn(ans)}\ \text{cm}^3`], wrongs: [[ans * 2, "Two alcohol molecules give one H₂."]] };
    },
  },
  ex: [
    { q: "Describe how you would distinguish between propan-1-ol, propan-2-ol and 2-methylpropan-2-ol using chemical tests.", pts: ["Warm each with acidified potassium dichromate(VI)", "2-methylpropan-2-ol (tertiary): stays orange", "Propan-1-ol and propan-2-ol: orange → green; distil off the product", "Test product with Tollens': silver mirror = aldehyde (from propan-1-ol); no change = ketone (from propan-2-ol)"] },
    { q: "Compare the acid and base hydrolysis of ethyl ethanoate.", pts: ["Both heated under reflux", "Acid (dilute H₂SO₄/HCl): ethanoic acid + ethanol; reversible", "Base (NaOH(aq)): sodium ethanoate + ethanol", "Base hydrolysis goes to completion"] },
  ],
  traps: ["Distil for an aldehyde; reflux for a carboxylic acid.", "Tertiary alcohols aren't oxidised: dichromate stays orange.", "{{NaBH4}} can't reduce carboxylic acids; you need {{LiAlH4}}.", "Base hydrolysis of an ester gives the carboxylate *salt*, not the acid.", "Name esters alcohol-part first: CH₃COOC₂H₅ is *ethyl* ethanoate."],
  defs: [["Primary alcohol", "An alcohol in which the carbon bonded to –OH is attached to one other carbon atom (or none, in methanol)."], ["Esterification", "The reaction of a carboxylic acid with an alcohol, in the presence of an acid catalyst, to form an ester and water."], ["Heating under reflux", "Heating a reaction mixture with a vertical condenser so that vapours condense and return to the flask, allowing prolonged heating without loss of volatile substances."], ["Dehydration", "An elimination reaction in which water is removed from a molecule."]],
});

/* ======================= UNIT 18 ======================= */
PX.unit({
  id: "18", n: 18, short: "Carbonyls & IR", title: "Carbonyl compounds and infrared spectroscopy", strand: "org", sim: "carbonyl",
  intents: ["describe the formation of aldehydes and ketones by oxidation of alcohols, and their reduction with {{NaBH4}} or {{LiAlH4}}", "describe the reaction of aldehydes and ketones with HCN/KCN and the nucleophilic addition mechanism", "describe the use of 2,4-DNPH; distinguish aldehydes and ketones with Fehling's and Tollens' reagents", "describe the tri-iodomethane (iodoform) reaction of {{CH3CO}}– and {{CH3CH(OH)}}– compounds", "devise multi-step synthetic routes using Units 14–18", "analyse infrared spectra to identify functional groups"],
  lesson: [
    { t: "predict", h: "Propanal or propanone?", body: "Two colourless liquids, propanal and propanone, have the same formula {{C3H6O}} and both contain C=O.", q: "Which reagent tells them apart?",
      o: [["2,4-DNPH", false, "Both give an orange precipitate: it detects any C=O."], ["Tollens' reagent", true, "Aldehydes reduce it to a silver mirror; ketones don't react."], ["Bromine water", false, "No C=C in either."], ["Sodium", false, "Neither has an O–H."]],
      after: "Aldehydes are easily oxidised (they have an H on the C=O carbon); ketones aren't. That's the basis of both Tollens' and Fehling's tests." },
    { t: "bridge", h: "From IGCSE to AS", igcse: ["(Carbonyls aren't on the IGCSE syllabus)", "Oxidation of ethanol to ethanoic acid", "Test for alkenes with bromine water"],
      as: ["Aldehydes {{RCHO}} and ketones {{RCOR'}}", "Reduction with {{NaBH4}}", "**Nucleophilic addition** of HCN", "Four tests: 2,4-DNPH, Tollens', Fehling's, iodoform", "Reading **infrared spectra**"],
      note: "All of this builds on Unit 17's oxidation of alcohols. Aldehyde = halfway stage from primary alcohol to acid.",
      ask: { q: "Which alcohol is oxidised to propanone?", o: [["propan-1-ol", false, "Gives propanal."], ["propan-2-ol", true, "Secondary → ketone."], ["2-methylpropan-2-ol", false, "Tertiary: no reaction."], ["propane-1,2-diol", false, "Not the intended answer."]] } },
    { t: "explain", h: "Reduction and nucleophilic addition",
      body: R`<p><b>Reduction</b> with {{NaBH4}} (in water/methanol) or {{LiAlH4}} (dry ether): aldehydes → primary alcohols; ketones → secondary alcohols. {{CH3CHO + 2[H] -> CH3CH2OH}}.</p><p><b>HCN + KCN</b> (KCN supplies {{CN-}}): {{CH3CHO + HCN -> CH3CH(OH)CN}}, 2-hydroxypropanenitrile. Mechanism (<b>nucleophilic addition</b>):</p><ol><li>{{CN-}} attacks the δ+ carbonyl carbon; the π bond electrons move onto O.</li><li>The O⁻ of the intermediate takes {{H+}} from HCN, regenerating {{CN-}}.</li></ol><p>The planar C=O can be attacked from either side, so a racemic mixture (equal enantiomers) forms when the product is chiral.</p>`,
      sim: { tab: 1 }, simLabel: "Animate nucleophilic addition",
      ask: { q: "Why is a racemic mixture formed when HCN adds to ethanal?", o: [["The trigonal planar C=O is attacked equally from both sides", true, "So both enantiomers form in equal amounts."], ["Ethanal is chiral", false, "Ethanal has no chiral centre."], ["HCN is chiral", false, "Linear molecule."], ["The reaction is SN1", false, "It's addition, not substitution."]] } },
    { t: "explain", h: "Four tests",
      body: R`<div class="tbl-wrap"><table class="board"><tr><th>Test</th><th>Positive result</th><th>Shows</th></tr><tr><td>2,4-DNPH (Brady's)</td><td>orange/yellow precipitate</td><td>C=O in an aldehyde or ketone</td></tr><tr><td>Tollens' ({{[Ag(NH3)2]+}}), warm</td><td>silver mirror</td><td>aldehyde ({{Ag+}} reduced to Ag)</td></tr><tr><td>Fehling's, warm</td><td>blue solution → red-brown precipitate ({{Cu2O}})</td><td>aldehyde ({{Cu^2+}} reduced to {{Cu+}})</td></tr><tr><td>alkaline {{I2}} (iodoform)</td><td>pale yellow precipitate {{CHI3}}, antiseptic smell</td><td>{{CH3CO}}– or {{CH3CH(OH)}}–</td></tr></table></div><p>Iodoform: {{CH3COR}} → {{CHI3}} + {{RCOO-}}. Ethanol and ethanal both give it (they contain CH₃CH(OH)– and CH₃CO–); methanol and propan-1-ol don't.</p>`,
      sim: { tab: 2 }, simLabel: "Try the tests",
      ask: { q: "Which compound gives a positive iodoform test?", o: [["propanal", false, "CH₃CH₂CHO: no CH₃CO– group."], ["butanone", true, "CH₃COCH₂CH₃ has a CH₃CO– group."], ["pentan-3-one", false, "C₂H₅COC₂H₅: no methyl ketone."], ["methanol", false, "No CH₃CH(OH)– group."]] } },
    { t: "explain", h: "Infrared spectroscopy",
      body: R`<p>Bonds absorb IR at characteristic wavenumbers. Use the data table (given in the exam):</p><div class="tbl-wrap"><table class="board"><tr><th>Bond</th><th>Wavenumber / cm⁻¹</th><th>Look</th></tr><tr><td>O–H (alcohol)</td><td>3200–3600</td><td>broad</td></tr><tr><td>O–H (acid)</td><td>2500–3000</td><td>very broad</td></tr><tr><td>N–H</td><td>3300–3500</td><td></td></tr><tr><td>C–H</td><td>2850–2950</td><td>(in almost everything)</td></tr><tr><td>C≡N</td><td>2200–2250</td><td></td></tr><tr><td>C=O</td><td>1670–1740</td><td>strong, sharp</td></tr><tr><td>C=C</td><td>1500–1680</td><td></td></tr><tr><td>C–O</td><td>1040–1300</td><td></td></tr></table></div><p>Ignore the fingerprint region below about 1500 cm⁻¹ except to match a known spectrum.</p>`,
      sim: { tab: 0, s: "ethanoic acid" }, simLabel: "Read an IR spectrum",
      ask: { q: "A spectrum shows a strong peak at 1715 cm⁻¹ and no broad peak above 2500 cm⁻¹. The compound could be:", o: [["ethanol", false, "Ethanol has a broad O–H at 3200–3600."], ["propanone", true, "C=O with no O–H."], ["ethanoic acid", false, "Would also show a very broad O–H at 2500–3000."], ["ethene", false, "No C=O."]] } },
    { t: "explain", h: "Planning synthetic routes",
      body: R`<p>Work backwards from the target, one functional group change at a time. Useful moves:</p><ul><li>add one carbon: halogenoalkane + KCN → nitrile; or carbonyl + HCN → hydroxynitrile</li><li>nitrile → acid (dilute acid, reflux)</li><li>alkene ↔ alcohol (steam/H₃PO₄; dehydration)</li><li>alcohol → halogenoalkane ({{PCl5}}, HBr…) and back (NaOH(aq))</li><li>alcohol ⇄ carbonyl (oxidise with {{K2Cr2O7}}/H⁺; reduce with {{NaBH4}})</li></ul>`,
      sim: { tab: 3 }, simLabel: "Open the route finder",
      ask: { q: "Which route converts ethanol into propanoic acid?", o: [["ethanol → bromoethane (HBr) → propanenitrile (KCN) → propanoic acid (H⁺, reflux)", true, "The KCN step adds the extra carbon."], ["ethanol → ethanoic acid (oxidise) → propanoic acid", false, "Oxidation can't add a carbon."], ["ethanol → ethene → propene", false, "No such step."], ["ethanol → propanal (Tollens')", false, "Tollens' is a test, not a carbon-adding step."]] } },
    { t: "worked", h: "Worked example: identify X",
      prob: "Compound X, {{C4H8O}}, gives an orange precipitate with 2,4-DNPH, no reaction with Fehling's, and a yellow precipitate with alkaline iodine. Identify X.",
      steps: [
        { s: R`2,4-DNPH positive: X is an aldehyde or ketone.` },
        { s: R`Fehling's negative: not an aldehyde, so a <b>ketone</b>.`, why: { q: "Why does Fehling's rule out an aldehyde?", o: [["Aldehydes would reduce Cu²⁺ to red-brown Cu₂O", true, "Ketones aren't oxidised, so no change."], ["Ketones react with Fehling's", false, "They don't."], ["Fehling's only detects alcohols", false, "It detects aldehydes."]] } },
        { s: R`Iodoform positive: contains {{CH3CO}}–. The only {{C4H8O}} methyl ketone is <b>butanone</b>, {{CH3COCH2CH3}}.` },
      ] },
    { t: "complete", h: "Your turn",
      prob: "Propanal reacts with HCN (with KCN catalyst).", shown: [R`Product: {{CH3CH2CH(OH)CN}}, 2-hydroxybutanenitrile, formula {{C4H7NO}}.`],
      q: { q: "Mr of the product (C 12.0, H 1.0, N 14.0, O 16.0):", ans: 85, unit: "", label: "Mr =", tol: 0.003, hints: ["Count: 4 C, 7 H, 1 N, 1 O.", "48 + 7 + 14 + 16", "= 85"], sol: [R`M_r=4(12.0)+7(1.0)+14.0+16.0=85.0`], wrongs: [[58, "That's propanal itself; HCN adds 27."]] } },
    { t: "solo", h: "On your own", gen: "hcn" },
  ],
  mcq: [
    { q: "Which reagent reduces propanone to propan-2-ol?", o: [["{{NaBH4}}", true, "Hydride reducing agent."], ["{{K2Cr2O7}}/H⁺", false, "Oxidising agent."], ["Tollens' reagent", false, "Oxidising agent (for aldehydes)."], ["HCN", false, "Adds to C=O, giving a hydroxynitrile."]] },
    { q: "In the mechanism of HCN addition to ethanal, the first step is attack by:", o: [["{{H+}} on oxygen", false, "CN⁻ attacks first."], ["{{CN-}} on the carbonyl carbon", true, "Nucleophilic attack on Cδ+."], ["HCN on oxygen", false, "No."], ["{{OH-}} on carbon", false, "No hydroxide involved."]] },
    { q: "Which compound gives a silver mirror with Tollens' reagent?", o: [["propanone", false, "Ketone."], ["ethanal", true, "Aldehyde: oxidised to ethanoate."], ["ethanoic acid", false, "Already oxidised."], ["ethanol", false, "Tollens' doesn't oxidise alcohols."]] },
    { q: "An IR spectrum has a very broad absorption at 2500–3000 cm⁻¹ and a strong peak at 1710 cm⁻¹. The compound is most likely:", o: [["an alcohol", false, "Alcohol O–H is at 3200–3600 and there'd be no C=O."], ["a carboxylic acid", true, "Very broad acid O–H plus C=O."], ["a ketone", false, "No O–H."], ["an ester", false, "No O–H."]] },
    { q: "Which compound does NOT give a yellow precipitate with alkaline aqueous iodine?", o: [["ethanol", false, "Contains CH₃CH(OH)–."], ["propan-2-ol", false, "Contains CH₃CH(OH)–."], ["propanone", false, "CH₃CO–."], ["propan-1-ol", true, "No CH₃CH(OH)– or CH₃CO– group."]] },
    { q: "Fehling's solution gives a positive result as:", o: [["a silver mirror", false, "That's Tollens'."], ["blue to red-brown precipitate", true, "Cu₂O forms."], ["orange to green", false, "Dichromate."], ["orange precipitate", false, "2,4-DNPH."]] },
  ],
  gens: {
    hcn: () => {
      const c = pick([["methanal", 1, 2], ["ethanal", 2, 4], ["propanal", 3, 6], ["propanone", 3, 6], ["butanal", 4, 8], ["butanone", 4, 8]]);
      const ans = MrCHO(c[1] + 1, c[2] + 1, 1, 1);
      return { topic: "hydroxynitrile from a carbonyl", q: `${c[0]} reacts with HCN in the presence of KCN. Calculate the Mr of the organic product. (C 12.0, H 1.0, N 14.0, O 16.0)`, ans, unit: "", label: "Mr =", tol: 0.003,
        hints: ["HCN adds across C=O: H to O, CN to C.", `Product contains C${c[1] + 1}H${c[2] + 1}NO.`, "Or: Mr(carbonyl) + Mr(HCN) = Mr(carbonyl) + 27.0"],
        sol: [R`M_r=${MrCHO(c[1], c[2], 1)}+27.0=${ans}`], wrongs: [[MrCHO(c[1], c[2], 1), "That's the carbonyl itself."]] };
    },
    chi3: () => {
      const c = pick([["ethanal", 44.0], ["propanone", 58.0], ["butanone", 72.0], ["ethanol", 46.0]]), m = rnd(0.2, 2, 2);
      const ans = m / c[1] * 393.7;
      return { topic: "mass of tri-iodomethane", q: `${m} g of ${c[0]} (Mr ${c[1]}) is warmed with excess alkaline aqueous iodine. What maximum mass of {{CHI3}} (Mr 393.7) forms?`, ans, unit: "g", label: "mass =",
        hints: ["One CH₃CO– (or CH₃CH(OH)–) gives one CHI₃.", `n = ${m}/${c[1]}`, "× 393.7"], sol: [R`m=\frac{${m}}{${c[1]}}\times393.7=${tn(ans)}\ \text{g}`], wrongs: [] };
    },
  },
  ex: [
    { q: "Describe the mechanism of the reaction of propanone with HCN in the presence of KCN.", pts: ["Cδ+=Oδ− dipole shown", "Curly arrow from lone pair (or negative charge) on CN⁻ to carbonyl carbon; arrow from C=O π bond to O", "Intermediate with O⁻", "O⁻ takes H⁺ from HCN (curly arrow from O⁻ lone pair to H, H–CN bond to CN), regenerating CN⁻"] },
    { q: "Describe tests to distinguish butanal from butanone.", pts: ["Both give an orange precipitate with 2,4-DNPH (both carbonyls)", "Warm with Tollens': butanal gives a silver mirror; butanone no change", "Or Fehling's: butanal gives red-brown precipitate; butanone stays blue", "Butanone gives a yellow precipitate with alkaline iodine (CH₃CO–); butanal doesn't"] },
  ],
  traps: ["2,4-DNPH detects both aldehydes and ketones. Use Tollens' or Fehling's to tell them apart.", "Iodoform needs CH₃CO– or CH₃CH(OH)–. Ethanol is positive; methanol isn't.", "Nucleophilic addition: CN⁻ attacks C, then O⁻ takes H⁺ from HCN.", "IR: acid O–H is very broad at 2500–3000; alcohol O–H is broad at 3200–3600.", "{{NaBH4}} reduces aldehydes and ketones, not acids or C=C."],
  defs: [["Nucleophilic addition", "A reaction in which a nucleophile attacks the δ+ carbon of a C=O group and atoms add across the double bond."], ["Racemic mixture", "An equimolar mixture of two optical isomers (enantiomers), which has no overall effect on plane-polarised light."], ["Fingerprint region", "The part of an IR spectrum below about 1500 cm⁻¹, with many absorptions unique to a molecule."]],
});

/* ======================= P1 ======================= */
PX.unit({
  id: "p1", n: 19, short: "Practical skills", title: "Practical skills (P1)", strand: "prac", sim: "titration",
  intents: ["manipulate apparatus and make accurate measurements and observations", "record results in tables with correct headings, units and significant figures", "plot graphs with suitable scales and lines of best fit", "calculate percentage uncertainties and mean titres", "draw conclusions; identify sources of error and suggest improvements", "use qualitative analysis tests for ions and gases"],
  lesson: [
    { t: "predict", h: "Reading a burette", body: "The bottom of the meniscus sits exactly halfway between the 23.1 and 23.2 cm³ marks.", q: "How should you record it?",
      o: [["23.1 cm³", false, "Burettes are read to 2 decimal places."], ["23.15 cm³", true, "Burette readings are to the nearest 0.05 cm³, recorded to 2 d.p."], ["23.150 cm³", false, "Too many decimal places for this apparatus."], ["23.2 cm³", false, "Not to the nearest 0.05."]],
      after: "Every burette reading ends in **0 or 5** in the second decimal place." },
    { t: "bridge", h: "From IGCSE to AS", igcse: ["Carrying out a titration", "Recording results in a table", "Plotting points and lines of best fit", "Tests for gases and ions"],
      as: ["**Uncertainty** and % uncertainty", "Concordant titres and the right mean", "Strict table and graph conventions", "**Evaluation**: errors and improvements", "Analysis notes for cations and anions"],
      note: "Paper 3 is a lab exam. Most marks are lost on conventions, not chemistry: units in headings, decimal places, concordant titres.",
      ask: { q: "Which titres are concordant?", o: [["24.10, 24.50, 24.20", false, "24.10 and 24.50 differ by 0.40."], ["24.15, 24.20, 24.60", false, "Only 24.15 and 24.20 agree within 0.10."], ["24.15, 24.20, 24.10", true, "All within 0.10 cm³ of each other."], ["23.90, 24.20", false, "0.30 apart."]] } },
    { t: "explain", h: "Uncertainty",
      body: R`<p>Every reading has an uncertainty, usually half the smallest division (or as stated). A burette reading is ±0.05 cm³; a titre uses two readings, so ±0.10 cm³.</p><div class="callout key">$$\%\ \text{uncertainty}=\frac{\text{absolute uncertainty}}{\text{measured value}}\times100$$</div><p>Bigger measured values give smaller % uncertainty: use a larger mass or titre, or a temperature change measured over a bigger range.</p>`,
      ask: { q: "A balance reads to ±0.005 g. What is the % uncertainty in a mass of 2.50 g found by difference (two readings)?", o: [["0.2%", false, "Two readings: ±0.010 g."], ["0.4%", true, "0.010/2.50 × 100 = 0.4%."], ["0.02%", false, "Check the arithmetic."], ["4%", false, "0.010/2.50 = 0.004."]] } },
    { t: "explain", h: "Titration technique",
      body: R`<ol><li>Rinse the burette with the solution it will hold; the pipette with its solution; the flask with distilled water.</li><li>Pipette 25.0 cm³ into the flask, add 2–3 drops of indicator.</li><li>Rough titration first; then add dropwise near the end point, swirling, with a white tile underneath.</li><li>Repeat until two titres are <b>concordant</b> (within 0.10 cm³). Mean of concordant titres only.</li></ol>`,
      sim: {}, simLabel: "Do a titration",
      ask: { q: "Results: rough 25.40; then 24.95, 24.70, 24.75 cm³. What mean titre should you use?", o: [["24.73 cm³", true, "24.70 and 24.75 are concordant: (24.70 + 24.75)/2 = 24.725 ≈ 24.73."], ["24.95 cm³", false, "24.95 is 0.25 away from the others: not concordant."], ["24.80 cm³", false, "Don't include 24.95."], ["24.96 cm³", false, "Never include the rough titre."]] } },
    { t: "explain", h: "Tables and graphs",
      body: R`<ul><li>Column headings: <b>quantity / unit</b>, e.g. "volume of acid / cm³". No units in the body of the table.</li><li>Same number of decimal places for each column, matching the apparatus.</li><li>Graph: independent variable on x; label axes with units; points occupy more than half the grid; sensible scale (1, 2, 5 per division); thin line or smooth curve of best fit; circle anomalies and leave them out.</li><li>Gradient: use a large triangle and read points off the line.</li></ul>`,
      ask: { q: "Which table heading is correct?", o: [["Temperature (°C)", false, "Cambridge prefers quantity / unit."], ["temperature / °C", true, "Quantity / unit."], ["Temp °C", false, "Abbreviated and no separator."], ["°C", false, "Quantity missing."]] } },
    { t: "explain", h: "Evaluation and improvements",
      body: R`<p>Name a <b>specific</b> source of error and a <b>specific</b> improvement:</p><ul><li>Heat lost from a polystyrene cup → add a lid / insulate / use a thermometer reading to 0.1 °C / plot a cooling curve and extrapolate.</li><li>Gas escaping before the bung is replaced → use a tube to tip the reagents together inside the sealed flask.</li><li>Small titre → use more dilute titrant or a larger aliquot.</li><li>End point hard to see → use a white tile; add dropwise.</li></ul><p>"Human error" and "use more accurate apparatus" without detail score nothing.</p>`,
      ask: { q: "In an enthalpy experiment the temperature rise is 3.0 °C, read on a thermometer ±0.5 °C. Best improvement?", o: [["Repeat the experiment", false, "Repeats help reliability, not this uncertainty."], ["Use a thermometer reading to ±0.1 °C, or use more concentrated reagents for a bigger rise", true, "Both cut the % uncertainty in ΔT."], ["Use a glass beaker", false, "Worse insulation."], ["Use less solution", false, "Not the issue."]] } },
    { t: "explain", h: "Qualitative analysis: gases and ions",
      body: R`<div class="tbl-wrap"><table class="board"><tr><th>Gas</th><th>Test</th></tr><tr><td>{{H2}}</td><td>lighted splint: squeaky pop</td></tr><tr><td>{{O2}}</td><td>glowing splint relights</td></tr><tr><td>{{CO2}}</td><td>limewater turns milky</td></tr><tr><td>{{NH3}}</td><td>damp red litmus turns blue</td></tr><tr><td>{{Cl2}}</td><td>bleaches damp litmus</td></tr></table></div><p>Cations with NaOH(aq): {{Cu^2+}} blue ppt; {{Fe^2+}} green ppt; {{Fe^3+}} red-brown ppt; {{Al^3+}}, {{Zn^2+}} white ppt, dissolves in excess; {{Mg^2+}}, {{Ca^2+}} white ppt, insoluble in excess; {{NH4+}}: ammonia on warming. Anions: {{CO3^2-}} fizzes with acid ({{CO2}}); {{SO4^2-}} white ppt with {{Ba^2+}}; halides with {{Ag+}} (Unit 12); {{NO3-}}: NaOH + Al foil, warm → {{NH3}}.</p>`,
      ask: { q: "A solution gives a white precipitate with NaOH(aq) that dissolves in excess. It could contain:", o: [["{{Mg^2+}}", false, "Mg(OH)₂ doesn't dissolve in excess."], ["{{Al^3+}}", true, "Amphoteric hydroxide dissolves in excess NaOH."], ["{{Fe^3+}}", false, "Red-brown."], ["{{Cu^2+}}", false, "Blue."]] } },
    { t: "worked", h: "Worked example: % uncertainty of a titre",
      prob: "Initial burette reading 1.20 cm³, final 25.70 cm³. Each reading has an uncertainty of ±0.05 cm³. Find the titre and its percentage uncertainty.",
      steps: [
        { s: R`Titre $=25.70-1.20=24.50$ cm³.` },
        { s: R`Absolute uncertainty $=2\times0.05=\pm0.10$ cm³.`, why: { q: "Why double the uncertainty?", o: [["Two readings each contribute ±0.05", true, "Uncertainties add when you subtract readings."], ["Burettes are twice as uncertain as pipettes", false, "No."], ["Titrations are repeated twice", false, "Not the reason."]] } },
        { s: R`$\%=\dfrac{0.10}{24.50}\times100=0.41\%$` },
      ] },
    { t: "complete", h: "Your turn",
      prob: "A pipette delivers 25.0 cm³ with an uncertainty of ±0.06 cm³.", shown: [R`$\%=\dfrac{0.06}{25.0}\times100$`],
      q: { q: "% uncertainty:", ans: 0.24, unit: "%", label: "% =", hints: ["One reading only.", "0.06 ÷ 25.0", "× 100"], sol: [R`\frac{0.06}{25.0}\times100=0.24\%`], wrongs: [[0.48, "A pipette is a single measurement: don't double it."]] } },
    { t: "solo", h: "On your own", gen: "unc" },
  ],
  mcq: [
    { q: "Which reading is correctly recorded from a burette?", o: [["12.3 cm³", false, "2 d.p. needed."], ["12.35 cm³", true, "Ends in 0 or 5."], ["12.37 cm³", false, "Should end in 0 or 5."], ["12.350 cm³", false, "Too precise."]] },
    { q: "Why is the conical flask rinsed with distilled water and not with the solution it will hold?", o: [["The moles in the flask are fixed by the pipette; extra water doesn't change them", true, "Rinsing with the solution would add extra moles."], ["To remove indicator", false, "No."], ["To cool the flask", false, "No."], ["To dilute the titrant", false, "Titrant is in the burette."]] },
    { q: "Which change reduces the percentage uncertainty in a mass measurement?", o: [["using a larger mass", true, "Same absolute uncertainty, bigger value."], ["repeating the weighing", false, "Improves reliability, not the uncertainty of one reading."], ["using a smaller mass", false, "Increases % uncertainty."], ["weighing faster", false, "No."]] },
    { q: "A white precipitate forms when {{BaCl2(aq)}} is added to an acidified solution. The anion is:", o: [["{{Cl-}}", false, "Tested with Ag⁺."], ["{{SO4^2-}}", true, "BaSO₄ is insoluble."], ["{{CO3^2-}}", false, "Acidifying removes carbonate first."], ["{{NO3-}}", false, "No precipitate."]] },
    { q: "Points on a graph should cover:", o: [["at least half the grid in each direction", true, "Choose scales to spread the data."], ["exactly the whole grid", false, "Not necessary."], ["a quarter of the grid", false, "Too small."], ["any area; it doesn't matter", false, "Marks depend on it."]] },
  ],
  gens: {
    unc: () => {
      const a = pick([
        ["a titre of", rnd(15, 35, 2), "cm³", 0.05, 2, "read on a burette; each reading is ±0.05 cm³"],
        ["a mass found by difference of", rnd(0.8, 6, 3), "g", 0.005, 2, "on a balance reading to ±0.005 g (two weighings)"],
        ["a temperature rise of", rnd(4, 25, 1), "°C", 0.5, 2, "measured with a thermometer reading to ±0.5 °C (two readings)"],
        ["a temperature rise of", rnd(3, 15, 1), "°C", 0.1, 2, "measured with a thermometer reading to ±0.1 °C (two readings)"],
        ["a volume of", 25.0, "cm³", 0.06, 1, "delivered by a pipette with uncertainty ±0.06 cm³"],
        ["a volume of", 250, "cm³", 0.3, 1, "made up in a volumetric flask with uncertainty ±0.3 cm³"],
      ]);
      const abs = a[3] * a[4], ans = abs / a[1] * 100;
      return { topic: "percentage uncertainty", q: `Calculate the percentage uncertainty in ${a[0]} ${a[1]} ${a[2]}, ${a[5]}.`, ans, unit: "%", label: "% =",
        hints: [a[4] === 2 ? "Two readings: add their uncertainties." : "Single measurement: use the uncertainty as given.", `Absolute uncertainty = ±${round(abs, 3)} ${a[2]}.`, `(${round(abs, 3)} ÷ ${a[1]}) × 100`],
        sol: [R`\%=\frac{${round(abs, 3)}}{${a[1]}}\times100=${tn(ans)}\%`], wrongs: [[ans / 2, a[4] === 2 ? "Two readings: double the uncertainty." : ""], [ans * 2, a[4] === 1 ? "Only one measurement here." : ""]].filter(w => w[1]) };
    },
    mean: () => {
      const base = rnd(18, 30, 1), t = [base + 0.05 * Math.round(Math.random() * 2), base + 0.05 * Math.round(Math.random() * 2), base + 0.4].map(v => round(Math.round(v * 20) / 20, 2));
      const conc = t.slice(0, 2), ans = (conc[0] + conc[1]) / 2;
      const order = PX.shuffle([...t]);
      return { topic: "mean of concordant titres", q: `Accurate titres (cm³): ${order.map(x => x.toFixed(2)).join(", ")}. Calculate the mean titre to use.`, ans, unit: "cm³", label: "mean =", tol: 0.002,
        hints: ["Concordant = within 0.10 cm³ of each other.", "Leave out the one that disagrees.", "Average the concordant pair."], sol: [R`\text{mean}=\frac{${conc[0].toFixed(2)}+${conc[1].toFixed(2)}}{2}=${ans.toFixed(3)}`], wrongs: [[(t[0] + t[1] + t[2]) / 3, "Exclude the titre that isn't concordant."]] };
    },
  },
  ex: [
    { q: "A student finds ΔH of neutralisation using a polystyrene cup. Suggest two sources of error and an improvement for each.", pts: ["Heat lost to surroundings → add a lid / extra insulation", "Thermometer precision (e.g. ±0.5 °C on a small ΔT) → use a ±0.1 °C thermometer / larger ΔT", "Assumed c and density of solution equal water's → (acknowledge assumption)", "Temperature not recorded at the instant of mixing → plot temperature–time and extrapolate"] },
  ],
  traps: ["Burette readings: 2 d.p., ending in 0 or 5. Record initial *and* final readings.", "Use only concordant titres (within 0.10 cm³) for the mean; never the rough titre.", "Table headings: quantity / unit.", "Improvements must be specific: name the error and the change that fixes it."],
  defs: [["Concordant results", "Titres that agree within 0.10 cm³ of each other."], ["Percentage uncertainty", "The absolute uncertainty divided by the measured value, multiplied by 100."], ["Anomalous result", "A result that does not fit the pattern of the others and is left out of the mean or line of best fit."], ["End point", "The point in a titration at which the indicator changes colour."]],
});
})();
