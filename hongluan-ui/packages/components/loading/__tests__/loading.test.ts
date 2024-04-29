import { mount } from '@vue/test-utils'
import { afterEach, describe, expect, test, vi } from 'vitest'
import HlInput from '../../input'
import { Loading } from '../src/service'
import { vLoading } from '../src/directive'
import { nextTick } from 'vue'
import { usePrefix } from '@hongluan-ui/test-utils/utils'

function destroyLoadingInstance(loadingInstance: any) {
  if(!loadingInstance) return
  loadingInstance.close()
  loadingInstance.$el &&
  loadingInstance.$el.parentNode &&
  loadingInstance.$el.parentNode.removeChild(loadingInstance.$el)
}

describe('Loading', () => {
  const { prefix } = usePrefix()
  const maskClazz = `.${prefix}-loading-mask`
  let loadingInstance: any, loadingInstance2: any
  afterEach(() => {
    destroyLoadingInstance(loadingInstance)
    destroyLoadingInstance(loadingInstance2)
  })

  test('create directive', async () => {
    const wrapper = mount({
      directives: {
        loading: vLoading,
      },
      template: `<div v-loading="loading"></div>`,
      data() {
        return {
          loading: true,
        }
      },
    })

    await nextTick()
    const vm = wrapper.vm

    const maskWrapper = wrapper.find(maskClazz)
    expect(maskWrapper.exists()).toBeTruthy()
    vm.loading = false
    vi.useFakeTimers()
    await nextTick()

    vi.runAllTimers()
    vi.useRealTimers()
    await nextTick()
    expect(wrapper.find(maskClazz).exists()).toBeFalsy()
  })

  test('unmounted directive', async () => {
    const wrapper1 = mount({
      directives: {
        loading: vLoading,
      },
      template: `<div v-if="show" v-loading="loading"></div>`,
      data() {
        return {
          show: true,
          loading: true,
        }
      },
    })

    const wrapper2 = mount({
      directives: {
        loading: vLoading,
      },
      template: `<div v-if="show" v-loading="loading"></div>`,
      data() {
        return {
          show: true,
          loading: true,
        }
      },
    })

    await nextTick()
    const vm1 = wrapper1.vm
    const vm2 = wrapper2.vm

    vm1.loading = false
    vm2.loading = false

    await nextTick()
    vm1.show = false
    vm2.show = false

    await nextTick()
    expect(document.querySelector(maskClazz)).toBeFalsy()
  })

  test('body directive', async () => {
    const wrapper = mount({
      directives: {
        loading: vLoading,
      },
      template: `<div v-loading.body="loading"></div>`,
      data() {
        return {
          loading: true,
        }
      },
    })
    await nextTick()
    const mask = document.querySelector(maskClazz)
    expect(mask?.parentNode === document.body).toBeTruthy()
    wrapper.vm.loading = false
    document.body.removeChild(mask!)
  })

  test('fullscreen directive', async () => {
    const wrapper = mount({
      directives: {
        loading: vLoading,
      },
      template: `<div v-loading.fullscreen="loading"></div>`,
      data() {
        return {
          loading: true,
        }
      },
    })
    await nextTick()
    const mask = document.querySelector(maskClazz)!
    expect(mask.parentNode === document.body).toBeTruthy()
    expect(mask.classList.contains('is-fullscreen')).toBeTruthy()
    wrapper.vm.loading = false
    document.body.removeChild(mask)
  })

  test('lock directive', async () => {
    const wrapper = mount({
      directives: {
        loading: vLoading,
      },
      template: `<div v-loading.fullscreen.lock="loading"></div>`,
      data() {
        return {
          loading: true,
        }
      },
    })
    const vm = wrapper.vm
    await nextTick()
    expect(document.body.classList.contains('loading-parent-hidden')).toBeTruthy()
    vm.loading = false
    document.body.removeChild(document.querySelector(maskClazz)!)
  })

  test('text directive', async () => {
    const wrapper = mount({
      directives: {
        loading: vLoading,
      },
      template: `<div v-loading="loading" loading-text="loading..."></div>`,
      data() {
        return {
          loading: true,
        }
      },
    })
    await nextTick()
    expect(wrapper.find('.loading-text').text()).toEqual('loading...')
  })

  test('customClass directive', async () => {
    const wrapper = mount({
      directives: {
        loading: vLoading,
      },
      template: `<div v-loading="loading" loading-custom-class="loading-custom-class"></div>`,
      data() {
        return {
          loading: true,
        }
      },
    })
    await nextTick()
    expect(wrapper.find('.loading-custom-class').exists()).toBeTruthy()
  })

  test('customSvg directive', async () => {
    const wrapper = mount({
      directives: {
        loading: vLoading,
      },
      template: `<div v-loading="loading" :loading-svg="svg"></div>`,
      data() {
        return {
          loading: true,
          svg: `<path class="custom-path" d="M 30 15"/>`,
        }
      },
    })
    await nextTick()
    expect(wrapper.find('.custom-path').attributes().d).toEqual('M 30 15')
  })

  test('create service', async () => {
    loadingInstance = Loading()
    expect(document.querySelector(maskClazz)).toBeTruthy()
  })

  test('close service', async () => {
    loadingInstance = Loading()
    loadingInstance.close()
    expect(loadingInstance.visible.value).toBeFalsy()
  })

  test('target service', async () => {

    const container = document.createElement('div')
    container.className = 'loading-container'
    document.body.appendChild(container)

    loadingInstance = Loading({ target: '.loading-container' })
    const mask = container.querySelector(maskClazz)
    expect(mask).toBeTruthy()
    expect(mask.parentNode).toEqual(container)

    expect(container.classList.contains('loading-parent-relative')).toBeTruthy()
    vi.useFakeTimers()
    loadingInstance.close()
    vi.runAllTimers()
    vi.useRealTimers()
    await nextTick()
    expect(container.classList.contains('loading-parent-relative')).toBeFalsy()
  })

  test('body service', async () => {
    const container = document.createElement('div')
    container.className = 'loading-container'
    document.body.appendChild(container)

    loadingInstance = Loading({ target: '.loading-container', body: true })
    const mask = document.querySelector(maskClazz)
    expect(mask).toBeTruthy()
    expect(mask.parentNode).toEqual(document.body)
  })

  test('fullscreen service', async () => {
    loadingInstance = Loading({ fullscreen: true })
    const mask = document.querySelector(maskClazz)
    expect(mask.parentNode).toEqual(document.body)
    expect(mask.classList.contains('is-fullscreen')).toBeTruthy()
  })

  test('fullscreen singleton service', async () => {
    vi.useFakeTimers()
    loadingInstance = Loading({ fullscreen: true })
    vi.runAllTimers()
    await nextTick()

    loadingInstance2 = Loading({ fullscreen: true })
    vi.runAllTimers()
    await nextTick()

    let masks = document.querySelectorAll(maskClazz)
    expect(loadingInstance).toEqual(loadingInstance2)
    expect(masks.length).toEqual(1)
    loadingInstance2.close()
    vi.runAllTimers()
    vi.useRealTimers()

    masks = document.querySelectorAll(maskClazz)
    expect(masks.length).toEqual(0)
  })

  test('lock service', async () => {
    loadingInstance = Loading({ lock: true })
    expect(document.body.classList.contains('loading-parent-hidden')).toBeTruthy()
  })

  test('text service', async () => {
    loadingInstance = Loading({ text: 'Loading...' })
    const text = document.querySelector('.loading-text')
    expect(text).toBeTruthy()
    expect(text?.textContent).toEqual('Loading...')
  })

  test('customClass service', async () => {
    loadingInstance = Loading({ customClass: 'loading-custom-class' })
    const customClass = document.querySelector('.loading-custom-class')
    expect(customClass).toBeTruthy()
  })

  test('parent\'s display is not block', async () => {
    const wrapper = mount({
      directives: {
        loading: vLoading,
      },
      components: {
        HlInput,
      },
      template: `<hl-input v-loading="true">
      <template #append>
        <i class="hl-icon-question"></i>
      </template>
      </hl-input>`,
    })
    await nextTick()
    await nextTick()
    const maskDisplay = getComputedStyle(wrapper.find(maskClazz).element).display
    expect(maskDisplay).toBe('block')
  })

})
