<template>
  <hl-row align="items-center items-middle" style="min-height: 100vh">
    <hl-col span="col-16 sign-main" class="display-flex items-right">
      <hl-group class="sign-logo" dir="vertical" full>
        <hl-group align="items-middle" gap="var(--xs)" class="m-b-lg" @click="$router.go(-1)">
          <img src="../../assets/images/logo.svg" alt="hongluan.ui">
          <h4>HONGLUAN · PRO</h4>
        </hl-group>
        <h1 class="text-title m-t-xxl m-b-md">欢迎来到鸿鸾PRO!</h1>
        <p>精美、通用、高效的模版库</p>
      </hl-group>
      <hl-panel class="sign-panel" padding="calc(var(--xs) * 6)" borderless>
        <hl-group class="m-t-md m-b-xxl" dir="vertical" align="items-middle" full="full-x" gap="var(--xs)">
          <h4>欢迎注册 HONGLUAN · PRO</h4>
          <span>已有账户？ <a href="#/verify/sign-in">现在去登录</a></span>
        </hl-group>

        <hl-form ref="ruleFormRef" hide-required-asterisk :model="ruleForm" :rules="rules" :label-position="['left', 'left']" gap="var(--md)">
          <hl-form-item label="邮箱" prop="email">
            <hl-input v-model="ruleForm.email" size="lg" block fill placeholder="@cestc.cn" />
          </hl-form-item>
          <hl-form-item label="密码" prop="password">
            <hl-input v-model="ruleForm.password" size="lg" block fill show-password />
            <div class="font-sm text-secondary m-t-sm">使用 8 个或更多的字母、数字和符号混合的字符</div>
          </hl-form-item>
          <hl-form-item label="确认密码" prop="repeatPassword">
            <hl-input v-model="ruleForm.repeatPassword" size="lg" block fill show-password />
          </hl-form-item>
          <hl-form-item>
            <hl-checkbox label="我同意30天免费使用" name="type" fill />
            <a href="">条款和协议</a>
          </hl-form-item>
          <hl-form-item>
            <hl-button type="primary" class="m-t-md" size="lg" block @click="submitForm('ruleForm')">立即创建</hl-button>
          </hl-form-item>
        </hl-form>
      </hl-panel>
    </hl-col>
  </hl-row>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useRouter } from 'vue-router'

export default defineComponent({
  setup() {

    let router = useRouter()

    const ruleForm = ref({
      email: '',
      password: '',
      repeatPassword: '',
    })
    const rules = ref({
      email: [
        { required: true, message: '请输入邮箱', trigger: 'change' },
        {
          pattern: /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/,
          message: '请正确输入邮箱格式',
          trigger: 'blur',
        },
      ],
      password: [
        { required: true, message: '请输入密码', trigger: 'change' },
        { min: 6, message: '密码长度不小于6个字符', trigger: 'blur' },
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
      ruleFormRef?.value.validate((valid: boolean) => {
        if (valid) {
          router.push({
            name: 'dashboard',
          })
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
.sign-main {
  position: relative;
  background-image: url(../../assets/images/sign-pic.svg);
  background-repeat: no-repeat;
  background-position: 0 bottom;
  background-size: auto;
}
.sign-logo {
  position: absolute;
  width: calc(var(--xxs) * 100);
  left: 0;
}
.sign-logo img {
  width: var(--xl);
}
</style>
