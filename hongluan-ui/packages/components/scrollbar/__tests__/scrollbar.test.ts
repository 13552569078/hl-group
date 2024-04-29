import { mount } from '@vue/test-utils'
import { describe, expect, test } from 'vitest'
import makeScroll from '@hongluan-ui/test-utils/make-scroll'
import defineGetter from '@hongluan-ui/test-utils/define-getter'
import Scrollbar from '../src/scrollbar.vue'
import { nextTick } from 'vue'

const _mount = (template: string) => mount({
  components: {
    'hl-scrollbar': Scrollbar,
  },
  template,
})

describe('ScrollBar', () => {
  test('vertical', async () => {
    const outerHeight = 200
    const innerHeight = 500
    const wrapper = _mount(`
      <hl-scrollbar style="height: ${outerHeight}px">
        <div style="height: ${innerHeight}px;"></div>
      </hl-scrollbar>
    `)

    const scrollDom = wrapper.find('.scrollbar-wrap').element

    const offsetHeightRestore = defineGetter(scrollDom, 'offsetHeight', outerHeight)
    const scrollHeightRestore = defineGetter(scrollDom, 'scrollHeight', innerHeight)

    await makeScroll(scrollDom, 'scrollTop', 100)
    expect(wrapper.find('.is-vertical div').attributes('style')).toContain('height: 80px; transform: translateY(50%);')
    await makeScroll(scrollDom, 'scrollTop', 300)
    expect(wrapper.find('.is-vertical div').attributes('style')).toContain('height: 80px; transform: translateY(150%);')
    offsetHeightRestore()
    scrollHeightRestore()
  })

  test('horizontal', async () => {
    const outerWidth = 200
    const innerWidth = 500
    const wrapper = _mount(`
      <hl-scrollbar style="height: 100px; width: ${outerWidth}px">
        <div style="height:100px; width: ${innerWidth}px;"></div>
      </hl-scrollbar>
    `)

    const scrollDom = wrapper.find('.scrollbar-wrap').element

    const offsetWidthRestore = defineGetter(scrollDom, 'offsetWidth', outerWidth)
    const scrollWidthRestore = defineGetter(scrollDom, 'scrollWidth', innerWidth)

    await makeScroll(scrollDom, 'scrollLeft', 100)
    expect(wrapper.find('.is-horizontal div').attributes('style')).toContain('width: 80px; transform: translateX(50%);')
    await makeScroll(scrollDom, 'scrollLeft', 300)
    expect(wrapper.find('.is-horizontal div').attributes('style')).toContain('width: 80px; transform: translateX(150%);')
    offsetWidthRestore()
    scrollWidthRestore()
  })

  test('both vertical and horizontal', async () => {
    const outerHeight = 200
    const innerHeight = 500
    const outerWidth = 200
    const innerWidth = 500
    const wrapper = _mount(`
      <hl-scrollbar style="height: ${outerHeight}px; width: ${outerWidth}px;">
        <div style="height: ${innerHeight}px; width: ${innerWidth}px;"></div>
      </hl-scrollbar>
    `)

    const scrollDom = wrapper.find('.scrollbar-wrap').element

    const offsetHeightRestore = defineGetter(scrollDom, 'offsetHeight', outerHeight)
    const scrollHeightRestore = defineGetter(scrollDom, 'scrollHeight', innerHeight)
    const offsetWidthRestore = defineGetter(scrollDom, 'offsetWidth', outerWidth)
    const scrollWidthRestore = defineGetter(scrollDom, 'scrollWidth', innerWidth)

    await makeScroll(scrollDom, 'scrollTop', 100)
    await makeScroll(scrollDom, 'scrollLeft', 100)
    expect(wrapper.find('.is-vertical div').attributes('style')).toContain('height: 80px; transform: translateY(50%);')
    expect(wrapper.find('.is-horizontal div').attributes('style')).toContain('width: 80px; transform: translateX(50%);')
    await makeScroll(scrollDom, 'scrollTop', 300)
    await makeScroll(scrollDom, 'scrollLeft', 300)
    expect(wrapper.find('.is-vertical div').attributes('style')).toContain('height: 80px; transform: translateY(150%);')
    expect(wrapper.find('.is-horizontal div').attributes('style')).toContain('width: 80px; transform: translateX(150%);')

    offsetHeightRestore()
    scrollHeightRestore()
    offsetWidthRestore()
    scrollWidthRestore()
  })

  test('should render height props', async () => {
    const outerHeight = 204
    const innerHeight = 500
    const wrapper = _mount(`
      <hl-scrollbar height="${outerHeight}px">
        <div style="height: ${innerHeight}px;"></div>
      </hl-scrollbar>
    `)
    expect(wrapper.find('.scrollbar-wrap').attributes('style')).toContain('height: 204px;')
  })

  test('should render max-height props', async () => {
    const outerHeight = 204
    const innerHeight = 100
    const wrapper = _mount(`
      <hl-scrollbar max-height="${outerHeight}px">
        <div style="height: ${innerHeight}px;"></div>
      </hl-scrollbar>
    `)

    expect(wrapper.find('.scrollbar-wrap').attributes('style')).toContain('max-height: 204px;')
  })

  test('should render always props', async () => {
    const outerHeight = 204
    const innerHeight = 500
    const wrapper = _mount(`
      <hl-scrollbar height="${outerHeight}px" always>
        <div style="height: ${innerHeight}px;"></div>
      </hl-scrollbar>
    `)

    expect(wrapper.find('.scrollbar-bar').attributes('style')).toBeFalsy()
  })

  test('set scrollTop & scrollLeft', async () => {
    const outerHeight = 200
    const innerHeight = 500
    const outerWidth = 200
    const innerWidth = 500
    const wrapper = _mount(`
      <hl-scrollbar ref="scrollbar" style="height: ${outerHeight}px; width: ${outerWidth}px;">
        <div style="height: ${innerHeight}px; width: ${innerWidth}px;"></div>
      </hl-scrollbar>
    `)

    const scrollbar = wrapper.vm.$refs.scrollbar as any
    const scrollDom = wrapper.find('.scrollbar-wrap').element

    const offsetHeightRestore = defineGetter(scrollDom, 'offsetHeight', outerHeight)
    const scrollHeightRestore = defineGetter(scrollDom, 'scrollHeight', innerHeight)
    const offsetWidthRestore = defineGetter(scrollDom, 'offsetWidth', outerWidth)
    const scrollWidthRestore = defineGetter(scrollDom, 'scrollWidth', innerWidth)

    scrollbar.setScrollTop(100)
    await nextTick()
    scrollbar.setScrollLeft(100)
    await nextTick()

    expect(wrapper.find('.is-vertical div').attributes('style')).toContain('height: 80px; transform: translateY(0%);')
    expect(wrapper.find('.is-horizontal div').attributes('style')).toContain('width: 80px; transform: translateX(0%);')

    offsetHeightRestore()
    scrollHeightRestore()
    offsetWidthRestore()
    scrollWidthRestore()
  })
  test('should render min-size props', async () => {
    const outerHeight = 204
    const innerHeight = 10000
    const wrapper = _mount(`
      <hl-scrollbar style="height: ${outerHeight}px">
        <div style="height: ${innerHeight}px;"></div>
      </hl-scrollbar>
    `)

    const scrollDom = wrapper.find('.scrollbar-wrap').element

    const offsetHeightRestore = defineGetter(scrollDom, 'offsetHeight', outerHeight)
    const scrollHeightRestore = defineGetter(scrollDom, 'scrollHeight', innerHeight)

    await makeScroll(scrollDom, 'scrollTop', 0)
    expect(wrapper.find('.is-vertical div').attributes('style')).toContain('height: 20px; transform: translateY(0%);')
    offsetHeightRestore()
    scrollHeightRestore()
  })
})
