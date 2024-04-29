import { nextTick } from 'vue'
import { mount } from '@vue/test-utils'
import { afterEach, describe, expect, test, vi } from 'vitest'
import { rAF } from '@hongluan-ui/test-utils/tick'
import { usePrefix } from '@hongluan-ui/test-utils/utils'
import { EVENT_CODE } from '@hongluan-ui/constants'
import { HlTooltip } from '@hongluan-ui/components/tooltip'
import HlButton from '@hongluan-ui/components/button'
import { usePopperContainerId } from '@hongluan-ui/hooks'
import Dropdown from '../src/dropdown.vue'
import DropdownItem from '../src/dropdown-item.vue'
import DropdownMenu from '../src/dropdown-menu.vue'

const { prefix, PREFIX } = usePrefix()
const MOUSE_ENTER_EVENT = 'mouseenter'
const MOUSE_LEAVE_EVENT = 'mouseleave'
const CONTEXTMENU = 'contextmenu'

const _mount = (template: string, data: any, otherObj?: any) =>
  mount({
    components: {
      [PREFIX + HlButton.name]: HlButton,
      [PREFIX + Dropdown.name]: Dropdown,
      [PREFIX + DropdownItem.name]: DropdownItem,
      [PREFIX + DropdownMenu.name]: DropdownMenu,
    },
    template,
    data,
    ...otherObj,
  })

