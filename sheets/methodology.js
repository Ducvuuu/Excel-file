function renderMethodology() {
  const rows = [];
  const ncols = 9;
  const colWidths = [32, 180, 120, 110, 100, 150, 110, 90, 350, 110];

  let cg = `<colgroup><col style="width:32px">`;
  colWidths.slice(1).forEach(w => cg += `<col style="width:${w}px">`);
  cg += `</colgroup>`;

  const letters = ['A','B','C','D','E','F','G','H','I'];
  let thead = `<thead><tr style="height:0; visibility:hidden;">`;
  thead += `<th style="width:${colWidths[0]}px; min-width:${colWidths[0]}px; max-width:${colWidths[0]}px; padding:0; border:0; height:0;"></th>`;
  for(let i = 1; i <= ncols; i++) {
    thead += `<td style="width:${colWidths[i]}px; min-width:${colWidths[i]}px; max-width:${colWidths[i]}px; padding:0; border:0; height:0;"></td>`;
  }
  thead += `</tr><tr><th class="corner-cell"><span class="row-toggle-btn" id="toggle-btn" onclick="toggleHeaders()">▶</span></th>`;
  letters.forEach(l => thead += `<th class="ch">${l}</th>`);
  thead += `</tr></thead>`;

  rows.push(`<tr id="row-1" style="display:none"><th class="rh">1</th>${cellMarkup('Population Analytics Unit — Demographic Analysis Branch', 'inst-hdr b', '', '', ncols)}</tr>`);
  rows.push(`<tr id="row-2" style="display:none"><th class="rh">2</th>${cellMarkup('<span class="pau-script">&#xE003;&#xE001;&#xE006;&#xE004;&#xE002;&#xE007;</span><span class="pau-sep">&#xE008;</span><span class="pau-script">&#xE001;&#xE005;&#xE002;&#xE004;&#xE007;&#xE003;&#xE006;&#xE001;</span>', 'inst-heb', '', '', ncols)}</tr>`);
  rows.push(`<tr id="row-3" style="display:none"><th class="rh">3</th>${Array(ncols).fill('').map(()=>`<td class="c inst-heb"></td>`).join('')}</tr>`);
  rows.push(`<tr id="row-4" style="display:none"><th class="rh">4</th>${cellMarkup('<span class="pau-script">&#xE001;&#xE002;&#xE003;&#xE004;&#xE005;</span><span class="pau-sep">&#xE008;</span> — RESTRICTED  |  For Authorized Recipients Only  |  Not for External Distribution or Citation', 'classif b', '', '', ncols)}</tr>`);

  rows.push(rowMarkup(5, [cellMarkup('METHODOLOGY, DATA SOURCES & DOCUMENT CONTROL  |  CA/PAU/DEM/2025-003 v4.1', 'inst-hdr b', '', '', ncols)]));
  rows.push(rowMarkup(6, [cellMarkup('Internal Reference Document  |  Not for External Citation  |  Population Analytics Unit — Strategic Planning Division', 'inst-heb', '', '', ncols)]));
  rows.push(rowMarkup(7, Array(ncols).fill('').map(()=>`<td class="c"></td>`)));

  // SECTION 1
  rows.push(rowMarkup(8, [cellMarkup('SECTION 1 — DOCUMENT CONTROL & VERSION LOG', 'sec b', '', '', ncols)]));

  const subH1 = [
    cellMarkup('Version', 'hdr ctr b'), cellMarkup('Date', 'hdr ctr'), cellMarkup('Prepared by', 'hdr ctr'), cellMarkup('Reviewed by', 'hdr ctr'),
    cellMarkup('Approved by', 'hdr ctr'), cellMarkup('Supersedes', 'hdr ctr'), cellMarkup('Projection horizon', 'hdr ctr'), cellMarkup('Key changes', 'hdr ctr'),
    cellMarkup('Status', 'hdr ctr')
  ];
  rows.push(rowMarkup(9, subH1));

  rows.push(rowMarkup(10, [
    cellMarkup('v1.0', 'b'), cellMarkup('2024-01-08', 'ctr lt'), cellMarkup('MK', 'ctr'), cellMarkup('—', 'ctr lt'), cellMarkup('[REDACTED]', 'ctr'), cellMarkup('—', 'ctr lt'), cellMarkup('2040', 'ctr'),
    cellMarkup('Initial model. Base year 2023. Aug 2023 PCBS registry extract used as population baseline. Five standard demographic variables. Composite attrition rate: 1.20% p.a.', 'lt'),
    cellMarkup('Superseded', 'i lt ctr')
  ]));

  rows.push(rowMarkup(11, [
    cellMarkup('v2.0', 'b alt'), cellMarkup('2024-03-15', 'ctr lt alt'), cellMarkup('SR', 'ctr alt'), cellMarkup('MK', 'ctr alt'), cellMarkup('[REDACTED]', 'ctr alt'), cellMarkup('v1.0', 'ctr lt alt'), cellMarkup('2040', 'ctr alt'),
    cellMarkup('Projection horizon extended from 2035 to 2040 per divisional request. ASFR inputs updated to National Registry 2022 DHS Southern Coastal Strip Subsample. NMR cohort 20–24 revised from -0.0081 to -0.0120 per updated checkpoint data. Composite attrition rate: 1.41% p.a.', 'lt alt'),
    cellMarkup('Superseded', 'i lt ctr alt')
  ]));

  rows.push(rowMarkup(12, [
    cellMarkup('v3.0', 'b'), cellMarkup('2024-06-22', 'ctr lt'), cellMarkup('MK', 'ctr'), cellMarkup('SR', 'ctr'), cellMarkup('[REDACTED]', 'ctr'), cellMarkup('v2.0', 'ctr lt'), cellMarkup('2035', 'ctr'),
    cellMarkup('Projection horizon rolled back from 2040 to 2035. Review committee noted <i>"not suitable for current reporting cycle."</i> ASDR 0–4 revised upward from 5.21 to 18.40 per updated Civil Admin. health coordination data Q2 2024. Composite attrition rate: 1.88% p.a.', 'lt'),
    cellMarkup('Superseded', 'i lt ctr')
  ]));

  rows.push(rowMarkup(13, [
    cellMarkup('v3.2', 'b alt'), cellMarkup('2024-07-30', 'ctr lt alt'), cellMarkup('SR', 'ctr alt'), cellMarkup('MK', 'ctr alt'), cellMarkup('[REDACTED]', 'ctr alt'), cellMarkup('v3.0', 'ctr lt alt'), cellMarkup('2035', 'ctr alt'),
    cellMarkup('Minor revision. NMR cohort 15–19 revised from -0.0104 to -0.0310 per Q2 2024 border movement data. TFR trajectory revised downward — nutritional status assessment Q2 2024 indicates accelerating ASFR suppression in cohorts 15–29. Composite attrition rate: 2.10% p.a. Retained as audit reference in OLD_v3.2 tab.', 'lt alt'),
    cellMarkup('Superseded — audit ref', 'i ctr alt', '', '', 1, 'color:#c07000;')
  ]));

  rows.push(rowMarkup(14, [
    cellMarkup('v3.8', 'b'), cellMarkup('2024-09-04', 'ctr lt'), cellMarkup('SR', 'ctr'), cellMarkup('—', 'ctr lt'), cellMarkup('[REDACTED]', 'ctr'), cellMarkup('v3.2', 'ctr lt'), cellMarkup('2035', 'ctr'),
    cellMarkup('Named range restructure — cohort-specific NMR ranges renamed from NMR_ScB_M_[year] to NMR_ScB_M_[cohort] convention. Some cross-sheet references broken (see CohComp_ScB!G15 — NMR 20–24 Male hardcoded pending fix). ASDR 0–4 further revised to 27.60 per Q3 preliminary health data. Composite attrition rate: 2.41% p.a.', 'lt', '', 'I14'),
    cellMarkup('Superseded', 'i lt ctr')
  ]));

  rows.push(rowMarkup(15, [
    cellMarkup('v4.0', 'b alt'), cellMarkup('2024-11-18', 'ctr lt alt'), cellMarkup('MK', 'ctr alt'), cellMarkup('SR', 'ctr alt'), cellMarkup('[REDACTED]', 'ctr alt'), cellMarkup('v3.8', 'ctr lt alt'), cellMarkup('2035', 'ctr alt'),
    cellMarkup('Major revision. ASDR 0–4 revised to 35.10 per CAU Health Sector Assessment Nov 2024 — represents 6.7× increase on Scenario A baseline. NMR cohort 20–24 revised to -0.0840 per Q3 checkpoint movement data; Protocol 31 of 2019 permanent resettlement reclassification criteria applied. TFR Scenario B revised to 2.06 — below replacement threshold. Composite attrition rate: 2.80% p.a.', 'lt alt'),
    cellMarkup('Superseded', 'i lt ctr alt')
  ]));

  rows.push(rowMarkup(16, [
    cellMarkup('v4.1', 'b totals-bg'), cellMarkup('2025-01-14', 'ctr lt totals-bg'), cellMarkup('MK / SR', 'ctr totals-bg'), cellMarkup('SR / MK', 'ctr totals-bg'), cellMarkup('[REDACTED]', 'ctr totals-bg'), cellMarkup('v4.0 (CA/PAU/DEM/2024-031)', 'ctr lt totals-bg'), cellMarkup('2035', 'ctr totals-bg'),
    cellMarkup('National Registry Dec 2024 population registry extract incorporated — base population figures updated across all cohorts. Q4 2024 field assessment data unavailable (Southern Coastal Strip Field Office field communications suspended Dec 12 2024) — Q3 figures maintained with B reliability flag. No change to attrition rate. Composite attrition rate: 2.80% p.a. Current version.', 'lt totals-bg'),
    cellMarkup('CURRENT', 'b totals-bg ctr', '', '', 1, 'color:#1f3864;')
  ]));

  rows.push(rowMarkup(17, [
    cellMarkup('Composite attrition rate — trajectory', 'b births-bg i'),
    cellMarkup('v1.0: 1.20%', 'births-bg i ctr', '', '', 2),
    cellMarkup('→ v4.1: 2.80%', 'births-bg i ctr', '', '', 2),
    cellMarkup('+133% increase across model versions. Rate reflects compound of ASDR, NMR, and ASFR changes per version.', 'births-bg lt i', '', '', 4)
  ], 'row-meta'));
  rows.push(rowMarkup(18, Array(ncols).fill('').map(()=>`<td class="c" style="border-bottom: 1.5px solid #d8d8d8; background:#fff;"></td>`), 'row-meta', 'style="height:8px"'));

  // SECTION 2
  rows.push(rowMarkup(19, [cellMarkup('SECTION 2 — DATA SOURCES & RELIABILITY RATINGS', 'sec b', '', '', ncols)]));

  const subH2 = [
    cellMarkup('Source', 'hdr ctr b'), cellMarkup('Issuing body', 'hdr ctr'), cellMarkup('Type', 'hdr ctr'), cellMarkup('Date / period', 'hdr ctr'),
    cellMarkup('Variables sourced', 'hdr ctr'), cellMarkup('Access', 'hdr ctr'), cellMarkup('Description', 'hdr ctr', '', '', 2),
    cellMarkup('Reliability', 'hdr ctr')
  ];
  rows.push(rowMarkup(20, subH2));

  rows.push(rowMarkup(21, [
    cellMarkup('Population Registry — Nov 2024 extract', 'b'),
    cellMarkup('Population Registry Authority', 'ctr lt'),
    cellMarkup('Administrative registry', 'ctr lt'),
    cellMarkup('Nov 2024', 'ctr lt'),
    cellMarkup('P(x) baseline — cohorts 0–4 through 65–69', 'lt'),
    cellMarkup('Internal — restricted distribution', 'ctr lt'),
    cellMarkup('headcount by age cohort and sex. Excludes persons classified non-resident under Administrative Order 277/1995. Est. 14,000–18,000 persons annually excluded.', 'lt', '', 'I21', 2),
    cellMarkup('A', 'b ctr')
  ]));

  rows.push(rowMarkup(22, [
    cellMarkup('CBS Mid-Year Population Estimates 2023', 'b alt'),
    cellMarkup('Central Bureau of Statistics', 'ctr lt alt'),
    cellMarkup('Statistical estimate', 'ctr lt alt'),
    cellMarkup('2023', 'ctr lt alt'),
    cellMarkup('P(x) baseline — cohorts 50–54 through 65–69 (registry-adjusted)', 'lt alt'),
    cellMarkup('Internal', 'ctr lt alt'),
    cellMarkup('CBS mid-year estimates cross-referenced against population registry. Used where registry data quality is rated B or below.', 'lt alt', '', '', 2),
    cellMarkup('A', 'b ctr alt')
  ]));

  rows.push(rowMarkup(23, [
    cellMarkup('National Demographic and Health Survey — Southern Coastal Strip Subsample 2022', 'b'),
    cellMarkup('Central Bureau of Statistics', 'ctr lt'),
    cellMarkup('Survey', 'ctr lt'),
    cellMarkup('2022 (n=1,847)', 'ctr lt'),
    cellMarkup('ASFR by cohort (women 15–49) — Scenario A baseline', 'lt'),
    cellMarkup('Internal', 'ctr lt'),
    cellMarkup('Age-specific fertility rates for women 15–49. Southern Coastal Strip subsample. Sample size limits precision for cohorts 40–49 — reliability B for those cohorts.', 'lt', '', '', 2),
    cellMarkup('A / B', 'b ctr')
  ]));

  rows.push(rowMarkup(24, [
    cellMarkup('CBS Mortality Tables 2022', 'b alt'),
    cellMarkup('Central Bureau of Statistics', 'ctr lt alt'),
    cellMarkup('Life table', 'ctr lt alt'),
    cellMarkup('2022', 'ctr lt alt'),
    cellMarkup('ASDR by cohort — Scenario A baseline (cohorts 35–39 and above)', 'lt alt'),
    cellMarkup('Internal', 'ctr lt alt'),
    cellMarkup('Abridged life table. Used as Scenario A baseline for adult and elderly cohorts. Survival ratios derived per standard formula: SurvRatio(x) = (1 − ASDR(x)/1000)^5.', 'lt alt', '', '', 2),
    cellMarkup('A', 'b ctr alt')
  ]));

  rows.push(rowMarkup(25, [
    cellMarkup('CAU Health Sector Assessment — Nov 2024', 'b'),
    cellMarkup('Health Coordination Branch', 'ctr lt'),
    cellMarkup('Field assessment', 'ctr lt'),
    cellMarkup('Nov 2024 (Q3)', 'ctr lt'),
    cellMarkup('ASDR 0–4 Scenario B revision; MMR Scenario B revision; ASFR suppression coefficient', 'lt'),
    cellMarkup('Internal — CAU restricted', 'ctr lt'),
    cellMarkup('Facility-level assessment of primary healthcare infrastructure status. Basis for Scenario B ASDR 0–4 revision to 35.10 ‰. Cross-referenced against MoH primary care facility data Q3 2024. Q4 update unavailable — see Southern Coastal Strip Field Office row.', 'lt', '', '', 2),
    cellMarkup('B', 'b ctr')
  ]));

  rows.push(rowMarkup(26, [
    cellMarkup('CA Border Crossing Registry — 2023–2024', 'b alt'),
    cellMarkup('Ministry of Interior — Border Crossing Authority', 'ctr lt alt'),
    cellMarkup('Movement registry', 'ctr lt alt'),
    cellMarkup('2023–Q3 2024', 'ctr lt alt'),
    cellMarkup('NMR by cohort — Scenario B; permanent resettlement reclassification counts', 'lt alt'),
    cellMarkup('Internal', 'ctr lt alt'),
    cellMarkup('Checkpoint movement records — Northern, Southern, and Western Border crossing points. Net outmigration figures derived from crossings minus returns. Protocol 31 of 2019 reclassification applied to outmigrants meeting threshold criteria.', 'lt alt', '', '', 2),
    cellMarkup('B', 'b ctr alt')
  ]));

  rows.push(rowMarkup(27, [
    cellMarkup('Israel Tax Authority — Withholding Data 2023–2024', 'b'),
    cellMarkup('Israel Tax Authority', 'ctr lt'),
    cellMarkup('Administrative data', 'ctr lt'),
    cellMarkup('2023–2024', 'ctr lt'),
    cellMarkup('Working-age cohort economic activity proxy — cross-reference for NMR 20–34', 'lt'),
    cellMarkup('Internal — cross-agency', 'ctr lt'),
    cellMarkup('Tax withholding records for Southern Coastal Strip workers with administrative work permits. Used as secondary cross-reference to validate NMR estimates for working-age cohorts. Not used as primary input.', 'lt', '', '', 2),
    cellMarkup('B', 'b ctr')
  ]));

  rows.push(rowMarkup(28, [
    cellMarkup('CBS Population Projections Methodology — Internal Working Paper', 'b alt'),
    cellMarkup('Central Bureau of Statistics — Demographic Division', 'ctr lt alt'),
    cellMarkup('Methodology document', 'ctr lt alt'),
    cellMarkup('2019', 'ctr lt alt'),
    cellMarkup('Cohort-component projection methodology; survival ratio derivation; NRR formula', 'lt alt'),
    cellMarkup('Internal', 'ctr lt alt'),
    cellMarkup('Standard CBS cohort-component methodology applied throughout this model. NRR formula per CBS 2019 specification: NRR = Σ(ASFR(x) × SurvRatio_F(x)) / SRB.', 'lt alt', '', '', 2),
    cellMarkup('A', 'b ctr alt')
  ]));

  rows.push(rowMarkup(29, [
    cellMarkup('Heuveline & Poch (2011) — Demographic literature', 'b'),
    cellMarkup('Population Studies (journal)', 'ctr lt'),
    cellMarkup('Academic reference', 'ctr lt'),
    cellMarkup('2011', 'ctr lt'),
    cellMarkup('ASFR suppression coefficient under nutritional stress — Scenario B adjustment', 'lt'),
    cellMarkup('Open access', 'ctr lt'),
    cellMarkup('"The Phoenix Population: Demographic Crisis and Rebound in Cambodia." Conflict-affected fertility suppression coefficient applied to Scenario B ASFR revisions for cohorts 15–39.', 'lt', '', '', 2),
    cellMarkup('A (method) / B (appl)', 'b ctr', '', '', 1, 'font-size: 8px;')
  ]));

  rows.push(rowMarkup(30, [
    cellMarkup('Southern Coastal Strip Sub-Office Field Assessment — Q4 2024', 'b redbg'),
    cellMarkup('Southern Coastal Strip Sub-Office', 'ctr lt redbg'),
    cellMarkup('Field assessment', 'ctr lt redbg'),
    cellMarkup('Q4 2024', 'ctr lt redbg'),
    cellMarkup('ASDR 0–4 Q4 verification; ASFR Q4 revision; NMR Q4 update', 'lt redbg'),
    cellMarkup('UNAVAILABLE', 'ctr red b redbg'),
    cellMarkup('Field communications suspended Dec 12 2024. Q4 assessment not received. Q3 figures maintained as working estimates. Reliability downgraded to B for all ASDR and ASFR figures pending Q4 confirmation.', 'lt redbg', '', 'I30', 2),
    cellMarkup('UNAVAILABLE', 'b ctr red redbg')
  ]));

  rows.push(rowMarkup(31, [
    cellMarkup('Reliability ratings: A = primary source, verified. B = field-estimated or single-source cross-reference. C = modelled proxy. Do not cite B/C figures in external briefings without explicit data quality caveat. Per PAU internal protocol.', 'lt i', '', '', ncols)
  ], 'row-meta'));
  rows.push(rowMarkup(32, Array(ncols).fill('').map(()=>`<td class="c"></td>`)));

  // SECTION 3
  rows.push(rowMarkup(33, [cellMarkup('SECTION 3 — VARIABLE DEFINITIONS & PROJECTION METHODOLOGY', 'sec b', '', '', ncols)]));
  rows.push(rowMarkup(34, [cellMarkup('3.1 — Demographic Rate Definitions', 'sec2 b', '', '', ncols)]));

  rows.push(rowMarkup(35, [
    cellMarkup('ASDR(x)', 'b'),
    cellMarkup('Age-Specific Death Rate. Deaths per 1,000 population per annum within a defined 5-year age cohort (x). Derived via abridged life table from regional health coordination data and CBS vital statistics. Used to calculate survival ratio: SurvRatio(x) = (1 − ASDR(x)/1000)^5. Scenario B values revised per CAU Health Sector Assessment Nov 2024 — see Assumptions sheet for full per-cohort table.', 'lt', '', '', 6),
    cellMarkup('SurvRatio(x) = (1 − ASDR(x)/1000)^5', 'lt font-code', '', '', 1, 'font-family:\'Courier New\', monospace; font-size:9.5px;'),
    cellMarkup('Deaths per 1,000 p.a.', 'ctr lt')
  ]));

  rows.push(rowMarkup(36, [
    cellMarkup('ASFR(x)', 'b alt'),
    cellMarkup('Age-Specific Fertility Rate. Live births per woman per year within a defined 5-year age cohort (x), women aged 15–49. TFR is derived as Σ(ASFR(x) × 5) across all cohorts 15–49. Scenario B revisions reflect nutritional status assessments and conflict-affected fertility suppression per Heuveline & Poch (2011). Below a caloric sufficiency threshold of 70% of WHO minimum daily requirement (2,100 kcal/day), sustained suppression of ovulation is documented in the literature; suppression coefficient applied to cohorts 15–39.', 'lt alt', '', '', 6),
    cellMarkup('TFR = Σ(ASFR(x) × 5)', 'lt alt font-code', '', '', 1, 'font-family:\'Courier New\', monospace; font-size:10px;'),
    cellMarkup('Births per woman per year', 'ctr lt alt')
  ]));

  rows.push(rowMarkup(37, [
    cellMarkup('TFR', 'b'),
    cellMarkup('Total Fertility Rate. Expected number of children born per woman over her reproductive lifetime, assuming current age-specific rates hold constant. Replacement threshold: 2.10 (adjusted above 2.0 for pre-reproductive mortality and sex ratio at birth). Scenario A TFR: 3.38. Scenario B TFR: 2.06 (transiting replacement threshold circa 2030). Scenario B TFR projected to decline further if nutritional suppression continues — not modelled in current version.', 'lt', '', '', 6),
    cellMarkup('TFR = Σ(ASFR(x) × 5), x ∈ [15,49]', 'lt font-code', '', '', 1, 'font-family:\'Courier New\', monospace; font-size:9.5px;'),
    cellMarkup('Children per woman', 'ctr lt')
  ]));

  rows.push(rowMarkup(38, [
    cellMarkup('NMR(x)', 'b alt'),
    cellMarkup('Net Migration Rate. Net annual population movement (outmigration minus in-migration) expressed as a proportion of cohort population. Negative value = net outmigration. Derived from border crossing registry records cross-referenced against population registry changes. Protocol 31 of 2019 reclassification criteria: outmigrants whose residential unit viability rating falls below 40% of pre-conflict baseline are reclassified from "displaced" to "permanently resettled." Registry effect: permanently resettled individuals removed from active headcount at next reconciliation cycle. See UNHCR classification methodology (2019) for comparative framework.', 'lt alt', '', '', 6),
    cellMarkup('NM(x) = P(x,t) × NMR(x)', 'lt alt font-code', '', '', 1, 'font-family:\'Courier New\', monospace; font-size:9.5px;'),
    cellMarkup('Proportion of cohort p.a.', 'ctr lt alt')
  ]));

  rows.push(rowMarkup(39, [
    cellMarkup('NRR', 'b'),
    cellMarkup('Net Reproduction Rate. Expected number of daughters born per woman over her reproductive lifetime, accounting for female mortality before end of reproductive period. NRR < 1.0 indicates the population is not replacing itself and will decline in the absence of net in-migration. NRR = 0.71 under Scenario B at 2029 projection endpoint — implies each successive generation is 29% smaller than the previous. Standard CBS 2019 formula applied.', 'lt', '', '', 6),
    cellMarkup('NRR = Σ(ASFR(x) × SurvRatio_F(x)) / SRB', 'lt font-code', '', '', 1, 'font-family:\'Courier New\', monospace; font-size:9px;'),
    cellMarkup('Daughters per woman', 'ctr lt')
  ]));

  rows.push(rowMarkup(40, [
    cellMarkup('SRB', 'b alt'),
    cellMarkup('Sex Ratio at Birth. Male births per 100 female births. Applied as a constant across all projection periods and scenarios — SRB is a biological ratio not affected by the conditions modelled in Scenario B. Value: 1.05 (105 male births per 100 female births). Used to allocate total projected births into male and female 0–4 cohort entries.', 'lt alt', '', '', 6),
    cellMarkup('Male births = Total births × (SRB / (1 + SRB))', 'lt alt font-code', '', '', 1, 'font-family:\'Courier New\', monospace; font-size:8.5px;'),
    cellMarkup('Male births / 100 female births', 'ctr lt alt')
  ]));

  rows.push(rowMarkup(41, [
    cellMarkup('CDVI', 'b'),
    cellMarkup('Compound Demographic Viability Index. Non-standard PAU internal composite index. Weighted combination of NRR (weight 0.35), dependency ratio adjusted (weight 0.25), working-age cohort retention rate (weight 0.25), and Institutional Continuity Score proxy (weight 0.15). Scaled 0–100 where 100 = 2024 baseline conditions. Methodology pending divisional sign-off. Not for use in external publications without approval. 2034 Scenario B value: 31.', 'lt', '', '', 6),
    cellMarkup('=ROUND((NRR×35)+(DepRatio_adj×25)+(WA_retention×25)+(ICS_proxy×15),0)', 'lt font-code', '=ROUND((NRR_t*35)+(DepRatio_adj_t*25)+(WA_retention_t*25)+(ICS_proxy_t*15),0)', '', 1, 'font-family:\'Courier New\', monospace; font-size:8px;'),
    cellMarkup('Index 0–100', 'ctr lt')
  ]));

  rows.push(rowMarkup(42, Array(ncols).fill('').map(()=>`<td class="c"></td>`)));
  rows.push(rowMarkup(43, [cellMarkup('3.2 — Cohort-Component Projection Methodology', 'sec2 b', '', '', ncols)]));

  rows.push(rowMarkup(44, [cellMarkup('The cohort-component method projects population by applying age- and sex-specific rates of mortality, fertility, and migration to a base population, advancing the population forward in five-year steps. For each step, the surviving population of each cohort is calculated by applying the relevant survival ratio; net migrants are added or subtracted; and births are calculated from the female reproductive cohorts and added to the youngest age group.', 'lt', '', '', ncols)]));
  rows.push(rowMarkup(45, [cellMarkup('Two scenarios are projected in parallel. Scenario A applies baseline (pre-October 2023) demographic rates as a counterfactual trajectory. Scenario B applies rates derived from current field assessments and represents the projected trajectory under continuation of conditions prevailing as of Q3–Q4 2024. The delta between Scenario A and Scenario B at each projection step represents the estimated demographic effect of current conditions relative to the baseline.', 'lt alt', '', '', ncols)]));
  rows.push(rowMarkup(46, [cellMarkup('Annual estimates are derived by linear interpolation between five-year step endpoints. These interpolated values are used for reporting purposes and for chart generation in the Outputs sheet. The cohort-component calculations themselves run in five-year steps only.', 'lt', '', '', ncols)]));
  rows.push(rowMarkup(47, [cellMarkup('The open-ended terminal cohort (80+) is treated as a cumulative group. The terminal survival ratio (SurvRatio_terminal = 0.5820) is applied to the existing 80+ population; survivors from the 75–79 cohort are added each period. The 80+ cohort therefore grows as a proportion of total population across the projection horizon, reflecting both aging of younger cohorts and the open-ended accumulation structure.', 'lt alt', '', '', ncols)]));
  rows.push(rowMarkup(48, Array(ncols).fill('').map(()=>`<td class="c"></td>`)));

  // SECTION 4
  rows.push(rowMarkup(49, [cellMarkup('SECTION 4 — LIMITATIONS & CAVEATS', 'sec b', '', '', ncols)]));

  rows.push(rowMarkup(50, [
    cellMarkup('C-01', 'b'),
    cellMarkup('Population figures for cohorts 20–34 are modelled estimates for Q4 2024. Field verification unavailable since December 12 2024. Q3 2024 figures maintained. Reliability rating B.', 'lt', '', '', 7),
    cellMarkup('Moderate', 'b ctr flag-mod')
  ]));

  rows.push(rowMarkup(51, [
    cellMarkup('C-02', 'b alt'),
    cellMarkup('ASDR figures for cohorts 0–4 through 15–19 under Scenario B are derived from a single field assessment source (CAU Health Sector Assessment Nov 2024). Independent verification not available. Q4 update pending.', 'lt alt', '', '', 7),
    cellMarkup('Moderate', 'b ctr flag-mod alt')
  ]));

  rows.push(rowMarkup(52, [
    cellMarkup('C-03', 'b'),
    cellMarkup('Scenario B assumes static continuation of Q3–Q4 2024 conditions across the full projection horizon 2024–2035. The model does not incorporate escalation scenarios. Scenario B projections are therefore floor estimates — actual outcomes under deteriorating conditions would produce more adverse trajectories.', 'lt', '', 'C52', 7),
    cellMarkup('High', 'b ctr flag-high')
  ]));

  rows.push(rowMarkup(53, [
    cellMarkup('C-04', 'b alt'),
    cellMarkup('The Compound Demographic Viability Index (CDVI) is a non-standard internal metric. Weighting methodology has not been subject to external peer review. CDVI values should not be cited externally or used as a basis for public-facing analysis without divisional sign-off.', 'lt alt', '', '', 7),
    cellMarkup('High', 'b ctr flag-high alt')
  ]));

  rows.push(rowMarkup(54, [
    cellMarkup('C-05', 'b'),
    cellMarkup('NMR estimates for cohorts 15–34 under Scenario B incorporate the Protocol 31 of 2019 permanent resettlement reclassification. Approximately 38% of the NMR revision for cohort 20–24 reflects this reclassification. The reclassification affects population registry headcount — reclassified individuals are removed from the active registry at the next reconciliation cycle. The modelled population figures reflect registry headcount, not total persons with historical ties to the territory.', 'lt', '', '', 7),
    cellMarkup('Moderate', 'b ctr flag-mod')
  ]));

  rows.push(rowMarkup(55, [
    cellMarkup('C-06', 'b alt'),
    cellMarkup('Annual interpolation values in the CohComp_ScB sheet are linear approximations. Non-linear effects (compounding fertility suppression, accelerating outmigration) are not captured in interpolated figures. Five-year step endpoint values should be treated as primary outputs.', 'lt alt', '', '', 7),
    cellMarkup('Low', 'b ctr flag-low alt')
  ]));

  rows.push(rowMarkup(56, [
    cellMarkup('C-07', 'b'),
    cellMarkup('One named range reference in CohComp_ScB!G15 remains broken following v3.8 restructure. Cell value hardcoded as -34,944 pending named range fix in v4.2. Value verified against Q3 2024 MoI checkpoint data. Net effect on total population figures: <0.1%.', 'lt', '', '', 7),
    cellMarkup('Low', 'b ctr flag-low')
  ]));

  rows.push(rowMarkup(57, Array(ncols).fill('').map(()=>`<td class="c"></td>`)));

  // SECTION 5
  rows.push(rowMarkup(58, [cellMarkup('SECTION 5 — GLOSSARY', 'sec b', '', '', ncols)]));

  const subH3 = [
    cellMarkup('Term', 'hdr ctr b'), cellMarkup('Definition', 'hdr ctr', '', '', 7), cellMarkup('Source', 'hdr ctr')
  ];
  rows.push(rowMarkup(59, subH3));

  rows.push(rowMarkup(60, [
    cellMarkup('Age cohort', 'b'),
    cellMarkup('A defined five-year age group used as the unit of analysis in cohort-component projection. Cohorts: 0–4, 5–9, 10–14 … 75–79, 80+.', 'lt', '', '', 7),
    cellMarkup('Standard demographic', 'lt ctr i')
  ]));

  rows.push(rowMarkup(61, [
    cellMarkup('Cohort-component method', 'b alt'),
    cellMarkup('Standard demographic projection methodology that advances population by age cohort through sequential application of mortality (survival ratios), fertility (ASFR applied to female reproductive cohorts), and migration (NMR) rates. See Section 3.2.', 'lt alt', '', '', 7),
    cellMarkup('CBS 2019', 'lt ctr i alt')
  ]));

  rows.push(rowMarkup(62, [
    cellMarkup('Displaced (outmigration classification)', 'b'),
    cellMarkup('Classification applied to persons who have left the territory but are assessed as likely to return. Displaced persons retain active status in the population registry. Distinguished from "permanently resettled" by return probability assessment per Protocol 31 of 2019 criteria.', 'lt', '', '', 7),
    cellMarkup('Protocol 31 of 2019', 'lt ctr i')
  ]));

  rows.push(rowMarkup(63, [
    cellMarkup('Permanently resettled (outmigration classification)', 'b alt'),
    cellMarkup('Classification applied to outmigrants whose residential unit viability rating at origin falls below 40% of pre-conflict baseline and whose return within the modelling horizon is assessed as structurally unlikely. Persons reclassified as permanently resettled are removed from the active population registry at the next reconciliation cycle. See UNHCR classification methodology (2019) for comparative framework.', 'lt alt', '', '', 7),
    cellMarkup('Protocol 31 of 2019', 'lt ctr i alt')
  ]));

  rows.push(rowMarkup(64, [
    cellMarkup('Intergenerational knowledge transfer efficiency', 'b', '', '', 1, 'background:#fffef0;'),
    cellMarkup('Non-standard PAU internal sub-index. Measures the operational integrity of educational and civil registration institutions as a proxy for the rate at which cultural, professional, and institutional knowledge is transmitted between generations. Component of CDVI (weight incorporated within ICS proxy, 0.15). Decline in this sub-index indicates structural impairment to human capital formation that is not captured by standard demographic rates.', 'lt', '', '', 7, 'background:#fffef0;'),
    cellMarkup('PAU internal', 'lt ctr i', '', '', 1, 'background:#fffef0;')
  ]));

  rows.push(rowMarkup(65, [
    cellMarkup('Institutional continuity score (ICS)', 'b alt', '', '', 1, 'background:#fffef0;'),
    cellMarkup('Non-standard PAU internal composite sub-index. Aggregate measure of civilian institutional functionality including educational facility operation rate, civil registration capacity, and local governance operational status. Used as a proxy for long-run human capital formation trajectory. ICS decline is not reversible on the same timescale as demographic rate improvements — institutional reconstruction typically requires 8–15 years post-conflict (World Bank, 2018). Component of CDVI (weight 0.15).', 'lt alt', '', '', 7, 'background:#fffef0;'),
    cellMarkup('PAU internal / World Bank 2018', 'lt ctr i alt', '', '', 1, 'background:#fffef0; font-size:8px;')
  ]));

  rows.push(rowMarkup(66, [
    cellMarkup('Institutional memory erosion', 'b', '', '', 1, 'background:#fffef0;'),
    cellMarkup('Functional consequence of sustained ICS decline. Refers to the progressive loss of specialised knowledge, procedural competence, and organisational capacity within civilian institutions, occurring when trained personnel emigrate or are lost and replacement training cannot occur at equivalent rates. Not directly modelled as a rate variable — captured implicitly through ICS proxy trajectory.', 'lt', '', '', 7, 'background:#fffef0;'),
    cellMarkup('PAU internal', 'lt ctr i', '', '', 1, 'background:#fffef0;')
  ]));

  rows.push(rowMarkup(67, [
    cellMarkup('Net Reproduction Rate (NRR)', 'b alt'),
    cellMarkup('Expected number of daughters born per woman over her reproductive lifetime, accounting for female mortality before end of reproductive period. NRR = 1.0 indicates exact replacement. NRR < 1.0 indicates the population will decline without net in-migration. Under Scenario B, NRR reaches 0.71 at the 2029 projection step — implying each successive generation is 29% smaller than the previous.', 'lt alt', '', '', 7),
    cellMarkup('CBS 2019', 'lt ctr i alt')
  ]));

  rows.push(rowMarkup(68, [
    cellMarkup('Population registry', 'b'),
    cellMarkup('Administrative database recording the legal residential status of all persons in the Southern Coastal Strip and Northern Administrative Zone. Basis for baseline population figures in this model. Population registry changes — including registration of births, deaths, and address changes — require administrative approval. Registry is updated on a reconciliation cycle basis. Persons absent from the territory at the time of the baseline census were not recorded and do not hold registry status.', 'lt', '', '', 7),
    cellMarkup('[REDACTED]', 'lt ctr i')
  ]));

  rows.push(rowMarkup(69, [
    cellMarkup('Permanent resettlement reclassification', 'b alt'),
    cellMarkup('Administrative procedure under Protocol 31 of 2019 by which outmigrants meeting defined criteria are reclassified from displaced to permanently resettled status, resulting in removal from the active population registry at the next reconciliation cycle. Criteria include: residential unit viability at origin below 40% of pre-conflict baseline; continuous absence exceeding 24 months; no active return application on file. Approximately 38% of NMR revision for cohort 20–24 under Scenario B reflects Protocol 2019 reclassification.', 'lt alt', '', '', 7),
    cellMarkup('Protocol 31 of 2019', 'lt ctr i alt')
  ]));

  rows.push(rowMarkup(70, [
    cellMarkup('Replacement threshold', 'b'),
    cellMarkup('The Total Fertility Rate (TFR) at which a population exactly replaces itself across generations, accounting for pre-reproductive mortality and the sex ratio at birth. For Southern Coastal Strip population: 2.10 (slightly above the theoretical 2.0 due to male birth excess and under-5 mortality). Scenario B projects TFR crossing below 2.10 circa 2030.', 'lt', '', '', 7),
    cellMarkup('Standard demographic', 'lt ctr i')
  ]));

  rows.push(rowMarkup(71, Array(ncols).fill('').map(()=>`<td class="c"></td>`)));

  // SECTION 6
  rows.push(rowMarkup(72, [cellMarkup('SECTION 6 — RESPONSIBLE OFFICERS & DISTRIBUTION', 'sec b', '', '', ncols)]));
  rows.push(rowMarkup(73, [cellMarkup('Model Owner', 'b'), cellMarkup('MK — Population Analytics Unit, Strategic Planning Division', '', '', '', 8)]));
  rows.push(rowMarkup(74, [cellMarkup('Technical Review', 'b alt'), cellMarkup('SR — Population Analytics Unit, Strategic Planning Division', 'alt', '', '', 8)]));
  rows.push(rowMarkup(75, [cellMarkup('Division Head', 'b'), cellMarkup('[REDACTED]', '', '', 'C75', 8)]));
  rows.push(rowMarkup(76, [cellMarkup('Authorising Officer', 'b alt'), cellMarkup('[REDACTED]', 'alt', '', '', 8)]));
  rows.push(rowMarkup(77, [cellMarkup('Distribution List', 'b'), cellMarkup('[REDACTED]', '', '', '', 8)]));
  rows.push(rowMarkup(78, [cellMarkup('External Distribution', 'b alt'), cellMarkup('Not authorised', 'alt b red', '', '', 8)]));

  rows.push(rowMarkup(79, Array(ncols).fill('').map(()=>`<td class="c"></td>`)));
  rows.push(rowMarkup(80, [cellMarkup('CA/PAU/DEM/2025-003  |  v4.1  |  2025-01-14  |  Methodology & Metadata  |  <span class="pau-script">&#xE001;&#xE002;&#xE003;&#xE004;&#xE005;</span><span class="pau-sep">&#xE008;</span> — RESTRICTED', 'lt i', '', '', ncols, 'font-size:9px;color:#909090;text-align:center;height:24px;')]));

  document.getElementById('maintable').innerHTML = cg + thead + `<tbody>${rows.join('')}</tbody>`;
}

// ── SHEET 7: UNLOCKED SLATE NOTES RENDERER ──
