<template>
  <hl-row gap="var(--lg)">
    <hl-col span="col-24">
      <hl-panel body-padding="calc(var(--xxs) * 14)" footer-padding="0" footer-class="items-left" class="card-panel texture-bg-circuit">
        <template #header>
          <div class="panel-title">
            <h4>基本信息</h4>
          </div>
          <hl-group gap="var(--sm)" class="panel-header-right">
            <hl-button type="primary" effect="light"> 取消认领 </hl-button>
            <hl-button type="primary"> 不予受理 </hl-button>
            <hl-button type="primary"> 受理 </hl-button>
          </hl-group>
        </template>
        <hl-row>
          <hl-col span="col-15" dir="vertical" class="border-right p-r-xxl">
            <hl-group gap="var(--xxs)">
              <h4>2021年度历下区城市风险数据收集</h4>
            </hl-group>
            <div class="bg-light text-secondary radius-lg p-y-sm p-x-md m-t-md" style="min-height: calc(var(--xxs) * 17)">
              请各安委办成员单位组织所辖企业完成2021年度企业风险点数据与应急资源数据的填报工作
            </div>
            <hl-group class="m-t-lg static" gap="calc(var(--md) * 8)">
              <hb-data-collect gap="var(--md)" padding="0">
                <hl-group dir="vertical">
                  <span class="sub-title font-md">事件状态</span>
                  <span class="font-lg font-bold text-primary">待受理</span>
                </hl-group>
              </hb-data-collect>
              <hb-data-collect gap="var(--md)" padding="0">
                <hl-group dir="vertical">
                  <span class="sub-title font-md">事件来源</span>
                  <span class="font-lg font-bold">重点区域监测凭条</span>
                </hl-group>
              </hb-data-collect>
              <hb-data-collect gap="var(--md)" padding="0">
                <hl-group dir="vertical">
                  <span class="sub-title font-md">事件类型</span>
                  <span class="font-lg font-bold">人员聚集</span>
                </hl-group>
              </hb-data-collect>
            </hl-group>
          </hl-col>

          <hl-col span="col-9" class="p-l-xxl">
            <hl-group dir="vertical" gap="var(--sm)">
              <hl-group align="items-middle" gap="var(--sm)">
                <hl-group align="items-middle" gap="var(--xs)">
                  <hl-icon size="xs" fill round class="bg-light text-secondary"><two-examine /></hl-icon>
                  <span class="text-light">参与机构</span>
                </hl-group>
                <span class="font-bold">2021100001</span>
              </hl-group>
              <hl-group align="items-middle" gap="var(--sm)">
                <hl-group align="items-middle" gap="var(--xs)">
                  <hl-icon size="xs" fill round class="bg-light text-secondary"><two-clock /></hl-icon>
                  <span class="text-light">创建时间</span>
                </hl-group>
                <span class="font-bold">2022-03-12 14:00</span>
              </hl-group>
              <hl-group align="items-middle" gap="var(--sm)">
                <hl-group align="items-middle" gap="var(--xs)">
                  <hl-icon size="xs" fill round class="bg-light text-secondary"><two-alert /></hl-icon>
                  <span class="text-light">事件级别</span>
                </hl-group>
                <span class="font-bold text-danger">1级</span>
              </hl-group>
            </hl-group>
          </hl-col>
        </hl-row>
      </hl-panel>
    </hl-col>

    <hl-col span="col-24">
      <hl-panel
        class="card-panel"
        borderless
        padding="var(--xl)"
        body-padding="calc(var(--xxs) * 14)"
        footer-padding="0"
        header-class="p-y-lg"
        footer-class="items-left"
        style="--panel-header-height: auto; height: calc(var(--xxs) * 180)"
      >
        <template #header>
          <div class="panel-title"><h4>受理事件代办</h4></div>
          <div class="panel-header-right">
            <hl-button no-fill type="primary" effect="light"> 更多代办 </hl-button>
            <hl-button no-fill type="primary" effect="light" @click="switemMap"> 地图分布 </hl-button>
          </div>
        </template>

        <hl-group full :class="showMap ? 'show-map' : ''" gap="var(--xl)">
          <div style="overflow-x: auto" class="scrollbar-thumb p-b-sm">
            <hl-group full gap="var(--lg)" align="items-between">
              <hl-group dir="vertical" class="static" style="width: calc(var(--xxs) * 72)">
                <hl-group class="radius-t-xl bg-success">
                  <hb-data-collect full padding="var(--xl)" gap="var(--xl)" radius="var(--radius-lg)">
                    <hl-icon type="success" effect="light" size="xl" fill radius>
                      <fill-record />
                    </hl-icon>
                    <hl-group gap="var(--xl)">
                      <hl-group dir="vertical" full="full-x">
                        <h2 class="text-inverse">23</h2>
                        <span class="text-inverse font-sm">回退事件</span>
                      </hl-group>
                      <hl-group dir="vertical" full="full-x">
                        <h2 class="text-inverse">2</h2>
                        <span class="text-inverse font-sm">督办事件</span>
                      </hl-group>
                    </hl-group>
                  </hb-data-collect>
                </hl-group>
                <hl-scrollbar style="height: calc(var(--xxs) * 118)" class="bg-success-light-5 radius-b-xl">
                  <hl-group dir="vertical" class="p-md" gap="var(--sm)">
                    <template v-for="item in items" :key="item.title">
                      <hl-panel class="border border-transparent hover:border-primary transition" borderless header-height="auto" padding="var(--sm)" footer-class="p-t-xxs">
                        <template #header>
                          <div class="panel-title p-t-sm p-b-xs">
                            <h6 class="ellipsis cursor-pointer hover:text-hover transition" style="--line: 2">历下区龙洞街道车辆占用事件</h6>
                          </div>
                          <div class="ribbon-text text-danger" style="top: -3px; right: -3px">督办</div>
                        </template>
                        <hl-group gap="var(--sm)">
                          <hl-group dir="vertical">
                            <hl-group align="items-middle" gap="var(--xxs)">
                              <hl-icon size="xxxs" class="text-secondary"><two-clock /></hl-icon>
                              <span class="font-sm text-secondary">创建 2021-06-08</span>
                            </hl-group>
                            <hl-group align="items-middle" gap="var(--xxs)">
                              <hl-icon size="xxxs" class="text-secondary"><two-point /></hl-icon>
                              <span class="font-sm text-secondary ellipsis">如果地址长度超过一行就不要换行显示了吧</span>
                            </hl-group>
                          </hl-group>
                          <hl-group dir="vertical" align="items-left" gap="var(--xxs)" class="p-l-sm border-left static" style="min-width: calc(var(--xxs) * 16)">
                            <span class="font-sm text-secondary ellipsis">大客流</span>
                            <span class="font-sm text-primary ellipsis">3级</span>
                          </hl-group>
                        </hl-group>
                        <template #footer>
                          <hl-group full>
                            <hl-group gap="var(--xs)">
                              <hl-button size="sm" type="success" effect="light" style="--button-height: var(--lg)">受理</hl-button>
                              <hl-button size="sm" effect="light" style="--button-height: var(--lg)">不予受理</hl-button>
                            </hl-group>
                            <hl-button size="sm" effect="light" class="static" style="--button-height: var(--lg)">回退详情</hl-button>
                          </hl-group>
                        </template>
                      </hl-panel>
                    </template>
                  </hl-group>
                </hl-scrollbar>
              </hl-group>
              <hl-group dir="vertical" class="static" style="width: calc(var(--xxs) * 72)">
                <hl-group class="radius-t-xl bg-primary">
                  <hb-data-collect full padding="var(--xl)" gap="var(--xl)" radius="var(--radius-lg)">
                    <hl-icon type="primary" effect="light" size="xl" fill radius>
                      <fill-server />
                    </hl-icon>
                    <hl-group gap="var(--xl)">
                      <hl-group dir="vertical" full="full-x">
                        <h2 class="text-inverse">23</h2>
                        <span class="text-inverse font-sm">回退事件</span>
                      </hl-group>
                      <hl-group dir="vertical" full="full-x">
                        <h2 class="text-inverse">2</h2>
                        <span class="text-inverse font-sm">督办事件</span>
                      </hl-group>
                    </hl-group>
                  </hb-data-collect>
                </hl-group>
                <hl-scrollbar style="height: calc(var(--xxs) * 118)" class="bg-primary-light-5 radius-b-xl">
                  <hl-group dir="vertical" class="p-md" gap="var(--sm)">
                    <template v-for="item in items" :key="item.title">
                      <hl-panel class="multi-card border border-transparent hover:border-primary transition" borderless header-height="auto" padding="var(--sm)" footer-class="p-t-xxs">
                        <template #header>
                          <div class="panel-title p-t-sm p-b-xs">
                            <h6 class="ellipsis cursor-pointer hover:text-hover transition" style="--line: 2">历下区龙洞街道车辆占用事件</h6>
                          </div>
                          <div class="panel-header-right">123</div>
                        </template>
                        <hl-group gap="var(--sm)">
                          <hl-group dir="vertical">
                            <hl-group align="items-middle" gap="var(--xxs)">
                              <hl-icon size="xxxs" class="text-secondary"><two-clock /></hl-icon>
                              <span class="font-sm text-secondary">创建 2021-06-08</span>
                            </hl-group>
                            <hl-group align="items-middle" gap="var(--xxs)">
                              <hl-icon size="xxxs" class="text-secondary"><two-point /></hl-icon>
                              <span class="font-sm text-secondary ellipsis">如果地址长度超过一行就不要换行显示了吧</span>
                            </hl-group>
                          </hl-group>
                          <hl-group dir="vertical" align="items-left" gap="var(--xxs)" class="p-l-sm border-left static" style="min-width: calc(var(--xxs) * 16)">
                            <span class="font-sm text-secondary ellipsis">大客流</span>
                            <span class="font-sm text-primary ellipsis">3级</span>
                          </hl-group>
                        </hl-group>
                        <template #footer>
                          <hl-group full>
                            <hl-group gap="var(--xs)">
                              <hl-button size="sm" type="success" effect="light" style="--button-height: var(--lg)">受理</hl-button>
                              <hl-button size="sm" effect="light" style="--button-height: var(--lg)">不予受理</hl-button>
                            </hl-group>
                            <hl-button size="sm" effect="light" class="static" style="--button-height: var(--lg)">回退详情</hl-button>
                          </hl-group>
                        </template>
                      </hl-panel>
                    </template>
                  </hl-group>
                </hl-scrollbar>
              </hl-group>
              <hl-group dir="vertical" class="static" style="width: calc(var(--xxs) * 72)">
                <hl-group class="radius-t-xl bg-danger">
                  <hb-data-collect full padding="var(--xl)" gap="var(--xl)" radius="var(--radius-lg)">
                    <hl-icon type="danger" effect="light" size="xl" fill radius>
                      <fill-examine />
                    </hl-icon>
                    <hl-group gap="var(--xl)">
                      <hl-group dir="vertical" full="full-x">
                        <h2 class="text-inverse">23</h2>
                        <span class="text-inverse font-sm">回退事件</span>
                      </hl-group>
                      <hl-group dir="vertical" full="full-x">
                        <h2 class="text-inverse">2</h2>
                        <span class="text-inverse font-sm">督办事件</span>
                      </hl-group>
                    </hl-group>
                  </hb-data-collect>
                </hl-group>
                <hl-scrollbar style="height: calc(var(--xxs) * 118)" class="bg-danger-light-5 radius-b-xl">
                  <hl-group dir="vertical" class="p-md" gap="var(--sm)">
                    <template v-for="item in items" :key="item.title">
                      <hl-panel class="multi-card border border-transparent hover:border-primary transition" borderless header-height="auto" padding="var(--sm)" footer-class="p-t-xxs">
                        <template #header>
                          <div class="panel-title p-t-sm p-b-xs">
                            <h6 class="ellipsis cursor-pointer hover:text-hover transition" style="--line: 2">历下区龙洞街道车辆占用事件</h6>
                          </div>
                          <div class="panel-header-right">123</div>
                        </template>
                        <hl-group gap="var(--sm)">
                          <hl-group dir="vertical">
                            <hl-group align="items-middle" gap="var(--xxs)">
                              <hl-icon size="xxxs" class="text-secondary"><two-clock /></hl-icon>
                              <span class="font-sm text-secondary">创建 2021-06-08</span>
                            </hl-group>
                            <hl-group align="items-middle" gap="var(--xxs)">
                              <hl-icon size="xxxs" class="text-secondary"><two-point /></hl-icon>
                              <span class="font-sm text-secondary ellipsis">如果地址长度超过一行就不要换行显示了吧</span>
                            </hl-group>
                          </hl-group>
                          <hl-group dir="vertical" align="items-left" gap="var(--xxs)" class="p-l-sm border-left static" style="min-width: calc(var(--xxs) * 16)">
                            <span class="font-sm text-secondary ellipsis">大客流</span>
                            <span class="font-sm text-primary ellipsis">3级</span>
                          </hl-group>
                        </hl-group>
                        <template #footer>
                          <hl-group full>
                            <hl-group gap="var(--xs)">
                              <hl-button size="sm" type="success" effect="light" style="--button-height: var(--lg)">受理</hl-button>
                              <hl-button size="sm" effect="light" style="--button-height: var(--lg)">不予受理</hl-button>
                            </hl-group>
                            <hl-button size="sm" effect="light" class="static" style="--button-height: var(--lg)">回退详情</hl-button>
                          </hl-group>
                        </template>
                      </hl-panel>
                    </template>
                  </hl-group>
                </hl-scrollbar>
              </hl-group>
              <hl-group dir="vertical" class="static" style="width: calc(var(--xxs) * 72)">
                <hl-group class="radius-t-xl bg-warning">
                  <hb-data-collect full padding="var(--xl)" gap="var(--xl)" radius="var(--radius-lg)">
                    <hl-icon type="warning" effect="light" size="xl" fill radius>
                      <fill-user />
                    </hl-icon>
                    <hl-group gap="var(--xl)">
                      <hl-group dir="vertical" full="full-x">
                        <h2 class="text-inverse">23</h2>
                        <span class="text-inverse font-sm">回退事件</span>
                      </hl-group>
                      <hl-group dir="vertical" full="full-x">
                        <h2 class="text-inverse">2</h2>
                        <span class="text-inverse font-sm">督办事件</span>
                      </hl-group>
                    </hl-group>
                  </hb-data-collect>
                </hl-group>
                <hl-scrollbar style="height: calc(var(--xxs) * 118)" class="bg-warning-light-5 radius-b-xl">
                  <hl-group dir="vertical" class="p-md" gap="var(--sm)">
                    <template v-for="item in items" :key="item.title">
                      <hl-panel class="multi-card border border-transparent hover:border-primary transition" borderless header-height="auto" padding="var(--sm)" footer-class="p-t-xxs">
                        <template #header>
                          <div class="panel-title p-t-sm p-b-xs">
                            <h6 class="ellipsis cursor-pointer hover:text-hover transition" style="--line: 2">历下区龙洞街道车辆占用事件</h6>
                          </div>
                          <div class="panel-header-right">123</div>
                        </template>
                        <hl-group gap="var(--sm)">
                          <hl-group dir="vertical">
                            <hl-group align="items-middle" gap="var(--xxs)">
                              <hl-icon size="xxxs" class="text-secondary"><two-clock /></hl-icon>
                              <span class="font-sm text-secondary">创建 2021-06-08</span>
                            </hl-group>
                            <hl-group align="items-middle" gap="var(--xxs)">
                              <hl-icon size="xxxs" class="text-secondary"><two-point /></hl-icon>
                              <span class="font-sm text-secondary ellipsis">如果地址长度超过一行就不要换行显示了吧</span>
                            </hl-group>
                          </hl-group>
                          <hl-group dir="vertical" align="items-left" gap="var(--xxs)" class="p-l-sm border-left static" style="min-width: calc(var(--xxs) * 16)">
                            <span class="font-sm text-secondary ellipsis">大客流</span>
                            <span class="font-sm text-primary ellipsis">3级</span>
                          </hl-group>
                        </hl-group>
                        <template #footer>
                          <hl-group full>
                            <hl-group gap="var(--xs)">
                              <hl-button size="sm" type="success" effect="light" style="--button-height: var(--lg)">受理</hl-button>
                              <hl-button size="sm" effect="light" style="--button-height: var(--lg)">不予受理</hl-button>
                            </hl-group>
                            <hl-button size="sm" effect="light" class="static" style="--button-height: var(--lg)">回退详情</hl-button>
                          </hl-group>
                        </template>
                      </hl-panel>
                    </template>
                  </hl-group>
                </hl-scrollbar>
              </hl-group>
            </hl-group>
          </div>
          <hl-group class="task-map static">
            <div class="map-btn-close">
              <hl-button round equal style="--button-bg-color: var(--bg-element); --button-border-color: var(--bg-element)" class="box-shadow-lg" @click="switemMap">
                <template #icon>
                  <hl-icon>
                    <two-chevron-right />
                  </hl-icon>
                </template>
              </hl-button>
            </div>
            <div class="map-area">
              <img style="width: calc(var(--xxs) * 148)" src="../../assets/images/show_map.png" alt="" />
            </div>
          </hl-group>
        </hl-group>
      </hl-panel>
    </hl-col>

    <hl-col span="col-24">
      <hl-panel class="card-panel" borderless body-padding="0 calc(var(--xxs) * 14) var(--xl)">
        <template #header>
          <div class="panel-title">
            <h4>被督办事件</h4>
          </div>
        </template>
        <hl-simple-table :cols="cols" :data="tableData" stripe border="bordered" compact>
          <template #popper>
            <hl-popover trigger="hover" placement="top">
              <hl-group dir="vertical" gap="var(--xxs)">
                <hl-group dir="vertical" align="items-middle">
                  <hl-tag type="success" effect="light">社会安全事件</hl-tag>
                  <hl-icon class="text-light">
                    <fill-circle-bottom />
                  </hl-icon>
                </hl-group>
                <hl-group dir="vertical" align="items-middle">
                  <hl-tag type="success" effect="light">其他社会安全事件</hl-tag>
                  <hl-icon class="text-light">
                    <fill-circle-bottom />
                  </hl-icon>
                </hl-group>
                <hl-group dir="vertical" align="items-middle">
                  <hl-tag type="primary" effect="light">人员聚集</hl-tag>
                </hl-group>
              </hl-group>
              <template #reference>
                <hl-tag type="primary" effect="light">人员聚集</hl-tag>
              </template>
            </hl-popover>
          </template>
          <template #handle>
            <hl-group gap="var(--md)">
              <a href>编辑</a>
              <a href>删除</a>
            </hl-group>
          </template>
        </hl-simple-table>
        <hl-pagination layout="prev, pager, next" block align="items-right" :total="500" class="m-t-lg" />
      </hl-panel>
    </hl-col>
  </hl-row>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    const showMap = ref(false)

    const switemMap = () => {
      showMap.value = !showMap.value
    }

    const status = {
      1: 'primary',
      2: 'warning',
      3: 'disabled',
    }
    const statusName = {
      1: '进行中',
      2: '未开始',
      3: '已结束',
    }
    const statusProgress = {
      1: 'left',
      2: 'right',
      3: 'left',
    }
    const items = ref([{ id: '1' }, { id: '2' }, { id: '3' }, { id: '4' }, { id: '5' }])

    const tableData = ref([
      { id: 1, title: 'Button 按钮', sub_title: 'HTML, JS, Scss', type: '表单', des: '钮组件也拥有统一的状态色，如：primary, danger 等', update: '2021-07-18' },
      { id: 2, title: 'Input 输入框', sub_title: 'HTML, JS, Scss', type: '表单', des: '通过鼠标或键盘输入内容，Input 为受控组件', update: '2021-07-18' },
      { id: 3, title: 'Autocomplete 输入建议', sub_title: 'HTML, JS, Scss', type: '表单', des: 'autocomplete 是一个带输入建议的输入框组件', update: '2021-07-18' },
      { id: 4, title: 'InputNumber 计数器', sub_title: 'HTML, JS, Scss', type: '表单', des: '计数器由group容器和button、input组成', update: '2021-07-18' },
    ])
    const cols = ref([
      { title: '#', prop: 'id' },
      { title: '组件名称', prop: 'title' },
      { title: '类型', slotName: 'popper', width: '10%' },
      { title: '简介', prop: 'des' },
      { title: '更新日期', prop: 'update' },
      { title: '操作', slotName: 'handle', align: 'center', width: '15%' },
    ])

    const activeName = ref('1')
    const value1 = ref('按创建时间')
    const value2 = ref('全部状态')
    const value3 = ref('全部状态')

    return {
      showMap,
      switemMap,
      items,
      status,
      statusName,
      statusProgress,
      tableData,
      cols,
      value1,
      value2,
      value3,
      activeName,
    }
  },
})
</script>


<style lang="scss">
.task-map {
  position: absolute;
  right: 0;
  top: 0;
  bottom: 0;
  width: 0;
  height: calc(var(--xxs) * 148);
  transition: width 0.5s ease;
  z-index: 1000;

  .map-area {
    width: calc(var(--xxs) * 148);
    border-radius: var(--radius-xl);
    overflow: hidden;
  }
  .map-btn-close {
    position: absolute;
    left: 0;
    top: 50%;
    transform: translate(-50%, -50%);
    z-index: 10;
  }
}
.show-map {
  .task-map {
    position: relative;
    width: calc(var(--xxs) * 148);
  }
}
</style>
