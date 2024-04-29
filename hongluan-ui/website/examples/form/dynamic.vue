<template>
  <hl-form ref="dynamicValidateFormRef" :model="dynamicValidateForm" :width="['md:col-4','col']">
    <hl-form-item
      prop="email"
      label="邮箱"
      :rules="[
        { required: true, message: '请输入邮箱地址', trigger: 'blur' },
        { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
      ]"
    >
      <hl-input v-model="dynamicValidateForm.email" />
    </hl-form-item>
    <hl-form-item
      v-for="(domain, index) in dynamicValidateForm.domains"
      :key="domain.key"
      :label="'域名' + index"
      :prop="'domains.' + index + '.value'"
      :rules="{
        required: true, message: '域名不能为空', trigger: 'blur'
      }"
    >
      <hl-input v-model="domain.value" />
      <hl-button type="primary" effect="light" class="m-l-sm" equal @click.prevent="removeDomain(domain)">
        <template #icon>
          <hl-icon><two-delete /></hl-icon>
        </template>
      </hl-button>
    </hl-form-item>
    <hl-form-item label=" ">
      <hl-button type="primary" class="m-r-sm" @click="submitForm('dynamicValidateForm')">提交</hl-button>
      <hl-button class="m-r-sm" @click="addDomain">新增域名</hl-button>
    </hl-form-item>
  </hl-form>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { TwoDelete } from '@hongluan-ui/icons'

const dynamicValidateForm = ref({
  domains: [
    {
      value: '',
      key: -1,
    },
  ],
  email: '',
})
const dynamicValidateFormRef = ref(null)

const submitForm = () => {
  dynamicValidateFormRef.value.validate(valid => {
    if (valid) {
      alert('submit!')
    } else {
      console.log('error submit!!')
      return false
    }
  })
}
const resetForm = () => {
  dynamicValidateFormRef.value.resetFields()
}
const removeDomain = item => {
  var index = dynamicValidateForm.value.domains.indexOf(item)
  if (index !== -1) {
    dynamicValidateForm.value.domains.splice(index, 1)
  }
}
const addDomain = () => {
  dynamicValidateForm.value.domains.push({
    value: '',
    key: Date.now(),
  })
}

</script>
