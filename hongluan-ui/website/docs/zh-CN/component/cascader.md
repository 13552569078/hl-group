# Cascader 级联选择器

当一个数据集合有清晰的层级结构时，可通过级联选择器逐级查看并选择。

:::tip

组件需要包裹 `<client-only></client-only>` 标签，当用在 SSR (eg: [Nuxt](https://nuxt.com/v3)) 和 SSG (eg: [VitePress](https://vitepress.vuejs.org/))。

:::

:::demo-fs 只需为 Cascader 的`options`属性指定选项数组即可渲染出一个级联选择器。通过`props.expandTrigger`可以定义展开子级菜单的触发方式。

cascader/basic

:::

## 禁用、选项禁用

通过在数据源中设置 `disabled` 字段来声明该选项是禁用的

:::demo-fs 本例中，`options`指定的数组中的第一个元素含有`disabled: true`键值对，因此是禁用的。在默认情况下，Cascader 会检查数据中每一项的`disabled`字段是否为`true`，如果你的数据中表示禁用含义的字段名不为`disabled`，可以通过`props.disabled`属性来指定（详见下方 API 表格）。当然，`value`、`label`和`children`这三个字段名也可以通过同样的方式指定。

cascader/disabled

:::

## 可清空

通过 `clearable` 设置输入框可清空

:::demo-fs

cascader/clearable

:::

## 仅显示最后一级

属性`show-all-levels`定义了是否显示完整的路径，将其赋值为`false`则仅显示最后一级

:::demo-fs

cascader/level

:::

## 多选

可通过 `props.multiple = true` 来开启多选模式。

:::demo-fs 默认情况下会展示所有已选中的的`Tag`标签，你可以使用`collapse-tags`属性将其折叠起来。

cascader/multiple

:::

## 选择任意一级选项

在单选模式下，你只能选择叶子节点；而在多选模式下，勾选父节点真正选中的都是叶子节点。启用该功能后，可让父子节点取消关联，选择任意一级选项。

:::demo-fs 可通过 `props.checkStrictly = true` 来设置父子节点取消选中关联，从而达到选择任意一级选项的目的。

cascader/strictly

:::

## 动态加载

当选中某一级时，动态加载该级下的选项。

:::demo-fs 通过`lazy`开启动态加载，并通过`lazyload`来设置加载数据源的方法。`lazyload`方法有两个参数，第一个参数`node`为当前点击的节点，第二个`resolve`为数据加载完成的回调(必须调用)。为了更准确的显示节点的状态，还可以对节点数据添加是否为叶子节点的标志位 (默认字段为`leaf`，可通过`props.leaf`修改)，否则会简单的以有无子节点来判断是否为叶子节点。

cascader/loading

:::

## 可搜索

将`filterable`赋值为`true`即可打开搜索功能，默认会匹配节点或父节点的`label`(由`show-all-levels`决定)中包含输入值的选项。

:::demo-fs 你也可以用`filter-method`自定义搜索逻辑，接受一个函数，第一个参数是节点`node`，第二个参数是搜索关键词`keyword`，通过返回布尔值表示是否命中。

cascader/search

:::

## 自定义节点内容

可以自定义备选项的节点内容

:::demo-fs 可以通过`scoped slot`对级联选择器的备选项的节点内容进行自定义，scoped slot 会传入两个字段 `node` 和 `data`，分别表示当前节点的 Node 对象和数据。

cascader/node

:::

## 级联面板

级联面板是级联选择器的核心组件，与级联选择器一样，有单选、多选、动态加载等多种功能。

:::demo-fs 和级联选择器一样，通过`options`来指定选项，也可通过`props`来设置多选、动态加载等功能，具体详情见下方 API 表格。

cascader/panel

:::

## Attributes

| 参数                  | 说明  | 类型                    | 可选值       | 默认值    |
| --------------------- | -------------------- | ----------------------- | ------------ | --------- |
| model-value / v-model | 选中项绑定值   | -                       | —            | —         |
| options               | 可选项数据源，键名可通过 `Props` 属性配置   | array                   | —            | —         |
| props                 | 配置选项，具体见下表     | object                  | —            | —         |
| size                  | 尺寸  | string                  | md / lg / xs | md        |
| placeholder           | 输入框占位文本| string                  | —            | 请选择    |
| disabled              | 是否禁用  | boolean                 | —            | false     |
| clearable             | 是否支持清空选项 | boolean                 | —            | false     |
| show-all-levels       | 输入框中是否显示选中值的完整路径      | boolean                 | —            | true      |
| collapse-tags         | 多选模式下是否折叠 Tag                | boolean                 | -            | false     |
| collapse-tags-tooltip | 鼠标滑入折叠Tag时，是否显示所有折叠的Tag  | boolean    | —           | false      |
| separator             | 选项分隔符  | string                  | —            | 斜杠' / ' |
| filterable            | 是否可搜索选项  | boolean                 | —            | —         |
| filter-method         | 自定义搜索逻辑，第一个参数是节点`node`，第二个参数是搜索关键词`keyword`，通过返回布尔值表示是否命中 | function(node, keyword) | -            | -         |
| debounce              | 搜索关键词输入的去抖延迟，毫秒         | number                  | —            | 300       |
| before-filter         | 筛选之前的钩子，参数为输入的值，若返回 false 或者返回 Promise 且被 reject，则停止筛选               | function(value)         | —            | —         |
| popper-class          | 自定义浮层类名   | string                  | —            | —         |
| popper-offset         | 出现位置的偏移量     | number         | —   | 4 |
| popper-append-to-body(deprecated) | 是否将弹出框插入至 body 元素。在弹出框的定位出现问题时，可将该属性设置为 false。请使用teleported属性                      | boolean                 | -            | false      |
| teleported | 是否将弹出框插入至 body 元素。 | boolean | -            | true         |
| fill | 填充样式 | boolean | - | false |
| tag-type | 标签类型  | string                  | info/success/warning/danger | -    |
| validate-event| 是否触发表单验证  | boolean   | -     | true  |

## Props

| 参数           | 说明                                                                                               | 类型                                                                                     | 可选值        | 默认值     |
| -------------- | -------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------- | ------------- | ---------- |
| expand-trigger | 次级菜单的展开方式                                                                                 | string                                                                                   | click / hover | 'click'    |
| multiple       | 是否多选                                                                                           | boolean                                                                                  | -             | false      |
| check-strictly | 是否严格的遵守父子节点不互相关联                                                                   | boolean                                                                                  | -             | false      |
| emit-path      | 在选中节点改变时，是否返回由该节点所在的各级菜单的值所组成的数组，若设置 false，则只返回该节点的值 | boolean                                                                                  | -             | true       |
| lazy           | 是否动态加载子节点，需与 lazyLoad 方法结合使用                                                     | boolean                                                                                  | -             | false      |
| lazy-load      | 加载动态数据的方法，仅在 lazy 为 true 时有效                                                       | function(node, resolve)，`node`为当前点击的节点，`resolve`为数据加载完成的回调(必须调用) | -             | -          |
| value          | 指定选项的值为选项对象的某个属性值                                                                 | string                                                                                   | —             | 'value'    |
| label          | 指定选项标签为选项对象的某个属性值                                                                 | string                                                                                   | —             | 'label'    |
| children       | 指定选项的子选项为选项对象的某个属性值                                                             | string                                                                                   | —             | 'children' |
| disabled       | 指定选项的禁用为选项对象的某个属性值                                                               | string                                                                                   | —             | 'disabled' |
| leaf           | 指定选项的叶子节点的标志位为选项对象的某个属性值                                                   | string                                                                                   | —             | 'leaf'     |


## Events

| 事件名称       | 说明                          | 回调参数                      |
| -------------- | ----------------------------- | ----------------------------- |
| change         | 当选中节点变化时触发          | 选中节点的值                  |
| expand-change  | 当展开节点发生变化时触发      | 各父级选项值组成的数组        |
| blur           | 当失去焦点时触发              | (event: FocusEvent)                |
| focus          | 当获得焦点时触发              | (event: FocusEvent)                |
| visible-change | 下拉框出现/隐藏时触发         | 出现则为 true，隐藏则为 false |
| remove-tag     | 在多选模式下，移除 Tag 时触发 | 移除的 Tag 对应的节点的值     |

## Methods

| 方法名          | 说明           | 参数                                          |
| --------------- | -------------- | --------------------------------------------- |
| getCheckedNodes | 获取选中的节点 | (leafOnly) 是否只是叶子节点，默认值为 `false` |

## Slots

| 名称  | 说明                                                                            |
| ----- | ------------------------------------------------------------------------------- |
| -     | 自定义备选项的节点内容，参数为 { node, data }，分别为当前节点的 Node 对象和数据 |
| empty | 无匹配选项时的内容                                                              |

## Cascader Panel Attributes

| 参数            | 说明                                      | 类型   | 可选值 | 默认值 |
| --------------- | ----------------------------------------- | ------ | ------ | ------ |
| value / v-model | 选中项绑定值                              | -      | —      | —      |
| options         | 可选项数据源，键名可通过 `Props` 属性配置 | array  | —      | —      |
| props           | 配置选项，具体见下表                      | object | —      | —      |

## Cascader Panel Events

| 事件名称      | 说明                     | 回调参数               |
| ------------- | ------------------------ | ---------------------- |
| change        | 当选中节点变化时触发     | 选中节点的值           |
| expand-change | 当展开节点发生变化时触发 | 各父级选项值组成的数组 |

## Cascader Panel Methods

| 方法名            | 说明               | 参数                                          |
| ----------------- | ------------------ | --------------------------------------------- |
| getCheckedNodes   | 获取选中的节点数组 | (leafOnly) 是否只是叶子节点，默认值为 `false` |
| clearCheckedNodes | 清空选中的节点     | -                                             |

## Cascader Panel Slots

| 名称 | 说明                                                                            |
| ---- | ------------------------------------------------------------------------------- |
| -    | 自定义备选项的节点内容，参数为 { node, data }，分别为当前节点的 Node 对象和数据 |
