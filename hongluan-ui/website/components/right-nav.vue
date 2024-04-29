<template>
  <hl-scrollbar class="right-nav">
    <ul v-for="item in anchors" :key="item">
      <li>
        <a :id="item" :title="item" :class="active === item ? 'is-active' : ''" @click="handleAnchorClick(item)">
          {{ item }}
        </a>
      </li>
    </ul>
  </hl-scrollbar>
</template>

<script lang="ts">
import { defineComponent, nextTick, onBeforeUnmount, onMounted, ref } from 'vue'
import ResizeObserver from 'resize-observer-polyfill'

export default defineComponent({
  setup() {
    // ordered
    const map = new Map()
    let anchors = ref([])
    let scrollContainer = null
    const active = ref('')
    const navScroll = ref(null)

    const handleAnchorClick = anchor => {
      scrollContainer.scrollTop = map.get(anchor)
      // document.documentElement.scrollTop = map.get(anchor)
      active.value = anchor
    }

    let resizeObserver = null

    onMounted(async () => {
      // waiting for components render, e.g. table.
      await nextTick()
      scrollContainer = document.documentElement
      const content = document.querySelector('.doc-content')
      if (!content) return
      const h2 = content.querySelectorAll('h2')
      anchors.value = Array.from(h2).filter(item => item.childNodes?.length >= 2).map(item => {
        const text = item.childNodes[1].textContent.trim()
        map.set(text, item.offsetTop)
        return text
      })

      let mapValues = Array.from(map.values()).reverse()
      let mapKeys = Array.from(map.keys()).reverse()
      resizeObserver = new ResizeObserver(() => {
        Array.from(h2).filter(item => item.childNodes?.length >= 2).forEach(item => {
          const text = item.childNodes[1].textContent.trim()
          map.set(text, item.offsetTop)
        })
        mapValues = Array.from(map.values()).reverse()
        mapKeys = Array.from(map.keys()).reverse()
      })
      resizeObserver.observe(scrollContainer)

      let cachedIndex = -1
      window.addEventListener('scroll', () => {
        const index = mapValues.findIndex(
          item => scrollContainer.scrollTop > item - 75,
        )
        if (cachedIndex !== index && index !== -1) {
          active.value = mapKeys[index]
          cachedIndex = index
          document.getElementById(active.value)?.focus()
        }
      })
    })

    onBeforeUnmount(() => {
      resizeObserver?.disconnect()
    })
    return {
      navScroll,
      anchors,
      active,
      handleAnchorClick,
    }
  },
})
</script>

<style lang="scss" scoped>
</style>
