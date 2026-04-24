# Handoff — hokkaido-pwa
更新於：2026-04-23 23:34

## 本次完成

- **UI 全面升級**：行程頁從折疊卡片改為時間軸 Timeline + 頂部日期圓形選擇器（顯示日期數字 + 星期）
- **天氣大卡**：大字溫度 + 穿搭建議 + 天氣 emoji，切換天日時自動更新對應城市（札幌/函館/洞爺湖）
- **航班卡**：Day 1 顯示 CI130 出發卡，Day 9 顯示 CI131 回程卡
- **類別 Chip 自動偵測**：每個行程項目自動分類為 交通/餐廳/購物/景點/住宿，不同顏色圓點 + Chip
- **行程內容編輯 Modal**：編輯模式下 ✎ 按鈕 → 底部 Sheet，可改時間、停留時間、備注（改當前語言）
- **伴手禮負責人系統**：每個項目右側圓形標籤可循環切換 A/B/共同，頂部 filter bar 篩選
- **iOS PWA 修復**：補 `<link rel="apple-touch-icon">`、SW cache v1→v4、state.js/impact.js 加入離線快取
- **PWA 圖示修復**：重新生成 192/512 PNG（Navy 底 + 雪花 + 北海道文字）

## 重要決策

- **每次改完 app.js/css 都要 bump sw.js 的 `CACHE_NAME`**（現在是 v4），否則 iOS service worker 不會重新抓檔
- 行程狀態存在 `localStorage`（key: `hk_itinerary_v1`），重置用「還原」按鈕，不自動清除
- 類別偵測為純前端 regex 自動判斷，不需要在 data.js 加欄位
- 伴手禮負責人存在獨立 `localStorage` key（`hk_souvenir_owners`），不影響行程狀態
- 編輯備注只更新當前語言（zh/en 各自獨立），另一語言保留原文

## 未解決

- **新增行程項目**：目前只能移動/編輯，無法新增臨時景點（列為下一輪）
- **刪除行程項目**：同上，列為下一輪
- **預算實際消費追蹤**：目前只有靜態估算，無法記錄實際支出
- **伴手禮勾選後計入花費**：勾選後價格應可累加為消費小計
- **iOS home screen 安裝**：用戶需手動移除舊圖示再重新加入，才能看到新圖示（iOS 機制限制）

## 下一步

1. **新增 / 刪除行程項目**：編輯模式下加「＋ 新增」按鈕（插入新空白項目）和「🗑 刪除」按鈕（per item），存入 state
2. **消費追蹤**：在 Transport 頁或新增 tab，讓用戶記錄每日實際花費並加總
3. **測試確認**：用戶已在手機確認新版生效，圖示需重新安裝（移除主畫面舊圖示 → Safari 重新加入）

## 必讀文件

- `C:/Users/USER/OneDrive/Side project/hokkaido-pwa/js/app.js` — 主邏輯，所有 render 函數在此
- `C:/Users/USER/OneDrive/Side project/hokkaido-pwa/js/state.js` — 狀態管理，含 updateItem/moveItem
- `C:/Users/USER/OneDrive/Side project/hokkaido-pwa/js/data.js` — 原始行程資料（DAYS / SOUVENIRS / TRANSPORT / CHECKLIST / SOS / BUDGET）
- `C:/Users/USER/OneDrive/Side project/hokkaido-pwa/sw.js` — 記得每次部署都 bump CACHE_NAME
