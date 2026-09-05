/**
 * ONE PIECE GRAND LINE LOGBOOK & BOUNTY TRACKER - APP LOGIC
 */

// Initial Seed Data fallback (ensures offline / local file protocol compatibility)
const DEFAULT_CREW = [
  {
    id: "luffy",
    name: "Monkey D. Luffy",
    epithet: "Straw Hat Luffy",
    role: "Captain",
    bounty: 3000000000,
    devilFruit: {
      name: "Hito Hito no Mi, Model: Nika",
      type: "Mythical Zoan",
      awakened: true
    },
    haki: ["Conqueror's", "Armament", "Observation"],
    dream: "To find the One Piece and become King of the Pirates",
    quote: "If you don't take risks, you can't create a future!",
    origin: "East Blue (Foosha Village)",
    image: "https://images.unsplash.com/photo-1578632767115-351597cf2477?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: "zoro",
    name: "Roronoa Zoro",
    epithet: "Pirate Hunter",
    role: "Swordsman",
    bounty: 1111000000,
    devilFruit: null,
    haki: ["Conqueror's", "Armament", "Observation"],
    dream: "To become the World's Greatest Swordsman",
    quote: "Scars on the back are a swordsman's shame.",
    origin: "East Blue (Shimotsuki Village)",
    image: "https://images.unsplash.com/photo-1563089145-599997674d42?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: "nami",
    name: "Nami",
    epithet: "Cat Burglar",
    role: "Navigator",
    bounty: 366000000,
    devilFruit: null,
    haki: [],
    dream: "To draw a complete map of the entire world",
    quote: "Life is like a pencil that will surely run out, but will leave the beautiful writing of life.",
    origin: "East Blue (Cocoyasi Village)",
    image: "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: "usopp",
    name: "Usopp",
    epithet: "God Usopp",
    role: "Sniper",
    bounty: 500000000,
    devilFruit: null,
    haki: ["Observation"],
    dream: "To become a brave warrior of the sea",
    quote: "There comes a time when a man has to stand and fight!",
    origin: "East Blue (Syrup Village)",
    image: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: "sanji",
    name: "Sanji (Vinsmoke)",
    epithet: "Stealth Black / Black Leg",
    role: "Cook",
    bounty: 1032000000,
    devilFruit: null,
    haki: ["Armament", "Observation"],
    dream: "To find the All Blue ocean",
    quote: "Men who can't wipe away the tears from a woman's eyes aren't real men.",
    origin: "North Blue (Germa Kingdom)",
    image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: "chopper",
    name: "Tony Tony Chopper",
    epithet: "Cotton Candy Lover",
    role: "Doctor",
    bounty: 1000,
    devilFruit: {
      name: "Hito Hito no Mi (Human-Human Fruit)",
      type: "Zoan",
      awakened: false
    },
    haki: [],
    dream: "To become a doctor capable of curing any disease",
    quote: "I am a monster, but I will become a doctor who can cure anything!",
    origin: "Grand Line (Drum Island)",
    image: "https://images.unsplash.com/photo-1535268647677-300dbf3d78d1?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: "robin",
    name: "Nico Robin",
    epithet: "Devil Child",
    role: "Archaeologist",
    bounty: 930000000,
    devilFruit: {
      name: "Hana Hana no Mi (Flower Fruit)",
      type: "Paramecia",
      awakened: false
    },
    haki: ["Armament"],
    dream: "To uncover the True History (Rio Poneglyph) of the Void Century",
    quote: "I want to live! Take me out to the sea with you!",
    origin: "West Blue (Ohara)",
    image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: "franky",
    "name": "Franky (Cutty Flam)",
    epithet: "Cyborg Franky",
    role: "Shipwright",
    bounty: 394000000,
    devilFruit: null,
    haki: [],
    dream: "To build and sail a dream ship (Thousand Sunny) to the ends of the earth",
    quote: "SUPER! Existing can never be a crime!",
    origin: "South Blue (Water 7)",
    image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: "brook",
    name: "Brook",
    epithet: "Soul King",
    role: "Musician",
    bounty: 383000000,
    devilFruit: {
      name: "Yomi Yomi no Mi (Revive Fruit)",
      type: "Paramecia",
      awakened: true
    },
    haki: [],
    dream: "To fulfill his promise and reunite with Laboon at Reverse Mountain",
    quote: "Yo-ho-ho-ho! Even if I lose my flesh and bones, my promise remains!",
    origin: "West Blue",
    image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: "jinbe",
    name: "Jinbe",
    epithet: "Knight of the Sea",
    role: "Helmsman",
    bounty: 1100000000,
    devilFruit: null,
    haki: ["Armament", "Observation"],
    dream: "To see fish-men and humans live in peace and harmony under the sun",
    quote: "It is not death you should fear, but dishonor in failure to protect your friends!",
    origin: "Grand Line (Fish-Man Island)",
    image: "https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=600&auto=format&fit=crop&q=80"
  }
];

