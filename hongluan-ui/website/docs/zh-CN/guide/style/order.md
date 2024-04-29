# Order 排列顺序

Order 类适用于 flex 布局的项目中，它同栅格的数量保持一致，同为 24 个项。 如： `order-{1} 到 {24}`

<div class="scrollable max-h-xl m-t-md">

| Class       | Properties   |
| ----------- | ------------ |
| order-first | order: -9999 |
| order-last  | order: 9999  |
| order-none  | order: 0     |
| order-1     | order: 1     |
| order-2     | order: 2     |
| order-3     | order: 3     |
| order-4     | order: 4     |
| order-5     | order: 5     |
| order-6     | order: 6     |
| order-7     | order: 7     |
| order-8     | order: 8     |
| order-9     | order: 9     |
| order-10    | order: 10    |
| order-11    | order: 11    |
| order-12    | order: 12    |
| order-13    | order: 13    |
| order-14    | order: 14    |
| order-15    | order: 15    |
| order-16    | order: 16    |
| order-17    | order: 17    |
| order-18    | order: 18    |
| order-19    | order: 19    |
| order-20    | order: 20    |
| order-21    | order: 21    |
| order-22    | order: 22    |
| order-23    | order: 23    |
| order-24    | order: 24    |

</div>

## 例子

:::demo

```html
<hl-group block align="items-center items-middle" gap="var(--md)">
  <hl-group align="items-center items-middle" class="order-3 w-xs h-xs bg-primary text-inverse radius-xl">1</hl-group>
  <hl-group align="items-center items-middle" class="order-2 w-xs h-xs bg-primary text-inverse radius-xl">2</hl-group>
  <hl-group align="items-center items-middle" class="order-1 w-xs h-xs bg-primary text-inverse radius-xl">3</hl-group>
  <hl-group align="items-center items-middle" class="order-6 w-xs h-xs bg-primary text-inverse radius-xl">4</hl-group>
  <hl-group align="items-center items-middle" class="order-5 w-xs h-xs bg-primary text-inverse radius-xl">5</hl-group>
  <hl-group align="items-center items-middle" class="order-4 w-xs h-xs bg-primary text-inverse radius-xl">6</hl-group>
</hl-group>
```

:::

## 首尾排序

:::demo

```html
<hl-group block align="items-center items-middle" gap="var(--md)">
  <hl-group align="items-center items-middle" class="order-first w-xs h-xs bg-primary text-inverse radius-xl">first</hl-group>
  <hl-group align="items-center items-middle" class="order-last w-xs h-xs bg-primary text-inverse radius-xl">last</hl-group>
  <hl-group align="items-center items-middle" class="order-1 w-xs h-xs bg-primary text-inverse radius-xl">1</hl-group>
  <hl-group align="items-center items-middle" class="order-6 w-xs h-xs bg-primary text-inverse radius-xl">2</hl-group>
  <hl-group align="items-center items-middle" class="order-5 w-xs h-xs bg-primary text-inverse radius-xl">3</hl-group>
  <hl-group align="items-center items-middle" class="order-4 w-xs h-xs bg-primary text-inverse radius-xl">4</hl-group>
</hl-group>
```

:::

## 移除排序

:::demo

```html
<hl-group block align="items-center items-middle" gap="var(--md)">
  <hl-group align="items-center items-middle" class="order-1 w-xs h-xs bg-primary text-inverse radius-xl">1</hl-group>
  <hl-group align="items-center items-middle" class="order-2 w-xs h-xs bg-primary text-inverse radius-xl">2</hl-group>
  <hl-group align="items-center items-middle" class="order-none w-xs h-xs bg-primary text-inverse radius-xl">none</hl-group>
  <hl-group align="items-center items-middle" class="order-6 w-xs h-xs bg-primary text-inverse radius-xl">3</hl-group>
  <hl-group align="items-center items-middle" class="order-5 w-xs h-xs bg-primary text-inverse radius-xl">4</hl-group>
  <hl-group align="items-center items-middle" class="order-4 w-xs h-xs bg-primary text-inverse radius-xl">5</hl-group>
</hl-group>
```

:::

## 响应式

:::demo

```html
<hl-group block align="items-center items-middle" gap="var(--md)">
  <hl-group align="items-center items-middle" class="xl:order-6 w-xs h-xs bg-primary-dark-2 text-inverse radius-xl">1</hl-group>
  <hl-group align="items-center items-middle" class="xl:order-5 w-xs h-xs bg-primary-dark-1 text-inverse radius-xl">2</hl-group>
  <hl-group align="items-center items-middle" class="xl:order-4 w-xs h-xs bg-primary text-inverse radius-xl">3</hl-group>
  <hl-group align="items-center items-middle" class="xl:order-3 w-xs h-xs bg-primary-light-1 text-inverse radius-xl">4</hl-group>
  <hl-group align="items-center items-middle" class="xl:order-2 w-xs h-xs bg-primary-light-2 text-inverse radius-xl">5</hl-group>
  <hl-group align="items-center items-middle" class="xl:order-1 w-xs h-xs bg-primary-light-3 text-inverse radius-xl">6</hl-group>
</hl-group>
```

:::
