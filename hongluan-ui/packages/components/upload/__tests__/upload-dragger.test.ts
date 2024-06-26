import { provide, h, defineComponent, computed } from 'vue'
import makeMount from '@hongluan-ui/test-utils/make-mount'
import { describe, expect, test, vi } from 'vitest'
import { uploadContextKey } from '@hongluan-ui/tokens'
import UploadDragger from '../src/upload-dragger.vue'

const AXIOM = 'Rem is the best girl'

const Wrapper = defineComponent({
  props: {
    onDrop: Function,
  },
  setup(props, { slots }) {
    provide(uploadContextKey, { accept: computed(() => 'video/*') })
    return () => h(UploadDragger, props, slots)
  },
})
const mount = makeMount(Wrapper, {
  slots: {
    default: () => AXIOM,
  },
})

describe('<upload-dragger />', () => {
  describe('render test', () => {
    test('should render correct', () => {
      const wrapper = mount()

      expect(wrapper.text()).toBe(AXIOM)
    })
  })

  describe('functionality', () => {
    test('onDrag works', async () => {
      const wrapper = mount()
      await wrapper.find('.upload-dragger').trigger('dragover')
      expect(wrapper.classes('is-dragover')).toBe(true)
    })

    test('ondrop works for any given video type', async () => {
      const onDrop = vi.fn()
      const wrapper = mount({
        props: {
          onDrop,
        },
      })
      const dragger = wrapper.findComponent(UploadDragger)

      await dragger.trigger('drop', {
        dataTransfer: {
          files: [
            {
              type: 'video/mp4',
              name: 'test.mp4',
            },
          ],
        },
      })
      expect(onDrop).toHaveBeenCalledTimes(1)
      expect(dragger.emitted('file')).toHaveLength(1)
      await dragger.trigger('drop', {
        dataTransfer: {
          files: [
            {
              type: 'video/mov',
              name: 'test.mov',
            },
          ],
        },
      })
      expect(dragger.emitted('file')).toHaveLength(2)
    })
  })
})
