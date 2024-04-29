<template>
  <hl-row align="items-center items-middle" class="p-xl vh-full">
    <hl-col span="sm:col-16 sign-main">
      <hl-row align="items-center">
        <hl-col span="col-24" class="display-flex items-center m-b-xxl">
          <hl-group align="items-middle" gap="var(--xs)" @click="$router.go(-1)">
            <img src="../../assets/images/logo.svg" alt="hongluan.ui" />
            <h4>HONGLUAN · PRO</h4>
          </hl-group>
        </hl-col>
        <hl-col span="col-24" class="display-flex items-center">
          <hl-panel class="sign-panel" padding="calc(var(--xs) * 6)" borderless>
            <hl-group class="m-t-md m-b-xxl" dir="vertical" align="items-center" full="full-x" gap="var(--xs)">
              <h4>设置新密码</h4>
              <span class="text-secondary">已经重置密码？<a href="#/sign-in">在这里登录</a></span>
            </hl-group>

            <hl-form ref="ruleFormRef" hide-required-asterisk :model="ruleForm" :rules="rules" :label-position="['left', 'left']" gap="var(--md)">
              <hl-form-item label="密码" prop="password">
                <hl-input v-model="ruleForm.password" size="lg" block fill show-password />
                <div class="font-sm text-secondary m-t-sm">使用 8 个或更多的字母、数字和符号混合的字符</div>
              </hl-form-item>
              <hl-form-item label="确认密码" prop="repeatPassword">
                <hl-input v-model="ruleForm.repeatPassword" size="lg" block fill show-password />
              </hl-form-item>
              <hl-form-item>
                <hl-group gap="var(--md)" align="items-center" full="full-x" class="m-t-md">
                  <hl-button type="primary" effect="light" class="w-xs static" size="lg" @click="$router.go(-1)">取消</hl-button>
                  <hl-button type="primary" class="w-xs static" size="lg" @click="submitForm('ruleForm')">提交</hl-button>
                </hl-group>
              </hl-form-item>
            </hl-form>
          </hl-panel>
        </hl-col>
      </hl-row>
    </hl-col>
  </hl-row>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    const ruleForm = ref({
      password: '',
      repeatPassword: '',
    })
    const rules = ref({
      password: [
        { required: true, message: '请输入密码', trigger: 'change' },
        { pattern: /^(?=.*\d)(?=.*[a-zA-Z])(?=.*[~!@#$%^&*])[\da-zA-Z~!@#$%^&*]{8,}$/, message: '格式不符合要求' },
      ],
      repeatPassword: [
        { required: true, message: '请输入确认密码', trigger: 'change' },
        { validator: (_, value: string, callback: (error?: Error) => void) => {
          if (value) {
            if (value !== ruleForm.value.password) {
              return callback(new Error('密码和确认密码不一致'))
            } else {
              callback()
            }
          }
        }, trigger: 'blur' },
      ],
    })
    const ruleFormRef = ref()

    const submitForm = () => {
      ruleFormRef.value.validate((valid: boolean) => {
        if (valid) {
          alert('submit!')
        }
      })
    }

    return {
      ruleFormRef,
      ruleForm,
      rules,
      submitForm,
    }
  },
})
</script>
<style scoped>
.sign-panel {
  width: calc(var(--xxs) * 125);
}
</style>

