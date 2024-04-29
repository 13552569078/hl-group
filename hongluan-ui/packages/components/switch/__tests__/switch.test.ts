import { mount } from '@vue/test-utils'
import { usePrefix } from '@hongluan-ui/test-utils/utils'
import { HlFormItem } from '@hongluan-ui/components/form-item'
import { afterEach, describe, expect, test, vi } from 'vitest'
import { debugWarn } from '@hongluan-ui/utils'
import Switch from '../src/switch.vue'
import { nextTick } from 'vue'

vi.mock('@hongluan-ui/utils/error', () => ({
  debugWarn: vi.fn(),
}))

describe('Switch.vue', () => {
  afterEach(() => {
    vi.clearAllMocks()
  })

  const { prefix } = usePrefix()
  test('create', () => {
    const wrapper = mount(Switch, {
      props: {
        activeText: 'on',
        inactiveText: 'off',
        activeColor: '#0f0',
        inactiveColor: '#f00',
        width: '100px',
      },
    })
    const vm = wrapper.vm
    const coreEl = vm.$el.querySelector('em')
    expect(coreEl.style.backgroundColor).toEqual('rgb(255, 0, 0)')
    expect(wrapper.element.getAttribute('style')?.indexOf('--switch-width:') !== -1).toBeTruthy()
  })

  test('switch with loading', () => {
    const wrapper = mount(Switch, {
      props: {
        loading: true,
      },
    })

    expect(wrapper.classes()).toContain('is-disabled')
    expect(wrapper.find(`.${prefix}-spinner`).exists()).toBeTruthy()
  })

  test('custom icon', async () => {
    const wrapper = mount({
      components: {
        'hl-switch': Switch,
      },
      template: `
        <div>
          <hl-switch :value="true"><template #icon><span class="custom-text">$</span></template></hl-switch>
        </div>
      `,
    })
    const iconWrapper = wrapper.find(`.custom-text`)
    expect(iconWrapper.exists()).toBe(true)
  })

  test('tabindex', () => {
    const wrapper = mount(Switch, {
      props: {
        tabindex: '0',
      },
    })
    expect(wrapper.find('input').attributes().tabindex).toBe('0')
  })

  test('value correctly update', async () => {
    const wrapper = mount({
      components: {
        'hl-switch': Switch,
      },
      template: `
        <div>
          <hl-switch
            v-model="value"
            activeColor="#0f0"
            inactiveColor="#f00">
          </hl-switch>
        </div>
      `,
      data() {
        return {
          value: true,
        }
      },
    })
    const vm = wrapper.vm
    const coreEl = vm.$el.querySelector('.core')
    expect(coreEl.style.backgroundColor).toEqual('rgb(0, 255, 0)')
    const coreWrapper = wrapper.find('.core')
    await coreWrapper.trigger('click')
    expect(coreEl.style.backgroundColor).toEqual('rgb(255, 0, 0)')
    expect(vm.value).toEqual(false)
    await coreWrapper.trigger('click')
    expect(vm.value).toEqual(true)
  })

  test('change event', async () => {
    const wrapper = mount({
      components: {
        'hl-switch': Switch,
      },
      template: `
        <div>
          <hl-switch
            v-model="value"
            @update:model-value="handleChange">
          </hl-switch>
        </div>
      `,
      methods: {
        handleChange(val: number) {
          this.target = val
        },
      },
      data() {
        return {
          target: 1,
          value: true,
        }
      },
    })
    const vm = wrapper.vm

    expect(vm.target).toEqual(1)
    const coreWrapper = wrapper.find('.core')
    await coreWrapper.trigger('click')
    const switchWrapper = wrapper.findComponent(Switch)
    expect(switchWrapper.emitted()['update:modelValue']).toBeTruthy()
    expect(vm.target).toEqual(false)
  })

  test('disabled switch should not respond to user click', async () => {
    const wrapper = mount({
      components: {
        'hl-switch': Switch,
      },
      template: `
        <div>
          <hl-switch disabled v-model="value"></hl-switch>
        </div>
      `,
      data() {
        return {
          value: true,
        }
      },
    })
    const vm = wrapper.vm

    expect(vm.value).toEqual(true)
    const coreWrapper = wrapper.find('.core')
    await coreWrapper.trigger('click')
    expect(vm.value).toEqual(true)
  })

  test('expand switch value', async () => {
    const wrapper = mount({
      components: {
        'hl-switch': Switch,
      },
      template: `
        <div>
          <hl-switch v-model="value" :active-value="onValue" :inactive-value="offValue"></hl-switch>
        </div>
      `,
      data() {
        return {
          value: '100',
          onValue: '100',
          offValue: '0',
        }
      },
    })
    const vm = wrapper.vm

    const coreWrapper = wrapper.find('.core')
    await coreWrapper.trigger('click')
    expect(vm.value).toEqual('0')
    await coreWrapper.trigger('click')
    expect(vm.value).toEqual('100')
  })

  test('value is the single source of truth', async () => {
    const wrapper = mount({
      components: {
        'hl-switch': Switch,
      },
      template: `
        <div>
          <hl-switch :value="true"></hl-switch>
        </div>
      `,
    })
    const vm = wrapper.vm
    const coreWrapper = wrapper.find('.core')
    const switchWrapper = wrapper.findComponent(Switch)
    const switchVm = switchWrapper.vm
    const inputEl = vm.$el.querySelector('input')

    expect(switchVm.checked).toBe(true)
    expect(switchWrapper.classes('is-checked')).toEqual(true)
    expect(inputEl.checked).toEqual(true)
    await coreWrapper.trigger('click')
    expect(switchVm.checked).toBe(true)
    expect(switchWrapper.classes('is-checked')).toEqual(true)
    expect(inputEl.checked).toEqual(true)
  })

  test('model-value is the single source of truth', async () => {
    const wrapper = mount({
      components: {
        'hl-switch': Switch,
      },
      template: `
        <div>
          <hl-switch :model-value="true"></hl-switch>
        </div>
      `,
    })
    const vm = wrapper.vm
    const coreWrapper = wrapper.find('.core')
    const switchWrapper = wrapper.findComponent(Switch)
    const switchVm = switchWrapper.vm
    const inputEl = vm.$el.querySelector('input')

    expect(switchVm.checked).toBe(true)
    expect(switchWrapper.classes('is-checked')).toEqual(true)
    expect(inputEl.checked).toEqual(true)
    await coreWrapper.trigger('click')
    expect(switchVm.checked).toBe(true)
    expect(switchWrapper.classes('is-checked')).toEqual(true)
    expect(inputEl.checked).toEqual(true)
  })

  test('sets checkbox value', async () => {
    const wrapper = mount({
      components: {
        'hl-switch': Switch,
      },
      template: `
        <div>
          <hl-switch v-model="value"></hl-switch>
        </div>
      `,
      data() {
        return {
          value: false,
        }
      },
    })
    const vm = wrapper.vm
    const inputEl = vm.$el.querySelector('input')

    vm.value = true
    await vm.$nextTick()
    expect(inputEl.checked).toEqual(true)
    vm.value = false
    await vm.$nextTick()
    expect(inputEl.checked).toEqual(false)
  })

  test('beforeChange function return promise', async () => {
    const wrapper = mount({
      components: {
        'hl-switch': Switch,
      },
      template: `
        <div>
          <hl-switch
            v-model="value"
            :loading="loading"
            :before-change="beforeChange"
          />
        </div>
      `,
      data() {
        return {
          value: true,
          loading: false,
          asyncResult: 'error',
        }
      },
      methods: {
        beforeChange(this: any) {
          this.loading = true
          return new Promise((resolve, reject) => {
            setTimeout(() => {
              this.loading = false
              return this.asyncResult == 'success'
                ? resolve(true)
                : reject(new Error('Error'))
            }, 1000)
          })
        },
      },
    })
    const vm = wrapper.vm

    const coreWrapper = wrapper.find('.core')
    vi.useFakeTimers()
    coreWrapper.trigger('click')
    vi.runAllTimers()
    await nextTick()
    expect(vm.value).toEqual(true)
    expect(debugWarn).toHaveBeenCalledTimes(0)

    vm.asyncResult = 'success'

    coreWrapper.trigger('click')
    vi.runAllTimers()
    await nextTick()
    expect(vm.value).toEqual(false)
    expect(debugWarn).toHaveBeenCalledTimes(1)

    await coreWrapper.trigger('click')
    vi.runAllTimers()
    await nextTick()
    expect(vm.value).toEqual(true)
    vi.useRealTimers()
    expect(debugWarn).toHaveBeenCalledTimes(1)

  })

  test('beforeChange function return boolean', async () => {
    const wrapper = mount({
      components: {
        'hl-switch': Switch,
      },
      template: `
        <div>
          <hl-switch
            v-model="value"
            :before-change="beforeChange"
          />
        </div>
      `,
      data() {
        return {
          value: true,
          result: false,
        }
      },
      methods: {
        beforeChange(): boolean {
          // do something ...
          return this.result
        },
      },
    })
    const vm = wrapper.vm

    const coreWrapper = wrapper.find('.core')

    await coreWrapper.trigger('click')
    expect(vm.value).toEqual(true)

    vm.result = true

    await coreWrapper.trigger('click')
    expect(vm.value).toEqual(false)

    await coreWrapper.trigger('click')
    expect(vm.value).toEqual(true)
  })


  describe('form item accessibility integration', () => {
    test('automatic id attachment', async () => {
      const wrapper = mount({
        template: `<hl-form-item label="Foobar" data-test-ref="item">
            <hl-switch />
          </hl-form-item>`,
        components: {
          'hl-switch': Switch,
          'hl-form-item': HlFormItem,
        },
      })

      await nextTick()
      const formItem = wrapper.find('[data-test-ref="item"]')
      const formItemLabel = formItem.find('.form-label > *')
      const switchInput = wrapper.find('[type="checkbox"]')
      expect(formItem.attributes().role).toBeFalsy()
      expect(formItemLabel.attributes().for).toBe(switchInput.attributes().id)
    })

    test('specified id attachment', async () => {
      const wrapper = mount({
        template: `<hl-form-item label="Foobar" data-test-ref="item">
            <hl-switch id="foobar" />
          </hl-form-item>`,
        components: {
          'hl-switch': Switch,
          'hl-form-item': HlFormItem,
        },
      })

      await nextTick()
      const formItem = wrapper.find('[data-test-ref="item"]')
      const formItemLabel = formItem.find('.form-label > *')
      const switchInput = wrapper.find('[type="checkbox"]')
      expect(formItem.attributes().role).toBeFalsy()
      expect(switchInput.attributes().id).toBe('foobar')
      expect(formItemLabel.attributes().for).toBe(switchInput.attributes().id)
    })

    test('form item role is group when multiple inputs', async () => {
      const wrapper = mount({
        template: `<hl-form-item label="Foobar" data-test-ref="item">
            <hl-switch />
            <hl-switch />
          </hl-form-item>`,
        components: {
          'hl-switch': Switch,
          'hl-form-item': HlFormItem,
        },
      })

      await nextTick()
      const formItem = wrapper.find('[data-test-ref="item"]')
      expect(formItem.attributes().role).toBe('group')
    })
  })

})
