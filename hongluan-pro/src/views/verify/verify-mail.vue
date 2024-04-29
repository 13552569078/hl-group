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
            <hl-group dir="vertical" full="full-x" gap="var(--sm)">
              <h4>您好！</h4>
              <span>您收到这封电子邮件是因为我们收到了您帐户的密码重置请求。要继续密码重置，请单击下面的按钮：</span>
              <hl-button type="primary" size="lg" class="w-sm m-y-l self-middle" @click="$router.go(-1)">重设密码</hl-button>
              <span>此密码重置链接将在 60 分钟后失效。如果您没有请求重置密码，则无需采取进一步措施。</span>
              <hr>
              <span>按钮不起作用？尝试将此 URL 粘贴到您的浏览器中：</span>
              <a href="" class="font-bold">https://www.domain.com/account/confirm/07579ae29b6?email=Mzj9^dT</a>

              <hl-group dir="vertical" class="m-t-xl">
                <span>亲切的问候</span>
                <span>HONGLUAN 团队</span>
              </hl-group>
            </hl-group>
          </hl-panel>
        </hl-col>
      </hl-row>
    </hl-col>
  </hl-row>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  setup() {
    return {
    }
  },
})
</script>

<style lang="scss" scoped>
.sign-panel {
  width: calc(var(--xxs) * 125);
}
</style>
