# Spinner 加载状态

使用 Spinner 组件可以展示一个 “加载中” 的工作状态

:::demo-fs

spinner/basic

:::

## 尺寸

`Spinner` 组件的 `size` 可以接收通用的的 xs、md、lg 等尺寸类。

:::demo-fs 你也可以传入值来自定义尺寸。

spinner/size

:::

## 颜色

通过`color`属性来传递色值。

:::demo-fs Spinner通常与其他元素组件组合使用，所以不需要内置状态色，但你可以通过 `var(--danger)` 的方式使用状态颜色。

spinner/color

:::

## 自定义内容

`Spinner` 提供一个默认 slot 你可以插入任意的内容。

:::demo-fs-dark Spinner通常与其他元素组件组合使用，所以不需要内置状态色，但你可以通过 `var(--danger)` 的方式使用状态颜色。

spinner/slot

:::

## 旋转方向

`animation` 属性可以控制自动旋转的方向

:::demo-fs 如果你自定义的图示自带旋转动画，那可以通过 `animation="none"` 开关闭spinner组件的旋转效果

spinner/animation

:::

## 动画时间

`duration` 属性可以控制动画的持续时间

:::demo-fs 如果你自定义的图示自带旋转动画，那可以通过 `animation="none"` 开关闭spinner组件的旋转效果

spinner/duration

:::

## 状态反馈

Spinner 除了展示一个旋转的图示以外，可以根据`status`变量来反馈一个结果。

:::demo-fs Spinner提供 `success` `warning` `error` `info` 4个状态插槽，你可以根据类型自定义内容

spinner/status

:::



## Attributes

| 参数            | 说明                                                                  | 类型                      | 可选值                                     | 默认值  |
| --------------- | --------------------------------------------------------------------- | ------------------------- | ------------------------------------------ | ------- |
| size | 尺寸 | string | xxxs / xxs / xs / md/ lg / xl / xxl / xxxl                                          | —       |
| color        | 颜色                                                              | string                    | —                                          |    |
| animation            | 旋转方向                                                                  | string                    | around-left / around-right / none                                           | around-right       |
| duration           | 动画时间                                                              | string                    |  s / ms | 2s       |
| status           | 状态反馈                                                              | string                    |  success / error / warning / info |        |

## Slots

|   name  | 说明        |
| ------- | ----------- |
| -    | 默认插槽 |
| success    | 成功状态的插槽 |
| error    | 错误状态的插槽 |
| warning    | 警告状态的插槽 |
| info    | 信息提示状态的插槽 |
