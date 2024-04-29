# Breadcrumb 面包屑

显示当前页面的路径，快速返回之前的任意页面。

:::demo-fs 在 Breadcrumb 组件中使用 BreadcrumbItem 组件表示从首页开始的每一级。Hongluan UI 提供了一个`separator`属性，在 Breadcrumb 组件中设置它来决定分隔符，它只能是字符串，默认为斜杠`/`。

breadcrumb/basic

:::

## 图标分隔符

通过设置 `icon` 插槽，可使用相应的 `icon图标` 作为分隔符

:::demo-fs 注意，使用`icon` 插槽将使 `separator` 设置失效

breadcrumb/icon

:::

## Attributes

| 参数            | 说明             | 类型   | 可选值 | 默认值  |
| --------------- | ---------------- | ------ | ------ | ------- |
| separator       | 分隔符           | string | —      | 斜杠'/' |

## Slots

| Name  | Description |
| ----- | ----------- |
| —     | 内容        |
| icon  | 自定义 icon |

## Breadcrumb Item Attributes

| 参数    | 说明                                                               | 类型          | 可选值 | 默认值 |
| ------- | ------------------------------------------------------------------ | ------------- | ------ | ------ |
| to      | 路由跳转对象，同 `vue-router` 的 `to`                              | string/object | —      | —      |
| replace | 在使用 to 进行路由跳转时，启用 replace 将不会向 history 添加新记录 | boolean       | —      | false  |

## Breadcrumb Item Slots

| Name  | Description |
| ----- | ----------- |
| —     | 内容        |
| icon  | 自定义 icon，优先级高于Breadcrumb icon插槽 |

