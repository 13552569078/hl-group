# Select 选择器

当选项过多时，使用下拉菜单展示并选择内容。

:::tip

组件需要包裹 `<client-only></client-only>` 标签，当用在 SSR (eg: [Nuxt](https://nuxt.com/v3)) 和 SSG (eg: [VitePress](https://vitepress.vuejs.org/))。

:::

:::demo-fs `v-model` 的值为当前被选中的 Option 组件的 `value` 属性值

select/basic

:::

## 有禁用选项

在 Option 组件中，设定`disabled`值为 true，即可禁用该选项

:::demo-fs

select/option-disabled

:::

### 禁用状态

为 Select 组件设置`disabled`属性，则整个选择器不可用

:::demo-fs

select/disabled

:::

## 可清空单选

为 Select 组件设置`clearable`属性，则可将选择器清空。需要注意的是，`clearable`属性仅适用于单选。

:::demo-fs

select/clearable

:::

## 尺寸

`sm`,`md`,`lg`为可选值，默认为`md`。

:::demo-fs

select/size

:::

## 基础多选

用 Tag 组件展示已选项，你也可以设置`collapse-tags`属性将它们合并为一段文字。

:::demo-fs 为 Select 组件设置`multiple`属性即可启用多选，此时`v-model`的值为当前选中值所组成的数组。

select/multiple

:::

## 自定义模板

将自定义的 HTML 模板插入 Option 组件的 slot 中即可。

:::demo-fs

select/option-slot

:::

## 分组

使用 OptionGroup 组件对备选项进行分组，它的`label`属性为分组名

:::demo-fs

select/group

:::

## 可搜索

为 Select 组件添加`filterable`属性即可启用搜索功能。

:::demo-fs 默认情况下，Select 组件会找出所有`label`属性包含输入值的选项。如果希望使用其他的搜索逻辑，可以通过传入一个`filter-method`来实现。`filter-method`为一个`Function`，它会在输入值发生变化时调用，参数为当前输入值。

select/filterable

:::

## 远程搜索

从服务器搜索数据，输入关键字进行查找
:::demo-fs 为了启用远程搜索，需要将`filterable`和`remote`设置为`true`，同时传入一个`remote-method`。`remote-method`为一个`Function`，它会在输入值发生变化时调用，参数为当前输入值。需要注意的是，如果Option 组件是通过`v-for`指令渲染出来的，此时需要为 Option 组件添加`key`属性，且其值需具有唯一性，比如此例中的`item.value`。

select/remote

:::

## 创建条目

可以创建并选中选项中不存在的条目
:::demo-fs 使用`allow-create`属性即可通过在输入框中输入文字来创建新的条目。注意此时`filterable`必须为 true。本例还使用了`default-first-option`属性，在该属性打开的情况下，按下回车就可以选中当前选项列表中的第一个选项，无需使用鼠标或键盘方向键进行定位。

select/create

:::

:::tip
如果 Select 的绑定值为对象类型，请务必指定 `value-key` 作为它的唯一性标识。
:::

## Attributes

| 参数                  | 说明 | 类型     | 可选值      | 默认值     |
| --------------------- | ---------- | -------- | ----------- | ---------- |
| model-value / v-model       | 绑定值    | array / boolean / string / boolean / number | —           | —          |
| multiple              | 是否多选    | boolean                             | —           | false      |
| disabled              | 是否禁用    | boolean                             | —           | false      |
| value-key             | 作为 value 唯一标识的键名，绑定值为对象类型时必填  | string     | —           | value      |
| size                  | 输入框尺寸   | string                              | lg/ md / sm | md         |
| clearable             | 是否可以清空选项   | boolean                             | —           | false      |
| collapse-tags         | 多选时是否将选中值按文字的形式展示  | boolean    | —           | false      |
| collapse-tags-tooltip | 鼠标滑入折叠Tag时，是否显示所有折叠的Tag  | boolean    | —           | false      |
| multiple-limit        | 多选时用户最多可以选择的项目数，为 0 则不限制    | number    | —           | 0          |
| name                  | select input 的 name 属性     | string                              | —           | —          |
| autocomplete          | select input 的 autocomplete 属性   | string  | —           | off        |
| placeholder           | 占位符     | string    | —           | 请选择     |
| filterable            | 是否可搜索 | boolean      | —           | false      |
| block                 | 拉伸至父元素宽度   | boolean  | —           | false      |
| allow-create          | 是否允许用户创建新条目，需配合 `filterable` 使用    | boolean   | —           | false     |
| filter-method         | 自定义搜索方法   | function    | —           | —          |
| remote                | 是否为远程搜索  | boolean  | —           | false      |
| remote-method         | 远程搜索方法   | function   | —           | —          |
| remote-show-suffix    | 远程搜索显示后缀图标  | boolean | true / false  | false            |
| suffix-transition     | 是否添加自动旋转后缀图标动画 | boolean | true / false  | true             |
| loading               | 是否正在从远程获取数据   | boolean  | —           | false      |
| loading-text          | 远程加载时显示的文字  | string  | —           | 加载中     |
| no-match-text         | 搜索条件无匹配时显示的文字，也可以使用`#empty`设置  | string  | —           | 无匹配数据 |
| no-data-text          | 选项为空时显示的文字，也可以使用`#empty`设置   | string  | —           | 无数据     |
| popper-class          | Select 下拉框的类名  | string    | —           | —          |
| reserve-keyword       | 多选且可搜索时，是否在选中一个选项后保留当前的搜索关键词   | boolean     | —           | true      |
| default-first-option  | 在输入框按下回车，选择第一个匹配项。需配合 `filterable` 或 `remote` 使用       | boolean    | -   | false      |
| popper-append-to-body(deprecated) | 是否将弹出框插入至 body 元素。在弹出框的定位出现问题时，可将该属性设置为 false。请使用teleported属性 | boolean   | -           | false       |
| teleported | 是否将弹出框插入至 body 元素 | boolean   | -           | true       |
| automatic-dropdown    | 对于不可搜索的 Select，是否在输入框获得焦点后自动弹出选项菜单  | boolean   | -           | false      |
| fill | 填充样式 | boolean | - | false |
| thin | 单薄、无边框、无背景样式 | boolean | - | false |
| round | 圆形输入框| boolean | - | false |
| tag-type | 多选标签类型  | string | info/success/warning/danger | -             |
| effect    | 下拉框主题 | string | `dark` / `light`   | -            |
| validate-event| 是否触发表单验证  | boolean   | -     | true  |
| placement                         | 弹窗位置   | string  | top/top-start/top-end/bottom/bottom-start/bottom-end/left/left-start/left-end/right/right-start/right-end | bottom-start     |

## Events

| 事件名称       | 说明                                     | 回调参数                      |
| -------------- | ---------------------------------------- | ----------------------------- |
| change         | 选中值发生变化时触发                     | 目前的选中值                  |
| visible-change | 下拉框出现/隐藏时触发                    | 出现则为 true，隐藏则为 false |
| remove-tag     | 多选模式下移除 tag 时触发                | 移除的 tag 值                 |
| clear          | 可清空的单选模式下用户点击清空按钮时触发 | —                             |
| blur           | 当 input 失去焦点时触发                  | (event: FocusEvent)                |
| focus          | 当 input 获得焦点时触发                  | (event: FocusEvent)                |

## Methods

| 方法名 | 说明                            | 参数 |
| ------ | ------------------------------- | ---- |
| focus  | 使 input 获取焦点               | -    |
| blur   | 使 input 失去焦点，并隐藏下拉框 | -    |

## Slots

|   name  | 说明                |
| ------- | ------------------- |
| —       | Option 组件列表     |
| prefix  | Select 组件头部内容 |
| empty   | 无选项时的列表      |
| clear   | clear icon 自定义   |
| suffix   | 后缀图标自定义，参数：{ className: string }，使用方法参看远程搜索示例   |

## Option Group Attributes

| 参数     | 说明                           | 类型    | 可选值 | 默认值 |
| -------- | ------------------------------ | ------- | ------ | ------ |
| label    | 分组的组名                     | string  | —      | —      |
| disabled | 是否将该分组下所有选项置为禁用 | boolean | —      | false  |

## Option Attributes

| 参数     | 说明                                      | 类型                 | 可选值 | 默认值 |
| -------- | ----------------------------------------- | -------------------- | ------ | ------ |
| value    | 选项的值                                  | string/number/object | —      | —      |
| label    | 选项的标签，若不设置则默认与 `value` 相同 | string/number        | —      | —      |
| disabled | 是否禁用该选项                            | boolean              | —      | false  |
| divider  | 是否是分隔符                              | boolean              | —      | false  |

