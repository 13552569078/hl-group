import { ref, nextTick, defineComponent, onMounted } from 'vue'
import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import { hasClass } from '@hongluan-ui/utils'

import { useLockscreen } from '../use-lockscreen'

const kls = 'no-scroll'

const Comp = defineComponent({
  setup() {
    const flag = ref(false)
    useLockscreen(flag)
    onMounted(() => {
      flag.value = true
    })

    return () => undefined
  },
})

describe('useLockscreen', () => {
  it('should lock screen when trigger is true', async () => {
    const wrapper = mount({
      setup: () => () => <Comp />,
    })
    await nextTick()
    expect(hasClass(document.body, kls)).toBe(true)

    wrapper.unmount()
    await nextTick()
    setTimeout(() => {
      expect(hasClass(document.body, kls)).toBe(false)
    }, 250)
  })

  it('should cleanup when unmounted', async () => {
    const shouldRender = ref(true)
    mount({
      setup: () => () => shouldRender.value ? <Comp /> : undefined,
    })

    await nextTick()

    expect(hasClass(document.body, kls)).toBe(true)

    shouldRender.value = false
    await nextTick()

    setTimeout(() => {
      expect(hasClass(document.body, kls)).toBe(false)
    }, 250)
  })
})
