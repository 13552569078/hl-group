<template>
  <hl-carousel height="200px" direction="vertical" :autoplay="false">
    <hl-carousel-item v-for="item in 3" :key="item">
      <div class="w-full h-full bg-primary light-1 display-flex items-center items-middle text-inverse font-lg font-bold">
        {{ item }}
      </div>
    </hl-carousel-item>
  </hl-carousel>
</template>
