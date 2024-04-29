import { mount } from '@vue/test-utils'
import { usePrefix } from '@hongluan-ui/test-utils/utils'
import { describe, expect, test } from 'vitest'
import Layout from '../src/layout.vue'
import Header from '../src/header.vue'
import SubHeader from '../src/sub-header.vue'
import Main from '../src/main.vue'
import Container from '../src/container.vue'
import Aside from '../src/aside.vue'
import Footer from '../src/footer.vue'

const AXIOM = 'Rem is the best girl'
const { prefix } = usePrefix()

describe('Layout.vue', () => {
  test('layout render test', () => {
    const wrapper = mount(Layout, {
      slots: {
        default: AXIOM,
      },
    })
    expect(wrapper.text()).toEqual(AXIOM)
  })

  test('all properties', () => {
    const TestComponent = {
      template: `
        <hl-layout boxed fixed-header full-header fixed-aside fixed-sub-header full-sub-header fixed-footer full-footer>
          <hl-header></hl-header>
          <hl-main></hl-main>
        </hl-layout>`,
      components: {
        'hl-layout': Layout,
        'hl-header': Header,
        'hl-main': Main,
      },
    }

    const wrapper = mount(TestComponent)
    expect(wrapper.classes('boxed')).toBe(true)
    expect(wrapper.classes('fixed-header')).toBe(true)
    expect(wrapper.classes('full-header')).toBe(true)
    expect(wrapper.classes('fixed-aside')).toBe(true)
    expect(wrapper.classes('fixed-sub-header')).toBe(true)
    expect(wrapper.classes('full-sub-header')).toBe(true)
    expect(wrapper.classes('fixed-footer')).toBe(true)
    expect(wrapper.classes('full-footer')).toBe(true)
  })

})

describe('Header', () => {
  test('create header', () => {
    const wrapper = mount(Header)
    expect(wrapper.classes()).toContain(`${prefix}-header`)
  })

  test('header height', () => {
    const wrapper = mount(Header, {
      props: {
        height: '100px',
      },
    })
    expect(wrapper.element.getAttribute('style')).toContain('--layout-header-height: 100px')
  })
})

describe('SubHeader', () => {
  test('create subheader', () => {
    const wrapper = mount(SubHeader)
    expect(wrapper.classes()).toContain(`${prefix}-sub-header`)
  })

  test('header height', () => {
    const wrapper = mount(SubHeader, {
      props: {
        height: '100px',
      },
    })
    expect(wrapper.element.getAttribute('style')).toContain('--layout-sub-header-height: 100px')
  })
})

describe('Aside', () => {
  test('aside create', () => {
    const wrapper = mount(Aside)
    expect(wrapper.classes()).toContain(`${prefix}-aside`)
  })

  test('aside width', () => {
    const wrapper = mount(Aside, {
      props: {
        width: '200px',
      },
    })
    expect(wrapper.element.getAttribute('style')).toContain('--layout-aside-width: 200px')
  })
})

describe('Main', () => {
  test('main create', () => {
    const wrapper = mount(Main)
    expect(wrapper.classes()).toContain(`${prefix}-main`)
  })
})

describe('Container', () => {
  test('main create', () => {
    const wrapper = mount(Container)
    expect(wrapper.classes()).toContain(`${prefix}-container`)
  })
})

describe('Footer', () => {
  test('footer create', () => {
    const wrapper = mount(Footer)
    expect(wrapper.classes()).toContain(`${prefix}-footer`)
  })

  test('footer height', () => {
    const wrapper = mount(Footer, {
      props: {
        height: '100px',
      },
    })
    expect(wrapper.element.getAttribute('style')).toContain('--layout-footer-height: 100px')
  })

})
