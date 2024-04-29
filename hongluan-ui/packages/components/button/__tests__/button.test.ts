import { mount } from '@vue/test-utils'
import { describe, expect, it, test } from 'vitest'
import { usePrefix } from '@hongluan-ui/test-utils/utils'
import Button from '../src/button.vue'
import { defineComponent, h } from 'vue'

const AXIOM = 'Rem is the best girl'

describe('Button.vue', () => {
  const { prefix } = usePrefix()
  it('create', () => {
    const wrapper = mount(Button, {
      props: { type: 'primary' },
    })
    expect(wrapper.classes()).toContain('primary')
  })
  it('nativeType', () => {
    const wrapper = mount(Button, {
      props: { nativeType: 'submit' },
    })
    expect(wrapper.attributes('type')).toBe('submit')
  })
  it('loading', () => {
    const wrapper = mount(Button, {
      props: { loading: true },
    })
    expect(wrapper.classes()).toContain('is-loading')
    expect(wrapper.find(`.${prefix}-spinner`).exists()).toBeTruthy()
  })
  it('size', () => {
    const wrapper = mount(Button, {
      props: { size: 'lg' },
    })
    expect(wrapper.classes()).toContain('lg')
  })
  it('no fill', () => {
    const wrapper = mount(Button, {
      props: { noFill: true },
    })
    expect(wrapper.classes()).toContain('no-fill')
  })
  it('round', () => {
    const wrapper = mount(Button, {
      props: { round: true },
    })
    expect(wrapper.classes()).toContain('round')
  })
  it('equal', () => {
    const wrapper = mount(Button, {
      props: { equal: true },
    })
    expect(wrapper.classes()).toContain('equal')
  })

  test('render text', () => {
    const wrapper = mount(Button, {
      slots: {
        default: AXIOM,
      },
    })
    expect(wrapper.text()).toEqual(AXIOM)
  })

  test('handle click', async () => {
    const wrapper = mount(Button, {
      slots: {
        default: AXIOM,
      },
    })
    await wrapper.trigger('click')
    expect(wrapper.emitted()).toBeDefined()

  })

  test('handle click inside', async () => {
    const wrapper = mount(Button, {
      slots: {
        default: '<span class="inner-slot"></span>',
      },
    })
    await (<HTMLElement>wrapper.element.querySelector('.inner-slot')).click()
    expect(wrapper.emitted()).toBeDefined()
  })

  test('loading implies disabled', async () => {
    const wrapper = mount(Button, {
      slots: {
        default: AXIOM,
      },
      props: { loading: true },
    })
    await wrapper.trigger('click')
    expect(wrapper.emitted('click')).toBeUndefined()
  })

  it('disabled', async () => {
    const wrapper = mount(Button, {
      props: { disabled: true },
    })
    expect(wrapper.classes()).toContain('is-disabled')
    await wrapper.trigger('click')
    expect(wrapper.emitted('click')).toBeUndefined()
  })

  it('loading slot', () => {
    const App = defineComponent({
      setup() {
        return () =>
          h(
            Button,
            {
              loading: true,
            },
            {
              default: () => 'Loading',
              loading: () => h(
                'span',
                {
                  class: 'custom-loading',
                },
                ['111'],
              ),
            },
          )
      },
    })
    const wrapper = mount(App)
    expect(wrapper.find('.custom-loading').exists()).toBeTruthy()
  })

})
