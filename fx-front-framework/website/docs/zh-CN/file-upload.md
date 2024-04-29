# FileUpload 上传（图片、文件、导入）


## 上传图片

:::demo-fs

file-upload/image

:::

## 上传文件

:::demo-fs

file-upload/file

:::

## 导入（基于模版导入）

:::demo-fs

file-upload/import

:::

## 图片回显（多用于详情）

:::demo-fs

file-upload/image-show

:::



## Attributes
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| v-model:ids | 双向绑定，文件上传后的数组字符串,表单绑定	 | string  | -  | -  |
| token | RequestHeader | string  | -  | -  |
| file-service | 上传文件地址	 | string  | -  | -  |
| list-type | 文件列表的类型 | string  | text/picture/card  | text  |
| accept | 接受上传的文件类型 | string  | -  | -  |
| limit | 最大允许上传个数 | number  | -  | -  |
| show-file-list | 是否显示文件列表 | boolean  | true/false  | true  |
| multiple | 是否支持多选文件	 | boolean  | -  | -  |
| getFileList | 用于回显的回调方法	 | function({ids, setFileList(list)})  | -  | -  |
| disabled | 是否禁用	 | boolean  | true/false  | false  |
| text-button | 上传按钮文案 | string  | -  | 点击上传  |
| file-size-limit | 文件大小尺寸,单位M | object  | -  | {video: 100, image: 5}  |

## Events
| 事件名称 | 说明 | 回调参数 |
|---------- |-------- |---------- |
| handle-success | 上传成功的回调 | 一般上传（fileList）；导入上传（resonse） |
