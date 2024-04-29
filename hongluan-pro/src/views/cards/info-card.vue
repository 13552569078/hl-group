<template>
  <hl-row layout="flow" count="xxl:count-4 xl:count-3 lg:count-2" gap="var(--lg)">
    <hl-col span="col">
      <hl-panel class="card-panel">
        <template #header>
          <div class="panel-title"><h4>卡片标题</h4></div>
          <div class="panel-header-right">
            <hl-button no-fill equal>
              <hl-icon><two-more /></hl-icon>
            </hl-button>
          </div>
        </template>
        <hl-group dir="vertical" gap="var(--md)" full="full-x">
          <hb-data-collect v-for="item in items" :key="item.title" gap="var(--sm)" :class="`bg-${item.type}-light-5`">
            <hl-icon :type="item.type" size="lg" fill radius class="static">
              <component :is="'Fill' + item.icon" />
            </hl-icon>
            <hl-group dir="vertical" full="full-x">
              <h6 class="title">{{ item.title }}</h6>
              <span class="sub-title">{{ item.sub_title }}</span>
            </hl-group>
          </hb-data-collect>
        </hl-group>
      </hl-panel>
    </hl-col>

    <hl-col span="col">
      <hl-panel class="card-panel">
        <template #header>
          <div class="panel-title"><h4>卡片标题2</h4></div>
          <div class="panel-header-right">
            <hl-button icon="more" no-fill equal />
          </div>
        </template>
        <hl-group dir="vertical" full="full-x">
          <hb-data-collect v-for="item in items" :key="item.title" gap="var(--sm)" :class="`hover:bg-${item.type}-light-5`">
            <hl-icon :type="item.type" size="lg" fill round class="static">
              <component :is="'Fill' + item.icon" />
            </hl-icon>
            <hl-group dir="vertical" full="full-x">
              <h6 class="title">{{ item.title }}</h6>
              <span class="sub-title">{{ item.sub_title }}</span>
            </hl-group>
          </hb-data-collect>
        </hl-group>
      </hl-panel>
    </hl-col>

    <hl-col span="col">
      <hl-panel class="card-panel">
        <template #header>
          <div class="panel-title"><h4>卡片标题3</h4></div>
          <div class="panel-header-right">
            <hl-button icon="more" no-fill equal />
          </div>
        </template>
        <hl-group dir="vertical" full="full-x">
          <hb-data-collect v-for="item in items" :key="item.title" gap="var(--sm)" padding="var(--sm) 0">
            <hl-icon :type="item.type" effect="light" size="lg" fill radius class="static">
              <component :is="'Fill' + item.icon" />
            </hl-icon>
            <hl-group dir="vertical" full="full-x">
              <h6 class="title">{{ item.title }}</h6>
              <span class="sub-title">{{ item.sub_title }}</span>
            </hl-group>
          </hb-data-collect>
        </hl-group>
      </hl-panel>
    </hl-col>

    <hl-col span="col">
      <hl-panel class="card-panel">
        <template #header>
          <div class="panel-title"><h4>卡片标题4</h4></div>
          <div class="panel-header-right">
            <hl-button icon="more" no-fill equal />
          </div>
        </template>
        <hb-data-collect v-for="item in items" :key="item.title" full="full-x" gap="var(--sm)" padding="var(--sm) 0">
          <hl-icon :type="item.type" effect="light" size="xl" fill radius class="static">
            <component :is="'Fill' + item.icon" />
          </hl-icon>
          <hl-group dir="vertical">
            <h4 class="title">13,647</h4>
            <span class="sub-title">报警次数统计</span>
          </hl-group>

          <hl-progress
            show-as="circle"
            :type="item.type"
            :stroke-width="6"
            :percentage="Math.floor(Math.random() * (1 - 100) + 100)"
            class="static"
            style="width: calc(var(--xs) * 7); height: calc(var(--xs) * 7)"
          >
            <template #default="{ percentage }">
              <div class="progress-content">{{ percentage }}%</div>
            </template>
          </hl-progress>
        </hb-data-collect>
      </hl-panel>
    </hl-col>

    <hl-col span="col">
      <hl-panel class="card-panel">
        <template #header>
          <div class="panel-title"><h4>卡片标题5</h4></div>
          <div class="panel-header-right">
            <hl-button icon="more" no-fill equal />
          </div>
        </template>
        <hl-group dir="vertical" gap="var(--md)" full="full-x">
          <hb-data-collect v-for="item in items" :key="item.title" full="full-x" gap="var(--sm)" :class="`bg-light`">
            <hl-icon :type="item.type" effect="light" size="lg" fill radius class="static">
              <component :is="'Fill' + item.icon" />
            </hl-icon>
            <hl-group dir="vertical" full="full-x">
              <h6 class="title">{{ item.title }}</h6>
              <span class="sub-title">{{ item.sub_title }}</span>
            </hl-group>
          </hb-data-collect>
        </hl-group>
      </hl-panel>
    </hl-col>

    <hl-col span="col">
      <hl-panel class="card-panel">
        <template #header>
          <div class="panel-title"><h4>卡片标题6</h4></div>
          <div class="panel-header-right">
            <hl-button no-fill equal>
              <hl-icon><two-more /></hl-icon>
            </hl-button>
          </div>
        </template>
        <hl-group dir="vertical" gap="var(--md)" full="full-x">
          <hb-data-collect v-for="item in items" :key="item.title" full="full-x" gap="var(--sm)" :class="`bg-${item.type}-hover text-inverse-hover`">
            <hl-icon size="lg" fill round class="static" :class="`bg-${item.type} dark-2 text-inverse`">
              <component :is="'Fill' + item.icon" />
            </hl-icon>
            <hl-group dir="vertical" full="full-x">
              <h6 class="title text-inherit">{{ item.title }}</h6>
              <span class="sub-title text-inherit">{{ item.sub_title }}</span>
            </hl-group>
          </hb-data-collect>
        </hl-group>
      </hl-panel>
    </hl-col>

    <hl-col span="col">
      <hl-panel class="card-panel">
        <template #header>
          <div class="panel-title"><h4>卡片标题</h4></div>
          <div class="panel-header-right">
            <hl-button no-fill equal>
              <hl-icon><two-more /></hl-icon>
            </hl-button>
          </div>
        </template>
        <hl-timeline>
          <hl-timeline-item v-for="(activity, index) in activities" :key="index" :timestamp="activity.timestamp">
            {{ activity.content }}
          </hl-timeline-item>
        </hl-timeline>
      </hl-panel>
    </hl-col>

    <hl-col span="col">
      <hl-panel class="card-panel">
        <template #header>
          <div class="panel-title"><h4>卡片标题</h4></div>
          <div class="panel-header-right">
            <hl-button no-fill equal>
              <hl-icon><two-more /></hl-icon>
            </hl-button>
          </div>
        </template>
        <hl-timeline center alternate>
          <hl-timeline-item v-for="(activity, index) in activities" :key="index" :timestamp="activity.timestamp">
            {{ activity.content }}
          </hl-timeline-item>
        </hl-timeline>
      </hl-panel>
    </hl-col>

    <hl-col span="col">
      <hl-panel class="card-panel">
        <template #header>
          <div class="panel-title"><h4>卡片标题</h4></div>
          <div class="panel-header-right">
            <hl-button no-fill equal>
              <hl-icon><two-more /></hl-icon>
            </hl-button>
          </div>
        </template>

        <hl-timeline>
          <hl-timeline-item :hide-timestamp="true" timestamp="2021/7/12">
            <template #label> 2021/7/12 </template>
            <hl-panel padding="var(--md)">
              <h6>更新 Github 模板</h6>
            </hl-panel>
          </hl-timeline-item>
          <hl-timeline-item :hide-timestamp="true" dir="left" timestamp="2021/7/3">
            <template #label> 2021/7/12 </template>
            <hl-panel padding="var(--md)">
              <h6>更新 Timeline样式</h6>
            </hl-panel>
          </hl-timeline-item>
          <hl-timeline-item :hide-timestamp="true" timestamp="2021/7/2">
            <template #label> 2021/7/12 </template>
            <template #dot>
              <hl-thumb round type="primary" size="md" class="static">
                <span>段</span>
              </hl-thumb>
            </template>
            <hl-group align="items-top" full="full-x" gap="var(--xs)">
              <hl-group dir="vertical" full="full-x" gap="var(--md)">
                <div>
                  <hl-tag type="success" effect="light" size="sm">机组AOC</hl-tag>
                  <span style="color: #bfc3cb; display: inline-block">反馈时间：10:01:00</span>
                </div>
                <div class="p-sm p-l-lg p-r-lg" style="background-color: #f4f5f6; border-radius: var(--radius-md)"><span class="text-primary">@导调组</span> 收到，全体已就位。</div>
              </hl-group>
            </hl-group>
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
    const items = ref([
      { icon: 'Calendar', title: '布拉德·西蒙斯', sub_title: 'HTML, JS, ReactJS', type: 'primary' },
      { icon: 'Briefcase', title: '杰西克拉克森', sub_title: 'ASP.NET', type: 'danger' },
      { icon: 'Inbox', title: '勒布朗·韦德', sub_title: 'PHP、Laravel、VueJS', type: 'warning' },
      { icon: 'Application', title: '娜塔莉·特朗普', sub_title: 'Python、ReactJS', type: 'success' },
      { icon: 'Print', title: '丹·威灵顿', sub_title: 'PHP, SQLite, Artisan CLI', type: 'danger' },
    ])
    const activities = ref([
      {
        content: '活动按期开始',
        timestamp: '2018-04-15',
        icon: {
          name: 'TwoTag',
          type: 'primary',
        },
      },
      {
        content: '通过审核',
        timestamp: '2018-04-13',
        icon: {
          name: 'TwoServer',
          type: 'danger',
        },
      },
      {
        content: '创建成功',
        timestamp: '2018-04-11',
        icon: {
          name: 'TwoBook',
          type: 'warning',
        },
      },
      {
        content: '创建成功',
        timestamp: '2018-04-11',
        icon: {
          name: 'TwoCircleCheck',
          type: 'success',
        },
      },
    ])
    return {
      items,
      activities,
    }
  },
})
</script>
