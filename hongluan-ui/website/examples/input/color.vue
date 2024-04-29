<template>
  <hl-row gap="var(--lg)">
    <hl-col span="md:col-12">
      <hl-input v-model="input1" placeholder="默认" block />
    </hl-col>
    <hl-col span="md:col-12">
      <hl-input
        v-model="input2"
        placeholder="primary"
        type="primary"
        block
      />
    </hl-col>
    <hl-col span="md:col-12">
      <hl-input
        v-model="input3"
        placeholder="warning"
        type="warning"
        block
      />
    </hl-col>
    <hl-col span="md:col-12">
      <hl-input
        v-model="input4"
        placeholder="success"
        type="success"
        block
      />
    </hl-col>
    <hl-col span="md:col-12">
      <hl-input
        v-model="input5"
        placeholder="danger"
        type="danger"
        block
      />
    </hl-col>
    <hl-col span="md:col-12">
      <hl-input v-model="input6" placeholder="info" type="info" block />
    </hl-col>
  </hl-row>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const input1 = ref('默认')
const input2 = ref('primary')
const input3 = ref('warning')
const input4 = ref('success')
const input5 = ref('danger')
const input6 = ref('info')

</script>
