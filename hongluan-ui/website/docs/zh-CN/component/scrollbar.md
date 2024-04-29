# Scrollbar 滚动条

用于替换浏览器原生滚动条。

## 基础用法

:::demo-fs 通过 `height` 属性设置滚动条高度，若不设置则根据父容器高度自适应。

scrollbar/basic

:::

## 横向滚动

:::demo-fs 当元素宽度大于滚动条宽度时，会显示横向滚动条，也可以使用鼠标滚轮进行横向滚动。

scrollbar/h

:::

## 最大高度

:::demo-fs 当元素高度超过最大高度，才会显示滚动条。

scrollbar/max-height

:::

## 手动滚动

:::demo-fs 通过使用 `setScrollTop` 与 `setScrollLeft` 方法，可以手动控制滚动条滚动。

scrollbar/manual

:::

## Attributes

| 参数          | 说明            | 类型            | 可选值                 | 默认值   |
|-------------  |---------------- |---------------- |---------------------- |-------- |
| height          | 滚动条高度         | string / number  |          —             |    —     |
| max-height          | 滚动条最大高度         | string / number  |          —             |    —     |
| native          | 是否使用原生滚动条样式         | boolean  |          —             |    false     |
| wrap-style    | 包裹容器的自定义样式  | string | — |    —  |
| wrap-class  | 包裹容器的自定义类名    | string  |    —  |  — |
| view-style  | 视图的自定义样式    | string  |    —  |  — |
| view-class  | 视图的自定义类名    | string  |    —  |  — |
| noresize  | 不响应容器尺寸变化，如果容器尺寸不会发生变化，最好设置它可以优化性能    | boolean  |    —  |  false |
| tag  | 视图的元素标签    | string  |    —  |  div |
| always  | 滚动条总是显示    | boolean  |    —  |  false |
| min-size  | 滚动条最小尺寸    | number  |    —  |  20 |
| distance  | 距离底部或者右侧至少多少像素触发事件。***这个值最好不要设置成0，否则有可能不触发事件***    | number  |    —  |  5 |

## Events

| 事件名称 | 说明 | 回调参数 |
|---------- |-------- |---------- |
| scroll | 滚动时触发的事件 | 滚动距离 `{ scrollLeft, scrollTop }`|
| at-end | 滚动到底部或者右侧时触发，目前只支持滚动到底部触发 |  `{ vertical: true }`|

## Methods

| 方法名      | 说明          | 参数
|---------- |-------------- | --------------
| scrollTo      | 滚动到特定的位置 | (options: ScrollToOptions \| number, yCoord?: number) |
| setScrollTop | 设置滚动条到顶部的距离 | (scrollTop: number)
| setScrollLeft | 设置滚动条到左边的距离 | (scrollLeft: number)
| update | 手动更新滚动条状态 | —   |
