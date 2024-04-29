<template>
  <icon-404 />
</template>
<script lang="ts">
/// <reference types="vite-svg-loader" />

import { defineComponent } from 'vue'
import Icon404 from '../../assets/images/404.svg?component'

export default defineComponent({
  components: {
    Icon404,
  },
  setup() {
    return {
    }
  },
})
</script>
