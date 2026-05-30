// ── TAB & STATE SWITCH ENGINE ──
const renderers = {
  '01 — Cover': renderCover,
  '02 — Inputs': renderInputs,
  '03 — Assumptions': renderAssumptions,
  '04 — Calculations': renderCalculations,
  '05 — Outputs': renderOutputs,
  '06 — Methodology': renderMethodology,
  'OLD_v3.2_DO_NOT_USE': renderOld,
  '07 — Notes': renderNotes
};

// ══ NAVIGATION, INTERACTION & AUDIO ══════════════════════════════════════════════

function showLockedTooltip() {
  const existing = document.getElementById('locked-tip');
  if (existing) return;
  const tip = document.createElement('div');
  tip.id = 'locked-tip';
  tip.style.cssText = 'position:fixed;bottom:44px;right:320px;background:#ffffe1;border:1px solid #b0b000;padding:4px 10px;font-size:11px;font-family:var(--font-xl);color:#333;z-index:9999;box-shadow:2px 2px 4px rgba(0,0,0,0.15);pointer-events:none;';
  tip.textContent = 'Read the comment thread first.';
  document.body.appendChild(tip);
  setTimeout(() => tip.remove(), 2000);
}

function switchSheet(targetSheet) {
  if (targetSheet === '07 — Notes' && !state.isNotesUnlocked) {
    showLockedTooltip();
    return;
  }

  // Stop pyramid animation when leaving Outputs sheet
  if (state.activeSheet === '05 — Outputs') pyramidAnimCtrl.stop();

  // 1. Save scroll and selection of current active sheet
  const gscroll = document.getElementById('gridscroll');
  if (state.activeSheet !== '07 — Notes') {
    state.scrollPositions[state.activeSheet] = {
      top: gscroll.scrollTop,
      left: gscroll.scrollLeft
    };
  }

  // 2. Clear current view (preserve chart-float divs by only clearing the table)
  const maintableEl = document.getElementById('maintable');
  if (maintableEl) maintableEl.innerHTML = '';

  // 3. Switch state
  state.activeSheet = targetSheet;

  // 4. Update Tab UI selection
  const tabs = document.querySelectorAll('#tabs-bar .tab');
  tabs.forEach(t => {
    t.classList.remove('active');
    if (t.id === 'tab-notes' && targetSheet === '07 — Notes') {
      t.classList.add('active');
    } else if (t.textContent.includes(targetSheet.split(' — ')[0]) || (t.textContent === 'OLD_v3.2_DO_NOT_USE' && targetSheet === 'OLD_v3.2_DO_NOT_USE')) {
      t.classList.add('active');
    }
  });

  // 5. Render target sheet
  renderers[targetSheet]();

  // 5b. Re-render per-sheet comments panel
  renderCommentsPanel(targetSheet);

  // 5a. Reapply header expanded/collapsed state (new renders always start hidden)
  const toggleBtn = document.getElementById('toggle-btn');
  if (toggleBtn) toggleBtn.innerHTML = state.headerCollapsed ? '▶' : '▼';
  if (!state.headerCollapsed) {
    for (let i = 1; i <= 4; i++) {
      const el = document.getElementById(`row-${i}`);
      if (el) el.style.display = '';
    }
  }

  // 6. Restore scroll & selection states
  if (targetSheet !== '07 — Notes') {
    const sPos = state.scrollPositions[targetSheet];
    gscroll.scrollTop = sPos.top;
    gscroll.scrollLeft = sPos.left;

    // Redraw active charts
    drawActiveCharts();

    // Re-highlight selection
    const savedSel = state.selectedCells[targetSheet];
    if (savedSel && savedSel.ref) {
      const allCells = document.querySelectorAll('table.xg td.c');
      allCells.forEach(td => {
        const colIdx = td.cellIndex;
        const rowIdx = td.parentNode.rowIndex;
        const colLetter = String.fromCharCode(65 + colIdx - 1);
        const cellRef = colIndexRef(colLetter, rowIdx);
        if (cellRef === savedSel.ref) {
          td.classList.add('sel');
          document.getElementById('fcell').value = cellRef;
          document.getElementById('fcontent').textContent = savedSel.formula || td.innerText.trim();
        }
      });
    }
  }

  // 6b. Key cell pulse — fires once per sheet, on first visit only
  if (!state.highlightedSheets[targetSheet]) {
    state.highlightedSheets[targetSheet] = true;
    setTimeout(() => {
      document.querySelectorAll('.key-cell').forEach(cell => {
        cell.classList.add('key-pulse');
        setTimeout(() => cell.classList.remove('key-pulse'), 1200);
      });
    }, 400);
  }

  // 7. Update status bar prompts
  const sLeft = document.getElementById('sl');
  const sRight = document.getElementById('sr');
  if (targetSheet === '07 — Notes') {
    sLeft.textContent = 'Ready';
    sRight.innerHTML = '<span class="pau-script">&#xE001;&#xE002;&#xE003;&#xE004;&#xE005;</span><span class="pau-sep">&#xE008;</span> — RESTRICTED';
  } else if (targetSheet === 'OLD_v3.2_DO_NOT_USE') {
    sLeft.textContent = 'Superseded baseline';
    sRight.innerHTML = '<span class="pau-script">&#xE001;&#xE002;&#xE003;&#xE004;&#xE005;</span><span class="pau-sep">&#xE008;</span> — RESTRICTED &nbsp;|&nbsp; Version control history';
  } else {
    const num = targetSheet.split(' — ')[0];
    sLeft.textContent = `Sheet ${num} of 06`;
    sRight.innerHTML = `<span class="pau-script">&#xE001;&#xE002;&#xE003;&#xE004;&#xE005;</span><span class="pau-sep">&#xE008;</span> — RESTRICTED &nbsp;|&nbsp; Follow the comment thread →`;
  }
  renderPAUGlyphs();
}

