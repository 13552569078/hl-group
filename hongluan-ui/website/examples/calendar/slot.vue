<template>
  <hl-calendar>
    <template #date-cell="{data}">
      <p :class="data.isSelected ? 'is-selected' : ''">
        {{ data.day.split('-').slice(1).join('-') }} {{ data.isSelected ? '✔️' :
          '' }}
      </p>
    </template>
  </hl-calendar>
</template>

<style>
  .is-selected {
    color: #1989fa;
  }
</style>
