# Steps 步骤条

引导用户按照流程完成任务的分步导航条，可根据实际应用场景设定步骤，步骤不得少于 2 步。

## 基础用法

简单的步骤条。

:::demo-fs 设置`active`属性，接受一个`number`，表明步骤的 index，从 0 开始。设置`finish-status`属性可以改变已经完成的步骤的状态。

steps/basic

:::

## 含状态步骤条

每一步骤显示出该步骤的状态。

:::demo-fs 也可以使用`title`具名分发，可以用`slot`的方式来取代属性的设置，在本文档最后的列表中有所有的 slot name 可供参考。

steps/title

:::

## 有描述的步骤条

每个步骤有其对应的步骤状态描述。

:::demo-fs

steps/description

:::

## 居中的步骤条

标题和描述都将居中。

:::demo-fs

steps/center

:::

## 带图标的步骤条

步骤条内可以启用各种自定义的图标。

:::demo-fs 通过`icon`属性来设置图标，图标的类型可以参考 Icon 组件的文档，除此以外，还能通过具名`slot`来使用自定义的图标。

steps/icon

:::

## 纵向步骤条

竖直方向的步骤条。

:::demo-fs 只需要在 Steps 组件中设置`dir`属性为`vertical`即可。

steps/dir

:::

## Attributes

| 参数           | 说明                       | 类型    | 可选值                                    | 默认值     |
| -------------- | -------------------------- | ------- | ----------------------------------------- | ---------- |
| dir            | 显示方向                   | string  | vertical/horizontal                       | horizontal |
| active         | 设置当前激活步骤           | number  | —                                         | 0          |
| process-status | 设置当前步骤的状态         | string  | wait / process / finish / error / success | process    |
| finish-status  | 设置结束步骤的状态         | string  | wait / process / finish / error / success | finish     |
| center         | 进行居中对齐               | boolean | -                                         | false      |
| round          | 设置 step-icon 为 圆形样式 | boolean | -                                         | false      |
| size           | 设置 step-icon 的尺寸      | string  | 任意尺寸 / 通用尺寸标签                   | -          |
| gap            | 设置 step-icon 的边距      | string  | 任意尺寸 / 通用尺寸标签                   | -          |
| item-padding   | 设置 StepItem 的下间距      | string  | 任意尺寸 / 通用尺寸标签                   | -          |

## Step Attributes

| 参数        | 说明                                            | 类型                                      | 可选值 | 默认值 |
| ----------- | ----------------------------------------------- | ----------------------------------------- | ------ | ------ |
| title       | 标题                                            | string                                    | —      | —      |
| description | 描述性文字                                      | string                                    | —      | —      |
| status      | 设置当前步骤的状态，不设置则根据 steps 确定状态 | wait / process / finish / error / success | -      |

### Step Slots

| name        | 说明             |
| ----------- | ---------------- |
| icon        | 自定义图标       |
| success-icon        | 成功状态图标       |
| error-icon        | 错误状态图标       |
| title       | 自定义标题       |
| description | 自定义描述性文字 |
