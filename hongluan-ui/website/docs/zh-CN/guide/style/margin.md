# Margin 边距

用于控制元素边界半径的工具类

<div class="scrollable max-h-xl m-t-md">

| Class    | Properties          |
| -------- | ------------------- |
| m-none   | margin: 0           |
| m-xxs    | margin: 4px         |
| m-xs     | margin: 8px         |
| m-sm     | margin: 12px        |
| m-md     | margin: 16px        |
| m-lg     | margin: 24px        |
| m-xl     | margin: 32px        |
| m-xxl    | margin: 40px        |
| m-t-none | margin-top: 0       |
| m-t-xxs  | margin-top: 4px     |
| m-t-xs   | margin-top: 8px     |
| m-t-sm   | margin-top: 12px    |
| m-t-md   | margin-top: 16px    |
| m-t-lg   | margin-top: 24px    |
| m-t-xl   | margin-top: 32px    |
| m-t-xxl  | margin-top: 40px    |
| m-b-none | margin-bottom: 0    |
| m-b-xxs  | margin-bottom: 4px  |
| m-b-xs   | margin-bottom: 8px  |
| m-b-sm   | margin-bottom: 12px |
| m-b-md   | margin-bottom: 16px |
| m-b-lg   | margin-bottom: 24px |
| m-b-xl   | margin-bottom: 32px |
| m-b-xxl  | margin-bottom: 40px |
| m-l-none | margin-left: 0      |
| m-l-xxs  | margin-left: 4px    |
| m-l-xs   | margin-left: 8px    |
| m-l-sm   | margin-left: 12px   |
| m-l-md   | margin-left: 16px   |
| m-l-lg   | margin-left: 24px   |
| m-l-xl   | margin-left: 32px   |
| m-l-xxl  | margin-left: 40px   |
| m-r-none | margin-right: 0     |
| m-r-xxs  | margin-right: 4px   |
| m-r-xs   | margin-right: 8px   |
| m-r-sm   | margin-right: 12px  |
| m-r-md   | margin-right: 16px  |
| m-r-lg   | margin-right: 24px  |
| m-r-xl   | margin-right: 32px  |
| m-r-xxl  | margin-right: 40px  |

</div>

:::demo

```html
<hl-group block align="items-center items-middle" gap="var(--xxl)">
  <hl-group class="bg-stripes radius-xl"><hl-group align="items-center items-middle" class="m-xxl m-t-none w-xs h-xs bg-primary text-inverse radius-xl">m-t-none</hl-group></hl-group>
  <hl-group class="bg-stripes radius-xl"><hl-group align="items-center items-middle" class="m-t-xxl w-xs h-xs bg-primary text-inverse radius-xl">m-t-xxl</hl-group></hl-group>
  <hl-group class="bg-stripes radius-xl"><hl-group align="items-center items-middle" class="m-r-xxl w-xs h-xs bg-primary text-inverse radius-xl">m-r-xxl</hl-group></hl-group>
  <hl-group class="bg-stripes radius-xl"><hl-group align="items-center items-middle" class="m-b-xxl w-xs h-xs bg-primary text-inverse radius-xl">m-b-xxl</hl-group></hl-group>
  <hl-group class="bg-stripes radius-xl"><hl-group align="items-center items-middle" class="m-l-xxl w-xs h-xs bg-primary text-inverse radius-xl">m-l-xxl</hl-group></hl-group>
</hl-group>
```

:::

## 边距尺寸

:::demo

```html
<hl-group block align="items-center items-middle" gap="var(--xxl)">
  <hl-group class="bg-stripes radius-xl"><hl-group align="items-center items-middle" class="m-r-xxs w-xxs h-xxs bg-primary text-inverse radius-xl">xxs</hl-group></hl-group>
  <hl-group class="bg-stripes radius-xl"><hl-group align="items-center items-middle" class="m-r-xs w-xxs h-xxs bg-primary text-inverse radius-xl">xs</hl-group></hl-group>
  <hl-group class="bg-stripes radius-xl"><hl-group align="items-center items-middle" class="m-r-sm w-xxs h-xxs bg-primary text-inverse radius-xl">sm</hl-group></hl-group>
  <hl-group class="bg-stripes radius-xl"><hl-group align="items-center items-middle" class="m-r-md w-xxs h-xxs bg-primary text-inverse radius-xl">md</hl-group></hl-group>
  <hl-group class="bg-stripes radius-xl"><hl-group align="items-center items-middle" class="m-r-lg w-xxs h-xxs bg-primary text-inverse radius-xl">lg</hl-group></hl-group>
  <hl-group class="bg-stripes radius-xl"><hl-group align="items-center items-middle" class="m-r-xl w-xxs h-xxs bg-primary text-inverse radius-xl">xl</hl-group></hl-group>
  <hl-group class="bg-stripes radius-xl"><hl-group align="items-center items-middle" class="m-r-xxl w-xxs h-xxs bg-primary text-inverse radius-xl">xxl</hl-group></hl-group>
</hl-group>
```

:::

## 响应式属性

通过设置断点标签，可以使其支持响应式特性。
:::demo

```html
<hl-group block align="items-center items-middle" gap="var(--xxl)">
  <hl-group class="bg-stripes radius-xl"><hl-group align="items-center items-middle" class="xl:m-r-xxl w-sm h-xxs bg-primary text-inverse radius-xl">xxl</hl-group></hl-group>
  <hl-group class="bg-stripes radius-xl"><hl-group align="items-center items-middle" class="xl:m-r-xxl w-sm h-xxs bg-primary text-inverse radius-xl">xxl</hl-group></hl-group>
  <hl-group class="bg-stripes radius-xl"><hl-group align="items-center items-middle" class="xl:m-r-xxl w-sm h-xxs bg-primary text-inverse radius-xl">xxl</hl-group></hl-group>
</hl-group>
```

:::
