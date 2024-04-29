<template>
  <hl-carousel :interval="4000" type="card" height="200px">
    <hl-carousel-item v-for="item in 6" :key="item">
      <div class="w-full h-full bg-primary light-1 display-flex items-center items-middle text-inverse font-lg font-bold">
        {{ item }}
      </div>
    </hl-carousel-item>
  </hl-carousel>
</template>
