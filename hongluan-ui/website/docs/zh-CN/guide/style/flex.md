# Flex 弹性布局

弹性布局是未来主流的布局方式，它在 Hongluan 的组件中广泛应用

<div class="scrollable max-h-xl m-t-md">

| Class             | Properties                                      |
| ----------------- | ----------------------------------------------- |
| static            | flex-shrink: 0; flex-grow: 0;                   |
| flex-row          | flex-direction: row;                            |
| flex-col          | flex-direction: column;                         |
| flex-wrap         | flex-wrap: wrap;                                |
| flex-nowrap       | flex-wrap: nowrap;                              |
| flex-wrap-reverse | flex-wrap: wrap-reverse;                        |
| self-grow         | flex-grow: 1;                                   |
| self-shrink       | flex-shrink: 1;                                 |
| self-no-grow      | flex-grow: 0;                                   |
| self-no-shrink    | flex-shrink: 0;                                 |
| self-static       | flex-shrink: 0; flex-grow: 0;                   |
| self-full         | flex-grow: 1; flex-shrink: 1; flex-basis: auto; |
| self-no-full      | flex: none;                                     |

</div>

:::tip
弹性布局的所有类都支持响应式属性，例如 `md:flex-row`
:::


## 对齐项目

为了方便记忆，Hongluan 对 display-flex 的属性名称进行了语义优化，例如：`align-items: flex-start` 命名为 `.items-top`

<div class="scrollable max-h-xl m-t-md">

| Class          | Properties                      |
| -------------- | ------------------------------- |
| items-top      | align-items: flex-start;        |
| items-middle   | align-items: center;            |
| items-bottom   | align-items: flex-end;          |
| items-left     | justify-content: flex-start;    |
| items-center   | justify-content: center;        |
| items-right    | justify-content: flex-end;      |
| items-baseline | align-items: baseline;          |
| items-stretch  | align-items: stretch;           |
| items-between  | justify-content: space-between; |
| items-around   | justify-content: space-around;  |
| items-evenly   | justify-content: space-evenly;  |

</div>

:::demo

```html
<hl-row layout="grid" count="md:count-3" gap="var(--lg)">
  <hl-col span="col">
    <p class="m-b-sm font-bold">items-top</p>
    <div class="display-flex items-top gap-md min-h-md bg-stripes radius-lg radius-lg">
      <span class="display-flex items-middle items-center p-x-md p-y-sm bg-primary text-inverse text-center radius-lg">Item</span>
      <span class="display-flex items-middle items-center p-x-md p-y-sm bg-primary text-inverse text-center radius-lg">Item</span>
    </div>
  </hl-col>
  <hl-col span="col">
    <p class="m-b-sm font-bold">items-middle</p>
    <div class="display-flex items-middle gap-md min-h-md bg-stripes radius-lg">
      <span class="display-flex items-middle items-center p-x-md p-y-sm bg-primary text-inverse text-center radius-lg">Item</span>
      <span class="display-flex items-middle items-center p-x-md p-y-sm bg-primary text-inverse text-center radius-lg">Item</span>
    </div>
  </hl-col>
  <hl-col span="col">
    <p class="m-b-sm font-bold">items-bottom</p>
    <div class="display-flex items-bottom gap-md min-h-md bg-stripes radius-lg">
      <span class="display-flex items-middle items-center p-x-md p-y-sm bg-primary text-inverse text-center radius-lg">Item</span>
      <span class="display-flex items-middle items-center p-x-md p-y-sm bg-primary text-inverse text-center radius-lg">Item</span>
    </div>
  </hl-col>
  <hl-col span="col">
    <p class="m-b-sm font-bold">items-left</p>
    <div class="display-flex items-top items-left items-left gap-md min-h-md bg-stripes radius-lg">
      <span class="display-flex items-middle items-center p-x-md p-y-sm bg-primary text-inverse text-center radius-lg">Item</span>
      <span class="display-flex items-middle items-center p-x-md p-y-sm bg-primary text-inverse text-center radius-lg">Item</span>
    </div>
  </hl-col>
  <hl-col span="col">
    <p class="m-b-sm font-bold">items-center</p>
    <div class="display-flex items-top items-center items-center gap-md min-h-md bg-stripes radius-lg">
      <span class="display-flex items-middle items-center p-x-md p-y-sm bg-primary text-inverse text-center radius-lg">Item</span>
      <span class="display-flex items-middle items-center p-x-md p-y-sm bg-primary text-inverse text-center radius-lg">Item</span>
    </div>
  </hl-col>
  <hl-col span="col">
    <p class="m-b-sm font-bold">items-right</p>
    <div class="display-flex items-top items-right items-right gap-md min-h-md bg-stripes radius-lg">
      <span class="display-flex items-middle items-center p-x-md p-y-sm bg-primary text-inverse text-center radius-lg">Item</span>
      <span class="display-flex items-middle items-center p-x-md p-y-sm bg-primary text-inverse text-center radius-lg">Item</span>
    </div>
  </hl-col>
</hl-row>
```

:::

我们也可以多种属性一起使用：

:::demo

