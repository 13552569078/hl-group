# Loading 加载

加载数据时显示动效。

## 区域加载

在表格等容器中加载数据时显示。

:::demo-fs Hongluan UI 提供了两种调用 Loading 的方法：指令和服务。对于自定义指令`v-loading`，只需要绑定`Boolean`即可。默认状况下，Loading 遮罩会插入到绑定元素的子节点，通过添加`body`修饰符，可以使遮罩插入至 DOM 中的 body 上。

loading/basic

:::

## 自定义

可自定义加载文案、图标和背景色。

:::demo-fs 在绑定了`v-loading`指令的元素上添加`loading-text`属性，其值会被渲染为加载文案，并显示在加载图标的下方。类似地，`loading-spinner`、`loading-background`和`loading-svg`属性分别用来设定图标类名、背景色值、加载图标。当loading-spinner为对象时，将会默认使用Spinner组件

loading/custom

:::

:::warning
`loading-svg` 属性虽然支持传入 HTML 片段，但是在网站上动态渲染任意 HTML 是非常危险的，因为容易导致 [XSS 攻击](https://en.wikipedia.org/wiki/Cross-site_scripting)。请确保 `loading-svg` 的内容是可信的，**永远不要**将用户提交的内容赋值给 `loading-svg` 属性。
:::

## 整页加载

页面数据加载时显示。

:::demo-fs 当使用指令方式时，全屏遮罩需要添加`fullscreen`修饰符（遮罩会插入至 body 上），此时若需要锁定屏幕的滚动，可以使用`lock`修饰符；当使用服务方式时，遮罩默认即为全屏，无需额外设置。

loading/fullscreen

:::

## 服务
Loading 还可以以服务的方式调用。引入 Loading 服务：
```javascript
import { HlLoading } from 'hongluan-ui';
```
在需要调用时：
```javascript
HlLoading.service(options);
```
其中 `options` 参数为 Loading 的配置项，具体见下表。`LoadingService` 会返回一个 Loading 实例，可通过调用该实例的 `close` 方法来关闭它：
```javascript
let loadingInstance = HlLoading.service(options);
this.$nextTick(() => { // 以服务的方式调用的 Loading 需要异步关闭
  loadingInstance.close();
});
```
需要注意的是，以服务的方式调用的全屏 Loading 是单例的：若在前一个全屏 Loading 关闭前再次调用全屏 Loading，并不会创建一个新的 Loading 实例，而是返回现有全屏 Loading 的实例：
```javascript
let loadingInstance1 = HlLoading.service({ fullscreen: true });
let loadingInstance2 = HlLoading.service({ fullscreen: true });
console.log(loadingInstance1 === loadingInstance2); // true
```
此时调用它们中任意一个的 `close` 方法都能关闭这个全屏 Loading。

如果完整引入了 Element，那么 `app.config.globalProperties` 上会有一个全局方法 `$loading`，它的调用方式为：`this.$loading(options)`，同样会返回一个 Loading 实例。

## Attributes
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| target | Loading 需要覆盖的 DOM 节点。可传入一个 DOM 对象或字符串；若传入字符串，则会将其作为参数传入 `document.querySelector`以获取到对应 DOM 节点 | object/string | — | document.body |
| body | 同 `v-loading` 指令中的 `body` 修饰符 | boolean | — | false |
| fullscreen | 同 `v-loading` 指令中的 `fullscreen` 修饰符 | boolean | — | true |
| lock | 同 `v-loading` 指令中的 `lock` 修饰符 | boolean | — | false |
| text | 显示在加载图标下方的加载文案 | string | — | — |
| spinner | 自定义加载图标类名 | string | — | — |
| background | 遮罩背景色 | string | — | — |
| custom-class | Loading 的自定义类名 | string | — | — |

## Directive
| 名称      | 说明          | 类型      |
|---------- |-------------- |---------- |
| v-loading | v-loading | boolean |
| loading-text | 显示在加载图标下方的加载文案 | string |
| loading-spinner | 当值为布尔时，使用默认样式。值为对象时，使用Spinner组件并作为属性传入 | object / boolean |
| loading-svg| 自定义加载图标 | string |
| loading-background | 背景遮罩的颜色 | string |
