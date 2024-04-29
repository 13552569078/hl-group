import { nextTick, ref, h } from 'vue'
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { usePrefix } from '@hongluan-ui/test-utils/utils'
import Pagination from '../src/pagination'
import selectDropdownVue from '../../select/src/select-dropdown.vue'
import type { VueWrapper } from '@vue/test-utils'

const { prefix } = usePrefix()
const assertElementsExistence = (
  wrapper: VueWrapper<any>,
  selectors: string[],
  existence: boolean,
) => {
  selectors.forEach(selector => {
    expect(wrapper.find(selector).exists()).toBe(existence)
  })
}

const assertCurrent = (wrapper: VueWrapper<any>, page: number) => {
  expect(wrapper.find('.pager li.is-active.number').text()).toBe(String(page))
}
const assertPages = (wrapper: VueWrapper<any>, total: number) => {
  expect(wrapper.find(`.${prefix}-pagination .pager li:last-child`).text()).toBe(
    String(total),
  )
}

describe('Pagination', () => {
  describe('test invalid usages', () => {
    const cacheWarn = console.warn
    beforeEach(() => {
      console.warn = vi.fn()
    })
    afterEach(() => {
      console.warn = cacheWarn
    })
    test('both absence of total & pageCount is invalid', async () => {
      expect(console.warn).not.toHaveBeenCalled()
      const total = ref<number | undefined>(undefined)
      const wrapper = mount({
        setup() {
          return () => {
            return h(Pagination, { total: total.value })
          }
        },
      })
      expect(wrapper.find(`.${prefix}-pagination`).exists()).toBe(false)
      expect(console.warn).toHaveBeenCalled()
      total.value = 100
      await nextTick()
      expect(wrapper.find(`.${prefix}-pagination`).exists()).toBe(true)
    })
    test('current-page defined while absence of current-page listener is invalid', () => {
      expect(console.warn).not.toHaveBeenCalled()
      const wrapper = mount({
        setup() {
          return () => {
            return h(Pagination, {
              total: 100,
              currentPage: 1,
            })
          }
        },
      })
      expect(wrapper.find(`.${prefix}-pagination`).exists()).toBe(false)
      expect(console.warn).toHaveBeenCalled()
    })
    test('layout with `sizes` restrictions(page-count)', () => {
      expect(console.warn).not.toHaveBeenCalled()
      const wrapper = mount({
        setup() {
          return () => {
            return h(Pagination, {
              layout: 'sizes, pager',
              pageCount: 10,
            })
          }
        },
      })
      expect(wrapper.find(`.${prefix}-pagination`).exists()).toBe(false)
      expect(console.warn).toHaveBeenCalled()
    })
    test('layout with `sizes` restrictions(page-size)', () => {
      expect(console.warn).not.toHaveBeenCalled()
      const wrapper = mount({
        setup() {
          return () => {
            return h(Pagination, {
              layout: 'sizes, pager',
              pageSize: 10,
            })
          }
        },
      })
      expect(wrapper.find(`.${prefix}-pagination`).exists()).toBe(false)
      expect(console.warn).toHaveBeenCalled()
    })
  })

  describe('test layout & layout reactive change', () => {
    const layoutRef = ref('')
    const wrapper = mount({
      setup() {
        return () => {
          return h(Pagination, {
            total: 100,
            layout: layoutRef.value,
          })
        }
      },
    })
    test('layout empty', async () => {
      await nextTick()
      expect(wrapper.find(`.${prefix}-pagination`).exists()).toBe(false)
    })
    const layoutSelectorPairs = [
      ['sizes', '.pagination-control'],
      ['prev', '.pagination-prev'],
      ['pager', 'ul.pager'],
      ['next', '.pagination-next'],
      ['jumper', '.pagination-goto'],
      ['total', '.pagination-total'],
    ]
    layoutSelectorPairs.forEach(([layout], idx) => {
      test(`layout with only '${layout}'`, async () => {
        layoutRef.value = layout
        await nextTick()
        for (let i = 0; i < layoutSelectorPairs.length; i++) {
          expect(wrapper.find(layoutSelectorPairs[i][1]).exists()).toBe(
            i === idx,
          )
        }
      })
    })

    test(`layout with '->, total'`, async () => {
      layoutRef.value = '->, total'
      await nextTick()
      assertElementsExistence(
        wrapper,
        ['.pagination-total'],
        true,
      )
    })

    test('layout with default layout prop', () => {
      const wrapper = mount({
        setup() {
          return () => {
            return h(Pagination, {
              total: 100,
            })
          }
        },
      })
      assertElementsExistence(
        wrapper,
        [
          '.pagination-prev',
          'ul.pager',
          '.pagination-next',
          '.pagination-goto',
        ],
        true,
      )
    })

    test('test layout with slot', () => {
      const TestComponent = {
        template: `
          <hl-pagination
            layout="slot, prev, pager, next"
            :page-size="25"
            :total="100">
            <span class="slot-test">slot test</span>
          </hl-pagination>
        `,
        components: {
          'hl-pagination': Pagination,
        },
      }
      const wrapper = mount(TestComponent)
      expect(wrapper.find('.slot-test').exists()).toBe(true)
    })

    test('test hide-on-single-page prop', async () => {
      const hideOnSinglePage = ref(false)
      const wrapper = mount({
        setup() {
          return () => {
            return h(Pagination, {
              total: 10, // deivded by default page-size(10), there will be only one page
              hideOnSinglePage: hideOnSinglePage.value,
            })
          }
        },
      })
      expect(wrapper.find(`.${prefix}-pagination`).exists()).toBe(true)
      hideOnSinglePage.value = true
      await nextTick()
      expect(wrapper.find(`.${prefix}-pagination`).exists()).toBe(false)
    })

    test('test line & block & align layout', () => {
      const TestComponent = {
        template: `
          <hl-pagination
            layout="prev, pager, next"
            :page-size="25"
            :total="100"
            align="items-right"
            line
            block
          >
          </hl-pagination>
        `,
        components: {
          'hl-pagination': Pagination,
        },
      }
      const wrapper = mount(TestComponent)
      expect(wrapper.classes()).toContain('line')
      expect(wrapper.classes()).toContain('block')
      expect(wrapper.classes()).toContain('items-right')
    })
  })

  describe('test pageSize & currentPage reactive change', () => {
    test(`test pageSize change`, async () => {
      const pageSize = ref(10)
      const wrapper = mount({
        setup() {
          return () => {
            return h(Pagination, {
              layout: 'pager',
              total: 100,
              pageSize: pageSize.value,
            })
          }
        },
      })
      // total pages = Math.ceil(total / pageSize)
      assertPages(wrapper, 10)
      pageSize.value = 20
      await nextTick()
      assertPages(wrapper, 5)
      pageSize.value = 55
      await nextTick()
      assertPages(wrapper, 2)
    })
    test('test currentPage change', async () => {
      const pageSize = ref(10)
      const defaultCurrentPage = ref(2)
      const wrapper = mount({
        setup() {
          return () => {
            return h(Pagination, {
              layout: 'prev, pager, next',
              total: 100,
              pageSize: pageSize.value,
              defaultCurrentPage: defaultCurrentPage.value,
            })
          }
        },
      })
      assertCurrent(wrapper, 2)
      defaultCurrentPage.value = 1
      assertCurrent(wrapper, 2) // still 2
      await wrapper.find('.pager li:last-child').trigger('click')
      assertCurrent(wrapper, 10)
      await wrapper.find('.pagination-prev').trigger('click')
      assertCurrent(wrapper, 9)
      await wrapper.find('.pagination-next').trigger('click')
      assertCurrent(wrapper, 10)
      pageSize.value = 50
      await nextTick()
      assertCurrent(wrapper, 2)
    })

    test('test pageCount change and side effect', async () => {
      const pageCount = ref(10)
      const wrapper = mount({
        setup() {
          return () => {
            return h(Pagination, {
              layout: 'prev, pager, next',
              pageCount: pageCount.value,
            })
          }
        },
      })
      assertPages(wrapper, 10)
      pageCount.value = 20
      await nextTick()
      assertPages(wrapper, 20)
      await wrapper.find('.pager li:last-child').trigger('click')
      assertCurrent(wrapper, 20)
      pageCount.value = 5
      await nextTick()
      // side effect, if currentPage is greater than pageCount
      // currentPage should change accordingly
      assertPages(wrapper, 5)
      assertCurrent(wrapper, 5)
    })

    test('test listener work', async () => {
      const pageSizeWatcher = vi.fn()
      const currentPageWatcher = vi.fn()
      const wrapper = mount({
        setup() {
          return () => {
            return h(Pagination, {
              total: 100,
              layout: 'prev, pager, next, sizes',
              ['onUpdate:currentPage']: currentPageWatcher,
              ['onUpdate:pageSize']: pageSizeWatcher,
            })
          }
        },
      })
      await wrapper.find('.pager li:last-child').trigger('click')
      assertCurrent(wrapper, 10 /* Math.ceil(100/10) */)
      expect(currentPageWatcher).toHaveBeenCalled()
      await wrapper.find(`.${prefix}-input-select`).trigger('click')
      await wrapper
        .getComponent(selectDropdownVue)
        .find('li:nth-child(2)')
        .trigger('click')
      expect(pageSizeWatcher).toHaveBeenCalled()
      assertCurrent(wrapper, 5 /* Math.ceil(100/20) */)
    })
  })

  describe('test a11y supports', () => {
    test('test a11y attributes', async () => {
      const wrapper = mount({
        setup() {
          return () => {
            return h(Pagination, {
              total: 100,
            })
          }
        },
      })
      expect(wrapper.find(`.${prefix}-pagination`).attributes('aria-label')).toBe(
        'pagination',
      )
      expect(wrapper.find(`.${prefix}-pagination`).attributes('role')).toBe(
        'pagination',
      )
      expect(
        wrapper.find(`.${prefix}-pagination .pagination-prev`).attributes('aria-disabled'),
      ).toBe('true')
      expect(
        wrapper.find(`.${prefix}-pagination .pagination-next`).attributes('aria-disabled'),
      ).toBe('false')
      expect(
        wrapper.find('.pager li:first-child').attributes('aria-current'),
      ).toBe('true')
      expect(
        wrapper.find('.pager li:last-child').attributes('aria-current'),
      ).toBe('false')
      await wrapper.find('.pager li:last-child').trigger('click')
      expect(
        wrapper.find(`.${prefix}-pagination .pagination-prev`).attributes('aria-disabled'),
      ).toBe('false')
      expect(
        wrapper.find(`.${prefix}-pagination .pagination-next`).attributes('aria-disabled'),
      ).toBe('true')
      expect(
        wrapper.find('.pager li:first-child').attributes('aria-current'),
      ).toBe('false')
      expect(
        wrapper.find('.pager li:last-child').attributes('aria-current'),
      ).toBe('true')
    })

    test('test tabindex interactive', async () => {
      const wrapper = mount({
        setup() {
          return () => {
            return h(Pagination, {
              total: 100,
            })
          }
        },
      })
      await wrapper.find('.pager li:nth-child(2)').trigger('click')
      assertCurrent(wrapper, 2)
      await wrapper.find('.pager li:nth-child(3)').trigger('click', {
        key: 'Enter',
      })
      assertCurrent(wrapper, 3)
      // TODO getComputedStyle is not implemented in jsdom, so I duno how to assert style of psuedo-class
      /*
       * await wrapper.find('.el-pager li:nth-child(3)').trigger('keyup', {
       *   key: 'Tab',
       * })
       * const style = window.getComputedStyle(wrapper.find('.el-pager li:nth-child(4)').element, ':focus-visible')
       * expect(style.outline).toBeTruthy()
       */
    })

    test('test tabindex disabled', async () => {
      const wrapper = mount({
        setup() {
          return () => {
            return h(Pagination, {
              total: 100,
              disabled: true,
            })
          }
        },
      })

      expect(
        wrapper.find('.pager li:first-child').attributes('tabindex'),
      ).toBe('-1')

      await wrapper.setProps({ disabled: false })

      expect(
        wrapper.find('.pager li:first-child').attributes('tabindex'),
      ).toBe('0')
    })

  })
})
