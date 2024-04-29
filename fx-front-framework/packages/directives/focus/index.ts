import type { ObjectDirective } from 'vue'

const Focus: ObjectDirective = {
  mounted(el: HTMLInputElement) {
    el?.focus()
  },
}

export default Focus
