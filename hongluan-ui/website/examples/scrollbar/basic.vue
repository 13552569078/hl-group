<template>
  <hl-scrollbar height="calc(var(--lg) * 10)">
    <span v-for="item in 20" :key="item" class="display-block p-md m-b-xs bg-primary text-center text-inverse">{{ item }}</span>
  </hl-scrollbar>
</template>
