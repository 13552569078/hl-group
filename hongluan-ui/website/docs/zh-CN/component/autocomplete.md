# Autocomplete 输入建议

Autocomplete 是一个带输入建议的输入框组件，它拥有同`Input`组件一样的属性。

:::tip

组件需要包裹 `<client-only></client-only>` 标签，当用在 SSR (eg: [Nuxt](https://nuxt.com/v3)) 和 SSG (eg: [VitePress](https://vitepress.vuejs.org/))。

:::


:::demo-fs `fetch-suggestions` 是一个返回输入建议的方法属性，如 querySearch(queryString, cb)，在该方法中你可以在你的输入建议数据准备好时通过 cb(data) 返回到 Autocomplete 组件中。

autocomplete/basic

:::

## 自定义模板

使用`#default`自定义输入建议的模板。该 scope 的参数为`item`，表示当前输入建议对象。

:::demo-fs

autocomplete/slot

:::

## 远程搜索

从服务端搜索数据

:::demo-fs

autocomplete/remote

:::

## Attributes

| 参数          | 说明            | 类型            | 可选值                 | 默认值   |
|-------------  |---------------- |---------------- |---------------------- |-------- |
| model-value / v-model   | 选中项绑定值   | string          | — | — |
| placeholder   | 输入框占位文本   | string          | — | — |
| clearable   | 是否可清空   | boolean          | — | false |
| disabled      | 禁用            | boolean         | — | false   |
| value-key | 输入建议对象中用于显示的键名 | string | — | value |
| debounce      | 获取输入建议的去抖延时 | number         | — | 300 |
| placement     | 菜单弹出位置 | string         | top / top-start / top-end / bottom / bottom-start / bottom-end | bottom-start |
| fetch-suggestions | 返回输入建议的方法，仅当你的输入建议数据 resolve 时，通过调用 callback(data:[]) 来返回它  | Function(queryString, callback)  | — | — |
| popper-class | Autocomplete 下拉列表的类名 | string | — | — |
| trigger-on-focus | 是否在输入框 focus 时显示建议列表 | boolean | — | true |
| name | 原生属性 | string | — | — |
| select-when-unmatched | 在输入没有任何匹配建议的情况下，按下回车是否触发 `select` 事件 | boolean | — | false |
| label | 输入框关联的label文字 | string | — | — |
| hide-loading | 是否隐藏远程加载时的加载图标 | boolean | — | false |
| popper-append-to-body(deprecated) | 是否将下拉列表插入至 body 元素。在下拉列表的定位出现问题时，可将该属性设置为 false。请使用teleported属性。 | boolean | - | false |
| teleported | 是否将下拉列表插入至 body 元素。 | boolean | — | true |
| highlight-first-item | 是否默认突出显示远程搜索建议中的第一项 | boolean | — | false |
| size                | 输入框尺寸  | string | sm / lg | -  |
| fill | 填充样式 | boolean | - | false |
| thin | 单薄、无边框、无背景样式 | boolean | - | false |
| fit-input-width  | 是否保持下拉框宽度和输入框一致    | boolean    | —  | false        |
| transition                | 定义渐变动画  | string         | —  | dropdown                                          |

## Slots
| name | 说明 |
|------|--------|
| — | 自定义输入建议，参数为 { item } |
| prefix | 输入框头部内容 |
| suffix | 输入框尾部内容 |

## Events
| 事件名称 | 说明 | 回调参数 |
|---------|--------|---------|
| select | 点击选中建议项时触发 | 选中建议项 |
| change | 在 Input 值改变时触发 | (value: string \| number) |

## Methods
| 方法名 | 说明 | 参数 |
| ---- | ---- | ---- |
| focus | 使 input 获取焦点 | - |
| blur | 使 input 失去焦点 | - |
