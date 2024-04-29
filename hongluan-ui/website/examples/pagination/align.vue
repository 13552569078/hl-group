<template>
  <hl-row align="items-center">
    <hl-col span="lg:col-16" class="dom-area" data-name="left">
      <hl-pagination layout="prev, pager, next" :total="50" align="items-left" block />
    </hl-col>
    <hl-col span="lg:col-16" class="m-t-xxl dom-area" data-name="center">
      <hl-pagination layout="prev, pager, next" :total="50" align="items-center" block />
    </hl-col>

    <hl-col span="lg:col-16" class="m-t-xxl dom-area" data-name="right">
      <hl-pagination layout="prev, pager, next" :total="50" align="items-right" block />
    </hl-col>

    <hl-col span="lg:col-16" class="m-t-xxl dom-area" data-name="between">
      <hl-pagination line layout="prev, pager, next" :total="50" align="items-between" block />
    </hl-col>
  </hl-row>
</template>
