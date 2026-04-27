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
let pendingCascade = null; // { dayIdx, fromItemIdx, deltaMins }
let ovSubTab = 0; // 0 = 行程總覽, 1 = 備注

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
  renderOverview();
}

// ── Tabs ───────────────────────────────────────────────────
let activeTab = 0;
function renderTabs() {
  const icons = ['📋','🗓','🛍','🚆','✅','🆘'];
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
  if (i === 0) renderOverview();
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
  const placeTxt = item.place?.zh || '';
  const fullTxt = [placeTxt, item.place?.en || '', item.note?.zh || '', item.note?.en || ''].join(' ');
  // Sight landmarks — override before transport (運河, 夜景, 展望台, 神社, etc.)
  if (/運河|夜景散步|展望台|展望塔|觀景台|神宮|神社|煙火|足湯|美術館|溫泉街|地獄谷|公園|城跡|五稜郭|藻岩山|有珠山/i.test(placeTxt))
    return 'sight';
  // Transport
  if (/機場|airport|搭機|搭飛機|jr|特急|巴士|bus|shuttle|地下鉄|電車|train|抵達|出發|前往|IC卡|pasmo|suica|yamato|黑貓宅急便|行李報到|出境|安全檢查/i.test(fullTxt))
    return 'transport';
  // Food — check early so hotel breakfast isn't swallowed by hotel rule
  if (/早餐|自助餐|buffet/i.test(fullTxt))
    return 'food';
  // Hotel
  if (/飯店|hotel|resort|旅館|check.?in|check.?out|入住|退房|apa |dormy|威斯汀|洲際|hilton|solaria/i.test(fullTxt))
    return 'hotel';
  // Food (rest)
  if (/[🍜🍣🦀🍱🍛🍲🥩🍤🍺🥐]|拉麵|壽司|螃蟹|餐廳|食堂|午餐|晚餐|dinner|lunch|breakfast|ramen|sushi|crab|bbq|restaurant|居酒屋|成吉思汗|海鮮丼|ジンギスカン|聖代|パフェ|漢堡|burger|下午茶|甜點|dessert|銅鑼|dorayaki/i.test(fullTxt))
    return 'food';
  // Shop
  if (/購物|shopping|百貨|伴手禮|土産|royce|六花亭|calbee|ishiya|letao|tsujiguchi|朝市|海鮮市場|市場|藥妝/i.test(fullTxt))
    return 'shop';
  return 'sight';
}

// ── TRANSIT ESTIMATION + OSRM ──────────────────────────────
const osrmCache = {}; // 'day-N' → { 'i-j': mins } | null (failed)

// ── TRANSIT MODE OVERRIDES ─────────────────────────────────
const TRANSIT_MODE_META = {
  auto:    { icon: '🤖', zh: '自動估算',    en: 'Auto' },
  walk:    { icon: '🚶', zh: '走路',        en: 'Walk' },
  car:     { icon: '🚕', zh: '計程車／自駕', en: 'Car/Taxi' },
  transit: { icon: '🚃', zh: '大眾運輸',    en: 'Transit' },
  custom:  { icon: '✏️', zh: '自訂分鐘',    en: 'Custom' },
};

function getTransitModes() {
  try { return JSON.parse(localStorage.getItem('hk_transit_modes') || '{}'); }
  catch { return {}; }
}

function resolveTransit(pairKey, coord1, coord2, osrmMins) {
  const override = getTransitModes()[pairKey];
  const km = haversineKm(coord1, coord2);
  if (override) {
    switch (override.mode) {
      case 'walk':    return { mins: Math.max(1, Math.round(km / 4.5 * 60 * 1.2)), mode: 'walk',    approx: true };
      case 'car':     return osrmMins != null
                        ? { mins: osrmMins,    mode: 'car', approx: false }
                        : { mins: Math.max(1, Math.round(km * 1.4 / 25 * 60)), mode: 'car', approx: true };
      case 'transit': return { mins: Math.max(5, Math.round(km * 1.5 / 30 * 60) + 10), mode: 'transit', approx: true };
      case 'custom':  return { mins: override.customMins || 30, mode: 'custom', approx: false };
    }
  }
  // Auto: OSRM car if available, else haversine estimate
  if (osrmMins != null) return { mins: osrmMins, mode: 'car', approx: false };
  return { ...estimateTransit(coord1, coord2), approx: true };
}

function estimateByModeKm(km, mode) {
  switch (mode) {
    case 'walk':    return Math.max(1, Math.round(km / 4.5 * 60 * 1.2));
    case 'car':     return Math.max(1, Math.round(km * 1.4 / 25 * 60));
    case 'transit': return Math.max(5, Math.round(km * 1.5 / 30 * 60) + 10);
    default: return null;
  }
}

async function fetchDayTransits(dayState) {
  const items = dayState.items;
  const pairs = [];
  for (let i = 0; i < items.length - 1; i++) {
    const curr = items[i], next = items[i + 1];
    if (curr.coord && next.coord &&
        getCategory(curr) !== 'transport' &&
        getCategory(next) !== 'transport') {
      pairs.push({ from: curr.coord, to: next.coord, fi: i, ti: i + 1 });
    }
  }
  if (pairs.length === 0) return {};

  // Each pair gets 2 consecutive slots: [from0, to0, from1, to1, ...]
  const coordArr = pairs.flatMap(p => [
    `${p.from[1]},${p.from[0]}`,
    `${p.to[1]},${p.to[0]}`
  ]);
  const sources = pairs.map((_, i) => i * 2).join(',');
  const dests   = pairs.map((_, i) => i * 2 + 1).join(',');
  const url = `https://router.project-osrm.org/table/v1/driving/${coordArr.join(';')}?sources=${sources}&destinations=${dests}&annotations=duration`;

  try {
    const resp = await fetch(url, { signal: AbortSignal.timeout(6000) });
    if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
    const data = await resp.json();
    if (data.code !== 'Ok') throw new Error(data.code);
    const result = {};
    pairs.forEach((p, i) => {
      const secs = data.durations[i]?.[i];
      if (secs != null) result[`${p.fi}-${p.ti}`] = Math.max(1, Math.round(secs / 60));
    });
    return result;
  } catch (e) {
    console.warn('[OSRM] failed, using estimates:', e.message);
    return null;
  }
}

