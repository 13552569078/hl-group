# Typography 排版

Hongluan 排版的文档和示例，包括全局设置、标题、正文、列表等。

<div class="scrollable max-h-xl m-t-md">

| Class         | Properties                                                     |
| ------------- | -------------------------------------------------------------- |
| border-top    | border-top: var(--border-width) solid var(--border-regular)    |
| border-right  | border-right: var(--border-width) solid var(--border-regular)  |
| border-bottom | border-bottom: var(--border-width) solid var(--border-regular) |
| border-left   | border-left: 1var(--border-width) solid var(--border-regular)  |
| border-none   | border: none                                                   |
| border-top-none    | border-top: none                                               |
| border-right-none  | border-right: none                                             |
| border-bottom-none | border-bottom: none                                            |
| border-left-none   | border-left: 1none                                             |

</div>

## 边框颜色

:::demo

```html
<hl-group block align="items-center items-middle" gap="var(--xxl)">
  <hl-group class="border border-regular bg-content box-shadow-md w-xs h-xs radius-xl"></hl-group>
  <hl-group class="border border-light bg-content box-shadow-md w-xs h-xs radius-xl"></hl-group>
  <hl-group class="border border-dark bg-content box-shadow-md w-xs h-xs radius-xl"></hl-group>
</hl-group>
```

:::

## 状态颜色

:::demo

```html
<hl-group block align="items-center items-middle" gap="var(--xxl)">
  <hl-group class="border border-primary bg-content box-shadow-md w-xs h-xs radius-xl"></hl-group>
  <hl-group class="border border-danger bg-content box-shadow-md w-xs h-xs radius-xl"></hl-group>
  <hl-group class="border border-warning bg-content box-shadow-md w-xs h-xs radius-xl"></hl-group>
  <hl-group class="border border-success bg-content box-shadow-md w-xs h-xs radius-xl"></hl-group>
  <hl-group class="border border-info bg-content box-shadow-md w-xs h-xs radius-xl"></hl-group>
</hl-group>
```

:::

## 边框尺寸

使用`style`行内属性来传递 border 的尺寸会更加便捷，同时也避免我们在设计系统中预制一些你可能永远不会使用的尺寸样式。

:::demo

```html
<hl-group block align="items-center items-middle" gap="var(--xxl)">
  <hl-group class="border border-primary bg-content box-shadow-md w-xs h-xs radius-xl"></hl-group>
  <hl-group style="--border-width: 2px;" class="border border-primary bg-content box-shadow-md w-xs h-xs radius-xl"></hl-group>
  <hl-group style="--border-width: 3px;" class="border border-primary bg-content box-shadow-md w-xs h-xs radius-xl"></hl-group>
  <hl-group style="--border-width: 4px;" class="border border-primary bg-content box-shadow-md w-xs h-xs radius-xl"></hl-group>
</hl-group>
```

:::

## 单独修饰

你可以单独修饰某一个或者多个方向的边框样式

:::demo

```html
<hl-group block align="items-center items-middle" gap="var(--xxl)">
  <hl-group style="--border-size: 2px;" class="border-top border-primary bg-content box-shadow-md w-xs h-xs"></hl-group>
  <hl-group style="--border-size: 2px;" class="border-right border-primary bg-content box-shadow-md w-xs h-xs"></hl-group>
  <hl-group style="--border-size: 2px;" class="border-bottom border-primary bg-content box-shadow-md w-xs h-xs"></hl-group>
  <hl-group style="--border-size: 2px;" class="border-left border-primary bg-content box-shadow-md w-xs h-xs"></hl-group>
  <hl-group style="--border-size: 2px;" class="border-left border-right border-primary bg-content box-shadow-md w-xs h-xs"></hl-group>
  <hl-group style="--border-size: 2px;" class="border-top border-bottom border-primary bg-content box-shadow-md w-xs h-xs"></hl-group>
</hl-group>
```

:::

## 边框样式

设计系统提供了常用的 `dashed` 和 `dotted` 样式

:::demo

```html
<hl-group block align="items-center items-middle" gap="var(--xxl)">
  <hl-group class="border dashed border-primary w-xs h-xs"></hl-group>
  <hl-group class="border dotted border-primary w-xs h-xs"></hl-group>
</hl-group>
```

:::