function selectCell(el, commentId, formula) {
  document.querySelectorAll('td.c.sel').forEach(c => c.classList.remove('sel'));
  el.classList.add('sel');

  const colIdx = el.cellIndex;
  const rowIdx = el.parentNode.rowIndex;
  const colLetter = String.fromCharCode(65 + colIdx - 1);
  const cellRef = colIndexRef(colLetter, rowIdx);

  document.getElementById('fcell').value = cellRef;
  document.getElementById('sl').textContent = cellRef;

  const fBox = document.getElementById('fcontent');
  if (formula) {
    fBox.textContent = formula;
    if (formula.includes('→  #REF!')) fBox.classList.add('err');
    else fBox.classList.remove('err');
  } else {
    fBox.textContent = el.innerText.trim().substring(0, 200);
    fBox.classList.remove('err');
  }

  state.selectedCells[state.activeSheet] = {
    ref: cellRef,
    formula: formula,
    content: el.innerText.trim()
  };

  if (commentId) {
    const card = document.getElementById('card_' + commentId);
    if (card) {
      card.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      card.classList.remove('highlight-flash');
      void card.offsetWidth; 
      card.classList.add('highlight-flash');
    }
  }
}

function saveScrollState() {
  const gscroll = document.getElementById('gridscroll');
  if (state.activeSheet !== '07 — Notes') {
    state.scrollPositions[state.activeSheet] = {
      top: gscroll.scrollTop,
      left: gscroll.scrollLeft
    };
  }
}

function toggleHeaders() {
  state.headerCollapsed = !state.headerCollapsed;
  const btn = document.getElementById('toggle-btn');
  btn.innerHTML = state.headerCollapsed ? '▶' : '▼';
  
  for (let i = 1; i <= 4; i++) {
    const el = document.getElementById(`row-${i}`);
    if (el) el.style.display = state.headerCollapsed ? 'none' : '';
  }
  drawActiveCharts();
}

