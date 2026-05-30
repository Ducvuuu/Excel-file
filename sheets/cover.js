function renderCover() {
  const rows = [];
  const ncols = 9;
  const colWidths = [32, 200, 160, 110, 110, 90, 90, 90, 90];

  let cg = `<colgroup><col style="width:32px">`;
  colWidths.slice(1).forEach(w => cg += `<col style="width:${w}px">`);
  cg += `</colgroup>`;

  let thead = `<thead><tr><th class="corner-cell"><span class="row-toggle-btn" id="toggle-btn" onclick="toggleHeaders()">▶</span></th>`;
  for(let i=0; i<ncols; i++) thead += `<th class="ch">${String.fromCharCode(65+i)}</th>`;
  thead += `</tr></thead>`;

  rows.push(`<tr id="row-1" style="display:none"><th class="rh">1</th>${cellMarkup('Population Analytics Unit — Demographic Analysis Branch', 'inst-hdr b', '', '', ncols)}</tr>`);
  rows.push(`<tr id="row-2" style="display:none"><th class="rh">2</th>${cellMarkup('<span class="pau-script">&#xE003;&#xE001;&#xE006;&#xE004;&#xE002;&#xE007;</span><span class="pau-sep">&#xE008;</span><span class="pau-script">&#xE001;&#xE005;&#xE002;&#xE004;&#xE007;&#xE003;&#xE006;&#xE001;</span>', 'inst-heb', '', '', ncols)}</tr>`);
  rows.push(`<tr id="row-3" style="display:none"><th class="rh">3</th>${Array(ncols).fill('').map(()=>`<td class="c inst-heb"></td>`).join('')}</tr>`);
  rows.push(`<tr id="row-4" style="display:none"><th class="rh">4</th>${cellMarkup('<span class="pau-script">&#xE001;&#xE002;&#xE003;&#xE004;&#xE005;</span><span class="pau-sep">&#xE008;</span> — RESTRICTED  |  For Authorized Recipients Only  |  Not for External Distribution or Citation', 'classif b', '', '', ncols)}</tr>`);

  rows.push(rowMarkup(5, [cellMarkup('CA/PAU/DEM/2025-003  |  Southern Coastal Strip — Civil Administration Zone  |  Resident Population Assessment', 'inst-hdr b', '', '', ncols)]));
  rows.push(rowMarkup(6, [cellMarkup('Population Registry & Demographic Analysis Branch — v4.1 Final', 'inst-heb', '', '', ncols)]));
  rows.push(rowMarkup(7, Array(ncols).fill('').map(()=>`<td class="c"></td>`)));

  const meta = [
    [8,  'Document Reference:',  'CA/PAU/DEM/2025-003', 'Review Cycle:', 'Quarterly', '', '', '', ''],
    [9,  'Title:',  'Southern Coastal Strip — Civil Administration Zone  |  Residential Population Assessment — Cohort-Component Projection Model', '', '', '', '', '', ''],
    [10,  'Version:', 'v4.1 — Final', 'Date of Issue:', '2025-01-14', '', '', '', ''],
    [11, 'Supersedes:', 'CA/PAU/DEM/2024-031 (v4.0, 2024-11-18)', 'Next Review:', '2025-07-14', '', '', '', ''],
    [12, 'Prepared by:', 'Demographic Analysis Unit — Strategic Planning Division', 'Reviewed by:', 'Strategic Planning Division', '', '', '', ''],
    [13, 'Approved by:', '[REDACTED]', 'Distribution:', '[REDACTED]', '', '', '', ''],
  ];

  meta.forEach(([rn, lbl1, val1, lbl2, val2]) => {
    const isApproval = rn === 13;
    const isTitle = rn === 9;
    let commentId1 = '';
    let commentId2 = '';
    if (rn === 10) commentId1 = 'B2';
    if (rn === 13) {
      commentId1 = 'B8';
      commentId2 = 'B7';
    }
    rows.push(rowMarkup(rn, [
      cellMarkup(lbl1, 'meta-lbl', '', ''),
      cellMarkup(val1, isApproval ? 'meta-redacted' : (isTitle ? 'meta-val b' : 'meta-val'), '', commentId1),
      cellMarkup(lbl2, 'meta-lbl', '', ''),
      cellMarkup(val2, isApproval ? 'meta-redacted' : 'meta-val', '', commentId2),
      cellMarkup('',''), cellMarkup('',''), cellMarkup('',''), cellMarkup('',''),
    ]));
  });

  rows.push(emptyRowMarkup(14, ncols));

  // ── KEY FINDINGS CALLOUT BLOCK ──
  rows.push(rowMarkup(15, [
    cellMarkup('KEY FINDINGS — v4.1  |  SCENARIO B  |  2034 PROJECTION ENDPOINTS', 'sec2 b', '', '', ncols),
  ]));

  // Four KPI tiles: one column each (B, C, D, E) — fits in default viewport
  rows.push(rowMarkup(16, [
    cellMarkup('Total Pop. (2034 Sc.B)', 'hdr ctr b', '', ''),
    cellMarkup('Under-14 Share', 'hdr ctr b', '', ''),
    cellMarkup('NRR (2029)', 'hdr ctr b', '', ''),
    cellMarkup('CDVI (2034)', 'hdr ctr b', '', ''),
    cellMarkup('', 'hdr', '', '', 5),
  ]));
  rows.push(rowMarkup(17, [
    cellMarkup('1,575,400', 'ctr b key-cell', '=CohComp_ScB!Total_ScB_2034', '', 1, 'font-size:15px;color:#c00000;padding:5px 0;', 'cover_B17_pop1575'),
    cellMarkup('28.9%', 'ctr b key-cell', '=CohComp_ScB!Under14_ScB_2034/Total_ScB_2034', '', 1, 'font-size:15px;color:#c00000;padding:5px 0;', 'cover_C17_under14'),
    cellMarkup('0.71', 'ctr b key-cell', '=CohComp_ScB!NRR_2029', '', 1, 'font-size:15px;color:#c00000;padding:5px 0;', 'cover_D17_nrr071'),
    cellMarkup('31', 'ctr b key-cell', '=Methodology!CDVI_2034', '', 1, 'font-size:15px;color:#c00000;padding:5px 0;', 'cover_E17_cdvi31'),
    cellMarkup('', '', '', '', 5),
  ]));
  rows.push(rowMarkup(18, [
    cellMarkup('−25.5% vs Sc.A', 'lt i ctr', '', '', 1, 'font-size:9.5px;color:#888;padding-bottom:4px;'),
    cellMarkup('−18.4pp vs 2024', 'lt i ctr', '', '', 1, 'font-size:9.5px;color:#888;padding-bottom:4px;'),
    cellMarkup('Below replacement', 'lt i ctr', '', '', 1, 'font-size:9.5px;color:#888;padding-bottom:4px;'),
    cellMarkup('Below recon. threshold', 'lt i ctr', '', '', 1, 'font-size:9.5px;color:#888;padding-bottom:4px;'),
    cellMarkup('', '', '', '', 5),
  ]));
  rows.push(emptyRowMarkup(19, ncols));

  rows.push(rowMarkup(20, [
    cellMarkup('EXECUTIVE SUMMARY — POPULATION PROJECTION RESULTS', 'sec', '', ''),
    cellMarkup('','sec'), cellMarkup('','sec'), cellMarkup('','sec'),
    cellMarkup('','sec'), cellMarkup('','sec'), cellMarkup('','sec'), cellMarkup('','sec'), cellMarkup('','sec'),
  ]));

  rows.push(rowMarkup(21, [
    cellMarkup('Indicator', 'hdr', '', ''),
    cellMarkup('Unit', 'hdr ctr', '', ''),
    cellMarkup('Reference Year', 'hdr ctr', '', ''),
    cellMarkup('Sc. A — Baseline ▾', 'hdr ctr', '', ''),
    cellMarkup('Sc. B — Current Conditions ▾', 'hdr ctr', '', ''),
    cellMarkup('Δ (A minus B) ▾', 'hdr ctr', '', ''),
    cellMarkup('Significance ▾', 'hdr', '', ''),
    cellMarkup('', 'hdr', '', ''),
    cellMarkup('', 'hdr', '', ''),
  ]));

  const sumData = [
    [22, 'Total Resident Population', '000s', '2024 (baseline)', '2,114.3', '2,114.3', '—', '', false],
    [23, 'Total Resident Population', '000s', '2027', '2,298.7', '1,937.6', '-361.1', 'Attrition rate revised Q4/24 ↑', true],
    [24, 'Total Resident Population', '000s', '2030', '2,512.4', '1,727.8', '-784.6', '', true],
    [25, 'Total Resident Population', '000s', '2035', '2,873.1', '1,341.2', '-1,531.9', 'See cohort breakdown — Outputs sheet', true],
  ];

  sumData.forEach(([rn, ind, unit, yr, sca, scb, delta, note, hasComment]) => {
    const bg = rn%2===1 ? ' alt' : '';
    rows.push(rowMarkup(rn, [
      cellMarkup(ind, bg.trim(), '', ''),
      cellMarkup(unit, 'lt ctr'+bg, '', ''),
      cellMarkup(yr, 'lt ctr'+bg, '', ''),
      cellMarkup(sca, 'sca num'+bg, `=SCA_ScA_${rn}`, ''),
      cellMarkup(scb, 'scb num'+bg, `=SCA_SCS_ScB_attrition*P_base_${rn}`, hasComment ? 'thread4' : ''),
      cellMarkup(delta, delta === '—' ? 'ctr'+bg : 'red num'+bg, `=D${rn}-E${rn}`, ''),
      cellMarkup(note, 'lt i'+bg, '', ''),
      cellMarkup('', bg.trim(), '', ''),
      cellMarkup('', bg.trim(), '', ''),
    ]));
  });

  rows.push(emptyRowMarkup(26, ncols));

  rows.push(rowMarkup(27, [
    cellMarkup('KEY DEMOGRAPHIC INDICATORS — 2035 SCENARIO B PROJECTION', 'sec2', '', ''),
    cellMarkup('','sec2'), cellMarkup('','sec2'), cellMarkup('','sec2'),
    cellMarkup('','sec2'), cellMarkup('','sec2'), cellMarkup('','sec2'), cellMarkup('','sec2'), cellMarkup('','sec2'),
  ]));

  rows.push(rowMarkup(28, [
    cellMarkup('Indicator', 'hdr', '', ''),
    cellMarkup('Unit', 'hdr ctr', '', ''),
    cellMarkup('2024 Baseline', 'hdr ctr', '', ''),
    cellMarkup('2035 Sc.B Projection', 'hdr ctr', '', ''),
    cellMarkup('Δ', 'hdr ctr', '', ''),
    cellMarkup('Reference / Note', 'hdr', '', ''),
    cellMarkup('','hdr','',''),
    cellMarkup('','hdr','',''),
    cellMarkup('','hdr','',''),
  ]));

  const kpis = [
    ['Under-14 Cohort Share', '%', '47.3%', '28.9%', '-18.4pp', 'Global avg: 25.8% (CBS Int. Ref. 2023)', false],
    ['Working-Age (15–34) Share', '%', '31.0%', '19.1%', '-11.9pp', 'Primary reproductive cohort', true],
    ['65+ Cohort Share', '%', '4.1%', '13.2%', '+9.1pp', 'Dependency inversion threshold approached', false],
    ['Total Fertility Rate (TFR)', 'TFR', '3.40', '2.06', '-1.34', 'Replacement threshold: 2.10', true],
    ['Net Outmigration Rate (15–34)', '% p.a.', '1.2%', '6.8%', '+5.6pp', 'Lebanon 1975–90 peak: 4.2% p.a.', false],
    ['Under-5 Mortality Rate', 'per 1,000', '18.3', '35.1', '+16.8', 'Cross-ref CAU Health Sector Q3/24 — SR', true],
    ['Net Reproduction Rate (NRR)', 'index', '1.61', '0.71', '-0.90', 'NRR < 1.0: population not replacing itself', false],
    ['Compound Viability CDVI', 'index', '100', '31', '-69', 'Non-standard composite viability index', true],
  ];

  kpis.forEach(([label, unit, base, proj, delta, note, isAlt], i) => {
    const rn = 29 + i;
    const bg = isAlt ? ' alt' : '';
    const isBad = delta.startsWith('-') && !delta.includes('pp') || delta === '+16.8' || (delta.startsWith('+') && label.includes('65+')) || (delta.startsWith('+') && label.includes('Mortality'));
    const deltaClass = (delta.startsWith('-') || isBad) ? 'red b ctr'+bg : 'ctr b'+bg;
    let noteCommentId = '';
    if (i === 0) noteCommentId = 'A24_1';
    if (i === 6) noteCommentId = 'A24_2';
    rows.push(rowMarkup(rn, [
      cellMarkup(label, bg.trim(), '', ''),
      cellMarkup(unit, 'lt ctr'+bg, '', ''),
      cellMarkup(base, 'ctr'+bg, '', ''),
      cellMarkup(proj, 'ctr b'+bg, `=ScB_proj_${rn}`, ''),
      cellMarkup(delta, deltaClass, `=C${rn}-D${rn}`, ''),
      cellMarkup(note, 'lt i'+bg, '', noteCommentId),
      cellMarkup('',bg.trim(),'',''),
      cellMarkup('',bg.trim(),'',''),
      cellMarkup('',bg.trim(),'',''),
    ]));
  });

  rows.push(emptyRowMarkup(37, ncols));
  rows.push(rowMarkup(38, [
    cellMarkup('#REF!', 'err warn-cell key-cell', '=SCA_SCS_fertility_baseline_2022_revised!PopReg_extract_B4', ''),
    cellMarkup('← ref. broken since v3.8 restructure — named range deleted. check w/ MK', 'lt i warn-cell', '', '', ncols - 1),
  ]));

  rows.push(emptyRowMarkup(39, ncols));
  rows.push(rowMarkup(40, [
    cellMarkup('DRAFT NOTE: Cohort 0–4 ASDR figure (row 32) uses Q3 field estimate — Q4 data unavailable (field comms suspended Dec 12 2024). Elevated uncertainty. -SR', 'meta-red i flag', '', '', ncols),
  ]));

  rows.push(emptyRowMarkup(41, ncols));

  // Planning Disclaimer and Warning
  rows.push(rowMarkup(42, [
    cellMarkup('This document is produced for internal planning purposes only. Findings do not constitute official policy positions of this unit or any associated government body.', 'lt i', '', 'A30', ncols),
  ]));
  rows.push(rowMarkup(43, [
    cellMarkup('Not for external distribution, publication, or citation without prior written authorisation from the Division Head.', 'lt i', '', '', ncols),
  ]));
  rows.push(emptyRowMarkup(44, ncols));

  rows.push(rowMarkup(45, [
    cellMarkup('CA/PAU/DEM/2025-003  |  v4.1  |  2025-01-14  |  Demographic Analysis Unit  |  <span class="pau-script">&#xE001;&#xE002;&#xE003;&#xE004;&#xE005;</span><span class="pau-sep">&#xE008;</span> — RESTRICTED', 'footer-stamp', '', '', ncols),
  ]));

  for(let i=46; i<57; i++) rows.push(emptyRowMarkup(i, ncols));

  document.getElementById('maintable').innerHTML = cg + thead + `<tbody>${rows.join('')}</tbody>`;
}

// ── SHEET 2: INPUTS RENDERER ──
