# 从 V1 版本升级至 V2

Hongluan v2 版本对 css 样式系统进行了重构，v2 版允许你使用任意的 css 预编译器 `Sass`、`Less`、`Stylus`，或者直接对组件使用原生的 `css` 进行样式调整。

#### 使用原生 css 进行调整：

<hl-tag type="danger" effect="light" class="border-none border-left border-danger m-b-sm" style="--border-left-width: 4px">
  custom.css
</hl-tag>

```scss
// 通过对 root 下的 css var变量进行快速调整
:root {
  --bg-body: #16202f;
  --bg-content: #1c283b;
  --bg-light: #182536;
  --bg-popup: #16202f;
  --bg-element: #213148;
  --bg-hover: #1c283b;
  --bg-active: #f6f9fb;
  --bg-header: #16202f;
  --bg-backdrop: rgba(0, 0, 0, 0.6);
  ......
}
```

#### 你可以配置自己的样式文件来对全局样式进行修改，例如：

<hl-tag type="danger" effect="light" class="border-none border-left border-danger m-b-sm" style="--border-left-width: 4px">
  custom.less
</hl-tag>

```less
// 定义变量与属性
@conf_bg_color: {
  body: #16202f;
  content: #1c283b;
  light: #182536;
  popup: #16202f;
  element: #213148;
  hover: #1c283b;
  active: #f6f9fb;
  header: #16202f;
  backdrop: rgba(0, 0, 0, 0.6);
};

// 遍历css变量

each(@conf_bg_color, {
  --bg-@{key} {
    background-color: @value;
  }
})

// 输出到
:root {
  --bg-body: #16202f;
  --bg-content: #1c283b;
  --bg-light: #182536;
  --bg-popup: #16202f;
  --bg-element: #213148;
  --bg-hover: #1c283b;
  --bg-active: #f6f9fb;
  --bg-header: #16202f;
  --bg-backdrop: rgba(0, 0, 0, 0.6);
}
```

#### 当然，我们仍然推荐你使用 Scss 配置文件进行基础定义：

因为 hongluan 的样式都是自动生成的，你只需要操纵 config.scss 文件即可对整体 UI 进行深度修改。就算对 scss 不够熟练也完全没有问题。

<hl-tag type="danger" effect="light" class="border-none border-left border-danger m-b-sm" style="--border-left-width: 4px">
  config.scss
</hl-tag>

```scss
//--背景色
$conf_bg_color: (
  'body': #16202f,
  'content': #1c283b,
  'light': #182536,
  'popup': #16202f,
  'element': #213148,
  'hover': #1c283b,
  'active': #f6f9fb,
  'header': #16202f,
  'backdrop': rgba(#000000, 0.6),
) !default;
```

## 新增组件级变量

每个组件都包含了独立的变量，你可以对它的样式进行深度调整，也可以像上面的介绍那样，通过一个单独的 css 文件来对全局组件进行样式定义。

:::demo

```html
<hl-button
  style="
    --button-radius: 8px;
    --button-padding-x: 20px;
    --button-padding-y: 4px;
    --button-height: 50px;
    --button-font-weight: 600;
    --button-font-size: 16px;
    --button-border-width: 2px;
    --button-font-color: #8a9ab1;
    --button-font-color-hover: var(--text-regular);
    --button-font-color-active: var(--text-title);
    --button-bg-color: transparent;
    --button-bg-color-hover: rgba(255,255,255, 0.1);
    --button-bg-color-active: rgba(255,255,255, 0.15);
    --button-border-color: #364863;
    --button-border-color-hover: #77869b;
    --button-border-color-active: var(--success);
  "
>
  Button
</hl-button>

<hl-input
  v-model="input"
  placeholder="请输入内容"
  class="m-l-md"
  style="
    --input-radius: 8px;
    --input-height: 50px;
    --input-padding-x: 20px;
    --input-padding-y: 4px;
    --input-border-width: 2px;
    --input-font-size: 16px;
    --input-font-color: #8a9ab1;
    --input-font-color-hover: var(--text-regular);
    --input-font-color-focus: var(--success);
    --input-border-color: #364863;
    --input-border-color-hover: #77869b;
    --input-border-color-focus: var(--success);
  "
/>

<script>
  import { defineComponent, ref } from 'vue'
  export default defineComponent({
    setup() {
      return {
        input: ref('Input'),
      }
    },
  })
</script>
```

