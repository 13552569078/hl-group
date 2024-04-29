import ConfigProvider from '@hongluan-ui/components/config-provider'
import { CommonPicker } from '@hongluan-ui/components/time-picker'
import { mount } from '@vue/test-utils'
import { afterEach, describe, expect, it, vi, test } from 'vitest'
import { usePrefix } from '@hongluan-ui/test-utils/utils'
import zhCn from '@hongluan-ui/locale/lang/zh-cn'
import enUs from '@hongluan-ui/locale/lang/en'
import { EVENT_CODE } from '@hongluan-ui/constants'
import { HlFormItem } from '@hongluan-ui/components/form-item'
import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
import { nextTick } from 'vue'
import DatePicker from '../src/date-picker'
import Input from '@hongluan-ui/components/input'
import { rAF } from '@hongluan-ui/test-utils/tick'

const { prefix } = usePrefix()
const _mount = (template: string, data = () => ({}), otherObj?: any) => mount({
  components: {
    'hl-date-picker': DatePicker,
    'hl-form-item': HlFormItem,
  },
  template,
  data,
  ...otherObj,
}, {
  attachTo: 'body',
})

afterEach(() => {
  document.documentElement.innerHTML = ''
})

const testDatePickerPanelChange = async (type: 'date' | 'daterange') => {
  let mode
  const wrapper = _mount(
    `<hl-date-picker
        type="${type}"
        v-model="value"
        @panel-change="onPanelChange"
    />`,
    () => ({ value: type === 'daterange' ? [] : '' }),
    {
      methods: {
        onPanelChange(value: any, _mode: any) {
          mode = _mode
        },
      },
    },
  )

  const reset = () => {
    mode = undefined
  }

  const input = wrapper.find('input')
  input.trigger('blur')
  input.trigger('focus')
  await nextTick()
  const prevMonth = document.querySelector<HTMLElement>('button.prev-month')
  const prevYear = document.querySelector<HTMLElement>('button.prev-year')
  const nextMonth = document.querySelector<HTMLElement>('button.next-month')
  const nextYear = document.querySelector<HTMLElement>('button.next-year')
  prevMonth?.click()
  await nextTick()
  expect(mode).toBe('month')
  reset()
  nextMonth?.click()
  await nextTick()
  expect(mode).toBe('month')
  reset()
  prevYear?.click()
  await nextTick()
  expect(mode).toBe('year')
  reset()
  nextYear?.click()
  await nextTick()
  expect(mode).toBe('year')
}

