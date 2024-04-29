<template>
  <hl-form ref="numberValidateFormRef" :model="numberValidateForm" inline style="--form-padding-y: 6px">
    <hl-form-item
      label="年龄"
      prop="age"
      s
      :rules="[
        { required: true, message: '年龄不能为空'},
        { type: 'number', message: '年龄必须为数字值'}
      ]"
    >
      <hl-input v-model.number="numberValidateForm.age" native-type="age" autocomplete="off" block />
    </hl-form-item>
    <hl-form-item>
      <hl-button type="primary" class="m-r-sm" @click="submitForm('numberValidateForm')">提交</hl-button>
      <hl-button @click="resetForm('numberValidateForm')">重置</hl-button>
    </hl-form-item>
  </hl-form>
</template>

<script lang="ts" setup>
import { HlMessage } from 'hongluan-ui'
import { ref } from 'vue'

const numberValidateForm = ref({
  age: '',
})
const numberValidateFormRef = ref(null)

const submitForm = () => {
  numberValidateFormRef.value.validate(valid => {
    if (valid) {
      HlMessage('submit')
    }
  })
}
const resetForm = () => {
  numberValidateFormRef.value.resetFields()
}

</script>
