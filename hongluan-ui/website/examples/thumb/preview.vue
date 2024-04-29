<template>
  <div class="demo-thumb__preview">
    <hl-thumb
      style="width: 100px; height: 100px"
      :src="url"
      fit="cover"
      :preview-src-list="srcList"
    >
      <template #tools-after>
        <hl-icon>
          <two-edit />
        </hl-icon>
      </template>
      <template #tools-before>
        <hl-icon>
          <two-download />
        </hl-icon>
      </template>
    </hl-thumb>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { TwoEdit, TwoDownload } from '@hongluan-ui/icons'

const url = ref('https://pimg.39.net/yaopin/zycimg/11hxcu4pth3wu2019.jpg')
const srcList = ref([
  'https://pimg.39.net/yaopin/zycimg/11hxcu4pth3wu2019.jpg',
  'http://e.10000n.cn/wnw0531_1632398682283_54636.jpg?imageView2/1/w/300/h/300',
])
</script>
