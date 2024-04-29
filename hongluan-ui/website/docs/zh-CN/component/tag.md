# Tag 标签

用于标记和选择。

:::demo-fs 由`type`属性来选择 tag 的颜色。可选值为`primary`、`success`、`warning`、`danger` 和 `info`。

tag/basic

:::

## Light 样式

当标签附有状态色的情况下，你可以在加上 light 属性即可使它的颜色减淡。

:::demo-fs 通过设置`effect="light"`属性来改变主题

tag/light

:::

## 圆角样式

round 属性可以使 tag 呈现为圆边样式

:::demo-fs

tag/round

:::

## 轮廓样式

Tag 组件还提供一款轮廓样式，以便你有更多场景的表达方式。

:::demo-fs

tag/outline

:::

## 尺寸修饰

Tag 组件提供除了默认值以外的两种尺寸，可以在不同场景下选择合适的按钮尺寸。

:::demo-fs

tag/size

:::

## 自定义背景色以及选中状态

:::demo-fs

tag/active

:::

## 可移除标签

设置`closable`属性可以定义一个标签是否可移除。

:::demo-fs 可以设置`disable-transitions`属性，来关闭标签移除时渐变动画，它接受一个`Boolean`，true 为关闭。

tag/closable

:::

## 溢出控制

通过样式设置`width`，可以在文字超出长度后显示省略号。

:::demo-fs 当Tag在其它DOM内部的时候，会根据父元素的宽度来自动隐藏超出的文本。

tag/overflow

:::

## 动态编辑标签

动态编辑标签可以通过点击标签关闭按钮后触发的 `close` 事件来实现

:::demo-fs

tag/addable

:::

## Attributes

| 参数                | 说明             | 类型    | 可选值                              | 默认值 |
| ------------------- | ---------------- | ------- | ----------------------------------- | ------ |
| type                | 类型             | string  | primary/success/warning/danger/info | —      |
| closable            | 是否可关闭       | boolean | —                                   | false  |
| disable-transitions | 是否禁用渐变动画 | boolean | —                                   | false  |
| size                | 尺寸             | string  | sm / lg                             | —      |
| effect              | 主题             | string  | light                               | —      |
| outline             | 边框             | boolean | —                                   | false  |
| round               | 圆角             | boolean | —                                   | false  |
| active              | 选中             | boolean | —                                   | false  |
| color               | 背景色           | string  | —                                   | —      |

## Events

| 事件名称 | 说明                  | 回调参数 |
| -------- | --------------------- | -------- |
| click    | 点击 Tag 时触发的事件 | —        |
| close    | 关闭 Tag 时触发的事件 | —        |

## Slots

| 名称        | 说明           |
| ----------- | --------------------- |
| suffix        | 文字后面内容         |
| prefix       | 文字前面内容  |

