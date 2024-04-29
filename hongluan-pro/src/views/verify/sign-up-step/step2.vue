<template>
  <hl-row align="items-center" class="p-xxl">
    <hl-col span="xxl:col-14 xl:col-16 md:col-18">
      <hl-group dir="vertical" gap="calc(var(--xs) * 6)" full="full-x" class="m-t-xxl">
        <hl-group dir="vertical" gap="var(--xs)">
          <h3>账户信息</h3>
          <span class="text-secondary">如果您需要了解更多的信息，请查看 <a href="">帮助页面</a></span>
        </hl-group>

        <hl-group dir="vertical" gap="var(--sm)">
          <span>指定团队规模</span>
          <hl-group gap="var(--lg)" wrap>
            <hl-radio v-model="scale" label="1" custom>
              <hl-group gap="var(--lg)" class="p-x-lg p-y-sm radius-lg border dashed border-dark checked:border-primary checked:bg-primary-light-5 transition">
                <h3 class="checked:text-primary transition">1-10</h3>
              </hl-group>
            </hl-radio>
            <hl-radio v-model="scale" label="2" custom>
              <hl-group gap="var(--lg)" class="p-x-lg p-y-sm radius-lg border dashed border-dark checked:border-primary checked:bg-primary-light-5 transition">
                <h3 class="checked:text-primary transition">10-50</h3>
              </hl-group>
            </hl-radio>
            <hl-radio v-model="scale" label="3" custom>
              <hl-group gap="var(--lg)" class="p-x-lg p-y-sm radius-lg border dashed border-dark checked:border-primary checked:bg-primary-light-5 transition">
                <h3 class="checked:text-primary transition">50-500</h3>
              </hl-group>
            </hl-radio>
            <hl-radio v-model="scale" label="4" custom>
              <hl-group gap="var(--lg)" class="p-x-lg p-y-sm radius-lg border dashed border-dark checked:border-primary checked:bg-primary-light-5 transition">
                <h3 class="checked:text-primary transition">500+</h3>
              </hl-group>
            </hl-radio>
          </hl-group>
          <span class="font-sm text-secondary">客户将看到您的声明描述符的这个缩短版本</span>
        </hl-group>

        <hl-group dir="vertical" gap="var(--sm)">
          <span>团队名称</span>
          <hl-input v-model="name" size="lg" block fill />
        </hl-group>

        <hl-group dir="vertical" gap="var(--md)">
          <span>选择账户类型</span>
          <hl-group dir="vertical" gap="var(--xxl)">
            <hl-radio v-model="accountType" label="1" custom block>
              <hb-data-collect gap="var(--lg)" padding="0" full="full-x">
                <hl-icon type="primary" size="lg" effect="light" fill radius class="static">
                  <fill-firm />
                </hl-icon>
                <hl-group dir="vertical" full="full-x">
                  <h4 class="title">企业账户</h4>
                  <span class="sub-title">如果您需要更多信息，请查看</span>
                </hl-group>
                <hl-radio v-model="accountType" label="1" type="primary" size="lg" :show-label="false" />
              </hb-data-collect>
            </hl-radio>

            <hl-radio v-model="accountType" label="2" custom block>
              <hb-data-collect gap="var(--lg)" padding="0" full="full-x">
                <hl-icon type="danger" size="lg" effect="light" fill radius class="static">
                  <fill-user />
                </hl-icon>
                <hl-group dir="vertical" full="full-x">
                  <h4 class="title">个人账户</h4>
                  <span class="sub-title">如果您需要更多信息，请查看</span>
                </hl-group>
                <hl-radio v-model="accountType" label="2" type="primary" size="lg" :show-label="false" />
              </hb-data-collect>
            </hl-radio>

            <hl-radio v-model="accountType" label="3" custom block>
              <hb-data-collect gap="var(--lg)" padding="0" full="full-x">
                <hl-icon type="warning" size="lg" effect="light" fill radius class="static">
                  <fill-airplay />
                </hl-icon>
                <hl-group dir="vertical" full="full-x">
                  <h4 class="title">开发者账户</h4>
                  <span class="sub-title">如果您需要更多信息，请查看</span>
                </hl-group>
                <hl-radio v-model="accountType" label="3" type="primary" size="lg" :show-label="false" />
              </hb-data-collect>
            </hl-radio>
          </hl-group>
        </hl-group>

        <hl-group align="items-between">
          <hl-button size="lg" icon-position="left" effect="light" rational @click="$emit('prev')">
            上一步
            <template #icon>
              <hl-icon>
                <two-arrow-left />
              </hl-icon>
            </template>
          </hl-button>
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
  emits: ['prev', 'next'],
  setup() {

    const name = ref('设计中心UED')
    const scale = ref('2')
    const accountType = ref('3')
    return {
      scale,
      accountType,
      name,
    }
  },
})
</script>
