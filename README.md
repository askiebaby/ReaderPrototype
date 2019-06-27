[![Reader Prototype on iPad](https://i.imgur.com/N5ggV6H.jpg)](https://mark9462.github.io/ReaderPrototype/)

## 專案介紹 [![License: AGPL v3](https://img.shields.io/badge/License-AGPL%20v3-blue.svg)](https://www.gnu.org/licenses/agpl-3.0)

這是一款開源（Open Source）[AGPL v3 授權](https://www.gnu.org/licenses/agpl-3.0)的[線上電子書](https://github.com/askiebaby/ReaderPrototype)。專為 iPad 平板量身打造，透過 **PWA 技術**，您可以將應用程式「加到主畫面」。使用的 JavaScript 框架是主流框架之一的 **Vue**，路由設定搭配 **Vue Router**；狀態管理使用 Vue 應用程式專屬的 **VueX**，是整個應用程式狀態管理的中心；開發搭配 Vue 官方提供的開發者[擴充套件](https://github.com/vuejs/vue-devtools)，方便我們開發中，查看事件觸發時資料狀態的變化來除錯。

這個專案最特別的地方在於：

- 需要模仿真正的電子書應用程式，在直、橫排版的需求下，及切換字級大小後，**書籍章節、頁面間正確的切換**。
- 需要模仿應用程式，能夠**安裝到使用者的主畫面**。
- 需要特別針對**智慧型裝置的事件處理**，例如：`touchstart()`、`touchmove()`、`touchend()`。
- **畫重點功能**需要考量使用者的觸碰（touch）與手勢（gesture）來決定事件觸發的時間點及 Components 顯示的狀態。

因為有別於現今網頁主要開發類型（大部分是商業類型，如形象網站、傳統產業轉型、ERP、購物平台...等）不只是考量純粹的點擊事件而已，需要連同觸控、滑動的監測、雙擊動作等一併考量，也因此會遇到許許多多以前開發沒思考過的問題，希望能夠做個紀錄，所以在本文羅列出此專案中，遇到最難解決五個的問題以及解決方式。

---

## Installation

### **專案安裝**

```bash
npm install
```

### 開發模式

```bash
npm run serve
```

### 建置專案

```bash
npm run build
```

---
