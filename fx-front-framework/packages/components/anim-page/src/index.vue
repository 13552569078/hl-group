<template>
  <div class="fx-anim-page">
    <transition name="fade-transform" mode="out-in">
      <div v-if="showContent" class="page-content">
        <slot></slot>
      </div>
    </transition>
    <!-- <router-view v-slot="{ Component }">
      <transition name="fade-transform" mode="out-in"> <component :is="Component" /> </transition>
    </router-view> -->
  </div>
</template>
<script lang="ts">
import { defineComponent, getCurrentInstance, ref, watch } from 'vue'

export default defineComponent({
  name: 'AnimPage',
  props: {
    path: {
      type: String,
      default: '',
    },
  },
  setup(props) {
    const showContent = ref(false)
    const instance = getCurrentInstance()
    const route = instance.appContext.config.globalProperties.$route
    watch(
      () => route?.path,
      () => {
        showContent.value = route.path === props.path
      },
      { immediate: true },
    )
    return {
      showContent,
    }
  },
})
</script>
