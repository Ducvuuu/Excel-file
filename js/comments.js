// ── PERSISTENT COMMENTS PANEL RENDERER ──

// ══ COMMENTS PANEL ════════════════════════════════════════════════════════════════

function renderCommentsPanel(sheetName) {
  const panel = document.getElementById('panel-content-area');
  panel.innerHTML = '';
  panel.scrollTop = 0;

  // Update panel header to show current sheet
  const hdrSpan = document.querySelector('.panel-hdr span:first-child');
  if (hdrSpan) hdrSpan.textContent = sheetName ? `Comments — ${sheetName}` : 'Comments';

  const shComments = commentsDb[sheetName];
  if (!shComments || !shComments.length) {
    const empty = document.createElement('div');
    empty.style.cssText = 'color:#888;font-style:italic;font-size:11px;padding:16px;';
    empty.textContent = 'No comments on this sheet.';
    panel.appendChild(empty);
    return;
  }

  // Pinned first, then insertion order
  const sorted = [...shComments].sort((a, b) => (b.isPinned ? 1 : 0) - (a.isPinned ? 1 : 0));

  sorted.forEach(c => {
    const card = document.createElement('div');
    card.className = 'comment-card' + (c.author === 'DH' ? ' cm-card--dh' : '') + (c.author === 'YB' ? ' cm-card--yb' : '');
    card.id = 'card_' + c.id;
    if (c.id === 'thread7') card.setAttribute('data-thread', '7');
    card.onclick = () => focusCommentCell(sheetName, c.cell, c.id);

    const hdr = document.createElement('div');
    hdr.className = 'comment-card-hdr';

    const av = document.createElement('div');
    av.className = `avatar ${c.author.toLowerCase()}`;
    av.textContent = c.author;
    hdr.appendChild(av);

    const name = document.createElement('span');
    name.className = 'comment-author-name';
    name.textContent = c.author;
    hdr.appendChild(name);

    const time = document.createElement('span');
    time.className = 'comment-time';
    time.textContent = c.timestamp;
    hdr.appendChild(time);

    card.appendChild(hdr);

    if (c.cell) {
      const loc = document.createElement('div');
      loc.className = 'comment-loc';
      loc.textContent = `Cell: ${c.cell}`;
      card.appendChild(loc);
    }

    const txt = document.createElement('div');
    txt.className = 'comment-text';
    txt.textContent = c.text;
    card.appendChild(txt);

    if (c.replies && c.replies.length) {
      c.replies.forEach(r => {
        const rep = document.createElement('div');
        rep.className = 'reply-block' + (r.author === 'DH' ? ' cm-card--dh' : '') + (r.author === 'YB' ? ' cm-card--yb' : '');

        if (c.id === 'thread7' && r.author === 'SR' && r.timestamp === '10/01 16:11') {
          rep.id = 'thread7-final-comment';
        }

        const rhdr = document.createElement('div');
        rhdr.className = 'comment-card-hdr';

        const rav = document.createElement('div');
        rav.className = `avatar ${r.author.toLowerCase()}`;
        rav.textContent = r.author;
        rhdr.appendChild(rav);

        const rname = document.createElement('span');
        rname.className = 'comment-author-name';
        rname.textContent = r.author;
        rhdr.appendChild(rname);

        const rtime = document.createElement('span');
        rtime.className = 'comment-time';
        rtime.textContent = r.timestamp;
        rhdr.appendChild(rtime);

        rep.appendChild(rhdr);

        const rtxt = document.createElement('div');
        rtxt.className = 'comment-text';
        rtxt.textContent = r.text;
        rep.appendChild(rtxt);

        card.appendChild(rep);
      });
    }

    panel.appendChild(card);
  });

  // Re-attach IntersectionObserver unlock trigger when Outputs sheet is rendered
  if (sheetName === '05 — Outputs' && !state.isNotesUnlocked) {
    const finalComment = document.getElementById('thread7-final-comment');
    if (finalComment) {
      const obs = new IntersectionObserver((entries) => {
        entries.forEach(e => {
          if (e.isIntersecting && !state.isNotesUnlocked) fireNotesUnlockSequence();
        });
      }, { root: panel, threshold: 0.8 });
      obs.observe(finalComment);
    }
  }
}

// ── NARRATOR NOTE TOOLTIP ──
function showNote(event, noteId) {
  const text = (typeof narratorNotes !== 'undefined') ? narratorNotes[noteId] : null;
  if (!text) return;
  const tip = document.getElementById('narrator-tip');
  if (!tip) return;
  document.getElementById('narrator-tip-body').textContent = text;
  const rx = Math.min(event.clientX + 14, window.innerWidth - 340);
  const ry = Math.min(event.clientY + 14, window.innerHeight - 200);
  tip.style.left = rx + 'px';
  tip.style.top = ry + 'px';
  tip.classList.add('vis');
}

