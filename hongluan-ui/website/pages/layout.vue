<template>
  <hl-layout
    :boxed="true"
    :fixed-aside="true"
    :fixed-header="true"
    :fixed-sub-header="false"
    :full-header="true"
    :full-sub-header="false"
  >
    <hl-header style="background: rgba(var(--rgb-primary),1)" />
    <hl-sub-header style="background: rgba(var(--rgb-primary),0.8)" />
    <hl-container>
      <hl-aside>
        <hl-scrollbar>
          <div class="display-flex w-full" style="background: rgba(var(--rgb-primary),0.7); height: 4000px"></div>
        </hl-scrollbar>
      </hl-aside>
      <hl-main style="display: grid; background: rgba(var(--rgb-primary),0.5); height: 4000px">
        <hl-scrollbar>
          <div class="display-flex" style="gap: var(--md)">
            <span
              v-for="item in 20"
              :key="item"
              class="w-sm static p-md bg-primary text-center text-inverse radius-xs"
            >{{ item }}</span>
          </div>
        </hl-scrollbar>
      </hl-main>
    </hl-container>
  </hl-layout>
</template>