```html
<hl-row layout="grid" count="md:count-3" gap="var(--lg)">
  <hl-col span="col">
    <p class="m-b-sm font-bold">items-top \ items-center</p>
    <div class="display-flex items-top items-center gap-md min-h-md bg-stripes radius-lg">
      <span class="display-flex items-middle items-center p-x-md p-y-sm bg-primary text-inverse text-center radius-lg">Item</span>
      <span class="display-flex items-middle items-center p-x-md p-y-sm bg-primary text-inverse text-center radius-lg">Item</span>
    </div>
  </hl-col>
  <hl-col span="col">
    <p class="m-b-sm font-bold">items-middle \ items-center</p>
    <div class="display-flex items-middle items-center gap-md min-h-md bg-stripes radius-lg">
      <span class="display-flex items-middle items-center p-x-md p-y-sm bg-primary text-inverse text-center radius-lg">Item</span>
      <span class="display-flex items-middle items-center p-x-md p-y-sm bg-primary text-inverse text-center radius-lg">Item</span>
    </div>
  </hl-col>
  <hl-col span="col">
    <p class="m-b-sm font-bold">items-bottom \ items-center</p>
    <div class="display-flex items-bottom items-center gap-md min-h-md bg-stripes radius-lg">
      <span class="display-flex items-middle items-center p-x-md p-y-sm bg-primary text-inverse text-center radius-lg">Item</span>
      <span class="display-flex items-middle items-center p-x-md p-y-sm bg-primary text-inverse text-center radius-lg">Item</span>
    </div>
  </hl-col>
</hl-row>
```

:::

## 两端对齐分布

:::demo

```html
<div class="display-flex items-between bg-stripes radius-lg">
  <span class="display-flex items-middle items-center p-x-md p-y-sm bg-primary text-inverse text-center radius-lg">Item</span>
  <span class="display-flex items-middle items-center p-x-md p-y-sm bg-primary text-inverse text-center radius-lg">Item</span>
  <span class="display-flex items-middle items-center p-x-md p-y-sm bg-primary text-inverse text-center radius-lg">Item</span>
  <span class="display-flex items-middle items-center p-x-md p-y-sm bg-primary text-inverse text-center radius-lg">Item</span>
</div>
```

:::

## 环绕分布

:::demo

```html
<div class="display-flex items-around bg-stripes radius-lg">
  <span class="display-flex items-middle items-center p-x-md p-y-sm bg-primary text-inverse text-center radius-lg">Item</span>
  <span class="display-flex items-middle items-center p-x-md p-y-sm bg-primary text-inverse text-center radius-lg">Item</span>
  <span class="display-flex items-middle items-center p-x-md p-y-sm bg-primary text-inverse text-center radius-lg">Item</span>
  <span class="display-flex items-middle items-center p-x-md p-y-sm bg-primary text-inverse text-center radius-lg">Item</span>
</div>
```

:::

## 均匀分布

:::demo

```html
<div class="display-flex items-evenly bg-stripes radius-lg">
  <span class="display-flex items-middle items-center p-x-md p-y-sm bg-primary text-inverse text-center radius-lg">Item</span>
  <span class="display-flex items-middle items-center p-x-md p-y-sm bg-primary text-inverse text-center radius-lg">Item</span>
  <span class="display-flex items-middle items-center p-x-md p-y-sm bg-primary text-inverse text-center radius-lg">Item</span>
  <span class="display-flex items-middle items-center p-x-md p-y-sm bg-primary text-inverse text-center radius-lg">Item</span>
</div>
```

:::

## 对齐内容

| Class           | Properties                    |
| --------------- | ----------------------------- |
| content-top     | align-content: flex-start;    |
| content-middle  | align-content: center;        |
| content-bottom  | align-content: flex-end;      |
| content-between | align-content: space-between; |
| content-stretch | align-content: stretch;       |
| content-around  | align-content: space-around;  |

:::demo

```html
<div class="display-flex content-between items-center gap-md bg-stripes radius-lg min-h-md flex-wrap">
  <span class="display-flex items-middle items-center xl:w-lg p-x-md p-y-sm bg-primary text-inverse text-center radius-lg">Item</span>
  <span class="display-flex items-middle items-center xl:w-lg p-x-md p-y-sm bg-primary text-inverse text-center radius-lg">Item</span>
  <span class="display-flex items-middle items-center xl:w-lg p-x-md p-y-sm bg-primary text-inverse text-center radius-lg">Item</span>
  <span class="display-flex items-middle items-center xl:w-lg p-x-md p-y-sm bg-primary text-inverse text-center radius-lg">Item</span>
</div>
```

:::

## 项目单独设置对齐

| Class         | Properties              |
| ------------- | ----------------------- |
| self-auto     | align-self: auto;       |
| self-top      | align-self: flex-start; |
| self-middle   | align-self: center;     |
| self-bottom   | align-self: flex-end;   |
| self-stretch  | align-self: stretch;    |
| self-baseline | align-self: baseline;   |

:::demo

```html
<div class="display-flex items-between gap-md bg-stripes radius-lg min-h-md">
  <span class="self-top display-flex items-middle items-center p-x-md p-y-sm bg-primary text-inverse text-center radius-lg">Item</span>
  <span class="self-bottom display-flex items-middle items-center p-x-md p-y-sm bg-primary text-inverse text-center radius-lg">Item</span>
  <span class="self-middle display-flex items-middle items-center p-x-md p-y-sm bg-primary text-inverse text-center radius-lg">Item</span>
  <span class="self-baseline display-flex items-middle items-center p-x-md p-y-sm bg-primary text-inverse text-center radius-lg">Item</span>
</div>
```

:::

## 响应式属性

对齐方式也支持响应式属性，使用方法同其它保持一致，具体使用请查阅[响应式文档](http://)

:::demo 尝试调整浏览器宽度来预览响应式特性

```html
<div class="display-flex xl:items-between gap-md bg-stripes radius-lg">
  <span class="display-flex p-x-md p-y-sm bg-primary text-inverse radius-lg">Item</span>
  <span class="display-flex p-x-md p-y-sm bg-primary text-inverse radius-lg">Item</span>
  <span class="display-flex p-x-md p-y-sm bg-primary text-inverse radius-lg">Item</span>
</div>
```

:::
