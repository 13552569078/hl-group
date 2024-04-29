# Collapse 折叠面板

通过折叠面板收纳内容区域,可同时展开多个面板，面板之间不影响

:::demo-fs

collapse/basic

:::

## 手风琴效果

每次只能展开一个面板

:::demo-fs 通过 `accordion` 属性来设置是否以手风琴模式显示。

collapse/accordion

:::

## 间距

使用 `gap` 属性可以设置每个 CollapseItem 组件之间的间距

:::demo-fs 通过 `accordion` 属性来设置是否以手风琴模式显示。

collapse/gap

:::

## 自定义面板标题

除了可以通过 `title` 属性以外，还可以通过具名 `slot` 来实现自定义面板的标题内容，以实现增加图标等效果。

:::demo-fs

collapse/title

:::

## Attributes

| 参数                  | 说明                                                                      | 类型           | 可选值 | 默认值 |
| --------------------- | ------------------------------------------------------------------------- | -------------- | ------ | ------ |
| model-value / v-model | 当前激活的面板(如果是手风琴模式，绑定值类型需要为`string`，否则为`array`) | string / array | —      | —      |
| accordion             | 是否手风琴模式                                                            | boolean        | —      | false  |
| gap                   | 设置 Item 之间的间隙                                                      | string         | —      | -      |
| header-gap             | 设置 item-header  元素之间的间隙                                           | string         | —      | -      |
| padding               | 设置 item-header 的左右间距                                               | string         | —      | -      |
| content-padding       | 设置内容区的间距                                                          | string         | —      | -      |
| arrowLeft             | 将指示箭头放到左边                                           | boolean         | —      | false      |

## Events

| 事件名称 | 说明                                                                                       | 回调参数                      |
| -------- | ------------------------------------------------------------------------------------------ | ----------------------------- |
| change   | 当前激活面板改变时触发(如果是手风琴模式，参数 `activeNames` 类型为`string`，否则为`array`) | (activeNames: array / string) |

## Collapse Item Attributes

| 参数     | 说明       | 类型          | 可选值 | 默认值 |
| -------- | ---------- | ------------- | ------ | ------ |
| name     | 唯一标志符 | string/number | —      | —      |
| title    | 面板标题   | string        | —      | —      |
| disabled | 是否禁用   | boolean       | —      | —      |

## Collapse Item Slot

| 参数  | 说明                       |
| ----- | -------------------------- |
| —     | Collapse Item 的正文内容   |
| title | Collapse Item 的标题区内容 |
