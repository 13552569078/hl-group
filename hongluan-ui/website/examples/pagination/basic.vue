<template>
  <hl-row>
    <hl-col span="col-24">
      <p>页数较少时的效果</p>
      <hl-pagination layout="prev, pager, next" :total="50" />
    </hl-col>
    <hl-col span="col-24" class="m-t-lg">
      <p>大于 7 页时的效果</p>
      <hl-pagination layout="prev, pager, next" :total="1000" />
    </hl-col>
  </hl-row>
</template>
