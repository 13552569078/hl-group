<template>
  <hl-row align="items-center items-middle" class="p-xxl h-full">
    <hl-col span="xxl:col-16 xl:col-18 md:col-22">
      <hl-group dir="vertical" gap="calc(var(--xs) * 8)" full>
        <hl-group dir="vertical" gap="var(--xs)">
          <h1>选择账户类型</h1>
          <span class="text-secondary">如果您需要了解更多的信息，请查看 <a href="/">帮助页面</a></span>
        </hl-group>

        <hl-row gap="var(--lg)">
          <hl-col span="col-12">
            <hl-radio v-model="accountType" label="1" class="w-full" custom>
              <hl-group gap="var(--lg)" align="items-middle" class="p-lg p-l-xl radius-lg border dashed checked:border-primary checked:bg-primary-light-5 transition" full>
                <hl-icon size="xxl" class="static text-lightest checked:text-primary transition">
                  <fill-user />
                </hl-icon>
                <hl-group dir="vertical">
                  <h4>个人账户</h4>
                  <span class="text-secondary">如果您需要更多信息，请查看</span>
                </hl-group>
              </hl-group>
            </hl-radio>
          </hl-col>
          <hl-col span="col-12">
            <hl-radio v-model="accountType" label="2" class="w-full" custom>
              <hl-group gap="var(--lg)" align="items-middle" class="p-lg p-l-xl radius-lg border dashed checked:border-primary checked:bg-primary-light-5 transition" full>
                <hl-icon size="xxl" class="static text-lightest checked:text-primary transition">
                  <fill-briefcase />
                </hl-icon>
                <hl-group dir="vertical" class="content">
                  <h4>企业账户</h4>
                  <span class="text-secondary">如果您需要更多信息，请查看</span>
                </hl-group>
              </hl-group>
            </hl-radio>
          </hl-col>
        </hl-row>

        <hl-group align="right">
          <hl-button type="primary" size="lg" icon-position="right" rational @click="$emit('next')">
            下一步
            <template #icon>
              <hl-icon>
                <two-arrow-right />
              </hl-icon>
            </template>
          </hl-button>
        </hl-group>
      </hl-group>
    </hl-col>
  </hl-row>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  emits: ['next'],
  setup() {
    const accountType = ref('1')
    return {
      accountType,
    }
  },
})
</script>

