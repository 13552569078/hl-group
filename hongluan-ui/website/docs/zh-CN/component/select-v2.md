# Select V2 虚拟列表选择器

## 背景

在数据量爆发的今天，很多时候一个选择器可能从服务器加载非常多的数据，然而浏览器在一次性把这些数据渲染到页面上的时候会出现卡顿甚至是崩溃的情况，所以虚拟化技术应运而生，为了更好的用户体验和更好的使用体验，我们决定添加这个组件。

:::tip

组件需要包裹 `<client-only></client-only>` 标签，当用在 SSR (eg: [Nuxt](https://nuxt.com/v3)) 和 SSG (eg: [VitePress](https://vitepress.vuejs.org/))。

:::

## 基础用法

适用广泛的基础选择器

:::demo

```html
<template>
  <hl-select-v2
    v-model="value"
    :options="options"
    placeholder="请选择"
    style="width: 240px;"
  />
</template>

<script>
  const initials = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j']
  export default {
    data() {
      return {
        options: Array.from({ length: 1000 }).map((_, idx) => ({
          value: `选项${idx + 1}`,
          label: `${initials[idx % 10]}${idx}`,
        })),
        value: '',
      }
    },
  }
</script>
```

:::

## 多选

最基础的多选选择器
:::demo

```html
<template>
  <hl-select-v2
    v-model="value"
    :options="options"
    placeholder="请选择"
    style="width: 240px;"
    multiple
  />
</template>

<script>
  const initials = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j']
  export default {
    data() {
      return {
        options: Array.from({ length: 1000 }).map((_, idx) => ({
          value: `选项${idx + 1}`,
          label: `${initials[idx % 10]}${idx}`,
        })),
        value: [],
      }
    },
  }
</script>
```

:::

## 隐藏多余标签的多选

:::demo

```html
<template>
  <hl-select-v2
    v-model="value"
    :options="options"
    placeholder="请选择"
    style="width: 240px;"
    multiple
    collapse-tags
  />
</template>

<script>
  const initials = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j']
  export default {
    data() {
      return {
        options: Array.from({ length: 1000 }).map((_, idx) => ({
          value: `选项${idx + 1}`,
          label: `${initials[idx % 10]}${idx}`,
        })),
        value: [],
      }
    },
  }
</script>
```

:::

## 可筛选的多选

当选项过多时，可通过匹配筛选
:::demo

```html
<template>
  <hl-select-v2
    v-model="value"
    filterable
    :options="options"
    placeholder="请选择"
    style="width: 240px;"
    multiple
  />
</template>

<script>
  const initials = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j']
  export default {
    data() {
      return {
        options: Array.from({ length: 1000 }).map((_, idx) => ({
          value: `选项${idx + 1}`,
          label: `${initials[idx % 10]}${idx}`,
        })),
        value: [],
      }
    },
  }
</script>
```

:::

## 禁用状态

您可以选择禁用 Select 或者 Select 的 Option
:::demo

```html
<template>
  <hl-select-v2
    v-model="value"
    filterable
    :options="options"
    placeholder="请选择"
    style="width: 240px; margin-right: 16px; vertical-align: middle;"
    multiple
  />
  <hl-select-v2
    disabled
    v-model="value"
    filterable
    :options="options"
    placeholder="请选择"
    style="width: 240px; vertical-align: middle;"
    multiple
  />
</template>

<script>
  const initials = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j']
  export default {
    data() {
      return {
        options: Array.from({ length: 1000 }).map((_, idx) => ({
          value: `选项${idx + 1}`,
          label: `${initials[idx % 10]}${idx}`,
          disabled: idx % 10 === 0,
        })),
        value: [],
      }
    },
  }
</script>
```

:::

## 选项分组

我们可以为选项分组，只需要满足例子里的这个 pattern

:::demo

```html
<template>
  <hl-select-v2
    v-model="value"
    filterable
    :options="options"
    placeholder="请选择"
    style="width: 240px;"
    multiple
  />
</template>

<script>
  const initials = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j']
  export default {
    data() {
      return {
        options: Array.from({ length: 10 }).map((_, idx) => {
          const label = idx + 1
          return {
            value: `组 ${label}`,
            label: `组 ${label}`,
            options: Array.from({ length: 10 }).map((_, idx) => ({
              value: `选项${idx + 1 + 10 * label}`,
              label: `${initials[idx % 10]}${idx + 1 + 10 * label}`,
            })),
          }
        }),
        value: [],
      }
    },
  }
</script>
```

:::

## 自定义渲染模板

我们也可以通过自己自定义模板来渲染自己想要的内容。

:::demo

```html
<template>
  <hl-select-v2
    v-model="value"
    filterable
    :options="options"
    placeholder="请选择"
    style="width: 240px;"
    multiple
  >
    <template #default="{item}">
      <span style="margin-right: 8px;">{{ item.label }}</span>
      <span style="color: var(--hl-text-color-secondary); font-size: 13px">
        {{ item.value }}
      </span>
    </template>
  </hl-select-v2>
</template>

<script>
  const initials = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j']
  export default {
    data() {
      return {
        options: Array.from({ length: 1000 }).map((_, idx) => ({
          value: `选项${idx + 1}`,
          label: `${initials[idx % 10]}${idx}`,
        })),
        value: [],
      }
    },
  }
</script>
```

:::

## 一键清除

一键删除所有的选项（也可适用于单选）
:::demo

```html
<template>
  <hl-select-v2
    v-model="value1"
    :options="options"
    placeholder="请选择"
    style="width: 240px; margin-right: 16px; vertical-align: middle;"
    multiple
    clearable
  />
  <hl-select-v2
    v-model="value2"
    :options="options"
    placeholder="请选择"
    style="width: 240px; vertical-align: middle;"
    clearable
  />
</template>

<script>
  const initials = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j']
  export default {
    data() {
      return {
        options: Array.from({ length: 1000 }).map((_, idx) => ({
          value: `选项${idx + 1}`,
          label: `${initials[idx % 10]}${idx}`,
        })),
        value1: [],
        value2: '',
      }
    },
  }
</script>
```

:::

## 创建临时选项

可以创建并选中选项中不存在的条目
:::demo 使用`allow-create`属性即可通过在输入框中输入文字来创建新的条目。注意此时`filterable`必须为真。
```html
<template>
  <hl-select-v2
    v-model="value1"
    :options="options"
    placeholder="请选择"
    style="width: 240px; margin-right: 16px; vertical-align: middle;"
    allow-create
    filterable
    multiple
    clearable
  />
  <hl-select-v2
    v-model="value2"
    :options="options"
    placeholder="请选择"
    style="width: 240px; vertical-align: middle;"
    allow-create
    filterable
    clearable
  />
</template>

<script>
  const initials = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j']
  export default {
    data() {
      return {
        options: Array.from({ length: 1000 }).map((_, idx) => ({
          value: `选项${idx + 1}`,
          label: `${initials[idx % 10]}${idx}`,
        })),
        value1: [],
        value2: '',
      }
    },
  }
</script>
```
:::

## 远程搜索

从服务器搜索数据，输入关键字进行查找
:::demo 为了启用远程搜索，需要将`filterable`和`remote`设置为`true`，同时传入一个`remote-method`。`remote-method`为一个`Function`，它会在输入值发生变化时调用，参数为当前输入值。
```html
<template>
  <hl-select-v2
    v-model="value"
    style="width: 240px"
    multiple
    size="medium"
    filterable
    remote
    :remote-method="remoteMethod"
    clearable
    :options="options"
    :loading="loading"
    placeholder="请输入关键词"
  />
</template>

<script>
  export default {
    created() {
      this.list = this.states.map(item => {
        return { value: `value:${item}`, label: `label:${item}` }
      })
    },
    methods: {
      remoteMethod(query) {
        if (query !== '') {
          this.loading = true
          setTimeout(() => {
            this.loading = false
            this.options = this.list.filter(item => {
              return item.label.toLowerCase()
                .indexOf(query.toLowerCase()) > -1
            })
          }, 200)
        } else {
          this.options = []
        }
      },
    },
    data() {
      return {
        list: [],
        loading: false,
        states: ['Alabama', 'Alaska', 'Arizona',
          'Arkansas', 'California', 'Colorado',
          'Connecticut', 'Delaware', 'Florida',
          'Georgia', 'Hawaii', 'Idaho', 'Illinois',
          'Indiana', 'Iowa', 'Kansas', 'Kentucky',
          'Louisiana', 'Maine', 'Maryland',
          'Massachusetts', 'Michigan', 'Minnesota',
          'Mississippi', 'Missouri', 'Montana',
          'Nebraska', 'Nevada', 'New Hampshire',
          'New Jersey', 'New Mexico', 'New York',
          'North Carolina', 'North Dakota', 'Ohio',
          'Oklahoma', 'Oregon', 'Pennsylvania',
          'Rhode Island', 'South Carolina',
          'South Dakota', 'Tennessee', 'Texas',
          'Utah', 'Vermont', 'Virginia',
          'Washington', 'West Virginia', 'Wisconsin',
          'Wyoming'],
        options: [],
        value: [],
      }
    },
  }
</script>
```
:::

## Attributes
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| modhl-value / v-model | 绑定值 | string / number / boolean / object | — | — |
| multiple | 是否多选 | boolean | — | false |
| disabled | 是否禁用 | boolean | — | false |
| value-key | 作为 value 唯一标识的键名，绑定值为对象类型时必填 | string | — | value |
| size | 输入框尺寸 | string | medium/small/mini | — |
| clearable | 是否可以清空选项 | boolean | — | false |
| collapse-tags | 多选时是否将选中值按文字的形式展示 | boolean | — | false |
| multiple-limit | 多选时用户最多可以选择的项目数，为 0 则不限制 | number | — | 0 |
| name | select input 的 name 属性 | string | — | — |
| autocomplete | select input 的 autocomplete 属性 | string | — | off |
| placeholder | 占位符 | string | — | 请选择 |
| filterable | 是否可搜索 | boolean | — | false |
| filter-method | 自定义搜索方法 | function | — | — |
| remote | 是否为远程搜索 | boolean | — | false |
| remote-method | 远程搜索方法 | function | — | — |
| allow-create | 是否允许用户创建新条目，需配合 `filterable` 使用 | boolean | — | false |
| no-data-text | 选项为空时显示的文字，也可以使用`#empty`设置 | string | — | 无数据 |
| popper-class | Select 下拉框的类名 | string | — | — |
| popper-append-to-body | 是否将弹出框插入至 body 元素。在弹出框的定位出现问题时，可将该属性设置为 false | boolean | - | false |
| popper-options | 用户定制化 popper 的行为, 更多请查看文档[popper.js](https://popper.js.org/docs/v2/) | object | - | - |
| automatic-dropdown | 对于不可搜索的 Select，是否在输入框获得焦点后自动弹出选项菜单 | boolean | - | false |
| clear-icon | 自定义清空图标的类名 | string | — | hl-icon-circle-close |
| height | 面板的高度，每项的高度为34px | number | - | 170 |
| scrollbar-always-on   | 滚动条是否一直显示 | boolean      -                 | false         |

<span style="display: none;">
<!-- | no-match-text | 搜索条件无匹配时显示的文字，也可以使用`#empty`设置 | string | — | 无匹配数据 | -->
<!-- | reserve-keyword | 多选且可搜索时，是否在选中一个选项后保留当前的搜索关键词 | boolean | — | false |
| default-first-option | 在输入框按下回车，选择第一个匹配项。需配合 `filterable` 或 `remote` 使用 | boolean | - | false |
| clear-icon | 自定义清空图标的类名 | string | — | hl-icon-circle-close |
| allow-create | 是否允许用户创建新条目，需配合 `filterable` 使用 | boolean | — | false |
| filter-method | 自定义搜索方法 | function | — | — |
| remote | 是否为远程搜索 | boolean | — | false |
| remote-method | 远程搜索方法 | function | — | — |
| loading | 是否正在从远程获取数据 | boolean | — | false |
| loading-text | 远程加载时显示的文字 | string | — | 加载中 | -->
</span>

## Events
| 事件名称 | 说明 | 回调参数 |
|---------|---------|---------|
| change | 选中值发生变化时触发 | 目前的选中值 |
| visible-change | 下拉框出现/隐藏时触发 | 出现则为 true，隐藏则为 false |
| remove-tag | 多选模式下移除tag时触发 | 移除的tag值 |
| clear | 可清空的单选模式下用户点击清空按钮时触发 | — |
| blur | 当 input 失去焦点时触发 | (event: Event) |
| focus | 当 input 获得焦点时触发 | (event: Event) |

## Slots
|   name  | 说明     |
|---------|---------|
| default | Option 模板 |
| empty | 无选项时的列表 |

<!-- | prefix  | Select 组件头部内容 | -->
