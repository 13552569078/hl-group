# Shadows 阴影

根据页面的层级，Hongluan 为此预制了 4 个相应的阴影样式，`xl` 为最高层级

## box-shadow 盒阴影

:::demo

```html
<hl-group block align="items-center items-middle" gap="var(--xxl)">
  <hl-group align="items-center items-middle" class="box-shadow-sm bg-content w-xs h-xs text-primary radius-xl">sm</hl-group>
  <hl-group align="items-center items-middle" class="box-shadow-md bg-content w-xs h-xs text-primary radius-xl">md</hl-group>
  <hl-group align="items-center items-middle" class="box-shadow-lg bg-content w-xs h-xs text-primary radius-xl">lg</hl-group>
  <hl-group align="items-center items-middle" class="box-shadow-xl bg-content w-xs h-xs text-primary radius-xl">xl</hl-group>
  <hl-group align="items-center items-middle" class="box-shadow-none bg-content w-xs h-xs text-primary radius-xl">none</hl-group>
</hl-group>
```

:::

## drop-shadow 滤镜阴影

:::demo

```html
<div class="display-flex flex-row gap-xxl items-center items-middle">
  <div class="text-danger w-xs h-xs">
    <svg style="--shadow-color: var(--rgb-danger)" class="drop-shadow-sm" viewBox="0 0 235 271">
      <g fill="currentColor">
        <polygon opacity="0.3" points="117.346442 0 234.692884 67.75 117.846442 136 0 67.75" />
        <polygon opacity="0.5" points="117.846442 136 234.692884 67.75 234.692884 203.25 117.346442 271" />
        <polygon opacity="1" points="117.846442 136 117.346442 271 1.62850903e-14 203.25 0 67.75" />
      </g>
    </svg>
  </div>
  <div class="text-danger w-xs h-xs">
    <svg style="--shadow-color: var(--rgb-danger)" class="drop-shadow-md" viewBox="0 0 235 271">
      <g fill="currentColor">
        <polygon opacity="0.3" points="117.346442 0 234.692884 67.75 117.846442 136 0 67.75" />
        <polygon opacity="0.5" points="117.846442 136 234.692884 67.75 234.692884 203.25 117.346442 271" />
        <polygon opacity="1" points="117.846442 136 117.346442 271 1.62850903e-14 203.25 0 67.75" />
      </g>
    </svg>
  </div>
  <div class="text-danger w-xs h-xs">
    <svg style="--shadow-color: var(--rgb-danger)" class="drop-shadow-lg" viewBox="0 0 235 271">
      <g fill="currentColor">
        <polygon opacity="0.3" points="117.346442 0 234.692884 67.75 117.846442 136 0 67.75" />
        <polygon opacity="0.5" points="117.846442 136 234.692884 67.75 234.692884 203.25 117.346442 271" />
        <polygon opacity="1" points="117.846442 136 117.346442 271 1.62850903e-14 203.25 0 67.75" />
      </g>
    </svg>
  </div>
  <div class="text-danger w-xs h-xs">
    <svg style="--shadow-color: var(--rgb-danger)" class="drop-shadow-xl" viewBox="0 0 235 271">
      <g fill="currentColor">
        <polygon opacity="0.3" points="117.346442 0 234.692884 67.75 117.846442 136 0 67.75" />
        <polygon opacity="0.5" points="117.846442 136 234.692884 67.75 234.692884 203.25 117.346442 271" />
        <polygon opacity="1" points="117.846442 136 117.346442 271 1.62850903e-14 203.25 0 67.75" />
      </g>
    </svg>
  </div>
</div>
```

:::

## 阴影颜色

阴影支持调用状态色的 RGB 值。例如 `var(--rgb-primary)`, 它们已经提前写入到 html 文档下的 `:root` 属性内

#### box-shadow:

:::demo

```html
<div class="display-flex flex-row gap-xxl items-center items-middle">
  <div style="--shadow-color: var(--rgb-primary)" class="box-shadow-xl bg-content display-flex items-middle items-center w-xs h-xs text-primary radius-xl">level-1</div>
  <div style="--shadow-color: var(--rgb-danger)" class="box-shadow-xl bg-content display-flex items-middle items-center w-xs h-xs text-danger radius-xl">level-1</div>
  <div style="--shadow-color: var(--rgb-warning)" class="box-shadow-xl bg-content display-flex items-middle items-center w-xs h-xs text-warning radius-xl">level-1</div>
  <div style="--shadow-color: var(--rgb-success)" class="box-shadow-xl bg-content display-flex items-middle items-center w-xs h-xs text-success radius-xl">level-1</div>
  <div style="--shadow-color: var(--rgb-info)" class="box-shadow-xl bg-content display-flex items-middle items-center w-xs h-xs text-info radius-xl">level-1</div>
</div>
```

