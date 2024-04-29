import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { usePrefix } from '@hongluan-ui/test-utils/utils'
import HlIcon from '@hongluan-ui/components/icon'
import { SystemClose } from '@hongluan-ui/components/system-icon'
import Breadcrumb from '../src/breadcrumb.vue'
import BreadcrumbItem from '../src/breadcrumb-item.vue'

const _mount = (template: string) => mount({
  components: {
    'hl-breadcrumb': Breadcrumb,
    'hl-breadcrumb-item': BreadcrumbItem,
    HlIcon,
    SystemClose,
  },
  template,
}, {
  global: {
    provide: {
      breadcrumb: {},
    },
  },
})

describe('Breadcrumb.vue', () => {
  const { prefix } = usePrefix()
  it('separator', () => {
    const wrapper = _mount(`
      <hl-breadcrumb separator="?">
        <hl-breadcrumb-item>A</hl-breadcrumb-item>
      </hl-breadcrumb>
    `)
    expect(wrapper.find('.breadcrumb-separator').text()).toBe('?')
  })

  it('separatorIcon', () => {
    const wrapper = _mount(`
      <hl-breadcrumb separator="?">
        <template #icon>
          <hl-icon><system-close /></hl-icon>
        </template>
        <hl-breadcrumb-item>A</hl-breadcrumb-item>
      </hl-breadcrumb>
    `)
    expect(wrapper.find('.breadcrumb-separator svg').exists()).toBe(true)
  })

  it('to', () => {
    const wrapper = _mount(`
      <hl-breadcrumb separator="?" separatorIcon="Computer">
        <hl-breadcrumb-item to="/index">A</hl-breadcrumb-item>
      </hl-breadcrumb>
    `)
    expect(wrapper.find('.breadcrumb-inner').classes()).toContain('is-link')
  })

  it('single', () => {
    const wrapper = _mount('<hl-breadcrumb-item>A</hl-breadcrumb-item>')
    expect(wrapper.find('.breadcrumb-inner').text()).toBe('A')
    expect(wrapper.find('.breadcrumb-separator').text()).toBe('')
  })
})
