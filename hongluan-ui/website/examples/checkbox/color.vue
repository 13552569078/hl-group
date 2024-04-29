<template>
  <hl-group gap="var(--md)">
    <hl-checkbox v-model="checked1">Default</hl-checkbox>
    <hl-checkbox v-model="checked2" type="primary">Primary</hl-checkbox>
    <hl-checkbox v-model="checked3" type="success">Success</hl-checkbox>
    <hl-checkbox v-model="checked4" type="warning">Warning</hl-checkbox>
    <hl-checkbox v-model="checked5" type="danger">Danger</hl-checkbox>
    <hl-checkbox v-model="checked6" type="info">Info</hl-checkbox>
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
