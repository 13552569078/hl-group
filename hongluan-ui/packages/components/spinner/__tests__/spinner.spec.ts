import { mount } from '@vue/test-utils'
import { usePrefix } from '@hongluan-ui/test-utils/utils'
import { describe, expect, test } from 'vitest'
import Spinner from '../src/index.vue'
const AXIOM = 'Rem is the best girl'

describe('Spinner.vue', () => {
  const { prefix } = usePrefix()
  test('spinner render test', () => {
    const wrapper = mount(Spinner, {
      slots: {
        default: AXIOM,
      },
    })
    expect(wrapper.find(`.${prefix}-spinner`).exists()).toBe(true)
  })

  test('spinner defined size', () => {
    const wrapper = mount(Spinner, {
      props:{
        size: 'lg',
      },
    })
    expect(wrapper.find('.lg').exists()).toBe(true)
  })

  test('spinner custom size', () => {
    const wrapper = mount(Spinner, {
      props: {
        size: '10px',
      },
    })
    expect(wrapper.attributes('style')?.toString()).toContain('--spinner-width: 10px')
  })

  test('spinner custom size & color', () => {
    const wrapper = mount(Spinner, {
      props: {
        size: '10px',
        color: 'red',
      },
    })
    expect(wrapper.attributes('style')?.toString()).toContain('--spinner-width: 10px')
    expect(wrapper.attributes('style')?.toString()).toContain('color: red')
  })

  test('spinner status', () => {
    const wrapper = mount(Spinner, {
      props: {
        status: 'info',
      },
    })
    expect(wrapper.classes('info')).toBe(true)
    expect(wrapper.find('.show-result svg').exists()).toBe(true)
  })

  test('spinner slots', () => {
    const wrapper = mount(Spinner, {
      slots: {
        default: 'xx',
        error: '<p class="error-custom">error</p>',
      },
      props: {
        status: 'error',
      },
    })
    expect(wrapper.find('.spinner-wrap').text()).toContain('xx')
    expect(wrapper.find('.show-result .error-custom').exists()).toBe(true)
  })
})
