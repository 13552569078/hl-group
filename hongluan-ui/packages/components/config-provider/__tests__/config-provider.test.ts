import { defineComponent, h, nextTick, reactive, ref } from 'vue'
import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import { useGlobalConfig, useLocale } from '@hongluan-ui/hooks'
import Chinese from '@hongluan-ui/locale/lang/zh-cn'
import English from '@hongluan-ui/locale/lang/en'
import { HlButton, HlMessage } from '@hongluan-ui/components'
import { rAF } from '@hongluan-ui/test-utils/tick'
import { usePrefix } from '@hongluan-ui/test-utils/utils'
import ConfigProvider from '../src/config-provider'

import type { PropType } from 'vue'
import type { VueWrapper } from '@vue/test-utils'
import type { Language } from '@hongluan-ui/locale'
import type{ ConfigProviderProps } from '../src/config-provider'


const TestComp = {
  setup() {
    const { t } = useLocale()
    return () => {
      return h('div', t('hl.popconfirm.confirmButtonText'))
    }
  },
}

describe('config-provider', () => {

  const { prefix, PREFIX } = usePrefix()
  describe('locale-provider', () => {
    let wrapper: VueWrapper<any>

    beforeEach(() => {
      wrapper = mount({
        components: {
          'hl-test': TestComp,
          [prefix + ConfigProvider.name]: ConfigProvider,
        },
        setup() {
          const currentLocale = ref<Language>(English)
          const oppositeLocale = ref<Language>(Chinese)
          return {
            currentLocale,
            oppositeLocale,
            toEn() {
              currentLocale.value = English
              oppositeLocale.value = Chinese
            },
            toZh() {
              currentLocale.value = Chinese
              oppositeLocale.value = English
            },
          }
        },
        template: `
          <hl-config-provider :locale="currentLocale">
            <hl-test class="current-locale" />
            <hl-config-provider :locale="oppositeLocale">
              <hl-test class="opposite-locale" />
            </hl-config-provider>
          </hl-config-provider>

          <button @click="toEn" class="to-en">toEn</button>
          <button @click="toZh" class="to-zh">toZh</button>
        `,
      })
    })

    afterEach(() => {
      wrapper.unmount()
    })

    it('should provide locale properly', async () => {
      expect(wrapper.find('.current-locale').text()).toBe(
        English.hl.popconfirm.confirmButtonText,
      )
      expect(wrapper.find('.opposite-locale').text()).toBe(
        Chinese.hl.popconfirm.confirmButtonText,
      )
    })

    it('should reactively update the text on page', async () => {
      expect(wrapper.find('.current-locale').text()).toBe(
        English.hl.popconfirm.confirmButtonText,
      )
      expect(wrapper.find('.opposite-locale').text()).toBe(
        Chinese.hl.popconfirm.confirmButtonText,
      )

      await wrapper.find('.to-zh').trigger('click')

      expect(wrapper.find('.current-locale').text()).toBe(
        Chinese.hl.popconfirm.confirmButtonText,
      )
      expect(wrapper.find('.opposite-locale').text()).toBe(
        English.hl.popconfirm.confirmButtonText,
      )
    })
  })

  describe('message-config', () => {
    afterEach(() => {
      HlMessage.closeAll()
    })
    it('limit the number of messages displayed at the same time', async () => {
      const wrapper = mount({
        components: {
          [prefix + ConfigProvider.name]: ConfigProvider,
          HlButton,
        },
        setup() {
          const config = reactive({
            max: 3,
          })
          const open = () => {
            HlMessage('this is a message.')
          }
          return {
            config,
            open,
          }
        },
        template: `
          <hl-config-provider :message="config">
            <hl-button @click="open">open</hl-button>
          </hl-config-provider>
        `,
      })
      await nextTick()
      wrapper.find(`.${prefix}-button`).trigger('click')
      wrapper.find(`.${prefix}-button`).trigger('click')
      wrapper.find(`.${prefix}-button`).trigger('click')
      wrapper.find(`.${prefix}-button`).trigger('click')
      await nextTick()
      expect(document.querySelectorAll(`.${prefix}-message`).length).toBe(3)

      wrapper.vm.config.max = 10
      await nextTick()
      wrapper.find(`.${prefix}-button`).trigger('click')
      wrapper.find(`.${prefix}-button`).trigger('click')
      wrapper.find(`.${prefix}-button`).trigger('click')
      wrapper.find(`.${prefix}-button`).trigger('click')
      await nextTick()
      expect(document.querySelectorAll(`.${prefix}-message`).length).toBe(7)
    })

    it('multiple config-provider config override', async () => {
      const wrapper = mount({
        components: {
          [prefix + ConfigProvider.name]: ConfigProvider,
          HlButton,
        },
        setup() {
          const config = reactive({
            max: 3,
          })
          const overrideConfig = reactive({
            max: 1,
          })
          const open = () => {
            HlMessage('this is a message.')
          }
          return {
            config,
            overrideConfig,
            open,
          }
        },
        template: `
          <hl-config-provider :message="config">
            <hl-config-provider :message="overrideConfig">
              <hl-button @click="open">open</hl-button>
            </hl-config-provider>
          </hl-config-provider>
        `,
      })

      await rAF()
      await wrapper.find(`.${prefix}-button`).trigger('click')
      await wrapper.find(`.${prefix}-button`).trigger('click')
      await wrapper.find(`.${prefix}-button`).trigger('click')
      await nextTick()
      expect(document.querySelectorAll(`.${prefix}-message`).length).toBe(1)
    })
  })

  describe('namespace-config', () => {
    it('reactive namespace', async () => {
      const wrapper = mount({
        components: {
          [prefix + ConfigProvider.name]: ConfigProvider,
          HlButton,
        },
        setup() {
          const namespace = ref()
          const changeNS = () => {
            namespace.value = 'ep'
          }
          return {
            namespace,
            changeNS,
          }
        },
        template: `
          <hl-config-provider :namespace="namespace">
            <hl-button>test str</hl-button>
          </hl-config-provider>
        `,
      })
      await nextTick()
      expect(wrapper.find('button').classes()).toContain('hl-button')
      wrapper.vm.namespace = 'ep'
      await nextTick()
      expect(wrapper.find('button').classes()).toContain('ep-button')
    })
  })

  describe('feature checking', () => {
    const TestComponent = defineComponent({
      props: {
        configKey: {
          type: String as PropType<keyof ConfigProviderProps>,
          required: true,
        },
      },
      setup(props) {
        const features = useGlobalConfig(props.configKey)
        return {
          [props.configKey]: features,
        }
      },
      template: `<div />`,
    })

    it.each([
      { feature: 'a11y', config: false },
      { feature: 'keyboardNavigation', config: false },
      { feature: 'experimentalFeatures', config: { someFeature: true } },
    ])(
      'should inject config $feature to $config correctly',
      ({ feature, config }: { feature: string; config: any; }) => {
        const wrapper = mount({
          components: {
            [PREFIX + ConfigProvider.name]: ConfigProvider,
            TestComponent,
          },
          template: `
            <hl-config-provider :${feature}="${feature}">
              <test-component config-key="${feature}" />
            </hl-config-provider>
          `,
          data() {
            return {
              [feature]: config,
            }
          },
        })

        expect(wrapper.findComponent(TestComponent).vm[feature]).toEqual(config)
      },
    )
  })


})
