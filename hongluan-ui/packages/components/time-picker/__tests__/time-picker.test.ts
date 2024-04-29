import { mount } from '@vue/test-utils'
import { nextTick, ref } from 'vue'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { rAF } from '@hongluan-ui/test-utils/tick'
import sleep from '@hongluan-ui/test-utils/sleep'
import TimePicker from '../src/time-picker'
import Picker from '../src/common/picker.vue'
import { usePrefix } from '@hongluan-ui/test-utils/utils'
import { HlFormItem } from '@hongluan-ui/components/form-item'
import triggerEvent from '@hongluan-ui/test-utils/trigger-event'

import dayjs from 'dayjs'

const { prefix } = usePrefix()
const _mount = (template: string, data: any, otherObj?: any) => mount({
  components: {
    'hl-time-picker': TimePicker,
    'hl-form-item': HlFormItem,
  },
  template,
  data,
  ...otherObj,
}, {
  attachTo: 'body',
})

const makeRange = (start: number, end: number) => {
  const result = []
  for (let i = start; i <= end; i++) {
    result.push(i)
  }
  return result
}

const getSpinnerTextAsArray = (dom: HTMLElement, selector: string) => {
  return [].slice
    .call(dom.querySelectorAll(selector))
    .map((node: any) => Number(node.textContent))
}

afterEach(() => {
  document.body.innerHTML = ''
})

