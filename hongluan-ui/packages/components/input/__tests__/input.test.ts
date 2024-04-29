import { nextTick, ref } from 'vue'
import { mount } from '@vue/test-utils'
import { usePrefix } from '@hongluan-ui/test-utils/utils'
import { describe, expect, test, vi } from 'vitest'
import defineGetter from '@hongluan-ui/test-utils/define-getter'
import HlIcon from '@hongluan-ui/components/icon'
import { SystemClose } from '@hongluan-ui/components/system-icon'
import Input from '../src/input.vue'

const _mount = (options: any) => mount({
  components: {
    'hl-input': Input,
    HlIcon,
    SystemClose,
  },
  ...options,
})

describe('Input.vue', () => {
  // const { prefix } = usePrefix()
  test('create', async () => {
    const handleFocus = vi.fn()
    const wrapper = _mount({
      template: `
        <hl-input
          :minlength="3"
          :maxlength="5"
          placeholder="请输入内容"
          @focus="handleFocus"
          :model-value="input">
        </hl-input>
      `,
      setup() {
        const input = ref('input')

        return {
          input,
          handleFocus,
        }
      },
    })

    const inputElm = wrapper.find('input')
    const vm = wrapper.vm as any
    const nativeInput = inputElm.element

    await inputElm.trigger('focus')

    expect(inputElm.exists()).toBe(true)
    expect(handleFocus).toHaveBeenCalled()
    expect(nativeInput.placeholder).toBe('请输入内容')
    expect(nativeInput.value).toBe('input')
    expect(nativeInput.minLength).toBe(3)
    // expect(nativeInput.maxLength).toBe(5)

    vm.input = 'text'
    await nextTick()
    expect(inputElm.element.value).toBe('text')
  })

  test('default to empty', () => {
    const wrapper = _mount({
      template: '<hl-input />',
    })
    const inputElm = wrapper.find('input')
    expect(inputElm.element.value).toBe('')
  })

  test('disabled', () => {
    const wrapper = _mount({
      template: `<hl-input disabled />`,
    })
    const inputElm = wrapper.find('input')
    expect(inputElm.element.disabled).not.toBeNull()
  })

  describe('test emoji',()=>{
    test('hl-input should minimize value between emoji length and maxLength', async () => {
      const wrapper = _mount({
        template: `<hl-input class="test-exceed" maxlength="4" show-word-limit v-model="inputVal" />`,
        setup() {
          const inputVal = ref('12🌚')
          return { inputVal }
        },
      })
      const vm = wrapper.vm
      const inputElm = wrapper.find('input')
      const nativeInput = inputElm.element
      expect(nativeInput.value).toBe('12🌚')

      const elCount = wrapper.find('.input-count')
      expect(elCount.exists()).toBe(true)
      expect(elCount.text()).toBe('3 / 4')

      vm.inputVal = '1👌3😄'
      await nextTick()
      expect(nativeInput.value).toBe('1👌3😄')
      expect(elCount.text()).toBe('4 / 4')

      vm.inputVal = '哈哈1👌3😄'
      await nextTick()
      expect(nativeInput.value).toBe('哈哈1👌3😄')
      expect(elCount.text()).toBe('6 / 4')
      expect(vm.$el.classList.contains('is-exceed')).toBe(true)
    })

    test('textarea should minimize value between emoji length and maxLength', async () => {
      const wrapper = _mount({
        template: `<hl-input native-type="textarea"  maxlength="4" show-word-limit v-model="inputVal" />`,
        setup() {
          const inputVal = ref('啊好😄')
          return { inputVal }
        },
      })
      const vm = wrapper.vm
      const inputElm = wrapper.find('textarea')
      const nativeInput = inputElm.element
      expect(nativeInput.value).toBe('啊好😄')

      const elCount = wrapper.find('.input-count')
      expect(elCount.exists()).toBe(true)
      expect(elCount.text()).toBe('3 / 4')

      vm.inputVal = '哈哈1👌3😄'
      await nextTick()
      expect(nativeInput.value).toBe('哈哈1👌3😄')
      expect(elCount.text()).toBe('6 / 4')
      expect(vm.$el.classList.contains('is-exceed')).toBe(true)
    })
  })

  test('suffixIcon', () => {
    const wrapper = _mount({
      template: `<hl-input><template #suffix><hl-icon><system-close /></hl-icon></template></hl-input>`,
    })
    const icon = wrapper.find('svg')
    expect(icon.exists()).toBe(true)
  })

  test('prefixIcon', () => {
    const wrapper = _mount({
      template: `<hl-input><template #prefix><hl-icon><system-close /></hl-icon></template></hl-input>`,
    })
    const icon = wrapper.find('svg')
    expect(icon.exists()).toBe(true)
  })

  test('size', () => {
    const wrapper = _mount({
      template: `<hl-input size="lg" />`,
    })
    expect(wrapper.classes('lg')).toBe(true)
  })

  test('type', () => {
    const wrapper = _mount({
      template: `<hl-input native-type="textarea" />`,
    })
    expect(wrapper.find('textarea')).toBeDefined()
  })

  test('rows', () => {
    const wrapper = _mount({
      template: `<hl-input native-type="textarea" :rows="3" />`,
    })
    expect(wrapper.find('textarea').element.rows).toEqual(3)
  })

  test('resize', async() => {
    const wrapper = _mount({
      template: `
        <div>
          <hl-input native-type="textarea" :resize="resize" />
        </div>
      `,
      data() {
        return {
          resize: 'none',
        }
      },
    })
    const vm = wrapper.vm as any
    const textarea = wrapper.find('textarea').element
    await nextTick()
    expect(textarea.style.resize).toEqual(vm.resize)
    vm.resize = 'horizontal'
    await nextTick()
    expect(textarea.style.resize).toEqual(vm.resize)
  })

  // TODO: Due to jsdom's reason this case cannot run well, may be fixed later using headlesschrome or puppeteer
  // test('autosize', async() => {
  //   const wrapper = _mount({
  //     template: `<div>
  //       <hl-input
  //         ref="limitSize"
  //         native-type="textarea"
  //         :autosize="{minRows: 3, maxRows: 5}"
  //         v-model="textareaValue"
  //       />
  //     </div>`,
  //     data() {
  //       return {
  //         textareaValue: 'sda\ndasd\nddasdsda\ndasd\nddasdsda\ndasd\nddasdsda\ndasd\nddasd',
  //       }
  //     },
  //   })
  //   const limitSizeInput = wrapper.vm.$refs.limitSize
  //   const limitlessSizeInput = wrapper.vm.$refs.limitlessSize
  //   await nextTick()
  //   expect(limitSizeInput.computedTextareaStyle.height).toEqual('117px')
  //   expect(limitlessSizeInput.computedTextareaStyle.height).toEqual('201px')

  //   wrapper.vm.textareaValue = ''
  //   await nextTick()
  //   expect(limitSizeInput.computedTextareaStyle.height).toEqual('75px')
  //   expect(limitlessSizeInput.computedTextareaStyle.height).toEqual('33px')
  // })

  test('sets value on textarea / input type change', async () => {
    const wrapper = _mount({
      template: `<hl-input :native-type="type" v-model="val" />`,
      data() {
        return {
          type: 'text',
          val: '123',
        }
      },
    })
    const vm = wrapper.vm as any
    expect(vm.$el.querySelector('input').value).toEqual('123')
    vm.type = 'textarea'
    await nextTick()
    await nextTick()
    expect(vm.$el.querySelector('textarea').value).toEqual('123')
    vm.type = 'password'
    await nextTick()
    await nextTick()
    expect(vm.$el.querySelector('input').value).toEqual('123')
  })

  test('limit input and show word count', async () => {
    const wrapper = _mount({
      template: `
        <div>
          <hl-input
            class="test-text"
            native-type="text"
            v-model="input1"
            maxlength="10"
            :show-word-limit="show">
          </hl-input>
          <hl-input
            class="test-textarea"
            native-type="textarea"
            v-model="input2"
            maxlength="10"
            show-word-limit>
          </hl-input>
          <hl-input
            class="test-password"
            native-type="password"
            v-model="input3"
            maxlength="10"
            show-word-limit>
          </hl-input>
          <hl-input
            class="test-initial-exceed"
            native-type="text"
            v-model="input4"
            maxlength="2"
            show-word-limit>
          </hl-input>
        </div>
      `,
      data() {
        return {
          input1: '',
          input2: '',
          input3: '',
          input4: 'exceed',
          show: false,
        }
      },
    })

    const inputElm1 = wrapper.vm.$el.querySelector('.test-text')
    const inputElm2 = wrapper.vm.$el.querySelector('.test-textarea')
    const inputElm3 = wrapper.vm.$el.querySelector('.test-password')
    const inputElm4 = wrapper.vm.$el.querySelector('.test-initial-exceed')

    expect(inputElm1.querySelectorAll('.input-count').length).toEqual(0)
    expect(inputElm2.querySelectorAll('.input-count').length).toEqual(1)
    expect(inputElm3.querySelectorAll('.input-count').length).toEqual(0)
    expect(inputElm4.classList.contains('is-exceed')).toBe(true)

    const vm = wrapper.vm as any
    vm.show = true
    await nextTick()
    expect(inputElm1.querySelectorAll('.input-count').length).toEqual(1)

    vm.input4 = '1'
    await nextTick()
    expect(inputElm4.classList.contains('is-exceed')).toBe(false)
  })

  describe('Input Methods', () => {

    test('method:select', async () => {
      const testContent = 'test'
      const wrapper = _mount({
        template: `<hl-input v-model="text" />`,
        data() {
          return {
            text: testContent,
          }
        },
      })

      const input = wrapper.find('input').element
      // mock selectionRange behaviour, due to jsdom's reason this case cannot run well, may be fixed later using headlesschrome or puppeteer
      let selected = false
      defineGetter(input, 'selectionStart', function(this: HTMLInputElement) {
        return selected ? 0 : this.value.length
      })
      defineGetter(input, 'selectionEnd', function(this: HTMLInputElement) {
        return this.value.length
      })

      expect(input.selectionStart).toEqual(testContent.length)
      expect(input.selectionEnd).toEqual(testContent.length)

      input.select()
      selected = true
      await nextTick()
      expect(input.selectionStart).toEqual(0)
      expect(input.selectionEnd).toEqual(testContent.length)
    })
    test('method:resizeTextarea', async () => {
      const testContent = 'TEXT:resizeTextarea'
      const wrapper = _mount({
        template: `<hl-input  ref="textareaRef"  :autosize="{ minRows: 1, maxRows: 1 }" native-type="textarea" v-model="text" />`,
        data() {
          return {
            text: testContent,
          }
        },
      })
      const ref = wrapper.vm.$refs.textareaRef as any
      const originMinHeight = ref.textareaStyle.minHeight

      ref.autosize.minRows = 5
      ref.resizeTextarea()
      // Atfer this textarea min-height (style)  will change
      const nowMinHeight = ref.textareaStyle[1].minHeight
      expect(originMinHeight).not.toEqual(nowMinHeight)
    })
  })

  describe('Input Events', () => {
    const handleFocus = vi.fn()
    const handleBlur = vi.fn()

    test('event:focus & blur', async () => {
      const wrapper = _mount({
        template: `<hl-input
          placeholder="请输入内容"
          :model-value="input"
          @focus="handleFocus"
          @blur="handleBlur"
        />`,
        setup() {
          const input = ref('')

          return {
            input,
            handleFocus,
            handleBlur,
          }
        },
      })

      const input = wrapper.find('input')

      await input.trigger('focus')
      expect(handleFocus).toBeCalled()

      await input.trigger('blur')
      expect(handleBlur).toBeCalled()
    })

    test('event:change', async() => {
      // NOTE: should be same as native's change behavior
      const wrapper = _mount({
        template: `
          <hl-input
            placeholder="请输入内容"
            :model-value="input"
            @change="handleChange"
          />
        `,
        data() {
          return {
            input: 'a',
            val: '',
          }
        },
        methods: {
          handleChange(val: any) {
            this.val = val
          },
        },
      })

      const el = wrapper.find('input').element
      const vm = wrapper.vm as any
      const simulateEvent = (text: string, event: string) => {
        el.value = text
        el.dispatchEvent(new Event(event))
      }

      // simplified test, component should emit change when native does
      simulateEvent('2', 'change')
      await nextTick()
      expect(vm.val).toBe('2')
      simulateEvent('1', 'input')
      await nextTick()
      expect(vm.val).toBe('2')
    })

    test('event:clear', async() => {
      const handleClear = vi.fn()
      const handleInput = vi.fn()
      const wrapper = _mount({
        template: `
          <hl-input
            placeholder="请输入内容"
            clearable
            v-model="input"
            @clear="handleClear"
            @input="handleInput"
          />
        `,
        setup() {
          const input = ref('a')

          return {
            input,
            handleClear,
            handleInput,
          }
        },
      })

      const input = wrapper.find('input')
      const vm = wrapper.vm as any
      // focus to show clear button
      await input.trigger('focus')
      await nextTick()
      vm.$el.querySelector('.input-close').click()
      await nextTick()
      expect(vm.input).toEqual('')
      expect(handleClear).toBeCalled()
      expect(handleInput).toBeCalled()
    })

    test('event:input', async() => {
      const handleInput = vi.fn()
      const wrapper = _mount({
        template: `
          <hl-input
            placeholder="请输入内容"
            clearable
            :model-value="input"
            @input="handleInput"
          />
        `,
        setup() {
          const input = ref('a')
          return {
            input,
            handleInput,
          }
        },
      })
      const vm = wrapper.vm as any
      const inputWrapper = wrapper.find('input')
      const nativeInput = inputWrapper.element
      nativeInput.value = '1'
      await inputWrapper.trigger('compositionstart')
      await inputWrapper.trigger('input')
      nativeInput.value = '2'
      await inputWrapper.trigger('compositionupdate')
      await inputWrapper.trigger('input')
      await inputWrapper.trigger('compositionend')
      expect(handleInput).toBeCalledTimes(1)
      // native input value is controlled
      expect(vm.input).toEqual('a')
      expect(nativeInput.value).toEqual('a')
    })
  })

  test('non-emit event such as keyup should work', async () => {
    const handleKeyup = vi.fn()
    const wrapper = mount(Input, {
      attrs: {
        onKeyup: handleKeyup,
      },
    })

    await wrapper.find('input').trigger('keyup')
    expect(handleKeyup).toBeCalledTimes(1)
  })

  test('input-style', async () => {
    const wrapper = _mount({
      template: `
          <hl-input
            placeholder="请输入内容"
            :input-style="{color: 'red'}"
          />
          <hl-input
            placeholder="请输入内容"
            :input-style="{color: 'red'}"
            native-type="textarea"
          />
        `,
    })

    const input = wrapper.find('input')
    const textarea = wrapper.find('textarea')
    await nextTick()
    expect(input.element.style.color === 'red').toBeTruthy()
    expect(textarea.element.style.color === 'red').toBeTruthy()
  })

  describe('Textarea Events', () => {
    test('event:keydown', async () => {
      const handleKeydown = vi.fn()
      const wrapper = _mount({
        template: `<hl-input
          native-type="textarea"
          :model-value="val"
          @keydown="handleKeydown"
        />`,
        setup() {
          const val = ref('')

          return {
            val,
            handleKeydown,
          }
        },
      })

      await wrapper.find('textarea').trigger('keydown')
      expect(handleKeydown).toBeCalledTimes(1)
    })
  })

  // TODO: validateEvent & input containes select cases should be added after the rest components finished
  // ...

})
