// ============================================================
// HOKKAIDO 2026 TRIP DATA — bilingual (zh / en)
// ============================================================

const T = {
  zh: {
    appTitle: '北海道 2026',
    tabs: ['行程', '伴手禮', '交通', '出發準備', 'SOS'],
    day: '第', dayUnit: '天',
    steps: '預估步數',
    stepsUnit: '步',
    mapBtn: '地圖',
    bought: '已買',
    checked: '完成',
    cold: '需冷藏',
    limitedAirport: '機場限定',
    phase: ['Phase 1：札幌都會 & 小樽', 'Phase 2：函館海港', 'Phase 3：洞爺湖溫泉'],
    weatherTitle: '即時天氣',
    weatherRefresh: '更新',
    budgetTitle: '預算概估（每人）',
    transportTitle: '交通速查',
    sosTitle: '緊急聯絡',
    mealBudget: '餐飲小計',
    shoppingNote: '採購重點',
    warning: '注意',
  },
  en: {
    appTitle: 'Hokkaido 2026',
    tabs: ['Itinerary', 'Souvenirs', 'Transport', 'Checklist', 'SOS'],
    day: 'Day', dayUnit: '',
    steps: 'Est. steps',
    stepsUnit: 'steps',
    mapBtn: 'Map',
    bought: 'Bought',
    checked: 'Done',
    cold: 'Keep cold',
    limitedAirport: 'Airport only',
    phase: ['Phase 1: Sapporo & Otaru', 'Phase 2: Hakodate', 'Phase 3: Toya Lake'],
    weatherTitle: 'Live Weather',
    weatherRefresh: 'Refresh',
    budgetTitle: 'Budget Estimate (per person)',
    transportTitle: 'Transport Guide',
    sosTitle: 'Emergency Contacts',
    mealBudget: 'Meal budget',
    shoppingNote: 'Shopping notes',
    warning: 'Note',
  }
};

