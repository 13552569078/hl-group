import { nextTick } from 'vue'
import { describe, expect, test, vi } from 'vitest'
import { usePrefix } from '@hongluan-ui/test-utils/utils'
import { mount } from '@vue/test-utils'
import { rAF } from '@hongluan-ui/test-utils/tick'
import triggerCompositeClick from '@hongluan-ui/test-utils/composite-click'
import Dialog from '../'
import type { Indexable } from '@hongluan-ui/utils'


const AXIOM = 'Rem is the best girl'
const defaultSlots = { default: () => AXIOM }

const _mount = ({ slots, ...rest }: Indexable<any>): any => {
  return mount(Dialog, {
    slots: {
      default: AXIOM,
      ...slots,
    },
    ...rest,
  })
}

describe('Dialog.vue', () => {
  const { prefix } = usePrefix()
  test('render test', async () => {
    const wrapper = _mount({
      slots: {
        default: AXIOM,
      },
      props: {
        modelValue: true,
      },
    })

    await nextTick()
    await rAF()
    await nextTick()
    expect(wrapper.find('.panel-body').text()).toEqual(AXIOM)
  })

  test('dialog should have a title when title has been given', async () => {
    const HEADER = 'I am header'
    let wrapper = _mount({
      slots: {
        header: HEADER,
      },
      props: {
        modelValue: true,
      },
    })
    await nextTick()
    expect(wrapper.find('.panel-header').text()).toBe(HEADER)

    wrapper = _mount({
      props: {
        title: HEADER,
        modelValue: true,
      },
    })
    await nextTick()

    expect(wrapper.find('.panel-header').text()).toBe(HEADER)
  })

  test('dialog should have a footer when footer has been given', async () => {
    const wrapper = _mount({
      slots: {
        footer: AXIOM,
      },
      props: {
        modelValue: true,
      },
    })
    await nextTick()
    expect(wrapper.find('.panel-footer').exists()).toBe(true)
    expect(wrapper.find('.panel-footer').text()).toBe(AXIOM)
  })

  test('should append dialog to body when appendToBody is true', async () => {
    const wrapper = _mount({
      props: {
        appendToBody: true,
        modelValue: true,
      },
    })
    await nextTick()
    expect(
      document.body.firstElementChild?.classList.contains(prefix + '-overlay'),
    ).toBe(true)
    wrapper.unmount()
  })

  test('should center dialog', async () => {
    const wrapper = _mount({
      props: {
        modelValue: true,
      },
    })
    await nextTick()
    expect(wrapper.find('.at-center').exists()).toBe(true)
  })

  test('should show close button', async () => {
    const wrapper = _mount({
      props: {
        modelValue: true,
      },
    })
    await nextTick()
    expect(wrapper.find('.panel-close').exists()).toBe(true)
  })

  test('should hide close button when showClose = false', async () => {
    const wrapper = _mount({
      props: {
        modelValue: true,
        showClose: false,
      },
    })
    await nextTick()
    expect(wrapper.find('.panel-close').exists()).toBe(false)
  })

  test('should close dialog when click on close button', async () => {
    const wrapper = _mount({
      props: {
        modelValue: true,
      },
    })
    await nextTick()
    await wrapper.find('.panel-close').trigger('click')
    expect(wrapper.vm.visible).toBe(false)
  })

  describe('mask related', () => {
    test('should not have overlay mask when mask is false', async () => {
      const wrapper = _mount({
        props: {
          modal: false,
          modelValue: true,
        },
      })
      await nextTick()
      expect(wrapper.find(`.${prefix}-overlay`).exists()).toBe(false)
    })

    test('should close the modal when clicking on mask when `closeOnClickModal` is true', async () => {
      const wrapper = _mount({
        props: {
          modelValue: true,
        },
      })
      await nextTick()
      expect(wrapper.find(`.${prefix}-overlay`).exists()).toBe(true)

      await triggerCompositeClick(wrapper.find(`.${prefix}-overlay`))
      expect(wrapper.vm.visible).toBe(false)
    })
  })

  describe('life cycles', () => {
    test('should call before close', async () => {
      const beforeClose = vi.fn()
      const wrapper = _mount({
        props: {
          beforeClose,
          modelValue: true,
        },
      })
      await nextTick()
      await wrapper.find('.panel-close').trigger('click')
      expect(beforeClose).toHaveBeenCalled()
    })

    test('should not close dialog when user cancelled', async () => {
      const beforeClose = vi
        .fn()
        .mockImplementation((hide: (cancel: boolean) => void) => hide(true))

      const wrapper = _mount({
        props: {
          beforeClose,
          modelValue: true,
        },
      })
      await nextTick()
      await wrapper.find('.panel-close').trigger('click')
      expect(beforeClose).toHaveBeenCalled()
      expect(wrapper.vm.visible).toBe(true)
    })

    test('should open and close with delay', async () => {
      const wrapper = _mount({
        props: {
          openDelay: 200,
          closeDelay: 200,
          modelValue: false,
        },
      })

      expect(wrapper.vm.visible).toBe(false)

      await wrapper.setProps({
        modelValue: true,
      })

      // expect(wrapper.vm.visible).toBe(false)

      // vi.runOnlyPendingTimers()

      // expect(wrapper.vm.visible).toBe(true)
    })

    test('should destroy on close', async () => {
      const wrapper = _mount({
        props: {
          modelValue: true,
          destroyOnClose: true,
        },
      })
      expect(wrapper.vm.visible).toBe(true)
      await nextTick()
      await rAF()
      await nextTick()
      await wrapper.find('.panel-close').trigger('click')
      await wrapper.setProps({
        // manually setting this prop because that Transition is not available in testing,
        // updating model value event was emitted via transition hooks.
        modelValue: false,
      })
      await nextTick()
      await rAF()
      await nextTick()
      await rAF()
      await nextTick()
      expect(wrapper.find('.panel-body').exists()).toBe(false)
    })

    test('should emit close event', async () => {
      let visible = true
      const onClose = vi.fn()
      const onClosed = vi.fn()
      const wrapper = _mount({
        props: {
          modelValue: visible,
          'onUpdate:modelValue': (val: boolean) => visible = val,
          onClose,
          onClosed,
        },
      })

      expect(wrapper.vm.visible).toBe(true)
      await nextTick()
      await rAF()
      await nextTick()

      await triggerCompositeClick(wrapper.find(`.${prefix}-overlay`))
      await nextTick()
      await rAF()
      await nextTick()
      expect(onClose).toHaveBeenCalled()
      expect(onClosed).toHaveBeenCalled()
      expect(visible).toBe(false)
    })
  })

  describe('drawer cases', () => {
    test('should show as drawer', async () => {
      const wrapper = _mount({
        props: {
          showAs: 'drawer',
          modelValue: true,
        },
      })
      await nextTick()
      await rAF()
      await nextTick()
      expect(wrapper.find(`[role=drawer]`).exists()).toBe(true)
    })

    test('should placement left', async () => {
      const wrapper = _mount({
        props: {
          showAs: 'drawer',
          placement: 'left',
          width: '50%',
          modelValue: true,
        },
      })
      await nextTick()
      await rAF()
      await nextTick()
      expect(wrapper.find('.at-left').exists()).toBe(true)
      expect(wrapper.find(`[role=drawer]`).exists()).toBe(true)
      expect(wrapper.find(`[role=drawer] .${prefix}-panel`).element.getAttribute('style').indexOf('height: 100%') === -1).toBeTruthy()
      expect(wrapper.find(`[role=drawer] .${prefix}-panel`).element.getAttribute('style').indexOf('width: 50%') === -1).toBeFalsy()

    })

    test('should placement top', async () => {
      const wrapper = _mount({
        props: {
          showAs: 'drawer',
          placement: 'top',
          height: '200px',
          modelValue: true,
        },
      })
      await nextTick()
      await rAF()
      await nextTick()
      expect(wrapper.find('.at-top').exists()).toBe(true)
      expect(wrapper.find(`[role=drawer]`).exists()).toBe(true)
      expect(wrapper.find(`[role=drawer] .${prefix}-panel`).element.getAttribute('style').indexOf('width: 100%') === -1).toBeTruthy()
      expect(wrapper.find(`[role=drawer] .${prefix}-panel`).element.getAttribute('style').indexOf('height: 200px') === -1).toBeFalsy()
    })

    test('should render draggable prop', async () => {
      const wrapper = _mount({
        slots: {
          default: AXIOM,
        },
        props: {
          modelValue: true,
          draggable: true,
        },
      })

      await nextTick()
      await rAF()
      await nextTick()
      expect(wrapper.find('.is-draggable').exists()).toBe(true)
    })

  })
})

