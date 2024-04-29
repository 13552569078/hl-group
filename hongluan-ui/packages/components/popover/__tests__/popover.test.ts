import { h, nextTick } from 'vue'
import { mount as _mount } from '@vue/test-utils'
import { useZIndex, usePopperContainerId } from '@hongluan-ui/hooks'
import { afterEach, describe, expect, it, test, vi } from 'vitest'
import makeMount from '@hongluan-ui/test-utils/make-mount'
import { rAF } from '@hongluan-ui/test-utils/tick'
import { usePrefix } from '@hongluan-ui/test-utils/utils'
import { HlPopperTrigger } from '@hongluan-ui/components/popper'
import Popover from '../src/popover.vue'

const AXIOM = 'Rem is the best girl'

const mount = makeMount(Popover, {
  slots: {
    default: () => AXIOM,
    reference: () => h('button', 'click me'),
  },
  props: {},
  global: {
    attachTo: document.body,
  },
})
describe('Popover.vue', () => {
  const { prefix } = usePrefix()
  let wrapper: ReturnType<typeof mount>
  const findContentComp = () =>
    wrapper.findComponent({
      name: 'PopperContent',
    })

  afterEach(() => {
    wrapper?.unmount()
    document.body.innerHTML = ''
  })

  test('render test', () => {
    wrapper = mount()

    expect(findContentComp().text()).toEqual(AXIOM)
  })

  test('should render with title', () => {
    const title = 'test title'
    wrapper = mount({
      props: {
        title,
      },
    })

    expect(findContentComp().text()).toContain(title)
  })

  test("should modify popover's style with width", async () => {
    wrapper = mount({
      props: {
        width: 200,
      },
    })

    const popperContent = findContentComp()
    expect(getComputedStyle(popperContent.element).width).toBe('200px')

    await wrapper.setProps({
      width: '100vw',
    })

    expect(getComputedStyle(popperContent.element).width).toBe('100vw')
  })

  test('the content should be overrode by slots', () => {
    const content = 'test content'
    wrapper = mount({
      props: {
        content,
      },
    })
    expect(findContentComp().text()).toContain(AXIOM)
  })

  test('should render content when no slots were passed', () => {
    const content = 'test content'
    const virtualRef = document.createElement('button')
    wrapper = makeMount(Popover, {
      props: {
        content,
        teleported: false,
        virtualRef,
        virtualTriggering: true,
      },
    })()

    expect(findContentComp().text()).toBe(content)
  })

  test('popper z-index should be dynamical', () => {
    wrapper = mount()

    const { currentZIndex } = useZIndex()
    expect(
      Number.parseInt(window.getComputedStyle(findContentComp().element).zIndex),
    ).toBeLessThanOrEqual(currentZIndex.value)
  })

  test('defind hide method', async () => {
    wrapper = mount()
    const vm = wrapper.vm as any
    expect(vm.hide).toBeDefined()
  })

  test('should be able to emit after-enter and after-leave', async () => {
    const wrapper = mount({
      attrs: {
        trigger: 'click',
      },
    })
    await nextTick()
    const trigger$ = wrapper.findComponent(HlPopperTrigger)
    const triggerEl = trigger$.find('.tooltip-trigger')
    vi.useFakeTimers()
    await triggerEl.trigger('click')
    vi.runAllTimers()
    vi.useRealTimers()

    await rAF()
    expect(wrapper.emitted()).toHaveProperty('after-enter')

    vi.useFakeTimers()
    await triggerEl.trigger('click')
    vi.runAllTimers()
    vi.useRealTimers()
    await rAF()
    expect(wrapper.emitted()).toHaveProperty('after-leave')
  })

  test('test visible controlled mode trigger invalid', async () => {
    const wrapper = _mount(
      {
        components: {
          Popover,
        },
        template: `
          <Popover
            :visible="visible"
            trigger="click"
            :content="content"
          >
          <template #reference>
            <button>click me</button>
          </template>
          </Popover>
        `,
        data() {
          return {
            visible: false,
            content: AXIOM,
          }
        },
      },
      {
        attachTo: 'body',
      },
    )
    await nextTick()
    const trigger$ = wrapper.findComponent(HlPopperTrigger)
    const triggerEl = trigger$.find('.tooltip-trigger')
    const popoverDom = document.querySelector<HTMLElement>(`.${prefix}-popper`)

    vi.useFakeTimers()
    await triggerEl.trigger('click')
    vi.runAllTimers()
    vi.useRealTimers()
    await rAF()
    expect(popoverDom?.style.display).toBe('none')

    vi.useFakeTimers()
    wrapper.vm.visible = true
    vi.runAllTimers()
    vi.useRealTimers()
    await rAF()
    expect(popoverDom?.style.display).not.toBe('none')

    vi.useFakeTimers()
    wrapper.vm.visible = false
    vi.runAllTimers()
    vi.useRealTimers()
    await rAF()
    expect(popoverDom?.style.display).toBe('none')
  })

  test('test v-model:visible', async () => {
    const wrapper = _mount(
      {
        components: {
          Popover,
        },
        template: `
          <Popover
            v-model:visible="visible"
            trigger="click"
            :content="content"
          >
          <template #reference>
            <button>click me</button>
          </template>
          </Popover>
        `,
        data() {
          return {
            visible: false,
            content: AXIOM,
          }
        },
      },
      {
        attachTo: 'body',
      },
    )
    await nextTick()
    const trigger$ = wrapper.findComponent(HlPopperTrigger)
    const triggerEl = trigger$.find('.tooltip-trigger')
    const popoverDom = document.querySelector<HTMLElement>(`.${prefix}-popper`)

    vi.useFakeTimers()
    await triggerEl.trigger('click')
    vi.runAllTimers()
    vi.useRealTimers()
    await rAF()
    expect(popoverDom?.style.display).not.toBe('none')

    vi.useFakeTimers()
    await triggerEl.trigger('click')
    vi.runAllTimers()
    vi.useRealTimers()
    await rAF()
    expect(popoverDom?.style.display).toBe('none')
  })

  describe('teleported API', () => {
    it('should mount on popper container', async () => {
      expect(document.body.innerHTML).toBe('')
      mount()

      await nextTick()
      const { selector } = usePopperContainerId()
      expect(document.body.querySelector(selector.value)?.innerHTML).not.toBe(
        '',
      )
    })

    it('should not mount on the popper container', async () => {
      expect(document.body.innerHTML).toBe('')
      mount({
        props: { teleported: false },
      })

      await nextTick()
      const { selector } = usePopperContainerId()
      expect(document.body.querySelector(selector.value)?.innerHTML).toBe('')
    })
  })
})