// ── ITINERARY ──────────────────────────────────────────────
const DAYS = [
  {
    day: 1,
    date: { zh: '5/14（四）', en: '5/14 Thu' },
    title: { zh: '札幌都會啟動', en: 'Arrival & City Start' },
    steps: 7000,
    phase: 0,
    weatherCity: 'Sapporo',
    items: [
      { time: '08:35', place: { zh: '桃園 T2 出發', en: 'Taoyuan T2 Depart' }, duration: '—', note: null, maps: null, warn: false },
      { time: '13:35', place: { zh: '新千歲機場 第 I 航廈', en: 'New Chitose Airport T-I' }, duration: '60min', note: { zh: '⚡ 出關後立刻 JR 窗口劃位：5/18 北斗號 D 席（右側海景）', en: '⚡ Right after customs: reserve Hokuto D-seat for 5/18 (sea view)' }, maps: 'https://maps.google.com/?q=New+Chitose+Airport', warn: true },
      { time: '14:40', place: { zh: 'IC 卡 + JR 快速機場線', en: 'IC Card + JR Airport Express' }, duration: '40min', note: { zh: 'PASMO/Suica 購入；車資約 1,150円', en: 'Buy PASMO/Suica; ~¥1,150' }, maps: null, warn: false },
      { time: '15:30', place: { zh: '索拉瑞亞西鐵酒店 Check-in', en: 'Solaria Nishitetsu Check-in' }, duration: '30min', note: { zh: '行李寄放換輕裝', en: 'Drop luggage, change to light wear' }, maps: 'https://maps.google.com/?q=Solaria+Nishitetsu+Hotel+Sapporo', warn: false },
      { time: '17:00', place: { zh: '🍖【晚餐】成吉思汗達摩 5.5 店', en: '🍖 Dinner: Daruma 5.5 (Genghis Khan BBQ)' }, duration: '90min', note: { zh: '避開首波人潮；烤羊 2,500–3,500円/人', en: 'Avoid first rush; lamb ¥2,500–3,500/person' }, maps: 'https://maps.google.com/?q=Daruma+Sapporo+Genghis+Khan', warn: false },
      { time: '19:00', place: { zh: '狸小路 + 薄野散步（NIKKA 看板地標）', en: 'Tanukikoji & Susukino Walk (NIKKA Sign Landmark)' }, duration: '60min', note: { zh: '藥妝比價（松本清、SUNDRUG、Welcia）', en: 'Drugstore compare: Matsumoto Kiyoshi, SUNDRUG, Welcia' }, maps: 'https://maps.google.com/?q=Tanukikoji+Shopping+Street+Sapporo', warn: false },
      { time: '20:30', place: { zh: '🍨 Parfaiteria PaL（夜聖代）', en: '🍨 Parfaiteria PaL (Night Parfait)' }, duration: '60min', note: { zh: '北海道牛奶夜聖代；夜間限定；建議 20:30 前入店', en: 'Hokkaido milk night parfait; nighttime exclusive; arrive by 20:30' }, maps: 'https://maps.google.com/?q=Parfaiteria+PaL+Sapporo', warn: false },
    ],
    mealBudget: { zh: '晚餐 3,000–4,000円 + 聖代 1,500円／人', en: 'Dinner ¥3,000–4,000 + parfait ¥1,500/person' },
    shopping: null,
  },
  {
    day: 2,
    date: { zh: '5/15（五）', en: '5/15 Fri' },
    title: { zh: '小樽地標與暖心洋食', en: 'Otaru Landmarks & Western Cuisine' },
    steps: 12000,
    phase: 0,
    weatherCity: 'Sapporo',
    items: [
      { time: '08:30', place: { zh: '🍞 索拉瑞亞自助餐（飯店早餐）', en: '🍞 Solaria Buffet (Hotel Breakfast)' }, duration: '45min', note: null, maps: null, warn: false },
      { time: '09:30', place: { zh: 'JR 札幌站出發 → 小樽', en: 'JR Sapporo → Otaru' }, duration: '50min', note: { zh: '至小樽約 750円（IC）', en: 'To Otaru ~¥750 (IC)' }, maps: 'https://maps.google.com/?q=Sapporo+Station', warn: false },
      { time: '10:30', place: { zh: '⭐ 北一硝子 三號館（煤油燈咖啡廳）', en: '⭐ Kitaichi Glass No.3 (Kerosene Lamp Café)' }, duration: '90min', note: { zh: '禁閃光燈/腳架；手作玻璃杯 3,000–8,000円', en: 'No flash/tripod; handmade glass ¥3,000–8,000' }, maps: 'https://maps.google.com/?q=Kitaichi+Glass+No3+Otaru', warn: false },
      { time: '12:30', place: { zh: '🥩【午餐】Cafe BAAL（牛排飯）', en: '🥩 Lunch: Cafe BAAL (Steak Rice)' }, duration: '60min', note: { zh: '小樽車站旁；洋食牛排飯 1,500–2,500円', en: 'Near Otaru Station; western-style steak rice ¥1,500–2,500' }, maps: 'https://maps.google.com/?q=Cafe+BAAL+小樽', warn: false },
      { time: '14:30', place: { zh: '堺町通 + 小樽音樂盒堂 本館', en: 'Sakaimachi Street + Otaru Music Box Museum' }, duration: '60min', note: { zh: '音樂盒堂本館免費參觀；限定款 3,000円起', en: 'Music Box Museum free entry; limited editions from ¥3,000' }, maps: 'https://maps.google.com/?q=小樽オルゴール堂本館', warn: false },
      { time: '15:30', place: { zh: '⭐ LeTAO 小樽總店（二樓內用現做雙層乳酪蛋糕）', en: '⭐ LeTAO Main Store (2F Fresh Double Fromage)' }, duration: '90min', note: { zh: '⚡ 停留 90 分；二樓現做雙層乳酪蛋糕 900円；附飲料套餐 1,400円', en: '⚡ Allow 90 min; 2F fresh Double Fromage ¥900; drink set ¥1,400' }, maps: 'https://maps.google.com/?q=LeTAO+Otaru', warn: true },
      { time: '17:30', place: { zh: '⭐ 小樽運河夜景散步 → JR 返回札幌', en: '⭐ Otaru Canal Night Walk → JR Back to Sapporo' }, duration: '60min', note: { zh: '⚡ 黃金窗口 17:30–18:30（點燈最美）；JR 約 50 分返回', en: '⚡ Golden window 17:30–18:30 (lanterns lit); JR ~50 min back' }, maps: 'https://maps.google.com/?q=Otaru+Canal', warn: true },
      { time: '18:30', place: { zh: '🍜【晚餐】Sumire 味噌拉麵（薄野店）', en: '🍜 Dinner: Sumire Miso Ramen (Susukino)' }, duration: '60min', note: { zh: '札幌三大味噌拉麵之一；奶油玉米系；1,200–1,500円', en: "One of Sapporo's top 3 miso ramen; butter corn style; ¥1,200–1,500" }, maps: 'https://maps.google.com/?q=すみれ+薄野+札幌', warn: false },
      { time: '20:00', place: { zh: '🍨 Sato（夜聖代）', en: '🍨 Sato Night Parfait' }, duration: '60min', note: { zh: '達成「拉麵接聖代」成就！夜間限定聖代', en: '"Ramen → Parfait" achievement unlocked! Night-only dessert' }, maps: 'https://maps.google.com/?q=パフェ+さとう+札幌', warn: false },
    ],
    mealBudget: { zh: '午餐 2,000円 + 下午茶 1,400円 + 晚餐 1,500円 + 聖代 1,200円／人', en: 'Lunch ¥2,000 + café ¥1,400 + dinner ¥1,500 + parfait ¥1,200/person' },
    shopping: { zh: 'LeTAO 起司夾心餅乾、北一硝子玻璃杯、音樂盒堂限定款', en: 'LeTAO cheese biscuits, Kitaichi glass, Music Box limited edition' },
  },
  {
    day: 3,
    date: { zh: '5/16（六）', en: '5/16 Sat' },
    title: { zh: '歐風美學與百萬夜景', en: 'European Aesthetic & Night View' },
    steps: 13000,
    phase: 0,
    weatherCity: 'Sapporo',
    items: [
      { time: '08:30', place: { zh: '🍞【早餐】Espresso D Works（100% 水份吐司）', en: '🍞 Breakfast: Espresso D Works (100% Moisture Toast)' }, duration: '45min', note: { zh: '札幌名店；水分吐司現烤；建議 08:30 前入座', en: 'Sapporo icon; steam-hydrated toast; arrive by 08:30' }, maps: 'https://maps.google.com/?q=Espresso+D+Works+Sapporo', warn: false },
      { time: '10:00', place: { zh: '飯店轉移：行李移至京王 Prelia', en: 'Hotel Transfer: Luggage to Keio Prelia' }, duration: '30min', note: { zh: '請飯店代管至 check-in 時間', en: 'Ask hotel to hold until check-in' }, maps: 'https://maps.google.com/?q=Keio+Prelia+Hotel+Sapporo', warn: false },
      { time: '11:00', place: { zh: '⭐ 白色戀人公園（工廠參觀 + 舒芙蕾鬆餅 + 訂製磁鐵）', en: '⭐ Shiroi Koibito Park (Factory Tour + Soufflé Pancake + Custom Magnet)' }, duration: '90min', note: { zh: '⚡ 線上預購工廠參觀電子票（1,000円）；訂製磁鐵 1,500円起', en: '⚡ Pre-buy factory tour e-ticket online (¥1,000); custom magnet from ¥1,500' }, maps: 'https://maps.google.com/?q=Shiroi+Koibito+Park+Sapporo', warn: true },
      { time: '13:00', place: { zh: '🍱【午餐】とんかつ 檍（頂級炸豬排）', en: '🍱 Lunch: Tonkatsu Aoki (Premium Pork Cutlet)' }, duration: '60min', note: { zh: '特上ロースかつ 2,500–4,000円；麥飯 + 高麗菜無限續', en: 'Premium loin cutlet ¥2,500–4,000; rice + cabbage refill unlimited' }, maps: 'https://maps.google.com/?q=とんかつ+檍+札幌', warn: false },
      { time: '15:30', place: { zh: '北海道神宮 / 圓山公園（判官燒 + 福餅）', en: 'Hokkaido Jingu / Maruyama Park (Hangan-yaki + Fuku-mochi)' }, duration: '75min', note: { zh: '⚡ 抵達後優先買「判官さま」現烤麻糬（限量）300円；圓山公園湖畔散步', en: '⚡ Buy "Hangan-sama" grilled mochi first — sells out; ¥300; Maruyama lakeside stroll' }, maps: 'https://maps.google.com/?q=Hokkaido+Jingu+Shrine', warn: true },
      { time: '16:45', place: { zh: '京王 Prelia 辦入住', en: 'Keio Prelia Check-in' }, duration: '30min', note: { zh: '換保暖防風外套準備上山', en: 'Change to warm windproof layers for mountain' }, maps: 'https://maps.google.com/?q=Keio+Prelia+Hotel+Sapporo', warn: false },
      { time: '17:30', place: { zh: '⭐ 藻岩山展望台（觀賞日落至夜景）', en: '⭐ Mt. Moiwa Observatory (Sunset to Night View)' }, duration: '120min', note: { zh: '⚡ 山頂風強溫差大，帶防風外套；纜車來回 2,100円；5 月日落約 18:30', en: '⚡ Strong wind at top — windproof jacket essential; ¥2,100 RT; sunset ~18:30 in May' }, maps: 'https://maps.google.com/?q=Mt+Moiwa+Ropeway+Sapporo', warn: true },
      { time: '20:00', place: { zh: '🥩【慶祝晚餐】牛しゃぶ 牛すき 禪（黑毛和牛壽喜燒）', en: '🥩 Celebration Dinner: Zen Wagyu Shabu & Sukiyaki' }, duration: '120min', note: { zh: '⭐️ 黑毛和牛；⚡ 備注：不吃生食（請全熟處理）；需提前預約', en: '⭐️ Kuroge wagyu; ⚡ Note: fully cooked only (no raw); advance reservation required' }, maps: 'https://maps.google.com/?q=牛しゃぶ+牛すき+禪+札幌', warn: true },
    ],
    mealBudget: { zh: '早餐 1,000円 + 午餐 3,500円 + 晚餐 10,000–15,000円／人', en: 'Breakfast ¥1,000 + lunch ¥3,500 + dinner ¥10,000–15,000/person' },
    shopping: { zh: '白色戀人工廠限定包裝、訂製磁鐵、北海道神宮御守', en: 'Shiroi Koibito factory box, custom magnet, Hokkaido Jingu omamori' },
  },
  {
    day: 4,
    date: { zh: '5/17（日）', en: '5/17 Sun' },
    title: { zh: '歷史巡禮與系統化採購', en: 'Historic Tour & Systematic Shopping' },
    steps: 12000,
    phase: 0,
    weatherCity: 'Sapporo',
    items: [
      { time: '07:30', place: { zh: '🍳 京王 Prelia 自助餐（飯店早餐）', en: '🍳 Keio Prelia Buffet (Hotel Breakfast)' }, duration: '60min', note: null, maps: null, warn: false },
      { time: '09:00', place: { zh: '歷史地標打卡（紅磚廳舍 → 時計台 → 電視塔）', en: 'Historic Landmarks (Red Brick Hall → Clock Tower → TV Tower)' }, duration: '75min', note: { zh: '時計台內部 200円；電視塔展望台 700円（選做）', en: 'Clock Tower interior ¥200; TV Tower observatory ¥700 (optional)' }, maps: 'https://maps.google.com/?q=Sapporo+Clock+Tower', warn: false },
      { time: '10:30', place: { zh: '中島公園 / 豐平館（晨間湖畔 + 明治洋樓）', en: 'Nakajima Park / Hoheikan (Morning Lakeside + Meiji Hall)' }, duration: '60min', note: { zh: '豐平館參觀 300円；中島公園免費；湖畔空氣最佳', en: 'Hoheikan ¥300; Nakajima Park free; best morning air by the lake' }, maps: 'https://maps.google.com/?q=Nakajima+Park+Sapporo', warn: false },
      { time: '11:45', place: { zh: '🛍️【核心採購啟動】大丸 → Stellar Place → APIA → PARCO', en: '🛍️ Core Shopping: Daimaru → Stellar Place → APIA → PARCO' }, duration: '90min', note: { zh: '⚡ 先至 GARAKU 抽整理券再逛街；UNIQLO、大國藥妝、3COINS、SERIA、大創', en: '⚡ Grab GARAKU ticket first, then shop: UNIQLO, Daikoku, 3COINS, SERIA, Daiso' }, maps: 'https://maps.google.com/?q=Daimaru+Sapporo', warn: true },
      { time: '13:30', place: { zh: '🍛【午餐】GARAKU 湯咖哩', en: '🍛 Lunch: GARAKU Soup Curry' }, duration: '60min', note: { zh: '札幌神級名店；海老ベース湯咖哩 1,500–2,200円；辣度 0–40 可選', en: 'Sapporo legend; shrimp broth soup curry ¥1,500–2,200; spice level 0–40' }, maps: 'https://maps.google.com/?q=GARAKU+札幌', warn: false },
      { time: '15:30', place: { zh: '☕ 千秋庵本店（巴里銅鑼）', en: '☕ Senshuya Main Store (Bali Dorayaki)' }, duration: '30min', note: { zh: '中繼體力補給；現烤バリ銅鑼（僅限本店）', en: 'Mid-afternoon fuel; freshly baked Bali Dorayaki (in-store only)' }, maps: 'https://maps.google.com/?q=千秋庵本店+札幌', warn: false },
      { time: '17:30', place: { zh: '⚡【中繼降載】返回京王飯店休息洗漱', en: '⚡ Mid-point Reset: Return to Keio Hotel, freshen up' }, duration: '150min', note: { zh: '22:00 啟動行李終極收納與封箱（宅急便 5/18 寄出）', en: '22:00 final packing & seal bags for 5/18 Yamato pickup' }, maps: null, warn: true },
      { time: '20:00', place: { zh: '🦀【晚餐】札幌かに本家 站前總店（全熟螃蟹火鍋）', en: '🦀 Dinner: Sapporo Kani Honke (Fully Cooked Crab Hot Pot)' }, duration: '120min', note: { zh: '⭐️ 建議選擇包廂；全熟螃蟹套餐 8,000–15,000円；需提前預約', en: '⭐️ Request private room; fully cooked crab course ¥8,000–15,000; reserve ahead' }, maps: 'https://maps.google.com/?q=札幌かに本家+站前総店', warn: true },
    ],
    mealBudget: { zh: '午餐 2,000円 + 午茶 300円 + 晚餐 10,000–15,000円／人', en: 'Lunch ¥2,000 + snack ¥300 + dinner ¥10,000–15,000/person' },
    shopping: { zh: '六花亭 丸成奶油三明治・酒糖｜北菓樓 妖精之森・開拓米果｜千秋庵 巴里銅鑼｜大國藥妝｜3COINS｜SERIA', en: 'Rokkatei Marusei・Sake Candy｜Kitakaro Baumkuchen・Crackers｜Senshuya Bali Dorayaki｜Daikoku Drug｜3COINS｜SERIA' },
  },
  {
    day: 5,
    date: { zh: '5/18（一）', en: '5/18 Mon' },
    title: { zh: '輕裝南下 → 函館', en: 'Light Pack South → Hakodate' },
    steps: 8000,
    phase: 1,
    weatherCity: 'Hakodate',
    items: [
      { time: '08:00', place: { zh: '🍞【早餐】DONGURI（靈魂麵包）', en: '🍞 Breakfast: DONGURI (Soul Bread)' }, duration: '30min', note: { zh: '札幌人氣麵包店；每日現烤', en: 'Sapporo beloved bakery; baked fresh daily' }, maps: 'https://maps.google.com/?q=DONGURI+Sapporo', warn: false },
      { time: '09:00', place: { zh: '⚡【物流發送】退房 + 宅急便：大件行李寄機場', en: '⚡ Logistics: Check-out + Yamato Forwarding to Airport' }, duration: '30min', note: { zh: '大件行李寄至新千歲機場（5/22 領取）；費用 1,500–2,500円/件', en: 'Forward large bags to New Chitose Airport (pick up 5/22); ¥1,500–2,500/bag' }, maps: null, warn: true },
      { time: '10:00', place: { zh: '⭐ JR 特急北斗號 出發（鎖定 D 席右側海景）', en: '⭐ JR Hokuto Limited Express Depart (D-seat sea view)' }, duration: '265min', note: { zh: '⚡ D 席右側飽覽內浦灣；全車指定席；車資 ~9,000円', en: '⚡ D-seat right side = Uchiura Bay view; all reserved; ~¥9,000' }, maps: null, warn: true },
      { time: '12:00', place: { zh: '🍱【午餐】十勝豚丼いっぴん（車廂海景午餐）', en: '🍱 Lunch: Tokachi Pork Rice Bowl (Ekiben on Train)' }, duration: '30min', note: { zh: '帯廣名物豚丼；在車上配內浦灣海景享用', en: 'Obihiro specialty pork bowl; enjoy with Uchiura Bay views' }, maps: null, warn: false },
      { time: '14:30', place: { zh: 'Century Marina Hakodate Check-in（此後五天輕裝移動）', en: 'Century Marina Hakodate Check-in (light pack for next 5 days)' }, duration: '30min', note: { zh: '指定高層靠海側；此後進入全面輕裝狀態', en: 'Request high floor sea-facing room; travel light from here on' }, maps: 'https://maps.google.com/?q=Century+Marina+Hakodate', warn: false },
      { time: '15:30', place: { zh: '☕ 幸運小丑漢堡 碼頭末廣店（下午茶）', en: '☕ Lucky Pierrot Suehiro Branch (Afternoon Snack)' }, duration: '30min', note: { zh: '分食一份炸雞漢堡；函館限定品牌；中華雞腿堡 580円', en: 'Share one Chinese Chicken Burger; Hakodate-only chain; ¥580' }, maps: 'https://maps.google.com/?q=Lucky+Pierrot+Hakodate+Suehiro', warn: false },
      { time: '17:30', place: { zh: '⭐ 函館山觀景台（百萬夜景）', en: '⭐ Mt. Hakodate Observatory (Million Dollar Night View)' }, duration: '90min', note: { zh: '⚡ 出發前查官網風力（15m/s 停駛）；纜車來回 1,500円；山頂比市區冷 5–8°C', en: '⚡ Check wind speed before going (stops at 15m/s); ¥1,500 RT; top is 5–8°C colder' }, maps: 'https://maps.google.com/?q=函館山ロープウェイ', warn: true },
      { time: '20:00', place: { zh: '🍜【晚餐】味彩（鹽拉麵）', en: '🍜 Dinner: Ajisai (Salt Ramen)' }, duration: '60min', note: { zh: '函館鹽拉麵老舖；透明清湯；800–1,200円', en: 'Hakodate salt ramen institution; clear broth; ¥800–1,200' }, maps: 'https://maps.google.com/?q=味彩+函館', warn: false },
    ],
    mealBudget: { zh: '早餐 500円 + 午餐 1,500円 + 下午茶 600円 + 晚餐 1,000円／人', en: 'Breakfast ¥500 + lunch ¥1,500 + snack ¥600 + dinner ¥1,000/person' },
    shopping: { zh: '幸運小丑漢堡 原創咖哩調理包 / 紀念杯', en: 'Lucky Pierrot original curry pack / souvenir cup' },
  },
  {
    day: 6,
    date: { zh: '5/19（二）', en: '5/19 Tue' },
    title: { zh: '函館歷史與在地探索', en: 'Hakodate History & Local Discovery' },
    steps: 13000,
    phase: 1,
    weatherCity: 'Hakodate',
    items: [
      { time: '08:30', place: { zh: '🍳 Century Marina 自助餐（飯店早餐）', en: '🍳 Century Marina Buffet (Hotel Breakfast)' }, duration: '60min', note: { zh: '★4.5+ 評比；海鮮 + 乳製品；含於住宿', en: '★4.5+ rated; seafood + dairy; included in stay' }, maps: null, warn: false },
      { time: '11:30', place: { zh: '函館朝市 + 金森紅磚倉庫散步', en: 'Hakodate Morning Market + Kanemori Warehouse Stroll' }, duration: '90min', note: { zh: '朝市自由逛（海鮮、干貝、熟食）；金森倉庫明治大正紅磚群，免費', en: 'Morning market browse (seafood, scallops, cooked goods); Kanemori free entry' }, maps: 'https://maps.google.com/?q=Hakodate+Morning+Market', warn: false },
      { time: '13:00', place: { zh: '🦔【午餐】村上海膽（全熟解鎖：焗烤海膽 / 烤海膽）', en: '🦔 Lunch: Murakami Uni (Fully Cooked: Gratin / Grilled Uni)' }, duration: '60min', note: { zh: '⚡ 全熟點法：焗烤ウニ、炙り烤ウニ（避開生ウニ）；當季套餐 3,000–6,000円', en: '⚡ Fully cooked options: uni gratin, grilled uni (skip raw); seasonal set ¥3,000–6,000' }, maps: 'https://maps.google.com/?q=村上海膽+函館', warn: true },
      { time: '14:30', place: { zh: '⭐ 五稜郭展望塔 / 公園', en: '⭐ Goryokaku Tower / Park' }, duration: '90min', note: { zh: '⚡ 塔頂展望台 900円（★必上）；公園內自由散步', en: '⚡ Tower observation ¥900 (★must do); free stroll in park' }, maps: 'https://maps.google.com/?q=Goryokaku+Tower+Hakodate', warn: true },
      { time: '16:30', place: { zh: '⭐ 八幡坂 / 元町建築群（大正風情漫步）', en: '⭐ Hachiman-zaka / Motomachi (Taisho-era Stroll)' }, duration: '60min', note: { zh: '⚡ 注意車流；八幡坂海港透視日落最美；舊區公會堂 300円', en: '⚡ Watch traffic; Hachiman-zaka sea view best at sunset; Old Public Hall ¥300' }, maps: 'https://maps.google.com/?q=Hachiman-zaka+Hakodate', warn: true },
      { time: '18:00', place: { zh: '🍛【晚餐】奧芝商店 函館本店（蝦味湯咖哩）', en: '🍛 Dinner: Okushiba Hakodate (Shrimp Soup Curry)' }, duration: '90min', note: { zh: '⚡ 已避開週一・週二公休；海老スープカレー 1,500–2,500円；辣度 1–30', en: '⚡ Avoids Mon/Tue closures; shrimp soup curry ¥1,500–2,500; spice level 1–30' }, maps: 'https://maps.google.com/?q=奥芝商店+函館本店', warn: true },
    ],
    mealBudget: { zh: '午餐 4,000–6,000円 + 晚餐 2,000円／人', en: 'Lunch ¥4,000–6,000 + dinner ¥2,000/person' },
    shopping: { zh: "SNAFFLE'S 起司歐姆蕾蛋糕 Catchcakes（6 入 1,296円，需冷藏）", en: "SNAFFLE'S Cheese Omelette Cake Catchcakes (6pc ¥1,296, refrigerate)" },
  },
  {
    day: 7,
    date: { zh: '5/20（三）', en: '5/20 Wed' },
    title: { zh: '洞爺湖極致視角', en: 'Lake Toya Ultimate Panorama' },
    steps: 6000,
    phase: 2,
    weatherCity: 'Toyako',
    items: [
      { time: '07:00', place: { zh: '函館朝市早餐（烤蟹腳 + 奶油烤扇貝）', en: 'Hakodate Market Breakfast (Grilled Crab Legs + Butter Scallops)' }, duration: '60min', note: { zh: '⚡ 專攻現烤蟹腳（毛蟹）與奶油烤扇貝（帆立貝バター焼き）各 300–500円；避開生食區', en: '⚡ Target: grilled crab legs + butter scallops ¥300–500 each; avoid raw food' }, maps: 'https://maps.google.com/?q=Hakodate+Morning+Market', warn: true },
      { time: '08:00', place: { zh: '退房 → JR 函館站置物', en: 'Check-out → Station Lockers' }, duration: '20min', note: { zh: '400–800円/次', en: '¥400–800 per slot' }, maps: 'https://maps.google.com/?q=Hakodate+Station', warn: false },
      { time: '09:48', place: { zh: 'JR 特急北斗號 出發（→ 洞爺站）', en: 'JR Hokuto → Toya Station' }, duration: '114min', note: { zh: '洞爺站下車；車資 ~4,000–5,000円', en: 'Exit at Toya; ~¥4,000–5,000' }, maps: null, warn: false },
      { time: '12:00', place: { zh: '抵達 JR 洞爺站', en: 'Arrive JR Toya Station' }, duration: '15min', note: null, maps: 'https://maps.google.com/?q=Toya+Station', warn: false },
      { time: '12:15', place: { zh: '⭐【戰術遠征】計程車 → 筒倉展望台 Silo（布丁 + 俯瞰洞爺湖）', en: '⭐ Taxi → Tsutsukura Observatory Silo (Pudding + Lake Panorama)' }, duration: '75min', note: { zh: '⚡ 車站搭計程車前往；買招牌布丁；從 Silo 俯瞰洞爺湖全景', en: '⚡ Taxi from station; buy signature pudding; panoramic Toya Lake view from Silo' }, maps: 'https://maps.google.com/?q=筒倉展望台', warn: true },
      { time: '13:30', place: { zh: '🍵【午餐】岡田屋（白汁粉）', en: '🍵 Lunch: Okadaya (White Sweet Soup)' }, duration: '45min', note: { zh: '白玉白汁粉 600–900円；洞爺湖溫泉街名物', en: 'White mochi sweet soup ¥600–900; Toya onsen street specialty' }, maps: 'https://maps.google.com/?q=岡田屋+洞爺湖', warn: false },
      { time: '14:00', place: { zh: '湖景 TOYA 乃之風渡假酒店 Check-in（進入全面留白）', en: 'Lake View Toya Nonokaze Resort Check-in (Full Rest Mode)' }, duration: '30min', note: { zh: '指定湖景側；湖景露天溫泉風呂', en: 'Request lake-view room; outdoor hot spring with lake view' }, maps: 'https://maps.google.com/?q=Lake+View+Toya+Nonokaze+Resort', warn: false },
      { time: '18:30', place: { zh: '🍽️【晚餐】乃之風自助餐', en: '🍽️ Dinner: Nonokaze Buffet (included)' }, duration: '90min', note: { zh: '含於住宿；螃蟹 / 羊肉 / 海鮮 / 乳製品', en: 'Included in stay; crab, lamb, seafood, dairy' }, maps: null, warn: false },
      { time: '20:45', place: { zh: '⭐ 洞爺湖水上煙火（房內觀賞）', en: '⭐ Lake Toya Fireworks (Watch from Room)' }, duration: '45min', note: { zh: '4/28–10/31 每晚 20:45（雨天取消）；從客房或露天風呂觀賞', en: '4/28–10/31 nightly at 20:45 (cancelled if rainy); watch from room or rotenburo' }, maps: null, warn: false },
    ],
    mealBudget: { zh: '朝市早餐 1,000円 + 午餐 800円；晚餐含於住宿', en: 'Market breakfast ¥1,000 + lunch ¥800; dinner included' },
    shopping: null,
  },
  {
    day: 8,
    date: { zh: '5/21（四）', en: '5/21 Thu' },
    title: { zh: '登別地獄谷遠征', en: 'Noboribetsu Hell Valley Expedition' },
    steps: 9000,
    phase: 2,
    weatherCity: 'Toyako',
    items: [
      { time: '08:30', place: { zh: '🍳 乃之風自助餐（飯店早餐）', en: '🍳 Nonokaze Buffet (Hotel Breakfast)' }, duration: '60min', note: { zh: '湖景早餐，從容享用後出發', en: 'Lakeside breakfast — enjoy before heading out' }, maps: null, warn: false },
      { time: '09:30', place: { zh: 'JR 前往登別 → 轉乘巴士至溫泉街', en: 'JR to Noboribetsu → Bus to Onsen Town' }, duration: '30min', note: { zh: '⚡ 確認班次；洞爺→登別約 20 分（JR）；登別站→溫泉街巴士約 10 分', en: '⚡ Check schedule; Toya→Noboribetsu ~20 min (JR); station→onsen street bus ~10 min' }, maps: 'https://maps.google.com/?q=Noboribetsu+Station', warn: true },
      { time: '10:30', place: { zh: '⭐ 登別地獄谷 / 大湯沼川天然足湯', en: '⭐ Noboribetsu Jigokudani / Oyunuma Natural Footbath' }, duration: '150min', note: { zh: '⚡ 地獄谷免費；大湯沼展望台免費；足湯免費（帶毛巾）；鬼石棒之湯選做 1,500円', en: '⚡ Hell Valley free; Oyunuma lookout free; footbath free (bring towel); optional onsen ¥1,500' }, maps: 'https://maps.google.com/?q=Noboribetsu+Jigokudani', warn: true },
      { time: '12:30', place: { zh: '🍜【午餐】登別溫泉街熟食', en: '🍜 Lunch: Noboribetsu Onsen Street Food' }, duration: '60min', note: { zh: '溫泉饅頭 100–200円；烤玉米 300–400円；各店鋪熟食自由選擇', en: 'Onsen manju ¥100–200; grilled corn ¥300–400; various hot food stalls' }, maps: null, warn: false },
      { time: '15:30', place: { zh: '返回乃之風飯店（溫泉降載 + 身心恢復）', en: 'Return to Nonokaze (Onsen Recovery & Rest)' }, duration: '180min', note: { zh: '⚡ 提前確認 JR 返程班次；溫泉降載：泡湯 + 充分休憩', en: '⚡ Check return JR schedule in advance; onsen recovery: soak + rest' }, maps: null, warn: true },
      { time: '18:30', place: { zh: '🍽️【晚餐】乃之風自助餐', en: '🍽️ Dinner: Nonokaze Buffet (included)' }, duration: '90min', note: { zh: '含於住宿', en: 'Included in stay' }, maps: null, warn: false },
      { time: '20:45', place: { zh: '⭐ 洞爺湖水上煙火（最後場）', en: '⭐ Lake Toya Fireworks (Last Night)' }, duration: '45min', note: null, maps: null, warn: false },
    ],
    mealBudget: { zh: '早 + 晚含於住宿；午餐 500円；交通 1,500–2,000円（來回）', en: 'Breakfast & dinner included; lunch ¥500; transit ¥1,500–2,000 RT' },
    shopping: null,
  },
  {
    day: 9,
    date: { zh: '5/22（五）', en: '5/22 Fri' },
    title: { zh: '賦歸', en: 'Homebound' },
    steps: 5000,
    phase: 2,
    weatherCity: 'Sapporo',
    items: [
      { time: '08:30', place: { zh: '🍳 乃之風自助餐（最後早餐）', en: '🍳 Nonokaze Buffet (Final Breakfast)' }, duration: '60min', note: null, maps: null, warn: false },
      { time: '09:30', place: { zh: '退房 → JR 洞爺站', en: 'Check-out → JR Toya Station' }, duration: '30min', note: { zh: '計程車至洞爺站 ~1,500円', en: 'Taxi to Toya Station ~¥1,500' }, maps: 'https://maps.google.com/?q=Toya+Station', warn: false },
      { time: '10:00', place: { zh: 'JR 特急北斗號 → 南千歲 → 新千歲機場', en: 'JR Hokuto → Minami-Chitose → New Chitose Airport' }, duration: '105min', note: { zh: '車資 ~4,000–5,000円；南千歲轉快速機場線', en: '~¥4,000–5,000; transfer to Airport Rapid at Minami-Chitose' }, maps: null, warn: false },
      { time: '11:45', place: { zh: '⚡【物流回收】黑貓 Yamato 領回大件行李', en: '⚡ Luggage Pickup: Yamato Counter (Large Bags)' }, duration: '30min', note: { zh: '憑 5/18 宅急便單據，於國內線/國際線黑貓櫃檯領取', en: 'Use 5/18 Yamato receipt; collect at domestic/intl Yamato counter' }, maps: 'https://maps.google.com/?q=New+Chitose+Airport', warn: true },
      { time: '12:15', place: { zh: '⚡ 至國際線櫃檯掛行李報到（解除負重與時間壓力）', en: '⚡ Check-in Baggage at International Terminal (Relieve Load)' }, duration: '30min', note: { zh: '優先掛行李報到，再回國內線享用午餐與採買', en: 'Check in bags first to relieve pressure; then return to domestic terminal' }, maps: null, warn: true },
      { time: '13:00', place: { zh: '🍜【午餐】一幻拉麵（國內線 3F）→ 2F 最終名產採買', en: '🍜 Lunch: Ichigen Ramen (Domestic 3F) → 2F Final Souvenir Shopping' }, duration: '90min', note: { zh: '蝦味噌拉麵 1,200円；2F：KINOTOYA 起司塔、薯條三兄弟等', en: 'Shrimp miso ramen ¥1,200; 2F: KINOTOYA cheese tart, Jaga Pokkuru, etc.' }, maps: 'https://maps.google.com/?q=一幻+新千歲空港', warn: false },
      { time: '14:45', place: { zh: '安全檢查 / 出境', en: 'Security & Departure' }, duration: '20min', note: { zh: '商務艙快速通道', en: 'Business class fast-track' }, maps: null, warn: false },
      { time: '15:05', place: { zh: '✈️ CI131 出發 → 桃園 18:15 抵達', en: '✈️ CI131 Depart → Taoyuan arr. 18:15' }, duration: '190min', note: { zh: '商務艙 A321neo', en: 'Business A321neo' }, maps: null, warn: false },
    ],
    mealBudget: { zh: '午餐 1,200円', en: 'Lunch ¥1,200' },
    shopping: null,
  },
];

