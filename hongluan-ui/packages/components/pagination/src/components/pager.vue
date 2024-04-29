<template>
  <ul class="pager" @click="onPagerClick" @keyup.enter="onEnter">
    <li
      v-if="pageCount > 0"
      :class="{ 'is-active': currentPage === 1, disabled }"
      class="number"
      :aria-current="currentPage === 1"
      :tabindex="tabindex"
    >
      1
    </li>
    <li
      v-if="showPrevMore"
      class="pagination-phase-prev more btn-quickprev"
      :class="[{ disabled }]"
      :tabindex="tabindex"
      @mouseenter="onMouseEnter(true)"
      @mouseleave="quickPrevHover = false"
      @focus="onFocus(true)"
      @blur="quickPrevFocus = false"
    >
      <hl-icon class="icon-prev">
        <system-double-arrow-left />
      </hl-icon>
      <hl-icon class="icon-more">
        <system-more />
      </hl-icon>
    </li>
    <li
      v-for="pager in pagers"
      :key="pager"
      :class="{ 'is-active': currentPage === pager, disabled }"
      class="number"
      :aria-current="currentPage === pager"
      :tabindex="tabindex"
    >
      {{ pager }}
    </li>
    <li
      v-if="showNextMore"
      class="pagination-phase-next more btn-quicknext"
      :class="{ disabled }"
      :tabindex="tabindex"
      @mouseenter="onMouseEnter()"
      @mouseleave="quickNextHover = false"
      @focus="onFocus()"
      @blur="quickNextFocus = false"
    >
      <hl-icon class="icon-next">
        <system-double-arrow-right />
      </hl-icon>
      <hl-icon class="icon-more">
        <system-more />
      </hl-icon>
    </li>
    <li
      v-if="pageCount > 1"
      :class="{ 'is-active': currentPage === pageCount, disabled }"
      class="number"
      :aria-current="currentPage === pageCount"
      :tabindex="tabindex"
    >
      {{ pageCount }}
    </li>
  </ul>
</template>
<script lang="ts">
import { defineComponent, ref, computed, watchEffect } from 'vue'
import HlIcon from '@hongluan-ui/components/icon'
import { SystemMore, SystemDoubleArrowRight, SystemDoubleArrowLeft } from '@hongluan-ui/components/system-icon'
import { paginationPagerProps } from './pager'

export default defineComponent({
  name: 'PaginationPager',
  components: {
    HlIcon,
    SystemMore,
    SystemDoubleArrowRight,
    SystemDoubleArrowLeft,
  },
  props: paginationPagerProps,
  emits: ['change'],

  setup(props, { emit }) {
    const showPrevMore = ref(false)
    const showNextMore = ref(false)
    const quickPrevHover = ref(false)
    const quickNextHover = ref(false)
    const quickPrevFocus = ref(false)
    const quickNextFocus = ref(false)

    const pagers = computed(() => {
      const pagerCount = props.pagerCount
      const halfPagerCount = (pagerCount - 1) / 2
      const currentPage = Number(props.currentPage)
      const pageCount = Number(props.pageCount)

      let showPrevMore = false
      let showNextMore = false
      if (pageCount > pagerCount) {
        if (currentPage > pagerCount - halfPagerCount) {
          showPrevMore = true
        }
        if (currentPage < pageCount - halfPagerCount) {
          showNextMore = true
        }
      }
      const array: number[] = []
      if (showPrevMore && !showNextMore) {
        const startPage = pageCount - (pagerCount - 2)
        for (let i = startPage; i < pageCount; i++) {
          array.push(i)
        }
      } else if (!showPrevMore && showNextMore) {
        for (let i = 2; i < pagerCount; i++) {
          array.push(i)
        }
      } else if (showPrevMore && showNextMore) {
        const offset = Math.floor(pagerCount / 2) - 1
        for (let i = currentPage - offset; i <= currentPage + offset; i++) {
          array.push(i)
        }
      } else {
        for (let i = 2; i < pageCount; i++) {
          array.push(i)
        }
      }

      return array
    })

    const tabindex = computed(() => (props.disabled ? -1 : 0))

    watchEffect(() => {
      const halfPagerCount = (props.pagerCount - 1) / 2

      showPrevMore.value = false
      showNextMore.value = false

      if (props.pageCount > props.pagerCount) {
        if (props.currentPage > props.pagerCount - halfPagerCount) {
          showPrevMore.value = true
        }
        if (props.currentPage < props.pageCount - halfPagerCount) {
          showNextMore.value = true
        }
      }
    })

    function onMouseEnter(forward = false) {
      if (props.disabled) return
      if (forward) {
        quickPrevHover.value = true
      } else {
        quickNextHover.value = true
      }
    }

    function onFocus(forward = false) {
      if (forward) {
        quickPrevFocus.value = true
      } else {
        quickNextFocus.value = true
      }
    }

    function onEnter(e: UIEvent) {
      const target = e.target as HTMLElement
      if (
        target.tagName.toLowerCase() === 'li' && Array.from(target.classList).includes('number')
      ) {
        const newPage = Number(target.textContent)
        if (newPage !== props.currentPage) {
          emit('change', newPage)
        }
      } else if (
        target.tagName.toLowerCase() === 'li' && Array.from(target.classList).includes('more')
      ) {
        onPagerClick(e)
      }
    }

    function onPagerClick(event: UIEvent) {
      const target = event.target as HTMLElement
      if (target.tagName.toLowerCase() === 'ul' || props.disabled) {
        return
      }

      let newPage = Number(target.textContent)
      const pageCount = props.pageCount
      const currentPage = props.currentPage
      const pagerCountOffset = props.pagerCount - 2
      if (target.className.includes('more')) {
        if (target.className.includes('quickprev')) {
          newPage = currentPage - pagerCountOffset
        } else if (target.className.includes('quicknext')) {
          newPage = currentPage + pagerCountOffset
        }
      }
      if (!Number.isNaN(newPage)) {
        if (newPage < 1) {
          newPage = 1
        }
        if (newPage > pageCount) {
          newPage = pageCount
        }
      }
      if (newPage !== currentPage) {
        emit('change', newPage)
      }
    }

    return {
      tabindex,
      showPrevMore,
      showNextMore,
      quickPrevHover,
      quickNextHover,
      quickPrevFocus,
      quickNextFocus,
      pagers,

      onMouseEnter,
      onPagerClick,
      onEnter,
      onFocus,
    }
  },
})
</script>
