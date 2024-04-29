<template>
  <hl-popover
    ref="popover"
    placement="right"
    title="Title"
    :width="200"
    trigger="focus"
    content="this is content, this is content, this is content"
  >
    <template #reference>
      <hl-button>Focus to activate</hl-button>
    </template>
  </hl-popover>
</template>
