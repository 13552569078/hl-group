<template>
  <hl-dropdown @visible-change="data.isShowdropdown = !data.isShowdropdown">
    <hl-button :disabled="disabled" type="primary" class="btn-more-action" icon-position="left" style="--button-height: calc(var(--xs) * 6); --button-padding-x: calc(var(--xs) * 2); --form-icon-size: var(--xxl);">
      {{ text }}
      <hl-icon class="dropdown-arrow">
        <SystemArrowDown />
      </hl-icon>
      <template #icon>
        <hl-icon>
          <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="btnMore-Dark" x1="1.51499155%" y1="30.5343083%" x2="100%" y2="30.5343083%">
                <stop stop-color="#7AC1FF" offset="0%" />
                <stop stop-color="#36A4FF" offset="100%" />
              </linearGradient>
              <linearGradient id="btnMore-Light" x1="50%" y1="0%" x2="50%" y2="99.889147%">
                <stop stop-color="#FFFFFF" offset="0%" />
                <stop stop-color="#BAE0FF" offset="100%" />
              </linearGradient>
            </defs>
            <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
              <polygon fill-opacity="0.5" fill="currentColor" points="6 3 26 3 26 30 6 30" />
              <polygon fill-opacity="0.3" fill="currentColor" transform="translate(16.000000, 18.500000) rotate(-270.000000) translate(-16.000000, -18.500000) " points="6.5 5.5 25.5 5.5 25.5 31.5 6.5 31.5" />
              <polygon :fill="disabled ? 'url(#btnMore-Dark)': 'url(#btnMore-Light)'" points="13.0142796 2 27 2 27 30 5 30 5 11.991862" />
              <path d="M16.6446452,15.3665437 L16.6446452,18.6334563 L14.6446452,18.6334563 L14.6446452,15.3665437 L16.6446452,15.3665437 Z M20.6334563,15.3665437 L20.6334563,18.6334563 L18.6334563,18.6334563 L18.6334563,15.3665437 L20.6334563,15.3665437 Z M10.6334563,18.6334563 L10.6334563,15.3665437 L12.6334563,15.3665437 L12.6334563,18.6334563 L10.6334563,18.6334563 Z" :fill="disabled ? '#FFFFFF' : '#6CBCFF' " fill-rule="nonzero" />
            </g>
          </svg>
        </hl-icon>
      </template>
    </hl-button>
    <template #dropdown>
      <hl-dropdown-menu class="more-action-dropdown-menu">
        <hl-dropdown-item v-for="(item, idx) in options" :key="idx" v-bind="item">
          {{ item.label }}
        </hl-dropdown-item>
      </hl-dropdown-menu>
    </template>
  </hl-dropdown>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'
import { HlDropdown, HlDropdownItem, HlDropdownMenu, HlButton, HlIcon, SystemArrowDown } from 'hongluan-ui'

export default defineComponent({
  components: { HlDropdown, HlDropdownItem, HlDropdownMenu, HlButton, HlIcon, SystemArrowDown },
  props: {
    options: {
      type: Array,
      defualt: () => [],
    },
    disabled: Boolean,
    text: {
      type: String,
      default: '更多操作',
    },
  },
  setup() {
    const data = reactive({
      isShowdropdown: false,
    })
    return {
      data,
    }
  },
})


</script>

