# Sizing 规范尺寸

Hongluan 提供了 `规范的` 尺寸类，用于更加简便、快捷的制作页面。
:::tip
Hongluan 的通用尺寸规范为`4`的倍数，同时使用我们自定义的[size()](url) (Scss 函数)进行计算，它可以帮你将`px`换算成`rem`单位。所以你只需要对照设计图的`px`尺寸来设置即可。无需手动换算`rem`值。
:::

<div class="scrollable max-h-xl m-t-md">

| Css Var    | Scss                       | Properties |
| ---------- | -------------------------- | ---------- |
| var(--xxs) | map.get($conf_size, 'xxs') | 4px        |
| var(--xs)  | map.get($conf_size, 'xs')  | 8px        |
| var(--sm)  | map.get($conf_size, 'sm')  | 12px       |
| var(--md)  | map.get($conf_size, 'md')  | 16px       |
| var(--lg)  | map.get($conf_size, 'lg')  | 24px       |
| var(--xl)  | map.get($conf_size, 'xl')  | 32px       |
| var(--xxl) | map.get($conf_size, 'xxl') | 40px       |

</div>

:::danger
你还可以使用 Css 的 `calc()` 函数来计算你要的尺寸 例如 `calc(var(--xxs) * 100)` 来得到 400px 的尺寸
:::

你也可以在`packages/theme/src/common/config.scss`文件中修改或增加规范尺寸单位。

```scss
$conf_size: (
  "xxs": 4px,
  "xs": 8px,
  "sm": 12px,
  "md": 16px,
  "lg": 24px,
  "xl": 32px,
  "xxl": 40px,
  // 新增
  "key": value,
  ),
) !default;
```

## 宽度和高度

使用 Hongluan 提供的`width` 和 `height` 尺寸是规范尺寸的 10 倍。

<div class="scrollable max-h-xl m-t-md">

| Class     | Properties       |
| --------- | ---------------- |
| w-xxs     | width: 40px      |
| w-xs      | width: 80px      |
| w-sm      | width: 120px     |
| w-md      | width: 160px     |
| w-lg      | width: 240px     |
| w-xl      | width: 320px     |
| w-xxl     | width: 400px     |
| min-w-xxs | min-width: 40px  |
| min-w-xs  | min-width: 80px  |
| min-w-sm  | min-width: 120px |
| min-w-md  | min-width: 160px |
| min-w-lg  | min-width: 240px |
| min-w-xl  | min-width: 320px |
| min-w-xxl | min-width: 400px |
| max-w-xxs | max-width: 40px  |
| max-w-xs  | max-width: 80px  |
| max-w-sm  | max-width: 120px |
| max-w-md  | max-width: 160px |
| max-w-lg  | max-width: 240px |
| max-w-xl  | max-width: 320px |
| max-w-xxl | max-width: 400px |

</div>

```scss
$xl: 32px;
.demo {
  min-width: size($xl);
  // 32px / 16px (16px为基数，可在config.scss里更改)
  // 输出 min-width: 2rem;
}
```

## 宽度

:::demo

```html
<div class="display-flex flex-col gap-sm items-center">
  <div class="bg-stripes radius-xl"><div class="transition-all display-flex items-middle items-center w-xxl sm:w-sm h-xxs bg-primary text-inverse radius-xl">sm</div></div>
  <div class="bg-stripes radius-xl"><div class="transition-all display-flex items-middle items-center w-xl md:w-md h-xxs bg-primary text-inverse radius-xl">md</div></div>
  <div class="bg-stripes radius-xl"><div class="transition-all display-flex items-middle items-center w-lg lg:w-lg h-xxs bg-primary text-inverse radius-xl">lg</div></div>
  <div class="bg-stripes radius-xl"><div class="transition-all display-flex items-middle items-center w-md xl:w-xl h-xxs bg-primary text-inverse radius-xl">xl</div></div>
  <div class="bg-stripes radius-xl"><div class="transition-all display-flex items-middle items-center w-sm xxl:w-xxl h-xxs bg-primary text-inverse radius-xl">xxl</div></div>
</div>
```

:::

## 百分比宽度

<div class="scrollable max-h-xl m-t-md">

