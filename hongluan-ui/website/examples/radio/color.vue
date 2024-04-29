<template>
  <hl-group gap="var(--md)">
    <hl-radio v-model="radio" label="1">默认</hl-radio>
    <hl-radio v-model="radio" label="2" type="primary">Primary</hl-radio>
    <hl-radio v-model="radio" label="3" type="success">Success</hl-radio>
    <hl-radio v-model="radio" label="4" type="warning">Warning</hl-radio>
    <hl-radio v-model="radio" label="5" type="danger">Danger</hl-radio>
    <hl-radio v-model="radio" label="6" type="info">Info</hl-radio>
  </hl-group>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const radio = ref('1')

</script>
