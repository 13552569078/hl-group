import { usePrefix } from '@hongluan-ui/test-utils/utils'
import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import updateLocale from 'dayjs/plugin/updateLocale'
import dayjs from 'dayjs'
import { nextTick } from 'vue'
import Calendar from '../src/calendar.vue'

const AXIOM = 'Rem is the best girl'

const setDayjsWeekStart = (weekStart = 0) => {
  dayjs.extend(updateLocale)
  const dayjsLocale = dayjs.locale()
  dayjs.updateLocale(dayjsLocale, {
    weekStart,
  })
}


const _mount = (template: string, data?: any, otherObj?: any) => mount({
  components: {
    'hl-calendar': Calendar,
  },
  template,
  data,
  ...otherObj,
})

describe('Calendar.vue', () => {
  const { prefix } = usePrefix()
  it('create', async() => {
    const wrapper = _mount(`
    <hl-calendar v-model="value"></hl-calendar>
    `, () => ({ value: new Date('2019-04-01') }))
    const titleEl = wrapper.find('.calendar-title')
    expect(/2019.*April|2019.*4/.test((titleEl.element as HTMLElement).innerHTML)).toBeTruthy()
    expect(wrapper.element.querySelectorAll('thead th').length).toBe(7)
    const rows = wrapper.element.querySelectorAll('.calendar-table-row')
    expect(rows.length).toBe(5)
    ;(rows[4].lastElementChild as HTMLElement).click()

    await nextTick()
    expect(/2019.*May|2019.*5/.test((titleEl.element as HTMLElement).innerHTML)).toBeTruthy()
    const vm = wrapper.vm as any
    const date = vm.value
    expect(date.getFullYear()).toBe(2019)
    expect(date.getMonth()).toBe(4)
    expect((wrapper.find('.is-selected span').element as HTMLElement).innerHTML).toBe('4')
  })

  it('range', () => {
    const wrapper = _mount(`
    <hl-calendar :range="[new Date(2019, 2, 4), new Date(2019, 2, 24)]"></hl-calendar>
    `)
    const titleEl = wrapper.find('.calendar-title')
    expect(/2019.*March|2019.*3/.test((titleEl.element as HTMLElement).innerHTML)).toBeTruthy()
    const rows = wrapper.element.querySelectorAll('.calendar-table-row')
    expect(rows.length).toBe(4)
    expect(wrapper.element.querySelector('.calendar-button-group')).toBeNull()
  })

  // https://github.com/element-plus/element-plus/issues/3155
  it('range when the start date will be calculated to last month', () => {
    const wrapper = _mount(`
    <hl-calendar :range="[new Date(2021, 1, 2), new Date(2021, 1, 28)]"></hl-calendar>
    `)
    const titleEl = wrapper.find('.calendar-title')
    expect(/2021.*January|2021.*1/.test((titleEl.element as HTMLElement).innerHTML)).toBeTruthy()
    const rows = wrapper.element.querySelectorAll('.calendar-table-row')
    expect(rows.length).toBe(5)
    expect(wrapper.element.querySelector('.calendar-button-group')).toBeNull()
  })

  it('range two monthes', async() => {
    const wrapper = _mount(`
    <hl-calendar :range="[new Date(2019, 3, 14), new Date(2019, 4, 18)]"></hl-calendar>
    `)
    const titleEl = wrapper.find('.calendar-title')
    expect(/2019.*April|2019.*4/.test((titleEl.element as HTMLElement).innerHTML)).toBeTruthy()
    const dateTables = wrapper.element.querySelectorAll('.calendar-table.is-range')
    expect(dateTables.length).toBe(2)
    const rows = wrapper.element.querySelectorAll('.calendar-table-row')
    expect(rows.length).toBe(5)
    const cell = rows[rows.length - 1].firstElementChild;
    (cell as HTMLElement).click()

    await nextTick()

    expect(/2019.*May|2019.*5/.test((titleEl.element as HTMLElement).innerHTML)).toBeTruthy()
    expect(cell?.classList.contains('is-selected')).toBeTruthy()
  })

  // https://github.com/element-plus/element-plus/issues/3155
  it('range two monthes when the start date will be calculated to last month', async() => {
    const wrapper = _mount(`
    <hl-calendar :range="[new Date(2021, 1, 2), new Date(2021, 2, 21)]"></hl-calendar>
    `)
    const titleEl = wrapper.find('.calendar-title')
    expect(/2021.*January|2021.*1/.test((titleEl.element as HTMLElement).innerHTML)).toBeTruthy()
    const dateTables = wrapper.element.querySelectorAll('.calendar-table.is-range')
    expect(dateTables.length).toBe(3)
    const rows = wrapper.element.querySelectorAll('.calendar-table-row')
    expect(rows.length).toBe(8)
    const cell = rows[rows.length - 1].firstElementChild;
    (cell as HTMLElement).click()

    await nextTick()

    expect(/2021.*March|2021.*3/.test((titleEl.element as HTMLElement).innerHTML)).toBeTruthy()
    expect(cell?.classList.contains('is-selected')).toBeTruthy()
  })

  it('firstDayOfWeek', async () => {
    // default en locale, weekStart 0 Sunday
    const wrapper = _mount(`
    <hl-calendar v-model="value"></hl-calendar>
    `, () => ({ value: new Date('2019-04-01') }))
    const head = wrapper.element.querySelector('.calendar-table thead')
    expect((head?.firstElementChild as HTMLElement).innerHTML).toBe('日')
    expect((head?.lastElementChild as HTMLElement).innerHTML).toBe('六')
    const firstRow = wrapper.element.querySelector('.calendar-table-row')
    expect((firstRow?.firstElementChild as HTMLElement).innerHTML).toContain('31')
    expect((firstRow?.lastElementChild as HTMLElement).innerHTML).toContain('6')
  })

  it('firstDayOfWeek when set 1', async () => {
    setDayjsWeekStart(1)
    const wrapper = mount({
      data: () => ({ value: new Date('2019-09-01') }),
      render() {
        return <Calendar v-model={this.value} />
      },
    })
    const head = wrapper.element.querySelector('.calendar-table thead')
    expect(head?.firstElementChild?.innerHTML).toBe('一')
    expect(head?.lastElementChild?.innerHTML).toBe('日')
    const firstRow = wrapper.element.querySelector('.calendar-table-row')
    expect(firstRow?.firstElementChild?.innerHTML).toContain('26')
    expect(firstRow?.lastElementChild?.innerHTML).toContain('1')
    const rows = wrapper.element.querySelectorAll('.calendar-table-row')
    expect(rows.length).toBe(6)
    // reset weekStart 0
    setDayjsWeekStart()
  })


  it('firstDayOfWeek in range mode', async () => {
    const wrapper = _mount(`
    <hl-calendar v-model="value" :range="[new Date(2019, 1, 3), new Date(2019, 2, 23)]"></hl-calendar>
    `, () => ({ value: new Date('2019-03-04') }))
    const head = wrapper.element.querySelector('.calendar-table thead')
    expect((head?.firstElementChild as HTMLElement).innerHTML).toBe('日')
    expect((head?.lastElementChild as HTMLElement).innerHTML).toBe('六')
    const firstRow = wrapper.element.querySelector('.calendar-table-row')
    expect((firstRow?.firstElementChild as HTMLElement).innerHTML).toContain('3')
    expect((firstRow?.lastElementChild as HTMLElement).innerHTML).toContain('9')
  })

  it('click previous month or next month', async () => {
    const wrapper = _mount(
      `
    <hl-calendar v-model="value"></hl-calendar>
    `,
      () => ({ value: new Date('2019-04-01') }),
    )
    await nextTick()
    const btns = wrapper.findAll(`.${prefix}-button`)
    const prevBtn = btns[0]
    const nextBtn = btns[2]
    await prevBtn.trigger('click')
    expect(wrapper.find('.is-selected').text()).toBe('1')
    await nextBtn.trigger('click')
    expect(wrapper.find('.is-selected').text()).toBe('1')
  })


  it('range two years', async () => {
    const wrapper = mount(() => (
      <Calendar
        range={[new Date(2022, 0, 1), new Date(2022, 0, 31)]}
      ></Calendar>
    ))
    const titleEl = wrapper.find('.calendar-title')
    expect(/2021.*12/.test(titleEl.element.innerHTML)).toBeTruthy()
    const dateTables = wrapper.element.querySelectorAll(
      '.calendar-table.is-range',
    )
    expect(dateTables.length).toBe(3)
    const rows = wrapper.element.querySelectorAll('.calendar-table-row')
    expect(rows.length).toBe(6)
    const cell = rows[rows.length - 1].firstElementChild as HTMLElement
    cell.click()

    await nextTick()

    expect(/2022.*1/.test(titleEl.element.innerHTML)).toBeTruthy()
    expect(cell?.classList.contains('is-selected')).toBeTruthy()
  })


  it('slots', async () => {
    const wrapper = mount(() => (
      <Calendar
        v-slots={{
          header: () => AXIOM,
          'date-cell': () => AXIOM,
        }}
      />
    ))

    expect(wrapper.find('.calendar-header').text()).toEqual(AXIOM)
    expect(wrapper.find('.current.is-today').text()).toEqual(AXIOM)
  })

})
