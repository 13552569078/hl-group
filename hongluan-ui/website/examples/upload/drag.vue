<template>
  <hl-upload drag action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15" multiple full>
    <hl-icon :border="1.2"><two-upload /></hl-icon>
    <div class="m-t-md">将文件拖到此处，或 <em class="text-primary">点击上传</em></div>
  </hl-upload>
</template>
<script lang="ts" setup>
import { TwoUpload } from '@hongluan-ui/icons'

</script>
