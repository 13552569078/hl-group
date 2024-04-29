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
            <hl-group class="m-t-md m-b-xxl" dir="vertical" align="items-middle" full="full-x" gap="var(--md)">
              <hl-icon width="calc(var(--lg) * 3)" height="calc(var(--lg) * 3)" class="m-b-lg">
                <svg viewBox="0 0 46 74" xmlns="http://www.w3.org/2000/svg">
                  <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" fill-opacity="0.2" stroke-linecap="round" stroke-linejoin="round">
                    <g transform="translate(-815.000000, -318.000000)" fill="#A1A5B7" stroke="#A1A5B7" stroke-width="1.75">
                      <g transform="translate(572.000000, 176.000000)">
                        <g id="icons/archive" transform="translate(244.000000, 143.000000)">
                          <path
                            d="M7.33333333,0 L36.6666667,0 C40.7167548,0 44,3.2235498 44,7.2 L44,64.8 C44,68.7764502 40.7167548,72 36.6666667,72 L7.33333333,72 C3.28324517,72 0,68.7764502 0,64.8 L0,7.2 C0,3.2235498 3.28324517,0 7.33333333,0 Z M17.4166667,67 L26.5833333,67 M11.5,0 L11.5,2 C11.5,3.65685425 12.8431458,5 14.5,5 L29.5,5 C31.1568542,5 32.5,3.65685425 32.5,2 L32.5,0 L32.5,0 L11.5,0 Z"
                          />
                        </g>
                      </g>
                    </g>
                  </g>
                </svg>
              </hl-icon>
              <h4>短信验证</h4>
              <span class="text-secondary">输入我们发送的验证码</span>
              <h4>176****6812</h4>
            </hl-group>

            <hl-form ref="ruleFormRef" hide-required-asterisk :model="ruleForm" :rules="rules" :label-position="['left', 'left']" gap="var(--xxl)">
              <hl-form-item label="输入您的 6 位 短信验证码" prop="code">
                <hl-row gap="var(--md)">
                  <hl-col span="col"><hl-input v-model="ruleForm.code[0]" block fill maxlength="1" class="text-center" style="font-size: var(--font-h3); height: calc(var(--xxs) * 13)" /></hl-col>
                  <hl-col span="col"><hl-input v-model="ruleForm.code[1]" block fill maxlength="1" class="text-center" style="font-size: var(--font-h3); height: calc(var(--xxs) * 13)" /></hl-col>
                  <hl-col span="col"><hl-input v-model="ruleForm.code[2]" block fill maxlength="1" class="text-center" style="font-size: var(--font-h3); height: calc(var(--xxs) * 13)" /></hl-col>
                  <hl-col span="col"><hl-input v-model="ruleForm.code[3]" block fill maxlength="1" class="text-center" style="font-size: var(--font-h3); height: calc(var(--xxs) * 13)" /></hl-col>
                  <hl-col span="col"><hl-input v-model="ruleForm.code[4]" block fill maxlength="1" class="text-center" style="font-size: var(--font-h3); height: calc(var(--xxs) * 13)" /></hl-col>
                  <hl-col span="col"><hl-input v-model="ruleForm.code[5]" block fill maxlength="1" class="text-center" style="font-size: var(--font-h3); height: calc(var(--xxs) * 13)" /></hl-col>
                </hl-row>
              </hl-form-item>
              <hl-form-item>
                <hl-group full="full-x" dir="vertical" align="items-middle" gap="var(--xxl)">
                  <hl-button type="primary" size="lg" class="w-xs" @click="$router.go(-1)">提交</hl-button>
                  <span class="text-secondary">没有收到短信？ <a href="">重新发送</a> 或 <a href="">致电我们</a></span>
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
      code: new Array<string | undefined>(6).fill(undefined),
    })
    const rules = ref({
      code: [
        {
          validator: (_: unknown, __: unknown, callback: (error?: Error) => void) => {
            if(!ruleForm.value.code.every(Boolean)) {
              callback(new Error('请输入验证码'))
            } else {
              callback()
            }
          },
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

<style lang="scss" scoped>

.sign-panel {
  width: calc(var(--xxs) * 125);
}
</style>
