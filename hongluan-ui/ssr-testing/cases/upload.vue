<template>
  <hl-upload
    class="upload-demo"
    action="https://jsonplaceholder.typicode.com/posts/"
    :on-preview="handlePreview"
    :on-remove="handleRemove"
    multiple
    :limit="3"
    :file-list="fileList"
  >
    <hl-button type="primary">Click to upload</hl-button>
    <template #tip>
      <div class="hl-upload__tip">
        jpg/png files with a size less than 500kb
      </div>
    </template>
  </hl-upload>
</template>
<script lang="ts" setup>
import { ref } from 'vue'

import type { UploadUserFile, UploadFile } from 'hongluan-ui'

const fileList = ref<UploadUserFile[]>([
  {
    name: 'food.jpeg',
    url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100',
  },
  {
    name: 'food2.jpeg',
    url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100',
  },
])

const handleRemove = (file: UploadFile, fileList: UploadFile[]) => {
  console.log(file, fileList)
}
const handlePreview = (file: UploadFile) => {
  console.log(file)
}
</script>
