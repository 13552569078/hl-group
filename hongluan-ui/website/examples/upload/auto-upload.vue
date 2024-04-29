<template>
  <hl-upload
    ref="upload"
    action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
    :on-preview="handlePreview"
    :on-remove="handleRemove"
    :file-list="fileList"
    :auto-upload="false"
  >
    <template #trigger>
      <hl-button type="primary">选取文件</hl-button>
    </template>
    <hl-button type="primary" class="m-l-md" effect="light" @click="submitUpload">
      上传到服务器
      <template #icon>
        <hl-icon><two-server /></hl-icon>
      </template>
    </hl-button>
    <template #tip>
      <div class="text-danger m-t-sm">只能上传 jpg/png 文件，且不超过 500kb</div>
    </template>
  </hl-upload>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { TwoServer } from '@hongluan-ui/icons'

const upload = ref(null)
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

const submitUpload = () => {
  upload.value.submit()
}
const handleRemove = (file, fileList) => {
  console.log(file, fileList)
}
const handlePreview = file => {
  console.log(file)
}

</script>
