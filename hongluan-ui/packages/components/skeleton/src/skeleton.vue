<template>
  <template v-if="uiLoading">
    <div
      :class="[namespace, animated ? 'is-animated' : '']"
      v-bind="$attrs"
    >
      <template v-for="i in count" :key="i">
        <slot v-if="loading" :key="i" name="template">
          <hl-skeleton-item class="is-first" variant="p" />
          <hl-skeleton-item
            v-for="item in rows"
            :key="item"
            :class="{
              'paragraph': true,
              'is-last': item === rows && rows > 1,
            }"
            variant="p"
          />
        </slot>
      </template>
    </div>
  </template>
  <template v-else>
    <slot v-bind="$attrs"></slot>
  </template>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useThrottleRender, useNamespace } from '@hongluan-ui/hooks'
import HlSkeletonItem from './skeleton-item.vue'
import { skeletonProps } from './skeleton'

export default defineComponent({
  name: 'Skeleton',
  components: {
    HlSkeletonItem,
  },
  props: skeletonProps,
  setup(props) {
    const { namespace } = useNamespace('skeleton')
    const innerLoading = computed(() => props.loading)

    const uiLoading = useThrottleRender(innerLoading, props.throttle)

    return {
      namespace,
      uiLoading,
    }
  },
})
</script>
