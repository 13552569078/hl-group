<template>
  <p>属性方式：</p>
  <hl-row gap="var(--lg)">
    <hl-col span="col">
      <hl-input
        v-model="input1"
        placeholder="请选择日期"
        type="danger"
        block
        clearable
        show-word-limit
        maxlength="10"
      >
        <template #suffix>
          <hl-icon><two-calendar /></hl-icon>
        </template>
      </hl-input>
    </hl-col>
    <hl-col span="col">
      <hl-input
        v-model="input2"
        placeholder="请输入内容"
        block
      >
        <template #prefix>
          <hl-icon><two-mail /></hl-icon>
        </template>
      </hl-input>
    </hl-col>
  </hl-row>

  <p class="m-t-lg">自定义slot方式：</p>
  <hl-row gap="var(--lg)">
    <hl-col span="col">
      <hl-input v-model="input3" placeholder="请输入键词进行搜索" block>
        <template #prefix>
          <select class="hl-input sm thin">
            <option value="">http://</option>
            <option value="">https://</option>
            <option value="">ssh:</option>
          </select>
        </template>
        <template #suffix>
          <hl-popover
            placement="top"
            tooltip
            trigger="hover"
            content="搜索一下"
          >
            <template #reference>
              <hl-icon><two-search /></hl-icon>
            </template>
          </hl-popover>
        </template>
      </hl-input>
    </hl-col>
    <hl-col span="col">
      <hl-input v-model="input4" placeholder="请输入内容" block>
        <template #prefix>邮箱:</template>
        <template #suffix><hl-spinner animation="around-right" /></template>
      </hl-input>
    </hl-col>
  </hl-row>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { TwoCalendar, TwoMail, TwoSearch } from '@hongluan-ui/icons'

const input1 = ref('')
const input2 = ref('')
const input3 = ref('')
const input4 = ref('916471@qq.com')
</script>
