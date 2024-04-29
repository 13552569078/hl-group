<template>
  <div>
    <inline-svg :src="Icon404" />
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import Icon404 from '../../assets/images/404.svg?url'

export default defineComponent({
  components: {
  },
  setup() {
    return {
      Icon404,
    }
  },
})
</script>
