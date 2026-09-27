# SVG Grid Background Animation

這是一個使用 SVG 與 GSAP 製作的網格背景動畫練習。頁面會先繪製規律的水平線與垂直線，再在網格上隨機放置半透明矩形，最後透過 GSAP 讓矩形依序淡入，形成簡單的動態背景效果。

## 使用技術

- HTML：建立頁面與 SVG 結構
- SVG：繪製網格、矩形與放射性漸變
- CSS：設定頁面尺寸、SVG 顯示範圍與矩形樣式
- GSAP：設定矩形位置並製作淡入動畫

## 專案檔案

| 檔案 | 說明 |
| --- | --- |
| `index.html` | 頁面結構、SVG 網格、漸變定義與 GSAP 載入設定 |
| `style.css` | 基本重置、SVG 容器與矩形樣式 |
| `script.js` | 隨機產生矩形位置並執行 GSAP 動畫 |

## SVG 網格

SVG 的 `viewBox` 設定為 `0 0 1800 920`，代表 SVG 內部使用寬度 1800、高度 920 的座標系統。

水平線與垂直線每隔 150 個單位繪製一次，因此整個 SVG 會形成規律網格：

- 垂直線從 `x=150` 開始，直到 `x=1650`
- 水平線從 `y=150` 開始，直到 `y=900`
- 一般網格線使用灰色、`0.5` 的線寬與 `0.3` 的透明度

`.svg-container` 會佔滿瀏覽器視窗高度，並使用 `overflow: hidden` 隱藏超出容器範圍的內容。

## 漸變效果

`index.html` 使用 `<defs>` 定義 3 個可重複使用的 `<radialGradient>`：

- `myGradient`
- `myGradient-2`
- `myGradient-3`

這些漸變並不是 SVG 濾鏡，而是放射性漸變。它們使用紅色 `#bb2c3e` 作為主要顏色，並從完全不透明逐漸變成透明，再套用到特定的垂直線上。

`gradientUnits="userSpaceOnUse"` 表示漸變使用 SVG 的使用者座標系統。每個 `gradientTransform` 則會對漸變座標進行平移、旋轉與縮放，藉此控制紅色光暈在網格中的方向與範圍。

## 矩形動畫

SVG 中有 7 個 `.rect` 矩形，每個矩形的尺寸為 `150 × 150`，與單一網格區塊大小一致。初始狀態設定為透明：

```css
.rect {
  width: 150px;
  height: 150px;
  opacity: 0;
}
```

`script.js` 會先建立可用的網格座標：

```js
const values = [0, 150, 300, 450, 600, 750, 900, 1050, 1200, 1350, 1500, 1650];
```

每個矩形的位置會依照以下規則隨機產生：

- `x` 可以從完整的座標陣列中隨機選取
- `y` 只會從前 6 個座標中隨機選取，也就是 `0` 到 `750`

GSAP 會先使用 `tl.set()` 將隨機座標寫入每個矩形的 `x` 與 `y` 屬性，再使用時間軸讓所有矩形淡入：

```js
tl.to(".rect", {
  opacity: 1,
  duration: 1.5,
  ease: "power2.out",
  stagger: {
    amount: 3,
  },
});
```

`duration: 1.5` 表示每個矩形的淡入動畫持續 1.5 秒；`stagger.amount: 3` 表示所有矩形會在總共約 3 秒的範圍內依序開始動畫，而不是同一時間全部出現。

由於每個矩形的位置都是獨立隨機產生，因此不同矩形可能會被放置在相同的網格位置而互相重疊。

## 外部資源

頁面透過 CDN 載入以下 GSAP 資源：

- GSAP `3.12.5`
- ScrollToPlugin `3.12.5`

目前程式實際使用的是 GSAP 核心功能，`ScrollToPlugin` 已載入但尚未在程式中使用。

## 執行方式

直接使用瀏覽器開啟 `index.html` 即可查看效果。由於頁面使用 CDN 載入 GSAP，瀏覽器需要能夠連線至外部網路。

## 資料來源

- [YouTube - Create and Animate A Grid Background Using SVG & GSAP | SVG Animation](https://www.youtube.com/watch?v=OZGzETPsYF8)
