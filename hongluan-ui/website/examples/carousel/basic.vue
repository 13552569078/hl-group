<template>
  <hl-group full gap="var(--xxl)">
    <hl-group dir="vertical">
      <span class="demonstration">默认 Hover 指示器触发</span>
      <hl-carousel height="150px">
        <hl-carousel-item v-for="item in 4" :key="item">
          <div class="w-full h-full bg-primary light-2 display-flex items-center items-middle text-inverse font-lg font-bold">
            {{ item }}
          </div>
        </hl-carousel-item>
      </hl-carousel>
    </hl-group>

    <hl-group dir="vertical">
      <span class="demonstration">Click 指示器触发 </span>
      <hl-carousel trigger="click" indicator-type="dot" height="150px">
        <hl-carousel-item v-for="item in 4" :key="item">
          <div class="w-full h-full bg-primary light-2 display-flex items-center items-middle text-inverse font-lg font-bold">
            {{ item }}
          </div>
        </hl-carousel-item>
      </hl-carousel>
    </hl-group>
  </hl-group>
</template>
