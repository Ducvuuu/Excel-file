function renderInputs() {
  const rows = [];
  const ncols = 12;
  const colWidths = [32, 72, 82, 82, 82, 58, 68, 48, 48, 170, 52, 160];

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
  rows.push(emptyRowMarkup(5, ncols));

  rows.push(rowMarkup(6, [
    cellMarkup('BASE POPULATION DATA — SOUTHERN COASTAL STRIP — CIVIL ADMINISTRATION ZONE  |  2024 BASELINE  |  CA/PAU/DEM/2025-003', 'sec', '', '', ncols),
  ]));

  rows.push(rowMarkup(7, [
    cellMarkup('Age Cohort',            'hdr',     '', ''),
    cellMarkup('P(x) Male',            'hdr ctr', '', ''),
    cellMarkup('P(x) Female',          'hdr ctr', '', ''),
    cellMarkup('P(x) Total',           'hdr ctr', '', ''),
    cellMarkup('ASDR(x) ‰',            'hdr ctr', '', ''),
    cellMarkup('SurvRatio(x)',          'hdr ctr', '', ''),
    cellMarkup('',                     'hdr ctr', '', ''),
    cellMarkup('',                     'hdr ctr', '', ''),
    cellMarkup('Source',               'hdr',     '', ''),
    cellMarkup('Rel.',                 'hdr ctr', '', 'K5'),
    cellMarkup('Notes / Flags',        'hdr',     '', ''),
    cellMarkup('', 'hdr', '', '')
  ]));

  rows.push(rowMarkup(8, [
    cellMarkup('',                     'hdr2', '', ''),
    cellMarkup('persons',              'hdr2 ctr lt', '', ''),
    cellMarkup('persons',              'hdr2 ctr lt', '', ''),
    cellMarkup('persons',              'hdr2 ctr lt', '', ''),
    cellMarkup('per 1,000 p.a.',       'hdr2 ctr lt', '', ''),
    cellMarkup('5-yr period',          'hdr2 ctr lt', '', ''),
    cellMarkup('',                     'hdr2', '', ''),
    cellMarkup('',                     'hdr2', '', ''),
    cellMarkup('',                     'hdr2 lt', '', ''),
    cellMarkup('A/B/C',                'hdr2 ctr lt', '', ''),
    cellMarkup('',                     'hdr2 lt', '', ''),
    cellMarkup('',                     'hdr2', '', '')
  ]));

  const MAX_M = 178700, MAX_F = 170160;
  const cohortRowsData = [
    ['0–4',     178700, 170160,  5.21, 0.9742, 'Civil Admin. Pop. Registry — Nov 2024',     'A', true,  'thread1'],
    ['5–9',     175100, 167416,  0.48, 0.9976, 'Civil Admin. Pop. Registry — Nov 2024',     'A', false, null],
    ['10–14',   157900, 150788,  0.49, 0.9976, 'Civil Admin. Pop. Registry — Nov 2024',     'A', false, null],
    ['15–19',    93600,  90344,  0.71, 0.9965, 'Civil Admin. Pop. Registry — Nov 2024',     'A', false, null],
    ['20–24',    83200,  81715,  0.82, 0.9959, 'CA Border Crossing Registry 2023 / National Registry est.',  'B', false, null],
    ['25–29',    77400,  76944,  0.94, 0.9953, 'CA Border Crossing Registry 2023 / National Registry est.',  'B', false, null],
    ['30–34',    76100,  76130,  1.12, 0.9944, 'Civil Admin. Pop. Registry — Nov 2024',     'A', false, null],
    ['35–39',    46200,  46829,  1.56, 0.9922, 'Civil Admin. Pop. Registry — Nov 2024',     'A', false, null],
    ['40–44',    37600,  38515,  2.41, 0.9880, 'Civil Admin. Pop. Registry — Nov 2024',     'A', false, null],
    ['45–49',    31000,  32429,  3.89, 0.9808, 'Civil Admin. Pop. Registry — Nov 2024',     'A', false, null],
    ['50–54',    24600,  26143,  6.34, 0.9686, 'CBS Mid-Year Est. 2023 — registry adj.',    'A', false, null],
    ['55–59',    19200,  20972,  9.91, 0.9506, 'CBS Mid-Year Est. 2023 — registry adj.',    'A', false, null],
    ['60–64',    23100,  25529, 15.62, 0.9240, 'CBS Mid-Year Est. 2023 — registry adj.',    'A', false, null],
    ['65–69',    16800,  19143, 24.17, 0.8843, 'CBS Mid-Year Est. 2023 — registry adj.',    'B', false, null],
    ['70–74',    10400,  12857, 39.08, 0.8213, 'CBS Mid-Year Est. 2023 — registry adj.',    'B', false, null],
    ['75–79',     7300,   9614, 61.44, 0.7327, 'Modelled proxy — CBS 2021 adj.',            'C', false, null],
    ['80+',       4100,   6472,112.87,   null,  'Modelled proxy — CBS 2021 adj.',            'C', false, null],
  ];

  function spark(val, maxVal, color) {
    const w = Math.max(2, Math.round((val / maxVal) * 42));
    return `<svg width="44" height="16" style="display:block;margin:1px auto"><rect x="0" y="3" width="${w}" height="10" fill="${color}" opacity="0.72"/></svg>`;
  }

  cohortRowsData.forEach(([label, pm, pf, asdr, sr, src, rel, flag, asdId], i) => {
    const rn = 9 + i;
    const bg = i % 2 === 1 ? ' alt' : '';
    const flagCls = flag ? ' flag' : '';
    const total = pm + pf;
    const fmtN = n => n.toLocaleString('en-US');
    const relCls = rel === 'A' ? 'rel-a' : rel === 'B' ? 'rel-b' : 'rel-c';
    const srStr = sr !== null ? sr.toFixed(4) : '—';
    const noteText = flag ? 'Southern Coastal Strip Sub-Office — Q4 2024 UNAVAILABLE. Using Q3 field estimate. Elevated uncertainty. -SR' : '';

    rows.push(rowMarkup(rn, [
      cellMarkup(label,                bg.trim()+flagCls,                         '', ''),
      cellMarkup(fmtN(pm),            'num'+bg,                                   `=PopReg_M_${label}`, ''),
      cellMarkup(fmtN(pf),            'num'+bg,                                   `=PopReg_F_${label}`, ''),
      cellMarkup(fmtN(total),         'num b'+bg,                                 `=C${rn}+D${rn}`, ''),
      cellMarkup(asdr.toFixed(2),     'num'+bg+(flag?' flag':''),                  `=ASDR_baseline_${label}`, asdId||''),
      cellMarkup(srStr,               'num-s'+bg,                                  `=1-(ASDR_${label}/1000)^5`, ''),
      cellMarkup(spark(pm, MAX_M, '#2e75b6'), 'spark'+bg,                          '', ''),
      cellMarkup(spark(pf, MAX_F, '#c00000'), 'spark'+bg,                          '', ''),
      cellMarkup(src,                 'lt'+bg,                                     '', ''),
      cellMarkup(rel,                 relCls+bg,                                   '', ''),
      cellMarkup(noteText,            'lt meta-red'+bg+(flag?' flag':''),           '', 'thread6'),
      cellMarkup('', bg, '', '')
    ]));
  });

  const rTot = 26;
  rows.push(rowMarkup(rTot, [
    cellMarkup('TOTAL', 'b', '', ''),
    cellMarkup('984,300', 'num b sca', `=SUM(C9:C25)`, ''),
    cellMarkup('993,423', 'num b sca', `=SUM(D9:D25)`, ''),
    cellMarkup('1,977,723', 'num b sca', `=SUM(E9:E25)`, ''),
    cellMarkup('', '', '', ''), cellMarkup('', '', '', ''), cellMarkup('', '', '', ''), cellMarkup('', '', '', ''),
    cellMarkup('Source: Population Registry — Nov 2024 extract', 'lt', '', ''),
    cellMarkup('', '', '', ''), cellMarkup('', '', '', ''), cellMarkup('', '', '', ''),
  ]));

  rows.push(rowMarkup(27, [
    cellMarkup('e(0) Life Expectancy at Birth', 'meta-lbl', '', ''),
    cellMarkup('74.1 yrs (M: 72.4 / F: 75.9)', 'meta-val', '=e0_Gaza_2022', '', 3),
    cellMarkup('', '', '', ''), cellMarkup('', '', '', ''), cellMarkup('', '', '', ''), cellMarkup('', '', '', ''),
    cellMarkup('Source: Civil Admin. Health Coordination — Palestine life table 2022', 'lt', '', ''),
    cellMarkup('A', 'rel-a ctr', '', ''),
    cellMarkup('', '', '', ''), cellMarkup('', '', '', ''),
  ]));

  rows.push(emptyRowMarkup(28, ncols));

  // SECTION 2: Fertility inputs
  rows.push(rowMarkup(29, [
    cellMarkup('FERTILITY INPUTS — ASFR BY COHORT  |  2024 BASELINE  |  WOMEN AGED 15–49', 'sec2', '', '', ncols),
  ]));

  rows.push(rowMarkup(30, [
    cellMarkup('Age Group (Women)', 'hdr',     '', ''),
    cellMarkup('ASFR(x)',           'hdr ctr', '', ''),
    cellMarkup('% of TFR',          'hdr ctr', '', ''),
    cellMarkup('',                  'hdr',     '', ''),
    cellMarkup('',                  'hdr',     '', ''),
    cellMarkup('',                  'hdr',     '', ''),
    cellMarkup('',                  'hdr',     '', ''),
    cellMarkup('',                  'hdr',     '', ''),
    cellMarkup('Source',            'hdr',     '', ''),
    cellMarkup('Rel.',              'hdr ctr', '', ''),
    cellMarkup('Notes / Flags',     'hdr',     '', ''),
    cellMarkup('',                  'hdr',     '', ''),
  ]));

  rows.push(rowMarkup(31, [
    cellMarkup('',                  'hdr2', '', ''),
    cellMarkup('births per woman',  'hdr2 ctr lt', '', ''),
    cellMarkup('%',                 'hdr2 ctr lt', '', ''),
    cellMarkup('', 'hdr2','',''), cellMarkup('', 'hdr2','',''), cellMarkup('', 'hdr2','',''),
    cellMarkup('', 'hdr2','',''), cellMarkup('', 'hdr2','',''),
    cellMarkup('',                  'hdr2 lt', '', ''),
    cellMarkup('A/B/C',             'hdr2 ctr lt', '', ''),
    cellMarkup('',                  'hdr2 lt', '', ''),
    cellMarkup('',                  'hdr2 lt', '', ''),
  ]));

  const rFstart = 32;
  asfrData.forEach(([ag, asfr, pct, src, rel, cid], i) => {
    const rn = rFstart + i;
    const bg = (i % 2 === 1) ? ' alt' : '';
    const relCls = rel === 'A' ? 'rel-a' : rel === 'B' ? 'rel-b' : 'rel-c';
    rows.push(rowMarkup(rn, [
      cellMarkup(ag,             bg.trim(), '', ''),
      cellMarkup(asfr.toFixed(4), 'num'+bg, `=ASFR_${ag.replace('–','')}`, cid||''),
      cellMarkup(pct.toFixed(1)+'%', 'num-s'+bg, `=B${rn}/TFR*100`, ''),
      cellMarkup('', bg.trim(),'',''), cellMarkup('', bg.trim(),'',''), cellMarkup('', bg.trim(),'',''),
      cellMarkup('', bg.trim(),'',''), cellMarkup('', bg.trim(),'',''),
      cellMarkup(src, 'lt'+bg, '', ''),
      cellMarkup(rel, relCls+bg, '', ''),
      cellMarkup('', bg.trim(),'',''),
      cellMarkup('', bg.trim(),'',''),
    ]));
  });

  const rFend = 39;
  rows.push(rowMarkup(rFend, [
    cellMarkup('TFR', 'b', '', ''),
    cellMarkup('3.38', 'num b sca', '=SUM(ASFR_1549)*5', 'G21'),
    cellMarkup('100.0%', 'num-s', '', ''),
    cellMarkup('','','',''), cellMarkup('','','',''), cellMarkup('','','',''),
    cellMarkup('','','',''), cellMarkup('','','',''),
    cellMarkup('National Demographic & Health Survey 2022 / PCBS 2023 preliminary', 'lt', '', ''),
    cellMarkup('A', 'rel-a ctr', '', ''),
    cellMarkup('', '', '', ''),
    cellMarkup('', '', '', ''),
  ]));
  rows.push(rowMarkup(rFend+1, [
    cellMarkup('SRB', 'b', '', ''),
    cellMarkup('106.2', 'num b', '=SRB_Gaza_2023', ''),
    cellMarkup('male births per 100 female', 'lt', '', '', 3),
    cellMarkup('','','',''), cellMarkup('','','',''),
    cellMarkup('','','',''), cellMarkup('','','',''),
    cellMarkup('CBS Vital Statistics 2023', 'lt', '', ''),
    cellMarkup('A', 'rel-a ctr', '', ''),
    cellMarkup('', '', '', ''),
    cellMarkup('', '', '', ''),
  ]));
  rows.push(emptyRowMarkup(rFend+2, ncols));

  // SECTION 3: Migration inputs
  const rMsec = 42;
  rows.push(rowMarkup(rMsec, [
    cellMarkup('MIGRATION INPUTS — NET MIGRATION RATE BY COHORT  |  2024 BASELINE', 'sec2', '', '', ncols),
  ]));

  rows.push(rowMarkup(rMsec+1, [
    cellMarkup('Age Cohort',         'hdr',     '', ''),
    cellMarkup('NMR Male (p.a.)',    'hdr ctr', '', ''),
    cellMarkup('NMR Female (p.a.)',  'hdr ctr', '', ''),
    cellMarkup('Net Migrants M',     'hdr ctr', '', ''),
    cellMarkup('Net Migrants F',     'hdr ctr', '', ''),
    cellMarkup('',                   'hdr',     '', ''),
    cellMarkup('',                   'hdr',     '', ''),
    cellMarkup('',                   'hdr',     '', ''),
    cellMarkup('Source',             'hdr',     '', ''),
    cellMarkup('Rel.',               'hdr ctr', '', ''),
    cellMarkup('Notes',              'hdr',     '', ''),
    cellMarkup('',                   'hdr',     '', ''),
  ]));
  rows.push(rowMarkup(rMsec+2, [
    cellMarkup('',                   'hdr2', '', ''),
    cellMarkup('negative = net out', 'hdr2 lt ctr', '', ''),
    cellMarkup('negative = net out', 'hdr2 lt ctr', '', ''),
    cellMarkup('annual',             'hdr2 lt ctr', '', ''),
    cellMarkup('annual',             'hdr2 lt ctr', '', ''),
    cellMarkup('', 'hdr2','',''), cellMarkup('', 'hdr2','',''), cellMarkup('', 'hdr2','',''),
    cellMarkup('',                   'hdr2 lt', '', ''),
    cellMarkup('A/B/C',              'hdr2 ctr lt', '', ''),
    cellMarkup('',                   'hdr2 lt', '', ''),
    cellMarkup('',                   'hdr2 lt', '', ''),
  ]));

  const rMstart = 45;
  nmrData.forEach(([label, nmrM, nmrF], i) => {
    const rn = rMstart + i;
    const bg = (i % 2 === 1) ? ' alt' : '';
    const pm = P_M_2024[i];
    const pf = P_F_2024[i];
    const netM = Math.round(nmrM * pm);
    const netF = Math.round(nmrF * pf);
    const [src, rel] = nmrSources[label] || ['', 'B'];
    const relCls = rel === 'A' ? 'rel-a' : rel === 'B' ? 'rel-b' : 'rel-c';
    const isWorkingAge = ['15–19', '20–24', '25–29', '30–34'].includes(label);
    const nmrCls = 'nmr' + bg + (isWorkingAge ? ' b' : '');
    const nmrId = label === '20–24' ? 'threadInputsNMR' : '';

    rows.push(rowMarkup(rn, [
      cellMarkup(label,             bg.trim(),  '', ''),
      cellMarkup(nmrM.toFixed(4),   nmrCls,     `=NMR_M_${label.replace('–','')}`, nmrId),
      cellMarkup(nmrF.toFixed(4),   nmrCls,     `=NMR_F_${label.replace('–','')}`, ''),
      cellMarkup(netM.toLocaleString('en-US'), 'num-s'+bg, `=C${rn}*PopReg_M_${label}`, ''),
      cellMarkup(netF.toLocaleString('en-US'), 'num-s'+bg, `=D${rn}*PopReg_F_${label}`, ''),
      cellMarkup('', bg.trim(),'',''), cellMarkup('', bg.trim(),'',''), cellMarkup('', bg.trim(),'',''),
      cellMarkup(src, 'lt'+bg, '', ''),
      cellMarkup(rel, relCls+bg, '', ''),
      cellMarkup('', bg.trim(),'',''),
      cellMarkup('', bg.trim(),'',''),
    ]));
  });

  const rMend = 62;
  const totNetM = nmrData.reduce((s,[l,nm],i) => s + Math.round(nm * P_M_2024[i]), 0);
  const totNetF = nmrData.reduce((s,[l,,nf],i) => s + Math.round(nf * P_F_2024[i]), 0);
  rows.push(rowMarkup(rMend, [
    cellMarkup('NET TOTAL (annual)', 'b', '', ''),
    cellMarkup('', '', '', ''),
    cellMarkup('', '', '', ''),
    cellMarkup(totNetM.toLocaleString('en-US'), 'num b scb', `=SUM(D45:D61)`, ''),
    cellMarkup(totNetF.toLocaleString('en-US'), 'num b scb', `=SUM(E45:E61)`, ''),
    cellMarkup('', '', '', ''),
    cellMarkup('', '', '', ''),
    cellMarkup('', '', '', ''),
    cellMarkup('NMR weighted average 15–34 (M): -1.24% p.a.  |  Baseline conditions 2023–24', 'lt', '', '', 2),
    cellMarkup('', '', '', ''),
    cellMarkup('', '', '', ''),
  ]));

  rows.push(emptyRowMarkup(rMend+1, ncols));

  // Footer stamp
  rows.push(rowMarkup(rMend+2, [
    cellMarkup('CA/PAU/DEM/2025-003  |  v4.1  |  2025-01-14  |  Inputs Sheet  |  <span class="pau-script">&#xE001;&#xE002;&#xE003;&#xE004;&#xE005;</span><span class="pau-sep">&#xE008;</span> — RESTRICTED', 'footer-stamp', '', '', ncols),
  ]));

  for (let i = rMend+3; i <= rMend+8; i++) rows.push(emptyRowMarkup(i, ncols));

  document.getElementById('maintable').innerHTML = cg + thead + `<tbody>${rows.join('')}</tbody>`;
}

// ── SHEET 3: ASSUMPTIONS RENDERER ──
