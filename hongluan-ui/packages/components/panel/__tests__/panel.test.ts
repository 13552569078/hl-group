import { mount } from '@vue/test-utils'
import { describe, expect, test } from 'vitest'
import Panel from '../src/panel.vue'
const AXIOM = 'Rem is the best girl'

describe('Panel.vue', () => {
  test('panel render test', () => {
    const wrapper = mount(Panel, {
      slots: {
        default: AXIOM,
      },
    })
    expect(wrapper.find('.panel-body').text()).toEqual(AXIOM)
  })

  test('panel slots text', () => {
    const wrapper = mount(Panel, {
      slots: {
        default: AXIOM,
        header: AXIOM,
        footer: AXIOM,
      },
    })
    expect(wrapper.find('.panel-header').text()).toEqual(AXIOM)
    expect(wrapper.find('.panel-body').text()).toEqual(AXIOM)
    expect(wrapper.find('.panel-footer').text()).toEqual(AXIOM)
  })

  test('borderless', () => {
    const wrapper = mount(Panel, {
      props: {
        borderless: true,
      },
    })
    expect(wrapper.element.classList.contains('borderless'))
  })
})
