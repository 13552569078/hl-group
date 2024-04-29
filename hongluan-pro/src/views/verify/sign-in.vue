<template>
  <hl-row align="items-center items-middle" class="vh-full">
    <hl-col span="col-16 sign-main" class="display-flex items-right">
      <hl-group class="sign-logo" dir="vertical" full>
        <hl-group align="items-middle" gap="var(--xs)" class="m-b-lg" @click="$router.go(-1)">
          <img :src="logoUrl" alt="hongluan.ui">
          <h4>HONGLUAN · PRO</h4>
        </hl-group>
        <h1 class="text-title m-t-xxl m-b-md">欢迎来到鸿鸾PRO!</h1>
        <p>精美、通用、高效的模版库</p>
      </hl-group>
      <hl-panel class="sign-panel" padding="calc(var(--xs) * 6)" borderless>
        <hl-group class="m-t-md m-b-xxl" dir="vertical" align="items-middle" full="full-x" gap="var(--xs)">
          <h4>欢迎登录 HONGLUAN · PRO</h4>
          <span>还没有账户？ <a href="#/verify/sign-up">创建一个账户</a></span>
        </hl-group>

        <hl-form ref="ruleFormRef" hide-required-asterisk :model="ruleForm" :rules="rules" :label-position="['left', 'left']" gap="var(--md)">
          <hl-form-item label="邮箱" prop="email">
            <hl-input v-model="ruleForm.email" size="lg" block fill placeholder="@cestc.cn" />
          </hl-form-item>
          <hl-form-item label="密码" prop="password">
            <hl-input v-model="ruleForm.password" size="lg" block fill show-password />
          </hl-form-item>
          <hl-form-item>
            <hl-button type="primary" class="m-t-md" size="lg" block @click="submitForm('ruleForm')">立即登录</hl-button>
          </hl-form-item>
        </hl-form>
        <hl-group class="m-t-md" dir="vertical" align="items-middle" gap="var(--md)" full>
          <div class="text-secondary">or</div>
          <hl-button effect="light" size="lg" class="font-md" block>LDAP账户登录</hl-button>
          <hl-button effect="light" size="lg" class="font-md" block>短信验证码登录</hl-button>
        </hl-group>
      </hl-panel>
    </hl-col>
  </hl-row>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useRouter } from 'vue-router'
import logoUrl from '../../assets/images/logo.svg?url'

export default defineComponent({
  setup() {

    let router = useRouter()

    const ruleForm = ref({
      email: 'admin@cestc.cn',
      password: '123456',
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
    })
    const ruleFormRef = ref()

    const submitForm = () => {
      ruleFormRef.value.validate((valid: boolean) => {
        if (valid) {
          router.push({
            name: 'dashboard',
          })
        }
      })
    }

    return {
      logoUrl,
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
