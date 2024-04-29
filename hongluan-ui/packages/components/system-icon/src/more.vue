<template>
  <component :is="CustomIcon" v-if="CustomIcon" />
  <svg v-else name="SystemMore" viewBox="0 0 16 16" version="1.1" xmlns="http://www.w3.org/2000/svg">
    <g stroke="none" stroke-width="1" fill="currentColor" fill-rule="evenodd">
      <path d="M4,7 C4.55228475,7 5,7.44771525 5,8 C5,8.55228475 4.55228475,9 4,9 C3.44771525,9 3,8.55228475 3,8 C3,7.44771525 3.44771525,7 4,7 Z M8,7 C8.55228475,7 9,7.44771525 9,8 C9,8.55228475 8.55228475,9 8,9 C7.44771525,9 7,8.55228475 7,8 C7,7.44771525 7.44771525,7 8,7 Z M12,7 C12.5522847,7 13,7.44771525 13,8 C13,8.55228475 12.5522847,9 12,9 C11.4477153,9 11,8.55228475 11,8 C11,7.44771525 11.4477153,7 12,7 Z" />
    </g>
  </svg>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import { useCustomIcon } from './use-custom'

export default defineComponent({
  name: 'SystemMore',
  props: {
    gradient: {
      type: Boolean,
    },
    borderWidth: {
      type: [Number, String],
      default: '',
    },
    opacity: {
      type: [Number, String],
      default: '',
    },
    startColor: {
      type: String,
      default: '',
    },
  },
  setup() {
    const { CustomIcon } = useCustomIcon('SystemMore')
    return {
      CustomIcon,
    }
  },
})
</script>
