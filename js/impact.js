// ============================================================
// IMPACT — conflict detection & coverage analysis
// ============================================================

const MEAL_EMOJIS = ['🍖','🍜','🍛','🍣','🥩','🍔','🍱','🍕','🍳','🍽','🦀','☕'];

function parseDurationMin(durStr) {
  if (!durStr || durStr === '—') return 0;
  const m = durStr.match(/(\d+)(?:[–-](\d+))?/);
  if (!m) return 0;
  const a = parseInt(m[1]);
  const b = m[2] ? parseInt(m[2]) : a;
  return Math.round((a + b) / 2);
}

function parseTimeMin(timeStr) {
  if (!timeStr) return -1;
  const [h, mn] = timeStr.split(':').map(Number);
  if (isNaN(h) || isNaN(mn)) return -1;
  return h * 60 + mn;
}

function mealType(item) {
  const name = (item.place?.zh || '') + (item.place?.en || '');
  if (!MEAL_EMOJIS.some(e => name.includes(e))) return null;
  const t = parseTimeMin(item.time);
  if (t < 0) return 'any';
  if (t < 11 * 60) return 'breakfast';
  if (t < 15 * 60) return 'lunch';
  return 'dinner';
}

function calculateImpact(dayState) {
  const items = dayState.items;
  const impact = {
    conflicts: [],       // [{idxA, idxB, overlapMin}]
    meals: { breakfast: false, lunch: false, dinner: false },
    warnings: 0,
    moved: 0,            // items that came from another day
    budgetChanged: false,
  };

  items.forEach((item, i) => {
    // Meals
    const mt = mealType(item);
    if (mt && mt !== 'any') impact.meals[mt] = true;
    else if (mt === 'any') {
      impact.meals.breakfast = true;
      impact.meals.lunch = true;
      impact.meals.dinner = true;
    }

    // Warnings
    if (item.warn) impact.warnings++;

    // Moved items
    if (item.originalDay !== dayState.day) impact.moved++;

    // Time conflicts (compare with next item)
    if (i < items.length - 1) {
      const curr = item;
      const next = items[i + 1];
      const tCurr = parseTimeMin(curr.time);
      const tNext = parseTimeMin(next.time);
      const dur = parseDurationMin(curr.duration);
      if (tCurr >= 0 && tNext >= 0 && dur > 0) {
        const end = tCurr + dur;
        if (tNext < end) {
          impact.conflicts.push({
            idxA: i,
            idxB: i + 1,
            overlapMin: end - tNext,
          });
        }
      }
    }
  });

  impact.budgetChanged = impact.moved > 0;
  return impact;
}

// Render compact impact badges for card header
function renderImpactBadges(impact, l) {
  const badges = [];
  if (impact.conflicts.length > 0) {
    badges.push(`<span class="imp-badge imp-conflict">⏱ ${l === 'zh' ? '時間衝突' : 'Time conflict'} ×${impact.conflicts.length}</span>`);
  }
  const missingMeals = [];
  if (!impact.meals.lunch)   missingMeals.push(l === 'zh' ? '午' : 'Lunch');
  if (!impact.meals.dinner)  missingMeals.push(l === 'zh' ? '晚' : 'Dinner');
  if (missingMeals.length > 0) {
    badges.push(`<span class="imp-badge imp-meal">🍽 ${l === 'zh' ? '缺' : 'No'} ${missingMeals.join('/')}</span>`);
  }
  if (impact.warnings > 0) {
    badges.push(`<span class="imp-badge imp-warn">⚡×${impact.warnings}</span>`);
  }
  if (impact.moved > 0) {
    badges.push(`<span class="imp-badge imp-moved">${l === 'zh' ? `移入 ${impact.moved} 項` : `+${impact.moved} moved`}</span>`);
  }
  return badges.join('');
}
