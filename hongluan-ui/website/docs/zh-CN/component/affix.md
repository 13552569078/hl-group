# Affix 固钉

将页面元素固定在特定可视区域。

## 基本用法

固钉默认固定在页面顶部。

:::demo-fs 通过设置 `offset` 属性来改变吸顶距离，默认值为 0。

affix/basic

:::

## 指定容器

通过设置 `target` 属性，让固钉始终保持在容器内，超过范围则隐藏。

:::demo-fs 请注意容器避免出现滚动条。

affix/container

:::

## 固定位置

Affix 组件提供了两个固定位置：`top` 和 `bottom`。

:::demo-fs 通过设置 `position` 属性来改变固定位置，默认值为 `top` 。

affix/position

:::

## Attributes
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| offset     | 偏移距离           | number | — | 0 |
| position | 固钉位置 | string | top / bottom | top |
| target | 指定容器（CSS 选择器） | string | — | — |
| z-index | 固钉层级 | number | — | 100 |

## Events
| 事件名称 | 说明 | 回调参数 |
|---------- |-------- |---------- |
| change | 固钉状态改变时触发的事件 | (value: boolean) |
| scroll | 滚动时触发的事件 | 滚动距离和固钉状态 |

## Methods
| 方法名 | 说明 | 参数 |
| ---- | ---- | ---- |
| update | 手动更新固钉状态 | — |

