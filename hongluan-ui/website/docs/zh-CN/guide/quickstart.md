# 快速上手

介绍如何在项目中使用 Hongluan UI。

## 引入 Hongluan UI

你可以引入整个 Hongluan UI，或是根据需要仅引入部分组件，我们先介绍如何引入完整的 Hongluan UI Library。

## 完整引入

在 main.ts 中写入以下内容：

<hl-tag type="danger" effect="light" class="border-none border-left border-danger" style="--border-left-width: 4px">main.ts</hl-tag>

```javascript
import { createApp } from 'vue'

import HongluanUI from 'hongluan-ui'; //引入Hongluan
import 'hongluan-ui/dist/index.css';  //引入样式文件

import App from './App.vue';

const app = createApp(App)
app.use(HongluanUI)
app.mount('#app')
```

以上代码便完成了 Hongluan UI 的引入，需要注意的是样式文件需要单独引入。

## Volar support

如果您使用 Volar，请在 `tsconfig.json` 中通过 `compilerOptions.type` 指定全局组件类型。

<hl-tag type="danger" effect="light" class="border-none border-left border-danger" style="--border-left-width: 4px">tsconfig.json</hl-tag>

```json
{
  "compilerOptions": {
    // ...
    "types": ["hongluan-ui/global"]
  }
}
```

## 按需引入组件

