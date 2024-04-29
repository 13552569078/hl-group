import { nextTick } from 'vue'
import { mount } from '@vue/test-utils'
import dayjs from 'dayjs'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { usePrefix } from '@hongluan-ui/test-utils/utils'
import { HlFormItem } from '@hongluan-ui/components/form-item'
import customParseFormat from 'dayjs/plugin/customParseFormat.js'
import Option from '@hongluan-ui/components/option'
import TimeSelect from '../src/time-select.vue'
dayjs.extend(customParseFormat)

const { prefix } = usePrefix()

const _mount = (template: string, data: any, otherObj?: any) =>
  mount(
    {
      components: {
        'hl-time-select': TimeSelect,
        'hl-form-item': HlFormItem,
      },
      template,
      data,
      ...otherObj,
    },
    {
      attachTo: 'body',
    },
  )

afterEach(() => {
  document.documentElement.innerHTML = ''
})

describe('TimeSelect', () => {
  it('create', async () => {
    const wrapper = _mount(
      `<hl-time-select :style="{color:'red'}" class="customClass" />`,
      () => ({
        readonly: true,
      }),
    )
    const outerInput = wrapper.find(`.${prefix}-input-select`)
    expect(outerInput.classes()).toContain('customClass')
    expect(outerInput.attributes().style).toBeDefined()
  })

  it('set default value', async () => {
    const wrapper = _mount(`<hl-time-select v-model="value" />`, () => ({
      value: '14:30',
    }))
    const input = wrapper.find('input')
    input.trigger('blur')
    input.trigger('focus')
    await nextTick()
    expect(document.querySelector('.is-selected')).toBeDefined()
    expect(document.querySelector('.is-selected')?.textContent).toBe('14:30')
  })

  it('set minTime', async () => {
    const wrapper = _mount(`<hl-time-select minTime="14:30" />`, () => ({}))
    const input = wrapper.find('input')
    input.trigger('blur')
    input.trigger('focus')
    await nextTick()
    const elms = document.querySelectorAll('.is-disabled')
    const elm = elms[elms.length - 1]
    expect(elm.textContent).toBe('14:30')
  })

  it('set maxTime', async () => {
    const wrapper = _mount(`<hl-time-select maxTime="14:30" />`, () => ({}))
    const input = wrapper.find('input')
    input.trigger('blur')
    input.trigger('focus')
    await nextTick()
    const elm = document.querySelector('.is-disabled')
    expect(elm?.textContent).toBe('14:30')
  })

  it('set value update', async () => {
    const wrapper = _mount(`<hl-time-select v-model="value" />`, () => ({
      value: '10:00',
    }))
    await nextTick()

    const input = wrapper.find('input')

    expect(input.exists()).toBe(true)
    expect(input.element.value).toBe('10:00')
    // wrapper.setData is not supported until version 2.0.0-beta.8
    // change value directly on `wrapper.vm`
    const vm = wrapper.vm as any
    vm.value = '10:30'
    await nextTick()
    expect(vm.value).toBe('10:30')
    expect(input.element.value).toBe('10:30')
  })

  it('update value', async () => {
    const wrapper = _mount(`<hl-time-select v-model="value" />`, () => ({
      value: '10:00',
    }))
    await nextTick()
    const vm = wrapper.vm as any
    const input = wrapper.find('input')
    expect(vm.value).toBe('10:00')
    expect(input.element.value).toBe('10:00')

    const option = wrapper
      .findAllComponents(Option)
      .find(w => w.text().trim() === '11:00')

    expect(option?.exists()).toBe(true)
    option?.trigger('click')
    await nextTick()
    expect(vm.value).toBe('11:00')
    expect(input.element.value).toBe('11:00')
  })

  it('set disabled', async () => {
    const wrapper = _mount(
      `<hl-time-select v-model="value" :disabled="disabled" />`,
      () => ({
        value: '10:00',
        disabled: false,
      }),
    )
    const vm = wrapper.vm as any
    const select = wrapper.findComponent({ name: 'Select' })
    expect(select.props().disabled).toBe(false)

    vm.disabled = true
    await nextTick()
    expect(select.props().disabled).toBe(true)
  })

  it('set editable', async () => {
    const wrapper = _mount(
      `<hl-time-select v-model="value" :editable="editable" />`,
      () => ({
        value: '10:00',
        editable: false,
      }),
    )
    const vm = wrapper.vm as any
    const select = wrapper.findComponent({ name: 'Select' })
    expect(select.props().filterable).toBe(false)

    vm.editable = true
    await nextTick()
    expect(select.props().filterable).toBe(true)
  })

  it('ref focus', async () => {
    _mount(`<hl-time-select ref="input" />`, () => ({}), {
      mounted() {
        this.$refs.input.focus()
      },
    })
    await nextTick()
    await nextTick()

    const popperEl = document.querySelector(`.${prefix}-select-popper`)
    const attr = popperEl?.getAttribute('aria-hidden')
    expect(attr).toEqual('false')
  })

  it('ref blur', async () => {
    _mount(`<hl-time-select ref="input" />`, () => ({}), {
      async mounted() {
        this.$refs.input.focus()
        await nextTick()
        this.$refs.input.blur()
      },
    })
    await nextTick()
    await nextTick()
    const popperEl = document.querySelector(`.${prefix}-select-popper`)
    const attr = popperEl?.getAttribute('aria-hidden')
    expect(attr).toEqual('true')
  })

  it('set format', async () => {
    const wrapper = _mount(
      `<hl-time-select
    v-model="value"
    start="13:00"
    step="00:30"
    end="13:30"
    format="hh:mm A"
  >
  </hl-time-select>`,
      () => ({ value: '' }),
    )
    const input = wrapper.find('.input-inner')
    await input.trigger('click')
    await nextTick()
    const option = document.querySelector('.select-dropdown-item')
    expect(option?.textContent).toBe('01:00 PM')
  })


  describe('form item accessibility integration', () => {
    it('automatic id attachment', async () => {
      const wrapper = _mount(
        `<hl-form-item label="Foobar" data-test-ref="item">
          <hl-time-select />
        </hl-form-item>`,
        () => ({}),
      )

      await nextTick()
      const formItem = wrapper.find('[data-test-ref="item"]')
      const formItemLabel = formItem.find('.form-label > *')
      const timeSelectInput = wrapper.find('.input-inner')
      expect(formItem.attributes().role).toBeFalsy()
      expect(formItemLabel.attributes().for).toBe(
        timeSelectInput.attributes().id,
      )
    })

    it('specified id attachment', async () => {
      const wrapper = _mount(
        `<hl-form-item label="Foobar" data-test-ref="item">
          <hl-time-select id="foobar" />
        </hl-form-item>`,
        () => ({}),
      )

      await nextTick()
      const formItem = wrapper.find('[data-test-ref="item"]')
      const formItemLabel = formItem.find('.form-label > *')
      const timeSelectInput = wrapper.find('.input-inner')
      expect(formItem.attributes().role).toBeFalsy()
      expect(timeSelectInput.attributes().id).toBe('foobar')
      expect(formItemLabel.attributes().for).toBe(
        timeSelectInput.attributes().id,
      )
    })

    it('form item role is group when multiple inputs', async () => {
      const wrapper = _mount(
        `<hl-form-item label="Foobar" data-test-ref="item">
          <hl-time-select />
          <hl-time-select />
        </hl-form-item>`,
        () => ({}),
      )

      await nextTick()
      const formItem = wrapper.find('[data-test-ref="item"]')
      expect(formItem.attributes().role).toBe('group')
    })
  })

})