describe('DatePicker', () => {
  it('create & custom class & style', async () => {
    const popperClassName = 'popper-class-test'
    const customClassName = 'custom-class-test'
    const wrapper = _mount(`<hl-date-picker
        :readonly="true"
        placeholder='test_'
        format='HH-mm-ss'
        :style="{color:'red'}"
        :class="customClassName"
        :popperClass="popperClassName"
    />`, () => ({ popperClassName, customClassName }))
    const input = wrapper.find('input')
    expect(input.attributes('placeholder')).toBe('test_')
    expect(input.attributes('readonly')).not.toBeUndefined()
    const outterInput = wrapper.find(`.${prefix}-input`)
    expect(outterInput.classes()).toContain(customClassName)
    expect(outterInput.attributes().style).toBeDefined()
    input.trigger('blur')
    input.trigger('focus')
    await nextTick()
    expect(document.querySelector(`.${prefix}-datepicker-popper`)?.classList.contains(popperClassName)).toBe(true)
  })

  it('select date', async () => {
    const wrapper = _mount(`<hl-date-picker
        v-model="value"
    />`, () => ({ value: '' }))
    const date = dayjs()

    const input = wrapper.find('input')
    input.trigger('blur')
    input.trigger('focus')
    await nextTick()
    const spans = document.querySelectorAll(`.header-label .${prefix}-button`)
    const arrowLeftElm = document.querySelector('.prev-month') as HTMLElement
    const arrowRightElm = document.querySelector('.next-month') as HTMLElement
    expect(spans[0].textContent).toContain(date.year())
    expect(spans[1].textContent).toContain(date.format('M'))
    const arrowLeftYeayElm = document.querySelector('.prev-year') as HTMLElement
    arrowLeftYeayElm.click()
    let count = 20
    while (--count) {
      arrowLeftElm.click()
    }
    count = 20
    while (--count) {
      arrowRightElm.click()
    }
    await nextTick()
    expect(spans[0].textContent).toContain(date.add(-1, 'year').year())
    expect(spans[1].textContent).toContain(date.format('M'));
    (document.querySelector('td.available') as HTMLElement).click()
    await nextTick()
    const vm = wrapper.vm as any
    expect(vm.value).toBeDefined()
  })

  it('defaultTime and clear value', async () => {
    const wrapper = _mount(`<hl-date-picker
        v-model="value"
        :default-time="new Date(2011,1,1,12,0,1)"
    />`, () => ({ value: '' }))
    const input = wrapper.find('input')
    input.trigger('blur')
    input.trigger('focus')
    await nextTick();
    (document.querySelector('td.available') as HTMLElement).click()
    await nextTick()
    const vm = wrapper.vm as any
    expect(vm.value).toBeDefined()
    expect(vm.value.getHours()).toBe(12)
    expect(vm.value.getMinutes()).toBe(0)
    expect(vm.value.getSeconds()).toBe(1)
    const picker = wrapper.findComponent(CommonPicker);
    (picker.vm as any).showClose = true
    await nextTick();
    (document.querySelector('.input-close') as HTMLElement).click()
    expect(vm.value).toBeNull()
  })

  it('defaultValue', async () => {
    const wrapper = _mount(
      `<hl-date-picker
        v-model="value"
        :default-value="defaultValue"
    />`,
      () => ({
        value: '',
        defaultValue: new Date(2011, 10, 1),
      }),
    )
    const input = wrapper.find('input')
    input.trigger('blur')
    input.trigger('focus')
    await nextTick()
    document.querySelector<HTMLElement>('td.available')?.click()
    await nextTick()
    const vm = wrapper.vm as any
    expect(vm.value).toBeDefined()
    expect(vm.value.getFullYear()).toBe(2011)
    expect(vm.value.getMonth()).toBe(10)
    expect(vm.value.getDate()).toBe(1)
    const picker = wrapper.findComponent(CommonPicker)
    ;(picker.vm as any).showClose = true
    await nextTick()
    document.querySelector<HTMLElement>('.input-close')?.click()
    expect(vm.value).toBeNull()

    vm.defaultValue = new Date(2031, 5, 1)
    input.trigger('blur')
    input.trigger('focus')
    await nextTick()
    document.querySelector<HTMLElement>('td.available')?.click()
    await nextTick()
    expect(vm.value).toBeDefined()
    expect(vm.value.getFullYear()).toBe(2031)
    expect(vm.value.getMonth()).toBe(5)
    expect(vm.value.getDate()).toBe(1)
  })

  it('event change, focus, blur, keydown', async () => {
    const changeHandler = vi.fn()
    const focusHandler = vi.fn()
    const blurHandler = vi.fn()
    const keydownHandler = vi.fn()

    let onChangeValue: Date | undefined
    const wrapper = _mount(`<hl-date-picker
        v-model="value"
        @change="onChange"
        @focus="onFocus"
        @blur="onBlur"
        @keydown="onKeydown"
      />`, () => ({ value: new Date(2016, 9, 10, 18, 40) }), {
      methods: {
        onChange(e: Date | undefined) {
          onChangeValue = e
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
    input.trigger('blur')
    input.trigger('keydown')

    await nextTick()
    await rAF()

    expect(focusHandler).toHaveBeenCalledTimes(1)
    expect(blurHandler).toHaveBeenCalledTimes(1)
    expect(keydownHandler).toHaveBeenCalledTimes(1)

    input.trigger('focus')
    await nextTick()

    ;(document.querySelector('td.available') as HTMLElement).click()
    await nextTick()
    await rAF()
    expect(changeHandler).toHaveBeenCalledTimes(1)
    expect(onChangeValue?.getTime()).toBe(new Date(2016, 9, 1).getTime())

  })

  it('emits focus on click when not currently focused', async () => {
    const focusHandler = vi.fn()
    const wrapper = _mount(
      `<hl-date-picker
        v-model="value"
        @focus="onFocus"
      />`,
      () => ({ value: new Date(2016, 9, 10, 18, 40) }),
      {
        methods: {
          onFocus(e: Event) {
            return focusHandler(e)
          },
        },
      },
    )

    const input = wrapper.find('input')
    input.trigger('mousedown')
    input.trigger('focus')
    await nextTick()
    await rAF()
    expect(focusHandler).toHaveBeenCalledTimes(1)
  })

  it('opens popper on click when input is focused', async () => {
    const wrapper = _mount(
      `<hl-date-picker
        v-model="value"
      />`,
      () => ({ value: new Date(2016, 9, 10, 18, 40) }),
    )
    const popperEl = document.querySelector(`.${prefix}-datepicker-popper`) as HTMLElement
    expect(popperEl.style.display).toBe('none')
    const input = wrapper.find('input')
    input.element.focus()
    input.trigger('mousedown')
    await nextTick()
    await rAF()

    expect(popperEl.style.display).not.toBe('none')
  })

  it('shortcuts', async () => {
    const text = 'Yesterday'
    const value = new Date(Date.now() - 86400000)
    value.setHours(0,0,0,0)
    const wrapper = _mount(`<hl-date-picker
        v-model="value"
        :shortcuts="shortcuts"
    />`, () => ({ value: '', shortcuts: [{
      text,
      value,
    }] }))
    const input = wrapper.find('input')
    input.trigger('blur')
    input.trigger('focus')
    await nextTick()
    const shortcut = document.querySelector('.picker-sidebar div')
    expect(shortcut?.textContent).toBe(text)
    expect(document.querySelector('.picker-sidebar')).not.toBeNull();
    (shortcut as HTMLElement).click()
    await nextTick()
    const vm = wrapper.vm as any
    expect(vm.value.valueOf()).toBe(value.valueOf())
  })

  it('disabledDate', async () => {
    const wrapper = _mount(`<hl-date-picker
        v-model="value"
        :disabledDate="disabledDate"
    />`, () => ({ value: '', disabledDate(time: { getTime: () => number; }) {
      return time.getTime() < Date.now()
    } }))
    const input = wrapper.find('input')
    input.trigger('blur')
    input.trigger('focus')
    await nextTick()
    expect(document.querySelector('.disabled')).not.toBeNull()
  })

  it('ref focus', async () => {
    _mount(`<hl-date-picker
        v-model="value"
        ref="input"
      />`, () => ({ value: '' }), {
      mounted() {
        this.$refs.input.focus()
      },
    })
    await nextTick()
    await rAF()
    const popperEl = document.querySelector(`.${prefix}-datepicker-popper`)
    const attr = popperEl?.getAttribute('aria-hidden')
    expect(attr).toEqual('false')
  })

  it('ref handleOpen', async () => {
    _mount(
      `<hl-date-picker
        v-model="value"
        ref="input"
      />`,
      () => ({ value: '' }),
      {
        mounted() {
          this.$refs.input.handleOpen()
        },
      },
    )
    await nextTick()
    const popperEl = document.querySelector(`.${prefix}-datepicker-popper`)
    const attr = popperEl?.getAttribute('aria-hidden')
    expect(attr).toEqual('false')
  })

  it('ref handleClose', async () => {
    vi.useFakeTimers()

    _mount(
      `<hl-date-picker
        v-model="value"
        ref="input"
      />`,
      () => ({ value: '' }),
      {
        mounted() {
          this.$refs.input.handleOpen()

          setTimeout(() => {
            this.$refs.input.handleClose()
          }, 1000000)
        },
      },
    )

    vi.runAllTimers()
    await nextTick()
    const popperEl = document.querySelector(`.${prefix}-datepicker-popper`)
    const attr = popperEl?.getAttribute('aria-hidden')
    expect(attr).toEqual('true')

    vi.useRealTimers()
  })

  it('custom content', async () => {
    const wrapper = _mount(
      `<hl-date-picker
        v-model="value"
        ref="input">
        <template #default="{ isCurrent, text }">
          <div class="cell" :class="{ current: isCurrent }">
            <div>{{ text }}</div>
          </div>
        </template>
      </hl-date-picker>`,
      () => ({ value: '' }),
      {
        mounted() {
          this.$refs.input.focus()
        },
      },
    )
    await nextTick()
    const input = wrapper.find('input')
    input.trigger('blur')
    input.trigger('focus')
    await nextTick()
    {
      (document.querySelector('td.available .cell') as HTMLElement).click()
    }
    input.trigger('focus')
    await nextTick()
    expect(
      document.querySelector('td.available .cell')?.classList.contains('current'),
    ).toBeTruthy()
  })

  it('custom content comment', async () => {
    _mount(
      `<hl-date-picker
        v-model="value"
        ref="input">
        <template #default="{ isCurrent, text }">
          <!-- <div class="cell" :class="{ current: isCurrent }">
            <div>{{ text + "csw" }}</div>
          </div> -->
        </template>
      </hl-date-picker>`,
      () => ({ value: '' }),
      {
        mounted() {
          this.$refs.input.focus()
        },
      },
    )
    await nextTick()
    const el = document.querySelector('td.available .date-table-cell')
    const text = el?.textContent
    expect(text?.includes('csw')).toBeFalsy()
  })

  it('custom content value validate', async () => {
    _mount(
      `<hl-date-picker
        v-model="value"
        ref="input">
        <template #default="{ isCurrent, text }">
          <div class="cell" :class="{ current: isCurrent }">
            <div>{{ text + "csw" }}</div>
          </div>
        </template>
      </hl-date-picker>`,
      () => ({ value: '' }),
      {
        mounted() {
          this.$refs.input.focus()
        },
      },
    )
    await nextTick()
    const el = document.querySelector('td.available .cell')
    const text = el?.textContent
    expect(text?.includes('csw')).toBeTruthy()
  })

  it('custom content bail out slot compoent', async () => {
    _mount(
      `<hl-date-picker
        v-model="value"
        ref="input">
        <slot name="testest"></slot>
      </hl-date-picker>`,
      () => ({ value: '' }),
      {
        mounted() {
          this.$refs.input.focus()
        },
      },
    )
    await nextTick()
    const el = document.querySelector<HTMLElement>('td.available')
    const text = el?.textContent
    expect(!!text).toBeTruthy()
  })

  describe('value-format', () => {
    it('with literal string', async () => {
      const day = dayjs()
      const format = 'YYYY-MM-DD'
      const valueFormat = '[Hongluan UI] DD/MM YYYY'
      const value = day.format(valueFormat)
      const wrapper = _mount(`
        <hl-date-picker
          ref="compo"
          v-model="value"
          type="date"
          format="${format}"
          value-format="${valueFormat}" />
        <button @click="changeValue">click</button>
      `, () => {
        return {
          value,
        }
      }, {
        methods: {
          changeValue () {
            this.value = '[Hongluan UI] 31/05 2021'
          },
        },
      })
      const vm = wrapper.vm as any
      const input = wrapper.find('input')
      await input.trigger('blur')
      await input.trigger('focus')
      await nextTick()
      {
        (document.querySelector('td.available') as HTMLElement).click()
      }
      await nextTick()
      expect(vm.value).toBe(dayjs(`[Hongluan UI] 01/${('0' + (day.month() + 1)).slice(-2)} ${day.year()}`, valueFormat).format(valueFormat))
      await wrapper.find('button').trigger('click')
      await nextTick()
      expect(wrapper.findComponent(Input).vm.modelValue).toBe('2021-05-31')
    })

    it('with "x"', async () => {
      const format = 'YYYY/MM/DD'
      const dateStr = '2021/05/31'
      const valueFormat = 'x'
      const value = Date.now()
      const wrapper = _mount(
        `
        <hl-date-picker
          ref="compo"
          v-model="value"
          type="date"
          format="${format}"
          value-format="${valueFormat}" />
        <button @click="changeValue">click</button>
      `,
        () => {
          return {
            value,
          }
        },
        {
          methods: {
            changeValue() {
              this.value = +new Date(dateStr)
            },
          },
        },
      )
      const vm = wrapper.vm as any
      const input = wrapper.find('input')
      await input.trigger('blur')
      await input.trigger('focus')
      await nextTick()
      ;(document.querySelector('td.available') as HTMLElement).click()
      await nextTick()
      expect(vm.value).toBe(+dayjs().startOf('M'))
      await wrapper.find('button').trigger('click')
      await nextTick()
      expect(wrapper.findComponent(Input).vm.modelValue).toBe(dateStr)
    })
  })
})

describe('DatePicker Navigation', () => {
  let prevMonth: HTMLElement | null, prevYear: HTMLElement | null, nextMonth: HTMLElement | null, nextYear: HTMLElement | null, getYearLabel: () => any, getMonthLabel: () => any

  const initNavigationTest = async (value: Date) => {
    const wrapper = _mount(`<hl-date-picker
        v-model="value"
    />`, () => ({ value }))

    const input = wrapper.find('input')
    input.trigger('blur')
    input.trigger('focus')
    await nextTick()
    prevMonth = document.querySelector('.prev-month')
    prevYear = document.querySelector('.prev-year')
    nextMonth = document.querySelector('.next-month')
    nextYear = document.querySelector('.next-year')
    getYearLabel = () => document.querySelectorAll('.header-label button')[0].textContent
    getMonthLabel = () => document.querySelectorAll('.header-label button')[1].textContent
  }

  it('month, year', async() => {
    await initNavigationTest(new Date(2000, 0, 1))
    expect(getYearLabel()).toContain('2000')
    expect(getMonthLabel()).toContain('1')

    prevMonth?.click()
    await nextTick()
    expect(getYearLabel()).toContain('1999')
    expect(getMonthLabel()).toContain('12')

    prevYear?.click()
    await nextTick()
    expect(getYearLabel()).toContain('1998')
    expect(getMonthLabel()).toContain('12')

    nextMonth?.click()
    await nextTick()
    expect(getYearLabel()).toContain('1999')
    expect(getMonthLabel()).toContain('1')

    nextYear?.click()
    await nextTick()
    expect(getYearLabel()).toContain('2000')
    expect(getMonthLabel()).toContain('1')
  })

  it('month with fewer dates', async() => {
    // July has 31 days, June has 30
    await initNavigationTest(new Date(2000, 6, 31))
    prevMonth?.click()
    await nextTick()
    expect(getYearLabel()).toContain('2000')
    expect(getMonthLabel()).toContain('6')
  })

  it('year with fewer Feburary dates', async() => {
    // Feburary 2008 has 29 days, Feburary 2007 has 28
    await initNavigationTest(new Date(2008, 1, 29))
    prevYear?.click()
    await nextTick()
    expect(getYearLabel()).toContain('2007')
    expect(getMonthLabel()).toContain('2')
  })

  it('month label with fewer dates', async() => {
    await initNavigationTest(new Date(2000, 6, 31))
    const yearLabel = document.querySelectorAll('.header-label button')[0];
    (yearLabel as HTMLElement).click()
    await nextTick()
    const year1999Label = document.querySelectorAll('.year-table td')[1];
    (year1999Label as HTMLElement).click()
    await nextTick()
    const juneLabel = document.querySelectorAll('.month-table td')[5];
    (juneLabel as HTMLElement).click()
    await nextTick()
    expect(getYearLabel()).toContain('2001')
    expect(getMonthLabel()).toContain('6')
    const monthLabel = document.querySelectorAll('.header-label button')[1];
    (monthLabel as HTMLElement).click()
    await nextTick()
    const janLabel = document.querySelectorAll('.month-table td')[0];
    (janLabel as HTMLElement).click()
    await nextTick()
    expect(getYearLabel()).toContain('2001')
    expect(getMonthLabel()).toContain('1')
  })

  it('panel change event', async () => {
    await testDatePickerPanelChange('date')
  })
})

describe('MonthPicker', () => {
  it('basic', async () => {
    const wrapper = _mount(`<hl-date-picker
    type='month'
    v-model="value"
  />`, () => ({ value: new Date(2020, 7, 1) }))
    const input = wrapper.find('input')
    input.trigger('blur')
    input.trigger('focus')
    await nextTick()
    expect((document.querySelector('.month-table') as HTMLElement).style.display).toBe('')
    expect(document.querySelector('.year-table')).toBeNull();
    (document.querySelector('.month-table .cell') as HTMLElement).click()
    await nextTick()
    const vm = wrapper.vm as any
    expect(vm.value.getMonth()).toBe(0)
  })

  it('value-format', async () => {
    const valueFormat = '[Hongluan UI] YYYY.MM'
    const wrapper = _mount(`
      <hl-date-picker
        type="month"
        v-model="value"
        value-format="${valueFormat}"
      ></hl-date-picker>
    `, () => ({ value: dayjs(new Date(2020, 7, 1)).format(valueFormat) }))
    await nextTick()
    expect(wrapper.findComponent(Input).vm.modelValue).toBe('2020-08')
    const input = wrapper.find('input')
    input.trigger('blur')
    input.trigger('focus')
    await nextTick()
    {
      (document.querySelector('.month-table .cell') as HTMLElement).click()
    }
    await nextTick()
    expect(wrapper.findComponent(Input).vm.modelValue).toBe('2020-01')
    expect((wrapper.vm as any).value).toBe(dayjs(new Date(2020, 0, 1)).format(valueFormat))
  })
})

describe('YearPicker', () => {
  it('basic', async () => {
    const wrapper = _mount(`<hl-date-picker
    type='year'
    v-model="value"
  />`, () => ({ value: new Date(2020, 7, 1) }))
    const input = wrapper.find('input')
    input.trigger('blur')
    input.trigger('focus')
    await nextTick()
    expect((document.querySelector('.year-table') as HTMLElement).style.display).toBe('')
    expect(document.querySelector('.month-table')).toBeNull()

    const leftBtn = document.querySelector('.prev-year') as HTMLElement
    const rightBtn = document.querySelector('.next-year') as HTMLElement
    let count = 2

    while (--count) {
      leftBtn.click()
    }
    count = 3
    while (--count) {
      rightBtn.click()
    }

    await nextTick();

    (document.querySelector('.year-table .cell') as HTMLElement).click()
    await nextTick()
    const vm = wrapper.vm as any
    expect(vm.value.getFullYear()).toBe(2030)
  })

  it('value-format', async () => {
    const valueFormat = '[Hongluan UI] YYYY'
    const wrapper = _mount(`
      <hl-date-picker
        type="year"
        v-model="value"
        value-format="${valueFormat}"
      ></hl-date-picker>
    `, () => ({ value: dayjs(new Date(2005, 7, 1)).format(valueFormat) }))
    await nextTick()
    expect(wrapper.findComponent(Input).vm.modelValue).toBe('2005')
    const input = wrapper.find('input')
    input.trigger('blur')
    input.trigger('focus')
    await nextTick()
    const cell = (document.querySelector('.year-table .cell') as HTMLElement)
    cell.click()
    await nextTick()
    expect((wrapper.vm as any).value).toBe(dayjs(new Date(Number.parseInt(cell.innerHTML.trim()), 0, 1)).format(valueFormat))
  })
})

describe('WeekPicker', () => {
  it('create', async () => {
    const wrapper = _mount(`<hl-date-picker
    type='week'
    v-model="value"
  />`, () => ({ value: new Date(2020, 7, 15) }))
    const input = wrapper.find('input')
    input.trigger('blur')
    input.trigger('focus')
    await nextTick()
    expect(document.querySelector('.is-week-mode')).not.toBeNull();
    // select month still is in week-mode
    (document.querySelectorAll('.header-label button')[1] as HTMLElement).click()
    await nextTick();
    (document.querySelectorAll('.month-table .cell')[7] as HTMLElement).click()
    await nextTick()
    expect(document.querySelector('.is-week-mode')).not.toBeNull()
    const numberOfHighlightRows = () => document.querySelectorAll('.table-row.current').length;
    (document.querySelector('.table-row ~ .table-row td.available') as HTMLElement).click()
    await nextTick()
    const vm = wrapper.vm as any
    expect(vm.value).not.toBeNull()
    input.trigger('blur')
    input.trigger('focus')
    await nextTick()
    expect(numberOfHighlightRows()).toBe(1);
    // test: next month should not have highlight
    (document.querySelector('.next-month') as HTMLElement).click()
    await nextTick()
    expect(numberOfHighlightRows()).toBe(0);
    // test: next year should not have highlight
    (document.querySelector('.prev-month') as HTMLElement).click()
    await nextTick();
    (document.querySelector('.next-year') as HTMLElement).click()
    await nextTick()
    expect(numberOfHighlightRows()).toBe(0)
  })

  ;[
    { locale: zhCn, name: 'Monday', value: 1, lang: 'zh-cn' },
    { locale: enUs, name: 'Sunday', value: 0, lang: 'en' },
  ].forEach(loObj => {
    it(`emit first day of the week, ${loObj.locale.name} locale, ${loObj.name}`, async () => {
      const wrapper = mount({
        components: {
          'hl-date-picker': DatePicker,
          'hl-config-provider': ConfigProvider,
        },
        template: `
          <hl-config-provider :locale="locale">
            <hl-date-picker
              type='week'
              v-model="value"
            />
          </hl-config-provider>
        `,
        data() {
          return {
            locale: loObj.locale,
            value: '',
          }
        },
      }, {
        attachTo: 'body',
      })

      const input = wrapper.find('input')
      input.trigger('blur')
      input.trigger('focus')
      await nextTick();
      // click Wednesday
      (document.querySelectorAll('.table-row ~ .table-row td')[3] as HTMLElement).click()
      await nextTick()
      const vm = wrapper.vm as any
      expect(vm.value).not.toBeNull()
      expect(dayjs(vm.value).day()).toBe(loObj.value) // Sunday or Monday
      expect(+dayjs(vm.value)).toBe(+dayjs(vm.value).locale(loObj.lang).startOf('week'))
    })
  })
})

describe('DatePicker dates', () => {
  it('create', async () => {
    const wrapper = _mount(`<hl-date-picker
    type='dates'
    v-model="value"
  />`, () => ({ value: '' }))
    const input = wrapper.find('input')
    input.trigger('blur')
    input.trigger('focus')
    await nextTick()
    const td = (document.querySelectorAll('.table-row .available') as NodeListOf<HTMLElement>)
    const vm = wrapper.vm as any
    td[0].click()
    await nextTick()
    expect(vm.value.length).toBe(1)
    td[1].click()
    await nextTick()
    expect(vm.value.length).toBe(2)
    expect(document.querySelectorAll('.table-row .selected').length).toBe(2)
    td[0].click()
    await nextTick()
    expect(vm.value.length).toBe(1)
    td[1].click()
    await nextTick()
    expect(vm.value.length).toBe(0)
  })
})

describe('DatePicker keyboard events', () => {
  it('enter', async () => {
    const wrapper = _mount(
      `<hl-date-picker
    type='date'
    v-model="value"
  />`,
      () => ({ value: '' }),
    )
    const input = wrapper.find('.input-inner')
    await input.trigger('focus')
    await input.trigger('click')
    await nextTick()

    const popperEl = document.querySelectorAll(`.${prefix}-datepicker-popper`)[0]
    const attr = popperEl.getAttribute('aria-hidden')
    expect(attr).toEqual('false')

    await input.trigger('keydown', {
      code: EVENT_CODE.enter,
    })
    const popperEl2 = document.querySelectorAll(`.${prefix}-datepicker-popper`)[0]
    const attr2 = popperEl2.getAttribute('aria-hidden')
    expect(attr2).toEqual('true')
  })

  it('numpadEnter', async () => {
    const wrapper = _mount(
      `<hl-date-picker
    type='date'
    v-model="value"
  />`,
      () => ({ value: '' }),
    )
    const input = wrapper.find('.input-inner')
    await input.trigger('focus')
    await input.trigger('click')
    await nextTick()

    const popperEl = document.querySelectorAll(`.${prefix}-datepicker-popper`)[0]
    const attr = popperEl.getAttribute('aria-hidden')
    expect(attr).toEqual('false')

    await input.trigger('keydown', {
      code: EVENT_CODE.numpadEnter,
    })
    const popperEl2 = document.querySelectorAll(`.${prefix}-datepicker-popper`)[0]
    const attr2 = popperEl2.getAttribute('aria-hidden')
    expect(attr2).toEqual('true')
  })
})

describe('DateRangePicker', () => {

  it('create', async () => {
    const wrapper = _mount(`<hl-date-picker
    type='daterange'
    v-model="value"
  />`, () => ({ value: '' }))
    const inputs = wrapper.findAll('input')
    inputs[0].trigger('blur')
    inputs[0].trigger('focus')
    await nextTick()

    const panels = document.querySelectorAll('.picker-body-content')
    expect(panels.length).toBe(2);
    (panels[0].querySelector('td.available') as HTMLElement).click()
    await nextTick();
    (panels[1].querySelector('td.available') as HTMLElement).click()
    await nextTick()
    inputs[0].trigger('blur')
    inputs[0].trigger('focus')
    await nextTick()
    // correct highlight
    const startDate = document.querySelectorAll('.start-date')
    const endDate = document.querySelectorAll('.end-date')
    const inRangeDate = document.querySelectorAll('.in-range')
    expect(startDate.length).toBe(1)
    expect(endDate.length).toBe(1)
    expect(inRangeDate.length).toBeGreaterThan(28)
    // value is array
    const vm = wrapper.vm as any
    expect(Array.isArray(vm.value)).toBeTruthy()
    // input text is something like date string
    expect(inputs[0].element.value.length).toBe(10)
    expect(inputs[1].element.value.length).toBe(10)
  })

  it('reverse selection', async () => {
    const wrapper = _mount(`<hl-date-picker
      type='daterange'
      v-model="value"
    />`, () => ({ value: '' }))
    const inputs = wrapper.findAll('input')
    inputs[0].trigger('blur')
    inputs[0].trigger('focus')
    await nextTick()

    const panels = document.querySelectorAll('.picker-body-content');
    (panels[1].querySelector('td.available') as HTMLElement).click()
    await nextTick();
    (panels[0].querySelector('td.available') as HTMLElement).click()
    await nextTick()
    inputs[0].trigger('blur')
    inputs[0].trigger('focus')
    await nextTick()
    // correct highlight
    const startDate = document.querySelectorAll('.start-date')
    const endDate = document.querySelectorAll('.end-date')
    const inRangeDate = document.querySelectorAll('.in-range')
    expect(startDate.length).toBe(1)
    expect(endDate.length).toBe(1)
    expect(inRangeDate.length).toBeGreaterThan(28)
    const vm = wrapper.vm as any
    expect(vm.value[0].getTime() < vm.value[1].getTime()).toBeTruthy()
  })

  it('reset selection', async () => {
    const wrapper = _mount(`<hl-date-picker
      type='daterange'
      v-model="value"
    />`, () => ({ value: '' }))

    const inputs = wrapper.findAll('input')
    inputs[0].trigger('blur')
    inputs[0].trigger('focus')
    await nextTick()
    const panels = document.querySelectorAll('.picker-body-content');
    (panels[1].querySelector('td.available') as HTMLElement).click()
    await nextTick();
    (panels[0].querySelector('td.available') as HTMLElement).click()
    await nextTick();

    (wrapper.vm as any).value = ''
    inputs[0].trigger('blur')
    inputs[0].trigger('focus')
    await nextTick()
    const inRangeDate = document.querySelectorAll('.in-range')
    expect(inRangeDate.length).toBe(0)
  })

  it('range, start-date and end-date', async () => {
    _mount(`<hl-date-picker
      type='daterange'
      v-model="value"
    />`, () => ({ value: '' }))

    const table = document.querySelector('.picker-table')
    const availableTds = (table as HTMLTableElement).querySelectorAll('td.available');

    (availableTds[0] as HTMLElement).click()
    await nextTick();
    (availableTds[1] as HTMLElement).click()
    await nextTick()

    expect(availableTds[0].classList.contains('in-range')).toBeTruthy()
    expect(availableTds[0].classList.contains('start-date')).toBeTruthy()
    expect(availableTds[1].classList.contains('in-range')).toBeTruthy()
    expect(availableTds[1].classList.contains('end-date')).toBeTruthy();

    (availableTds[1] as HTMLElement).click()
    await nextTick();
    (availableTds[0] as HTMLElement).click()
    await nextTick()

    expect(availableTds[0].classList.contains('in-range')).toBeTruthy()
    expect(availableTds[0].classList.contains('start-date')).toBeTruthy()
    expect(availableTds[1].classList.contains('in-range')).toBeTruthy()
    expect(availableTds[1].classList.contains('end-date')).toBeTruthy()

    const startDate = document.querySelectorAll('.start-date')
    const endDate = document.querySelectorAll('.end-date')
    const inRangeDate = document.querySelectorAll('.in-range')
    expect(startDate.length).toBe(1)
    expect(endDate.length).toBe(1)
    expect(inRangeDate.length).toBe(2)
  })

  test('unlink:true', async () => {
    const wrapper = _mount(`<hl-date-picker
      type='daterange'
      v-model="value"
      unlink-panels
    />`, () => ({ value: [new Date(2000, 9, 1), new Date(2000, 11, 2)] }))
    const inputs = wrapper.findAll('input')
    inputs[0].trigger('blur')
    inputs[0].trigger('focus')
    await nextTick()
    const panels = document.querySelectorAll('.picker-body-content')
    const left = panels[0].querySelector('.picker-body-header')!
    const right = panels[1].querySelector('.is-right .picker-body-header')!
    expect(left.textContent).toContain('2000')
    expect(left.textContent).toContain('10')
    expect(right.textContent).toContain('2000')
    expect(right.textContent).toContain('12');
    (panels[1].querySelector('.next-year') as HTMLElement).click()
    await nextTick();
    (panels[1].querySelector('.next-month') as HTMLElement).click()
    await nextTick()
    expect(left.textContent).toContain('2000')
    expect(left.textContent).toContain('10')
    expect(right.textContent).toContain('2002')
    expect(right.textContent).toContain('1')
  })

  it('daylight saving time highlight', async() => {
    // Run test with environment variable TZ=Australia/Sydney
    // The following test uses Australian Eastern Daylight Time (AEDT)
    // AEST -> AEDT shift happened on 2016-10-02 02:00:00
    const wrapper = _mount(`<hl-date-picker
      type='daterange'
      v-model="value"
      unlink-panels
    />`, () => ({ value: [new Date(2016, 9, 1), new Date(2016, 9, 3)] }))

    const inputs = wrapper.findAll('input')
    inputs[0].trigger('blur')
    inputs[0].trigger('focus')
    await nextTick()

    const startDate = document.querySelectorAll('.start-date')
    const endDate = document.querySelectorAll('.end-date')
    expect(startDate.length).toBe(1)
    expect(endDate.length).toBe(1)
  })

  it('value-format', async () => {
    const valueFormat = 'DD/MM YYYY'
    const wrapper = _mount( `
      <hl-date-picker
        v-model="value"
        type="daterange"
        format="YYYY-MM-DD"
        value-format="${valueFormat}"
    />`, () => ({ value: [
      dayjs(new Date(2021, 4, 2)).format(valueFormat),
      dayjs(new Date(2021, 4, 12)).format(valueFormat),
    ] }))
    await nextTick()
    const [startInput, endInput] = wrapper.findAll('input')
    expect(startInput.element.value).toBe('2021-05-02')
    expect(endInput.element.value).toBe('2021-05-12')
    startInput.trigger('blur')
    startInput.trigger('focus')
    await nextTick()
    const panels = document.querySelectorAll('.picker-body-content')
    expect(panels.length).toBe(2);
    (panels[0].querySelector('td.available') as HTMLElement).click()
    await nextTick();
    (panels[1].querySelector('td.available') as HTMLElement).click()
    await nextTick()
    expect((wrapper.vm as any).value.toString()).toBe(['01/05 2021', '01/06 2021'].toString())
  })

  it('panel change event', async () => {
    await testDatePickerPanelChange('daterange')
  })

  it('display value', async () => {
    const wrapper = _mount(
      `
      <hl-date-picker
        v-model="value"
        type="daterange"
    />`,
      () => ({
        value: [undefined, undefined],
      }),
    )

    await nextTick()

    const [startInput, endInput] = wrapper.findAll('input')
    expect(startInput.element.value).toBe('')
    expect(endInput.element.value).toBe('')
  })

})

describe('MonthRange', () => {
  it('works', async () => {
    const wrapper = _mount(`<hl-date-picker
      type='monthrange'
      v-model="value"
    />`, () => ({ value: '' }))

    const inputs = wrapper.findAll('input')
    inputs[0].trigger('blur')
    inputs[0].trigger('focus')
    await nextTick()
    const panels = document.querySelectorAll('.picker-body-content')
    expect(panels.length).toBe(2)
    const p0 = <HTMLElement>panels[0].querySelector('td:not(.disabled)')
    p0.click()
    await nextTick()
    const p1 = (<HTMLElement>panels[1].querySelector('td:not(.disabled)'))
    p1.click()
    await nextTick()
    inputs[0].trigger('blur')
    inputs[0].trigger('focus')
    // correct highlight
    const startDate = document.querySelectorAll('.start-date')
    const endDate = document.querySelectorAll('.end-date')
    const inRangeDate = document.querySelectorAll('.in-range')
    expect(startDate.length).toBe(1)
    expect(endDate.length).toBe(1)
    expect(inRangeDate.length).toBeGreaterThan(0)
    // value is array
    const vm = wrapper.vm as any
    expect(Array.isArray(vm.value)).toBeTruthy()
    // input text is something like date string
    expect(inputs[0].element.value.length).toBe(7)
    expect(inputs[1].element.value.length).toBe(7)
    // reverse selection
    p1.click()
    await nextTick()
    p0.click()
    await nextTick()
    expect(vm.value[0].getTime() < vm.value[1].getTime()).toBeTruthy()
  })

  it('range, start-date and end-date', async () => {
    _mount(`<hl-date-picker
      type='monthrange'
      v-model="value"
    />`, () => ({ value: '' }))

    const table = document.querySelector('.month-table')
    const tds = (table as HTMLTableElement).querySelectorAll('td');

    (tds[0] as HTMLElement).click()
    await nextTick();
    (tds[1] as HTMLElement).click()
    await nextTick()

    expect(tds[0].classList.contains('in-range')).toBeTruthy()
    expect(tds[0].classList.contains('start-date')).toBeTruthy()
    expect(tds[1].classList.contains('in-range')).toBeTruthy()
    expect(tds[1].classList.contains('end-date')).toBeTruthy();

    (tds[1] as HTMLElement).click()
    await nextTick();
    (tds[0] as HTMLElement).click()
    await nextTick()

    expect(tds[0].classList.contains('in-range')).toBeTruthy()
    expect(tds[0].classList.contains('start-date')).toBeTruthy()
    expect(tds[1].classList.contains('in-range')).toBeTruthy()
    expect(tds[1].classList.contains('end-date')).toBeTruthy()

    const startDate = document.querySelectorAll('.start-date')
    const endDate = document.querySelectorAll('.end-date')
    const inRangeDate = document.querySelectorAll('.in-range')
    expect(startDate.length).toBe(1)
    expect(endDate.length).toBe(1)
    expect(inRangeDate.length).toBe(2)
  })


  it('type:monthrange unlink:true', async () => {
    const wrapper = _mount(`<hl-date-picker
      type='monthrange'
      v-model="value"
      unlink-panels
    />`, () => ({ value: [new Date(2000, 9), new Date(2002, 11)] }))

    const inputs = wrapper.findAll('input')
    inputs[0].trigger('blur')
    inputs[0].trigger('focus')
    await nextTick()
    const panels = document.querySelectorAll('.picker-body-content')
    const left = panels[0].querySelector('.picker-body-header')!
    const right = panels[1].querySelector('.is-right .picker-body-header')!
    expect(left.textContent).toContain(2000)
    expect(right.textContent).toContain(2002);
    (panels[1].querySelector('.next-year') as HTMLElement).click()
    await nextTick()
    expect(left.textContent).toContain(2000)
    expect(right.textContent).toContain(2003)
  })

  it('daylight saving time highlight', async () => {
    const wrapper = _mount(`<hl-date-picker
      type='monthrange'
      v-model="value"
      unlink-panels
    />`, () => ({ value: [new Date(2016, 6), new Date(2016, 12)] }))

    const inputs = wrapper.findAll('input')
    inputs[0].trigger('blur')
    inputs[0].trigger('focus')
    await nextTick()
    const startDate = document.querySelectorAll('.start-date')
    const endDate = document.querySelectorAll('.end-date')
    expect(startDate.length).toBe(1)
    expect(endDate.length).toBe(1)
  })

  it('should accept popper options and pass down', async () => {
    const HlPopperOptions = {
      strategy: 'fixed',
    }
    const wrapper = _mount(
      `<hl-date-picker
        type='monthrange'
        v-model="value"
        :popper-options="options"
        unlink-panels
      />`, () => ({ value: [new Date(2016, 6), new Date(2016, 12)], options: HlPopperOptions }),
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
      (wrapper.findComponent(CommonPicker).vm as any).hlPopperOptions),
    ).toEqual(HlPopperOptions)
  })

  describe('form item accessibility integration', () => {
    it('automatic id attachment', async () => {
      const wrapper = _mount(
        `<hl-form-item label="Foobar" data-test-ref="item">
          <hl-date-picker />
        </hl-form-item>`,
        () => ({}),
      )

      await nextTick()
      const formItem = wrapper.find('[data-test-ref="item"]')
      const formItemLabel = formItem.find('.form-label > *')
      const datePickerInput = wrapper.find('input')
      expect(formItem.attributes().role).toBeFalsy()
      expect(formItemLabel.attributes().for).toBe(
        datePickerInput.attributes().id,
      )
    })

    it('specified id attachment', async () => {
      const wrapper = _mount(
        `<hl-form-item label="Foobar" data-test-ref="item">
          <hl-date-picker id="foobar" />
        </hl-form-item>`,
        () => ({}),
      )

      await nextTick()
      const formItem = wrapper.find('[data-test-ref="item"]')
      const formItemLabel = formItem.find('.form-label > *')
      const datePickerInput = wrapper.find('input')
      expect(formItem.attributes().role).toBeFalsy()
      expect(datePickerInput.attributes().id).toBe('foobar')
      expect(formItemLabel.attributes().for).toBe(
        datePickerInput.attributes().id,
      )
    })

    it('form item role is group when multiple inputs', async () => {
      const wrapper = _mount(
        `<hl-form-item label="Foobar" data-test-ref="item">
          <hl-date-picker />
          <hl-date-picker />
        </hl-form-item>`,
        () => ({}),
      )

      await nextTick()
      const formItem = wrapper.find('[data-test-ref="item"]')
      expect(formItem.attributes().role).toBe('group')
    })
  })
  it('The year which is disabled should not be selectable', async () => {
    const pickHandler = vi.fn()
    const wrapper = _mount(
      `<hl-date-picker
        v-model="yearValue"
        type="year"
        :disabled-date="validateYear"
        @panel-change="onPick"
      />`,
      () => ({
        yearValue: '2022',
        validateYear: (date: Date) => {
          if (date.getFullYear() > 2022) {
            return true
          } else {
            return false
          }
        },
        onPick(e: any) {
          return pickHandler(e)
        },
      }),
    )
    const input = wrapper.find('input')
    input.trigger('focus')
    await nextTick()
    ;(document.querySelector('td.disabled') as HTMLElement).click()
    await nextTick()
    expect(pickHandler).toHaveBeenCalledTimes(0)
    ;(document.querySelector('td.available') as HTMLElement).click()
    await nextTick()
    expect(pickHandler).toHaveBeenCalledTimes(1)
  })

})

