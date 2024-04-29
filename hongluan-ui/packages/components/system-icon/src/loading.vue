<template>
  <component :is="CustomIcon" v-if="CustomIcon" />
  <svg v-else class="tail" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50" name="SystemLoading">
    <circle cx="25" cy="25" r="20" />
  </svg>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import { useCustomIcon } from './use-custom'

export default defineComponent({
  name: 'SystemLoading',
  setup() {
    const { CustomIcon } = useCustomIcon('SystemLoading')
    return {
      CustomIcon,
    }
  },
})
</script>
