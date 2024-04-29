<template>
  <hl-group dir="horizontal" deep-merge indent class="m-r-md">
    <hl-input placeholder="请输入内容" class="radius-l-md" />
    <hl-dropdown>
      <hl-button type="primary" class="radius-none radius-r-md">
        <hl-icon>
          <two-more />
        </hl-icon>
      </hl-button>
      <template #dropdown>
        <hl-dropdown-menu>
          <hl-dropdown-item>数据流</hl-dropdown-item>
          <hl-dropdown-item>传输属性值</hl-dropdown-item>
          <hl-dropdown-item>已断线</hl-dropdown-item>
          <hl-dropdown-item disabled>待恢复</hl-dropdown-item>
          <hl-dropdown-item divider />
          <hl-dropdown-item>其他</hl-dropdown-item>
        </hl-dropdown-menu>
      </template>
    </hl-dropdown>
  </hl-group>

  <hl-dropdown class="m-r-sm">
    <hl-button type="danger" icon-position="right" light>
      下拉菜单
      <template #icon>
        <hl-icon>
          <two-chevron-bottom />
        </hl-icon>
      </template>
    </hl-button>
    <template #dropdown>
      <hl-dropdown-menu>
        <hl-dropdown-item>数据流</hl-dropdown-item>
        <hl-dropdown-item>传输属性值</hl-dropdown-item>
        <hl-dropdown-item>已断线</hl-dropdown-item>
        <hl-dropdown-item disabled>待恢复</hl-dropdown-item>
        <hl-dropdown-item divider />
        <hl-dropdown-item>其他</hl-dropdown-item>
      </hl-dropdown-menu>
    </template>
  </hl-dropdown>

  <hl-dropdown class="m-r-sm">
    <hl-button type="primary" equal round no-fill>
      <hl-icon>
        <two-more />
      </hl-icon>
    </hl-button>
    <template #dropdown>
      <hl-dropdown-menu>
        <hl-dropdown-item>数据流</hl-dropdown-item>
        <hl-dropdown-item>传输属性值</hl-dropdown-item>
        <hl-dropdown-item>已断线</hl-dropdown-item>
        <hl-dropdown-item disabled>待恢复</hl-dropdown-item>
        <hl-dropdown-item divider />
        <hl-dropdown-item>其他</hl-dropdown-item>
      </hl-dropdown-menu>
    </template>
  </hl-dropdown>

  <hl-dropdown class="m-r-sm">
    <hl-thumb round type="info" size="sm">
      <span>测试</span>
    </hl-thumb>
    <template #dropdown>
      <hl-dropdown-menu>
        <hl-dropdown-item>个人信息</hl-dropdown-item>
        <hl-dropdown-item>实名认证</hl-dropdown-item>
        <hl-dropdown-item>安全设置</hl-dropdown-item>
        <hl-dropdown-item divider />
        <hl-dropdown-item>退出登录</hl-dropdown-item>
      </hl-dropdown-menu>
    </template>
  </hl-dropdown>

  <hr>

  <p class="m-t-lg m-b-lg">你也可以设置split属性来构建一个按钮或文本的下拉菜单</p>

  <hl-dropdown split="button" type="primary" class="m-r-md" @click="handleClick">
    Dropdown
    <template #dropdown>
      <hl-dropdown-menu>
        <hl-dropdown-item>数据流</hl-dropdown-item>
        <hl-dropdown-item>传输属性值</hl-dropdown-item>
        <hl-dropdown-item>已断线</hl-dropdown-item>
      </hl-dropdown-menu>
    </template>
  </hl-dropdown>
  <hl-dropdown split="link" type="success" @click="handleClick">
    Dropdown
    <template #dropdown>
      <hl-dropdown-menu>
        <hl-dropdown-item>数据流</hl-dropdown-item>
        <hl-dropdown-item>传输属性值</hl-dropdown-item>
        <hl-dropdown-item>已断线</hl-dropdown-item>
      </hl-dropdown-menu>
    </template>
  </hl-dropdown>
</template>

<script lang="ts" setup>
import { TwoMore, TwoChevronBottom } from '@hongluan-ui/icons'

const handleClick = () => {
  alert('你点击了一个下拉菜单')
}
</script>