function hideNote() {
  const tip = document.getElementById('narrator-tip');
  if (tip) tip.classList.remove('vis');
}

function focusCommentCell(sheet, cellRef, id) {
  if (state.activeSheet !== sheet) {
    switchSheet(sheet);
  }

  if (cellRef) {
    const allCells = document.querySelectorAll('table.xg td.c');
    allCells.forEach(td => {
      const colIdx = td.cellIndex;
      const rowIdx = td.parentNode.rowIndex;
      const colLetter = String.fromCharCode(65 + colIdx - 1);
      const ref = colIndexRef(colLetter, rowIdx);
      if (ref === cellRef) {
        td.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' });
        td.click();
      }
    });
  }
}

function colIndexRef(letter, index) {
  return letter + index;
}

function toggleComments(open) {
  state.commentsPanelOpen = open;
  const panel = document.getElementById('comments-panel');
  if (open) panel.classList.remove('collapsed');
  else panel.classList.add('collapsed');
  drawActiveCharts();
}

function showCM(event, id) {
  const cm = CM[id] || cellCommentLookup(id); if (!cm) return;
  const tip = document.getElementById('ctip');
  document.getElementById('ctip-auth').textContent = cm.author + ':';
  document.getElementById('ctip-body').textContent = cm.text;

  const rx = Math.min(event.clientX + 14, window.innerWidth - 300);
  const ry = Math.min(event.clientY + 14, window.innerHeight - 200);
  tip.style.left = rx + 'px';
  tip.style.top = ry + 'px';
  tip.classList.add('vis');

  const card = document.getElementById('card_' + id);
  if (card) {
    card.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    card.classList.add('highlight-flash');
  }
}
function hideCM() {
  document.getElementById('ctip').classList.remove('vis');
  document.querySelectorAll('.comment-card').forEach(c => c.classList.remove('highlight-flash'));
}
function cellCommentLookup(id) {
  for (const sh in commentsDb) {
    const c = commentsDb[sh].find(cm => cm.id === id);
    if (c) return c;
  }
  return null;
}

// ── UNLOCKING TRIGGER OBSERVER ──
function checkThreadClimax() {
  if (state.isNotesUnlocked) return;
  const card7 = document.getElementById('card_thread7');
  if (!card7) return;

  const rect = card7.getBoundingClientRect();
  const panel = document.getElementById('panel-content-area');
  const panelRect = panel.getBoundingClientRect();

  if (rect.bottom <= panelRect.bottom && rect.top >= panelRect.top) {
    fireNotesUnlockSequence();
  }
}

function fireNotesUnlockSequence() {
  state.isNotesUnlocked = true;
  initAudio();
  
  const tabNotes = document.getElementById('tab-notes');
  setTimeout(() => {
    tabNotes.classList.add('shake-anim');
    
    setTimeout(() => {
      tabNotes.classList.remove('shake-anim');
      const badge = document.getElementById('lock-badge');
      badge.textContent = '🔓';
      badge.className = 'crack-fall-anim';
      playMechanicalClick();

      setTimeout(() => {
        tabNotes.classList.add('unlocked');
        tabNotes.innerHTML = `<span style="display:none">🔓</span><i>*TOP SECRET — Open only at the end*</i>`;
        tabNotes.classList.add('tab-unlocked-glow');

        setTimeout(() => {
          tabNotes.classList.remove('tab-unlocked-glow');
          tabNotes.innerHTML = `<i>🔓 TOP SECRET — Open only at the end</i>`;
        }, 1000);

      }, 600);

    }, 400);

  }, 500);
}

// ── WEB AUDIO SYNTHESIZER ──
function initAudio() {
  try {
    window.AudioContext = window.AudioContext || window.webkitAudioContext;
    state.audioContext = new AudioContext();
  } catch (e) {
    console.warn('Web Audio API not supported.');
  }
}

function playMechanicalClick() {
  if (!state.audioContext) return;
  if (document.hidden) return; 

  const ctx = state.audioContext;
  const now = ctx.currentTime;

  const osc1 = ctx.createOscillator();
  const osc2 = ctx.createOscillator();
  const gainNode = ctx.createGain();

  osc1.type = 'triangle';
  osc1.frequency.setValueAtTime(120, now);
  osc1.frequency.exponentialRampToValueAtTime(800, now + 0.04);

  osc2.type = 'sine';
  osc2.frequency.setValueAtTime(4500, now);
  osc2.frequency.exponentialRampToValueAtTime(100, now + 0.08);

  gainNode.gain.setValueAtTime(0.3, now);
  gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.12);

  osc1.connect(gainNode);
  osc2.connect(gainNode);
  gainNode.connect(ctx.destination);

  osc1.start(now);
  osc2.start(now);
  osc1.stop(now + 0.15);
  osc2.stop(now + 0.15);
}
