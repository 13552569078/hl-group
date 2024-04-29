<template>
  <hl-tooltip
    ref="popper"
    :visible="popperVisible"
    :teleported="compatTeleported"
    :offset="popperOffset"
    :placement="placement"
    :popper-class="`${namespace}-popper ${popperClass}`"
    :fallback-placements="fallbackPlacements"
    :stop-popper-mouse-event="false"
    :show-arrow="false"
    transition="dropdown"
    :gpu-acceleration="false"
    persistent
    @hide="afterLeave"
  >
    <div
      v-clickoutside:[popperPaneRef]="() => togglePopperVisible(false)"
      :class="[
        namespace,
        realSize && `cascader-${realSize}`,
        {
          'is-disabled': isDisabled,
          'block': block,
        },
        $attrs.class,
      ]"
      :style="$attrs.style"
      @click="() => togglePopperVisible(readonly ? undefined : true)"
      @keydown="handleKeyDown"
      @mouseenter="inputHover = true"
      @mouseleave="inputHover = false"
      @click.stop
    >
      <hl-input
        ref="input"
        v-model="inputValue"
        :placeholder="currentPlaceholder"
        :readonly="readonly"
        :disabled="isDisabled"
        :validate-event="false"
        :fill="realFill"
        :thin="thin"
        :round="round"
        :size="realSize"
        :class="{
          'is-focus': popperVisible,
          'is-tags': presentTags.length,
        }"
        :input-style="inputStyle"
        @compositionstart="handleComposition"
        @compositionupdate="handleComposition"
        @compositionend="handleComposition"
        @focus="e => $emit('focus', e)"
        @blur="e => $emit('blur', e)"
        @input="handleInput"
      >
        <template v-if="multiple" #tags>
          <div v-if="presentTags.length" ref="tagWrapper" class="input-tags">
            <hl-tag
              v-for="tag in presentTags"
              :key="tag.key"
              :type="tagType"
              :active="tag.hitState"
              :closable="tag.closable"
              :size="realSize"
              disable-transitions
              @close="deleteTag(tag)"
            >
              <template v-if="tag.isCollapseTag === false">
                <slot name="tag" :tag="tag">
                  {{ tag.text }}
                </slot>
              </template>
              <template v-else>
                <hl-tooltip
                  :teleported="false"
                  :disabled="popperVisible || !collapseTagsTooltip"
                  :fallback-placements="['bottom', 'top', 'right', 'left']"
                  placement="bottom"
                  :show-arrow="false"
                  :popper-class="`collapse-tags-popper`"
                >
                  <template #default>
                    <slot name="tag" :tag="tag">
                      {{ tag.text }}
                    </slot>
                  </template>
                  <template #content>
                    <div class="collapse-tags">
                      <template
                        v-for="tag2 in allPresentTags.slice(1)"
                        :key="tag2.key"
                      >
                        <hl-tag
                          class="in-tooltip collapse-tag"
                          :type="tagType"
                          :size="realSize"
                          :hit="tag2.hitState"
                          :closable="tag2.closable"
                          disable-transitions
                          @close="deleteTag(tag2)"
                        >
                          <slot name="collapse-tag" :tag="tag2">
                            {{ tag2.text }}
                          </slot>
                        </hl-tag>
                      </template>
                    </div>
                  </template>
                </hl-tooltip>
              </template>
            </hl-tag>

            <input
              v-if="filterable && !isDisabled"
              v-model="searchInputValue"
              type="text"
              class="selector-input"
              @input="e => handleInput(searchInputValue, e)"
              @click.stop="togglePopperVisible(true)"
              @keydown.delete="handleDelete"
              @compositionstart="handleComposition"
              @compositionupdate="handleComposition"
              @compositionend="handleComposition"
            >
          </div>
        </template>
        <template v-if="$slots.prefix" #prefix>
          <slot name="prefix"></slot>
        </template>
        <template #suffix>
          <hl-icon :class="['select-caret', popperVisible ? 'is-open' : '', !clearBtnVisible ? 'visible' : '']" @click.stop="togglePopperVisible()">
            <system-select-arrow />
          </hl-icon>
          <hl-icon key="clear" :class="['select-close', clearBtnVisible ? 'visible' : '']" @click.stop="handleClear">
            <system-close />
          </hl-icon>
        </template>
      </hl-input>
    </div>

    <template #content>
      <div class="selector-dropdown">
        <slot></slot>
      </div>
    </template>
  </hl-tooltip>
</template>

