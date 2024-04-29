<template>
  <hl-row style="margin-block-end: 8px">
    <hl-button size="large">Large</hl-button>
    <hl-button>Default</hl-button>
    <hl-button size="small">Small</hl-button>
    <hl-button size="large" :icon="TwoSearch">Search</hl-button>
    <hl-button :icon="TwoSearch">Search</hl-button>
    <hl-button size="small" :icon="TwoSearch">Search</hl-button>
  </hl-row>
  <hl-row style="margin-block-end: 8px">
    <hl-button size="large" round>Large</hl-button>
    <hl-button round>Default</hl-button>
    <hl-button size="small" round>Small</hl-button>
    <hl-button size="large" :icon="TwoSearch" round>Search</hl-button>
    <hl-button :icon="TwoSearch" round>Search</hl-button>
    <hl-button size="small" :icon="TwoSearch" round>Search</hl-button>
  </hl-row>
  <hl-row style="margin-block-end: 8px">
    <hl-button :icon="TwoSearch" size="large" circle />
    <hl-button :icon="TwoSearch" circle />
    <hl-button :icon="TwoSearch" size="small" circle />
  </hl-row>
</template>

<script setup lang="ts">
import { TwoSearch } from '@hongluan-ui/icons'
</script>
