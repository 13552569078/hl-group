import { mount } from '@vue/test-utils'
import { nextTick } from 'vue'
import { describe, expect, test, it } from 'vitest'
// import { EVENT_CODE } from '@hongluan-ui/utils/aria'
import { usePrefix } from '@hongluan-ui/test-utils/utils'
import { HlFormItem } from '@hongluan-ui/components/form-item'
import Radio from '../src/radio.vue'
import RadioGroup from '../src/radio-group.vue'

const _mount = (template: string, data: any, otherObj?: any) => mount({
  components: {
    'hl-radio': Radio,
    'hl-radio-group': RadioGroup,
    'hl-form-item': HlFormItem,
  },
  template,
  data,
  ...otherObj,
})

describe('Radio', () => {
  const { prefix } = usePrefix()
  test('create', async () => {
    const wrapper = _mount(`<hl-radio v-model="radio" label="a">
    </hl-radio>`, () => ({ radio: '' }))
    expect(wrapper.classes()).toContain(prefix + '-radio')
    await wrapper.trigger('click')
    expect(wrapper.classes()).toContain('is-checked')
  })

  test('disabled', async () => {

    const wrapper = _mount(`<hl-radio
    v-model="radio"
    label="3"
    disabled
  >
  </hl-radio>`, () => ({ radio: '' }))
    await wrapper.trigger('click')
    const vm = wrapper.vm as any
    expect(vm.radio).toBe('')
    expect(wrapper.classes()).toContain('is-disabled')
  })

  test('change event', async () => {
    const wrapper = _mount(`<hl-radio
    v-model="radio"
    label="3"
    @change="handleChange"
  >
  </hl-radio>`, () => ({
      radio: '',
      changeData: '',
    }), {
      methods: {
        handleChange(val: any) {
          this.changeData = val
        },
      },
    })
    const vm = wrapper.vm as any
    await wrapper.trigger('click')
    await nextTick()
    expect(vm.changeData).toEqual('3')
  })

  test('change event only triggers on user input', async () => {
    const wrapper = _mount(`<hl-radio
    v-model="radio"
    label="3"
    @change="handleChange"
  >
  </hl-radio>`, () => ({
      radio: '',
      changeData: '',
    }), {
      methods: {
        handleChange(val: any) {
          this.changeData = val
        },
      },
    })
    const vm = wrapper.vm as any
    vm.radio = '3'
    await nextTick()
    expect(vm.changeData).toEqual('')
    expect(vm.radio).toEqual('3')
  })
})

