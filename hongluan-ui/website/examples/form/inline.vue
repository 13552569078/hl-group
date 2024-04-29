<template>
  <hl-form inline :model="formInline" gap="var(--md)" item-gap="var(--md)">
    <hl-form-item label="审批人" required>
      <hl-input v-model="formInline.user" placeholder="审批人" />
    </hl-form-item>
    <hl-form-item label="活动区域">
      <hl-select v-model="formInline.region" placeholder="活动区域">
        <hl-option label="区域一" value="shanghai" />
        <hl-option label="区域二" value="beijing" />
      </hl-select>
    </hl-form-item>
    <hl-form-item>
      <hl-button type="primary" @click="onSubmit">查询</hl-button>
    </hl-form-item>
  </hl-form>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const formInline = ref({
  user: '',
  region: '',
})
const onSubmit = () => {
  console.log('submit!')
}

</script>