describe('TimePicker', () => {
  it('create & custom class & style', async () => {
    const wrapper = _mount(`<hl-time-picker
    :placeholder="placeholder"
    :readonly="readonly"
    :style="{color:'red'}"
    class="customClass"
  />`, () => ({ placeholder: 'test_',
      readonly: true }))
    const input = wrapper.find('input')
    expect(input.attributes('placeholder')).toBe('test_')
    expect(input.attributes('readonly')).not.toBeUndefined()
    const outterInput = wrapper.find('.hl-input')
    expect(outterInput.classes()).toContain('customClass')
    expect(outterInput.attributes().style).toBeDefined()
  })

  it('set format && default value && set AM/PM spinner && no $attr to panel', async () => {
    const wrapper = _mount(`<hl-time-picker
        :format="format"
        v-model="value"
        class="customClass"
      />`, () => ({ format: 'hh-mm:ss A',
      value: new Date(2016, 9, 10, 18, 40) }))
    await nextTick()
    const input = wrapper.find('input')
    expect(input.element.value).toBe('06-40:00 PM') // format
    input.trigger('blur')
    input.trigger('focus')
    await nextTick()
    const list = document.querySelectorAll('.spinner-list')
    const hoursEl = list[0]
    const items = hoursEl.querySelectorAll('.spinner-item')
    expect(items[0].textContent).toBe('12 AM') // am pm
    expect(items[1].textContent).toBe('01 AM')
    expect(items[12].textContent).toBe('12 PM')
    expect(items[15].textContent).toBe('03 PM')
    const times = document.querySelectorAll('.spinner-list .active')
    expect(times[0].textContent).toBe('06 PM')
    expect(times[1].textContent).toBe('40') // default value
    expect(times[2].textContent).toBe('00')
    const panel = document.querySelector(`.${prefix}-time-picker`) as any
    expect(panel.classList.contains('customClass')).toBeFalsy()

  })

  it('select time', async () => {
    const wrapper = _mount(`<hl-time-picker
        v-model="value"
      />`, () => ({ value: '' }))
    const input = wrapper.find('input')
    input.trigger('blur')
    input.trigger('focus')
    await nextTick()
    const list = document.querySelectorAll('.spinner-list')
    const hoursEl = list[0]
    const minutesEl = list[1]
    const secondsEl = list[2]
    const hourEl = hoursEl.querySelectorAll('.spinner-item')[4] as any
    const minuteEl = minutesEl.querySelectorAll('.spinner-item')[36] as any
    const secondEl = secondsEl.querySelectorAll('.spinner-item')[20] as any
    // click hour, minute, second one at a time.
    hourEl.click()
    await nextTick()
    minuteEl.click()
    await nextTick()
    secondEl.click()
    await nextTick()
    const vm = wrapper.vm as any
    const date = vm.value
    expect(hourEl.classList.contains('active')).toBeTruthy()
    expect(minuteEl.classList.contains('active')).toBeTruthy()
    expect(secondEl.classList.contains('active')).toBeTruthy()
    expect(date.getHours()).toBe(4)
    expect(date.getMinutes()).toBe(36)
    expect(date.getSeconds()).toBe(20)
  })

  it('click confirm / cancel button', async () => {
    const wrapper = _mount(`<hl-time-picker
        v-model="value"
      />`, () => ({ value: '' }))
    const input = wrapper.find('input')
    input.trigger('blur')
    input.trigger('focus')
    await nextTick();
    (document.querySelector(`.${prefix}-button.cancel`) as any).click()
    const vm = wrapper.vm as any
    expect(vm.value).toBe('')
    input.trigger('blur')
    input.trigger('focus')
    await nextTick();
    (document.querySelector(`.${prefix}-button.confirm`) as any).click()
    expect(vm.value).toBeInstanceOf(Date)
  })

  it('should update oldValue when visible change', async () => {
    const wrapper = _mount(`<hl-time-picker
        v-model="value"
      />`, () => ({ value: new Date(2016, 9, 10, 18, 40) }))

    // show picker panel
    const input = wrapper.find('input')
    input.trigger('blur')
    input.trigger('focus')
    await nextTick()

    // select time
    const list = document.querySelectorAll('.spinner-list')
    const hoursEl = list[0]
    const minutesEl = list[1]
    const secondsEl = list[2]
    const hourEl = hoursEl.querySelectorAll('.spinner-item')[4] as any
    const minuteEl = minutesEl.querySelectorAll('.spinner-item')[36] as any
    const secondEl = secondsEl.querySelectorAll('.spinner-item')[20] as any
    hourEl.click()
    await nextTick()
    minuteEl.click()
    await nextTick()
    secondEl.click()
    await nextTick();

    // click confirm button
    (document.querySelector(`.${prefix}-button.confirm`) as any).click()
    const date = (wrapper.vm as any).value
    expect(date.getHours()).toBe(4)
    expect(date.getMinutes()).toBe(36)
    expect(date.getSeconds()).toBe(20)

    // show picker panel and click cancel button
    input.trigger('blur')
    input.trigger('focus')
    await nextTick();
    (document.querySelector(`.${prefix}-button.cancel`) as any).click()
    expect(date.getHours()).toBe(4)
    expect(date.getMinutes()).toBe(36)
    expect(date.getSeconds()).toBe(20)
  })

  it('set format', async () => {
    const wrapper = _mount(`<hl-time-picker
        v-model="value"
        format='HH:mm'
      />`, () => ({ value: '' }))
    const input = wrapper.find('input')
    input.trigger('blur')
    input.trigger('focus')
    await nextTick()
    const spinnerDom = document.querySelectorAll('.spinner-wrapper')
    const minutesDom = spinnerDom[1]
    const secondsDom = spinnerDom[2]
    expect(minutesDom).not.toBeUndefined()
    expect(secondsDom).toBeUndefined()
  })

  it('event change, focus, blur, keydown', async () => {
    const changeHandler = vi.fn()
    const focusHandler = vi.fn()
    const blurHandler = vi.fn()
    const keydownHandler = vi.fn()
    const wrapper = _mount(`<hl-time-picker
        v-model="value"
        @change="onChange"
        @focus="onFocus"
        @blur="onBlur"
        @keydown="onKeydown"
      />`, () => ({ value: new Date(2016, 9, 10, 18, 40) }), {
      methods: {
        onChange(e: any) {
          return changeHandler(e)
        },
        onFocus(e: any) {
          return focusHandler(e)
        },
        onBlur(e: any) {
          return blurHandler(e)
        },
        onKeydown(e: any) {
          return keydownHandler(e)
        },
      },
    })

    const input = wrapper.find('input')
    input.trigger('focus')
    await nextTick()
    await rAF() // Set selection range causes focus to be retained
    input.element.blur()
    input.trigger('blur')
    await nextTick()
    await rAF() // Blur is delayed to ensure focus was not moved to popper
    input.trigger('keydown')
    await nextTick()
    await rAF()

    expect(focusHandler).toHaveBeenCalledTimes(1)
    expect(blurHandler).toHaveBeenCalledTimes(1)
    expect(keydownHandler).toHaveBeenCalledTimes(1)

    input.trigger('focus')
    await nextTick()
    await rAF()

    const list = document.querySelectorAll('.spinner-list')
    const hoursEl = list[0]
    const hourEl = hoursEl.querySelectorAll('.spinner-item')[4] as any
    hourEl.click()
    await nextTick()
    expect(changeHandler).toHaveBeenCalledTimes(0);
    (document.querySelector(`.${prefix}-button.confirm`) as any).click()
    await nextTick()
    await nextTick() // onchange is triggered by props.modelValue update
    expect(changeHandler).toHaveBeenCalledTimes(1)
  })

  it('clear button', async () => {
    const initDates = [
      new Date(2016, 9, 10, 9, 40),
      new Date(2016, 9, 10, 15, 40),
    ]
    const wrapper = _mount(
      `<hl-time-picker
        v-model="value"
        is-range
      />`,
      () => ({
        value: initDates,
      }),
    )
    const findInputWrapper = () => wrapper.find(`.${prefix}-input`)
    const findClear = () => wrapper.find('.input-close')

    await nextTick()
    const inputWrapper = findInputWrapper()
    await inputWrapper.trigger('mouseenter')
    await rAF()
    const clearIcon = findClear()
    await clearIcon.trigger('click')
    await nextTick()
    const vm = wrapper.vm as any
    expect(vm.value).toEqual(null)
  })

  it('selectableRange ', async () => {
    // ['17:30:00 - 18:30:00', '18:50:00 - 20:30:00', '21:00:00 - 22:00:00']
    const disabledHoursArr = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,23]
    const wrapper = _mount(`<hl-time-picker
        v-model="value"
        :disabled-hours="disabledHours"
        :disabled-minutes="disabledMinutes"
        :disabled-seconds="disabledSeconds"
      />`, () => ({ value: '' }), {
      methods: {
        disabledHours() {
          return disabledHoursArr
        },
        disabledMinutes (hour: number) {
          // ['17:30:00 - 18:30:00', '18:50:00 - 20:30:00', '21:00:00 - 22:00:00']
          if (hour === 17) {
            return makeRange(0, 29)
          }
          if (hour === 18) {
            return makeRange(31, 49)
          }
          if (hour === 20) {
            return makeRange(31, 59)
          }
          if (hour === 22) {
            return makeRange(1, 59)
          }
        },
        disabledSeconds(hour: number, minute: number) {
          if (hour === 18 && minute === 30) {
            return makeRange(1, 59)
          }
          if (hour === 20 && minute === 30) {
            return makeRange(1, 59)
          }
          if (hour === 22 && minute === 0) {
            return makeRange(1, 59)
          }
        },
      },
    })
    const input = wrapper.find('input')
    input.trigger('focus')
    await nextTick()

    const list = document.querySelectorAll('.spinner-list')
    const hoursEl = list[0] as HTMLElement
    const minutesEl = list[1] as HTMLElement
    const secondsEl = list[2] as HTMLElement
    const disabledHours = getSpinnerTextAsArray(hoursEl, '.disabled')
    expect(disabledHours).toEqual(disabledHoursArr)
    const hourSpinners = hoursEl.querySelectorAll('.spinner-item');
    (hourSpinners[18] as any).click()
    await nextTick()
    const disabledMinutes = getSpinnerTextAsArray(minutesEl, '.disabled')
    expect(disabledMinutes.every(t => t > 30 && t < 50)).toBeTruthy()
    expect(disabledMinutes.length).toEqual(19);
    (hourSpinners[22] as any).click()
    await nextTick()
    const enabledMinutes = getSpinnerTextAsArray(minutesEl, ':not(.disabled)')
    const enabledSeconds = getSpinnerTextAsArray(secondsEl, ':not(.disabled)')
    expect(enabledMinutes).toEqual([0])
    expect(enabledSeconds).toEqual([0])
  })

  it('ref focus', async () => {
    _mount(`<hl-time-picker
        v-model="value"
        ref="input"
      />`, () => ({ value: new Date(2016, 9, 10, 18, 40) }), {
      mounted() {
        this.$refs.input.focus()
      },
    })
    await nextTick()
    const popperEl = document.querySelector(`.${prefix}-datepicker-popper`)
    const attr = popperEl?.getAttribute('aria-hidden')
    expect(attr).toEqual('false')
  })

  it('ref blur', async () => {
    _mount(`<hl-time-picker
        v-model="value"
        ref="input"
      />`, () => ({ value: new Date(2016, 9, 10, 18, 40) }), {
      mounted() {
        this.$refs.input.focus()
        this.$refs.input.blur()
      },
    })
    await nextTick()
    const popperEl = document.querySelector(`.${prefix}-datepicker-popper`)
    const attr = popperEl?.getAttribute('aria-hidden')
    expect(attr).toEqual('false')
  })

  it('ref handleOpen', async () => {
    const value = ref(new Date(2016, 9, 10, 18, 40))
    const wrapper = _mount(`<hl-time-picker
        v-model="value"
        ref="input"
      />`, () => ({ value }), {
    })
    const timePickerExposed = wrapper.findComponent(TimePicker).vm.$.exposed

    await nextTick()
    timePickerExposed?.handleOpen()

    await nextTick()
    const popperEl = document.querySelector(`.${prefix}-datepicker-popper`)
    const attr = popperEl?.getAttribute('aria-hidden')
    expect(attr).toEqual('false')
  })
  it('ref handleClose', async () => {
    vi.useFakeTimers()

    const value = ref(new Date(2016, 9, 10, 18, 40))
    const wrapper = _mount(`<hl-time-picker
        v-model="value"
        ref="input"
      />`, () => ({ value }), {
    })
    const timePickerExposed = wrapper.findComponent(TimePicker).vm.$.exposed

    await nextTick()
    timePickerExposed?.handleOpen()
    await nextTick()
    timePickerExposed?.handleClose()

    await nextTick()
    const popperEl = document.querySelector(`.${prefix}-datepicker-popper`)
    const attr = popperEl?.getAttribute('aria-hidden')
    expect(attr).toEqual('true')

    vi.useRealTimers()
  })

  it('model value should sync when disabled-hours was updated', async () => {
    const wrapper = _mount(`
       <hl-time-picker
        v-model="value"
        :disabled-hours="disabledHours"
        value-format="YYYY-MM-DD HH:mm:ss"
      />
    `, () => ({
      value: '2000-01-01 00:00:00',
      minHour: '8',
    }), {
      computed: {
        disabledHours() {
          return (): any => {
            return Array(24)
              .fill(null)
              .map((_, i) => i)
              .filter(h => h < Number.parseInt((this as any).minHour, 10))
          }
        },
      },
    })
    await nextTick()
    const vm = wrapper.vm as any
    expect(vm.value).toEqual('2000-01-01 08:00:00')
    vm.minHour = '9'
    await nextTick()
    expect(vm.value).toEqual('2000-01-01 09:00:00')
    vm.minHour = '8'
    await nextTick()
    expect(vm.value).toEqual('2000-01-01 09:00:00')
  })
  it('picker-panel should not pop up when readonly', async () => {
    const wrapper = _mount(
      `<hl-time-picker
        readonly
      />`,
      () => ({}),
    )
    const input = wrapper.find('input')
    await input.trigger('mousedown')
    await nextTick()
    expect((wrapper.findComponent(Picker).vm as any).pickerVisible).toEqual(
      false,
    )
  })

  it('picker-panel should not pop up when disabled', async () => {
    const wrapper = _mount(
      `<hl-time-picker
        disabled
      />`,
      () => ({}),
    )
    const input = wrapper.find('input')
    await input.trigger('mousedown')
    await nextTick()
    expect((wrapper.findComponent(Picker).vm as any).pickerVisible).toEqual(
      false,
    )
  })

  it('can auto skip when disabled', async () => {
    const disabledHoursArr = [
      0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 23,
    ]
    const wrapper = _mount(
      `<hl-time-picker
        v-model="value"
        :disabled-hours="disabledHours"
        arrow-control
      />`,
      () => ({ value: new Date(2016, 9, 20, 18, 30) }),
      {
        methods: {
          disabledHours() {
            return disabledHoursArr
          },
        },
      },
    )
    const input = wrapper.find('input')
    input.trigger('focus')
    await nextTick()

    const list = document.querySelectorAll('.spinner-list')
    const hoursEl = list[0] as HTMLElement
    let activeHours = getSpinnerTextAsArray(hoursEl, '.active')[0]

    expect(activeHours).toEqual(20)
    const hoursElWrapperList = document.querySelectorAll(
      '.spinner-wrapper',
    )
    const hoursElWrapper = hoursElWrapperList[0]
    const hoursElArrowDown: Element | null =
      hoursElWrapper.querySelector('.spinner-arrow.down')
    expect(hoursElArrowDown).toBeTruthy()

    const mousedownEvt = new MouseEvent('mousedown')
    const mouseupEvt = new MouseEvent('mouseup')

    const testTime = 130
    hoursElArrowDown?.dispatchEvent(mousedownEvt)
    hoursElArrowDown?.dispatchEvent(mouseupEvt)
    await sleep(testTime)
    activeHours = getSpinnerTextAsArray(hoursEl, '.active')[0]
    expect(activeHours).toEqual(21)
    hoursElArrowDown?.dispatchEvent(mousedownEvt)
    hoursElArrowDown?.dispatchEvent(mouseupEvt)
    await sleep(testTime)
    activeHours = getSpinnerTextAsArray(hoursEl, '.active')[0]
    expect(activeHours).toEqual(22)
    hoursElArrowDown?.dispatchEvent(new MouseEvent('mousedown'))
    hoursElArrowDown?.dispatchEvent(new MouseEvent('mouseup'))
    await sleep(testTime)
    activeHours = getSpinnerTextAsArray(hoursEl, '.active')[0]
    expect(activeHours).toEqual(20)
  })

})

