import { nextTick } from 'vue'
import { mount } from '@vue/test-utils'
import { usePrefix } from '@hongluan-ui/test-utils/utils'
import { describe, expect, test, vi } from 'vitest'
import HlSimpleTable from '../src/simple-table.vue'

const getTestData = function() {
  const tableData = [
    { id: 1, name: '范白露', sex: '女', org: '中国系统', des: '来自安全应急UED的设计师' },
    { id: 2, name: 'xxx', sex: '男', org: '中国系统', des: '经验丰富的前端工程师' },
    { id: 3, name: '王朝阳', sex: '男', org: '中国系统', des: '90后交互设计师' },
  ]
  const cols = [
    { title: '#', slotName: 'tableIndex', headerSlotName: 'firstCol', fixed: 'left' },
    { title: '用户名', prop: 'name', expand: { slotName: 'nameExpand', hideLabel: true } },
    { title: '性别', prop: 'sex', expand: { slotName: 'sexExpand' } },
    { title: '单位', prop: 'org', sortable: true },
    { title: '简介', prop: 'des', fixed: { position: 'right', distance: '20px' } },
    { title: '操作', slotName: 'handle', align: 'center', fixed: 'right' },
  ]
  return { tableData, cols }
}

const getTestTreeData = function() {
  const tableData = [
    {
      id: 1,
      name: '王二麻子',
      sex: '男',
      org: '中国系统',
      des: '来自中国南方的温暖城市！来自中国南方的温暖城市！来自中国南方的温暖城市！',
      children: [
        {
          id: 11,
          name: '王二麻子11',
          sex: '男',
          org: '中国系统',
          des: '来自中国南方的温暖城市！',
          children: [
            {
              id: 111,
              name: '王二麻子111',
              sex: '男',
              org: '中国系统',
              des: '来自中国南方的温暖城市！',
            },
            {
              id: 112,
              name: '王二麻子112',
              sex: '男',
              org: '中国系统',
              des: '来自中国南方的温暖城市！',
            },
          ],
        },
        {
          id: 12,
          name: '王二麻子12',
          sex: '男',
          org: '中国系统',
          des: '来自中国南方的温暖城市！',
        },
      ],
    },
    {
      id: 2,
      name: '李四',
      sex: '男',
      org: '中国系统',
      des: '来自中国',
      hasChildren: true,
    },
    {
      id: 3,
      name: '张三',
      sex: '男',
      org: '中国系统',
      des: '来自中国北方的寒冷的城市！',
    },
  ]
  const cols = [
    { title: 'ID', slotName: 'tableIndex' },
    { title: '用户名', prop: 'name' },
    { title: '性别', prop: 'sex' },
    { title: '单位', prop: 'org' },
    { title: '简介', prop: 'des', width: '220px', showTooltip: true },
    { title: '操作', slotName: 'handle', align: 'center' },
  ]
  return { tableData, cols }
}

