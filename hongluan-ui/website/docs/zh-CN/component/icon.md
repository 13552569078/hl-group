# Icon 图标

提供了一套常用的图标集合，分别三个系列，TwoTones 、 Fill 和 File，所有图标可以参见下面集合示例或者直接访问[图标网站](http://icons.front.etcc.group/)。

## SVG Icon 使用方法

如果你想像用例一样**直接使用**，你需要[全局注册组件](https://v3.vuejs.org/guide/component-registration.html#global-registration)，才能够直接在项目里使用。

```javascript
import { TwoAirplay, FillAirplay } from '@hongluan-ui/icons'
```

## 安装图标

当前的图标适用于 [Vue3(@hongluan-ui/icons)](https://v3.vuejs.org)和[Vue2(@hongluan-ui/icons-vue2)](https://vuejs.org)

### 使用 yarn

```shell
$ yarn add @hongluan-ui/icons
```

### 使用 npm

```shell
$ npm install @hongluan-ui/icons
```

## 基础用法

```html
<template>
  <!-- 用 hl-icon 为 SVG 提供属性 -->
  <hl-icon :size="size" :color="color">
    <two-edit />
  </hl-icon>
  <!-- 或者单独使用，不从上级节点继承任何属性 -->
  <edit />
</template>

<script lang="ts">
  import { TwoEdit } from '@hongluan-ui/icons'

  export default defineComponent({
    components: {
      // 全名
      [TwoEdit.name]: Edit,
      // 或者以缩写的方式,
      TwoEdit,
    },
  })
</script>
```

## 直接使用 SVG icon

:::demo-fs

icon/svg-icon

:::

## 通过 Icon 组件来调用

Icon 组件为 SVG 图标提供额外的属性。

:::demo-fs

icon/icon-component

:::

## 尺寸设置

你可以定义 `icon` 组件的尺寸，例如：`size="lg"`，也可以自定义宽高。

:::demo-fs

icon/size

:::

## 颜色设置

Icon 组件支持状态颜色。 你也可以自定义颜色，例如：`color="#ff6600"`，

:::demo-fs

icon/type

:::

## 渐变设置

`gradient` 属性可使 Icon 呈现为渐变样式，它还可以为状态色渲染一套漂亮的渐变样式。

:::demo-fs-dark `start-color`属性可以自定义渐变开始的颜色。

icon/gradient

:::

## 动画效果

`transition` 属性可使 通过动画的方式展现路径的绘制过程。

:::demo-fs-dark

icon/transition

:::

## 透明度与线条

通过`opacity` 和 `border` 属性来设置图标的透明度和线条粗细。

:::demo-fs SVG 图形的特性，border 线条会根据图片的比例而缩放。

icon/border

:::

## 背景填充

`fill` 属性可为 Icon 加上一个背景色

:::demo-fs `radius` 和 `round` 属性可以改变填充的形状

icon/fill

:::

## 系统图标定制

鸿鸾组件内置图标全部采用 SVG 形式（可能会受下面例子影响），现有：

<hl-row layout="grid" count="xl:count-5 md:count-3 sm:count-2" class="border-top border-left m-b-md">
  <hl-col span="col" v-for="name in $systemIconNames" :key="name" class="display-flex flex-col p-lg items-center items-middle gap-sm border-bottom border-right hover:bg-hover overflow-hidden">
    <hl-icon :name="name">
      <component :is="name" />
    </hl-icon>
    <p class="ellipsis overflow-hidden">{{name}}</p>
  </hl-col>
</hl-row>

因为 SVG 难以通过传递 `class` 样式名称的方式予以定制，所以组件库提供了全局定制内置图标的方法。有以下两种方法（**_注：所有方法都是非响应式，系统内置图标不会时时监测全局属性的改变_**）

- 方法一，全局引入组件库时设置

```js
// h 为 vue 提供的 h 函数
app.use(HongluanUI, {
  size: 'sm',
  zIndex: 3000,
  systemIcons: {
    // 名称参考上面系统图标列表
    SystemLoading: h('span', { innerHTML: 'x' }),
  },
})
```

- 方法二，在组件中通过修改使用 provideGlobalConfig 方法设置

```js
setup() {
  provideGlobalConfig({
    systemIcons: {
      SystemShow: h('span', { innerHTML: '显' }),
      SystemHidden: h('span', { innerHTML: '隐' }),
    },
  })
}
```

:::demo-fs

icon/system-icon

:::

## 图标集（TwoTones 系列）

<hl-row layout="grid" count="xl:count-6 md:count-4" class="border-top border-left">
  <hl-col span="col" v-for="name in $twoIconNames" :key="name" class="display-flex flex-col p-lg items-center items-middle gap-sm border-bottom border-right hover:bg-hover">
    <hl-icon :name="name">
      <component :is="name" />
    </hl-icon>
    <p>{{name}}</p>
  </hl-col>
</hl-row>

## 图标集（Fill 系列）

<hl-row layout="grid" count="xl:count-6 md:count-4" class="border-top border-left">
  <hl-col span="col" v-for="name in $fillIconNames" :key="name" class="display-flex flex-col p-lg items-center items-middle gap-sm border-bottom border-right hover:bg-hover">
    <hl-icon :name="name">
      <component :is="name" />
    </hl-icon>
    <p>{{name}}</p>
  </hl-col>
</hl-row>

## 图标集（File 系列）

<hl-row layout="grid" count="xl:count-6 md:count-4" class="border-top border-left">
  <hl-col span="col" v-for="name in $fileIconNames" :key="name" class="display-flex flex-col p-lg items-center items-middle gap-sm border-bottom border-right hover:bg-hover">
    <hl-icon :name="name" size="xxxl">
      <component :is="name" />
    </hl-icon>
    <p>{{name}}</p>
  </hl-col>
</hl-row>

## Vue 2 版本

Vue 2 版本提供所有Vue 3 版本的图标，但有些Icon组件属性不可用，详情请看下面属性表格部分。

```shell
# 安装方法：
pnpm add @hongluan-ui/icons-vue2

npm i @hongluan-ui/icons-vue2
```

```js
// 使用方法
// 在main.js中导入样式
import "@hongluan-ui/icons-vue2/dist/index.css"
```

```html
<template>
  <hl-icon width="24px" height="24px">
    <fill-airplay />
  </hl-icon>
</template>
<script>
import { FillAirplay, HlIcon } from '@hongluan-ui/icons-vue2'

export default {
  components: { FillAirplay, HlIcon }
}
</script>
```

## Attributes

| 参数        | 说明    | 类型    | 可选值      | 默认值 | Vue版本 |
| ----------- | ------------------- | ------- | ----------- | ------ | ----- |
| color       | 颜色（支持 Fill 系列）                              | string  | —           | -      | 2, 3 |
| width       | 宽（支持 Fill 系列）                                | string  | —           | -      | 2, 3 |
| height      | 高（支持 Fill 系列）                                | string  | —           | -      | 2, 3 |
| size        | 大小，width 和 height 优先于 size（支持 Fill 系列） | string  | sm/md/lg/xl | -      | 3 |
| border      | 边框粗细                                            | number  | —           | 1.5    | 2, 3 |
| opacity     | 填充部分透明度（支持 Fill 系列）                    | number  | —           | 0.2    | 2, 3 |
| type        | 状态色                                              | string  | —           | -      | 3 |
| fill        | 开启背景填充样式                                    | boolean | —           | false  | 2, 3 |
| round       | 圆形样式，依赖 fill 属性                            | boolean | —           | false  | 2, 3 |
| radius      | 圆角样式，依赖 fill 属性                            | boolean | —           | false  | 2, 3 |
| gradient    | 开启 Icon 渐变属性                                  | boolean | —           | false  | 2, 3 |
| start-color | 渐变按钮的起始颜色                                  | string  | —           | -      | 2, 3 |
| effect      | 效果                                                | string  | light       | -      | 3 |
