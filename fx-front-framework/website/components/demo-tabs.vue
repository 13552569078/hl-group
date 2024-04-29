<template>
  <div class="demo-tabs" :class="[{ 'hover': hovering }]" @mouseenter="hovering = true" @mouseleave="hovering = false">
    <slot></slot>
  </div>
</template>
<script>
import { nextTick } from 'vue'
import hljs from 'highlight.js'

export default {
  props: {
    dark: Boolean,
  },
  data() {
    return {
      hovering: false,
    }
  },

  mounted() {
    nextTick(() => {
      try {
        hljs.highlightBlock(highlight.querySelector('code'))
      } catch (error) {
        console.log(error)
      }
    })

    document.querySelectorAll('.demo-tabs .tab-title').forEach(ele => {
      ele.addEventListener('click', this.mouseoverTabTitle)
    })
    document.querySelector('.demo-tabs pre').classList.add('active')
    document.querySelector('.demo-tabs .tab-title').classList.add('active')
  },
  beforeMount() {
    document.querySelectorAll('.demo-tabs .tab-title').forEach(ele => {
      ele.removeEventListener('click', this.mouseoverTabTitle)
    })
  },

  methods: {
    mouseoverTabTitle($event) {
      document.querySelectorAll('.demo-tabs .tab-title').forEach(ele => {
        ele.classList.remove('active')
      })
      $event.target.classList.add('active')

      const idx = $event.target.getAttribute('data-idx')
      document.querySelectorAll(`.demo-tabs pre`).forEach(ele => {
        ele.classList.remove('active')
      })
      document.querySelector(`.demo-tabs pre:nth-of-type(${idx})`).classList.add('active')
    },
  },
}
</script>
<style lang="scss" scoped>
</style>
