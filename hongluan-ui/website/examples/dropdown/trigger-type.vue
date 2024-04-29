<template>
  <hl-row gap="lg">
    <hl-col span="col-8">
      <hl-dropdown split="button">
        hover 激活
        <template #dropdown>
          <hl-dropdown-menu>
            <hl-dropdown-item>标记状态</hl-dropdown-item>
            <hl-dropdown-item>生成报表</hl-dropdown-item>
            <hl-dropdown-item>统计分析数据</hl-dropdown-item>
            <hl-dropdown-item divider />
            <hl-dropdown-item>移动到…</hl-dropdown-item>
            <hl-dropdown-item>删除</hl-dropdown-item>
          </hl-dropdown-menu>
        </template>
      </hl-dropdown>
    </hl-col>
    <hl-col span="col-8">
      <hl-dropdown trigger="click" split="button">
        click 激活
        <template #dropdown>
          <hl-dropdown-menu>
            <hl-dropdown-item>标记状态</hl-dropdown-item>
            <hl-dropdown-item>生成报表</hl-dropdown-item>
            <hl-dropdown-item>统计分析数据</hl-dropdown-item>
            <hl-dropdown-item divider />
            <hl-dropdown-item>移动到…</hl-dropdown-item>
            <hl-dropdown-item>删除</hl-dropdown-item>
          </hl-dropdown-menu>
        </template>
      </hl-dropdown>
    </hl-col>
    <hl-col span="col-8">
      <hl-dropdown split="button" trigger="contextmenu">
        右键 激活
        <template #dropdown>
          <hl-dropdown-menu>
            <hl-dropdown-item>标记状态</hl-dropdown-item>
            <hl-dropdown-item>生成报表</hl-dropdown-item>
            <hl-dropdown-item>统计分析数据</hl-dropdown-item>
            <hl-dropdown-item divider />
            <hl-dropdown-item>移动到…</hl-dropdown-item>
            <hl-dropdown-item>删除</hl-dropdown-item>
          </hl-dropdown-menu>
        </template>
      </hl-dropdown>
    </hl-col>
  </hl-row>
</template>
