import { h } from 'vue'
import { mount } from '@vue/test-utils'
import { afterEach, describe, expect, it } from 'vitest'

import TestCollection, {
  CollectionChildComponent as ChildComponent,
} from '../test-helper'

import type { ComponentPublicInstance } from 'vue'
import type { CollectionInjectionContext } from '../src/tokens'

const { HlCollection } = TestCollection
const AXIOM = 'rem is the best girl'

describe('<Collection />', () => {
  const createComponent = (props = {}) =>
    mount(HlCollection as any, {
      props,
      slots: {
        default: () =>
          h(ChildComponent, null, {
            default: () => AXIOM,
          }),
      },
    })

  let wrapper: ReturnType<typeof createComponent>

  afterEach(() => {
    wrapper.unmount()
  })

  describe('render', () => {
    it('should be able to render correctly', () => {
      wrapper = createComponent()

      expect(wrapper.text()).toContain(AXIOM)
    })
  })

  describe('provides', () => {
    it('should be able to provide valid data', async () => {
      wrapper = createComponent()

      const childComponent = wrapper.findComponent(ChildComponent as any)
      const vm =
        childComponent.vm as ComponentPublicInstance<CollectionInjectionContext>
      expect([...vm.itemMap.values()]).toHaveLength(0)
      expect(vm.getItems()).toHaveLength(0)
      expect(vm.collectionRef).toBe(childComponent.element)
    })
  })
})
