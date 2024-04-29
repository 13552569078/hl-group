import { nextTick } from 'vue'
import { mount } from '@vue/test-utils'
import { describe, expect, test } from 'vitest'
import { usePrefix } from '@hongluan-ui/test-utils/utils'
import Backtop from '../src/backtop.vue'

const _mount = (template: string) => mount({
  components: {
    'hl-backtop': Backtop,
  },
  template,
}, { attachTo: document.body })

describe('Backtop.vue', () => {
  const { prefix } = usePrefix()
  const rootClazz = `.${prefix}-backtop`
  test('render', async () => {
    const wrapper = _mount(`
      <div class="target" style="height: 100px; overflow: auto">
        <div style="height: 10000px; width: 100%">
          <hl-backtop target=".target" :visibilityHeight="2000" :right="100" :bottom="200" />
        </div>
      </div>
    `)
    await nextTick()

    expect(wrapper.find(rootClazz).exists()).toBe(false)
    wrapper.element.scrollTop = 2000
    await wrapper.trigger('scroll')
    expect(wrapper.find(rootClazz).exists()).toBe(true)

    expect(wrapper.find(rootClazz).attributes('style')).toBe('right: 100px; bottom: 200px;')
    expect(wrapper.find('svg').exists()).toBe(true)

    await wrapper.trigger('click')
    expect(wrapper.emitted()).toBeDefined()
  })
})