async function updateTransitsForDay(dayIdx) {
  const state = getState();
  if (dayIdx !== activeDayIdx) return;
  const dayState = state[dayIdx];
  const key = `day-${dayState.day}`;
  if (key in osrmCache) return; // already fetched or failed
  osrmCache[key] = undefined; // mark as in-flight
  const transits = await fetchDayTransits(dayState);
  osrmCache[key] = transits;
  if (dayIdx === activeDayIdx) renderItinerary();
}

function haversineKm(c1, c2) {
  const R = 6371, r = Math.PI / 180;
  const dLat = (c2[0] - c1[0]) * r, dLon = (c2[1] - c1[1]) * r;
  const a = Math.sin(dLat/2)**2 + Math.cos(c1[0]*r)*Math.cos(c2[0]*r)*Math.sin(dLon/2)**2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
}

function estimateTransit(c1, c2) {
  if (!c1 || !c2) return null;
  const roadKm = haversineKm(c1, c2) * 1.4;
  if (roadKm < 0.8) return { mins: Math.max(2, Math.round(roadKm / 4.5 * 60)), mode: 'walk' };
  return { mins: Math.max(5, Math.round(roadKm / 25 * 60)), mode: 'car' };
}

function minsToTimeStr(m) {
  const h = Math.floor(m / 60) % 24;
  const mn = m % 60;
  return `${String(h).padStart(2,'0')}:${String(mn).padStart(2,'0')}`;
}

// ── BUSINESS HOURS DETECTION (#4) ─────────────────────────
function parseHours(hoursStr) {
  if (!hoursStr) return null;
  // Skip hotel check-in/out strings
  if (/入住|退房|check.?in|check.?out/i.test(hoursStr)) return null;
  // Irregular — can't reliably detect
  if (/不定休|irregular/i.test(hoursStr)) return { irregular: true };
  // Always open
  if (/全日.*開放|全年.*無休|open all day|open year.round/i.test(hoursStr))
    return { alwaysOpen: true };

  // Extract time ranges: strict 2-digit HH:MM to avoid matching dates like 10/16
  const timeRangeRe = /(\d{2}):(\d{2})\s*[–\-–]\s*(?:翌)?(\d{2}):(\d{2})/g;
  const ranges = [];
  let m;
  while ((m = timeRangeRe.exec(hoursStr)) !== null) {
    const open  = parseInt(m[1]) * 60 + parseInt(m[2]);
    let   close = parseInt(m[3]) * 60 + parseInt(m[4]);
    if (close <= open) close += 1440; // overnight (incl. –00:00)
    ranges.push({ open, close });
  }
  if (ranges.length === 0) return null;

  // Extract closed days (Chinese: 週X公休, only when directly preceding 公休)
  const dayMap = { '一':1,'二':2,'三':3,'四':4,'五':5,'六':6,'日':0,'天':0 };
  const closedDays = [];
  const closedRe = /((?:週[一二三四五六日天](?:・|&|、)?)+)公休/g;
  let cr;
  while ((cr = closedRe.exec(hoursStr)) !== null) {
    const chars = cr[1].match(/週([一二三四五六日天])/g) || [];
    chars.forEach(c => { const d = dayMap[c[1]]; if (d !== undefined) closedDays.push(d); });
  }
  // English closed days
  const enDayMap = { mon:1, tue:2, wed:3, thu:4, fri:5, sat:6, sun:0 };
  const enClosed = /closed\s+(mon|tue|wed|thu|fri|sat|sun)/gi;
  let ec;
  while ((ec = enClosed.exec(hoursStr)) !== null) {
    const d = enDayMap[ec[1].toLowerCase()]; if (d !== undefined) closedDays.push(d);
  }

  return { ranges, closedDays };
}

function getDayOfWeek(dayState) {
  const m = (dayState.date?.zh || '').match(/（([一二三四五六日天])）/);
  if (!m) return null;
  const map = { '一':1,'二':2,'三':3,'四':4,'五':5,'六':6,'日':0,'天':0 };
  return map[m[1]] ?? null;
}

function checkHoursConflict(item, dayState) {
  if (!item.place?.zh) return null;
  const key    = cleanPlaceName(item.place.zh);
  const detail = PLACE_DETAIL[key];
  if (!detail?.hours) return null;

  const parsed = parseHours(detail.hours.zh);
  if (!parsed || parsed.alwaysOpen || parsed.irregular) return null;

  const itemMins = parseTimeMin(item.time);
  if (itemMins < 0) return null; // no scheduled time

  const dow = getDayOfWeek(dayState);
  const dowNames = lang === 'zh'
    ? ['日','一','二','三','四','五','六']
    : ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];

  // Closed day?
  if (dow !== null && parsed.closedDays.includes(dow)) {
    return {
      type: 'closed',
      msg: lang === 'zh' ? `⛔ 週${dowNames[dow]}公休` : `⛔ Closed ${dowNames[dow]}`
    };
  }

  // Outside operating hours?
  if (parsed.ranges.length > 0) {
    const inRange = parsed.ranges.some(r => itemMins >= r.open && itemMins < r.close);
    if (!inRange) {
      const display = parsed.ranges
        .map(r => `${minsToTimeStr(r.open % 1440)}–${minsToTimeStr(r.close % 1440)}`)
        .join(', ');
      return {
        type: 'outside',
        msg: lang === 'zh' ? `⏰ 營業 ${display}` : `⏰ Open ${display}`
      };
    }
  }
  return null;
}

// ── CASCADE ─────────────────────────────────────────────────
function offerCascade(dayIdx, fromItemIdx, deltaMins) {
  const state = getState();
  const afterItems = state[dayIdx].items
    .slice(fromItemIdx + 1)
    .filter(it => parseTimeMin(it.time) >= 0);
  if (afterItems.length === 0) return;
  pendingCascade = { dayIdx, fromItemIdx, deltaMins };
  renderItinerary();
}

function applyCascade() {
  if (!pendingCascade) return;
  const { dayIdx, fromItemIdx, deltaMins } = pendingCascade;
  const state = getState();
  const items = state[dayIdx].items;
  for (let i = fromItemIdx + 1; i < items.length; i++) {
    const t = parseTimeMin(items[i].time);
    if (t >= 0) updateItem(items[i].id, { time: minsToTimeStr(t + deltaMins) });
  }
  pendingCascade = null;
  renderItinerary();
}

function dismissCascade() {
  pendingCascade = null;
  renderItinerary();
}

