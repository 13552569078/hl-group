import { defineComponent, nextTick } from 'vue'
import { mount } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'
import { HlFormItem } from '@hongluan-ui/components/form-item'
import ColorPicker from '../src/color-picker.vue'
import type { ComponentPublicInstance } from 'vue'

import type { Nullable } from '@hongluan-ui/utils'
import { usePrefix } from '@hongluan-ui/test-utils/utils'

const { prefix } = usePrefix()
vi.mock('lodash-unified', async () => {
  return {
    ...((await vi.importActual('lodash-unified')) as Record<string, any>),
    debounce: vi.fn(fn => {
      fn.cancel = vi.fn()
      fn.flush = vi.fn()
      return fn
    }),
  }
})

const _mount = (template: string, data: () => { [key: string]: any; }) => {
  const Component = defineComponent({
    components: {
      HlColorPicker: ColorPicker,
      HlFormItem,
    },
    data,
    template,
  })
  return mount(Component, {
    attachTo: 'body',
  })
}

type ColorPickerVM = ComponentPublicInstance<{
  handleClick: (opt: {
    target: Nullable<HTMLElement>
    type: string
    clientX: number
    clientY: number
  }) => void
  thumbTop: number
  thumbLeft: number
  handleDrag: (opt: { type: string; clientX: number; clientY: number; }) => void
}>

