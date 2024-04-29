<template>
  <hl-row>
    <hl-col span="md:col-12">
      <p>横向缩进融合</p>
      <hl-group dir="horizontal" class="m-t-sm" merge indent>
        <span class="display-flex border border-primary items-center items-middle radius-lg text-primary p-xs">Group Item</span>
        <span class="display-flex border border-primary items-center items-middle radius-lg text-primary p-xs">Group Item</span>
      </hl-group>
    </hl-col>
    <hl-col span="md:col-12">
      <p>纵向缩进融合</p>
      <hl-group dir="vertical" class="m-t-sm" merge indent>
        <span class="display-flex border border-primary items-center items-middle radius-lg text-primary p-xs">Group Item</span>
        <span class="display-flex border border-primary items-center items-middle radius-lg text-primary p-xs">Group Item</span>
      </hl-group>
    </hl-col>

    <hl-col span="col" class="m-t-xl">
      <p>也可以设置具体数值<code>indent="-2px"</code>来缩进元素</p>
      <hl-group dir="horizontal" class="m-t-sm" merge indent="-2px">
        <span class="display-flex border border-primary items-center items-middle radius-lg text-primary p-xs" style="--border-width: 2px">Group Item</span>
        <span class="display-flex border border-primary items-center items-middle radius-lg text-primary p-xs" style="--border-width: 2px">Group Item</span>
      </hl-group>
    </hl-col>
    <hl-col span="col" class="m-t-xl">
      <p>正值设置<code>indent="12px"</code> <span class="font-bold text-danger">不推荐</span> </p>
      <hl-group dir="horizontal" class="m-t-sm" indent="12px">
        <span class="display-flex border border-primary items-center items-middle radius-lg text-primary p-xs" style="--border-width: 2px">Group Item</span>
        <span class="display-flex border border-primary items-center items-middle radius-lg text-primary p-xs" style="--border-width: 2px">Group Item</span>
      </hl-group>
    </hl-col>
  </hl-row>
</template>
