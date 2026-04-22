// ============================================================
// HOKKAIDO 2026 PWA — Main Application
// ============================================================

let lang = localStorage.getItem('hk_lang') || 'zh';
let openDay = null;

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
  const icons = ['🗓', '🛍', '🚆', '✅', '🆘'];
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
  if (i === 0) updateWeatherForOpenDay();
}

// ── ITINERARY ──────────────────────────────────────────────
function renderItinerary() {
  const container = document.getElementById('page-itinerary');
  let html = renderWeatherBar();
  let lastPhase = -1;

  DAYS.forEach(d => {
    if (d.phase !== lastPhase) {
      html += `<div class="phase-header">${T[lang].phase[d.phase]}</div>`;
      lastPhase = d.phase;
    }
    const isOpen = openDay === d.day;
    const phaseClass = `phase-${d.phase}`;
    html += `
      <div class="card ${isOpen ? 'open' : ''}" id="day-card-${d.day}">
        <div class="card-header" onclick="toggleDay(${d.day})">
          <span class="day-badge ${phaseClass}">${T[lang].day} ${d.day}${T[lang].dayUnit}</span>
          <div style="flex:1;min-width:0">
            <div class="card-title">${d.date[lang]} ${d.title[lang]}</div>
            <div class="card-meta">${T[lang].steps}: ~${d.steps.toLocaleString()} ${T[lang].stepsUnit}</div>
          </div>
          <span class="chevron">▼</span>
        </div>
        <div class="card-body">
          ${renderDayTable(d)}
          ${renderDayFooter(d)}
        </div>
      </div>
    `;
  });

  container.innerHTML = html;
}

function renderDayTable(d) {
  const rows = d.items.map(item => {
    const noteHTML = item.note ? formatNote(item.note[lang]) : '';
    const mapHTML = item.maps
      ? `<a href="${item.maps}" target="_blank" rel="noopener" class="map-btn">📍 ${T[lang].mapBtn}</a>`
      : '';
    return `
      <tr class="${item.warn ? 'warn-row' : ''}">
        <td class="col-time">${item.time}</td>
        <td class="col-place">
          ${item.place[lang]}
          <span class="duration">${item.duration && item.duration !== '—' ? item.duration : ''}</span>
          ${mapHTML}
        </td>
        <td class="col-note">${noteHTML}</td>
      </tr>
    `;
  }).join('');
  return `<table class="day-table">${rows}</table>`;
}

function formatNote(text) {
  if (!text) return '';
  // highlight ⚡ warnings
  return text.replace(/(⚡[^；；。<\n]*)/g, '<span class="warn-text">$1</span>');
}

function renderDayFooter(d) {
  let html = '<div class="day-footer">';
  html += `<div class="footer-row"><span class="label">${T[lang].mealBudget}：</span>${d.mealBudget[lang]}</div>`;
  if (d.shopping) {
    html += `<div class="footer-row"><span class="label">${T[lang].shoppingNote}：</span>${d.shopping[lang]}</div>`;
  }
  html += '</div>';
  return html;
}

