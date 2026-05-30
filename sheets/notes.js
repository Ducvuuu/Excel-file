function renderNotes() {
  document.getElementById('gridscroll').innerHTML = `
    <div class="notes-container">
      <div class="notes-meta">
        Last modified: [unknown user] — 2025-01-15  03:17
      </div>
      <div class="notes-body">
        <p style="text-align:center; color:#aaaaaa; font-style:italic;">
          [Author note pending — content to be inserted manually]
        </p>
      </div>
    </div>
  `;
  document.getElementById('fcell').value = '';
  document.getElementById('fcontent').textContent = '';
  document.getElementById('sl').textContent = 'Ready';
}
