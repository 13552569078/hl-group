# Popover 气泡弹框

点击/鼠标移入元素，弹出气泡式的卡片浮层。

:::tip

组件需要包裹 `<client-only></client-only>` 标签，当用在 SSR (eg: [Nuxt](https://nuxt.com/v3)) 和 SSG (eg: [VitePress](https://vitepress.vuejs.org/))。

:::

:::tip
***提示***

Popover 内不支持 router-link 组件，请使用 vm.$router.push 代替。

Popover 内不支持 disabled form 元素，参考 [MDN](https://developer.mozilla.org/en-US/docs/Web/Events/mouseenter)， 请在 disabled form 元素外层添加一层包裹元素。
:::

:::demo-fs `trigger`属性用于设置何时触发 Popover，支持四种触发方式：`hover`，`click`，`focus` 和 `contextmenu`。如果你想手动控制它，你可以设置 `:visible`。对于触发 Popover 的元素，有两种写法：使用 `#reference` 的具名插槽，或使用自定义指令`v-popover`指向 Popover 的索引`ref`。

popover/basic

:::


## 虚拟触发

Popover 可以由虚拟元素触发，这个功能就很适合使用在触发元素和展示内容元素是分开的场景。通常我们使用 `#reference` 来放置我们的触发元素， 用 `triggering-element` API，您可以任意设置您的触发元素 但注意到触发元素应该是接受 `mouse` 和 `keyboard` 事件的元素。

:::warning
警告：
v-popover 将被废弃，请使用 virtual-ref 作为替代。
:::

:::tip
需要注意的是，虚拟触发的 tooltip 是受控组件，因此你必须自己去控制 tooltip 是否显示，你将无法通过点击空白处来关闭 tooltip。
:::

:::demo-fs

popover/virtual-trigger

:::

## 方位

在这里我们提供 9 种不同方向的展示方式，可以通过以下完整示例来选择你想要的效果。

:::demo-fs 使用`content`属性来决定`hover`时的提示信息。由`placement`属性决定展示效果：`placement`属性值为：`方向-对齐位置`；四个方向：`top`、`left`、`right`、`bottom`；三种对齐位置：`start`, `end`，默认为空。如`placement="left-end"`，则提示信息出现在目标元素的左侧，且提示信息的底部与目标元素的底部对齐。

popover/placement

:::

## 深色样式

通过设置`effect`属性 为 `dark` 来改变为深色样式，通常用于表现 Tooltip 的效果。
:::demo-fs

popover/effect

:::

## Tooltip 文字提示

Popover 兼具 Tooltip 的功能，使用`tooltip` 属性即可创建一个 Tooltip。

:::demo-fs

popover/tooltip

:::

## 自定义内容

可以在 Popover 中嵌套多种类型信息，以下为嵌套表格的例子。

:::demo-fs 利用分发取代`content`属性

popover/slot

:::

## 单例模式
Popover 可以作为单例，也就是是说你可以同时有多个触发同一个 popover 的触发元素，这个功能是在 虚拟触发 的基础上开发的。

:::tip
已知问题：当使用单例模式时，tooltip 的触发元素发生改变的时候可能会发生弹跳。
:::

:::demo-fs

popover/single

:::

## 阻止弹窗自动隐藏
Popover 内嵌入Select，DatePicker，TimeSelect等具有`body`内弹窗的组件时，点击弹窗内容会导致Popover自动隐藏。为此您有2种方法：1）设置teleported属性为false；2）通过设置`outside-ignore`属性以阻止此行为。

:::demo-fs `outside-ignore`属性演示

popover/keep-visible

:::

## Attributes

| 参数                      | 说明     | 类型           | 可选值       | 默认值    |
| ------------------------- | -------------------------- | -------------- | ------------------------ | ------------- |
| trigger                   | 触发方式。    | string         | click/focus/hover/contextmenu   | click   |
| effect                    | 默认提供的主题     | string         | dark/light    | light      |
| title                     | 标题  | string         | —     | —       |
| tooltip                   | 是否为 tooltip。设置为true时，trigger自动变更为hover，不可更改。  | boolean        | —   | false     |
| content                   | 显示的内容，也可以通过 `slot` 传入 DOM    | string         | —    | —     |
| width                     | 宽度   | string / number | —       | 最小宽度 150px    |
| placement                 | 出现位置   | string         | top/top-start/top-end/bottom/bottom-start/bottom-end/left/left-start/left-end/right/right-start/right-end | bottom    |
| disabled                  | Popover 是否可用  | boolean        | —     | false       |
| visible / v-model:visible | 状态是否可见  | boolean        | —   | false                                                   |
| offset                    | 出现位置的偏移量     | number         | —   | 0 |
| transition                | 定义渐变动画  | string         | —  | fade-in                                          |
| show-arrow                | 是否显示 Tooltip 箭头        | boolean        | —   | true  |
| popper-options            | [popper.js](https://popper.js.org/docs/v2/) 的参数 | Object         | 参考 [popper.js](https://popper.js.org/docs/v2/) 文档                              | `{modifiers: [{name: 'computeStyles',options: {gpuAcceleration: false}}]}` |
| popper-class              | 为 popper 添加类名  | string         | —   | — |
| popper-style              | 为 popper 添加样式  | string         | —   | — |
| show-after                | 延迟出现，单位毫秒 | number         | —    | 0                                                       |
| hide-after                | 延迟关闭，单位毫秒 | number         | —     | 200                                                       |
| auto-close                | Tooltip 出现后自动隐藏延时，单位毫秒，为 0 则不会自动隐藏 | number         | —  | 0 |
| teleported            | Popover下拉框节点是否添加到body上 | boolean         | —  | true |
| virtual-triggering            | 是否为虚拟触发 | boolean         | —  | false |
| virtual-ref            | 触发弹窗的元素引用 | HTMLElement         | —  | - |
| outside-ignore            | 阻止操作弹窗内元素导致弹窗自动隐藏 | MaybeElementRef[]         | —  | [] |
| tabindex                  | Popover 组件的 [tabindex](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/tabindex) | number         | — | - |
| trigger-keys  | 触发元素获得焦点后，定义显示弹窗的键盘键值      | Array | —   | `['Enter','Space']`    |

## Slots

| 参数      | 说明                          |
| --------- | ----------------------------- |
| —         | Popover 内嵌 HTML 文本        |
| reference | 触发 Popover 显示的 HTML 元素 |

## Events

| 事件名称    | 说明                   | 回调参数 |
| ----------- | ---------------------- | -------- |
| show        | 显示时触发             | —        |
| before-enter | 显示动画播放完前触发 | —        |
| after-enter | 显示动画播放完毕后触发 | —        |
| hide        | 隐藏时触发             | —        |
| before-leave | 隐藏动画播放完毕前触发 | —        |
| after-leave | 隐藏动画播放完毕后触发 | —        |
