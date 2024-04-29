import { mount } from '@vue/test-utils'
import { nextTick } from 'vue'
import { usePrefix } from '@hongluan-ui/test-utils/utils'
import { describe, expect, test, vi } from 'vitest'
import Menu from '../src/menu'
import MenuGroup from '../src/menu-item-group.vue'
import MenuItem from '../src/menu-item.vue'
import SubMenu from '../src/sub-menu'

const { prefix } = usePrefix()
const _mount = (template: string, options = {}) =>
  mount({
    components: {
      'hl-menu': Menu,
      'hl-menu-item-group': MenuGroup,
      'hl-menu-item': MenuItem,
      'hl-sub-menu': SubMenu,
    },
    template,
    ...options,
  })

describe('menu', () => {
  test('create', async () => {
    const wrapper = _mount(
      `<hl-menu>
        <hl-menu-item index="1" ref="item1">处理中心</hl-menu-item>
        <hl-menu-item index="2" ref="item2">订单管理</hl-menu-item>
      </hl-menu>`,
    )
    const item1 = await wrapper.findComponent({ ref: 'item1' })
    const item2 = await wrapper.findComponent({ ref: 'item2' })
    await item1.trigger('click')
    await nextTick()
    expect(item1.classes()).toContain('is-active')
    await item2.trigger('click')
    await nextTick()
    expect(item2.classes()).toContain('is-active')
  })
  test('background-color', async () => {
    const wrapper = _mount(
      `<hl-menu default-active="2"
        background-color="#f00"
        text-color="#000"
        active-text-color="#0f0">
        <hl-menu-item index="1" ref="item1">处理中心</hl-menu-item>
        <hl-menu-item index="2" ref="item2">订单管理</hl-menu-item>
      </hl-menu>`,
    )
    const instance = wrapper.vm.$el
    const item1 = await wrapper.findComponent({ ref: 'item1' })
    const item2 = await wrapper.findComponent({ ref: 'item2' })
    expect(instance.style.backgroundColor).toEqual('rgb(255, 0, 0)')
    expect(item1.vm.$el.style.color).toEqual('rgb(0, 0, 0)')
    expect(item2.vm.$el.style.color).toEqual('rgb(0, 255, 0)')
  })
  test('menu-item click', async () => {
    const wrapper = _mount(
      `<hl-menu>
        <hl-menu-item @click="onMenuItemClick" index="1" ref="item1">处理中心</hl-menu-item>
        <hl-menu-item index="2" ref="item2">订单管理</hl-menu-item>
      </hl-menu>`,
      {
        data() {
          return {
            clicksCount: 0,
          }
        },
        methods: {
          onMenuItemClick(item: any) {
            expect(item).toMatchObject({
              index: '1',
              indexPath: ['1'],
            })
            this.clicksCount = this.clicksCount + 1
          },
        },
      },
    )
    const item1 = await wrapper.findComponent({ ref: 'item1' })
    await item1.trigger('click')
    await nextTick()
    expect((wrapper.vm as any).clicksCount).toEqual(1)
  })
  test('menu-item disabled', async () => {
    const wrapper = _mount(
      `<hl-menu default-active="2">
        <hl-menu-item index="1" ref="item1" disabled>处理中心</hl-menu-item>
        <hl-menu-item index="2" ref="item2">订单管理</hl-menu-item>
      </hl-menu>`,
    )
    const item1 = await wrapper.findComponent({ ref: 'item1' })
    const item2 = await wrapper.findComponent({ ref: 'item2' })
    expect(item2.classes()).toContain('is-active')
    await item1.trigger('click')
    await nextTick()
    expect(item1.classes().includes('is-active')).toBeFalsy()
  })
  test('open method', async () => {
    const wrapper = _mount(
      `<div>
          <hl-menu
            ref="menu"
            default-active="2"
            class="hl-menu-vertical-demo"
          >
            <hl-sub-menu index="1">
              <template #title>
                <i class="hl-icon-location"></i>
                <span>导航一</span>
              </template>
              <hl-menu-item-group>
                <template #title>分组一</template>
                <hl-menu-item index="1-1">选项1</hl-menu-item>
                <hl-menu-item index="1-2">选项2</hl-menu-item>
              </hl-menu-item-group>
              <hl-menu-item-group title="分组2">
                <hl-menu-item index="1-3">选项3</hl-menu-item>
              </hl-menu-item-group>
              <hl-sub-menu index="1-4">
                <template #title>选项4</template>
                <hl-menu-item index="1-4-1">选项1</hl-menu-item>
              </hl-sub-menu>
            </hl-sub-menu>
            <hl-menu-item index="2">
              <i class="hl-icon-menu"></i>
              <template #title>导航二</template>
            </hl-menu-item>
          </hl-menu>
          <button @click="open"></button>
        </div>
      `,
      {
        methods: {
          open() {
            this.$refs.menu.open('1')
          },
        },
      },
    )
    const elSubMenu = wrapper.findComponent({ name: 'SubMenu' })
    const button = wrapper.find('button')
    button.trigger('click')
    await nextTick()
    const instance = elSubMenu.vm as any
    expect(instance.$.exposed.opened).toBeTruthy()
  })
  test('hover-background-color', async () => {
    const wrapper = _mount(
      `<hl-menu ref="menu" default-active="2"
        :background-color="background"
        text-color="#000"
        active-text-color="#0f0">
        <hl-menu-item index="1" ref="item1">处理中心</hl-menu-item>
        <hl-menu-item index="2" ref="item2">订单管理</hl-menu-item>
      </hl-menu>`,
      {
        data() {
          return {
            background: '#008C74',
          }
        },
      },
    )
    // await nextTick()
    // const vm = (wrapper.vm as any)
    // expect(vm.$refs.menu.hoverBackground).toEqual('rgb(0, 112, 93)')
    // vm.background = '#F00'
    // await nextTick()
    // expect(vm.$refs.menu.hoverBackground).toEqual('rgb(204, 0, 0)')
  })


  test('menu-overflow', async () => {
    // TODO: jsdom not support `offsetWidth`.
  })
})