HongluanUI 的 JavaScript 代码默认支持基于 ES modules 的 [摇树 tree shaking](https://webpack.js.org/guides/tree-shaking/)。

<hl-tag type="danger" effect="light" class="border-none border-left border-danger" style="--border-left-width: 4px">app.vue</hl-tag>

```html
<template>
  <hl-button>
    Hello hl-button
  </hl-button>
</template>
<script>
import { defineComponent } from 'vue'
import { HlButton } from 'hongluan-ui'

export default defineComponent({
  name: 'app'
  components: {
    HlButton,
  },
})
</script>
```

## 样式的引入

我们 **强烈建议直接引入全部的样式文件**，虽然这看起来会增大整个应用的体积，但这样做可以避免引入额外的打包工具插件（减少负担），你还可以通过 [CDN](https://www.cloudflare.com/learning/cdn/what-is-a-cdn/)
的方式来加载样式文件，从而使得你的应用加载更快。


#### 通过 JS 的方式引入

```typescript
import 'hongluan-ui/dist/index.css'
```

#### 通过 HTML 的头文件引入

```html
<!-- index.html -->
<head>
  <link rel="stylesheet" href="//unpkg.com/hongluan-ui/dist/index.css">
</head>
```

### 自动导入

首先需要安装 `unplugin-vue-components`。

```shell
$ npm install unplugin-vue-components
```

然后将以下代码添加到 `Vite` 或 `Webpack` 的配置文件中。

<hl-tag type="danger" effect="light" class="border-none border-left border-danger" style="--border-left-width: 4px">vite.config.ts</hl-tag>

```js
import Components from 'unplugin-vue-components/vite'

export default defineConfig({
  plugins: [
    Components({
      resolvers: [
        // example of importing Vant
        (name) => {
          // where `name` is always CapitalCase
          if (name.startsWith('Hl'))
            return { importName: name, path: 'hongluan-ui' }
        }
      ]
    }),
  ],
})
```

<hl-tag type="danger" effect="light" class="border-none border-left border-danger" style="--border-left-width: 4px">webpack.config.js</hl-tag>

```js
module.exports = {
  /* ... */
  plugins: [
    require('unplugin-vue-components/webpack')({
      resolvers: [
        // example of importing Vant
        (name) => {
          // where `name` is always CapitalCase
          if (name.startsWith('Hl'))
            return { importName: name, path: 'hongluan-ui' }
        }
      ]
    })
  ]
}
```

<hl-tag type="danger" effect="light" class="border-none border-left border-danger" style="--border-left-width: 4px">vue.config.js</hl-tag>

```js
module.exports = {
  configureWebpack: {
    plugins: [
      require('unplugin-vue-components/webpack')({
        resolvers: [
          // example of importing Vant
          (name) => {
            // where `name` is always CapitalCase
            if (name.startsWith('Hl'))
              return { importName: name, path: 'hongluan-ui' }
          }
        ]
      }),
    ],
  },
}
```

### 按需加载样式：Vue CLI（JS）

借助 [babel-plugin-import](https://github.com/ant-design/babel-plugin-import)，我们可以只引入需要的组件，以达到减小项目体积的目的。

首先，安装 babel-plugin-import:

```shell
$ npm install babel-plugin-import -D
# 或者
$ yarn add babel-plugin-import -D
```

然后，将 babel.config.js 修改为：

#### 引入 `.scss` 样式

请确保已经安装了 `sass` 和 `sass-loader` 依赖并将 `hongluan-ui/theme/scss/base.scss` 文件在入口文件中引入

```js
module.exports = {
  plugins: [
    [
      "import",
      {
        libraryName: 'hongluan-ui',
        customStyleName: (name) => {
          name = name.slice(3)
          return `hongluan-ui/theme/scss/${name}.scss`;
        },
      },
    ],
  ],
};
```

#### 或者引入 `.css` 样式

```js
module.exports = {
  plugins: [
    [
      "import",
      {
        libraryName: 'hongluan-ui',
        customStyleName: (name) => {
          return `hongluan-ui/theme/${name}.css`;
        },
      },
    ],
  ],
};
```

### 按需加载样式：Vue CLI（TS）

借助 [ts-import-plugin](https://github.com/Brooooooklyn/ts-import-plugin)，我们可以只引入需要的组件，以达到减小项目体积的目的。

具体安装过程以及使用请参考官方文档，这里不在赘述，下面是vue.config.js代码配置示例:

```js
chainWebpack: config => {
  config.module
    .rule('ts')
    .use('ts-loader')
      .loader('ts-loader')
      .tap(options => {
        return {
          ...options,
          getCustomTransformers: () => {
            return {
              before: [tsImportPluginFactory({
                libraryName: 'hongluan-ui',
                style: true
              })]
            }
          },
        }
      })
}
```

### Vite

首先，安装 [vite-plugin-style-import](https://github.com/anncwb/vite-plugin-style-import):

```shell
$ npm install vite-plugin-style-import -D
#或者
$ yarn add vite-plugin-style-import -D
```

然后，将 vite.config.js 修改为：

#### 引入 `.scss` 样式

请确保已经安装了 `sass` 依赖并将 `hongluan-ui/theme/scss/base.scss` 文件在入口文件中引入

```js
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import styleImport from 'vite-plugin-style-import'

export default defineConfig({
  plugins: [
    vue(),
    styleImport({
      libs: [{
        libraryName: 'hongluan-ui',
        esModule: true,
        ensureStyleFile: true,
        resolveStyle: (name) => {
          name = name.slice(3)
          return `hongluan-ui/theme/scss/${name}.scss`;
        },
        resolveComponent: (name) => {
          return `hongluan-ui/lib/${name}`;
        },
      }]
    })
  ]
})
```

#### 或者引入 `.css` 样式

请确保 `hongluan-ui/theme/base.css` 文件在入口文件中引入

```js
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import styleImport from 'vite-plugin-style-import'

export default defineConfig({
  plugins: [
    vue(),
    styleImport({
      libs: [
        {
          libraryName: 'hongluan-ui',
          esModule: true,
          ensureStyleFile: true,
          resolveStyle: (name) => {
            return `hongluan-ui/theme/${name}.css`;
          },
          resolveComponent: (name) => {
            return `hongluan-ui/lib/${name}`;
          },
        }
      ]
    })
  ]
})
```

接下来，如果你只希望引入部分组件，比如 Button 和 Select，那么需要在 main.js 中写入以下内容：

```javascript
import { createApp } from 'vue'
import { HlButton, HlSelect } from 'hongluan-ui';
import App from './App.vue';
// 如果要使用.scss样式文件，则需要引入base.scss文件
// import 'hongluan-ui/theme/scss/base.scss'

// 如果要使用.css样式文件，则需要引入base.css文件
// import 'hongluan-ui/theme/base.css'

const app = createApp(App)
app.component(HlButton.name, HlButton); // 注意：此种引入方式下，name不带有前缀hl
app.component(HlSelect.name, HlSelect); // 注意：此种引入方式下，name不带有前缀hl

/* or
 * app.use(HlButton) // 注意：此种引入方式下，将带有前缀hl
 * app.use(HlSelect)
 */

app.mount('#app')
```

## 全局配置

在引入 Hongluan UI 时，可以传入一个全局配置对象。该对象目前支持 `size`、`zIndex` 与 `systemIcons` 字段。`size(xs/sm/md/lg)` 用于改变组件的默认尺寸，`zIndex` 设置弹框的初始 z-index（默认值：2000），`systemIcons` 用于定制系统默认图标，具体方式请参考Icon文档。按需引入 Hongluan UI 的方式，具体操作如下：

#### 完整引入 Hongluan UI：

```js
import { createApp, h } from 'vue'
import HongluanUI from 'hongluan-ui';
import App from './App.vue';

const app = createApp(App)
app.use(HongluanUI, {
  size: 'sm',
  zIndex: 3000,
  systemIcons: {
    SystemLoading: h('span', { innerHTML: 'x' })
  }
});
```

#### 按需引入 Hongluan UI：

```ts
<template>
  <hl-config-provider :size="size" :zIndex="zIndex">
    <app />
  </hl-config-provider>
</template>
<script>
import { defineComponent } from 'vue'
import { HlConfigProvider } from 'hongluan-ui'

export default defineComponent({
  components: {
    HlConfigProvider,
  },
  setup() {
    return {
      zIndex: 3000,
      size: 'sm',
    }
  },
})
</script>

```

按照以上设置，项目中所有拥有 `size` 属性的组件的默认尺寸均为 'sm'，弹框的初始 z-index 为 3000。

## Volar support

如实使用Volar， 请把 `compilerOptions.types` 添加到 `tsconfig.json`。

```json
// tsconfig.json
{
  "compilerOptions": {
    // ...
    "types": ["hongluan-ui/global"]
  }
}
```

## 开始使用

至此，一个基于 Vue3 和 Hongluan UI 的开发环境已经搭建完毕，现在就可以编写代码了。

各个组件的使用方法请参阅它们各自的说明文档。