| Class     | Properties      |
| --------- | --------------- |
| w-auto    | width: auto     |
| w-full    | width: 100%     |
| w-5       | width: 5%       |
| w-10      | width: 10%      |
| w-15      | width: 15%      |
| w-20      | width: 20%      |
| w-25      | width: 25%      |
| w-30      | width: 30%      |
| w-35      | width: 35%      |
| w-40      | width: 40%      |
| w-45      | width: 45%      |
| w-50      | width: 50%      |
| w-55      | width: 55%      |
| w-60      | width: 60%      |
| w-65      | width: 65%      |
| w-70      | width: 70%      |
| w-75      | width: 75%      |
| w-80      | width: 80%      |
| w-85      | width: 85%      |
| w-90      | width: 90%      |
| w-95      | width: 95%      |
| w-100     | width: 100%     |
| min-w-5   | min-width: 5%   |
| min-w-10  | min-width: 10%  |
| min-w-15  | min-width: 15%  |
| min-w-20  | min-width: 20%  |
| min-w-25  | min-width: 25%  |
| min-w-30  | min-width: 30%  |
| min-w-35  | min-width: 35%  |
| min-w-40  | min-width: 40%  |
| min-w-45  | min-width: 45%  |
| min-w-50  | min-width: 50%  |
| min-w-55  | min-width: 55%  |
| min-w-60  | min-width: 60%  |
| min-w-65  | min-width: 65%  |
| min-w-70  | min-width: 70%  |
| min-w-75  | min-width: 75%  |
| min-w-80  | min-width: 80%  |
| min-w-85  | min-width: 85%  |
| min-w-90  | min-width: 90%  |
| min-w-95  | min-width: 95%  |
| min-w-100 | min-width: 100% |
| max-w-5   | max-width: 5%   |
| max-w-10  | max-width: 10%  |
| max-w-15  | max-width: 15%  |
| max-w-20  | max-width: 20%  |
| max-w-25  | max-width: 25%  |
| max-w-30  | max-width: 30%  |
| max-w-35  | max-width: 35%  |
| max-w-40  | max-width: 40%  |
| max-w-45  | max-width: 45%  |
| max-w-50  | max-width: 50%  |
| max-w-55  | max-width: 55%  |
| max-w-60  | max-width: 60%  |
| max-w-65  | max-width: 65%  |
| max-w-70  | max-width: 70%  |
| max-w-75  | max-width: 75%  |
| max-w-80  | max-width: 80%  |
| max-w-85  | max-width: 85%  |
| max-w-90  | max-width: 90%  |
| max-w-95  | max-width: 95%  |
| max-w-100 | max-width: 100% |

</div>

:::demo

```html
<div class="display-flex flex-col bg-stripes radius-xl gap-md">
  <div class="display-flex bg-stripes radius-xl gap-md">
    <div class="transition-all display-inline-flex items-middle items-center w-75 xl:w-25 h-xxs bg-primary text-inverse radius-xl">25%</div>
    <div class="transition-all display-inline-flex items-middle items-center w-25 xl:w-75 h-xxs bg-primary-light-2 text-inverse radius-xl">75%</div>
  </div>
  <div class="display-flex bg-stripes radius-xl gap-md">
    <div class="transition-all display-inline-flex items-middle items-center w-50 xl:w-50 h-xxs bg-primary text-inverse radius-xl">50%</div>
    <div class="transition-all display-inline-flex items-middle items-center w-50 xl:w-50 h-xxs bg-primary-light-2 text-inverse radius-xl">50%</div>
  </div>
  <div class="display-flex bg-stripes radius-xl gap-md">
    <div class="transition-all display-inline-flex items-middle items-center w-25 xl:w-75 h-xxs bg-primary text-inverse radius-xl">75%</div>
    <div class="transition-all display-inline-flex items-middle items-center w-75 xl:w-25 h-xxs bg-primary-light-2 text-inverse radius-xl">25%</div>
  </div>
  <div class="display-flex bg-stripes radius-xl gap-md">
    <div class="display-inline-flex items-middle items-center w-full h-xxs bg-primary text-inverse radius-xl">100%</div>
  </div>
</div>
```

:::

## 高度

高度`height` 与`width` 具相同的属性。

<div class="scrollable max-h-xl m-t-md">