:::

#### filter:drop-shadow()

:::demo-dark

```html
<div class="display-flex flex-row gap-xxl items-center items-middle m-y-xxl">
  <div class="display-flex flex-row gap-xxl items-center items-middle text-primary w-xs h-xs">
    <svg style="--shadow-color: var(--rgb-primary)" class="drop-shadow-xl" viewBox="0 0 235 271">
      <g fill="currentColor">
        <polygon opacity="1" points="117.346442 0 234.692884 67.75 117.846442 136 0 67.75" />
        <polygon opacity="0.5" points="117.846442 136 234.692884 67.75 234.692884 203.25 117.346442 271" />
        <polygon opacity="0.3" points="117.846442 136 117.346442 271 1.62850903e-14 203.25 0 67.75" />
      </g>
    </svg>
  </div>

  <div class="display-flex flex-row gap-xxl items-center items-middle text-danger w-xs h-xs">
    <svg style="--shadow-color: var(--rgb-danger)" class="drop-shadow-xl" viewBox="0 0 235 271">
      <g fill="currentColor">
        <polygon opacity="1" points="117.346442 0 234.692884 67.75 117.846442 136 0 67.75" />
        <polygon opacity="0.5" points="117.846442 136 234.692884 67.75 234.692884 203.25 117.346442 271" />
        <polygon opacity="0.3" points="117.846442 136 117.346442 271 1.62850903e-14 203.25 0 67.75" />
      </g>
    </svg>
  </div>

  <div class="display-flex flex-row gap-xxl items-center items-middle text-warning w-xs h-xs">
    <svg style="--shadow-color: var(--rgb-warning)" class="drop-shadow-xl" viewBox="0 0 235 271">
      <g fill="currentColor">
        <polygon opacity="1" points="117.346442 0 234.692884 67.75 117.846442 136 0 67.75" />
        <polygon opacity="0.5" points="117.846442 136 234.692884 67.75 234.692884 203.25 117.346442 271" />
        <polygon opacity="0.3" points="117.846442 136 117.346442 271 1.62850903e-14 203.25 0 67.75" />
      </g>
    </svg>
  </div>

  <div class="display-flex flex-row gap-xxl items-center items-middle text-success w-xs h-xs">
    <svg style="--shadow-color: var(--rgb-success)" class="drop-shadow-xl" viewBox="0 0 235 271">
      <g fill="currentColor">
        <polygon opacity="1" points="117.346442 0 234.692884 67.75 117.846442 136 0 67.75" />
        <polygon opacity="0.5" points="117.846442 136 234.692884 67.75 234.692884 203.25 117.346442 271" />
        <polygon opacity="0.3" points="117.846442 136 117.346442 271 1.62850903e-14 203.25 0 67.75" />
      </g>
    </svg>
  </div>

  <div class="display-flex flex-row gap-xxl items-center items-middle text-info w-xs h-xs">
    <svg style="--shadow-color: var(--rgb-info)" class="drop-shadow-xl" viewBox="0 0 235 271">
      <g fill="currentColor">
        <polygon opacity="1" points="117.346442 0 234.692884 67.75 117.846442 136 0 67.75" />
        <polygon opacity="0.5" points="117.846442 136 234.692884 67.75 234.692884 203.25 117.346442 271" />
        <polygon opacity="0.3" points="117.846442 136 117.346442 271 1.62850903e-14 203.25 0 67.75" />
      </g>
    </svg>
  </div>
</div>
```

:::

## 行内样式中调用

在行内样式中调用状态色更有利于保持视觉系统的一致性，同时还能接受全局调整的影响。

:::demo-dark

```html
<div class="display-flex flex-row gap-xxl items-center items-middle m-y-xxl">
  <div class="display-flex flex-row gap-xxl items-center items-middle text-primary w-xs h-xs">
    <svg style="filter: drop-shadow(0 48px 0 rgba(var(--rgb-primary), 0.2));" viewBox="0 0 235 271">
      <g fill="currentColor">
        <polygon opacity="1" points="117.346442 0 234.692884 67.75 117.846442 136 0 67.75" />
        <polygon opacity="0.7" points="117.846442 136 234.692884 67.75 234.692884 203.25 117.346442 271" />
        <polygon opacity="0.5" points="117.846442 136 117.346442 271 1.62850903e-14 203.25 0 67.75" />
      </g>
    </svg>
  </div>
</div>
```

:::
