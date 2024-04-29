import { ref, nextTick, inject, defineComponent } from 'vue'
import { mount } from '@vue/test-utils'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { composeRefs } from '@hongluan-ui/utils'
import { EVENT_CODE } from '@hongluan-ui/constants'
import {
  ROVING_FOCUS_COLLECTION_INJECTION_KEY,
  ROVING_FOCUS_ITEM_COLLECTION_INJECTION_KEY,
} from '../src/roving-focus-group'
import {
  ROVING_FOCUS_GROUP_INJECTION_KEY,
  ROVING_FOCUS_GROUP_ITEM_INJECTION_KEY,
} from '../src/tokens'
import HlRovingFocusItem from '../src/roving-focus-item.vue'
const AXIOM = 'rem is the best girl'
const focusItemKls = 'item-kls'

let counter = 0
const FocusItem = defineComponent({
  setup() {
    const { rovingFocusGroupItemRef, ...itemInjection } = inject(
      ROVING_FOCUS_GROUP_ITEM_INJECTION_KEY,
      undefined,
    )!
    const collectionItemInjection = inject(
      ROVING_FOCUS_ITEM_COLLECTION_INJECTION_KEY,
      undefined,
    )!
    const itemRef = composeRefs(
      rovingFocusGroupItemRef,
      collectionItemInjection.collectionItemRef,
    )
    return {
      itemRef,
      ...itemInjection,
      id: ++counter,
    }
  },
  template: `<div
      :ref="itemRef"
      :tabindex="tabIndex"
      class="${focusItemKls}"
      @keydown="handleKeydown"
      @focus="handleFocus"
      @mousedown="handleMousedown"
    >
      ${AXIOM} {{ id }}
    </div>`,
})

describe('<RovingFocusItem />', () => {
  const currentTabbedId = ref('test_id')
  const loop = ref(false)
  const onItemFocus = vi.fn()
  const onItemShiftTab = vi.fn()
  const itemMap = new Map()
  const getItems = () => [...itemMap.values()]
  const defaultProvides = {
    [ROVING_FOCUS_GROUP_INJECTION_KEY as symbol]: {
      currentTabbedId,
      loop,
      onItemFocus,
      onItemShiftTab,
    },
    [ROVING_FOCUS_COLLECTION_INJECTION_KEY as symbol]: {
      getItems,
      itemMap,
    },
  }
  const createComponent = (props = {}) =>
    mount(
      {
        template: `<div>
        <hl-roving-focus-item v-bind="$attrs">
          <focus-item />
        </hl-roving-focus-item>
        <hl-roving-focus-item v-bind="$attrs">
          <focus-item />
        </hl-roving-focus-item>
        <hl-roving-focus-item v-bind="$attrs">
          <focus-item />
        </hl-roving-focus-item>
      </div>`,
        components: {
          HlRovingFocusItem,
          FocusItem,
        },
      },
      {
        props,
        global: {
          provide: defaultProvides,
        },
        attachTo: document.body,
      },
    )
  let wrapper: ReturnType<typeof createComponent>
  const findItems = () => wrapper.findAllComponents(HlRovingFocusItem)
  const findDOMItems = () => wrapper.findAll(`.${focusItemKls}`)
  beforeEach(async () => {
    wrapper = createComponent()
    await nextTick()
  })
  afterEach(() => {
    wrapper.unmount()
  })

  describe('rendering test', () => {
    it('should be able to render content', () => {
      expect(wrapper.html()).toContain(AXIOM)
      expect(findItems()).toHaveLength(3)
    })
  })

  describe('roving focus', () => {
    it('should be able to handle mousedown event', async () => {
      const DOMItems = findDOMItems()
      const items = findItems()
      const firstDOMItem = DOMItems[0]

      await firstDOMItem.trigger('mousedown')
      await nextTick()

      const firstItem = items[0]
      expect(firstItem.emitted()).toHaveProperty('mousedown')
      await wrapper.setProps({
        focusable: false,
      })
      await firstDOMItem.trigger('mousedown')
      // when the item is not focusable, the focus event should be prevented by default
      const emittedEvents: any = firstItem.emitted().mousedown
      expect(emittedEvents[0][0].defaultPrevented).toBe(false)
      expect(emittedEvents[1][0].defaultPrevented).toBe(true)
    })

    it('should be able to handle focus event', async () => {
      expect(onItemFocus).not.toHaveBeenCalled()
      const DOMItems = findDOMItems()
      const firstDOMItem = DOMItems[0]
      await firstDOMItem.trigger('focus')
      expect(onItemFocus).toHaveBeenCalled()
      expect(findItems()[0].emitted()).toHaveProperty('focus')
    })

    it('should be able to handle keyboard navigation', async () => {
      const DOMItems = findDOMItems()
      const items = findItems()
      const firstDOMItem = DOMItems[0]
      expect(onItemShiftTab).not.toHaveBeenCalled()
      await firstDOMItem.trigger('keydown.shift', {
        key: EVENT_CODE.tab,
      })
      expect(items[0].emitted()).toHaveProperty('keydown')
      expect(onItemShiftTab).toHaveBeenCalled()
      // navigating clockwise
      expect(document.activeElement).toBe(document.body)
      await DOMItems[1].trigger('keydown', {
        key: EVENT_CODE.down,
      })
      await nextTick()
      expect(document.activeElement).toStrictEqual(DOMItems[2].element)

      // navigate anticlockwise
      await DOMItems[1].trigger('keydown', {
        key: EVENT_CODE.up,
      })
      await nextTick()
      expect(document.activeElement).toStrictEqual(DOMItems[0].element)

      // should be able to focus on the last element when press End
      await DOMItems[0].trigger('keydown', {
        key: EVENT_CODE.end,
      })
      await nextTick()
      expect(document.activeElement).toStrictEqual(DOMItems[2].element)

      await DOMItems[0].trigger('keydown', {
        key: EVENT_CODE.home,
      })
      await nextTick()
      expect(document.activeElement).toStrictEqual(DOMItems[0].element)
    })
  })
})