// ── ITINERARY ──────────────────────────────────────────────
function renderItinerary() {
  const container = document.getElementById('page-itinerary');
  const state = getState();
  let html = renderWeatherCard(state);
  html += renderDayStrip(state);
  html += renderActiveDayView(state);
  container.innerHTML = html;

  // SortableJS drag-and-drop (edit mode only)
  if (editMode && typeof Sortable !== 'undefined') {
    const timelineEl = container.querySelector('.timeline');
    if (timelineEl) {
      Sortable.create(timelineEl, {
        animation: 150,
        handle: '.drag-handle',
        ghostClass: 'tl-drag-ghost',
        chosenClass: 'tl-drag-chosen',
        delay: 0,
        delayOnTouchOnly: false,
        onEnd(evt) {
          if (evt.oldIndex !== evt.newIndex) {
            moveItemWithinDay(activeDayIdx, evt.oldIndex, evt.newIndex);
            renderItinerary();
          }
        },
      });
    }
  }

  // Scroll active pill into view
  setTimeout(() => {
    const pill = document.querySelector('.day-pill.active');
    if (pill) pill.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
  }, 60);

  // Fetch weather for active day
  fetchWeather(state[activeDayIdx].weatherCity);

  // Fetch OSRM transits in background (no-op if cached)
  updateTransitsForDay(activeDayIdx).catch(() => {});
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
  pendingCascade = null;
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
    .filter(item => item.coord && getCategory(item) !== 'transport')
    .map(item => ({ ...item, coords: item.coord }));

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
    L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
      attribution: '© OpenStreetMap © CARTO', maxZoom: 19, subdomains: 'abcd',
    }).addTo(leafletMap);

    const markers = stops.map((item, i) => {
      const icon = L.divIcon({
        className: 'map-pin-wrap',
        html: `<div class="map-pin">${i + 1}</div>`,
        iconSize: [30, 30], iconAnchor: [15, 15], popupAnchor: [0, -18],
      });
      const name = cleanPlaceName(item.place[lang]) || item.place[lang];
      const labelName = name.length > 14 ? name.slice(0, 13) + '…' : name;
      const mapsUrl = item.maps ||
        `https://www.google.com/maps/search/${encodeURIComponent(item.place.zh + ' 北海道')}`;
      const marker = L.marker(item.coords, { icon }).addTo(leafletMap);
      marker.bindTooltip(labelName, {
        permanent: true, direction: 'right', className: 'map-label', offset: [8, 0],
      });
      marker.bindPopup(`
        <div class="map-popup">
          <div class="mp-num">${item.time && item.time !== '—' ? item.time : ''}</div>
          <div class="mp-name">${name}</div>
          <a href="${mapsUrl}" target="_blank" rel="noopener" class="mp-nav">
            📍 ${lang === 'zh' ? '導航到這裡' : 'Navigate here'}
          </a>
        </div>`, { maxWidth: 220 });
      return marker;
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
    .replace(/\s*[+＋→]\s*.+$/, '') // strip " + 副地點" / " → 副動作"
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
    let mt = null;
    let explicit = false;
    // Explicit keyword (【早/午/晚餐】) always wins over time-based fallback
    if (/早餐|breakfast/i.test(name))      { mt = 'breakfast'; explicit = true; }
    else if (/午餐|lunch/i.test(name))     { mt = 'lunch';     explicit = true; }
    else if (/晚餐|dinner/i.test(name))    { mt = 'dinner';    explicit = true; }
    // Fall back to emoji + time (mealType from impact.js)
    if (!mt) mt = mealType(item);
    if (!mt || mt === 'any') return;
    // Explicit keyword overwrites time-based; time-based only fills empty slot
    if (explicit || !meals[mt]) meals[mt] = cleanPlaceName(item.place[lang]) || item.place[lang];
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
      ${editMode ? `
        <button class="copy-day-btn" onclick="confirmCopyDay(${activeDayIdx})">⎘ ${lang === 'zh' ? '複製本天' : 'Copy Day'}</button>
        <button class="del-day-btn" onclick="confirmDeleteDay(${activeDayIdx})">🗑 ${lang === 'zh' ? '清空本天' : 'Clear Day'}</button>
      ` : ''}
      ${isModified()
        ? `<button class="reset-btn" onclick="confirmReset()">↺ ${lang === 'zh' ? '還原' : 'Reset'}</button>`
        : ''}
    </div>
  `;

  // Cascade banner
  if (pendingCascade && pendingCascade.dayIdx === activeDayIdx) {
    const afterCount = dayState.items
      .slice(pendingCascade.fromItemIdx + 1)
      .filter(it => parseTimeMin(it.time) >= 0).length;
    const sign = pendingCascade.deltaMins > 0 ? '+' : '';
    const msg = lang === 'zh'
      ? `後面 ${afterCount} 個行程需推移 ${sign}${pendingCascade.deltaMins} 分，一起調整？`
      : `Shift ${afterCount} items by ${sign}${pendingCascade.deltaMins}min?`;
    html += `
      <div class="cascade-banner">
        <span class="cascade-msg">${msg}</span>
        <button class="cascade-apply" onclick="applyCascade()">${lang === 'zh' ? '推移' : 'Shift'}</button>
        <button class="cascade-dismiss" onclick="dismissCascade()">${lang === 'zh' ? '略過' : 'Skip'}</button>
      </div>
    `;
  }

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
      ? `<a href="${item.maps}" target="_blank" rel="noopener" class="map-btn" onclick="event.stopPropagation()">📍 ${T[lang].mapBtn}</a>`
      : '';

    const detailKey    = cleanPlaceName(item.place.zh);
    const hasDetail    = !editMode && !!PLACE_DETAIL[detailKey];
    const isTappable   = !editMode;
    const hoursConflict    = !editMode ? checkHoursConflict(item, dayState) : null;
    const recommendText    = !editMode && (cat === 'food' || cat === 'hotel') && PLACE_DETAIL[detailKey]?.recommend
      ? PLACE_DETAIL[detailKey].recommend[lang] : null;
    const bannerHtml = !editMode && item.img
      ? `<div class="tl-card-banner">
          <img src="${item.img}" alt="" loading="lazy">
          ${item.time && item.time !== '—' ? `<div class="tl-banner-time">${item.time}</div>` : ''}
        </div>`
      : '';

    let rowCls = '';
    if (isConflict) rowCls = 'tl-conflict';
    else if (isMoved) rowCls = 'tl-moved';
    else if (item.warn) rowCls = 'tl-warn';

    // Transit connector to next item
    let transitHTML = '';
    if (!isLast && !editMode) {
      const nextItem = items[itemIdx + 1];
      const nextCat  = getCategory(nextItem);
      const skipTransit = cat === 'transport' || nextCat === 'transport';
      if (!skipTransit && item.coord && nextItem.coord) {
        const cacheKey = `day-${dayState.day}`;
        const osrmMins = osrmCache[cacheKey]?.[`${itemIdx}-${itemIdx+1}`] ?? null;
        const pairKey  = `d${dayState.day}_${item.id}_${nextItem.id}`;
        const transit  = resolveTransit(pairKey, item.coord, nextItem.coord, osrmMins);
        if (transit) {
          const tCurr = parseTimeMin(item.time);
          const dur   = parseDurationMin(item.duration);
          const tNext = parseTimeMin(nextItem.time);
          const endWithTransit = (tCurr >= 0 && dur > 0) ? tCurr + dur + transit.mins : -1;
          const hasConflict = endWithTransit > 0 && tNext >= 0 && tNext < endWithTransit;
          const icon   = TRANSIT_MODE_META[transit.mode]?.icon || '🚕';
          const approx = transit.approx ? (lang === 'zh' ? '約' : '~') : '';
          const unit   = lang === 'zh' ? '分' : 'min';
          const hasOverride = !!getTransitModes()[pairKey];
          transitHTML = `
            <div class="tl-transit-connector${hasConflict ? ' tl-transit-conflict' : ''}">
              <span class="tl-transit-badge tl-transit-tappable${hasOverride ? ' tl-transit-overridden' : ''}"
                    onclick="openTransitSheet('${pairKey}',${item.coord[0]},${item.coord[1]},${nextItem.coord[0]},${nextItem.coord[1]})">
                ${icon} ${approx}${transit.mins}${unit} ▾
              </span>
              ${hasConflict ? `<span class="tl-transit-warn">${lang === 'zh' ? '⚠ 時間不足' : '⚠ Not enough time'}</span>` : ''}
            </div>`;
        }
      }
    }

    html += `
      <div class="tl-row ${rowCls}" data-id="${item.id}">
        <div class="tl-time-col">${item.time !== '—' ? item.time : ''}</div>
        <div class="tl-axis-col">
          <div class="tl-dot ${catInfo.cls}"></div>
          ${isLast ? '' : '<div class="tl-vline"></div>'}
        </div>
        <div class="tl-content">
          <div class="tl-card ${isConflict ? 'card-conflict' : ''} ${isMoved ? 'card-moved' : ''} ${hasDetail ? 'tl-card-tappable' : ''} ${isTappable && !hasDetail ? 'tl-card-plain-tap' : ''}"
               ${isTappable ? `data-dk="${detailKey}" onclick="openDetailSheet(this.dataset.dk)"` : ''}>
            ${bannerHtml}
            <div class="tl-card-top">
              <span class="cat-chip ${catInfo.cls}">${catInfo.icon} ${catInfo[lang]}</span>
              ${hasDetail ? `<span class="detail-hint">ⓘ</span>` : ''}
              ${editMode ? `
                <div class="tl-edit-btns">
                  <span class="drag-handle" title="拖曳排序">⠿</span>
                  <button class="ctrl-btn ctrl-edit" onclick="event.stopPropagation();editItem('${item.id}')">✎</button>
                  <button class="ctrl-btn ctrl-copy" onclick="event.stopPropagation();copyItem('${item.id}')">⎘</button>
                  <button class="ctrl-btn ctrl-del" onclick="event.stopPropagation();confirmDeleteItem('${item.id}')">✕</button>
                </div>
              ` : ''}
            </div>
            <div class="tl-place">${item.place[lang]}</div>
            ${recommendText ? `<div class="tl-recommend">⭐ ${recommendText}</div>` : ''}
            ${item.duration && item.duration !== '—' ? `<div class="tl-duration">${item.duration}</div>` : ''}
            ${noteHTML ? `<div class="tl-note">${noteHTML}</div>` : ''}
            ${isConflict ? `<div class="conflict-warn">⏱ ${lang === 'zh' ? '時間可能衝突' : 'Possible conflict'}</div>` : ''}
            ${hoursConflict ? `<div class="hours-warn">${hoursConflict.msg}</div>` : ''}
            ${isMoved ? `<div class="moved-tag">${lang === 'zh' ? `從 Day ${item.originalDay} 移入` : `From Day ${item.originalDay}`}</div>` : ''}
            <div class="tl-actions">
              ${mapHTML}
              ${editMode ? `<button class="move-day-btn" onclick="event.stopPropagation();showMoveSheet('${item.id}', ${activeDayIdx})">📅 ${lang === 'zh' ? '移到...' : 'Move to...'}</button>` : ''}
            </div>
          </div>
          ${transitHTML}
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

function confirmDeleteDay(dayIdx) {
  const state = getState();
  const day = state[dayIdx];
  const label = `Day ${day.day}（${day.date[lang]}）`;
  const msg = lang === 'zh'
    ? `確定要清空 ${label} 的全部行程嗎？此操作可透過「還原」復原。`
    : `Clear all items for ${label}? You can undo with Reset.`;
  if (confirm(msg)) {
    clearDayItems(dayIdx);
    renderItinerary();
  }
}

// ── TRANSIT MODE SHEET ────────────────────────────────────
let _tSheet = null; // { pairKey, coord1, coord2 }

function openTransitSheet(pairKey, lat1, lng1, lat2, lng2) {
  _tSheet = { pairKey, coord1: [lat1, lng1], coord2: [lat2, lng2] };
  renderTransitSheet();
}

function renderTransitSheet() {
  if (!_tSheet) return;
  const { pairKey, coord1, coord2 } = _tSheet;
  const modes     = getTransitModes();
  const current   = modes[pairKey]?.mode || 'auto';
  const customMins = modes[pairKey]?.customMins || 30;
  const km        = haversineKm(coord1, coord2);
  const unit      = lang === 'zh' ? '分' : 'min';

  const options = ['auto', 'walk', 'car', 'transit', 'custom'];
  let optHtml = options.map(key => {
    const meta   = TRANSIT_MODE_META[key];
    const isActive = current === key;
    let estStr = '';
    if (key !== 'auto' && key !== 'custom') {
      const est = estimateByModeKm(km, key);
      if (est) estStr = `<span class="ts-est">${lang === 'zh' ? '約' : '~'}${est}${unit}</span>`;
    } else if (key === 'auto') {
      const autoEst = Math.max(1, Math.round(km < 0.8 ? km / 4.5 * 60 * 1.2 : km * 1.4 / 25 * 60));
      estStr = `<span class="ts-est">${lang === 'zh' ? '約' : '~'}${autoEst}${unit}</span>`;
    }
    return `
      <button class="ts-option${isActive ? ' active' : ''}" onclick="selectTransitMode('${key}')">
        <span class="ts-icon">${meta.icon}</span>
        <span class="ts-label">${meta[lang] || meta.zh}</span>
        ${estStr}
      </button>`;
  }).join('');

  let customRow = '';
  if (current === 'custom') {
    customRow = `
      <div class="ts-custom-row">
        <input type="number" id="ts-custom-mins" class="ts-custom-input"
               value="${customMins}" min="1" max="480">
        <span class="ts-custom-unit">${unit}</span>
      </div>`;
  }

  let transitMapLink = '';
  if (current === 'transit') {
    const gmUrl = `https://www.google.com/maps/dir/?api=1&origin=${coord1[0]},${coord1[1]}&destination=${coord2[0]},${coord2[1]}&travelmode=transit`;
    transitMapLink = `<a href="${gmUrl}" target="_blank" rel="noopener" class="ts-gmap-btn">🗺 ${lang === 'zh' ? '查 Google Maps 大眾交通路線' : 'View Transit on Google Maps'}</a>`;
  }

  document.getElementById('transit-sheet').innerHTML = `
    <div class="ts-title">${lang === 'zh' ? '選擇移動方式' : 'Select Transit Mode'}</div>
    <div class="ts-options">${optHtml}</div>
    ${customRow}
    ${transitMapLink}
    <div class="ts-btns">
      <button class="ts-save" onclick="saveTransitMode()">${lang === 'zh' ? '✓ 確認' : '✓ Apply'}</button>
      <button class="ts-cancel" onclick="closeTransitSheet()">${lang === 'zh' ? '取消' : 'Cancel'}</button>
    </div>
  `;
  document.getElementById('transit-sheet-overlay').style.display = 'flex';
}

function selectTransitMode(mode) {
  if (!_tSheet) return;
  const modes = getTransitModes();
  const { pairKey } = _tSheet;
  if (mode === 'auto') {
    delete modes[pairKey];
  } else {
    modes[pairKey] = { mode, customMins: modes[pairKey]?.customMins || 30 };
  }
  localStorage.setItem('hk_transit_modes', JSON.stringify(modes));
  renderTransitSheet();
}

function saveTransitMode() {
  if (!_tSheet) return;
  const { pairKey } = _tSheet;
  const modes = getTransitModes();
  if (modes[pairKey]?.mode === 'custom') {
    const mins = parseInt(document.getElementById('ts-custom-mins')?.value) || 30;
    modes[pairKey] = { mode: 'custom', customMins: mins };
    localStorage.setItem('hk_transit_modes', JSON.stringify(modes));
  }
  closeTransitSheet();
  renderItinerary();
}

function closeTransitSheet() {
  document.getElementById('transit-sheet-overlay').style.display = 'none';
  _tSheet = null;
}

// ── COPY ITEM / COPY DAY ──────────────────────────────────
function copyItem(itemId) {
  const state = getState();
  let found = null, foundDayIdx = -1;
  for (let di = 0; di < state.length; di++) {
    const it = state[di].items.find(it => it.id === itemId);
    if (it) { found = it; foundDayIdx = di; break; }
  }
  if (!found) return;
  const dayNum = state[foundDayIdx].day;
  addItem(foundDayIdx, { ...found, id: `d${dayNum}_c${Date.now()}` });
  renderItinerary();
}

function confirmCopyDay(fromDayIdx) {
  const state = getState();
  const overlay = document.getElementById('move-sheet-overlay');
  const list    = document.getElementById('move-day-list');
  document.getElementById('move-sheet-title').textContent =
    lang === 'zh' ? '複製到哪一天？' : 'Copy to which day?';
  list.innerHTML = state.map((d, i) => {
    if (i === fromDayIdx) return '';
    const dateNum = d.date.zh.match(/\/(\d+)/)?.[1] || d.day;
    return `
      <button class="move-day-option" onclick="executeCopyDay(${fromDayIdx}, ${i})">
        <span class="move-day-num">${T[lang].day} ${d.day} · ${dateNum}</span>
        <span class="move-day-title">${d.title[lang]}</span>
      </button>
    `;
  }).join('');
  document.getElementById('move-sheet-cancel').textContent = lang === 'zh' ? '取消' : 'Cancel';
  overlay.style.display = 'flex';
}

function executeCopyDay(fromDayIdx, toDayIdx) {
  closeSheet();
  const state = getState();
  const dayNum = state[toDayIdx].day;
  state[fromDayIdx].items.forEach((item, i) => {
    addItem(toDayIdx, { ...item, id: `d${dayNum}_c${Date.now()}_${i}`, originalDay: dayNum });
  });
  activeDayIdx = toDayIdx;
  renderItinerary();
}

// ── OVERVIEW PAGE ──────────────────────────────────────────
const DAY_COLORS = ['#e63946','#f77f00','#f1c40f','#27ae60','#1abc9c','#3498db','#9b59b6','#e76f51','#f72585'];

function renderOverview() {
  const container = document.getElementById('page-overview');
  if (!container) return;
  const state = getState();

  let html = `<div class="overview-page">`;

  // Sub-tab bar
  const tabScheduleLabel = lang === 'zh' ? '行程總覽' : 'Schedule';
  const tabNotesLabel    = lang === 'zh' ? '備注'     : 'Notes';
  html += `
    <div class="ov-sub-tabs">
      <button class="ov-sub-tab ${ovSubTab === 0 ? 'active' : ''}" onclick="setOvSubTab(0)">${tabScheduleLabel}</button>
      <button class="ov-sub-tab ${ovSubTab === 1 ? 'active' : ''}" onclick="setOvSubTab(1)">${tabNotesLabel}</button>
    </div>
  `;

  if (ovSubTab === 0) {
    // ── Schedule view ─────────────────────────────────────
    html += `
      <div class="overview-actions">
        <button class="ov-btn ov-map-btn" onclick="openAllDaysMap()">🗺 ${lang === 'zh' ? '地圖總覽' : 'Full Map'}</button>
        <button class="ov-btn ov-export-btn" onclick="exportTripText()">📋 ${lang === 'zh' ? '輸出文字' : 'Export'}</button>
      </div>
    `;
    state.forEach((day, idx) => {
      const color = DAY_COLORS[idx % DAY_COLORS.length];
      const itemsHtml = day.items.map(item => {
        const t = item.time !== '—'
          ? `<span class="ov-item-time">${item.time}</span>`
          : `<span class="ov-item-time ov-time-empty">—</span>`;
        return `<div class="ov-item">${t}<span class="ov-item-place">${item.place[lang]}</span></div>`;
      }).join('');
      html += `
        <div class="ov-day-card" onclick="goToDay(${idx})" style="--day-color:${color}">
          <div class="ov-day-header">
            <span class="ov-day-badge" style="background:${color}">${T[lang].day} ${day.day}${T[lang].dayUnit}</span>
            <span class="ov-day-date">${day.date[lang]}</span>
            <span class="ov-day-title">${day.title[lang]}</span>
          </div>
          <div class="ov-day-items">${itemsHtml || `<span class="ov-empty">${lang === 'zh' ? '（無行程）' : '(No items)'}</span>`}</div>
        </div>
      `;
    });
  } else {
    // ── Notes view ────────────────────────────────────────
    const notes = localStorage.getItem('hk_trip_notes') || '';
    html += `
      <div class="ov-notes-section ov-notes-fullpage">
        <div class="ov-notes-label">📝 ${lang === 'zh' ? '個人備注' : 'Personal Notes'}</div>
        <textarea class="ov-notes-area ov-notes-tall" id="ov-notes-input"
          placeholder="${lang === 'zh' ? '行前注意事項、提醒事項、要帶的東西...' : 'Pre-trip notes, reminders, packing list...'}"
          oninput="saveOvNotes()">${notes}</textarea>
      </div>
    `;
  }

  html += `</div>`;
  container.innerHTML = html;
}

function goToDay(idx) {
  activeDayIdx = idx;
  activeTab = 1;
  document.querySelectorAll('.page').forEach((p, i) => p.classList.toggle('active', i === 1));
  renderTabs();
  renderItinerary();
}

function setOvSubTab(i) {
  ovSubTab = i;
  renderOverview();
}

function saveOvNotes() {
  const val = document.getElementById('ov-notes-input')?.value || '';
  localStorage.setItem('hk_trip_notes', val);
}

function exportTripText() {
  const state = getState();
  const lines = [T[lang].appTitle, ''];
  state.forEach(day => {
    lines.push(`── ${T[lang].day} ${day.day}${T[lang].dayUnit}  ${day.date[lang]}  ${day.title[lang]} ──`);
    day.items.forEach(item => {
      const t   = item.time !== '—' ? item.time : '     ';
      const dur = item.duration && item.duration !== '—' ? `  (${item.duration})` : '';
      lines.push(`${t}  ${item.place[lang]}${dur}`);
    });
    lines.push('');
  });
  const text = lines.join('\n');

  const btn = document.querySelector('.ov-export-btn');
  const origText = btn?.textContent;

  if (navigator.clipboard) {
    navigator.clipboard.writeText(text).then(() => {
      if (btn) {
        btn.textContent = lang === 'zh' ? '✓ 已複製！' : '✓ Copied!';
        setTimeout(() => { if (btn) btn.textContent = origText; }, 2000);
      }
    });
  } else {
    prompt(lang === 'zh' ? '複製以下文字：' : 'Copy the text below:', text);
  }
}

function openAllDaysMap() {
  if (typeof L === 'undefined') {
    alert(lang === 'zh' ? '地圖需要網路連線' : 'Map requires internet connection');
    return;
  }
  const state = getState();
  const modal = document.getElementById('map-modal');
  document.getElementById('map-modal-title').textContent = lang === 'zh' ? '全程路線總覽' : 'All Days Map';
  modal.style.display = 'flex';

  if (leafletMap) { leafletMap.remove(); leafletMap = null; }
  leafletMap = L.map('map-leaflet');
  L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
    attribution: '© CartoDB', maxZoom: 18,
  }).addTo(leafletMap);

  const allBounds = [];
  state.forEach((dayState, dayIdx) => {
    const color = DAY_COLORS[dayIdx % DAY_COLORS.length];
    const stops = dayState.items.filter(it => it.coord && getCategory(it) !== 'transport');
    if (!stops.length) return;
    const coords = stops.map(s => s.coord);
    allBounds.push(...coords);
    if (coords.length > 1) L.polyline(coords, { color, weight: 3, opacity: 0.75 }).addTo(leafletMap);
    stops.forEach((stop, si) => {
      const icon = L.divIcon({
        className: '',
        html: `<div style="background:${color};color:#fff;border-radius:50%;width:20px;height:20px;display:flex;align-items:center;justify-content:center;font-size:10px;font-weight:700;border:2px solid #fff;box-shadow:0 1px 4px rgba(0,0,0,.3)">${si+1}</div>`,
        iconSize: [20, 20], iconAnchor: [10, 10],
      });
      const label = `D${dayState.day} ${stop.place[lang]}`;
      L.marker(stop.coord, { icon }).addTo(leafletMap)
        .bindTooltip(label, { permanent: false, direction: 'right', className: 'map-label' });
    });
  });

  if (allBounds.length) leafletMap.fitBounds(allBounds, { padding: [24, 24] });
  setTimeout(() => leafletMap?.invalidateSize(), 100);
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
    let existing = null, existingDayIdx = -1;
    for (let di = 0; di < state.length; di++) {
      const it = state[di].items.find(it => it.id === itemId);
      if (it) { existing = it; existingDayIdx = di; break; }
    }

    // Capture old end time for cascade calculation
    const oldStartMins = parseTimeMin(existing?.time);
    const oldDurMins   = parseDurationMin(existing?.duration);
    const newStartMins = parseTimeMin(time);
    const newDurMins   = parseDurationMin(duration);

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

    // Offer cascade if end time shifted
    if (existingDayIdx >= 0 && oldStartMins >= 0 && newStartMins >= 0) {
      const oldEnd = oldStartMins + oldDurMins;
      const newEnd = newStartMins + newDurMins;
      const delta  = newEnd - oldEnd;
      if (delta !== 0) {
        const updatedState = getState();
        const editedIdx = updatedState[existingDayIdx].items.findIndex(it => it.id === itemId);
        if (editedIdx >= 0) {
          closeEditSheet();
          renderItinerary();
          offerCascade(existingDayIdx, editedIdx, delta);
          return;
        }
      }
    }
  }

  closeEditSheet();
  renderItinerary();
}

