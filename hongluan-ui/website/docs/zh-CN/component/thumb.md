# Thumb 缩略图

图片容器，在保留原生 img 的特性下，支持懒加载，自定义占位、加载失败等

:::demo-fs 可通过`fit`确定图片如何适应到容器框，同原生 [object-fit](https://developer.mozilla.org/en-US/docs/Web/CSS/object-fit)。

thumb/basic

:::

## 缩略图尺寸

可通过`size`属性来定义缩略图的尺寸，可选值为 xxs，xs，sm，md，lg，xl，xxl

:::demo-fs

thumb/size

:::

## 圆角和圆形

:::demo-fs 可通过`radius`, `round`属性实现

thumb/radius

:::

## 自定义缩略内容

:::demo-fs

thumb/slot

:::

## 颜色

:::demo-fs

thumb/color

:::

## Light 颜色

设置 `effect` 为 `light` 可使状态色减淡

:::demo-fs

thumb/light

:::

## 占位内容

可通过`slot = placeholder`来自定义占位内容
:::demo-fs

thumb/placeholder

:::

## 加载失败

可通过`slot = error`可自定义加载失败内容
:::demo-fs

thumb/error

:::

## 大图预览

可通过 `previewSrcList` 开启预览大图的功能。
:::demo-fs

thumb/preview

:::

## Attributes

| 参数                | 说明  | 类型    | 可选值          | 默认值 |
| ------------------- | -------------- | ------- | ------------- | ------ |
| alt                 | 原生 alt           | string  | -                                          | -      |
| fit                 | 确定图片如何适应容器框，同原生 [object-fit](https://developer.mozilla.org/en-US/docs/Web/CSS/object-fit) | string  | fill / contain / cover / none / scale-down | -      |
| hide-on-click-modal | 当开启 preview 功能时，是否可以通过点击遮罩层关闭 preview                                                | boolean | true / false                               | false  |
| preview-src-list    | 开启图片预览功能       | Array   | —                                          | -      |
| referrer-policy     | 原生 referrerPolicy           | string  | -                                          | -      |
| src                 | 图片源，同原生          | string  | —                                          | -      |
| type                | 自定义内容时候可选配色           | string  | info, primary, warning, danger, success    | —      |
| z-index             | 设置图片预览的 z-index         | Number  | —                                          | 2000   |
| bordered            | 边框效果          | boolean | -                                          | false  |
| full                | 撑满父元素       | boolean | -                                          | false  |
| initial-index       | 预览的初始化索引, 值应小于 `url-list` 数组长度   | number  | -  | 0   |
| preview-teleported      | Image Viewer 是否插入至 body 元素上 | boolean         | —                   | false  |
| close-on-press-escape | 按ESC键是否关闭Image Viewer  | boolean   | - |true |

## Events

| 事件名称 | 说明             | 回调参数   |
| -------- | ---------------- | ---------- |
| load     | 图片加载成功触发 | (e: Event) |
| error    | 图片加载失败触发 | (e: Error) |

## Slots

| 名称        | 说明                                                                |
| ----------- | ------------------------------------------------------------------- |
| placeholder | 图片未加载的占位内容                                                |
| error       | 加载失败的内容，只有设置了 src 属性，并加载失败后才会显示此插槽内容 |
| default     | 默认内容，未设置 src 时显示                                         |
| tools-after     | ImageViewer操作区域尾部，参数有当前显示图片索引                                         |
| tools-before     | ImageViewer操作区域头部，参数有当前显示图片索引                                    |

## ImageViewer Attributes

| 参数                | 说明                                                                                           | 类型            | 可选值              | 默认值 |
| ------------------- | -------------- | --------------- | ------------------- | ------ |
| url-list            | 用于预览的图片链接列表     | Array\<string\> | -                   | []     |
| z-index             | 预览时遮罩层的 z-index    | number / string | int / string\<int\> | 2000   |
| initial-index       | 预览的首张图片的位置, 小于等于数组长度      | number          | int                 | 0      |
| infinite            | 是否可以无限循环预览    | boolean         | true / false        | true   |
| hide-on-click-modal | 是否可以通过点击遮罩层关闭预览      | boolean         | true / false        | false  |
| teleported      | image 自身是否插入至 body 元素上。嵌套的父元素设置了 transform 属性必须指定该属性并赋值为 true | boolean         | —      | false  |
| zoom-rate          | 初始缩放比例 | number          | 1.2 |

## ImageViewer Events

| 事件名称 | 说明                                                               | 回调参数                     |
| -------- | ------------------------------------------------------------------ | ---------------------------- |
| close    | 当点击 X 按钮或者在 hide-on-click-modal 为 true 时点击遮罩层时触发 | 无                           |
| switch   | 当图片切换时触发                                                   | (val: number) 切换目标的下标 |


## Image Viewer Methods

| 方法名        | 说明           | 参数                                            |
| ------------- | --------------------- | ----------------------------------------------------- |
| setActiveItem | 手动切换图片 | 图片索引值，从0开始 |


## ImageViewer Slots

| 名称   | 说明           |
| ------ | -------------- |
| viewer | 预览区域的内容 |
| tools-after     | ImageViewer操作区域尾部，参数有当前显示图片索引                                         |
| tools-before     | ImageViewer操作区域头部，参数有当前显示图片索引                                    |
