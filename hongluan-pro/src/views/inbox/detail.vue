<template>
  <hl-panel padding="var(--xl)" class="main-panel w-full" body-padding="calc(var(--xxl) + var(--lg))" body-class="p-t-xl">
    <template #header>
      <div class="panel-header-left" style="margin-left: calc(var(--sm) * -1.5)">
        <hl-button equal no-fill @click="$router.go(-1)">
          <template #icon>
            <hl-icon>
              <two-chevron-left />
            </hl-icon>
          </template>
        </hl-button>
      </div>
      <div class="panel-title"><h4>山东省招远市金矿爆炸事件简报</h4></div>
      <hl-group class="panel-header-right" gap="var(--md)">
        <hl-button type="primary">
          再次编辑
          <template #icon>
            <hl-icon>
              <two-edit />
            </hl-icon>
          </template>
        </hl-button>
        <hl-group merge indent>
          <hl-button equal>
            <template #icon>
              <hl-icon>
                <two-arrow-left />
              </hl-icon>
            </template>
          </hl-button>
          <hl-button equal>
            <template #icon>
              <hl-icon>
                <two-arrow-right />
              </hl-icon>
            </template>
          </hl-button>
        </hl-group>
      </hl-group>
    </template>

    <hl-form :width="['calc(var(--xxl) * 3)', 'col-15']" :label-position="['left', 'middle']" gap="0" item-gap="var(--md)">
      <hl-form-item label="接收人："> 和光明 15100247621、15910620762 </hl-form-item>
      <hl-form-item label="发送时间：">
        <span>2020年12月26日下午4:08（星期六）</span>
      </hl-form-item>
      <hl-form-item label="发送方式：">
        <span>系统通知</span>
      </hl-form-item>
      <hl-form-item label="附件：">
        <hl-group align="items-middle" gap="var(--xxs)">
          <span>3个</span>
          <hl-button type="link">
            查看附件
            <template #icon>
              <hl-icon>
                <two-link />
              </hl-icon>
            </template>
          </hl-button>
        </hl-group>
      </hl-form-item>
    </hl-form>
    <div class="bg-light p-md radius-xs m-t-md">
      <hl-group full>
        <hl-group align="items-middle" full gap="var(--lg)">
          <hl-group align="items-middle" gap="var(--xs)" class="static">
            <hl-icon type="primary" size="md" class="static">
              <two-circle-check />
            </hl-icon>
            <span>发送成功: 120</span>
          </hl-group>

          <hl-group align="items-middle" gap="var(--xs)" class="static">
            <hl-icon type="danger" size="md" class="static">
              <two-circle-error />
            </hl-icon>
            <span>发送失败: 38</span>
          </hl-group>
        </hl-group>
        <a href="#" class="static">查看详情</a>
      </hl-group>
    </div>
    <div class="content m-t-xl" style="line-height: 2">
      <p>新华社北京9月16日电 国家主席习近平16日致电墨西哥总统洛佩斯，祝贺墨西哥独立战争胜利200周年。</p>
      <p>
        习近平在贺电中指出，墨西哥是具有悠久历史和灿烂文明的拉美重要国家。在发展进程中，墨西哥人民在探索符合自身国情的发展道路上取得举世瞩目的成就，为人类文明进步作出不可磨灭的贡献。当前，总统先生正推进新的发展变革，中方衷心祝愿贵国在国家建设事业中不断取得新的更大成就。
      </p>
      <p>
        习近平强调，中墨都是发展中国家，拥有广泛共同利益。面对百年变局和世纪疫情，中墨同舟共济、守望相助，两国友谊得到升华。我高度重视中墨关系发展，愿同你一道努力，深化政治互信，促进互利合作，推动中墨关系不断迈上新台阶，造福两国和两国人民。
      </p>
    </div>
    <hr class="m-t-xl m-b-xl dotted">
    <hl-row gap="var(--md)">
      <hl-col>
        <hl-button type="link">
          批量下载附件 (6)
          <template #icon>
            <hl-icon>
              <two-download />
            </hl-icon>
          </template>
        </hl-button>
      </hl-col>
      <hl-col v-for="item in items" :key="item.title" span="xl:col-4 lg:col-6 md:col-8">
        <hl-panel padding="var(--xl) " body-class="display-flex flex-col items-middle" borderless>
          <hl-icon width="calc(var(--xl) * 2)" height="calc(var(--xl) * 2)">
            <component :is="'file' + item.type" />
          </hl-icon>
          <div class="text-center m-t-md">
            <h6>{{ item.title }}</h6>
            <div class="text-secondary">{{ item.size }}</div>
          </div>
        </hl-panel>
      </hl-col>
    </hl-row>
  </hl-panel>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
export default defineComponent({
  setup() {
    const items = ref([
      { title: '省防汛通知', size: '325KB', type: 'Pdf' },
      { title: '天气异常警告', size: '212KB', type: 'Doc' },
      { title: '冰冻天气异常', size: '488.35KB', type: 'Jpg' },
      { title: '市级抗旱通知', size: '14KB', type: 'Ppt' },
      { title: '放假通知', size: '98KB', type: 'Sql' },
      { title: '接种疫苗通知', size: '22KB', type: 'Xml' },
    ])
    return {
      items,
    }
  },
})
</script>
