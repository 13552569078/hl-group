<template>
  <hl-row layout="grid" count="count-3" dir="vertical" gap="var(--md)" class="show-col">
    <hl-col span="col col-span-3">
      <em>1</em>
    </hl-col>
    <hl-col span="col">
      <em>2</em>
    </hl-col>
    <hl-col span="col lg:row-span-1 xl:row-span-2">
      <em>3</em>
    </hl-col>
    <hl-col span="col">
      <em>4</em>
    </hl-col>
    <hl-col span="col">
      <em>5</em>
    </hl-col>
    <hl-col span="col">
      <em>6</em>
    </hl-col>
  </hl-row>

  <p class="m-t-lg">
    跨度类与
    <code>.col-*`</code> 类似，但
    <code>.col-*</code> 是根据24栅格来占比的，而跨度类是基于
    <code>hl-row</code> 的
    <code>count</code> 属性来占比的。
  </p>
  <p>
    比如：当
    <code>count="count-3"</code> 时
    <code>.col-span-3</code> 即为 3/3，
    <code>.col-span-1</code> 即为 1/3。
  </p>
</template>
