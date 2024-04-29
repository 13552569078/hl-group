<template>
  <hl-affix :offset="80" position="top">
    <hl-anchor :style="{backgroundColor: 'var(--color-bg-1)'}" :change-hash="false">
      <hl-anchor-link href="#basic">Basic</hl-anchor-link>
      <hl-anchor-link href="#line-less">LineLess Mode</hl-anchor-link>
      <hl-anchor-link href="#affix">
        Affix
        <template #sublist>
          <hl-anchor-link href="#boundary">Scroll Boundary</hl-anchor-link>
          <hl-anchor-link href="#hash">Hash mode</hl-anchor-link>
        </template>
      </hl-anchor-link>
    </hl-anchor>
  </hl-affix>
</template>
