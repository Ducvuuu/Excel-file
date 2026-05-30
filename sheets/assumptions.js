function renderAssumptions() {
  const rows = [];
  const ncols = 8;
  const colWidths = [32, 130, 70, 70, 60, 160, 160, 120];

  let cg = `<colgroup><col style="width:32px">`;
  colWidths.slice(1).forEach(w => cg += `<col style="width:${w}px">`);
  cg += `</colgroup>`;

  const letters = ['A','B','C','D','E','F','G','H'];
  let thead = `<thead><tr><th class="corner-cell"><span class="row-toggle-btn" id="toggle-btn" onclick="toggleHeaders()">▶</span></th>`;
  letters.forEach(l => thead += `<th class="ch">${l}</th>`);
  thead += `</tr></thead>`;

  rows.push(rowMarkup(1,[cellMarkup('Population Analytics Unit — Demographic Analysis Branch','inst-hdr b','','',ncols)]));
  rows.push(rowMarkup(2,[cellMarkup('<span class="pau-script">&#xE003;&#xE001;&#xE006;&#xE004;&#xE002;&#xE007;</span><span class="pau-sep">&#xE008;</span><span class="pau-script">&#xE001;&#xE005;&#xE002;&#xE004;&#xE007;&#xE003;&#xE006;&#xE001;</span>','inst-heb','','',ncols)]));
  rows.push(emptyRowMarkup(3,ncols));
  rows.push(rowMarkup(4,[cellMarkup('<span class="pau-script">&#xE001;&#xE002;&#xE003;&#xE004;&#xE005;</span><span class="pau-sep">&#xE008;</span> — RESTRICTED  |  For Authorized Recipients Only  |  Not for External Distribution or Citation','classif b','','',ncols)]));
  rows.push(emptyRowMarkup(5,ncols));

  // Section title
  rows.push(rowMarkup(6,[cellMarkup('PROJECTION ASSUMPTIONS — SCENARIO COMPARISON  |  CA/PAU/DEM/2025-003  |  v4.1','sec','','',ncols)]));

  // Headers
  rows.push(rowMarkup(7,[
    cellMarkup('Variable / Parameter','hdr','',''),
    cellMarkup('Sc. A — Baseline Trajectory','hdr ctr sca','',''),
    cellMarkup('Sc. B — Current Conditions','hdr ctr scb','',''),
    cellMarkup('Δ (B minus A)','hdr ctr','',''),
    cellMarkup('Basis — Scenario A','hdr','',''),
    cellMarkup('Basis — Scenario B','hdr','',''),
    cellMarkup('Notes','hdr','',''),
    cellMarkup('','hdr','',''),
  ]));

  rows.push(rowMarkup(8,[
    cellMarkup('','hdr2','',''),
    cellMarkup('pre-conflict trajectory','hdr2 ctr','',''),
    cellMarkup('current conditions sustained','hdr2 ctr','',''),
    cellMarkup('','hdr2 ctr','',''),
    cellMarkup('data source / period','hdr2','',''),
    cellMarkup('data source / period','hdr2','',''),
    cellMarkup('','hdr2','',''),
    cellMarkup('','hdr2','',''),
  ]));

  // SECTION 1: ASDR
  rows.push(rowMarkup(9,[cellMarkup('MORTALITY ASSUMPTIONS — Age-Specific Death Rate (ASDR) per 1,000 p.a.','sec2','','asdr_hdr',ncols)]));

  const asdrRows = [
    ['ASDR — 0–4',   5.21, 35.10, 'Civil Admin. Health Coord. 2019–22', 'CAU Health Sector Assessment Nov 2024', '=ASDR_ScA_0_4',   '=ASDR_ScB_0_4',   'D10'],
    ['ASDR — 5–9',   0.48,  1.12, 'Civil Admin. Health Coord. 2019–22', 'CAU Health Sector Assessment Nov 2024', '=ASDR_ScA_5_9',   '=ASDR_ScB_5_9',   null],
    ['ASDR — 10–14', 0.49,  1.20, 'Civil Admin. Health Coord. 2019–22', 'CAU Health Sector Assessment Nov 2024', '=ASDR_ScA_10_14', '=ASDR_ScB_10_14', null],
    ['ASDR — 15–19', 0.71,  2.84, 'Civil Admin. Health Coord. 2019–22', 'CAU Health Sector Assessment Nov 2024', '=ASDR_ScA_15_19', '=ASDR_ScB_15_19', null],
    ['ASDR — 20–24', 0.82,  3.20, 'Civil Admin. Health Coord. 2019–22', 'CAU Health Sector Assessment Nov 2024', '=ASDR_ScA_20_24', '=ASDR_ScB_20_24', null],
    ['ASDR — 25–29', 0.94,  3.65, 'Civil Admin. Health Coord. 2019–22', 'CAU Health Sector Assessment Nov 2024', '=ASDR_ScA_25_29', '=ASDR_ScB_25_29', null],
    ['ASDR — 30–34', 1.12,  3.91, 'Civil Admin. Health Coord. 2019–22', 'CAU Health Sector Assessment Nov 2024', '=ASDR_ScA_30_34', '=ASDR_ScB_30_34', null],
    ['ASDR — 35–39', 1.56,  4.20, 'CBS Mortality Tables 2022',          'CBS + Civil Admin. adj. Q3 2024',       '=ASDR_ScA_35_39', '=ASDR_ScB_35_39', null],
    ['ASDR — 40–44', 2.41,  5.10, 'CBS Mortality Tables 2022',          'CBS + Civil Admin. adj. Q3 2024',       '=ASDR_ScA_40_44', '=ASDR_ScB_40_44', null],
    ['ASDR — 45–49', 3.89,  6.80, 'CBS Mortality Tables 2022',          'CBS + Civil Admin. adj. Q3 2024',       '=ASDR_ScA_45_49', '=ASDR_ScB_45_49', null],
    ['ASDR — 50–54', 6.34,  9.40, 'CBS Mortality Tables 2022',          'CBS + Civil Admin. adj. Q3 2024',       '=ASDR_ScA_50_54', '=ASDR_ScB_50_54', null],
    ['ASDR — 55–59', 9.91, 13.20, 'CBS Mortality Tables 2022',          'CBS + Civil Admin. adj. Q3 2024',       '=ASDR_ScA_55_59', '=ASDR_ScB_55_59', null],
    ['ASDR — 60–64',15.62, 19.80, 'CBS Mortality Tables 2022',          'CBS + Civil Admin. adj. Q3 2024',       '=ASDR_ScA_60_64', '=ASDR_ScB_60_64', null],
    ['ASDR — 65–69',24.17, 31.40, 'CBS Mortality Tables 2022',          'CBS + Civil Admin. adj. Q3 2024',       '=ASDR_ScA_65_69', '=ASDR_ScB_65_69', null],
    ['ASDR — 70–74',39.08, 48.20, 'CBS Mortality Tables 2022',          'CBS + Civil Admin. adj. Q3 2024',       '=ASDR_ScA_70_74', '=ASDR_ScB_70_74', null],
    ['ASDR — 75–79',61.44, 72.10, 'Modelled proxy — CBS 2021 adj.',     'Modelled proxy Q3 2024',                '=ASDR_ScA_75_79', '=ASDR_ScB_75_79', null],
    ['ASDR — 80+', 112.87,128.40, 'Modelled proxy — CBS 2021 adj.',     'Modelled proxy Q3 2024',                '=ASDR_ScA_80p',   '=ASDR_ScB_80p',   null],
  ];

  asdrRows.forEach(([lbl, scA, scB, bA, bB, fA, fB, scBId], i) => {
    const rn = 10 + i;
    let bg = '';
    if (i < 3) bg = ' redbg';
    else if (i >= 3 && i <= 6) bg = ' yelbg';
    else bg = i % 2 === 1 ? ' alt' : '';
    const delta = scB - scA;
    rows.push(rowMarkup(rn,[
      cellMarkup(lbl, bg.trim(), '', ''),
      cellMarkup(scA.toFixed(2), 'num sca'+bg, fA, ''),
      cellMarkup(scB.toFixed(2), 'num scb'+bg, fB, scBId||''),
      cellMarkup('+'+delta.toFixed(2), 'delta-pos'+bg, `=C${rn}-B${rn}`, ''),
      cellMarkup(bA, 'lt'+bg, '', ''),
      cellMarkup(bB, 'lt'+bg, '', ''),
      cellMarkup('', bg.trim(), '', ''),
      cellMarkup('', bg.trim(), '', ''),
    ]));
  });

  const rMMR = 27;
  rows.push(rowMarkup(rMMR,[
    cellMarkup('MMR — Maternal (per 100k live births)', '', '', 'mmr_lbl'),
    cellMarkup('27.0', 'num sca', '=MMR_ScA_maternal', ''),
    cellMarkup('[pending Q4 verification — SR]', 'pending', '', 'D12'),
    cellMarkup('—', 'ctr lt', '', ''),
    cellMarkup('Civil Admin. Health Coord. 2022', 'lt', '', ''),
    cellMarkup('MoH Facility Data Q3 2024 — Q4 unavailable', 'lt meta-red', '', ''),
    cellMarkup('', '', '', ''),
    cellMarkup('', '', '', '')
  ]));

  rows.push(emptyRowMarkup(rMMR+1, ncols));

  const rNote = 29;
  rows.push(rowMarkup(rNote,[
    cellMarkup('NOTE: ASDR 0–4 revised upward per CAU Health Sector Assessment Nov 2024. ASFR 15–19 through 35–39 revised downward per nutritional status assessment. NMR 20–24 revised — permanent resettlement reclassification applied per Protocol 31 of 2019. -SR', 'note-row', '', '', ncols),
  ]));

  rows.push(emptyRowMarkup(rNote+1, ncols));

  // SECTION 2: Fertility and migration comparison
  const rFsec = 31;
  rows.push(rowMarkup(rFsec,[cellMarkup('FERTILITY ASSUMPTIONS — Age-Specific Fertility Rate (ASFR, births per woman per year)  |  Women 15–49','sec2','','asfr_hdr',ncols)]));

  rows.push(rowMarkup(rFsec+1,[
    cellMarkup('Variable / Parameter','hdr','',''),
    cellMarkup('Sc. A — Baseline Trajectory','hdr ctr sca','',''),
    cellMarkup('Sc. B — Current Conditions','hdr ctr scb','',''),
    cellMarkup('Δ (B minus A)','hdr ctr','',''),
    cellMarkup('Basis — Scenario A','hdr','',''),
    cellMarkup('Basis — Scenario B','hdr','',''),
    cellMarkup('Notes','hdr','',''),
    cellMarkup('','hdr','',''),
  ]));
  rows.push(rowMarkup(rFsec+2,[
    cellMarkup('','hdr2','',''),
    cellMarkup('pre-conflict trajectory','hdr2 ctr','',''),
    cellMarkup('current conditions sustained','hdr2 ctr','',''),
    cellMarkup('','hdr2 ctr','',''),
    cellMarkup('data source / period','hdr2','',''),
    cellMarkup('data source / period','hdr2','',''),
    cellMarkup('','hdr2','',''),
    cellMarkup('','hdr2','',''),
  ]));

  const asfrAssRows = [
    ['ASFR — Women 15–19', 0.0470, 0.0240, 'CBS DHS 2022', 'Nutritional status assessment Q3 2024 — suppression lit. applied'],
    ['ASFR — Women 20–24', 0.1680, 0.0980, 'CBS DHS 2022', 'Nutritional status assessment Q3 2024'],
    ['ASFR — Women 25–29', 0.1780, 0.1070, 'CBS DHS 2022', 'Nutritional status assessment Q3 2024'],
    ['ASFR — Women 30–34', 0.1430, 0.0910, 'CBS DHS 2022', 'Nutritional status assessment Q3 2024'],
    ['ASFR — Women 35–39', 0.0920, 0.0590, 'CBS DHS 2022', 'Nutritional status assessment Q3 2024'],
    ['ASFR — Women 40–44', 0.0400, 0.0265, 'CBS DHS 2022', 'Modelled proxy Q3 2024'],
    ['ASFR — Women 45–49', 0.0080, 0.0065, 'Modelled proxy', 'Modelled proxy'],
  ];

  const rFstart = 34;
  asfrAssRows.forEach(([lbl, scA, scB, bA, bB], i) => {
    const rn = rFstart + i;
    const bg = i % 2 === 1 ? ' alt' : '';
    const delta = scB - scA;
    rows.push(rowMarkup(rn,[
      cellMarkup(lbl, bg.trim(), '', ''),
      cellMarkup(scA.toFixed(4), 'num sca'+bg, `=ASFR_ScA_${lbl.replace(/\D/g,'')}`, ''),
      cellMarkup(scB.toFixed(4), 'num scb'+bg, `=ASFR_ScB_${lbl.replace(/\D/g,'')}`, ''),
      cellMarkup(delta.toFixed(4), 'delta-neg'+bg, `=C${rn}-B${rn}`, ''),
      cellMarkup(bA, 'lt'+bg, '', ''),
      cellMarkup(bB, 'lt'+bg, '', ''),
      cellMarkup('', bg.trim(), '', ''),
      cellMarkup('', bg.trim(), '', ''),
    ]));
  });

  const rTFR = 41;
  const tfr_a = 3.38, tfr_b = 2.06;
  rows.push(rowMarkup(rTFR,[
    cellMarkup('TFR  (Total Fertility Rate)', 'b', '', 'tfr_lbl'),
    cellMarkup(tfr_a.toFixed(2), 'num sca b', '=SUM(ASFR_ScA_1549)*5', ''),
    cellMarkup(tfr_b.toFixed(2), 'num scb b', '=SUM(ASFR_ScB_1549)*5', ''),
    cellMarkup((tfr_b-tfr_a).toFixed(2), 'delta-neg b', `=C${rTFR}-B${rTFR}`, ''),
    cellMarkup('CBS DHS 2022 / PCBS 2023 preliminary', 'lt', '', ''),
    cellMarkup('Derived from Scenario B ASFR — nutritional suppression model applied', 'lt', '', ''),
    cellMarkup('Replacement threshold: 2.10', 'lt', '', ''),
    cellMarkup('', '', '', '')
  ]));

  const rNRR = 42;
  const nrr_a = 1.61, nrr_b = 0.71;
  rows.push(rowMarkup(rNRR,[
    cellMarkup('NRR  (Net Reproduction Rate)', 'b nrr-row', '', 'nrr_lbl'),
    cellMarkup(nrr_a.toFixed(2), 'num sca b nrr-row', '=NRR_ScA', ''),
    cellMarkup(nrr_b.toFixed(2), 'num scb b nrr-row', '=NRR_ScB_2030', 'thread3'),
    cellMarkup((nrr_b-nrr_a).toFixed(2), 'delta-neg b nrr-row', `=C${rNRR}-B${rNRR}`, ''),
    cellMarkup('Derived — life table × ASFR', 'lt nrr-row', '', ''),
    cellMarkup('Scenario B life table × ASFR', 'lt nrr-row', '', ''),
    cellMarkup('NRR < 1.0: population not replacing itself', 'lt nrr-row', '', ''),
    cellMarkup('', '', '', '')
  ]));

  rows.push(emptyRowMarkup(rNRR+1, ncols));

  // SECTION 3: NMR
  const rMsec = 44;
  rows.push(rowMarkup(rMsec,[cellMarkup('MIGRATION ASSUMPTIONS — Net Migration Rate (NMR) by Cohort Group  |  Annual rate, negative = net outmigration','sec2','','nmr_hdr',ncols)]));

  rows.push(rowMarkup(rMsec+1,[
    cellMarkup('Variable / Parameter','hdr','',''),
    cellMarkup('Sc. A — Baseline Trajectory','hdr ctr sca','',''),
    cellMarkup('Sc. B — Current Conditions','hdr ctr scb','',''),
    cellMarkup('Δ (B minus A)','hdr ctr','',''),
    cellMarkup('Basis — Scenario A','hdr','',''),
    cellMarkup('Basis — Scenario B','hdr','',''),
    cellMarkup('Notes','hdr','',''),
    cellMarkup('','hdr','',''),
  ]));
  rows.push(rowMarkup(rMsec+2,[
    cellMarkup('','hdr2','',''),
    cellMarkup('annual rate','hdr2 ctr','',''),
    cellMarkup('annual rate','hdr2 ctr','',''),
    cellMarkup('','hdr2 ctr','',''),
    cellMarkup('data source / period','hdr2','',''),
    cellMarkup('data source / period','hdr2','',''),
    cellMarkup('','hdr2','',''),
    cellMarkup('','hdr2','',''),
  ]));

  const nmrAssRows = [
    ['NMR — Cohort 0–14',  -0.0020, -0.0035, 'Civil Admin. Northern Crossing records 2023', 'Civil Admin. Northern/Southern Crossing records Q3 2024', null],
    ['NMR — Cohort 15–19', -0.0104, -0.0580, 'CA Border Crossing Registry 2023', 'CA Border Crossing Registry Q3 2024 + Protocol 31 of 2019 reclassification', null],
    ['NMR — Cohort 20–24', -0.0158, -0.0840, 'CA Border Crossing Registry 2023', 'CA Border Crossing Registry Q3 2024 + Protocol 31 of 2019 reclassification', 'thread2'],
    ['NMR — Cohort 25–29', -0.0133, -0.0740, 'CA Border Crossing Registry 2023', 'CA Border Crossing Registry Q3 2024 + Protocol 31 of 2019 reclassification', null],
    ['NMR — Cohort 30–34', -0.0102, -0.0600, 'CA Border Crossing Registry 2023', 'CA Border Crossing Registry Q3 2024', null],
    ['NMR — Cohort 35–49', -0.0040, -0.0120, 'Civil Admin. Pop. Registry movement data', 'Civil Admin. Q3 2024', null],
    ['NMR — Cohort 50+',   -0.0015, -0.0025, 'CBS residency registry cross-reference', 'CBS residency registry Q3 2024', null],
  ];

  const rMstart = 47;
  nmrAssRows.forEach(([lbl, scA, scB, bA, bB, scBId], i) => {
    const rn = rMstart + i;
    const bg = i % 2 === 1 ? ' alt' : '';
    const delta = scB - scA;
    const isWA = lbl.includes('15–19')||lbl.includes('20–24')||lbl.includes('25–29')||lbl.includes('30–34');
    const numCls = isWA ? ' b' : '';
    const fmtNMR = v => v === null ? '—' : (v * 100).toFixed(2) + '%';
    const fmtNMRDelta = v => v === null ? '—' : (v * 100).toFixed(2) + 'pp';
    rows.push(rowMarkup(rn,[
      cellMarkup(lbl, bg.trim(), '', ''),
      cellMarkup(fmtNMR(scA), 'num sca'+numCls+bg, `=NMR_ScA_${lbl.replace(/\D/g,'')}`, ''),
      cellMarkup(fmtNMR(scB), 'num scb'+numCls+bg, `=NMR_ScB_${lbl.replace(/\D/g,'')}`, scBId||''),
      cellMarkup(fmtNMRDelta(delta), 'delta-pos'+numCls+bg, `=C${rn}-B${rn}`, ''),
      cellMarkup(bA, 'lt'+bg, '', ''),
      cellMarkup(bB, 'lt'+bg, '', ''),
      cellMarkup(isWA ? 'Primary reproductive / working-age cohort' : '', 'lt'+bg, '', ''),
      cellMarkup('', bg.trim(), '', ''),
    ]));
  });

  const rMend = 54;
  rows.push(rowMarkup(rMend,[
    cellMarkup('Weighted avg. NMR — Cohorts 15–34', 'b', '', ''),
    cellMarkup('-1.24%', 'num sca b', '=AVERAGE(NMR_ScA_1534)', ''),
    cellMarkup('-6.88%', 'num scb b', '=AVERAGE(NMR_ScB_1534)', ''),
    cellMarkup('', '', '', ''),
    cellMarkup('', 'lt', '', ''),
    cellMarkup('Reference: Lebanon 1975–90 peak outmigration: −4.2% p.a.', 'lt', '', ''),
    cellMarkup('', '', '', ''),
    cellMarkup('', '', '', ''),
  ]));

  rows.push(emptyRowMarkup(rMend+1, ncols));

  const rFoot = 56;
  rows.push(rowMarkup(rFoot,[
    cellMarkup('CA/PAU/DEM/2025-003  |  v4.1  |  2025-01-14  |  Assumptions Sheet  |  <span class="pau-script">&#xE001;&#xE002;&#xE003;&#xE004;&#xE005;</span><span class="pau-sep">&#xE008;</span> — RESTRICTED', 'footer-stamp', '', '', ncols),
  ]));

  for(let i=rFoot+1; i<=rFoot+6; i++) rows.push(emptyRowMarkup(i, ncols));

  document.getElementById('maintable').innerHTML = cg + thead + `<tbody>${rows.join('')}</tbody>`;
}

// ── SHEET 4: CALCULATIONS RENDERER ──
