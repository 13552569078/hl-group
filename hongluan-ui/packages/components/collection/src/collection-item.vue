<template>
  <slot></slot>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'CollectionItem',
  inheritAttrs: false,
})
</script>
