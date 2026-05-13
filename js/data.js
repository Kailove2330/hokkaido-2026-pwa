// ============================================================
// HOKKAIDO 2026 TRIP DATA — bilingual (zh / en)
// ============================================================

const T = {
  zh: {
    appTitle: '北海道 2026',
    tabs: ['總覽', '行程', '清單', '交通', '記帳'],
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
    tabs: ['Overview', 'Itinerary', 'Lists', 'Transport', 'Expenses'],
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
  // Day 1
  {
    day: 1, date: { zh: '5/14（四）', en: '5/14 Thu' },
    title: { zh: '抵達札幌', en: 'Arrival in Sapporo' },
    steps: 8000, phase: 0, weatherCity: 'Sapporo',
    items: [
      { time: '06:45', place: { zh: '桃園國際機場第二航廈', en: 'Taoyuan Airport T2' }, duration: '105min', note: { zh: 'CI130 · 08:35 起飛；提前抵達辦理報到', en: 'CI130 · Departs 08:35; arrive early for check-in' }, maps: null, coord: [25.0797, 121.2320], warn: false },
      { time: '13:35', place: { zh: '新千歲機場', en: 'New Chitose Airport' }, duration: '60min', note: { zh: '⚡ 出關後至 JR 窗口劃位：5/18 北斗號 D 席（右側海景）；IC 卡購入或加值', en: '⚡ After customs: reserve Hokuto D-seat (5/18, right sea view); buy/top-up IC card' }, maps: 'https://maps.google.com/?q=New+Chitose+Airport', coord: [42.7751, 141.6924], warn: true },
      { time: '14:35', place: { zh: 'JR 快速機場線 → 札幌', en: 'JR Airport Rapid to Sapporo' }, duration: '40min', note: { zh: '車資 1,150円（IC）', en: '1,150 yen (IC)' }, maps: null, warn: false },
      { time: '15:18', place: { zh: '索拉瑞亞西鐵酒店 Check-in', en: 'Solaria Nishitetsu Hotel Check-in' }, duration: '30min', note: { zh: '行李寄放換輕裝', en: 'Drop luggage, change to light wear' }, maps: 'https://maps.google.com/?q=Solaria+Nishitetsu+Hotel+Sapporo', coord: [43.0606, 141.3565], warn: false },
      { time: '15:53', place: { zh: '北海道廳紅磚廳舍', en: 'Former Hokkaido Gov. Office (Red Brick Building)' }, duration: '20min', note: { zh: '免費入園；明治時代洋風建築；庭園散步拍照', en: 'Free entry; Meiji-era Western building; garden stroll & photos' }, maps: 'https://maps.google.com/?q=北海道庁赤れんが庁舎', coord: [43.0626, 141.3470], warn: false },
      { time: '16:27', place: { zh: '🍖【晚餐早場】成吉思汗達摩 5.5 店', en: '🍖 Early Dinner: Daruma 5.5 (Genghis Khan BBQ)' }, duration: '90min', note: { zh: '薄野名店；烤羊肉 2,500–3,500円/人', en: 'Susukino lamb BBQ 2,500-3,500 yen/person' }, maps: 'https://maps.google.com/?q=Daruma+Sapporo+Genghis+Khan', coord: [43.0524, 141.3545], warn: false },
      { time: '18:06', place: { zh: '🍨 Parfaiteria PaL（夜聖代）', en: '🍨 Parfaiteria PaL (Night Parfait)' }, duration: '60min', note: { zh: '北海道牛奶夜聖代；夜間限定', en: 'Hokkaido milk night parfait; nighttime only' }, maps: 'https://maps.google.com/?q=Parfaiteria+PaL+Sapporo', coord: [43.0503, 141.3545], warn: false },
      { time: '19:18', place: { zh: '狸小路藥妝（Sundrug 4 丁目→大國藥妝 5 丁目）', en: 'Tanukikoji Drugstores (Sundrug + Daikoku)' }, duration: '120min', note: { zh: '先比價 Sundrug，再至大國藥妝掃貨', en: 'Compare at Sundrug, then stock up at Daikoku Drug' }, maps: 'https://maps.google.com/?q=狸小路商店街+札幌', coord: [43.0559, 141.3508], warn: false },
      { time: '21:38', place: { zh: '索拉瑞亞西鐵酒店', en: 'Solaria Nishitetsu Hotel' }, duration: '60min', note: null, maps: null, warn: false },
    ],
    mealBudget: { zh: '晚餐 3,000–3,500円 + 聖代 1,500円／人', en: 'Dinner 3,000-3,500 + parfait 1,500 yen/person' },
    shopping: { zh: '狸小路藥妝（Sundrug / 大國藥妝）', en: 'Tanukikoji drugstores (Sundrug / Daikoku Drug)' },
    stepsRange: { zh: '約 7,000–8,000 步', en: 'approx. 7,000–8,000 steps' },
    stepsLevel: 'easy',
    tips: [
      { title: { zh: '機場首要任務', en: 'Airport Priority' }, body: { zh: '出關後第一件事，直奔 B1 的 JR 外籍旅客服務處，拿出小抄把「5日周遊券兌換＋所有指定席」一次劃位搞定。（請特別提醒站務員周遊券 5/18 才啟用）', en: 'Head straight to JR Information Desk at B1 after customs. Exchange rail pass + reserve all seats in one go. Remind agent that activation date is May 18.' } },
      { title: { zh: '達摩烤肉防排隊', en: 'Daruma Queue Strategy' }, body: { zh: '16:20 左右抵達達摩 5.5 店是黃金時間，能無痛進入第一輪用餐；一旦錯過第一輪，可能要在寒風中罰站 1 小時以上。', en: 'Arrive at Daruma 5.5 around 16:20 for smooth first-seating entry. Miss it and you may wait 1+ hour in the cold.' } },
      { title: { zh: '溫差預警', en: 'Temperature Drop Warning' }, body: { zh: '晚上逛狸小路與薄野時，氣溫會降到 10°C 左右，出門吃晚餐記得帶上防風外套。', en: 'Evening temperatures drop to ~10°C. Bring a windproof jacket when heading out for dinner.' } },
    ],
  },
  // Day 2
  {
    day: 2, date: { zh: '5/15（五）', en: '5/15 Fri' },
    title: { zh: '小樽漫步', en: 'Otaru Stroll' },
    steps: 12000, phase: 0, weatherCity: 'Sapporo',
    items: [
      { time: '08:16', place: { zh: '🍞【早餐】ESPRESSO D WORKS ススキノ店（水分 100% 吐司）', en: '🍞 Breakfast: ESPRESSO D WORKS Susukino (100% Moisture Toast)' }, duration: '90min', note: { zh: '名物水分 100% 吐司；建議提早入座', en: 'Famous 100% moisture toast; arrive early for a seat' }, maps: 'https://maps.google.com/?q=Espresso+D+Works+Sapporo', coord: [43.0554, 141.3539], warn: false },
      { time: '09:46', place: { zh: 'JR 札幌站 → 小樽（約 50 分）', en: 'JR Sapporo to Otaru (about 50 min)' }, duration: '50min', note: { zh: '車資 750円（IC）', en: '750 yen (IC card)' }, maps: 'https://maps.google.com/?q=Sapporo+Station', coord: [43.0687, 141.3506], warn: false },
      { time: '10:36', place: { zh: '六花亭 小樽運河店', en: 'Rokkatei Otaru Canal Branch' }, duration: '30min', note: { zh: '運河邊景觀；分店限定甜點外帶', en: 'Canal-side view; branch-exclusive take-away sweets' }, maps: 'https://maps.google.com/?q=六花亭+小樽+運河', coord: [43.1904, 141.0014], warn: false },
      { time: '11:28', place: { zh: '🥩【午餐】Cafe BAAL（洋食牛排飯）', en: '🥩 Lunch: Cafe BAAL (Western Steak Rice)' }, duration: '60min', note: { zh: '小樽老牌洋食；1,500–2,500円', en: 'Otaru classic western food 1,500-2,500 yen' }, maps: 'https://maps.google.com/?q=Cafe+BAAL+小樽', coord: [43.1880, 140.9966], warn: false },
      { time: '12:51', place: { zh: '⭐ 北一硝子 三號館（煤油燈咖啡廳）', en: '⭐ Kitaichi Glass No.3 (Kerosene Lamp Cafe)' }, duration: '60min', note: { zh: '禁閃光燈/腳架；手作玻璃杯 3,000–8,000円', en: 'No flash/tripod; handmade glass 3,000-8,000 yen' }, maps: 'https://maps.google.com/?q=Kitaichi+Glass+No3+Otaru', coord: [43.1844, 140.9939], img: 'images/itinerary/kitaichi.jpg', warn: false },
      { time: '13:53', place: { zh: '⭐ LeTAO 小樽總店（二樓現做雙層乳酪蛋糕）', en: '⭐ LeTAO Main Store (2F Fresh Double Fromage)' }, duration: '90min', note: { zh: '⚡ 二樓現做雙層乳酪蛋糕 900円；附飲料套餐 1,400円', en: '⚡ 2F fresh Double Fromage 900 yen; drink set 1,400 yen' }, maps: 'https://maps.google.com/?q=LeTAO+Otaru', coord: [43.1866, 140.9932], img: 'images/itinerary/letao.jpg', warn: true },
      { time: '15:25', place: { zh: '小樽音樂盒堂 本館（堺町通）', en: 'Otaru Music Box Museum Main Hall' }, duration: '90min', note: { zh: '免費入場；限定款 3,000円起', en: 'Free entry; limited editions from 3,000 yen' }, maps: 'https://maps.google.com/?q=小樽オルゴール堂本館', coord: [43.1909, 140.9953], img: 'images/itinerary/orugoru.jpg', warn: false },
      { time: '17:16', place: { zh: '⭐ 浅草橋（小樽運河黃金窗口）', en: '⭐ Asausa Bridge (Otaru Canal Golden Hour)' }, duration: '30min', note: { zh: '⚡ 黃昏點燈最美；運河倒影 + 瓦斯燈', en: '⚡ Best light at dusk when lanterns glow; canal reflection + gas lamps' }, maps: 'https://maps.google.com/?q=浅草橋+小樽運河', coord: [43.1906, 140.9979], img: 'images/itinerary/otaru-canal.jpg', warn: true },
      { time: '17:46', place: { zh: 'JR 小樽 → 札幌（約 50 分）', en: 'JR Otaru to Sapporo (about 50 min)' }, duration: '50min', note: null, maps: null, warn: false },
      { time: '18:38', place: { zh: '🍜【晚餐】味噌拉麵 すみれ', en: '🍜 Dinner: Sumire Miso Ramen' }, duration: '90min', note: { zh: '札幌三大味噌拉麵之一；1,200–1,500円', en: "One of Sapporo's top 3 miso ramen; 1,200-1,500 yen" }, maps: 'https://maps.google.com/?q=すみれ+薄野+札幌', coord: [43.0521, 141.3565], warn: false },
      { time: '20:14', place: { zh: '🍨 Parfait, coffee, liquor, Sato（夜聖代）', en: '🍨 Sato Night Parfait' }, duration: '60min', note: { zh: '「拉麵接聖代」成就！', en: '"Ramen to Parfait" achievement unlocked!' }, maps: 'https://maps.google.com/?q=パフェ+さとう+札幌', coord: [43.0548, 141.3546], warn: false },
      { time: '21:30', place: { zh: '索拉瑞亞西鐵酒店', en: 'Solaria Nishitetsu Hotel' }, duration: '60min', note: null, maps: null, warn: false },
    ],
    mealBudget: { zh: '午餐 2,000円 + LeTAO 1,400円 + 晚餐 1,500円 + 聖代 1,200円／人', en: 'Lunch 2,000 + LeTAO 1,400 + dinner 1,500 + parfait 1,200 yen/person' },
    shopping: { zh: 'LeTAO 起司餅乾 · Double Fromage；北一硝子玻璃杯；音樂盒堂限定款', en: 'LeTAO biscuits · Double Fromage; Kitaichi glass; Music Box limited edition' },
    stepsRange: { zh: '約 13,000–15,000 步', en: 'approx. 13,000–15,000 steps' },
    stepsLevel: 'medium',
    tips: [
      { title: { zh: '海港防風', en: 'Harbour Wind Chill' }, body: { zh: '小樽在海邊，海風吹來非常刺骨，請務必採取「洋蔥式穿搭」，防風外套必備。', en: 'Otaru is by the sea — sea wind is biting. Layer up with an onion-style outfit; windproof jacket essential.' } },
      { title: { zh: '鞋子選擇', en: 'Footwear Advice' }, body: { zh: '今天有一整天都在戶外步行（堺町通很長），請穿著避震效果最好的休閒鞋或運動鞋。', en: 'Full day of outdoor walking on cobblestones (Sakaimachi-dori is long). Wear your most cushioned sneakers.' } },
      { title: { zh: '名店攔截', en: 'Key Purchase Tip' }, body: { zh: '記得在六花亭小樽運河店把「萊姆葡萄夾心餅」買齊，減輕 Day 4 的購物壓力。', en: 'Stock up on Rokkatei\'s Marusei Butter Sandwich at the Otaru Canal branch to lighten the Day 4 shopping load.' } },
    ],
  },
  // Day 3
  {
    day: 3, date: { zh: '5/16（六）', en: '5/16 Sat' },
    title: { zh: '白色戀人 & 藻岩山夜景', en: 'Shiroi Koibito & Mt. Moiwa Night View' },
    steps: 13000, phase: 0, weatherCity: 'Sapporo',
    items: [
      { time: '07:00', place: { zh: '🍳 索拉瑞亞西鐵酒店（早餐 + 整理行李）', en: '🍳 Solaria Breakfast + Hotel Transfer Prep' }, duration: '150min', note: { zh: '退房前行李轉至京王 Prelia；大件先寄前台', en: 'Transfer luggage to Keio Prelia before checkout' }, maps: null, warn: false },
      { time: '09:39', place: { zh: '札幌京王普雷利亞飯店 行李寄放', en: 'Keio Prelia Hotel — Drop Luggage' }, duration: '15min', note: { zh: 'Check-in 前先寄放；下午正式辦入住', en: 'Pre-check-in luggage storage; formal check-in later' }, maps: 'https://maps.google.com/?q=Keio+Prelia+Hotel+Sapporo', coord: [43.0609, 141.3563], warn: false },
      { time: '10:33', place: { zh: '⭐ 白色戀人公園（工廠參觀 + 舒芙蕾鬆餅）', en: '⭐ Shiroi Koibito Park (Factory Tour + Souffle Pancake)' }, duration: '180min', note: { zh: '⚡ 線上預購工廠參觀電子票（1,000円）；訂製磁鐵 1,500円起', en: '⚡ Pre-buy factory tour e-ticket 1,000 yen; custom magnet from 1,500 yen' }, maps: 'https://maps.google.com/?q=Shiroi+Koibito+Park+Sapporo', coord: [43.0882, 141.2983], img: 'images/itinerary/shiroi-koibito.jpg', warn: true },
      { time: '14:03', place: { zh: '圓山公園 → 神宮茶屋（判官燒）', en: 'Maruyama Park → Jingu Chaya (Hangan-yaki Mochi)' }, duration: '45min', note: { zh: '⚡ 先買「判官さま」現烤銅鑼燒（限量）300円', en: '⚡ Buy Hangan-sama grilled dorayaki first — sells out; 300 yen' }, maps: 'https://maps.google.com/?q=圓山公園+札幌', coord: [43.0534, 141.3211], warn: true },
      { time: '14:29', place: { zh: '六花亭 神宮茶屋店（神宮境內限定）', en: 'Rokkatei Jingu Chaya Branch (Shrine Exclusive)' }, duration: '15min', note: { zh: '北海道牛奶最中冰淇淋；神宮境內限定', en: 'Hokkaido milk monaka ice cream; shrine-exclusive branch' }, maps: 'https://maps.google.com/?q=六花亭+北海道神宮茶屋', coord: [43.0540, 141.3201], warn: false },
      { time: '14:47', place: { zh: '北海道神宮（參拜 + 御守）', en: 'Hokkaido Jingu Shrine (Visit + Omamori)' }, duration: '30min', note: { zh: '北海道最重要神社；買旅行御守', en: "Hokkaido's most important shrine; buy travel omamori" }, maps: 'https://maps.google.com/?q=Hokkaido+Jingu+Shrine', coord: [43.0534, 141.3211], warn: false },
      { time: '15:51', place: { zh: '🍜【午餐】蝦味拉麵 一幻 總本店', en: '🍜 Lunch: Ichigen Shrimp Ramen Main Store' }, duration: '60min', note: { zh: '招牌えびそば；蝦頭高湯；1,200–1,500円', en: 'Signature shrimp head broth ramen; 1,200-1,500 yen' }, maps: 'https://maps.google.com/?q=一幻+ラーメン+札幌+総本店', coord: [43.0576, 141.3528], warn: false },
      { time: '17:43', place: { zh: '⭐ 藻岩山展望台（日落至夜景）', en: '⭐ Mt. Moiwa Observatory (Sunset to Night View)' }, duration: '105min', note: { zh: '⚡ 纜車來回 2,100円；5 月日落約 18:30；山頂帶防風外套', en: '⚡ 2,100 yen RT ropeway; sunset ~18:30 in May; windproof jacket for summit' }, maps: 'https://maps.google.com/?q=Mt+Moiwa+Ropeway+Sapporo', coord: [43.0291, 141.3240], img: 'images/itinerary/moiwa.jpg', warn: true },
      { time: '20:19', place: { zh: '🥩【晚餐】牛しゃぶ 牛すき 禪', en: '🥩 Dinner: Zen Wagyu Shabu & Sukiyaki' }, duration: '90min', note: { zh: '⭐️ 黑毛和牛；⚡ 不吃生食，全熟；需提前預約', en: '⭐️ Kuroge wagyu; ⚡ fully cooked only; advance reservation required' }, maps: 'https://maps.google.com/?q=牛しゃぶ+牛すき+禪+札幌', coord: [43.0559, 141.3543], warn: true },
      { time: '22:10', place: { zh: '札幌京王普雷利亞飯店', en: 'Keio Prelia Hotel Sapporo' }, duration: '60min', note: null, maps: null, warn: false },
    ],
    mealBudget: { zh: '午餐 1,500円 + 晚餐 10,000–15,000円／人', en: 'Lunch 1,500 + dinner 10,000-15,000 yen/person' },
    shopping: { zh: '白色戀人工廠限定 + 訂製磁鐵；神宮御守；六花亭神宮茶屋限定', en: 'Shiroi Koibito factory box + custom magnet; Hokkaido Jingu omamori' },
    stepsRange: { zh: '約 14,000–16,000 步', en: 'approx. 14,000–16,000 steps' },
    stepsLevel: 'high',
    tips: [
      { title: { zh: '行李轉移', en: 'Luggage Transfer' }, body: { zh: '早上要換飯店到「京王普雷利亞」，出門前確認東西都有收好。', en: 'Moving to Keio Prelia Hotel today — double-check everything is packed before leaving.' } },
      { title: { zh: '體力保留', en: 'Pace Yourself' }, body: { zh: '下午的圓山公園與北海道神宮腹地極大，走累了就在「神宮茶屋」坐下來吃個福餅休息。', en: 'Maruyama Park and Hokkaido Jingu are vast. Rest at Jingu Chaya with a snack when your legs get tired.' } },
      { title: { zh: '夜景禦寒魔王關', en: 'Summit Cold Warning' }, body: { zh: '晚上搭纜車上「藻岩山」，山頂風極大、極冷（體感約 5°C）。請穿上最厚的外套，並戴上薄圍巾或帽子防風，以免吹到頭痛。', en: 'Mt. Moiwa summit at night — extremely windy and cold (~5°C feels-like). Wear your thickest coat + scarf or hat to avoid windchill headaches.' } },
    ],
  },
  // Day 4
  {
    day: 4, date: { zh: '5/17（日）', en: '5/17 Sun' },
    title: { zh: '歷史巡禮與系統採購', en: 'Historic Tour & Systematic Shopping' },
    steps: 12000, phase: 0, weatherCity: 'Sapporo',
    items: [
      { time: '07:00', place: { zh: '🍞【早餐】超商解決（路上採買）', en: '🍞 Breakfast: Convenience Store (On the Go)' }, duration: '30min', note: { zh: '今日行程長；超商早餐快速補給；飯店早餐已安排隔天退房前現場預訂', en: 'Long day ahead; grab convenience store breakfast; hotel buffet reserved for tomorrow before checkout' }, maps: null, warn: false },
      { time: '08:57', place: { zh: '豐平館（明治洋樓）', en: 'Hoheikan (Meiji-era Western Hall)' }, duration: '15min', note: { zh: '明治 13 年建造；300円；藍色洋館值得拍照', en: 'Built 1880; 300 yen; beautiful blue Western-style exterior' }, maps: 'https://maps.google.com/?q=豊平館+札幌', coord: [43.0467, 141.3525], warn: false },
      { time: '09:17', place: { zh: '中島公園（湖畔散步）', en: 'Nakajima Park (Lakeside Stroll)' }, duration: '15min', note: { zh: '免費；湖畔空氣清新', en: 'Free; fresh lakeside air' }, maps: 'https://maps.google.com/?q=Nakajima+Park+Sapporo', coord: [43.0442, 141.3539], warn: false },
      { time: '09:52', place: { zh: 'KINOTOYA Daimaru Sapporo（現烤起司塔）', en: 'KINOTOYA Daimaru Sapporo (Fresh Cheese Tart)' }, duration: '15min', note: { zh: '現烤起司塔 250円；外帶行動糧', en: 'Fresh-baked cheese tart 250 yen; great on-the-go' }, maps: 'https://maps.google.com/?q=KINOTOYA+大丸札幌', coord: [43.0681, 141.3505], warn: false },
      { time: '10:10', place: { zh: '大丸札幌店（地下伴手禮戰場）', en: 'Daimaru Sapporo (B1 Souvenir Central)' }, duration: '60min', note: { zh: '六花亭、北菓樓、柳月等一次齊全', en: 'Rokkatei, Kitakaro, Yanagitsuji all here' }, maps: 'https://maps.google.com/?q=Daimaru+Sapporo', coord: [43.0681, 141.3505], warn: false },
      { time: '11:18', place: { zh: '🍛【午餐】スープカレーGARAKU sitatte sapporo店', en: '🍛 Lunch: GARAKU Soup Curry (Sitatte Sapporo)' }, duration: '90min', note: { zh: '札幌神級湯咖哩；海老ベース 1,500–2,200円；辣度 0–40', en: 'Sapporo legend; shrimp broth curry 1,500-2,200 yen; spice 0-40' }, maps: 'https://maps.google.com/?q=GARAKU+sitatte+sapporo', coord: [43.0604, 141.3555], img: 'images/itinerary/garaku.jpg', warn: false },
      { time: '12:53', place: { zh: '札幌市鐘樓（時計台）', en: 'Sapporo Clock Tower (Tokeidai)' }, duration: '15min', note: { zh: '外觀拍照免費；內部 200円', en: 'Free to photograph; 200 yen inside' }, maps: 'https://maps.google.com/?q=Sapporo+Clock+Tower', coord: [43.0638, 141.3538], warn: false },
      { time: '13:14', place: { zh: '大通公園', en: 'Odori Park' }, duration: '15min', note: { zh: '中央草地景觀；電視塔展望台 700円（選做）', en: 'Central park greenery; TV Tower observatory 700 yen (optional)' }, maps: 'https://maps.google.com/?q=Odori+Park+Sapporo', coord: [43.0613, 141.3538], warn: false },
      { time: '13:32', place: { zh: '札幌電視塔', en: 'Sapporo TV Tower' }, duration: '15min', note: { zh: '展望台 700円；視天氣決定是否上頂', en: 'Observatory 700 yen; decide based on weather' }, maps: 'https://maps.google.com/?q=Sapporo+TV+Tower', coord: [43.0613, 141.3576], warn: false },
      { time: '14:22', place: { zh: '札幌千秋庵 東急店', en: 'Senshuya Tokyu Branch' }, duration: '15min', note: { zh: 'バリ銅鑼補貨；東急百貨内', en: 'Restock Bali Dorayaki; inside Tokyu dept store' }, maps: 'https://maps.google.com/?q=千秋庵+東急札幌店', coord: [43.0651, 141.3500], warn: false },
      { time: '14:40', place: { zh: 'UNIQLO 東急百貨札幌店（服飾採購）', en: 'UNIQLO Tokyu Sapporo (Apparel Shopping)' }, duration: '240min', note: { zh: '⚡ Air Tech 機能褲、UV 外套；退稅 5,000円以上', en: '⚡ Air Tech pants, UV jacket; tax-free over 5,000 yen' }, maps: 'https://maps.google.com/?q=UNIQLO+東急札幌店', coord: [43.0651, 141.3500], warn: false },
      { time: '18:40', place: { zh: '東急百貨札幌店（地下美食 + 精品伴手禮）', en: 'Tokyu Dept Store Sapporo (B1 Gourmet + Gifts)' }, duration: '60min', note: { zh: '最後一輪精品伴手禮採買', en: 'Final round of premium souvenirs' }, maps: 'https://maps.google.com/?q=東急百貨店+札幌', coord: [43.0651, 141.3500], warn: false },
      { time: '20:00', place: { zh: '🦀【晚餐】Kani Honke 札幌站前總店', en: '🦀 Dinner: Kani Honke Sapporo Station Main Branch' }, duration: '90min', note: { zh: '⭐️ 建議包廂；全熟螃蟹套餐 8,000–15,000円；需提前預約', en: '⭐️ Request private room; fully cooked crab course 8,000-15,000 yen; reserve ahead' }, maps: 'https://maps.google.com/?q=札幌かに本家+站前総店', coord: [43.0576, 141.3556], warn: true },
      { time: '21:32', place: { zh: '札幌京王普雷利亞飯店（行李封箱 + 宅急便準備）', en: 'Keio Prelia Hotel (Pack & Seal Bags for Yamato)' }, duration: '60min', note: { zh: '⚡ 22:00 前封箱；5/18 宅急便大件寄新千歲（5/22 取）', en: '⚡ Seal by 22:00; Yamato forward to New Chitose on 5/18 (pick up 5/22)' }, maps: null, warn: true },
    ],
    mealBudget: { zh: '午餐 2,000円 + 晚餐 10,000–15,000円／人', en: 'Lunch 2,000 + dinner 10,000-15,000 yen/person' },
    shopping: { zh: 'UNIQLO；大丸 B1（六花亭 / 北菓樓 / 柳月）；千秋庵銅鑼燒', en: 'UNIQLO; Daimaru B1 (Rokkatei / Kitakaro / Yanagitsuji); Senshuya dorayaki' },
    stepsRange: { zh: '約 12,000–14,000 步', en: 'approx. 12,000–14,000 steps' },
    stepsLevel: 'medium',
    tips: [
      { title: { zh: '百貨結界', en: 'Department Store Hours' }, body: { zh: '日本百貨公司（如大丸）都是 10:00 才開門，早上去中島公園散步抓好時間，不用太早去車站等。', en: 'Daimaru opens at 10:00 — use the time before for Nakajima Park. No need to wait at the station early.' } },
      { title: { zh: '湯咖哩戰術', en: 'GARAKU Queue Strategy' }, body: { zh: 'GARAKU 非常熱門，建議 11:00–11:30 之間就先去抽整理券，再去逛一下附近的街，時間到再回來吃。', en: 'GARAKU is very popular. Get a numbered ticket at 11:00–11:30, explore nearby, then return when called.' } },
      { title: { zh: '終極物流任務', en: 'Luggage Packing Mission' }, body: { zh: '晚上回飯店後，請將不帶去道南的戰利品與衣物裝入大行李箱，準備明天一早寄去機場。', en: 'After returning to hotel tonight, pack all non-essential items into the large suitcase for tomorrow\'s Yamato forwarding.' } },
    ],
  },
  // Day 5
  {
    day: 5, date: { zh: '5/18（一）', en: '5/18 Mon' },
    title: { zh: '輕裝南下 → 函館', en: 'Light Pack South — Hakodate' },
    steps: 8000, phase: 1, weatherCity: 'Hakodate',
    items: [
      { time: '07:00', place: { zh: '🍳 京王 Prelia 早餐 + 退房', en: '🍳 Keio Prelia Breakfast + Check-out' }, duration: '150min', note: { zh: '⚡ 09:00 前於飯店櫃台辦理宅急便寄件（詳見交通 > 宅急便指南）；預留 15-20 分鐘填單', en: '⚡ Yamato forwarding by 09:00 at hotel front desk (see Transport > Yamato Guide); allow 15-20 min' }, maps: null, warn: true },
      { time: '09:35', place: { zh: '大丸札幌 → shiro → 3COINS (APIA)', en: 'Daimaru Sapporo → shiro → 3COINS (APIA)' }, duration: '115min', note: { zh: '最後掃貨；⚡ Plan A 須 12:00 前完成採買，Plan B 可至 12:45', en: 'Final shopping; ⚡ Plan A must finish by noon; Plan B can go until 12:45' }, maps: 'https://maps.google.com/?q=Daimaru+Sapporo', coord: [43.0681, 141.3505], warn: false },
      { time: '12:08', place: { zh: '🍛【Plan A 午餐】奧芝商店 站前創成寺（湯咖哩）', en: '🍛 Plan A Lunch: Okushiba Sosei-ji (Shrimp Soup Curry)' }, duration: '60min', note: { zh: '海老スープカレー 1,500–2,500円；辣度 1–30；⚡ 吃完後直奔 13:26 月台', en: 'Shrimp soup curry ¥1,500-2,500; spice 1-30; ⚡ head straight to platform after' }, maps: 'https://maps.google.com/?q=奥芝商店+創成寺', coord: [43.0661, 141.3512], warn: false, plan: 'A' },
      { time: '13:00', place: { zh: '🐷【Plan B 午餐】十勝豚丼 いっぴん 外帶便當', en: '🐷 Plan B Lunch: Tokachi Butadon Ippin (Takeaway Bento)' }, duration: '10min', note: { zh: '帶廣名物豚丼外帶；帶上北斗號車廂享用', en: 'Obihiro pork bento takeaway; eat aboard Hokuto Express' }, maps: 'https://maps.google.com/?q=十勝豚丼いっぴん+札幌', coord: [43.0682, 141.3503], warn: false, plan: 'B' },
      { time: '13:26', place: { zh: '⚡ 札幌站 → 函館站【JR 特急北斗號 D 席海景】', en: '⚡ Sapporo → Hakodate — JR Ltd. Exp. Hokuto (D-seat sea view)' }, duration: '227min', note: { zh: '⚡ 全車指定席（Day 1 已劃）；D 席右側 = 內浦灣全景；⚠️ 錯過此班下班次需等很久！', en: '⚡ All reserved (booked Day 1); D-seat right = Uchiura Bay panorama; ⚠️ Missing = very long wait for next!' }, maps: null, warn: true },
      { time: '17:20', place: { zh: '🍔 幸運小丑漢堡 函館站前店', en: '🍔 Lucky Pierrot Hakodate Station Branch' }, duration: '15min', note: { zh: '函館限定連鎖；中華雞腿堡 580円；嚐鮮一個即可', en: 'Hakodate-only chain; Chinese chicken burger ¥580; share one' }, maps: 'https://maps.google.com/?q=Lucky+Pierrot+函館駅前', coord: [41.7741, 140.7275], img: 'images/itinerary/lucky-pierrot.jpg', warn: false },
      { time: '17:40', place: { zh: '函館世紀濱海酒店 Check-in', en: 'Century Marina Hakodate Check-in' }, duration: '30min', note: { zh: '指定高層靠海側；換保暖外套', en: 'Request high-floor sea-facing room; change to warm layers' }, maps: 'https://maps.google.com/?q=Century+Marina+Hakodate', coord: [41.7739, 140.7264], warn: false },
      { time: '18:30', place: { zh: '【Plan A】Seria（百元雜貨）', en: 'Plan A: Seria (100-yen Store)' }, duration: '60min', note: { zh: 'Plan A 路線：逛 Seria 購物後接鹽拉麵晚餐', en: 'Plan A route: Seria shopping then salt ramen' }, maps: 'https://maps.google.com/?q=Seria+函館', coord: [41.7739, 140.7600], warn: false, plan: 'A' },
      { time: '20:01', place: { zh: '🍜【Plan A 晚餐】鹽拉麵 あじさい 紅店', en: '🍜 Plan A Dinner: Ajisai Salt Ramen (Beni-ten)' }, duration: '60min', note: { zh: '函館鹽拉麵名店；清透金色湯頭；800–1,200円', en: "Hakodate's famous salt ramen; crystal golden broth; ¥800-1,200" }, maps: 'https://maps.google.com/?q=あじさい+函館+塩ラーメン', coord: [41.7752, 140.7269], warn: false, plan: 'A' },
      { time: '18:45', place: { zh: '🍛【Plan B 晚餐】奧芝商店 函館本店（蝦味湯咖哩）', en: '🍛 Plan B Dinner: Okushiba Hakodate (Shrimp Soup Curry)' }, duration: '90min', note: { zh: '海老スープカレー 1,500–2,500円；辣度 1–30', en: 'Shrimp soup curry ¥1,500-2,500; spice level 1-30' }, maps: 'https://maps.google.com/?q=奥芝商店+函館本店', coord: [41.7686, 140.7158], warn: false, plan: 'B' },
      { time: '21:11', place: { zh: '函館世紀濱海酒店', en: 'Century Marina Hakodate' }, duration: '60min', note: null, maps: null, warn: false },
    ],
    mealBudget: { zh: 'Plan A：奧芝 2,000円 + 鹽拉麵 1,000円／Plan B：豚丼便當 900円 + 奧芝 2,000円', en: 'Plan A: Okushiba ¥2,000 + Ramen ¥1,000 / Plan B: Bento ¥900 + Okushiba ¥2,000' },
    shopping: { zh: '大丸 B1；shiro 美妝；3COINS 旅途小物', en: 'Daimaru B1; shiro cosmetics; 3COINS travel accessories' },
    stepsRange: { zh: '約 6,000–8,000 步', en: 'approx. 6,000–8,000 steps' },
    stepsLevel: 'easy',
    tips: [
      { title: { zh: '宅急便截止', en: 'Yamato Deadline' }, body: { zh: '早上 09:00 前，務必在京王飯店櫃檯辦好「機場宅急便」。記得拿好粉紅色收據！', en: 'Yamato airport forwarding must be done at hotel front desk by 09:00. Keep the pink receipt!' } },
      { title: { zh: '最美鐵道便當', en: 'Train Bento Tip' }, body: { zh: '（Plan B）中午去買「十勝豚丼 いっぴん」外帶，帶上 13:26 的北斗號，一邊吃一邊欣賞海景。', en: '(Plan B) Buy Tokachi Butadon bento for the 13:26 Hokuto — eat on board while enjoying sea views.' } },
      { title: { zh: '海景座位', en: 'Scenic Seat Reminder' }, body: { zh: '上車後尋找您的 D席（右側座位），準備好相機，一邊吃豚丼一邊欣賞內浦灣絕美海景。', en: 'Find your D-seat (right side). Camera ready for Uchiura Bay panorama.' } },
    ],
  },
  // Day 6
  {
    day: 6, date: { zh: '5/19（二）', en: '5/19 Tue' },
    title: { zh: '函館歷史與在地探索', en: 'Hakodate History & Local Discovery' },
    steps: 13000, phase: 1, weatherCity: 'Hakodate',
    items: [
      { time: '08:00', place: { zh: '🍳 函館世紀濱海酒店（飯店早餐）', en: '🍳 Century Marina Hakodate (Hotel Breakfast)' }, duration: '120min', note: { zh: '★4.5+ 評比海鮮早餐；含於住宿', en: '★4.5+ rated seafood breakfast; included in stay' }, maps: null, warn: false },
      { time: '09:35', place: { zh: '函館朝市（現烤扇貝 + 毛蟹腳）', en: 'Hakodate Morning Market (Grilled Scallops + Crab Legs)' }, duration: '45min', note: { zh: '⚡ 奶油烤扇貝 + 毛蟹腳各 300–500円；避開生食區', en: '⚡ Butter scallops + hairy crab legs 300-500 yen each; skip raw seafood' }, maps: 'https://maps.google.com/?q=Hakodate+Morning+Market', coord: [41.7755, 140.7274], warn: true },
      { time: '10:24', place: { zh: '⭐ 八幡坂（函館港透視景）', en: '⭐ Hachiman-zaka (Hakodate Port Vista)' }, duration: '15min', note: { zh: '⚡ 注意車流；坡頂港口透視最美；元町洋館群起點', en: '⚡ Watch traffic; best port perspective from top; start of Motomachi stroll' }, maps: 'https://maps.google.com/?q=Hachiman-zaka+Hakodate', coord: [41.7672, 140.7144], img: 'images/itinerary/hachimanzaka.jpg', warn: true },
      { time: '10:47', place: { zh: '金森紅磚倉庫（明治大正建築群）', en: 'Kanemori Red Brick Warehouse (Meiji-Taisho Architecture)' }, duration: '90min', note: { zh: '免費；內有特色小店 + 咖啡；沿港岸步行', en: 'Free entry; unique shops + cafes inside; scenic harbour walk' }, maps: 'https://maps.google.com/?q=金森赤レンガ倉庫+函館', coord: [41.7682, 140.7183], warn: false },
      { time: '12:36', place: { zh: '🦔【午餐】Uni Murakami 函館本店（全熟海膽）', en: '🦔 Lunch: Uni Murakami Hakodate (Cooked Uni)' }, duration: '90min', note: { zh: '⚡ 全熟：焗烤ウニ / 炙り烤ウニ（避開生ウニ）；套餐 3,000–6,000円', en: '⚡ Fully cooked: uni gratin / grilled uni (skip raw); set 3,000-6,000 yen' }, maps: 'https://maps.google.com/?q=村上海膽+函館本店', coord: [41.7730, 140.7260], warn: true },
      { time: '14:41', place: { zh: '⭐ 五稜郭展望塔 / 公園', en: '⭐ Goryokaku Tower & Park' }, duration: '90min', note: { zh: '⚡ 塔頂展望台 900円（★必上）；五芒星要塞俯瞰', en: '⚡ Tower observatory 900 yen (must do); star fort aerial view' }, maps: 'https://maps.google.com/?q=Goryokaku+Tower+Hakodate', coord: [41.7961, 140.7578], img: 'images/itinerary/goryokaku.jpg', warn: true },
      { time: '16:31', place: { zh: 'Seria（百円雜貨）', en: 'Seria (100-yen Variety Store)' }, duration: '60min', note: { zh: '日本百元店品質最高；生活雜貨、旅遊文具', en: "Japan's highest-quality 100-yen store; lifestyle goods & stationery" }, maps: 'https://maps.google.com/?q=Seria+函館', coord: [41.7739, 140.7600], warn: false },
      { time: '18:15', place: { zh: '⭐ 函館山觀景台（百萬夜景）', en: '⭐ Mt. Hakodate Observatory (Million Dollar Night View)' }, duration: '105min', note: { zh: '⚡ 出發前查官網風力（15m/s 停駛）；纜車來回 1,500円；山頂比市區冷 5–8°C', en: '⚡ Check wind speed first (halts at 15m/s); ropeway RT 1,500 yen; summit 5-8°C colder' }, maps: 'https://maps.google.com/?q=函館山ロープウェイ', coord: [41.7611, 140.7028], img: 'images/itinerary/hakodate-mt.jpg', warn: true },
      { time: '20:01', place: { zh: '🍷【Plan A 晚餐】大門橫丁（屋台村）', en: '🍷 Plan A Dinner: Daimon Yokocho (Food Stall Village)' }, duration: '90min', note: { zh: '26 間屋台；燒鳥 / 海鮮 / 在地小酌；每攤 500–1,500円', en: '26 food stalls; yakitori / seafood / local drinks; 500-1,500 yen per stall' }, maps: 'https://maps.google.com/?q=函館大門横丁', coord: [41.7745, 140.7265], warn: false, plan: 'A' },
      { time: '20:01', place: { zh: '🍜【Plan B 晚餐】鹽拉麵 あじさい 紅店', en: '🍜 Plan B Dinner: Ajisai Salt Ramen (Beni-ten)' }, duration: '60min', note: { zh: '函館鹽拉麵名店；清透金色湯頭；800–1,200円', en: "Hakodate's famous salt ramen; crystal golden broth; ¥800-1,200" }, maps: 'https://maps.google.com/?q=あじさい+函館+塩ラーメン', coord: [41.7752, 140.7269], warn: false, plan: 'B' },
      { time: '21:30', place: { zh: '函館世紀濱海酒店', en: 'Century Marina Hakodate' }, duration: '60min', note: null, maps: null, warn: false },
    ],
    mealBudget: { zh: '朝市 500–800円 + 午餐 4,000–6,000円 + Plan A 晚餐 大門橫丁 1,500円 / Plan B 晚餐 あじさい 1,000円', en: 'Market 500-800 + lunch 4,000-6,000 + Plan A dinner Daimon ¥1,500 / Plan B Ajisai ¥1,000' },
    shopping: { zh: "SNAFFLE'S 起司歐姆蕾蛋糕（需冷藏）；Seria 百元雜貨（16:31）", en: "SNAFFLE'S Cheese Omelette Catchcakes (refrigerate); Seria 100-yen goods (16:31)" },
    stepsRange: { zh: '約 15,000–18,000 步', en: 'approx. 15,000–18,000 steps' },
    stepsLevel: 'extreme',
    tips: [
      { title: { zh: '腳力大考驗', en: 'Stamina Warning' }, body: { zh: '五稜郭公園非常大，下午去元町區的「八幡坂」又是一條長上坡，今天是整趟旅程最操勞的一天，請適時找咖啡廳坐下休息。', en: 'Goryokaku is huge; Hachiman-zaka is a long uphill. This is the most physically demanding day — rest at a café when needed.' } },
      { title: { zh: '百萬夜景第二戰', en: 'Summit Cold Warning' }, body: { zh: '傍晚上函館山觀景台，請複製 Day 3 的禦寒裝備。出發前確認官網風速未達 15m/s（停駛標準）。', en: 'Head to Mt. Hakodate observatory in the evening. Same cold-weather gear as Day 3. Check official wind speed before heading up (halts at 15m/s).' } },
      { title: { zh: '舒緩雙腿', en: 'Foot Recovery' }, body: { zh: '晚上回飯店強烈建議泡個熱水澡，或貼上休足時間。', en: 'Hot bath or foot relief patches strongly recommended after returning to hotel tonight.' } },
    ],
  },
  // Day 7
  {
    day: 7, date: { zh: '5/20（三）', en: '5/20 Wed' },
    title: { zh: '函館朝市 → 洞爺湖', en: 'Morning Market — Lake Toya' },
    steps: 6000, phase: 2, weatherCity: 'Toyako',
    items: [
      { time: '08:00', place: { zh: '🍳 函館世紀濱海酒店（最後早餐）', en: '🍳 Century Marina (Final Breakfast)' }, duration: '60min', note: null, maps: null, warn: false },
      { time: '09:05', place: { zh: '函館朝市（奶油烤扇貝 + 烤蟹腳）', en: 'Hakodate Morning Market (Scallops + Crab Legs)' }, duration: '60min', note: { zh: '再訪：奶油扇貝 + 毛蟹腳告別函館', en: 'Return visit: butter scallops + crab legs; farewell to Hakodate' }, maps: 'https://maps.google.com/?q=Hakodate+Morning+Market', coord: [41.7755, 140.7274], warn: false },
      { time: '10:10', place: { zh: '函館世紀濱海酒店 退房', en: 'Century Marina Hakodate Check-out' }, duration: '30min', note: { zh: '車站置物柜 400–800円（如需）', en: 'Station locker 400-800 yen if needed' }, maps: 'https://maps.google.com/?q=Hakodate+Station', coord: [41.7739, 140.7265], warn: false },
      { time: '10:45', place: { zh: '⚡ 函館站 → 洞爺站【JR 特急北斗號】', en: '⚡ Hakodate → Toya Station — JR Ltd. Exp. Hokuto' }, duration: '114min', note: { zh: '⚡ 全車指定席（Day 1 已劃）；12:39 抵洞爺；⚠️ 誤點下班次等很久！', en: '⚡ All reserved (booked Day 1); arrives Toya 12:39; ⚠️ Missing = very long wait!' }, maps: null, warn: true },
      { time: '12:48', place: { zh: '⚡ 洞爺站前 → 乃之風【道南バス 洞爺湖線】', en: '⚡ Toya Station → Nonokaze — Donan Bus (Toya Lake Line)' }, duration: '18min', note: { zh: '⚡ 12:48 發車（備案 13:10）；抽整理券投現金或 IC 卡；⚠️ JR 周遊券不含此段！', en: '⚡ Departs 12:48 (backup: 13:10); numbered ticket + cash or IC card; ⚠️ JR Pass NOT valid here!' }, maps: null, warn: true },
      { time: '13:11', place: { zh: '湖景飯店 洞爺乃之風 Check-in', en: 'Lake View Toya Nonokaze Check-in' }, duration: '30min', note: { zh: '指定湖景側；進入留白模式', en: 'Request lake-view room; full rest mode begins' }, maps: 'https://maps.google.com/?q=Lake+View+Toya+Nonokaze+Resort', coord: [42.5978, 140.7872], img: 'images/itinerary/toya-nonokaze.jpg', warn: false },
      { time: '13:31', place: { zh: '🍵【午餐】岡田屋（白汁粉）', en: '🍵 Lunch: Okadaya (White Sweet Soup)' }, duration: '30min', note: { zh: '白玉白汁粉 600–900円；溫泉街名物', en: 'White mochi sweet soup 600-900 yen; onsen street specialty' }, maps: 'https://maps.google.com/?q=岡田屋+洞爺湖', coord: [42.6022, 140.7897], warn: false },
      { time: '14:14', place: { zh: '筒倉展望台 Silo（洞爺湖全景 + 布丁）', en: 'Toya Silo Observatory (Lake Panorama + Pudding)' }, duration: '40min', note: { zh: '⚡ 計程車前往；招牌布丁；360° 俯瞰洞爺湖', en: '⚡ Take taxi; buy signature pudding; 360° lake panorama' }, maps: 'https://maps.google.com/?q=サイロ展望台+洞爺湖', coord: [42.6017, 140.8017], warn: false },
      { time: '14:58', place: { zh: '洞爺湖畔散步', en: 'Lake Toya Lakeside Stroll' }, duration: '60min', note: { zh: '湖畔自由散策；眺望中島；靜謐時光', en: 'Free lakeside stroll; view Nakanoshima island; peaceful downtime' }, maps: 'https://maps.google.com/?q=Lake+Toya', coord: [42.5951, 140.8027], warn: false },
      { time: '15:58', place: { zh: '湖景飯店 洞爺乃之風（溫泉 + 晚餐）', en: 'Lake View Toya Nonokaze (Onsen + Dinner)' }, duration: '60min', note: { zh: '露天溫泉；自助晚餐含住宿；20:45 湖上煙火', en: 'Outdoor rotenburo; buffet dinner included; 20:45 lake fireworks' }, maps: null, warn: false },
    ],
    mealBudget: { zh: '朝市 500円 + 岡田屋 700円；晚餐含住宿', en: 'Market 500 + Okadaya 700 yen; dinner included' },
    shopping: null,
    stepsRange: { zh: '約 6,000–8,000 步', en: 'approx. 6,000–8,000 steps' },
    stepsLevel: 'easy',
    tips: [
      { title: { zh: '巴士不能用周遊券', en: 'Donan Bus Not Covered' }, body: { zh: '中午抵達 JR 洞爺站後，轉乘的【道南巴士】不包含在 JR Pass 內。請準備好零錢（上車抽整理券）或 IC 卡。', en: 'After arriving at Toya Station, the Donan Bus to Nonokaze is NOT covered by JR Pass. Prepare cash coins or IC card.' } },
      { title: { zh: '湖畔煙火禦寒', en: 'Fireworks Warmth Tip' }, body: { zh: '晚上在乃之風飯店外看洞爺湖煙火時，湖邊風大，記得穿件輕羽絨外套再出去。', en: 'Lake wind can be strong during the 20:45 fireworks. Bring a light down jacket before stepping outside.' } },
    ],
  },
  // Day 8
  {
    day: 8, date: { zh: '5/21（四）', en: '5/21 Thu' },
    title: { zh: '登別地獄谷遠征', en: 'Noboribetsu Hell Valley Expedition' },
    steps: 9000, phase: 2, weatherCity: 'Toyako',
    items: [
      { time: '08:00', place: { zh: '🍳 乃之風自助餐（飯店早餐）', en: '🍳 Nonokaze Buffet (Hotel Breakfast)' }, duration: '120min', note: { zh: '湖景早餐從容享用；今日登別來回', en: 'Leisurely lakeside breakfast before Noboribetsu day trip' }, maps: null, warn: false },
      { time: '09:50', place: { zh: '⚡ 乃之風出發【道南バス → 轉 JR 北斗號 → 登別站】', en: '⚡ Depart Nonokaze — Donan Bus → Transfer to JR Hokuto → Noboribetsu' }, duration: '98min', note: { zh: '⚡ 09:50 飯店前道南バス；洞爺站轉乘 JR 北斗；11:28 抵登別；⚠️ 提前在大廳等候勿遲', en: '⚡ 09:50 Donan Bus from hotel; transfer JR Hokuto at Toya Station; arrive Noboribetsu 11:28; ⚠️ Be in lobby early!' }, maps: null, warn: true },
      { time: '11:28', place: { zh: '登別站（行李寄置物柜 + 準備搭巴士）', en: 'Noboribetsu Station (Lockers + Prepare for Bus)' }, duration: '15min', note: { zh: '置物柜 300–400円；11:45 搭道南バス至地獄谷', en: 'Lockers 300-400 yen; catch 11:45 Donan Bus to Jigokudani' }, maps: 'https://maps.google.com/?q=Noboribetsu+Station', coord: [42.4027, 141.1004], warn: false },
      { time: '11:45', place: { zh: '⚡ 登別站 → 地獄谷【道南バス】', en: '⚡ Noboribetsu Station → Jigokudani — Donan Bus' }, duration: '16min', note: { zh: '⚡ 11:45 班次（備案：12:25，差 40 分鐘）；抽整理券投現金；⚠️ JR 周遊券不含此段！', en: '⚡ 11:45 bus (backup: 12:25 — 40 min gap); numbered ticket + cash; ⚠️ JR Pass NOT valid here!' }, maps: null, warn: true },
      { time: '12:01', place: { zh: '溫泉市場（登別溫泉街入口）', en: 'Onsen Market (Noboribetsu Onsen Town Entrance)' }, duration: '60min', note: { zh: '溫泉饅頭 100–200円；烤玉米 300–400円；鬼形紀念品', en: 'Onsen manju 100-200 yen; grilled corn 300-400 yen; demon souvenirs' }, maps: 'https://maps.google.com/?q=登別温泉+市場', coord: [42.4454, 141.1069], warn: false },
      { time: '13:02', place: { zh: '閻魔堂（整點地獄劇場）', en: 'Emma-do Hall (Hourly Hell Theater)' }, duration: '5min', note: { zh: '免費；整點大鬼閻魔王機關表演', en: 'Free; mechanical demon king performance every hour' }, maps: 'https://maps.google.com/?q=閻魔堂+登別', coord: [42.4527, 141.1090], warn: false },
      { time: '13:04', place: { zh: '泉源公園（地獄噴泉每 3 分鐘噴發）', en: 'Sengen Park (Hell Geyser Every 3 Min)' }, duration: '30min', note: { zh: '免費；硫磺噴泉每 3 分噴發', en: 'Free; sulfur geyser erupts every 3 min' }, maps: 'https://maps.google.com/?q=泉源公園+登別', coord: [42.4520, 141.1083], warn: false },
      { time: '13:43', place: { zh: '⭐ 地獄谷（硫磺地形步道）', en: '⭐ Jigokudani Hell Valley (Sulfur Trail)' }, duration: '60min', note: { zh: '⚡ 免費；1km 步道；帶毛巾保護眼鏡', en: '⚡ Free; 1km trail; bring towel to protect eyeglasses from sulfur' }, maps: 'https://maps.google.com/?q=Noboribetsu+Jigokudani', coord: [42.4519, 141.1093], img: 'images/itinerary/noboribetsu.jpg', warn: true },
      { time: '15:01', place: { zh: '⭐ 登別大湯沼川天然足湯', en: '⭐ Oyunuma River Natural Footbath' }, duration: '60min', note: { zh: '⚡ 免費；帶毛巾；40°C 天然溫泉河；赤腳踩入', en: '⚡ Free; bring towel; natural 40°C hot spring river; wade barefoot' }, maps: 'https://maps.google.com/?q=大湯沼川天然足湯+登別', coord: [42.4491, 141.1069], warn: true },
      { time: '16:13', place: { zh: '⚡ 地獄谷 → 登別站【道南バス】', en: '⚡ Jigokudani → Noboribetsu Station — Donan Bus' }, duration: '27min', note: { zh: '⚡ 16:13 班次；抽整理券投現金；取出置物柜行李後立即前往月台', en: '⚡ 16:13 bus; cash required; collect station locker before heading to JR platform' }, maps: 'https://maps.google.com/?q=Noboribetsu+Station', coord: [42.4027, 141.1004], warn: true },
      { time: '16:58', place: { zh: '⚡ 登別站 → 洞爺站【JR 特急北斗號】', en: '⚡ Noboribetsu → Toya Station — JR Ltd. Exp. Hokuto' }, duration: '39min', note: { zh: '⚡ 16:58 發車（指定席已劃）；17:37 抵洞爺；⚠️ 錯過下班次等很久！', en: '⚡ Departs 16:58 (reserved); arrives Toya 17:37; ⚠️ Missing = very long wait!' }, maps: null, warn: true },
      { time: '17:48', place: { zh: '⚡ 洞爺站前 → 乃之風【道南バス】', en: '⚡ Toya Station → Nonokaze — Donan Bus' }, duration: '28min', note: { zh: '⚡ 17:48 道南バス；18:16 乃之風；或計程車 ~5 分 / 1,000円（急時備用）', en: '⚡ 17:48 Donan Bus; arrives 18:16; or taxi ~5 min / ¥1,000 (emergency backup)' }, maps: null, warn: true },
      { time: '18:16', place: { zh: '湖景飯店 洞爺乃之風（溫泉 + 最後晚餐）', en: 'Lake View Toya Nonokaze (Onsen + Final Dinner)' }, duration: '60min', note: { zh: '溫泉降載；晚餐含住宿；20:45 最後一場煙火', en: 'Onsen recovery; buffet dinner included; 20:45 final fireworks' }, maps: null, warn: false },
    ],
    mealBudget: { zh: '早 + 晚含住宿；登別小食 600円；JR 來回 ~2,000円', en: 'Breakfast & dinner included; snacks 600 yen; JR RT approx 2,000 yen' },
    shopping: { zh: '登別溫泉饅頭；鬼形紀念品', en: 'Noboribetsu onsen manju; demon-themed souvenirs' },
    stepsRange: { zh: '約 10,000–12,000 步', en: 'approx. 10,000–12,000 steps' },
    stepsLevel: 'medium',
    tips: [
      { title: { zh: '交通轉乘確認', en: 'Transit Connections' }, body: { zh: '今天會頻繁在「公車 → JR → 公車」間切換，下 JR 登別站後轉搭公車去地獄谷（一樣要自費）。全部班次都已標示在行程中，請留意 warn 紅框提示。', en: 'Today involves frequent Bus → JR → Bus transfers. After arriving at Noboribetsu Station, the bus to Jigokudani is cash-only. All connections are marked in the itinerary — watch for red warning markers.' } },
      { title: { zh: '洋蔥穿搭發揮', en: 'Layer Up' }, body: { zh: '從地獄谷走到大湯沼天然足湯有一段上坡的木棧道，走一走會流汗，但停下來吹風會冷。建議穿薄長袖搭配好穿脫的外套。', en: 'The wooden trail from Jigokudani to the natural footbath involves an uphill — you\'ll sweat, then get cold when you stop. Easy-on/off jacket recommended.' } },
      { title: { zh: '擦腳毛巾', en: 'Bring a Towel' }, body: { zh: '記得從飯店帶一條小毛巾在隨身包包裡，泡完天然足湯後可以擦腳。', en: 'Pack a small towel from the hotel — you\'ll need it to dry your feet after the natural footbath.' } },
    ],
  },
  // Day 9
  {
    day: 9, date: { zh: '5/22（五）', en: '5/22 Fri' },
    title: { zh: '賦歸', en: 'Homebound' },
    steps: 5000, phase: 2, weatherCity: 'Sapporo',
    items: [
      { time: '06:30', place: { zh: '🍳 乃之風自助餐（最後早餐）', en: '🍳 Nonokaze Buffet (Final Breakfast)' }, duration: '120min', note: { zh: '從容早餐；退房前最後泡湯', en: 'Leisurely final breakfast; last onsen soak before check-out' }, maps: null, warn: false },
      { time: '08:45', place: { zh: '⚡ 飯店叫計程車 → 洞爺站（車程約 15 分）', en: '⚡ Hotel Taxi → Toya Station (about 15 min)' }, duration: '15min', note: { zh: '⚡ 前台叫車；車資約 1,500円；09:34 JR 必搭！預留 15 分緩衝', en: '⚡ Ask front desk to call taxi; ~¥1,500; must catch 09:34 JR — allow 15 min buffer' }, maps: 'https://maps.google.com/?q=Toya+Station', coord: [42.6278, 140.8437], warn: true },
      { time: '09:34', place: { zh: '⚡ 洞爺站 → 新千歲機場【JR 北斗號 + 快速機場線】', en: '⚡ Toya → New Chitose Airport — JR Hokuto + Airport Rapid' }, duration: '92min', note: { zh: '⚡ 09:34 發；南千歲轉快速機場線；11:06 抵新千歲；合計 ~4,000–5,000円', en: '⚡ Departs 09:34; transfer at Minami-Chitose; arrives New Chitose 11:06; total ~¥4,000-5,000' }, maps: 'https://maps.google.com/?q=Toya+Station', coord: [42.6278, 140.8437], warn: true },
      { time: '11:06', place: { zh: '⚡ 新千歲機場 抵達→黑貓取行李→國際線報到', en: '⚡ New Chitose Airport — Yamato Pickup → International Check-in' }, duration: '60min', note: { zh: '⚡ 先至國內線 1F/2F 黑貓（ヤマト運輸）憑粉紅收據領行李；再推車至國際線辦 CI131 報到（步行 5-8 分）', en: '⚡ First: Domestic Terminal 1F/2F Yamato counter — show pink receipt to collect bags; then walk 5-8 min to international terminal for CI131 check-in' }, maps: 'https://maps.google.com/?q=New+Chitose+Airport', coord: [42.7751, 141.6924], warn: true },
      { time: '12:17', place: { zh: '新千歲機場 自由逛（餐廳 / 名產 / 美食街）', en: 'New Chitose Airport Free Explore (Food / Shops / Souvenirs)' }, duration: '108min', note: { zh: '國內線 3F 美食街（一幻、花畑牧場、十勝豚丼等）；2F 名產大街；依個人狀態自由分配時間', en: 'Domestic 3F food court (Ichigen, Hanabatake, Tokachi, etc.); 2F souvenir street; explore at your own pace' }, maps: 'https://maps.google.com/?q=New+Chitose+Airport', coord: [42.7751, 141.6924], warn: false },
      { time: '14:05', place: { zh: '新千歲機場 最終採買 → 安全檢查', en: 'New Chitose Airport Final Shopping then Security' }, duration: '60min', note: { zh: '⚡ 安檢後：Calbee 薯條三兄弟（限定）、ROYCE 生巧（保冷袋）、KINOTOYA 起司塔', en: '⚡ Post-security: Jaga Pokkuru (exclusive), ROYCE nama choco (add cold pack), KINOTOYA tart' }, maps: null, warn: true },
      { time: '15:05', place: { zh: '✈️ CI131 出發', en: '✈️ CI131 Depart' }, duration: '190min', note: { zh: '15:05 起飛 → 桃園 18:15；商務艙 A321neo', en: '15:05 depart, Taoyuan arr. 18:15; Business A321neo' }, maps: null, warn: false },
      { time: '18:15', place: { zh: '桃園國際機場第二航廈 抵達', en: 'Taoyuan Airport T2 Arrival' }, duration: '45min', note: { zh: '結束 9 天北海道之旅！', en: 'End of 9-day Hokkaido adventure!' }, maps: null, warn: false },
    ],
    mealBudget: { zh: '午餐 1,200円；早餐含住宿', en: 'Lunch 1,200 yen; breakfast included' },
    shopping: { zh: 'Calbee 薯條三兄弟（安檢後）；ROYCE 生巧；KINOTOYA 起司塔；LeTAO Double Fromage', en: 'Jaga Pokkuru (post-security); ROYCE nama choco; KINOTOYA cheese tart; LeTAO Double Fromage' },
    stepsRange: { zh: '約 5,000–7,000 步', en: 'approx. 5,000–7,000 steps' },
    stepsLevel: 'easy',
    tips: [
      { title: { zh: '優雅搭車', en: 'Comfortable Departure' }, body: { zh: '08:45–09:00 請飯店幫忙叫計程車直達 JR 洞爺站，免去拖著隨身行李擠公車的痛苦。', en: 'Ask the hotel to call a taxi at 08:45–09:00 directly to Toya Station — avoid struggling with bags on the bus.' } },
      { title: { zh: '領取大件行李', en: 'Yamato Pickup (Critical)' }, body: { zh: '11:06 抵達新千歲機場站後，先去國內線航廈 1F/2F 的黑貓（ヤマト運輸）櫃檯，憑 Day 5 的粉紅收據領回大件行李，再推著推車去國際線航廈辦理登機。', en: 'After arriving at New Chitose 11:06, go to Domestic Terminal 1F/2F Yamato counter. Show pink receipt from Day 5 to collect bags, then walk to international terminal for check-in.' } },
      { title: { zh: '機場最後衝刺', en: 'Airport Final Shopping' }, body: { zh: '機場超級好逛，請預留充足時間採買六花亭、Royce\' 等需要冷藏的伴手禮（安檢後的限定商品記得先掃一圈）。', en: 'New Chitose Airport is excellent for souvenir shopping. Allow time for cold-pack items (Rokkatei, Royce\'). Check post-security exclusives before boarding.' } },
    ],
  },
];

// ── SOUVENIRS ──────────────────────────────────────────────
const SOUVENIRS = [
  {
    category: { zh: '📍 小樽（Day 2）', en: '📍 Otaru (Day 2)' },
    tab: { zh: '小樽', en: 'Otaru' },
    items: [
      { id: 's1', name: { zh: 'LeTAO 起司夾心餅乾（色內通系列）', en: 'LeTAO Cheese Biscuits (Irouchi-dori)' }, price: '500–800円', cold: false, airport: false, img: 'images/souvenirs/letao-biscuit.jpg', note: { zh: '小樽本店種類最齊', en: 'Best selection at Otaru main store' } },
      { id: 's2', name: { zh: 'LeTAO THÉNOIR 大吉嶺紅茶巧克力夾心', en: 'LeTAO THÉNOIR Darjeeling Chocolate' }, price: '—', cold: false, airport: false, note: { zh: '小樽本店限定', en: 'Otaru main store exclusive' } },
      { id: 's3', name: { zh: '北一硝子 手作玻璃杯', en: 'Kitaichi Glass Handmade Cup' }, price: '3,000–8,000円', cold: false, airport: false, img: 'images/souvenirs/kitaichi-glass.jpg', note: { zh: '請店家加強包裝', en: 'Ask for extra wrapping' } },
    ]
  },
  {
    category: { zh: '📍 白色戀人公園（Day 3）', en: '📍 Shiroi Koibito Park (Day 3)' },
    tab: { zh: '白色戀人', en: 'Shiroi Koibito' },
    items: [
      { id: 's4', name: { zh: '白色戀人 工廠限定包裝 + 訂製磁鐵', en: 'Shiroi Koibito Factory Box + Custom Magnet' }, price: '2,200–3,500円 + 1,500円', cold: false, airport: false, img: 'images/souvenirs/shiroi-koibito.jpg', note: { zh: '訂製磁鐵為現場限定', en: 'Custom magnet is on-site exclusive' } },
    ]
  },
  {
    category: { zh: '📍 札幌 Day 3–4（核心戰場）', en: '📍 Sapporo Day 3–4 (Core Shopping)' },
    tab: { zh: '札幌', en: 'Sapporo' },
    items: [
      { id: 's5', name: { zh: '六花亭 丸成奶油三明治（Marusei Butter Sand）', en: 'Rokkatei Marusei Butter Sand' }, price: '216円×6入', cold: false, airport: false, img: 'images/souvenirs/rokkatei-marusei.jpg', note: null },
      { id: 's6', name: { zh: '六花亭 酒糖（六花のつゆ）', en: 'Rokkatei Sake Candy (Rikka no Tsuyu)' }, price: '—', cold: false, airport: false, img: 'images/souvenirs/rokkatei-sake.jpg', note: { zh: '⚡ 糖衣極脆弱（液體糖），獨立裝入硬盒保護', en: '⚡ Ultra-fragile liquid-filled sugar — pack in hard box' } },
      { id: 's7', name: { zh: '北菓樓 妖精之森年輪蛋糕（整條）', en: 'Kitakaro Elf Forest Baumkuchen' }, price: '2,500円', cold: false, airport: false, img: 'images/souvenirs/kitakaro-baum.jpg', note: null },
      { id: 's8', name: { zh: '北菓樓 開拓米果（枝幸帆立貝口味）', en: 'Kitakaro Kaitaku Rice Crackers (Scallop)' }, price: '—', cold: false, airport: false, note: null },
      { id: 's8b', name: { zh: '柳月 三方六年輪蛋糕', en: 'Yanagitsuji Sanporo-Roku Baumkuchen' }, price: '~1,800円', cold: false, airport: false, note: { zh: '白樺樹紋雙色巧克力外層；來自帶廣；已切片方便享用', en: 'White birch-patterned baumkuchen from Obihiro; pre-sliced, easy to share' } },
      { id: 's8c', name: { zh: '札幌農學校 牛奶餅乾', en: 'Sapporo Nogakko Milk Biscuits' }, price: '~800円', cold: false, airport: false, note: { zh: '北海道大學共同研發；純粹北海道鮮乳奶香；適合送給孩子', en: "Co-developed with Hokkaido Univ.; pure milky flavor — great kids' gift" } },
      { id: 's9', name: { zh: '北海道神宮 御守', en: 'Hokkaido Jingu Omamori' }, price: '~500円', cold: false, airport: false, note: null },
    ]
  },
  {
    category: { zh: '📍 函館（Day 6）', en: '📍 Hakodate (Day 6)' },
    tab: { zh: '函館', en: 'Hakodate' },
    items: [
      { id: 's10', name: { zh: "SNAFFLE'S 起司歐姆蕾蛋糕 Catchcakes", en: "SNAFFLE'S Cheese Omelette Catchcakes" }, price: '1,296円 / 6入', cold: true, airport: false, img: 'images/souvenirs/snaffles.jpg', note: { zh: '需冷藏，3 天賞味期限', en: 'Refrigerate, 3-day shelf life' } },
    ]
  },
  {
    category: { zh: '✈️ 新千歲機場（Day 9）— 限定品優先', en: '✈️ New Chitose Airport (Day 9) — Exclusives First' },
    tab: { zh: '✈️ 機場', en: '✈️ Airport' },
    items: [
      { id: 's11', name: { zh: 'Calbee 薯條三兄弟（北海道奶油口味）', en: 'Calbee Jaga Pokkuru (Hokkaido Butter)' }, price: '900円/盒', cold: false, airport: true, img: 'images/souvenirs/calbee.jpg', note: { zh: '⚡ 國際線安檢後限定，市區找不到', en: '⚡ International terminal AFTER security only — not sold in city' } },
      { id: 's12', name: { zh: 'ROYCE\' 生巧克力（牛奶口味）', en: "ROYCE' Nama Chocolate (Milk)" }, price: '800–1,200円', cold: true, airport: true, img: 'images/souvenirs/royce.jpg', note: { zh: '⚡ 安檢後免稅店買，購買保冷袋（300円）', en: '⚡ Buy AFTER security at duty-free; add cold pack (¥300)' } },
      { id: 's13', name: { zh: 'LeTAO 乳酪蛋糕（Double Fromage）', en: 'LeTAO Double Fromage Cheesecake' }, price: '2,000円', cold: true, airport: false, img: 'images/souvenirs/letao-cake.jpg', note: { zh: '需保冷袋；冷凍可保 2 週', en: 'Requires cold bag; freezes for 2 weeks' } },
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
      { id: 'd19', name: { zh: 'Loshi 北海道馬油護膚霜', en: 'Loshi Hokkaido Horse Oil Cream' }, price: '~800円', note: { zh: '日本銷量第一馬油品牌；台灣悶熱氣候建議只用於腳跟/手肘急救', en: "Japan's #1 horse oil cream; in humid climates use only on heels/elbows" } },
      { id: 'd20', name: { zh: 'LuLuLun 北海道限定面膜', en: 'LuLuLun Hokkaido Limited Face Mask' }, price: '~600円', note: { zh: '哈密瓜/薰衣草/牛奶/蜂蜜 4 款；7片×多袋裝；⚡ 吸飽精華液後重量驚人，小心行李超重', en: 'Melon/lavender/milk/honey 4 types; 7 sheets×multi-pack; ⚡ heavy when soaked — watch luggage weight' } },
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

// ── COUPONS ───────────────────────────────────────────────
const COUPONS = [
  {
    id: 'c1',
    store: { zh: '唐吉訶德（狸小路）', en: "Don Quijote (Tanukikoji)" },
    icon: '🐧',
    area: { zh: '札幌 狸小路 3 丁目 / 24H 營業', en: 'Sapporo Tanukikoji 3-chome / 24H' },
    discount: { zh: '5% 折扣優惠券', en: '5% Off Coupon' },
    how: { zh: '現場打開連結 → 出示條碼給收銀員掃描', en: 'Open link in-store → show barcode to cashier' },
    url: 'https://www.djapanpass.com/coupon/0054000103',
    tip: { zh: '⚡ 必須在店內現場打開連結才能啟用，勿提前截圖', en: '⚡ Must open link in-store to activate — do NOT screenshot in advance' },
  },
  {
    id: 'c2',
    store: { zh: '札幌藥妝 (Sapporo Drug)', en: 'Sapporo Drug Store (Satudora)' },
    icon: '💊',
    area: { zh: '狸小路商店街 / 全北海道', en: 'Tanukikoji / all Hokkaido' },
    discount: { zh: '免稅 10% + 再享 5% 折扣', en: 'Tax-free 10% + extra 5% off' },
    how: { zh: '結帳時出示護照辦免稅 + 手機出示優惠券讓店員掃條碼', en: 'Show passport for tax-free + scan coupon barcode at checkout' },
    localImg: './images/coupons/札幌藥妝優惠折價券.jpg',
    tip: { zh: '限 Tax Free 門市有效；需消費滿 5,000円 方可辦免稅', en: 'Valid at Tax Free stores only; min. ¥5,000 purchase for tax exemption' },
  },
  {
    id: 'c3',
    store: { zh: 'BIC CAMERA 札幌店', en: 'BIC CAMERA Sapporo' },
    icon: '📷',
    area: { zh: '札幌站步行 5 分鐘（JR Tower 旁）', en: '5 min walk from Sapporo Stn (near JR Tower)' },
    discount: { zh: '外國旅客折扣券（免稅 ＋ 額外折扣）＋ Salonia 優惠', en: 'Tourist discount (tax-free + extra off) + Salonia coupon' },
    how: { zh: '結帳時出示護照辦免稅，同時出示折扣券給店員', en: 'Show passport for tax-free + show discount coupon at checkout' },
    images: [
      './images/coupons/Bic camera折價券2026.png',
      './images/coupons/與7%券共用_Salonia優惠券.jpg',
    ],
    tip: null,
  },
  {
    id: 'c4',
    store: { zh: '鶴羽藥妝 (Tsuruha Drug)', en: 'Tsuruha Drug' },
    icon: '🦢',
    area: { zh: '狸小路商店街 / 全北海道', en: 'Tanukikoji / all Hokkaido' },
    discount: { zh: '外國旅客購物優惠券', en: 'Tourist coupon' },
    how: { zh: '手機出示優惠券條碼讓店員掃描', en: 'Show coupon barcode on phone to cashier' },
    localImg: './images/coupons/2026鶴羽藥妝折價券.jpg',
    tip: null,
  },
  {
    id: 'c5',
    store: { zh: '松本清 (Matsumoto Kiyoshi)', en: 'Matsumoto Kiyoshi' },
    icon: '🟡',
    area: { zh: '狸小路商店街', en: 'Tanukikoji' },
    discount: { zh: '外國旅客購物優惠券', en: 'Tourist coupon' },
    how: { zh: '手機出示優惠券給店員掃條碼', en: 'Show coupon on phone for cashier to scan' },
    localImg: './images/coupons/松本清優惠券2026.jpg',
    tip: null,
  },
];

// ── TRANSPORT ──────────────────────────────────────────────
const TRANSPORT = {
  jr: [
    { route: { zh: '新千歲機場 → 札幌', en: 'New Chitose → Sapporo' }, train: { zh: 'JR 快速機場線', en: 'JR Airport Rapid' }, time: '40分', fare: '1,150円', day: { zh: 'Day 1 抵達當天', en: 'Day 1 Arrival' }, note: { zh: 'IC 卡可用', en: 'IC card OK' } },
    { route: { zh: '札幌 → 小樽', en: 'Sapporo → Otaru' }, train: { zh: 'JR 函館本線', en: 'JR Hakodate Main' }, time: '40–50分', fare: '750円', day: { zh: 'Day 2', en: 'Day 2' }, note: { zh: 'IC 卡可用', en: 'IC card OK' } },
    { route: { zh: '札幌 → 函館', en: 'Sapporo → Hakodate' }, train: { zh: '特急 北斗號', en: 'Limited Exp. Hokuto' }, time: '3.5時間', fare: '~9,000円', day: { zh: 'Day 5（5/18）', en: 'Day 5 (5/18)' }, note: { zh: '⚡ 全車指定席，需提前劃位；鎖定 D 席右側可覽內浦灣海景；車上可買便當', en: '⚡ All reserved seats — book in advance; D-seat (right side) = sea view; bento available on board' } },
    { route: { zh: '函館 → 洞爺', en: 'Hakodate → Toya' }, train: { zh: '特急 北斗號', en: 'Limited Exp. Hokuto' }, time: '1時間54分', fare: '~4,500円', day: { zh: 'Day 7（5/20）', en: 'Day 7 (5/20)' }, note: { zh: '⚡ 全車指定席；洞爺站下車，站外搭計程車至湖畔', en: '⚡ All reserved; exit Toya Station, taxi to lakeside hotel' } },
    { route: { zh: '洞爺 → 登別', en: 'Toya → Noboribetsu' }, train: { zh: '特急 北斗號', en: 'Limited Exp. Hokuto' }, time: '約40分', fare: 'JR Pass', day: { zh: 'Day 8（5/21）', en: 'Day 8 (5/21)' }, note: { zh: '登別站下車，轉道南バス至溫泉街（約16分，備硬幣）', en: 'Exit Noboribetsu Station, Donan Bus to onsen town (~16 min, coins needed)' } },
    { route: { zh: '洞爺／登別 → 新千歲', en: 'Toya/Noboribetsu → New Chitose' }, train: { zh: '特急 北斗號 → 快速機場線', en: 'Limited Exp. Hokuto → Airport Rapid' }, time: '約2時間', fare: '~5,500円', day: { zh: 'Day 9（5/22）回程', en: 'Day 9 (5/22) Departure' }, note: { zh: '洞爺搭北斗→南千歲換快速機場線至新千歲；行李已寄倉，輕裝出發', en: 'Hokuto to Minami-Chitose, transfer to Airport Rapid; luggage already forwarded' } },
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
  jrSOP: {
    location: { zh: '新千歲機場 B1 — JR 外籍旅客服務處（JR Information Desk for Foreign Visitors）', en: 'New Chitose Airport B1 — JR Information Desk for Foreign Visitors' },
    activationWarn: { zh: '⚠️ 啟用日必須填「5/18（Day 5）」— 切勿當天（5/14）啟用！啟用錯日期就廢了！', en: '⚠️ Activation date MUST be May 18 (Day 5) — do NOT activate today (5/14)! Wrong date = wasted pass!' },
    englishScript: 'Hokkaido Rail Pass (5 Days)\nStart Date: May 18\n\nPlease help reserve:\n\n1. [5/18] Sapporo 13:26 → Hakodate 17:13\n   (Ltd. Exp. Hokuto — Window seat right side, Seat D, for ocean view)\n\n2. [5/20] Hakodate 10:45 → Toya 12:39\n   (Ltd. Exp. Hokuto)\n\n3. [5/21] Toya → Noboribetsu\n   (Departs Toya approx 10:30–10:40)\n\n4. [5/21] Noboribetsu 16:58 → Toya 17:37\n   (Ltd. Exp. Hokuto)\n\n5. [5/22] Toya 09:34 → New Chitose Airport\n   (Ltd. Exp. Hokuto + Rapid Airport)',
    seatTip: { zh: '北斗號 D 席（右側）= 內浦灣海景 ─ Day 5（札幌→函館）及 Day 7（函館→洞爺）務必指定', en: 'Hokuto D-seat (right side) = Uchiura Bay sea view — request for Day 5 (Sapporo→Hakodate) & Day 7 (Hakodate→Toya)' },
    donanWarn: { zh: '⚠️ 以下路段「不含」在 JR 周遊券內，需備現金硬幣或儲值 IC 卡：\n• Day 7：洞爺站前 → 乃之風（道南バス，12:48）\n• Day 8：乃之風 → 洞爺站（道南バス，09:50）\n• Day 8：登別站 → 地獄谷（道南バス，11:45）\n• Day 8：地獄谷 → 登別站（道南バス，16:13）\n• Day 8：洞爺站前 → 乃之風（道南バス，17:48）', en: '⚠️ These segments NOT covered by JR Pass — need cash coins or IC card:\n• Day 7: Toya Station → Nonokaze (Donan Bus, 12:48)\n• Day 8: Nonokaze → Toya Station (Donan Bus, 09:50)\n• Day 8: Noboribetsu Station → Jigokudani (Donan Bus, 11:45)\n• Day 8: Jigokudani → Noboribetsu Station (Donan Bus, 16:13)\n• Day 8: Toya Station → Nonokaze (Donan Bus, 17:48)' },
  },
  yamato: {
    timing: { zh: '最晚時限：Day 5（5/18）早上 09:00 前，於京王普雷利亞飯店前台辦理\n建議：Day 4（5/17）晚上回飯店後立刻封箱整理，預留 15–20 分鐘填單', en: 'Deadline: Day 5 (5/18) by 09:00 at Keio Prelia Hotel front desk\nRecommend: pack & seal bags after returning on Day 4 (5/17); allow 15-20 min to fill out form' },
    japaneseScript: 'すみません、空港宅急便をお願いしたいです。\n\n・目的地：新千歳空港（国際線ターミナル）\n・出発日：2026年 5月 22日\n・便名：中華航空 CI 131\n・出発時刻：15時 05分',
    formFields: [
      { label: { zh: '收件地址 (お届け先住所)', en: 'Delivery Address' }, value: '新千歳空港 旅客ターミナルビル内' },
      { label: { zh: '收件人名稱 (お届け先氏名)', en: 'Recipient Name' }, value: 'ヤマト運輸 荷物一時預かり所' },
      { label: { zh: '收件電話 (お届け先電話)', en: 'Recipient Phone' }, value: '0123-46-5310' },
      { label: { zh: '搭乘日期 (搭乗日)', en: 'Travel Date' }, value: '2026年 05月 22日' },
      { label: { zh: '起飛時間 (出発時刻)', en: 'Departure Time' }, value: '15時 05分' },
      { label: { zh: '航班號 (便名)', en: 'Flight No.' }, value: '中華航空 CI 131' },
      { label: { zh: '寄件地址 (ご依頼主住所)', en: 'Sender Address' }, value: '京王プレリアホテル札幌（TEL: 011-205-8111）' },
    ],
    receiptWarn: { zh: '⚡ 寄出後拿到粉紅色收據，立刻拍照備份！Day 9 機場領行李時必須出示此單', en: '⚡ Photograph the pink receipt immediately after sending — must show it to claim bags on Day 9' },
    pickupSOP: { zh: 'Day 9 流程：\n① 新千歲機場 11:06 抵站（B1）\n② 前往國內線 1F 或 2F 黑貓（ヤマト運輸）櫃台\n③ 出示粉紅收據 + 護照領行李\n④ 推推車步行約 5–8 分至國際線辦 CI131 報到', en: 'Day 9 Pickup:\n① Arrive New Chitose 11:06 (B1)\n② Go to Domestic Terminal 1F or 2F — Yamato (ヤマト運輸) counter\n③ Show pink receipt + passport to collect bags\n④ Walk ~5-8 min to international terminal for CI131 check-in' },
    cost: { zh: '費用：每件行李箱約 2,500–3,500 円（含機場服務費）', en: 'Cost: approx ¥2,500–3,500 per bag (incl. airport surcharge)' },
    prohibited: { zh: '⚠️ 以下物品禁止放入行李箱托運，必須隨身攜帶：\n• 行動電源（所有容量）\n• 相機電池 / 備用電池\n• 壓力噴霧罐（防蚊噴霧等）', en: '⚠️ These CANNOT go in checked bags — must carry-on:\n• Power banks (all capacities)\n• Camera batteries / spare batteries\n• Aerosol spray cans (insect repellent etc.)' },
  },
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
  '狸小路': {
    phone: '011-241-5125',
    hours: { zh: '街道24H開放；各店約 10:00–20:00；MEGA唐吉訶德24H', en: 'Street open 24H; most stores 10:00–20:00; MEGA Don Quijote 24H' },
    address: { zh: '札幌市中央区南2・3条西1–7丁目', en: 'Minami 2-3-jo Nishi 1-7, Chuo-ku, Sapporo' },
    rating: { score: '4.4/5', source: 'Google Maps', stars: 4 },
    recommend: { zh: 'MEGA 唐吉訶德（24H 藥妝伴手禮）・各藥妝比價・商店街中段有狸神社可打卡', en: 'MEGA Don Quijote (24H drugstore) · drugstore price comparison · Tanuki shrine mid-street' },
    link: 'https://tanukikoji.or.jp/',
  },
  '成吉思汗達摩 5.5 店': {
    phone: '011-521-4804',
    hours: { zh: '每日 17:00–翌03:00', en: 'Daily 17:00–03:00+' },
    address: { zh: '札幌市中央区南5条西4丁目', en: 'Minami 5-jo W4, Chuo-ku, Sapporo' },
    rating: { score: '4.1/5', source: 'Google Maps', stars: 4 },
    recommend: { zh: '成吉思汗羊肉 · 生ラム（新鮮生羔羊）', en: 'Jingisukan lamb · Fresh raw lamb (nama-ramu)' },
    link: 'https://tabelog.com/hokkaido/A0101/A010103/1057043/',
  },
  'Parfaiteria PaL': {
    phone: '011-530-5505',
    hours: { zh: '週二–日 18:00–00:00（週一公休）', en: 'Tue–Sun 18:00–00:00, closed Mon' },
    address: { zh: '札幌市中央区南4条西4丁目', en: 'Minami 4-jo W4, Chuo-ku, Sapporo' },
    rating: { score: '4.2/5', source: 'Google Maps', stars: 4 },
    recommend: { zh: '季節限定夜聖代（北海道牛奶底）', en: 'Seasonal night parfait (Hokkaido milk base)' },
    link: 'https://tabelog.com/hokkaido/A0101/A010103/1049420/',
  },
  '⭐ 北一硝子 三號館': {
    phone: '0134-33-1993',
    hours: { zh: '每日 08:45–18:00', en: 'Daily 08:45–18:00' },
    address: { zh: '小樽市堺町7-26', en: '7-26 Sakaimachi, Otaru' },
    rating: { score: '4.3/5', source: 'Google Maps', stars: 4 },
    recommend: { zh: '煤油燈咖啡廳內用 · 手作玻璃杯（3,000円起）', en: 'Kerosene lamp café · Handmade glass from ¥3,000' },
    access: {
      zh: ['① 搭 JR 至小樽站', '② 沿堺町通り（南小樽方向）步行約 12 分至堺町7丁目（LeTAO 相距 50 公尺）'],
      en: ['① Take JR to Otaru Station', '② Walk ~12 min along Sakaimachi-dori toward Minami-Otaru (LeTAO is 50m away)'],
    },
    link: 'https://www.kitaichiglass.co.jp/',
  },
  '小樽運河夜景散步': {
    hours: { zh: '全天開放；煤氣燈點燈 18:00–24:00；⚡ 黃金窗口 17:30–18:30 最美', en: 'Open 24H; gas lamps lit 18:00–24:00; ⚡ golden hour 17:30–18:30' },
    address: { zh: '小樽市港町5（淺草橋至中央橋段）', en: '5 Minatomachi, Otaru (Asakusa Bridge to Chuo Bridge)' },
    rating: { score: '4.3/5', source: 'Google Maps', stars: 4 },
    recommend: { zh: '淺草橋角度最佳拍照點・煤氣燈步道散步・倉庫群夜間點燈至 22:30', en: 'Best photo angle from Asakusa Bridge · gas lamp walkway stroll · warehouses lit until 22:30' },
    link: 'https://otaru.cc/',
  },
  '⭐ LeTAO 小樽總店': {
    phone: '0120-468-111',
    hours: { zh: '每日 09:00–18:00（季節調整）', en: 'Daily 09:00–18:00 (season varies)' },
    address: { zh: '小樽市堺町7-16', en: '7-16 Sakaimachi, Otaru' },
    rating: { score: '4.4/5', source: 'Google Maps', stars: 4 },
    recommend: { zh: '2F 現做雙層乳酪蛋糕 900円 · 飲料套餐 1,400円', en: '2F fresh Double Fromage ¥900 · drink set ¥1,400' },
    access: {
      zh: ['① 搭 JR 至小樽站', '② 沿堺町通り（南小樽方向）步行約 12 分至堺町7丁目（與北一硝子相距 50 公尺）'],
      en: ['① Take JR to Otaru Station', '② Walk ~12 min along Sakaimachi-dori toward Minami-Otaru (50m from 北一硝子)'],
    },
    link: 'https://www.letao.jp/',
  },
  'Sumire 味噌拉麵': {
    phone: '011-551-4960',
    hours: { zh: '11:00–15:00，18:00–21:00（週三公休）', en: '11:00–15:00, 18:00–21:00, closed Wed' },
    address: { zh: '札幌市中央区南5条西5丁目（薄野店）', en: 'Susukino, Minami 5-jo W5, Chuo-ku' },
    rating: { score: '4.0/5', source: 'Google Maps', stars: 4 },
    recommend: { zh: '味噌拉麵 · 奶油玉米味噌（コーンバターみそ）', en: 'Miso ramen · Rich butter corn miso' },
    link: 'http://www.sumireya.com/',
  },
  'Sato': {
    hours: { zh: '夜間限定（約 19:00–翌01:00）', en: 'Night only (approx 19:00–01:00+)' },
    address: { zh: '札幌市中央区南4条西4丁目周邊', en: 'Near Minami 4-jo W4, Chuo-ku, Sapporo' },
    rating: { score: '4.1/5', source: 'Google Maps', stars: 4 },
    recommend: { zh: '季節夜聖代（每週更換）', en: 'Seasonal night parfait (weekly rotation)' },
    link: 'https://tabelog.com/hokkaido/A0101/A010102/1077806/',
  },
  'Espresso D Works': {
    phone: '011-231-4059',
    hours: { zh: '週一–五 08:00–18:00，週末 08:00–17:00', en: 'Mon–Fri 08:00–18:00, weekends 08:00–17:00' },
    address: { zh: '札幌市中央区大通西1丁目', en: 'Odori W1, Chuo-ku, Sapporo' },
    rating: { score: '4.3/5', source: 'Google Maps', stars: 4 },
    recommend: { zh: '水份100% 吐司 · 蓬鬆舒芙蕾 · 玉米濃湯套餐', en: '100% moisture toast · soufflé pancake · corn soup set' },
    link: 'https://tabelog.com/grouplst/G04133/',
  },
  '⭐ 白色戀人公園': {
    phone: '011-666-1481',
    hours: { zh: '09:00–18:00（依季節調整）', en: '09:00–18:00 (season varies)' },
    address: { zh: '札幌市西区宮の沢2条2丁目11-36', en: '2-2-11-36 Miyanosawa, Nishi-ku, Sapporo' },
    rating: { score: '4.4/5', source: 'Google Maps', stars: 4 },
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
    rating: { score: '4.5/5', source: 'Google Maps', stars: 5 },
    recommend: { zh: '判官さま現烤麻糬（限量 300円）· 福餅 · 圓山公園湖畔散步', en: 'Hangan grilled mochi (limited, ¥300) · Fuku-mochi · Maruyama Park stroll' },
    access: {
      zh: ['① 地下鐵東西線至「円山公園」站', '② 步行約 10 分鐘至神宮正門（沿指標走）'],
      en: ['① Subway Tozai Line to "Maruyama Koen"', '② Walk ~10 min to main shrine gate (follow signs)'],
    },
    link: 'https://www.hokkaidojingu.or.jp/',
  },
  '大丸': {
    phone: '050-1780-6000',
    hours: { zh: '百貨樓層 10:00–20:00；8F 餐廳街 11:00–22:00', en: 'Store floors 10:00–20:00; 8F restaurant area 11:00–22:00' },
    address: { zh: '札幌市中央区北5条西4丁目（JR 札幌站直結）', en: 'Kita 5-jo Nishi 4-chome, Chuo-ku (directly connected to JR Sapporo)' },
    rating: { score: '4.5/5', source: 'Google Maps', stars: 5 },
    recommend: { zh: 'B1F 伴手禮齊全（六花亭・北菓樓・LeTAO）・8F 寶可夢中心・退稅服務', en: 'B1F full souvenir lineup (Rokkatei, Kitakaro, LeTAO) · 8F Pokemon Center · tax-free counter' },
    link: 'https://www.daimaru.co.jp/sapporo/',
  },
  'GARAKU 湯咖哩': {
    phone: '011-233-5568',
    hours: { zh: '11:30–22:00（週三公休）', en: '11:30–22:00, closed Wed' },
    address: { zh: '札幌市中央区南2条西2丁目', en: 'Minami 2-jo W2, Chuo-ku, Sapporo' },
    rating: { score: '4.3/5', source: 'Google Maps', stars: 4 },
    recommend: { zh: '海老ベースのスープカレー · 辣度 0–40 可選', en: 'Shrimp broth soup curry · spice level 0–40' },
    link: 'https://s-garaku.com/',
  },
  '千秋庵本店': {
    phone: '011-231-3681',
    hours: { zh: '10:00–18:00（不定休）', en: '10:00–18:00 (irregular holidays)' },
    address: { zh: '札幌市中央区北4条西3丁目', en: 'Kita 4-jo W3, Chuo-ku, Sapporo' },
    rating: { score: '4.1/5', source: 'Google Maps', stars: 4 },
    recommend: { zh: 'バリ銅鑼（巴里銅鑼）· 僅本店現場烤製', en: 'Bali Dorayaki · freshly baked in-store only' },
    link: 'https://senshuan.co.jp/',
  },
  '札幌かに本家 站前總店': {
    phone: '011-222-0018',
    hours: { zh: '11:30–22:00（需提前預約）', en: '11:30–22:00 (reservations recommended)' },
    address: { zh: '札幌市中央区北4条西2丁目', en: 'Kita 4-jo W2, Chuo-ku, Sapporo' },
    rating: { score: '4.1/5', source: 'Google Maps', stars: 4 },
    recommend: { zh: '全熟螃蟹套餐（8,000–15,000円）· 指定包廂', en: 'Fully cooked crab course (¥8,000–15,000) · request private room' },
    link: 'https://tabelog.com/hokkaido/A0101/A010101/1000299/',
  },
  '幸運小丑漢堡 碼頭末廣店': {
    phone: '0138-26-2099',
    hours: { zh: '10:00–22:00（全年無休）', en: '10:00–22:00, open year-round' },
    address: { zh: '函館市末広町23-18', en: '23-18 Suehirocho, Hakodate' },
    rating: { score: '4.3/5', source: 'Google Maps', stars: 4 },
    recommend: { zh: '中華風炸雞漢堡（チャイニーズチキンバーガー）580円', en: 'Chinese Chicken Burger ¥580' },
    link: 'https://luckypierrot.jp/',
  },
  // ── Day 6 & 7 ──
  '函館朝市': {
    phone: '0138-22-7981',
    hours: { zh: '05:00–14:00（各店不一；旺季部分攤位至 17:00）', en: '05:00–14:00 (varies by stall; some to 17:00 in peak season)' },
    address: { zh: '函館市若松町9-19（JR 函館站斜對面）', en: '9-19 Wakamatsu-cho, Hakodate (diagonal from JR station)' },
    rating: { score: '4.3/5', source: 'Google Maps', stars: 4 },
    recommend: { zh: '毛蟹直售 2,000–5,000円・帆立バター焼き 500円・海鮮丼（いくら・ウニ・蟹）1,500円起', en: 'Horsehair crab ¥2,000–5,000 · butter scallop ¥500 · seafood don from ¥1,500' },
    access: {
      zh: ['① JR 函館站出站後左轉，步行約 2 分鐘直達', '⚡ 05:00–08:00 食材最新鮮；09:00 後觀光客激增'],
      en: ['① Turn left out of JR Hakodate Station, walk ~2 min', '⚡ Freshest 05:00–08:00; crowds surge after 09:00'],
    },
    link: 'https://www.hakodate-asaichi.com/',
  },
  '村上海膽': {
    phone: '0138-22-6086',
    hours: { zh: '09:00–18:00（週三・週四公休）', en: '09:00–18:00, closed Wed & Thu' },
    address: { zh: '函館市大手町22-1', en: '22-1 Otemachi, Hakodate' },
    rating: { score: '4.1/5', source: 'Google Maps', stars: 4 },
    recommend: { zh: '焗烤海膽（ウニグラタン）· 炙烤海膽（炙りウニ）· 避開生食', en: 'Uni gratin · grilled uni · skip raw uni' },
    link: 'https://tabelog.com/hokkaido/A0105/A010501/1000136/',
  },
  '奧芝商店 函館本店': {
    phone: '0138-83-5007',
    hours: { zh: '11:30–21:00（週一・週二公休）', en: '11:30–21:00, closed Mon & Tue' },
    address: { zh: '函館市本町6-9', en: '6-9 Honcho, Hakodate' },
    rating: { score: '4.1/5', source: 'Google Maps', stars: 4 },
    recommend: { zh: '海老スープカレー（蝦湯咖哩）辣度 1–30', en: 'Shrimp broth soup curry, spice level 1–30' },
    link: 'https://tabelog.com/hokkaido/A0105/A010501/1042739/',
  },
  '岡田屋': {
    phone: '0142-75-2041',
    hours: { zh: '10:00–17:00（不定休）', en: '10:00–17:00 (irregular)' },
    address: { zh: '洞爺湖町洞爺湖温泉50', en: '50 Toyako Onsen, Toyako-cho' },
    rating: { score: '3.9/5', source: 'Google Maps', stars: 4 },
    recommend: { zh: '白汁粉（白玉白湯圓紅豆湯）600–900円', en: 'White mochi sweet soup ¥600–900' },
    link: 'https://tabelog.com/hokkaido/A0108/A010801/1003343/',
  },
  // ── Day 2 ──
  '小樽音樂盒堂 本館': {
    phone: '0134-22-1108',
    hours: { zh: '09:00–18:00（旺季延長至 19:00）', en: '09:00–18:00 (peak season until 19:00)' },
    address: { zh: '小樽市住吉町4-1（堺町通り）', en: '4-1 Sumiyoshi-cho, Otaru (Sakaimachi-dori)' },
    rating: { score: '4.4/5', source: 'Google Maps', stars: 4 },
    recommend: { zh: '大廳免費參觀・限定款音樂盒 3,000円起・工房手作體驗 2,200円', en: 'Main hall free entry · limited music boxes from ¥3,000 · hands-on workshop ¥2,200' },
    link: 'https://www.otaru-orgel.co.jp/',
  },
  'Cafe BAAL': {
    hours: { zh: '11:00–21:00（週三公休）', en: '11:00–21:00, closed Wed' },
    address: { zh: '小樽市稲穂2丁目（近小樽站）', en: 'Near Otaru Station, Inaho 2-chome' },
    rating: { score: '4.0/5', source: 'Google Maps', stars: 4 },
    recommend: { zh: '洋食牛排飯 1,500–2,500円；份量紮實、保護腿力', en: 'Western-style steak rice ¥1,500–2,500; hearty portions, saves your legs' },
    link: 'https://tabelog.com/hokkaido/A0106/A010601/1052877/',
  },
  // ── Day 3 ──
  '中島公園 / 豐平館': {
    phone: '011-211-1951',
    hours: { zh: '公園全日開放；豐平館 09:00–17:00（週一公休）', en: 'Park open all day; Hoheikan 09:00–17:00, closed Mon' },
    address: { zh: '札幌市中央区中島公園1', en: '1 Nakajima Koen, Chuo-ku, Sapporo' },
    rating: { score: '4.3/5', source: 'Google Maps', stars: 4 },
    recommend: { zh: '豐平館（明治洋樓）300円・湖畔晨間散步免費・鴨子池拍照打卡', en: 'Hoheikan (Meiji Western hall) ¥300 · lakeside stroll free · duck pond photo spot' },
    access: {
      zh: ['① 地下鐵南北線至「中島公園」站', '② 步行約 3 分鐘即達公園正門'],
      en: ['① Subway Namboku Line to "Nakajima Koen" station', '② Walk ~3 min to park main entrance'],
    },
    link: 'https://www.s-hoheikan.jp/',
  },
  'とんかつ 檍': {
    hours: { zh: '11:30–22:00', en: '11:30–22:00' },
    address: { zh: '札幌市中央区南1条西5丁目', en: 'Minami 1-jo W5, Chuo-ku, Sapporo' },
    rating: { score: '4.2/5', source: 'Google Maps', stars: 4 },
    recommend: { zh: '特上ロースかつ定食 2,500–4,000円；麥飯＋高麗菜無限續', en: 'Premium loin cutlet set ¥2,500–4,000; barley rice + cabbage unlimited refill' },
    link: 'https://tabelog.com/hokkaido/A0101/A010102/1063034/',
  },
  '⭐ 藻岩山展望台': {
    phone: '011-561-8177',
    hours: { zh: '纜車 10:30–22:00（最終上山 21:30）', en: 'Ropeway 10:30–22:00 (last ride up 21:30)' },
    address: { zh: '札幌市南区藻岩山', en: 'Moiwa-yama, Minami-ku, Sapporo' },
    rating: { score: '4.5/5', source: 'Google Maps', stars: 5 },
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
    rating: { score: '4.1/5', source: 'Google Maps', stars: 4 },
    recommend: { zh: '黑毛和牛壽喜燒；備注「不吃生食」請全熟處理；套餐 10,000–15,000円', en: 'Kuroge wagyu sukiyaki; note "fully cooked only" when booking; course ¥10,000–15,000' },
    link: 'https://tabelog.com/hokkaido/A0101/A010103/1003634/',
  },
  // ── Day 5 ──
  'DONGURI': {
    hours: { zh: '07:00–19:00（依店而異）', en: '07:00–19:00 (varies by branch)' },
    address: { zh: '札幌市各處（推薦大通附近店）', en: 'Multiple locations around Sapporo' },
    rating: { score: '4.3/5', source: 'Google Maps', stars: 4 },
    recommend: { zh: '牛角形クロワッサン・豆沙包；日日現烤；早開門是最大優勢', en: 'Horn croissant, red bean bun; baked fresh daily; early opening is the key advantage' },
    link: 'https://tabelog.com/hokkaido/A0101/A010102/1050116/',
  },
  '⭐ 函館山觀景台': {
    phone: '0138-23-6288',
    hours: { zh: '纜車 10:00–22:00（10/16–4/24 至 21:00）；15m/s 強風停駛', en: 'Ropeway 10:00–22:00 (10/16–4/24 until 21:00); stops at 15m/s wind' },
    address: { zh: '函館市函館山', en: 'Hakodate-yama, Hakodate' },
    rating: { score: '4.5/5', source: 'Google Maps', stars: 5 },
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
    rating: { score: '3.9/5', source: 'Google Maps', stars: 4 },
    recommend: { zh: '函館鹽拉麵老舖；透明清湯；あっさり鹽味 800–1,200円', en: 'Hakodate salt ramen institution; clear broth; light & savory ¥800–1,200' },
    link: 'https://tabelog.com/hokkaido/A0105/A010501/1000199/',
  },
  // ── Day 6 ──
  '⭐ 五稜郭展望塔 / 公園': {
    phone: '0138-51-4785',
    hours: { zh: '09:00–18:00（4–10月至19:00）', en: '09:00–18:00 (Apr–Oct until 19:00)' },
    address: { zh: '函館市五稜郭町43-9', en: '43-9 Goryokaku-cho, Hakodate' },
    rating: { score: '4.5/5', source: 'Google Maps', stars: 5 },
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
    rating: { score: '4.4/5', source: 'Google Maps', stars: 4 },
    recommend: { zh: '八幡坂坡道海港透視日落最美；舊函館区公会堂 300円；周邊建築群免費', en: 'Hachiman-zaka sea view best at sunset; Old Public Hall ¥300; surrounding buildings free' },
    access: {
      zh: ['① 市電至「十字街」站（或「末広町」站）下車', '② 步行 5–10 分往山方向即進入元町歷史建築區', '③ 八幡坂・旧公会堂・カトリック元町教会皆在步行範圍內'],
      en: ['① City tram to "Jujigai" or "Suehirocho" stop', '② Walk 5–10 min uphill into Motomachi historical district', '③ Hachimanaka slope, Old Public Hall, Catholic Church all within walking distance'],
    },
    link: 'https://www.hakobura.jp/spots/478',
  },
  // ── Day 8 ──
  '⭐ 登別地獄谷 / 大湯沼川天然足湯': {
    phone: '0143-84-3311',
    hours: { zh: '地獄谷・足湯全日免費開放', en: 'Hell Valley & footbath: free, open all day' },
    address: { zh: '登別市登別温泉町', en: 'Noboribetsu Onsen-cho, Noboribetsu' },
    rating: { score: '4.4/5', source: 'Google Maps', stars: 4 },
    recommend: { zh: '地獄谷免費；足湯免費（帶小毛巾）；現場可領防水坐墊；泉源公園間歇泉每整點噴發', en: 'Hell Valley free; footbath free (bring towel); waterproof mat at entrance; geyser erupts hourly' },
    access: {
      zh: ['① 搭 JR 特急 / 普通列車至登別站（洞爺出發約 20 分）', '② 登別站搭道南バス至登別溫泉巴士總站（約 10 分，票價 380円）', '⚡ 班次每小時 1–2 班，出發前確認時刻表'],
      en: ['① Take JR Limited/Local Express to Noboribetsu Station (~20 min from Toya)', '② Take Donan Bus from station to Noboribetsu Onsen terminal (~10 min, ¥380)', '⚡ ~1–2 buses/hour — check schedule before departing'],
    },
    link: 'https://noboribetsu-spa.jp/',
  },
  // ── Day 7 ──
  '筒倉展望台 Silo': {
    phone: '0142-87-2221',
    hours: { zh: '09:00–17:00（依季節調整；冬季可能縮短）', en: '09:00–17:00 (seasonal; may shorten in winter)' },
    address: { zh: '虻田郡洞爺湖町成香2丁目', en: 'Naruka 2-chome, Toyako-cho, Abuta-gun' },
    rating: { score: '4.0/5', source: 'Google Maps', stars: 4 },
    recommend: { zh: '招牌布丁（限量・售完為止）・圓形穀倉建築 2F 俯瞰洞爺湖全景', en: 'Signature pudding (limited stock) · panoramic Toya Lake view from 2F of round silo' },
    access: {
      zh: ['① 從洞爺站或溫泉街搭計程車約 15 分（1,500–2,000円）', '⚡ 無公車直達；建議電話確認當日是否營業'],
      en: ['① Taxi from Toya Station or onsen area ~15 min (¥1,500–2,000)', '⚡ No direct bus; call ahead to confirm they are open'],
    },
    link: 'https://maps.google.com/?q=筒倉展望台+洞爺湖',
  },
  // ── Day 9 ──
  '一幻拉麵': {
    phone: '011-213-2626',
    hours: { zh: '10:00–21:30（機場店）', en: '10:00–21:30 (airport branch)' },
    address: { zh: '新千歲機場 國內線 3F', en: 'New Chitose Airport Domestic Terminal 3F' },
    rating: { score: '4.3/5', source: 'Google Maps', stars: 4 },
    recommend: { zh: '濃郁蝦味噌拉麵 1,200円；旅程最後一餐；蝦湯濃縮精華', en: 'Rich shrimp miso ramen ¥1,200; perfect final meal; intensely flavored shrimp broth' },
    link: 'https://tabelog.com/hokkaido/A0107/A010701/1034338/',
  },
  // ── Hotels ──
  '索拉瑞亞西鐵酒店 Check-in': {
    phone: '011-272-5005',
    hours: { zh: '入住 15:00 起 / 退房 11:00', en: 'Check-in from 15:00 / Check-out by 11:00' },
    address: { zh: '札幌市中央区南4条西3丁目1-1', en: '1-1 Minami 4-jo W3, Chuo-ku, Sapporo' },
    rating: { score: '8.8/10', source: 'Booking.com', stars: 4 },
    recommend: { zh: '早餐自助（另計 約2,200円/人）：北海道海鮮丼台、毛蟹、乳製品；可當天直接購買；08:00 高峰，建議 07:30 入場或 09:00 後再去', en: 'Breakfast buffet (~¥2,200/person, extra): Hokkaido kaisen-don, crab, dairy; walk-in purchase OK; peak 08:00 — arrive 07:30 or after 09:00' },
    link: 'https://www.nishitetsu.jp/hotel/sapporo/',
  },
  '京王 Prelia 辦入住': {
    phone: '011-261-0311',
    hours: { zh: '入住 15:00 起 / 退房 11:00', en: 'Check-in from 15:00 / Check-out by 11:00' },
    address: { zh: '札幌市中央区北5条西2丁目', en: 'Kita 5-jo W2, Chuo-ku, Sapporo' },
    rating: { score: '4.5/5', source: 'TripAdvisor', stars: 5 },
    recommend: { zh: '早餐（另計 約1,800–2,300円/人）：道產有機蔬菜沙拉、現烤麵包、當季食材；可當天購買；質量勝於份量，種類偏少', en: 'Breakfast (~¥1,800–2,300/person, extra): local organic salad, freshly baked bread, seasonal ingredients; walk-in OK; quality over quantity — limited variety' },
    link: 'https://www.keioprelia.com/sapporo/',
  },
  'Century Marina Hakodate Check-in': {
    phone: '0138-23-2121',
    hours: { zh: '入住 14:00 起 / 退房 11:00', en: 'Check-in from 14:00 / Check-out by 11:00' },
    address: { zh: '函館市大手町22-10', en: '22-10 Otemachi, Hakodate' },
    rating: { score: '8.9/10', source: 'Booking.com', stars: 5 },
    recommend: { zh: '早餐含於住宿（無需另付）：無限刺身台、海鮮丼自選站、函館鮮漁；屋上溫泉可眺望函館港；強烈建議 07:30 入場搶最鮮食材', en: 'Breakfast included (no extra cost): unlimited sashimi, DIY kaisen-don, fresh Hakodate catch; rooftop onsen with harbor view — arrive 07:30 for best selection' },
    link: 'https://www.centurymarina.com/',
  },
  '湖景 TOYA 乃之風渡假酒店 Check-in': {
    phone: '0142-75-2111',
    hours: { zh: '入住 14:00 起 / 退房 11:00', en: 'Check-in from 14:00 / Check-out by 11:00' },
    address: { zh: '虻田郡洞爺湖町洞爺湖温泉29', en: '29 Toyako Onsen, Toyako-cho, Abuta-gun' },
    rating: { score: '4.2/5', source: 'TripAdvisor', stars: 4 },
    recommend: { zh: '晚餐＋早餐含於住宿（一泊二食，無需另付）；自助餐含螃蟹、成吉思汗羊肉、海鮮、道産乳製品；露天風呂正對洞爺湖；每晚 20:45 水上煙火可從客房欣賞', en: 'Dinner + breakfast included (1-night-2-meals plan, no extra cost); buffet: crab, Jingisukan lamb, seafood, local dairy; rotenburo overlooking Toya Lake; nightly fireworks at 20:45 visible from room' },
    link: 'https://nonokaze-resort.com/',
  },
};
