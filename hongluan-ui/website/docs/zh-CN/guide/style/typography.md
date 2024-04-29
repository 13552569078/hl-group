# Typography 排版

我们为排版创建了一组预定义的配置，以使定制变得容易和简单，它包含不同类型的标题、段落、字体大小、行高、显示和其他用于不同目的的样式。

## 字体

利用"系统字体堆栈"在每个设备和操作设备上实现最佳文本渲染。这些系统字体专为当今的设备而设计，具有改进的屏幕渲染、可变字体支持等。

```scss
body {
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

## 标题

使用 `<h1>` ~ `<h6>` 标签来定义你的标题。`.h1` ~ `.h6` 也具备相同的样式

:::demo

```html
<hl-row gap="var(--md)">
  <hl-col span="col" class="display-flex flex-col gap-lg">
    <h1>&lt;h1&gt; Hongluan heading</h1>
    <h2>&lt;h2&gt; Hongluan heading</h2>
    <h3>&lt;h3&gt; Hongluan heading</h3>
    <h4>&lt;h4&gt; Hongluan heading</h4>
    <h5>&lt;h5&gt; Hongluan heading</h5>
    <h6>&lt;h6&gt; Hongluan heading</h6>
  </hl-col>
  <hl-col span="col" class="display-flex flex-col gap-lg">
    <div class="h1">.h1 Hongluan heading</div>
    <div class="h2">.h2 Hongluan heading</div>
    <div class="h3">.h3 Hongluan heading</div>
    <div class="h4">.h4 Hongluan heading</div>
    <div class="h5">.h5 Hongluan heading</div>
    <div class="h6">.h6 Hongluan heading</div>
  </hl-col>
</hl-row>
```

:::

## 小标题

使用 `<small>` 标签来定义你的副标题。

```html
<h1>h1 标题 <small>副标题</small></h1>
<h2>h2 标题 <small>副标题</small></h2>
<h3>h3 标题 <small>副标题</small></h3>
<h4>h4 标题 <small>副标题</small></h4>
<h5>h5 标题 <small>副标题</small></h5>
<h6>h6 标题 <small>副标题</small></h6>
```

## 文本尺寸

使用文本尺寸工具类，会顺便为你设定 line-height 行高，以保障设计系统的规范一致性。

:::demo

```html
<p class="font-sm">font-sm 12px 文本尺寸展示</p>
<p class="font-md">font-md 14px 文本尺寸展示</p>
<p class="font-lg">font-lg 16px 文本尺寸展示</p>
```

:::

## 文本重量

:::demo

```html
<p class="font-lg font-thin">font-thin</p>
<p class="font-lg font-extralight">font-extralight</p>
<p class="font-lg font-light">font-light</p>
<p class="font-lg font-normal">font-normal</p>
<p class="font-lg font-medium">font-medium</p>
<p class="font-lg font-semibold">font-semibold</p>
<p class="font-lg font-bold">font-bold</p>
<p class="font-lg font-extrabold">font-extrabold</p>
<p class="font-lg font-black">font-black</p>
```

:::

## 段落样式

段落标签也新增了 首行缩进 和 两端对齐 的样式。

:::demo

```html
<hl-row layout="grid" gap="var(--xl)" count="md:count-3">
  <hl-col span="col">
    <h5 class="m-b-xs">默认样式</h5>
    <p>Hongluan是基于VUE3开发的一套响应式、高可控的前端框架。它为每一个组件集成了尺寸、间距、状态颜色等语义化类型，甚至能让你离开CSS并且直接在HTML标记语言中组合出任意的设计。</p>
  </hl-col>
  <hl-col span="col">
    <h5 class="m-b-xs">首行缩进</h5>
    <p class="indent">Hongluan是基于VUE3开发的一套响应式、高可控的前端框架。它为每一个组件集成了尺寸、间距、状态颜色等语义化类型，甚至能让你离开CSS并且直接在HTML标记语言中组合出任意的设计。</p>
  </hl-col>
  <hl-col span="col">
    <h5 class="m-b-xs">两端对齐</h5>
    <p class="justify">Hongluan是基于VUE3开发的一套响应式、高可控的前端框架。它为每一个组件集成了尺寸、间距、状态颜色等语义化类型，甚至能让你离开CSS并且直接在HTML标记语言中组合出任意的设计。</p>
  </hl-col>
