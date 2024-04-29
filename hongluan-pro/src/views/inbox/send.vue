<template>
  <hl-panel padding="var(--xl)" class="main-panel w-full" body-padding="0">
    <template #header>
      <div class="panel-header-left" style="margin-left: calc(var(--sm) * -1.5)">
        <hl-button equal no-fill>
          <template #icon>
            <hl-icon>
              <two-chevron-left />
            </hl-icon>
          </template>
        </hl-button>
      </div>
      <div class="panel-title"><h4>山东省招远市金矿爆炸事件简报</h4></div>
    </template>
    <hl-group full="full-x">
      <hl-group dir="vertical" style="width: calc(var(--xxl) * 8)" full="full-x" class="static border-right p-xl">
        <hl-group dir="vertical" full="full-x" gap="var(--md)" class="m-b-lg">
          <hl-select v-model="value" filterable placeholder="请选择">
            <hl-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
          </hl-select>
          <hl-input placeholder="输入关键字进行过滤">
            <template #prefix>
              <hl-icon><two-search /></hl-icon>
            </template>
          </hl-input>
        </hl-group>
        <hl-tree :data="orgData" :props="defaultProps" default-expand-all :filter-node-method="filterNode">
          <template #default="{ node }">
            <span class="tree-node-label">
              {{ node.label }}
            </span>
          </template>
        </hl-tree>
      </hl-group>

      <hl-group dir="vertical" style="width: calc(var(--xxl) * 8)" full="full-x" class="static border-right p-xl insert-panel">
        <hl-group dir="vertical" full="full-x" gap="var(--md)" class="m-b-lg">
          <hl-input placeholder="输入关键字进行过滤">
            <template #prefix>
              <hl-icon><two-search /></hl-icon>
            </template>
          </hl-input>
        </hl-group>
        insert-panel
      </hl-group>


      <hl-group gap="var(--lg)" full="full-x" dir="vertical" class="p-xxl">
        <hl-group dir="vertical" gap="var(--xs)" full="full-x">
          <hl-group align="items-middle items-between" style="height: calc(var(--xl) + var(--xxs))">
            <h5 class="static">消息接收人</h5>
            <text class="font-sm text-primary w-full">（已添加 0 人， 0 家单位）</text>
            <hl-button type="link">
              清空
              <template #icon>
                <hl-icon>
                  <two-delete />
                </hl-icon>
              </template>
            </hl-button>
          </hl-group>
          <hl-group gap="var(--sm)" class="p-md border radius-xxs">
            <hl-tag v-for="tag in tags" :key="tag.name" closable>
              {{ tag.name }}
            </hl-tag>
          </hl-group>
        </hl-group>
        <hl-group dir="vertical" gap="var(--xs)" full="full-x">
          <hl-group align="items-middle items-between" style="height: calc(var(--xl) + var(--xxs))">
            <h5 class="static">消息标题</h5>
          </hl-group>
          <hl-input type="text" block />
        </hl-group>
        <hl-group dir="vertical" gap="var(--xs)" full="full-x">
          <hl-group align="items-middle items-between" style="height: calc(var(--xl) + var(--xxs))">
            <h5 class="static">消息内容</h5>
            <hl-button type="link">
              导入模版
              <template #icon>
                <hl-icon>
                  <two-sign-in />
                </hl-icon>
              </template>
            </hl-button>
          </hl-group>
          <hl-input type="text" native-type="textarea" :rows="10" block />
        </hl-group>
        <hl-group dir="vertical" gap="var(--xs)" full="full-x">
          <hl-upload
            style="width: 400px"
            action="http://192.168.31.150/up/"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :before-remove="beforeRemove"
            multiple
            :limit="5"
            :on-exceed="handleExceed"
            :file-list="fileList"
          >
            <hl-button icon-position="left">
              添加附件
              <template #icon>
                <hl-icon><two-upload /></hl-icon>
              </template>
            </hl-button>
            <template #tip>
              <div class="text-danger m-t-sm">只能上传 jpg/png 文件，且不超过 500kb</div>
            </template>
          </hl-upload>
        </hl-group>
        <hl-group dir="vertical" gap="var(--xs)" full="full-x">
          <hl-group align="items-middle items-between" style="height: calc(var(--xl) + var(--xxs))">
            <h5 class="static">通知方式</h5>
          </hl-group>
          <hl-checkbox-group v-model="checkList" dir="horizontal" gap="var(--md)">
            <hl-checkbox label="应用通知" />
            <hl-checkbox label="短信通知" />
            <hl-checkbox label="语音通知" />
          </hl-checkbox-group>
        </hl-group>
        <hl-alert title="本邮件将在 今天 下午5:05 投递到对方邮箱" effect="light" />
        <hl-group gap="var(--sm)" class="m-t-md">
          <hl-button type="primary" icon-position="left">
            发送
            <template #icon>
              <hl-icon><two-send /></hl-icon>
            </template>
          </hl-button>
          <hl-popover popper-class="no-style" placement="top">
            <hl-panel>
              <template #header>
                <h5 class="panel-title">定时发送设置</h5>
              </template>
              <hl-group dir="vertical" gap="var(--xs)">
                <span>选择发送的时间：</span>
                <hl-date-picker v-model="date" type="datetime" placeholder="选择日期时间" block />
              </hl-group>
              <template #footer>
                <hl-button class="m-r-md" @click="dialogVisible = false">取 消</hl-button>
                <hl-button type="primary" @click="dialogVisible = false">确 定</hl-button>
              </template>
            </hl-panel>

            <template #reference>
              <hl-button type="primary" effect="light" icon-position="left" class="m-r-lg">
                定时发送
                <template #icon>
                  <hl-icon><two-clock /></hl-icon>
                </template>
              </hl-button>
            </template>
          </hl-popover>

          <hl-button effect="light"> 存为草稿 </hl-button>
          <hl-button effect="light"> 取消 </hl-button>
        </hl-group>
      </hl-group>
    </hl-group>
  </hl-panel>
