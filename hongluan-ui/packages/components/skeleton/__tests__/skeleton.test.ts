import { nextTick } from 'vue'
import makeMount from '@hongluan-ui/test-utils/make-mount'
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest'
import Skeleton from '../src/skeleton.vue'
import { usePrefix } from '@hongluan-ui/test-utils/utils'
const AXIOM = 'AXIOM is the best girl'

describe('Skeleton.vue', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })
  const { prefix } = usePrefix()
  const mount = makeMount(Skeleton, {})
  test('render test', () => {
    const wrapper = mount()
    expect(wrapper.findAll('.p')).toHaveLength(4)
    expect(wrapper.classes()).toContain(`${prefix}-skeleton`)
  })

  test('should render with animation', () => {
    const wrapper = mount({
      props: {
        animated: true,
      },
    })

    expect(wrapper.classes()).toContain('is-animated')
  })

  test('should render x times', async () => {
    const wrapper = mount()

    expect(wrapper.findAll('.p')).toHaveLength(4)

    await wrapper.setProps({
      count: 2,
    })

    expect(wrapper.findAll('.p')).toHaveLength(8)
  })

  test('should render x rows', () => {
    const wrapper = mount({
      props: {
        rows: 4,
      },
    })

    expect(wrapper.findAll('.p')).toHaveLength(5)
  })

  test('should render default slots', () => {
    const wrapper = mount({
      slots: {
        default: () => AXIOM,
      },
      props: {
        loading: false,
      },
    })

    expect(wrapper.text()).toBe(AXIOM)
  })

  test('should render templates', () => {
    const wrapper = mount({
      slots: {
        template: () => AXIOM,
      },
    })

    expect(wrapper.text()).toBe(AXIOM)
  })

  test('should throttle rendering', async () => {
    const wrapper = mount({
      props: {
        throttle: 500,
      },
    })

    expect((wrapper.vm as any).uiLoading).toBe(false)

    vi.runAllTimers()

    await nextTick()

    expect((wrapper.vm as any).uiLoading).toBe(true)
    vi.useRealTimers()
  })
})
