// ============================================================
// HOKKAIDO 2026 PWA — Main Application
// ============================================================

let lang = localStorage.getItem('hk_lang') || 'zh';
let openDays = new Set(); // multiple days can be open
let editMode = false;

// ── Storage helpers ────────────────────────────────────────
function getChecked(key) {
  try { return new Set(JSON.parse(localStorage.getItem(key) || '[]')); }
  catch { return new Set(); }
}
function saveChecked(key, set) {
  localStorage.setItem(key, JSON.stringify([...set]));
}

const checkedSouvenirs = getChecked('hk_souvenirs');
const checkedItems     = getChecked('hk_checklist');

// ── Language toggle ────────────────────────────────────────
function setLang(l) {
  lang = l;
  localStorage.setItem('hk_lang', l);
  renderAll();
}

// ── Render everything ──────────────────────────────────────
function renderAll() {
  document.querySelector('#lang-toggle').textContent = lang === 'zh' ? 'EN' : '中文';
  document.querySelector('header h1').textContent = T[lang].appTitle;
  renderTabs();
  renderItinerary();
  renderSouvenirs();
  renderTransport();
  renderChecklist();
  renderSOS();
  updateWeatherLabel();
}

// ── Tabs ───────────────────────────────────────────────────
let activeTab = 0;
function renderTabs() {
  const icons = ['🗓','🛍','🚆','✅','🆘'];
  const nav = document.getElementById('bottom-nav');
  nav.innerHTML = T[lang].tabs.map((label, i) => `
    <button class="tab-btn ${i === activeTab ? 'active' : ''}" onclick="switchTab(${i})">
      <span class="icon">${icons[i]}</span>
      <span>${label}</span>
    </button>
  `).join('');
}

function switchTab(i) {
  activeTab = i;
  document.querySelectorAll('.page').forEach((p, idx) => {
    p.classList.toggle('active', idx === i);
  });
  renderTabs();
}

// ── ITINERARY ──────────────────────────────────────────────
function renderItinerary() {
  const container = document.getElementById('page-itinerary');
  const state = getState();
  const modified = isModified();

  // Top bar: weather + edit controls
  let html = renderWeatherBar();

  // Edit mode toolbar
  html += `
    <div class="edit-toolbar">
      <button class="edit-toggle-btn ${editMode ? 'active' : ''}" onclick="toggleEditMode()">
        ${editMode
          ? (lang === 'zh' ? '✓ 完成編輯' : '✓ Done')
          : (lang === 'zh' ? '✏️ 編輯行程' : '✏️ Edit')}
      </button>
      ${modified ? `<button class="reset-btn" onclick="confirmReset()">↺ ${lang === 'zh' ? '還原' : 'Reset'}</button>` : ''}
    </div>
  `;

  let lastPhase = -1;
  state.forEach((dayState, dayIdx) => {
    if (dayState.phase !== lastPhase) {
      html += `<div class="phase-header">${T[lang].phase[dayState.phase]}</div>`;
      lastPhase = dayState.phase;
    }

    const isOpen = openDays.has(dayState.day);
    const impact = calculateImpact(dayState);
    const impBadges = renderImpactBadges(impact, lang);
    const phaseClass = `phase-${dayState.phase}`;

    html += `
      <div class="card ${isOpen ? 'open' : ''}" id="day-card-${dayState.day}">
        <div class="card-header" onclick="toggleDay(${dayState.day}, ${dayIdx})">
          <span class="day-badge ${phaseClass}">${T[lang].day} ${dayState.day}${T[lang].dayUnit}</span>
          <div style="flex:1;min-width:0">
            <div class="card-title">${dayState.date[lang]} ${dayState.title[lang]}</div>
            <div class="impact-row">${impBadges || `<span class="card-meta">${T[lang].steps}: ~${dayState.steps.toLocaleString()} ${T[lang].stepsUnit}</span>`}</div>
          </div>
          <span class="chevron">▼</span>
        </div>
        <div class="card-body">
          ${renderDayItems(dayState, dayIdx, impact)}
          ${renderDayFooter(dayState, impact)}
        </div>
      </div>
    `;
  });

  container.innerHTML = html;

  // Fetch weather for any open day
  if (openDays.size > 0) {
    const firstOpen = state.find(d => openDays.has(d.day));
    if (firstOpen) fetchWeather(firstOpen.weatherCity);
  } else {
    fetchWeather('Sapporo');
  }
}

