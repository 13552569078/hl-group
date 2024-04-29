
## 缓动样式

HongluanUI提供了`transition`类，来用于在DOM里编写缓动效果。

<div class="scrollable max-h-xl m-t-md">

| Class                | Properties                                                                                                                                                                                                                   |
| -------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| transition-none      | transition-property: none;                                                                                                                                                                                                   |
| transition-all       | transition-property: all; <br> transition-timing-function: ease; <br>transition-duration: 0.3s;                                                                                 |
| transition           | transition-property: background-color, border-color, color, fill, stroke, opacity, box-shadow, transform; <br>transition-timing-function: ease; <br> transition-duration: 0.3s; |
| transition-colors    | transition-property: background-color, border-color, color, fill, stroke; <br> transition-timing-function: ease; <br> transition-duration: 0.3s;                             |
| transition-opacity   | transition-property: opacity; <br> transition-timing-function: ease; <br> transition-duration: 0.3s;                                                                             |
| transition-shadow    | transition-property: box-shadow; <br> transition-timing-function: ease; <br> transition-duration: 0.3s;                                                                          |
| transition-transform | transition-property: transform; <br> transition-timing-function: ease; <br> transition-duration: 0.3s;                                                                           |

</div>

:::demo-fs

transition/basic

:::


## 内置过渡动画

Hongluan UI 还提供了一套流畅的 [transition 动画](https://vuejs.org/guide/built-ins/transition.html) 。它可以用到所有可以传入动画参数的属性中，你也可以直接使用它。

## fade 淡入淡出

:::demo-fs

transition/fade

:::

## fall 落下效果

:::demo-fs

transition/fall

:::

## bounce 反弹效果

:::demo-fs

transition/bounce

:::

## scale 缩放效果

:::demo-fs

transition/scale

:::

## roadster 跑车效果

:::demo-fs

transition/roadster

:::

## slideTop 向上滑入

:::demo-fs

transition/slide-top

:::

## slideDown 向下滑入

:::demo-fs

transition/slide-down

:::

## slideLeft 向左滑入

:::demo-fs

transition/slide-left

:::

## slideRight 向右滑入

:::demo-fs

transition/slide-right

:::

## slideLeftSide 从边缘向左滑入

:::demo-fs

transition/slide-left-side

:::

## slideRightSide 从边缘向右滑入

:::demo-fs

transition/slide-right-side

:::

## slideTopSide 从边缘向上滑入

:::demo-fs

transition/slide-top-side

:::

## slideBottomSide 从边缘向下滑入

:::demo-fs

transition/slide-bottom-side

:::

## jelly 果冻效果

:::demo-fs 提供`jelly` 效果。

transition/jelly

:::

## slide 效果

:::demo-fs 提供 `slideTop`，`slideDown` 和 `slideTopDown` 三种效果。

transition/slide

:::

## collapse 展开折叠

使用 CollapseTransition 组件实现折叠展开效果。

:::demo-fs

transition/collapse

:::

## 按需引入

```js
// fade/zoom 等
import 'hongluan-ui/theme/scss/common/animate.scss'
// collapse 展开折叠
import { HlCollapseTransition } from 'hongluan-ui'
import Vue from 'vue'

Vue.component(HlCollapseTransition.name, HlCollapseTransition)
```
