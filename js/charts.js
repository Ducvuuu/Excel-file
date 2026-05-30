// ══ CHART REGISTRY ════════════════════════════════════════════════════════════════
// Maps each sheet to its chart containers and their table row anchors.
// offsetX: explicit px value overrides leftPos (null = use leftPos).
// topOffset: added to rowTop (default 4; outputs use 12).

const SHEET_CHARTS = {
  '01 — Cover':        [{ id: 'chartCover' }],
  '03 — Assumptions':  [{ id: 'chartAssumptionsA' }, { id: 'chartAssumptionsB' }],
  '04 — Calculations': [{ id: 'chartCalculationsC' }, { id: 'chartCalculationsD' }, { id: 'chartCalculationsE' }],
  // Outputs charts use rowAnchor — positioned inside their dedicated section rows
  '05 — Outputs': [
    { id: 'chartOutputsF', rowAnchor: 24 },   // Section 2: rows 25–57 reserved for pyramid
    { id: 'chartOutputsG', rowAnchor: 73 },   // spacer rows after trajectory table
    { id: 'chartOutputsH', rowAnchor: 93 },   // spacer rows after CDVI table (shifted +1 for terminal row)
  ],
};

// Maps each sheet to its D3 draw function (defined below alongside each renderer).
const SHEET_DRAW = {
  '01 — Cover':        () => drawCoverChart(),
  '03 — Assumptions':  () => drawAssumptionsCharts(),
  '04 — Calculations': () => drawCalculationsCharts(),
  '05 — Outputs':      () => drawOutputsCharts(),
};

// ── CHART DISPATCHER ──

function drawActiveCharts() {
  document.querySelectorAll('.chart-float').forEach(c => c.classList.remove('active'));

  const sheet = state.activeSheet;
  const tbl = document.getElementById('maintable');
  const wrapper = tbl.parentElement;
  wrapper.style.minHeight = '';

  const charts = SHEET_CHARTS[sheet];
  if (!charts) return;

  const tbodyRows = tbl.querySelectorAll('tbody tr');
  function getRowTop(idx) {
    return tbodyRows[idx] ? tbodyRows[idx].offsetTop : 0;
  }

  const hasAnchors = charts.some(c => c.rowAnchor != null);

  if (hasAnchors) {
    // Row-anchored mode: each chart sits inside its dedicated section rows
    charts.forEach(({ id, rowAnchor }) => {
      const el = document.getElementById(id);
      if (!el) return;
      el.classList.add('active');
      el.style.left = '36px';
      el.style.top  = (getRowTop(rowAnchor) + 4) + 'px';
    });
  } else {
    // Below-table stacking mode: charts appear after the last data row
    charts.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return;
      el.classList.add('active');
      el.style.left = '16px';
      el.style.top  = '0px';
    });

    let nextTop = tbl.offsetHeight + 28;
    charts.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return;
      el.style.top = nextTop + 'px';
      nextTop += el.offsetHeight + 28;
    });

    wrapper.style.minHeight = nextTop + 'px';
  }

  SHEET_DRAW[sheet]?.();
}

// ══ CHART DRAW FUNCTIONS ══════════════════════════════════════════════════════════
// Each function matches one sheet's SHEET_DRAW entry. Dispatched by drawActiveCharts().
// Cover → drawCoverChart        Assumptions → drawAssumptionsCharts
// Calculations → drawCalculationsCharts     Outputs → drawOutputsCharts

// Chart 1: Cover Line Divergence
function drawCoverChart() {
  d3.select('#svgCover').selectAll('*').remove();
  const scaVals = [2114, 2178, 2244, 2312, 2382, 2454, 2529, 2605, 2683, 2763, 2846, 2873];
  const scbVals = [2114, 2068, 2015, 1956, 1890, 1820, 1747, 1671, 1593, 1512, 1431, 1341];
  const years = [2024, 2025, 2026, 2027, 2028, 2029, 2030, 2031, 2032, 2033, 2034, 2035];

  const m = {t:8, r:12, b:20, l:36};
  const W = 350 - m.l - m.r;
  const H = 140 - m.t - m.b;
  const svg = d3.select('#svgCover').attr('width', W+m.l+m.r).attr('height', H+m.t+m.b);
  const g = svg.append('g').attr('transform', `translate(${m.l},${m.t})`);

  const x = d3.scaleLinear().domain([2024, 2035]).range([0, W]);
  const y = d3.scaleLinear().domain([1000, 3000]).range([H, 0]);

  g.append('rect').attr('width', W).attr('height', H).attr('fill', '#f2f2f2').attr('stroke', '#b0b0b0').attr('stroke-width', 0.5);
  [1500, 2000, 2500].forEach(v => g.append('line').attr('x1', 0).attr('y1', y(v)).attr('x2', W).attr('y2', y(v)).attr('stroke', '#dcdcdc').attr('stroke-width', 0.5));

  const area = d3.area().x((d, i) => x(years[i])).y0((d, i) => y(scaVals[i])).y1((d, i) => y(scbVals[i]));
  g.append('path').datum(scbVals).attr('fill', 'rgba(192,0,0,0.06)').attr('d', area);

  const line = d3.line().x((d, i) => x(years[i])).y(d => y(d));
  g.append('path').datum(scaVals).attr('fill', 'none').attr('stroke', '#2e75b6').attr('stroke-width', 1.5).attr('d', line);
  g.append('path').datum(scbVals).attr('fill', 'none').attr('stroke', '#c00000').attr('stroke-width', 1.5).attr('d', line);

  g.append('g').attr('transform', `translate(0,${H})`).call(d3.axisBottom(x).ticks(4).tickFormat(d3.format('d'))).call(g => g.selectAll('text').attr('font-size', 8));
  g.append('g').call(d3.axisLeft(y).ticks(4).tickFormat(d=>d.toLocaleString())).call(g => g.selectAll('text').attr('font-size', 8));
}

