import { mount } from '@vue/test-utils'
import { describe, expect, test } from 'vitest'
import Progress from '../src/progress.vue'

describe('Progress.vue', () => {
  test('percent', () => {
    const wrapper = mount(Progress, {
      props: {
        percentage: 66,
      },
    })
    expect(wrapper.find('.progress-percentage').text()).toBe('66%')
    expect(wrapper.find('.progress-bar').attributes('style')).toBe('width: 66%;')
  })

  test('type', () => {
    const wrapper = mount(Progress, {
      props: {
        type: 'danger',
      },
    })
    expect(wrapper.find('.progress-bar').classes()).toContain('danger')
  })

  test('stroke width', () => {
    const wrapper = mount(Progress, {
      props: {
        strokeWidth: '7px',
      },
    })
    expect(wrapper.find('.progress-wrap .progress-bar').attributes('style')).toContain('--progress-height: 7px;')
  })

  test('show text', () => {
    const wrapper = mount(Progress, {
      props: {
        showText: false,
      },
    })
    expect(wrapper.find('.no-label').exists()).toBe(true)
  })

  test('circle', () => {
    const wrapper = mount(Progress, {
      props: {
        showAs: 'circle',
      },
    })
    expect(wrapper.classes()).toContain('circle')
  })

  test('dashboard', () => {
    const wrapper = mount(Progress, {
      props: {
        showAs: 'dashboard',
      },
    })
    expect(wrapper.classes()).toContain('dashboard')
  })

  test('line', () => {
    const wrapper = mount(Progress, {
      props: {
        showAs: 'line',
      },
    })
    expect(wrapper.classes()).toContain('line')
  })

  // test('width', () => {
  //   const wrapper = mount(Progress, {
  //     props: {
  //       type: 'circle',
  //       width: 120,
  //     },
  //   })
  //   expect(wrapper.find('.el-progress-circle').attributes('style')).toBe('height: 120px; width: 120px;')
  // })

  test('color', () => {
    const wrapper = mount(Progress, {
      props: {
        color: 'rgb(255, 255, 255)',
      },
    })
    expect(wrapper.find('.progress-bar').attributes('style')).toContain('--progress-bar-bg-color: rgb(255, 255, 255);')
  })

  test('color is function', async () => {
    const wrapper = mount(Progress, {
      props: {
        percentage: 0,
        color: (percentage: number) => {
          if (percentage > 50) {
            return 'rgb(4, 5, 6)'
          } else {
            return 'rgb(1, 2, 3)'
          }
        },
      },
    })
    expect(wrapper.find('.progress-bar').attributes('style')).toContain('--progress-bar-bg-color: rgb(1, 2, 3);')
    await wrapper.setProps({ percentage: 60 })
    expect(wrapper.find('.progress-bar').attributes('style')).toContain('--progress-bar-bg-color: rgb(4, 5, 6);')
  })

  test('color is array', async () => {
    const wrapper = mount(Progress, {
      props: {
        percentage: 0,
        color: [
          { color: 'rgb(1, 1, 1)', percentage: 10 },
          { color: 'rgb(9, 9, 9)', percentage: 90 },
        ],
      },
    })
    await wrapper.setProps({ percentage: 9 })
    expect(wrapper.find('.progress-bar').attributes('style')).toContain('--progress-bar-bg-color: rgb(1, 1, 1);')
    await wrapper.setProps({ percentage: 89 })
    expect(wrapper.find('.progress-bar').attributes('style')).toContain('--progress-bar-bg-color: rgb(9, 9, 9);')
  })

  test('format', () => {
    const wrapper = mount(Progress, {
      props: {
        percentage: 100,
        format: (percent: number) => `占比${percent}%`,
      },
    })
    expect(wrapper.find('.progress-percentage').text()).toBe('占比100%')
  })

  test('slot', () => {
    const wrapper = mount(Progress, {
      slots: {
        default: '自定义内容',
      },
    })
    expect(wrapper.text()).toBe('自定义内容')
  })

  test('stack', () => {
    const wrapper = mount(Progress, {
      props: {
        showAs: 'stack',
        stack: [
          { percentage: 10 },
          { percentage: 20 },
          { percentage: 30 },
        ],
      },
      slots: {
        default: ({ percentage }) => `自定义内容${percentage}%`,
      },
    })
    expect(wrapper.findAll('.progress-bar').length).toBe(3)
    expect(wrapper.findAll('.progress-bar')[0].text()).toContain('10%')
    expect(wrapper.findAll('.progress-bar')[2].text()).toContain('30%')
  })
})