</template>

<script>
import { defineComponent, ref } from 'vue'
export default defineComponent({
  setup() {
    const items = ref([
      { title: '省防汛通知', size: '325KB', type: 'pdf' },
      { title: '天气异常警告', size: '212KB', type: 'doc' },
      { title: '冰冻天气异常', size: '488.35KB', type: 'css' },
      { title: '市级抗旱通知', size: '14KB', type: 'ai' },
      { title: '放假通知', size: '98KB', type: 'sql' },
      { title: '接种疫苗通知', size: '22KB', type: 'xml' },
    ])
    const tags = ref([{ name: '标签二' }, { name: '标签三' }, { name: '标签四' }, { name: '标签五' }, { name: '标签六' }])
    const orgData = ref([
      {
        label: '山东省人民政府',
        children: [
          {
            label: '直属机构',
            children: [
              {
                label: '省教育厅',
              },
              {
                label: '省应急管理厅',
                children: [
                  {
                    label: '威海市应急管理局',
                  },
                  {
                    label: '省工业和信息化厅',
                  },
                ],
              },
            ],
          },
          {
            label: '内设机构',
            children: [
              {
                label: '防汛抗旱处',
              },
              {
                label: '安全生产监察支队',
              },
            ],
          },
          {
            label: '济南市',
            children: [
              {
                label: '防汛抗旱处',
              },
              {
                label: '安全生产监察支队',
              },
            ],
          },
          {
            label: '菏泽市',
            children: [
              {
                label: '防汛抗旱处',
              },
              {
                label: '安全生产监察支队',
              },
            ],
          },
        ],
      },
    ])
    const defaultProps = ref({
      children: 'children',
      label: 'label',
    })
    const value = ref('')
    const options = ref([
      {
        value: '选项1',
        label: '省教育厅',
      },
      {
        value: '选项2',
        label: '省应急管理厅',
      },
      {
        value: '选项3',
        label: '威海市应急管理局',
      },
      {
        value: '选项4',
        label: '省工业和信息化厅',
      },
    ])

    const fileList = ref([
      {
        name: 'food.jpeg',
        url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100',
      },
      {
        name: 'food2.jpeg',
        url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100',
      },
    ])
    const handleRemove = (file, fileList) => {
      console.log(file, fileList)
    }
    const handlePreview = (file) => {
      console.log(file)
    }
    const handleExceed = (files, fileList) => {
      alert(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`)
    }
    const beforeRemove = (file) => {
      return confirm(`确定移除 ${file.name}？`)
    }
    const checkList = ref(['应用通知'])
    const date = ref('')
    return {
      date,
      items,
      orgData,
      defaultProps,
      options,
      value,
      tags,
      fileList,
      handleRemove,
      handlePreview,
      handleExceed,
      beforeRemove,
      checkList,
    }
  },
})
</script>

<style lang="scss" scoped>
.show-insert-panel {
  .insert-panel {
    display: flex !important;
  }
}
 .insert-panel {
   display: none !important;
 }
</style>
