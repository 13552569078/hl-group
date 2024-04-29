# Timeline 时间轴

时间轴通常用于直观的展示时间流信息

:::demo-fs 对 TimelineItem 组件的 dir 属性设置`left` 或 `right` 即可改变子元素的排列方式。

timeline/dir

:::

## 居中排列方式

为 Timeline 组件设置 `center` 属性，可使时间轴居中摆放。

:::demo-fs 同时会为 TimelineItem 创建一个 class 为`item-left`的 DOM 节点来保持居中的效果。

timeline/center

:::

## ⾃定义节点样式

可根据实际场景⾃定义节点颜⾊，或直接使⽤图标。

:::demo-fs

timeline/custom

:::

## 插槽

时间轴提供`default` `dot` `label`三个插槽用于自定义样式

:::demo-fs

timeline/slot

:::

## Attributes

| 参数      | 说明                     | 类型    | 可选值 | 默认值 |
| --------- | ------------------------ | ------- | ------ | ------ |
| center    | 是否时间轴居中显示       | boolean | -      | false  |
| alternate | 是否自动左右交替显示内容 | boolean | —      | false  |

## Timeline Item Attributes

| 参数           | 说明           | 类型    | 可选值                                      | 默认值 |
| -------------- | -------------- | ------- | ------------------------------------------- | ------ |
| timestamp      | 时间戳         | string  | -                                           | —      |
| hide-timestamp | 是否隐藏时间戳 | boolean | —                                           | false  |
| type           | 节点类型       | string  | primary / success / warning / danger / info | -      |
| color          | 节点颜色       | string  | hsl / hsv / hex / rgb                       | -      |
| icon           | 节点图标       | object  | 参见 Icon 组件属性                          | -      |
| dir            | 节点位置       | string  | left / right                                | right  |
| active         | 当前节点       | boolean  | -                                | -  |

## Timeline Item Slots

| name  | 说明                 |
| ----- | -------------------- |
| —     | Timeline-Item 的内容 |
| dot   | 自定义节点，优先级高于icon           |
| label | 自定义节点           |
| icon | 自定义图标           |