// ── SOUVENIRS ──────────────────────────────────────────────
const SOUVENIRS = [
  {
    category: { zh: '📍 小樽（Day 2）', en: '📍 Otaru (Day 2)' },
    tab: { zh: '小樽', en: 'Otaru' },
    items: [
      { id: 's1', name: { zh: 'LeTAO 起司夾心餅乾（色內通系列）', en: 'LeTAO Cheese Biscuits (Irouchi-dori)' }, price: '500–800円', cold: false, airport: false, note: { zh: '小樽本店種類最齊', en: 'Best selection at Otaru main store' } },
      { id: 's2', name: { zh: 'LeTAO THÉNOIR 大吉嶺紅茶巧克力夾心', en: 'LeTAO THÉNOIR Darjeeling Chocolate' }, price: '—', cold: false, airport: false, note: { zh: '小樽本店限定', en: 'Otaru main store exclusive' } },
      { id: 's3', name: { zh: '北一硝子 手作玻璃杯', en: 'Kitaichi Glass Handmade Cup' }, price: '3,000–8,000円', cold: false, airport: false, note: { zh: '請店家加強包裝', en: 'Ask for extra wrapping' } },
    ]
  },
  {
    category: { zh: '📍 白色戀人公園（Day 3）', en: '📍 Shiroi Koibito Park (Day 3)' },
    tab: { zh: '白色戀人', en: 'Shiroi Koibito' },
    items: [
      { id: 's4', name: { zh: '白色戀人 工廠限定包裝 + 訂製磁鐵', en: 'Shiroi Koibito Factory Box + Custom Magnet' }, price: '2,200–3,500円 + 1,500円', cold: false, airport: false, note: { zh: '訂製磁鐵為現場限定', en: 'Custom magnet is on-site exclusive' } },
    ]
  },
  {
    category: { zh: '📍 札幌 Day 3–4（核心戰場）', en: '📍 Sapporo Day 3–4 (Core Shopping)' },
    tab: { zh: '札幌', en: 'Sapporo' },
    items: [
      { id: 's5', name: { zh: '六花亭 丸成奶油三明治（Marusei Butter Sand）', en: 'Rokkatei Marusei Butter Sand' }, price: '216円×6入', cold: false, airport: false, note: null },
      { id: 's6', name: { zh: '六花亭 酒糖（六花のつゆ）', en: 'Rokkatei Sake Candy (Rikka no Tsuyu)' }, price: '—', cold: false, airport: false, note: { zh: '⚡ 糖衣極脆弱（液體糖），獨立裝入硬盒保護', en: '⚡ Ultra-fragile liquid-filled sugar — pack in hard box' } },
      { id: 's7', name: { zh: '北菓樓 妖精之森年輪蛋糕（整條）', en: 'Kitakaro Elf Forest Baumkuchen' }, price: '2,500円', cold: false, airport: false, note: null },
      { id: 's8', name: { zh: '北菓樓 開拓米果（枝幸帆立貝口味）', en: 'Kitakaro Kaitaku Rice Crackers (Scallop)' }, price: '—', cold: false, airport: false, note: null },
      { id: 's9', name: { zh: '北海道神宮 御守', en: 'Hokkaido Jingu Omamori' }, price: '~500円', cold: false, airport: false, note: null },
    ]
  },
  {
    category: { zh: '📍 函館（Day 6）', en: '📍 Hakodate (Day 6)' },
    tab: { zh: '函館', en: 'Hakodate' },
    items: [
      { id: 's10', name: { zh: "SNAFFLE'S 起司歐姆蕾蛋糕 Catchcakes", en: "SNAFFLE'S Cheese Omelette Catchcakes" }, price: '1,296円 / 6入', cold: true, airport: false, note: { zh: '需冷藏，3 天賞味期限', en: 'Refrigerate, 3-day shelf life' } },
    ]
  },
  {
    category: { zh: '✈️ 新千歲機場（Day 9）— 限定品優先', en: '✈️ New Chitose Airport (Day 9) — Exclusives First' },
    tab: { zh: '✈️ 機場', en: '✈️ Airport' },
    items: [
      { id: 's11', name: { zh: 'Calbee 薯條三兄弟（北海道奶油口味）', en: 'Calbee Jaga Pokkuru (Hokkaido Butter)' }, price: '900円/盒', cold: false, airport: true, note: { zh: '⚡ 國際線安檢後限定，市區找不到', en: '⚡ International terminal AFTER security only — not sold in city' } },
      { id: 's12', name: { zh: 'ROYCE\' 生巧克力（牛奶口味）', en: "ROYCE' Nama Chocolate (Milk)" }, price: '800–1,200円', cold: true, airport: true, note: { zh: '⚡ 安檢後免稅店買，購買保冷袋（300円）', en: '⚡ Buy AFTER security at duty-free; add cold pack (¥300)' } },
      { id: 's13', name: { zh: 'LeTAO 乳酪蛋糕（Double Fromage）', en: 'LeTAO Double Fromage Cheesecake' }, price: '2,000円', cold: true, airport: false, note: { zh: '需保冷袋；冷凍可保 2 週', en: 'Requires cold bag; freezes for 2 weeks' } },
      { id: 's14', name: { zh: 'ISHIYA 白雪戀人 聯名禮盒', en: 'ISHIYA Yukikoibito Gift Box' }, price: '—', cold: false, airport: true, note: { zh: '北海道 7 大機場限定包裝，送禮最體面', en: 'Exclusive to 7 Hokkaido airports — premium gift option' } },
      { id: 's15', name: { zh: '辻口博啓 北海道牛奶 カステラ', en: 'Tsujiguchi Hokkaido Milk Castella' }, price: '—', cold: false, airport: true, note: { zh: '新千歲 3F 聯絡通道「微笑之路」實體限定', en: 'New Chitose 3F Smile Road exclusive — physical store only' } },
      { id: 's16', name: { zh: 'LeTAO まあある ブランシェール', en: 'LeTAO Maaru Blanchere' }, price: '—', cold: false, airport: true, note: { zh: '機場 LeTAO 限定隱藏版白巧克力堅果脆餅', en: 'Airport LeTAO exclusive — white choc nut crisp' } },
      { id: 's17', name: { zh: 'Yoshimi Oh! 燒玉米（Yakibi）', en: 'Yoshimi Oh! Roasted Corn' }, price: '700円', cold: false, airport: false, note: null },
      { id: 's18', name: { zh: 'KINOTOYA 起司塔（現烤）', en: 'KINOTOYA Cheese Tart (Fresh Baked)' }, price: '—', cold: false, airport: true, note: { zh: '機場店現烤；國內線 2F 名產區；送禮自用皆宜', en: 'Fresh baked at airport; domestic terminal 2F souvenir area; great for gifts' } },
    ]
  },
];

