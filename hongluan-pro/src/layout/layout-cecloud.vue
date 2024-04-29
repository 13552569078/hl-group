<template>
  <hl-layout :class="[boxed, header, fullHeader, aside, subHeader, fullSubHeader, footer, fullFooter]">
    <layout-header @open-drawer="openDrawer" />
    <layout-sub-header />
    <hl-container>
      <layout-menu />
      <hl-main>
        <slot></slot>
      </hl-main>
    </hl-container>
    <layout-footer />
  </hl-layout>

  <layout-drawer v-if="drawerVisible" @submit="changeLayout" @cancel="closeDrawer" />
</template>

<script lang="ts">
import { defineComponent, toRefs, reactive, ref } from 'vue'
import LayoutHeader from './header-cecloud.vue'
import LayoutSubHeader from './subheader.vue'
import LayoutMenu from './menu-cecloud.vue'
import LayoutDrawer from './drawer.vue'
import LayoutFooter from './footer.vue'

import '../assets/styles/index-cecloud.scss'

export default defineComponent({
  components: {
    LayoutHeader,
    LayoutSubHeader,
    LayoutMenu,
    LayoutFooter,
    LayoutDrawer,
  },
  setup() {
    const layoutConfig = reactive({
      boxed: ['boxed1'],
      header: ['fixed-header'],
      fullHeader: ['full-header'],
      aside: ['fixed-aside'],
      subHeader: ['fixed-sub-header1'],
      fullSubHeader: ['full-sub-header1'],
      footer: ['fixed-footer1'],
      fullFooter: ['full-header1'],
    })
    const drawerVisible = ref(false)

    const openDrawer = () => {
      drawerVisible.value = true
    }
    const changeLayout = (params: any) => {
      layoutConfig.header = params.header
      layoutConfig.aside = params.aside
      layoutConfig.subHeader = params.subHeader
      layoutConfig.footer = params.footer
      layoutConfig.boxed = params.boxed
      drawerVisible.value = false
    }
    const closeDrawer = () => {
      drawerVisible.value = false
    }

    return {
      drawerVisible,
      openDrawer,
      changeLayout,
      closeDrawer,
      ...toRefs(layoutConfig),
    }
  },
})
</script>
