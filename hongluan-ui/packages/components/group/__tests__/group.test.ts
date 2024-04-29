import { mount } from '@vue/test-utils'
import { usePrefix } from '@hongluan-ui/test-utils/utils'
import { afterEach, describe, expect, test, vi } from 'vitest'
import Group from '../src/group'

describe('Group', () => {
  const { prefix } = usePrefix()
  test('render', () => {
    const wrapper = mount(Group, {
      props: {
        full: true,
        indent: true,
        merge: true,
      },
    })
    expect(wrapper.find(`.${prefix}-group`).exists()).toBeTruthy()
    expect(wrapper.find(`.horizontal`).exists()).toBeTruthy()
    expect(wrapper.find(`.full`).exists()).toBeTruthy()
    expect(wrapper.find(`.indent`).exists()).toBeTruthy()
    expect(wrapper.find(`.merge`).exists()).toBeTruthy()
  })
  test('indent: string', () => {
    const wrapper = mount(Group, {
      props: {
        indent: '12px',
      },
    })
    expect(wrapper.find(`.${prefix}-group`).exists()).toBeTruthy()
    expect(wrapper.element.getAttribute('style')?.indexOf('--indent: 12px') !== -1).toBeTruthy()
  })
  test('group item', () => {
    const TestComponent = {
      template: `<hl-group>
      <div class="outer1">
        <div class="inner"></div>
      </div>
      <div class="outer2"></div>
      <template v-if="1>0">
        <div class="outer3"></div>
        <div class="outer4"></div>
      </template>
      <template>
        <template>
          <div class="outer5"></div>
          <div class="outer6"></div>
        </template>
      </template>
    </hl-group>`,
      components: {
        'hl-group': Group,
      },
    }
    const wrapper = mount(TestComponent)
    expect(wrapper.find(`.${prefix}-group`).exists()).toBeTruthy()
    expect(wrapper.find(`.outer1`).classes()).toContain('group-item')
    expect(wrapper.find(`.outer2`).classes()).toContain('group-item')
    expect(wrapper.find(`.inner`).classes().length).toBe(1)
    expect(wrapper.find(`.outer3`).classes()).toContain('group-item')
    expect(wrapper.find(`.outer4`).classes()).toContain('group-item')
    expect(wrapper.find(`.outer5`).classes()).not.toContain('group-item')
    expect(wrapper.find(`.outer6`).classes()).not.toContain('group-item')
  })
})