// Chart Assumptions A & B
function drawAssumptionsCharts() {
  d3.select('#svgAssumptionsA').selectAll('*').remove();
  d3.select('#svgAssumptionsB').selectAll('*').remove();

  const aLabels = ['0–4', '5–9', '10–14', '15–19', '20–24', '25–29', '30–34'];
  const aScA = [5.21, 0.48, 0.49, 0.71, 0.82, 0.94, 1.12];
  const aScB = [35.10, 1.12, 1.20, 2.84, 3.20, 3.65, 3.91];

  const mA = {t:6, r:12, b:20, l:36};
  const WA = 458 - mA.l - mA.r;
  const HA = 120 - mA.t - mA.b;
  const svgA = d3.select('#svgAssumptionsA').attr('width', WA+mA.l+mA.r).attr('height', HA+mA.t+mA.b);
  const gA = svgA.append('g').attr('transform', `translate(${mA.l},${mA.t})`);

  const xA0 = d3.scaleBand().domain(d3.range(aLabels.length)).range([0, WA]).padding(0.25);
  const xA1 = d3.scaleBand().domain([0, 1]).range([0, xA0.bandwidth()]).padding(0.08);
  const yA  = d3.scaleLinear().domain([0, 38]).range([HA, 0]);

  gA.append('rect').attr('width', WA).attr('height', HA).attr('fill', '#f2f2f2').attr('stroke', '#b0b0b0').attr('stroke-width', 0.5);
  [10, 20, 30].forEach(v => gA.append('line').attr('x1', 0).attr('y1', yA(v)).attr('x2', WA).attr('y2', yA(v)).attr('stroke', 'white').attr('stroke-width', 0.5));

  aLabels.forEach((lbl, i) => {
    [[aScA[i], '#2e75b6'], [aScB[i], '#c00000']].forEach(([val, col], j) => {
      gA.append('rect').attr('x', xA0(i)+xA1(j)).attr('y', yA(val)).attr('width', xA1.bandwidth()).attr('height', HA-yA(val)).attr('fill', col).attr('opacity', j===1?0.8:1);
    });
    gA.append('text').attr('x', xA0(i)+xA0.bandwidth()/2).attr('y', HA+11).attr('text-anchor', 'middle').attr('font-size', 7.5).attr('fill', '#333').text(lbl);
  });
  gA.append('g').call(d3.axisLeft(yA).ticks(4)).call(g=>g.selectAll('text').attr('font-size', 8));

  const bYears = [2024, 2026, 2028, 2030, 2032, 2034, 2035];
  const bTFR_B = [3.38, 2.82, 2.35, 2.10, 2.07, 2.06, 2.06];
  const bTFR_A = [3.38, 3.32, 3.28, 3.24, 3.21, 3.19, 3.18];

  const mB = {t:6, r:12, b:22, l:32};
  const WB = 258 - mB.l - mB.r;
  const HB = 130 - mB.t - mB.b;
  const svgB = d3.select('#svgAssumptionsB').attr('width', WB+mB.l+mB.r).attr('height', HB+mB.t+mB.b);
  const gB = svgB.append('g').attr('transform', `translate(${mB.l},${mB.t})`);

  const xB = d3.scaleLinear().domain([2024, 2035]).range([0, WB]);
  const yB = d3.scaleLinear().domain([1.8, 3.6]).range([HB, 0]);

  gB.append('rect').attr('width', WB).attr('height', HB).attr('fill', '#f2f2f2').attr('stroke', '#b0b0b0').attr('stroke-width', 0.5);
  [2.0, 2.5, 3.0, 3.5].forEach(v => gB.append('line').attr('x1', 0).attr('y1', yB(v)).attr('x2', WB).attr('y2', yB(v)).attr('stroke', 'white').attr('stroke-width', 0.5));

  gB.append('line').attr('x1', 0).attr('y1', yB(2.10)).attr('x2', WB).attr('y2', yB(2.10)).attr('stroke', '#808080').attr('stroke-dasharray', '4,3');

  const lineB = d3.line().x((d, i) => xB(bYears[i])).y(d => yB(d));
  gB.append('path').datum(bTFR_A).attr('fill', 'none').attr('stroke', '#2e75b6').attr('stroke-width', 1.5).attr('d', lineB);
  gB.append('path').datum(bTFR_B).attr('fill', 'none').attr('stroke', '#c00000').attr('stroke-width', 1.5).attr('stroke-dasharray', '4,3').attr('d', lineB);

  gB.append('g').attr('transform', `translate(0,${HB})`).call(d3.axisBottom(xB).ticks(4).tickFormat(d3.format('d'))).call(g=>g.selectAll('text').attr('font-size', 8));
  gB.append('g').call(d3.axisLeft(yB).ticks(4).tickFormat(d=>d.toFixed(1))).call(g=>g.selectAll('text').attr('font-size', 8));
}

