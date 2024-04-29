<template>
  <hl-dialog v-model="visible" body-class="p-xl" width="calc(var(--xxl) * 24)" @close="cancel">
    <template #header>
      <h4>主题市场</h4>
    </template>
    <hl-row layout="grid" count="lg:count-3" gap="var(--xl)" dir="vertical">
      <hl-col v-for="item in items" :key="item.title" span="col">
        <hl-panel
          class="page-theme-list cursor-pointer"
          padding="0"
          borderless
          style="--panel-radius: var(--radius-xxl); --panel-shadow: none"
        >
          <inline-svg src="/src/assets/public/images/thumb.svg" />
          <hl-group align="items-middle items-between" class="float-panel p-x-xl">
            <hb-avatar-list :data="item.userList" size="xxxs" indent="-12px" />
            <hl-group gap="var(--md)" class="static">
              <hl-button
                type="link"
                class="bg-element text-regular hover:text-primary"
                @click="$router.replace('?layout=' + item.themeName)"
              >
                应用主题
                <template #icon>
                  <hl-icon>
                    <fill-heart />
                  </hl-icon>
                </template>
              </hl-button>
            </hl-group>
          </hl-group>
          <template #footer>
            <hl-group dir="vertical" gap="var(--xs)" class="p-y-md" full>
              <hl-group align="items-middle items-between" gap="var(--xs)">
                <hl-icon size="xxxs" type="primary" class="static" fill round>
                  <fill-user />
                </hl-icon>
                <h6 class="w-100 ellipsis">{{ item.title }}</h6>
                <hl-group align="items-middle" gap="var(--md)" class="static">
                  <hl-group align="items-middle" gap="var(--xxs)">
                    <hl-icon size="xs" class="text-secondary">
                      <fill-heart />
                    </hl-icon>
                    <span>22</span>
                  </hl-group>
                  <hl-group align="items-middle" gap="var(--xxs)">
                    <hl-icon size="xs" class="text-secondary">
                      <fill-star />
                    </hl-icon>
                    <span>13</span>
                  </hl-group>
                </hl-group>
              </hl-group>
            </hl-group>
          </template>
        </hl-panel>
      </hl-col>
    </hl-row>
  </hl-dialog>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'ThemeShop',
  emits: ['cancel'],
  setup(_, { emit }) {
    const visible = ref(true)
    const openThemesShop = () => {
      window.open('http://localhost:4000/#themes', '_blank')
    }
    const cancel = () => {
      emit('cancel')
    }

    const items = ref([
      {
        logo: '宏博',
        title: 'UK3主题-亮色',
        thumb: '/src/assets/public/images/thumb1.png',
        themeName: 'default',
        userList: [
          {
            'title': '宏博',
            'url': 'https://png.pngtree.com/png-clipart/20190520/original/pngtree-vector-users-icon-png-image_4144740.jpg',
          },
          {
            'title': '李维',
            'url': 'https://png.pngtree.com/png-clipart/20190614/original/pngtree-female-avatar-vector-icon-png-image_3725439.jpg',
          },
        ],
      },
      {
        logo: '宏博',
        title: 'UK3主题-暗色',
        thumb: '/src/assets/public/images/thumb1.png',
        themeName: 'dark',
        userList: [
          {
            'title': '宏博',
            'url': 'https://png.pngtree.com/png-clipart/20190520/original/pngtree-vector-users-icon-png-image_4144740.jpg',
          },
          {
            'title': '李维',
            'url': 'https://png.pngtree.com/png-clipart/20190614/original/pngtree-female-avatar-vector-icon-png-image_3725439.jpg',
          },
        ],
      },
      {
        logo: '宏博',
        title: '安全应急MIS端主题',
        thumb: '/src/assets/public/images/thumb3.png',
        themeName: 'uk2',
        userList: [
          {
            'title': '宏博',
            'url': 'https://png.pngtree.com/png-clipart/20190520/original/pngtree-vector-users-icon-png-image_4144740.jpg',
          },
          {
            'title': '李维',
            'url': 'https://png.pngtree.com/png-clipart/20190614/original/pngtree-female-avatar-vector-icon-png-image_3725439.jpg',
          },
        ],
      },
      {
        logo: '宏博',
        title: '淮安客户定制主题',
        thumb: '/src/assets/public/images/thumb4.png',
        themeName: 'uk2a',
        userList: [
          {
            'title': '宏博',
            'url': 'https://png.pngtree.com/png-clipart/20190520/original/pngtree-vector-users-icon-png-image_4144740.jpg',
          },
          {
            'title': '李维',
            'url': 'https://png.pngtree.com/png-clipart/20190614/original/pngtree-female-avatar-vector-icon-png-image_3725439.jpg',
          },
        ],
      },
      {
        logo: '宏博',
        title: '繁星平台主题',
        thumb: '/src/assets/public/images/thumb.svg',
        themeName: 'fx',
        userList: [
          {
            'title': '宏博',
            'url': 'https://png.pngtree.com/png-clipart/20190520/original/pngtree-vector-users-icon-png-image_4144740.jpg',
          },
          {
            'title': '李维',
            'url': 'https://png.pngtree.com/png-clipart/20190614/original/pngtree-female-avatar-vector-icon-png-image_3725439.jpg',
          },
        ],
      },
      {
        logo: '宏博',
        title: '电子云管控台主题',
        thumb: '/src/assets/public/images/thumb2.png',
        themeName: 'cecloud',
        userList: [
          {
            'title': '宏博',
            'url': 'https://png.pngtree.com/png-clipart/20190520/original/pngtree-vector-users-icon-png-image_4144740.jpg',
          },
          {
            'title': '李维',
            'url': 'https://png.pngtree.com/png-clipart/20190614/original/pngtree-female-avatar-vector-icon-png-image_3725439.jpg',
          },
        ],
      },
    ])
    return {
      visible,
      openThemesShop,
      items,
      cancel,
    }
  },
})
</script>
