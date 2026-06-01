let _notesContent = '';

function renderNotes() {
  document.getElementById('grid-container').style.display = 'none';
  const overlay = document.getElementById('notes-overlay');
  overlay.style.display = '';
  overlay.innerHTML = `
    <div class="notes-container">
      <div class="notes-meta">
        Last modified: [unknown user] — 2025-01-15  03:17
      </div>
      <div class="notes-body"
           id="notes-body-content"
           contenteditable="true"
           spellcheck="true"
           data-placeholder="[Author note pending — content to be inserted manually]"></div>
    </div>
  `;
  const body = document.getElementById('notes-body-content');
  if (_notesContent) body.innerHTML = _notesContent;
  body.addEventListener('input', () => { _notesContent = body.innerHTML; });
  document.getElementById('fcell').value = '';
  document.getElementById('fcontent').textContent = '';
  document.getElementById('sl').textContent = 'Ready';
}
