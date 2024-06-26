import { nextTick, computed, defineComponent } from 'vue'
import { mount } from '@vue/test-utils'
import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import Chinese from '@hongluan-ui/locale/lang/zh-cn'
import English from '@hongluan-ui/locale/lang/en'
import { useLocale, buildTranslator } from '../use-locale'
import { provideGlobalConfig } from '..'
import type { Language } from '@hongluan-ui/locale'
import type { PropType, ComponentPublicInstance } from 'vue'
import type { VueWrapper } from '@vue/test-utils'

const TestComp = defineComponent({
  setup() {
    const { t } = useLocale()
    return () => (
      <div class="locale-manifest">{t('hl.popconfirm.confirmButtonText')}</div>
    )
  },
})

describe('use-locale', () => {
  let wrapper: VueWrapper<ComponentPublicInstance>

  beforeEach(() => {
    wrapper = mount(
      {
        props: {
          locale: Object as PropType<Language>,
        },
        components: {
          'hl-test': TestComp,
        },
        setup(props, { slots }) {
          provideGlobalConfig(computed(() => ({ locale: props.locale })))
          return () => slots.default?.()
        },
      },
      {
        props: { locale: Chinese },
        slots: { default: () => <TestComp /> },
      }
    )
  })

  afterEach(() => {
    wrapper.unmount()
  })

  it('should provide locale correctly', async () => {
    await nextTick()
    expect(wrapper.find('.locale-manifest').text()).toBe(
      Chinese.hl.popconfirm.confirmButtonText
    )
  })

  it('should update the text reactively', async () => {
    await nextTick()
    expect(wrapper.find('.locale-manifest').text()).toBe(
      Chinese.hl.popconfirm.confirmButtonText
    )
    await wrapper.setProps({
      locale: English,
    })

    expect(wrapper.find('.locale-manifest').text()).toBe(
      English.hl.popconfirm.confirmButtonText
    )
  })

  it('return key name if not defined', () => {
    const t = buildTranslator(English)
    expect(t('hl.popconfirm.someThing')).toBe('hl.popconfirm.someThing')
  })
})