</hl-row>
```

:::

`<p>`标签默认设置了`margin-bottom: 1em`，但是没有相邻`<p>`标签的时候，会自动移除`margin-bottom`属性

:::demo

```html
<hl-group gap="var(--md)">
  <div class="w-full">
    <h4 class="m-b-sm">独自存在</h4>
    <p>Hongluan是基于VUE3开发的一套响应式、高可控的前端框架。它为每一个组件集成了尺寸、间距、状态颜色等语义化类型，甚至能让你离开CSS并且直接在HTML标记语言中组合出任意的设计。</p>
  </div>
  <div class="w-full">
    <h4 class="m-b-sm">有相邻的P标签存在</h4>
    <p>Hongluan是基于VUE3开发的一套响应式、高可控的前端框架。它为每一个组件集成了尺寸、间距、状态颜色等语义化类型，</p>
    <p>甚至能让你离开CSS并且直接在HTML标记语言中组合出任意的设计。</p>
  </div>
</hl-group>
```

:::

## 文本对齐

:::demo

```html
<hl-group gap="var(--md)" full>
  <div class="bg-content border w-full p-md"><p class="text-left">左对齐</p></div>
  <div class="bg-content border w-full p-md"><p class="text-right">右对齐</p></div>
  <div class="bg-content border w-full p-md"><p class="text-center">居中对齐</p></div>
</hl-group>
```

:::

## 文本超出隐藏

`ellipsis` 工具类可以使文本超出父元素范围时隐藏额外的字符，你还可以通过 css 变量传递显示的行数，例如：`style="--line: 2"`
:::demo

```html
<div class="w-xxl"><p class="ellipsis">Hongluan是基于VUE3开发的一套响应式、高可控的前端框架。它为每一个组件集成了尺寸、间距、状态颜色等语义化类型，甚至能让你离开CSS并且直接在HTML标记语言中组合出任意的设计。</p></div>
<div class="m-t-lg w-xxl"><p class="ellipsis" style="--line: 2">Hongluan是基于VUE3开发的一套响应式、高可控的前端框架。它为每一个组件集成了尺寸、间距、状态颜色等语义化类型，甚至能让你离开CSS并且直接在HTML标记语言中组合出任意的设计。</p></div>
```

:::

## 大小写转换

:::demo

```html
<hl-group gap="var(--md)" block align="items-around">
  <span class="uppercase">uppercase 转大写</span>
  <span class="lowercase">LOWERCASE 转小写</span>
  <span class="capitalize">capitalize 首字母大写</span>
</hl-group>
```

:::

## 其他元素

使用语义化标签来构建你的页面布局。

<div class="scrollable m-t-md">

| HTML Tag                    | Describe                                                                       |
| --------------------------- | ------------------------------------------------------------------------------ |
| <code>&lt;a&gt;</code>      | 将文本转换为超文本使用 <a href="#">a 标签</a>                                  |
| <code>&lt;em&gt;</code>     | 强调文本使用 <em>em 标签</em>                                                  |
| <code>&lt;strong&gt;</code> | 强调任何额外的更重要文本使用 <strong>strong 标签</strong>                      |
| <code>&lt;code&gt;</code>   | 定义内联代码片段使用 <code>code 标签</code>                                    |
| <code>&lt;del&gt;</code>    | 标记文档中已被修改或删除的文本使用 <del>del 标签</del>                         |
| <code>&lt;ins&gt;</code>    | 标记文档中插入的文本使用 <ins>ins 标签</ins>                                   |
| <code>&lt;mark&gt;</code>   | 高亮显示文本使用 <mark>mark 标签</mark>，它没有任何语义含义                    |
| <code>&lt;q&gt;</code>      | 定义引入的语录在 <q> q 标签 <q>里面使用</q> q 标签 </q>                        |
| <code>&lt;abbr&gt;</code>   | 定义一个标题的缩写使用 <abbr title="Abbreviation Element">abbr 标签</abbr>     |
| <code>&lt;dfn&gt;</code>    | 定义一个项目术语名称使用 <dfn title="Defines a definition term">dfn 标签</dfn> |
| <code>&lt;small&gt;</code>  | 缩小显示不重要的文本使用 <small>small 标签</small>                             |

</div>
