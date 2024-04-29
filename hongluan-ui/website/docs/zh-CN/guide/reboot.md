# Reboot 重构

Reboot 是单个文件中特定于元素的 CSS 更改的集合，用以提供一个优雅、一致且简单的标准来构建。

## Box-sizing 盒尺寸

全部元素（包含 ::before 和 ::after）都设置为 `border-box` 属性，这确保了元素声明的宽度永远不会因为填充或者边框而超出你设定的尺寸范围。
:::demo

```html
<hl-group gap="var(--xl)" align="items-middle items-center" block>
  <div style="width: calc(var(--md) * 10); height: calc(var(--md) * 10); --stripes-color: #fff;" class="display-flex items-center items-middle bg-stripes bg-primary light-1  border border-primary p-md">
    <div class="display-flex items-center items-middle w-full h-full bg-primary-light-1 text-inverse">border-box</div>
  </div>
  <div style="width: calc(var(--md) * 12); height: calc(var(--md) * 12); --stripes-color: rgba(var(--rgb-success), 0.7);" class="bg-stripes p-md border border-success dashed">
    <div class="display-flex items-center items-middle w-full h-full border border-success bg-success light-1 text-inverse">content-box</div>
  </div>
</hl-group>
```

:::

## Fonts 字体家族

利用"系统字体堆栈"在每个设备和操作设备上实现最佳文本渲染。这些系统字体专为当今的设备而设计，具有改进的屏幕渲染、可变字体支持等。

```css
font-family: {
  -apple-system,
  BlinkMacSystemFont,
  'Segoe UI',
  Roboto,
  'Helvetica Neue',
  Arial,
  'Noto Sans',
  sans-serif,
  'Apple Color Emoji',
  'Segoe UI Emoji',
  'Segoe UI Symbol',
  'Noto Color Emoji'
}
```

我们为`<body>`添加了默认字体，如果你需要对其进行修改，请编辑你项目的`config.scss`文件。


## Heading 标题

Hongluan默认移除了标题的 margin 属性，为了保持整个设计系统的尺寸规范，它们也被默认的加上了`line-height`行高属性

:::demo
```html
<hl-group gap="var(--md)" dir="vertical">
  <h1 class="show-height static">h1 Heading 标题</h1>
  <h2 class="show-height static">h1 Heading 标题</h2>
  <h3 class="show-height static">h1 Heading 标题</h3>
  <h4 class="show-height static">h1 Heading 标题</h4>
  <h5 class="show-height static">h1 Heading 标题</h5>
  <h6 class="show-height static">h1 Heading 标题</h6>
</hl-group>
```
:::

## Hr 分隔线

除了基础的实线，Hongluan还新增了虚线和点线样式。

:::demo-dark

```html
实线
<hr />
虚线
<hr class="dashed" />
点线
<hr class="dotted" />
```
:::


## Blockquote 引用

:::demo

```html
<blockquote>
  <p>Hongluan的组件样式式由Mixin生成的，你也可以自定义样式生成文件。</p>
</blockquote>
```
:::



## Code 代码片段

:::demo

```html
<code>
$conf_font_color: #FFFFFF;
</code>
```
:::

## Mark 标记

:::demo

```html
<p>Hongluan是基于VUE3开发的一套响应式、<mark>高可控</mark>的前端框架。它为每一个组件集成了尺寸、间距、状态颜色等语义化类型，甚至能让你离开CSS并且直接在HTML标记语言中组合出任意的设计。</p>

```
:::

## List 列表

:::demo

```html
<ul>
  <li>所有列表的上边距都已删除</li>
  <li>他们的底边距标准化了</li>
  <li>嵌套列表没有底边距</li>
  <li>这样它们的外观更均匀
    <ul>
      <li>特别是当后面跟着更多列表项时</li>
      <li>左侧填充也已重置</li>
    </ul>
  </li>
</ul>


<ol class="m-t-lg">
  <li>这是一个有序列表</li>
  <li>有几个列表项</li>
  <li>它具有相同的整体外观</li>
  <li>作为之前的无序列表</li>
</ol>

```
:::