// Calculations Charts C, D, E
function drawCalculationsCharts() {
  d3.select('#svgCalculationsC').selectAll('*').remove();
  d3.select('#svgCalculationsD').selectAll('*').remove();
  d3.select('#svgCalculationsE').selectAll('*').remove();

  const cData2029M = [60325, 148200, 172400, 79800, 46933, 56200, 60400, 68800, 43100, 34800, 27900, 22100, 17200, 19800, 12700, 7100, 7600];
  const cLabelsShort = ['0-4','5-9','10-14','15-19','20-24','25-29','30-34','35-39','40-44','45-49','50-54','55-59','60-64','65-69','70-74','75-79','80+'];

  const mC = {t:8, r:15, b:35, l:45};
  const WC = 460 - mC.l - mC.r;
  const HC = 165 - mC.t - mC.b;
  const svgC = d3.select('#svgCalculationsC').attr('width', WC+mC.l+mC.r).attr('height', 165);
  const gC = svgC.append('g').attr('transform', `translate(${mC.l},${mC.t})`);

  const xC0 = d3.scaleBand().domain(d3.range(cohorts.length)).range([0, WC]).padding(0.28);
  const xC1 = d3.scaleBand().domain([0, 1]).range([0, xC0.bandwidth()]).padding(0.05);
  const yC = d3.scaleLinear().domain([0, 185000]).range([HC, 0]);

  gC.append('rect').attr('width', WC).attr('height', HC).attr('fill', '#f2f2f2').attr('stroke', '#b0b0b0').attr('stroke-width', 0.5);
  [50000, 100000, 150000].forEach(v => gC.append('line').attr('x1', 0).attr('y1', yC(v)).attr('x2', WC).attr('y2', yC(v)).attr('stroke', '#d0d0d0').attr('stroke-width', 0.5));

  cohorts.forEach((lbl, i) => {
    [[P_M_2024[i], '#4472c4'], [cData2029M[i], '#c00000']].forEach(([val, col], j) => {
      gC.append('rect').attr('x', xC0(i) + xC1(j)).attr('y', yC(val)).attr('width', xC1.bandwidth()).attr('height', HC - yC(val)).attr('fill', col);
    });
    gC.append('text').attr('x', xC0(i) + xC0.bandwidth()/2).attr('y', HC + 12).attr('text-anchor', 'middle').attr('font-size', 7.5).attr('fill', '#333').text(cLabelsShort[i]);
  });
  gC.append('g').call(d3.axisLeft(yC).ticks(4).tickFormat(d3.format('.0s'))).call(g => g.selectAll('text').attr('font-size', 8));

  const years = [2025, 2026, 2027, 2028, 2029, 2030, 2031, 2032, 2033, 2034];
  const bScA = [36300, 36800, 37200, 37500, 37800, 38100, 38300, 38500, 38600, 38700];
  const bScB = [29332, 27900, 26400, 24800, 23200, 21800, 20400, 19400, 18700, 18200];

  const mD = {t:8, r:15, b:25, l:45};
  const WD = 380 - mD.l - mD.r;
  const HD = 130 - mD.t - mD.b;
  const svgD = d3.select('#svgCalculationsD').attr('width', WD+mD.l+mD.r).attr('height', 130);
  const gD = svgD.append('g').attr('transform', `translate(${mD.l},${mD.t})`);

  const xD = d3.scaleLinear().domain([2025, 2034]).range([0, WD]);
  const yD = d3.scaleLinear().domain([10000, 42000]).range([HD, 0]);

  gD.append('rect').attr('width', WD).attr('height', HD).attr('fill', '#f2f2f2').attr('stroke', '#b0b0b0').attr('stroke-width', 0.5);
  [15000, 25000, 35000].forEach(v => gD.append('line').attr('x1', 0).attr('y1', yD(v)).attr('x2', WD).attr('y2', yD(v)).attr('stroke', '#d0d0d0').attr('stroke-width', 0.5));

  const line = d3.line().x((d, i) => xD(years[i])).y(d => yD(d));
  gD.append('path').datum(bScA).attr('fill', 'none').attr('stroke', '#4472c4').attr('stroke-width', 1.8).attr('d', line);
  gD.append('path').datum(bScB).attr('fill', 'none').attr('stroke', '#c00000').attr('stroke-width', 2).attr('d', line);

  gD.append('g').attr('transform', `translate(0,${HD})`).call(d3.axisBottom(xD).ticks(5).tickFormat(d3.format('d'))).call(g => g.selectAll('text').attr('font-size', 8));
  gD.append('g').call(d3.axisLeft(yD).ticks(4).tickFormat(d3.format('.0s'))).call(g => g.selectAll('text').attr('font-size', 8));

  const eYears = [2024, 2026, 2028, 2030, 2032, 2034];
  const eFemales = [100, 91, 79, 68, 61, 58];
  const eBirths  = [100, 84, 66, 51, 40, 31];

  const mE = {t:8, r:15, b:25, l:45};
  const WE = 440 - mE.l - mE.r;
  const HE = 150 - mE.t - mE.b;
  const svgE = d3.select('#svgCalculationsE').attr('width', WE+mE.l+mE.r).attr('height', 150);
  const gE = svgE.append('g').attr('transform', `translate(${mE.l},${mE.t})`);

  const xE = d3.scaleLinear().domain([2024, 2034]).range([0, WE]);
  const yE = d3.scaleLinear().domain([0, 110]).range([HE, 0]);

  gE.append('rect').attr('width', WE).attr('height', HE).attr('fill', '#f2f2f2').attr('stroke', '#b0b0b0').attr('stroke-width', 0.5);
  [25, 50, 75, 100].forEach(v => gE.append('line').attr('x1', 0).attr('y1', yE(v)).attr('x2', WE).attr('y2', yE(v)).attr('stroke', '#dcdcdc').attr('stroke-width', 0.5));

  const lineE = d3.line().x((d, i) => xE(eYears[i])).y(d => yE(d));
  gE.append('path').datum(eFemales).attr('fill', 'none').attr('stroke', '#4472c4').attr('stroke-width', 1.8).attr('d', lineE);
  gE.append('path').datum(eBirths).attr('fill', 'none').attr('stroke', '#c00000').attr('stroke-width', 2).attr('d', lineE);

  gE.append('g').attr('transform', `translate(0,${HE})`).call(d3.axisBottom(xE).ticks(5).tickFormat(d3.format('d'))).call(g => g.selectAll('text').attr('font-size', 8));
  gE.append('g').call(d3.axisLeft(yE).ticks(4)).call(g => g.selectAll('text').attr('font-size', 8));
}

