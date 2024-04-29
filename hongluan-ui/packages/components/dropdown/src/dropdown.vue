<template>
  <div :class="[namespace + '-dropdown', disabled ? 'is-disabled' : '']">
    <hl-tooltip
      ref="popperRef"
      :role="role"
      :effect="effect"
      :offset="popperOffset"
      :fallback-placements="['bottom', 'top']"
      :popper-options="popperOptions"
      :gpu-acceleration="false"
      :hide-after="trigger === 'hover' ? hideTimeout : 0"
      :manual-mode="true"
      :placement="placement"
      :popper-class="[`${namespace}-dropdown-popper`, popperClass]"
      :reference-element="referenceElementRef?.$el"
      :trigger="trigger"
      :trigger-keys="triggerKeys"
      :trigger-target-el="contentRef"
      :show-after="trigger === 'hover' ? showTimeout : 0"
      :stop-popper-mouse-event="false"
      :virtual-ref="triggeringElementRef"
      :virtual-triggering="!!split"
      :disabled="disabled"
      :teleported="compatTeleported"
      transition="dropdown"
      :show-arrow="false"
      persistent
      @before-show="handleBeforeShowTooltip"
      @show="handleShowTooltip"
      @before-hide="handleBeforeHideTooltip"
    >
      <template #content>
        <hl-scrollbar ref="scrollbar" :wrap-style="wrapStyle" tag="div" view-class="dropdown-list">
          <hl-roving-focus-group
            :loop="loop"
            :current-tab-id="currentTabId"
            orientation="horizontal"
            @current-tab-id-change="handleCurrentTabIdChange"
            @entry-focus="handleEntryFocus"
          >
            <hl-dropdown-collection>
              <slot name="dropdown"></slot>
            </hl-dropdown-collection>
          </hl-roving-focus-group>
        </hl-scrollbar>
      </template>
      <template v-if="!split" #default>
        <hl-only-child :id="triggerId" role="button" :tabindex="tabindex">
          <slot name="default"></slot>
        </hl-only-child>
      </template>
    </hl-tooltip>
    <template v-if="split">
      <hl-group :class="dropdownTriggerKls" class="dropdown-button">
        <template v-if="split === 'button'">
          <hl-button
            ref="referenceElementRef"
            v-bind="buttonProps"
            :size="dropdownSize"
            :type="type"
            :disabled="disabled"
            :tabindex="tabindex"
            @click="handlerMainButtonClick"
          >
            <slot name="default"></slot>
          </hl-button>
          <hl-button
            :id="triggerId"
            ref="triggeringElementRef"
            v-bind="buttonProps"
            role="button"
            class="caret-button"
            :class="type ? 'is-active' : ''"
            :size="dropdownSize"
            :type="type"
            :disabled="disabled"
            :tabindex="tabindex"
            :aria-label="t('hl.dropdown.toggleDropdown')"
            equal
          >
            <span class="caret"></span>
          </hl-button>
        </template>
        <template v-else-if="split === 'link'">
          <span
            ref="referenceElementRef"
            :class="['text-' + type, dropdownSize, disabled ? 'is-disabled' : '']"
            style="cursor:pointer;"
            @click="() => !disabled && handlerMainButtonClick()"
          >
            <slot name="default"></slot>
          </span>
          <span
            ref="triggeringElementRef"
            :class="['text-' + type, dropdownSize, disabled ? 'is-disabled' : '', 'caret']"
            style="cursor:pointer;"
          ></span>
        </template>
      </hl-group>
    </template>
  </div>
</template>
<script lang="ts">
import {
  computed,
  defineComponent,
  getCurrentInstance,
  provide,
  ref,
  toRef,
  unref,
} from 'vue'
import HlButton from '@hongluan-ui/components/button'
import HlTooltip from '@hongluan-ui/components/tooltip'
import HlGroup from '@hongluan-ui/components/group'
import HlScrollbar from '@hongluan-ui/components/scrollbar'
import HlRovingFocusGroup from '@hongluan-ui/components/roving-focus-group'
import { HlOnlyChild } from '@hongluan-ui/components/slot'
import { useDeprecateAppendToBody } from '@hongluan-ui/components/popper'
import { addUnit } from '@hongluan-ui/utils'
import { EVENT_CODE } from '@hongluan-ui/constants'
import { useNamespace, useConsistentProp, useLocale, useId } from '@hongluan-ui/hooks'
import { HlCollection as HlDropdownCollection, dropdownProps } from './dropdown'
import { DROPDOWN_INJECTION_KEY } from './tokens'