:::

## 配置文件的变化

config.scss 配置文件已经完全重构为 [Scss:Maps](https://sass-lang.com/documentation/values/maps) 形式，
所以你需要将你项目的 config 里对应的值全部迁移至新的配置文件。

<hl-tag type="danger" effect="light" class="border-none border-left border-danger m-b-sm" style="--border-left-width: 4px">
  v1x 版本 config.scss
</hl-tag>

```scss
$tagRadius: $pageRadius-Md !default;
$tagPadding: 2px $sm !default;
$tagFontSize: $pageFontSize-Md !default;
$tagHeight: $pageFormHeight-Sm !default;
$tagBgColor: darken($pageBG-Hover, 3%) !default;
$tagBorderColor: $pageBorderColor !default;
$tagFontColor: $pageFontColor !default;
```

<hl-tag type="danger" effect="light" class="border-none border-left border-danger m-t-xl  m-b-sm" style="--border-left-width: 4px">
  v2x 版本 config.scss
</hl-tag>

```scss
$conf_tag: (
  'radius': var(--radius-md),
  'padding-y': 2px,
  'padding-x': var(--sm),
  'height': var(--form-sm),
  'font-size': var(--font-md),
  'font-color': var(--text-regular),
  'border-color': var(--border-regular),
  'bg-color': var(--bg-hover),
) !default;
```

:::tip
我们将常用颜色、尺寸都输出成 `css var` 形式，你在配置文件中也可以调用 例如：`'bg-color': var(--bg-hover)`
:::

## 样式名称变化

为了避免样式冲突和命名规范化，我们将少量的 class 名称进行了修改，例如：

#### align 属性的命名修改

除了 left \ center \ right \ top \ middle \ bottom \ between 以外，v2 版还补全了 flex 的全部属性，相关文档请查看 [flex 弹性布局](/2x/#/zh-CN/style/flex)

<hl-group gap="var(--md)" align="items-middle" class="m-b-sm">
<hl-tag type="danger" effect="light" class="border-none border-left border-danger" style="--border-left-width: 4px">
align="center"
</hl-tag>
<hl-icon size="xs"><TwoArrowRight /></hl-icon>
<hl-tag type="success" effect="light" class="border-none border-left border-success" style="--border-left-width: 4px">
align="items-center"
</hl-tag>
</hl-group>

```html
<hl-group align="items-middle"></hl-group>
<hl-row align="items-middle"></hl-row>
<hl-form :label-position="['items-right', 'items-middle']"></hl-form>
<hl-form-item label="活动形式" label-position="items-right"></hl-form-item>
```

#### Grid 组件中的命名修改

<hl-group gap="var(--md)" align="items-middle" class="m-b-sm">
  <hl-tag type="danger" effect="light" class="border-none border-left border-danger" style="--border-left-width: 4px">
  grid-row-span-lg-*
  </hl-tag>
  <hl-icon size="xs"><TwoArrowRight /></hl-icon>
  <hl-tag type="success" effect="light" class="border-none border-left border-success" style="--border-left-width: 4px">
  row-span-lg-*
  </hl-tag>
</hl-group>

```html
<hl-col span="col row-span-2"></hl-col> <hl-col span="col col-span-2"></hl-col>
```

## 响应式的声明在前

v2 版本的响应式声明标签写在常规类的前面，这样更有助于理解。
例如：m-t-<ins>md</ins> 中的 `"md"` 代表尺寸， 而 col-<ins>md</ins>-12 中的 `"md"` 代表浏览器响应的断点，这很容易引起误解。所以 v2 版本学习了 tailwind 的方法并优化了表达方式。

<hl-group gap="var(--md)" align="items-middle" class="m-b-sm">
  <hl-tag type="danger" effect="light" class="border-none border-left border-danger" style="--border-left-width: 4px">
  col-md-6
  </hl-tag>
  <hl-icon size="xs"><TwoArrowRight /></hl-icon>
  <hl-tag type="success" effect="light" class="border-none border-left border-success" style="--border-left-width: 4px">
  md:col-6
  </hl-tag>
</hl-group>

```scss
// v1 版本中使用到的响应断点类型有： sm、 md、 lg、 xl、 xxl, 比例尺寸为： 1 至 24
// 请根据下面的列表依次替换

col-{断点类型}-{1-24}           ->        {断点类型}:col-{1-24}
offset-{断点类型}-{1-24}        ->        {断点类型}:offset-{1-24}
count-{断点类型}-{1-24}         ->        {断点类型}:count-{1-24}
grid-col-span-{断点类型}-{1-24} ->        {断点类型}:col-span-{1-24}
grid-row-span-{断点类型}-{1-24} ->        {断点类型}:row-span-{1-24}
```

## 状态的声明在前

同样的规范下，v2 版将交互状态的声明也放在类名的前面。例如表达 `bg-hover` 类名的 `hover` 状态

<hl-group gap="var(--md)" align="items-middle" class="m-b-sm">
  <hl-tag type="danger" effect="light" class="border-none border-left border-danger" style="--border-left-width: 4px">
  bg-hover-hover
  </hl-tag>
  <hl-icon size="xs"><TwoArrowRight /></hl-icon>
  <hl-tag type="success" effect="light" class="border-none border-left border-success" style="--border-left-width: 4px">
  hover:bg-hover
  </hl-tag>
</hl-group>

```scss

// v1 版本中使用到的状态类型有：checked、 active、 hover
// 请根据下面的列表依次替换

bg-transparent-{状态类型}       ->        {状态类型}:bg-transparent
bg-body-{状态类型}              ->        {状态类型}:bg-body
bg-content-{状态类型}           ->        {状态类型}:bg-content
bg-light-{状态类型}             ->        {状态类型}:bg-light
bg-element-{状态类型}           ->        {状态类型}:bg-element
bg-hover-{状态类型}             ->        {状态类型}:bg-hover
bg-active-{状态类型}            ->        {状态类型}:bg-active
bg-title-{状态类型}             ->        {状态类型}:bg-title
bg-mask-{状态类型}              ->        {状态类型}:bg-mask

text-regular-{状态类型}         ->        {状态类型}:text-regular
text-secondary-{状态类型}       ->        {状态类型}:text-secondary
text-light-{状态类型}           ->        {状态类型}:text-light
text-lightest-{状态类型}        ->        {状态类型}:text-lightest
text-title-{状态类型}           ->        {状态类型}:text-title
text-link-{状态类型}            ->        {状态类型}:text-link
text-hover-{状态类型}           ->        {状态类型}:text-hover
text-inverse-{状态类型}         ->        {状态类型}:text-inverse
text-inherit-{状态类型}         ->        {状态类型}:text-inherit
text-current-{状态类型}         ->        {状态类型}:text-current

border-transparent-{状态类型    ->        {状态类型}:border-transparent
border-regular-{状态类型}       ->        {状态类型}:border-regular
border-light-{状态类型}         ->        {状态类型}:border-light
border-dark-{状态类型}          ->        {状态类型}:border-dark

bg-primary-{状态类型}           ->        {状态类型}:bg-primary
bg-warning-{状态类型}           ->        {状态类型}:bg-warning
bg-success-{状态类型}           ->        {状态类型}:bg-success
bg-danger-{状态类型}            ->        {状态类型}:bg-danger
bg-info-{状态类型}              ->        {状态类型}:bg-info

text-primary-{状态类型}         ->        {状态类型}:text-primary
text-warning-{状态类型}         ->        {状态类型}:text-warning
text-success-{状态类型}         ->        {状态类型}:text-success
text-danger-{状态类型}          ->        {状态类型}:text-danger
text-info-{状态类型}            ->        {状态类型}:text-info

border-primary-{状态类型}       ->        {状态类型}:border-primary
border-warning-{状态类型}       ->        {状态类型}:border-warning
border-success-{状态类型}       ->        {状态类型}:border-success
border-danger-{状态类型}        ->        {状态类型}:border-danger
border-info-{状态类型}          ->        {状态类型}:border-info

```


## 尺寸变量修改

尺寸变量不再使用`scss变量`方式，取而代之的是 `css var()`变量

<hl-group gap="var(--md)" align="items-middle" class="m-b-sm">
  <hl-tag type="danger" effect="light" class="border-none border-left border-danger" style="--border-left-width: 4px">
  $md
  </hl-tag>
  <hl-icon size="xs"><TwoArrowRight /></hl-icon>
  <hl-tag type="success" effect="light" class="border-none border-left border-success" style="--border-left-width: 4px">
  var(--md)
  </hl-tag>
</hl-group>