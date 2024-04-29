import { mount } from '@vue/test-utils'
import { describe, expect, vi, test } from 'vitest'
import { nextTick } from 'vue'
import Collapse from '../src/collapse.vue'
import CollapseItem from '../src/collapse-item.vue'

describe('Collapse.vue', () => {
  test('create', async () => {
    const wrapper = mount({
      components: {
        'hl-collapse': Collapse,
        'hl-collapse-item': CollapseItem,
      },
      data() {
        return {
          activeNames: ['1'],
        }
      },
      template: `
        <hl-collapse v-model="activeNames">
          <hl-collapse-item title="title1" name="1">
            <div class="content">111</div>
          </hl-collapse-item>
          <hl-collapse-item title="title2" name="2">
            <div class="content">222</div>
          </hl-collapse-item>
          <hl-collapse-item title="title3" name="3">
            <div class="content">333</div>
          </hl-collapse-item>
          <hl-collapse-item title="title4" name="4">
            <div class="content">444</div>
          </hl-collapse-item>
        </hl-collapse>
      `,
    })

    const vm: any = wrapper.vm
    const collapseWrapper = wrapper.findComponent(Collapse)
    const collapseItemWrappers: any = collapseWrapper.findAllComponents(CollapseItem)
    const collapseItemHeaderEls = vm.$el.querySelectorAll('.item-header')
    expect(collapseItemWrappers[0].vm.isActive).toBe(true)

    collapseItemHeaderEls[2].click()
    await nextTick()
    expect(collapseItemWrappers[0].vm.isActive).toBe(true)
    expect(collapseItemWrappers[2].vm.isActive).toBe(true)
    collapseItemHeaderEls[0].click()
    await nextTick()
    expect(collapseItemWrappers[0].vm.isActive).toBe(false)
  })

  test('accordion', async () => {
    const wrapper = mount({
      components: {
        'hl-collapse': Collapse,
        'hl-collapse-item': CollapseItem,
      },
      data() {
        return {
          activeNames: ['1'],
        }
      },
      template: `
        <hl-collapse accordion v-model="activeNames">
          <hl-collapse-item title="title1" name="1">
            <div class="content">111</div>
          </hl-collapse-item>
          <hl-collapse-item title="title2" name="2">
            <div class="content">222</div>
          </hl-collapse-item>
          <hl-collapse-item title="title3" name="3">
            <div class="content">333</div>
          </hl-collapse-item>
          <hl-collapse-item title="title4" name="4">
            <div class="content">444</div>
          </hl-collapse-item>
        </hl-collapse>
      `,
    })

    const vm = wrapper.vm
    const collapseWrapper: any = wrapper.findComponent(Collapse)
    const collapseItemWrappers = collapseWrapper.findAllComponents(CollapseItem)
    const collapseItemHeaderEls = vm.$el.querySelectorAll('.item-header')
    expect(collapseItemWrappers[0].vm.isActive).toBe(true)

    collapseItemHeaderEls[2].click()
    await nextTick()
    expect(collapseItemWrappers[0].vm.isActive).toBe(false)
    expect(collapseItemWrappers[2].vm.isActive).toBe(true)
    collapseItemHeaderEls[0].click()
    await nextTick()
    expect(collapseItemWrappers[0].vm.isActive).toBe(true)
    expect(collapseItemWrappers[2].vm.isActive).toBe(false)
  })

  test('event:change', async () => {
    const onChange = vi.fn()
    const wrapper = mount({
      components: {
        'hl-collapse': Collapse,
        'hl-collapse-item': CollapseItem,
      },
      data() {
        return {
          activeNames: ['1'],
        }
      },
      template: `
        <hl-collapse v-model="activeNames" @change="onChange">
          <hl-collapse-item title="title1" name="1">
            <div class="content">111</div>
          </hl-collapse-item>
          <hl-collapse-item title="title2" name="2">
            <div class="content">222</div>
          </hl-collapse-item>
          <hl-collapse-item title="title3" name="3">
            <div class="content">333</div>
          </hl-collapse-item>
          <hl-collapse-item title="title4" name="4">
            <div class="content">444</div>
          </hl-collapse-item>
        </hl-collapse>
      `,
      methods: {
        onChange,
      },
    })

    const vm = wrapper.vm
    const collapseWrapper: any = wrapper.findComponent(Collapse)
    const collapseItemWrappers = collapseWrapper.findAllComponents(CollapseItem)
    const collapseItemHeaderEls = vm.$el.querySelectorAll('.item-header')
    expect(collapseItemWrappers[0].vm.isActive).toBe(true)
    expect(vm.activeNames).toEqual(['1'])
    expect(onChange).not.toHaveBeenCalled()
    collapseItemHeaderEls[2].click()
    await nextTick()
    expect(onChange).toHaveBeenCalledTimes(1)
    expect(collapseItemWrappers[0].vm.isActive).toBe(true)
    expect(collapseItemWrappers[2].vm.isActive).toBe(true)
    expect(vm.activeNames).toEqual(['1', '3'])
    collapseItemHeaderEls[0].click()
    await nextTick()
    expect(onChange).toHaveBeenCalledTimes(2)
    expect(collapseItemWrappers[0].vm.isActive).toBe(false)
    expect(vm.activeNames).toEqual(['3'])
  })

  test('deep watch modelValue', async () => {
    const wrapper = mount({
      components: {
        'hl-collapse': Collapse,
        'hl-collapse-item': CollapseItem,
      },
      data() {
        return {
          activeNames: ['1'],
        }
      },
      mounted() {
        this.activeNames.push('2')
      },
      template: `
        <hl-collapse v-model="activeNames">
          <hl-collapse-item title="title1" name="1">
            <div class="content">111</div>
          </hl-collapse-item>
          <hl-collapse-item title="title2" name="2">
            <div class="content">222</div>
          </hl-collapse-item>
          <hl-collapse-item title="title3" name="3">
            <div class="content">333</div>
          </hl-collapse-item>
          <hl-collapse-item title="title4" name="4">
            <div class="content">444</div>
          </hl-collapse-item>
        </hl-collapse>
      `,
    })

    await nextTick()
    const collapseWrapper: any = wrapper.findComponent(Collapse)
    const collapseItemWrappers = collapseWrapper.findAllComponents(CollapseItem)
    expect(collapseItemWrappers[0].vm.isActive).toBe(true)
    expect(collapseItemWrappers[1].vm.isActive).toBe(true)
  })

})
