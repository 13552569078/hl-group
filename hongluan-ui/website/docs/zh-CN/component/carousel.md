## Carousel 走马灯

## 默认样式
:::demo-fs 结合使用 Carousel 组件和 CarouselItem 组件就得到了一个走马灯。幻灯片的内容是任意的，需要放在 CarouselItem 组件中。默认情况下，在鼠标 hover 底部的指示器时就会触发切换。通过设置`trigger`属性为`click`，可以达到点击触发的效果。

carousel/basic

:::

## 指示器

可以将指示器的显示位置设置在容器外部

:::demo-fs `indicator-position`属性定义了指示器的位置。默认情况下，它会显示在走马灯内部，设置为`outside`则会显示在外部；设置为`none`则不会显示指示器。

carousel/indicator

:::

## 切换箭头
可以设置切换箭头的显示时机

:::demo-fs `arrow`属性定义了切换箭头的显示时机。默认情况下，切换箭头只有在鼠标 hover 到走马灯上时才会显示；若将`arrow`设置为`always`，则会一直显示；设置为`never`，则会一直隐藏。

carousel/arrow

:::

## 卡片化
当页面宽度方向空间空余，但高度方向空间匮乏时，可使用卡片风格

:::demo-fs 将`type`属性设置为`card`即可启用卡片模式。从交互上来说，卡片模式和一般模式的最大区别在于，可以通过直接点击两侧的幻灯片进行切换。

carousel/card

:::

## 方向
默认情况下，`direction` 为 `horizontal`。通过设置 `direction` 为 `vertical` 来让走马灯在垂直方向上显示。
:::demo-fs

carousel/direction

:::

## 自定义指示器示例
:::demo-fs 自定义indicator时，使用 CarouselIndicator 组件

carousel/custom-indicator

:::

## 显示多张图片
:::demo-fs 可视区域显示多个items，CarouselItem 组件的数量 - itemsNumber >= 2 && type !== 'card' && direction === 'horizontal'时生效，itemsNumber/itemsWidth必传，默认不显示indicator指示器;

carousel/multiple

::: 
## Attributes
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| height | 走马灯的高度 | string | — | — |
| initial-index | 初始状态激活的幻灯片的索引，从 0 开始 | number | — | 0 |
| trigger | 指示器的触发方式 | string | click | — |
| autoplay | 是否自动切换 | boolean | — | true |
| interval | 自动切换的时间间隔，单位为毫秒 | number | — | 3000 |
| indicator-position | 指示器的位置 | string | outside/none | — |
| arrow | 切换箭头的显示时机 | string | always/hover/never | hover |
| type | 走马灯的类型 | string | card | — |
| loop | 是否循环显示 | boolean | - | true |
| direction | 走马灯展示的方向 | string | horizontal/vertical | horizontal |
| pause-on-hover | 鼠标悬浮时暂停自动切换 | boolean | - | true |
| indicator-type | 指示器类型 | string | line/dot/custom(自定义) | line |
| slot  | 自定义指示器具名插槽 | v-slot:indicator |  |  |
| items-number  | 可视区域显示items个数, | number |  | 大于1 |
| items-width  | items-number > 1时，items宽度有效 | string/number |  |  |

## Events
| 事件名称 | 说明 | 回调参数 |
|---------|---------|---------|
| change | 幻灯片切换时触发 | 目前激活的幻灯片的索引，原幻灯片的索引 |

## Methods
| 方法名      | 说明          | 参数 |
|---------- |-------------- | -- |
| setActiveItem | 手动切换幻灯片 | 需要切换的幻灯片的索引，从 0 开始；或相应 `hl-carousel-item` 的 `name` 属性值 |
| prev | 切换至上一张幻灯片 | — |
| next | 切换至下一张幻灯片 | — |

## Carousel Item Attributes
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| name | 幻灯片的名字，可用作 `setActiveItem` 的参数 | string | — | — |
| label | 该幻灯片所对应指示器的文本 | string | — | — |

## Carousel Indicator Attributes
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| index | 指示器索引 | number |  |  |

## Carousel Indicator Events
| 事件名称 | 说明 | 回调参数 |
|---------|---------|---------|
| click | 指示器click时触发 | 目前激活的幻灯片的索引|
| hover | 指示器hover时触发 | 目前激活的幻灯片的索引|