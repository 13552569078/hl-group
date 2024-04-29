import { mount } from '@vue/test-utils'
import { describe, expect, test } from 'vitest'
import Badge from '../src/badge.vue'

const AXIOM = 'Rem is the best girl'

describe('Badge', () => {
  test('has value', () => {
    const wrapper = mount(Badge, {
      props: { value: 80 },
    })
    expect(wrapper.vm.content).toEqual('80')
  })

  test('position: lb', () => {
    const wrapper = mount(Badge, {
      props: { position: 'lb' },
    })
    expect(wrapper.find('.lb').exists()).toBe(true)
  })

  test('is dot&round', () => {
    const wrapper = mount(Badge, {
      props: { dot: true, round: true, content: AXIOM },
    })
    expect(wrapper.find('.dot').exists()).toBe(true)
    expect(wrapper.find('.round').exists()).toBe(true)
  })

  test('max', async () => {
    const wrapper = mount(Badge, {
      props: { max: 100, value: 200 },
    })
    expect(wrapper.vm.content).toEqual('100+')
    await wrapper.setProps({ value: 80 })
    expect(wrapper.vm.content).toEqual('80')
  })
})
