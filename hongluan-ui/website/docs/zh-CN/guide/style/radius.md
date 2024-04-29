# Radius 边界半径

用于控制元素边界半径的工具类

<div class="scrollable max-h-xl m-t-md">

| Class          | Properties                                                        |
| -------------- | ----------------------------------------------------------------- |
| radius-none    | border-radius: 0                                                  |
| radius-round   | border-radius: 9999px                                             |
| radius-t-none  | border-top-left-radius: 0; border-top-right-radius: 0             |
| radius-b-none  | border-bottom-left-radius: 0; border-bottom-right-radius: 0       |
| radius-l-none  | border-top-left-radius: 0; border-bottom-left-radius: 0           |
| radius-r-none  | border-top-right-radius: 0; border-bottom-right-radius: 0         |
| radius-tl-none | border-top-left-radius: 0                                         |
| radius-tr-none | border-top-right-radius: 0                                        |
| radius-bl-none | border-bottom-left-radius: 0                                      |
| radius-br-none | border-bottom-right-radius: 0                                     |
| radius-t-sm    | border-top-left-radius: 2px; border-top-right-radius: 2px         |
| radius-b-sm    | border-bottom-left-radius: 2px; border-bottom-right-radius: 2px   |
| radius-l-sm    | border-top-left-radius: 2px; border-bottom-left-radius: 2px       |
| radius-r-sm    | border-top-right-radius: 2px; border-bottom-right-radius: 2px     |
| radius-tl-sm   | border-top-left-radius: 2px                                       |
| radius-tr-sm   | border-top-right-radius: 2px                                      |
| radius-bl-sm   | border-bottom-left-radius: 2px                                    |
| radius-br-sm   | border-bottom-right-radius: 2px                                   |
| radius-t-md    | border-top-left-radius: 4px; border-top-right-radius: 4px         |
| radius-b-md    | border-bottom-left-radius: 4px; border-bottom-right-radius: 4px   |
| radius-l-md    | border-top-left-radius: 4px; border-bottom-left-radius: 4px       |
| radius-r-md    | border-top-right-radius: 4px; border-bottom-right-radius: 4px     |
| radius-tl-md   | border-top-left-radius: 4px                                       |
| radius-tr-md   | border-top-right-radius: 4px                                      |
| radius-bl-md   | border-bottom-left-radius: 4px                                    |
| radius-br-md   | border-bottom-right-radius: 4px                                   |
| radius-t-lg    | border-top-left-radius: 6px; border-top-right-radius: 6px         |
| radius-b-lg    | border-bottom-left-radius: 6px; border-bottom-right-radius: 6px   |
| radius-l-lg    | border-top-left-radius: 6px; border-bottom-left-radius: 6px       |
| radius-r-lg    | border-top-right-radius: 6px; border-bottom-right-radius: 6px     |
| radius-tl-lg   | border-top-left-radius: 6px                                       |
| radius-tr-lg   | border-top-right-radius: 6px                                      |
| radius-bl-lg   | border-bottom-left-radius: 6px                                    |
| radius-br-lg   | border-bottom-right-radius: 6px                                   |
| radius-t-xl    | border-top-left-radius: 8px; border-top-right-radius: 8px         |
| radius-b-xl    | border-bottom-left-radius: 8px; border-bottom-right-radius: 8px   |
| radius-l-xl    | border-top-left-radius: 8px; border-bottom-left-radius: 8px       |
| radius-r-xl    | border-top-right-radius: 8px; border-bottom-right-radius: 8px     |
| radius-tl-xl   | border-top-left-radius: 8px                                       |
| radius-tr-xl   | border-top-right-radius: 8px                                      |
| radius-bl-xl   | border-bottom-left-radius: 8px                                    |
| radius-br-xl   | border-bottom-right-radius: 8px                                   |

</div>

:::demo

```html
<hl-group block align="items-center" gap="var(--lg)">
  <hl-group align="items-center items-middle" class="w-xs h-xs bg-primary text-inverse radius-sm">sm</hl-group>
  <hl-group align="items-center items-middle" class="w-xs h-xs bg-primary text-inverse radius-md">md</hl-group>
  <hl-group align="items-center items-middle" class="w-xs h-xs bg-primary text-inverse radius-lg">lg</hl-group>
  <hl-group align="items-center items-middle" class="w-xs h-xs bg-primary text-inverse radius-xl">xl</hl-group>
  <hl-group align="items-center items-middle" class="w-xs h-xs bg-primary text-inverse radius-round">round</hl-group>
</hl-group>
```

:::

## 圆角修饰

:::demo

```html
<hl-group block align="items-center" gap="var(--lg)">
  <hl-group align="items-center items-middle" class="w-xs h-xs bg-primary text-inverse radius-tl-xl">TL</hl-group>
  <hl-group align="items-center items-middle" class="w-xs h-xs bg-primary text-inverse radius-tr-xl">TR</hl-group>
  <hl-group align="items-center items-middle" class="w-xs h-xs bg-primary text-inverse radius-bl-xl">BL</hl-group>
  <hl-group align="items-center items-middle" class="w-xs h-xs bg-primary text-inverse radius-br-xl">BR</hl-group>
</hl-group>

<hl-group block align="items-center" gap="var(--lg)" class="m-t-lg">
  <hl-group align="items-center items-middle" class="w-xs h-xs bg-primary text-inverse radius-t-xl">TOP</hl-group>
  <hl-group align="items-center items-middle" class="w-xs h-xs bg-primary text-inverse radius-b-xl">BOTTOM</hl-group>
  <hl-group align="items-center items-middle" class="w-xs h-xs bg-primary text-inverse radius-l-xl">LEFT</hl-group>
  <hl-group align="items-center items-middle" class="w-xs h-xs bg-primary text-inverse radius-r-xl">RIGHT</hl-group>
</hl-group>
```

:::
