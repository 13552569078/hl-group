<template>
  <hl-layout class="fixed-sub-header">
    <layout-header @open-drawer="openDrawer" />
    <layout-sub-header />
    <hl-container>
      <hl-main class="display-flex" style="gap: var(--lg)">
        <inbox-aside />
        <router-view />
      </hl-main>
    </hl-container>
    <layout-footer />
  </hl-layout>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import LayoutHeader from '../../layout/header.vue'
import LayoutSubHeader from '../../layout/subheader.vue'
import InboxAside from './aside.vue'
import LayoutFooter from '../../layout/footer.vue'

export default defineComponent({
  components: {
    InboxAside,
    LayoutHeader,
    LayoutSubHeader,
    LayoutFooter,
  },
  setup() {
    return {}
  },
})
</script>
