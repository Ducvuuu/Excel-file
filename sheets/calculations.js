function renderCalculations() {
  const rows = [];
  const ncols = 27;
  const letters = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z','AA'];
  const colWidths = [32, 80, 52, 72, 58, 58, 64, 60, 60, 68, 56, 48, 68, 64, 64, 72, 60, 52, 52, 52, 52, 52, 52, 52, 52, 52, 52, 52];

  let cg = `<colgroup><col style="width:32px">`;
  colWidths.slice(1).forEach(w => cg += `<col style="width:${w}px">`);
  cg += `</colgroup>`;

  let thead = `<thead><tr><th class="corner-cell"><span class="row-toggle-btn" id="toggle-btn" onclick="toggleHeaders()">▶</span></th>`;
  letters.forEach(l => thead += `<th class="ch">${l}</th>`);
  thead += `</tr></thead>`;

  rows.push(`<tr id="row-1" style="display:none"><th class="rh">1</th>${cellMarkup('Population Analytics Unit — Demographic Analysis Branch', 'inst-hdr b', '', '', ncols)}</tr>`);
  rows.push(`<tr id="row-2" style="display:none"><th class="rh">2</th>${cellMarkup('<span class="pau-script">&#xE003;&#xE001;&#xE006;&#xE004;&#xE002;&#xE007;</span><span class="pau-sep">&#xE008;</span><span class="pau-script">&#xE001;&#xE005;&#xE002;&#xE004;&#xE007;&#xE003;&#xE006;&#xE001;</span>', 'inst-heb', '', '', ncols)}</tr>`);
  rows.push(`<tr id="row-3" style="display:none"><th class="rh">3</th>${Array(ncols).fill('').map(()=>`<td class="c inst-heb"></td>`).join('')}</tr>`);
  rows.push(`<tr id="row-4" style="display:none"><th class="rh">4</th>${cellMarkup('<span class="pau-script">&#xE001;&#xE002;&#xE003;&#xE004;&#xE005;</span><span class="pau-sep">&#xE008;</span> — RESTRICTED  |  For Authorized Recipients Only  |  Not for External Distribution or Citation', 'classif b', '', '', ncols)}</tr>`);

  rows.push(rowMarkup(5, [cellMarkup('COHORT-COMPONENT PROJECTION — SCENARIO B — WORKING CALCULATIONS  |  CA/PAU/DEM/2025-003 v4.1', 'inst-hdr b', '', '', ncols)]));
  rows.push(rowMarkup(6, [cellMarkup('<span class="pau-script">&#xE006;&#xE001;&#xE007;&#xE005;&#xE003; &#xE004;&#xE002;&#xE001; &#xE007;&#xE005;&#xE006;&#xE003;&#xE001;</span>', 'inst-heb', '', '', ncols)]));
  rows.push(rowMarkup(7, Array(ncols).fill('').map(()=>`<td class="c"></td>`)));

  const blockHdrRow = [
    cellMarkup('', 'hdr', '', ''), cellMarkup('', 'hdr', '', ''), cellMarkup('', 'hdr', '', ''), cellMarkup('', 'hdr', '', ''), cellMarkup('', 'hdr', '', ''),
    cellMarkup('PROJECTION PERIOD 2024 → 2029  |  Five-Year Cohort Step', 'sec b ctr', '', '', 6),
    cellMarkup('PROJECTION PERIOD 2029 → 2034  |  Five-Year Cohort Step', 'sec b ctr block-sep', '', '', 6),
    cellMarkup('ANNUAL INTERPOLATION  |  Derived from Five-Year Steps  |  Linear  |  For Reporting Use', 'hdr ctr b block-sep', '', '', 10, 'background:#e8e8e8;color:#505050;font-style:italic;')
  ];
  rows.push(rowMarkup(8, blockHdrRow, 'row-sticky-8'));

  const colHdrs = [
    cellMarkup('Cohort', 'hdr ctr', '', ''), cellMarkup('Sex', 'hdr ctr', '', ''), cellMarkup('P(x) 2024', 'hdr ctr', '', ''), cellMarkup('SurvRatio', 'hdr ctr', '', ''), cellMarkup('NMR p.a.', 'hdr ctr', '', ''),
    cellMarkup('Surv(x)', 'hdr ctr', '', ''), cellMarkup('NM(x)', 'hdr ctr', '', ''), cellMarkup('B(t)', 'hdr ctr', '', ''), cellMarkup('P(x,t)', 'hdr ctr', '', ''), cellMarkup('Δ Sc.A', 'hdr ctr', '', ''), cellMarkup('Δ%', 'hdr ctr print-boundary-col', '', ''),
    cellMarkup('Surv(x)', 'hdr ctr block-sep', '', ''), cellMarkup('NM(x)', 'hdr ctr', '', ''), cellMarkup('B(t)', 'hdr ctr', '', ''), cellMarkup('P(x,t)', 'hdr ctr', '', ''), cellMarkup('Δ Sc.A', 'hdr ctr', '', ''), cellMarkup('Δ%', 'hdr ctr', '', ''),
    cellMarkup('2025', 'hdr ctr block-sep lt', '', '', 1, 'background:#efefef;font-style:italic;'),
    cellMarkup('2026', 'hdr ctr lt', '', '', 1, 'background:#efefef;font-style:italic;'),
    cellMarkup('2027', 'hdr ctr lt', '', '', 1, 'background:#efefef;font-style:italic;'),
    cellMarkup('2028', 'hdr ctr lt', '', '', 1, 'background:#efefef;font-style:italic;'),
    cellMarkup('2029', 'hdr ctr lt', '', '', 1, 'background:#efefef;font-style:italic;'),
    cellMarkup('2030', 'hdr ctr lt', '', '', 1, 'background:#efefef;font-style:italic;'),
    cellMarkup('2031', 'hdr ctr lt', '', '', 1, 'background:#efefef;font-style:italic;'),
    cellMarkup('2032', 'hdr ctr lt', '', '', 1, 'background:#efefef;font-style:italic;'),
    cellMarkup('2033', 'hdr ctr lt', '', '', 1, 'background:#efefef;font-style:italic;'),
    cellMarkup('2034', 'hdr ctr lt', '', '', 1, 'background:#efefef;font-style:italic;')
  ];
  rows.push(rowMarkup(9, colHdrs, 'row-sticky-9'));

  rows.push(rowMarkup(10, [cellMarkup('MALE — Cohort Survival Calculations — Scenario B', 'sec b', '', '', ncols)]));

  const fmtN = n => n.toLocaleString('en-US');
  const fmtPct = n => (n * 100).toFixed(1) + '%';
  function deltaClass(pct, extra) {
    const base = extra ? extra + ' ' : '';
    if (pct < -0.05) return base + 'num red';
    if (pct > 0.005) return base + 'num sca';
    return base + 'num';
  }

  cohorts.forEach((cLabel, i) => {
    const rn = 11 + i;
    const bg = i % 2 === 1 ? ' alt' : '';
    const pm2024 = P_M_2024[i];
    const survRatio = SurvRatio[i];
    const nmr = NMR_M[i];
    const store2029 = dataStore.M[2029];
    const store2034 = dataStore.M[2034];

    const isWarnNM = i === 4;
    const cmSurv1 = i === 0 ? 'F11' : '';
    const cmNM1 = i === 4 ? 'G15' : '';
    const cmNM2 = i === 4 ? 'M15' : '';

    const cells = [
      cellMarkup(cLabel, bg.trim(), '', ''),
      cellMarkup('M', 'ctr lt'+bg, '', ''),
      cellMarkup(fmtN(pm2024), 'num'+bg, `=SCA_SCS_P_M_${cLabel.replace('–','')}_2024`, ''),
      cellMarkup(survRatio.toFixed(4), 'num lt'+bg, i === 16 ? '=SurvRatio_terminal_ScB' : `=1-(ASDR_ScB_${cLabel.replace('–','')}/1000)^5`, ''),
      cellMarkup((nmr*100).toFixed(2)+'%', 'num lt'+bg, `=NMR_ScB_M_${cLabel.replace('–','')}`, ''),

      cellMarkup(fmtN(store2029.surv[i]), 'num'+bg, i===0?'=0':`=C${rn}*D${rn}`, cmSurv1),
      cellMarkup(fmtN(store2029.nm[i]), 'num'+bg + (isWarnNM ? ' warn-cell' : ''), isWarnNM ? '=SCA_SCS_P_M_2024_2024*NMR_ScB_M_2024*5  →  #REF! (value hardcoded)' : `=C${rn}*E${rn}*5`, cmNM1),
      cellMarkup(store2029.b[i] ? fmtN(store2029.b[i]) : '—', 'num lt'+bg, i===0?`=SUMPRODUCT(ASFR_ScB_1549,AvgPF_1549_24_29)*(1/1.05)*D${rn}`:'=0', ''),
      cellMarkup(fmtN(store2029.p[i]), 'num b'+bg, i===0?`=CohComp_ScB!B58_M+G${rn}`:`=F${rn}+G${rn}`, ''),
      cellMarkup(fmtN(store2029.dScA[i]), deltaClass(store2029.dPct[i], bg), `=I${rn}-ScA_CohComp!I${rn}`, ''),
      cellMarkup(fmtPct(store2029.dPct[i]), deltaClass(store2029.dPct[i], 'b print-boundary-col ' + bg), `=J${rn}/ScA_CohComp!I${rn}`, ''),

      // Step 2 (2029 -> 2034)
      cellMarkup(fmtN(store2034.surv[i]), 'num block-sep'+bg, i===0?'=0':`=I${rn}*D${rn}`, ''),
      cellMarkup(fmtN(store2034.nm[i]), 'num'+bg, `=I${rn}*E${rn}*5`, cmNM2),
      cellMarkup(store2034.b[i] ? fmtN(store2034.b[i]) : '—', 'num lt'+bg, i===0?`=SUMPRODUCT(ASFR_ScB_1549,AvgPF_1549_29_34)*(1/1.05)*D${rn}`:'=0', ''),
      cellMarkup(fmtN(store2034.p[i]), 'num b'+bg, i===0?`=CohComp_ScB!B58_M+M${rn}`:`=L${rn}+M${rn}`, ''),
      cellMarkup(fmtN(store2034.dScA[i]), deltaClass(store2034.dPct[i], bg), `=O${rn}-ScA_CohComp!O${rn}`, ''),
      cellMarkup(fmtPct(store2034.dPct[i]), deltaClass(store2034.dPct[i], 'b ' + bg), `=P${rn}/ScA_CohComp!O${rn}`, ''),
    ];

    for (let yrIdx = 0; yrIdx < 10; yrIdx++) {
      const yr = 2025 + yrIdx;
      const isBlockSep = yrIdx === 0 ? ' block-sep' : '';
      const f = yr <= 2029 ? (yr - 2024)/5 : (yr - 2029)/5;
      const baseCol = yr <= 2029 ? 'C' : 'I';
      const destCol = yr <= 2029 ? 'I' : 'O';
      cells.push(cellMarkup(fmtN(dataStore.interp[i][yrIdx]), 'num interp-cell'+isBlockSep, `=${baseCol}${rn}+(${destCol}${rn}-${baseCol}${rn})*(${f.toFixed(1)})`, ''));
    }

    rows.push(rowMarkup(rn, cells));
  });

  // MALE TOTALS Row 28
  const totM2024 = P_M_2024.reduce((a,b)=>a+b, 0);
  const totM2029 = dataStore.M[2029].p.reduce((a,b)=>a+b, 0);
  const totM2034 = dataStore.M[2034].p.reduce((a,b)=>a+b, 0);
  const totMDScA = totM2029 - ScA_Total_2029.reduce((a,b)=>a+b,0)*0.512;
  const totMDPct = totMDScA / (ScA_Total_2029.reduce((a,b)=>a+b,0)*0.512);

  const totMCells = [
    cellMarkup('TOTAL', 'b', '', ''), cellMarkup('', 'lt', '', ''),
    cellMarkup(fmtN(totM2024), 'num b sca', '=SUM(C11:C27)', ''), cellMarkup('', 'lt', '', ''), cellMarkup('', 'lt', '', ''),
    cellMarkup('', 'lt', '', ''), cellMarkup('', 'lt', '', ''), cellMarkup('', 'lt', '', ''),
    cellMarkup(fmtN(totM2029), 'num b sca', '=SUM(I11:I27)', ''),
    cellMarkup(fmtN(totMDScA), 'num b red', '', ''),
    cellMarkup(fmtPct(totMDPct), 'num b red print-boundary-col', '', ''),
    cellMarkup('', 'block-sep lt', '', ''), cellMarkup('', 'lt', '', ''), cellMarkup('', 'lt', '', ''),
    cellMarkup(fmtN(totM2034), 'num b sca', '=SUM(O11:O27)', ''),
    cellMarkup('', 'lt', '', ''), cellMarkup('', 'lt', '', ''),
  ];
  for (let yrIdx = 0; yrIdx < 10; yrIdx++) {
    const isBlockSep = yrIdx === 0 ? ' block-sep' : '';
    let totalInterp = 0;
    for (let cIdx = 0; cIdx < 17; cIdx++) totalInterp += dataStore.interp[cIdx][yrIdx];
    totMCells.push(cellMarkup(fmtN(totalInterp), 'num interp-cell b'+isBlockSep, '', ''));
  }
  rows.push(rowMarkup(28, totMCells, 'totals-bg'));

  // Row 29 separator
  rows.push(rowMarkup(29, Array(ncols).fill('').map(()=>`<td class="c"></td>`)));

  // FEMALE BLOCK
  rows.push(rowMarkup(30, [cellMarkup('FEMALE — Cohort Survival Calculations — Scenario B', 'sec b', '', '', ncols)]));

  cohorts.forEach((cLabel, i) => {
    const rn = 31 + i;
    const bg = i % 2 === 1 ? ' alt' : '';
    const pf2024 = P_F_2024[i];
    const survRatio = SurvRatio[i];
    const nmr = NMR_F[i];
    const store2029 = dataStore.F[2029];
    const store2034 = dataStore.F[2034];

    const cmP1 = i === 0 ? 'I31' : '';

    const cells = [
      cellMarkup(cLabel, bg.trim(), '', ''),
      cellMarkup('F', 'ctr lt'+bg, '', ''),
      cellMarkup(fmtN(pf2024), 'num'+bg, `=SCA_SCS_P_F_${cLabel.replace('–','')}_2024`, ''),
      cellMarkup(survRatio.toFixed(4), 'num lt'+bg, i === 16 ? '=SurvRatio_terminal_ScB' : `=1-(ASDR_ScB_${cLabel.replace('–','')}/1000)^5`, ''),
      cellMarkup((nmr*100).toFixed(2)+'%', 'num lt'+bg, `=NMR_ScB_F_${cLabel.replace('–','')}`, ''),

      cellMarkup(fmtN(store2029.surv[i]), 'num'+bg, i===0?'=0':`=C${rn}*D${rn}`, ''),
      cellMarkup(fmtN(store2029.nm[i]), 'num'+bg, `=C${rn}*E${rn}*5`, ''),
      cellMarkup(store2029.b[i] ? fmtN(store2029.b[i]) : '—', 'num lt'+bg, i===0?`=SUMPRODUCT(ASFR_ScB_1549,AvgPF_1549_24_29)*(1/1.05)*D${rn}`:'=0', ''),
      cellMarkup(fmtN(store2029.p[i]), 'num b'+bg, i===0?`=CohComp_ScB!B58_F+G${rn}`:`=F${rn}+G${rn}`, cmP1),
      cellMarkup(fmtN(store2029.dScA[i]), deltaClass(store2029.dPct[i], bg), `=I${rn}-ScA_CohComp!I${rn}`, ''),
      cellMarkup(fmtPct(store2029.dPct[i]), deltaClass(store2029.dPct[i], 'b print-boundary-col ' + bg), `=J${rn}/ScA_CohComp!I${rn}`, ''),

      // Step 2 (2029 -> 2034)
      cellMarkup(fmtN(store2034.surv[i]), 'num block-sep'+bg, i===0?'=0':`=I${rn}*D${rn}`, ''),
      cellMarkup(fmtN(store2034.nm[i]), 'num'+bg, `=I${rn}*E${rn}*5`, ''),
      cellMarkup(store2034.b[i] ? fmtN(store2034.b[i]) : '—', 'num lt'+bg, i===0?`=SUMPRODUCT(ASFR_ScB_1549,AvgPF_1549_29_34)*(1/1.05)*D${rn}`:'=0', ''),
      cellMarkup(fmtN(store2034.p[i]), 'num b'+bg, i===0?`=CohComp_ScB!B58_F+M${rn}`:`=L${rn}+M${rn}`, ''),
      cellMarkup(fmtN(store2034.dScA[i]), deltaClass(store2034.dPct[i], bg), `=O${rn}-ScA_CohComp!O${rn}`, ''),
      cellMarkup(fmtPct(store2034.dPct[i]), deltaClass(store2034.dPct[i], 'b ' + bg), `=P${rn}/ScA_CohComp!O${rn}`, ''),
    ];

    for (let yrIdx = 0; yrIdx < 10; yrIdx++) {
      const yr = 2025 + yrIdx;
      const isBlockSep = yrIdx === 0 ? ' block-sep' : '';
      const f = yr <= 2029 ? (yr - 2024)/5 : (yr - 2029)/5;
      const baseCol = yr <= 2029 ? 'C' : 'I';
      const destCol = yr <= 2029 ? 'I' : 'O';
      cells.push(cellMarkup(fmtN(dataStore.interp[i][yrIdx]), 'num interp-cell'+isBlockSep, `=${baseCol}${rn}+(${destCol}${rn}-${baseCol}${rn})*(${f.toFixed(1)})`, ''));
    }

    const isMismatchRow = i === 16;
    rows.push(rowMarkup(rn, cells, isMismatchRow ? '' : '', isMismatchRow ? 'style="height:24px"' : ''));
  });

  // FEMALE TOTALS Row 48
  const totF2024 = P_F_2024.reduce((a,b)=>a+b, 0);
  const totF2029 = dataStore.F[2029].p.reduce((a,b)=>a+b, 0);
  const totF2034 = dataStore.F[2034].p.reduce((a,b)=>a+b, 0);
  const totFDScA = totF2029 - ScA_Total_2029.reduce((a,b)=>a+b,0)*0.488;
  const totFDPct = totFDScA / (ScA_Total_2029.reduce((a,b)=>a+b,0)*0.488);

  const totFCells = [
    cellMarkup('TOTAL', 'b', '', ''), cellMarkup('', 'lt', '', ''),
    cellMarkup(fmtN(totF2024), 'num b sca', '=SUM(C31:C47)', ''), cellMarkup('', 'lt', '', ''), cellMarkup('', 'lt', '', ''),
    cellMarkup('', 'lt', '', ''), cellMarkup('', 'lt', '', ''), cellMarkup('', 'lt', '', ''),
    cellMarkup(fmtN(totF2029), 'num b sca', '=SUM(I31:I47)', ''),
    cellMarkup(fmtN(totFDScA), 'num b red', '', ''),
    cellMarkup(fmtPct(totFDPct), 'num b red print-boundary-col', '', ''),
    cellMarkup('', 'block-sep lt', '', ''), cellMarkup('', 'lt', '', ''), cellMarkup('', 'lt', '', ''),
    cellMarkup(fmtN(totF2034), 'num b sca', '=SUM(O31:O47)', ''),
    cellMarkup('', 'lt', '', ''), cellMarkup('', 'lt', '', ''),
  ];
  for (let yrIdx = 0; yrIdx < 10; yrIdx++) {
    const isBlockSep = yrIdx === 0 ? ' block-sep' : '';
    let totalInterp = 0;
    for (let cIdx = 0; cIdx < 17; cIdx++) totalInterp += dataStore.interp[cIdx][yrIdx];
    totFCells.push(cellMarkup(fmtN(totalInterp), 'num interp-cell b'+isBlockSep, '', ''));
  }
  rows.push(rowMarkup(48, totFCells, 'totals-bg'));

  // Row 49 separator
  rows.push(rowMarkup(49, Array(ncols).fill('').map(()=>`<td class="c"></td>`)));

  // DERIVED INDICATORS
  rows.push(rowMarkup(50, [cellMarkup('DERIVED INDICATORS — PERIOD-END SUMMARY', 'sec2 b', '', '', ncols)]));

  // Row 51: Total population
  const totPop2024 = totM2024 + totF2024;
  const totPop2029 = totM2029 + totF2029;
  const totPop2034 = totM2034 + totF2034;
  const popCells = [
    cellMarkup('Total Population (M+F)', 'b', '', ''), cellMarkup('', 'lt', '', ''),
    cellMarkup(fmtN(totPop2024), 'num b sca', '=C28+C48', ''), cellMarkup('', 'lt', '', ''), cellMarkup('', 'lt', '', ''),
    cellMarkup('', 'lt', '', ''), cellMarkup('', 'lt', '', '', 2),
    cellMarkup(fmtN(totPop2029), 'num b sca', '=I28+I48', ''),
    cellMarkup('', 'lt', '', ''), cellMarkup('', 'print-boundary-col lt', '', ''),
    cellMarkup('', 'block-sep lt', '', ''), cellMarkup('', 'lt', '', '', 2),
    cellMarkup(fmtN(totPop2034), 'num b sca', '=O28+O48', ''),
    cellMarkup('', 'lt', '', ''), cellMarkup('', 'lt', '', ''),
  ];
  const annualTotalPops = [2050000, 1998000, 1944000, 1890000, 1835000, 1790000, 1748000, 1718000, 1693000, 1672000];
  annualTotalPops.forEach((val, yrIdx) => {
    const isBlockSep = yrIdx === 0 ? ' block-sep' : '';
    popCells.push(cellMarkup(fmtN(val), 'num interp-cell b'+isBlockSep, '', ''));
  });
  rows.push(rowMarkup(51, popCells));

  // Row 52: Dependency Ratio
  rows.push(rowMarkup(52, [
    cellMarkup('Dependency Ratio', 'b', '', ''), cellMarkup('', 'lt', '', ''),
    cellMarkup('0.85', 'num lt', '', ''), cellMarkup('', 'lt', '', ''), cellMarkup('', 'lt', '', ''),
    cellMarkup('', 'lt', '', ''), cellMarkup('', 'lt', '', '', 2),
    cellMarkup('0.86', 'num b', '', ''),
    cellMarkup('', 'lt', '', ''), cellMarkup('', 'print-boundary-col lt', '', ''),
    cellMarkup('', 'block-sep lt', '', ''), cellMarkup('', 'lt', '', '', 2),
    cellMarkup('0.87', 'num b', '=(SUM_Under15_ScB+SUM_Over65_ScB)/SUM_WorkingAge_ScB', 'O52'),
    cellMarkup('', 'lt', '', ''), cellMarkup('', 'lt', '', ''),
    cellMarkup('', 'block-sep lt', '', '', 10)
  ]));

  // Row 53: Child-Woman Ratio
  rows.push(rowMarkup(53, [
    cellMarkup('Child-Woman Ratio', 'b', '', ''), cellMarkup('', 'lt', '', ''),
    cellMarkup('386', 'num lt', '=Under5_F/Women1549*1000', ''), cellMarkup('', 'lt', '', ''), cellMarkup('', 'lt', '', ''),
    cellMarkup('', 'lt', '', ''), cellMarkup('', 'lt', '', '', 2),
    cellMarkup('264', 'num b', '', ''),
    cellMarkup('', 'lt', '', ''), cellMarkup('', 'print-boundary-col lt', '', ''),
    cellMarkup('', 'block-sep lt', '', '', 2), cellMarkup('', 'lt', '', ''),
    cellMarkup('184', 'num b', '', ''),
    cellMarkup('', 'lt', '', ''), cellMarkup('', 'lt', '', ''),
    cellMarkup('', 'block-sep lt', '', '', 10)
  ]));

  // Row 54: TFR
  rows.push(rowMarkup(54, [
    cellMarkup('TFR (applied)', 'b', '', ''), cellMarkup('', 'lt', '', ''),
    cellMarkup('3.38', 'num lt', '', ''), cellMarkup('', 'lt', '', ''), cellMarkup('', 'lt', '', ''),
    cellMarkup('', 'lt', '', ''), cellMarkup('', 'lt', '', '', 2),
    cellMarkup('2.06', 'num b', '', ''),
    cellMarkup('', 'lt', '', ''), cellMarkup('', 'print-boundary-col lt', '', ''),
    cellMarkup('', 'block-sep lt', '', '', 2), cellMarkup('', 'lt', '', ''),
    cellMarkup('2.06', 'num b', '', ''),
    cellMarkup('', 'lt', '', ''), cellMarkup('', 'lt', '', ''),
    cellMarkup('', 'block-sep lt', '', '', 10)
  ]));

  // Row 55: NRR
  rows.push(rowMarkup(55, [
    cellMarkup('NRR', 'b', '', ''), cellMarkup('', 'lt', '', ''),
    cellMarkup('1.61', 'num lt', '', ''), cellMarkup('', 'lt', '', ''), cellMarkup('', 'lt', '', ''),
    cellMarkup('', 'lt', '', ''), cellMarkup('', 'lt', '', '', 2),
    cellMarkup('0.71', 'num b scb', '=SUMPRODUCT(ASFR_ScB_1549,SurvRatio_F_ScB_mid)/SRB*100', 'I55'),
    cellMarkup('', 'lt', '', ''), cellMarkup('', 'print-boundary-col lt', '', ''),
    cellMarkup('', 'block-sep lt', '', '', 2), cellMarkup('', 'lt', '', ''),
    cellMarkup('0.71', 'num b scb', '', ''),
    cellMarkup('', 'lt', '', ''), cellMarkup('', 'lt', '', ''),
    cellMarkup('', 'block-sep lt', '', '', 10)
  ]));

  // Row 56: CDVI
  rows.push(rowMarkup(56, [
    cellMarkup('CDVI', 'b', '', ''), cellMarkup('', 'lt', '', ''),
    cellMarkup('100', 'num lt', '', ''), cellMarkup('', 'lt', '', ''), cellMarkup('', 'lt', '', ''),
    cellMarkup('', 'lt', '', ''), cellMarkup('', 'lt', '', '', 2),
    cellMarkup('48', 'num b scb', '', ''),
    cellMarkup('', 'lt', '', ''), cellMarkup('', 'print-boundary-col lt', '', ''),
    cellMarkup('', 'block-sep lt', '', '', 2), cellMarkup('', 'lt', '', ''),
    cellMarkup('31', 'num b scb', '=ROUND((NRR_t*35)+(DepRatio_adj_t*25)+(WA_retention_t*25)+(ICS_proxy_t*15),0)', ''),
    cellMarkup('', 'lt', '', ''), cellMarkup('', 'lt', '', ''),
    cellMarkup('', 'block-sep lt', '', '', 10)
  ], 'print-boundary-row'));

  // Row 57 separator
  rows.push(rowMarkup(57, Array(ncols).fill('').map(()=>`<td class="c"></td>`)));

  // Row 58: dedicated Births Row
  const birthCells = [
    cellMarkup('Births — Period Total  |  SUMPRODUCT(ASFR_ScB × AvgPF_1549)  |  Feeds → P(0–4) cohort', 'b', '', ''),
    cellMarkup('', 'lt', '', ''), cellMarkup('—', 'ctr lt', '', ''), cellMarkup('—', 'ctr lt', '', ''), cellMarkup('—', 'ctr lt', '', ''),
    cellMarkup('—', 'ctr lt', '', ''), cellMarkup('—', 'ctr lt', '', ''),
    cellMarkup('143,400', 'num b births-bg', '=SUMPRODUCT(ASFR_ScB_1549,AvgPF_1549_24_29)*(1/SRB)*SurvRatio_ScB_0_4', 'H58'),
    cellMarkup('—', 'ctr lt', '', ''), cellMarkup('—', 'ctr lt', '', ''), cellMarkup('—', 'ctr lt print-boundary-col', '', ''),
    cellMarkup('—', 'ctr lt block-sep', '', ''), cellMarkup('—', 'ctr lt', '', ''),
    cellMarkup('98,200', 'num b births-bg', '', 'N58'),
    cellMarkup('—', 'ctr lt', '', ''), cellMarkup('—', 'ctr lt', '', ''), cellMarkup('—', 'ctr lt', '', '')
  ];
  const annualBirths = [29332, 27900, 26400, 24800, 23200, 21800, 20400, 19400, 18700, 18200];
  annualBirths.forEach((val, yrIdx) => {
    const isBlockSep = yrIdx === 0 ? ' block-sep' : '';
    birthCells.push(cellMarkup(fmtN(val), 'num interp-cell births-bg b'+isBlockSep, '', ''));
  });
  rows.push(rowMarkup(58, birthCells));

  rows.push(rowMarkup(59, [cellMarkup('NOTE: Five-year cohort step calculations per standard cohort-component methodology. Annual interpolation derived linearly from step endpoints. Scenario B rates applied throughout — see Assumptions sheet.', 'meta-lbl i', '', '', ncols)]));
  rows.push(rowMarkup(60, [cellMarkup('NOTE: Scenario A parallel calculation block located columns AB:AQ (hidden). Δ Sc.A values in columns J, K, P, Q derived from hidden block. To inspect Scenario A working: Home → Format → Hide & Unhide → Unhide Columns → select AB:AQ.', 'meta-lbl i', '', '', ncols)]));

  document.getElementById('maintable').innerHTML = cg + thead + `<tbody>${rows.join('')}</tbody>`;
}

// ── SHEET 5: OUTPUTS RENDERER ──
