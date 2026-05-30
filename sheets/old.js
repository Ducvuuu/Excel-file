function renderOld() {
  const rows = [];
  const ncols = 6;
  const colWidths = [32, 220, 110, 110, 110, 300];

  let cg = `<colgroup><col style="width:32px">`;
  colWidths.slice(1).forEach(w => cg += `<col style="width:${w}px">`);
  cg += `</colgroup>`;

  let thead = `<thead><tr><th class="corner-cell"></th>`;
  for(let i=0; i<ncols; i++) thead += `<th class="ch">${String.fromCharCode(65+i)}</th>`;
  thead += `</tr></thead>`;

  rows.push(rowMarkup(1, [
    cellMarkup('Population Analytics Unit — Demographic Analysis Branch', 'inst-hdr b', '', ''),
    cellMarkup('','inst-hdr'), cellMarkup('','inst-hdr'), cellMarkup('','inst-hdr'), cellMarkup('','inst-hdr'), cellMarkup('','inst-hdr'),
  ]));
  rows.push(rowMarkup(2, [
    cellMarkup('<span class="pau-script">&#xE003;&#xE001;&#xE006;&#xE004;&#xE002;&#xE007;</span><span class="pau-sep">&#xE008;</span><span class="pau-script">&#xE001;&#xE005;&#xE002;&#xE004;&#xE007;&#xE003;&#xE006;&#xE001;</span>', 'inst-heb', '', ''),
    cellMarkup('','inst-heb'), cellMarkup('','inst-heb'), cellMarkup('','inst-heb'), cellMarkup('','inst-heb'), cellMarkup('','inst-heb'),
  ]));
  rows.push(emptyRowMarkup(3, ncols));
  rows.push(rowMarkup(4, [
    cellMarkup('<span class="pau-script">&#xE001;&#xE002;&#xE003;&#xE004;&#xE005;</span><span class="pau-sep">&#xE008;</span> — RESTRICTED  |  For Authorized Recipients Only  |  Not for External Distribution or Citation', 'classif b', '', ''),
    cellMarkup('','classif'), cellMarkup('','classif'), cellMarkup('','classif'), cellMarkup('','classif'), cellMarkup('','classif'),
  ]));
  rows.push(emptyRowMarkup(5, ncols));

  rows.push(rowMarkup(6, [
    cellMarkup('SUPERSEDED SCENARIO B PROJECTIONS (v3.2 — FEB 2024) — DO NOT USE', 'sec-red b', '', 'threadOld', ncols),
  ]));

  rows.push(rowMarkup(7, [
    cellMarkup('Indicator', 'hdr-red b', '', ''),
    cellMarkup('2024 Baseline', 'hdr-red ctr', '', ''),
    cellMarkup('2027 Proj.', 'hdr-red ctr', '', ''),
    cellMarkup('2030 Proj.', 'hdr-red ctr', '', ''),
    cellMarkup('2035 Proj.', 'hdr-red ctr', '', ''),
    cellMarkup('Auditor Reference / Status', 'hdr-red', '', ''),
  ]));

  const oldData = [
    ['Total Population (Scenario B)', '2,114.3', '2,012.4', '1,946.8', '1,894.2', 'Optimistic baseline. Compound attrition: 1.80% p.a.'],
    ['Under-14 Cohort Share', '47.3%', '42.1%', '36.8%', '32.1%', 'TFR assumed slow decline. Nutritional suppression not applied.'],
    ['Net outmigration p.a. (15–34)', '-1.24%', '-1.88%', '-2.10%', '-2.10%', 'RUVR threshold kept at 30% pre-conflict baseline.'],
    ['Net Reproduction Rate (NRR)', '1.61', '1.14', '0.98', '0.94', 'Crossed replacement circa 2029 step.'],
  ];

  oldData.forEach(([ind, base, p27, p30, p35, ref], i) => {
    const bg = i % 2 === 1 ? ' alt-red' : '';
    const isTotalRow = i === 0;
    rows.push(rowMarkup(8+i, [
      cellMarkup(ind, 'strike b'+bg, '', ''),
      cellMarkup(base, 'strike num lt'+bg, '', ''),
      cellMarkup(p27, 'strike num lt'+bg, '', ''),
      cellMarkup(p30, 'strike num b red'+bg+(isTotalRow?' key-cell':''), '', '', undefined, undefined, isTotalRow?'old_D8_1946':undefined),
      cellMarkup(p35, 'strike num lt'+bg, '', ''),
      cellMarkup(ref, 'lt i'+bg, '', ''),
    ]));
  });

  rows.push(rowMarkup(12, [
    cellMarkup('v3.2 → v4.1 revision (2030 Sc.B):  1,946,800  →  1,727,800  |  Δ = −219,000', '', '', '', ncols, 'font-family:Courier New,monospace;font-size:10px;color:#909090;font-style:italic;'),
  ]));

  rows.push(emptyRowMarkup(14, ncols));
  rows.push(rowMarkup(14, [
    cellMarkup('CA/PAU/DEM/2025-003  |  v3.2 (OLD)  |  Superseded v4.1 Review  |  <span class="pau-script">&#xE001;&#xE002;&#xE003;&#xE004;&#xE005;</span><span class="pau-sep">&#xE008;</span> — RESTRICTED', 'footer-stamp', '', '', ncols),
  ]));

  for (let i = 15; i <= 25; i++) rows.push(emptyRowMarkup(i, ncols));

  document.getElementById('maintable').innerHTML = cg + thead + `<tbody>${rows.join('')}</tbody>`;
}

// ── SHEET 6: METHODOLOGY RENDERER ──
