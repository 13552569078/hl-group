<template>
  <div class="block">
    <span class="demonstration">Switch when indicator is hovered (default)</span>
    <hl-carousel height="150px">
      <hl-caroushl-item
        v-for="(item, idx) in 4"
        :key="item"
        :style="
          idx % 2 === 0
            ? {
              backgroundColor: '#99a9bf',
            }
            : {
              backgroundColor: '#d3dce6',
            }
        "
      >
        <h3
          class="small"
          style="
            color: #475669;
            font-size: 14px;
            opacity: 0.75;
            line-height: 150px;
            margin: 0;
            text-align: center;
          "
        >
          {{ item }}
        </h3>
      </hl-caroushl-item>
    </hl-carousel>
  </div>
</template>
