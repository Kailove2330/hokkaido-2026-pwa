# Handoff — hokkaido-pwa
更新於：2026-04-24 23:25

## 本次完成
- 將 `js/data.js` 全面升級至 V4 行程（20260424 版）：9 天行程全部更新
- SW 版本升至 v9（每次 data.js 改動都必須 bump）

## V4 主要變更摘要
- **Day 1**：達摩改 17:00（避首波）；新增 Parfaiteria PaL 夜聖代（20:30）
- **Day 2**：午餐改 Cafe BAAL 牛排飯；加入小樽音樂盒堂；LeTAO 二樓內用 90 分
- **Day 3**：早餐改 Espresso D Works；午餐改とんかつ檍；移除北大；加圓山公園；晚餐改**牛しゃぶ 牛すき 禪**（全熟預約）
- **Day 4**：加 09:00 歷史地標 + 10:30 中島公園/豐平館；午餐改六花亭熱披薩；晚餐改**かに本家 站前總店**（全熟包廂）；22:00 行李封箱
- **Day 5**：早餐 DONGURI；09:00 宅急便寄機場；10:00 JR 出発（原 09:00）；十勝豚丼車廂午餐；幸運小丑改為下午茶（15:30）；新增味彩鹽拉麵晚餐
- **Day 6**：午餐改**村上海膽**（全熟）；移除六花亭五稜郭、阿佐利本店；晚餐改大門橫丁屋台村（無需預約）
- **Day 7**：新增筒倉展望台 Silo（12:15）；午餐改岡田屋白汁粉
- **Day 8**：**完全改寫** → 登別地獄谷 + 大湯沼川天然足湯（原有珠山行程已移除）
- **Day 9**：10:00 JR 出発（原 10:47）；11:45 領行李；12:15 掛行李；一幻拉麵午餐

## 重要決策
- 全熟食偏好已寫入 Day 3（禪）、Day 4（かに本家）、Day 6（村上海膽）、Day 7（函館朝市）的 note 欄
- **每次改完 app.js/css/data.js 都要 bump sw.js 的 CACHE_NAME**（現在是 v9）
- 天氣城市對應不變：Days 1–4 + Day 9 = Sapporo、Days 5–6 = Hakodate、Days 7–8 = Toyako

## 未解決
- 消費追蹤功能（expense tracking）尚未實作，已多次延後
- 需推送至 GitHub Pages 生效

## 下一步
1. 推送至 GitHub（`git add -A && git commit -m "V4 itinerary update" && git push`）
2. 手機確認 Day 8 登別內容顯示正確（切換至 Day 8 驗證）
3. 若需繼續開發，下一功能為消費追蹤

## 必讀文件
- `js/data.js` — 行程資料，V4 版本，所有 9 天
- `sw.js` — 目前版本 v9，每次部署必須 bump
- `js/app.js` — 主邏輯，`applyWeather()` 有 stale fetch guard
