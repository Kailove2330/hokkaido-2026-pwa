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
    title: { zh: '抵達與都會啟動', en: 'Arrival & City Start' },
    steps: 7000,
    phase: 0,
    weatherCity: 'Sapporo',
    items: [
      { time: '08:35', place: { zh: '桃園 T2 出發', en: 'Taoyuan T2 Depart' }, duration: '—', note: { zh: 'CI130 商務艙', en: 'CI130 Business' }, maps: null, warn: false },
      { time: '13:35', place: { zh: '新千歲機場 第 I 航廈', en: 'New Chitose Airport T-I' }, duration: '60min', note: { zh: '⚡ 出關後立刻 JR 窗口劃位：5/18 北斗號 D 席（右側海景）', en: '⚡ Right after customs: reserve Hokuto D-seat for 5/18 (sea view)' }, maps: 'https://maps.google.com/?q=New+Chitose+Airport', warn: true },
      { time: '14:40', place: { zh: 'IC 卡 + JR 快速機場線', en: 'IC Card + JR Airport Express' }, duration: '40min', note: { zh: 'PASMO/Suica 購入；車資約 1,150円', en: 'Buy PASMO/Suica; ~¥1,150' }, maps: null, warn: false },
      { time: '15:30', place: { zh: '索拉瑞亞西鐵酒店 Check-in', en: 'Solaria Nishitetsu Check-in' }, duration: '30min', note: { zh: '行李寄放換輕裝', en: 'Drop luggage, change to light wear' }, maps: 'https://maps.google.com/?q=Solaria+Nishitetsu+Hotel+Sapporo', warn: false },
      { time: '16:00', place: { zh: '狸小路商店街 預覽', en: 'Tanukikoji Shopping St.' }, duration: '40min', note: { zh: '藥妝先比價，不急著買', en: 'Price-check only, buy later' }, maps: 'https://maps.google.com/?q=Tanukikoji+Shopping+Street+Sapporo', warn: false },
      { time: '16:40', place: { zh: '🍖【晚餐】達摩 5.5 店（成吉思汗）', en: '🍖 Daruma 5.5 (Genghis Khan BBQ)' }, duration: '90min', note: { zh: '⚡ 16:40 最後截止！沒進第一輪等 1 小時起；烤羊 2,500–3,500円/人', en: '⚡ 16:40 is last call! Miss round 1 = 1hr+ wait; lamb ¥2,500–3,500/person' }, maps: 'https://maps.google.com/?q=Daruma+Sapporo+Genghis+Khan', warn: true },
      { time: '19:00', place: { zh: '狸小路夜逛', en: 'Tanukikoji Night Walk' }, duration: '60min', note: { zh: '藥妝比價（松本清、SUNDRUG、Welcia）', en: 'Drugstore compare: Matsumoto Kiyoshi, SUNDRUG, Welcia' }, maps: null, warn: false },
    ],
    mealBudget: { zh: '晚餐 3,000–4,000円／人', en: 'Dinner ¥3,000–4,000/person' },
    shopping: null,
  },
  {
    day: 2,
    date: { zh: '5/15（五）', en: '5/15 Fri' },
    title: { zh: '小樽靜謐慢遊', en: 'Otaru Slow Day' },
    steps: 13000,
    phase: 0,
    weatherCity: 'Sapporo',
    items: [
      { time: '08:30', place: { zh: 'JR 札幌站出發', en: 'JR Sapporo Depart' }, duration: '50min', note: { zh: '至小樽約 750円（IC）', en: 'To Otaru ~¥750 (IC)' }, maps: 'https://maps.google.com/?q=Sapporo+Station', warn: false },
      { time: '09:45', place: { zh: '北一硝子 三號館', en: 'Kitaichi Glass No.3' }, duration: '60–90min', note: { zh: '煤油燈咖啡廳（禁閃光燈/腳架）；手作玻璃杯 3,000–8,000円', en: 'Kerosene lamp café (no flash/tripod); handmade glass ¥3,000–8,000' }, maps: 'https://maps.google.com/?q=Kitaichi+Glass+No3+Otaru', warn: false },
      { time: '11:00', place: { zh: '堺町通商店街', en: 'Sakaimachi Street' }, duration: '60min', note: { zh: 'LeTAO 本店：起司夾心餅乾 500–800円；乳酪蛋糕留機場買', en: 'LeTAO main: cheese biscuits ¥500–800; cheesecake → buy at airport' }, maps: 'https://maps.google.com/?q=LeTAO+Otaru', warn: false },
      { time: '12:00', place: { zh: '🍜【午餐】藪半 或 小樽食堂', en: '🍜 Lunch: Yabu-han or Otaru Shokudo' }, duration: '60min', note: { zh: '蕎麥麵套餐 1,800–2,800円；海鮮丼 2,000–3,500円', en: 'Soba set ¥1,800–2,800; seafood bowl ¥2,000–3,500' }, maps: 'https://maps.google.com/?q=Yabu-han+Otaru', warn: false },
      { time: '13:30', place: { zh: '小樽運河北端散步', en: 'Otaru Canal North Walk' }, duration: '45min', note: { zh: '先踩點，16:00 後點燈最美', en: 'Scout first; best after 16:00 when lanterns lit' }, maps: 'https://maps.google.com/?q=Otaru+Canal', warn: false },
      { time: '14:30', place: { zh: '舊手宮線遺跡', en: 'Old Temiya Line' }, duration: '45min', note: { zh: '免費鐵軌散步道', en: 'Free historic rail path' }, maps: 'https://maps.google.com/?q=旧手宮線+小樽', warn: false },
      { time: '16:00', place: { zh: '⭐ 小樽運河點燈', en: '⭐ Otaru Canal Lantern Hour' }, duration: '45min', note: { zh: '⚡ 黃金窗口 16:00–17:00', en: '⚡ Golden window 16:00–17:00' }, maps: 'https://maps.google.com/?q=Otaru+Canal', warn: true },
      { time: '17:00', place: { zh: 'JR 返回札幌', en: 'JR Back to Sapporo' }, duration: '50min', note: null, maps: null, warn: false },
      { time: '18:30', place: { zh: '🍛【晚餐】奧芝商店 站前創成寺', en: '🍛 Okura Shoten Soup Curry' }, duration: '90min', note: { zh: '海老出汁スープカレー 1,500–2,200円；18:00 前到排隊', en: 'Shrimp broth soup curry ¥1,500–2,200; arrive before 18:00' }, maps: 'https://maps.google.com/?q=奥芝商店+札幌', warn: false },
    ],
    mealBudget: { zh: '午餐 2,000–3,000円 + 晚餐 2,000円／人', en: 'Lunch ¥2,000–3,000 + Dinner ¥2,000/person' },
    shopping: { zh: 'LeTAO 起司夾心餅乾、北一硝子玻璃杯', en: 'LeTAO cheese biscuits, Kitaichi glass (wrap well)' },
  },
  {
    day: 3,
    date: { zh: '5/16（六）', en: '5/16 Sat' },
    title: { zh: '歐風美學與百萬夜景', en: 'European Aesthetic & Night View' },
    steps: 15000,
    phase: 0,
    weatherCity: 'Sapporo',
    items: [
      { time: '08:30', place: { zh: '飯店早餐', en: 'Hotel Breakfast' }, duration: '45min', note: null, maps: null, warn: false },
      { time: '10:00', place: { zh: '退房 → 行李寄存京王 Prelia', en: 'Check-out → Luggage to Keio Prelia' }, duration: '30min', note: { zh: '請飯店代管至 check-in', en: 'Ask hotel to hold until check-in' }, maps: 'https://maps.google.com/?q=Keio+Prelia+Hotel+Sapporo', warn: false },
      { time: '10:30', place: { zh: '⭐ 白色戀人公園', en: '⭐ Shiroi Koibito Park' }, duration: '90min', note: { zh: '⚡ 線上提前購票（1,000円）；工廠限定包裝 2,200–3,500円', en: '⚡ Pre-buy online (¥1,000); factory-limited box ¥2,200–3,500' }, maps: 'https://maps.google.com/?q=Shiroi+Koibito+Park+Sapporo', warn: true },
      { time: '12:00', place: { zh: '🍕【午餐】公園玫瑰廳 或 市區拉麵', en: '🍕 Lunch: Rose Hall or city ramen' }, duration: '60min', note: { zh: '輕食套餐 1,200–1,800円；拉麵 800–1,200円', en: 'Light set ¥1,200–1,800; ramen ¥800–1,200' }, maps: null, warn: false },
      { time: '13:30', place: { zh: '北海道大學', en: 'Hokkaido University' }, duration: '60min', note: { zh: '白楊木林道（ポプラ並木）、歐式建築，免費', en: 'Poplar avenue, European buildings — free' }, maps: 'https://maps.google.com/?q=Hokkaido+University', warn: false },
      { time: '15:00', place: { zh: '北海道神宮', en: 'Hokkaido Jingu Shrine' }, duration: '45min', note: { zh: '⚡ 抵達後優先買「判官さま」現烤麻糬（限量，4 點後易售罄）300円', en: '⚡ Buy "Hangan-sama" grilled mochi first on arrival — sells out after 16:00, ¥300' }, maps: 'https://maps.google.com/?q=Hokkaido+Jingu+Shrine', warn: true },
      { time: '16:00', place: { zh: '京王 Prelia 辦入住', en: 'Keio Prelia Check-in' }, duration: '60min', note: { zh: '換輕裝準備上山', en: 'Change to warm layers for ropeway' }, maps: 'https://maps.google.com/?q=Keio+Prelia+Hotel+Sapporo', warn: false },
      { time: '17:30', place: { zh: '⭐ 藻岩山纜車 + 展望台（夜景）', en: '⭐ Mt. Moiwa Ropeway + Observatory' }, duration: '90min', note: { zh: '⚡ 山頂風強、溫差大，帶防風外套；來回 2,100円；5 月日落 18:30', en: '⚡ Strong wind at top — bring windproof jacket; ¥2,100 round trip; sunset ~18:30' }, maps: 'https://maps.google.com/?q=Mt+Moiwa+Ropeway+Sapporo', warn: true },
      { time: '19:30', place: { zh: '🥩【晚餐】和牛いしざき（預約制）', en: '🥩 Wagyu Ishizaki (reservation req.)' }, duration: '120min', note: { zh: '⭐️ 頂級和牛壽喜燒 8,000–15,000円；⚡ 提前 2–3 週 Tablecheck 預約', en: '⭐️ Premium wagyu sukiyaki ¥8,000–15,000; ⚡ Reserve 2–3 weeks ahead on Tablecheck' }, maps: 'https://maps.google.com/?q=和牛いしざき+札幌', warn: true },
    ],
    mealBudget: { zh: '午餐 1,500円 + 晚餐 10,000–15,000円／人', en: 'Lunch ¥1,500 + Dinner ¥10,000–15,000/person' },
    shopping: { zh: '白色戀人工廠限定包裝、北海道神宮御守', en: 'Shiroi Koibito factory box, Hokkaido Jingu omamori' },
  },
  {
    day: 4,
    date: { zh: '5/17（日）', en: '5/17 Sun' },
    title: { zh: '集中採購 & 裝備重組', en: 'Shopping Day & Repack' },
    steps: 10000,
    phase: 0,
    weatherCity: 'Sapporo',
    items: [
      { time: '09:30', place: { zh: '大丸百貨 B1 食品館', en: 'Daimaru B1 Food Hall' }, duration: '60min', note: { zh: '六花亭、北菓樓、ROYCE\'一次解決', en: 'Rokkatei, Kitakaro, ROYCE\' all here' }, maps: 'https://maps.google.com/?q=Daimaru+Sapporo', warn: false },
      { time: '10:30', place: { zh: 'Stellar Place B1', en: 'Stellar Place B1' }, duration: '60min', note: { zh: '蜂蜜、昆布、限定零食補清單', en: 'Honey, kombu, limited snacks' }, maps: 'https://maps.google.com/?q=Stellar+Place+Sapporo', warn: false },
      { time: '12:00', place: { zh: '🍣【午餐】鮨处 やまじん 或 一幻拉麵', en: '🍣 Lunch: Yamajin Sushi or Ichigen Ramen' }, duration: '60min', note: { zh: '迴轉壽司 1,500–2,500円；一幻蝦味噌拉麵 1,200円', en: 'Conveyor sushi ¥1,500–2,500; shrimp miso ramen ¥1,200' }, maps: 'https://maps.google.com/?q=一幻+札幌', warn: false },
      { time: '13:00', place: { zh: '☕ 六花亭 札幌本店 2F 咖啡廳', en: '☕ Rokkatei Main Store 2F Café' }, duration: '60min', note: { zh: '⚡ 13:00 前抽號碼牌（不預約）；蛋糕套餐 1,000–1,500円', en: '⚡ Get ticket before 13:00 (no reservation); cake set ¥1,000–1,500' }, maps: 'https://maps.google.com/?q=六花亭+札幌本店', warn: true },
      { time: '14:30', place: { zh: 'APIA / PARCO / 赤レンガテラス', en: 'APIA / PARCO / AkaRenga Terrace' }, duration: '90min', note: { zh: '北菓樓妖精の森年輪蛋糕（整條 2,500円）、開拓米果', en: 'Kitakaro Elf Forest baumkuchen (¥2,500); Kaitaku rice crackers' }, maps: 'https://maps.google.com/?q=PARCO+Sapporo', warn: false },
      { time: '17:00', place: { zh: '⚡【死線】飯店宅急便手續', en: '⚡ DEADLINE: Baggage forwarding at hotel' }, duration: '30min', note: { zh: '機場宅急便（大行李 5/22 機場領）；費用 1,500–2,500円/件', en: 'Yamato airport delivery — pick up 5/22; ¥1,500–2,500/bag' }, maps: null, warn: true },
      { time: '17:30', place: { zh: '打包清點（後半程輕裝）', en: 'Repack (light load for Phase 2–3)' }, duration: '60min', note: { zh: '伴手禮 80% 統一宅配，後段只帶換洗', en: '80% of souvenirs go via delivery — travel light after today' }, maps: null, warn: false },
      { time: '19:00', place: { zh: '🦀【晚餐】かに将軍 札幌本店', en: '🦀 Dinner: Kani Shogun Sapporo' }, duration: '120min', note: { zh: '螃蟹套餐 8,000–15,000円；建議提前預約（かに本家若有位優先）', en: 'Crab course ¥8,000–15,000; reserve ahead (Kani Honke if available)' }, maps: 'https://maps.google.com/?q=かに将軍+札幌', warn: false },
    ],
    mealBudget: { zh: '午餐 2,000円 + 咖啡廳 1,000円 + 晚餐 10,000–15,000円／人', en: 'Lunch ¥2,000 + café ¥1,000 + dinner ¥10,000–15,000/person' },
    shopping: { zh: '六花亭 丸成奶油三明治・奶油葡萄夾心｜北菓樓 妖精之森年輪蛋糕・開拓米果', en: 'Rokkatei Marusei Butter Sand・Cream Grape｜Kitakaro Elf Forest Baumkuchen・Kaitaku Crackers' },
  },
  {
    day: 5,
    date: { zh: '5/18（一）', en: '5/18 Mon' },
    title: { zh: '輕裝南下 → 函館', en: 'South to Hakodate' },
    steps: 8000,
    phase: 1,
    weatherCity: 'Hakodate',
    items: [
      { time: '08:30', place: { zh: 'JR 札幌站 購車站便當', en: 'JR Sapporo Station — Buy Ekiben' }, duration: '20min', note: { zh: '「海の輝き」或「北海道エゾ鹿」1,500–2,000円', en: '"Umi no Kagayaki" or "Ezo Deer" bento ¥1,500–2,000' }, maps: 'https://maps.google.com/?q=Sapporo+Station', warn: false },
      { time: '09:00', place: { zh: '⭐ JR 特急北斗號 出發', en: '⭐ JR Hokuto Limited Express Depart' }, duration: '210min', note: { zh: '⚡ D 席右側飽覽內浦灣；全車指定席；車資 ~9,000円', en: '⚡ D-seat right side = Uchiura Bay view; all reserved; ~¥9,000' }, maps: null, warn: true },
      { time: '12:00', place: { zh: '🍱【午餐】車上享用便當', en: '🍱 Lunch: Ekiben on train' }, duration: '30min', note: { zh: '配內浦灣海景', en: 'With Uchiura Bay views' }, maps: null, warn: false },
      { time: '12:35', place: { zh: 'JR 函館站 抵達', en: 'JR Hakodate Station Arrive' }, duration: '30min', note: { zh: 'Century Marina 可提前寄放行李', en: 'Century Marina holds luggage before check-in' }, maps: 'https://maps.google.com/?q=Hakodate+Station', warn: false },
      { time: '13:30', place: { zh: '金森紅磚倉庫', en: 'Kanemori Red Brick Warehouse' }, duration: '60min', note: { zh: '明治大正紅磚群，免費；內有咖啡廳', en: 'Meiji-era brick warehouses, free; cafés inside' }, maps: 'https://maps.google.com/?q=Kanemori+Red+Brick+Warehouse+Hakodate', warn: false },
      { time: '14:00', place: { zh: 'Century Marina Hakodate Check-in', en: 'Century Marina Hakodate Check-in' }, duration: '30min', note: { zh: '指定高層靠海側', en: 'Request high floor, sea-facing room' }, maps: 'https://maps.google.com/?q=Century+Marina+Hakodate', warn: false },
      { time: '17:30', place: { zh: '⭐ 函館山纜車（百萬夜景）', en: '⭐ Mt. Hakodate Ropeway (Night View)' }, duration: '90min', note: { zh: '⚡ 出發前查官網風力（15m/s 停駛）；來回 1,500円；山頂比市區冷 5–8°C', en: '⚡ Check wind speed on official site before going (stops at 15m/s); ¥1,500 RT; top is 5–8°C colder' }, maps: 'https://maps.google.com/?q=函館山ロープウェイ', warn: true },
      { time: '20:00', place: { zh: '🍔【晚餐】幸運小丑漢堡 碼頭末廣店', en: '🍔 Lucky Pierrot Suehiro Branch' }, duration: '60min', note: { zh: '中華雞腿堡 580円；函館限定品牌', en: 'Chinese Chicken Burger ¥580; Hakodate-only chain' }, maps: 'https://maps.google.com/?q=Lucky+Pierrot+Hakodate+Suehiro', warn: false },
    ],
    mealBudget: { zh: '便當 2,000円 + 晚餐 1,000円／人', en: 'Ekiben ¥2,000 + dinner ¥1,000/person' },
    shopping: { zh: '幸運小丑漢堡 原創咖哩調理包 / 紀念杯', en: 'Lucky Pierrot original curry pack / souvenir cup' },
  },
  {
    day: 6,
    date: { zh: '5/19（二）', en: '5/19 Tue' },
    title: { zh: '歷史建築與星型要塞', en: 'Historic Hakodate & Goryokaku' },
    steps: 14000,
    phase: 1,
    weatherCity: 'Hakodate',
    items: [
      { time: '08:30', place: { zh: '🍳【早午餐】Century Marina 自助餐', en: '🍳 Brunch: Century Marina Buffet' }, duration: '90min', note: { zh: '★4.5+ 評比；海鮮 + 乳製品；含於住宿', en: '★4.5+ rated; seafood + dairy; included in stay' }, maps: null, warn: false },
      { time: '11:00', place: { zh: '函館朝市 + 現釣烏賊體驗', en: 'Hakodate Morning Market + Live Squid' }, duration: '60min', note: { zh: '⚡ 現釣活烏賊 1,500円起（即刻處理刺身）；朝市どんぶり横丁', en: '⚡ Live squid fishing ¥1,500+ (served as sashimi immediately); Donburi Alley' }, maps: 'https://maps.google.com/?q=Hakodate+Morning+Market', warn: true },
      { time: '13:00', place: { zh: '⭐ 五稜郭公園 + 五稜郭塔', en: '⭐ Goryokaku Park + Tower' }, duration: '90min', note: { zh: '⚡ 塔頂展望台 900円（★必上）；5 月上旬可能有晚開的染井吉野櫻', en: '⚡ Tower observation ¥900 (★must do); late cherry blossoms possible in early May' }, maps: 'https://maps.google.com/?q=Goryokaku+Tower+Hakodate', warn: true },
      { time: '15:00', place: { zh: '☕ 六花亭 五稜郭店', en: '☕ Rokkatei Goryokaku Branch' }, duration: '60min', note: { zh: '落地窗對公園；蛋糕 + 飲料 1,000–1,500円', en: 'Floor-to-ceiling windows facing park; cake set ¥1,000–1,500' }, maps: 'https://maps.google.com/?q=六花亭+五稜郭', warn: false },
      { time: '16:30', place: { zh: '元町西洋建築群', en: 'Motomachi Western Buildings' }, duration: '60min', note: { zh: '舊區公會堂 300円；哈里斯托斯正教會；聖約翰教堂', en: 'Old Public Hall ¥300; Haristosu Orthodox Church; St. John\'s Church' }, maps: 'https://maps.google.com/?q=Motomachi+Hakodate', warn: false },
      { time: '17:00', place: { zh: '⭐ 八幡坂', en: '⭐ Hachiman-zaka Slope' }, duration: '30min', note: { zh: '⚡ 注意車流；日落光線 17:30–18:30 最佳', en: '⚡ Watch for traffic; best light 17:30–18:30' }, maps: 'https://maps.google.com/?q=Hachiman-zaka+Hakodate', warn: true },
      { time: '19:00', place: { zh: '🥩【晚餐】阿佐利本店（預約制）', en: '🥩 Asari Main (reservation req.)' }, duration: '120min', note: { zh: '⭐️ 黑毛和牛壽喜燒 8,000–14,000円；⚡ 務必提前預約', en: '⭐️ Kuroge wagyu sukiyaki ¥8,000–14,000; ⚡ reservation essential' }, maps: 'https://maps.google.com/?q=阿佐利本店+函館', warn: true },
    ],
    mealBudget: { zh: '朝市 500–1,000円 + 午茶 1,200円 + 晚餐 10,000–14,000円／人', en: 'Market ¥500–1,000 + café ¥1,200 + dinner ¥10,000–14,000/person' },
    shopping: { zh: "SNAFFLE'S 起司歐姆蕾蛋糕 Catchcakes（6 入 1,296円，需冷藏）", en: "SNAFFLE'S Cheese Omelette Cake Catchcakes (6pc ¥1,296, refrigerate)" },
  },
  {
    day: 7,
    date: { zh: '5/20（三）', en: '5/20 Wed' },
    title: { zh: '湖光山色 → 洞爺湖', en: 'Lake Toya Arrival' },
    steps: 6000,
    phase: 2,
    weatherCity: 'Toyako',
    items: [
      { time: '07:00', place: { zh: '函館朝市早餐', en: 'Hakodate Market Breakfast' }, duration: '60min', note: { zh: '⚡ 專攻「現烤蟹腳（毛蟹）」與「奶油烤扇貝（帆立貝バター焼き）」各 300–500円；避開生食區', en: '⚡ Target: grilled crab legs + butter scallops ¥300–500 each; avoid raw food' }, maps: 'https://maps.google.com/?q=Hakodate+Morning+Market', warn: true },
      { time: '08:00', place: { zh: '退房 → JR 函館站置物櫃', en: 'Check-out → Station Lockers' }, duration: '20min', note: { zh: '400–800円/次', en: '¥400–800 per slot' }, maps: 'https://maps.google.com/?q=Hakodate+Station', warn: false },
      { time: '09:48', place: { zh: 'JR 特急北斗號 出發（→ 洞爺站）', en: 'JR Hokuto → Toya Station' }, duration: '114min', note: { zh: '洞爺站下車；車資 ~4,000–5,000円', en: 'Exit at Toya; ~¥4,000–5,000' }, maps: null, warn: false },
      { time: '11:42', place: { zh: '洞爺站 → 道南バス', en: 'Toya Station → Donan Bus' }, duration: '20min', note: { zh: '⚡ 備現金硬幣（整理券制，260円）；班次稀疏，確認班表', en: '⚡ Cash coins required (numbered ticket, ¥260); infrequent — check timetable' }, maps: 'https://maps.google.com/?q=Toya+Station', warn: true },
      { time: '12:30', place: { zh: '🍜【午餐】溫泉街食堂', en: '🍜 Lunch: Onsen Town Diner' }, duration: '60min', note: { zh: '湖畔亭 或 LAWSON；拉麵 900–1,200円', en: 'Kohatei or LAWSON; ramen ¥900–1,200' }, maps: null, warn: false },
      { time: '14:00', place: { zh: '洞爺湖 遊覧船（選做）', en: 'Lake Toya Cruise (optional)' }, duration: '60min', note: { zh: '中島遊覧 1,800円；5 月鹿群出沒機率高', en: 'Nakashima cruise ¥1,800; deer sightings common in May' }, maps: 'https://maps.google.com/?q=Lake+Toya+Cruise', warn: false },
      { time: '15:00', place: { zh: '乃之風渡假酒店 Check-in', en: 'Lake View Toya Nonokaze Check-in' }, duration: '30min', note: { zh: '湖景露天風呂，指定湖景側', en: 'Request lake-view room; open-air hot spring' }, maps: 'https://maps.google.com/?q=Lake+View+Toya+Nonokaze+Resort', warn: false },
      { time: '18:30', place: { zh: '🍽️【晚餐】乃之風 波之音自助餐', en: '🍽️ Dinner: Nonokaze Buffet (included)' }, duration: '90min', note: { zh: '含於住宿；蟹腿 / 羊肉 / 海鮮', en: 'Included in stay; crab legs, lamb, seafood' }, maps: null, warn: false },
      { time: '20:45', place: { zh: '⭐ 洞爺湖水上煙火', en: '⭐ Lake Toya Fireworks' }, duration: '45min', note: { zh: '4/28–10/31 每晚 20:45（雨天取消）；從客房或風呂觀賞', en: '4/28–10/31 nightly at 20:45 (cancelled if rainy); watch from room or rotenburo' }, maps: null, warn: false },
    ],
    mealBudget: { zh: '朝市早餐 1,500円 + 午餐 1,000円；晚餐含於住宿', en: 'Market breakfast ¥1,500 + lunch ¥1,000; dinner included' },
    shopping: null,
  },
  {
    day: 8,
    date: { zh: '5/21（四）', en: '5/21 Thu' },
    title: { zh: '活火山地景', en: 'Active Volcano Landscape' },
    steps: 7000,
    phase: 2,
    weatherCity: 'Toyako',
    items: [
      { time: '08:30', place: { zh: '飯店早餐（含於住宿）', en: 'Hotel Breakfast (included)' }, duration: '60min', note: { zh: '湖景早餐，從容享用', en: 'Lakeside breakfast — take your time' }, maps: null, warn: false },
      { time: '10:00', place: { zh: '計程車 → 有珠山纜車', en: 'Taxi → Mt. Usu Ropeway' }, duration: '10min', note: { zh: '⚡ 飯店叫計程車（往返 ~3,000–4,000円）', en: '⚡ Ask hotel to arrange taxi (round trip ~¥3,000–4,000)' }, maps: 'https://maps.google.com/?q=Mt+Usu+Ropeway', warn: true },
      { time: '10:15', place: { zh: '⭐ 有珠山纜車 + 展望台', en: '⭐ Mt. Usu Ropeway + Observatory' }, duration: '90min', note: { zh: '纜車來回 1,800円；多留 30 分放空（洞爺湖全景）；步道另 +30 分', en: 'Ropeway ¥1,800 RT; linger 30min on platform (full lake view); trail adds 30min' }, maps: 'https://maps.google.com/?q=Mt+Usu+Ropeway', warn: false },
      { time: '12:00', place: { zh: '火口原展望台健行（選做）', en: 'Crater Observatory Trail (optional)' }, duration: '45min', note: { zh: '2000 年噴火遺跡；廢棄民宅遺構，免費', en: '2000 eruption ruins; abandoned houses — free' }, maps: null, warn: false },
      { time: '13:00', place: { zh: '🍜【午餐】噴火亭', en: '🍜 Lunch: Funkatei' }, duration: '60min', note: { zh: '火山ラーメン 1,200円；湖畔景觀', en: 'Volcano ramen ¥1,200; lakeside setting' }, maps: 'https://maps.google.com/?q=噴火亭+洞爺湖', warn: false },
      { time: '14:30', place: { zh: '⭐ 昭和新山', en: '⭐ Showa-Shinzan Volcano' }, duration: '60min', note: { zh: '1943–1945 年從田地裂出；免費；熊牧場（選做，900円）', en: 'Rose from farmland 1943–1945; free; bear farm optional ¥900' }, maps: 'https://maps.google.com/?q=Showa+Shinzan', warn: false },
      { time: '16:00', place: { zh: '計程車返回溫泉街', en: 'Taxi back to Onsen Town' }, duration: '20min', note: { zh: '提前跟飯店確認班次', en: 'Confirm with hotel in advance' }, maps: null, warn: false },
      { time: '17:00', place: { zh: '露天風呂（最後一次）', en: 'Open-air Hot Spring (last time)' }, duration: '90min', note: null, maps: null, warn: false },
      { time: '18:30', place: { zh: '🍽️【晚餐】乃之風 波之音自助餐', en: '🍽️ Dinner: Nonokaze Buffet (included)' }, duration: '90min', note: { zh: '含於住宿', en: 'Included in stay' }, maps: null, warn: false },
      { time: '20:45', place: { zh: '⭐ 洞爺湖水上煙火（最後場）', en: '⭐ Lake Toya Fireworks (last night)' }, duration: '45min', note: null, maps: null, warn: false },
    ],
    mealBudget: { zh: '早 + 晚含於住宿；午餐 1,200円；計程車 3,000–4,000円（來回）', en: 'Breakfast & dinner included; lunch ¥1,200; taxi ¥3,000–4,000 RT' },
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
      { time: '08:30', place: { zh: '飯店早餐（最後一次和食）', en: 'Final Japanese Breakfast' }, duration: '60min', note: null, maps: null, warn: false },
      { time: '10:00', place: { zh: '退房 → 計程車至 JR 洞爺站', en: 'Check-out → Taxi to Toya Station' }, duration: '20min', note: { zh: '車資 ~1,500円', en: '~¥1,500' }, maps: 'https://maps.google.com/?q=Toya+Station', warn: false },
      { time: '10:47', place: { zh: 'JR 特急北斗號 → 南千歲', en: 'JR Hokuto → Minami-Chitose' }, duration: '90min', note: { zh: '車資 ~4,000–5,000円', en: '~¥4,000–5,000' }, maps: null, warn: false },
      { time: '12:17', place: { zh: '南千歲 → 快速機場線', en: 'Minami-Chitose → Airport Express' }, duration: '5min', note: null, maps: null, warn: false },
      { time: '12:30', place: { zh: '新千歲機場 第 I 航廈 到達', en: 'New Chitose Airport T-I Arrive' }, duration: '15min', note: { zh: '⚡ 立刻找黑貓（Yamato）櫃檯領大件行李（憑 5/17 單據）', en: '⚡ Find Yamato counter immediately — collect luggage with 5/17 receipt' }, maps: 'https://maps.google.com/?q=New+Chitose+Airport', warn: true },
      { time: '13:00', place: { zh: '🍱【午餐】豚丼名人', en: '🍱 Lunch: Butadon Meijin' }, duration: '45min', note: { zh: '帯廣豚丼 1,200–1,500円', en: 'Obihiro pork rice bowl ¥1,200–1,500' }, maps: 'https://maps.google.com/?q=豚丼名人+新千歳空港', warn: false },
      { time: '13:45', place: { zh: '🛍️ 機場最後採買', en: '🛍️ Final Airport Shopping' }, duration: '60min', note: { zh: '見伴手禮頁「機場限定」區', en: 'See Souvenirs tab — Airport Limited section' }, maps: null, warn: false },
      { time: '14:45', place: { zh: '安全檢查 / 出境', en: 'Security & Departure' }, duration: '20min', note: { zh: '商務艙快速通道', en: 'Business class fast-track' }, maps: null, warn: false },
      { time: '15:05', place: { zh: '✈️ CI131 出發 → 桃園 18:15 抵達', en: '✈️ CI131 Depart → Taoyuan arr. 18:15' }, duration: '190min', note: { zh: '商務艙 A321neo', en: 'Business A321neo' }, maps: null, warn: false },
    ],
    mealBudget: { zh: '午餐 1,500円', en: 'Lunch ¥1,500' },
    shopping: null,
  },
];