// ── COUPON HELPERS ─────────────────────────────────────────
function openCoupon(url) {
  window.open(url, '_blank');
}

function renderCouponsHtml() {
  const intro = lang === 'zh'
    ? '<div class="coupon-intro">點「開啟優惠券」後，在店內出示畫面給店員即可使用</div>'
    : '<div class="coupon-intro">Tap "Open Coupon" and show the screen to the cashier in-store</div>';
  const btnLabel = lang === 'zh' ? '開啟優惠券 →' : 'Open Coupon →';

  let html = intro;
  COUPONS.forEach(c => {
    const tipHtml = c.tip ? `<div class="coupon-tip">${c.tip[lang]}</div>` : '';
    html += `
      <div class="coupon-card">
        <div class="coupon-card-header">
          <span class="coupon-icon">${c.icon}</span>
          <span class="coupon-store">${c.store[lang]}</span>
        </div>
        <div class="coupon-discount">${c.discount[lang]}</div>
        <div class="coupon-area">📍 ${c.area[lang]}</div>
        <div class="coupon-how">✦ ${c.how[lang]}</div>
        ${tipHtml}
        <button class="coupon-btn" onclick="openCoupon('${c.url}')">${btnLabel}</button>
      </div>
    `;
  });
  return html;
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

  const dataset    = souvenirTab === 0 ? SOUVENIRS : (souvenirTab === 1 ? DRUGSTORE : null);
  const tab0Label  = lang === 'zh' ? '伴手禮' : 'Souvenirs';
  const tab1Label  = lang === 'zh' ? '藥妝' : 'Drugstore';
  const tab2Label  = lang === 'zh' ? '優惠券' : 'Coupons';
  const summaryTxt = lang === 'zh'
    ? `已購 ${totalBought} 件｜花費 ${totalSpent.toLocaleString()} 円`
    : `${totalBought} bought | ¥${totalSpent.toLocaleString()} spent`;

  // Guard svSubTab against out-of-range after tab switch
  const safeSubTab = dataset ? Math.min(svSubTab, dataset.length - 1) : 0;

  // Sub-tab bar (only for tabs 0 and 1)
  const subTabsHtml = dataset ? dataset.map((g, i) => {
    const groupBought = g.items.filter(item => purchases[item.id]).length;
    const dot = groupBought > 0 ? `<span class="sv-subtab-dot"></span>` : '';
    return `<button class="sv-subtab${i === safeSubTab ? ' active' : ''}" onclick="setSvSubTab(${i})">
      ${g.tab[lang]}${dot}
    </button>`;
  }).join('') : '';

  let html = `
    <div class="sv-tab-bar">
      <button class="sv-tab ${souvenirTab === 0 ? 'active' : ''}" onclick="setSvTab(0)">${tab0Label}</button>
      <button class="sv-tab ${souvenirTab === 1 ? 'active' : ''}" onclick="setSvTab(1)">${tab1Label}</button>
      <button class="sv-tab ${souvenirTab === 2 ? 'active' : ''}" onclick="setSvTab(2)">${tab2Label}</button>
    </div>
  `;

  // Coupon tab — different layout, render and return early
  if (souvenirTab === 2) {
    html += renderCouponsHtml();
    container.innerHTML = html;
    return;
  }

  html += `
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

    const thumbHtml = item.img
      ? `<img class="sv-card-thumb" src="${item.img}" alt="" loading="lazy">`
      : '';

    html += `
      <div class="sv-card${isBought ? ' sv-bought' : ''}${isOpen ? ' sv-open' : ''}"
           onclick="openSvCard('${item.id}')">
        <div class="sv-card-body">
          ${thumbHtml}
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

// ── PLACE DETAIL SHEET ─────────────────────────────────
function openDetailSheet(key) {
  const d = PLACE_DETAIL[key] || null;
  const isZh = lang === 'zh';

  document.getElementById('detail-sheet-title').textContent = key;

  let html = '';

  if (d && d.recommend) {
    html += `
      <div class="detail-row detail-recommend">
        <div class="detail-icon">⭐</div>
        <div class="detail-val">${d.recommend[lang]}</div>
      </div>
    `;
  }
  if (d && d.rating) {
    const stars = '★'.repeat(d.rating.stars) + '☆'.repeat(5 - d.rating.stars);
    html += `
      <div class="detail-row">
        <div class="detail-icon">🌟</div>
        <div>
          <div class="detail-label">${isZh ? '旅客評分' : 'Guest Rating'}</div>
          <div class="detail-val"><span class="rating-stars">${stars}</span> <strong>${d.rating.score}</strong> · ${d.rating.source}</div>
        </div>
      </div>
    `;
  }
  if (d && d.hours) {
    html += `
      <div class="detail-row">
        <div class="detail-icon">🕐</div>
        <div>
          <div class="detail-label">${isZh ? '營業時間' : 'Hours'}</div>
          <div class="detail-val">${d.hours[lang]}</div>
        </div>
      </div>
    `;
  }
  if (d && d.phone) {
    html += `
      <div class="detail-row">
        <div class="detail-icon">📞</div>
        <div>
          <div class="detail-label">${isZh ? '電話' : 'Phone'}</div>
          <a href="tel:${d.phone}" class="detail-val detail-phone">${d.phone}</a>
        </div>
      </div>
    `;
  }
  if (d && d.address) {
    html += `
      <div class="detail-row">
        <div class="detail-icon">📍</div>
        <div>
          <div class="detail-label">${isZh ? '地址' : 'Address'}</div>
          <div class="detail-val">${d.address[lang]}</div>
        </div>
      </div>
    `;
  }
  if (d && d.access) {
    const steps = d.access[lang].map(s =>
      `<div class="detail-step">${s.replace(/(⚡[^<\n]*)/, '<span class="warn-text">$1</span>')}</div>`
    ).join('');
    html += `
      <div class="detail-row">
        <div class="detail-icon">🚌</div>
        <div style="flex:1">
          <div class="detail-label">${isZh ? '交通接駁' : 'Getting there'}</div>
          <div class="detail-steps">${steps}</div>
        </div>
      </div>
    `;
  }
  if (d && d.link) {
    html += `
      <div class="detail-row">
        <div class="detail-icon">🔗</div>
        <div>
          <div class="detail-label">${isZh ? '官方資訊 / 即時班表' : 'Official info & schedule'}</div>
          <a href="${d.link}" target="_blank" rel="noopener" class="detail-link">${d.link.replace(/^https?:\/\//, '')}</a>
        </div>
      </div>
    `;
  }

  // Blog search — auto-generated for every venue
  {
    const addrZh = d.address?.zh || '';
    const blogCity = addrZh.includes('函館') ? '函館' :
                     addrZh.includes('小樽') ? '小樽' :
                     addrZh.includes('洞爺') ? '洞爺湖' :
                     addrZh.includes('登別') ? '登別' :
                     (addrZh.includes('機場') || addrZh.includes('空港')) ? '新千歳空港' : '札幌';
    const searchName = key.replace(/^[⭐\s]+/, '').trim();
    const blogQ = encodeURIComponent(searchName + ' ' + blogCity + ' ブログ');
    html += `
      <div class="detail-row">
        <div class="detail-icon">📖</div>
        <div>
          <div class="detail-label">${isZh ? '部落格食記' : 'Blog reviews'}</div>
          <a href="https://www.google.com/search?q=${blogQ}" target="_blank" rel="noopener" class="detail-link detail-blog-link">${isZh ? '搜尋最新食記 →' : 'Search latest reviews →'}</a>
        </div>
      </div>
    `;
  }

  document.getElementById('detail-sheet-body').innerHTML = html;
  document.getElementById('detail-sheet-overlay').style.display = 'flex';
}

function closeDetailSheet() {
  document.getElementById('detail-sheet-overlay').style.display = 'none';
}

// ── PIN GATE ───────────────────────────────────────────────
const PIN_HASH    = 'cc0993cb09acb7cfffde863f748567afb13aa44b109f517a9584a966c2b62cc2';
const PIN_KEY     = 'hk_pin_ok';
const PIN_EXPIRY  = 30 * 24 * 60 * 60 * 1000; // 30 days

async function sha256(str) {
  const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(str));
  return Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2,'0')).join('');
}

