import { mount } from '@vue/test-utils'
import InputNumber from '../src/input-number.vue'
import { HlFormItem } from '@hongluan-ui/components/form-item'
import { describe, expect, test, it, vi } from 'vitest'
import { ref, nextTick } from 'vue'

const mouseup = new Event('mouseup')
const _mount = (options: any) => mount({
  components: {
    'hl-input-number': InputNumber,
    'hl-form-item': HlFormItem,
  },
  ...options,
})
describe('InputNumber.vue', () => {
  test('create', async () => {
    const wrapper = _mount({
      template: `
        <hl-input-number
          label="描述文字"
          v-model="num">
        </hl-input-number>
      `,
      setup() {
        const num = ref(1)
        return {
          num,
        }
      },
    })
    expect(wrapper.find('input').exists()).toBe(true)
  })
  test('modelValue', () => {
    const wrapper = _mount({
      template: '<hl-input-number :model-value="inputText" />',
      setup() {
        const inputText = ref(1)
        return {
          inputText,
        }
      },
    })
    expect(wrapper.find('input').element.value).toEqual('1')
  })
  test('set modelValue undefined to form validate', async () => {
    const wrapper = _mount({
      template:
        '<hl-input-number :model-value="num" placeholder="input number"/><p>{{num}}</p>',
      setup() {
        const num = ref(undefined)
        return {
          num,
        }
      },
    })
    await nextTick()
    expect(wrapper.find('p').element.innerText).toBeUndefined()
  })
  test('set modelValue undefined to display placeholder', async () => {
    const wrapper = _mount({
      template:
        '<hl-input-number :model-value="inputText" placeholder="input number"/>',
      setup() {
        const inputText = ref(1)
        return {
          inputText,
        }
      },
    })
    expect(wrapper.find('input').element.value).toEqual('1')
    wrapper.vm.inputText = undefined
    await nextTick()
    expect(wrapper.find('input').element.value).toEqual('')
    expect(wrapper.find('input').element.getAttribute('aria-valuenow')).toEqual('null')
  })
  // fix: #10328
  test('Make sure the input action can trigger the modelValue update', async () => {
    const num = ref<number>(0)
    const handleUpdate = (data: number | undefined) => {
      num.value = data!
    }
    const wrapper = mount(() => (
      <InputNumber modelValue={num.value} onUpdate:modelValue={handleUpdate} />
    ))
    const el = wrapper.find('input').element
    const simulateEvent = (text: string, event: string) => {
      el.value = text
      el.dispatchEvent(new Event(event))
    }
    simulateEvent('3', 'input')
    await nextTick()
    expect(num.value).toEqual(3)
  })
  test('min', async () => {
    const wrapper = _mount({
      template: '<hl-input-number :min="3" v-model="num" />',
      setup() {
        const num = ref(1)
        return {
          num,
        }
      },
    })
    expect(wrapper.find('input').element.value).toEqual('3')
    wrapper.find('.decrease').trigger('mousedown')
    document.dispatchEvent(mouseup)
    await nextTick()
    expect(wrapper.find('input').element.value).toEqual('3')
  })
  test('max', async () => {
    const wrapper = _mount({
      template: '<hl-input-number :max="3" v-model="num" />',
      setup() {
        const num = ref(5)
        return {
          num,
        }
      },
    })
    expect(wrapper.find('input').element.value).toEqual('3')
    wrapper.find('.increase').trigger('mousedown')
    document.dispatchEvent(mouseup)
    await nextTick()
    expect(wrapper.find('input').element.value).toEqual('3')
  })
  test('step, increase and decrease', async () => {
    document.body.innerHTML = '<div id="app"></div>'
    const wrapper = _mount({
      template: '<hl-input-number v-model="num" :step="2"/>',
      setup() {
        const num = ref(0)
        return {
          num,
        }
      },
    })
    wrapper.find('.decrease').trigger('mousedown')
    document.dispatchEvent(mouseup)
    await nextTick()
    expect(wrapper.find('input').element.value).toEqual('-2')
    wrapper.find('.increase').trigger('mousedown')
    document.dispatchEvent(mouseup)
    await nextTick()
    expect(wrapper.find('input').element.value).toEqual('0')
    wrapper.find('.increase').trigger('mousedown')
    document.dispatchEvent(mouseup)
    await nextTick()
    expect(wrapper.find('input').element.value).toEqual('2')
  })
  test('step-strictly', async () => {
    const wrapper = _mount({
      template: '<hl-input-number :step-strictly="true" :step="2" v-model="num" />',
      setup() {
        const num = ref(0)
        return {
          num,
        }
      },
    })
    await wrapper.find('input').setValue(3)
    expect(wrapper.find('input').element.value).toEqual('4')
  })

  test('value decimals miss prop precision', async () => {
    const num = ref(0.2)
    const wrapper = _mount({
      template: '<hl-input-number step-strictly :step="0.1" v-model="num" />',
      setup() {
        return {
          num,
        }
      },
    })
    const inputNumber = wrapper.findComponent({ name: 'InputNumber' }).vm
    inputNumber.increase()
    await nextTick()
    expect(wrapper.find('input').element.value).toEqual('0.3')
    num.value = 0.4
    await nextTick()
    inputNumber.decrease()
    await nextTick()
    expect(wrapper.find('input').element.value).toEqual('0.3')
  })

  describe('precision accuracy 2', () => {
    const wrapper = _mount({
      template: '<hl-input-number :precision="2" v-model="num" />',
      setup() {
        const num = ref(0)
        return {
          num,
        }
      },
    })
    it.each([
      [1.1111111111, '1.11'],
      [17.275, '17.28'],
      [17.2745, '17.27'],
      [1.09, '1.09'],
      [1.009, '1.01'],
      [10.999, '11.00'],
      [15, '15.00'],
      [15.5, '15.50'],
      [15.555, '15.56'],
    ])(
      'each precision accuracy test: $input $output',
      async (input, output) => {
        await wrapper.find('input').setValue(input)
        expect(wrapper.find('input').element.value).toEqual(`${output}`)
      },
    )
  })
  describe('precision accuracy 3', () => {
    const wrapper = _mount({
      template: '<hl-input-number :precision="3" v-model="num" />',
      setup() {
        const num = ref(0)
        return {
          num,
        }
      },
    })
    it.each([
      [1.1111111111, '1.111'],
      [17.275, '17.275'],
      [17.2745, '17.275'],
      [1.09, '1.090'],
      [10.999, '10.999'],
      [10.9999, '11.000'],
      [15.555, '15.555'],
      [1.3335, '1.334'],
    ])(
      'each precision accuracy test: $input $output',
      async (input, output) => {
        await wrapper.find('input').setValue(input)
        expect(wrapper.find('input').element.value).toEqual(`${output}`)
      },
    )
  })
  test('readonly', async () => {
    const num = ref(0)
    const handleFocus = vi.fn()
    const wrapper = _mount({
      template: '<hl-input-number readonly v-model="num" @focus="handleFocus"/>',
      setup() {
        return {
          num,
          handleFocus,
        }
      },
    })

    wrapper.find('input').trigger('focus')
    await nextTick()
    expect(handleFocus).toHaveBeenCalledTimes(1)

    wrapper.find('.group-item.decrease').trigger('mousedown')
    document.dispatchEvent(mouseup)
    await nextTick()
    expect(wrapper.find('input').element.value).toEqual('0')

    wrapper.find('.group-item.increase').trigger('mousedown')
    document.dispatchEvent(mouseup)
    await nextTick()
    expect(wrapper.find('input').element.value).toEqual('0')
  })

  test('disabled', async () => {
    const wrapper = _mount({
      template: '<hl-input-number :disabled="true" v-model="num" />',
      setup() {
        const num = ref(0)
        return {
          num,
        }
      },
    })
    wrapper.find('.decrease').trigger('mousedown')
    document.dispatchEvent(mouseup)
    await nextTick()
    expect(wrapper.find('input').element.value).toEqual('0')
    wrapper.find('.increase').trigger('mousedown')
    document.dispatchEvent(mouseup)
    await nextTick()
    expect(wrapper.find('input').element.value).toEqual('0')
  })
  test('controls', async () => {
    const wrapper = _mount({
      template: '<hl-input-number :controls="false" v-model="num" />',
      setup() {
        const num = ref(0)
        return {
          num,
        }
      },
    })
    expect(wrapper.find('.increase').exists()).toBe(false)
    expect(wrapper.find('.decrease').exists()).toBe(false)
  })
  test('controls-position:right', async () => {
    const wrapper = _mount({
      template: '<hl-input-number controls-position="right" v-model="num" />',
      setup() {
        const num = ref(0)
        return {
          num,
        }
      },
    })
    expect(wrapper.find('.right .increase').exists()).toBe(true)
    expect(wrapper.find('.right .decrease').exists()).toBe(true)
  })
  test('controls-position:left', async () => {
    const wrapper = _mount({
      template: '<hl-input-number controls-position="left" v-model="num" />',
      setup() {
        const num = ref(0)
        return {
          num,
        }
      },
    })
    expect(wrapper.find('.left .increase').exists()).toBe(true)
    expect(wrapper.find('.left .decrease').exists()).toBe(true)
  })
  test('input-event', async () => {
    const handleInput = vi.fn()
    const num = ref(0)
    const wrapper = _mount({
      template: '<hl-input-number v-model="num" @input="handleInput" />',
      setup() {
        return {
          num,
          handleInput,
        }
      },
    })
    const inputWrapper = wrapper.find('input')
    const nativeInput = inputWrapper.element
    nativeInput.value = '0'
    await inputWrapper.trigger('input')
    expect(handleInput).toBeCalledTimes(0)
    nativeInput.value = '1'
    await inputWrapper.trigger('input')
    expect(handleInput).toBeCalledTimes(1)
    expect(handleInput).toHaveBeenCalledWith(1)
    nativeInput.value = '2'
    await inputWrapper.trigger('input')
    expect(handleInput).toBeCalledTimes(2)
    expect(handleInput).toHaveBeenCalledWith(2)
    nativeInput.value = ''
    await inputWrapper.trigger('input')
    expect(handleInput).toBeCalledTimes(3)
    expect(handleInput).toHaveBeenCalledWith(null)
  })

  test('change-event', async () => {
    const wrapper = _mount({
      template: '<hl-input-number v-model="num" />',
      setup() {
        const num = ref(0)
        return {
          num,
        }
      },
    })
    wrapper.find('.increase').trigger('mousedown')
    document.dispatchEvent(mouseup)
    await nextTick()
    expect(wrapper.getComponent(InputNumber).emitted('change')).toHaveLength(1)
    expect(wrapper.getComponent(InputNumber).emitted().change[0]).toEqual([1, 0])
    expect(wrapper.getComponent(InputNumber).emitted('update:modelValue')).toHaveLength(1)
    wrapper.find('.increase').trigger('mousedown')
    document.dispatchEvent(mouseup)
    await nextTick()
    expect(wrapper.getComponent(InputNumber).emitted('change')).toHaveLength(2)
    expect(wrapper.getComponent(InputNumber).emitted().change[1]).toEqual([2, 1])
    expect(wrapper.getComponent(InputNumber).emitted('update:modelValue')).toHaveLength(2)
    await wrapper.find('input').setValue(0)
    expect(wrapper.getComponent(InputNumber).emitted('change')).toHaveLength(3)
    expect(wrapper.getComponent(InputNumber).emitted().change[2]).toEqual([
      0, 2,
    ])
    expect(
      wrapper.getComponent(InputNumber).emitted('update:modelValue'),
    ).toHaveLength(4)
  })
  test('blur-event', async () => {
    const wrapper = _mount({
      template: '<hl-input-number v-model="num" />',
      setup() {
        const num = ref(0)
        return {
          num,
        }
      },
    })
    await wrapper.find('input').trigger('blur')
    expect(wrapper.getComponent(InputNumber).emitted('blur')).toHaveLength(1)
  })
  test('focus-event', async () => {
    const wrapper = _mount({
      template: '<hl-input-number v-model="num" />',
      setup() {
        const num = ref(0)
        return {
          num,
        }
      },
    })
    await wrapper.find('input').trigger('focus')
    expect(wrapper.getComponent(InputNumber).emitted('focus')).toHaveLength(1)
  })

  test('clear with :value-on-clear="null"', async () => {
    const wrapper = _mount({
      template: '<hl-input-number v-model="num" :min="1" :max="10"/>',
      setup() {
        const num = ref(2)
        return {
          num,
        }
      },
    })
    const inputVm = wrapper.findComponent({ name: 'InputNumber' }).vm as any
    inputVm.handleInputChange('')
    await nextTick()
    expect(wrapper.vm.num).toBe(null)
    inputVm.increase()
    await nextTick()
    expect(wrapper.vm.num).toBe(1)
    inputVm.increase()
    await nextTick()
    expect(wrapper.vm.num).toBe(2)
    inputVm.handleInputChange('')
    await nextTick()
    expect(wrapper.vm.num).toBe(null)
    inputVm.decrease()
    await nextTick()
    expect(wrapper.vm.num).toBe(1)
    inputVm.decrease()
    await nextTick()
    expect(wrapper.vm.num).toBe(1)
  })

  test('clear with value-on-clear="min"', async () => {
    const wrapper = _mount({
      template:
        '<hl-input-number v-model="num" value-on-clear="min" :min="1" :max="10"/>',
      setup() {
        const num = ref(2)
        return {
          num,
        }
      },
    })
    const inputVm = wrapper.findComponent({ name: 'InputNumber' }).vm as any
    inputVm.handleInputChange('')
    await nextTick()
    expect(wrapper.vm.num).toBe(1)
    inputVm.increase()
    await nextTick()
    expect(wrapper.vm.num).toBe(2)
    inputVm.handleInputChange('')
    await nextTick()
    expect(wrapper.vm.num).toBe(1)
    inputVm.decrease()
    await nextTick()
    expect(wrapper.vm.num).toBe(1)
  })

  test('clear with value-on-clear="max"', async () => {
    const wrapper = _mount({
      template:
        '<hl-input-number v-model="num" value-on-clear="max" :min="1" :max="10"/>',
      setup() {
        const num = ref(2)
        return {
          num,
        }
      },
    })
    const inputVm = wrapper.findComponent({ name: 'InputNumber' }).vm as any
    inputVm.handleInputChange('')
    await nextTick()
    expect(wrapper.vm.num).toBe(10)
    inputVm.increase()
    await nextTick()
    expect(wrapper.vm.num).toBe(10)
    inputVm.handleInputChange('')
    await nextTick()
    expect(wrapper.vm.num).toBe(10)
    inputVm.decrease()
    await nextTick()
    expect(wrapper.vm.num).toBe(9)
  })

  test('clear with :value-on-clear="5"', async () => {
    const wrapper = _mount({
      template:
        '<hl-input-number v-model="num" :value-on-clear="5" :min="1" :max="10"/>',
      setup() {
        const num = ref(2)
        return {
          num,
        }
      },
    })
    const inputVm = wrapper.findComponent({ name: 'InputNumber' }).vm as any
    inputVm.handleInputChange('')
    await nextTick()
    expect(wrapper.vm.num).toBe(5)
    inputVm.increase()
    await nextTick()
    expect(wrapper.vm.num).toBe(6)
    inputVm.handleInputChange('')
    await nextTick()
    expect(wrapper.vm.num).toBe(5)
    inputVm.decrease()
    await nextTick()
    expect(wrapper.vm.num).toBe(4)
  })

  test('check increase and decrease button when modelValue not in [min, max]', async () => {
    const wrapper = _mount({
      template: `
      <hl-input-number
        ref="inputNumber1"
        v-model="num1"
        :min="1"
        :max="10"
      />
      <hl-input-number
        ref="inputNumber2"
        v-model="num2"
        :min="1"
        :max="10"
      />`,
      setup() {
        const num1 = ref(-5)
        const num2 = ref(15)
        const inputNumber1 = ref(null)
        const inputNumber2 = ref(null)
        return {
          num1,
          num2,
          inputNumber1,
          inputNumber2,
        }
      },
    })
    const hlInputNumber1 = wrapper.vm.inputNumber1
    const hlInputNumber2 = wrapper.vm.inputNumber2
    expect(wrapper.vm.num1).toBe(1)
    expect(wrapper.vm.num2).toBe(10)

    hlInputNumber1.decrease()
    await nextTick()
    expect(wrapper.vm.num1).toBe(1)
    hlInputNumber1.increase()
    await nextTick()
    expect(wrapper.vm.num1).toBe(2)
    hlInputNumber1.increase()
    await nextTick()
    expect(wrapper.vm.num1).toBe(3)


    hlInputNumber2.increase()
    await nextTick()
    expect(wrapper.vm.num2).toBe(10)
    hlInputNumber2.decrease()
    await nextTick()
    expect(wrapper.vm.num2).toBe(9)
    hlInputNumber2.decrease()
    await nextTick()
    expect(wrapper.vm.num2).toBe(8)
  })
  test('prefix & suffix', async () => {
    const wrapper = _mount({
      template: `
        <hl-input-number
          label="描述文字"
          v-model="num">
          <template #prefix><span class="has-prefix">$</span></template>
          <template #suffix><span class="has-suffix">元</span></template>
        </hl-input-number>
      `,
      setup() {
        const num = ref(1)
        return {
          num,
        }
      },
    })
    expect(wrapper.find('.has-prefix').exists()).toBe(true)
    expect(wrapper.find('.has-suffix').exists()).toBe(true)
  })

  describe('form item accessibility integration', () => {
    test('automatic id attachment', async () => {
      const wrapper = _mount({
        template: `<hl-form-item label="Foobar" data-test-ref="item">
          <hl-input-number />
        </hl-form-item>`,
      })

      await nextTick()
      const formItem = wrapper.find('[data-test-ref="item"]')
      const formItemLabel = formItem.find('.form-label > *')
      const innerInput = wrapper.find('input')
      expect(formItem.attributes().role).toBeFalsy()
      expect(formItemLabel.attributes().for).toBe(innerInput.attributes().id)
    })

    test('specified id attachment', async () => {
      const wrapper = _mount({
        template: `<hl-form-item label="Foobar" data-test-ref="item">
          <hl-input-number id="foobar" />
        </hl-form-item>`,
      })

      await nextTick()
      const formItem = wrapper.find('[data-test-ref="item"]')
      const formItemLabel = formItem.find('.form-label > *')
      const innerInput = wrapper.find('input')
      expect(formItem.attributes().role).toBeFalsy()
      expect(innerInput.attributes().id).toBe('foobar')
      expect(formItemLabel.attributes().for).toBe(innerInput.attributes().id)
    })

    test('form item role is group when multiple inputs', async () => {
      const wrapper = _mount({
        template: `<hl-form-item label="Foobar" data-test-ref="item">
          <hl-input-number />
          <hl-input-number />
        </hl-form-item>`,
      })

      await nextTick()
      const formItem = wrapper.find('[data-test-ref="item"]')
      expect(formItem.attributes().role).toBe('group')
    })
  })

})
