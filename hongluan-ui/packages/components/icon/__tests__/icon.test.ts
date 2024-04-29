import { mount } from '@vue/test-utils'
import { usePrefix } from '@hongluan-ui/test-utils/utils'
import { describe, expect, test } from 'vitest'
import Icon from '../src/icon.vue'

describe('Icon.vue', () => {
  const { prefix } = usePrefix()
  test('render', () => {
    const wrapper = mount(Icon, {
      props: {
      },
    })
    expect(wrapper.classes()).toContain(`${prefix}-icon`)
  })
})
