# Padding 填充

用于控制元素边界半径的工具类

<div class="scrollable max-h-xl m-t-md">

| Class    | Properties           |
| -------- | -------------------- |
| p-none   | padding: 0           |
| p-xxs    | padding: 4px         |
| p-xs     | padding: 8px         |
| p-sm     | padding: 12px        |
| p-md     | padding: 16px        |
| p-lg     | padding: 24px        |
| p-xl     | padding: 32px        |
| p-xxl    | padding: 40px        |
| p-t-none | padding-top: 0       |
| p-t-xxs  | padding-top: 4px     |
| p-t-xs   | padding-top: 8px     |
| p-t-sm   | padding-top: 12px    |
| p-t-md   | padding-top: 16px    |
| p-t-lg   | padding-top: 24px    |
| p-t-xl   | padding-top: 32px    |
| p-t-xxl  | padding-top: 40px    |
| p-b-none | padding-bottom: 0    |
| p-b-xxs  | padding-bottom: 4px  |
| p-b-xs   | padding-bottom: 8px  |
| p-b-sm   | padding-bottom: 12px |
| p-b-md   | padding-bottom: 16px |
| p-b-lg   | padding-bottom: 24px |
| p-b-xl   | padding-bottom: 32px |
| p-b-xxl  | padding-bottom: 40px |
| p-l-none | padding-left: 0      |
| p-l-xxs  | padding-left: 4px    |
| p-l-xs   | padding-left: 8px    |
| p-l-sm   | padding-left: 12px   |
| p-l-md   | padding-left: 16px   |
| p-l-lg   | padding-left: 24px   |
| p-l-xl   | padding-left: 32px   |
| p-l-xxl  | padding-left: 40px   |
| p-r-none | padding-right: 0     |
| p-r-xxs  | padding-right: 4px   |
| p-r-xs   | padding-right: 8px   |
| p-r-sm   | padding-right: 12px  |
| p-r-md   | padding-right: 16px  |
| p-r-lg   | padding-right: 24px  |
| p-r-xl   | padding-right: 32px  |
| p-r-xxl  | padding-right: 40px  |

</div>

:::demo

```html
<hl-group block align="items-center items-middle" gap="var(--xxl)">
  <div class="p-xxl p-t-none bg-stripes bg-primary radius-xl" style="--stripes-color: rgba(255,255,255, 0.8)"><div class="display-flex items-middle items-center w-xs h-xs bg-primary text-inverse ">p-t-none</div></div>
  <div class="p-t-xxl bg-stripes bg-primary radius-xl" style="--stripes-color: rgba(255,255,255, 0.8)"><div class="display-flex items-middle items-center w-xs h-xs bg-primary text-inverse radius-b-xl">p-t-xxl</div></div>
  <div class="p-r-xxl bg-stripes bg-primary radius-xl" style="--stripes-color: rgba(255,255,255, 0.8)"><div class="display-flex items-middle items-center w-xs h-xs bg-primary text-inverse radius-l-xl">p-r-xxl</div></div>
  <div class="p-b-xxl bg-stripes bg-primary radius-xl" style="--stripes-color: rgba(255,255,255, 0.8)"><div class="display-flex items-middle items-center w-xs h-xs bg-primary text-inverse radius-t-xl">p-b-xxl</div></div>
  <div class="p-l-xxl bg-stripes bg-primary radius-xl" style="--stripes-color: rgba(255,255,255, 0.8)"><div class="display-flex items-middle items-center w-xs h-xs bg-primary text-inverse radius-r-xl">p-l-xxl</div></div>
</hl-group>
```

:::

## 边距尺寸

:::demo

```html
<hl-group block align="items-center items-middle" gap="var(--xxl)">
  <hl-group class="radius-xl bg-stripes bg-primary p-r-xxs" style="--stripes-color: rgba(255,255,255, 0.8)"><hl-group align="items-center items-middle" class="w-xxs h-xxs bg-primary text-inverse radius-xl">xxs</hl-group></hl-group>
  <hl-group class="radius-xl bg-stripes bg-primary p-r-xs" style="--stripes-color: rgba(255,255,255, 0.8)"><hl-group align="items-center items-middle" class="w-xxs h-xxs bg-primary text-inverse radius-xl">xs</hl-group></hl-group>
  <hl-group class="radius-xl bg-stripes bg-primary p-r-sm" style="--stripes-color: rgba(255,255,255, 0.8)"><hl-group align="items-center items-middle" class="w-xxs h-xxs bg-primary text-inverse radius-l-xl">sm</hl-group></hl-group>
  <hl-group class="radius-xl bg-stripes bg-primary p-r-md" style="--stripes-color: rgba(255,255,255, 0.8)"><hl-group align="items-center items-middle" class="w-xxs h-xxs bg-primary text-inverse radius-l-xl">md</hl-group></hl-group>
  <hl-group class="radius-xl bg-stripes bg-primary p-r-lg" style="--stripes-color: rgba(255,255,255, 0.8)"><hl-group align="items-center items-middle" class="w-xxs h-xxs bg-primary text-inverse radius-l-xl">lg</hl-group></hl-group>
  <hl-group class="radius-xl bg-stripes bg-primary p-r-xl" style="--stripes-color: rgba(255,255,255, 0.8)"><hl-group align="items-center items-middle" class="w-xxs h-xxs bg-primary text-inverse radius-l-xl">xl</hl-group></hl-group>
  <hl-group class="radius-xl bg-stripes bg-primary p-r-xxl" style="--stripes-color: rgba(255,255,255, 0.8)"><hl-group align="items-center items-middle" class="w-xxs h-xxs bg-primary text-inverse radius-l-xl">xxl</hl-group></hl-group>
</hl-group>
```

:::

## 响应式属性

通过设置断点标签，可以使其支持响应式特性。
:::demo

```html
<hl-group block align="items-center items-middle" gap="var(--xxl)">
  <hl-group class="radius-xl bg-stripes bg-primary xl:p-r-lg" style="--stripes-color: rgba(255,255,255, 0.8)"><hl-group align="items-center items-middle" class="w-sm h-xxs bg-primary text-inverse radius-xl">lg</hl-group></hl-group>
  <hl-group class="radius-xl bg-stripes bg-primary xl:p-r-xl" style="--stripes-color: rgba(255,255,255, 0.8)"><hl-group align="items-center items-middle" class="w-sm h-xxs bg-primary text-inverse radius-xl">xl</hl-group></hl-group>
  <hl-group class="radius-xl bg-stripes bg-primary xl:p-r-xxl" style="--stripes-color: rgba(255,255,255, 0.8)"><hl-group align="items-center items-middle" class="w-sm h-xxs bg-primary text-inverse radius-xl">xxl</hl-group></hl-group>
</hl-group>
```

:::
