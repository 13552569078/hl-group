# Dialog 对话框

Dialog 通常用作弹窗、模态窗使用，它使用panel组件构建，同时也支持panel的属性特征

:::tip

组件需要包裹 `<client-only></client-only>` 标签，当用在 SSR (eg: [Nuxt](https://nuxt.com/v3)) 和 SSG (eg: [VitePress](https://vitepress.vuejs.org/))。

:::

:::demo-fs 需要设置 `model-value / v-model` 属性，它接收 `boolean`，当为 `true` 时显示 Dialog。Dialog 分为两个部分：`body` 和 `footer`，`footer` 需要具名为 `footer` 的 `slot`。`title` 属性用于定义标题，它是可选的，默认值为空。最后，本例还展示了 `before-close` 的用法。

dialog/basic

:::

:::tip
`before-close` 仅当用户通过点击关闭图标或遮罩关闭 Dialog 时起效。如果你在 `footer` 具名 slot 里添加了用于关闭 Dialog 的按钮，那么可以在按钮的点击回调函数里加入 `before-close` 的相关逻辑。
:::


## 自定义内容

Dialog 组件的可以嵌入任意的内容

:::demo-fs

dialog/slot

:::

## 嵌套的 Dialog

如果需要在一个 Dialog 内部嵌套另一个 Dialog，需要使用 `append-to-body` 属性。
:::demo-fs

dialog/nested

:::

:::tip
Dialog 的内容是懒渲染的，即在第一次被打开之前，传入的默认 slot 不会被渲染到 DOM 上。因此，如果需要执行 DOM 操作，或通过 `ref` 获取相应组件，请在 `open` 事件回调中进行。
:::

## 关闭时销毁 DOM 内容

可在 Dialog 没有显示时，销毁 Dialog 里的内容以达到减少 DOM 节点的作用

:::demo-fs 需要注意的是，当这个属性被启用时，Dialog 内并不会有任何的 DOM 节点存在，除了 `overlay` `header（如果有）` `footer（如果有）`

dialog/destroy

:::

## Panel属性

由于 Dialog 基于 Panel 组件构造，可以在 Dialog 上直接应用 Panel 组件属性。
:::demo-fs 具体属性请参考Panel文档。

dialog/panel

:::



## Attributes

| 参数                  | 说明   | 类型       | 可选值        | 默认值 |
| --------------------- | ------- | ------ | ---------------| ------ |
| model-value / v-model | 是否显示 Dialog   | boolean    | —      | —      |
| width                 | Dialog 的宽度。showAs=drawer，position=top / bottom，设置为 100%   | string    | —  | -   |
| height                | Dialog 的高度。showAs=drawer，position=left / right，设置为 100%             | string   | —  | -   |
| top                   | Dialog CSS 中的 top 值  | string   | —     | -   |
| modal                 | 是否需要遮罩层  | boolean    | —    | true   |
| append-to-body        | Dialog 自身是否插入至 body 元素上。嵌套的 Dialog 必须指定该属性并赋值为 true | boolean   | —   | false  |
| lock-scroll           | 是否在 Dialog 出现时将 body 滚动锁定  | boolean  | —      | true   |
| open-delay            | Dialog 打开的延时时间，单位毫秒    | number      | —        | 0      |
| close-delay           | Dialog 关闭的延时时间，单位毫秒  | number      | —     | 0      |
| close-on-click-modal  | 是否可以通过点击 modal 关闭 Dialog    | boolean   | —      | true   |
| close-on-press-escape | 是否可以通过按下 ESC 关闭 Dialog  | boolean  | —    | true   |
| show-close            | 是否显示关闭按钮   | boolean      | —     | true   |
| before-close          | 关闭前的回调，会暂停 Dialog 的关闭   | function(done)，done 用于关闭 Dialog | —   | —      |
| destroy-on-close      | 关闭时销毁 Dialog 中的元素 | boolean   | —  | false  |
| modal-class           | 弹窗自定义类名 | string   | —     | -      |
| show-as                | 弹窗类型。设置为 drawer 时，请配合 placement 使用   | string   | dialog / drawer    | dialog |
| animation-name        | Dialog 动画类型，仅对dialog类型生效。参考内置过度动画文档  | string | -   | -      |
| placement             | 弹窗位置  | string  | center / top / bottom / left / right / fullscreen | center |
| draggable            | 是否可拖动标题部分移动对话框，drawer以及fullscreen模式下无效 | boolean   | —     | false   |
| title                 | 对话框标题  | string  | — | -   |
| z-index               | 对话框自定义层级  | number  | — | -   |

## Slots

| 名称   | 说明                    |
| ------ | ----------------------- |
| —      | Dialog 的内容           |
| header | Dialog 头部区的内容     |
| title | Dialog 标题的内容     |
| footer | Dialog 按钮操作区的内容 |

## Events

| 事件名称 | 说明                        | 回调参数 |
| -------- | --------------------------- | -------- |
| open     | Dialog 打开的回调           | —        |
| opened   | Dialog 打开动画结束时的回调 | —        |
| close    | Dialog 关闭的回调           | —        |
| closed   | Dialog 关闭动画结束时的回调 | —        |
