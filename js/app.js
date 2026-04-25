// ============================================================
// HOKKAIDO 2026 PWA — Main Application  v2
// ============================================================

let lang = localStorage.getItem('hk_lang') || 'zh';
let activeDayIdx = 0;
let editMode = false;
let souvenirTab = 0;
let svSubTab = 0;
let svOpenId = null;
let transportTab = 0;
let sosTab = 0;

// ── Storage helpers ────────────────────────────────────────
function getChecked(key) {
  try { return new Set(JSON.parse(localStorage.getItem(key) || '[]')); }
  catch { return new Set(); }
}
function saveChecked(key, set) {
  localStorage.setItem(key, JSON.stringify([...set]));
}

const checkedItems = getChecked('hk_checklist');

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

// ── CATEGORY DETECTION ─────────────────────────────────────
const CAT = {
  transport: { icon: '🚆', zh: '交通', en: 'Transit', cls: 'cat-transport' },
  hotel:     { icon: '🏨', zh: '住宿', en: 'Hotel',   cls: 'cat-hotel' },
  food:      { icon: '🍽', zh: '餐廳', en: 'Dining',  cls: 'cat-food' },
  shop:      { icon: '🛍', zh: '購物', en: 'Shop',    cls: 'cat-shop' },
  sight:     { icon: '🗺', zh: '景點', en: 'Sights',  cls: 'cat-sight' },
};

function getCategory(item) {
  const text = [
    item.place?.zh || '', item.place?.en || '',
    item.note?.zh  || '', item.note?.en  || ''
  ].join(' ');
  if (/機場|airport|搭機|搭飛機|ci1[23]\d|jr|特急|巴士|bus|shuttle|地下鉄|電車|train|抵達|出發|前往|IC卡|pasmo|suica/i.test(text))
    return 'transport';
  if (/飯店|hotel|resort|旅館|check.?in|check.?out|入住|退房|apa |dormy|威斯汀|洲際|hilton|solaria/i.test(text))
    return 'hotel';
  if (/[🍜🍣🦀🍱🍛🍲🥩🍤🍺🥐]|拉麵|壽司|螃蟹|餐廳|食堂|午餐|晚餐|早餐|dinner|lunch|breakfast|ramen|sushi|crab|bbq|restaurant|居酒屋|成吉思汗|海鮮丼|ジンギスカン/i.test(text))
    return 'food';
  if (/購物|shopping|百貨|伴手禮|土産|royce|六花亭|calbee|ishiya|letao|tsujiguchi|朝市|海鮮市場|市場|藥妝/i.test(text))
    return 'shop';
  return 'sight';
}

// ── ITINERARY ──────────────────────────────────────────────
function renderItinerary() {
  const container = document.getElementById('page-itinerary');
  const state = getState();
  let html = renderWeatherCard(state);
  html += renderDayStrip(state);
  html += renderActiveDayView(state);
  container.innerHTML = html;

  // Scroll active pill into view
  setTimeout(() => {
    const pill = document.querySelector('.day-pill.active');
    if (pill) pill.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
  }, 60);

  // Fetch weather for active day
  fetchWeather(state[activeDayIdx].weatherCity);
}

// ── Day Strip ──────────────────────────────────────────────
function renderDayStrip(state) {
  const pills = state.map((d, i) => {
    const dateNum = d.date.zh.match(/\/(\d+)/)?.[1] || d.day;
    const dow     = d.date.zh.match(/（(.)）/)?.[1]  || '';
    const active  = i === activeDayIdx;
    const hasMove = d.items.some(it => it.originalDay !== d.day);
    const phCls   = `phase-pill-${d.phase}`;
    return `
      <button class="day-pill ${active ? 'active' : ''} ${phCls}" onclick="selectDay(${i})">
        <span class="pill-num">${dateNum}</span>
        <span class="pill-dow">${dow}</span>
        ${hasMove ? '<span class="pill-dot"></span>' : ''}
      </button>
    `;
  }).join('');
  return `<div class="day-strip"><div class="day-strip-inner">${pills}</div></div>`;
}

function selectDay(idx) {
  activeDayIdx = idx;
  renderItinerary();
  document.querySelector('main').scrollTop = 0;
}

// ── Leaflet Map Modal ──────────────────────────────────────
let leafletMap = null;

function openMapModal(dayIdx) {
  if (typeof L === 'undefined') {
    alert(lang === 'zh' ? '地圖需要網路連線' : 'Map requires internet connection');
    return;
  }
  const state = getState();
  const dayState = state[dayIdx];

  const stops = dayState.items
    .filter(item => PLACE_COORDS[item.place.zh] && getCategory(item) !== 'transport')
    .map(item => ({ ...item, coords: PLACE_COORDS[item.place.zh] }));

  if (stops.length === 0) {
    alert(lang === 'zh' ? '此天無地圖資料' : 'No map data for this day');
    return;
  }

  document.getElementById('map-modal-title').textContent =
    `Day ${dayState.day} · ${cleanPlaceName(dayState.title[lang])}`;
  document.getElementById('map-modal').style.display = 'flex';

  if (leafletMap) { leafletMap.remove(); leafletMap = null; }

  requestAnimationFrame(() => {
    leafletMap = L.map('map-leaflet', { zoomControl: true });
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap', maxZoom: 18,
    }).addTo(leafletMap);

    const markers = stops.map((item, i) => {
      const icon = L.divIcon({
        className: 'map-pin-wrap',
        html: `<div class="map-pin">${i + 1}</div>`,
        iconSize: [30, 30], iconAnchor: [15, 15], popupAnchor: [0, -18],
      });
      const name = cleanPlaceName(item.place[lang]) || item.place[lang];
      const mapsUrl = item.maps ||
        `https://www.google.com/maps/search/${encodeURIComponent(item.place.zh + ' 北海道')}`;
      return L.marker(item.coords, { icon }).addTo(leafletMap).bindPopup(`
        <div class="map-popup">
          <div class="mp-num">${item.time && item.time !== '—' ? item.time : ''}</div>
          <div class="mp-name">${name}</div>
          <a href="${mapsUrl}" target="_blank" rel="noopener" class="mp-nav">
            📍 ${lang === 'zh' ? '導航到這裡' : 'Navigate here'}
          </a>
        </div>`, { maxWidth: 200 });
    });

    if (stops.length > 1) {
      L.polyline(stops.map(s => s.coords), {
        color: '#1a2744', weight: 2.5, opacity: 0.6, dashArray: '6, 9',
      }).addTo(leafletMap);
    }

    leafletMap.fitBounds(L.featureGroup(markers).getBounds().pad(0.25));
  });
}