describe('SimpleTable.vue', () => {
  const { prefix } = usePrefix()
  test('render test', async () => {
    const wrapper = mount({
      components: {
        HlSimpleTable,
      },
      template: `
        <hl-simple-table :cols="cols" :data="tableData" border="bordered" hover stripe list>
        </hl-simple-table>
      `,
      data() {
        return {
          ...getTestData(),
        }
      },
    })
    expect(wrapper.classes()).toContain(`${prefix}-simple-table`)
    expect(wrapper.classes()).toContain(`striped-odd`)
    expect(wrapper.classes()).toContain(`hover`)
    expect(wrapper.classes()).toContain(`bordered`)
    expect(wrapper.classes()).toContain(`list`)
  })

  test('test slot', async () => {
    const wrapper = mount({
      components: {
        HlSimpleTable,
      },
      template: `
        <hl-simple-table :cols="cols" :data="tableData">
          <template #firstCol="{ col }">
            <p class="first-col">{{ col }}</p>
          </template>
          <template #tableIndex="{ row }">
            <p class="tab-index">{{ row }}</p>
          </template>
          <template #handle="{ row }">
            <p class="handle">{{ row }}</p>
          </template>
        </hl-simple-table>
      `,
      data() {
        return {
          ...getTestData(),
        }
      },
    })
    expect(wrapper.find('.first-col').exists()).toBeTruthy()
    expect(wrapper.find('.tab-index').exists()).toBeTruthy()
    expect(wrapper.find('.handle').exists()).toBeTruthy()
  })

  test('test border', async () => {
    const wrapper = mount({
      components: {
        HlSimpleTable,
      },
      template: `
        <hl-simple-table :cols="cols" :data="tableData" border="borderless">
        </hl-simple-table>
      `,
      data() {
        return {
          ...getTestData(),
        }
      },
    })
    expect(wrapper.find('.borderless').exists()).toBeTruthy()
  })

  test('test padding', async () => {
    const wrapper = mount({
      components: {
        HlSimpleTable,
      },
      template: `
        <hl-simple-table :cols="cols" :data="tableData" padding="var(--md)" cell-padding="var(--md)">
        </hl-simple-table>
      `,
      data() {
        return {
          ...getTestData(),
        }
      },
    })
    expect(wrapper.attributes('style')).toContain('--table-padding: var(--md); --table-cell-padding: var(--md);')
  })

  test('test stripe', async () => {
    const wrapper = mount({
      components: {
        HlSimpleTable,
      },
      template: `
        <hl-simple-table :cols="cols" :data="tableData" stripe>
        </hl-simple-table>
      `,
      data() {
        return {
          ...getTestData(),
        }
      },
    })
    expect(wrapper.find('.striped-odd').exists()).toBeTruthy()
  })

  test('test size', async () => {
    const wrapper = mount({
      components: {
        HlSimpleTable,
      },
      template: `
        <hl-simple-table :cols="cols" :data="tableData" size="md">
        </hl-simple-table>
      `,
      data() {
        return {
          ...getTestData(),
        }
      },
    })
    expect(wrapper.find('.md').exists()).toBeTruthy()
  })

  test('test list', async () => {
    const wrapper = mount({
      components: {
        HlSimpleTable,
      },
      template: `
        <hl-simple-table :cols="cols" :data="tableData" list>
        </hl-simple-table>
      `,
      data() {
        return {
          ...getTestData(),
        }
      },
    })
    expect(wrapper.find('.list').exists()).toBeTruthy()
  })

  test('test fixed col & header', async () => {
    const wrapper = mount({
      components: {
        HlSimpleTable,
      },
      template: `
        <hl-simple-table :cols="cols" :data="tableData" fixed-header>
        </hl-simple-table>
      `,
      data() {
        return {
          ...getTestData(),
        }
      },
    })
    expect(wrapper.find('thead.fixed-top').exists()).toBeTruthy()
    expect(wrapper.find('tbody .fixed-left').exists()).toBeTruthy()
    expect(wrapper.find('tbody .fixed-right').exists()).toBeTruthy()
    expect(wrapper.find('tbody td:nth-child(5)').attributes('style')).toContain('--table-fixed-distance: 20px')
  })

  test('remove header', async () => {
    const wrapper = mount({
      components: {
        HlSimpleTable,
      },
      template: `
        <hl-simple-table :cols="cols" :data="tableData" :show-header="false">
        </hl-simple-table>
      `,
      data() {
        return {
          ...getTestData(),
        }
      },
    })
    expect(wrapper.find('thead').exists()).toBeFalsy()
  })

  test('sort', async () => {
    const sortFn = vi.fn()
    const wrapper = mount({
      components: {
        HlSimpleTable,
      },
      template: `
        <hl-simple-table :cols="cols" :data="tableData" @sort-change="sortChange">
        </hl-simple-table>
      `,
      data() {
        return {
          ...getTestData(),
        }
      },
      methods: {
        sortChange() {
          sortFn()
        },
      },
    })
    const sortColSelector = 'thead th:nth-child(4) .caret-wrapper'
    expect(wrapper.find(sortColSelector).exists()).toBeTruthy()
    await wrapper.find(sortColSelector + ' .ascending').trigger('click')
    expect(wrapper.find(sortColSelector + '.ascending').exists()).toBeTruthy()
    await wrapper.find(sortColSelector + ' .descending').trigger('click')
    expect(wrapper.find(sortColSelector + '.descending').exists()).toBeTruthy()
    expect(sortFn).toHaveBeenCalledTimes(2)
  })

  test('highlight', async () => {
    const highlightFn = vi.fn()
    const { tableData, cols } = getTestData()
    const wrapper = mount({
      components: {
        HlSimpleTable,
      },
      template: `
        <hl-simple-table ref="tableRef" :cols="cols" :data="tableData" highlight-current-row @current-change="currentChange">
        </hl-simple-table>
      `,
      data() {
        return {
          tableData,
          cols,
        }
      },
      methods: {
        currentChange() {
          highlightFn()
        },
      },
    })
    const sortColSelector = 'tbody tr:nth-child(1)'
    await wrapper.find(sortColSelector).trigger('click')
    expect(wrapper.find(sortColSelector + '.current-row').exists()).toBeTruthy()
    await wrapper.find(sortColSelector).trigger('click')
    expect(wrapper.find(sortColSelector + '.current-row').exists()).toBeFalsy()
    expect(highlightFn).toHaveBeenCalledTimes(2)

    const vm = wrapper.findComponent({ ref: 'tableRef' }).vm as any
    vm.setCurrentRow(tableData[0])
    await nextTick()
    expect(wrapper.find(sortColSelector + '.current-row').exists()).toBeTruthy()
    expect(highlightFn).toHaveBeenCalledTimes(3)
  })

  test('expand rows', async () => {
    const expandFn = vi.fn()
    const { tableData, cols } = getTestData()
    const wrapper = mount({
      components: {
        HlSimpleTable,
      },
      template: `
        <hl-simple-table
          ref="tableRef"
          :cols="cols"
          :data="tableData"
          :expand-row-keys="['1nameExpand', '2sexExpand']"
          @expand="expand"
        >
        </hl-simple-table>
      `,
      data() {
        return {
          tableData,
          cols,
        }
      },
      methods: {
        expand() {
          expandFn()
        },
      },
    })
    expect(wrapper.findAll('tbody .expand-row').length).toBe(2)
    expect(wrapper.find('tbody tr .expanded').exists()).toBeTruthy()
    expect(wrapper.find('tbody tr .expand-icon').exists()).toBeTruthy()

    const thirdRowExpandIcon = 'tbody tr:nth-child(3) td:nth-child(2) .expand-icon'
    await wrapper.find(thirdRowExpandIcon).trigger('click')
    expect(expandFn).toHaveBeenCalledTimes(1)
    expect(wrapper.findAll('tbody .expand-row').length).toBe(3)
    await wrapper.find(thirdRowExpandIcon).trigger('click')
    expect(expandFn).toHaveBeenCalledTimes(2)
    expect(wrapper.findAll('tbody .expand-row').length).toBe(2)
  })

  test('table tree', async () => {
    const treeExpandFn = vi.fn()
    const wrapper = mount({
      components: {
        HlSimpleTable,
      },
      template: `
        <hl-simple-table
          ref="tableRef"
          :cols="cols"
          :data="tableData"
          :load="load"
          :expand-row-keys="['1']"
          :first-column-index="1"
          @tree-expand="expand"
        >
        </hl-simple-table>
      `,
      data() {
        return {
          ...getTestTreeData(),
          count: 10000,
        }
      },
      methods: {
        expand() {
          treeExpandFn()
        },
        load(this: any, _: any, __: any, resolve: any) {
          window.setTimeout(() => {
            resolve([
              {
                id: this.count++,
                name: '王二麻子',
                sex: '男',
                org: '中国系统',
                des: '来自中国南方的温暖城市！来自中国南方的温暖城市！来自中国南方的温暖城市！',
                hasChildren: true,
              },
              {
                id: this.count++,
                name: '王二麻子',
                sex: '男',
                org: '中国系统',
                des: '来自中国南方的温暖城市！',
                children: [
                  {
                    id: this.count++,
                    name: '王二麻子',
                    sex: '男',
                    org: '中国系统',
                    des: '来自中国南方的温暖城市！',
                  },
                ],
              },
            ])
          }, 3000)
        },
      },
    })
    await nextTick()
    expect(wrapper.find('tbody tr td:nth-child(2).first-column-index').exists()).toBeTruthy()
    expect(wrapper.findAll('tbody .expand-icon').length).toBe(3)
    expect(wrapper.findAll('tbody .tree-expanded').length).toBe(1)

    const treeIcon = 'tbody tr:nth-child(4) td.first-column-index .expand-icon'
    vi.useFakeTimers()
    await wrapper.find(treeIcon).trigger('click')
    vi.runAllTimers()
    await nextTick()
    expect(wrapper.findAll('tbody tr').length).toBe(7)
    expect(wrapper.find('tbody tr:nth-child(5)').attributes('style')).toContain('--tree-level: 1')
    await wrapper.find(treeIcon).trigger('click')
    expect(wrapper.findAll('tbody tr').length).toBe(5)

    expect(treeExpandFn).toHaveBeenCalledTimes(2)
    vi.useRealTimers()
  })

  test('merge cell', async () => {
    const wrapper = mount({
      components: {
        HlSimpleTable,
      },
      template: `
        <hl-simple-table
          ref="tableRef"
          :cols="cols"
          :data="tableData"
          :span-method="objectSpanMethod"
        >
        </hl-simple-table>
      `,
      data() {
        return {
          cols: [
            { title: 'id', prop: 'id' },
            { title: '用户名', prop: 'name' },
            { title: 'Amount1', prop: 'amount1' },
            { title: 'Amount2', prop: 'amount2' },
            { title: 'Amount3', prop: 'amount3' },
          ],
          tableData: [
            { id: '12987122', name: 'Tom', amount1: '234', amount2: '3.2', amount3: 10 },
            { id: '12987123', name: 'Tom2', amount1: '234', amount2: '3.2', amount3: 10 },
            { id: '12987124', name: 'Tom3', amount1: '234', amount2: '3.2', amount3: 10 },
            { id: '12987125', name: 'Tom4', amount1: '234', amount2: '3.2', amount3: 10 },
            { id: '12987126', name: 'Tom5', amount1: '234', amount2: '3.2', amount3: 10 },
          ],

        }
      },
      methods: {
        objectSpanMethod({ rowIndex, columnIndex }: { rowIndex: number; columnIndex: number; }) {
          if (columnIndex === 0) {
            if (rowIndex % 2 === 0) {
              return {
                rowspan: 2,
                colspan: 1,
              }
            } else {
              return {
                rowspan: 0,
                colspan: 0,
              }
            }
          }
        },
      },
    })

    expect(wrapper.find('tbody td[rowspan="2"]').exists()).toBeTruthy()
    expect(wrapper.findAll('tbody td[rowspan="2"]').length).toBe(3)
    expect(wrapper.find('tbody tr td').text()).toContain('12987122')
    expect(wrapper.find('tbody tr:nth-child(2) td').text()).not.toContain('12987123')
  })

  test('multi header', async () => {
    const wrapper = mount({
      components: {
        HlSimpleTable,
      },
      template: `
        <hl-simple-table
          ref="tableRef"
          :cols="cols"
          :data="tableData"
        >
        </hl-simple-table>
      `,
      data() {
        return {
          cols: [
            { title: '日期', prop: 'date' },
            {
              title: '配送信息',
              prop: 'delivery',
              children: [
                { title: '姓名', prop: 'name' },
                {
                  title: '地址信息',
                  prop: 'address',
                  children: [
                    { title: '省/市', prop: 'state' },
                    { title: '城市', prop: 'city' },
                    { title: '地址', prop: 'address' },
                    { title: '操作', prop: 'zip' },
                  ],
                },
              ],
            },
          ],
          tableData: [
            {
              date: '2016-05-07',
              name: 'Tom',
              state: 'California',
              city: 'Los Angeles',
              address: 'No. 189, Grove St, Los Angeles',
              zip: 'CA 90036',
            },
          ],
        }
      },
      methods: {
      },
    })

    expect(wrapper.find('thead th[rowspan="3"]').exists()).toBeTruthy()
    expect(wrapper.find('thead th[colspan="5"]').exists()).toBeTruthy()
    expect(wrapper.find('thead th[rowspan="2"]').exists()).toBeTruthy()
    expect(wrapper.find('thead th[colspan="4"]').exists()).toBeTruthy()
    expect(wrapper.findAll('thead th[colspan="1"][rowspan="1"]').length).toBe(4)
  })

  test('custom tfoot', async () => {
    const wrapper = mount({
      components: {
        HlSimpleTable,
      },
      template: `
        <hl-simple-table :cols="cols" :data="tableData">
          <template #foot>
            <tr>
              <td colspan="2"><strong>合计</strong></td>
              <td>￥3232</td>
              <td>￥1212.22</td>
              <td>￥90.22</td>
            </tr>
          </template>
        </hl-simple-table>
      `,
      data() {
        return {
          ...getTestData(),
        }
      },
    })
    expect(wrapper.find('tfoot tr').exists()).toBeTruthy()
    expect(wrapper.find('tfoot td[colspan="2"]').exists()).toBeTruthy()
  })

  test('hide column', async () => {
    const wrapper = mount({
      components: {
        HlSimpleTable,
      },
      template: `
        <hl-simple-table ref="tableRef" :cols="cols" :data="tableData">
        </hl-simple-table>
      `,
      data() {
        return {
          ...getTestData(),
        }
      },
    })
    const vm = wrapper.findComponent({ ref: 'tableRef' }).vm as any
    vm.toggleColumn(2)
    await nextTick()

    expect(wrapper.find('thead th:nth-child(3)').attributes('style')).toContain('display: none')
    expect(wrapper.find('tbody td:nth-child(3)').attributes('style')).toContain('display: none')

    vm.toggleColumn(2)
    await nextTick()

    expect(wrapper.find('thead th:nth-child(3)').attributes('style')).not.toContain('display: none')
    expect(wrapper.find('tbody td:nth-child(3)').attributes('style')).not.toContain('display: none')
  })

  describe('custom style', () => {
    test('object style', async () => {
      const wrapper = mount({
        components: {
          HlSimpleTable,
        },
        template: `
          <hl-simple-table
            :cols="cols"
            :data="tableData"
            row-class-name="test-row"
            :row-style="{fontSize: '14px'}"
            cell-class-name="test-cell"
            :cell-style="{fontSize: '16px'}"
            header-row-class-name="test-header-row"
            :header-row-style="{fontSize: '14px'}"
            header-cell-class-name="test-header-cell"
            :header-cell-style="{fontSize: '16px'}"
          >
          </hl-simple-table>
        `,
        data() {
          return {
            ...getTestData(),
          }
        },
      })
      expect(wrapper.find('thead tr.test-header-row').exists()).toBeTruthy()
      expect(wrapper.find('thead tr').attributes('style')).toContain('font-size: 14px')
      expect(wrapper.find('thead th.test-header-cell').exists()).toBeTruthy()
      expect(wrapper.find('thead th').attributes('style')).toContain('font-size: 16px')

      expect(wrapper.find('tbody tr.test-row').exists()).toBeTruthy()
      expect(wrapper.find('tbody tr').attributes('style')).toContain('font-size: 14px')
      expect(wrapper.find('tbody td.test-cell').exists()).toBeTruthy()
      expect(wrapper.find('tbody td').attributes('style')).toContain('font-size: 16px')
    })

    test('function style', async () => {
      const wrapper = mount({
        components: {
          HlSimpleTable,
        },
        template: `
          <hl-simple-table
            :cols="cols"
            :data="tableData"
            :row-class-name="({ rowIndex }) => rowIndex % 2 === 0 ? 'even-row' : 'odd-row'"
            :row-style="({ rowIndex }) => rowIndex % 2 === 0 ? ({fontSize: '12px'}) : ({fontSize: '14px'})"
            :cell-class-name="({ columnIndex }) => columnIndex % 2 === 0 ? 'even-cell' : 'odd-cell'"
            :cell-style="({ columnIndex }) => columnIndex % 2 === 0 ? ({fontSize: '16px'}) : ({fontSize: '18px'})"
            :header-row-class-name="({ rowIndex }) => rowIndex % 2 === 0 ? 'header-even-row' : 'header-odd-row'"
            :header-row-style="({ rowIndex }) => rowIndex % 2 === 0 ? ({fontSize: '12px'}) : ({fontSize: '14px'})"
            :header-cell-class-name="({ columnIndex }) => columnIndex % 2 === 0 ? 'even-header-cell' : 'odd-header-cell'"
            :header-cell-style="({ columnIndex }) => columnIndex % 2 === 0 ? ({fontSize: '16px'}) : ({fontSize: '18px'})"
          >
          </hl-simple-table>
        `,
        data() {
          return {
            ...getTestData(),
          }
        },
      })
      expect(wrapper.find('thead tr.header-even-row').exists()).toBeTruthy()
      expect(wrapper.find('thead tr.header-odd-row').exists()).toBeFalsy()
      expect(wrapper.find('thead tr').attributes('style')).toContain('font-size: 12px')
      expect(wrapper.find('thead th.even-header-cell').exists()).toBeTruthy()
      expect(wrapper.find('thead th.odd-header-cell').exists()).toBeTruthy()
      expect(wrapper.find('thead th.even-header-cell').attributes('style')).toContain('font-size: 16px')
      expect(wrapper.find('thead th.odd-header-cell').attributes('style')).toContain('font-size: 18px')

      expect(wrapper.find('tbody tr.even-row').exists()).toBeTruthy()
      expect(wrapper.find('tbody tr.odd-row').exists()).toBeTruthy()
      expect(wrapper.find('tbody tr.even-row').attributes('style')).toContain('font-size: 12px')
      expect(wrapper.find('tbody tr.odd-row').attributes('style')).toContain('font-size: 14px')
      expect(wrapper.find('tbody td.even-cell').exists()).toBeTruthy()
      expect(wrapper.find('tbody td.odd-cell').exists()).toBeTruthy()
      expect(wrapper.find('tbody td.even-cell').attributes('style')).toContain('font-size: 16px')
      expect(wrapper.find('tbody td.odd-cell').attributes('style')).toContain('font-size: 18px')
    })

  })
})
