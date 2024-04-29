# 自定义主题

鸿鸾提供了几种自定义主题的方式：
- 在线Theme Editor生成主题（目前仅支持配置:root下CSS Variables）
- 直接覆盖CSS Variables
- 自定义SCSS Config文件

## 1. 使用在线Theme Editor

打开[Theme Editor](https://cestc-aqyj.github.io/hongluan-theme-editor)，配置完成以后选择下载主题文件，然后在入口文件处引入即可。

```ts
import Vue from 'vue'
import HongluanUI from 'hongluan-ui'
import 'hongluan-ui/dist/index.scss'
import 'theme.css' //下载下来的主题文件
```

## 2. 直接覆盖CSS Variables
您可以根据需求直接覆盖定义在:root下以及组件类名下的变量来实现自定义主题。


## 3. 自定义SCSS Config文件

Hongluan UI 的样式使用 [SCSS](https://sass-lang.com/) 编写，如果你的项目也使用了 SCSS，那么可以直接在项目中编译Hongluan UI的样式。

新建一个样式文件，例如 `style.scss`，引入以下内容：

```scss
@use "sass:math";
@use "sass:map";
// 拷贝 <path/node_modules>/hongluan-ui/theme/scss/common/config.scss 到你的工程目录并引入，
// 你也可以起个有辨识度名称，例如:
@import './project-theme.scss';

// 引入Hongluan UI的组件样式引导文件
@import '<path/node_modules>/hongluan-ui/theme/scss/index.scss';
// 或者直接引入components.scss即可
// @import '<path/node_modules>/hongluan-ui/theme/scss/components.scss';

```

然后在项目的入口文件中引入`style.scss`样式文件即可（无需再引入 Hongluan UI 编译好的 CSS 文件）：

```JS
import Vue from 'vue'
import HongluanUI from 'hongluan-ui'
import './style.scss'
import App from './App.vue';

const app = createApp(App)
app.use(HongluanUI)
```