function closeMapModal() {
  document.getElementById('map-modal').style.display = 'none';
  if (leafletMap) { leafletMap.remove(); leafletMap = null; }
}

// ── Day Map (legacy helper, kept for fallback) ─────────────
function cleanPlaceName(name) {
  return name
    .replace(/[\u{1F300}-\u{1F9FF}\u{2600}-\u{27BF}]+\s*/gu, '') // strip emoji
    .replace(/【[^】]+】/g, '')    // strip 【...】
    .replace(/（[^）]+）/g, '')    // strip （...）
    .replace(/\s*[+＋]\s*.+$/, '') // strip " + 副地點"
    .trim();
}

function buildDayMapUrl(dayIdx) {
  const state = getState();
  const dayState = state[dayIdx];
  const cityZhMap = { Sapporo: '札幌', Hakodate: '函館', Toyako: '洞爺湖' };
  const cityJp = cityZhMap[dayState.weatherCity] || '北海道';

  const places = dayState.items
    .filter(item => getCategory(item) !== 'transport')
    .filter(item => item.place?.zh)
    .map(item => {
      const raw = item.place.zh;
      // Try English name if place.en looks cleaner (no CJK)
      const name = cleanPlaceName(raw) || raw;
      return encodeURIComponent(name + ' ' + cityJp);
    });

  if (places.length === 0) return null;
  return 'https://www.google.com/maps/dir/' + places.join('/');
}

// ── Day Summary Card ───────────────────────────────────────
function renderDaySummaryCard(dayState) {
  const meals = { breakfast: null, lunch: null, dinner: null };
  dayState.items.forEach(item => {
    const name = (item.place?.zh || '') + ' ' + (item.place?.en || '');
    // Keyword detection first (most reliable)
    let mt = null;
    if (/早餐|breakfast/i.test(name))      mt = 'breakfast';
    else if (/午餐|lunch/i.test(name))     mt = 'lunch';
    else if (/晚餐|dinner/i.test(name))    mt = 'dinner';
    // Fall back to emoji + time (mealType from impact.js)
    if (!mt) mt = mealType(item);
    if (!mt || mt === 'any') return;
    if (!meals[mt]) meals[mt] = cleanPlaceName(item.place[lang]) || item.place[lang];
  });

  const rows = [
    { icon: '☀️', label: lang === 'zh' ? '早餐' : 'Breakfast', val: meals.breakfast },
    { icon: '🌤',  label: lang === 'zh' ? '午餐' : 'Lunch',     val: meals.lunch },
    { icon: '🌙', label: lang === 'zh' ? '晚餐' : 'Dinner',    val: meals.dinner },
  ];

  const mealHtml = rows.map(r => `
    <div class="sum-meal${r.val ? '' : ' sum-meal-missing'}">
      <span class="sum-meal-icon">${r.icon}</span>
      <span class="sum-meal-label">${r.label}</span>
      <span class="sum-meal-val">${r.val || (lang === 'zh' ? '未安排' : 'TBD')}</span>
    </div>
  `).join('');

  return `
    <div class="day-summary-card">
      <div class="sum-meals">${mealHtml}</div>
      <div class="sum-footer">
        <span>👟 ~${dayState.steps.toLocaleString()} ${lang === 'zh' ? '步' : 'steps'}</span>
        <span>💴 ${dayState.mealBudget[lang]}</span>
      </div>
      ${dayState.shopping ? `<div class="sum-shopping">🛍 ${dayState.shopping[lang]}</div>` : ''}
      <button class="sum-map-btn" onclick="openMapModal(${activeDayIdx})">
        <span style="font-size:15px;line-height:1">📍</span>${lang === 'zh' ? '今日地圖' : "Today's Map"}
      </button>
    </div>
  `;
}

