<template>
  <hl-upload
    action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
    list-type="card"
    :file-list="fileList"
    :on-preview="handlePictureCardPreview"
    :on-remove="handleRemove"
  >
    <hl-icon><two-upload /></hl-icon>
  </hl-upload>
  <hl-dialog v-model="dialogVisible" title="查看图片" width="600px">
    <hl-thumb :src="dialogImageUrl" class="full" />
  </hl-dialog>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { TwoUpload } from '@hongluan-ui/icons'

const dialogImageUrl = ref('')
const dialogVisible = ref(false)

const handleRemove = (file, fileList) => {
  console.log(file, fileList)
}
const handlePictureCardPreview = file => {
  dialogImageUrl.value = file.url
  dialogVisible.value = true
}

const fileList = ref<UploadUserFile[]>([
  {
    name: 'food.jpeg',
    url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100',
  },
  {
    name: 'food.jpeg',
    url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100',
  },
  {
    name: 'food.jpeg',
    url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100',
  },
  {
    name: 'food.jpeg',
    url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100',
  },
])

</script>
