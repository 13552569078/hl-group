# Layout 布局

用于布局的容器组件，方便快速搭建页面的基本结构：

:::demo

```html
<template>
  <hl-layout class="dom-area" data-name="外层容器">
    <hl-header class="dom-area" data-name="头部">header</hl-header>
    <hl-sub-header class="dom-area" data-name="子级头部"
      >sub-header</hl-sub-header
    >
    <hl-container class="dom-area" data-name="容器">
      <hl-aside class="dom-area" data-name="侧边栏">aside</hl-aside>
      <hl-main
        class="dom-area"
        data-name="主体内容"
        style="min-height: 300px; height: 300px"
        >main</hl-main
      >
    </hl-container>
    <hl-footer class="dom-area" data-name="底部">footer</hl-footer>
  </hl-layout>
</template>

```

:::

## 可拆解结构

你可以移除 `layout` 下的任意布局组件。以方便你设计出丰富的页面结构。

:::demo

```html
<template>
  <hl-layout class="dom-area" data-name="外层容器">
    <hl-header class="dom-area" data-name="头部">header</hl-header>
    <hl-container class="dom-area" data-name="容器">
      <hl-aside class="dom-area" data-name="侧边栏">aside</hl-aside>
      <hl-main
        class="dom-area"
        data-name="主体内容"
        style="min-height: 300px; height: 300px"
        >main</hl-main
      >
    </hl-container>
  </hl-layout>
</template>

```

:::

## 功能演示

hongluan-pro 是使用 hongluan-ui制作的一套企业级业务中台界面模版。[完整地址](http://pro.front.etcc.group/)



## Layout Attributes

| 参数             | 说明             | 类型    | 默认值 |
| ---------------- | ---------------- | ------- | ------ |
| boxed            | 页面居中         | boolean | false  |
| fixed-aside      | 侧边栏是否固定   | boolean | false  |
| fixed-header     | 顶栏是否固定     | boolean | false  |
| fixed-sub-header | 二级顶栏是否固定 | boolean | false  |
| fixed-footer     | 底栏是否固定     | boolean | false  |
| full-header      | 顶栏是否满宽     | boolean | false  |
| full-sub-header  | 二级顶栏是否满宽 | boolean | false  |
| full-footer      | 底栏是否满宽     | boolean | false  |