// ── Active Day View ────────────────────────────────────────
function renderActiveDayView(state) {
  const dayState = state[activeDayIdx];
  const impact   = calculateImpact(dayState);
  const impBadges = renderImpactBadges(impact, lang);

  let html = `<div class="day-view">`;

  // Day header
  html += `
    <div class="day-view-header">
      <div class="day-view-top">
        <span class="day-view-badge phase-${dayState.phase}">${T[lang].day} ${dayState.day}${T[lang].dayUnit}</span>
        <span class="day-view-phase">${T[lang].phase[dayState.phase]}</span>
      </div>
      <div class="day-view-title">${dayState.date[lang]} &nbsp;${dayState.title[lang]}</div>
      ${impBadges ? `<div class="impact-row" style="margin-top:5px">${impBadges}</div>` : ''}
    </div>
  `;

  // Day summary (meals / steps / budget)
  html += renderDaySummaryCard(dayState);

  // Flight card on Day 1 / last day
  if (activeDayIdx === 0) html += renderFlightCard('outbound');
  if (activeDayIdx === state.length - 1) html += renderFlightCard('return');

  // Edit toolbar
  html += `
    <div class="edit-toolbar">
      <button class="edit-toggle-btn ${editMode ? 'active' : ''}" onclick="toggleEditMode()">
        ${editMode
          ? (lang === 'zh' ? '✓ 完成編輯' : '✓ Done')
          : (lang === 'zh' ? '✏️ 編輯行程' : '✏️ Edit')}
      </button>
      ${isModified()
        ? `<button class="reset-btn" onclick="confirmReset()">↺ ${lang === 'zh' ? '還原' : 'Reset'}</button>`
        : ''}
    </div>
  `;

  // Timeline
  html += `<div class="timeline">${renderTimelineItems(dayState, impact)}</div>`;

  // Add item button (edit mode only)
  if (editMode) {
    html += `
      <button class="add-item-btn" onclick="openAddItem()">
        ＋ ${lang === 'zh' ? '新增行程' : 'Add Stop'}
      </button>
    `;
  }

  // Footer
  html += renderDayFooter(dayState, impact);
  html += `</div>`;
  return html;
}

// ── Flight Card ────────────────────────────────────────────
function renderFlightCard(dir) {
  const isOut = dir === 'outbound';
  return `
    <div class="flight-card-v2">
      <div class="fc2-badge">${isOut
        ? (lang === 'zh' ? '✈ 去程航班' : '✈ Outbound')
        : (lang === 'zh' ? '✈ 回程航班' : '✈ Return')}</div>
      <div class="fc2-row">
        <div class="fc2-num">CI ${isOut ? '130' : '131'}</div>
        <div class="fc2-detail">
          <div class="fc2-route">${isOut
            ? (lang === 'zh' ? '桃園 T2 → 新千歲 T-I' : 'TPE T2 → CTS T-I')
            : (lang === 'zh' ? '新千歲 T-I → 桃園 T2' : 'CTS T-I → TPE T2')}</div>
          <div class="fc2-times">
            ${isOut ? '08:35' : '15:05'} <span class="fc-arrow">→</span> ${isOut ? '13:35' : '18:15'}
          </div>
        </div>
      </div>
    </div>
  `;
}

// ── Timeline Items ─────────────────────────────────────────
function renderTimelineItems(dayState, impact) {
  const items = dayState.items;
  const conflictIdxs = new Set(impact.conflicts.flatMap(c => [c.idxA, c.idxB]));
  let html = '';

  items.forEach((item, itemIdx) => {
    const cat     = getCategory(item);
    const catInfo = CAT[cat];
    const isConflict = conflictIdxs.has(itemIdx);
    const isMoved    = item.originalDay !== dayState.day;
    const isLast     = itemIdx === items.length - 1;
    const noteHTML   = item.note ? formatNote(item.note[lang]) : '';
    const mapHTML    = item.maps
      ? `<a href="${item.maps}" target="_blank" rel="noopener" class="map-btn">📍 ${T[lang].mapBtn}</a>`
      : '';

    let rowCls = '';
    if (isConflict) rowCls = 'tl-conflict';
    else if (isMoved) rowCls = 'tl-moved';
    else if (item.warn) rowCls = 'tl-warn';

    html += `
      <div class="tl-row ${rowCls}" data-id="${item.id}">
        <div class="tl-time-col">${item.time !== '—' ? item.time : ''}</div>
        <div class="tl-axis-col">
          <div class="tl-dot ${catInfo.cls}"></div>
          ${isLast ? '' : '<div class="tl-vline"></div>'}
        </div>
        <div class="tl-content">
          <div class="tl-card ${isConflict ? 'card-conflict' : ''} ${isMoved ? 'card-moved' : ''}">
            <div class="tl-card-top">
              <span class="cat-chip ${catInfo.cls}">${catInfo.icon} ${catInfo[lang]}</span>
              ${editMode ? `
                <div class="tl-edit-btns">
                  <button class="ctrl-btn ctrl-edit" onclick="editItem('${item.id}')">✎</button>
                  <button class="ctrl-btn" onclick="moveUp(${itemIdx})" ${itemIdx === 0 ? 'disabled' : ''}>↑</button>
                  <button class="ctrl-btn" onclick="moveDown(${itemIdx})" ${itemIdx === items.length - 1 ? 'disabled' : ''}>↓</button>
                  <button class="ctrl-btn ctrl-del" onclick="confirmDeleteItem('${item.id}')">✕</button>
                </div>
              ` : ''}
            </div>
            <div class="tl-place">${item.place[lang]}</div>
            ${item.duration && item.duration !== '—' ? `<div class="tl-duration">${item.duration}</div>` : ''}
            ${noteHTML ? `<div class="tl-note">${noteHTML}</div>` : ''}
            ${isConflict ? `<div class="conflict-warn">⏱ ${lang === 'zh' ? '時間可能衝突' : 'Possible conflict'}</div>` : ''}
            ${isMoved ? `<div class="moved-tag">${lang === 'zh' ? `從 Day ${item.originalDay} 移入` : `From Day ${item.originalDay}`}</div>` : ''}
            <div class="tl-actions">
              ${mapHTML}
              ${editMode ? `<button class="move-day-btn" onclick="showMoveSheet('${item.id}', ${activeDayIdx})">📅 ${lang === 'zh' ? '移到...' : 'Move to...'}</button>` : ''}
            </div>
          </div>
        </div>
      </div>
    `;
  });

  return html;
}

