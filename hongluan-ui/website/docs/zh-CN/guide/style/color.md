# StateColor 状态颜色

Hongluan的色彩体系由`状态色`和`品牌色`构建而成，色彩系统对我们的界面风格和组件进行主题化。并且为任意项目提供了更加全面的定制和扩展。


## 状态色
色彩系统配置了5个状态色，它们分别用于表达相应的交互含义。

 <hl-group full gap="var(--lg)" class="m-b-lg">
  <hl-group dir="vertical" class="radius-lg w-sm border box-shadow-md overflow-hidden">
    <div class="w-full h-xs bg-primary"></div>
    <span class="p-sm text-center">Primary</span>
  </hl-group>
  <hl-group dir="vertical" class="radius-lg w-sm border box-shadow-md overflow-hidden">
    <div class="w-full h-xs bg-success"></div>
    <span class="p-sm text-center">Success</span>
  </hl-group>
  <hl-group dir="vertical" class="radius-lg w-sm border box-shadow-md overflow-hidden">
    <div class="w-full h-xs bg-warning"></div>
    <span class="p-sm text-center">Warning</span>
  </hl-group>
  <hl-group dir="vertical" class="radius-lg w-sm border box-shadow-md overflow-hidden">
    <div class="w-full h-xs bg-danger"></div>
    <span class="p-sm text-center">Danger</span>
  </hl-group>
  <hl-group dir="vertical" class="radius-lg w-sm border box-shadow-md overflow-hidden">
    <div class="w-full h-xs bg-info"></div>
    <span class="p-sm text-center">Info</span>
  </hl-group>
</hl-group>

在`packages/theme/src/common/config.scss`文件中修改或增加状态色。