// ── SOUVENIRS ──────────────────────────────────────────────
const SOUVENIRS = [
  {
    category: { zh: '📍 小樽（Day 2）', en: '📍 Otaru (Day 2)' },
    items: [
      { id: 's1', name: { zh: 'LeTAO 起司夾心餅乾（色內通系列）', en: 'LeTAO Cheese Biscuits (Irouchi-dori)' }, price: '500–800円', cold: false, airport: false, note: { zh: '小樽本店種類最齊', en: 'Best selection at Otaru main store' } },
      { id: 's2', name: { zh: 'LeTAO THÉNOIR 大吉嶺紅茶巧克力夾心', en: 'LeTAO THÉNOIR Darjeeling Chocolate' }, price: '—', cold: false, airport: false, note: { zh: '小樽本店限定', en: 'Otaru main store exclusive' } },
      { id: 's3', name: { zh: '北一硝子 手作玻璃杯', en: 'Kitaichi Glass Handmade Cup' }, price: '3,000–8,000円', cold: false, airport: false, note: { zh: '請店家加強包裝', en: 'Ask for extra wrapping' } },
    ]
  },
  {
    category: { zh: '📍 白色戀人公園（Day 3）', en: '📍 Shiroi Koibito Park (Day 3)' },
    items: [
      { id: 's4', name: { zh: '白色戀人 工廠限定包裝', en: 'Shiroi Koibito Factory Limited Box' }, price: '2,200–3,500円', cold: false, airport: false, note: { zh: '市區店買不到的特殊包裝', en: 'Packaging exclusive to the park' } },
    ]
  },
  {
    category: { zh: '📍 札幌 Day 3–4（核心戰場）', en: '📍 Sapporo Day 3–4 (Core Shopping)' },
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
    items: [
      { id: 's10', name: { zh: "SNAFFLE'S 起司歐姆蕾蛋糕 Catchcakes", en: "SNAFFLE'S Cheese Omelette Catchcakes" }, price: '1,296円 / 6入', cold: true, airport: false, note: { zh: '需冷藏，3 天賞味期限', en: 'Refrigerate, 3-day shelf life' } },
    ]
  },
  {
    category: { zh: '✈️ 新千歲機場（Day 9）— 限定品優先', en: '✈️ New Chitose Airport (Day 9) — Exclusives First' },
    items: [
      { id: 's11', name: { zh: 'Calbee 薯條三兄弟（北海道奶油口味）', en: 'Calbee Jaga Pokkuru (Hokkaido Butter)' }, price: '900円/盒', cold: false, airport: true, note: { zh: '⚡ 國際線安檢後限定，市區找不到', en: '⚡ International terminal AFTER security only — not sold in city' } },
      { id: 's12', name: { zh: 'ROYCE\' 生巧克力（牛奶口味）', en: "ROYCE' Nama Chocolate (Milk)" }, price: '800–1,200円', cold: true, airport: true, note: { zh: '⚡ 安檢後免稅店買，購買保冷袋（300円）', en: '⚡ Buy AFTER security at duty-free; add cold pack (¥300)' } },
      { id: 's13', name: { zh: 'LeTAO 乳酪蛋糕（Double Fromage）', en: 'LeTAO Double Fromage Cheesecake' }, price: '2,000円', cold: true, airport: false, note: { zh: '需保冷袋；冷凍可保 2 週', en: 'Requires cold bag; freezes for 2 weeks' } },
      { id: 's14', name: { zh: 'ISHIYA 白雪戀人 聯名禮盒', en: 'ISHIYA Yukikoibito Gift Box' }, price: '—', cold: false, airport: true, note: { zh: '北海道 7 大機場限定包裝，送禮最體面', en: 'Exclusive to 7 Hokkaido airports — premium gift option' } },
      { id: 's15', name: { zh: '辻口博啓 北海道牛奶 カステラ', en: 'Tsujiguchi Hokkaido Milk Castella' }, price: '—', cold: false, airport: true, note: { zh: '新千歲 3F 聯絡通道「微笑之路」實體限定', en: 'New Chitose 3F Smile Road exclusive — physical store only' } },
      { id: 's16', name: { zh: 'LeTAO まあある ブランシェール', en: 'LeTAO Maaru Blanchere' }, price: '—', cold: false, airport: true, note: { zh: '機場 LeTAO 限定隱藏版白巧克力堅果脆餅', en: 'Airport LeTAO exclusive — white choc nut crisp' } },
      { id: 's17', name: { zh: 'Yoshimi Oh! 燒玉米（Yakibi）', en: 'Yoshimi Oh! Roasted Corn' }, price: '700円', cold: false, airport: false, note: null },
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
    { route: { zh: '洞爺 → 南千歲', en: 'Toya → Minami-Chitose' }, train: { zh: '特急 北斗號', en: 'Limited Exp. Hokuto' }, time: '1時間30分', fare: '~4,500円', note: { zh: '南千歲換快速機場線', en: 'Transfer to Airport Rapid' } },
  ],
  local: [
    { city: { zh: '札幌', en: 'Sapporo' }, desc: { zh: '地下鉄 3 線（南北・東西・東豊）；Suica 可用；1 日券 830円', en: 'Subway 3 lines; Suica OK; 1-day pass ¥830' } },
    { city: { zh: '函館', en: 'Hakodate' }, desc: { zh: '市電 2 系統（2 号・5 号）；1 日券 600円；五稜郭公園前站步行 15 分', en: 'Trams 2 lines; 1-day ¥600; Goryokaku-Koen-mae → 15min walk' } },
    { city: { zh: '洞爺湖', en: 'Lake Toya' }, desc: { zh: '道南バス（整理券制，硬幣現金）；班次稀疏；飯店叫計程車更方便', en: 'Donan Bus (cash coins, numbered ticket); infrequent — hotel taxi easier' } },
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
      { id: 'c8', text: { zh: '白色戀人公園 線上購票（1,000円）', en: 'Buy Shiroi Koibito Park ticket online (¥1,000)' } },
      { id: 'c9', text: { zh: '和牛いしざき 預約（Tablecheck，2–3 週前）', en: 'Reserve Wagyu Ishizaki on Tablecheck (2–3 weeks ahead)' } },
      { id: 'c10', text: { zh: '阿佐利本店（函館）提前預約', en: 'Reserve Asari Main (Hakodate) in advance' } },
      { id: 'c11', text: { zh: 'かに将軍 または かに本家 預約確認', en: 'Confirm Kani Shogun or Kani Honke reservation' } },
    ]
  },
  {
    section: { zh: '🎒 行李', en: '🎒 Packing' },
    items: [
      { id: 'c12', text: { zh: '防風防水薄外套（山頂風強必備）', en: 'Wind/waterproof jacket (must for mountaintops)' } },
      { id: 'c13', text: { zh: '支撐力好的球鞋（Day 2 13,000步 / Day 3 15,000步）', en: 'Supportive walking shoes (Day 2: 13k steps / Day 3: 15k)' } },
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
