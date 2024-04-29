<template>
  <hv-panel title="滑动式面板">
    <template #action>
      <hl-group align="items-middle" gap="var(--md)" :class="['toggle-goback', !showCard ? 'show' : '']">
        <span class="cursor-pointer" @click="toggleCard(true)">返回</span>
      </hl-group>
    </template>
    <!-- <hl-spinner color="var(--stateDanger)" duration="5000ms" class="effects-satellite" size="200px" style="top: 400px">
      <svg viewBox="0 0 1458 1458">
        <defs>
          <linearGradient id="linearGradient-1" x1="21.2111032%" y1="29.6970602%" x2="4.98607873%" y2="27.7755834%">
            <stop stop-color="#ABCBD8" stop-opacity="0" offset="0%" />
            <stop stop-color="#6DFFFF" offset="100%" />
          </linearGradient>
        </defs>
        <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" opacity="0.800000012" stroke-linejoin="round">
          <g stroke="url(#linearGradient-1)" stroke-width="4">
            <circle cx="729" cy="729" r="723" />
          </g>
        </g>
      </svg>
    </hl-spinner>

    <hl-spinner color="var(--stateDanger)" duration="2400ms" animation="around-left" class="effects-satellite" size="170px" style="top: 415px">
      <svg viewBox="0 0 1458 1458">
        <defs>
          <linearGradient id="linearGradient-1" x1="48.400069%" y1="95.292904%" x2="46.7436163%" y2="50%">
            <stop stop-color="#6DFFFF" offset="0.0746080092%" />
            <stop stop-color="#008A96" stop-opacity="0" offset="100%" />
          </linearGradient>
        </defs>
        <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" opacity="0.800000012" stroke-linejoin="round">
          <g stroke="url(#linearGradient-1)" stroke-width="5">
            <ellipse cx="729" cy="729.000411" rx="723" ry="723.000411" />
          </g>
        </g>
      </svg>
    </hl-spinner> -->

    <div class="toggle-panel m-t-md" style="height: calc(var(--xl) * 3)">
      <div :class="['card-1', showCard ? 'show' : '']">
        <hl-button @click="toggleCard(false)">面板1</hl-button>
      </div>
      <div :class="['card-2', !showCard ? 'show' : '']">
        <hl-button @click="toggleCard(true)">面板2</hl-button>
      </div>
    </div>
  </hv-panel>
</template>

<script lang="ts">
import { HlButton, HlGroup } from 'hongluan-ui'
import { defineComponent, ref } from 'vue'

export default defineComponent({
  components: {
    HlButton,
    HlGroup,
  },

  setup() {
    const showCard = ref(true)
    const toggleCard = (type: boolean) => {
      showCard.value = type
    }
    return {
      showCard,
      toggleCard,
    }
  },
})
</script>
