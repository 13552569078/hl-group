<template>
  <hl-button class="m-r-md" @click="add">添加元素</hl-button>
  <hl-button @click="del">删除元素</hl-button>
  <hl-scrollbar class="m-t-lg" max-height="calc(var(--lg) * 10)">
    <span v-for="item in count" :key="item" class="display-block p-md m-b-xs bg-primary text-center text-inverse">{{ item }}</span>
  </hl-scrollbar>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const count = ref(3)

const add = () => {
  count.value++
}
const del = () => {
  if (count.value > 0) {
    count.value--
  }
}

</script>
