<template>
  <hl-panel class="table-panel">
    <template #header>
      <div class="panel-header-left">
        <hl-tabs v-model="activeName" type="line" :show-pane="false" nav-height="calc(var(--xxs) * 18)">
          <hl-tab-pane label="个人信息" name="person" />
          <hl-tab-pane label="账户信息" name="account" />
          <hl-tab-pane label="邮箱列表" name="email" />
        </hl-tabs>
      </div>
      <div class="panel-title"></div>
      <div class="panel-header-right">
        <hl-group gap="var(--sm)">
          <hl-button type="primary" effect="light" icon-position="left">
            导出列表
            <template #icon>
              <hl-icon><two-storage /></hl-icon>
            </template>
          </hl-button>
          <hl-button type="primary" icon-position="left">
            新增数据
            <template #icon>
              <hl-icon><two-plus /></hl-icon>
            </template>
          </hl-button>
        </hl-group>
      </div>
    </template>

    <person-info v-if="personLoaded" v-show="personShow" :ref="el => { tabs['personRef'] = el }" />
    <account-info v-if="accountLoaded" v-show="accountShow" :ref="el => { tabs['accountRef'] = el }" />
    <email-list v-if="emailLoaded" v-show="emailShow" :ref="el => { tabs['emailRef'] = el }" />

    <template #footer>
      <hl-pagination
        :current-page="pagination.currentPage"
        :page-sizes="[100, 200, 300, 400]"
        :page-size="pagination.pageSize"
        layout="sizes, total, slot, prev, pager, next, jumper"
        :total="400"
        align="items-between"
        class="full"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      >
        <div class="w-full"></div>
      </hl-pagination>
    </template>
  </hl-panel>
</template>

<script lang="ts">
import { defineComponent, ref, nextTick } from 'vue'
import { useLazyPane } from 'hongluan-hooks'
import PersonInfo from './table-tabs/person-info.vue'
import AccountInfo from './table-tabs/account-info.vue'
import EmailList from './table-tabs/email-list.vue'
import type { Indexable } from '@/types'

/*
"hongluan-hooks":"https://fastly.jsdelivr.net/npm/hongluan-hooks@latest/dist/index.es.js",
"echarts":"https://cdn.jsdelivr.net/npm/echarts@5.3.3/dist/echarts.esm.min.js"
*/
type Pagination = {
  pageSize: number
  total: number
  currentPage: number
}
export default defineComponent({
  components: {
    PersonInfo,
    AccountInfo,
    EmailList,
  },
  setup() {
    const activeName = ref('person')
    const tabs = ref<Indexable<{ pagination: Pagination; }>>({})
    const pagination = ref({} as Pagination)

    const tabChanged = () => {
      nextTick(() => {
        pagination.value = tabs.value[activeName.value + 'Ref'].pagination
      })
    }

    const handleSizeChange = (size: number) => {
      tabs.value[activeName.value + 'Ref'].pagination.pageSize = size
    }
    const handleCurrentChange = (cur: number) => {
      tabs.value[activeName.value + 'Ref'].pagination.currentPage = cur
    }

    const { loaded: personLoaded, show: personShow } = useLazyPane(activeName, 'person', tabChanged)
    const { loaded: accountLoaded, show: accountShow } = useLazyPane(activeName, 'account', tabChanged)
    const { loaded: emailLoaded, show: emailShow } = useLazyPane(activeName, 'email', tabChanged)

    return {
      activeName,
      tabs,
      tabChanged,
      personLoaded,
      personShow,
      accountLoaded,
      accountShow,
      emailLoaded,
      emailShow,
      pagination,
      handleSizeChange,
      handleCurrentChange,
    }
  },
})
</script>
