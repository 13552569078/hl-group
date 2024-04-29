import { nextTick, ref } from 'vue'
import makeMount from '@hongluan-ui/test-utils/make-mount'
import { afterEach, describe, expect, test } from 'vitest'
import { rAF } from '@hongluan-ui/test-utils/tick'
import { usePrefix } from '@hongluan-ui/test-utils/utils'
import Popover from '../src/popover.vue'
import PopoverDirective, { VPopover } from '../src/directive'

const { prefix, PREFIX } = usePrefix()
const AXIOM = 'Rem is the best girl'

const Comp = {
  template: `
  <hl-popover ref="popoverRef" title="title" :content="content" virtual-triggering trigger="click" />
  <div v-popover="popoverRef" id="reference-node">
    trigger
  </div>
  `,
  components: {
    [PREFIX + Popover.name]: Popover,
  },
  setup() {
    return {
      popoverRef: ref(null),
      content: AXIOM,
    }
  },
}

const mount = makeMount(Comp, {
  props: {},
  global: {
    directives: {
      [VPopover]: PopoverDirective,
    },
  },
})

describe('v-popover', () => {
  afterEach(() => {
    document.body.innerHTML = ''
  })
  test('should render correctly', async () => {
    const wrapper = mount()
    await nextTick()

    expect(document.body.querySelector(`.${prefix}-popover`)?.innerHTML).toContain(
      AXIOM,
    )
    wrapper.unmount()
  })

  test('should show popover when reference is mounted', async () => {
    const wrapper = mount()
    await nextTick()
    const refNode = '#reference-node'
    expect(wrapper.find(refNode).exists()).toBe(true)
    expect(
      document.body.querySelector(`.${prefix}-popover`)?.getAttribute('style'),
    ).toContain('display: none')
    await wrapper.find(refNode).trigger('click', {
      button: 0,
    })
    await nextTick()
    await rAF()
    expect(
      document.body.querySelector(`.${prefix}-popover`)?.getAttribute('style'),
    ).not.toContain('display: none')
    wrapper.unmount()
  })
})
