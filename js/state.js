// ============================================================
// STATE — mutable itinerary (persisted in localStorage)
// ============================================================

const STATE_KEY = 'hk_itinerary_v1';

function buildInitialState() {
  return DAYS.map(d => ({
    day: d.day,
    date: d.date,
    title: d.title,
    steps: d.steps,
    phase: d.phase,
    weatherCity: d.weatherCity,
    mealBudget: d.mealBudget,
    shopping: d.shopping,
    items: d.items.map((item, i) => ({
      ...item,
      id: `d${d.day}_${i}`,
      originalDay: d.day,
    })),
  }));
}

let _state = null;

function getState() {
  if (_state) return _state;
  try {
    const raw = localStorage.getItem(STATE_KEY);
    if (raw) {
      _state = JSON.parse(raw);
      return _state;
    }
  } catch {}
  _state = buildInitialState();
  return _state;
}

function _save() {
  localStorage.setItem(STATE_KEY, JSON.stringify(_state));
}

function resetState() {
  localStorage.removeItem(STATE_KEY);
  _state = buildInitialState();
  return _state;
}

function isModified() {
  return !!localStorage.getItem(STATE_KEY);
}

// Move item within the same day (swap positions)
function moveItemWithinDay(dayIdx, fromIdx, toIdx) {
  const items = [..._state[dayIdx].items];
  const [item] = items.splice(fromIdx, 1);
  items.splice(toIdx, 0, item);
  _state = _state.map((d, i) => i === dayIdx ? { ...d, items } : d);
  _save();
}

// Update fields of a single item (time, duration, note, etc.)
function updateItem(itemId, changes) {
  _state = _state.map(d => ({
    ...d,
    items: d.items.map(it => it.id === itemId ? { ...it, ...changes } : it),
  }));
  _save();
}

// Add a new item to a day (append to end)
function addItem(dayIdx, newItem) {
  _state = _state.map((d, i) => {
    if (i !== dayIdx) return d;
    return { ...d, items: [...d.items, newItem] };
  });
  _save();
}

// Remove an item by ID
function deleteItem(itemId) {
  _state = _state.map(d => ({
    ...d,
    items: d.items.filter(it => it.id !== itemId),
  }));
  _save();
}

// Clear all items from a day
function clearDayItems(dayIdx) {
  _state = _state.map((d, i) => i === dayIdx ? { ...d, items: [] } : d);
  _save();
}

// Move item to another day (append to end of target day)
function moveItemToDay(itemId, fromDayIdx, toDayIdx) {
  let moved = null;
  _state = _state.map((d, i) => {
    if (i !== fromDayIdx) return d;
    const items = d.items.filter(it => {
      if (it.id === itemId) { moved = it; return false; }
      return true;
    });
    return { ...d, items };
  });
  if (moved) {
    _state = _state.map((d, i) => {
      if (i !== toDayIdx) return d;
      return { ...d, items: [...d.items, moved] };
    });
  }
  _save();
}
