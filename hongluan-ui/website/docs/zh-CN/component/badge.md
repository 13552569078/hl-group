# Badge 徽章

徽章（Badge）是一种小型的用于计数和打标签的组件。

:::demo-fs 定义 `value` 属性，它接受 `number` 或者 `string`。

badge/basic

:::

## 徽章颜色

`Badge` 组件的颜色与状态颜色保持一致。

:::demo-fs

badge/color

:::

## 悬浮位置

设置 `position`属性可以使 `Badge` 悬浮在父元素的四个角上。

:::demo-fs

badge/position

:::

## 手动控制悬浮位置

设置 `offset`属性为数组类型，可以控制 `Badge`的精确位置。

:::demo-fs 数组接收4个值，顺序为：top、right、bottom、left

badge/offset

:::

## 最大值

`max`属性可自定义最大值，需要注意的是，只有当`value`为`Number`时，它才会生效。

:::demo-fs

badge/max

:::

## 圆点徽章

设置`dot`属性可使徽章组件变成一个 8 x 8 像素的圆点。

:::demo-fs

badge/dot

:::

## Attributes

| 参数     | 说明                                                         | 类型            | 可选值                                         | 默认值 |
| -------- | ------------------------------------------------------------ | --------------- | ---------------------------------------------- | ------ |
| value    | 显示值                                                       | string / number | —                                              | —      |
| max      | 最大值，超过最大值会显示 '{max}+'，要求 value 是 Number 类型 | number          | —                                              | 99     |
| dot      | 小圆点                                                       | boolean         | —                                              | false  |
| round    | 是否是圆形                                                   | boolean         | —                                              | false  |
| hidden   | 隐藏 badge                                                   | boolean         | —                                              | false  |
| type    | 类型                                                         | string          | primary / success / warning / danger / info | —      |
| position | 位置                                                         | string          | lt / rt / lb / rb                              | —      |
| offset   | 位置偏移设置                                                   | array         | —                                              | -  |