describe('default active', () => {
  test('normal active', async () => {
    const wrapper = _mount(
      `<hl-menu default-active="2">
        <hl-menu-item index="1" ref="item1">处理中心</hl-menu-item>
        <hl-menu-item index="2" ref="item2">订单管理</hl-menu-item>
      </hl-menu>`,
    )
    const item1 = await wrapper.findComponent({ ref: 'item1' })
    const item2 = await wrapper.findComponent({ ref: 'item2' })

    expect(item2.classes()).toContain('is-active')
    await item1.trigger('click')
    await nextTick()
    expect(item1.classes()).toContain('is-active')
  })
  test('dynamic active', async () => {
    const wrapper = _mount(
      `<hl-menu :default-active="active">
        <hl-menu-item index="1" ref="item1">active watch处理中心</hl-menu-item>
        <hl-menu-item index="2" ref="item2">active watch订单管理</hl-menu-item>
      </hl-menu>`,
      {
        data() {
          return {
            active: '2',
          }
        },
      },
    )
    const instance = wrapper.vm as any
    instance.active = '1'
    await nextTick()
    const item1 = await wrapper.findComponent({ ref: 'item1' })
    expect(item1.classes()).toContain('is-active')
  })
  test('vertical submenu item active', async () => {
    const wrapper = _mount(
      `<div>
        <hl-menu default-active="2-2" mode="vertical">
          <hl-menu-item index="1" ref="item1">处理中心</hl-menu-item>
          <hl-sub-menu index="2" ref="submenu">
            <template slot="title">我的工作台</template>
            <hl-menu-item index="2-1">选项1</hl-menu-item>
            <hl-menu-item index="2-2" ref="submenuItem2">选项2</hl-menu-item>
            <hl-menu-item index="2-3">选项3</hl-menu-item>
          </hl-sub-menu>
          <hl-menu-item index="3">订单管理</hl-menu-item>
        </hl-menu>
      </div>`,
    )
    const submenu = await wrapper.findComponent({ ref: 'submenu' })
    const submenuItem2 = await wrapper.findComponent({ ref: 'submenuItem2' })
    expect(submenuItem2.classes()).toContain('is-active')
    await nextTick()
    expect(submenu.classes()).toContain('is-opened')
    expect(submenu.classes()).toContain('is-active')
  })
  test('horizontal submenu item active', async () => {
    const wrapper = _mount(
      `<div>
        <hl-menu default-active="2-2">
          <hl-menu-item index="1" ref="item1">处理中心</hl-menu-item>
          <hl-sub-menu index="2" ref="submenu">
            <template slot="title">我的工作台</template>
            <hl-menu-item index="2-1">选项1</hl-menu-item>
            <hl-menu-item index="2-2" ref="submenuItem2">选项2</hl-menu-item>
            <hl-menu-item index="2-3">选项3</hl-menu-item>
          </hl-sub-menu>
          <hl-menu-item index="3">订单管理</hl-menu-item>
        </hl-menu>
      </div>`,
    )
    const submenu = await wrapper.findComponent({ ref: 'submenu' })
    const submenuItem2 = await wrapper.findComponent({ ref: 'submenuItem2' })
    expect(submenuItem2.classes()).toContain('is-active')
    await nextTick()
    expect(submenu.classes()).toContain('is-opened')
    expect(submenu.classes()).toContain('is-active')
  })
})

