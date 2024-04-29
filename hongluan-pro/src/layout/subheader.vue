<template>
  <hl-sub-header>
    <div class="page-title">
      <!-- <hl-button class="go-back bg-transparent text-regular text-primary-hover" equal no-fill @click="$router.go(-1)">
        <template #icon>
          <hl-icon><fill-CircleLeft /></hl-icon>
        </template>
      </hl-button> -->
      <h5>{{ pageTitle }}</h5>
      <hl-breadcrumb separator="-">
        <hl-breadcrumb-item :to="{ path: '/' }">首页</hl-breadcrumb-item>
        <hl-breadcrumb-item><a href="/">活动管理</a></hl-breadcrumb-item>
        <hl-breadcrumb-item>活动列表</hl-breadcrumb-item>
      </hl-breadcrumb>
    </div>
    <div class="sub-header-right">
      <hl-button type="primary" effect="light">Button</hl-button>
      <hl-dropdown class="m-l-xs">
        <hl-button type="primary" effect="light" equal>
          <template #icon>
            <hl-icon>
              <fill-print />
            </hl-icon>
          </template>
        </hl-button>
        <template #dropdown>
          <hl-dropdown-menu>
            <hl-dropdown-item>数据流</hl-dropdown-item>
            <hl-dropdown-item>传输属性值</hl-dropdown-item>
            <hl-dropdown-item>已断线</hl-dropdown-item>
            <hl-dropdown-item disabled>待恢复</hl-dropdown-item>
            <hl-dropdown-item divider />
            <hl-dropdown-item>其他</hl-dropdown-item>
          </hl-dropdown-menu>
        </template>
      </hl-dropdown>
    </div>
  </hl-sub-header>
</template>
<script lang="ts">
import { defineComponent, onBeforeUnmount, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'LayoutSubHeader',
  setup() {
    const router = useRouter()
    const pageTitle = ref(document.title)

    let routerHook: () => void
    onMounted(() => {
      routerHook = router.afterEach(to => {
        to.meta.title ? (pageTitle.value = to.meta.title as string) : ''
      })
    })
    onBeforeUnmount(() => {
      routerHook && routerHook()
    })

    return {
      pageTitle,
    }
  },
})
</script>