// ── DRUGSTORE ─────────────────────────────────────────────
const DRUGSTORE = [
  {
    category: { zh: '💊 腸胃系列', en: '💊 Digestive' },
    tab: { zh: '💊 腸胃', en: '💊 Digest' },
    items: [
      { id: 'd1', name: { zh: '太田胃散', en: 'Ota Isan' }, price: '~800円', note: { zh: '胃痛、消化不良、飯後不適', en: 'Stomach pain, indigestion, post-meal discomfort' } },
      { id: 'd2', name: { zh: 'ビオフェルミン（整腸錠）', en: 'Biofermin (probiotic tablets)' }, price: '~600円', note: { zh: '整腸菌，飲食不規律時服用', en: 'Probiotic for digestive balance' } },
      { id: 'd3', name: { zh: 'ストッパ（止瀉藥）', en: 'Stoppa (anti-diarrhea)' }, price: '~700円', note: { zh: '快速止瀉，外出必備', en: 'Fast-acting, essential for travel' } },
    ]
  },
  {
    category: { zh: '🦴 痠痛消炎', en: '🦴 Pain Relief' },
    tab: { zh: '🦴 痠痛', en: '🦴 Pain' },
    items: [
      { id: 'd4', name: { zh: 'ロイヒつぼ膏（貼布）', en: 'Ruhycream (plasters)' }, price: '~500円', note: { zh: '黑色圓形熱感貼布，激走路神器', en: 'Black round heat pads — perfect for long walking days' } },
      { id: 'd5', name: { zh: 'バンテリン（凝膠）', en: 'Vantelin (gel)' }, price: '~1,200円', note: { zh: '深層肌肉消炎，腰腿腫脹適用', en: 'Deep muscle anti-inflammation, great for sore legs' } },
      { id: 'd6', name: { zh: 'アンメルツ（液狀按摩液）', en: 'Ammeltz (roll-on)' }, price: '~700円', note: { zh: '肩頸痠痛滾珠，方便攜帶', en: 'Roll-on for shoulder/neck pain — travel-friendly' } },
    ]
  },
  {
    category: { zh: '🤧 感冒 / 喉嚨', en: '🤧 Cold / Throat' },
    tab: { zh: '🤧 感冒', en: '🤧 Cold' },
    items: [
      { id: 'd7', name: { zh: 'パブロン（感冒藥）', en: 'Pabron (cold remedy)' }, price: '~800円', note: { zh: '綜合感冒症狀；有糖衣錠和粉末兩種', en: 'All-in-one cold relief; coated tablets or powder' } },
      { id: 'd8', name: { zh: '龍角散（喉糖）', en: 'Ryukakusan (throat drops)' }, price: '~400円', note: { zh: '喉嚨不適、咳嗽；草本成分', en: 'Throat discomfort, cough; herbal formula' } },
    ]
  },
  {
    category: { zh: '👁 眼部護理', en: '👁 Eye Care' },
    tab: { zh: '👁 眼部', en: '👁 Eyes' },
    items: [
      { id: 'd9', name: { zh: 'サンテFX Neo（眼藥水）', en: 'Sante FX Neo (eye drops)' }, price: '~600円', note: { zh: '清涼型，緩解眼睛疲勞', en: 'Cooling formula, relieves eye fatigue' } },
      { id: 'd10', name: { zh: 'ロートリセ（少女眼藥水）', en: 'Rohto Lycée (eye drops)' }, price: '~600円', note: { zh: '粉紅瓶，保濕溫和', en: 'Pink bottle, moisturizing and gentle' } },
    ]
  },
  {
    category: { zh: '✨ 護膚美容', en: '✨ Skincare' },
    tab: { zh: '✨ 護膚', en: '✨ Skin' },
    items: [
      { id: 'd11', name: { zh: '肌研 極潤保濕乳液', en: 'Hada Labo Gokujun Lotion' }, price: '~700円', note: { zh: '玻尿酸保濕；日本最暢銷保濕品牌', en: "Japan's best-selling hyaluronic acid moisturizer" } },
      { id: 'd12', name: { zh: 'MINON 胺基酸保濕面膜', en: 'MINON Amino Mask' }, price: '~1,500円', note: { zh: '敏感肌適用，5 片裝', en: 'Sensitive skin formula, 5-pack' } },
      { id: 'd13', name: { zh: 'Curel 潤浸保濕乳霜', en: 'Curel Intensive Moisture Cream' }, price: '~900円', note: { zh: '乾燥肌首選，CP 值高', en: 'Top pick for dry skin, great value' } },
    ]
  },
  {
    category: { zh: '☀️ 防曬', en: '☀️ Sunscreen' },
    tab: { zh: '☀️ 防曬', en: '☀️ Sun' },
    items: [
      { id: 'd14', name: { zh: 'ANESSA 金瓶防曬乳（SPF50+）', en: 'ANESSA Gold Sunscreen (SPF50+)' }, price: '~1,500円', note: { zh: '資生堂旗艦防曬；防水耐汗', en: 'Shiseido flagship sunscreen; waterproof & sweat-proof' } },
      { id: 'd15', name: { zh: 'ビオレUV 水感防曬噴霧', en: 'Biore UV Watery Spray' }, price: '~800円', note: { zh: '補擦方便，戶外活動必備', en: 'Easy re-application spray for outdoor activities' } },
    ]
  },
  {
    category: { zh: '🧴 其他實用', en: '🧴 Other Essentials' },
    tab: { zh: '🧴 其他', en: '🧴 Other' },
    items: [
      { id: 'd16', name: { zh: 'カイロ（暖暖包 10 入）', en: 'Kairo Hand Warmers (10-pack)' }, price: '~300円', note: { zh: '5 月北海道早晚仍涼，貼式最實用', en: 'May mornings/nights still cold; adhesive type most useful' } },
      { id: 'd17', name: { zh: 'メンソレータム（萬能膏）', en: 'Mentholatum Ointment' }, price: '~400円', note: { zh: '乾裂嘴唇、皮膚乾燥急救', en: 'Lip and skin rescue for dry conditions' } },
      { id: 'd18', name: { zh: 'ニベア 藍罐乳霜', en: 'NIVEA Creme (blue tin)' }, price: '~300円', note: { zh: '全身保濕，台灣找不到大罐裝', en: 'Full-body moisturizer; larger cans only in Japan' } },
    ]
  },
];

