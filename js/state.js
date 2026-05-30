// ══ APPLICATION STATE ══════════════════════════════════════════════════════════════

const state = {
  activeSheet: '01 — Cover',
  selectedCells: {
    '01 — Cover': { ref: 'A1', formula: '', content: 'EXECUTIVE SUMMARY' },
    '02 — Inputs': { ref: 'A1', formula: '', content: 'BASE DATA' },
    '03 — Assumptions': { ref: 'A1', formula: '', content: 'PROJECTION ASSUMPTIONS' },
    '04 — Calculations': { ref: 'A1', formula: '', content: 'CALCULATIONS ENGINE' },
    '05 — Outputs': { ref: 'A1', formula: '', content: 'SUMMARY OUTPUTS' },
    'OLD_v3.2_DO_NOT_USE': { ref: 'A1', formula: '', content: 'SUPERSEDED' },
    '06 — Methodology': { ref: 'A1', formula: '', content: 'METHODOLOGY MANUAL' },
    '07 — Notes': { ref: '', formula: '', content: '' }
  },
  scrollPositions: {
    '01 — Cover': { top: 0, left: 0 },
    '02 — Inputs': { top: 0, left: 0 },
    '03 — Assumptions': { top: 0, left: 0 },
    '04 — Calculations': { top: 0, left: 0 },
    '05 — Outputs': { top: 0, left: 0 },
    'OLD_v3.2_DO_NOT_USE': { top: 0, left: 0 },
    '06 — Methodology': { top: 0, left: 0 },
    '07 — Notes': { top: 0, left: 0 }
  },
  isNotesUnlocked: false,
  outputsStage1Fired: false,
  headerCollapsed: true,
  commentsPanelOpen: true,
  audioContext: null,
  highlightedSheets: {}
};

// ══ GRID MARKUP HELPERS ═══════════════════════════════════════════════════════════
// cellMarkup / rowMarkup / emptyRowMarkup — called inside every renderer.

// ── EXCEL CHROME GRID BUILDERS ──

function cellMarkup(content, cls, formula, commentId, span, style, narratorNoteId) {
  const sheet = state.activeSheet;
  const actualCommentId = commentId || cellToCommentId[sheet + '_' + (formula || '')];
  const cm = actualCommentId ? (commentsDb[sheet].find(c=>c.id === actualCommentId) || { author: 'SR' }) : null;
  const tri = cm ? (cm.author === 'SR' ? ' hcg' : ' hc') : '';
  const hnMark = narratorNoteId ? ' hn' : '';
  const allCls = ['c', cls||'', tri, hnMark].filter(Boolean).join(' ');
  const fesc = (formula||'').replace(/"/g,'&quot;');

  // Narrator note takes hover priority; comment tooltip is still accessible via panel
  const hoverAttr = narratorNoteId
    ? `onmouseenter="showNote(event,'${narratorNoteId}')" onmouseleave="hideNote()"`
    : (actualCommentId ? `onmouseenter="showCM(event,'${actualCommentId}')" onmouseleave="hideCM()"` : '');
  const spanAttr = span && span > 1 ? ` colspan="${span}"` : '';
  const styleAttr = style ? ` style="${style}"` : '';
  const noteDataAttr = narratorNoteId ? ` data-note="${narratorNoteId}"` : '';
  return `<td class="${allCls}" tabindex="0"${spanAttr}${styleAttr}${noteDataAttr}
    data-f="${fesc}"
    onclick="selectCell(this,'${actualCommentId||''}','${(formula||'').replace(/'/g,"\\'")}')"
    ${hoverAttr}>${content}</td>`;
}

function rowMarkup(n, cells, trCls, style) {
  return `<tr class="${trCls||''}"${style?` style="${style}"`:''}><th class="rh">${trCls&&trCls.includes('row-meta')?'':n}</th>${cells.join('')}</tr>`;
}
function emptyRowMarkup(n, cols) {
  const cells = Array(cols).fill('').map(() =>
    `<td class="c" tabindex="0" onclick="selectCell(this,'','')" data-f=""></td>`
  );
  return `<tr><th class="rh">${n}</th>${cells.join('')}</tr>`;
}

// ══ SHEET RENDERERS ═══════════════════════════════════════════════════════════════
// One renderer per tab. Each builds maintable innerHTML via cellMarkup/rowMarkup.
// Corresponding chart draw functions are grouped below in CHART DRAW FUNCTIONS.

// ── SHEET 1: COVER RENDERER ──