| Class     | Properties        |
| --------- | ----------------- |
| h-xxs     | height: 40px      |
| h-xs      | height: 80px      |
| h-sm      | height: 120px     |
| h-md      | height: 160px     |
| h-lg      | height: 240px     |
| h-xl      | height: 320px     |
| h-xxl     | height: 400px     |
| min-h-xxs | min-height: 40px  |
| min-h-xs  | min-height: 80px  |
| min-h-sm  | min-height: 120px |
| min-h-md  | min-height: 160px |
| min-h-lg  | min-height: 240px |
| min-h-xl  | min-height: 320px |
| min-h-xxl | min-height: 400px |
| max-h-xxs | max-height: 40px  |
| max-h-xs  | max-height: 80px  |
| max-h-sm  | max-height: 120px |
| max-h-md  | max-height: 160px |
| max-h-lg  | max-height: 240px |
| max-h-xl  | max-height: 320px |
| max-h-xxl | max-height: 400px |

</div>

:::demo

```html
<div class="display-flex flex-row gap-lg items-center">
  <div class="bg-stripes radius-xl"><div class="transition-all display-flex items-middle items-center h-xxl sm:h-sm w-xxs bg-primary text-inverse radius-xl">sm</div></div>
  <div class="bg-stripes radius-xl"><div class="transition-all display-flex items-middle items-center h-xl md:h-md w-xxs bg-primary text-inverse radius-xl">md</div></div>
  <div class="bg-stripes radius-xl"><div class="transition-all display-flex items-middle items-center h-lg lg:h-lg w-xxs bg-primary text-inverse radius-xl">lg</div></div>
  <div class="bg-stripes radius-xl"><div class="transition-all display-flex items-middle items-center h-md xl:h-xl w-xxs bg-primary text-inverse radius-xl">xl</div></div>
  <div class="bg-stripes radius-xl"><div class="transition-all display-flex items-middle items-center h-sm xxl:h-xxl w-xxs bg-primary text-inverse radius-xl">xxl</div></div>
</div>
```

:::

## 百分比高度

<div class="scrollable max-h-xl m-t-md">

| Class     | Properties       |
| --------- | ---------------- |
| h-auto    | height: auto     |
| h-full    | height: 100%     |
| h-5       | height: 5%       |
| h-10      | height: 10%      |
| h-15      | height: 15%      |
| h-20      | height: 20%      |
| h-25      | height: 25%      |
| h-30      | height: 30%      |
| h-35      | height: 35%      |
| h-40      | height: 40%      |
| h-45      | height: 45%      |
| h-50      | height: 50%      |
| h-55      | height: 55%      |
| h-60      | height: 60%      |
| h-65      | height: 65%      |
| h-70      | height: 70%      |
| h-75      | height: 75%      |
| h-80      | height: 80%      |
| h-85      | height: 85%      |
| h-90      | height: 90%      |
| h-95      | height: 95%      |
| h-100     | height: 100%     |
| min-h-5   | min-height: 5%   |
| min-h-10  | min-height: 10%  |
| min-h-15  | min-height: 15%  |
| min-h-20  | min-height: 20%  |
| min-h-25  | min-height: 25%  |
| min-h-30  | min-height: 30%  |
| min-h-35  | min-height: 35%  |
| min-h-40  | min-height: 40%  |
| min-h-45  | min-height: 45%  |
| min-h-50  | min-height: 50%  |
| min-h-55  | min-height: 55%  |
| min-h-60  | min-height: 60%  |
| min-h-65  | min-height: 65%  |
| min-h-70  | min-height: 70%  |
| min-h-75  | min-height: 75%  |
| min-h-80  | min-height: 80%  |
| min-h-85  | min-height: 85%  |
| min-h-90  | min-height: 90%  |
| min-h-95  | min-height: 95%  |
| min-h-100 | min-height: 100% |
| max-h-5   | max-height: 5%   |
| max-h-10  | max-height: 10%  |
| max-h-15  | max-height: 15%  |
| max-h-20  | max-height: 20%  |
| max-h-25  | max-height: 25%  |
| max-h-30  | max-height: 30%  |
| max-h-35  | max-height: 35%  |
| max-h-40  | max-height: 40%  |
| max-h-45  | max-height: 45%  |
| max-h-50  | max-height: 50%  |
| max-h-55  | max-height: 55%  |
| max-h-60  | max-height: 60%  |
| max-h-65  | max-height: 65%  |
| max-h-70  | max-height: 70%  |
| max-h-75  | max-height: 75%  |
| max-h-80  | max-height: 80%  |
| max-h-85  | max-height: 85%  |
| max-h-90  | max-height: 90%  |
| max-h-95  | max-height: 95%  |
| max-h-100 | max-height: 100% |

