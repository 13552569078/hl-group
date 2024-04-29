import { mount } from '@vue/test-utils'
import { usePrefix } from '@hongluan-ui/test-utils/utils'
import { describe, expect, test } from 'vitest'
import Tag from '../src/tag.vue'

const AXIOM = 'Rem is the best girl'

describe('Tag.vue', () => {
  const { prefix } = usePrefix()
  test('render text & class', () => {
    const wrapper = mount(Tag, {
      slots: {
        default: AXIOM,
      },
    })
    expect(wrapper.text()).toEqual(AXIOM)

    const vm = wrapper.vm

    expect(vm.$el.classList.contains(prefix + '-tag')).toEqual(true)
    expect(vm.$el.classList.contains('tag-close')).toEqual(false)
    expect(vm.$el.classList.contains('outline')).toEqual(false)
    expect(vm.$el.classList.contains('md-fade-center')).toEqual(false)
  })

  test('type', () => {
    const wrapper = mount(Tag, {
      props: {
        type: 'primary',
      },
    })
    const vm = wrapper.vm
    expect(vm.$el.classList.contains('primary')).toEqual(true)
  })

  test('outline & round & active', () => {
    const wrapper = mount(Tag, {
      props: {
        outline: true,
        round: true,
        active: true,
      },
    })
    const vm = wrapper.vm
    expect(vm.$el.classList.contains('outline')).toEqual(true)
    expect(vm.$el.classList.contains('round')).toEqual(true)
    expect(vm.$el.classList.contains('is-focus')).toEqual(true)
  })

  test('closable', async () => {
    const wrapper = mount(Tag, {
      props: {
        closable: true,
      },
    })
    const closeBtn = wrapper.find('.tag-close')
    expect(closeBtn.exists()).toBe(true)

    await closeBtn.trigger('click')
    expect(wrapper.emitted().close).toBeTruthy()
  })

  test('closeTransition', () => {
    const wrapper = mount(Tag, {
      props: {
        closeTransition: true,
      },
    })
    const vm = wrapper.vm
    expect(vm.$el.classList.contains('md-fade-center')).toEqual(false)
  })

  test('color', () => {
    const wrapper = mount(Tag, {
      props: {
        color: 'rgb(0, 0, 0)',
      },
    })
    const vm = wrapper.vm
    expect(vm.$el.style.backgroundColor).toEqual('rgb(0, 0, 0)')
  })

  test('theme', () => {
    const wrapper = mount(Tag, {
      props: {
        effect: 'dark',
      },
    })
    const vm = wrapper.vm
    const el = vm.$el
    expect(el.className.indexOf('dark') > -1).toEqual(true)
    expect(el.className.indexOf('ight') > -1).toEqual(false)
    expect(el.className.indexOf('plain') > -1).toEqual(false)
  })
})