describe('TimePicker(range)', () => {
  it('create', async () => {
    const wrapper = _mount(`<hl-time-picker
        v-model="value"
        size="sm"
        :is-range="true"
      />`, () => ({ value: [new Date(2016, 9, 10, 18, 40), new Date(2016, 9, 10, 19, 40)] }))
    expect(wrapper.find('.date-timerange.sm').exists()).toBeTruthy()
    const input = wrapper.find('input')
    input.trigger('blur')
    input.trigger('focus')
    await nextTick()
    const list = document.querySelectorAll('.spinner-list .spinner-item.active');

    ['18','40','00','19','40','00'].forEach((_, i) => {
      expect(list[i].textContent).toBe(_)
    })
  })

  it('default value', async() => {
    const defaultValue = [new Date(2000, 9, 1, 10, 20, 0), new Date(2000, 9, 1, 11, 10, 0)]
    const wrapper = _mount(`<hl-time-picker
        v-model="value"
        :default-value="defaultValue"
        :is-range="true"
      />`, () => ({ value: '',
      defaultValue }))

    const input = wrapper.find('input')
    input.trigger('blur')
    input.trigger('focus')
    await nextTick()

    const list = document.querySelectorAll('.spinner-list .spinner-item.active');

    ['10','20','00','11','10','00'].forEach((_, i) => {
      expect(list[i].textContent).toBe(_)
    })
  })

  it('cancel button', async () => {
    const cancelDates = [
      new Date(2016, 9, 10, 9, 40),
      new Date(2016, 9, 10, 15, 40),
    ]
    const wrapper = _mount(`<hl-time-picker
        v-model="value"
        is-range
      />`, () => ({ value: cancelDates }))

    const input = wrapper.find('input')
    input.trigger('blur')
    await nextTick()
    input.trigger('focus')
    await nextTick()
    // For skipping Transition animation
    await rAF()
    ;(document.querySelector(`.${prefix}-button:not(.primary)`) as any).click()
    await rAF()
    const vm = wrapper.vm as any
    expect(vm.value).toEqual(cancelDates)
    expect((wrapper.findComponent(Picker).vm as any).pickerVisible).toEqual(false)
    expect(document.querySelector('.range-picker')).toBeNull()
    input.trigger('blur')
    input.trigger('focus')
    await nextTick();
    (document.querySelector(`.${prefix}-button.primary`) as any).click()
    expect(Array.isArray(vm.value)).toBeTruthy()
    vm.value.forEach((v: unknown) => {
      expect(v).toBeInstanceOf(Date)
    })
  })

  it('selectableRange ', async () => {
    // left ['08:00:00 - 12:59:59'] right ['11:00:00 - 16:59:59']
    const wrapper = _mount(`<hl-time-picker
        v-model="value"
        is-range
        :disabled-hours="disabledHours"
      />`, () => ({ value: [new Date(2016, 9, 10, 9, 40), new Date(2016, 9, 10, 15, 40)] }), {
      methods: {
        disabledHours(role: string) {
          if (role === 'start') {
            return makeRange(0, 7).concat(makeRange(13, 23))
          }
          return makeRange(0, 10).concat(makeRange(17, 23))
        },
      },
    })
    const input = wrapper.find('input')
    input.trigger('focus')
    await nextTick()

    const list = document.querySelectorAll('.spinner-list')
    const leftHoursEl = list[0] as HTMLElement
    const leftEndbledHours = getSpinnerTextAsArray(leftHoursEl, ':not(.disabled)')
    expect(leftEndbledHours).toEqual([8, 9, 10, 11, 12])
    const rightHoursEl = list[3] as HTMLElement
    const rightEndbledHours = getSpinnerTextAsArray(rightHoursEl, ':not(.disabled)')
    expect(rightEndbledHours).toEqual([11, 12, 13, 14, 15, 16]);
    (leftHoursEl.querySelectorAll('.spinner-item')[12] as any).click()
    await nextTick()
    const NextRightEndbledHours = getSpinnerTextAsArray(rightHoursEl, ':not(.disabled)')
    expect(NextRightEndbledHours).toEqual([12, 13, 14, 15, 16])
  })

  it('arrow key', async () => {
    const wrapper = _mount(`<hl-time-picker
        v-model="value"
        format="YYYY-MM-DD HH:mm:ss"
      />`, () => ({ value: new Date(2016, 9, 10, 18, 40) }))

    const input = wrapper.find('input')
    input.trigger('blur')
    input.trigger('focus')
    await nextTick()
    const initValue = input.element.value
    triggerEvent(input.element, 'keydown', 'ArrowDown')
    await nextTick()
    const addOneHour = input.element.value
    triggerEvent(input.element, 'keydown', 'ArrowRight')
    await nextTick()
    triggerEvent(input.element, 'keydown', 'ArrowDown')
    await nextTick()
    const addOneHourOneMinute = input.element.value
    expect(dayjs(initValue).diff(addOneHour, 'minute')).toEqual(-60)
    expect(dayjs(initValue).diff(addOneHourOneMinute, 'minute')).toEqual(-61)
  })

  it('should be able to inherit options from parent injection', async () => {
    const HlPopperOptions = {
      strategy: 'fixed',
    }
    const wrapper = _mount(
      `<hl-time-picker
        v-model="value"
        format="YYYY-MM-DD HH:mm:ss"
        :popper-options="options"
      />`, () => ({ value: new Date(2016, 9, 10, 18, 40), options: HlPopperOptions }),
      {
        provide() {
          return {
            HlPopperOptions,
          }
        },
      },
    )

    await nextTick()

    expect((
      (wrapper.findComponent(Picker).vm as any).hlPopperOptions),
    ).toEqual(HlPopperOptions)
  })


  it('am/pm mode avoid render redundant content', async () => {
    const wrapper = _mount(
      `<hl-time-picker
        v-model="timeRange"
        is-range
        range-separator="To"
        start-placeholder="Start time"
        end-placeholder="End time"
        arrow-control
        format="hh:mm:ss a"
      >
      </hl-time-picker>
      `,
      () => ({
        timeRange: [],
      }),
    )
    const input = wrapper.find('input')
    input.trigger('blur')
    input.trigger('focus')
    await nextTick()
    const list = document.querySelectorAll('.spinner-list')
    expect(
      list[0].querySelector('.spinner-item.active')?.innerHTML.split(' ').length,
    ).toBe(2)
    expect(
      list[1].querySelector('.spinner-item.active')?.innerHTML.split(' ').length,
    ).toBe(1)
    expect(
      list[2].querySelector('.spinner-item.active')?.innerHTML.split(' ').length,
    ).toBe(1)
  })
  describe('form item accessibility integration', () => {
    it('automatic id attachment', async () => {
      const wrapper = _mount(
        `<hl-form-item label="Foobar" data-test-ref="item">
          <hl-time-picker />
        </hl-form-item>`,
        () => ({}),
      )

      await nextTick()
      const formItem = wrapper.find('[data-test-ref="item"]')
      const formItemLabel = formItem.find('.form-label > *')
      const timePickerInput = wrapper.find('.input-inner')
      expect(formItem.attributes().role).toBeFalsy()
      expect(formItemLabel.attributes().for).toBe(
        timePickerInput.attributes().id,
      )
    })

    it('specified id attachment', async () => {
      const wrapper = _mount(
        `<hl-form-item label="Foobar" data-test-ref="item">
          <hl-time-picker id="foobar" />
        </hl-form-item>`,
        () => ({}),
      )

      await nextTick()
      const formItem = wrapper.find('[data-test-ref="item"]')
      const formItemLabel = formItem.find('.form-label > *')
      const timePickerInput = wrapper.find('.input-inner')
      expect(formItem.attributes().role).toBeFalsy()
      expect(timePickerInput.attributes().id).toBe('foobar')
      expect(formItemLabel.attributes().for).toBe(
        timePickerInput.attributes().id,
      )
    })

    it('form item role is group when multiple inputs', async () => {
      const wrapper = _mount(
        `<hl-form-item label="Foobar" data-test-ref="item">
          <hl-time-picker />
          <hl-time-picker />
        </hl-form-item>`,
        () => ({}),
      )

      await nextTick()
      const formItem = wrapper.find('[data-test-ref="item"]')
      expect(formItem.attributes().role).toBe('group')
    })
  })

  describe('dismiss events restore picker', () => {
    let wrapper: ReturnType<typeof _mount>

    const findInput = () =>
      wrapper.findComponent({
        name: 'Input',
      })
    const findClear = () => wrapper.find('.input-close')
    const findPicker = () =>
      wrapper.findComponent({
        name: 'Picker',
      })

    beforeEach(() => {
      wrapper = _mount(
        `<hl-time-picker v-model="value" ref="input" />`,
        () => ({ value: new Date(2016, 9, 10, 18, 40) }),
      )
    })

    afterEach(() => {
      wrapper.unmount()
    })

    it('should be able to focus back and callout picker after clear', async () => {
      await nextTick()
      const input = findInput()
      await input.trigger('mouseenter')
      await rAF()
      const clearIcon = findClear()
      await clearIcon.trigger('click')
      await rAF()
      expect(document.activeElement).toBe(wrapper.find('input').element)
      expect(document.querySelector(`.${prefix}-time-picker`)).toBeFalsy()
      await input.vm.$emit('input', 'a')
      await rAF()
      expect(document.querySelector(`.${prefix}-time-picker`)).toBeTruthy()
    })

    it('should be able to focus back and callout picker after pick', async () => {
      await nextTick()
      const picker = findPicker()
      const input = findInput()
      input.vm.$emit('input', 'a')
      await rAF()
      expect(document.querySelector(`.${prefix}-time-picker`)).toBeTruthy()
      picker.vm.onPick('', false)
      await rAF() // Picker triggers popup close, event propagation
      await rAF() // Focus trap recognizes focusout event, and propagation
      expect(document.activeElement).toBe(wrapper.find('input').element)
      expect(document.querySelector(`.${prefix}-time-picker`)).toBeFalsy()
      input.vm.$emit('input', 'a')
      await rAF()
      expect(document.querySelector(`.${prefix}-time-picker`)).toBeTruthy()
    })
  })
  it('display value', async () => {
    const wrapper = _mount(
      `<hl-time-picker
        v-model="value"
        :is-range="true"
      />`,
      () => ({ value: [undefined, undefined] }),
    )

    await nextTick()

    const [startInput, endInput] = wrapper.findAll('input')
    expect(startInput.element.value).toBe('')
    expect(endInput.element.value).toBe('')
  })

})

