import { mount } from '@vue/test-utils'
import { defineComponent, nextTick, ref } from 'vue'
import { EVENT_CODE } from '@hongluan-ui/constants'
import { usePrefix } from '@hongluan-ui/test-utils/utils'
import { describe, expect, test, vi } from 'vitest'
import Tabs from '../src/tabs'
import TabPane from '../src/tab-pane.vue'
import TabNav from '../src/tab-nav'

const Comp = defineComponent({
  components: {
    TabPane,
  },
  setup() {
    return () => (
      <TabPane name="tab1" label="tab1">
        Tab 1 content
      </TabPane>
    )
  },
})

describe('Tabs.vue', () => {
  const { prefix } = usePrefix()
  test('create', async () => {
    const wrapper = mount({
      components: {
        'hl-tabs': Tabs,
        'hl-tab-pane': TabPane,
      },
      template: `
        <hl-tabs>
          <hl-tab-pane label="labhl-1">A</hl-tab-pane>
          <hl-tab-pane label="labhl-2">B</hl-tab-pane>
          <hl-tab-pane label="labhl-3" ref="pane-click">C</hl-tab-pane>
          <hl-tab-pane label="labhl-4">D</hl-tab-pane>
        </hl-tabs>
      `,
    })

    const tabsWrapper = wrapper.findComponent(Tabs)
    const navWrapper = wrapper.findComponent(TabNav)
    const panesWrapper = wrapper.findAllComponents(TabPane)
    await nextTick()

    const navItemsWrapper = navWrapper.findAll('.tabs-item')

    expect(navItemsWrapper[0].classes('is-active')).toBe(true)
    expect(panesWrapper[0].classes(`${prefix}-tab-pane`)).toBe(true)
    expect(panesWrapper[0].attributes('id')).toBe('pane-0')
    expect(panesWrapper[0].attributes('aria-hidden')).toEqual('false')
    expect(tabsWrapper.vm.$.exposed!.currentName.value).toEqual('0')

    await navItemsWrapper[2].trigger('click')
    expect(navItemsWrapper[0].classes('is-active')).toBe(false)
    expect(panesWrapper[0].attributes('aria-hidden')).toEqual('true')
    expect(navItemsWrapper[2].classes('is-active')).toBe(true)
    expect(panesWrapper[2].attributes('aria-hidden')).toEqual('false')
    expect(tabsWrapper.vm.$.exposed!.currentName.value).toEqual('2')
  })

  test('active-name', async () => {
    const wrapper = mount({
      components: {
        'hl-tabs': Tabs,
        'hl-tab-pane': TabPane,
      },
      data() {
        return {
          activeName: 'b',
        }
      },
      methods: {
        handleClick(tab: any) {
          this.activeName = tab.paneName
        },
      },
      template: `
        <hl-tabs v-model="activeName" @tab-click="handleClick">
          <hl-tab-pane name="a" label="labhl-1">A</hl-tab-pane>
          <hl-tab-pane name="b" label="labhl-2">B</hl-tab-pane>
          <hl-tab-pane name="c" label="labhl-3" ref="pane-click">C</hl-tab-pane>
          <hl-tab-pane name="d" label="labhl-4">D</hl-tab-pane>
        </hl-tabs>
      `,
    })

    const tabsWrapper = wrapper.findComponent(Tabs)
    const navWrapper = wrapper.findComponent(TabNav)
    const panesWrapper = wrapper.findAllComponents(TabPane)
    await nextTick()

    const navItemsWrapper = navWrapper.findAll('.tabs-item')
    expect(navItemsWrapper[1].classes('is-active')).toBe(true)
    expect(panesWrapper[1].classes(`${prefix}-tab-pane`)).toBe(true)
    expect(panesWrapper[1].attributes('id')).toBe('pane-b')
    expect(panesWrapper[1].attributes('aria-hidden')).toEqual('false')
    expect(tabsWrapper.vm.$.exposed!.currentName.value).toEqual('b')

    await navItemsWrapper[2].trigger('click')
    expect(navItemsWrapper[1].classes('is-active')).toBe(false)
    expect(panesWrapper[1].attributes('aria-hidden')).toEqual('true')
    expect(navItemsWrapper[2].classes('is-active')).toBe(true)
    expect(panesWrapper[2].attributes('aria-hidden')).toEqual('false')
    expect(tabsWrapper.vm.$.exposed!.currentName.value).toEqual('c')
  })

  test('line', async () => {
    const wrapper = mount({
      components: {
        'hl-tabs': Tabs,
        'hl-tab-pane': TabPane,
      },
      template: `
        <hl-tabs type="line">
          <hl-tab-pane label="labhl-1">A</hl-tab-pane>
          <hl-tab-pane label="labhl-2">B</hl-tab-pane>
          <hl-tab-pane label="labhl-3" ref="pane-click">C</hl-tab-pane>
          <hl-tab-pane label="labhl-4">D</hl-tab-pane>
        </hl-tabs>
      `,
    })

    const tabsWrapper = wrapper.findComponent(Tabs)
    expect(tabsWrapper.classes('tabs-line')).toBe(true)
  })

  test('dynamic', async () => {
    const wrapper = mount({
      components: {
        'hl-tabs': Tabs,
        'hl-tab-pane': TabPane,
      },
      template: `
        <hl-tabs ref="tabs">
          <hl-tab-pane :label="tab.label" :name="tab.name" v-for="tab in tabs" :key="tab.name">Test Content</hl-tab-pane>
        </hl-tabs>
      `,
      data() {
        return {
          tabs: [{
            label: 'tab1',
            name: 'tab1',
          }, {
            label: 'tab2',
            name: 'tab2',
          }, {
            label: 'tab3',
            name: 'tab3',
          }, {
            label: 'tab4',
            name: 'tab4',
          }],
        }
      },
    })

    let navWrapper = wrapper.findComponent(TabNav)
    let panesWrapper = wrapper.findAllComponents(TabPane)
    await nextTick()

    let navItemsWrapper = navWrapper.findAll('.tabs-item')

    expect(navItemsWrapper.length).toEqual(4)
    expect(panesWrapper.length).toEqual(4)

    wrapper.vm.tabs.push({ label: 'tab5', name: 'tab5' })

    await nextTick()
    navWrapper = wrapper.findComponent(TabNav)
    panesWrapper = wrapper.findAllComponents(TabPane)
    navItemsWrapper = navWrapper.findAll('.tabs-item')

    expect(navItemsWrapper.length).toEqual(5)
    expect(panesWrapper.length).toEqual(5)
  })

  test('editable', async () => {
    const wrapper = mount({
      components: {
        'hl-tabs': Tabs,
        'hl-tab-pane': TabPane,
      },
      template: `
        <hl-tabs ref="tabs" v-model="editableTabsValue" editable @edit="handleTabsEdit">
          <hl-tab-pane
            v-for="(item, index) in editableTabs"
            :key="item.name"
            :label="item.title"
            :name="item.name"
          >
            {{item.content}}
          </hl-tab-pane>
        </hl-tabs>
      `,
      data() {
        return {
          editableTabsValue: '2',
          editableTabs: [{
            title: 'Tab 1',
            name: '1',
            content: 'Tab 1 content',
          }, {
            title: 'Tab 2',
            name: '2',
            content: 'Tab 2 content',
          }, {
            title: 'Tab 3',
            name: '3',
            content: 'Tab 3 content',
          }],
          tabIndex: 3,
        }
      },
      methods: {
        handleTabsEdit(this: any, targetName: string, action: string) {
          if (action === 'add') {
            const newTabName = ++this.tabIndex + ''
            this.editableTabs.push({
              title: 'New Tab',
              name: newTabName,
              content: 'New Tab content',
            })
            this.editableTabsValue = newTabName
          }
          if (action === 'remove') {
            const tabs = this.editableTabs
            let activeName = this.editableTabsValue
            if (activeName === targetName) {
              tabs.forEach((tab: any, index: number) => {
                if (tab.name === targetName) {
                  const nextTab = tabs[index + 1] || tabs[index - 1]
                  if (nextTab) {
                    activeName = nextTab.name
                  }
                }
              })
            }
            this.editableTabsValue = activeName
            this.editableTabs = tabs.filter((tab: any) => tab.name !== targetName)
          }
        },
      },
    })

    const navWrapper = wrapper.findComponent(TabNav)
    let panesWrapper = wrapper.findAllComponents(TabPane)
    await nextTick()

    let navItemsWrapper = navWrapper.findAll('.tabs-item')

    expect(navItemsWrapper.length).toEqual(3)
    expect(panesWrapper.length).toEqual(3)
    expect(navItemsWrapper[1].classes('is-active')).toBe(true)

    // remove one tab, check panes length
    await navItemsWrapper[1].find('.tab-close').trigger('click')

    panesWrapper = wrapper.findAllComponents(TabPane)
    navItemsWrapper = navWrapper.findAll('.tabs-item')

    expect(navItemsWrapper.length).toEqual(2)
    expect(panesWrapper.length).toEqual(2)

    // add one tab, check panes length and current tab
    await wrapper.find('.tab-new').trigger('click')

    panesWrapper = wrapper.findAllComponents(TabPane)
    navItemsWrapper = navWrapper.findAll('.tabs-item')

    expect(navItemsWrapper.length).toEqual(3)
    expect(panesWrapper.length).toEqual(3)
    expect(navItemsWrapper[2].classes('is-active')).toBe(true)
  })

  test('tab order', async () => {
    const editableTabs = ref([
      {
        title: 'Tab 1',
        name: '1',
        content: 'Tab 1 content',
      },
      {
        title: 'Tab 2',
        name: '2',
        content: 'Tab 2 content',
      },
    ])

    const wrapper = mount(() => (
      <Tabs ref="tabs" type="line">
        {editableTabs.value.map(item => (
          <TabPane
            label={item.title}
            key={item.name}
            name={item.name}
          ></TabPane>
        ))}
      </Tabs>
    ))

    editableTabs.value.splice(1, 0, {
      title: 'Tab 3',
      name: '3',
      content: 'Tab 3 content',
    })
    await nextTick()

    const items = wrapper.findAll('.tabs-item')
    editableTabs.value.forEach((tab, index) => {
      expect(items[index].element.textContent).toEqual(tab.title)
    })
  })

  test('addable & closable', async () => {
    const wrapper = mount({
      components: {
        'hl-tabs': Tabs,
        'hl-tab-pane': TabPane,
      },
      template: `
        <hl-tabs
          ref="tabs"
          v-model="editableTabsValue"
          addable
          closable
          @tab-add="addTab"
          @tab-remove="removeTab"
        >
          <hl-tab-pane
            v-for="(item, index) in editableTabs"
            :label="item.title"
            :key="item.name"
            :name="item.name"
          >
            {{item.content}}
          </hl-tab-pane>
        </hl-tabs>
      `,
      data() {
        return {
          editableTabsValue: '2',
          editableTabs: [{
            title: 'Tab 1',
            name: '1',
            content: 'Tab 1 content',
          }, {
            title: 'Tab 2',
            name: '2',
            content: 'Tab 2 content',
          }],
          tabIndex: 2,
        }
      },
      methods: {
        addTab(this: any) {
          const newTabName = ++this.tabIndex + ''
          this.editableTabs.push({
            title: 'New Tab',
            name: newTabName,
            content: 'New Tab content',
          })
          this.editableTabsValue = newTabName
        },
        removeTab(this: any, targetName: string) {
          const tabs = this.editableTabs
          let activeName = this.editableTabsValue
          if (activeName === targetName) {
            tabs.forEach((tab: any, index: number) => {
              if (tab.name === targetName) {
                const nextTab = tabs[index + 1] || tabs[index - 1]
                if (nextTab) {
                  activeName = nextTab.name
                }
              }
            })
          }
          this.editableTabsValue = activeName
          this.editableTabs = tabs.filter((tab: any) => tab.name !== targetName)
        },
      },
    })

    const navWrapper = wrapper.findComponent(TabNav)
    await nextTick()

    await wrapper.find('.tab-new').trigger('click')

    let navItemsWrapper = navWrapper.findAll('.tabs-item')
    let panesWrapper = wrapper.findAllComponents(TabPane)
    expect(navItemsWrapper.length).toEqual(3)
    expect(panesWrapper.length).toEqual(3)
    expect(navItemsWrapper[2].classes('is-active')).toBe(true)

    await navItemsWrapper[2].find('.tab-close').trigger('click')

    panesWrapper = wrapper.findAllComponents(TabPane)
    navItemsWrapper = navWrapper.findAll('.tabs-item')

    expect(navItemsWrapper.length).toEqual(2)
    expect(panesWrapper.length).toEqual(2)
  })

  test('closable in tab-pane', async () => {
    const wrapper = mount({
      components: {
        'hl-tabs': Tabs,
        'hl-tab-pane': TabPane,
      },
      template: `
        <hl-tabs ref="tabs">
          <hl-tab-pane label="labhl-1" closable>A</hl-tab-pane>
          <hl-tab-pane label="labhl-2">B</hl-tab-pane>
          <hl-tab-pane label="labhl-3" closable>C</hl-tab-pane>
          <hl-tab-pane label="labhl-4">D</hl-tab-pane>
        </hl-tabs>
      `,
    })

    const navWrapper = wrapper.findComponent(TabNav)
    await nextTick()

    expect(navWrapper.findAll('.tab-close').length).toBe(2)
  })

  test('disabled', async () => {
    const wrapper = mount({
      components: {
        'hl-tabs': Tabs,
        'hl-tab-pane': TabPane,
      },
      template: `
        <hl-tabs ref="tabs">
          <hl-tab-pane label="labhl-1">A</hl-tab-pane>
          <hl-tab-pane disabled label="labhl-2" ref="disabled">B</hl-tab-pane>
          <hl-tab-pane label="labhl-3">C</hl-tab-pane>
          <hl-tab-pane label="labhl-4">D</hl-tab-pane>
        </hl-tabs>
      `,
    })

    const navWrapper = wrapper.findComponent(TabNav)
    await nextTick()
    const navItemsWrapper = navWrapper.findAll('.tabs-item')
    expect(navItemsWrapper[1].classes('is-active')).toBe(false)

    await navItemsWrapper[1].trigger('click')
    expect(navItemsWrapper[1].classes('is-active')).toBe(false)
  })

  test('tab-position', async () => {
    const wrapper = mount({
      components: {
        'hl-tabs': Tabs,
        'hl-tab-pane': TabPane,
      },
      template: `
        <hl-tabs ref="tabs" type="line" tab-position="left">
          <hl-tab-pane label="labhl-1">A</hl-tab-pane>
          <hl-tab-pane label="labhl-2">B</hl-tab-pane>
          <hl-tab-pane label="labhl-3" ref="pane-click">C</hl-tab-pane>
          <hl-tab-pane label="labhl-4">D</hl-tab-pane>
        </hl-tabs>
      `,
    })

    const tabsWrapper = wrapper.findComponent(Tabs)
    await nextTick()

    expect(tabsWrapper.classes('tabs-left')).toBe(true)
    expect(tabsWrapper.find('.tabs-header').classes('at-left')).toBe(true)
    expect(tabsWrapper.find('.tabs-wrap').classes('at-left')).toBe(true)
    expect(tabsWrapper.find('.tabs-nav').classes('at-left')).toBe(true)
    expect(tabsWrapper.find('.tabs-active-bar').classes('at-left')).toBe(true)
    expect(tabsWrapper.find('.tabs-item').classes('at-left')).toBe(true)
  })

  test('stretch', async () => {
    const wrapper = mount({
      components: {
        'hl-tabs': Tabs,
        'hl-tab-pane': TabPane,
      },
      template: `
      <hl-tabs ref="tabs" stretch :tab-position="tabPosition">
        <hl-tab-pane label="labhl-1">A</hl-tab-pane>
        <hl-tab-pane label="labhl-2">B</hl-tab-pane>
        <hl-tab-pane label="labhl-3">C</hl-tab-pane>
        <hl-tab-pane label="labhl-4">D</hl-tab-pane>
      </hl-tabs>
      `,
      data() {
        return {
          tabPosition: 'bottom',
        }
      },
    })

    const tabsWrapper = wrapper.findComponent(Tabs)
    await nextTick()

    expect(tabsWrapper.find('.tabs-nav').classes('is-stretch')).toBe(true)

    wrapper.vm.tabPosition = 'left'
    await nextTick()

    expect(tabsWrapper.find('.tabs-nav').classes('is-stretch')).toBe(false)
  })

  test('tab active bar offset', async () => {
    const wrapper = mount({
      components: {
        'hl-tabs': Tabs,
        'hl-tab-pane': TabPane,
      },
      template: `
      <hl-tabs ref="tabs" stretch :tab-position="tabPosition" type="line">
        <hl-tab-pane label="label-1" name="A">A</hl-tab-pane>
        <hl-tab-pane label="label-2" name="B">B</hl-tab-pane>
        <hl-tab-pane label="label-3" name="C">C</hl-tab-pane>
        <hl-tab-pane label="label-4" name="D">D</hl-tab-pane>
      </hl-tabs>
      `,
      data() {
        return {
          tabPosition: 'bottom',
        }
      },
    })

    const tabsWrapper = wrapper.findComponent(Tabs)
    await nextTick()
    const mockOffsetLeft = vi
      .spyOn(wrapper.find('#tab-C').element as HTMLElement, 'offsetLeft', 'get')
      .mockImplementation(() => 300)
    const mockComputedStyle = vi.spyOn(window, 'getComputedStyle').mockReturnValue({ paddingLeft: '0px' } as CSSStyleDeclaration)
    await wrapper.find('#tab-C').trigger('click')

    await nextTick()
    expect(tabsWrapper.find('.tabs-active-bar').attributes().style).toMatch('translateX(300px)')

    wrapper.vm.tabPosition = 'left'
    await nextTick()
    const mockOffsetTop = vi
      .spyOn(wrapper.find('#tab-C').element as HTMLElement, 'offsetTop', 'get')
      .mockImplementation(() => 200)
    await wrapper.find('#tab-A').trigger('click')
    await wrapper.find('#tab-C').trigger('click')

    await nextTick()
    expect(tabsWrapper.find('.tabs-active-bar').attributes().style).toMatch('translateY(200px)')

    mockOffsetLeft.mockRestore()
    mockOffsetTop.mockRestore()
    mockComputedStyle.mockRestore()
    wrapper.unmount()
  })


  test('horizonal-scrollable', async () => {
    // TODO: jsdom not support `clientWidth`.
  })

  test('vertical-scrollable', async () => {
    // TODO: jsdom not support `clientWidth`.
  })

  test('should work with lazy', async () => {
    const wrapper = mount({
      components: {
        'hl-tabs': Tabs,
        'hl-tab-pane': TabPane,
      },
      template: `
        <hl-tabs ref="tabs">
          <hl-tab-pane label="labhl-1" name="A">A</hl-tab-pane>
          <hl-tab-pane label="labhl-2" name="B">B</hl-tab-pane>
          <hl-tab-pane label="labhl-3" name="C">C</hl-tab-pane>
          <hl-tab-pane label="labhl-4" lazy name="D">D</hl-tab-pane>
        </hl-tabs>
      `,
    })

    const navWrapper = wrapper.findComponent(TabNav)
    await nextTick()
    const navItemsWrapper = navWrapper.findAll('.tabs-item')

    expect(wrapper.findAll(`.${prefix}-tab-pane`).length).toBe(3)

    await navItemsWrapper[3].trigger('click')

    expect(wrapper.findAll(`.${prefix}-tab-pane`).length).toBe(4)
  })

  test('before leave', async () => {
    const wrapper = mount({
      components: {
        'hl-tabs': Tabs,
        'hl-tab-pane': TabPane,
      },
      template: `
        <hl-tabs ref="tabs" v-model="activeName" :before-leave="beforeLeave">
          <hl-tab-pane name="tab-A" label="labhl-1">A</hl-tab-pane>
          <hl-tab-pane name="tab-B" label="labhl-2">B</hl-tab-pane>
          <hl-tab-pane name="tab-C" label="labhl-3">C</hl-tab-pane>
          <hl-tab-pane name="tab-D" label="labhl-4">D</hl-tab-pane>
        </hl-tabs>
      `,
      data() {
        return {
          activeName: 'tab-B',
        }
      },
      methods: {
        beforeLeave() {
          return new window.Promise((resolve, reject) => {
            reject()
          })
        },
      },
    })

    const navWrapper = wrapper.findComponent(TabNav)
    const panesWrapper = wrapper.findAllComponents(TabPane)
    await nextTick()
    const navItemsWrapper = navWrapper.findAll('.tabs-item')

    expect(navItemsWrapper[1].classes('is-active')).toBe(true)
    expect(panesWrapper[1].attributes('style')).toBeFalsy()

    await navItemsWrapper[3].trigger('click')

    expect(navItemsWrapper[1].classes('is-active')).toBe(true)
    expect(panesWrapper[1].attributes('style')).toBeFalsy()
  })

  test('keyboard event', async () => {
    const wrapper = mount({
      components: {
        'hl-tabs': Tabs,
        'hl-tab-pane': TabPane,
      },
      template: `
        <hl-tabs v-model="activeName">
          <hl-tab-pane label="label-1" name="first" disabled>A</hl-tab-pane>
          <hl-tab-pane label="labhl-2" name="second">B</hl-tab-pane>
          <hl-tab-pane label="labhl-3" name="third">C</hl-tab-pane>
          <hl-tab-pane label="labhl-4" name="fourth">D</hl-tab-pane>
        </hl-tabs>
      `,
      data() {
        return {
          activeName: 'second',
        }
      },
    })

    const vm = wrapper.vm
    await nextTick()

    await wrapper.find('#tab-second').trigger('keydown', { code: EVENT_CODE.right })
    expect(vm.activeName).toEqual('third')

    await wrapper.find('#tab-third').trigger('keydown', { code: EVENT_CODE.right })
    expect(vm.activeName).toEqual('fourth')

    await wrapper.find('#tab-fourth').trigger('keydown', { code: EVENT_CODE.right })
    expect(vm.activeName).toEqual('second')

    await wrapper
      .find('#tab-second')
      .trigger('keydown', { code: EVENT_CODE.left })
    expect(vm.activeName).toEqual('fourth')
  })

  test('DOM update finished calculating navOffset', async () => {
    const tabs = Array.from({ length: 100 }, (_, i) => i.toString())
    const wrapper = mount({
      components: {
        'hl-tabs': Tabs,
        'hl-tab-pane': TabPane,
      },
      template: `
        <hl-tabs v-model="activeName" type="line">
          <hl-tab-pane
            v-for="item in tabs"
            :key="item"
            :label="item"
            :name="item"
          />
        </hl-tabs>
      `,
      data() {
        return {
          activeName: '0',
          tabs,
        }
      },
    })

    const tabsWrapper = wrapper.findComponent(Tabs)
    await nextTick()

    const mockOffsetLeft = vi
      .spyOn(
        wrapper.find('#tab-99').element as HTMLElement,
        'offsetLeft',
        'get',
      )
      .mockImplementation(() => 100)
    const mockComputedStyle = vi
      .spyOn(window, 'getComputedStyle')
      .mockReturnValue({ paddingLeft: '0px' } as CSSStyleDeclaration)

    await wrapper.find('#tab-99').trigger('click')
    await nextTick()

    expect(tabsWrapper.find('.tabs-active-bar').attributes().style).toMatch(
      'translateX(100px)',
    )

    mockOffsetLeft.mockRestore()
    mockComputedStyle.mockRestore()
    wrapper.unmount()
  })

  test('value type', async () => {
    const wrapper = mount({
      components: {
        'hl-tabs': Tabs,
        'hl-tab-pane': TabPane,
      },
      data() {
        return {
          activeName: 0,
        }
      },
      methods: {
        handleClick(this: any, tab: any) {
          this.activeName = tab.paneName
        },
      },
      template: `
        <hl-tabs v-model="activeName" @tab-click="handleClick">
          <hl-tab-pane :name="0" label="label-1">A</hl-tab-pane>
          <hl-tab-pane :name="1" label="label-2">B</hl-tab-pane>
          <hl-tab-pane :name="2" label="label-3" ref="pane-click">C</hl-tab-pane>
          <hl-tab-pane :name="3" label="label-4">D</hl-tab-pane>
        </hl-tabs>
      `,
    })

    const navWrapper = wrapper.findComponent(TabNav)
    await nextTick()

    const navItemsWrapper = navWrapper.findAll('.tabs-item')
    ;[1, 0, 2, 0, 3, 0, 1].forEach(val => {
      navItemsWrapper[val].trigger('click')
      expect(wrapper.vm.activeName).toEqual(val)
    })
  })

  test('tab-pane nested', async () => {
    const wrapper = mount(() => (
      <Tabs>
        <Comp />
      </Tabs>
    ))

    const panesWrapper = wrapper.findAllComponents(TabPane)
    await nextTick()

    expect(panesWrapper.length).toBe(1)
  })

})
