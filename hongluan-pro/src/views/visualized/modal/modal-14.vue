<template show-source>
  <hv-modal title="监测主体详情" width="calc(var(--xxl) * 14)">
    <hl-tabs v-model="activeName" type="line" nav-height="calc(var(--lg) * 2)" @tab-click="handleClick">
      <hl-tab-pane label="个人信息" name="1">
        <h4 class="ornament-sub-title m-b-md m-t-lg">监管部门</h4>
        <hl-row
          v-for="root in Object.keys(list)"
          :key="root"
          layout="grid"
          :count="root"
          gap="var(--md)"
          class="m-b-md"
        >
          <hl-col v-for="(item,index) in list[root]" :key="index" span="col">
            <hl-group dir="vertical" class="info-description auto-height">
              <span class="text-secondary group-item">{{ item.label }}</span>
              <span class="font-bold group-item">{{ item.val }}</span>
            </hl-group>
          </hl-col>
        </hl-row>
      </hl-tab-pane>
      <hl-tab-pane label="账户信息" name="2">账户信息</hl-tab-pane>
      <hl-tab-pane label="更改密码" name="3">更改密码</hl-tab-pane>
      <hl-tab-pane label="电子邮箱设定" name="4">电子邮箱设定</hl-tab-pane>
    </hl-tabs>
  </hv-modal>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  components: {},
  setup() {
    const activeName = ref('1')
    const list = ref({
      'count-2':[
        { val:'科城派出所',label:'派出所' },
        { val:'新都街道',label:'所在街道' },
        { val:'盐南区社事局',label:'上级主管部门' },
        { val:'否',label:'是否属于试生产期' },
      ],
      'count-3':[
        { val:'否',label:'是否属于试生产期' },
        { val:'否',label:'是否属于试生产期' },
        { val:'否',label:'是否属于试生产期' },
        { val:'否',label:'是否属于试生产期' },
        { val:'否',label:'是否属于试生产期' },
        { val:'否',label:'是否属于试生产期' },
      ],
    })

    return {
      activeName,
      list,
    }
  },
})
</script>
