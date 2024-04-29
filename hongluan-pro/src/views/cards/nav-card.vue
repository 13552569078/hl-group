<template>
  <hl-row gap="var(--lg)">
    <hl-col span="md:col-24">
      <card-1 />
    </hl-col>
    <hl-col span="xxl:col-12">
      <card-2 />
    </hl-col>
    <hl-col span="xxl:col-12">
      <card-3 />
    </hl-col>
    <hl-col span="xxl:col-12">
      <card-4 />
    </hl-col>
  </hl-row>

  <hl-row class="m-t-lg" layout="flow" gap="var(--lg)" count="xxl:count-4 xl:count-3 lg:count-2">
    <hl-col span="col">
      <hl-panel class="main-panel">
        <hl-group class="m-t-md" full="full-x" align="items-middle" dir="vertical" gap="var(--lg)">
          <hl-thumb round type="primary" size="xxl">
            <span>朝阳</span>
            <hl-badge type="danger" position="rt" dot />
          </hl-thumb>
          <hl-group full="full-x" align="items-middle" dir="vertical" gap="var(--xxs)">
            <h4>User Name</h4>
            <p class="text-secondary">Art Director at Novica Co.1</p>
          </hl-group>
          <hl-group gap="var(--sm)">
            <hl-button type="primary" effect="light" equal round class="is-hover">
              <template #icon>
                <hl-icon><two-book /></hl-icon>
              </template>
            </hl-button>
            <hl-button type="primary" effect="light" equal round>
              <template #icon>
                <hl-icon><two-copy /></hl-icon>
              </template>
            </hl-button>
            <hl-button type="primary" effect="light" equal round>
              <template #icon>
                <hl-icon><two-good /></hl-icon>
              </template>
            </hl-button>
          </hl-group>
        </hl-group>
        <hl-list item-gap="var(--sm)" hover style="margin-top: calc(var(--xs) * 8)">
          <hl-list-item>
            <template #prefix>
              <hl-icon><fill-phone-book /></hl-icon>
            </template>
            个人中心
            <template #suffix><hl-tag type="danger" size="sm" effect="light">NEW</hl-tag></template>
          </hl-list-item>
          <hl-list-item>
            <template #prefix>
              <hl-icon>
                <fill-academic />
              </hl-icon>
            </template>
            个人资料
          </hl-list-item>
          <hl-list-item>
            <template #prefix>
              <hl-icon>
                <fill-archive />
              </hl-icon>
            </template>
            账户信息
            <template #suffix><hl-tag type="primary" size="sm" effect="light" class="price yuan">1234.56</hl-tag></template>
          </hl-list-item>
          <hl-list-item>
            <template #prefix>
              <hl-icon>
                <fill-chart-bar />
              </hl-icon>
            </template>
            电子邮箱设定
          </hl-list-item>
          <hl-list-item>
            <template #prefix>
              <hl-icon>
                <fill-database />
              </hl-icon>
            </template>
            邮寄地址
          </hl-list-item>
        </hl-list>
      </hl-panel>
    </hl-col>
    <hl-col span="col">
      <hl-panel class="main-panel">
        <hl-group dir="vertical" full="full-x" align="items-middle" class="m-t-md">
          <hl-thumb type="danger" round style="width: calc(var(--xxl) * 2 + var(--sm)); height: calc(var(--xxl) * 2 + var(--sm))" fit="cover" src="https://randomuser.me/api/portraits/women/17.jpg" />
          <hl-group dir="vertical" class="m-t-sm" align="items-middle">
            <h4>丽莎·斯特朗</h4>
            <p class="text-secondary font-bold">软件工程师</p>
          </hl-group>
          <hl-tag size="sm" type="warning" effect="light" style="margin-top: calc(var(--md) + var(--xxs))"> 在线 </hl-tag>
          <hl-group full="full-x" class="m-t-xl" align="items-between">
            <hb-data-collect align="items-center" gap="var(--md)" padding="0">
              <hl-group dir="vertical" align="items-middle">
                <h2 class="title">6900</h2>
                <span class="sub-title font-md" style="font-size: var(--pageFontSize-Md)">收益</span>
              </hl-group>
            </hb-data-collect>
            <hb-data-collect align="items-center" gap="var(--md)" padding="0">
              <hl-group dir="vertical" align="items-middle">
                <h2 class="title">130</h2>
                <span class="sub-title font-md" style="font-size: var(--pageFontSize-Md)">任务</span>
              </hl-group>
            </hb-data-collect>
            <hb-data-collect align="items-center" gap="var(--md)" padding="0">
              <hl-group dir="vertical" align="items-middle">
                <h2 class="title">500</h2>
                <span class="sub-title font-md" style="font-size: var(--pageFontSize-Md)">小时</span>
              </hl-group>
            </hb-data-collect>
          </hl-group>
          <hl-group class="m-t-lg border-bottom" full="full-x" style="height: calc(var(--xl) * 2 + var(--xs))" align="items-middle items-between">
            <h4>详情</h4>
            <hl-button class="static" type="primary" effect="light"> 编辑 </hl-button>
          </hl-group>
          <hl-group full="full-x" gap="var(--lg)" dir="vertical" class="m-t-xl">
            <hb-data-collect gap="var(--md)" padding="0">
              <hl-group dir="vertical">
                <h5 class="title">账户ID</h5>
                <span class="sub-title font-md" style="font-size: var(--pageFontSize-Md)">ID-45453423</span>
              </hl-group>
            </hb-data-collect>
            <hb-data-collect gap="var(--md)" padding="0">
              <hl-group dir="vertical">
                <h5 class="title">账单邮箱</h5>
                <span class="sub-title font-md" style="font-size: var(--pageFontSize-Md)">wangchaoyang@email.com</span>
              </hl-group>
            </hb-data-collect>
            <hb-data-collect gap="var(--md)" padding="0">
              <hl-group dir="vertical">
                <h5 class="title">帐单地址</h5>
                <span class="sub-title font-md" style="font-size: var(--pageFontSize-Md)">北京市海淀区万寿路华熙Live A座</span>
              </hl-group>
            </hb-data-collect>
            <hb-data-collect gap="var(--md)" padding="0">
              <hl-group dir="vertical">
                <h5 class="title">语言</h5>
                <span class="sub-title font-md" style="font-size: var(--pageFontSize-Md)">中文</span>
              </hl-group>
            </hb-data-collect>
            <hb-data-collect gap="var(--md)" padding="0">
              <hl-group dir="vertical">
                <h5 class="title">即将开具的发票</h5>
                <span class="sub-title font-md" style="font-size: var(--pageFontSize-Md)">54238-8693</span>
              </hl-group>
            </hb-data-collect>
            <hb-data-collect gap="var(--md)" padding="0">
              <hl-group dir="vertical">
                <h5 class="title">税号</h5>
                <span class="sub-title font-md" style="font-size: var(--pageFontSize-Md)">TX-8674</span>
              </hl-group>
            </hb-data-collect>
          </hl-group>
        </hl-group>
      </hl-panel>
    </hl-col>
    <hl-col span="col">
      <hl-panel class="card-panel" body-padding="var(--xl)">
        <template #header>
          <div class="panel-title"><h4>卡片标题</h4></div>
          <div class="panel-header-right">
            <hl-button icon="more" no-fill equal />
          </div>
        </template>
        <hl-group dir="vertical" full="full-x">
          <hb-data-collect gap="var(--sm)" class="border-bottom" padding-x="0" padding-y="var(--md)">
            <hl-icon type="primary" effect="light" size="lg" fill radius class="static">
              <fill-airplay />
            </hl-icon>
            <hl-group dir="vertical" full="full-x">
              <h6 class="title">马振皎</h6>
              <span class="sub-title">UED高级UI射击师</span>
            </hl-group>
            <hl-switch v-model="value" type="primary" />
          </hb-data-collect>
          <hb-data-collect gap="var(--sm)" class="border-bottom" padding-x="0" padding-y="var(--md)">
            <hl-icon type="danger" effect="light" size="lg" fill radius class="static">
              <fill-folder-add />
            </hl-icon>
            <hl-group dir="vertical" full="full-x">
              <h6 class="title">范白露</h6>
              <span class="sub-title">UED高级UI射击师</span>
            </hl-group>
            <hl-switch v-model="value" type="primary" />
          </hb-data-collect>
          <hb-data-collect gap="var(--sm)" padding-x="0" padding-y="var(--md)">
            <hl-icon type="warning" effect="light" size="lg" fill radius class="static">
              <fill-friday />
            </hl-icon>
            <hl-group dir="vertical" full="full-x">
              <h6 class="title">王朝阳</h6>
              <span class="sub-title">UED高级UI射击师</span>
            </hl-group>
            <hl-switch v-model="value" type="primary" />
          </hb-data-collect>
        </hl-group>
      </hl-panel>
    </hl-col>
  </hl-row>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import Card1 from './nav-card/card1.vue'
import Card2 from './nav-card/card2.vue'
import Card3 from './nav-card/card3.vue'
import Card4 from './nav-card/card4.vue'

export default defineComponent({
  components: {
    Card1,
    Card2,
    Card3,
    Card4,
  },
  setup() {
    const value = ref(false)
    return {
      value,
    }
  },
})
</script>
