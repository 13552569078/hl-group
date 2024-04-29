<template>
  <hv-panel title="信息列表2">
    <template #action>
      <hl-group align="items-middle" gap="var(--md)" :class="['toggle-goback', !showCard ? 'show' : '']">
        <hl-button :class="['', !showCard ? 'show' : '']" @click="handleOpenBox">发送通知</hl-button>
        <span class="cursor-pointer" @click="toggleCard(true, 1)">返回</span>
      </hl-group>
    </template>
    <div class="toggle-panel m-t-md" style="height: calc(var(--xl) * 7)">
      <div :class="['card-1', showCard ? 'show' : '']">
        <hl-scrollbar style="height: calc(var(--xl) * 7)">
          <hl-group full="full-x" dir="vertical" gap="var(--xxs)">
            <hl-group v-for="(item, index) in data" :key="index" class="bg-light p-sm" align="items-middle items-between" gap="var(--md)">
              <hl-group dir="vertical" class="cursor-pointer" @click="toggleCard(false, item)">
                <span class="ellipsis font-md">{{ item.eventTitle }}</span>
                <div class="text-secondary font-sm">{{ item.eventTime }}</div>
              </hl-group>
              <hl-group class="static" align="items-right" gap="var(--xs)">
                <hl-button size="sm">辅助决策</hl-button>
              </hl-group>
            </hl-group>
          </hl-group>
        </hl-scrollbar>
      </div>
      <div :class="['card-2', !showCard ? 'show' : '']"></div>
    </div>
  </hv-panel>
</template>

<script lang="ts">
import { HlRow, HlCol, HlTag, HlPanel, HlIcon, HlButton, HlGroup, HlScrollbar, HlCheckbox, HlRadio, HlCheckboxGroup, HlDialog, HlTree } from 'hongluan-ui'
import { defineComponent, ref } from 'vue'
import { FillHazard, FillFirm, FillBox, FillShield } from '@hongluan-ui/icons'

export default defineComponent({
  components: {
    HlCol,
    HlRow,
    HlTag,
    HlPanel,
    HlIcon,
    HlButton,
    HlGroup,
    HlScrollbar,
    HlRadio,
    HlCheckbox,
    HlCheckboxGroup,
    HlDialog,
    FillHazard,
    FillFirm,
    FillBox,
    FillShield,
    HlTree,
  },

  setup() {
    const showCard = ref(true)
    const toggleCard = (type: boolean) => {
      showCard.value = type
    }

    const data = ref([
      {
        eventTitle: '迎泽区新建路二社区燃气泄漏',
        eventTime: '2021/9/15',
        id: 1,
      },
      {
        eventTitle: '解放路韶九巷燃气泄漏',
        eventTime: '2021/8/15',
        id: 2,
      },
      {
        eventTitle: '前所街住宅小区燃气泄漏',
        eventTime: '2021/7/3',
        id: 3,
      },
      {
        eventTitle: '崔家巷羊肉汤馆燃气泄漏',
        eventTime: '2021/5/23',
        id: 4,
      },
    ])

    return {
      data,
      showCard,
      toggleCard,
    }
  },
})
</script>
<style lang="scss" scoped></style>
