// ── DEMOGRAPHIC SHARED DATA ENGINE ──
const cohorts = ['0–4','5–9','10–14','15–19','20–24','25–29','30–34','35–39','40–44','45–49','50–54','55–59','60–64','65–69','70–74','75–79','80+'];
const P_M_2024 = [178700, 175100, 157900, 93600, 83200, 77400, 76100, 46200, 37600, 31000, 24600, 19200, 23100, 16800, 10400, 7300, 4100];
const P_F_2024 = [170160, 167416, 150788, 90344, 81715, 76944, 76130, 46829, 38515, 32429, 26143, 20972, 25529, 19143, 12857, 9614, 6472];
const SurvRatio = [0.8365, 0.9944, 0.9940, 0.9859, 0.9841, 0.9820, 0.9806, 0.9794, 0.9749, 0.9667, 0.9547, 0.9366, 0.9072, 0.8565, 0.7842, 0.6981, 0.5820];
const NMR_M = [-0.0035, -0.0035, -0.0040, -0.0580, -0.0840, -0.0740, -0.0600, -0.0120, -0.0080, -0.0055, -0.0038, -0.0028, -0.0018, -0.0012, -0.0008, -0.0005, -0.0003];
const NMR_F = [-0.0035, -0.0035, -0.0040, -0.0520, -0.0740, -0.0650, -0.0530, -0.0100, -0.0065, -0.0045, -0.0030, -0.0022, -0.0015, -0.0010, -0.0007, -0.0004, -0.0002];

// Fertility and Migration detailed inputs for Inputs Tab
const asfrData = [
  ['15–19', 0.0470,  6.9, 'National Demographic & Health Survey 2022', 'A', 'G19'],
  ['20–24', 0.1680, 24.9, 'National Demographic & Health Survey 2022', 'A', null],
  ['25–29', 0.1780, 26.3, 'National Demographic & Health Survey 2022', 'A', null],
  ['30–34', 0.1430, 21.2, 'National Demographic & Health Survey 2022', 'A', null],
  ['35–39', 0.0920, 13.6, 'National Demographic & Health Survey 2022', 'A', null],
  ['40–44', 0.0400,  5.9, 'National Demographic & Health Survey 2022', 'B', null],
  ['45–49', 0.0080,  1.2, 'Modelled proxy — CBS 2021 adj.',       'C', null]
];

const nmrData = [
  ['0–4',   -0.0020, -0.0020],
  ['5–9',   -0.0020, -0.0020],
  ['10–14', -0.0025, -0.0025],
  ['15–19', -0.0104, -0.0095],
  ['20–24', -0.0158, -0.0140],
  ['25–29', -0.0133, -0.0118],
  ['30–34', -0.0102, -0.0091],
  ['35–39', -0.0063, -0.0055],
  ['40–44', -0.0042, -0.0037],
  ['45–49', -0.0030, -0.0026],
  ['50–54', -0.0022, -0.0018],
  ['55–59', -0.0018, -0.0015],
  ['60–64', -0.0012, -0.0010],
  ['65–69', -0.0008, -0.0007],
  ['70–74', -0.0006, -0.0005],
  ['75–79', -0.0004, -0.0003],
  ['80+',   -0.0002, -0.0002]
];

const nmrSources = {
  '0–4':   ['Civil Admin. Northern Crossing records 2023', 'B'],
  '5–9':   ['Civil Admin. Northern Crossing records 2023', 'B'],
  '10–14': ['Civil Admin. Northern Crossing records 2023', 'B'],
  '15–19': ['CA Border Crossing Registry 2023 / Civil Admin.', 'B'],
  '20–24': ['CA Border Crossing Registry 2023 / Civil Admin.', 'B'],
  '25–29': ['CA Border Crossing Registry 2023 / Civil Admin.', 'B'],
  '30–34': ['CA Border Crossing Registry 2023 / Civil Admin.', 'B'],
  '35–39': ['Civil Admin. Pop. Registry movement data', 'B'],
  '40–44': ['Civil Admin. Pop. Registry movement data', 'B'],
  '45–49': ['Civil Admin. Pop. Registry movement data', 'B'],
  '50–54': ['CBS residency registry cross-reference', 'B'],
  '55–59': ['CBS residency registry cross-reference', 'B'],
  '60–64': ['CBS residency registry cross-reference', 'B'],
  '65–69': ['Modelled proxy — trend extrapolation', 'C'],
  '70–74': ['Modelled proxy — trend extrapolation', 'C'],
  '75–79': ['Modelled proxy — trend extrapolation', 'C'],
  '80+':   ['Modelled proxy — trend extrapolation', 'C']
};

