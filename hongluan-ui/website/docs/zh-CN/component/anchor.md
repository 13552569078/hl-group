# Anchor 锚点

通过锚点可快速找到信息内容在当前页面的位置。

## 基本用法

:::demo-fs

anchor/basic

:::

## 无轴线模式

设置 `slider-less` 时，可以使用无左侧轴线的锚点样式。

:::demo-fs

anchor/slider-less

:::

## 轴线位置：右侧

使用 `right` 属性可以设置轴线位置。

:::demo-fs

anchor/right

:::

## 锚点滚动偏移量

可以设置 `boundary` 来定制锚点滚动偏移量。

:::demo-fs

anchor/boundary

:::

## 是否改变hash

可以设置点击锚点而不改变浏览器历史。

:::demo-fs

anchor/hash

:::

## 固钉位置

使用 Affix 组件可以让锚点固定在页面之内。

:::demo-fs

anchor/affix

:::

## Attributes

| 参数        | 说明                               | 类型    | 可选值                     | 默认值 |
| ----------- | ---------------------------------- | ------- | -------------------------- | ------ |
| boundary       | 滚动边界值，设置该值为数字后，将会在距离滚动容器 boundary 距离时停止滚动。 `change-hash`为false时无效  | 'start' / 'end' / 'center' / 'nearest' / number  | —                          | 'start'     |
| line-less        | line-less                               | boolean  |  | false   |
| scroll-container      | 滚动容器                           | string | HTMLElement | Window  | -                      | -      |
| change-hash | 是否改变hash。设置为 false 时点击锚点不会改变页面的 hash | boolean  | —                          | true    |
| smooth    | 是否使用平滑滚动                         | boolean | —                          | true   |

## Slots
| name | 说明 |
|------|--------|
| — | 默认插槽 |

## Events

| 事件名称 | 说明                    | 回调参数 |
| -------- | ----------------------- | -------- |
| select    | 用户点击链接时触发 | (hash: string, preHash: string)       |
| change    | 链接发生改变时触发 | (hash: string)       |

## Anchor Link Attributes

| 参数        | 说明                               | 类型    | 可选值                     | 默认值 |
| ----------- | ---------------------------------- | ------- | -------------------------- | ------ |
| title       | 锚点链接的文本内容  | string  | —                          | -     |
| href        | 锚点链接的地址                               | string  |  | -   |

## Anchor Link Slots
| name | 说明 |
|------|--------|
| — | 默认插槽 |
| sublist | 子链接插槽 |
