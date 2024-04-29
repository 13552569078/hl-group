import { nextTick } from 'vue'
import { mount } from '@vue/test-utils'
import { usePrefix } from '@hongluan-ui/test-utils/utils'
import { describe, expect, test } from 'vitest'
import Anchor from '../src/anchor.vue'
import AnchorLink from '../src/anchor-link.vue'

const _mount = (template: string) => mount({
  components: {
    'hl-anchor': Anchor,
    'hl-anchor-link': AnchorLink,
  },
  template,
}, { attachTo: document.body })

describe('Anchor.vue', () => {
  const { prefix } = usePrefix()
  test('render test', async () => {
    const wrapper = _mount(`
      <hl-anchor>
        <hl-anchor-link title="test" />
        <hl-anchor-link title="test2" />
      </hl-anchor>
    `)
    await nextTick()
    expect(wrapper.classes()).toContain(`${prefix}-anchor`)
    expect(wrapper.findAll(`.${prefix}-anchor-link`).length).toBe(2)
  })
})
