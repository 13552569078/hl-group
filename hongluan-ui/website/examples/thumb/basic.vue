<template>
  <hl-group full="full-x">
    <div v-for="fit in fits" :key="fit">
      <p>{{ fit }}</p>
      <hl-thumb
        style="width: 100px; height: 100px"
        :src="url"
        :fit="fit"
      />
    </div>
  </hl-group>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const fits = ref(['fill', 'contain', 'cover', 'none', 'scale-down'])
const url = ref('https://pimg.39.net/yaopin/zycimg/11hxcu4pth3wu2019.jpg')

</script>
