let _notesGlitchInterval = null;

function renderNotes() {
  if (_notesGlitchInterval) { clearInterval(_notesGlitchInterval); _notesGlitchInterval = null; }

  document.getElementById('grid-container').style.display = 'none';
  const overlay = document.getElementById('notes-overlay');
  overlay.style.display = '';
  overlay.innerHTML = `
    <div class="notes-container">
      <div class="notes-header">
        Last modified by: <span class="glitch-name" id="corrupted-name">▒▒▒▒▒▒▒▒▒▒▒▒</span> — 2026-05-18 03:17
      </div>

      <div class="notes-body">
        <p>Well, thank you for making it here, I guess :))</p>

        <p>I planned to make an extensive essay here actually, arguing that the next kind of genocide, arguably already happening right now, won't be carried out through outright killing and eliminating the living, but by <span class="aesthetic-bold">creating the conditions where the would-be people could never be born</span>: poverty, terrible living conditions, the non-existence of hospitals and other critical health infrastructure... Thanks to the newly found capacity of the modern bureaucratic state: the ability to project the future through <span class="aesthetic-highlight">demographic modelling, like what this hypothetical spreadsheet is doing right now</span>, and more importantly, the continuity, with sufficient political will, to sustain that effort for a long, long time, across years and many decades.</p>

        <p>Which maybe even makes it a worse version of Arendt's "banality of evil." Eichmann at least still knew the destination of the trains he organised: the death camp, quite obvious, the final resolution was no secret to him. But this? When the people organising and carrying it out are literally just doing Excel for modelling, Word for administrative orders... literally very ordinary, mundane things every white collar worker has been doing. It's even harder to see the guilt, to know who the bad guy is here.</p>

        <p>Genocide is easy to spot when it happens in a graphic way. But this, I don't even know what to call it. Social engineering? Demographic engineering? <span class="aesthetic-bold">The result is pretty much the same at the end: the erasure of a community, a culture, a way of life</span>, along with the disappearance of the people who carried them.</p>

        <p>And even if it's not outright murder causing the suffering, does that make it more morally acceptable? Less evil? Not to me. Maybe this is just the archivist/anthropologist/sociologist in me speaking, but human society and culture are wonderful, and I have this burning desire to know all of it. Or to quote someone whose name I've forgotten: a sociologist's curiosity to <em>"look into people's closed doors to see what's inside."</em> (I genuinely think this every time I see a closed door, like an intrusive thought :))</p>

        <p>So beside my own empathy and humanity, the knowledge of a group of people's language, culture, way of life feels sacred to me. Not in the sense of a cold-blooded researcher treating society as a subject of study, with absolute objectivity, but something closer to an ethnologist. Maybe even more than that: a burning desire to devour what's on their mind, what's inside their "internal universe," the mundane things: how a father loves his child, how they do groceries, what their worldview is. Because think about it: we humans are the only species with such a thing. <span class="aesthetic-highlight">An internal world forever unknown to the outer universe</span>, remaining so until the end of time, across all the unimaginable vastness of space, and yet ordinary, small, weak humans still contain such a miracle.</p>

        <p>Hence it is such a crime to erase that heritage from the Earth in any way, regardless of the means. Maybe that's why I made this. Just a small act of trying to stop something inevitable. But am I selfish for that?</p>

        <p>Anyway. The wonderful thing about creating something yourself is that you don't really have to justify it, no citations, no defending your points, because this creation is my world, and I don't need to justify it in any way. I guess :))</p>

        <p>Just remember this, source: trust me :)):</p>

        <div class="aesthetic-quote">
          The next genocide will be carried out not through blood and steel, but through Excel, Word, and PowerPoint.<span class="notes-cursor">|</span>
        </div>
      </div>
    </div>
  `;

  const glitchEl = document.getElementById('corrupted-name');
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%&*<>';
  const nameLength = 22;
  _notesGlitchInterval = setInterval(() => {
    let scrambled = '';
    for (let i = 0; i < nameLength; i++) {
      if (i === 3 || i === 7 || i === 13 || i === 17) {
        scrambled += (Math.random() > 0.5) ? ' ' : chars[Math.floor(Math.random() * chars.length)];
      } else if (i === 4 || i === 21) {
        scrambled += (Math.random() > 0.5) ? (i === 4 ? '(' : ')') : chars[Math.floor(Math.random() * chars.length)];
      } else {
        scrambled += chars[Math.floor(Math.random() * chars.length)];
      }
    }
    glitchEl.textContent = scrambled;
    glitchEl.style.opacity = Math.random() > 0.92 ? '0.4' : '1';
  }, 50);

  document.getElementById('fcell').value = '';
  document.getElementById('fcontent').textContent = '';
  document.getElementById('sl').textContent = 'Ready';
}
