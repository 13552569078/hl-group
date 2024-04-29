<template>
  <hl-upload action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15" :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
    <hl-thumb v-if="imageUrl" size="xxxl" round :src="imageUrl" fit="cover" />
    <hl-thumb v-else size="xxxl" class="bg-light" round>
      <hl-icon size="xl"><two-user /></hl-icon>
    </hl-thumb>
  </hl-upload>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { TwoUser } from '@hongluan-ui/icons'

const imageUrl = ref('')

const handleAvatarSuccess = (res, file) => {
  imageUrl.value = URL.createObjectURL(file.raw)
}
const beforeAvatarUpload = file => {
  const isJPG = file.type === 'image/jpeg'
  const isLt2M = file.size / 1024 / 1024 < 2

  if (!isJPG) {
    alert('上传头像图片只能是 JPG 格式!')
  }
  if (!isLt2M) {
    alert('上传头像图片大小不能超过 2MB!')
  }
  return isJPG && isLt2M
}

</script>