// ── PYRAMID ANIMATION CONTROLLER ──
const pyramidAnimCtrl = {
  step: 2, playing: true, timer: null, drawFn: null,
  durations: [2200, 2200, 2800, 4500],
  schedule() {
    if (!this.playing || !this.drawFn) return;
    this.timer = setTimeout(() => {
      this.step = (this.step + 1) % 4;
      this.drawFn(this.step, true);
      this.schedule();
    }, this.durations[this.step]);
  },
  stop() { if (this.timer) { clearTimeout(this.timer); this.timer = null; } },
  start(fn) { this.stop(); this.drawFn = fn; this.playing = true; this.schedule(); }
};

function togglePyramidAnim() {
  pyramidAnimCtrl.playing = !pyramidAnimCtrl.playing;
  const btn = document.getElementById('pyramid-play-btn');
  if (btn) btn.textContent = pyramidAnimCtrl.playing ? '⏸' : '▶';
  if (pyramidAnimCtrl.playing) pyramidAnimCtrl.schedule();
  else pyramidAnimCtrl.stop();
}

// Outputs Charts F (animated pyramid), G (trajectory to 2050), H (CDVI to 2050)
function drawOutputsCharts() {
  pyramidAnimCtrl.stop();
  d3.select('#svgOutputsF').selectAll('*').remove();
  d3.select('#svgOutputsG').selectAll('*').remove();
  d3.select('#svgOutputsH').selectAll('*').remove();

  // ── Fig. F — Animated Population Pyramid ──
  const P_M_2034 = [41069, 49407, 142608, 120114, 62907, 35210, 34845, 48596, 65812, 41117, 33759, 27637, 21466, 16050, 17747, 11196, 10011];
  const P_F_2034 = [39104, 47049, 135793, 119737, 68167, 36674, 38616, 51340, 67085, 42231, 34910, 29125, 22922, 17579, 19646, 12773, 13104];

  const pyramidStepData = [
    { year: 2024, label: '2024 Sc.B', u14: '47.3%', M: P_M_2024, F: P_F_2024, colM: '#4472c4', colF: '#7bafd4' },
    { year: 2029, label: '2029 Sc.B', u14: '38.1%', M: dataStore.M[2029].p, F: dataStore.F[2029].p, colM: '#c55a3e', colF: '#dda080' },
    { year: 2034, label: '2034 Sc.B', u14: '28.9%', M: P_M_2034, F: P_F_2034, colM: '#c00000', colF: '#e07070' },
    { year: 2050, label: '2050 Terminal', u14: '8.1%', M: P_M_2050, F: P_F_2050, colM: '#8b0000', colF: '#c08080' },
  ];

  const cohorts_rev = [...cohorts].reverse();
  const leftC = 150, rightC = 460;
  const mF = {t:30, r:15, b:35, l:15};
  const WF = 660 - mF.l - mF.r, HF = 430 - mF.t - mF.b;
  const svgF = d3.select('#svgOutputsF').attr('width', WF+mF.l+mF.r).attr('height', 430);
  const gF = svgF.append('g').attr('transform', `translate(${mF.l},${mF.t})`);

  const xSc = d3.scaleLinear().domain([0, 200000]).range([0, 130]);
  const ySc = d3.scaleBand().domain(cohorts_rev).range([0, HF]).padding(0.2);

  // Panel backgrounds
  gF.append('rect').attr('x', leftC-130).attr('y', 0).attr('width', 260).attr('height', HF).attr('fill', '#f2f2f2').attr('stroke', '#b0b0b0').attr('stroke-width', 0.5);
  gF.append('rect').attr('x', rightC-130).attr('y', 0).attr('width', 260).attr('height', HF).attr('fill', '#f2f2f2').attr('stroke', '#b0b0b0').attr('stroke-width', 0.5);

  // Gridlines
  [50000, 100000, 150000].forEach(v => {
    [leftC, rightC].forEach(c => {
      gF.append('line').attr('x1', c-xSc(v)).attr('y1', 0).attr('x2', c-xSc(v)).attr('y2', HF).attr('stroke', '#dcdcdc').attr('stroke-width', 0.5);
      gF.append('line').attr('x1', c+xSc(v)).attr('y1', 0).attr('x2', c+xSc(v)).attr('y2', HF).attr('stroke', '#dcdcdc').attr('stroke-width', 0.5);
    });
  });

  // Left side (fixed 2024)
  gF.append('text').attr('x', leftC).attr('y', -10).attr('text-anchor', 'middle').attr('font-size', 9).attr('font-weight', 'bold').attr('fill', '#2e75b6').text('2024 — Baseline');
  cohorts.forEach((c, i) => {
    const y = ySc(c), bw = ySc.bandwidth();
    gF.append('rect').attr('x', leftC - xSc(P_M_2024[i])).attr('y', y).attr('width', xSc(P_M_2024[i])).attr('height', bw).attr('fill', '#4472c4');
    gF.append('rect').attr('x', leftC).attr('y', y).attr('width', xSc(P_F_2024[i])).attr('height', bw).attr('fill', '#7bafd4');
    gF.append('text').attr('x', (leftC+rightC)/2).attr('y', y+bw/2+3).attr('text-anchor', 'middle').attr('font-size', 8).attr('fill', '#444').text(c);
  });

  // Right side title (dynamic)
  const rightTitleEl = gF.append('text').attr('x', rightC).attr('y', -10).attr('text-anchor', 'middle').attr('font-size', 9).attr('font-weight', 'bold').attr('fill', '#c00000');
  // Under-14 annotation
  const u14AnnotEl = gF.append('text').attr('x', rightC).attr('y', ySc('10–14') - 3).attr('text-anchor', 'middle').attr('font-size', 7.5).attr('fill', '#8b0000');

  // Right-side bars (animated)
  const rightBarsG = gF.append('g');
  cohorts.forEach((c, i) => {
    const y = ySc(c), bw = ySc.bandwidth();
    rightBarsG.append('rect').attr('class', `rbar-m rbar-m-${i}`).attr('y', y).attr('height', bw).attr('x', rightC).attr('width', 0);
    rightBarsG.append('rect').attr('class', `rbar-f rbar-f-${i}`).attr('y', y).attr('height', bw).attr('x', rightC).attr('width', 0);
  });

  // Axis tick labels (both panels)
  [leftC, rightC].forEach(c => {
    [150000, 100000, 50000, 0, 50000, 100000, 150000].forEach((v, vi) => {
      const xp = c + xSc(v) * (vi < 3 ? -1 : 1);
      gF.append('line').attr('x1', xp).attr('y1', HF).attr('x2', xp).attr('y2', HF+3).attr('stroke', '#888').attr('stroke-width', 0.5);
      gF.append('text').attr('x', xp).attr('y', HF+12).attr('text-anchor', 'middle').attr('font-size', 7.5).attr('fill', '#606060').text(v === 0 ? '0' : (v/1000) + 'k');
    });
  });

  function updatePyramidStep(stepIdx, animate) {
    const s = pyramidStepData[stepIdx];
    const dur = animate ? 700 : 0;
    cohorts.forEach((c, i) => {
      const mW = xSc(s.M[i]), fW = xSc(s.F[i]);
      const sel = rightBarsG;
      const barM = sel.select(`.rbar-m-${i}`);
      const barF = sel.select(`.rbar-f-${i}`);
      if (animate) {
        barM.transition().duration(dur).ease(d3.easeCubicInOut).attr('x', rightC - mW).attr('width', mW).attr('fill', s.colM);
        barF.transition().duration(dur).ease(d3.easeCubicInOut).attr('x', rightC).attr('width', fW).attr('fill', s.colF);
      } else {
        barM.attr('x', rightC - mW).attr('width', mW).attr('fill', s.colM);
        barF.attr('x', rightC).attr('width', fW).attr('fill', s.colF);
      }
    });
    rightTitleEl.attr('fill', s.year === 2050 ? '#8b0000' : '#c00000')
      .text(s.year + (s.year === 2050 ? ' — Scenario B Terminal' : ' — Scenario B'));
    u14AnnotEl.text(`under-14: ${s.u14}`);
    const lbl = document.getElementById('pyramid-year-label');
    if (lbl) lbl.textContent = s.label;
    const dots = document.getElementById('pyramid-step-dots');
    if (dots) dots.textContent = pyramidStepData.map((_, k) => k === stepIdx ? '●' : '○').join(' ');
  }

  // Start on step 2 (2034, matching original chart), then animate forward
  pyramidAnimCtrl.step = 2;
  updatePyramidStep(2, false);
  pyramidAnimCtrl.start(updatePyramidStep);

  // ── Fig. G — Population Trajectory extended to 2050 ──
  const trajYears = [2024,2025,2026,2027,2028,2029,2030,2031,2032,2033,2034,2035];
  const trajScA   = [2114,2178,2244,2312,2382,2454,2529,2605,2683,2763,2846,2873];
  const trajScB   = [2114,2068,2015,1956,1890,1820,1747,1671,1593,1512,1431,1341];
  // Terminal 2050 extrapolated points (dashed extension)
  const extYears  = [2035, 2050];
  const extScA    = [2873, 4390]; // Sc.A continuing ~2.9%/yr
  const extScB    = [1341,  645]; // Sc.B terminal

  const mG = {t:10, r:50, b:25, l:48};
  const WG = 640 - mG.l - mG.r, HG = 160 - mG.t - mG.b;
  const svgTraj = d3.select('#svgOutputsG').attr('width', WG+mG.l+mG.r).attr('height', 160);
  const gG = svgTraj.append('g').attr('transform', `translate(${mG.l},${mG.t})`);

  const xG = d3.scaleLinear().domain([2024, 2050]).range([0, WG]);
  const yG = d3.scaleLinear().domain([0, 4600]).range([HG, 0]);

  gG.append('rect').attr('width', WG).attr('height', HG).attr('fill', '#f2f2f2').attr('stroke', '#b0b0b0').attr('stroke-width', 0.5);
  [1000, 2000, 3000, 4000].forEach(v =>
    gG.append('line').attr('x1', 0).attr('y1', yG(v)).attr('x2', WG).attr('y2', yG(v)).attr('stroke', '#dcdcdc').attr('stroke-width', 0.5)
  );
  // Vertical marker at 2035 (model boundary)
  gG.append('line').attr('x1', xG(2035)).attr('y1', 0).attr('x2', xG(2035)).attr('y2', HG).attr('stroke', '#b0b0b0').attr('stroke-dasharray', '2,3').attr('stroke-width', 0.8);
  gG.append('text').attr('x', xG(2035)+2).attr('y', 8).attr('font-size', 7).attr('fill', '#a0a0a0').text('model\nboundary');

  const lineG = d3.line().x((d, i) => xG(trajYears[i])).y(d => yG(d));
  gG.append('path').datum(trajScA).attr('fill', 'none').attr('stroke', '#2e75b6').attr('stroke-width', 1.5).attr('d', lineG);
  gG.append('path').datum(trajScB).attr('fill', 'none').attr('stroke', '#c00000').attr('stroke-width', 1.5).attr('d', lineG);

  // Extension dashes to 2050
  const lineExt = d3.line().x((d, i) => xG(extYears[i])).y(d => yG(d));
  gG.append('path').datum(extScA).attr('fill', 'none').attr('stroke', '#2e75b6').attr('stroke-width', 1.2).attr('stroke-dasharray', '4,3').attr('d', lineExt);
  gG.append('path').datum(extScB).attr('fill', 'none').attr('stroke', '#c00000').attr('stroke-width', 1.2).attr('stroke-dasharray', '4,3').attr('d', lineExt);

  // Terminal point markers
  gG.append('circle').attr('cx', xG(2050)).attr('cy', yG(4390)).attr('r', 3).attr('fill', '#2e75b6');
  gG.append('circle').attr('cx', xG(2050)).attr('cy', yG(645)).attr('r', 3).attr('fill', '#8b0000');
  gG.append('text').attr('x', xG(2050)+4).attr('y', yG(4390)+3).attr('font-size', 7.5).attr('fill', '#2e75b6').text('4,390');
  gG.append('text').attr('x', xG(2050)+4).attr('y', yG(645)+3).attr('font-size', 7.5).attr('fill', '#8b0000').text('645');

  gG.append('g').attr('transform', `translate(0,${HG})`).call(d3.axisBottom(xG).tickValues([2024,2029,2034,2040,2050]).tickFormat(d3.format('d'))).call(g => g.selectAll('text').attr('font-size', 8));
  gG.append('g').call(d3.axisLeft(yG).ticks(4).tickFormat(d => (d/1000).toFixed(0) + 'k')).call(g => g.selectAll('text').attr('font-size', 8));

  // ── Fig. H — CDVI extended to 2050 ──
  const cdviYears = [2024, 2029, 2034, 2050];
  const cdviVals  = [100,   71,   31,   10];

  const mH = {t:10, r:15, b:25, l:45};
  const WH = 610 - mH.l - mH.r, HH = 160 - mH.t - mH.b;
  const svgH = d3.select('#svgOutputsH').attr('width', WH+mH.l+mH.r).attr('height', 160);
  const gH = svgH.append('g').attr('transform', `translate(${mH.l},${mH.t})`);

  const xH = d3.scaleLinear().domain([2024, 2050]).range([0, WH]);
  const yH = d3.scaleLinear().domain([0, 110]).range([HH, 0]);

  gH.append('rect').attr('width', WH).attr('height', HH).attr('fill', '#f2f2f2').attr('stroke', '#b0b0b0').attr('stroke-width', 0.5);
  gH.append('line').attr('x1', 0).attr('y1', yH(75)).attr('x2', WH).attr('y2', yH(75)).attr('stroke', '#c07000').attr('stroke-dasharray', '3,2').attr('stroke-width', 0.8);
  gH.append('text').attr('x', WH-5).attr('y', yH(75)-3).attr('text-anchor', 'end').attr('font-size', 7.5).attr('fill', '#707070').text('PAU threshold (75)');
  gH.append('line').attr('x1', 0).attr('y1', yH(40)).attr('x2', WH).attr('y2', yH(40)).attr('stroke', '#c00000').attr('stroke-dasharray', '3,2').attr('stroke-width', 0.8);
  gH.append('text').attr('x', WH-5).attr('y', yH(40)-3).attr('text-anchor', 'end').attr('font-size', 7.5).attr('fill', '#707070').text('Reconstitution threshold (40)');

  // Solid line 2024-2034, dashed 2034-2050
  const solidYears = [2024, 2029, 2034], solidVals = [100, 71, 31];
  const dashYears  = [2034, 2050],        dashVals  = [31, 10];
  const lineH = d3.line().x((d, i) => xH(solidYears[i])).y(d => yH(d));
  const lineHD = d3.line().x((d, i) => xH(dashYears[i])).y(d => yH(d));
  gH.append('path').datum(solidVals).attr('fill', 'none').attr('stroke', '#c00000').attr('stroke-width', 1.8).attr('d', lineH);
  gH.append('path').datum(dashVals).attr('fill', 'none').attr('stroke', '#8b0000').attr('stroke-width', 1.4).attr('stroke-dasharray', '4,3').attr('d', lineHD);

  cdviYears.forEach((yr, idx) => {
    const xp = xH(yr), yp = yH(cdviVals[idx]);
    const isTerminal = yr === 2050;
    gH.append('circle').attr('cx', xp).attr('cy', yp).attr('r', isTerminal ? 4 : 3.5).attr('fill', isTerminal ? '#8b0000' : '#c00000').attr('stroke', 'white').attr('stroke-width', 0.5);
    gH.append('text').attr('x', xp).attr('y', yp-6).attr('text-anchor', 'middle').attr('font-size', isTerminal ? 8 : 9).attr('font-weight', 'bold').attr('fill', isTerminal ? '#8b0000' : '#1f3864').text(cdviVals[idx]);
    if (isTerminal) gH.append('text').attr('x', xp).attr('y', yp+14).attr('text-anchor', 'middle').attr('font-size', 7).attr('fill', '#8b0000').attr('font-style', 'italic').text('terminal');
  });

  gH.append('g').attr('transform', `translate(0,${HH})`).call(d3.axisBottom(xH).tickValues([2024,2029,2034,2050]).tickFormat(d3.format('d'))).call(g => g.selectAll('text').attr('font-size', 8));
  gH.append('g').call(d3.axisLeft(yH).tickValues([0,25,50,75,100])).call(g => g.selectAll('text').attr('font-size', 8));
}