// ── Day Footer ─────────────────────────────────────────────
function renderDayFooter(dayState, impact) {
  if (impact.conflicts.length === 0 && !impact.budgetChanged) return '';
  let html = '<div class="day-footer">';
  if (impact.conflicts.length > 0) {
    const detail = impact.conflicts.map(c => {
      const it = dayState.items;
      return `${it[c.idxA]?.place[lang] || '?'} → ${it[c.idxB]?.place[lang] || '?'} (${c.overlapMin}${lang === 'zh' ? '分重疊' : 'min overlap'})`;
    }).join('；');
    html += `<div class="footer-impact"><div class="impact-detail conflict-detail">⏱ ${detail}</div></div>`;
  }
  if (impact.budgetChanged) {
    html += `<div class="footer-row"><span class="label">💴</span>${lang === 'zh' ? '預算估計已變動，請手動核對' : 'Budget may have changed'}</div>`;
  }
  html += '</div>';
  return html;
}

// ── Edit mode ──────────────────────────────────────────────
function toggleEditMode() {
  editMode = !editMode;
  renderItinerary();
}

function moveUp(itemIdx) {
  if (itemIdx === 0) return;
  moveItemWithinDay(activeDayIdx, itemIdx, itemIdx - 1);
  renderItinerary();
}

function moveDown(itemIdx) {
  const state = getState();
  if (itemIdx >= state[activeDayIdx].items.length - 1) return;
  moveItemWithinDay(activeDayIdx, itemIdx, itemIdx + 1);
  renderItinerary();
}

