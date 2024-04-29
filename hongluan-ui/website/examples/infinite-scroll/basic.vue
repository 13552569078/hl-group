<template>
  <ul v-infinite-scroll="load" class="infinite-list" style="overflow:auto; height: 300px; padding:0; margin:0; list-style:none">
    <li v-for="i in count" :key="i" class="p-md bg-primary text-inverse radius-xs m-b-sm">{{ i }}</li>
  </ul>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const count = ref(0)
const load = () => {
  count.value += 2
}
</script>
