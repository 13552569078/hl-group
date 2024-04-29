<template>
  <hl-button @click="show = !show">Click Me</hl-button>
  <div class="display-flex h-sm m-t-lg">
    <transition name="slideDown">
      <div v-show="show" class="transition-demo">slideDown</div>
    </transition>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const show = ref(true)

</script>
