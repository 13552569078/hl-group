# Dropdown 下拉菜单

将动作或菜单折叠到下拉菜单中。

:::tip

组件需要包裹 `<client-only></client-only>` 标签，当用在 SSR (eg: [Nuxt](https://nuxt.com/v3)) 和 SSG (eg: [VitePress](https://vitepress.vuejs.org/))。

:::

:::demo-fs 通过组件`slot`来设置下拉触发的元素以及需要通过具名`slot`为`dropdown` 来设置下拉菜单。默认情况下，下拉按钮只要`hover`即可，无需点击也会显示下拉菜单。

dropdown/basic

:::

## 触发对象

通常情况下，Dropdown 可使用任意组件来触发下拉菜单。

:::demo-fs 设置`split`属性来让触发下拉元素呈现为按钮组或者链接，取值为 button 或者 link。同时它还会自动为触发元素加上一个小箭头。

dropdown/trigger

:::

## 触发方式

可以配置`trigger`属性 为 `click` 、 `hover` 或者 `contextmenu`

:::demo-fs

dropdown/trigger-type

:::

## 菜单隐藏方式

可以`hide-on-click`属性来配置。

:::demo-fs 下拉菜单默认在点击菜单项后会被隐藏，将`hide-on-click`属性默认为`false`可以关闭此功能。

dropdown/hide

:::

## 指令事件

点击菜单项后会触发事件，用户可以通过相应的菜单项 key 进行不同的操作

:::demo-fs

dropdown/command

:::

## 下拉方法

您可以手动使用 手动打开 或 手动关闭下拉菜单以打开或关闭

:::demo-fs

dropdown/method

:::

## 尺寸修饰

通过 split="button" 创建的按钮式下拉菜单，也能够同 Button 组件一样设置尺寸和颜色。

:::demo-fs 额外的尺寸：`sm`、`md`、`lg`，通过设置`size`属性来配置它们。

dropdown/size

:::


## 图标修饰

你可以为每一个 DropdownItem 设置 Icon 图标，通过 `icon` 插槽设置。

:::demo-fs

dropdown/icon

:::


## Attributes

| 参数          | 说明       | 类型            | 可选值  | 默认值      |
| ------------- | ----------- | --------------- | ------ | ----------- |
| type          | 菜单按钮或者链接类型，同 Button 组件或者 text-color 颜色(只在`split`为 button 或者 link 的情况下有效)    | string          | —  | —           |
| size          | 菜单尺寸，在`split`为 button 的情况下也对触发按钮生效  | string          | sm / lg    | —           |
| max-height    | 菜单最大高度   | string / number | — | —           |
| split         | 下拉触发元素呈现为按钮组或者文本 | string          | —  | button/link |
| disabled      | 是否禁用 | boolean | — | false |
| placement     | 菜单弹出位置 | string          | top/top-start/top-end/bottom/bottom-start/bottom-end | bottom  |
| trigger       | 触发下拉的行为  | string          | hover, click, contextmenu | hover       |
| hide-on-click | 是否在点击菜单项后隐藏菜单  | boolean         | —   | true        |
| show-timeout  | 展开下拉菜单的延时（仅在 trigger 为 hover 时有效） | number          | — | 250         |
| hide-timeout  | 收起下拉菜单的延时（仅在 trigger 为 hover 时有效）  | number          | —  | 150         |
| role           | ARIA角色属性. 根据使用情况，可以改为 'navigation' | string          | — | 'menu'                                                  |
| tabindex      | Dropdown 组件的 [tabindex](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/tabindex) | number          | —  | 0           |
| popper-class  | 自定义浮层类名  | string          | —  | -         |
| popper-options  | [popper.js](https://popper.js.org/docs/v2/) 参数  | object          | 参考 [popper.js](https://popper.js.org/docs/v2/) 文档  | `{modifiers: [{name: 'computeStyles',options: {gpuAcceleration: false}}]}`        |
| teleported            | 下拉框节点是否添加到body上 | boolean         | —  | true |

## Slots

| 插槽名     | 说明                                                       |
| -------- | ---------------------------------------------------------- |
| —        | 触发下拉列表显示的元素。 注意： 必须是一个元素或者或者组件 |
| dropdown | 下拉列表，通常是 `<hl-dropdown-menu>` 组件                 |

## Events

| 事件名称       | 说明                                           | 回调参数                      |
| -------------- | ---------------------------------------------- | ----------------------------- |
| click          | `split` 为 button 或者 link 时，点击左侧的回调 | —                             |
| command        | 点击菜单项触发的事件回调                       | dropdown-item 的指令          |
| visible-change | 下拉框出现/隐藏时触发                          | 出现则为 true，隐藏则为 false |

## Methods

| 方法名        | 说明   | 参数  |
| ------------- | ---------- | --------- |
| handleOpen      | 打开下拉菜单                              | - |
| handleClose   | 关闭下拉菜单    | -   |

## Dropdown Menu Slots

| 插槽名     | 说明      | 子标签 |
| -------- | ------------ |----|
| —        | 下拉菜单的内容 | DropdownItem|

## Dropdown Item Attributes

| 参数     | 说明         | 类型                 | 可选值 | 默认值 |
| -------- | ------------ | -------------------- | ------ | ------ |
| command  | 指令         | string/number/object | —      | —      |
| disabled | 禁用         | boolean              | —      | false  |
| divider  | 是否是分割线  | boolean              | —      | false  |

## Dropdown Item Slots

| 插槽名     | 说明                                                       |
| -------- | ---------------------------------------------------------- |
| —        | 自定义DropdownItem内容 |
| icon | 前置icon                 |
