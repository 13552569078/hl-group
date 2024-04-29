import { nextTick } from 'vue'
import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import Transfer from '../src/transfer.vue'

describe('Transfer', () => {
  const getTestData = () => {
    const data = []
    for (let i = 1; i <= 15; i++) {
      data.push({
        key: i,
        label: `备选项 ${i}`,
        disabled: i % 4 === 0,
      })
    }
    return data
  }

  it('create', () => {
    const wrapper = mount({
      template: `
        <transfer :data="testData" />
      `,
      components: { Transfer },
      created() {
        this.testData = getTestData()
      },
    })
    expect(wrapper.findComponent({ name: 'Transfer' })).toBeTruthy()
  })

  it('default target list', () => {
    const wrapper = mount({
      template: `
        <transfer :data="testData" v-model="value" />
      `,
      components: { Transfer },
      created() {
        this.testData = getTestData()
      },
      data() {
        return {
          value: [1, 4],
        }
      },
    })
    const HlTransfer: any = wrapper.findComponent({ name: 'Transfer' })
    expect(HlTransfer.vm.sourceData.length).toBe(13)
  })

  it('filterable', async () => {
    const wrapper = mount({
      template: `
        <transfer
          :data="testData"
          filterable
          v-model="value"
          :filter-method="method" />
      `,
      components: { Transfer },
      created() {
        this.testData = getTestData()
      },
      data() {
        return {
          value: [],
        }
      },
      methods: {
        method(query: string, option: any) {
          return option.key === Number(query)
        },
      },
    })
    const leftList: any = wrapper.findComponent({ name: 'TransferPanel' })
    leftList.vm.query = '1'
    await leftList.find('input').setValue('1')
    expect(leftList.vm.filteredData.length).toBe(1)
  })

  it('transfer', async () => {
    const wrapper = mount({
      template: `
        <transfer
          :data="testData"
          :left-default-checked="[2, 3]"
          :right-default-checked="[1]"
          v-model="value"
        />
      `,
      components: { Transfer },
      created() {
        this.testData = getTestData()
      },
      data() {
        return {
          value: [1, 4],
        }
      },
    })
    const HlTransfer: any = wrapper.findComponent({ name: 'Transfer' })

    HlTransfer.vm.addToLeft()
    await nextTick()
    expect(HlTransfer.vm.sourceData.length).toBe(14)
    HlTransfer.vm.addToRight()
    await nextTick()
    expect(HlTransfer.vm.sourceData.length).toBe(12)
  })

  it('customize', () => {
    const wrapper = mount({
      template: `
        <transfer
          :data="testData"
          v-model="value"
          :titles="titles"
          :render-content="renderFunc"
          :format="format"
        />
      `,
      components: { Transfer },
      created() {
        this.testData = getTestData()
      },
      data() {
        return {
          value: [2],
          titles: ['表1', '表2'],
          format: { noChecked: 'no', hasChecked: 'has' },
        }
      },
      methods: {
        renderFunc(h: any ,option: any) {
          return h('span', `${option.key} - ${option.label}`)
        },
      },
    })

    const label = wrapper.find('.panel-header .checkbox-label')
    expect(label.text().includes('表1')).toBeTruthy()
    expect(wrapper.find('.panel-list .checkbox-label').text()).toBe('1 - 备选项 1')
    expect(wrapper.find('.panel-header span.count').text()).toBe('no')
  })

  it('check', async () => {
    const wrapper = mount({
      template: `
        <transfer
          :data="testData"
          v-model="value"
        />
      `,
      components: { Transfer },
      created() {
        this.testData = getTestData()
      },
      data() {
        return {
          value: [],
        }
      },
    })

    const leftList: any = wrapper.findComponent({ name: 'TransferPanel' })
    leftList.vm.handleAllCheckedChange({ target: { checked: true } })
    await nextTick()
    expect(leftList.vm.checked.length).toBe(12)
  })

  it('show buttons', async () => {
    const wrapper = mount({
      template: `
        <transfer
          :data="testData"
          :show-buttons="false"
          v-model="value"
        />
      `,
      components: { Transfer },
      created() {
        this.testData = getTestData()
      },
      data() {
        return {
          value: [],
        }
      },
    })
    expect(wrapper.findAll('.transfer-buttons').length).toBe(0)

    const firstCheckbox = wrapper.findAll('.transfer-panel.left .panel-list > label')[0]
    await firstCheckbox.trigger('click')
    await nextTick()
    expect(wrapper.findAll('.transfer-panel.left .panel-list > label').length).toBe(14)
    expect(wrapper.findAll('.transfer-panel.right .panel-list > label').length).toBe(1)

    const diabledCheckbox = wrapper.findAll('.transfer-panel.left .panel-list > label')[2]
    await diabledCheckbox.trigger('click')
    await nextTick()
    expect(wrapper.findAll('.transfer-panel.left .panel-list > label').length).toBe(14)
    expect(wrapper.findAll('.transfer-panel.right .panel-list > label').length).toBe(1)
  })

  describe('target order', () => {
    it('original(default)', async () => {
      const wrapper = mount({
        template: `
          <transfer
            :data="testData"
            v-model="value"
            :left-default-checked="[2, 3]"
          />
        `,
        components: { Transfer },
        created() {
          this.testData = getTestData()
        },
        data() {
          return {
            value: [1, 4],
          }
        },
      })

      const HlTransfer: any = wrapper.findComponent({ name: 'Transfer' })
      HlTransfer.vm.addToRight()
      await nextTick()
      const targetItems = wrapper.findAll('.transfer-buttons + .transfer-panel .panel-body .checkbox-label')
      expect(targetItems.map(item => item.text())).toStrictEqual(['备选项 1', '备选项 2', '备选项 3', '备选项 4'])
    })

    it('push', async () => {
      const wrapper = mount({
        template: `
          <transfer
            :data="testData"
            v-model="value"
            :left-default-checked="[2, 3]"
            target-order="push"
          />
        `,
        components: { Transfer },
        created() {
          this.testData = getTestData()
        },
        data() {
          return {
            value: [1, 4],
          }
        },
      })

      const HlTransfer: any = wrapper.findComponent({ name: 'Transfer' })
      HlTransfer.vm.addToRight()
      await nextTick()
      const targetItems = wrapper.findAll('.transfer-buttons + .transfer-panel .panel-body .checkbox-label')
      expect(targetItems.map(item => item.text()))
        .toStrictEqual(['备选项 1', '备选项 4', '备选项 2', '备选项 3'])
    })

    it('unshift', async () => {
      const wrapper = mount({
        template: `
          <transfer
            :data="testData"
            v-model="value"
            :left-default-checked="[2, 3]"
            target-order="unshift"
          />
        `,
        components: { Transfer },
        created() {
          this.testData = getTestData()
        },
        data() {
          return {
            value: [1, 4],
          }
        },
      })

      const HlTransfer: any = wrapper.findComponent({ name: 'Transfer' })
      HlTransfer.vm.addToRight()
      await nextTick()
      const targetItems = wrapper.findAll('.transfer-buttons + .transfer-panel .panel-body .checkbox-label')
      expect(targetItems.map(item => item.text())).toStrictEqual(['备选项 2', '备选项 3', '备选项 1', '备选项 4'])
    })
  })
})
