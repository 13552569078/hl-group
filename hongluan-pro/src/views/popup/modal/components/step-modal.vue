<template>
  <hl-panel padding="var(--xl)" class="card-panel">
    <template #header>
      <div class="panel-title">
        <h4>分步模态窗</h4>
      </div>
      <div class="panel-header-right">
        <hl-button no-fill equal>
          <hl-icon>
            <two-more />
          </hl-icon>
        </hl-button>
      </div>
    </template>
    <hl-group
      full="full-x"
      class="p-b-lg"
    >在不离开当前页面的情况下引导用户分步骤的进行操作，更有利于暗示用户：“不要担心！这只是一个既简单又快速的过程，瞧！我们并没中断你之前的流程，不是么。”</hl-group>
    <hl-button class="m-r-md" @click="outerVisible = true">点击查看</hl-button>
  </hl-panel>

  <hl-dialog
    v-model="outerVisible"
    title="活动信息"
    :borderless="true"
    width="calc(var(--xxl) * 20)"
    padding="var(--xl)"
  >
    <hl-row class="m-t-lg" gap="var(--xl)">
      <hl-col span="md:col-10">
        <hl-group dir="vertical">
          <hl-steps
            size="var(--xxl)"
            dir="vertical"
            :active="1"
            item-padding="var(--md)"
            block
            class="static m-l-md"
          >
            <hl-step
              style="min-height: calc(val(--xxl) * 2)"
              title="活动按期开始"
              description="设置您的帐户详细信息"
            />
            <hl-step style="min-height: calc(val(--xxl) * 2)" title="通过审核" description="设置您的帐户设置" />
            <hl-step
              style="min-height: calc(val(--xxl) * 2)"
              title="项目创建成功"
              description="您的业​​务相关信息"
            />
            <hl-step style="min-height: calc(val(--xxl) * 2)" title="初始化项目" description="设置您的付款方式" />
            <hl-step style="min-height: calc(val(--xxl) * 2)" title="完成" description="我们出发！" />
          </hl-steps>
        </hl-group>
      </hl-col>
      <hl-col span="md:col-14">
        <hl-group dir="vertical" gap="calc(var(--xs) * 8)" full>
          <hl-group dir="vertical" gap="var(--xs)">
            <h4>选择账户类型</h4>
            <span class="text-secondary">
              如果您需要了解更多的信息，请查看
              <a href>帮助页面</a>
            </span>
          </hl-group>

          <hl-row gap="var(--lg)">
            <hl-col span="col-24">
              <hl-radio v-model="accountType" label="1" class="w-full" custom>
                <hl-group
                  gap="var(--lg)"
                  align="items-middle"
                  class="p-lg p-l-xl radius-lg border dashed checked:border-primary checked:bg-primary-light-5 transition"
                  full
                >
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
            <hl-col span="col-24">
              <hl-radio v-model="accountType" label="2" class="w-full" custom>
                <hl-group
                  gap="var(--lg)"
                  align="items-middle"
                  class="p-lg p-l-xl radius-lg border dashed checked:border-primary checked:bg-primary-light-5 transition"
                  full
                >
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
        </hl-group>
      </hl-col>
    </hl-row>
    <template #footer>
      <span class="dialog-footer">
        <hl-button @click="outerVisible = false">取 消</hl-button>
        <hl-button type="primary" icon-position="right" class="m-l-md">
          下一步
          <template #icon>
            <hl-icon>
              <two-arrow-right />
            </hl-icon>
          </template>
        </hl-button>
      </span>
    </template>
  </hl-dialog>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
export default defineComponent({
  setup() {
    const outerVisible = ref(false)
    const accountType = ref('1')

    return {
      outerVisible,
      accountType,
    }
  },
})
</script>
<style lang="scss" scoped>
</style>