// ── TRANSPORT ──────────────────────────────────────────────
const TRANSPORT = {
  jr: [
    { route: { zh: '新千歲機場 → 札幌', en: 'New Chitose → Sapporo' }, train: { zh: 'JR 快速機場線', en: 'JR Airport Rapid' }, time: '40分', fare: '1,150円', note: { zh: 'IC 卡可用', en: 'IC card OK' } },
    { route: { zh: '札幌 → 小樽', en: 'Sapporo → Otaru' }, train: { zh: 'JR 函館本線', en: 'JR Hakodate Main' }, time: '40–50分', fare: '750円', note: { zh: 'IC 卡可用', en: 'IC card OK' } },
    { route: { zh: '札幌 → 函館', en: 'Sapporo → Hakodate' }, train: { zh: '特急 北斗號', en: 'Limited Exp. Hokuto' }, time: '3.5時間', fare: '~9,000円', note: { zh: '全車指定席，D 席右側海景', en: 'All reserved; D-seat = sea view' } },
    { route: { zh: '函館 → 洞爺', en: 'Hakodate → Toya' }, train: { zh: '特急 北斗號', en: 'Limited Exp. Hokuto' }, time: '1時間54分', fare: '~4,500円', note: { zh: '洞爺站下車', en: 'Exit at Toya Station' } },
    { route: { zh: '洞爺 → 登別', en: 'Toya → Noboribetsu' }, train: { zh: 'JR 室蘭本線', en: 'JR Muroran Main' }, time: '約20分', fare: '~800円', note: { zh: '登別站轉巴士至溫泉街', en: 'Transfer to bus at Noboribetsu Station' } },
    { route: { zh: '洞爺 → 南千歲', en: 'Toya → Minami-Chitose' }, train: { zh: '特急 北斗號', en: 'Limited Exp. Hokuto' }, time: '1時間30分', fare: '~4,500円', note: { zh: '南千歲換快速機場線', en: 'Transfer to Airport Rapid' } },
  ],
  local: [
    { city: { zh: '札幌', en: 'Sapporo' }, desc: { zh: '地下鉄 3 線（南北・東西・東豊）；Suica 可用；1 日券 830円', en: 'Subway 3 lines; Suica OK; 1-day pass ¥830' } },
    { city: { zh: '函館', en: 'Hakodate' }, desc: { zh: '市電 2 系統（2 号・5 号）；1 日券 600円；五稜郭公園前站步行 15 分', en: 'Trams 2 lines; 1-day ¥600; Goryokaku-Koen-mae → 15min walk' } },
    { city: { zh: '洞爺湖', en: 'Lake Toya' }, desc: { zh: '道南バス（整理券制，硬幣現金）；班次稀疏；飯店叫計程車更方便', en: 'Donan Bus (cash coins, numbered ticket); infrequent — hotel taxi easier' } },
    { city: { zh: '登別', en: 'Noboribetsu' }, desc: { zh: '登別站→溫泉街巴士約 10 分（道南バス）；備現金硬幣', en: 'Noboribetsu Station→onsen street bus ~10 min (Donan Bus); cash coins required' } },
  ],
  ic: [
    { q: { zh: '哪裡買 Suica？', en: 'Where to get Suica?' }, a: { zh: '新千歲機場 JR 窗口（實體）或 iPhone 錢包 App（推薦）', en: 'New Chitose JR counter (physical) or iPhone Wallet App (recommended)' } },
    { q: { zh: 'Suica 哪裡不能用？', en: 'Where does Suica NOT work?' }, a: { zh: '洞爺湖 道南バス（現金硬幣）、神社境內', en: 'Lake Toya Donan Bus (cash only), shrine grounds' } },
    { q: { zh: '要加值多少？', en: 'How much to load?' }, a: { zh: '出發前建議 5,000円；途中可在便利商店補值', en: 'Load ¥5,000 before trip; top up at any convenience store' } },
  ],
};

