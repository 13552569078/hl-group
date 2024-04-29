# 浏览器支持

- Hongluan 支持所有主流浏览器和平台的 最新、稳定版本，(不包括 IE11 及以下版本)。
- 所有的组件都是通过最新的 CSS3 样式编写。
- 基于 [Vue3](https://github.com/vuejs/rfcs/blob/master/active-rfcs/0038-vue3-ie11-support.md) 开发，所以也不支持在 IE11 及之前版本运行。
- 需要在支持 ES2018 和 ResizeObserver 的浏览器上运行。 如果您的浏览器支持，请添加 [Babel](https://babeljs.io/docs/en/babel-polyfill) 和相应的 Polyfill。

<hl-group align="items-center" gap="var(--md)" full class="p-t-xl p-b-xl">
  <hl-group class="bg-light border radius-lg p-lg" dir="vertical" align="items-middle" gap="var(--md)">
    <hl-thumb fit="cover" src="https://cdn.jsdelivr.net/npm/@browser-logos/edge/edge_128x128.png"></hl-thumb>
    <p>Edge ≥ 79</p>
  </hl-group>
  <hl-group class="bg-light border radius-lg p-lg" dir="vertical" align="items-middle" gap="var(--md)">
    <hl-thumb fit="cover" src="https://cdn.jsdelivr.net/npm/@browser-logos/firefox/firefox_128x128.png"></hl-thumb>
    <p>Firefox ≥ 78</p>
  </hl-group>
  <hl-group class="bg-light border radius-lg p-lg" dir="vertical" align="items-middle" gap="var(--md)">
    <hl-thumb fit="cover" src="https://cdn.jsdelivr.net/npm/@browser-logos/chrome/chrome_128x128.png"></hl-thumb>
    <p>Chrome ≥ 64</p>
  </hl-group>
  <hl-group class="bg-light border radius-lg p-lg" dir="vertical" align="items-middle" gap="var(--md)">
    <hl-thumb fit="cover" src="https://cdn.jsdelivr.net/npm/@browser-logos/safari/safari_128x128.png"></hl-thumb>
    <p>Safari ≥ 12</p>
  </hl-group>
</hl-group>

## 供应商前缀

许多 CSS 属性要求浏览器能够理解供应商前缀，例如 background-clip: text 需要-webkit 前缀才能在大多数浏览器中工作：

```scss
.bg-filter {
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
}
```

你使用 Hongluan 提供的工具类都已经预先为您添加了前缀。

如果你要自定义样式，我们建议您使用 [Autoprefixer](https://github.com/postcss/autoprefixer)，这是一个 PostCSS 插件，它会根据您告诉它您需要支持的浏览器来自动添加必要的供应商前缀。

```bash
npm install -D autoprefixer
```