describe('submenu', () => {
  test('toggle', async () => {
    const wrapper = _mount(
      `<hl-menu>
        <hl-menu-item index="1" ref="item1">处理中心</hl-menu-item>
        <hl-sub-menu index="2" ref="submenu">
          <template slot="title">我的工作台</template>
          <hl-menu-item index="2-1">选项1</hl-menu-item>
          <hl-menu-item index="2-2" ref="submenuItem2">选项2</hl-menu-item>
          <hl-menu-item index="2-3">选项3</hl-menu-item>
        </hl-sub-menu>
        <hl-menu-item index="3">订单管理</hl-menu-item>
      </hl-menu>`,
    )
    const submenu = await wrapper.findComponent({ ref: 'submenu' })
    const submenuItem2 = await wrapper.findComponent({ ref: 'submenuItem2' })
    submenu.vm.$el.querySelector('.item-content').click()
    await nextTick()
    expect(submenu.classes()).toContain('is-opened')
    submenuItem2.trigger('click')
    await nextTick()
    expect(submenuItem2.classes()).toContain('is-active')
    submenu.trigger('click')
    await nextTick()
    expect(submenu.classes()).toContain('is-opened')
  })
  test('default opened', async () => {
    const wrapper = _mount(
      `<hl-menu :default-openeds="defaultOpeneds">
        <hl-menu-item index="1">default opened处理中心</hl-menu-item>
        <hl-sub-menu index="2" ref="submenu1">
          <template slot="title">default opened我的工作台</template>
          <hl-menu-item index="2-1">选项1</hl-menu-item>
          <hl-menu-item index="2-2" ref="submenu1Item2">选项2</hl-menu-item>
          <hl-menu-item index="2-3">选项3</hl-menu-item>
        </hl-sub-menu>
        <hl-sub-menu index="3" ref="submenu2">
          <template slot="title">default opened订单管理</template>
          <hl-menu-item index="3-1">选项1</hl-menu-item>
          <hl-menu-item index="3-2" ref="submenu2Item2">选项2</hl-menu-item>
          <hl-menu-item index="3-3">选项3</hl-menu-item>
        </hl-sub-menu>
      </hl-menu>`,
      {
        data() {
          return {
            defaultOpeneds: ['2', '3'],
          }
        },
      },
    )
    const submenu1 = await wrapper.findComponent({ ref: 'submenu1' })
    const submenu2 = await wrapper.findComponent({ ref: 'submenu2' })
    await nextTick()
    expect(submenu1.classes()).toContain('is-opened')
    expect(submenu2.classes()).toContain('is-opened')
    const instance = wrapper.vm as any
    instance.defaultOpeneds = ['2']
    await nextTick()
    expect(submenu1.classes()).toContain('is-opened')
    expect(submenu2.classes()).toContain('is-opened')
  })
  test('disabled', async () => {
    const wrapper = _mount(
      `<hl-menu>
        <hl-menu-item index="1" ref="item1">处理中心</hl-menu-item>
        <hl-sub-menu index="2" ref="submenu" disabled>
          <template slot="title">我的工作台</template>
          <hl-menu-item index="2-1">选项1</hl-menu-item>
          <hl-menu-item index="2-2" ref="submenuItem2">选项2</hl-menu-item>
          <hl-menu-item index="2-3">选项3</hl-menu-item>
        </hl-sub-menu>
        <hl-menu-item index="3">订单管理</hl-menu-item>
      </hl-menu>`,
      {
        data() {
          return {
            defaultOpeneds: ['2', '3'],
          }
        },
      },
    )
    const submenu = await wrapper.findComponent({ ref: 'submenu' })
    await submenu.trigger('click')
    await nextTick()
    expect(submenu.classes().includes('is-opened')).toBeFalsy()
  })
})

