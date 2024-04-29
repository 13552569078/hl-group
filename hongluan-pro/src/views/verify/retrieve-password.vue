<template>
  <hl-row align="items-center items-middle" class="p-xl vh-full">
    <hl-col span="sm:col-16 sign-main">
      <hl-row align="items-center">
        <hl-col span="col-24" class="display-flex items-center m-b-xxl">
          <hl-group align="items-middle" gap="var(--xs)" @click="$router.go(-1)">
            <img src="../../assets/images/logo.svg" alt="hongluan.ui">
            <h4>HONGLUAN · PRO</h4>
          </hl-group>
        </hl-col>
        <hl-col span="col-24" class="display-flex items-center">
          <hl-panel class="sign-panel" padding="calc(var(--xs) * 6)" borderless>
            <hl-group
              class="m-t-md m-b-xxl"
              dir="vertical"
              align="items-middle"
              full="full-x"
              gap="var(--xs)"
            >
              <h4>忘记密码？</h4>
              <span class="text-secondary">输入您的电子邮件以重置您的密码</span>
            </hl-group>

            <hl-form
              ref="ruleFormRef"
              hide-required-asterisk
              :model="ruleForm"
              :rules="rules"
              :label-position="['left', 'left']"
              gap="var(--md)"
            >
              <hl-form-item label="邮箱" prop="email">
                <hl-input v-model="ruleForm.email" size="lg" block fill placeholder="@cestc.cn" />
              </hl-form-item>
              <hl-form-item>
                <hl-group gap="var(--md)" align="items-center" full="full-x" class="m-t-md">
                  <hl-button
                    type="primary"
                    effect="light"
                    class="w-xs static"
                    size="lg"
                    @click="$router.go(-1)"
                  >
                    取消
                  </hl-button>
                  <hl-button
                    type="primary"
                    class="w-xs static"
                    size="lg"
                    @click="submitForm('ruleForm')"
                  >
                    提交
                  </hl-button>
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
      email: '',
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
