import { mount } from '@vue/test-utils'
import { usePrefix } from '@hongluan-ui/test-utils/utils'
import { describe, expect, test, vi } from 'vitest'
import Thumb from '../src/thumb.vue'
import { nextTick } from 'vue'

import { IMAGE_SUCCESS, IMAGE_FAIL, mockThumbEvent } from '@hongluan-ui/test-utils/mock'

// firstly wait for image event
// secondly wait for vue render
async function doubleWait() {
  await nextTick()
  await nextTick()
}

describe('Thumb.vue', () => {
  const { prefix } = usePrefix()
  mockThumbEvent()

  test('render test', () => {
    const wrapper = mount(Thumb)
    expect(wrapper.find(`.${prefix}-thumb`).exists()).toBe(true)
  })

  test('image load success test', async () => {
    const alt = 'this ia alt'
    const wrapper = mount(Thumb, {
      props: {
        src: IMAGE_SUCCESS,
        alt,
      },
    })

    expect(wrapper.find('.thumb-placeholder').exists()).toBe(true)
    await doubleWait()
    expect(wrapper.find('.thumb-inner').exists()).toBe(true)
    expect(wrapper.find('img').exists()).toBe(true)
    expect(wrapper.find('.thumb-placeholder').exists()).toBe(false)
    expect(wrapper.find('.thumb-error').exists()).toBe(false)
  })

  test('image load error test', async () => {
    const wrapper = mount(Thumb, {
      props: {
        src: IMAGE_FAIL,
      },
    })
    await doubleWait()
    expect(wrapper.emitted('error')).toBeDefined()
    expect(wrapper.find('.thumb-inner').exists()).toBe(false)
    expect(wrapper.find('img').exists()).toBe(false)
    expect(wrapper.find('.thumb-error').exists()).toBe(true)
  })

  test('imageStyle fit test', async () => {
    const fits = ['fill', 'contain', 'cover', 'none', 'scale-down']
    for (const fit of fits) {
      const wrapper = mount(Thumb, {
        props: { fit, src: IMAGE_SUCCESS },
      })
      await doubleWait()
      expect(wrapper.find('img').attributes('style')).toContain(`object-fit: ${fit};`)
    }
  })

  test('preview classname test', async () => {
    const wrapper = mount(Thumb, {
      props: {
        fit: 'cover',
        src: IMAGE_SUCCESS,
        previewSrcList: new Array(3).fill(IMAGE_SUCCESS),
      },
    })
    await doubleWait()
    expect(wrapper.find('img').classes()).toContain('thumb-preview')
  })

  test('preview initial index test', async () => {
    const wrapper = mount(Thumb, {
      props: {
        src: IMAGE_SUCCESS,
        previewSrcList: new Array(3).fill(IMAGE_FAIL),
        initialIndex: 1,
      },
    })
    await doubleWait()
    await wrapper.find('.thumb-inner').trigger('click')
    expect(
      wrapper.findAll('.image-viewer-img')[1].attributes('style')
    ).not.toContain('display: none')
  })

  test('native loading attributes', async () => {
    const wrapper = mount(Thumb, {
      props: {
        src: IMAGE_SUCCESS,
        loading: 'eager',
      } as any,
    })

    await doubleWait()
    expect(wrapper.find('img').exists()).toBe(true)
    expect(wrapper.find('img').attributes('loading')).toBe('eager')

    await wrapper.setProps({ loading: undefined })
    expect(wrapper.find('img').attributes('loading')).toBe(undefined)
  })


  test('$attrs', async () => {
    const alt = 'this ia alt'
    const wrapper = mount(Thumb, {
      props: {
        src: IMAGE_SUCCESS,
        alt,
        referrerpolicy: 'origin',
      },
    })
    await doubleWait()
    expect(wrapper.find('img').attributes('alt')).toBe(alt)
    expect(wrapper.find('img').attributes('referrerpolicy')).toBe('origin')
  })

  test('pass event listeners', async() => {
    let result = false
    const wrapper = mount(Thumb, {
      props: {
        src: IMAGE_SUCCESS,
        onClick: () => result = true,
      },
    })
    await doubleWait()
    await wrapper.find('.thumb-inner').trigger('click')
    expect(result).toBeTruthy()
  })

  test('emit load event', async () => {
    const handleLoad = vi.fn()
    const wrapper = mount(Thumb, {
      props: {
        src: IMAGE_SUCCESS,
        onLoad: handleLoad,
      },
    })
    await doubleWait()
    expect(wrapper.find('.thumb-inner').exists()).toBe(true)
    expect(handleLoad).toBeCalled()
  })

  test('image load sequence success test', async () => {
    const wrapper = mount(Thumb, {
      props: {
        src: IMAGE_FAIL,
      },
    })
    wrapper.setProps({
      src: IMAGE_SUCCESS,
    })
    expect(wrapper.find('.thumb-placeholder').exists()).toBe(true)
    await doubleWait()
    expect(wrapper.emitted('error')).toBeUndefined()
    expect(wrapper.find('.thumb-inner').exists()).toBe(true)
    expect(wrapper.find('img').exists()).toBe(true)
    expect(wrapper.find('.thumb-placeholder').exists()).toBe(false)
    expect(wrapper.find('.thumb-error').exists()).toBe(false)
  })

  //@todo lazy image test
})