// App State
let crewData = [];
let currentFilter = 'all';
let searchQuery = '';
let sfxEnabled = true;

// Audio Synthesizer via Web Audio API
const audioCtx = (typeof window !== 'undefined' && (window.AudioContext || window.webkitAudioContext)) ? new (window.AudioContext || window.webkitAudioContext)() : null;

function playSound(type) {
  if (!sfxEnabled || !audioCtx) return;
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }

  const now = audioCtx.currentTime;
  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();
  osc.connect(gain);
  gain.connect(audioCtx.destination);

  if (type === 'coin') {
    // High gold coin chime
    osc.type = 'sine';
    osc.frequency.setValueAtTime(987.77, now); // B5
    osc.frequency.exponentialRampToValueAtTime(1318.51, now + 0.1); // E6
    gain.gain.setValueAtTime(0.2, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
    osc.start(now);
    osc.stop(now + 0.35);
  } else if (type === 'recruit') {
    // Fanfare chime
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(523.25, now); // C5
    osc.frequency.setValueAtTime(659.25, now + 0.1); // E5
    osc.frequency.setValueAtTime(783.99, now + 0.2); // G5
    gain.gain.setValueAtTime(0.25, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.5);
    osc.start(now);
    osc.stop(now + 0.5);
  } else if (type === 'click') {
    // Soft click
    osc.type = 'sine';
    osc.frequency.setValueAtTime(440, now);
    gain.gain.setValueAtTime(0.08, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
    osc.start(now);
    osc.stop(now + 0.08);
  }
}

// Utility: Format Bounty as Berry Currency
function formatBerry(amount) {
  return '฿ ' + Number(amount).toLocaleString('en-US');
}

// Initialize Application
document.addEventListener('DOMContentLoaded', async () => {
  loadData();
  setupEventListeners();
  renderAll();
});

// Load Crew Data from JSON or LocalStorage
async function loadData() {
  const localSaved = localStorage.getItem('op_crew_members');
  if (localSaved) {
    try {
      crewData = JSON.parse(localSaved);
      updateStats();
      renderBounties();
      renderDevilFruits();
      return;
    } catch (e) {
      console.warn("Using default crew data:", e);
    }
  }

  try {
    const res = await fetch('data/crew.json');
    if (res.ok) {
      crewData = await res.json();
    } else {
      crewData = [...DEFAULT_CREW];
    }
  } catch (err) {
    crewData = [...DEFAULT_CREW];
  }

  updateStats();
  renderBounties();
  renderDevilFruits();
}

// Update Top Stats Banner
function updateStats() {
  const totalBounty = crewData.reduce((acc, member) => acc + Number(member.bounty || 0), 0);
  const totalElem = document.getElementById('total-bounty-val');
  const countElem = document.getElementById('crew-count-val');

  if (totalElem) totalElem.textContent = formatBerry(totalBounty);
  if (countElem) countElem.textContent = `${crewData.length} Pirates`;
}

// Render Bounty Posters
function renderBounties() {
  const grid = document.getElementById('bounty-grid');
  if (!grid) return;

  const filtered = crewData.filter(member => {
    const matchesRole = currentFilter === 'all' || (member.role && member.role.toLowerCase().includes(currentFilter.toLowerCase()));
    const query = searchQuery.toLowerCase();
    const matchesSearch = !query || 
      member.name.toLowerCase().includes(query) ||
      (member.epithet && member.epithet.toLowerCase().includes(query)) ||
      (member.origin && member.origin.toLowerCase().includes(query));
    return matchesRole && matchesSearch;
  });

  if (filtered.length === 0) {
    grid.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 60px 20px; color: var(--text-muted);">
        <p style="font-size: 1.5rem; font-family: var(--font-heading); color: var(--accent-gold); margin-bottom: 8px;">No Wanted Posters Found</p>
        <p>No pirates matched your filter or search query. Try another keyword!</p>
      </div>
    `;
    return;
  }

  grid.innerHTML = filtered.map(member => `
    <article class="bounty-card" onclick="openDossier('${member.id || member.name}')">
      <div class="poster-header">WANTED</div>
      <div class="poster-status">DEAD OR ALIVE</div>
      
      <div class="poster-image-wrap">
        <img src="${member.image || 'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=600'}" alt="${member.name}" class="poster-image" loading="lazy">
      </div>

      <div class="poster-body">
        <div class="poster-name">${member.name.toUpperCase()}</div>
        <div class="poster-epithet">${member.epithet || 'Pirate'}</div>
        
        <div class="poster-bounty-wrap">
          <div class="poster-bounty-label">BOUNTY</div>
          <div class="poster-bounty-amount">${formatBerry(member.bounty)} -</div>
        </div>

        <div>
          <span class="poster-badge">${member.role}</span>
        </div>
      </div>
    </article>
  `).join('');
}

// Render Devil Fruits Catalog
function renderDevilFruits() {
  const grid = document.getElementById('devil-fruit-grid');
  if (!grid) return;

  const fruitUsers = crewData.filter(m => m.devilFruit);

  grid.innerHTML = fruitUsers.map(member => {
    const fruit = member.devilFruit;
    const typeClass = fruit.type.toLowerCase().includes('zoan') ? 'type-zoan' : 
                     fruit.type.toLowerCase().includes('logia') ? 'type-logia' : 'type-paramecia';
    return `
      <div class="fruit-card">
        <div class="fruit-header">
          <h3 class="fruit-name">${fruit.name}</h3>
          <span class="fruit-type ${typeClass}">${fruit.type}</span>
        </div>
        <div class="fruit-user">Wielder: <strong>${member.name}</strong> (${member.role})</div>
        <p style="font-size: 0.85rem; color: var(--text-muted);">
          ${fruit.awakened ? '✨ <strong>Awakened Power Achieved!</strong>' : 'Standard Manifestation'}
        </p>
        <div class="fruit-quote">"${member.quote || 'My power will protect my friends!'}"</div>
      </div>
    `;
  }).join('');
}

function renderAll() {
  updateStats();
  renderBounties();
  renderDevilFruits();
}

// Event Listeners
function setupEventListeners() {
  // Tab Switching
  const navTabs = document.querySelectorAll('.nav-tab');
  navTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      playSound('click');
      navTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const targetTab = tab.getAttribute('data-tab');
      document.querySelectorAll('.tab-content').forEach(content => {
        content.classList.remove('active');
      });
      const activeContent = document.getElementById(`tab-${targetTab}`);
      if (activeContent) activeContent.classList.add('active');
    });
  });

  // Search Filter
  const searchInput = document.getElementById('search-input');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value;
      renderBounties();
    });
  }

  // Filter Chips
  const filterChips = document.querySelectorAll('.filter-chip');
  filterChips.forEach(chip => {
    chip.addEventListener('click', () => {
      playSound('click');
      filterChips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      currentFilter = chip.getAttribute('data-role');
      renderBounties();
    });
  });

  // Sound FX Toggle
  const sfxBtn = document.getElementById('sfx-toggle');
  if (sfxBtn) {
    sfxBtn.addEventListener('click', () => {
      sfxEnabled = !sfxEnabled;
      sfxBtn.textContent = sfxEnabled ? '🔊 Sound: ON' : '🔇 Sound: OFF';
      showToast(sfxEnabled ? 'Sound FX Enabled' : 'Sound FX Muted');
    });
  }

  // Recruit Modal Controls
  const openRecruitBtn = document.getElementById('btn-open-recruit');
  const recruitModal = document.getElementById('recruit-modal');
  const closeRecruitBtn = document.getElementById('modal-close-btn');

  if (openRecruitBtn && recruitModal) {
    openRecruitBtn.addEventListener('click', () => {
      playSound('coin');
      recruitModal.classList.add('active');
    });
  }

  if (closeRecruitBtn && recruitModal) {
    closeRecruitBtn.addEventListener('click', () => {
      recruitModal.classList.remove('active');
    });
  }

  // Dossier Modal Close
  const dossierModal = document.getElementById('dossier-modal');
  const closeDossierBtn = document.getElementById('dossier-close-btn');
  if (closeDossierBtn && dossierModal) {
    closeDossierBtn.addEventListener('click', () => {
      dossierModal.classList.remove('active');
    });
  }

  // Close modals on outside click
  window.addEventListener('click', (e) => {
    if (e.target === recruitModal) recruitModal.classList.remove('active');
    if (e.target === dossierModal) dossierModal.classList.remove('active');
  });

  // Recruit Form Submit
  const recruitForm = document.getElementById('recruit-form');
  if (recruitForm) {
    recruitForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const newPirate = {
        id: 'recruit-' + Date.now(),
        name: document.getElementById('recruit-name').value.trim(),
        epithet: document.getElementById('recruit-epithet').value.trim(),
        role: document.getElementById('recruit-role').value,
        bounty: Number(document.getElementById('recruit-bounty').value) || 10000000,
        quote: document.getElementById('recruit-quote').value.trim() || "Let's sail to the Grand Line!",
        devilFruit: null,
        haki: ["Observation"],
        origin: "Grand Line",
        image: "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=600&auto=format&fit=crop&q=80"
      };

      crewData.unshift(newPirate);
      localStorage.setItem('op_crew_members', JSON.stringify(crewData));
      
      playSound('recruit');
      recruitForm.reset();
      recruitModal.classList.remove('active');
      renderAll();
      showToast(`🏴‍☠️ ${newPirate.name} joined the crew!`);
    });
  }
}

// Character Dossier
window.openDossier = function(idOrName) {
  playSound('coin');
  const member = crewData.find(m => m.id === idOrName || m.name === idOrName);
  if (!member) return;

  const dossierBody = document.getElementById('dossier-body');
  const dossierModal = document.getElementById('dossier-modal');

  dossierBody.innerHTML = `
    <img src="${member.image || 'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=600'}" alt="${member.name}" class="detail-avatar">
    <h3>${member.name}</h3>
    <p style="color: var(--accent-gold); font-size: 0.9rem; font-weight: 600; margin-bottom: 8px;">
      "${member.epithet || 'Nakama'}" • ${member.role}
    </p>
    
    <div class="detail-tags">
      <span class="detail-tag">💰 ${formatBerry(member.bounty)}</span>
      <span class="detail-tag">📍 ${member.origin || 'Grand Line'}</span>
      ${member.devilFruit ? `<span class="detail-tag">🍎 ${member.devilFruit.name}</span>` : '<span class="detail-tag">⚔️ Non-Fruit User</span>'}
    </div>

    <div style="background: rgba(10, 13, 20, 0.6); padding: 14px; border-radius: var(--radius-sm); margin-bottom: 16px; text-align: left;">
      <p style="font-size: 0.85rem; color: var(--text-muted); margin-bottom: 4px;"><strong>Dream:</strong> ${member.dream || 'Conquer the Grand Line'}</p>
      <p style="font-size: 0.85rem; color: var(--text-muted);"><strong>Haki:</strong> ${member.haki && member.haki.length ? member.haki.join(', ') : 'None / Untrained'}</p>
    </div>

    <blockquote style="font-style: italic; color: #d1d5db; font-size: 0.95rem; border-left: 3px solid var(--accent-gold); padding-left: 12px; text-align: left;">
      "${member.quote || 'I will stand with the future Pirate King!'}"
    </blockquote>
  `;

  dossierModal.classList.add('active');
};

// Copy Code Helper
window.copyCode = function(button) {
  const codeBlock = button.parentElement;
  const text = codeBlock.innerText.replace('Copy', '').trim();
  navigator.clipboard.writeText(text).then(() => {
    playSound('coin');
    const prev = button.textContent;
    button.textContent = 'Copied! ✓';
    setTimeout(() => {
      button.textContent = prev;
    }, 2000);
    showToast('Code copied to clipboard!');
  });
};

// Toast notification helper
function showToast(message) {
  const toast = document.getElementById('toast');
  const msgElem = document.getElementById('toast-message');
  if (!toast || !msgElem) return;

  msgElem.textContent = message;
  toast.classList.add('show');
  setTimeout(() => {
    toast.classList.remove('show');
  }, 2800);
}
