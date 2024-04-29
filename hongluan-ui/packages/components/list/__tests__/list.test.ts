import { mount } from '@vue/test-utils'
import { usePrefix } from '@hongluan-ui/test-utils/utils'
import { describe, expect, test } from 'vitest'
import List from '../src/index.vue'

const AXIOM = 'Rem is the best girl'

describe('List.vue', () => {
  const { prefix } = usePrefix()
  test('list render test', () => {
    const wrapper = mount(List, {
      slots: {
        default: AXIOM,
      },
    })
    expect(wrapper.classes()).toContain(`${prefix}-list`)
  })
})