const dataStore = {
  M: {
    2024: [...P_M_2024],
    2029: { surv: [], nm: [], b: [], p: [], dScA: [], dPct: [] },
    2034: { surv: [], nm: [], b: [], p: [], dScA: [], dPct: [] }
  },
  F: {
    2024: [...P_F_2024],
    2029: { surv: [], nm: [], b: [], p: [], dScA: [], dPct: [] },
    2034: { surv: [], nm: [], b: [], p: [], dScA: [], dPct: [] }
  },
  interp: [] 
};

const ScA_Total_2029 = [174000, 169000, 152000, 91000, 80000, 74000, 73000, 44000, 36000, 30000, 23000, 18000, 21000, 15000, 9000, 6000, 3000];
const ScA_Total_2034 = [179000, 172000, 166000, 149000, 88000, 77000, 72000, 71000, 42000, 34000, 28000, 21000, 16000, 18000, 12000, 7000, 4000];
const Births_Alloc = { 2029: { M: 61400, F: 58470 }, 2034: { M: 41800, F: 39800 } };

// 2050 terminal state projection under static Scenario B conditions
// Under-14 share: 8.1% (52,500 / 645,000). Cohort base near-collapse reflects
// compounded ASFR suppression and reproductive-cohort hollowing beyond 2034 step.
const P_M_2050 = [5200, 8700, 12800, 16400, 22100, 18900, 11200, 14100, 24300, 42800, 36100, 27800, 20200, 14300, 16100, 8800, 7900];
const P_F_2050 = [4800, 8300, 12700, 16800, 23400, 20200, 12800, 15600, 26500, 46200, 39400, 30600, 22400, 16800, 19200, 11400, 10200];

function computeMath() {
  const sexes = ['M', 'F'];
  sexes.forEach(s => {
    const P2024 = s === 'M' ? P_M_2024 : P_F_2024;
    const NMR = s === 'M' ? NMR_M : NMR_F;
    const store2029 = dataStore[s][2029];
    const store2034 = dataStore[s][2034];

    // STEP 1
    cohorts.forEach((c, idx) => {
      let surv = idx === 0 ? 0 : (idx === 16 ? (P2024[15] * SurvRatio[15]) + (P2024[16] * SurvRatio[16]) : P2024[idx - 1] * SurvRatio[idx - 1]);
      store2029.surv.push(Math.round(surv));

      let nm = idx === 0 ? Births_Alloc[2029][s] * NMR[0] * 5 : P2024[idx - 1] * NMR[idx] * 5;
      if (s === 'M' && idx === 4) nm = -34944; 
      store2029.nm.push(Math.round(nm));

      const b = idx === 0 ? Births_Alloc[2029][s] : 0;
      store2029.b.push(b);

      const p = (idx === 0 ? b : surv) + nm;
      store2029.p.push(Math.round(p));

      const pScA = ScA_Total_2029[idx] * (s === 'M' ? 0.512 : 0.488);
      const dScA = p - pScA;
      store2029.dScA.push(Math.round(dScA));
      store2029.dPct.push(dScA / pScA);
    });

    // STEP 2
    const P2029 = store2029.p;
    cohorts.forEach((c, idx) => {
      let surv = idx === 0 ? 0 : (idx === 16 ? (P2029[15] * SurvRatio[15]) + (P2029[16] * SurvRatio[16]) : P2029[idx - 1] * SurvRatio[idx - 1]);
      store2034.surv.push(Math.round(surv));

      let nm = idx === 0 ? Births_Alloc[2034][s] * NMR[0] * 5 : P2029[idx - 1] * NMR[idx] * 5;
      store2034.nm.push(Math.round(nm));

      const b = idx === 0 ? Births_Alloc[2034][s] : 0;
      store2034.b.push(b);

      const p = (idx === 0 ? b : surv) + nm;
      store2034.p.push(Math.round(p));

      const pScA = ScA_Total_2034[idx] * (s === 'M' ? 0.512 : 0.488);
      const dScA = p - pScA;
      store2034.dScA.push(Math.round(dScA));
      store2034.dPct.push(dScA / pScA);
    });
  });

// Annual Interpolation
  cohorts.forEach((c, idx) => {
    const tot2024 = P_M_2024[idx] + P_F_2024[idx];
    const tot2029 = dataStore.M[2029].p[idx] + dataStore.F[2029].p[idx];
    const tot2034 = dataStore.M[2034].p[idx] + dataStore.F[2034].p[idx];
    const rowInterp = [];
    for (let yr = 2025; yr <= 2029; yr++) {
      rowInterp.push(Math.round(tot2024 + (tot2029 - tot2024) * ((yr - 2024)/5)));
    }
    for (let yr = 2030; yr <= 2034; yr++) {
      rowInterp.push(Math.round(tot2029 + (tot2034 - tot2029) * ((yr - 2029)/5)));
    }
    dataStore.interp.push(rowInterp);
  });
}
computeMath();
