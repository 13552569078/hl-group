# Message 消息提示

常用于主动操作后的反馈提示。与 Notification 的区别是后者更多用于系统级通知的被动提醒。

## 基础用法

从顶部出现，3 秒后自动消失。

:::demo-fs Message 在配置上与 Notification 非常类似，所以部分 options 在此不做详尽解释，文末有 options 列表，可以结合 Notification 的文档理解它们。Hongluan UI 注册了一个`$message`方法用于调用，Message 可以接收一个字符串或一个 VNode 作为参数，它会被显示为正文内容。

message/basic

:::

## 不同状态

用来显示「成功、警告、消息、错误」类的操作反馈。

:::demo-fs 当需要自定义更多属性时，Message 也可以接收一个对象为参数。比如，设置`type`字段可以定义不同的状态，默认为`info`。此时正文内容以`message`的值传入。同时，我们也为 Message 的各种 type 注册了方法，可以在不传入`type`字段的情况下像`open4`函数那样直接调用。

message/type

:::

## 可关闭

可以添加关闭按钮。

:::demo-fs 默认的 Message 是不可以被人工关闭的，如果需要可手动关闭的 Message，可以使用`showClose`字段。此外，和 Notification 一样，Message 拥有可控的`duration`，设置`0`为不会被自动关闭，默认为 3000 毫秒。

message/close

:::

## 文字对齐方式
使用 `textAlign`属性，可选值为`left`,`right`,`center`，默认值为`left`

:::demo-fs

message/align

:::

## 使用 HTML 片段
`message` 属性支持传入 HTML 片段

:::demo-fs 将`dangerouslyUseHTMLString`属性设置为 true，`message` 就会被当作 HTML 片段处理。

message/html

:::

:::warning
`message` 属性虽然支持传入 HTML 片段，但是在网站上动态渲染任意 HTML 是非常危险的，因为容易导致 [XSS 攻击](https://en.wikipedia.org/wiki/Cross-site_scripting)。因此在 `dangerouslyUseHTMLString` 打开的情况下，请确保 `message` 的内容是可信的，**永远不要**将用户提交的内容赋值给 `message` 属性。
:::

## 分组合并

相同内容的Message信息可以合并

:::demo-fs 设置 `grouping` 为 true，相同内容的 `message` 将会被合并。

message/grouping

:::


## 全局方法

Hongluan UI 为 `app.config.globalProperties` 添加了全局方法 $message。因此在 vue instance 中可以采用在 method 中调用 `this.$message` 方法唤起 `HlMessage`。

## 单独引用

```javascript
import { HlMessage } from 'hongluan-ui';
```

此时调用方法为 `HlMessage(options)`。我们也为每个 type 定义了各自的方法，如 `HlMessage.success(options)`。并且可以调用 `HlMessage.closeAll()` 手动关闭所有实例。

## App 上下文继承 <hl-tag>> 1.5.7</hl-tag>

:::tip

如果全局注册 HlMessage 组件, 会自动继承app上下文信息。

:::

```ts
import { getCurrentInstance } from 'vue'
import { HlMessage } from 'hongluan-ui'

// in your setup method
const { appContext } = getCurrentInstance()!
HlMessage({}, appContext)
```

## Attributes

| 参数                     | 说明    | 类型           | 可选值                     | 默认值 |
| ------------------------ | ------------------- | -------------- | ----------------- | ------ |
| message                  | 消息文字 | string / VNode / () => VNode | —     | —      |
| type                     | 主题 | string         | success/warning/info/error | info   |
| dangerouslyUseHTMLString | 是否将 message 属性作为 HTML 片段处理         | boolean        | —     | false  |
| customClass              | 自定义类名   | string         | —       | —      |
| duration                 | 显示时间, 毫秒。设为 0 则不会自动关闭         | number         | —     | 3000   |
| showClose                | 是否显示关闭按钮  | boolean        | —     | false  |
| textAlign                | 文字对齐方式  | string        | left / center / right      | left  |
| onClose                  | 关闭时的回调函数, 参数为被关闭的 message 实例 | function       | —    | —      |
| offset                   | Message 距离窗口顶部的偏移量   | number         | —    | 16     |
| icon                     | 自定义icon，优先级高于type定义的icon | VNode | —        | —    |
| appendTo                 | 添加Message的根DOM元素   | string / HTMLElement | -   | document.body |

## Methods

调用 `HlMessage` 或 `this.$message` 会返回当前 Message 的实例。如果需要手动关闭实例，可以调用它的 `close` 方法。
| 方法名 | 说明 |
| ---- | ---- |
| close | 关闭当前的 Message |