<script lang='ts'>
import { computed, defineComponent, nextTick, onMounted, ref, watch } from 'vue'
import HlInput from '@hongluan-ui/components/input'
import HlTooltip, { useTooltipContentProps } from '@hongluan-ui/components/tooltip'
import HlIcon from '@hongluan-ui/components/icon'
import { SystemSelectArrow, SystemClose } from '@hongluan-ui/components/system-icon'
import HlTag, { tagProps } from '@hongluan-ui/components/tag'
import { ClickOutside as Clickoutside } from '@hongluan-ui/directives'
import { useDeprecateAppendToBody } from '@hongluan-ui/components/popper'
import { useLocale, useConsistentProp, useNamespace } from '@hongluan-ui/hooks'
import { EVENT_CODE } from '@hongluan-ui/constants'
import { isClient, useResizeObserver } from '@vueuse/core'
import { isValidComponentSize, isKorean } from '@hongluan-ui/utils'

import type { PropType, Ref } from 'vue'
import type { ComponentSize } from '@hongluan-ui/constants'

export interface Tag {
  key: string | number
  text: unknown
  hitState?: boolean
  closable?: boolean
  isCollapseTag: boolean
}

export default defineComponent({
  name: 'Selector',

  components: {
    HlInput,
    HlTooltip,
    HlTag,
    HlIcon,
    SystemSelectArrow,
    SystemClose,
  },

  directives: {
    Clickoutside,
  },

  props: {
    size: {
      type: String as PropType<ComponentSize>,
      validator: isValidComponentSize,
    },
    placeholder: {
      type: String,
    },
    disabled: Boolean,
    clearable: Boolean,
    filterable: Boolean,
    collapseTags: Boolean,
    collapseTagsTooltip: {
      type: Boolean,
      default: false,
    },
    placement: {
      type: String,
      default: 'bottom-start',
    },
    fallbackPlacements: {
      type: Array as PropType<Array<string>>,
      default: () => [],
    },
    popperClass: {
      type: String,
      default: '',
    },
    block: {
      type: Boolean,
      default: false,
    },
    inputStyle: {
      type: Object,
      default: () => ({}),
    },
    multiple: {
      type: Boolean,
      default: false,
    },
    popperAppendToBody: {
      type: Boolean,
      default: undefined,
    },
    teleported: useTooltipContentProps.teleported,
    fill: Boolean,
    round: Boolean,
    thin: Boolean,
    popperOffset: {
      type: Number,
      default: 4,
    },
    // eslint-disable-next-line vue/require-prop-types
    tagType: { ...tagProps.type, default: '' },
  },

  emits: [
    'focus',
    'blur',
    'input',
    'resize',
    'after-leave',
    'keyboard-down',
    'visible-change',
    'popper-visible',
    'remove-tag',
    'clear',
  ],

  setup(props, { emit }) {
    const { namespace } = useNamespace('selector')
    const { t } = useLocale()
    const { compatTeleported } = useDeprecateAppendToBody(
      'Selector',
      'popperAppendToBody',
    )

    let pressDeleteCount = 0

    const popper = ref(null)
    const input = ref(null)
    const tagWrapper = ref(null)
    const panel = ref(null)
    const popperVisible = ref(false)
    const inputHover = ref(false)
    const inputValue = ref('')
    const searchInputValue = ref('')
    const presentTags: Ref<Tag[]> = ref([])
    const allPresentTags: Ref<Tag[]> = ref([])
    const presentText = ref<unknown>('')
    const checkedNodes = ref<unknown[]>([])
    const isOnComposition = ref(false)

    const { size: realSize, disabled: isDisabled, fill: realFill } = useConsistentProp()
    const readonly = computed(() => !props.filterable)
    const inputPlaceholder = computed(() => props.placeholder || t('hl.cascader.placeholder'))
    const clearBtnVisible = computed(() => {
      if (
        !props.clearable ||
        isDisabled.value ||
        !inputHover.value
      ) return false

      return props.multiple ? !!checkedNodes.value.length : !!presentText.value
    })
    const currentPlaceholder = computed(() =>
      searchInputValue.value || presentTags.value.length > 0
        ? ''
        : inputPlaceholder.value,
    )

    const popperPaneRef = computed(() => {
      return popper.value?.popperRef?.contentRef
    })

    const setValue = (val: unknown | unknown[]) => {
      if (Array.isArray(val)) {
        checkedNodes.value = [...val]
      } else {
        presentText.value = val
      }
    }

    const afterLeave = () => {
      emit('after-leave')
    }

    const togglePopperVisible = (visible?: boolean) => {
      if (isDisabled.value) return

      visible = visible ?? !popperVisible.value

      if (visible !== popperVisible.value) {
        popperVisible.value = visible
        input.value?.input?.setAttribute('aria-expanded', `${visible}`)

        if (visible) {
          updatePopperPosition()
          nextTick(() => {
            emit('popper-visible')
          })
        } else if (props.filterable) {
          if (props.multiple) {
            searchInputValue.value = ''
          } else {
            const { value } = presentText
            inputValue.value = value as string
          }
          emit('input', '')
        }

        emit('visible-change', visible)
      }
    }

    const updatePopperPosition = () => {
      nextTick(popper.value?.updatePopper)
    }

    const genTag = (node: unknown): Tag => {
      return {
        key: String(Math.random()),
        text: node,
        hitState: false,
        closable: !isDisabled.value,
        isCollapseTag: false,
      }
    }

    const deleteTag = (tag: Tag) => {
      checkedNodes.value = checkedNodes.value.filter(cn => cn !== tag.text)
      !checkedNodes.value.length && resetInput()
      emit('remove-tag', tag)
    }

    const calculatePresentTags = () => {
      if (!props.multiple) return

      const nodes = checkedNodes.value
      const tags: Tag[] = []

      const allTags: Tag[] = []
      nodes.forEach(node => allTags.push(genTag(node)))
      allPresentTags.value = allTags

      if (nodes.length) {
        const [first, ...rest] = nodes
        const restCount = rest.length

        tags.push(genTag(first))

        if (restCount) {
          if (props.collapseTags) {
            tags.push({
              key: '-1',
              text: `+ ${restCount}`,
              closable: false,
              isCollapseTag: true,
            })
          } else {
            rest.forEach(node => tags.push(genTag(node)))
          }
        }
      }

      presentTags.value = tags
    }

    const updateTags = (cb: (tag: Tag) => void) => {
      presentTags.value.forEach(cb)
      allPresentTags.value.forEach(cb)
    }

    const focusFirstNode = () => {
      emit('keyboard-down')
    }

    const updateStyle = () => {
      const inputInner = input.value?.input
      const tagWrapperEl = tagWrapper.value

      if (!isClient || !inputInner) return

      emit('resize', input.value.$el)

      if (tagWrapperEl) {
        updatePopperPosition()
      }
    }

    const handleComposition = (event: CompositionEvent) => {
      const text = (event.target as HTMLInputElement)?.value
      if (event.type === 'compositionend') {
        isOnComposition.value = false
        nextTick(() => handleInput(text))
      } else {
        const lastCharacter = text[text.length - 1] || ''
        isOnComposition.value = !isKorean(lastCharacter)
      }
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (isOnComposition.value) return

      switch (e.code) {
        case EVENT_CODE.enter:
          togglePopperVisible()
          break
        case EVENT_CODE.down:
          togglePopperVisible(true)
          nextTick(focusFirstNode)
          e.preventDefault()
          break
        case EVENT_CODE.esc:
          if (popperVisible.value === true) {
            e.preventDefault()
            e.stopPropagation()
            togglePopperVisible(false)
          }
          break
        case EVENT_CODE.tab:
          togglePopperVisible(false)
          break
      }
    }

    const handleClear = () => {
      togglePopperVisible(false)
      emit('clear')
      // Maybe need sync from commit: Element+ 6ac49834e
      resetInput()
    }

    const resetInput = () => {
      checkedNodes.value = []
      presentText.value = ''
      inputValue.value = ''
      searchInputValue.value = ''
    }

    const handleDelete = () => {
      const tags = presentTags.value
      const lastTag = tags[tags.length - 1]
      pressDeleteCount = searchInputValue.value ? 0 : pressDeleteCount + 1

      if (!lastTag || !pressDeleteCount || (props.collapseTags && tags.length > 1)) return

      if (lastTag.hitState) {
        deleteTag(lastTag)
      } else {
        lastTag.hitState = true
      }
    }

    const handleInput = (val: string, e?: KeyboardEvent) => {
      !popperVisible.value && togglePopperVisible(true)

      if (e?.isComposing) return

      emit('input', val)
    }

    watch([checkedNodes, isDisabled, () => props.collapseTags], calculatePresentTags)

    watch(presentTags, () => {
      nextTick(() => updateStyle())
    })

    watch(presentText,
      val => inputValue.value = val as string,
      { immediate: true },
    )

    onMounted(() => {
      const inputEl = input.value?.$el
      useResizeObserver(inputEl, updateStyle)
    })

    return {
      namespace,
      compatTeleported,
      popper,
      popperPaneRef,
      input,
      tagWrapper,
      panel,
      popperVisible,
      inputHover,
      presentText,
      checkedNodes,
      inputValue,
      inputPlaceholder,
      searchInputValue,
      currentPlaceholder,
      presentTags,
      allPresentTags,
      isDisabled,
      isOnComposition,
      realSize,
      realFill,
      readonly,
      clearBtnVisible,
      setValue,
      afterLeave,
      t,
      togglePopperVisible,
      updatePopperPosition,
      deleteTag,
      updateTags,
      focusFirstNode,
      handleKeyDown,
      handleComposition,
      handleClear,
      handleDelete,
      handleInput,
    }
  },
})
</script>