function isPinUnlocked() {
  try {
    const saved = JSON.parse(localStorage.getItem(PIN_KEY) || 'null');
    return saved && Date.now() - saved.ts < PIN_EXPIRY;
  } catch { return false; }
}

function showPinGate() {
  const overlay = document.getElementById('pin-overlay');
  overlay.style.display = 'flex';
  setTimeout(() => document.getElementById('pin-input').focus(), 100);
}

function hidePinGate() {
  document.getElementById('pin-overlay').style.display = 'none';
}

async function submitPin() {
  const val = document.getElementById('pin-input').value.trim();
  const err  = document.getElementById('pin-error');
  if (!val) return;
  const hash = await sha256(val);
  if (hash === PIN_HASH) {
    localStorage.setItem(PIN_KEY, JSON.stringify({ ts: Date.now() }));
    hidePinGate();
    initApp();
  } else {
    err.textContent = '密碼錯誤，請再試';
    document.getElementById('pin-input').value = '';
    document.getElementById('pin-input').focus();
  }
}

// ── GEMINI Q&A ─────────────────────────────────────────────
const GEMINI_KEY = 'AIzaSyDkudsBInoZWfmEmn1VtNNm33azkKw7kyM';
const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_KEY}`;

let aiOpen = false;
let aiHistory = []; // {role, text}

function buildTripContext() {
  const state = getState();
  const lines = state.map(d => {
    const items = d.items.map(it =>
      `  ${it.time} ${it.place.zh}${it.duration && it.duration !== '—' ? ' (' + it.duration + ')' : ''}${it.note?.zh ? ' — ' + it.note.zh : ''}`
    ).join('\n');
    return `Day ${d.day} (${d.date.zh} ${d.title.zh}):\n${items}`;
  }).join('\n\n');
  return `以下是我的北海道 2026 旅遊行程：\n\n${lines}`;
}

function toggleAI() {
  aiOpen = !aiOpen;
  document.getElementById('ai-panel').style.display = aiOpen ? 'flex' : 'none';
  document.getElementById('ai-fab').style.display   = aiOpen ? 'none' : 'flex';
  if (aiOpen) setTimeout(() => document.getElementById('ai-input').focus(), 150);
}

function closeAI() {
  aiOpen = false;
  document.getElementById('ai-panel').style.display = 'none';
  document.getElementById('ai-fab').style.display   = 'flex';
}

async function sendAI() {
  const input = document.getElementById('ai-input');
  const msg   = input.value.trim();
  if (!msg) return;
  input.value = '';

  appendAIMsg('user', msg);
  appendAIMsg('loading', '');

  const systemPrompt = `你是北海道旅遊助理，熟悉北海道景點、美食、交通、氣候。請用繁體中文回答，簡潔實用。\n\n${buildTripContext()}`;

  const contents = [
    { role: 'user', parts: [{ text: systemPrompt }] },
    { role: 'model', parts: [{ text: '了解，我已掌握你的行程，有問題請問我。' }] },
    ...aiHistory.map(h => ({ role: h.role === 'user' ? 'user' : 'model', parts: [{ text: h.text }] })),
    { role: 'user', parts: [{ text: msg }] },
  ];

  try {
    const res = await fetch(GEMINI_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ contents }),
    });
    const data = await res.json();
    const reply = data.candidates?.[0]?.content?.parts?.[0]?.text || '（無回應）';
    removeLoadingMsg();
    appendAIMsg('model', reply);
    aiHistory.push({ role: 'user', text: msg });
    aiHistory.push({ role: 'model', text: reply });
  } catch {
    removeLoadingMsg();
    appendAIMsg('model', '⚠ 網路錯誤，請確認連線後再試。');
  }
}

function appendAIMsg(role, text) {
  const box = document.getElementById('ai-messages');
  const div = document.createElement('div');
  if (role === 'loading') {
    div.className = 'ai-msg ai-msg-bot ai-loading';
    div.id = 'ai-loading-msg';
    div.textContent = '...';
  } else {
    div.className = `ai-msg ${role === 'user' ? 'ai-msg-user' : 'ai-msg-bot'}`;
    div.textContent = text;
  }
  box.appendChild(div);
  box.scrollTop = box.scrollHeight;
}

function removeLoadingMsg() {
  document.getElementById('ai-loading-msg')?.remove();
}

// ── INIT ───────────────────────────────────────────────────
function initApp() {
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

  // AI input — Enter to send
  document.getElementById('ai-input').addEventListener('keydown', e => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendAI(); }
  });

  document.querySelectorAll('.page')[0].classList.add('active');
  renderAll();
}

document.addEventListener('DOMContentLoaded', () => {
  // PIN gate on load
  document.getElementById('pin-input').addEventListener('keydown', e => {
    if (e.key === 'Enter') submitPin();
  });

  if (isPinUnlocked()) {
    hidePinGate();
    initApp();
  } else {
    showPinGate();
  }
});
