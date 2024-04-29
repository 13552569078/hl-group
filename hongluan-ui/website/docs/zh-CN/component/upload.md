# Upload 上传

通过点击或者拖拽上传文件

:::demo-fs 通过 slot 你可以传入自定义的上传按钮类型和文字提示。可通过设置`limit`和`on-exceed`来限制上传文件的个数和定义超出限制时的行为。可通过设置`before-remove`来阻止文件移除操作。

upload/basic

:::

## 用户头像上传

使用 `before-upload` 限制用户上传的图片格式和大小。

:::demo-fs

upload/thumb

:::

## 照片墙

使用 `list-type` 属性来设置文件列表的样式。

:::demo-fs

upload/list-type

:::

## 文件缩略图

使用 `slot` 去设置缩略图模版。

:::demo-fs

upload/slot

:::

## 图片列表缩略图

:::demo-fs

upload/picture

:::

## 上传文件列表控制

通过 `on-change` 钩子函数来对列表进行控制

:::demo-fs

upload/change

:::

## 拖拽上传

:::demo-fs

upload/drag

:::

## 手动上传

:::demo-fs

upload/auto-upload

:::

## Attributes

| 参数             | 说明           | 类型           | 可选值            | 默认值 |
| ---------------- | ------------- | ----------------- | ----------------- | ------ |
| action           | 必选参数，上传的地址  | string                             | —                 | —      |
| method           | 设置上传的请求方法址  | string                             | post / put                | post     |
| headers          | 设置上传的请求头部    | object                             | —                 | —      |
| multiple         | 是否支持多选文件  | boolean                            | —                 | —      |
| data             | 上传时附带的额外参数  | object                             | —                 | —      |
| name             | 上传的文件字段名    | string                             | —                 | file   |
| with-credentials | 支持发送 cookie 凭证信息    | boolean                            | —                 | false  |
| show-file-list   | 是否显示已上传文件列表  | boolean                            | —                 | true   |
| drag             | 是否启用拖拽上传   | boolean                            | —                 | false  |
| accept           | 接受上传的[文件类型](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#attr-accept)（thumbnail-mode 模式下此参数无效） | string          | —                 | —      |
| on-preview       | 点击文件列表中已上传的文件时的钩子   | function(file)                     | —                 | —      |
| on-remove        | 文件列表移除文件时的钩子  | function(file, fileList)           | —                 | —      |
| on-success       | 文件上传成功时的钩子  | function(response, file, fileList) | —                 | —      |
| on-error         | 文件上传失败时的钩子    | function(err, file, fileList)      | —                 | —      |
| on-progress      | 文件上传时的钩子 | function(event, file, fileList)    | —                 | —      |
| on-change        | 文件状态改变时的钩子，添加文件、上传成功和上传失败时都会被调用  | function(file, fileList)   | —      | —      |
| before-upload    | 上传文件之前的钩子，参数为上传的文件，若返回 false 或者返回 Promise 且被 reject，则停止上传。    | function(file)   | —    | —      |
| before-remove    | 删除文件之前的钩子，参数为上传的文件和文件列表，若返回 false 或者返回 Promise 且被 reject，则停止删除。  | function(file, fileList)           | —    | —      |
| list-type        | 文件列表的类型    | string                             | text/picture/card | text   |
| auto-upload      | 是否在选取文件后立即进行上传    | boolean                            | —                 | true   |
| file-list / v-model:file-list        | 上传的文件列表, 例如: [{name: 'food.jpg', url: 'https://xxx.cdn.com/xxx.jpg'}]  | array      | —      | UploadUserFile[]     |
| http-request     | 覆盖默认的上传行为，可以自定义上传的实现  | function       | —         | —      |
| disabled         | 是否禁用   | boolean                            | —                 | false  |
| limit            | 最大允许上传个数 | number                             | —                 | —      |
| on-exceed        | 文件超出个数限制时的钩子 | function(files, fileList)          | —                 | -      |
| gap              | 上传列表的间隔  | string         | —                 | -      |

## Slots

| name    | 说明                 |
| ------- | -------------------- |
| trigger | 触发文件选择框的内容 |
| tip     | 提示说明文字         |
| file     | 文件列表自定义内容，参数为 { file }         |
| file-icon     | 文件列表自定义文件Icon，参数为 { file }。file和file-icon不能同时存在，file优先级更高         |
| file-preview     | 文件列表自定义文件预览，参数为 { file }。file和file-preview不能同时存在，file优先级更高         |

## Methods

| 方法名     | 说明                                                        | 参数                                |
| ---------- | ----------------------------------------------------------- | ----------------------------------- |
| clearFiles | 清空已上传的文件列表（该方法不支持在 before-upload 中调用） | —                                   |
| abort      | 取消上传请求                                                | （ file: fileList 中的 file 对象 ） |
| submit     | 手动上传文件列表                                            | —                                   |
| handleStart  | 手工选择文件 | ( file: files 中的 file 对象) | - |
| handleRemove | 手工删除文件 | ( file: fileList 中的 file 对象 )  | -  |
