import { mount } from '@vue/test-utils'
import { usePrefix } from '@hongluan-ui/test-utils/utils'
import { describe, expect, test } from 'vitest'
import Alert from '../src/alert.vue'

const AXIOM = 'Rem is the best girl'

describe('Alert.vue', () => {
  const { prefix } = usePrefix()
  const rootClazz = `.${prefix}-alert`
  test('render test & class', () => {
    const wrapper = mount(Alert, {
      props: {
        title: AXIOM,
        showIcon: true,
      },
    })
    expect(wrapper.find('.title').text()).toEqual(AXIOM)
    expect(wrapper.find(rootClazz)).toBeTruthy()
  })

  test('type', () => {
    const wrapper = mount(Alert, {
      props: {
        title: 'test',
        type: 'success',
        showIcon: true,
      },
    })
    expect(wrapper.find(rootClazz).classes()).toContain('success')
    expect(wrapper.find('.alert-icon svg').exists()).toBe(true)
  })

  test('description', () => {
    const wrapper = mount(Alert, {
      props: {
        title: 'Dorne',
        description: AXIOM,
        showIcon: true,
      },
    })
    expect(wrapper.find('.description').text()).toEqual(AXIOM)
  })

  test('theme', () => {
    const wrapper = mount(Alert, {
      props: {
        title: 'test',
        effect: 'light',
      },
    })
    expect(wrapper.find(rootClazz).classes()).toContain('light')
  })

  test('title slot', () => {
    const wrapper = mount(Alert, {
      slots: {
        title: AXIOM,
      },
    })
    expect(wrapper.find('.title').text()).toEqual(AXIOM)
  })

  test('close', async () => {
    const wrapper = mount(Alert, {
      props: {
        closeText: 'close',
      },
    })

    const closeBtn = wrapper.find('.alert-customed')
    expect(closeBtn.exists()).toBe(true)

    await closeBtn.trigger('click')
    expect(wrapper.emitted()).toBeDefined()
  })
})
