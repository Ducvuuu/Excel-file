// ── NARRATOR NOTES DATA ──
// Blue-triangle cell annotations. Key: narratorNoteId. Value: note text.

const narratorNotes = {

  // ── 01 — Cover ──
  'cover_B17_pop1575': `The projected number of registered residents in 2034 if current conditions continue. In 2024 the figure was 2,114,300. That is 538,900 fewer people — not from a single event, but from the compounding of birth rate decline, child mortality, and people leaving and being reclassified as permanently gone.`,

  'cover_C17_under14': `In 2024, nearly half the population — 47.3% — were children under 14. By 2034 that falls to 28.9%. A population gets younger when it's growing. It gets older when the conditions for having and raising children collapse.`,

  'cover_D17_nrr071': `Net Reproduction Rate. If this number is 1.0, each generation exactly replaces itself. At 0.71, each generation is 29% smaller than the one before. The decline compounds — a smaller generation of women has fewer children, who become an even smaller generation. This does not reverse quickly.`,

  'cover_E17_cdvi31': `An internal index combining birth rate, child mortality, working-age population, and institutional capacity into a single number. 100 is the 2024 baseline. The analysts' own internal threshold for a population being able to recover without sustained external intervention is 40. This projection reaches 31.`,

  // ── 02 — Inputs ──
  'inputs_E9_asdr04': `Age-specific death rate for children under five. Measures how many children per thousand die each year. This figure is based on the most recent available field data — from Q3 2024. The Q4 update was never received. Field communications with the local office were suspended on December 12, 2024. The model continues without it.`,

  'inputs_B_nmr2024': `Net Migration Rate for people aged 20–24 — the core working-age, reproductive cohort. A negative number means more people are leaving than arriving. At -8.4% annually, this cohort loses roughly one in twelve people every year. Those who leave and meet certain administrative criteria are reclassified from "displaced" — expected to return — to "permanently resettled." Once reclassified, they are removed from the population registry. They stop being counted.`,

  // ── 03 — Assumptions ──
  'assump_B10_asdr04a': `This is the baseline child death rate — how many children under five died per thousand per year before the conflict began. The number in the next column is what the model projects now.`,

  'assump_C10_asdr04b': `6.7 times higher than the baseline in the previous column. The cause is not listed in this cell. The number is.`,

  'assump_C41_tfr206': `Total Fertility Rate — the average number of children a woman is expected to have over her lifetime. The threshold at which a population replaces itself is 2.10. This figure falls below that threshold. The primary driver listed in the model: nutritional suppression of fertility in women aged 15 to 39.`,

  'assump_C42_nrr071': `Each generation 29% smaller than the last. This number is the document's thesis. Everything else — the cohort tables, the survival ratios, the migration rates — feeds into this cell.`,

  // ── 04 — Calculations ──
  'calc_H58_births1': `The total number of children born in the first five-year period, 2024 to 2029.`,

  'calc_N58_births2': `The total number of children born in the second five-year period, 2029 to 2034. A 31% decline in one decade. Two things are happening simultaneously: fewer women of reproductive age, and those women having fewer children. Each feeds the other.`,

  // ── 05 — Outputs ──
  'outputs_D17_nrr071': `Each generation 29% smaller than the last. This is the number the document was built to produce. The model does not use the word crisis. It uses this number instead.`,

  'outputs_E20_cdvi31': `The analysts' own internal threshold for a population being able to recover without sustained external intervention is 40. This number is 31. The document labels the 2050 projection "terminal." It does not explain what happens after terminal.`,

  'outputs_E19_births18200': `The number of children born per year at the end of the projection. Not a total — an annual figure. By 2034, roughly 18,000 children are born each year in a population that had 36,000 births per year a decade earlier. The model ends at 2034. The decline does not.`,

  // ── OLD_v3.2_DO_NOT_USE ──
  'old_D8_1946': `The February 2024 projection for 2030. The current model projects 1,727,800 for the same year. The difference is 219,000 people. The revision was made because the review committee described the February figures as "optimistic relative to field conditions." No one annotated the difference between the two numbers.`,

};
