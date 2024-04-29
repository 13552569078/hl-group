import { nextTick } from 'vue'
import { mount } from '@vue/test-utils'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { rAF } from '@hongluan-ui/test-utils/tick'
import { HlPopperTrigger } from '@hongluan-ui/components/popper'
import Tooltip from '../src/tooltip.vue'

import type { VNode } from 'vue'

vi.mock('@hongluan-ui/utils/error', () => ({
  debugWarn: vi.fn(),
}))

const AXIOM = 'Rem is the best girl'

describe('<HlTooltip />', () => {
  const createComponent = (props: any = {}, content: string | VNode = '') =>
    mount(Tooltip, {
      slots: {
        default: () => AXIOM,
        content: () => content,
      },
      props,
      attachTo: document.body,
    })

  let wrapper: ReturnType<typeof createComponent>
  const findTrigger = () => wrapper.findComponent(HlPopperTrigger)

  afterEach(() => {
    wrapper?.unmount()
    document.body.innerHTML = ''
  })

  describe('rendering', () => {
    it('should render correctly', async () => {
      wrapper = createComponent()
      await nextTick()
      expect(findTrigger().text()).toContain(AXIOM)
    })
    it('content should teleport according appendTo', async () => {
      const el = document.createElement('div')
      el.id = 'test'
      document.body.appendChild(el)
      wrapper = createComponent({ appendTo: '#test' }, 'test appendTo props')
      await nextTick()
      const trigger$ = findTrigger()
      const triggerEl = trigger$.find('.tooltip-trigger')
      await triggerEl.trigger('mouseenter')
      expect(document.querySelector('#test')?.innerHTML).toContain(
        'test appendTo props',
      )
    })
  })

  describe('functionality', () => {
    const content = 'Test content'

    it('should be able to update popper content manually', async () => {
      wrapper = createComponent()
      await nextTick()

      const { vm }: { vm: any; } = wrapper
      expect(vm.updatePopper).toBeDefined()
      vm.updatePopper()
    })

    it('should be able to open & close tooltip content', async () => {
      wrapper = createComponent({}, content)
      await nextTick()

      const trigger$ = findTrigger()
      const triggerEl = trigger$.find('.tooltip-trigger')
      vi.useFakeTimers()

      await triggerEl.trigger('mouseenter')
      vi.runAllTimers()
      vi.useRealTimers()

      await rAF()

      expect(wrapper.emitted()).toHaveProperty('show')

      vi.useFakeTimers()
      await triggerEl.trigger('mouseleave') // dispatches a timer with 200ms timeout.
      vi.runAllTimers()
      vi.useRealTimers()

      await rAF()

      expect(wrapper.emitted()).toHaveProperty('hide')
    })

    it('should be able to toggle visibility of tooltip content', async () => {
      wrapper = createComponent(
        {
          trigger: 'click',
        },
        content,
      )
      await nextTick()

      const trigger$ = findTrigger()
      const triggerEl = trigger$.find('.tooltip-trigger')
      vi.useFakeTimers()

      await triggerEl.trigger('click')
      vi.runAllTimers()
      vi.useRealTimers()

      await rAF()
      expect(wrapper.emitted()).toHaveProperty('show')
      vi.useFakeTimers()

      await triggerEl.trigger('click')
      vi.runAllTimers()
      vi.useRealTimers()

      await rAF()
      expect(wrapper.emitted()).toHaveProperty('hide')
    })
  })
})