function renderDayItems(dayState, dayIdx, impact) {
  const items = dayState.items;
  const conflictIdxs = new Set(impact.conflicts.flatMap(c => [c.idxA, c.idxB]));

  let html = '<div class="item-list">';
  items.forEach((item, itemIdx) => {
    const isConflict = conflictIdxs.has(itemIdx);
    const isMoved = item.originalDay !== dayState.day;
    const noteHTML = item.note ? formatNote(item.note[lang]) : '';
    const mapHTML = item.maps
      ? `<a href="${item.maps}" target="_blank" rel="noopener" class="map-btn">📍 ${T[lang].mapBtn}</a>`
      : '';

    html += `
      <div class="item-row ${item.warn ? 'warn-row' : ''} ${isConflict ? 'conflict-row' : ''} ${isMoved ? 'moved-row' : ''}"
           data-id="${item.id}" data-day-idx="${dayIdx}" data-item-idx="${itemIdx}">
        ${editMode ? `
          <div class="drag-controls">
            <button class="ctrl-btn" onclick="moveUp(${dayIdx}, ${itemIdx})" ${itemIdx === 0 ? 'disabled' : ''}>↑</button>
            <button class="ctrl-btn" onclick="moveDown(${dayIdx}, ${itemIdx})" ${itemIdx === items.length - 1 ? 'disabled' : ''}>↓</button>
          </div>
        ` : ''}
        <div class="item-time">${item.time}</div>
        <div class="item-body">
          <div class="item-place">${item.place[lang]}</div>
          ${item.duration && item.duration !== '—' ? `<div class="item-duration">${item.duration}</div>` : ''}
          ${noteHTML ? `<div class="item-note">${noteHTML}</div>` : ''}
          <div class="item-actions">
            ${mapHTML}
            ${editMode ? `<button class="move-day-btn" onclick="showMoveSheet('${item.id}', ${dayIdx})">📅 ${lang === 'zh' ? '移到...' : 'Move to...'}</button>` : ''}
            ${isMoved ? `<span class="moved-tag">${lang === 'zh' ? `從 Day ${item.originalDay}` : `From Day ${item.originalDay}`}</span>` : ''}
          </div>
          ${isConflict ? `<div class="conflict-warn">⏱ ${lang === 'zh' ? '時間可能衝突' : 'Possible time conflict'}</div>` : ''}
        </div>
      </div>
    `;
  });
  html += '</div>';
  return html;
}

function renderDayFooter(dayState, impact) {
  let html = '<div class="day-footer">';

  // Impact summary when modified
  if (impact.moved > 0 || impact.conflicts.length > 0) {
    html += `<div class="footer-impact">`;
    if (impact.conflicts.length > 0) {
      const detail = impact.conflicts.map(c => {
        const items = dayState.items;
        return `${items[c.idxA]?.place[lang] || '?'} → ${items[c.idxB]?.place[lang] || '?'} (${c.overlapMin}${lang === 'zh' ? '分重疊' : 'min overlap'})`;
      }).join('；');
      html += `<div class="impact-detail conflict-detail">⏱ ${detail}</div>`;
    }
    if (impact.budgetChanged) {
      html += `<div class="impact-detail">💴 ${lang === 'zh' ? '預算估計已變動，請手動核對' : 'Budget may have changed — check manually'}</div>`;
    }
    html += `</div>`;
  }

  html += `<div class="footer-row"><span class="label">${T[lang].mealBudget}：</span>${dayState.mealBudget[lang]}</div>`;
  if (dayState.shopping) {
    html += `<div class="footer-row"><span class="label">${T[lang].shoppingNote}：</span>${dayState.shopping[lang]}</div>`;
  }
  html += '</div>';
  return html;
}

// ── Edit mode actions ──────────────────────────────────────
function toggleEditMode() {
  editMode = !editMode;
  renderItinerary();
}

function moveUp(dayIdx, itemIdx) {
  if (itemIdx === 0) return;
  moveItemWithinDay(dayIdx, itemIdx, itemIdx - 1);
  renderItinerary();
}

function moveDown(dayIdx, itemIdx) {
  const state = getState();
  if (itemIdx >= state[dayIdx].items.length - 1) return;
  moveItemWithinDay(dayIdx, itemIdx, itemIdx + 1);
  renderItinerary();
}

