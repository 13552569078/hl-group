<template>
  <div :class="[namespace, `is-${parent.props.dir}`, isCenter && !isVertical && 'is-center', `is-${currentStatus}`]">
    <!-- icon & line -->
    <div class="step-head">
      <div class="step-line"></div>

      <div
        :class="[
          'step-icon',
          `is-${$slots.icon ? 'icon' : 'text'}`,
          parent.props.round ? 'round' : '',
        ]"
      >
        <slot v-if="currentStatus !== 'success' && currentStatus !== 'error'" name="icon">
          <div v-if="!$slots.icon" class="icon-inner">{{ index + 1 }}</div>
        </slot>
        <slot v-else-if="currentStatus == 'success'" name="success-icon">
          <hl-icon :class="['icon-inner', 'is-status']">
            <system-checked />
          </hl-icon>
        </slot>
        <slot v-else-if="currentStatus == 'error'" name="error-icon">
          <hl-icon :class="['icon-inner', 'is-status']">
            <system-close />
          </hl-icon>
        </slot>
      </div>
    </div>
    <!-- title & description -->
    <div class="step-main">
      <div class="step-title">
        <slot name="title">{{ title }}</slot>
      </div>

      <div v-if="description || $slots.description" class="step-description">
        <slot name="description">{{ description }}</slot>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, inject, watch, onBeforeUnmount, onMounted, getCurrentInstance, reactive } from 'vue'
import { useNamespace } from '@hongluan-ui/hooks'
import HlIcon from '@hongluan-ui/components/icon'
import { SystemChecked, SystemClose } from '@hongluan-ui/components/system-icon'
import { stepProps } from './item'

import type { Ref } from 'vue'

export interface IStepsProps {
  active: number
  dir: string
  center: boolean
  finishStatus: string
  processStatus: string
  round: string
}

export interface StepItemState {
  uid: number | undefined
  currentStatus: string
  setIndex: (val: number) => void
  // calcProgress: (status: string) => void
}

export interface IStepsInject {
  props: IStepsProps
  steps: Ref<StepItemState[]>
}

export default defineComponent({
  name: 'Step',
  components: {
    HlIcon,
    SystemChecked,
    SystemClose,
  },
  props: stepProps,
  setup(props) {
    const { namespace } = useNamespace('step')
    const index = ref(-1)
    const internalStatus = ref('')
    const parent: IStepsInject = inject('Steps')
    const currentInstance = getCurrentInstance()

    onMounted(() => {
      watch(
        [() => parent.props.active, () => parent.props.processStatus, () => parent.props.finishStatus],
        ([active]) => {
          updateStatus(active)
        },
        { immediate: true },
      )
    })

    onBeforeUnmount(() => {
      parent.steps.value = parent.steps.value.filter(instance => instance.uid !== currentInstance.uid)
    })

    const currentStatus = computed(() => {
      return props.status || internalStatus.value
    })
    const prevStatus = computed(() => {
      const prevStep = parent.steps.value[index.value - 1]
      return prevStep ? prevStep.currentStatus : 'wait'
    })
    const isCenter = computed(() => {
      return parent.props.center
    })
    const isVertical = computed(() => {
      return parent.props.dir === 'vertical'
    })

    const stepsCount = computed(() => {
      return parent.steps.value.length
    })
    const isLast = computed(() => {
      return parent.steps.value[stepsCount.value - 1]?.uid === currentInstance.uid
    })

    const setIndex = (val: number) => {
      index.value = val
    }

    const updateStatus = (activeIndex: number) => {
      if (activeIndex > index.value) {
        internalStatus.value = parent.props.finishStatus
      } else if (activeIndex === index.value && prevStatus.value !== 'error') {
        internalStatus.value = parent.props.processStatus
      } else {
        internalStatus.value = 'wait'
      }
    }

    const stepItemState = reactive({
      uid: computed(() => currentInstance.uid),
      currentStatus,
      setIndex,
    })
    parent.steps.value = [...parent.steps.value, stepItemState]

    return {
      namespace,
      index,
      currentStatus,
      isCenter,
      isVertical,
      isLast,
      parent,
      setIndex,
      updateStatus,
    }
  },
})
</script>
