# Menu 导航菜单

为网站提供导航功能的菜单。

:::tip

组件需要包裹 `<client-only></client-only>` 标签，当用在 SSR (eg: [Nuxt](https://nuxt.com/v3)) 和 SSG (eg: [VitePress](https://vitepress.vuejs.org/))。

:::

:::demo-fs 导航菜单默认为垂直模式，通过`mode`属性可以使导航菜单变更为水平模式。另外，在菜单中通过`submenu`组件可以生成二级菜单。Menu 还提供了`background-color`、`text-color`和`active-text-color`，分别用于设置菜单的背景色、菜单的文字颜色和当前激活菜单的文字颜色。

menu/basic

:::

## 侧栏

垂直菜单，可内嵌子菜单。

:::demo-fs 通过 MenuItemGroup 组件可以实现菜单进行分组，分组名可以通过`title`属性直接设定，也可以通过具名 slot 来设定。

menu/sidebar

:::

## 折叠

***注意*** 在启用响应式的情况下，逻辑变成：手工设置折叠以后，响应式不起作用，只能手工展开。在响应式折叠起作用时，手工展开不起作用，只能靠响应式展开。
您也可以设置 `.hl-layout` 下 `--layout-aside-respond-width` 变量为false（不支持动态修改此值），关闭Layout组件下菜单响应式折叠功能。

:::demo-fs 当菜单没有置于Layout组件下时，响应式不会对菜单起作用

menu/collapse

:::

## Attributes
| 参数                | 说明   | 类型    | 可选值                | 默认值   |
| ------------------- | ---------- | ------- | --------------------- | -------- |
| mode                | 模式   | string  | horizontal / vertical | vertical |
| collapse            | 是否水平折叠收起菜单（仅在 mode 为 vertical 时可用）| boolean | —                     | false    |
| ellipsis            | 是否显示省略符（仅在 mode 为 vertical 时可用） | boolean | —                     | true     |
| background-color    | 菜单的背景色（仅支持 hex 格式） | string  | —                     | #ffffff  |
| text-color          | 菜单的文字颜色（仅支持 hex 格式）| string  | —                     | #303133  |
| active-text-color   | 当前激活菜单的文字颜色（仅支持 hex 格式） | string  | —                     | #409EFF  |
| default-active      | 页面加载完成时当前激活菜单的 index  | string  | —                     | —        |
| default-openeds     | 当前打开的 sub-menu 的 index 的数组  | Array   | —                     | —        |
| unique-opened       | 是否只保持一个子菜单的展开   | boolean | —                     | false    |
| menu-trigger        | 子菜单打开的触发方式(只在 mode 为 horizontal 时有效)  | string  | hover / click         | hover    |
| router              | 是否使用 vue-router 的模式，启用该模式会在激活导航时以 index 作为 path 进行路由跳转 | boolean | —                     | false    |

## Methods
| 方法名称 | 说明                | 参数                                |
| -------- | ------------------- | ----------------------------------- |
| open     | 展开指定的 sub-menu | index: 需要打开的 sub-menu 的 index |
| close    | 收起指定的 sub-menu | index: 需要收起的 sub-menu 的 index |

## Events
| 事件名称 | 说明                | 回调参数                                                                   |
| -------- | ------------------- | -------------------------------------------------------------------------- |
| select   | 菜单激活回调        | index: 选中菜单项的 index, indexPath: 选中菜单项的 index path, item: 选中菜单项, routeResult: vue-router 的返回值（如果 router 为 true）              |
| open     | sub-menu 展开的回调 | index: 打开的 sub-menu 的 index, indexPath: 打开的 sub-menu 的 index path |
| close    | sub-menu 收起的回调 | index: 收起的 sub-menu 的 index, indexPath: 收起的 sub-menu 的 index path |

## Slots

| 名称 | 说明               | 子标签                               |
| ---- | ------------------------- | ------------------------------------- |
| —    | 自定义默认内容 | SubMenu / MenuItem / MenuItemGroup |

## Sub Menu Attributes
| 参数                  | 说明   | 类型        | 可选值 | 默认值                                 |
| --------------------- | -------------- | ----------- | ------ | -------------------- |
| index                 | 唯一标志 | string/null | —      | null                                   |
| popper-class          | 弹出菜单的自定义类名  | string      | —      | —                                      |
| show-timeout          | 展开 sub-menu 的延时| number      | —      | 300                                    |
| hide-timeout          | 收起 sub-menu 的延时 | number      | —      | 300                                    |
| disabled              | 是否禁用   | boolean     | —      | false                                  |
| popper-append-to-body | 是否将弹出菜单插入至 body 元素。在菜单的定位出现问题时，可尝试修改该属性 | boolean     | —      | 一级子菜单：true / 非一级子菜单：false |
| fallback-placements | 弹出菜单位置，通过设置此属性可以强制设置弹出位置，否则按照默认设置进行位置计算 | string[]     | —      | - |
| popper-offset  | 弹框偏移 | number  | —               | 0                                               |

## Sub Menu Slots

| 名称 | 说明               | 子标签                               |
| ---- | ------------------------- | ------------------------------------- |
| —    | 自定义默认内容 | SubMenu / MenuItem / MenuItemGroup |
| title | 自定义标题内容   | —                                     |
| icon | 自定义收起 / 展开icon，参数为：{ opend, collapse }   | —                                     |

## Menu Item Attributes
| 参数     | 说明                | 类型    | 可选值 | 默认值 |
| -------- | ------------------- | ------- | ------ | ------ |
| index    | 唯一标志            | string  | —      | —      |
| route    | Vue Router 路径对象 | Object  | —      | —      |
| disabled | 是否禁用            | boolean | —      | false  |

## Menu Item Events

| 事件名称 | 说明                                 | 参数             |
| ---------- | ------------------------------------------- | ---------------------- |
| click      | 单击事件回调函数 | el: MenuItem实例 |

## Menu Item Slots

| 名称 | 说明               |
| ---- | ------------------------- |
| —    | 自定义默认内容 |
| title | 自定义标题内容   | —                                     |

## Menu Item Group Attributes
| 参数  | 说明     | 类型   | 可选值 | 默认值 |
| ----- | -------- | ------ | ------ | ------ |
| title | 分组标题 | string | —      | —      |

## Menu Item Group Slots

| 名称 | 说明               | 子标签                               |
| ---- | ------------------------- | --------- |
| —    | 自定义默认内容 | MenuItem |
| title | 自定义标题内容   | —                                     |