describe('Radio group', () => {

  it('create', async () => {
    const wrapper = _mount(`<hl-radio-group v-model="radio">
    <hl-radio :label="3" ref="radio1">3</hl-radio>
    <hl-radio :label="6" ref="radio2">6</hl-radio>
    <hl-radio :label="9">9</hl-radio>
  </hl-radio-group>`, () => ({
      radio: 3,
    }))
    const radio1 = wrapper.findComponent({ ref: 'radio1' })
    expect(radio1.classes()).toContain('is-checked')
    const radio2 = wrapper.findComponent({ ref: 'radio2' })
    await radio2.trigger('click')
    expect(radio2.classes()).toContain('is-checked')
    const vm = wrapper.vm as any
    expect(vm.radio).toEqual(6)
  })

  it('id auto derive', async () => {
    const wrapper1 = _mount(
      `<hl-radio-group v-model="radio">
        <hl-radio :label="3" ref="radio1">3</hl-radio>
        <hl-radio :label="6" ref="radio2">6</hl-radio>
        <hl-radio :label="9">9</hl-radio>
      </hl-radio-group>`,
      () => ({
        radio: 3,
      }),
    )

    const wrapper2 = _mount(
      `<hl-radio-group v-model="radio">
        <hl-radio :label="3" ref="radio1">3</hl-radio>
        <hl-radio :label="6" ref="radio2">6</hl-radio>
        <hl-radio :label="9">9</hl-radio>
      </hl-radio-group>`,
      () => ({
        radio: 3,
      }),
    )

    const id1 = wrapper1
      .findComponent({ name: 'Radio' })
      .find('input')
      .attributes('name')

    const id2 = wrapper2
      .findComponent({ name: 'Radio' })
      .find('input')
      .attributes('name')

    expect(id1).not.toEqual(id2)
  })


  it('disabled', async () => {
    const wrapper = _mount(`<hl-radio-group v-model="radio" disabled>
    <hl-radio :label="3" ref="radio1">3</hl-radio>
    <hl-radio :label="6" ref="radio2">6</hl-radio>
    <hl-radio :label="9">7</hl-radio>
  </hl-radio-group>`, () => ({
      radio: 3,
    }))

    expect(wrapper.find('label.is-disabled').exists()).toBe(true)
    const radio1 = wrapper.findComponent({ ref: 'radio1' })
    expect(radio1.classes()).toContain('is-checked')
    const radio2 = wrapper.findComponent({ ref: 'radio2' })
    await radio2.trigger('click')
    const vm = wrapper.vm as any
    expect(vm.radio).toEqual(3)
    expect(radio1.classes()).toContain('is-checked')
  })
  it('change event', async () => {
    const wrapper = _mount(`<hl-radio-group v-model="radio" @change="onChange">
    <hl-radio :label="3">3</hl-radio>
    <hl-radio :label="6" ref="radio2">6</hl-radio>
    <hl-radio :label="9">9</hl-radio>
  </hl-radio-group>`, () => ({
      radio: 3,
      data: 0,
    }), {
      methods: {
        onChange(val: any) {
          this.data = val
        },
      },
    })

    const radio2 = wrapper.findComponent({ ref: 'radio2' })
    await radio2.trigger('click')
    await nextTick()
    const vm = wrapper.vm as any
    expect(vm.data).toEqual(6)
  })
  it('change event only triggers on user input', async () => {
    const wrapper = _mount(`<hl-radio-group v-model="radio" @change="onChange">
    <hl-radio :label="3">3</hl-radio>
    <hl-radio :label="6" ref="radio2">6</hl-radio>
    <hl-radio :label="9">9</hl-radio>
  </hl-radio-group>`, () => ({
      radio: 3,
      data: 0,
    }), {
      methods: {
        onChange(val: any) {
          this.data = val
        },
      },
    })
    const vm = wrapper.vm as any
    vm.radio = 6
    await nextTick()
    expect(vm.data).toEqual(0)
  })
  it('disabled when children is radio', async () => {
    const wrapper = _mount(`<hl-radio-group v-model="radio" disabled>
    <hl-radio :label="3" ref="radio1">3</hl-radio>
    <hl-radio :label="6" ref="radio2">6</hl-radio>
    <hl-radio :label="9">9</hl-radio>
  </hl-radio-group>`, () => ({
      radio: 3,
    }))

    const radio1 = wrapper.findComponent({ ref: 'radio1' })
    const radio2 = wrapper.findComponent({ ref: 'radio2' })
    expect(radio1.classes()).toContain('is-checked')
    expect(wrapper.findAll('.is-disabled').length).toBe(3)
    await radio2.trigger('click')
    const vm = wrapper.vm as any
    expect(vm.radio).toEqual(3)
    expect(radio1.classes()).toContain('is-checked')
  })
  it('radio group gap', async () => {
    const wrapper = _mount(`<hl-radio-group v-model="radio" @change="onChange" gap="6px">
    <hl-radio :label="3">3</hl-radio>
    <hl-radio :label="6" ref="radio2">6</hl-radio>
    <hl-radio :label="9">9</hl-radio>
  </hl-radio-group>`, () => ({
      radio: 3,
      data: 0,
    }), {
      methods: {
        onChange(val: any) {
          this.data = val
        },
      },
    })
    expect(wrapper.attributes('style')!.indexOf('--group-gap-x: 6px') > -1).toBeTruthy()
    expect(wrapper.attributes('style')!.indexOf('--group-gap-y: 6px') > -1).toBeTruthy()
  })


  describe('form item accessibility integration', () => {
    test('single radio group in form item', async () => {
      const wrapper = _mount(
        `
        <hl-form-item ref="item" label="Test">
          <hl-radio-group ref="radioGroup">
            <hl-radio label="Foo" />
            <hl-radio label="Bar" />
          </hl-radio-group>
        </hl-form-item>
        `,
        () => ({}),
      )
      await nextTick()
      const formItem = await wrapper.findComponent({ ref: 'item' })
      const radioGroup = await wrapper.findComponent({
        ref: 'radioGroup',
      })
      const formItemLabel = formItem.find('.form-label > *')
      expect(formItem.attributes().role).toBeFalsy()
      expect(radioGroup.attributes().role).toBe('radiogroup')
      expect(formItemLabel.attributes().for).toBe(radioGroup.attributes().id)
      expect(formItemLabel.attributes().id).toBe(
        radioGroup.attributes()['aria-labelledby'],
      )
    })

    test('single radio group in form item, override label', async () => {
      const wrapper = _mount(
        `
        <hl-form-item ref="item" label="Test">
          <hl-radio-group label="Foo" ref="radioGroup">
            <hl-radio label="Foo" />
            <hl-radio label="Bar" />
          </hl-radio-group>
        </hl-form-item>
        `,
        () => ({}),
      )
      await nextTick()
      const formItem = await wrapper.findComponent({ ref: 'item' })
      const radioGroup = await wrapper.findComponent({
        ref: 'radioGroup',
      })
      const formItemLabel = formItem.find('.form-label > *')
      expect(formItemLabel.attributes().for).toBe(radioGroup.attributes().id)
      expect(radioGroup.attributes().role).toBe('radiogroup')
      expect(radioGroup.attributes()['aria-label']).toBe('Foo')
      expect(radioGroup.attributes()['aria-labelledby']).toBeFalsy()
    })

    test('multiple radio groups in form item', async () => {
      const wrapper = _mount(
        `
        <hl-form-item ref="item" label="Test">
          <hl-radio-group label="Foo" ref="radioGroup1">
            <hl-radio label="Foo" />
            <hl-radio label="Bar" />
          </hl-radio-group>
          <hl-radio-group label="Bar" ref="radioGroup2">
            <hl-radio label="Foo" />
            <hl-radio label="Bar" />
          </hl-radio-group>
        </hl-form-item>
        `,
        () => ({}),
      )
      await nextTick()
      const formItem = await wrapper.findComponent({ ref: 'item' })
      const radioGroup1 = await wrapper.findComponent({
        ref: 'radioGroup1',
      })
      const radioGroup2 = await wrapper.findComponent({
        ref: 'radioGroup2',
      })
      const formItemLabel = formItem.find('.form-label > *')
      expect(formItem.attributes().role).toBe('group')
      expect(formItem.attributes()['aria-labelledby']).toBe(
        formItemLabel.attributes().id,
      )
      expect(radioGroup1.attributes().role).toBe('radiogroup')
      expect(radioGroup1.attributes()['aria-label']).toBe('Foo')
      expect(radioGroup1.attributes()['aria-labelledby']).toBeFalsy()
      expect(radioGroup2.attributes().role).toBe('radiogroup')
      expect(radioGroup2.attributes()['aria-label']).toBe('Bar')
      expect(radioGroup2.attributes()['aria-labelledby']).toBeFalsy()
    })
  })

})
