<template>
  <div>
    <hl-carousel height="150px" :autoplay="false" trigger="click" :items-number="4" :items-width="140">
      <hl-carousel-item v-for="item in 7" :key="item">
        <div class="w-full h-full bg-primary light-1 display-flex items-center items-middle text-inverse font-lg font-bold">
          {{ item }}
        </div>
      </hl-carousel-item>
    </hl-carousel>
  </div>
</template>

<style>
  .hl-carousel-item h4 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 150px;
    margin: 0;
  }
  .hl-carousel-item:nth-child(2n) {
     background-color: #99a9bf;
  }

  .hl-carousel-item:nth-child(2n+1) {
     background-color: #d3dce6;
  }
</style>