// ── BEFORE DEPARTURE CHECKLIST ─────────────────────────────
const CHECKLIST = [
  {
    section: { zh: '✈️ 航班確認', en: '✈️ Flight Confirmation' },
    items: [
      { id: 'c1', text: { zh: 'CI130 / CI131 機票列印或截圖備用', en: 'Screenshot/print CI130 / CI131 boarding passes' } },
      { id: 'c2', text: { zh: '護照有效期 > 6 個月', en: 'Passport valid > 6 months' } },
    ]
  },
  {
    section: { zh: '📱 App & 數位工具', en: '📱 Apps & Digital Tools' },
    items: [
      { id: 'c3', text: { zh: 'iPhone Suica 設定 + 加值 5,000円', en: 'Set up iPhone Suica + load ¥5,000' } },
      { id: 'c4', text: { zh: '乗換案内（Yahoo!）安裝', en: 'Install Yahoo! Transit (Norikae Annai)' } },
      { id: 'c5', text: { zh: 'Google Maps 北海道離線地圖下載', en: 'Download Hokkaido offline maps in Google Maps' } },
      { id: 'c6', text: { zh: 'Google 翻譯日文離線包下載', en: 'Download Japanese offline pack in Google Translate' } },
      { id: 'c7', text: { zh: 'Tabelog 安裝（餐廳預約）', en: 'Install Tabelog (restaurant reservations)' } },
    ]
  },
  {
    section: { zh: '🍽️ 預約確認', en: '🍽️ Reservation Confirmation' },
    items: [
      { id: 'c8', text: { zh: '白色戀人公園 官網預購工廠參觀電子票（1,000円）', en: 'Pre-buy Shiroi Koibito Park factory tour e-ticket online (¥1,000)' } },
      { id: 'c9', text: { zh: '牛しゃぶ 牛すき 禪 預約（Day 3, 20:00）— 備注：不吃生食', en: 'Reserve Zen Wagyu Shabu & Sukiyaki (Day 3, 20:00) — note: fully cooked only' } },
      { id: 'c10', text: { zh: '村上海膽（函館 Day 6）確認是否接受當日候位入座', en: 'Check Murakami Uni (Hakodate Day 6) walk-in / same-day seating policy' } },
      { id: 'c11', text: { zh: '札幌かに本家 站前總店 預約（Day 4, 20:00）— 建議選擇包廂', en: 'Reserve Sapporo Kani Honke (Day 4, 20:00) — request private room' } },
    ]
  },
  {
    section: { zh: '🎒 行李', en: '🎒 Packing' },
    items: [
      { id: 'c12', text: { zh: '防風防水薄外套（山頂風強必備）', en: 'Wind/waterproof jacket (must for mountaintops)' } },
      { id: 'c13', text: { zh: '支撐力好的球鞋（Day 2 12,000步 / Day 6 13,000步）', en: 'Supportive walking shoes (Day 2: 12k steps / Day 6: 13k)' } },
      { id: 'c14', text: { zh: '日幣現金 10,000円（硬幣備用）', en: 'Cash ¥10,000 (including coins for buses)' } },
      { id: 'c15', text: { zh: '旅遊平安險確認', en: 'Travel insurance confirmed' } },
    ]
  },
  {
    section: { zh: '🚂 JR 劃位（抵達後立刻）', en: '🚂 JR Reservation (Right After Arrival)' },
    items: [
      { id: 'c16', text: { zh: '5/18 北斗號 D 席（右側海景）劃位', en: 'Reserve Hokuto D-seat for 5/18 (right = sea view)' } },
      { id: 'c17', text: { zh: '5/20 北斗號（函館→洞爺）劃位', en: 'Reserve Hokuto for 5/20 (Hakodate→Toya)' } },
      { id: 'c18', text: { zh: '5/22 北斗號（洞爺→南千歲）劃位', en: 'Reserve Hokuto for 5/22 (Toya→Minami-Chitose)' } },
    ]
  },
];

// ── SOS / EMERGENCY ────────────────────────────────────────
const SOS = [
  { label: { zh: '日本警察（報案）', en: 'Japan Police' }, number: '110', action: 'call' },
  { label: { zh: '救護車 / 消防', en: 'Ambulance / Fire' }, number: '119', action: 'call' },
  { label: { zh: '中華航空 日本服務', en: 'China Airlines Japan' }, number: '0120-258-888', action: 'call' },
  { label: { zh: '台灣外交部海外急難', en: 'Taiwan MOFA Emergency' }, number: '+886-800-085-095', action: 'call' },
  { label: { zh: '台灣駐大阪辦事處', en: 'TECRO Osaka (covers Hokkaido)' }, number: '+81-6-6443-8481', action: 'call' },
  { label: { zh: '新千歲機場詢問', en: 'New Chitose Airport Info' }, number: '0123-23-0111', action: 'call' },
];

// ── JAPANESE PHRASES ──────────────────────────────────────
const PHRASES = [
  {
    category: { zh: '🍽 餐廳', en: '🍽 Restaurant' },
    items: [
      { zh: '有位子嗎？', jp: '席はありますか？', romaji: 'Seki wa arimasu ka?' },
      { zh: '我不吃生食', jp: '生ものは食べられません', romaji: 'Namamono wa taberaremasen' },
      { zh: '這個是什麼？', jp: 'これは何ですか？', romaji: 'Kore wa nan desu ka?' },
      { zh: '請給我帳單', jp: 'お会計をお願いします', romaji: 'Okaikei wo onegaishimasu' },
      { zh: '好吃！', jp: '美味しいです！', romaji: 'Oishii desu!' },
    ]
  },
  {
    category: { zh: '🚃 交通', en: '🚃 Transport' },
    items: [
      { zh: '到○○怎麼去？', jp: '○○までどうやって行きますか？', romaji: '○○ made dō yatte ikimasu ka?' },
      { zh: '請停在這裡（計程車）', jp: 'ここで止めてください', romaji: 'Koko de tomete kudasai' },
      { zh: '這班車到○○嗎？', jp: 'この電車は○○まで行きますか？', romaji: 'Kono densha wa ○○ made ikimasu ka?' },
      { zh: '我迷路了', jp: '道に迷いました', romaji: 'Michi ni mayoimashita' },
    ]
  },
  {
    category: { zh: '🛒 購物', en: '🛒 Shopping' },
    items: [
      { zh: '這個多少錢？', jp: 'これはいくらですか？', romaji: 'Kore wa ikura desu ka?' },
      { zh: '可以刷卡嗎？', jp: 'カードで払えますか？', romaji: 'Kādo de haraemasu ka?' },
      { zh: '請幫我包裝好一點', jp: 'しっかり包んでください', romaji: 'Shikkari tsutsunde kudasai' },
      { zh: '我只是看看', jp: '見ているだけです', romaji: 'Mite iru dake desu' },
    ]
  },
  {
    category: { zh: '🆘 緊急', en: '🆘 Emergency' },
    items: [
      { zh: '救命！', jp: '助けてください！', romaji: 'Tasukete kudasai!' },
      { zh: '請叫救護車', jp: '救急車を呼んでください', romaji: 'Kyūkyūsha wo yonde kudasai' },
      { zh: '我有過敏：＿＿', jp: '＿＿アレルギーがあります', romaji: '__ Arerugi ga arimasu' },
      { zh: '護照不見了', jp: 'パスポートを無くしました', romaji: 'Pasupōto wo nakushimashita' },
      { zh: '我需要幫助', jp: '助けが必要です', romaji: 'Tasuke ga hitsuyō desu' },
    ]
  },
];