function toggleDay(dayNum) {
  openDay = openDay === dayNum ? null : dayNum;
  renderItinerary();
  if (openDay) {
    const day = DAYS.find(d => d.day === openDay);
    if (day) fetchWeather(day.weatherCity);
    setTimeout(() => {
      document.getElementById(`day-card-${dayNum}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 50);
  }
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

function updateWeatherForOpenDay() {
  if (openDay) {
    const day = DAYS.find(d => d.day === openDay);
    if (day) fetchWeather(day.weatherCity);
  } else {
    fetchWeather('Sapporo');
  }
}

async function fetchWeather(city) {
  currentWeatherCity = city;
  const descEl = document.getElementById('weather-desc');
  const tempEl = document.getElementById('weather-temp');
  if (!descEl) return;

  if (weatherCache[city]) {
    applyWeather(weatherCache[city]);
    return;
  }

  descEl.textContent = '…';
  tempEl.textContent = '';

  try {
    const res = await fetch(`https://wttr.in/${encodeURIComponent(city)}?format=j1`);
    const data = await res.json();
    const cur = data.current_condition[0];
    const result = {
      city,
      desc: cur.weatherDesc[0].value,
      temp_c: cur.temp_C,
      feels: cur.FeelsLikeC,
      humidity: cur.humidity,
    };
    weatherCache[city] = result;
    applyWeather(result);
  } catch {
    descEl.textContent = lang === 'zh' ? '無法取得天氣資料' : 'Weather unavailable';
    tempEl.textContent = '';
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
    html += `<div class="souvenir-section">`;
    html += `<div class="souvenir-cat">${cat.category[lang]}</div>`;
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

  html += `<div class="card" style="overflow:auto">
    <table class="transport-table">
      <thead><tr>
        <th>${lang === 'zh' ? '路線' : 'Route'}</th>
        <th>${lang === 'zh' ? '列車' : 'Train'}</th>
        <th>${lang === 'zh' ? '時間' : 'Time'}</th>
        <th>${lang === 'zh' ? '車資' : 'Fare'}</th>
      </tr></thead>
      <tbody>
        ${TRANSPORT.jr.map(r => `
          <tr>
            <td>${r.route[lang]}</td>
            <td>${r.train[lang]}</td>
            <td style="white-space:nowrap">${r.time}</td>
            <td style="white-space:nowrap">${r.fare}</td>
          </tr>
          <tr><td colspan="4" style="font-size:11px;color:#6b7a8d;padding-top:2px;padding-bottom:8px">${r.note[lang]}</td></tr>
        `).join('')}
      </tbody>
    </table>
  </div>`;

  html += `<div class="section-title mt-8">🚌 ${lang === 'zh' ? '各城市交通' : 'Local Transit'}</div>`;
  TRANSPORT.local.forEach(l => {
    html += `<div class="local-card"><div class="local-city">${l.city[lang]}</div><div class="local-desc">${l.desc[lang]}</div></div>`;
  });

  html += `<div class="section-title mt-8">💳 ${lang === 'zh' ? 'IC 卡（Suica）' : 'IC Card (Suica)'}</div>`;
  TRANSPORT.ic.forEach(ic => {
    html += `<div class="ic-card"><div class="ic-q">Q: ${ic.q[lang]}</div><div class="ic-a">A: ${ic.a[lang]}</div></div>`;
  });

  // Budget
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

  // Flight bar
  let html = `
    <div class="flight-bar">
      <div class="flight-row"><span class="flight-dir">去程</span><span class="flight-detail">CI130 · 5/14 08:35 桃園 T2 → 13:35 新千歲 T-I · 商務艙</span></div>
      <div class="flight-row"><span class="flight-dir">返程</span><span class="flight-detail">CI131 · 5/22 15:05 新千歲 T-I → 18:15 桃園 T2 · 商務艙</span></div>
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
    html += `<div class="check-section">`;
    html += `<div class="check-cat">${sec.section[lang]}</div>`;
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

  // Quick tips
  html += `
    <div class="section-title mt-8">💊 ${lang === 'zh' ? '醫療快速指引' : 'Medical Quick Tips'}</div>
    <div class="card">
      <table class="transport-table">
        <tbody>
          <tr><td>${lang === 'zh' ? '過敏反應' : 'Allergic reaction'}</td><td>${lang === 'zh' ? '告知「アレルギー反応です」→ 119' : 'Say "Arerugi hanno desu" → 119'}</td></tr>
          <tr><td>${lang === 'zh' ? '迷路 / 遺失物' : 'Lost / Missing'}</td><td>${lang === 'zh' ? '最近派出所或 JR 站務員' : 'Nearest Koban or JR staff'}</td></tr>
          <tr><td>${lang === 'zh' ? '護照遺失' : 'Lost passport'}</td><td>${lang === 'zh' ? '報警→ 台灣駐大阪辦事處' : 'Police report → TECRO Osaka'}</td></tr>
          <tr><td>${lang === 'zh' ? '班機延誤' : 'Flight delay'}</td><td>${lang === 'zh' ? '聯絡中華航空日本線' : 'Contact China Airlines Japan'}</td></tr>
        </tbody>
      </table>
    </div>
  `;

  container.innerHTML = html;
}

// ── INIT ───────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  // Language toggle
  document.getElementById('lang-toggle').addEventListener('click', () => {
    setLang(lang === 'zh' ? 'en' : 'zh');
  });

  // Show first tab
  document.querySelectorAll('.page')[0].classList.add('active');

  renderAll();
  fetchWeather('Sapporo');
});
