# Config Provider 全局配置

Config Provider 被用来提供全局的配置选项，让你的配置能够在全局都能够被访问到，Config Provider 使用了 Vue 的 provide/inject 特性

## 国际化 相关配置

通过 Config Provider 来配置多语言，让你的应用可以随时切换语言。

:::demo-fs 使用两个属性来提供 i18n 相关配置

config-provider/usage

:::

## Message 相关配置

:::demo-fs

config-provider/message

:::




## Attributes

| 参数 | 说明 | 类型               | 可选值   | 默认值                 |
| --------- | ------------- | ------------------ | ---------- | -------------- |
| locale    | 翻译文本对象 | Object\<Language\> | zh-cn / zh-tw / en | Chinese                 |
| size      | 全局组件大小  | string             | sm / md / lg   | -                 |
| zIndex    | 全局初始化zIndex | number             | -     | -                       |
| message   | Message相关配置, [参见下表](#message-attributes) | MessageGlobalConfig | -  | 参见下表 |
| experimental-features | 实验特性，默认全部配置为false | Object| -  | - |

## Message Attributes

| 参数 | 说明 | 类型   | 可选值 | 默认值 |
| --------- | ------------------- | ------ | --------------- | ------- |
| max       | 同时显示Message的最大数量 | number | -               | -       |



## Slots

| 名称 | 说明               |
| ---- | ------------------------- |
| —    | 默认插槽 |
