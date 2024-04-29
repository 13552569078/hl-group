<template>
  <hl-upload ref="uploadRef" action="#" list-type="card" :auto-upload="false">
    <template #default>
      <hl-icon size="xl"><two-pic /></hl-icon>
    </template>
    <template #file="{file}">
      <div>
        <img class="item-thumb" :src="file.url" alt="">
        <span class="item-actions">
          <span class="item-preview" @click="picturePreview(file)">
            <hl-icon><two-zoom-in /></hl-icon>
          </span>
          <span v-if="!disabled" class="item-delete" @click="downloadFile(file)">
            <hl-icon><two-download /></hl-icon>
          </span>
          <span v-if="!disabled" class="item-delete" @click="removeFile(file)">
            <hl-icon><two-delete /></hl-icon>
          </span>
        </span>
      </div>
    </template>
  </hl-upload>
  <br><br>
  <hl-upload ref="uploadRef" action="#" list-type="card" :auto-upload="false">
    <template #default>
      <hl-icon size="xl"><two-pic /></hl-icon>
    </template>
    <template #file-preview="{ file }">
      <img v-if="file.name.endsWith('png')" class="item-thumb" :src="file.url">
      <video v-else-if="file.name.endsWith('mov')" class="item-thumb" :src="file.url"></video>
    </template>
  </hl-upload>
  <hl-dialog v-model="dialogVisible" modal-class="is-center">
    <div style="width:300px;height:300px;">
      <img width="100%" :src="dialogImageUrl">
    </div>
  </hl-dialog>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import type { UploadFile, UploadInstance } from 'hongluan-ui'
import { TwoPic, TwoZoomIn, TwoDownload, TwoDelete } from '@hongluan-ui/icons'

const uploadRef = ref<UploadInstance>()

const dialogImageUrl = ref('')
const dialogVisible = ref(false)
const disabled = ref(false)

const removeFile = (file: UploadFile) => {
  uploadRef.value?.handleRemove(file)
}

const picturePreview = (file: { url: string; }) => {
  dialogImageUrl.value = file.url
  dialogVisible.value = true
}
const downloadFile = (file: any) => {
  console.log(file.url)
}

</script>