// ── PLACE COORDINATES (for Leaflet map) ───────────────────
// Keys match item.place.zh exactly
const PLACE_COORDS = {
  // Day 1
  '新千歲機場 第 I 航廈':                                      [42.7753, 141.6922],
  '索拉瑞亞西鐵酒店 Check-in':                                 [43.0568, 141.3494],
  '🍖【晚餐】成吉思汗達摩 5.5 店':                            [43.0601, 141.3548],
  '狸小路 + 薄野散步（NIKKA 看板地標）':                       [43.0549, 141.3527],
  '🍨 Parfaiteria PaL（夜聖代）':                              [43.0617, 141.3553],
  // Day 2
  '🍞 索拉瑞亞自助餐（飯店早餐）':                            [43.0568, 141.3494],
  '⭐ 北一硝子 三號館（煤油燈咖啡廳）':                       [43.1908, 140.9946],
  '🥩【午餐】Cafe BAAL（牛排飯）':                             [43.1904, 140.9933],
  '堺町通 + 小樽音樂盒堂 本館':                                [43.1940, 140.9986],
  '⭐ LeTAO 小樽總店（二樓內用現做雙層乳酪蛋糕）':            [43.1899, 140.9948],
  '⭐ 小樽運河夜景散步 → JR 返回札幌':                        [43.1942, 140.9970],
  '🍛【晚餐】奧芝商店 站前創成寺（蝦味湯咖哩）':              [43.0645, 141.3538],
  // Day 3
  '🍞【早餐】Espresso D Works（100% 水份吐司）':               [43.0576, 141.3549],
  '飯店轉移：行李移至京王 Prelia':                             [43.0636, 141.3519],
  '⭐ 白色戀人公園（工廠參觀 + 舒芙蕾鬆餅 + 訂製磁鐵）':     [43.0778, 141.3191],
  '🍱【午餐】とんかつ 檍（頂級炸豬排）':                      [43.0602, 141.3519],
  '北海道神宮 / 圓山公園（判官燒 + 福餅）':                   [43.0613, 141.3204],
  '京王 Prelia 辦入住':                                        [43.0636, 141.3519],
  '⭐ 藻岩山展望台（觀賞日落至夜景）':                        [43.0326, 141.3300],
  '🥩【慶祝晚餐】牛しゃぶ 牛すき 禪（黑毛和牛壽喜燒）':      [43.0591, 141.3547],
  // Day 4
  '🍳 京王 Prelia 自助餐（飯店早餐）':                        [43.0636, 141.3519],
  '歷史地標打卡（紅磚廳舍 → 時計台 → 電視塔）':               [43.0643, 141.3528],
  '中島公園 / 豐平館（晨間湖畔 + 明治洋樓）':                 [43.0491, 141.3534],
  '🛍️【核心採購啟動】大丸 → Stellar Place → APIA → PARCO':   [43.0688, 141.3508],
  '☕【午餐】六花亭 札幌本店（熱披薩 + 咖啡）':               [43.0593, 141.3531],
  '採購收尾（大丸 B1 食品館 + 北菓樓）':                      [43.0688, 141.3508],
  '🦀【晚餐】札幌かに本家 站前總店（全熟螃蟹火鍋）':          [43.0605, 141.3513],
  // Day 5
  '🍞【早餐】DONGURI（靈魂麵包）':                            [43.0640, 141.3558],
  'Century Marina Hakodate Check-in（此後五天輕裝移動）':      [41.7697, 140.7190],
  '☕ 幸運小丑漢堡 碼頭末廣店（下午茶）':                     [41.7699, 140.7248],
  '⭐ 函館山觀景台（百萬夜景）':                              [41.7596, 140.7007],
  '🍜【晚餐】味彩（鹽拉麵）':                                 [41.7688, 140.7249],
  // Day 6
  '🍳 Century Marina 自助餐（飯店早餐）':                     [41.7697, 140.7190],
  '函館朝市 + 金森紅磚倉庫散步':                              [41.7731, 140.7239],
  '🦔【午餐】村上海膽（全熟解鎖：焗烤海膽 / 烤海膽）':        [41.7700, 140.7255],
  '⭐ 五稜郭展望塔 / 公園':                                   [41.7964, 140.7560],
  '⭐ 八幡坂 / 元町建築群（大正風情漫步）':                   [41.7714, 140.7153],
  '🍢【晚餐】大門橫丁 屋台村':                               [41.7731, 140.7254],
  // Day 7
  '函館朝市早餐（烤蟹腳 + 奶油烤扇貝）':                     [41.7731, 140.7239],
  '抵達 JR 洞爺站':                                           [42.5348, 140.8340],
  '⭐【戰術遠征】計程車 → 筒倉展望台 Silo（布丁 + 俯瞰洞爺湖）': [42.5498, 140.7793],
  '🍵【午餐】岡田屋（白汁粉）':                               [42.5562, 140.7820],
  '湖景 TOYA 乃之風渡假酒店 Check-in（進入全面留白）':        [42.5582, 140.7810],
  '🍽️【晚餐】乃之風自助餐':                                  [42.5582, 140.7810],
  '⭐ 洞爺湖水上煙火（房內觀賞）':                            [42.5582, 140.7810],
  // Day 8
  '🍳 乃之風自助餐（飯店早餐）':                              [42.5582, 140.7810],
  '⭐ 登別地獄谷 / 大湯沼川天然足湯':                        [42.4403, 141.2302],
  '🍜【午餐】登別溫泉街熟食':                                 [42.4380, 141.2300],
  '返回乃之風飯店（溫泉降載 + 身心恢復）':                    [42.5582, 140.7810],
  '🍽️【晚餐】乃之風自助餐':                                  [42.5582, 140.7810],
  '⭐ 洞爺湖水上煙火（最後場）':                              [42.5582, 140.7810],
  // Day 9
  '🍳 乃之風自助餐（最後早餐）':                              [42.5582, 140.7810],
  '🍜【午餐】一幻拉麵（國內線 3F）→ 2F 最終名產採買':        [42.7762, 141.6925],
  // New Day 2 (V4)
  '🍜【晚餐】Sumire 味噌拉麵（薄野店）':                      [43.0560, 141.3540],
  '🍨 Sato（夜聖代）':                                        [43.0614, 141.3558],
  // New Day 4 (V4)
  '🍛【午餐】GARAKU 湯咖哩':                                  [43.0578, 141.3529],
  '☕ 千秋庵本店（巴里銅鑼）':                                [43.0693, 141.3536],
  // New Day 6 (V4)
  '🍛【晚餐】奧芝商店 函館本店（蝦味湯咖哩）':               [41.7695, 140.7250],
};

// ── BUDGET ─────────────────────────────────────────────────
const BUDGET = [
  { item: { zh: 'JR 車票（含機場線、北斗號）', en: 'JR Tickets (incl. airport, Hokuto)' }, est: '¥20,000–25,000' },
  { item: { zh: '巴士 / 地下鉄 / 市電 / 纜車', en: 'Bus / Subway / Tram / Ropeway' }, est: '¥5,000–8,000' },
  { item: { zh: '餐飲（9 天）', en: 'Meals (9 days)' }, est: '¥40,000–60,000' },
  { item: { zh: '伴手禮', en: 'Souvenirs' }, est: '¥30,000–50,000' },
  { item: { zh: '門票 + 體驗', en: 'Entrance fees + activities' }, est: '¥5,000–8,000' },
  { item: { zh: '計程車（洞爺湖）', en: 'Taxi (Lake Toya)' }, est: '¥6,000–8,000' },
  { item: { zh: '宅急便（行李宅配）', en: 'Luggage forwarding' }, est: '¥3,000–5,000' },
  { item: { zh: '合計（不含機票飯店）', en: 'Total (excl. flights & hotels)' }, est: '¥109,000–164,000', total: true },
];