describe('accessibility', () => {
  test('title attribute should set aria-label', async () => {
    const title = 'Hello World'
    const wrapper = mount(Dialog, {
      slots: defaultSlots,
      props: {
        modelValue: true,
        title,
      },
    })
    await nextTick()
    const dialog = wrapper.find('[role="dialog"]')
    expect(dialog.attributes()['aria-label']).toBe(title)
    expect(dialog.attributes()['aria-labelledby']).toBeFalsy()
  })

  test('missing title attribute should point to header slot content', async () => {
    const wrapper = mount(Dialog, {
      slots: {
        ...defaultSlots,
        header: `
          <template #header="{ titleId, titleClass }">
            <h5 :id="titleId" :class="titleClass" />
          </template>
        `,
      },
      props: {
        modelValue: true,
      },
    })
    await nextTick()
    const dialog = wrapper.find('[role="dialog"]')
    const dialogTitle = wrapper.find('.panel-title')
    expect(dialog.attributes()['aria-label']).toBeFalsy()
    expect(dialog.attributes()['aria-labelledby']).toBe(
      dialogTitle.attributes().id,
    )
  })

  test('aria-describedby should point to modal body', async () => {
    const wrapper = mount(Dialog, {
      slots: defaultSlots,
      props: {
        modelValue: true,
      },
    })
    await nextTick()
    const dialog = wrapper.find('[role="dialog"]')
    const dialogBody = wrapper.find('.panel-body')
    expect(dialog.attributes()['aria-describedby']).toBe(
      dialogBody.attributes().id,
    )
  })
})
