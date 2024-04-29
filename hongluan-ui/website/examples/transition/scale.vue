<template>
  <hl-button @click="show = !show">Click Me</hl-button>
  <div class="display-flex h-sm m-t-lg">
    <transition name="scale">
      <div v-show="show" class="transition-demo">scale</div>
    </transition>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const show = ref(true)

</script>
