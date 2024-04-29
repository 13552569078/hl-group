<template>
  <hl-form ref="ruleFormRef" :model="ruleForm" :rules="rules" :width="['md:col-4','col']">
    <hl-form-item label="密码" prop="pass">
      <hl-input v-model="ruleForm.pass" native-type="password" autocomplete="off" />
    </hl-form-item>
    <hl-form-item label="确认密码" prop="checkPass">
      <hl-input v-model="ruleForm.checkPass" native-type="password" autocomplete="off" />
    </hl-form-item>
    <hl-form-item label="年龄" prop="age">
      <hl-input v-model.number="ruleForm.age" />
    </hl-form-item>
    <hl-form-item label=" ">
      <hl-button type="primary" class="m-r-sm" @click="submitForm('ruleForm')">提交</hl-button>
      <hl-button @click="resetForm('ruleForm')">重置</hl-button>
    </hl-form-item>
  </hl-form>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const ruleForm = ref({
  pass: '',
  checkPass: '',
  age: '',
})
const ruleFormRef = ref(null)

const checkAge = (rule, value, callback) => {
  if (!value) {
    return callback(new Error('年龄不能为空'))
  }
  setTimeout(() => {
    if (!Number.isInteger(value)) {
      callback(new Error('请输入数字值'))
    } else {
      if (value < 18) {
        callback(new Error('必须年满18岁'))
      } else {
        callback()
      }
    }
  }, 1000)
}
const validatePass = (rule, value, callback) => {
  if (value === '') {
    callback(new Error('请输入密码'))
  } else {
    if (ruleForm.value.checkPass !== '') {
      ruleFormRef.value.validateField('checkPass')
    }
    callback()
  }
}
const validatePass2 = (rule, value, callback) => {
  if (value === '') {
    callback(new Error('请再次输入密码'))
  } else if (value !== ruleForm.value.pass) {
    callback(new Error('两次输入密码不一致!'))
  } else {
    callback()
  }
}

const rules = ref({
  pass: [{ validator: validatePass, trigger: 'blur' }],
  checkPass: [{ validator: validatePass2, trigger: 'blur' }],
  age: [{ validator: checkAge, trigger: 'blur' }],
})

const submitForm = () => {
  ruleFormRef.value.validate(valid => {
    if (valid) {
      alert('submit!')
    } else {
      console.log('error submit!!')
      return false
    }
  })
}
const resetForm = () => {
  ruleFormRef.value.resetFields()
}

</script>
