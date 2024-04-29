<template>
  <hl-form :label-position="[labelPosition, labelPosition2]" :width="['md:col-6','md:col-14']" :model="formLabelAlign">
    <hl-form-item label="Label对齐：">
      <hl-group gap="var(--sm)">
        <hl-select v-model="labelPosition" placeholder="水平对齐">
          <hl-option label="items-left" value="items-left" />
          <hl-option label="items-center" value="items-center" />
          <hl-option label="items-right" value="items-right" />
        </hl-select>
        <hl-select v-model="labelPosition2" placeholder="水平对齐">
          <hl-option label="items-top" value="items-top" />
          <hl-option label="items-middle" value="items-middle" />
          <hl-option label="items-bottom" value="items-bottom" />
        </hl-select>
      </hl-group>
    </hl-form-item>
    <hl-form-item label="活动区域：">
      <hl-input v-model="formLabelAlign.region" block />
    </hl-form-item>
    <hl-form-item label="活动形式：">
      <hl-input v-model="formLabelAlign.type" block />
    </hl-form-item>
    <hl-form-item label="活动形式：">
      <hl-input v-model="formLabelAlign.type" native-type="textarea" :rows="3" block />
    </hl-form-item>
  </hl-form>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const labelPosition = ref('items-left')
const labelPosition2 = ref('items-middle')
const formLabelAlign = ref({
  name: '',
  region: '',
  type: '',
})
</script>