function showMoveSheet(itemId, fromDayIdx) {
  const state = getState();
  const overlay = document.getElementById('move-sheet-overlay');
  const sheet = document.getElementById('move-sheet');
  const list = document.getElementById('move-day-list');

  list.innerHTML = state.map((d, i) => {
    if (i === fromDayIdx) return '';
    return `
      <button class="move-day-option" onclick="executeMove('${itemId}', ${fromDayIdx}, ${i})">
        <span class="move-day-num">${T[lang].day} ${d.day}</span>
        <span class="move-day-title">${d.date[lang]} ${d.title[lang]}</span>
      </button>
    `;
  }).join('');

  document.getElementById('move-sheet-title').textContent =
    lang === 'zh' ? '移到哪一天？' : 'Move to which day?';
  document.getElementById('move-sheet-cancel').textContent =
    lang === 'zh' ? '取消' : 'Cancel';

  overlay.style.display = 'flex';
}

function closeSheet() {
  document.getElementById('move-sheet-overlay').style.display = 'none';
}

function executeMove(itemId, fromDayIdx, toDayIdx) {
  closeSheet();
  const state = getState();
  // Auto-open both days
  openDays.add(state[fromDayIdx].day);
  openDays.add(state[toDayIdx].day);
  moveItemToDay(itemId, fromDayIdx, toDayIdx);
  renderItinerary();
}

function confirmReset() {
  const msg = lang === 'zh'
    ? '確定要還原所有行程變更嗎？'
    : 'Reset all itinerary changes?';
  if (confirm(msg)) {
    resetState();
    openDays.clear();
    renderItinerary();
  }
}