// ── PAUSSCRIPT INLINE SVG RENDERER ──
// Each PUA codepoint is replaced with an inline SVG glyph drawn from the brief specs.
// Coordinates use the brief's 100-unit grid (y increases downward, baseline at y=75).

(function() {
  const G = (vw, d) => `<svg style="display:inline-block;vertical-align:middle;height:1em;width:${(vw/83).toFixed(2)}em" viewBox="0 0 ${vw} 83" fill="currentColor" aria-hidden="true">${d}</svg>`;
  const PAU_GLYPHS = new Map([
    [0xE001, G(85, '<rect x="15" y="15" width="70" height="8"/><rect x="15" y="15" width="8" height="53"/><rect x="15" y="67" width="47" height="8"/><rect x="54" y="67" width="8" height="16"/>')],
    [0xE002, G(72, '<rect x="20" y="15" width="52" height="8"/><rect x="20" y="15" width="8" height="60"/>')],
    [0xE003, G(83, '<rect x="15" y="15" width="63" height="8"/><polygon points="75,23 83,23 28,67 20,67"/><rect x="15" y="67" width="63" height="8"/>')],
    [0xE004, G(82, '<rect x="15" y="15" width="67" height="8"/><rect x="15" y="15" width="8" height="58"/><rect x="15" y="65" width="67" height="8"/><rect x="48" y="55" width="8" height="18"/>')],
    [0xE005, G(72, '<rect x="46" y="0" width="8" height="75"/><rect x="18" y="0" width="36" height="10"/><rect x="46" y="67" width="26" height="8"/>')],
    [0xE006, G(90, '<rect x="10" y="20" width="80" height="8"/><rect x="10" y="20" width="8" height="55"/><rect x="82" y="20" width="8" height="55"/><rect x="10" y="67" width="80" height="8"/>')],
    [0xE007, G(85, '<rect x="15" y="22" width="70" height="8"/><rect x="22" y="22" width="8" height="33"/><rect x="62" y="22" width="8" height="33"/>')],
    [0xE008, G(51, '<rect x="39" y="22" width="12" height="12"/><rect x="39" y="46" width="12" height="12"/>')],
  ]);
  window.renderPAUGlyphs = function() {
    document.querySelectorAll('.pau-script, .pau-sep').forEach(el => {
      if (el.querySelector('svg')) return;
      let html = '';
      for (const ch of el.textContent) {
        const svg = PAU_GLYPHS.get(ch.codePointAt(0));
        if (svg) html += svg;
        else if (ch === ' ') html += '<span style="display:inline-block;width:0.3em"></span>';
      }
      if (html) el.innerHTML = html;
    });
  };
})();

// ── LOADING AND FADE-OUT SEQUENCE ──

function dismissModal() {
  const modal = document.getElementById('modal-overlay');
  modal.style.opacity = '0';
  setTimeout(() => {
    modal.style.display = 'none';
  }, 400);
}

function advanceFromQuote() {
  const btn = document.getElementById('quote-advance-btn');
  const quote = document.getElementById('quote-screen');
  btn.disabled = true;
  quote.classList.remove('active');
  setTimeout(() => {
    quote.style.display = 'none';
    const modal = document.getElementById('modal-overlay');
    modal.style.display = 'flex';
    setTimeout(() => modal.classList.add('active'), 50);
    switchSheet('01 — Cover');
  }, 1000);
}

window.addEventListener('DOMContentLoaded', () => {
  renderCommentsPanel();
  renderPAUGlyphs();

  // Unlock the Notes tab when the final Thread 7 SR reply scrolls into view
  const finalComment = document.getElementById('thread7-final-comment');
  if (finalComment) {
    const unlockObserver = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting && !state.isNotesUnlocked) fireNotesUnlockSequence();
      });
    }, { root: document.getElementById('panel-content-area'), threshold: 0.8 });
    unlockObserver.observe(finalComment);
  }
});
