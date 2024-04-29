<template>
  <p>使用<code>full</code>属性将同时自适应宽度和高度</p>
  <hl-row class="m-t-md" gap="var(--lg)">
    <hl-col span="col">
      <hl-group merge indent full dir="vertical" style="height:20vh">
        <hl-group class="display-flex border border-primary items-center items-middle radius-lg text-primary">
          <span>Auto</span>
        </hl-group>
        <div class="display-flex border border-primary items-center items-middle radius-lg text-primary">Auto</div>
        <div class="display-flex border border-primary items-center items-middle radius-lg text-primary">Auto</div>
      </hl-group>
    </hl-col>
    <hl-col span="col">
      <hl-group merge indent full style="height:20vh">
        <div class="display-flex border border-primary items-center items-middle radius-lg text-primary">Auto</div>
        <div class="display-flex border border-primary items-center items-middle radius-lg text-primary">Auto</div>
        <div class="display-flex border border-primary items-center items-middle radius-lg text-primary">Auto</div>
      </hl-group>
    </hl-col>
  </hl-row>

  <hl-row class="m-t-lg" gap="var(--lg)">
    <hl-col span="col">
      <p class="m-b-md">横向自适应<code>full-x</code></p>
      <hl-group merge indent full="full-x" class="m-b-md">
        <div class="display-flex border border-primary items-center items-middle radius-lg text-primary p-xs">Auto</div>
        <div class="display-flex border border-primary items-center items-middle radius-lg text-primary p-xs">Auto</div>
      </hl-group>
      <hl-group dir="vertical" merge indent full="full-x">
        <div class="display-flex border border-primary items-center items-middle radius-lg text-primary p-xs">Auto</div>
        <div class="display-flex border border-primary items-center items-middle radius-lg text-primary p-xs">Auto</div>
      </hl-group>
    </hl-col>
    <hl-col span="col">
      <p class="m-b-md">纵向自适应<code>full-y</code></p>
      <hl-group full>
        <hl-group
          merge
          indent
          dir="vertical"
          full="full-y"
          class="w-full"
          style="height:135px"
        >
          <div class="display-flex border border-primary items-center items-middle radius-lg text-primary p-xs">Auto</div>
        </hl-group>
        <hl-group
          merge
          indent
          dir="vertical"
          full="full-y"
          class="w-full"
          style="height:135px"
        >
          <div class="display-flex border border-primary items-center items-middle radius-lg text-primary p-xs">Auto</div>
          <div class="display-flex border border-primary items-center items-middle radius-lg text-primary p-xs">Auto</div>
        </hl-group>
        <hl-group
          merge
          indent
          dir="vertical"
          full="full-y"
          class="w-full"
          style="height:135px"
        >
          <div class="display-flex border border-primary items-center items-middle radius-lg text-primary p-xs">Auto</div>
          <div class="display-flex border border-primary items-center items-middle radius-lg text-primary p-xs">Auto</div>
          <div class="display-flex border border-primary items-center items-middle radius-lg text-primary p-xs">Auto</div>
        </hl-group>
      </hl-group>
    </hl-col>
  </hl-row>
</template>
