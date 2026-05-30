function renderOutputs() {
  const rows = [];
  const ncols = 12;
  const letters = ['A','B','C','D','E','F','G','H','I','J','K','L'];
  const colWidths = [32, 220, 70, 90, 90, 90, 80, 80, 160, 80, 80, 80];

  let cg = `<colgroup><col style="width:32px">`;
  colWidths.slice(1).forEach(w => cg += `<col style="width:${w}px">`);
  cg += `</colgroup>`;

  let thead = `<thead><tr><th class="corner-cell"><span class="row-toggle-btn" id="toggle-btn" onclick="toggleHeaders()">▶</span></th>`;
  letters.slice(0, 12).forEach(l => thead += `<th class="ch">${l}</th>`);
  thead += `</tr></thead>`;

  rows.push(`<tr id="row-1" style="display:none"><th class="rh">1</th>${cellMarkup('Population Analytics Unit — Demographic Analysis Branch', 'inst-hdr b', '', '', ncols)}</tr>`);
  rows.push(`<tr id="row-2" style="display:none"><th class="rh">2</th>${cellMarkup('<span class="pau-script">&#xE003;&#xE001;&#xE006;&#xE004;&#xE002;&#xE007;</span><span class="pau-sep">&#xE008;</span><span class="pau-script">&#xE001;&#xE005;&#xE002;&#xE004;&#xE007;&#xE003;&#xE006;&#xE001;</span>', 'inst-heb', '', '', ncols)}</tr>`);
  rows.push(`<tr id="row-3" style="display:none"><th class="rh">3</th>${Array(ncols).fill('').map(()=>`<td class="c inst-heb"></td>`).join('')}</tr>`);
  rows.push(`<tr id="row-4" style="display:none"><th class="rh">4</th>${cellMarkup('<span class="pau-script">&#xE001;&#xE002;&#xE003;&#xE004;&#xE005;</span><span class="pau-sep">&#xE008;</span> — RESTRICTED  |  For Authorized Recipients Only  |  Not for External Distribution or Citation', 'classif b', '', '', ncols)}</tr>`);

  rows.push(rowMarkup(5, [
    cellMarkup('SUMMARY OUTPUTS — SCENARIO B PROJECTION  |  CA/PAU/DEM/2025-003 v4.1  |  FOR BRIEFING USE', 'inst-hdr b', '', '', ncols)
  ]));
  rows.push(rowMarkup(6, [
    cellMarkup('<span class="pau-script">&#xE006;&#xE001;&#xE007;&#xE005;&#xE003; &#xE004;&#xE002;&#xE001; &#xE007;&#xE005;&#xE006;&#xE003;&#xE001;</span>', 'inst-heb', '', '', ncols)
  ]));
  rows.push(rowMarkup(7, Array(ncols).fill('').map(()=>`<td class="c"></td>`)));

  rows.push(rowMarkup(8, [cellMarkup('SECTION 1 — KEY DEMOGRAPHIC INDICATORS  |  2024 BASELINE vs 2034 / 2050 SCENARIO B', 'sec b', '', '', ncols)]));

  const subH1 = [
    cellMarkup('Indicator', 'hdr ctr b', '', ''), cellMarkup('Unit', 'hdr ctr', '', ''), cellMarkup('2024 Baseline', 'hdr ctr', '', ''), cellMarkup('2029 Sc.B', 'hdr ctr', '', ''),
    cellMarkup('2034 Sc.B', 'hdr ctr b alt', '', ''), cellMarkup('Δ (2034 vs 2024)', 'hdr ctr', '', ''), cellMarkup('Δ% / Δpp', 'hdr ctr', '', ''),
    cellMarkup('2050 Terminal', 'hdr ctr', '', '', 2, 'color:#8b0000;font-style:italic;border-left:1.5px solid #d0a0a0;'),
    cellMarkup('Reference', 'hdr ctr', '', '', 3)
  ];
  rows.push(rowMarkup(9, subH1));

  // Helper style for 2050 terminal cells
  const t50 = 'num i lt';
  const t50s = 'border-left:1.5px solid #d0a0a0;color:#8b0000;';

  rows.push(rowMarkup(10, [
    cellMarkup('Total Resident Population', 'b', '', ''), cellMarkup('000s', 'ctr lt', '', ''), cellMarkup('2,114.3', 'num', '', ''), cellMarkup('1,820.0', 'num', '', ''),
    cellMarkup('1,575.4', 'num b alt', '=CohComp_ScB!Total_ScB_2034', 'E10'), cellMarkup('−538.9', 'num red', '', ''), cellMarkup('−25.5%', 'num b red', '', ''),
    cellMarkup('645.0', t50, '=SCA_SCS_terminal_2050!Total', '', 2, t50s),
    cellMarkup('Annual interpolation — CohComp_ScB', 'lt', '', '', 3)
  ]));

  rows.push(rowMarkup(11, [
    cellMarkup('Under-14 Cohort Share', 'b', '', ''), cellMarkup('%', 'ctr lt', '', ''), cellMarkup('47.3%', 'num', '', ''), cellMarkup('38.1%', 'num', '', ''),
    cellMarkup('28.9%', 'num alt', '=CohComp_ScB!Under14_ScB_2034/Total_ScB_2034', ''), cellMarkup('—', 'ctr lt', '', ''), cellMarkup('−18.4pp', 'num b red', '', ''),
    cellMarkup('8.1%', t50, '=SCA_SCS_terminal_2050!Under14_share', '', 2, t50s),
    cellMarkup('CohComp_ScB derived', 'lt', '', '', 3)
  ]));

  rows.push(rowMarkup(12, [
    cellMarkup('Working-Age (15–34) Share', 'b', '', ''), cellMarkup('%', 'ctr lt', '', ''), cellMarkup('31.0%', 'num', '', ''), cellMarkup('24.3%', 'num', '', ''),
    cellMarkup('20.6%', 'num alt', '=CohComp_ScB!WA_ScB_2034/Total_ScB_2034', ''), cellMarkup('—', 'ctr lt', '', ''), cellMarkup('−10.4pp', 'num b red', '', ''),
    cellMarkup('22.0%', t50, '', '', 2, t50s),
    cellMarkup('CohComp_ScB derived', 'lt', '', '', 3)
  ]));

  rows.push(rowMarkup(13, [
    cellMarkup('65+ Cohort Share', 'b', '', ''), cellMarkup('%', 'ctr lt', '', ''), cellMarkup('4.1%', 'num', '', ''), cellMarkup('5.9%', 'num', '', ''),
    cellMarkup('7.5%', 'num alt', '=CohComp_ScB!Elderly_ScB_2034/Total_ScB_2034', ''), cellMarkup('—', 'ctr lt', '', ''), cellMarkup('+3.4pp', 'num b blue', '', ''),
    cellMarkup('16.2%', t50, '', '', 2, t50s),
    cellMarkup('CohComp_ScB derived', 'lt', '', '', 3)
  ]));

  rows.push(rowMarkup(14, [
    cellMarkup('Under-5 Mortality Rate (U5MR)', 'b', '', ''), cellMarkup('per 1,000', 'ctr lt', '', ''), cellMarkup('18.3', 'num', '', ''), cellMarkup('28.6', 'num', '', ''),
    cellMarkup('35.1', 'num alt', '=Assumptions!U5MR_ScB_2034', ''), cellMarkup('+16.8', 'num red', '', ''), cellMarkup('+91.8%', 'num b red', '', ''),
    cellMarkup('35.1', t50, '', '', 2, t50s),
    cellMarkup('CAU Health Sector Assessment Nov 2024', 'lt', '', '', 3)
  ]));

  rows.push(rowMarkup(15, [
    cellMarkup('Maternal Mortality Ratio (MMR)', 'b', '', ''), cellMarkup('per 100k LB', 'ctr lt', '', ''), cellMarkup('27.0', 'num', '', ''), cellMarkup('68.5', 'num', '', ''),
    cellMarkup('112.0', 'num alt', '=Assumptions!MMR_ScB_2034', ''), cellMarkup('+85.0', 'num red', '', ''), cellMarkup('+314.8%', 'num b red', '', ''),
    cellMarkup('112.0', t50, '', '', 2, t50s),
    cellMarkup('Note: per 100,000 live births — different unit from row above', 'lt', '', '', 3)
  ]));

  rows.push(rowMarkup(16, [
    cellMarkup('Total Fertility Rate (TFR)', 'b', '', ''), cellMarkup('TFR', 'ctr lt', '', ''), cellMarkup('3.40', 'num', '', ''), cellMarkup('2.48', 'num', '', ''),
    cellMarkup('2.06', 'num redbg alt', '=Assumptions!TFR_ScB_2034', ''), cellMarkup('−1.34', 'num red', '', ''), cellMarkup('−39.4%', 'num b red', '', ''),
    cellMarkup('2.06', t50, '', '', 2, t50s),
    cellMarkup('Replacement threshold: 2.10. Sc.B crosses circa 2030.', 'lt', '', '', 3)
  ]));

  rows.push(rowMarkup(17, [
    cellMarkup('Net Reproduction Rate (NRR)', 'b', '', ''), cellMarkup('index', 'ctr lt', '', ''), cellMarkup('1.61', 'num', '', ''), cellMarkup('0.71', 'num redbg', '=CohComp_ScB!NRR_2029', ''),
    cellMarkup('0.58', 'num redbg alt', '=CohComp_ScB!NRR_2034', 'E17'), cellMarkup('−1.03', 'num red', '', ''), cellMarkup('−64.0%', 'num b red', '', ''),
    cellMarkup('~0.38', t50, '', '', 2, t50s),
    cellMarkup('CohComp_ScB — derived', 'lt', '', '', 3)
  ]));

  rows.push(rowMarkup(18, [
    cellMarkup('Dependency Ratio (PAU)', 'b', '', ''), cellMarkup('ratio', 'ctr lt', '', ''), cellMarkup('0.41', 'num', '', ''), cellMarkup('0.62', 'num', '', ''),
    cellMarkup('0.87', 'num alt', '=CohComp_ScB!DepRatio_2034', ''), cellMarkup('+0.46', 'num red', '', ''), cellMarkup('—', 'ctr lt', '', ''),
    cellMarkup('0.32', t50, '', '', 2, t50s),
    cellMarkup('PAU threshold 0.85 exceeded at 2034 step. Flag per SR comment.', 'lt', '', '', 3)
  ]));

  rows.push(rowMarkup(19, [
    cellMarkup('Annual Births (projected)', 'b', '', ''), cellMarkup('persons', 'ctr lt', '', ''), cellMarkup('36,300', 'num', '', ''), cellMarkup('23,200', 'num', '', ''),
    cellMarkup('18,200', 'num alt', '=CohComp_ScB!Births_2034', ''), cellMarkup('−18,100', 'num red', '', ''), cellMarkup('−49.9%', 'num b red', '', ''),
    cellMarkup('~10,000', t50, '', '', 2, t50s),
    cellMarkup('CohComp_ScB — births row', 'lt', '', '', 3)
  ]));

  rows.push(rowMarkup(20, [
    cellMarkup('Compound Viability (CDVI)', 'b', '', ''), cellMarkup('index 0–100', 'ctr lt', '', ''), cellMarkup('100', 'num b', '', ''), cellMarkup('71', 'num b', '=Methodology!CDVI_2029', ''),
    cellMarkup('31', 'num b alt', '=Methodology!CDVI_2034', 'thread7'), cellMarkup('−69', 'num red', '', ''), cellMarkup('−69.0%', 'num b red', '', ''),
    cellMarkup('10', 'num b i', '=Methodology!CDVI_2050_terminal', '', 2, t50s + 'font-weight:700;'),
    cellMarkup('Non-standard PAU metric. Sign-off pending — methodology caveat C-04.', 'lt', '', '', 3)
  ]));

  rows.push(rowMarkup(21, Array(ncols).fill('').map(()=>`<td class="c" style="border-bottom:1.5px solid #d8d8d8;"></td>`), 'row-meta', 'style="height:6px"'));
  rows.push(rowMarkup(22, [cellMarkup('Population figures in 000s rounded to one decimal place. Totals may not reconcile precisely with Calculations sum due to rounding limits.', 'lt i', '', '', ncols)], 'row-meta'));
  rows.push(rowMarkup(23, Array(ncols).fill('').map(()=>`<td class="c"></td>`)));

  rows.push(rowMarkup(24, [cellMarkup('SECTION 2 — POPULATION AGE STRUCTURE  |  2024 BASELINE vs 2034 / 2050 SCENARIO B', 'sec b', '', '', ncols)]));

  for (let rIdx = 25; rIdx <= 57; rIdx++) {
    rows.push(rowMarkup(rIdx, Array(ncols).fill('').map(()=>`<td class="c"></td>`)));
  }

  rows.push(rowMarkup(58, Array(ncols).fill('').map(()=>`<td class="c"></td>`)));

  rows.push(rowMarkup(59, [cellMarkup('SECTION 3 — ANNUAL POPULATION TRAJECTORY  |  2024–2035  |  SCENARIO A vs SCENARIO B', 'sec b', '', '', ncols)]));

  const trajHdr = [
    cellMarkup('Year', 'hdr ctr b', '', ''), cellMarkup('Sc.A (000s)', 'hdr ctr', '', ''), cellMarkup('Sc.B (000s)', 'hdr ctr', '', ''), cellMarkup('Δ (000s)', 'hdr ctr', '', ''),
    cellMarkup('Δ%', 'hdr ctr', '', ''), cellMarkup('Notes', 'hdr ctr', '', '', 3), cellMarkup('', 'hdr', '', '', 4)
  ];
  rows.push(rowMarkup(60, trajHdr));

  const trajData = [
    { yr: 2024, sca: '2,114', scb: '2,114', d: '—', dp: '—', n: 'Base year' },
    { yr: 2025, sca: '2,178', scb: '2,068', d: '−110', dp: '−5.1%', n: '' },
    { yr: 2026, sca: '2,244', scb: '2,015', d: '−229', dp: '−10.2%', n: '' },
    { yr: 2027, sca: '2,312', scb: '1,956', d: '−356', dp: '−15.4%', n: '' },
    { yr: 2028, sca: '2,382', scb: '1,890', d: '−492', dp: '−20.7%', n: '' },
    { yr: 2029, sca: '2,454', scb: '1,820', d: '−634', dp: '−25.8%', n: 'Step 1 endpoint' },
    { yr: 2030, sca: '2,529', scb: '1,747', d: '−782', dp: '−30.9%', n: '', comment: 'E67' },
    { yr: 2031, sca: '2,605', scb: '1,671', d: '−934', dp: '−35.9%', n: '' },
    { yr: 2032, sca: '2,683', scb: '1,593', d: '−1,090', dp: '−40.6%', n: '' },
    { yr: 2033, sca: '2,763', scb: '1,512', d: '−1,251', dp: '−45.3%', n: '' },
    { yr: 2034, sca: '2,846', scb: '1,431', d: '−1,415', dp: '−49.7%', n: 'Step 2 endpoint' },
    { yr: 2035, sca: '2,873', scb: '1,341', d: '−1,532', dp: '−53.3%', n: 'Extrapolated' }
  ];

  trajData.forEach((rowD, idx) => {
    const rn = 61 + idx;
    let bg = '';
    if (rowD.yr === 2029 || rowD.yr === 2034) bg = ' totals-bg';
    if (rowD.yr === 2035) bg = ' i lt';

    const cellList = [
      cellMarkup(rowD.yr.toString(), 'b ctr' + bg, '', ''),
      cellMarkup(rowD.sca, 'num' + bg, `=CohComp_ScA!Total_${rowD.yr}`, ''),
      cellMarkup(rowD.scb, 'num' + bg, `=CohComp_ScB!Total_${rowD.yr}`, ''),
      cellMarkup(rowD.d, (rowD.d !== '—' ? 'num red' : 'num') + bg, rowD.d !== '—' ? `=C${rn}-B${rn}` : '', ''),
      cellMarkup(rowD.dp, (rowD.dp !== '—' ? 'num b red' : 'num') + bg, rowD.dp !== '—' ? `=D${rn}/B${rn}` : '', rowD.comment || ''),
      cellMarkup(rowD.n, 'lt' + bg, '', '', 3),
      cellMarkup('', bg, '', '', 4) 
    ];
    rows.push(rowMarkup(rn, cellList));
  });

  // Rows 73–85: spacer rows for Chart G (trajectory chart sits here)
  for (let i = 73; i <= 85; i++) rows.push(rowMarkup(i, Array(ncols).fill('').map(()=>`<td class="c"></td>`)));

  rows.push(rowMarkup(86, Array(ncols).fill('').map(()=>`<td class="c"></td>`)));
  rows.push(rowMarkup(87, [cellMarkup('SECTION 4 — COMPOUND DEMOGRAPHIC VIABILITY INDEX  |  PAU INTERNAL METRIC  |  NOT FOR EXTERNAL CITATION', 'sec b', '', '', ncols)]));

  const cdviHdr = [
    cellMarkup('Step', 'hdr ctr b', '', ''), cellMarkup('Year', 'hdr ctr', '', ''), cellMarkup('CDVI Value', 'hdr ctr', '', ''), cellMarkup('Δ from baseline', 'hdr ctr', '', ''),
    cellMarkup('Interpretation (PAU internal)', 'hdr ctr', '', '', 4), cellMarkup('', 'hdr', '', '', 4)
  ];
  rows.push(rowMarkup(88, cdviHdr));

  rows.push(rowMarkup(89, [
    cellMarkup('Baseline', 'b ctr', '', ''), cellMarkup('2024', 'ctr lt', '', ''), cellMarkup('100', 'num b', '', ''), cellMarkup('—', 'ctr lt', '', ''),
    cellMarkup('Reference. Pre-October 2023 conditions.', 'lt', '', '', 4), cellMarkup('', '', '', '', 4)
  ]));

  rows.push(rowMarkup(90, [
    cellMarkup('Step 1', 'b ctr redbg', '', ''), cellMarkup('2029', 'ctr lt redbg', '', ''), cellMarkup('71', 'num b redbg', '=Methodology!CDVI_2029', ''), cellMarkup('−29', 'num red redbg', '', ''),
    cellMarkup('Below PAU threshold of 75. Primary driver: NRR decline and working-age cohort hollowing.', 'lt redbg', '', '', 4), cellMarkup('', 'redbg', '', '', 4)
  ], '', 'style="background:#fff8f0;"'));

  rows.push(rowMarkup(91, [
    cellMarkup('Step 2', 'b ctr redbg', '', ''), cellMarkup('2034', 'ctr lt redbg', '', ''), cellMarkup('31', 'num b redbg', '=Methodology!CDVI_2034', ''), cellMarkup('−69', 'num red redbg', '', ''),
    cellMarkup('Below PAU reconstitution threshold of 40. Primary drivers: compound NRR, ICS proxy decline, dependency ratio breach.', 'lt redbg', '', '', 4), cellMarkup('', 'redbg', '', '', 4)
  ], '', 'style="background:#fff0f0;"'));

  rows.push(rowMarkup(92, [
    cellMarkup('Terminal', 'b ctr', '', ''), cellMarkup('2050', 'ctr lt', '', '', 1, 'color:#8b0000;font-style:italic;'), cellMarkup('10', 'num b', '=Methodology!CDVI_2050_terminal', '', 1, 'color:#8b0000;font-weight:700;'), cellMarkup('−90', 'num red', '', ''),
    cellMarkup('Static Sc.B conditions sustained to 2050. Under-14 share 8.1%. NRR ~0.38. Terminal state — not a primary model output. Directional only.', 'lt i', '', '', 4, 'color:#8b0000;'), cellMarkup('', '', '', '', 4)
  ], '', 'style="background:#fff8f8;border-top:1px dashed #c00000;"'));

  // Rows 92–104: spacer rows for Chart H (CDVI chart sits here)
  for (let i = 92; i <= 104; i++) rows.push(rowMarkup(i, Array(ncols).fill('').map(()=>`<td class="c"></td>`)));

  rows.push(rowMarkup(105, Array(ncols).fill('').map(()=>`<td class="c"></td>`)));
  rows.push(rowMarkup(106, Array(ncols).fill('').map(()=>`<td class="c"></td>`)));
  rows.push(rowMarkup(107, [
    cellMarkup('NOTE: CDVI methodology pending divisional sign-off. PAU threshold values (75, 40) are internal working thresholds and do not correspond to any published standard. See Methodology sheet Section 3 and caveat C-04.', 'lt i', '', '', ncols)
  ], 'row-meta'));
  rows.push(rowMarkup(108, Array(ncols).fill('').map(()=>`<td class="c"></td>`)));
  rows.push(rowMarkup(109, [
    cellMarkup('CA/PAU/DEM/2025-003  |  v4.1  |  2025-01-14  |  Outputs Sheet  |  <span class="pau-script">&#xE001;&#xE002;&#xE003;&#xE004;&#xE005;</span><span class="pau-sep">&#xE008;</span> — RESTRICTED', 'footer-stamp', '', '', ncols),
  ]));

  for (let i = 110; i <= 116; i++) rows.push(emptyRowMarkup(i, ncols));

  document.getElementById('maintable').innerHTML = cg + thead + `<tbody>${rows.join('')}</tbody>`;
}

// ── SHEET 6: OLD_v3.2_DO_NOT_USE RENDERER ──