describe('Dropdown', () => {
  afterEach(() => {
    document.body.innerHTML = ''
  })

  test('create', async () => {
    const wrapper = _mount(
      `
        <hl-dropdown ref="b" placement="right">
          <span class="hl-dropdown-link" ref="a">
            dropdown<i class="hl-icon-arrow-down hl-icon--right"></i>
          </span>
          <template #dropdown>
            <hl-dropdown-menu>
              <hl-dropdown-item>Apple</hl-dropdown-item>
              <hl-dropdown-item>Orange</hl-dropdown-item>
              <hl-dropdown-item>Cherry</hl-dropdown-item>
              <hl-dropdown-item disabled>Peach</hl-dropdown-item>
              <hl-dropdown-item divided>Pear</hl-dropdown-item>
            </hl-dropdown-menu>
          </template>
        </hl-dropdown>
      `,
      () => ({}),
    )
    await nextTick()
    const content = wrapper.findComponent(HlTooltip).vm as InstanceType<
      typeof HlTooltip
    >
    vi.useFakeTimers()
    const triggerElm = wrapper.find('.tooltip-trigger')
    expect(content.open).toBe(false)
    await triggerElm.trigger(MOUSE_ENTER_EVENT)
    vi.runAllTimers()
    expect(content.open).toBe(true)
    await triggerElm.trigger(MOUSE_LEAVE_EVENT)
    vi.runAllTimers()
    expect(content.open).toBe(false)
    vi.useRealTimers()

  })

  test('menu click', async () => {
    const commandHandler = vi.fn()
    const wrapper = _mount(
      `
      <hl-dropdown ref="b" @command="commandHandler" placement="right">
        <span class="hl-dropdown-link" ref="a">
          dropdown<i class="hl-icon-arrow-down hl-icon--right"></i>
        </span>
        <template #dropdown>
          <hl-dropdown-menu ref="menu">
            <hl-dropdown-item command="a">Apple</hl-dropdown-item>
            <hl-dropdown-item command="b">Orange</hl-dropdown-item>
            <hl-dropdown-item ref="c" :command="myCommandObject" class="command-item">Cherry</hl-dropdown-item>
            <hl-dropdown-item command="d">Peach</hl-dropdown-item>
            <hl-dropdown-item command="e">Pear</hl-dropdown-item>
          </hl-dropdown-menu>
        </template>
      </hl-dropdown>
      `,
      () => ({
        myCommandObject: { name: 'CommandC' },
        name: '',
      }),
      {
        methods: {
          commandHandler,
        },
      },
    )
    await nextTick()
    // const content = wrapper.findComponent({ ref: 'b' }).vm as any
    const triggerElm = wrapper.find('.tooltip-trigger')
    await triggerElm.trigger(MOUSE_ENTER_EVENT)
    await nextTick()
    await wrapper
      .findComponent({ ref: 'menu' })
      .find(`.command-item`)
      .trigger('click')
    await nextTick()
    expect(commandHandler).toHaveBeenCalled()
  })

  test('trigger', async () => {
    const wrapper = _mount(
      `
      <hl-dropdown trigger="click" ref="b" placement="right">
        <span class="hl-dropdown-link" ref="a">
          dropdown<i class="hl-icon-arrow-down hl-icon--right"></i>
        </span>
        <template #dropdown>
          <hl-dropdown-menu>
            <hl-dropdown-item command="a">Apple</hl-dropdown-item>
            <hl-dropdown-item command="b">Orange</hl-dropdown-item>
            <hl-dropdown-item ref="c" :command="myCommandObject">Cherry</hl-dropdown-item>
            <hl-dropdown-item command="d">Peach</hl-dropdown-item>
            <hl-dropdown-item command="e">Pear</hl-dropdown-item>
          </hl-dropdown-menu>
        </template>
      </hl-dropdown>
      `,
      () => ({
        myCommandObject: { name: 'CommandC' },
        name: '',
      }),
    )
    await nextTick()
    const content = wrapper.findComponent(HlTooltip).vm as InstanceType<
      typeof HlTooltip
    >
    const triggerElm = wrapper.find('.hl-dropdown-link')
    expect(content.open).toBe(false)
    await triggerElm.trigger(MOUSE_ENTER_EVENT)
    expect(content.open).toBe(false)
    await triggerElm.trigger('click', {
      button: 0,
    })
    await rAF()
    expect(content.open).toBe(true)
  })

  test('trigger contextmenu', async () => {
    const wrapper = _mount(
      `
      <hl-dropdown trigger="contextmenu" ref="b" placement="right">
        <span class="hl-dropdown-link" ref="a">
          dropdown<i class="hl-icon-arrow-down hl-icon--right"></i>
        </span>
        <template #dropdown>
          <hl-dropdown-menu>
            <hl-dropdown-item command="a">Apple</hl-dropdown-item>
            <hl-dropdown-item command="b">Orange</hl-dropdown-item>
            <hl-dropdown-item ref="c" :command="myCommandObject">Cherry</hl-dropdown-item>
            <hl-dropdown-item command="d">Peach</hl-dropdown-item>
            <hl-dropdown-item command="e">Pear</hl-dropdown-item>
          </hl-dropdown-menu>
        </template>
      </hl-dropdown>
      `,
      () => ({
        myCommandObject: { name: 'CommandC' },
        name: '',
      }),
    )
    await nextTick()
    const content = wrapper.findComponent(HlTooltip).vm as InstanceType<
      typeof HlTooltip
    >
    const triggerElm = wrapper.find('.hl-dropdown-link')
    expect(content.open).toBe(false)
    await triggerElm.trigger(CONTEXTMENU)
    await rAF()
    expect(content.open).toBe(true)
  })

  test('handleOpen and handleClose', async () => {
    const wrapper = _mount(
      `
      <hl-dropdown trigger="click" ref="refDropdown" placement="right">
        <span class="hl-dropdown-link" ref="a">
          dropdown<i class="hl-icon-arrow-down hl-icon--right"></i>
        </span>
        <template #dropdown>
          <hl-dropdown-menu>
            <hl-dropdown-item command="a">Apple</hl-dropdown-item>
            <hl-dropdown-item command="b">Orange</hl-dropdown-item>
            <hl-dropdown-item command="c">Cherry</hl-dropdown-item>
            <hl-dropdown-item command="d">Peach</hl-dropdown-item>
            <hl-dropdown-item command="e">Pear</hl-dropdown-item>
          </hl-dropdown-menu>
        </template>
      </hl-dropdown>
      `,
      () => ({
        name: '',
      }),
    )
    await nextTick()
    const dropdown = wrapper.vm
    const content = wrapper.findComponent(HlTooltip).vm as InstanceType<
      typeof HlTooltip
    >
    expect(content.open).toBe(false)
    await dropdown.$refs.refDropdown.handleOpen()
    await rAF()
    expect(content.open).toBe(true)
    await dropdown.$refs.refDropdown.handleClose()
    await rAF()
    expect(content.open).toBe(false)
  })

  test('split button', async () => {
    const handleClick = vi.fn()
    const wrapper = _mount(
      `
      <hl-dropdown  @click="handleClick" split="button" type="primary" ref="b" placement="right">
        dropdown
        <template #dropdown>
          <hl-dropdown-menu>
            <hl-dropdown-item command="a">Apple</hl-dropdown-item>
            <hl-dropdown-item command="b">Orange</hl-dropdown-item>
            <hl-dropdown-item ref="c" :command="myCommandObject">Cherry</hl-dropdown-item>
            <hl-dropdown-item command="d">Peach</hl-dropdown-item>
            <hl-dropdown-item command="e">Pear</hl-dropdown-item>
          </hl-dropdown-menu>
        </template>
      </hl-dropdown>
      `,
      () => ({
        myCommandObject: { name: 'CommandC' },
        name: '',
      }),
      {
        methods: {
          handleClick,
        },
      },
    )
    await nextTick()
    const content = wrapper.findComponent(HlTooltip).vm as InstanceType<
      typeof HlTooltip
    >
    const triggerElm = wrapper.find(`.caret-button`)
    const button = wrapper.find(`.${prefix}-button`)
    expect(content.open).toBe(false)
    await button.trigger('click')
    expect(handleClick).toHaveBeenCalled()
    vi.useFakeTimers()
    await triggerElm.trigger(MOUSE_ENTER_EVENT)
    vi.runAllTimers()
    expect(content.open).toBe(true)
    vi.useRealTimers()
  })

  test('hide on click', async () => {
    vi.useFakeTimers()
    const wrapper = _mount(
      `
      <hl-dropdown ref="b" placement="right" :hide-on-click="false">
        <span class="hl-dropdown-link" ref="a">
          dropdown<i class="hl-icon-arrow-down hl-icon--right"></i>
        </span>
        <template #dropdown>
          <hl-dropdown-menu>
            <hl-dropdown-item>Apple</hl-dropdown-item>
            <hl-dropdown-item>Orange</hl-dropdown-item>
            <hl-dropdown-item ref="c">Cherry</hl-dropdown-item>
            <hl-dropdown-item disabled>Peach</hl-dropdown-item>
            <hl-dropdown-item divided>Pear</hl-dropdown-item>
          </hl-dropdown-menu>
        </template>
      </hl-dropdown>
      `,
      () => ({}),
    )
    await nextTick()
    const content = wrapper.findComponent(HlTooltip).vm as InstanceType<
      typeof HlTooltip
    >
    expect(content.open).toBe(false)
    const triggerElm = wrapper.find('.tooltip-trigger')
    await triggerElm.trigger(MOUSE_ENTER_EVENT)
    vi.runAllTimers()
    expect(content.open).toBe(true)
    await wrapper
      .findComponent({ ref: 'c' })
      .findComponent({
        name: 'DropdownItemImpl',
      })
      .trigger('click')
    vi.runAllTimers()
    expect(content.open).toBe(true)
    vi.useRealTimers()
  })

  test('triggerElm keydown', async () => {
    vi.useFakeTimers()
    const wrapper = _mount(
      `
      <hl-dropdown ref="b" placement="right" :hide-on-click="false">
        <span class="hl-dropdown-link" ref="a">
          dropdown<i class="hl-icon-arrow-down hl-icon--right"></i>
        </span>
        <template #dropdown>
          <hl-dropdown-menu>
            <hl-dropdown-item>Apple</hl-dropdown-item>
            <hl-dropdown-item>Orange</hl-dropdown-item>
            <hl-dropdown-item ref="c">Cherry</hl-dropdown-item>
            <hl-dropdown-item disabled>Peach</hl-dropdown-item>
            <hl-dropdown-item divided>Pear</hl-dropdown-item>
          </hl-dropdown-menu>
        </template>
      </hl-dropdown>
      `,
      () => ({}),
    )
    await nextTick()
    const content = wrapper.findComponent(HlTooltip).vm as InstanceType<
      typeof HlTooltip
    >
    const triggerElm = wrapper.find('.tooltip-trigger')
    await triggerElm.trigger(MOUSE_ENTER_EVENT)
    vi.runAllTimers()
    await triggerElm.trigger('keydown', {
      code: EVENT_CODE.enter,
    })
    vi.runAllTimers()
    expect(content.open).toBe(false)

    await triggerElm.trigger(MOUSE_ENTER_EVENT)
    vi.runAllTimers()
    await triggerElm.trigger('keydown', {
      code: EVENT_CODE.tab,
    })
    vi.runAllTimers()
    expect(content.open).toBe(true)
    vi.useRealTimers()
  })

  test('dropdown menu keydown', async () => {
    const wrapper = _mount(
      `
      <hl-dropdown ref="b" placement="right" :hide-on-click="false">
        <span class="hl-dropdown-link">
          dropdown<i class="hl-icon-arrow-down hl-icon--right"></i>
        </span>
        <template #dropdown>
          <hl-dropdown-menu ref="a">
            <hl-dropdown-item ref="d" class="first-item">Apple</hl-dropdown-item>
            <hl-dropdown-item>Orange</hl-dropdown-item>
            <hl-dropdown-item ref="c">Cherry</hl-dropdown-item>
            <hl-dropdown-item disabled>Peach</hl-dropdown-item>
            <hl-dropdown-item divided>Pear</hl-dropdown-item>
          </hl-dropdown-menu>
        </template>
      </hl-dropdown>
      `,
      () => ({}),
    )
    await nextTick()
    const content = wrapper.findComponent({ ref: 'a' })
    const triggerElm = wrapper.find('.tooltip-trigger')
    await triggerElm.trigger(MOUSE_ENTER_EVENT)
    await rAF()
    await content.trigger('keydown', {
      code: EVENT_CODE.down,
    })
    await rAF()
    expect(content
      .find(`.first-item`)
      .element.getAttribute('tabindex'),
    ).toBe('0')
  })

  test('max height', async () => {
    const wrapper = _mount(
      `
      <hl-dropdown ref="b" max-height="60px">
        <span class="hl-dropdown-link" ref="a">
          dropdown<i class="hl-icon-arrow-down hl-icon--right"></i>
        </span>
        <template #dropdown>
          <hl-dropdown-menu>
            <hl-dropdown-item>Apple</hl-dropdown-item>
            <hl-dropdown-item>Orange</hl-dropdown-item>
            <hl-dropdown-item>Cherry</hl-dropdown-item>
            <hl-dropdown-item disabled>Peach</hl-dropdown-item>
            <hl-dropdown-item divided>Pear</hl-dropdown-item>
          </hl-dropdown-menu>
        </template>
      </hl-dropdown>
      `,
      () => ({}),
    )
    await nextTick()
    const scrollbar = wrapper
      .findComponent({
        ref: 'b',
      })
      .findComponent({ ref: 'scrollbar' })
    expect(scrollbar.find('.scrollbar-wrap').attributes('style')).toContain(
      'max-height: 60px;',
    )
  })

  test('tooltip debounce', async () => {
    vi.useFakeTimers()
    const wrapper = _mount(
      `
      <hl-dropdown ref="b">
        <span class="hl-dropdown-link">
          dropdown<i class="hl-icon-arrow-down hl-icon--right"></i>
        </span>
        <template #dropdown>
          <hl-dropdown-menu>
            <hl-dropdown-item>Apple</hl-dropdown-item>
            <hl-dropdown-item>Orange</hl-dropdown-item>
            <hl-dropdown-item>Cherry</hl-dropdown-item>
            <hl-dropdown-item>Peach</hl-dropdown-item>
            <hl-dropdown-item>Pear</hl-dropdown-item>
          </hl-dropdown-menu>
        </template>
      </hl-dropdown>
      `,
      () => ({}),
    )
    const content = wrapper.findComponent(HlTooltip).vm as InstanceType<
      typeof HlTooltip
    >
    const triggerElm = wrapper.find('.tooltip-trigger')
    expect(content.open).toBe(false)
    await triggerElm.trigger(MOUSE_ENTER_EVENT)
    await triggerElm.trigger(MOUSE_LEAVE_EVENT)
    await triggerElm.trigger(MOUSE_ENTER_EVENT)
    vi.runAllTimers()
    expect(content.open).toBe(true)
    vi.useRealTimers()
  })

  test('popperClass', async () => {
    const wrapper = await _mount(
      `
      <hl-dropdown ref="b" max-height="60px" popper-class="custom-popper-class">
        <span class="hl-dropdown-link" ref="a">
          dropdown<i class="hl-icon-arrow-down hl-icon--right"></i>
        </span>
        <template #dropdown>
          <hl-dropdown-menu>
            <hl-dropdown-item>Apple</hl-dropdown-item>
            <hl-dropdown-item>Orange</hl-dropdown-item>
            <hl-dropdown-item>Cherry</hl-dropdown-item>
            <hl-dropdown-item disabled>Peach</hl-dropdown-item>
            <hl-dropdown-item divided>Pear</hl-dropdown-item>
          </hl-dropdown-menu>
        </template>
      </hl-dropdown>
      `,
      () => ({}),
    )

    const popperElement = wrapper.findComponent({
      name: 'PopperContent',
    }).element

    expect(popperElement.classList.contains('custom-popper-class')).toBe(true)
  })

  test('custom attributes for dropdown items', async () => {
    const wrapper = _mount(
      `
      <hl-dropdown>
        <span class="hl-dropdown-link">
          Custom Attributes
        </span>
        <template #dropdown>
          <hl-dropdown-menu ref="menus">
            <hl-dropdown-item data-custom-attribute="hello">Item</hl-dropdown-item>
          </hl-dropdown-menu>
        </template>
      </hl-dropdown>
      `,
      () => ({}),
    )
    await nextTick()
    expect(
      (wrapper.findComponent({ ref: 'menus' })
        .find(`.${prefix}-dropdown-item`).element as any).dataset.customAttribute,
    ).toBe('hello')
  })

  test('disable normal dropdown', async () => {
    const wrapper = _mount(
      `
      <hl-dropdown disabled>
        <span class="hl-dropdown-link">
          Dropdown List
        </span>
        <template #dropdown>
          <hl-dropdown-menu>
            <hl-dropdown-item data-custom-attribute="hello">Item</hl-dropdown-item>
          </hl-dropdown-menu>
        </template>
      </hl-dropdown>
      `,
      () => ({}),
    )
    await nextTick()
    expect(
      wrapper
        .findComponent({
          name: 'Dropdown',
        })
        .classes(),
    ).toContain('is-disabled')
  })
  test('disable dropdown with split button', async () => {
    const wrapper = _mount(
      `
      <hl-dropdown disabled split="button">
        <span class="hl-dropdown-link">
          Dropdown List
        </span>
        <template #dropdown>
          <hl-dropdown-menu>
            <hl-dropdown-item data-custom-attribute="hello">Item</hl-dropdown-item>
          </hl-dropdown-menu>
        </template>
      </hl-dropdown>
      `,
      () => ({}),
    )
    await nextTick()
    expect(
      wrapper
        .findAllComponents({
          name: 'Button',
        })[0]
        .classes(),
    ).toContain('is-disabled')
    expect(
      wrapper
        .findAllComponents({
          name: 'Button',
        })[1]
        .classes(),
    ).toContain('is-disabled')
  })

  test('set show-timeout/hide-timeout when trigger is hover', async () => {
    const wrapper = _mount(
      `
      <hl-dropdown trigger="hover" :show-timeout="200" :hide-timeout="300">
        <span class="hl-dropdown-link">
          Dropdown List
        </span>
        <template #dropdown>
          <hl-dropdown-menu>
            <hl-dropdown-item>Item</hl-dropdown-item>
          </hl-dropdown-menu>
        </template>
      </hl-dropdown>
      `,
      () => ({}),
    )
    const tooltipElement = wrapper.getComponent({
      name: 'Tooltip',
    })
    expect(tooltipElement.vm.showAfter).toBe(200)
    expect(tooltipElement.vm.hideAfter).toBe(300)
  })

  test('ignore show-timeout/hide-timeout when trigger is not hover', async () => {
    const wrapper = _mount(
      `
      <hl-dropdown trigger="click" :show-timeout="200" :hide-timeout="300">
        <span class="hl-dropdown-link">
          Dropdown List
        </span>
        <template #dropdown>
          <hl-dropdown-menu>
            <hl-dropdown-item>Item</hl-dropdown-item>
          </hl-dropdown-menu>
        </template>
      </hl-dropdown>
      `,
      () => ({}),
    )
    const tooltipElement = wrapper.getComponent({
      name: 'Tooltip',
    })
    expect(tooltipElement.vm.showAfter).toBe(0)
    expect(tooltipElement.vm.hideAfter).toBe(0)
  })

  describe('accessibility', () => {
    test('Custom span trigger has proper attributes', async () => {
      const wrapper = _mount(
        `
        <hl-dropdown>
          <span class="hl-dropdown-link" data-test-ref="trigger">
            Dropdown List
          </span>
          <template #dropdown>
            <hl-dropdown-menu ref="menu">
              <hl-dropdown-item>Item</hl-dropdown-item>
            </hl-dropdown-menu>
          </template>
        </hl-dropdown>
        `,
        () => ({}),
      )
      await nextTick()
      const trigger = wrapper.find('[data-test-ref="trigger"]')
      const menu = wrapper.findComponent({ ref: 'menu' })
      expect(trigger.attributes()['role']).toBe('button')
      expect(trigger.attributes()['tabindex']).toBe('0')
      expect(trigger.attributes()['aria-haspopup']).toBe('menu')
      expect(trigger.attributes()['id']).toBe(
        menu.attributes()['aria-labelledby'],
      )
      expect(trigger.attributes()['aria-controls']).toBe(
        menu.attributes()['id'],
      )
    })

    test('HlButton trigger has proper attributes', async () => {
      const wrapper = _mount(
        `
        <hl-dropdown>
          <hl-button ref="trigger">
            Dropdown List
          </hl-button>
          <template #dropdown>
            <hl-dropdown-menu ref="menu">
              <hl-dropdown-item>Item</hl-dropdown-item>
            </hl-dropdown-menu>
          </template>
        </hl-dropdown>
        `,
        () => ({}),
      )
      await nextTick()
      const trigger = wrapper.findComponent({ ref: 'trigger' })
      const menu = wrapper.findComponent({ ref: 'menu' })
      expect(trigger.attributes()['role']).toBe('button')
      expect(trigger.attributes()['tabindex']).toBe('0')
      expect(trigger.attributes()['aria-haspopup']).toBe('menu')
      expect(trigger.attributes()['id']).toBe(
        menu.attributes()['aria-labelledby'],
      )
      expect(trigger.attributes()['aria-controls']).toBe(
        menu.attributes()['id'],
      )
    })

    test('Split button trigger has proper attributes', async () => {
      const wrapper = _mount(
        `
        <hl-dropdown split="button">
          <template #dropdown>
            <hl-dropdown-menu ref="menu">
              <hl-dropdown-item>Item</hl-dropdown-item>
            </hl-dropdown-menu>
          </template>
        </hl-dropdown>
        `,
        () => ({}),
      )
      await nextTick()
      const trigger = wrapper.find('.caret-button')
      const menu = wrapper.findComponent({ ref: 'menu' })
      expect(trigger.attributes()['role']).toBe('button')
      expect(trigger.attributes()['tabindex']).toBe('0')
      expect(trigger.attributes()['aria-haspopup']).toBe('menu')
      expect(trigger.attributes()['id']).toBe(
        menu.attributes()['aria-labelledby'],
      )
      expect(trigger.attributes()['aria-controls']).toBe(
        menu.attributes()['id'],
      )
    })

    test('Menu items with "menu" role', async () => {
      const wrapper = _mount(
        `
        <hl-dropdown split="button">
          <template #dropdown>
            <hl-dropdown-menu ref="menu">
              <hl-dropdown-item ref="menu-item">Item</hl-dropdown-item>
            </hl-dropdown-menu>
          </template>
        </hl-dropdown>
        `,
        () => ({}),
      )
      const menu = wrapper.findComponent({ ref: 'menu' })
      const menuItem = menu.find(`.${prefix}-dropdown-item`)
      expect(menu.attributes()['role']).toBe('menu')
      expect(menuItem.attributes()['role']).toBe('menuitem')
    })

    test('Menu items with "navigation" role', async () => {
      const wrapper = _mount(
        `
        <hl-dropdown split="button" role="navigation">
          <template #dropdown>
            <hl-dropdown-menu ref="menu">
              <hl-dropdown-item ref="menu-item">Item</hl-dropdown-item>
            </hl-dropdown-menu>
          </template>
        </hl-dropdown>
        `,
        () => ({}),
      )
      const menu = wrapper.findComponent({ ref: 'menu' })
      const menuItem = menu.find(`.${prefix}-dropdown-item`)
      expect(menu.attributes()['role']).toBe('navigation')
      expect(menuItem.attributes()['role']).toBe('link')
    })

    test('Menu items with "group" role', async () => {
      const wrapper = _mount(
        `
        <hl-dropdown split="button" role="group">
          <template #dropdown>
            <hl-dropdown-menu ref="menu">
              <hl-dropdown-item ref="menu-item">Item</hl-dropdown-item>
            </hl-dropdown-menu>
          </template>
        </hl-dropdown>
        `,
        () => ({}),
      )
      const menu = wrapper.findComponent({ ref: 'menu' })
      const menuItem = menu.find(`.${prefix}-dropdown-item`)
      expect(menu.attributes()['role']).toBe('group')
      expect(menuItem.attributes()['role']).toBe('button')
    })
  })

  describe('teleported API', () => {
    test('should mount on popper container', async () => {
      expect(document.body.innerHTML).toBe('')
      _mount(
        `
        <hl-dropdown ref="b" placement="right">
          <span class="hl-dropdown-link" ref="a">
            dropdown<i class="hl-icon-arrow-down hl-icon--right"></i>
          </span>
          <template #dropdown>
            <hl-dropdown-menu>
              <hl-dropdown-item>Apple</hl-dropdown-item>
              <hl-dropdown-item>Orange</hl-dropdown-item>
              <hl-dropdown-item>Cherry</hl-dropdown-item>
              <hl-dropdown-item disabled>Peach</hl-dropdown-item>
              <hl-dropdown-item divided>Pear</hl-dropdown-item>
            </hl-dropdown-menu>
          </template>
        </hl-dropdown>`,
        () => ({}),
      )

      await nextTick()
      const { selector } = usePopperContainerId()
      expect(document.body.querySelector(selector.value)?.innerHTML).not.toBe('')
    })

    test('should not mount on the popper container', async () => {
      expect(document.body.innerHTML).toBe('')
      _mount(
        `
        <hl-dropdown ref="b" placement="right" :teleported="false">
          <span class="hl-dropdown-link" ref="a">
            dropdown<i class="hl-icon-arrow-down hl-icon--right"></i>
          </span>
          <template #dropdown>
            <hl-dropdown-menu>
              <hl-dropdown-item>Apple</hl-dropdown-item>
              <hl-dropdown-item>Orange</hl-dropdown-item>
              <hl-dropdown-item>Cherry</hl-dropdown-item>
              <hl-dropdown-item disabled>Peach</hl-dropdown-item>
              <hl-dropdown-item divided>Pear</hl-dropdown-item>
            </hl-dropdown-menu>
          </template>
        </hl-dropdown>`,
        () => ({}),
      )

      await nextTick()
      const { selector } = usePopperContainerId()
      expect(document.body.querySelector(selector.value)?.innerHTML).toBe('')
    })
  })

})
