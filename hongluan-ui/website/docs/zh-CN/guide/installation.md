# 安装
通过你所喜欢的软件包管理器，例如 npm、yarn 等，将 HongluanUI 添加到你的项目中，或者引入编译后的文件。


## 通过 npm 或者 yarn 安装

我们推荐使用包管理器的方式安装，它能更好地和 [Vite](https://vitejs.dev) 、 [Webpack](https://webpack.js.org/)
打包工具配合使用。

```bash
$ npm install hongluan-ui --save
# 或者
$ yarn add hongluan-ui
```

如果你的网络环境不佳，推荐使用 [cnpm](https://github.com/cnpm/cnpm) 或使用 [阿里巴巴镜像](https://registry.npmmirror.com/)

## 下载编译后的文件

下载编译后的 HongluanUI css 和 js文件，以便直接用于你的项目。

* 编译并压缩过的 [CSS集成包](//unpkg.com/hongluan-ui/dist/index.css)
* 编译并压缩过的 [JavaScript集成包](//unpkg.com/hongluan-ui)



## 通过 CDN 的方式全量引入
使用 CDN 的话可以跳过下载文件的操作，直接在你的项目中使用 HongluanUI 编译过的 CSS 和 JS 文件。

### 使用 unpkg

```html
<head>
  <!-- 引入样式 -->
  <link rel="stylesheet" href="//unpkg.com/hongluan-ui/dist/index.css">
  <!-- 引入 Vue -->
  <script src="//unpkg.com/vue@next"></script>
  <!-- 引入组件库 -->
  <script src="//unpkg.com/hongluan-ui"></script>
</head>
```

### 使用 jsDelivr

```html
<head>
  <!-- 引入样式 -->
  <link rel="stylesheet" href="//cdn.jsdelivr.net/npm/hongluan-ui/dist/index.css">
  <!-- 引入 Vue -->
  <script src="//cdn.jsdelivr.net/npm/vue@next"></script>
  <!-- 引入组件库 -->
  <script src="//cdn.jsdelivr.net/npm/hongluan-ui"></script>
</head>
```

:::warning
我们建议使用 CDN 引入 Hongluan UI 的用户在链接地址上锁定版本，以免将来 Hongluan UI 升级时受到非兼容性更新的影响。锁定版本的方法请查看 [unpkg.com](https://unpkg.com)。
:::

## Hello world

通过 CDN 的方式我们可以很容易地使用 Hongluan UI 写出一个 Hello world 页面。[在线演示](https://codepen.io/bitjjj/pen/RwVoYXN)

<iframe height="300" style="width: 100%;" scrolling="no" title="Hongluan UI Demo" src="https://codepen.io/bitjjj/embed/RwVoYXN?default-tab=html%2Cresult" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href="https://codepen.io/bitjjj/pen/RwVoYXN">
  Hongluan UI Demo</a> by bitjjj (<a href="https://codepen.io/bitjjj">@bitjjj</a>)
  on <a href="https://codepen.io">CodePen</a>.
</iframe>

如果是通过 npm 安装，并希望配合 webpack 或者 vitejs 使用，请阅读下一节：[快速上手](#/zh-CN/component/quickstart)。