describe('other', () => {
  test('disabled', async () => {
    const wrapper = _mount(
      `<hl-menu unique-opened default-active="2-2">
        <hl-menu-item index="1">处理中心</hl-menu-item>
        <hl-sub-menu index="2" ref="submenu1">
          <template slot="title">我的工作台</template>
          <hl-menu-item index="2-1">选项1</hl-menu-item>
          <hl-menu-item index="2-2" ref="submenu1Item2">选项2</hl-menu-item>
          <hl-menu-item index="2-3">选项3</hl-menu-item>
        </hl-sub-menu>
        <hl-sub-menu index="3" ref="submenu2">
          <template slot="title">订单管理</template>
          <hl-menu-item index="3-1">选项1</hl-menu-item>
          <hl-menu-item index="3-2" ref="submenu2Item2">选项2</hl-menu-item>
          <hl-menu-item index="3-3">选项3</hl-menu-item>
        </hl-sub-menu>
      </hl-menu>`,
    )
    const submenu2 = await wrapper.findComponent({ ref: 'submenu2' })
    submenu2.vm.$el.querySelector('.item-content').click()
    await nextTick()
    const submenu1 = await wrapper.findComponent({ ref: 'submenu1' })
    expect(submenu1.classes().includes('is-opened')).toBeFalsy()
  })
  test('horizontal mode', async () => {
    const onOpen = vi.fn()
    const wrapper = _mount(
      `<hl-menu mode="horizontal" @open="onOpen">
        <hl-menu-item index="1">处理中心</hl-menu-item>
        <hl-sub-menu index="2" ref="submenu">
          <template slot="title">我的工作台</template>
          <hl-menu-item index="2-1">选项1</hl-menu-item>
          <hl-menu-item index="2-2" ref="submenuItem2">选项2</hl-menu-item>
          <hl-menu-item index="2-3">选项3</hl-menu-item>
        </hl-sub-menu>
        <hl-menu-item index="3">订单管理</hl-menu-item>
      </hl-menu>`,
      {
        methods: {
          onOpen,
        },
      },
    )
    expect(wrapper.classes()).toContain('horizontal')
    const submenu = await wrapper.findComponent({ ref: 'submenu' })

    vi.useFakeTimers()
    submenu.trigger('mouseenter')

    vi.runAllTimers()
    vi.useRealTimers()
    expect(onOpen).toHaveBeenCalled()
  })
  test('menu group', async () => {
    const wrapper = _mount(
      `<hl-menu mode="vertical" default-active="1">
        <hl-menu-item-group title="分组一" ref="group1">
          <hl-menu-item index="1"><i class="hl-icon-message"></i>导航一</hl-menu-item>
          <hl-menu-item index="2"><i class="hl-icon-message"></i>导航二</hl-menu-item>
        </hl-menu-item-group>
        <hl-sub-menu index="5">
          <template slot="title">导航五</template>
          <hl-menu-item-group title="分组二">
            <hl-menu-item index="5-1">选项1</hl-menu-item>
            <hl-menu-item index="5-2">选项2</hl-menu-item>
          </hl-menu-item-group>
        </hl-sub-menu>
      </hl-menu>`,
    )
    const group1 = await wrapper.findComponent({ ref: 'group1' })
    expect(
      group1.vm.$el.querySelector('.group-title').innerHTML,
    ).toEqual('分组一')
  })
  test('dynamic menus, issue 9092', async () => {
    const wrapper = _mount(
      `<hl-menu :default-active="active">
        <hl-menu-item
          v-for="menu in menus"
          :index="menu.name"
          :key="menu.name">
          {{menu.description}}
        </hl-menu-item>
      </hl-menu>`,
      {
        data() {
          return {
            active: '',
            menus: [],
          }
        },
      },
    )

    const instance = wrapper.vm as any
    instance.menus = [
      { name: '1', description: 'happy' },
      { name: '2', description: 'new' },
      { name: '3', description: 'year' },
    ]
    await nextTick()
    instance.active = '2'

    await nextTick()
    expect(
      instance.$el.querySelector(`.${prefix}-menu-item.is-active`).textContent,
    ).toEqual('new')
  })
})
