<template>
  <hl-switch v-model="value2" type="success" class="m-r-md">
    <template #icon>
      <i>¥</i>
    </template>
  </hl-switch>

  <hl-switch v-model="value3" type="danger" class="m-r-md">
    <template #icon>
      <hl-icon><two-mail /></hl-icon>
    </template>
  </hl-switch>
  <hl-switch v-model="value4" loading class="m-r-md" />
  <hl-switch v-model="value4" loading class="m-r-md">
    <template #icon>
      <hl-icon><two-mail /></hl-icon>
    </template>
  </hl-switch>
  <hl-switch v-model="value4" type="primary" class="m-r-md">
    <template #icon="{ checked }">
      <hl-icon>
        <two-power v-if="checked" />
        <two-airplay v-else />
      </hl-icon>
    </template>
  </hl-switch>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { TwoMail, TwoPower, TwoAirplay } from '@hongluan-ui/icons'

const value1 = ref(true)
const value2 = ref(true)
const value3 = ref(true)
const value4 = ref(false)

</script>