// ── PLACE DETAIL (Approach B: keyed by cleanPlaceName result) ─
// Keys must match what cleanPlaceName(item.place.zh) returns exactly.
const PLACE_DETAIL = {
  '成吉思汗達摩 5.5 店': {
    phone: '011-521-4804',
    hours: { zh: '每日 17:00–翌03:00', en: 'Daily 17:00–03:00+' },
    address: { zh: '札幌市中央区南5条西4丁目', en: 'Minami 5-jo W4, Chuo-ku, Sapporo' },
    recommend: { zh: '成吉思汗羊肉 · 生ラム（新鮮生羔羊）', en: 'Jingisukan lamb · Fresh raw lamb (nama-ramu)' },
  },
  'Parfaiteria PaL': {
    phone: '011-530-5505',
    hours: { zh: '週二–日 18:00–00:00（週一公休）', en: 'Tue–Sun 18:00–00:00, closed Mon' },
    address: { zh: '札幌市中央区南4条西4丁目', en: 'Minami 4-jo W4, Chuo-ku, Sapporo' },
    recommend: { zh: '季節限定夜聖代（北海道牛奶底）', en: 'Seasonal night parfait (Hokkaido milk base)' },
  },
  '⭐ 北一硝子 三號館': {
    phone: '0134-33-1993',
    hours: { zh: '每日 08:45–18:00', en: 'Daily 08:45–18:00' },
    address: { zh: '小樽市堺町7-26', en: '7-26 Sakaimachi, Otaru' },
    recommend: { zh: '煤油燈咖啡廳內用 · 手作玻璃杯（3,000円起）', en: 'Kerosene lamp café · Handmade glass from ¥3,000' },
  },
  '⭐ LeTAO 小樽總店': {
    phone: '0120-468-111',
    hours: { zh: '每日 09:00–18:00（季節調整）', en: 'Daily 09:00–18:00 (season varies)' },
    address: { zh: '小樽市堺町7-16', en: '7-16 Sakaimachi, Otaru' },
    recommend: { zh: '2F 現做雙層乳酪蛋糕 900円 · 飲料套餐 1,400円', en: '2F fresh Double Fromage ¥900 · drink set ¥1,400' },
  },
  'Sumire 味噌拉麵': {
    phone: '011-551-4960',
    hours: { zh: '11:00–15:00，18:00–21:00（週三公休）', en: '11:00–15:00, 18:00–21:00, closed Wed' },
    address: { zh: '札幌市中央区南5条西5丁目（薄野店）', en: 'Susukino, Minami 5-jo W5, Chuo-ku' },
    recommend: { zh: '味噌拉麵 · 奶油玉米味噌（コーンバターみそ）', en: 'Miso ramen · Rich butter corn miso' },
  },
  'Sato': {
    hours: { zh: '夜間限定（約 19:00–翌01:00）', en: 'Night only (approx 19:00–01:00+)' },
    address: { zh: '札幌市中央区南4条西4丁目周邊', en: 'Near Minami 4-jo W4, Chuo-ku, Sapporo' },
    recommend: { zh: '季節夜聖代（每週更換）', en: 'Seasonal night parfait (weekly rotation)' },
  },
  'Espresso D Works': {
    phone: '011-231-4059',
    hours: { zh: '週一–五 08:00–18:00，週末 08:00–17:00', en: 'Mon–Fri 08:00–18:00, weekends 08:00–17:00' },
    address: { zh: '札幌市中央区大通西1丁目', en: 'Odori W1, Chuo-ku, Sapporo' },
    recommend: { zh: '水份100% 吐司 · 蓬鬆舒芙蕾 · 玉米濃湯套餐', en: '100% moisture toast · soufflé pancake · corn soup set' },
  },
  '⭐ 白色戀人公園': {
    phone: '011-666-1481',
    hours: { zh: '09:00–18:00（依季節調整）', en: '09:00–18:00 (season varies)' },
    address: { zh: '札幌市西区宮の沢2条2丁目11-36', en: '2-2-11-36 Miyanosawa, Nishi-ku, Sapporo' },
    recommend: { zh: '工廠參觀票（預購 1,000円）· 舒芙蕾鬆餅 · 訂製磁鐵（1,500円起）', en: 'Factory tour (pre-book ¥1,000) · soufflé pancake · custom magnet (from ¥1,500)' },
    access: {
      zh: ['① 地下鐵東西線至終點「宮の沢」站', '② 步行約 7 分鐘直達（依指標走）'],
      en: ['① Subway Tozai Line to terminal "Miyanosawa"', '② Walk ~7 min following signs'],
    },
    link: 'https://www.shiroikoibitopark.jp/',
  },
  '北海道神宮 / 圓山公園': {
    hours: { zh: '開放參拜 06:00–17:00', en: 'Worship hours 06:00–17:00' },
    address: { zh: '札幌市中央区宮ヶ丘474', en: '474 Miyagaoka, Chuo-ku, Sapporo' },
    recommend: { zh: '判官さま現烤麻糬（限量 300円）· 福餅 · 圓山公園湖畔散步', en: 'Hangan grilled mochi (limited, ¥300) · Fuku-mochi · Maruyama Park stroll' },
    access: {
      zh: ['① 地下鐵東西線至「円山公園」站', '② 步行約 10 分鐘至神宮正門（沿指標走）'],
      en: ['① Subway Tozai Line to "Maruyama Koen"', '② Walk ~10 min to main shrine gate (follow signs)'],
    },
    link: 'https://www.hokkaidojingu.or.jp/',
  },
  'GARAKU 湯咖哩': {
    phone: '011-233-5568',
    hours: { zh: '11:30–22:00（週三公休）', en: '11:30–22:00, closed Wed' },
    address: { zh: '札幌市中央区南2条西2丁目', en: 'Minami 2-jo W2, Chuo-ku, Sapporo' },
    recommend: { zh: '海老ベースのスープカレー · 辣度 0–40 可選', en: 'Shrimp broth soup curry · spice level 0–40' },
  },
  '千秋庵本店': {
    phone: '011-231-3681',
    hours: { zh: '10:00–18:00（不定休）', en: '10:00–18:00 (irregular holidays)' },
    address: { zh: '札幌市中央区北4条西3丁目', en: 'Kita 4-jo W3, Chuo-ku, Sapporo' },
    recommend: { zh: 'バリ銅鑼（巴里銅鑼）· 僅本店現場烤製', en: 'Bali Dorayaki · freshly baked in-store only' },
  },
  '札幌かに本家 站前總店': {
    phone: '011-222-0018',
    hours: { zh: '11:30–22:00（需提前預約）', en: '11:30–22:00 (reservations recommended)' },
    address: { zh: '札幌市中央区北4条西2丁目', en: 'Kita 4-jo W2, Chuo-ku, Sapporo' },
    recommend: { zh: '全熟螃蟹套餐（8,000–15,000円）· 指定包廂', en: 'Fully cooked crab course (¥8,000–15,000) · request private room' },
  },
  '幸運小丑漢堡 碼頭末廣店': {
    phone: '0138-26-2099',
    hours: { zh: '10:00–22:00（全年無休）', en: '10:00–22:00, open year-round' },
    address: { zh: '函館市末広町23-18', en: '23-18 Suehirocho, Hakodate' },
    recommend: { zh: '中華風炸雞漢堡（チャイニーズチキンバーガー）580円', en: 'Chinese Chicken Burger ¥580' },
  },
  '村上海膽': {
    phone: '0138-22-6086',
    hours: { zh: '09:00–18:00（週三・週四公休）', en: '09:00–18:00, closed Wed & Thu' },
    address: { zh: '函館市大手町22-1', en: '22-1 Otemachi, Hakodate' },
    recommend: { zh: '焗烤海膽（ウニグラタン）· 炙烤海膽（炙りウニ）· 避開生食', en: 'Uni gratin · grilled uni · skip raw uni' },
  },
  '奧芝商店 函館本店': {
    phone: '0138-83-5007',
    hours: { zh: '11:30–21:00（週一・週二公休）', en: '11:30–21:00, closed Mon & Tue' },
    address: { zh: '函館市本町6-9', en: '6-9 Honcho, Hakodate' },
    recommend: { zh: '海老スープカレー（蝦湯咖哩）辣度 1–30', en: 'Shrimp broth soup curry, spice level 1–30' },
  },
  '岡田屋': {
    phone: '0142-75-2041',
    hours: { zh: '10:00–17:00（不定休）', en: '10:00–17:00 (irregular)' },
    address: { zh: '洞爺湖町洞爺湖温泉50', en: '50 Toyako Onsen, Toyako-cho' },
    recommend: { zh: '白汁粉（白玉白湯圓紅豆湯）600–900円', en: 'White mochi sweet soup ¥600–900' },
  },
  // ── Day 2 ──
  'Cafe BAAL': {
    hours: { zh: '11:00–21:00（週三公休）', en: '11:00–21:00, closed Wed' },
    address: { zh: '小樽市稲穂2丁目（近小樽站）', en: 'Near Otaru Station, Inaho 2-chome' },
    recommend: { zh: '洋食牛排飯 1,500–2,500円；份量紮實、保護腿力', en: 'Western-style steak rice ¥1,500–2,500; hearty portions, saves your legs' },
  },
  // ── Day 3 ──
  'とんかつ 檍': {
    hours: { zh: '11:30–22:00', en: '11:30–22:00' },
    address: { zh: '札幌市中央区南1条西5丁目', en: 'Minami 1-jo W5, Chuo-ku, Sapporo' },
    recommend: { zh: '特上ロースかつ定食 2,500–4,000円；麥飯＋高麗菜無限續', en: 'Premium loin cutlet set ¥2,500–4,000; barley rice + cabbage unlimited refill' },
  },
  '⭐ 藻岩山展望台': {
    phone: '011-561-8177',
    hours: { zh: '纜車 10:30–22:00（最終上山 21:30）', en: 'Ropeway 10:30–22:00 (last ride up 21:30)' },
    address: { zh: '札幌市南区藻岩山', en: 'Moiwa-yama, Minami-ku, Sapporo' },
    recommend: { zh: '纜車來回 2,100円；日本三大夜景；5月日落約18:30，帶防風外套', en: 'Ropeway ¥2,100 RT; Japan top-3 night view; sunset ~18:30 in May — bring windproof jacket' },
    access: {
      zh: [
        '① 搭市電（路面電車）至「ロープウェイ入口」站',
        '② 步行約 10 分 或 搭免費接駁巴士至山麓駅（20:00 後加班）',
        '③ ロープウェイ（約5分）→ ミニケーブルカー（約2分）抵達山頂',
        '⚡ 纜車約每 20 分一班；建議 17:00 前抵達山麓站',
      ],
      en: [
        '① City tram to "Ropeway-Iriguchi" stop',
        '② Walk ~10 min or take free shuttle bus to cable car base (extra runs after 20:00)',
        '③ Ropeway (~5 min) → Mini cable car (~2 min) to summit',
        '⚡ Ropeway runs every ~20 min; arrive at base by 17:00 recommended',
      ],
    },
    link: 'https://mt-moiwa.jp/',
  },
  '牛しゃぶ 牛すき 禪': {
    hours: { zh: '18:00–23:00（需提前預約）', en: '18:00–23:00 (reservations required)' },
    address: { zh: '札幌市中央区（薄野周邊）', en: 'Near Susukino, Chuo-ku, Sapporo' },
    recommend: { zh: '黑毛和牛壽喜燒；備注「不吃生食」請全熟處理；套餐 10,000–15,000円', en: 'Kuroge wagyu sukiyaki; note "fully cooked only" when booking; course ¥10,000–15,000' },
  },
  // ── Day 5 ──
  'DONGURI': {
    hours: { zh: '07:00–19:00（依店而異）', en: '07:00–19:00 (varies by branch)' },
    address: { zh: '札幌市各處（推薦大通附近店）', en: 'Multiple locations around Sapporo' },
    recommend: { zh: '牛角形クロワッサン・豆沙包；日日現烤；早開門是最大優勢', en: 'Horn croissant, red bean bun; baked fresh daily; early opening is the key advantage' },
  },
  '⭐ 函館山觀景台': {
    phone: '0138-23-6288',
    hours: { zh: '纜車 10:00–22:00（10/16–4/24 至 21:00）；15m/s 強風停駛', en: 'Ropeway 10:00–22:00 (10/16–4/24 until 21:00); stops at 15m/s wind' },
    address: { zh: '函館市函館山', en: 'Hakodate-yama, Hakodate' },
    recommend: { zh: '纜車來回 1,500円；日落後30分最美；山頂較市區冷5–8°C', en: 'Ropeway ¥1,500 RT; best 30 min after sunset; top is 5–8°C colder than city' },
    access: {
      zh: [
        '① 市電至「十字街」站，步行約 10 分至纜車乘車口（もとまち方向）',
        '② ロープウェイ（來回 1,500円）約 3 分抵達山頂',
        '⚡ 纜車約每 10 分一班；旺季排隊可達 30–60 分，建議 17:30 前抵達',
        '⚡ 出發前至官網確認風速，15m/s 以上停駛',
      ],
      en: [
        '① City tram to "Jujigai", walk ~10 min to ropeway station (toward Motomachi)',
        '② Ropeway (¥1,500 RT) ~3 min to summit',
        '⚡ Runs every ~10 min; peak season queue 30–60 min — arrive by 17:30',
        '⚡ Check wind speed on official site before going (stops at 15m/s)',
      ],
    },
    link: 'https://334.co.jp/',
  },
  '味彩': {
    phone: '0138-22-6751',
    hours: { zh: '11:00–20:00（週二公休）', en: '11:00–20:00, closed Tue' },
    address: { zh: '函館市本町16-13', en: '16-13 Honcho, Hakodate' },
    recommend: { zh: '函館鹽拉麵老舖；透明清湯；あっさり鹽味 800–1,200円', en: 'Hakodate salt ramen institution; clear broth; light & savory ¥800–1,200' },
  },
  // ── Day 6 ──
  '⭐ 五稜郭展望塔 / 公園': {
    phone: '0138-51-4785',
    hours: { zh: '09:00–18:00（4–10月至19:00）', en: '09:00–18:00 (Apr–Oct until 19:00)' },
    address: { zh: '函館市五稜郭町43-9', en: '43-9 Goryokaku-cho, Hakodate' },
    recommend: { zh: '展望台 900円（★必上）；俯瞰五角星形堡壘；公園免費', en: 'Observation tower ¥900 (★must do); star-shaped fort from above; park is free' },
    access: {
      zh: ['① 市電至「五稜郭公園前」站', '② 步行約 15 分鐘至展望塔（沿五稜郭通直走）'],
      en: ['① City tram to "Goryokaku-Koen-mae" stop', '② Walk ~15 min to tower (straight along Goryokaku-dori)'],
    },
    link: 'https://www.goryokaku-tower.co.jp/',
  },
  '⭐ 八幡坂 / 元町建築群': {
    hours: { zh: '舊函館区公会堂 09:00–17:00（週一公休）', en: 'Old Public Hall 09:00–17:00, closed Mon' },
    address: { zh: '函館市元町', en: 'Motomachi, Hakodate' },
    recommend: { zh: '八幡坂坡道海港透視日落最美；舊函館区公会堂 300円；周邊建築群免費', en: 'Hachiman-zaka sea view best at sunset; Old Public Hall ¥300; surrounding buildings free' },
  },
  // ── Day 8 ──
  '⭐ 登別地獄谷 / 大湯沼川天然足湯': {
    phone: '0143-84-3311',
    hours: { zh: '地獄谷・足湯全日免費開放', en: 'Hell Valley & footbath: free, open all day' },
    address: { zh: '登別市登別温泉町', en: 'Noboribetsu Onsen-cho, Noboribetsu' },
    recommend: { zh: '地獄谷免費；足湯免費（帶小毛巾）；現場可領防水坐墊；泉源公園間歇泉每整點噴發', en: 'Hell Valley free; footbath free (bring towel); waterproof mat at entrance; geyser erupts hourly' },
    access: {
      zh: ['① 搭 JR 特急 / 普通列車至登別站（洞爺出發約 20 分）', '② 登別站搭道南バス至登別溫泉巴士總站（約 10 分，票價 380円）', '⚡ 班次每小時 1–2 班，出發前確認時刻表'],
      en: ['① Take JR Limited/Local Express to Noboribetsu Station (~20 min from Toya)', '② Take Donan Bus from station to Noboribetsu Onsen terminal (~10 min, ¥380)', '⚡ ~1–2 buses/hour — check schedule before departing'],
    },
    link: 'https://noboribetsu-spa.jp/',
  },
  // ── Day 9 ──
  '一幻拉麵': {
    phone: '011-213-2626',
    hours: { zh: '10:00–21:30（機場店）', en: '10:00–21:30 (airport branch)' },
    address: { zh: '新千歲機場 國內線 3F', en: 'New Chitose Airport Domestic Terminal 3F' },
    recommend: { zh: '濃郁蝦味噌拉麵 1,200円；旅程最後一餐；蝦湯濃縮精華', en: 'Rich shrimp miso ramen ¥1,200; perfect final meal; intensely flavored shrimp broth' },
  },
};
