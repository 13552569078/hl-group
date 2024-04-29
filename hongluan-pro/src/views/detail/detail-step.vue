<template>
  <hl-row gap="var(--lg)">
    <hl-col span="col-24">
      <hl-panel padding="var(--xxl) calc(var(--xs) * 7)" class="texture-bg-circuit">
        <hl-steps :active="1" center>
          <hl-step>
            <template #icon>
              <hl-icon><two-pic /></hl-icon>
            </template>
            <template #title>
              <h5>历下区文旅局</h5>
            </template>
            <template #description>
              <hl-group class="m-t-md" align="items-middle" dir="vertical" gap="var(--sm)">
                <hl-tag type="primary" class="static">提交成功</hl-tag>
                <span>2020.11.25 23:26:08</span>
              </hl-group>
            </template>
          </hl-step>

          <hl-step>
            <template #icon>
              <hl-icon><two-pic /></hl-icon>
            </template>
            <template #title>
              <h5>历下区新城街道</h5>
            </template>
            <template #description>
              <hl-group class="m-t-md" align="items-middle" dir="vertical" gap="var(--sm)">
                <hl-tag>审核</hl-tag>
                <span>待处理</span>
              </hl-group>
            </template>
          </hl-step>

          <hl-step>
            <template #icon>
              <hl-icon><two-pic /></hl-icon>
            </template>
            <template #title>
              <h5>历下区应急管理局</h5>
            </template>
            <template #description>
              <hl-group class="m-t-md" align="items-middle" dir="vertical" gap="var(--sm)">
                <hl-tag>完结</hl-tag>
                <span>待处理</span>
              </hl-group>
            </template>
          </hl-step>
        </hl-steps>
      </hl-panel>
    </hl-col>
    <hl-col span="col-24">
      <hl-panel class="card-panel" body-padding="calc(var(--xxl) + var(--md))">
        <template #header>
          <div class="panel-header-left">
            <hl-icon><two-page /></hl-icon>
          </div>
          <h4 class="panel-title">基础信息</h4>
        </template>
        <hl-row layout="grid" count="xl:count-4" gap-x="var(--xxl)" gap-y="var(--lg)">
          <hl-col v-for="item in desData" :key="item.label" span="col">
            <hl-group dir="vertical" class="info-description auto-height">
              <span class="label">{{ item.label }}</span>
              <span class="content ellipsis">{{ item.value }}</span>
            </hl-group>
          </hl-col>
        </hl-row>
      </hl-panel>
    </hl-col>

    <hl-col span="col-24">
      <hl-panel class="card-panel" body-padding="calc(var(--xxl) + var(--md))">
        <template #header>
          <div class="panel-header-left">
            <hl-icon><two-examine /></hl-icon>
          </div>
          <div class="panel-title"><h4>审核记录</h4></div>
          <div class="panel-header-right"></div>
        </template>
        <hl-timeline class="m-t-lg">
          <hl-timeline-item v-for="n in 3" :hide-timestamp="true">
            <hl-group align="items-middle" class="m-b-sm" gap="var(--sm)" block>
              <h5>审核驳回</h5>
              <div class="text-secondary">2021-09-23 18:35:07</div>
            </hl-group>
            <hl-panel class="m-b-md" header-height="calc(var(--lg) * 2)">
              <hl-group gap="var(--xxl)" full="full-y">
                <hb-data-collect gap="var(--xs)" padding="0" class="w-md" full>
                  <hl-group dir="vertical" align="items-center" class="content">
                    <h6 class="title">王佳乐</h6>
                    <span class="sub-title font-sm">历下区文旅局</span>
                  </hl-group>
                </hb-data-collect>
                <hl-group align="items-middle" class="p-l-xxl border-left">
                  <span>驳回原因：</span>
                  <p>行政区划与所属单位实际行政区划不匹配</p>
                </hl-group>
              </hl-group>
            </hl-panel>
          </hl-timeline-item>
        </hl-timeline>
      </hl-panel>
    </hl-col>
  </hl-row>
</template>


<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    const desData = ref([
      { label: '所属单位', key: '1', value: '济南市历下区文旅局' },
      { label: '地址', key: '4', value: '山东省济南市历下区新城街道3-2号' },
      { label: '行政区划', key: '2', value: '山东省-济南市-历下区' },
      { label: '经纬度', key: '3', value: '79.3552, 38.4752' },
      { label: '负责人', key: '5', value: '王佳乐' },
      { label: '负责人联系电话', key: '6', value: '13266687022' },
    ])
    return {
      desData,
    }
  },
})
</script>

<style lang="scss">
</style>
