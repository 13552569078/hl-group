import { mount } from '@vue/test-utils'
import { usePrefix } from '@hongluan-ui/test-utils/utils'
import { describe, expect, test } from 'vitest'
import { HlFormItem } from '@hongluan-ui/components/form-item'
import Checkbox from '../src/checkbox.vue'
import CheckboxGroup from '../src/checkbox-group.vue'
import { nextTick } from 'vue'

const { prefix } = usePrefix()
const _mount = <D>(template: string, data: () => D, otherObj?: Record<string, unknown>) => mount<D>({
  components: {
    'hl-checkbox': Checkbox,
    'hl-checkbox-group': CheckboxGroup,
    'hl-form-item': HlFormItem,
  },
  template,
  data,
  ...otherObj,
})

describe('Checkbox', () => {
  const rootClazz = `${prefix}-checkbox`
  test('create', async () => {
    const wrapper = _mount('<hl-checkbox v-model="checkbox"/>', () => ({ checkbox: false }))
    expect(wrapper.classes()).toContain(rootClazz)
    expect(wrapper.classes()).not.toContain('is-disabled')
    await wrapper.trigger('click')
    expect(wrapper.classes()).toContain('is-checked')
    await wrapper.trigger('click')
    expect(wrapper.classes('is-checked')).toBe(false)
  })

  test('no v-model', async () => {
    const wrapper = _mount('<hl-checkbox label="a"/>', () => ({ checkbox: false }))
    expect(wrapper.classes('is-checked')).toBe(false)
  })

  test('disabled', async () => {
    const wrapper = _mount('<hl-checkbox v-model="checkbox" disabled label="a"/>', () => ({ checkbox: false }))
    expect(wrapper.classes()).toContain('is-disabled')
    await wrapper.trigger('click')
    expect(wrapper.classes()).toContain('is-disabled')
  })

  test('type', async () => {
    const wrapper = _mount('<hl-checkbox v-model="checkbox" type="danger" />', () => ({ checkbox: false }))
    expect(wrapper.classes()).toContain('danger')
  })

  test('custom', async () => {
    const wrapper = _mount('<hl-checkbox v-model="checkbox" custom />', () => ({ checkbox: false }))
    expect(wrapper.classes()).toContain('custom')
    expect(wrapper.find('.checkbox-inner').exists()).toBeFalsy()
    expect(wrapper.find('.checkbox-label').exists()).toBeFalsy()
  })

  test('change event', async () => {
    const wrapper = _mount(
      `<hl-checkbox v-model="checked" @change="onChange" />`,
      () => ({
        data: null,
        checked: false,
      }),
      {
        methods: {
          onChange(this: any, val: boolean) {
            this.data = val
          },
        },
      },
    )

    const vm = wrapper.vm
    await wrapper.trigger('click')
    expect(vm.data).toBe(true)
  })

  test('checkbox is wrapped in label', async () => {
    const wrapper = _mount(
      ` <hl-form-item label="test">
          <label>
            <hl-checkbox v-model="checked" @change="onChange" />
          </label>
        </hl-form-item>
      `,
      () => ({
        data: null,
        checked: true,
      }),
      {
        methods: {
          onChange(this: any, val: boolean) {
            this.data = val
          },
        },
      },
    )

    const vm = wrapper.vm
    await wrapper.findComponent(Checkbox).trigger('click')
    expect(vm.data).toBe(false)
  })

  test('checkbox group', async () => {
    const wrapper = _mount(
      `
      <hl-checkbox-group v-model="checkList">
        <hl-checkbox label="a" ref="a"></hl-checkbox>
        <hl-checkbox label="b" ref="b"></hl-checkbox>
        <hl-checkbox label="c" ref="c"></hl-checkbox>
        <hl-checkbox label="d" ref="d"></hl-checkbox>
      </hl-checkbox-group>
      `,
      () => ({ checkList: [] }),
    )
    const vm = wrapper.vm
    expect(vm.checkList.length).toBe(0)
    await wrapper.findComponent({ ref: 'a' }).trigger('click')
    expect(vm.checkList.length).toBe(1)
    expect(vm.checkList).toContain('a')
    await wrapper.findComponent({ ref: 'b' }).trigger('click')
    expect(vm.checkList.length).toBe(2)
    expect(vm.checkList).toContain('a')
    expect(vm.checkList).toContain('b')
  })

  test('checkbox group without modelValue', async () => {
    const wrapper = _mount(
      `
      <hl-checkbox-group v-model="checkList">
        <hl-checkbox label="a" ref="a"></hl-checkbox>
        <hl-checkbox label="b" ref="b"></hl-checkbox>
        <hl-checkbox label="c" ref="c"></hl-checkbox>
        <hl-checkbox label="d" ref="d"></hl-checkbox>
      </hl-checkbox-group>
      `,
      () => ({ checkList: undefined }),
    )
    const vm: any = wrapper.vm
    await wrapper.findComponent({ ref: 'a' }).trigger('click')
    expect(vm.checkList.length).toBe(1)
    expect(vm.checkList).toContain('a')
  })

  test('checkbox group change', async () => {
    const wrapper = _mount(
      `
      <hl-checkbox-group v-model="checkList" @change="onChange">
        <hl-checkbox label="a" ref="a"></hl-checkbox>
        <hl-checkbox label="b" ref="b"></hl-checkbox>
      </hl-checkbox-group>
      `,
      () => ({ checkList: [], data: null }),
      {
        methods: {
          onChange(this: any, val: string[]) {
            this.data = val
          },
        },
      },
    )
    const vm: any = wrapper.vm
    await wrapper.findComponent({ ref: 'a' }).trigger('click')
    await nextTick()
    expect(vm.data.length).toBe(1)
    expect(vm.data).toEqual(['a'])
  })

  test('nested group', async () => {
    const wrapper = _mount(
      `
      <hl-checkbox-group v-model="checkList">
        <div>
          <hl-checkbox label="a" ref="a"></hl-checkbox>
          <hl-checkbox label="b" ref="b"></hl-checkbox>
          <hl-checkbox label="c" ref="c"></hl-checkbox>
          <hl-checkbox label="d" ref="d"></hl-checkbox>
        </div>
      </hl-checkbox-group>
      `,
      () => ({ checkList: [] }),
    )
    const vm = wrapper.vm
    expect(vm.checkList.length).toBe(0)
    await wrapper.findComponent({ ref: 'a' }).trigger('click')
    expect(vm.checkList).toEqual(['a'])
  })

  test('true false label', async () => {
    const wrapper = _mount(
      `<hl-checkbox true-label="a" :false-label="3" v-model="checked"></hl-checkbox>`,
      () => ({
        checked: 'a',
      }),
    )
    const vm = wrapper.vm
    await wrapper.trigger('click')
    expect(vm.checked).toBe(3)
  })

  test('check', () => {
    const wrapper = _mount(
      `
      <div>
        <hl-checkbox v-model="checked" checked></hl-checkbox>
        <hl-checkbox-group v-model="checklist">
          <hl-checkbox checked label="a"></hl-checkbox>
        </hl-checkbox-group>
      </div>
      `,
      () => ({
        checked: false,
        checklist: [],
      }),
    ) as any
    expect(wrapper.vm.checked).toBe(true)
    expect(wrapper.vm.checklist).toEqual(['a'])
  })

  test('test min max', async () => {
    const wrapper = _mount(
      `
      <div>
        <hl-checkbox-group v-model="checklist" :min="1" :max="3">
          <hl-checkbox label="a" ref="a"></hl-checkbox>
          <hl-checkbox label="b" ref="b"></hl-checkbox>
          <hl-checkbox label="c" ref="c"></hl-checkbox>
          <hl-checkbox label="d" ref="d"></hl-checkbox>
        </hl-checkbox-group>
      </div>
      `,
      () => ({
        checklist: [],
      }),
    ) as any

    const vm = wrapper.vm
    expect(vm.checklist.length).toBe(0)
    await wrapper.findComponent({ ref: 'a' }).trigger('click')
    await wrapper.findComponent({ ref: 'b' }).trigger('click')
    await wrapper.findComponent({ ref: 'c' }).trigger('click')
    expect(vm.checklist).toEqual(['a', 'b', 'c'])
    await wrapper.findComponent({ ref: 'd' }).trigger('click')
    expect(vm.checklist).toEqual(['a', 'b', 'c'])
    await wrapper.findComponent({ ref: 'c' }).trigger('click')
    await wrapper.findComponent({ ref: 'b' }).trigger('click')
    await wrapper.findComponent({ ref: 'a' }).trigger('click')
    expect(vm.checklist).toEqual(['a'])
  })

  test('checked', () => {
    const wrapper = _mount(
      `<hl-checkbox checked />`,
      () => ({}))
    expect(wrapper.find(`.${prefix}-checkbox`).classes().toString()).toMatch('is-checked')
  })

  test('label', async() => {
    const wrapper = _mount(
      `
      <div>
        <hl-checkbox-group v-model="checklist">
          <hl-checkbox label="">all</hl-checkbox>
          <hl-checkbox label="a">a</hl-checkbox>
          <hl-checkbox label="b">b</hl-checkbox>
        </hl-checkbox-group>
      </div>
      `,
      () => ({
        checked: false,
        checklist: [],
      }),
    )
    const checkbox = wrapper.find(`.${prefix}-checkbox`)
    await checkbox.trigger('click')
    expect(wrapper.vm.checklist[0]).toEqual('')
  })

  describe('form item accessibility integration', () => {
    test('checkbox, no label, automatic label attachment', async () => {
      const wrapper = _mount(
        `
        <hl-form-item ref="item" label="Test">
          <hl-checkbox ref="checkbox" />
        </hl-form-item>
        `,
        () => ({}),
      )
      await nextTick()
      const formItem = await wrapper.findComponent({ ref: 'item' })
      const checkbox = await wrapper.findComponent({ ref: 'checkbox' })
      const formItemLabel = formItem.find('.form-label > *')
      const checkboxInput = checkbox.find('.checkbox-input')
      expect(checkboxInput.attributes().id).toBe(formItemLabel.attributes().for)
    })

    test('checkbox with label, form item is group', async () => {
      const wrapper = _mount(
        `
        <hl-form-item ref="item" label="Test">
          <hl-checkbox label="Foo" ref="checkbox" />
        </hl-form-item>
        `,
        () => ({}),
      )
      await nextTick()
      const formItem = await wrapper.findComponent({ ref: 'item' })
      const checkbox = await wrapper.findComponent({ ref: 'checkbox' })
      const checkboxLabel = checkbox.find('.checkbox-label')
      const checkboxInput = checkbox.find('.checkbox-input')
      expect(checkboxLabel.element.textContent).toBe('Foo')
      expect(checkboxInput.attributes().id).toBeFalsy()
      expect(formItem.attributes().role).toBe('group')
    })

    test('single checkbox group in form item', async () => {
      const wrapper = _mount(
        `
        <hl-form-item ref="item" label="Test">
          <hl-checkbox-group ref="checkboxGroup">
            <hl-checkbox label="Foo" />
            <hl-checkbox label="Bar" />
          </hl-checkbox-group>
        </hl-form-item>
        `,
        () => ({}),
      )
      await nextTick()
      const formItem = await wrapper.findComponent({ ref: 'item' })
      const checkboxGroup = await wrapper.findComponent({
        ref: 'checkboxGroup',
      })
      const formItemLabel = formItem.find('.form-label > *')
      expect(formItem.attributes().role).toBeFalsy()
      expect(checkboxGroup.attributes().role).toBe('group')
      expect(formItemLabel.attributes().for).toBe(checkboxGroup.attributes().id)
      expect(formItemLabel.attributes().id).toBe(
        checkboxGroup.attributes()['aria-labelledby'],
      )
    })

    test('single checkbox group in form item, override label', async () => {
      const wrapper = _mount(
        `
        <hl-form-item ref="item" label="Test">
          <hl-checkbox-group label="Foo" ref="checkboxGroup">
            <hl-checkbox label="Foo" />
            <hl-checkbox label="Bar" />
          </hl-checkbox-group>
        </hl-form-item>
        `,
        () => ({}),
      )
      await nextTick()
      const formItem = await wrapper.findComponent({ ref: 'item' })
      const checkboxGroup = await wrapper.findComponent({
        ref: 'checkboxGroup',
      })
      const formItemLabel = formItem.find('.form-label > *')
      expect(formItemLabel.attributes().for).toBe(checkboxGroup.attributes().id)
      expect(checkboxGroup.attributes().role).toBe('group')
      expect(checkboxGroup.attributes()['aria-label']).toBe('Foo')
      expect(checkboxGroup.attributes()['aria-labelledby']).toBeFalsy()
    })

    test('multiple checkbox groups in form item', async () => {
      const wrapper = _mount(
        `
        <hl-form-item ref="item" label="Test">
          <hl-checkbox-group label="Foo" ref="checkboxGroup1">
            <hl-checkbox label="Foo" />
            <hl-checkbox label="Bar" />
          </hl-checkbox-group>
          <hl-checkbox-group label="Bar" ref="checkboxGroup2">
            <hl-checkbox label="Foo" />
            <hl-checkbox label="Bar" />
          </hl-checkbox-group>
        </hl-form-item>
        `,
        () => ({}),
      )
      await nextTick()
      const formItem = await wrapper.findComponent({ ref: 'item' })
      const checkboxGroup1 = await wrapper.findComponent({
        ref: 'checkboxGroup1',
      })
      const checkboxGroup2 = await wrapper.findComponent({
        ref: 'checkboxGroup2',
      })
      const formItemLabel = formItem.find('.form-label > *')
      expect(formItem.attributes().role).toBe('group')
      expect(formItem.attributes()['aria-labelledby']).toBe(
        formItemLabel.attributes().id,
      )
      expect(checkboxGroup1.attributes().role).toBe('group')
      expect(checkboxGroup1.attributes()['aria-label']).toBe('Foo')
      expect(checkboxGroup1.attributes()['aria-labelledby']).toBeFalsy()
      expect(checkboxGroup2.attributes().role).toBe('group')
      expect(checkboxGroup2.attributes()['aria-label']).toBe('Bar')
      expect(checkboxGroup2.attributes()['aria-labelledby']).toBeFalsy()
    })
  })


  test('label is object', async () => {
    const wrapper = _mount(
      `
      <div>
        <hl-checkbox-group v-model="checklist">
          <hl-checkbox :label="{ a: 1 }">all</hl-checkbox>
          <hl-checkbox :label="{ a: 2 }">a</hl-checkbox>
          <hl-checkbox :label="{ b: 1 }">b</hl-checkbox>
        </hl-checkbox-group>
      </div>
      `,
      () => ({
        checked: false,
        checklist: [],
      }),
    )

    const checkbox = wrapper.find(`.${prefix}-checkbox`)
    await checkbox.trigger('click')
    expect(wrapper.vm.checklist[0]).toEqual({ a: 1 })
    expect(checkbox.classes()).contains('is-checked')
  })
  test('label is object with initial values', async () => {
    const wrapper = _mount(
      `
      <div>
        <hl-checkbox-group v-model="checklist">
          <hl-checkbox :label="{ a: 1 }" ref="a1">all</hl-checkbox>
          <hl-checkbox :label="{ a: 2 }" ref="a2">a</hl-checkbox>
          <hl-checkbox :label="{ b: 1 }" ref="b1">b</hl-checkbox>
        </hl-checkbox-group>
      </div>
      `,
      () => ({
        checked: false,
        checklist: [{ a: 1 }],
      }),
    )
    expect(wrapper.vm.checklist.length).toBe(1)
    const checkboxA1 = wrapper.findComponent({ ref: 'a1' })
    const checkboxA2 = wrapper.findComponent({ ref: 'a2' })
    await checkboxA2.trigger('click')
    expect(wrapper.vm.checklist).toEqual([{ a: 1 }, { a: 2 }])
    expect(checkboxA1.classes()).contains('is-checked')
    expect(checkboxA2.classes()).contains('is-checked')
    await checkboxA1.trigger('click')
    expect(wrapper.vm.checklist).toEqual([{ a: 2 }])
    expect(checkboxA1.classes()).not.contains('is-checked')
  })

})

