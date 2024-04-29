<template>
  <div>
    <p class="m-b-md">
      <hl-switch v-model="value" style="" />
    </p>
    <hl-pagination
      :hide-on-single-page="value"
      :total="5"
      layout="prev, pager, next"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value = ref(false)

</script>
