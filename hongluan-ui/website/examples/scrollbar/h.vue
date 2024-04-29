<template>
  <hl-scrollbar>
    <div class="display-flex" style="gap: var(--md)">
      <span v-for="item in 20" :key="item" class="w-sm static p-md bg-primary text-center text-inverse">{{ item }}</span>
    </div>
  </hl-scrollbar>
</template>
