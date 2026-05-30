// ── COMMENT REGISTER SYSTEM ──
const CM = {};
const commentsDb = {
  '01 — Cover': [],
  '02 — Inputs': [],
  '03 — Assumptions': [],
  '04 — Calculations': [],
  '05 — Outputs': [],
  '06 — Methodology': [],
  'OLD_v3.2_DO_NOT_USE': []
};
const cellToCommentId = {};

function addComment(sheet, id, cell, author, text, timestamp, isPinned, replies=[]) {
  const card = { id, cell, author, text, timestamp, isPinned, replies };
  commentsDb[sheet].push(card);
  if (cell) cellToCommentId[sheet + '_' + cell] = id;
}

// ══ COMMENT DATA ══════════════════════════════════════════════════════════════════
// All editorial content lives here. Add, edit, or remove comment entries without
// touching rendering code. Structure: { sheet, id, cell, author, text, timestamp,
// isPinned, replies[] } — cell is the Excel cell reference for tooltip hover.

const COMMENT_DATA = [

  // ── 01 — Cover — YB thread (earliest, Oct 2024) ──
  { sheet: '01 — Cover', id: 'threadYB', cell: 'B5', author: 'YB', timestamp: '15/10 11:22', isPinned: false,
    text: 'MK — what\'s the current projection horizon for this model and what would it take to run a compressed scenario. asking for planning purposes.',
    replies: [
      { author: 'MK', text: 'Current horizon 2035. Compressed scenario would require revised input assumptions — specifically NMR acceleration and ASFR suppression beyond current Scenario B parameters. Technically feasible. Would need to discuss scope with you directly.', timestamp: '15/10 14:08' },
      { author: 'YB', text: 'Let\'s talk.', timestamp: '15/10 14:31' }
    ]},

  // ── 01 — Cover ──
  { sheet: '01 — Cover', id: 'A30', cell: 'A37', author: 'MK', timestamp: '14/01 08:30', isPinned: false,
    text: 'Boilerplate per CA internal document policy (Protocol 14 of 2019).\nAll analytical products from Demographic Analysis Unit carry this disclaimer regardless of content. -MK' },

  { sheet: '01 — Cover', id: 'B2', cell: 'B10', author: 'SR', timestamp: '14/01 09:30', isPinned: false,
    text: 'v4.1 supersedes CA/PAU/DEM/2024-031 (v4.0, 2024-11-18).\nKey changes: National Registry Dec 2024 population registry extract incorporated; composite attrition rate revised upward from 2.1% to 2.8% per Q4 2024 field data; cohort 15–34 outmigration reclassified per Protocol 31 of 2019 threshold.\nSee OLD_v3.2 tab for audit trail. -SR' },

  { sheet: '01 — Cover', id: 'B7', cell: 'D13', author: 'MK', timestamp: '14/01 10:15', isPinned: false,
    text: 'Distribution restricted to: Division Head, Senior Analysts (x3), CA Liaison Officer.\nDo not forward without prior authorisation from Division Head.\nExternal distribution: not authorised under any circumstances. -MK' },

  { sheet: '01 — Cover', id: 'B8', cell: 'B13', author: 'SR', timestamp: '14/01 11:00', isPinned: false,
    text: 'Approval pending. Document circulated for review 2025-01-10. No objections received as of 2025-01-14. Treating as approved pending formal sign-off. -SR' },

  { sheet: '01 — Cover', id: 'A24_1', cell: 'F24', author: 'SR', timestamp: '14/01 11:30', isPinned: false,
    text: 'These figures are consistent with CBS registry extract (Nov 2024) cross-referenced against border crossing registry movement data Q3 2024.\nVariance within acceptable ±3% margin.\nNote: CBS registry excludes persons classified non-resident under Administrative Order 277/1995. Estimated 14,000–18,000 persons annually excluded from baseline. -SR' },

  { sheet: '01 — Cover', id: 'A24_2', cell: 'F30', author: 'SR', timestamp: '14/01 11:30', isPinned: false,
    text: 'These figures are consistent with CBS registry extract (Nov 2024) cross-referenced against border crossing registry movement data Q3 2024.\nVariance within acceptable ±3% margin.\nNote: CBS registry excludes persons classified non-resident under Administrative Order 277/1995. Estimated 14,000–18,000 persons annually excluded from baseline. -SR' },

  { sheet: '01 — Cover', id: 'thread4', cell: 'E18', author: 'MK', timestamp: '03/12 10:17', isPinned: false,
    text: 'SR the −759k headline is going to mislead anyone who reads this quickly. Under-14 share going from 47.3% to 28.9% — that\'s the finding. The total population figure doesn\'t carry it. Make sure the pyramid chart leads in any briefing derived from this.',
    replies: [
      { author: 'SR', text: 'agreed on the pyramid. should we flag the reconstitution threshold? Q3 field assessment raised it, 2030 under-14 may already be approaching it. not formally verified though. -SR', timestamp: '03/12 11:45' },
      { author: 'MK', text: 'Hold on that. Reconstitution threshold comes from post-conflict recovery literature — not applicable here, there\'s no post-conflict recovery scenario in our planning horizon. Flag internally in outputs only, keep out of anything circulated.', timestamp: '03/12 13:22' },
      { author: 'SR', text: 'understood, flagged internally 👍 -SR', timestamp: '03/12 13:40' }
    ]},

  // ── 02 — Inputs ──
  { sheet: '02 — Inputs', id: 'pinned_inputs', cell: null, author: 'SR', timestamp: '04/11 08:30', isPinned: true,
    text: 'terminology note for anyone new to this model 📌\n\nASDR = Age-Specific Death Rate (deaths per 1,000 per year, per cohort)\nASFR = Age-Specific Fertility Rate (births per woman per year, per cohort)\nSurvRatio = survival ratio derived from ASDR — proportion of cohort surviving to next period\nNMR = Net Migration Rate (negative = net outmigration)\nCAU = Regional Administrative Unit\nReliability A/B/C = primary verified / field-estimated / modelled proxy\n\nfull methodology in the Methodology sheet. -SR' },

  { sheet: '02 — Inputs', id: 'thread1', cell: 'E9', author: 'MK', timestamp: '04/11 09:14', isPinned: false,
    text: 'How significant',
    replies: [
      { author: 'SR', text: '6.7× on baseline. Q4 should confirm or revise in January. UNRWA running higher in some sub-districts but not using those — methodology inconsistent with registry baseline and source is not considered reliable for planning purposes. -SR', timestamp: '04/11 11:23' },
      { author: 'MK', text: 'Correct, UNRWA figures are not an input to this model under any circumstances. Proceed with CAU. Flag in methodology as standard. Also — your column headers on the inputs tab are inconsistent with v3.8 formatting. Can you standardise before I update calcs.', timestamp: '04/11 11:31' },
      { author: 'SR', text: 'fixed!! sorry about that 😅 -SR', timestamp: '04/11 14:47' },
      { author: 'MK', text: 'Proceeding. If Q4 moves this further I\'ll need DH sign-off before Scenario B circulates. For now — good catch on the cross-reference.', timestamp: '05/11 09:08' }
    ]},

  { sheet: '02 — Inputs', id: 'G21', cell: 'B39', author: 'MK', timestamp: '04/11 11:30', isPinned: false,
    text: 'TFR 3.38 represents a significant decline from 3.91 (PCBS 2021 Survey). Trajectory consistent with observed fertility transition in comparable MENA conflict-affected populations.\nNote: Scenario B assumption in Assumptions sheet projects continued decline to 2.06 by 2035. -MK' },

  { sheet: '02 — Inputs', id: 'threadInputsNMR', cell: 'B49', author: 'SR', timestamp: '04/11 08:50', isPinned: false,
    text: 'NMR 20–24 (M) revised from -0.0081 to -0.0158 per Q3 checkpoint movement data.\nCivil Admin. Northern/Southern Crossing crossing records show accelerating net outflow for this cohort.\nProtocol 31 of 2019 permanent resettlement reclassification criteria met for estimated 34% of outflows. -SR',
    replies: [
      { author: 'MK', text: 'Confirmed. NMR revision accepted. Note: permanent resettlement reclassification affects registry headcount — these individuals will be removed from active registry on next reconciliation cycle. Net effect on P(20-24) will compound in Calculations sheet. -MK', timestamp: '04/11 09:20' }
    ]},

  { sheet: '02 — Inputs', id: 'thread6', cell: 'K9', author: 'SR', timestamp: '16/12 08:55', isPinned: false,
    text: 'Q4 field data unavailable — Southern Coastal sub-office comms down since the 12th 📵 keeping Q3 figures across all affected inputs, cells flagged. -SR',
    replies: [
      { author: 'MK', text: 'Understood. Timeline for restoration', timestamp: '16/12 10:03' },
      { author: 'SR', text: 'no confirmed timeline from CAU. -SR', timestamp: '16/12 10:28' },
      { author: 'MK', text: 'Fine. We\'ve worked with Q3 baselines before. Flag in methodology and proceed.', timestamp: '16/12 10:31' },
      { author: 'MK', text: 'SR — any update on field comms. We\'re approaching v4.1 review cycle.', timestamp: '06/01 09:12' },
      { author: 'SR', text: 'nothing yet 😕 for what it\'s worth Q3 trajectory on ASDR 0–4 and NMR 20–24 was still accelerating when we lost contact. Q4 would almost certainly revise both upward. -SR', timestamp: '06/01 11:34' },
      { author: 'MK', text: 'Noted. Carry Q3 figures as verified baseline. Add standard field verification caveat to methodology.', timestamp: '06/01 11:41' },
      { author: 'SR', text: 'on it -SR', timestamp: '06/01 11:43' }
    ]},

  // ── 03 — Assumptions ──
  { sheet: '03 — Assumptions', id: 'pinned_assumptions', cell: null, author: 'SR', timestamp: '10/11 09:00', isPinned: true,
    text: 'quick terminology for this sheet 📌\n\nTFR = Total Fertility Rate — expected children per woman over reproductive lifetime. Replacement level = 2.10\nNRR = Net Reproduction Rate — expected daughters per woman accounting for mortality. NRR below 1.0 means the population is not replacing itself\nMMR = Maternal Mortality Ratio — deaths per 100,000 live births\nSRB = Sex Ratio at Birth — male births per 100 female births, applied to births allocation\nPAU = Population Analytics Unit (this unit)\n\nScenario A = pre-Oct 2023 baseline trajectory\nScenario B = current conditions sustained\n\n-SR' },

  { sheet: '03 — Assumptions', id: 'D10', cell: 'C10', author: 'SR', timestamp: '12/11 10:15', isPinned: false,
    text: 'Scenario B ASDR 0–4: 35.10 per 1,000 p.a.\nDerived from CAU Health Sector Assessment Nov 2024, cross-referenced against MoH primary care facility data Q3 2024.\nRepresents 6.7× increase on Scenario A baseline. Consistent with documented collapse of primary healthcare infrastructure and acute nutritional deficiency prevalence in 0–4 cohort.\nQ4 2024 verification pending — field comms suspended Dec 12. -SR',
    replies: [
      { author: 'MK', text: 'SR — the 6.7× multiplier should be flagged as requiring senior sign-off before Scenario B is finalised. I have not seen a comparable revision in any previous iteration of this model.\nHolding as draft until Q4 field data available or Division Head authorises use of Q3 figure. -MK', timestamp: '12/11 10:20' }
    ]},

  { sheet: '03 — Assumptions', id: 'nmr_hdr', cell: 'A44', author: 'SR', timestamp: '12/11 08:30', isPinned: false,
    text: 'NMR — Net Migration Rate\nNet annual movement (outmigration minus in-migration) expressed as a proportion of cohort population.\nNegative value = net outmigration. Derived from border crossing registry records cross-referenced against population registry changes.\nProtocol 31 of 2019 reclassification: outmigrants meeting defined criteria are reclassified from "displaced" to "permanently resettled," affecting registry headcount on next reconciliation. -SR' },

  // ── 04 — Calculations ──
  { sheet: '04 — Calculations', id: 'pinned_calcs', cell: null, author: 'SR', timestamp: '08/12 09:00', isPinned: true,
    text: 'column note 📌\n\neach step = one 5-year projection period\ncolumns per step: base population → survivors (base × SurvRatio) → net migrants added → births added (0–4 cohort only) → projected population\nformula bar shows the calculation for whichever cell is selected\nM/F = male/female cohorts calculated separately, combined for totals\n\n-SR' },

  { sheet: '04 — Calculations', id: 'F11', cell: 'F11', author: 'SR', timestamp: '08/12 09:15', isPinned: false,
    text: 'SurvRatio_ScB_0–4 applied: 0.8365.\nRevised from Inputs sheet baseline (0.9742) per ASDR_ScB_0–4 = 35.10 ‰.\nCAU Health Sector Assessment Nov 2024. Q4 verification pending — field comms suspended Dec 12. -SR' },

  { sheet: '04 — Calculations', id: 'I31', cell: 'I31', author: 'MK', timestamp: '08/12 10:30', isPinned: false,
    text: 'ScB SurvRatio_0–4 applied consistently across M and F cohorts from Step 1 onward.\nFemale P(0–4, 2029) = 57,500. Confirm births allocation uses SRB = 1.05. -MK' },

  { sheet: '04 — Calculations', id: 'thread5', cell: 'H58', author: 'SR', timestamp: '10/12 11:08', isPinned: false,
    text: 'Births 2024–29: 143,400. Births 2029–34: 98,200. 31% decline between periods. ASFR suppression and shrinking female 15–49 cohort compounding now — each feeding the other. Annual births by 2031 below 2019 registry baseline. Within modelled range, no revision needed. -SR',
    replies: [
      { author: 'MK', text: '"Within modelled range" — reference', timestamp: '10/12 14:33' },
      { author: 'SR', text: 'Heuveline & Poch 2011, conflict-affected fertility suppression. Cambodia 1975–79 cohort data. Trajectory consistent. -SR', timestamp: '10/12 15:01' },
      { author: 'MK', text: 'Cambodia works for the mechanics. If this goes into a briefing use conflict-affected MENA populations as the comparator frame — not Southeast Asian post-conflict literature.', timestamp: '10/12 15:14' },
      { author: 'SR', text: 'noted, will adjust 👍 -SR', timestamp: '10/12 15:22' },
      { author: 'MK', text: 'Actually the compounding effect you\'ve identified here is worth flagging in the outputs summary. The model hasn\'t shown this feedback loop clearly before. Good work.', timestamp: '11/12 09:31' },
      { author: 'SR', text: 'thanks! it only became visible when I charted the cohort sizes sequentially — wasn\'t obvious from the table. glad it\'s useful 😊 -SR', timestamp: '11/12 09:45' }
    ]},

  { sheet: '04 — Calculations', id: 'N58', cell: 'N58', author: 'SR', timestamp: '10/12 11:23', isPinned: false,
    text: 'Period total births 2029–34: 98,200.\nFurther decline reflects compounding ASFR suppression and reduction in female 15–49 cohort size.\nAnnual births by 2031 now below 2019 registry baseline. Within expected range given cohort depletion — no revision required. -SR' },

  { sheet: '04 — Calculations', id: 'G15', cell: 'G15', author: 'SR', timestamp: '08/12 09:20', isPinned: false,
    text: 'Named range NMR_ScB_M_2024 returns #REF following v3.8 named range restructure.\nHardcoded value -34,944 applied — consistent with NMR_ScB_M_20_24 = -0.0840 p.a. × 83,200 × 5.\nPending fix in v4.2. Value verified against Q3 2024 MoI checkpoint movement data. -SR' },

  { sheet: '04 — Calculations', id: 'M15', cell: 'M15', author: 'MK', timestamp: '08/12 10:45', isPinned: false,
    text: 'NMR_ScB_M_20–24 = -0.0840 p.a. maintained for Step 2.\nCohort P(20–24, M) now 43% below 2024 baseline entering Step 2.\nProtocol 31 of 2019 reclassification criteria still met — permanent resettlement classification maintained. -MK' },

  { sheet: '04 — Calculations', id: 'I55', cell: 'I55', author: 'MK', timestamp: '08/12 11:00', isPinned: false,
    text: 'NRR = 0.71 per Scenario B Step 1 endpoint (2029).\nDerived per standard formula — consistent with TFR and ASFR inputs on Assumptions sheet.\nEach successive generation 29% smaller than previous under current conditions. -MK' },

  { sheet: '04 — Calculations', id: 'O52', cell: 'O52', author: 'SR', timestamp: '09/12 09:30', isPinned: false,
    text: 'Dependency ratio 0.87 per PAU internal methodology.\nExceeds PAU threshold of 0.85.\nFlag for inclusion in summary section of Outputs sheet. Next review: 2025-07-14. -SR' },

  // ── 05 — Outputs ──
  { sheet: '05 — Outputs', id: 'pinned_outputs', cell: null, author: 'SR', timestamp: '09/01 09:00', isPinned: true,
    text: 'note on CDVI 📌\n\nCDVI = Compound Demographic Viability Index — PAU internal composite metric. Combines under-14 cohort share, NRR, dependency ratio, and net outmigration rate into a single index. Baseline 2024 = 100. Methodology under divisional review — see Thread 7 below and Methodology sheet section 4.\n\nreconstitution threshold = 40 (internal PAU literature — not yet formally published)\n\n-SR' },

  { sheet: '05 — Outputs', id: 'E10', cell: 'E10', author: 'MK', timestamp: '10/01 15:15', isPinned: false,
    text: '2034 Sc.B total of 1,575,400 must be read alongside cohort breakdown.\nA population of 1,575k with under-14 share at 28.9% and 0–4 share at 5.1% is\nstructurally non-equivalent to a population of 1,575k with pre-conflict age distribution.\nThe headline number understates structural damage. The pyramid is the finding. -MK' },

  { sheet: '05 — Outputs', id: 'E17', cell: 'E17', author: 'SR', timestamp: '10/01 15:30', isPinned: false,
    text: 'NRR = 0.58 at 2034 step — extrapolated from 2029 endpoint applying continued ASFR\nsuppression and cohort depletion. Not a primary model output — treat as directional.\nNote: 2030 under-14 figure may already be below what internal literature terms the\n"reconstitution threshold." Field assessment Q3 2024 flagged this. Pending CAU\nconfirmation — holding. -SR' },

  { sheet: '05 — Outputs', id: 'E67', cell: 'E67', author: 'SR', timestamp: '10/01 15:45', isPinned: false,
    text: 'Δ% of −30.9% at 2030 marks the point at which Sc.B population falls below\ntwo-thirds of Sc.A trajectory. Rate of divergence accelerating — compound effect of\nASFR suppression and cohort depletion now reinforcing each other. -SR' },

  { sheet: '05 — Outputs', id: 'thread7', cell: 'E20', author: 'MK', timestamp: '10/01 15:02', isPinned: false,
    text: 'CDVI = 31. First time below reconstitution threshold in any PAU assessment I\'m aware of. Methodology still needs divisional sign-off so don\'t cite externally — but make sure it\'s visible in the internal summary. This is the headline finding of v4.1.',
    replies: [
      { author: 'SR', text: 'goes in executive summary or stays working doc level? -SR', timestamp: '10/01 15:44' },
      { author: 'MK', text: 'Working doc for now pending sign-off.', timestamp: '10/01 15:51' },
      { author: 'SR', text: 'for the methodology section — can you confirm the reconstitution threshold definition? want to make sure I\'m writing it up correctly. -SR', timestamp: '10/01 16:04' },
      { author: 'MK', text: 'The point below which a residential population\'s age structure and reproductive capacity are insufficient to recover to pre-disruption trajectory without sustained external intervention. Threshold of 40 derived from PAU review of comparable post-disruption assessments. Not yet published externally.', timestamp: '10/01 16:04' },
      { author: 'SR', text: 'got it, thank you 👍 -SR', timestamp: '10/01 16:05' },
      { author: 'SR', text: 'one more — does a finding at this level trigger any humanitarian referral obligation under PAU protocol? asking for the methodology section 🙏 -SR', timestamp: '10/01 16:06' },
      { author: 'MK', text: 'No. PAU produces analytical outputs only. Referral obligations sit with operational units. This document is not an operational document.', timestamp: '10/01 16:09' },
      { author: 'SR', text: 'understood, thanks for clarifying 👍 -SR', timestamp: '10/01 16:11' }
    ]},

  // ── 06 — Methodology ──
  { sheet: '06 — Methodology', id: 'I14', cell: 'H14', author: 'MK', timestamp: '13/01 09:30', isPinned: false,
    text: 'SR — the named range issue in G15 is still live in v4.1. I patched the value but the range name needs fixing before v4.2.\nIf we update NMR figures for Q4 we\'ll need to fix the range structure first or the patch breaks.\nAdding to v4.2 action items. -MK' },

  { sheet: '06 — Methodology', id: 'I21', cell: 'H21', author: 'SR', timestamp: '13/01 10:00', isPinned: false,
    text: 'Note on exclusion figure: the 14,000–18,000 annual exclusion estimate is derived from cross-referencing registry headcount against MoI movement data.\nPersons classified non-resident under Administrative Order 277/1995 include long-term absentees and family members of registry-excluded individuals.\nThese persons are not counted in P(x) baseline figures. Effect on total baseline: estimated -0.7% to -0.9%. -SR' },

  { sheet: '06 — Methodology', id: 'I30', cell: 'H30', author: 'MK', timestamp: '13/01 10:15', isPinned: false,
    text: 'No situational data available Q4. ASDR and ASFR figures are extrapolated from Q3 assessment — not field-verified. If Q4 data becomes available before next review cycle (2025-07-14), recommend v4.2 revision. Q4 data would likely revise ASDR 0–4 and NMR 20–24 further upward based on Q3 trajectory. -MK' },

  { sheet: '06 — Methodology', id: 'C52', cell: 'B52', author: 'SR', timestamp: '13/01 10:30', isPinned: false,
    text: 'Confirmed. Scenario B is a floor estimate by construction.\nThe static-conditions assumption is a modelling choice, not a prediction.\nReview committee was briefed on this point — noted in meeting minutes 2024-11-12. -SR' },

  { sheet: '06 — Methodology', id: 'C75', cell: 'B75', author: 'MK', timestamp: '14/01 08:30', isPinned: false,
    text: 'SR — should we surface this sheet in the external version?\nThe data source section and limitations are useful context.\nSuggest stripping sections 1 and 6 and distributing sections 2–5 only. -MK',
    replies: [
      { author: 'SR', text: 'will do! should we include the CDVI figure in the external version given methodology isn\'t signed off yet? -SR', timestamp: '13/01 11:02' },
      { author: 'MK', text: 'No. Internal only until sign-off.', timestamp: '13/01 11:08' },
      { author: 'SR', text: 'understood! will have the external version ready by thursday 🗓️ -SR', timestamp: '13/01 11:09' },
      { author: 'DH', text: 'Strip 1 and 6. Send remainder.', timestamp: '14/01 08:33' }
    ]},

  // ── 05 — Outputs (terminal state) ──
  { sheet: '05 — Outputs', id: 'terminal_state', cell: 'A_terminal', author: 'MK', timestamp: '10/01 16:45', isPinned: false,
    text: 'This is the terminal state the model projects under static Scenario B conditions.',
    replies: [] },

  // ── OLD_v3.2_DO_NOT_USE ──
  { sheet: 'OLD_v3.2_DO_NOT_USE', id: 'threadOld', cell: 'A6', author: 'MK', timestamp: '15/02 09:12', isPinned: false,
    text: 'These figures were presented at the Feb 2024 review meeting.\nCommittee noted they appeared "optimistic relative to field conditions."\nv4.0 initiated following that meeting. Retained in this sheet strictly for version control / audit reference. -MK' },

];

COMMENT_DATA.forEach(({ sheet, id, cell, author, text, timestamp, isPinned, replies = [] }) =>
  addComment(sheet, id, cell, author, text, timestamp, isPinned, replies)
);