import type { CSSProperties } from 'vue'

export default defineComponent({
  name: 'Dropdown',
  components: {
    HlButton,
    HlGroup,
    HlScrollbar,
    HlOnlyChild,
    HlDropdownCollection,
    HlTooltip,
    HlRovingFocusGroup,
  },
  props: dropdownProps,
  emits: ['visible-change', 'click', 'command'],
  setup(props, { emit }) {
    const _instance = getCurrentInstance()
    const { namespace } = useNamespace()
    const { t } = useLocale()

    const triggeringElementRef = ref()
    const referenceElementRef = ref()
    const popperRef = ref<InstanceType<typeof HlTooltip> | null>(null)
    const contentRef = ref<HTMLElement | null>(null)
    const scrollbar = ref(null)
    const currentTabId = ref<string | null>(null)
    const isUsingKeyboard = ref(false)
    const triggerKeys = [EVENT_CODE.enter, EVENT_CODE.space, EVENT_CODE.down]

    const { compatTeleported } = useDeprecateAppendToBody(
      'Dropdown',
      'popperAppendToBody',
    )
    const wrapStyle = computed<CSSProperties>(() => ({
      maxHeight: addUnit(props.maxHeight),
    }))
    const dropdownTriggerKls = computed(() => [dropdownSize.value])

    const defaultTriggerId = useId().value
    const triggerId = computed<string>(() => {
      return props.id || defaultTriggerId
    })

    function handleClick() {
      handleClose()
    }

    function handleClose() {
      popperRef.value?.onClose()
    }

    function handleOpen() {
      popperRef.value?.onOpen()
    }

    const { size: dropdownSize } = useConsistentProp()

    function commandHandler(...args: any[]) {
      emit('command', ...args)
    }

    function onItemEnter() {
      // NOOP for now
    }

    function onItemLeave() {
      const contentEl = unref(contentRef)

      contentEl?.focus()
      currentTabId.value = null
    }

    function handleCurrentTabIdChange(id: string) {
      currentTabId.value = id
    }

    function handleEntryFocus(e: Event) {
      if (!isUsingKeyboard.value) {
        e.preventDefault()
        e.stopImmediatePropagation()
      }
    }

    function handleBeforeShowTooltip() {
      emit('visible-change', true)
    }
    function handleShowTooltip(event?: Event) {
      if (event?.type === 'keydown') {
        contentRef.value.focus()
      }
    }
    function handleBeforeHideTooltip() {
      emit('visible-change', false)
    }

    provide(DROPDOWN_INJECTION_KEY, {
      contentRef,
      role: computed(() => props.role),
      triggerId,
      isUsingKeyboard,
      onItemEnter,
      onItemLeave,
    })

    provide('hlDropdown', {
      instance: _instance,
      dropdownSize,
      handleClick,
      commandHandler,
      trigger: toRef(props, 'trigger'),
      hideOnClick: toRef(props, 'hideOnClick'),
    })

    const onFocusAfterTrapped = (e: Event) => {
      e.preventDefault()
      contentRef.value?.focus?.({
        preventScroll: true,
      })
    }

    const handlerMainButtonClick = (event: MouseEvent) => {
      emit('click', event)
    }

    return {
      t,
      namespace,
      scrollbar,
      wrapStyle,
      dropdownTriggerKls,
      dropdownSize,
      triggerId,
      triggerKeys,
      currentTabId,
      compatTeleported,
      handleCurrentTabIdChange,
      handlerMainButtonClick,
      handleEntryFocus,
      handleClose,
      handleOpen,
      handleBeforeShowTooltip,
      handleShowTooltip,
      handleBeforeHideTooltip,
      onFocusAfterTrapped,
      popperRef,
      contentRef,
      triggeringElementRef,
      referenceElementRef,
    }
  },
})
</script>
