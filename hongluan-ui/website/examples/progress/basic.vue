<template>
  <hl-progress type="disabled" :percentage="40" :format="format" round class="m-b-xxl" />
  <hl-progress :percentage="40" :format="format" round class="m-b-xxl" />
  <hl-progress :percentage="40" :format="format" stroke-width="3px" :show-text="false" track-color="#fff" />
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const format = percentage => {
  return `${percentage}%  Complete`
}

</script>