</div>

:::demo

```html
<div class="display-flex flex-row gap-lg items-center h-xxl">
  <div class="bg-stripes radius-xl"><div class="transition-all display-flex items-middle items-center h-70 sm:h-30 w-xxs bg-primary text-inverse radius-xl">30%</div></div>
  <div class="bg-stripes radius-xl"><div class="transition-all display-flex items-middle items-center h-60 md:h-40 w-xxs bg-primary text-inverse radius-xl">40%</div></div>
  <div class="bg-stripes radius-xl"><div class="transition-all display-flex items-middle items-center h-50 lg:h-50 w-xxs bg-primary text-inverse radius-xl">50%</div></div>
  <div class="bg-stripes radius-xl"><div class="transition-all display-flex items-middle items-center h-40 xl:h-60 w-xxs bg-primary text-inverse radius-xl">60%</div></div>
  <div class="bg-stripes radius-xl"><div class="transition-all display-flex items-middle items-center h-full xxl:h-70 w-xxs bg-primary text-inverse radius-xl">70%</div></div>
</div>
```

:::

## Viewport 尺寸

你还可以设置相对于视窗的宽度和高度。

<div class="scrollable max-h-xl m-t-md">

| Class      | Properties        |
| ---------- | ----------------- |
| vw-full    | width: 100vw      |
| vw-5       | width: 5vw        |
| vw-10      | width: 10vw       |
| vw-15      | width: 15vw       |
| vw-20      | width: 20vw       |
| vw-25      | width: 25vw       |
| vw-30      | width: 30vw       |
| vw-35      | width: 35vw       |
| vw-40      | width: 40vw       |
| vw-45      | width: 45vw       |
| vw-50      | width: 50vw       |
| vw-55      | width: 55vw       |
| vw-60      | width: 60vw       |
| vw-65      | width: 65vw       |
| vw-70      | width: 70vw       |
| vw-75      | width: 75vw       |
| vw-80      | width: 80vw       |
| vw-85      | width: 85vw       |
| vw-90      | width: 90vw       |
| vw-95      | width: 95vw       |
| vw-100     | width: 100vw      |
| min-vw-full| min-width: 100vw      |
| min-vw-5   | min-width: 5vw    |
| min-vw-10  | min-width: 10vw   |
| min-vw-15  | min-width: 15vw   |
| min-vw-20  | min-width: 20vw   |
| min-vw-25  | min-width: 25vw   |
| min-vw-30  | min-width: 30vw   |
| min-vw-35  | min-width: 35vw   |
| min-vw-40  | min-width: 40vw   |
| min-vw-45  | min-width: 45vw   |
| min-vw-50  | min-width: 50vw   |
| min-vw-55  | min-width: 55vw   |
| min-vw-60  | min-width: 60vw   |
| min-vw-65  | min-width: 65vw   |
| min-vw-70  | min-width: 70vw   |
| min-vw-75  | min-width: 75vw   |
| min-vw-80  | min-width: 80vw   |
| min-vw-85  | min-width: 85vw   |
| min-vw-90  | min-width: 90vw   |
| min-vw-95  | min-width: 95vw   |
| min-vw-100 | min-width: 100vw  |
| max-vw-full| max-width: 100vw  |
| max-vw-5   | max-width: 5vw    |
| max-vw-10  | max-width: 10vw   |
| max-vw-15  | max-width: 15vw   |
| max-vw-20  | max-width: 20vw   |
| max-vw-25  | max-width: 25vw   |
| max-vw-30  | max-width: 30vw   |
| max-vw-35  | max-width: 35vw   |
| max-vw-40  | max-width: 40vw   |
| max-vw-45  | max-width: 45vw   |
| max-vw-50  | max-width: 50vw   |
| max-vw-55  | max-width: 55vw   |
| max-vw-60  | max-width: 60vw   |
| max-vw-65  | max-width: 65vw   |
| max-vw-70  | max-width: 70vw   |
| max-vw-75  | max-width: 75vw   |
| max-vw-80  | max-width: 80vw   |
| max-vw-85  | max-width: 85vw   |
| max-vw-90  | max-width: 90vw   |
| max-vw-95  | max-width: 95vw   |
| max-vw-100 | max-width: 100vw  |
| vh-full    | height: 100vh      |
| vh-5       | height: 5vh       |
| vh-10      | height: 10vh      |
| vh-15      | height: 15vh      |
| vh-20      | height: 20vh      |
| vh-25      | height: 25vh      |
| vh-30      | height: 30vh      |
| vh-35      | height: 35vh      |
| vh-40      | height: 40vh      |
| vh-45      | height: 45vh      |
| vh-50      | height: 50vh      |
| vh-55      | height: 55vh      |
| vh-60      | height: 60vh      |
| vh-65      | height: 65vh      |
| vh-70      | height: 70vh      |
| vh-75      | height: 75vh      |
| vh-80      | height: 80vh      |
| vh-85      | height: 85vh      |
| vh-90      | height: 90vh      |
| vh-95      | height: 95vh      |
| vh-100     | height: 100vh     |
| min-vh-full| min-height: 100vh |
| min-vh-5   | min-height: 5vw   |
| min-vh-10  | min-height: 10vh  |
| min-vh-15  | min-height: 15vh  |
| min-vh-20  | min-height: 20vh  |
| min-vh-25  | min-height: 25vh  |
| min-vh-30  | min-height: 30vh  |
| min-vh-35  | min-height: 35vh  |
| min-vh-40  | min-height: 40vh  |
| min-vh-45  | min-height: 45vh  |
| min-vh-50  | min-height: 50vh  |
| min-vh-55  | min-height: 55vh  |
| min-vh-60  | min-height: 60vh  |
| min-vh-65  | min-height: 65vh  |
| min-vh-70  | min-height: 70vh  |
| min-vh-75  | min-height: 75vh  |
| min-vh-80  | min-height: 80vh  |
| min-vh-85  | min-height: 85vh  |
| min-vh-90  | min-height: 90vh  |
| min-vh-95  | min-height: 95vh  |
| min-vh-100 | min-height: 100vh |
| max-vh-full| max-height: 100vh |
| max-vh-5   | max-height: 5vh   |
| max-vh-10  | max-height: 10vh  |
| max-vh-15  | max-height: 15vh  |
| max-vh-20  | max-height: 20vh  |
| max-vh-25  | max-height: 25vh  |
| max-vh-30  | max-height: 30vh  |
| max-vh-35  | max-height: 35vh  |
| max-vh-40  | max-height: 40vh  |
| max-vh-45  | max-height: 45vh  |
| max-vh-50  | max-height: 50vh  |
| max-vh-55  | max-height: 55vh  |
| max-vh-60  | max-height: 60vh  |
| max-vh-65  | max-height: 65vh  |
| max-vh-70  | max-height: 70vh  |
| max-vh-75  | max-height: 75vh  |
| max-vh-80  | max-height: 80vh  |
| max-vh-85  | max-height: 85vh  |
| max-vh-90  | max-height: 90vh  |
| max-vh-95  | max-height: 95vh  |
| max-vh-100 | max-height: 100vh |

</div>

:::demo

```html
<div class="display-flex flex-col gap-lg items-center">
  <div class="bg-stripes radius-xl"><div class="transition-all display-flex items-middle items-center vh-5 vw-5 w-max-xxl h-xxs bg-primary text-inverse radius-xl">vw-5</div></div>
  <div class="bg-stripes radius-xl"><div class="transition-all display-flex items-middle items-center vh-5 vw-10 w-max-xxl h-xxs bg-primary text-inverse radius-xl">vw-10</div></div>
  <div class="bg-stripes radius-xl"><div class="transition-all display-flex items-middle items-center vh-5 vw-15 w-max-xxl h-xxs bg-primary text-inverse radius-xl">vw-15</div></div>
  <div class="bg-stripes radius-xl"><div class="transition-all display-flex items-middle items-center vh-5 vw-20 w-max-xxl h-xxs bg-primary text-inverse radius-xl">vw-20</div></div>
</div>
```

:::

## 响应式

当前页面中的所有尺寸类型都支持响应式标签，例如：

`lg:w-sm`
`xl:w-40`
`sm:h-sm`
`md:h-40`
`xs:vw-100`
`lg:vh-100`
