import { h, ref, nextTick } from 'vue'
import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import Row from '@hongluan-ui/components/row'
import { usePrefix } from '@hongluan-ui/test-utils/utils'
import Col from '../src/col'

const { prefix } = usePrefix()
describe('Col', () => {
  it('create', () => {
    const wrapper = mount(Col)
    expect(wrapper.classes()).toContain(`${prefix}-col`)
  })

  it('span:number', () => {
    const wrapper = mount(Col, {
      props: { span: 12 },
    })
    expect(wrapper.classes()).toContain('col-12')
  })

  it('span:string', () => {
    const wrapper = mount(Col, {
      props: { span: 'lg:col-8 xl:col-8' },
    })
    expect(wrapper.classes()).toContain('lg:col-8')
    expect(wrapper.classes()).toContain('xl:col-8')
  })

  it('offset:number', () => {
    const wrapper = mount(Col, {
      props: { offset: 8 },
    })
    expect(wrapper.classes()).toContain('offset-8')
  })

  it('offset:string', () => {
    const wrapper = mount(Col, {
      props: { offset: 'md:offset-8 lg:offset-8' },
    })
    expect(wrapper.classes()).toContain('md:offset-8')
    expect(wrapper.classes()).toContain('lg:offset-8')
  })

  it('gap', () => {
    const TestComponent = {
      template: `<hl-row gap="20px">
      <hl-col :span="12" ref="col"></hl-col>
    </hl-row>`,
      components: {
        'hl-col': Col,
        'hl-row': Row,
      },
    }
    const wrapper = mount(TestComponent)
    // const colElm = wrapper.findComponent({ ref: 'col' }).element as HTMLElement
    expect(wrapper.attributes('style').indexOf('--row-gap-y: 20') > -1).toBe(true)
  })

  it('change gap value', async () => {
    const outer = ref('20px')
    const App = {
      setup() {
        return () => {
          return h(Row,
            {
              gap: outer.value,
              layout: 'flow',
              ref: 'row',
            },
            {
              default: () => [
                h(Col, {
                  span: 12,
                  ref: 'col',
                }),
              ],
            },
          )
        }
      },
    }

    const wrapper = mount(App)
    // const rowElm = wrapper.findComponent({ ref: 'row' }).element as HTMLElement
    // const colElm = wrapper.findComponent({ ref: 'col' }).element as HTMLElement
    expect(wrapper.attributes('style').indexOf('--row-gap-y: 20') > -1).toBe(true)

    outer.value = '40px' // change gutter value
    await nextTick()
    expect(wrapper.attributes('style').indexOf('--row-gap-y: 40') > -1).toBe(true)
  })

  it('responsive', () => {
    const TestComponent = {
      template: `<hl-row :gutter="20">
      <hl-col ref="col" :sm="{ span: 4, offset: 2 }" :md="8" :lg="{ span: 6, offset: 3 }">
      </hl-col>
    </hl-row>`,
      components: {
        'hl-col': Col,
        'hl-row':Row,
      },
    }
    const wrapper = mount(TestComponent)
    const colElmClass = wrapper.findComponent({ ref: 'col' }).classes()
    expect(colElmClass.includes('sm:col-4')).toBe(true)
    expect(colElmClass.includes('sm:col-4')).toBe(true)
    expect(colElmClass.includes('sm:offset-2')).toBe(true)
    expect(colElmClass.includes('lg:col-6')).toBe(true)
    expect(colElmClass.includes('lg:offset-3')).toBe(true)
    expect(colElmClass.includes('md:col-8')).toBe(true)
  })
})
