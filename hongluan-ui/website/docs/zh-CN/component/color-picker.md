# ColorPicker 颜色选择器

用于颜色选择，支持多种格式。

:::tip

组件需要包裹 `<client-only></client-only>` 标签，当用在 SSR (eg: [Nuxt](https://nuxt.com/v3)) 和 SSG (eg: [VitePress](https://vitepress.vuejs.org/))。

:::

## 基础用法

:::demo-fs 使用 v-model 与 Vue 实例中的一个变量进行双向绑定，绑定的变量需要是字符串类型。

color-picker/basic

:::

## 选择透明度

:::demo-fs ColorPicker 支持普通颜色，也支持带 Alpha 通道的颜色， 要启用 Alpha 选择，只需添加 show-alpha 属性。

color-picker/alpha

:::

## 预定义颜色

:::demo-fs 预定义颜色

color-picker/predefined-color

:::

## 不同尺寸

:::demo-fs

color-picker/sizes

:::

## Attributes

| 参数             | 说明     | 类型               | 可选值        | 默认值    |
| --------------------- | --------- | ------------------ | ---------------------- | -------------- |
| model-value / v-model | 选中项绑定值    | string             | —                      | —    |
| disabled              | 是否禁用    | boolean            | —                      | false  |
| size                  | 尺寸    | string             | large / default /small | —  |
| show-alpha            | 是否支持透明度选择  | boolean            | —                      | false |
| color-format          | 写入 v-model 的颜色的格式  | string             | hsl / hsv / hex / rgb  | hex (当 show-alpha 为 false) / rgb (当 show-alpha 为 true) |
| popper-class          | 颜色选择弹窗自定义类 | string | —                      | —   |
| predefine             | 预定义颜色  | array              | —                      | —  |
| teleported            | 下拉框节点是否添加到body上 | boolean         | —  | true |
| validate-event| 是否触发表单验证  | boolean   | -     | true  |

## Events

| 事件名称   | 说明                                    | 回调参数         |
| ------------- | ---------------------------------------------- | ------------------ |
| change        | 当绑定值变化时触发              | 当前值        |
| active-change | 面板中当前显示的颜色发生改变时触发 | 当前显示的颜色值 |