```scss
$conf_state_color: (
  "primary": (......),
  "success": (......),
  "warning": (......),
  "danger": (......),
  "info": (......),
  // 新增
  ...: (
    "key": value
  ),
) !default;
```
:::tip
  配置文件采用SCSS编写，需要你对SCSS的[Map函数](https://sass-lang.com/documentation/values/maps)有所了解。
:::

## 渐进颜色

Hongluan 为每一个状态色都赋予了 `light` 和 `dark` 的渐进色。

<hl-row layout="grid" gap="var(--lg)" count="md:count-3" class="font-sm m-b-md">
  <hl-col span="col">
    <hl-group dir="vertical" full class="p-md text-inverse bg-primary">
      <hl-group class="font-h3 font-bold">Primary</hl-group>
      <hl-group>首选色、品牌主色系</hl-group>
    </hl-group>
    <div class="text-primary-dark-5 p-sm bg-primary-light-5">light-5</div>
    <div class="text-primary-dark-5 p-sm bg-primary-light-4">light-4</div>
    <div class="text-primary-dark-5 p-sm bg-primary-light-3">light-3</div>
    <div class="text-primary-dark-5 p-sm bg-primary-light-2">light-2</div>
    <div class="text-primary-dark-5 p-sm bg-primary-light-1">light-1</div>
    <div class="text-inverse p-sm bg-primary">primary</div>
    <div class="text-primary-light-5 p-sm bg-primary-dark-1">dark-1</div>
    <div class="text-primary-light-5 p-sm bg-primary-dark-2">dark-2</div>
    <div class="text-primary-light-5 p-sm bg-primary-dark-3">dark-3</div>
    <div class="text-primary-light-5 p-sm bg-primary-dark-4">dark-4</div>
    <div class="text-primary-light-5 p-sm bg-primary-dark-5">dark-5</div>
  </hl-col>
  <hl-col span="col">
    <hl-group dir="vertical" full class="p-md text-inverse bg-danger">
      <hl-group class="font-h3 font-bold">Danger</hl-group>
      <hl-group>危险提示、强调</hl-group>
    </hl-group>
    <div class="text-danger-dark-5 p-sm bg-danger-light-5">light-5</div>
    <div class="text-danger-dark-5 p-sm bg-danger-light-4">light-4</div>
    <div class="text-danger-dark-5 p-sm bg-danger-light-3">light-3</div>
    <div class="text-danger-dark-5 p-sm bg-danger-light-2">light-2</div>
    <div class="text-danger-dark-5 p-sm bg-danger-light-1">light-1</div>
    <div class="text-inverse p-sm bg-danger">danger</div>
    <div class="text-danger-light-5 p-sm bg-danger-dark-1">dark-1</div>
    <div class="text-danger-light-5 p-sm bg-danger-dark-2">dark-2</div>
    <div class="text-danger-light-5 p-sm bg-danger-dark-3">dark-3</div>
    <div class="text-danger-light-5 p-sm bg-danger-dark-4">dark-4</div>
    <div class="text-danger-light-5 p-sm bg-danger-dark-5">dark-5</div>
  </hl-col>
  <hl-col span="col">
    <hl-group dir="vertical" full class="p-md text-inverse bg-warning">
      <hl-group class="font-h3 font-bold">Warning</hl-group>
      <hl-group>警示、不被推荐</hl-group>
    </hl-group>
    <div class="text-warning-dark-5 p-sm bg-warning-light-5">light-5</div>
    <div class="text-warning-dark-5 p-sm bg-warning-light-4">light-4</div>
    <div class="text-warning-dark-5 p-sm bg-warning-light-3">light-3</div>
    <div class="text-warning-dark-5 p-sm bg-warning-light-2">light-2</div>
    <div class="text-warning-dark-5 p-sm bg-warning-light-1">light-1</div>
    <div class="text-inverse p-sm bg-warning">warning</div>
    <div class="text-warning-light-5 p-sm bg-warning-dark-1">dark-1</div>
    <div class="text-warning-light-5 p-sm bg-warning-dark-2">dark-2</div>
    <div class="text-warning-light-5 p-sm bg-warning-dark-3">dark-3</div>
    <div class="text-warning-light-5 p-sm bg-warning-dark-4">dark-4</div>
    <div class="text-warning-light-5 p-sm bg-warning-dark-5">dark-5</div>
  </hl-col>
  <hl-col span="col">
    <hl-group dir="vertical" full class="p-md text-inverse bg-success">
      <hl-group class="font-h3 font-bold">Success</hl-group>
      <hl-group>通过、正常、成功反馈</hl-group>
    </hl-group>
    <div class="text-success-dark-5 p-sm bg-success-light-5">light-5</div>
    <div class="text-success-dark-5 p-sm bg-success-light-4">light-4</div>
    <div class="text-success-dark-5 p-sm bg-success-light-3">light-3</div>
    <div class="text-success-dark-5 p-sm bg-success-light-2">light-2</div>
    <div class="text-success-dark-5 p-sm bg-success-light-1">light-1</div>
    <div class="text-inverse p-sm bg-success">success</div>
    <div class="text-success-light-5 p-sm bg-success-dark-1">dark-1</div>
    <div class="text-success-light-5 p-sm bg-success-dark-2">dark-2</div>
    <div class="text-success-light-5 p-sm bg-success-dark-3">dark-3</div>
    <div class="text-success-light-5 p-sm bg-success-dark-4">dark-4</div>
    <div class="text-success-light-5 p-sm bg-success-dark-5">dark-5</div>
  </hl-col>
  <hl-col span="col">
    <hl-group dir="vertical" full class="p-md text-inverse bg-info">
      <hl-group class="font-h3 font-bold">Info</hl-group>
      <hl-group>提示信息</hl-group>
    </hl-group>
    <div class="text-info-dark-5 p-sm bg-info-light-5">light-5</div>
    <div class="text-info-dark-5 p-sm bg-info-light-4">light-4</div>
    <div class="text-info-dark-5 p-sm bg-info-light-3">light-3</div>
    <div class="text-info-dark-5 p-sm bg-info-light-2">light-2</div>
    <div class="text-info-dark-5 p-sm bg-info-light-1">light-1</div>
    <div class="text-inverse p-sm bg-info">info</div>
    <div class="text-info-light-5 p-sm bg-info-dark-1">dark-1</div>
    <div class="text-info-light-5 p-sm bg-info-dark-2">dark-2</div>
    <div class="text-info-light-5 p-sm bg-info-dark-3">dark-3</div>
    <div class="text-info-light-5 p-sm bg-info-dark-4">dark-4</div>
    <div class="text-info-light-5 p-sm bg-info-dark-5">dark-5</div>
  </hl-col>
</hl-row>

## 透明状态色
你也可以使用透明度`opacity`属性来设置状态颜色，例如：`bg-primary-opacity-9`

<hl-group full dir="vertical" class="m-b-md font-sm font-bold text-center text-inverse" style="background-color: #000">
  <hl-group full class="hover:bg-primary-dark-5 transition">
    <div class="bg-primary p-sm w-xs">primary</div>
    <div class="bg-primary-opacity-9 p-sm">9</div>
    <div class="bg-primary-opacity-8 p-sm">8</div>
    <div class="bg-primary-opacity-7 p-sm">7</div>
    <div class="bg-primary-opacity-6 p-sm">6</div>
    <div class="bg-primary-opacity-5 p-sm">5</div>
    <div class="bg-primary-opacity-4 p-sm">4</div>
    <div class="bg-primary-opacity-3 p-sm">3</div>
    <div class="bg-primary-opacity-2 p-sm">2</div>
    <div class="bg-primary-opacity-1 p-sm">1</div>
  </hl-group>
  <hl-group full class="hover:bg-danger-dark-5 transition">
    <div class="bg-danger p-sm w-xs">Danger</div>
    <div class="bg-danger-opacity-9 p-sm">9</div>
    <div class="bg-danger-opacity-8 p-sm">8</div>
    <div class="bg-danger-opacity-7 p-sm">7</div>
    <div class="bg-danger-opacity-6 p-sm">6</div>
    <div class="bg-danger-opacity-5 p-sm">5</div>
    <div class="bg-danger-opacity-4 p-sm">4</div>
    <div class="bg-danger-opacity-3 p-sm">3</div>
    <div class="bg-danger-opacity-2 p-sm">2</div>
    <div class="bg-danger-opacity-1 p-sm">1</div>
  </hl-group>
  <hl-group full class="hover:bg-warning-dark-5 transition">
    <div class="bg-warning p-sm w-xs">Warning</div>
    <div class="bg-warning-opacity-9 p-sm">9</div>
    <div class="bg-warning-opacity-8 p-sm">8</div>
    <div class="bg-warning-opacity-7 p-sm">7</div>
    <div class="bg-warning-opacity-6 p-sm">6</div>
    <div class="bg-warning-opacity-5 p-sm">5</div>
    <div class="bg-warning-opacity-4 p-sm">4</div>
    <div class="bg-warning-opacity-3 p-sm">3</div>
    <div class="bg-warning-opacity-2 p-sm">2</div>
    <div class="bg-warning-opacity-1 p-sm">1</div>
  </hl-group>
  <hl-group full class="hover:bg-success-dark-5 transition">
    <div class="bg-success p-sm w-xs">Success</div>
    <div class="bg-success-opacity-9 p-sm">9</div>
    <div class="bg-success-opacity-8 p-sm">8</div>
    <div class="bg-success-opacity-7 p-sm">7</div>
    <div class="bg-success-opacity-6 p-sm">6</div>
    <div class="bg-success-opacity-5 p-sm">5</div>
    <div class="bg-success-opacity-4 p-sm">4</div>
    <div class="bg-success-opacity-3 p-sm">3</div>
    <div class="bg-success-opacity-2 p-sm">2</div>
    <div class="bg-success-opacity-1 p-sm">1</div>
  </hl-group>
  <hl-group full class="hover:bg-info-dark-5 transition">
    <div class="bg-info p-sm w-xs">Info</div>
    <div class="bg-info-opacity-9 p-sm">9</div>
    <div class="bg-info-opacity-8 p-sm">8</div>
    <div class="bg-info-opacity-7 p-sm">7</div>
    <div class="bg-info-opacity-6 p-sm">6</div>
    <div class="bg-info-opacity-5 p-sm">5</div>
    <div class="bg-info-opacity-4 p-sm">4</div>
    <div class="bg-info-opacity-3 p-sm">3</div>
    <div class="bg-info-opacity-2 p-sm">2</div>
    <div class="bg-info-opacity-1 p-sm">1</div>
  </hl-group>
</hl-group>

除了`bg-primary`背景支持状态色以外，文本`text-primary`、边框`border-primary`均支持状态色，以及渐近和透明度属性。例如：

<hl-group gap="var(--lg)" class="m-b-xl">
  <div class="p-y-sm p-x-lg radius-lg bg-light border">text-danger<span class="text-primary font-bold" style="text-decoration: underline;">-dark-1</span></div>
  <div class="p-y-sm p-x-lg radius-lg bg-light border">border-danger<span class="text-primary font-bold" style="text-decoration: underline;">-opacity-1</span></div>
</hl-group>

:::tip
只有 **状态色** 和 **品牌色** 可以使用渐进和透明度样式
:::

## 背景色

背景色用于修饰页面的层级，Hongluan为提前为你提供了下面几种常用样式

```scss
$conf_bg_color: (
  "body": #FFFFFF, // 主体背景
  "header": #FFFFFF, // 标题背景
  "content": #FFFFFF, // 内容区背景
  "light": #F6F9FB, // 淡色背景 (用于展示一个范围)
  "popup": #FFFFFF, // 弹窗背景 (浮层、弹窗等)
  "element": #FFFFFF, // 组件元素背景
  "hover": #F6F9FB, // 通用悬停背景
  "active": #F6F9FB, // 通用选中背景
  "backdrop": rgba(#000000, 0.3), // 幕布背景
) !default;
```

你也可以通过工具类快速调用： 

<hl-row layout="grid" count="xl:count-5 md:count-3" gap="var(--sm)">
  <hl-col span="col"><span class="display-block p-y-xs p-x-lg radius-lg bg-light border">bg-body</span></hl-col>
  <hl-col span="col"><span class="display-block p-y-xs p-x-lg radius-lg bg-light border">bg-header</span></hl-col>
  <hl-col span="col"><span class="display-block p-y-xs p-x-lg radius-lg bg-light border">bg-content</span></hl-col>
  <hl-col span="col"><span class="display-block p-y-xs p-x-lg radius-lg bg-light border">bg-light</span></hl-col>
  <hl-col span="col"><span class="display-block p-y-xs p-x-lg radius-lg bg-light border">bg-popup</span></hl-col>
  <hl-col span="col"><span class="display-block p-y-xs p-x-lg radius-lg bg-light border">bg-element</span></hl-col>
  <hl-col span="col"><span class="display-block p-y-xs p-x-lg radius-lg bg-light border">bg-hover</span></hl-col>
  <hl-col span="col"><span class="display-block p-y-xs p-x-lg radius-lg bg-light border">bg-active</span></hl-col>
  <hl-col span="col"><span class="display-block p-y-xs p-x-lg radius-lg bg-light border">bg-backdrop</span></hl-col>
</hl-row>

## 文本色

文本颜色使用 `text-` 前缀，Hongluan总结了下面几种颜色的使用场景，文本颜色也拥有状态色样式

:::demo-dark

```html
<template>
  <hl-group gap="var(--md)" wrap>
    <hl-group class="text-regular p-sm bg-backdrop radius-xl">常用 text-regular</hl-group>
    <hl-group class="text-secondary p-sm bg-backdrop radius-xl">次要 text-secondary</hl-group>
    <hl-group class="text-light p-sm bg-backdrop radius-xl">淡色 text-light</hl-group>
    <hl-group class="text-lightest p-sm bg-backdrop radius-xl">极淡 text-lightest</hl-group>
    <hl-group class="text-title p-sm bg-backdrop radius-xl">标题 text-title</hl-group>
    <hl-group class="text-link p-sm bg-backdrop radius-xl">链接 text-link</hl-group>
    <hl-group class="text-hover p-sm bg-backdrop radius-xl">悬停 text-hover</hl-group>
    <hl-group class="text-inverse p-sm bg-backdrop radius-xl">反色 text-inverse</hl-group>
    <hl-group class="text-inherit p-sm bg-backdrop radius-xl">继承 text-inherit</hl-group>
    <hl-group class="text-primary p-sm bg-backdrop radius-xl">首选 text-primary</hl-group>
    <hl-group class="text-success p-sm bg-backdrop radius-xl">成功 text-success</hl-group>
    <hl-group class="text-warning p-sm bg-backdrop radius-xl">警告 text-warning</hl-group>
    <hl-group class="text-danger p-sm bg-backdrop radius-xl">危险 text-danger</hl-group>
    <hl-group class="text-info p-sm bg-backdrop radius-xl">信息 text-info</hl-group>
  </hl-group>
</template>
```
:::


## 交互响应

除了设置文本色、状态色以外，我们还可以为元素的交互`hover`、`active`、`focus`设置状态颜色

:::tip
为了利于记忆，交互状态的标签是写在颜色前面的，例如  `hover:bg-primary` `active:bg-primary`
:::

:::demo-dark

```html
<template>
  <hl-row layout="grid" gap="var(--md)" count="md:count-3">
    <hl-col span="col"><span class="display-block hover:bg-primary text-inverse p-sm bg-backdrop radius-xl w-full text-center">Hover 背景色</span></hl-col>
    <hl-col span="col"><span class="display-block hover:text-primary text-inverse p-sm bg-backdrop radius-xl w-full text-center">Hover 文本色</span></hl-col>
    <hl-col span="col"><span class="display-block hover:border-primary border border-transparent text-inverse p-sm bg-backdrop radius-xl w-full text-center">Hover 边框色</span></hl-col>
    <hl-col span="col"><span class="display-block active:bg-primary text-inverse p-sm bg-backdrop radius-xl w-full text-center">Active 背景色</span></hl-col>
    <hl-col span="col"><span class="display-block active:text-primary text-inverse p-sm bg-backdrop radius-xl w-full text-center">Active 文本色</span></hl-col>
    <hl-col span="col"><span class="display-block active:border-primary border border-transparent text-inverse p-sm bg-backdrop radius-xl w-full text-center">Active 边框色</span></hl-col>
    <hl-col span="col"><input class="focus:bg-primary border border-transparent text-inverse p-sm bg-backdrop radius-xl w-full text-center" value="Focus 背景色" /></hl-col>
    <hl-col span="col"><input class="focus:text-primary border border-transparent text-inverse p-sm bg-backdrop radius-xl w-full text-center" value="Focus 文本色" /></hl-col>
    <hl-col span="col"><input class="focus:border-primary border border-transparent text-inverse p-sm bg-backdrop radius-xl w-full text-center" value="Focus 边框色" /></hl-col>
  </hl-row>
</template>
```

:::

## Checked属性

当父元素中有`is-checked`类名或`:checked`状态的时候，你可以选择使用类似`checked:bg-primary`的类名来调用

:::demo-dark

```html
<template>
  <hl-row layout="grid" gap="var(--md)" count="md:count-3" class="is-checked">
    <hl-col span="col">
      <span class="display-block checked:bg-primary text-inverse p-sm bg-backdrop  w-full text-center radius-xl">Hover 背景色</span>
    </hl-col>
    <hl-col span="col">
      <span class="display-block checked:text-primary text-inverse p-sm bg-backdrop  w-full text-center radius-xl">Hover 文本色</span>
    </hl-col>
    <hl-col span="col">
      <span class="display-block checked:border-primary border border-transparent text-inverse p-sm bg-backdrop w-full text-center radius-xl">Hover 边框色</span>
    </hl-col>
  </hl-row>
</template>

<script>
  import { defineComponent, ref } from 'vue'
  export default defineComponent({
    setup() {
      const checkboxGroup = ref(['选项一'])
      return {
        checkboxGroup,
      }
    },
  })
</script>
```

:::

:::danger
Hongluan的整个色彩系统均支持 `hover`、`active`、`checked`的交互状态
:::