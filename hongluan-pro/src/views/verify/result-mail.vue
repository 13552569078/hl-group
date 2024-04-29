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
              <span>您的maz***jiao@email.com密码已修改</span>
              <span>如果您没有更改密码的操作，请联系我们的 <a href="">支持团队</a>。您的安全对我们非常重要！</span>
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
