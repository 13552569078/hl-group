import makeMount from '@hongluan-ui/test-utils/make-mount'
import { describe, expect, test } from 'vitest'
import SkeletonItem from '../src/skeleton-item.vue'

describe('<skeleton-item />', () => {
  const mount = makeMount(SkeletonItem, {})

  test('should render correctly', () => {
    const wrapper = mount()

    expect(wrapper.find('.text').exists()).toBe(true)
  })

  test('should render image placeholder', () => {
    const wrapper = mount({
      props: {
        variant: 'image',
      },
    })

    expect(wrapper.find('svg').exists()).toBe(true)
  })
})
