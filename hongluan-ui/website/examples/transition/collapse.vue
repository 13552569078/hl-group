<template>
  <div>
    <hl-button @click="show3 = !show3">Click Me</hl-button>

    <div class="display-flex h-sm m-t-lg">
      <hl-collapse-transition>
        <div v-show="show3">
          <div class="transition-demo">hl-collapse-transition</div>
          <div class="transition-demo">hl-collapse-transition</div>
        </div>
      </hl-collapse-transition>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const show3 = ref(true)

</script>
