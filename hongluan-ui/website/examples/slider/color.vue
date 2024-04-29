<template>
  <hl-row>
    <hl-col span="col">
      <hl-slider v-model="value" type="primary" />
    </hl-col>
    <hl-col span="col">
      <hl-slider v-model="value" type="danger" />
    </hl-col>
    <hl-col span="col">
      <hl-slider v-model="value" type="warning" />
    </hl-col>
    <hl-col span="col">
      <hl-slider v-model="value" type="success" />
    </hl-col>
    <hl-col span="col">
      <hl-slider v-model="value" type="info" />
    </hl-col>
  </hl-row>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const value = ref(50)

</script>
