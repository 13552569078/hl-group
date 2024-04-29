<template>
  <hl-panel class="main-panel static w-lg" padding="var(--lg)" borderless>
    <template #header>
      <div class="panel-title"><h4>侧栏</h4></div>
      <div class="panel-header-right"></div>
    </template>

    <hl-group full class="m-b-lg">
      <hl-button type="primary" size="lg" block rational @click="send">
        <hl-icon class="m-r-sm"><fill-mail /></hl-icon>
        创建消息
      </hl-button>
    </hl-group>

    <hl-list item-gap="var(--sm)" hover>
      <hl-list-item>
        <template #prefix>
          <hl-icon><fill-phone-book /></hl-icon>
        </template>
        消息中心
        <template #suffix><hl-tag type="danger" size="sm" effect="light">NEW</hl-tag></template>
      </hl-list-item>
      <hl-list-item>
        <template #prefix>
          <hl-icon>
            <fill-academic />
          </hl-icon>
        </template>
        创建消息
      </hl-list-item>
      <hl-list-item class="active">
        <template #prefix>
          <hl-icon>
            <fill-archive />
          </hl-icon>
        </template>
        收件箱
        <template #suffix><hl-tag type="primary" size="sm" effect="light">+68</hl-tag></template>
      </hl-list-item>
      <hl-list-item>
        <template #prefix>
          <hl-icon>
            <fill-chart-bar />
          </hl-icon>
        </template>
        已发消息
      </hl-list-item>
      <hl-list-item>
        <template #prefix>
          <hl-icon>
            <fill-database />
          </hl-icon>
        </template>
        待发消息
      </hl-list-item>
      <hl-list-item>
        <template #prefix>
          <hl-icon>
            <fill-page />
          </hl-icon>
        </template>
        草稿箱
      </hl-list-item>
    </hl-list>

    <hl-list item-gap="var(--sm)" hover class="m-t-lg">
      <hl-list-item>
        <template #prefix>
          <hl-icon>
            <fill-setting />
          </hl-icon>
        </template>
        消息提醒设置
      </hl-list-item>
      <hl-list-item>
        <template #prefix>
          <hl-icon>
            <fill-archive />
          </hl-icon>
        </template>
        消息模版管理
      </hl-list-item>
      <hl-list-item>
        <template #prefix>
          <hl-icon>
            <fill-maximize />
          </hl-icon>
        </template>
        发送渠道消息
      </hl-list-item>
    </hl-list>
  </hl-panel>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'InboxAside',
  props: {},
  setup() {
    let router = useRouter()
    let send = () => {
      router.push({
        name: 'send',
      })
    }
    return {
      send,
    }
  },
})
</script>
