<template>
  <div>
    <hl-button @click="show2 = !show2">Click Me</hl-button>

    <div class="display-flex h-sm m-t-lg">
      <transition name="slideTop">
        <div v-show="show2" class="transition-demo">.slideTop</div>
      </transition>

      <transition name="slideDown">
        <div v-show="show2" class="transition-demo">.slideDown</div>
      </transition>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const show2 = ref(true)

</script>
