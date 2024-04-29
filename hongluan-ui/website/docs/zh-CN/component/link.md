# Link 链接

文字超链接

## 基础用法

基础的文字链接用法。

:::demo-fs

link/basic

:::

## 禁用状态

文字链接不可用状态。

:::demo-fs

link/disabled

:::

## 下划线

下划线

:::demo-fs

link/underline

:::

## 图标

图标

:::tip

可以使用prefix或者suffix `slot` 自定义前缀或者后缀图标。

:::

:::demo-fs

link/with-icon

:::

## Attributes

| 属性名      | 说明      | 说明      | 可选值   | 默认值 |
| --------- | ---------------- | --------------------- | ---------------- | ------- |
| type      | 类型     | string                | primary / success / warning / danger / info / default | default |
| underline | 是否下划线 | boolean / string             | true / false / hover   | false    |
| disabled  | 是否禁用状态   | boolean               | —  | false   |
| href      | 原生 href 属性   | string                | —   | -       |

## Slots

| 插槽名 | 说明               |
| ---- | ------------------------- |
| —    | 自定义默认内容 |
| prefix | 自定义前缀图标  |
| suffix | 自定义后缀图标  |