function toggleDay(dayNum, dayIdx) {
  if (openDays.has(dayNum)) {
    openDays.delete(dayNum);
  } else {
    openDays.add(dayNum);
    const state = getState();
    const day = state[dayIdx];
    if (day) fetchWeather(day.weatherCity);
    setTimeout(() => {
      document.getElementById(`day-card-${dayNum}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 50);
  }
  renderItinerary();
}

function formatNote(text) {
  if (!text) return '';
  return text.replace(/(⚡[^；。<\n]*)/g, '<span class="warn-text">$1</span>');
}

// ── WEATHER ────────────────────────────────────────────────
const weatherCache = {};
let currentWeatherCity = 'Sapporo';

function renderWeatherBar() {
  return `
    <div id="weather-bar">
      <div id="weather-info">
        <div id="weather-city-label">${T[lang].weatherTitle}</div>
        <div id="weather-desc">—</div>
        <div id="weather-temp"></div>
      </div>
      <button id="weather-refresh" onclick="fetchWeather('${currentWeatherCity}')">${T[lang].weatherRefresh}</button>
    </div>
  `;
}

function updateWeatherLabel() {
  const el = document.getElementById('weather-city-label');
  if (el) el.textContent = T[lang].weatherTitle;
  const btn = document.getElementById('weather-refresh');
  if (btn) btn.textContent = T[lang].weatherRefresh;
}

async function fetchWeather(city) {
  currentWeatherCity = city;
  const descEl = document.getElementById('weather-desc');
  const tempEl = document.getElementById('weather-temp');
  if (!descEl) return;
  if (weatherCache[city]) { applyWeather(weatherCache[city]); return; }
  descEl.textContent = '…';
  tempEl.textContent = '';
  try {
    const res = await fetch(`https://wttr.in/${encodeURIComponent(city)}?format=j1`);
    const data = await res.json();
    const cur = data.current_condition[0];
    const result = { city, desc: cur.weatherDesc[0].value, temp_c: cur.temp_C, feels: cur.FeelsLikeC, humidity: cur.humidity };
    weatherCache[city] = result;
    applyWeather(result);
  } catch {
    if (descEl) descEl.textContent = lang === 'zh' ? '無法取得天氣' : 'Weather unavailable';
  }
}

function applyWeather(w) {
  const descEl = document.getElementById('weather-desc');
  const tempEl = document.getElementById('weather-temp');
  const cityEl = document.getElementById('weather-city-label');
  if (!descEl) return;
  const cityMap = { Sapporo: '札幌', Hakodate: '函館', Toyako: '洞爺湖' };
  const cityLabel = lang === 'zh' ? (cityMap[w.city] || w.city) : w.city;
  cityEl.textContent = `${T[lang].weatherTitle} — ${cityLabel}`;
  descEl.textContent = w.desc;
  tempEl.textContent = lang === 'zh'
    ? `${w.temp_c}°C（體感 ${w.feels}°C）濕度 ${w.humidity}%`
    : `${w.temp_c}°C (feels ${w.feels}°C) · Humidity ${w.humidity}%`;
}

// ── SOUVENIRS ──────────────────────────────────────────────
function renderSouvenirs() {
  const container = document.getElementById('page-souvenirs');
  const total = SOUVENIRS.reduce((s, c) => s + c.items.length, 0);
  const done  = SOUVENIRS.reduce((s, c) => s + c.items.filter(i => checkedSouvenirs.has(i.id)).length, 0);

  let html = `
    <div class="progress-bar-wrap">
      <div class="progress-label">
        <span>${lang === 'zh' ? '採購進度' : 'Shopping progress'}</span>
        <span>${done} / ${total}</span>
      </div>
      <div class="progress-track"><div class="progress-fill" style="width:${total ? Math.round(done/total*100) : 0}%"></div></div>
    </div>
  `;

  SOUVENIRS.forEach(cat => {
    html += `<div class="souvenir-section"><div class="souvenir-cat">${cat.category[lang]}</div>`;
    cat.items.forEach(item => {
      const checked = checkedSouvenirs.has(item.id);
      const noteHtml = item.note ? `<div class="souvenir-note">${item.note[lang]}</div>` : '';
      const badges = [
        item.cold    ? `<span class="badge badge-cold">❄ ${T[lang].cold}</span>` : '',
        item.airport ? `<span class="badge badge-airport">✈ ${T[lang].limitedAirport}</span>` : '',
      ].filter(Boolean).join('');
      html += `
        <div class="souvenir-item ${checked ? 'checked' : ''}" onclick="toggleSouvenir('${item.id}')">
          <div class="souvenir-checkbox">${checked ? '✓' : ''}</div>
          <div class="souvenir-info">
            <div class="souvenir-name">${item.name[lang]}</div>
            ${item.price ? `<div class="souvenir-price">${item.price}</div>` : ''}
            ${badges ? `<div class="badge-row">${badges}</div>` : ''}
            ${noteHtml}
          </div>
        </div>
      `;
    });
    html += '</div>';
  });

  container.innerHTML = html;
}

function toggleSouvenir(id) {
  if (checkedSouvenirs.has(id)) checkedSouvenirs.delete(id);
  else checkedSouvenirs.add(id);
  saveChecked('hk_souvenirs', checkedSouvenirs);
  renderSouvenirs();
}

// ── TRANSPORT ──────────────────────────────────────────────
function renderTransport() {
  const container = document.getElementById('page-transport');
  let html = `<div class="section-title">🚆 JR ${lang === 'zh' ? '主要路段' : 'Main Routes'}</div>`;
  html += `<div class="card" style="overflow:auto"><table class="transport-table">
    <thead><tr>
      <th>${lang === 'zh' ? '路線' : 'Route'}</th>
      <th>${lang === 'zh' ? '列車' : 'Train'}</th>
      <th>${lang === 'zh' ? '時間' : 'Time'}</th>
      <th>${lang === 'zh' ? '車資' : 'Fare'}</th>
    </tr></thead><tbody>
    ${TRANSPORT.jr.map(r => `
      <tr>
        <td>${r.route[lang]}</td><td>${r.train[lang]}</td>
        <td style="white-space:nowrap">${r.time}</td>
        <td style="white-space:nowrap">${r.fare}</td>
      </tr>
      <tr><td colspan="4" style="font-size:11px;color:#6b7a8d;padding-bottom:8px">${r.note[lang]}</td></tr>
    `).join('')}
    </tbody></table></div>`;

  html += `<div class="section-title mt-8">🚌 ${lang === 'zh' ? '各城市交通' : 'Local Transit'}</div>`;
  TRANSPORT.local.forEach(l => {
    html += `<div class="local-card"><div class="local-city">${l.city[lang]}</div><div class="local-desc">${l.desc[lang]}</div></div>`;
  });

  html += `<div class="section-title mt-8">💳 ${lang === 'zh' ? 'IC 卡（Suica）' : 'IC Card (Suica)'}</div>`;
  TRANSPORT.ic.forEach(ic => {
    html += `<div class="ic-card"><div class="ic-q">Q: ${ic.q[lang]}</div><div class="ic-a">A: ${ic.a[lang]}</div></div>`;
  });

  html += `<div class="section-title mt-8">💴 ${T[lang].budgetTitle}</div>`;
  html += `<div class="card"><table class="budget-table">`;
  BUDGET.forEach(b => {
    html += `<tr class="${b.total ? 'total-row' : ''}"><td>${b.item[lang]}</td><td>${b.est}</td></tr>`;
  });
  html += `</table></div>`;
  container.innerHTML = html;
}

// ── CHECKLIST ──────────────────────────────────────────────
function renderChecklist() {
  const container = document.getElementById('page-checklist');
  const total = CHECKLIST.reduce((s, c) => s + c.items.length, 0);
  const done  = CHECKLIST.reduce((s, c) => s + c.items.filter(i => checkedItems.has(i.id)).length, 0);

  let html = `
    <div class="flight-bar">
      <div class="flight-row"><span class="flight-dir">${lang === 'zh' ? '去程' : 'Outbound'}</span><span class="flight-detail">CI130 · 5/14 08:35 ${lang === 'zh' ? '桃園 T2' : 'TPE T2'} → 13:35 ${lang === 'zh' ? '新千歲 T-I' : 'CTS T-I'} · ${lang === 'zh' ? '商務艙' : 'Business'}</span></div>
      <div class="flight-row"><span class="flight-dir">${lang === 'zh' ? '返程' : 'Return'}</span><span class="flight-detail">CI131 · 5/22 15:05 ${lang === 'zh' ? '新千歲 T-I' : 'CTS T-I'} → 18:15 ${lang === 'zh' ? '桃園 T2' : 'TPE T2'} · ${lang === 'zh' ? '商務艙' : 'Business'}</span></div>
    </div>
    <div class="progress-bar-wrap">
      <div class="progress-label">
        <span>${lang === 'zh' ? '準備進度' : 'Prep progress'}</span>
        <span>${done} / ${total}</span>
      </div>
      <div class="progress-track"><div class="progress-fill" style="width:${total ? Math.round(done/total*100) : 0}%"></div></div>
    </div>
  `;

  CHECKLIST.forEach(sec => {
    html += `<div class="check-section"><div class="check-cat">${sec.section[lang]}</div>`;
    sec.items.forEach(item => {
      const checked = checkedItems.has(item.id);
      html += `
        <div class="check-item ${checked ? 'checked' : ''}" onclick="toggleCheckItem('${item.id}')">
          <div class="check-box">${checked ? '✓' : ''}</div>
          <div class="check-text">${item.text[lang]}</div>
        </div>
      `;
    });
    html += '</div>';
  });

  container.innerHTML = html;
}

function toggleCheckItem(id) {
  if (checkedItems.has(id)) checkedItems.delete(id);
  else checkedItems.add(id);
  saveChecked('hk_checklist', checkedItems);
  renderChecklist();
}

// ── SOS ────────────────────────────────────────────────────
function renderSOS() {
  const container = document.getElementById('page-sos');
  let html = `<div class="section-title">🆘 ${T[lang].sosTitle}</div>`;
  SOS.forEach(s => {
    html += `
      <div class="sos-card">
        <div>
          <div class="sos-label">${s.label[lang]}</div>
          <div class="sos-number">${s.number}</div>
        </div>
        <a href="tel:${s.number}" class="sos-call-btn">📞 ${lang === 'zh' ? '撥打' : 'Call'}</a>
      </div>
    `;
  });
  html += `
    <div class="section-title mt-8">💊 ${lang === 'zh' ? '醫療快速指引' : 'Medical Quick Tips'}</div>
    <div class="card"><table class="transport-table"><tbody>
      <tr><td>${lang === 'zh' ? '過敏反應' : 'Allergic reaction'}</td><td>${lang === 'zh' ? '說「アレルギー反応です」→ 119' : 'Say "Arerugi hanno desu" → 119'}</td></tr>
      <tr><td>${lang === 'zh' ? '迷路 / 遺失物' : 'Lost / Missing'}</td><td>${lang === 'zh' ? '最近派出所或 JR 站務員' : 'Nearest Koban or JR staff'}</td></tr>
      <tr><td>${lang === 'zh' ? '護照遺失' : 'Lost passport'}</td><td>${lang === 'zh' ? '報警 → 台灣駐大阪辦事處' : 'Police report → TECRO Osaka'}</td></tr>
      <tr><td>${lang === 'zh' ? '班機延誤' : 'Flight delay'}</td><td>${lang === 'zh' ? '聯絡中華航空日本線' : 'Contact China Airlines Japan'}</td></tr>
    </tbody></table></div>
  `;
  container.innerHTML = html;
}

// ── INIT ───────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('lang-toggle').addEventListener('click', () => {
    setLang(lang === 'zh' ? 'en' : 'zh');
  });
  document.getElementById('move-sheet-cancel').addEventListener('click', closeSheet);
  document.getElementById('move-sheet-overlay').addEventListener('click', e => {
    if (e.target === e.currentTarget) closeSheet();
  });

  document.querySelectorAll('.page')[0].classList.add('active');
  renderAll();
  fetchWeather('Sapporo');
});
