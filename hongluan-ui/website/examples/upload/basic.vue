<template>
  <hl-upload
    style="width: 400px"
    action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
    :on-preview="handlePreview"
    :on-remove="handleRemove"
    :before-remove="beforeRemove"
    multiple
    :limit="5"
    :on-exceed="handleExceed"
    :file-list="fileList"
  >
    <hl-button type="primary" icon-position="left">
      点击上传
      <template #icon>
        <hl-icon><two-upload /></hl-icon>
      </template>
    </hl-button>
    <template #tip>
      <div class="text-danger m-t-sm">只能上传 jpg/png 文件，且不超过 500kb</div>
    </template>
  </hl-upload>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { TwoUpload } from '@hongluan-ui/icons'

const fileList = ref([
  {
    name: 'food.jpeg',
    url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100',
  },
  {
    name: 'food2.jpeg',
    url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100',
  },
])
const handleRemove = (file, fileList) => {
  console.log(file, fileList)
}
const handlePreview = file => {
  console.log(file)
}
const handleExceed = (files, fileList) => {
  alert(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`)
}
const beforeRemove = file => {
  // alert(`确定移除 ${file.name}？`)
  return confirm(`确定移除 ${file.name}？`)
}

</script>