describe('Color-picker', () => {
  it('Mount Color-picker', () => {
    const wrapper = mount(ColorPicker)
    expect(wrapper.html()).toContain(`${prefix}-color-picker`)
    wrapper.unmount()
  })
  it('should show alpha slider when show-alpha=true', async () => {
    const wrapper = _mount(
      `<hl-color-picker v-model="color" :show-alpha="true"></hl-color-picker>`,
      () => ({
        color: '#20A0FF',
      }),
    )
    await wrapper.find('.picker-trigger').trigger('click')
    const alphaSlider = document.querySelector('.slider-bar.alpha')
    expect(alphaSlider).toBeTruthy()
    wrapper.unmount()
  })
  it('should show correct rgb value', async () => {
    const wrapper = _mount(
      `<hl-color-picker v-model="color"></hl-color-picker>`,
      () => ({
        color: '#20A0FF',
      }),
    )
    await wrapper.find('.picker-trigger').trigger('click')
    await nextTick()
    const input = document.querySelector<HTMLInputElement>(
      `.${prefix}-color-panel input`,
    )
    expect(input?.value.trim().toUpperCase()).toEqual('#20A0FF')
    wrapper.unmount()
  })
  it('should show correct hex value contains alpha', async () => {
    const wrapper = _mount(
      `<hl-color-picker v-model="color" color-format="hex" show-alpha></hl-color-picker>`,
      () => ({
        color: '#20A0FFEE',
      }),
    )
    await wrapper.find('.picker-trigger').trigger('click')
    await nextTick()
    const input = document.querySelector<HTMLInputElement>(
      `.${prefix}-color-panel input`,
    )
    expect(input?.value.trim().toUpperCase()).toEqual('#20A0FFEE')
    wrapper.unmount()
  })
  it('should pick a color when confirm button click', async () => {
    const wrapper = _mount(
      `<hl-color-picker v-model="color"></hl-color-picker>`,
      () => ({
        color: null,
      }),
    )

    await wrapper.find('.picker-trigger').trigger('click')
    document.querySelector<HTMLElement>('button.primary')?.click()
    await nextTick()
    expect(wrapper.vm.color).toEqual('#FF0000')
    wrapper.unmount()
  })
  it('should pick a color contains alpha when confirm button click', async () => {
    const wrapper = _mount(
      `<hl-color-picker v-model="color" color-format="hex" show-alpha></hl-color-picker>`,
      () => ({
        color: null,
      }),
    )

    await wrapper.find('.picker-trigger').trigger('click')
    document.querySelector<HTMLElement>('button.primary')?.click()
    await nextTick()
    expect(wrapper.vm.color).toEqual('#FF0000FF')
    wrapper.unmount()
  })
  it('should init the right color when open', async () => {
    const wrapper = _mount(
      `<hl-color-picker v-model="color"></hl-color-picker>`,
      () => ({
        color: '#0F0',
      }),
    )
    const colorPickerWrapper = wrapper.findComponent(ColorPicker)
    const hueSlideWrapper = colorPickerWrapper.findComponent({ ref: 'hue' })
    const hueSlideDom = hueSlideWrapper.element as HTMLElement
    const thumbDom = hueSlideWrapper.find<HTMLElement>(
      '.hue-slider .slider-handle',
    ).element
    const mockHueSlideHeight = vi
      .spyOn(hueSlideDom, 'offsetWidth', 'get')
      .mockImplementation(() => 200)
    const mockThumbDom = vi
      .spyOn(thumbDom, 'offsetWidth', 'get')
      .mockImplementation(() => 4)
    await wrapper.find('.picker-trigger').trigger('click')
    await nextTick()
    expect(
      (hueSlideWrapper.vm as ComponentPublicInstance<{ thumbLeft: number; }>)
        .thumbLeft > 10,
    ).toBeTruthy()
    mockHueSlideHeight.mockRestore()
    mockThumbDom.mockRestore()
    wrapper.unmount()
  })
  it('should show color picker when click trigger', async () => {
    const wrapper = _mount(
      `<hl-color-picker v-model="color"></hl-color-picker>`,
      () => ({
        color: '#0F0',
      }),
    )
    await wrapper.find('.picker-trigger').trigger('click')
    const dropdown = document.querySelector(`.${prefix}-color-picker-popper`)
    expect(dropdown).toBeTruthy()
    wrapper.unmount()
  })
  it('should clear a color when clear button click', async () => {
    const wrapper = _mount(
      `<hl-color-picker v-model="color"></hl-color-picker>`,
      () => ({
        color: '#0F0',
      }),
    )
    await wrapper.find('.picker-trigger').trigger('click')
    const clearBtn = document.querySelector<HTMLElement>(
      'button.link',
    )
    clearBtn?.click()
    expect(wrapper.vm.color).toEqual(null)
    wrapper.unmount()
  })
  it('should change hue when clicking the hue bar', async () => {
    const wrapper = _mount(
      `<hl-color-picker v-model="color"></hl-color-picker>`,
      () => ({
        color: '#F00',
      }),
    )
    await wrapper.find('.picker-trigger').trigger('click')
    const colorPickerWrapper = wrapper.findComponent(ColorPicker)
    const hueSlideWrapper = colorPickerWrapper.findComponent({ ref: 'hue' })
    const hueSlideDom = hueSlideWrapper.element
    const thumbDom = hueSlideWrapper.find<HTMLElement>(
      '.hue-slider .slider-handle',
    ).element
    const mockHueBarWidth = vi
      .spyOn(hueSlideDom, 'getBoundingClientRect')
      .mockReturnValue({
        height: 12,
        width: 176,
        x: 0,
        y: 0,
        left: 0,
      } as DOMRect)
    const mockThumbDom = vi
      .spyOn(thumbDom, 'offsetWidth', 'get')
      .mockReturnValue(4)
    ;(hueSlideWrapper.vm as ColorPickerVM).handleClick({
      target: null,
      type: 'mouseup',
      clientX: 100,
      clientY: 0,
    })
    const hue = colorPickerWrapper.vm.color.get('hue')
    expect(hue > 0).toBeTruthy()
    mockHueBarWidth.mockRestore()
    mockThumbDom.mockRestore()
    wrapper.unmount()
  })
  it('should change hue when saturation is zero', async () => {
    const wrapper = _mount(
      `<hl-color-picker v-model="color"></hl-color-picker>`,
      () => ({
        color: '20A0FF',
      }),
    )

    await wrapper.find('.picker-trigger').trigger('click')
    const colorPickerWrapper = wrapper.findComponent(ColorPicker)
    const hueSlideWrapper = colorPickerWrapper.findComponent({ ref: 'hue' })
    const hueSlideDom = hueSlideWrapper.element as HTMLElement
    const thumbDom = hueSlideWrapper.find<HTMLElement>(
      '.hue-slider .slider-handle',
    ).element
    const mockHueSlideRect = vi
      .spyOn(hueSlideDom, 'getBoundingClientRect')
      .mockReturnValue({
        height: 12,
        width: 176,
        x: 0,
        y: 0,
        left: 0,
      } as DOMRect)
    const mockHueSlideOffsetWidth = vi
      .spyOn(hueSlideDom, 'offsetWidth', 'get')
      .mockReturnValue(200)
    const mockThumbDom = vi
      .spyOn(thumbDom, 'offsetWidth', 'get')
      .mockReturnValue(4)
    ;(hueSlideWrapper.vm as ColorPickerVM).handleClick({
      target: null,
      type: 'mouseup',
      clientX: 100,
      clientY: 0,
    })
    await nextTick()

    expect((hueSlideWrapper.vm as ColorPickerVM).thumbLeft > 0).toBe(true)
    mockHueSlideRect.mockRestore()
    mockThumbDom.mockRestore()
    mockHueSlideOffsetWidth.mockRestore()
    wrapper.unmount()
  })
  it('should change alpha when clicking the alpha bar', async () => {
    const wrapper = _mount(
      `<hl-color-picker v-model="color" show-alpha></hl-color-picker>`,
      () => ({
        color: '#F00',
      }),
    )
    await wrapper.find('.picker-trigger').trigger('click')
    const colorPickerWrapper = wrapper.findComponent(ColorPicker)
    const alphaWrapper = colorPickerWrapper.findComponent({ ref: 'alpha' })
    const alphaDom = alphaWrapper.element as HTMLElement
    const mockAlphaDom = vi
      .spyOn(alphaDom, 'getBoundingClientRect')
      .mockReturnValue({
        height: 12,
        width: 280,
        x: 0,
        y: 0,
        left: 0,
      } as DOMRect)
    const thumbDom = alphaWrapper.find<HTMLElement>(
      '.alpha-slider .slider-handle',
    ).element
    const mockThumbDom = vi
      .spyOn(thumbDom, 'offsetWidth', 'get')
      .mockReturnValue(4)
    ;(alphaWrapper.vm as ColorPickerVM).handleClick({
      target: null,
      type: 'mouseup',
      clientX: 50,
      clientY: 0,
    })
    await nextTick()
    expect(colorPickerWrapper.vm.color.get('alpha') < 100).toBeTruthy()
    mockAlphaDom.mockRestore()
    mockThumbDom.mockRestore()
    wrapper.unmount()
  })

  it('should change saturation and value when clicking the sv-panel', async () => {
    const wrapper = _mount(
      `<hl-color-picker v-model="color" show-alpha color-format="hsv"></hl-color-picker>`,
      () => ({
        color: 'hsv(0, 50%, 50%)',
      }),
    )

    await wrapper.find('.picker-trigger').trigger('click')
    const colorPickerWrapper = wrapper.findComponent(ColorPicker)
    const svPanelWrapper = colorPickerWrapper.findComponent({ ref: 'svPanel' })
    ;(svPanelWrapper.vm as ColorPickerVM).handleDrag({
      type: 'mousemove',
      clientX: 0,
      clientY: 0,
    })
    wrapper.vm.$nextTick(() => {
      expect(wrapper.vm.color._saturation !== 50).toBeTruthy()
      expect(wrapper.vm.color._value !== 50).toBeTruthy()
    })
  })

  it('should change color to the selected color', async () => {
    const wrapper = _mount(
      `<hl-color-picker v-model="color" show-alpha :predefine="colors"></hl-color-picker>`,
      () => ({
        color: 'hsva(180, 65, 20, 0.5)',
        colors: [
          'rgba(19, 206, 102, 0.18)',
          'rgb(25, 159, 147)',
          'hsv(250, 54, 98)',
          'hsva(180, 65, 20, 0.5)',
          'hsl(170, 32%, 87%)',
          'hsla(45, 62%, 47%, 0.13)',
          '#7486de',
          '#45aa9477',
          '#892345',
        ],
      }),
    )
    await wrapper.find('.picker-trigger').trigger('click')
    const colorPickerWrapper: any = wrapper.findComponent(ColorPicker)
    const predefineWrapper = colorPickerWrapper.findComponent({
      ref: 'predefine',
    })
    const predefineDom = predefineWrapper.element as HTMLElement
    expect(
      predefineDom.querySelectorAll('.predefine-item')
        .length === 9,
    ).toBeTruthy()
    predefineDom
      .querySelector<HTMLElement>(
      '.predefine-item:nth-child(4)',
    )?.click()
    await nextTick()
    expect(colorPickerWrapper.vm.color.get('hue')).toEqual(180)
    expect(colorPickerWrapper.vm.color.get('saturation')).toEqual(65)
    expect(colorPickerWrapper.vm.color.get('value')).toEqual(20)
    expect(colorPickerWrapper.vm.color.get('alpha')).toEqual(50)

    predefineDom
      .querySelector<HTMLElement>(
      '.predefine-item:nth-child(3)',
    )?.click()
    await nextTick()
    expect(colorPickerWrapper.vm.color.get('hue')).toEqual(250)
    expect(colorPickerWrapper.vm.color.get('saturation')).toEqual(54)
    expect(colorPickerWrapper.vm.color.get('value')).toEqual(98)
    expect(colorPickerWrapper.vm.color.get('alpha')).toEqual(100)
  })

  it('should change selected state of predefined color', async () => {
    const wrapper = _mount(
      `<hl-color-picker v-model="color" show-alpha :predefine="colors"></hl-color-picker>`,
      () => ({
        color: 'hsva(180, 65, 20, 0.5)',
        colors: [
          'rgba(19, 206, 102, 0.18)',
          'rgb(25, 159, 147)',
          'hsv(250, 54, 98)',
          'hsva(180, 65, 20, 0.5)',
          'hsl(170, 32%, 87%)',
          'hsla(45, 62%, 47%, 0.13)',
          '#7486de',
          '#45aa9477',
          '#892345',
        ],
      }),
    )
    await wrapper.find('.picker-trigger').trigger('click')
    const colorPickerWrapper = wrapper.findComponent(ColorPicker)
    const predefineWrapper = colorPickerWrapper.findComponent({
      ref: 'predefine',
    })
    const predefineDom = predefineWrapper.element as HTMLElement
    predefineDom
      .querySelector<HTMLElement>(
      '.predefine-item:nth-child(4)',
    )?.click()
    await nextTick()
    expect(
      predefineWrapper
        .find('.predefine-item:nth-child(4)')
        .classes(),
    ).toContain('is-selected')
    const hueSlideWrapper = colorPickerWrapper.findComponent({ ref: 'hue' })
    const hueSlideDom = hueSlideWrapper.element
    const thumbDom = hueSlideWrapper.find<HTMLElement>(
      '.hue-slider .slider-handle',
    ).element
    const mockHueSlideRect = vi
      .spyOn(hueSlideDom, 'getBoundingClientRect')
      .mockReturnValue({
        height: 12,
        width: 176,
        x: 0,
        y: 0,
        left: 0,
      } as DOMRect)
    const mockHueSlideOffsetWidth = vi
      .spyOn(hueSlideDom as HTMLElement, 'offsetWidth', 'get')
      .mockReturnValue(200)
    const mockThumbDom = vi
      .spyOn(thumbDom, 'offsetWidth', 'get')
      .mockReturnValue(4)
    ;(hueSlideWrapper.vm as ColorPickerVM).handleClick({
      target: null,
      type: 'mouseup',
      clientX: 1000,
      clientY: 0,
    })
    await nextTick()
    expect(
      predefineWrapper
        .find('.predefine-item:nth-child(4)')
        .classes(),
    ).not.toContain('selected')
    mockHueSlideRect.mockRestore()
    mockThumbDom.mockRestore()
    mockHueSlideOffsetWidth.mockRestore()
  })
  it('should not execute active-change event', async () => {
    const onActiveChange = vi.fn()
    const wrapper = _mount(
      `<hl-color-picker :modhl-value='color' @active-change='onActiveChange'/>`,
      () => ({
        color: '#20A0FF',
        onActiveChange,
      }),
    )
    await nextTick()
    expect(onActiveChange).not.toHaveBeenCalled()
    wrapper.unmount()
  })

  describe('form item accessibility integration', () => {
    it('automatic id attachment', async () => {
      const wrapper = _mount(
        `<hl-form-item label="Foobar" data-test-ref="item">
          <hl-color-picker />
        </hl-form-item>`,
        () => ({}),
      )

      await nextTick()
      const formItem = wrapper.find('[data-test-ref="item"]')
      const formItemLabel = formItem.find('.form-label > *')
      const colorPickerButton = wrapper.find(`.${prefix}-color-picker`)
      expect(formItem.attributes().role).toBeFalsy()
      expect(formItemLabel.attributes().for).toBe(
        colorPickerButton.attributes().id,
      )
    })

    it('specified id attachment', async () => {
      const wrapper = _mount(
        `<hl-form-item label="Foobar" data-test-ref="item">
          <hl-color-picker id="foobar" />
        </hl-form-item>`,
        () => ({}),
      )

      await nextTick()
      const formItem = wrapper.find('[data-test-ref="item"]')
      const formItemLabel = formItem.find('.form-label > *')
      const colorPickerButton = wrapper.find(`.${prefix}-color-picker`)
      expect(formItem.attributes().role).toBeFalsy()
      expect(colorPickerButton.attributes().id).toBe('foobar')
      expect(formItemLabel.attributes().for).toBe(
        colorPickerButton.attributes().id,
      )
    })

    it('form item role is group when multiple inputs', async () => {
      const wrapper = _mount(
        `<hl-form-item label="Foobar" data-test-ref="item">
          <hl-color-picker />
          <hl-color-picker />
        </hl-form-item>`,
        () => ({}),
      )

      await nextTick()
      const formItem = wrapper.find('[data-test-ref="item"]')
      expect(formItem.attributes().role).toBe('group')
    })
  })

})