function showMoveSheet(itemId, fromDayIdx) {
  const state = getState();
  const overlay = document.getElementById('move-sheet-overlay');
  const list    = document.getElementById('move-day-list');

  list.innerHTML = state.map((d, i) => {
    if (i === fromDayIdx) return '';
    const dateNum = d.date.zh.match(/\/(\d+)/)?.[1] || d.day;
    return `
      <button class="move-day-option" onclick="executeMove('${itemId}', ${fromDayIdx}, ${i})">
        <span class="move-day-num">${T[lang].day} ${d.day} · ${dateNum}</span>
        <span class="move-day-title">${d.title[lang]}</span>
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
  moveItemToDay(itemId, fromDayIdx, toDayIdx);
  activeDayIdx = toDayIdx;
  renderItinerary();
}

function confirmReset() {
  const msg = lang === 'zh' ? '確定要還原所有行程變更嗎？' : 'Reset all itinerary changes?';
  if (confirm(msg)) {
    resetState();
    renderItinerary();
  }
}

// ── ITEM EDIT MODAL ────────────────────────────────────────
function editItem(itemId) {
  const state = getState();
  let found = null;
  for (const d of state) {
    const it = d.items.find(it => it.id === itemId);
    if (it) { found = it; break; }
  }
  if (!found) return;

  const isZh = lang === 'zh';
  document.getElementById('edit-item-id').value   = itemId;
  document.getElementById('edit-place').value     = found.place?.[lang] || '';
  document.getElementById('edit-time').value      = found.time !== '—' ? found.time : '';
  document.getElementById('edit-duration').value  = found.duration && found.duration !== '—' ? found.duration : '';
  document.getElementById('edit-note').value      = found.note?.[lang] || '';
  document.getElementById('edit-sheet-title').textContent = isZh ? '編輯行程項目' : 'Edit Item';
  document.getElementById('lbl-place').textContent = isZh ? '地點名稱' : 'Place Name';
  document.getElementById('lbl-time').textContent  = isZh ? '時間' : 'Time (HH:MM)';
  document.getElementById('lbl-dur').textContent   = isZh ? '停留時間' : 'Duration';
  document.getElementById('lbl-note').textContent  = isZh ? '備注（目前語言）' : 'Note (current lang)';
  document.getElementById('edit-note').placeholder = isZh ? '備注說明...' : 'Add a note...';
  const saveBtn = document.querySelector('.edit-save-btn');
  if (saveBtn) saveBtn.textContent = isZh ? '儲存' : 'Save';
  document.getElementById('edit-sheet-overlay').style.display = 'flex';
}

function openAddItem() {
  const isZh = lang === 'zh';
  document.getElementById('edit-item-id').value   = '__new__';
  document.getElementById('edit-place').value     = '';
  document.getElementById('edit-time').value      = '';
  document.getElementById('edit-duration').value  = '';
  document.getElementById('edit-note').value      = '';
  document.getElementById('edit-sheet-title').textContent  = isZh ? '新增行程項目' : 'Add New Stop';
  document.getElementById('lbl-place').textContent = isZh ? '地點名稱' : 'Place Name';
  document.getElementById('lbl-time').textContent  = isZh ? '時間' : 'Time (HH:MM)';
  document.getElementById('lbl-dur').textContent   = isZh ? '停留時間' : 'Duration';
  document.getElementById('lbl-note').textContent  = isZh ? '備注' : 'Note';
  document.getElementById('edit-note').placeholder = isZh ? '備注說明...' : 'Add a note...';
  const saveBtn = document.querySelector('.edit-save-btn');
  if (saveBtn) saveBtn.textContent = isZh ? '新增' : 'Add';
  document.getElementById('edit-sheet-overlay').style.display = 'flex';
}

function confirmDeleteItem(itemId) {
  const msg = lang === 'zh' ? '確定要刪除這個行程項目嗎？' : 'Delete this item?';
  if (confirm(msg)) {
    deleteItem(itemId);
    renderItinerary();
  }
}

function closeEditSheet() {
  document.getElementById('edit-sheet-overlay').style.display = 'none';
}

function saveItemEdit() {
  const itemId   = document.getElementById('edit-item-id').value;
  const placeName = document.getElementById('edit-place').value.trim();
  const time     = document.getElementById('edit-time').value.trim()     || '—';
  const duration = document.getElementById('edit-duration').value.trim() || '—';
  const noteText = document.getElementById('edit-note').value.trim();

  // Reset save button text
  const saveBtn = document.querySelector('.edit-save-btn');
  if (saveBtn) saveBtn.textContent = lang === 'zh' ? '儲存' : 'Save';

  if (itemId === '__new__') {
    // ── ADD MODE ──
    const state  = getState();
    const dayNum = state[activeDayIdx].day;
    const id     = `d${dayNum}_u${Date.now()}`;
    const name   = placeName || (lang === 'zh' ? '新行程' : 'New Stop');
    addItem(activeDayIdx, {
      id,
      originalDay: dayNum,
      time,
      place:    { zh: name, en: name },
      duration,
      note:     noteText ? { zh: noteText, en: noteText } : null,
      maps:     null,
      warn:     false,
    });
  } else {
    // ── EDIT MODE ──
    const state = getState();
    let existing = null;
    for (const d of state) {
      const it = d.items.find(it => it.id === itemId);
      if (it) { existing = it; break; }
    }
    const changes = { time, duration };

    // Update place in current language (keep other lang unchanged)
    if (placeName) {
      changes.place = { ...(existing?.place || { zh: '', en: '' }), [lang]: placeName };
    }

    // Update note in current language
    const currentNote = existing?.note || null;
    changes.note = currentNote
      ? { ...currentNote, [lang]: noteText }
      : { zh: noteText, en: noteText };

    updateItem(itemId, changes);
  }

  closeEditSheet();
  renderItinerary();
}

// ── SOUVENIR PURCHASES ─────────────────────────────────────
function getSvPurchases() {
  try { return JSON.parse(localStorage.getItem('hk_sv_purchases') || '{}'); }
  catch { return {}; }
}

function setSvTab(t) {
  souvenirTab = t;
  svSubTab = 0;
  svOpenId = null;
  renderSouvenirs();
}

function setSvSubTab(i) {
  svSubTab = i;
  svOpenId = null;
  renderSouvenirs();
}

function openSvCard(id) {
  svOpenId = svOpenId === id ? null : id;
  renderSouvenirs();
}

function closeSvCard(e) {
  if (e) e.stopPropagation();
  svOpenId = null;
  renderSouvenirs();
}

function saveSvPurchase(id) {
  const qtyEl  = document.getElementById('sv-qty-'  + id);
  const paidEl = document.getElementById('sv-paid-' + id);
  const qty  = parseInt(qtyEl?.value)  || 1;
  const paid = parseInt(paidEl?.value) || 0;
  const purchases = getSvPurchases();
  purchases[id] = { qty, paid };
  localStorage.setItem('hk_sv_purchases', JSON.stringify(purchases));
  svOpenId = null;
  renderSouvenirs();
}

function clearSvPurchase(id) {
  const purchases = getSvPurchases();
  delete purchases[id];
  localStorage.setItem('hk_sv_purchases', JSON.stringify(purchases));
  svOpenId = null;
  renderSouvenirs();
}

function formatNote(text) {
  if (!text) return '';
  return text.replace(/(⚡[^；。<\n]*)/g, '<span class="warn-text">$1</span>');
}

// ── WEATHER ────────────────────────────────────────────────
const weatherCache = {};
const CITY_ZH = { Sapporo: '札幌', Hakodate: '函館', Toyako: '洞爺湖' };

function getWeatherEmoji(desc) {
  const d = (desc || '').toLowerCase();
  if (/snow|blizzard/.test(d)) return '❄️';
  if (/thunder/.test(d)) return '⛈';
  if (/rain|drizzle|shower/.test(d)) return '🌧';
  if (/fog|mist/.test(d)) return '🌫';
  if (/overcast/.test(d)) return '☁️';
  if (/cloud/.test(d)) return '⛅';
  return '☀️';
}

function getOutfitSuggestion(tempC) {
  const t = parseInt(tempC);
  if (lang === 'zh') {
    if (t < 5)  return '穿搭建議：厚羽絨衣 + 毛帽手套';
    if (t < 10) return '穿搭建議：羽絨衣 + 毛衣';
    if (t < 15) return '穿搭建議：輕薄外套 + 長袖';
    if (t < 20) return '穿搭建議：薄外套 / 長袖';
    return '穿搭建議：短袖，薄外套備用';
  } else {
    if (t < 5)  return 'Outfit: Heavy down coat + gloves';
    if (t < 10) return 'Outfit: Down jacket + sweater';
    if (t < 15) return 'Outfit: Light jacket + long sleeve';
    if (t < 20) return 'Outfit: Thin jacket / long sleeve';
    return 'Outfit: T-shirt, thin jacket as backup';
  }
}

function getSegmentIcon(t) {
  if (t === null || t === undefined) return '—';
  if (t >= 22) return '👕';
  if (t >= 15) return '🧥';
  if (t >= 10) return '🧤';
  return '🥶';
}

function renderWeatherCard(state) {
  const city = state?.[activeDayIdx]?.weatherCity || 'Sapporo';
  const cityLabel = lang === 'zh' ? (CITY_ZH[city] || city) : city;
  const segLabels = lang === 'zh' ? ['早', '午', '晚'] : ['AM', 'Noon', 'PM'];
  return `
    <div class="weather-card-v2">
      <div class="wc2-top">
        <div class="wc2-left">
          <div class="wc2-city" id="wc-city">${cityLabel}</div>
          <div class="wc2-temp" id="wc-temp">—°</div>
          <div class="wc2-feels" id="wc-feels"></div>
          <div class="wc2-outfit" id="wc-outfit">${lang === 'zh' ? '天氣載入中...' : 'Loading weather...'}</div>
        </div>
        <div class="wc2-right">
          <div class="wc2-emoji" id="wc-emoji">🌤</div>
          <div class="wc2-desc" id="wc-desc"></div>
          <button class="wc2-refresh" onclick="fetchWeather('${city}')">↻</button>
        </div>
      </div>
      <div class="wc2-segments" id="wc-segments" style="display:none">
        ${['morning','afternoon','evening'].map((k, i) => `
          <div class="wc2-seg">
            <div class="wc2-seg-label">${segLabels[i]}</div>
            <div class="wc2-seg-temp" id="wc-seg-${k}">—°</div>
            <div class="wc2-seg-icon" id="wc-seg-${k}-icon">—</div>
          </div>
          ${i < 2 ? '<div class="wc2-seg-div"></div>' : ''}
        `).join('')}
      </div>
    </div>
  `;
}

async function fetchWeather(city) {
  if (weatherCache[city]) { applyWeather(weatherCache[city]); return; }
  try {
    const res = await fetch(`https://wttr.in/${encodeURIComponent(city)}?format=j1`);
    const data = await res.json();
    const cur = data.current_condition[0];
    const hourly = data.weather?.[0]?.hourly || [];
    const getHourTemp = time => {
      const h = hourly.find(h => h.time === String(time));
      return h ? parseInt(h.tempC) : null;
    };
    const result = {
      city,
      desc: cur.weatherDesc[0].value,
      temp_c: cur.temp_C,
      feels: cur.FeelsLikeC,
      humidity: cur.humidity,
      hourly: {
        morning:   getHourTemp(600),
        afternoon: getHourTemp(1200),
        evening:   getHourTemp(1800),
      }
    };
    weatherCache[city] = result;
    applyWeather(result);
  } catch {
    const el = document.getElementById('wc-outfit');
    if (el) el.textContent = lang === 'zh' ? '無法取得天氣資料' : 'Weather unavailable';
  }
}

function applyWeather(w) {
  // Guard against stale responses: discard if city no longer matches active day
  const currentState = getState();
  const expectedCity = currentState[activeDayIdx]?.weatherCity;
  if (w.city !== expectedCity) return;

  const cityLabel = lang === 'zh' ? (CITY_ZH[w.city] || w.city) : w.city;
  const set = (id, val) => { const el = document.getElementById(id); if (el) el.textContent = val; };
  set('wc-city',   cityLabel);
  set('wc-emoji',  getWeatherEmoji(w.desc));
  set('wc-temp',   `${w.temp_c}°C`);
  set('wc-feels',  lang === 'zh'
    ? `體感 ${w.feels}°C · 濕度 ${w.humidity}%`
    : `Feels ${w.feels}°C · ${w.humidity}% humidity`);
  set('wc-desc',   w.desc);
  set('wc-outfit', getOutfitSuggestion(w.temp_c));

  if (w.hourly) {
    const seg = document.getElementById('wc-segments');
    if (seg) seg.style.display = 'flex';
    ['morning', 'afternoon', 'evening'].forEach(k => {
      const t = w.hourly[k];
      set(`wc-seg-${k}`,      t !== null ? `${t}°` : '—');
      set(`wc-seg-${k}-icon`, getSegmentIcon(t));
    });
  }
}

// ── SOUVENIRS ──────────────────────────────────────────────
function renderSouvenirs() {
  const container = document.getElementById('page-souvenirs');
  const purchases = getSvPurchases();

  // Totals across both tabs
  const allItems = [
    ...SOUVENIRS.flatMap(g => g.items),
    ...DRUGSTORE.flatMap(g => g.items),
  ];
  const totalBought = allItems.filter(i => purchases[i.id]).length;
  const totalSpent  = allItems.reduce((s, i) => s + (purchases[i.id]?.paid || 0), 0);

  const dataset    = souvenirTab === 0 ? SOUVENIRS : DRUGSTORE;
  const tab0Label  = lang === 'zh' ? '伴手禮' : 'Souvenirs';
  const tab1Label  = lang === 'zh' ? '藥妝' : 'Drugstore';
  const summaryTxt = lang === 'zh'
    ? `已購 ${totalBought} 件｜花費 ${totalSpent.toLocaleString()} 円`
    : `${totalBought} bought | ¥${totalSpent.toLocaleString()} spent`;

  // Guard svSubTab against out-of-range after tab switch
  const safeSubTab = Math.min(svSubTab, dataset.length - 1);

  // Sub-tab bar
  const subTabsHtml = dataset.map((g, i) => {
    const groupBought = g.items.filter(item => purchases[item.id]).length;
    const dot = groupBought > 0 ? `<span class="sv-subtab-dot"></span>` : '';
    return `<button class="sv-subtab${i === safeSubTab ? ' active' : ''}" onclick="setSvSubTab(${i})">
      ${g.tab[lang]}${dot}
    </button>`;
  }).join('');

  let html = `
    <div class="sv-tab-bar">
      <button class="sv-tab ${souvenirTab === 0 ? 'active' : ''}" onclick="setSvTab(0)">${tab0Label}</button>
      <button class="sv-tab ${souvenirTab === 1 ? 'active' : ''}" onclick="setSvTab(1)">${tab1Label}</button>
    </div>
    <div class="sv-subtab-bar">${subTabsHtml}</div>
    <div class="sv-summary">${summaryTxt}</div>
  `;

  // Only render the selected sub-tab group
  const group = dataset[safeSubTab];
  html += `<div class="sv-group"><div class="sv-group-title">${group.category[lang]}</div>`;

  group.items.forEach(item => {
    const p        = purchases[item.id];
    const isOpen   = svOpenId === item.id;
    const isBought = !!p;

    const badges = [
      item.cold    ? `<span class="badge badge-cold">❄ ${T[lang].cold}</span>` : '',
      item.airport ? `<span class="badge badge-airport">✈ ${T[lang].limitedAirport}</span>` : '',
    ].filter(Boolean).join('');
    const noteHtml = item.note ? `<div class="sv-card-note">${item.note[lang]}</div>` : '';

    const statusHtml = isBought
      ? `<div class="sv-status-bought">✓<br>${p.qty}件${p.paid ? '<br>' + p.paid.toLocaleString() + '円' : ''}</div>`
      : `<div class="sv-status-add">＋</div>`;

    const formHtml = isOpen ? `
      <div class="sv-form" onclick="event.stopPropagation()">
        <div class="sv-form-row">
          <label class="sv-form-label">${lang === 'zh' ? '數量' : 'Qty'}</label>
          <input class="sv-form-input" id="sv-qty-${item.id}" type="number" min="1" value="${p?.qty || 1}">
        </div>
        <div class="sv-form-row">
          <label class="sv-form-label">${lang === 'zh' ? '花費（円）' : 'Paid (¥)'}</label>
          <input class="sv-form-input" id="sv-paid-${item.id}" type="number" min="0" value="${p?.paid || ''}">
        </div>
        <div class="sv-form-btns">
          <button class="sv-btn-save" onclick="saveSvPurchase('${item.id}')">
            ${lang === 'zh' ? '記錄' : 'Save'}
          </button>
          <button class="sv-btn-cancel" onclick="closeSvCard(event)">
            ${lang === 'zh' ? '取消' : 'Cancel'}
          </button>
          ${isBought ? `<button class="sv-btn-clear" onclick="clearSvPurchase('${item.id}')">
            ${lang === 'zh' ? '清除' : 'Clear'}
          </button>` : ''}
        </div>
      </div>
    ` : '';

    html += `
      <div class="sv-card${isBought ? ' sv-bought' : ''}${isOpen ? ' sv-open' : ''}"
           onclick="openSvCard('${item.id}')">
        <div class="sv-card-body">
          <div class="sv-card-left">
            <div class="sv-card-name">${item.name[lang]}</div>
            ${item.price ? `<div class="sv-card-price">${item.price}</div>` : ''}
            ${badges ? `<div class="badge-row">${badges}</div>` : ''}
            ${noteHtml}
          </div>
          <div class="sv-card-right">${statusHtml}</div>
        </div>
        ${formHtml}
      </div>
    `;
  });

  html += '</div>';
  container.innerHTML = html;
}

// ── TRANSPORT ──────────────────────────────────────────────
function setTransportTab(t) {
  transportTab = t;
  renderTransport();
}

function renderTransport() {
  const container = document.getElementById('page-transport');

  const tabs = lang === 'zh'
    ? ['🚆 JR路線', '🚌 城市', '💴 預算']
    : ['🚆 JR', '🚌 City', '💴 Budget'];

  let html = `
    <div class="sv-tab-bar">
      ${tabs.map((t, i) => `
        <button class="sv-tab ${transportTab === i ? 'active' : ''}" onclick="setTransportTab(${i})">${t}</button>
      `).join('')}
    </div>
  `;

  if (transportTab === 0) {
    // Journey overview strip
    const cities = lang === 'zh'
      ? ['台北', '札幌', '小樽', '函館', '洞爺湖', '登別', '新千歲', '台北']
      : ['Taipei', 'Sapporo', 'Otaru', 'Hakodate', 'Lake Toya', 'Noboribetsu', 'New Chitose', 'Taipei'];
    const stripHtml = cities.map((c, i) =>
      `<span class="tr-city-chip">${c}</span>${i < cities.length - 1 ? '<span class="tr-chip-arrow">›</span>' : ''}`
    ).join('');
    html += `<div class="tr-journey-strip">${stripHtml}</div>`;

    TRANSPORT.jr.forEach(r => {
      const parts = r.route[lang].split(/\s*[→>]\s*/);
      const from  = parts[0] || '';
      const to    = parts[1] || '';
      html += `
        <div class="tr-card">
          <div class="tr-route-row">
            <span class="tr-city">${from}</span>
            <span class="tr-arrow-line"><span class="tr-arrow-track"></span><span class="tr-arrow-head">›</span></span>
            <span class="tr-city tr-city-to">${to}</span>
          </div>
          <div class="tr-train-name">${r.train[lang]}</div>
          <div class="tr-meta">
            <span class="tr-meta-item">⏱ ${r.time}</span>
            <span class="tr-meta-sep">·</span>
            <span class="tr-meta-item">💴 ${r.fare}</span>
          </div>
          ${r.note[lang] ? `<div class="tr-note">${r.note[lang]}</div>` : ''}
        </div>
      `;
    });

  } else if (transportTab === 1) {
    html += `<div class="section-title">🚌 ${lang === 'zh' ? '各城市交通' : 'Local Transit'}</div>`;
    TRANSPORT.local.forEach(l => {
      html += `
        <div class="tr-local-card">
          <div class="tr-local-city">${l.city[lang]}</div>
          <div class="tr-local-desc">${l.desc[lang]}</div>
        </div>
      `;
    });

    html += `<div class="section-title mt-8">💳 ${lang === 'zh' ? 'IC 卡（Suica）' : 'IC Card (Suica)'}</div>`;
    TRANSPORT.ic.forEach(ic => {
      html += `
        <div class="tr-ic-card">
          <div class="tr-ic-q">${ic.q[lang]}</div>
          <div class="tr-ic-a">${ic.a[lang]}</div>
        </div>
      `;
    });

  } else {
    html += `<div class="card" style="margin:0 12px"><table class="budget-table">`;
    BUDGET.forEach(b => {
      html += `<tr class="${b.total ? 'total-row' : ''}"><td>${b.item[lang]}</td><td>${b.est}</td></tr>`;
    });
    html += `</table></div>`;
  }

  container.innerHTML = html;
}

// ── CHECKLIST ──────────────────────────────────────────────
function renderChecklist() {
  const container = document.getElementById('page-checklist');
  const total = CHECKLIST.reduce((s, c) => s + c.items.length, 0);
  const done  = CHECKLIST.reduce((s, c) => s + c.items.filter(i => checkedItems.has(i.id)).length, 0);

  let html = `
    <div class="flight-bar">
      <div class="flight-row"><span class="flight-dir">${lang === 'zh' ? '去程' : 'Out'}</span><span class="flight-detail">CI130 · 5/14 08:35 ${lang === 'zh' ? '桃園 T2' : 'TPE T2'} → 13:35 ${lang === 'zh' ? '新千歲 T-I' : 'CTS T-I'}</span></div>
      <div class="flight-row"><span class="flight-dir">${lang === 'zh' ? '返程' : 'Ret'}</span><span class="flight-detail">CI131 · 5/22 15:05 ${lang === 'zh' ? '新千歲 T-I' : 'CTS T-I'} → 18:15 ${lang === 'zh' ? '桃園 T2' : 'TPE T2'}</span></div>
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
function setSosTab(t) { sosTab = t; renderSOS(); }

function renderSOS() {
  const container = document.getElementById('page-sos');
  const tab0 = lang === 'zh' ? '🆘 緊急' : '🆘 Emergency';
  const tab1 = lang === 'zh' ? '🗣 日文' : '🗣 Phrases';

  let html = `
    <div class="sv-tab-bar">
      <button class="sv-tab ${sosTab === 0 ? 'active' : ''}" onclick="setSosTab(0)">${tab0}</button>
      <button class="sv-tab ${sosTab === 1 ? 'active' : ''}" onclick="setSosTab(1)">${tab1}</button>
    </div>
  `;

  if (sosTab === 0) {
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
      <div class="section-title mt-8">💊 ${lang === 'zh' ? '緊急狀況處理' : 'Emergency Guide'}</div>
      <div class="card"><table class="transport-table"><tbody>
        <tr><td>${lang === 'zh' ? '過敏反應' : 'Allergic reaction'}</td><td>${lang === 'zh' ? '說「アレルギーです」→ 119' : 'Say "Arerugi desu" → 119'}</td></tr>
        <tr><td>${lang === 'zh' ? '迷路 / 遺失物' : 'Lost / Missing'}</td><td>${lang === 'zh' ? '最近派出所或 JR 站務員' : 'Nearest Koban or JR staff'}</td></tr>
        <tr><td>${lang === 'zh' ? '護照遺失' : 'Lost passport'}</td><td>${lang === 'zh' ? '報警 → 台灣駐大阪辦事處' : 'Police → TECRO Osaka'}</td></tr>
        <tr><td>${lang === 'zh' ? '班機延誤' : 'Flight delay'}</td><td>${lang === 'zh' ? '聯絡中華航空日本線' : 'Contact China Airlines Japan'}</td></tr>
      </tbody></table></div>
    `;
  } else {
    PHRASES.forEach(group => {
      html += `<div class="section-title">${group.category[lang]}</div>`;
      group.items.forEach(p => {
        html += `
          <div class="phrase-card">
            <div class="phrase-zh">${p.zh}</div>
            <div class="phrase-jp">${p.jp}</div>
            <div class="phrase-romaji">${p.romaji}</div>
          </div>
        `;
      });
    });
  }

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
  document.getElementById('edit-sheet-overlay').addEventListener('click', e => {
    if (e.target === e.currentTarget) closeEditSheet();
  });

  document.querySelectorAll('.page')[0].classList.add('active');
  renderAll();
});
