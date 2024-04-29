<template>
  <hl-group gap="var(--md)">
    <hl-checkbox v-model="checked1" fill>Default</hl-checkbox>
    <hl-checkbox v-model="checked2" type="primary" fill>Primary</hl-checkbox>
    <hl-checkbox v-model="checked3" type="success" fill>Success</hl-checkbox>
    <hl-checkbox v-model="checked4" type="warning" fill>Warning</hl-checkbox>
    <hl-checkbox v-model="checked5" type="danger" fill>Danger</hl-checkbox>
    <hl-checkbox v-model="checked6" type="info" fill>Info</hl-checkbox>
  </hl-group>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const checked1 = ref(false)
const checked2 = ref(false)
const checked3 = ref(false)
const checked4 = ref(false)
const checked5 = ref(false)
const checked6 = ref(false)

</script>
