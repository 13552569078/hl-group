import {
  defineComponent,
  getCurrentInstance,
  provide,
  ref,
  renderSlot,
  watch,
  computed,
  nextTick,
} from 'vue'
import {
  buildProps,
  definePropType,
  isFunction,
  isNumber,
  isString,
  isUndefined,
} from '@hongluan-ui/utils'
import {
  EVENT_CODE,
  INPUT_EVENT,
  UPDATE_MODEL_EVENT,
} from '@hongluan-ui/constants'
import HlIcon from '@hongluan-ui/components/icon'
import { SystemAdd } from '@hongluan-ui/components/system-icon'
import { tabsRootContextKey } from '@hongluan-ui/tokens'
import { useDeprecated, useNamespace, useOrderedChildren } from '@hongluan-ui/hooks'
import TabNav from './tab-nav'
import type { TabNavInstance } from './tab-nav'
import type { TabsPaneContext } from '@hongluan-ui/tokens'

import type { ExtractPropTypes } from 'vue'
import type { Awaitable } from '@hongluan-ui/utils'

export type TabPaneName = string | number

export const tabsProps = buildProps({
  type: {
    type: String,
    values: ['line', 'button', ''],
    default: '',
  },
  activeName: {
    type: [String, Number],
  },
  closable: Boolean,
  addable: Boolean,
  modelValue: {
    type: [String, Number],
  },
  editable: Boolean,
  tabPosition: {
    type: String,
    values: ['top', 'right', 'bottom', 'left'],
    default: 'top',
  },
  beforeLeave: {
    type: definePropType<
    (
    newName: TabPaneName,
    oldName: TabPaneName
    ) => Awaitable<void | boolean>
    >(Function),
    default: () => true,
  },
  showPane: {
    type: Boolean,
    default: true,
  },
  paneHeight: {
    type: String,
  },
  navHeight: {
    type: String,
  },
  navPadding: {
    type: String,
  },
  gap: {
    type: String,
  },
  stretch: Boolean,
} as const)
export type TabsProps = ExtractPropTypes<typeof tabsProps>

const isPanelName = (value: unknown): value is string | number =>
  isString(value) || isNumber(value)

export const tabsEmits = {
  [UPDATE_MODEL_EVENT]: (name: TabPaneName) => isPanelName(name),
  /** @deprecated use `tab-change` instead */
  [INPUT_EVENT]: (name: TabPaneName) => isPanelName(name),
  tabClick: (pane: TabsPaneContext, ev: Event) => ev instanceof Event,
  tabChange: (name: TabPaneName) => isPanelName(name),
  edit: (paneName: TabPaneName | undefined, action: 'remove' | 'add') =>
    ['remove', 'add'].includes(action),
  tabRemove: (name: TabPaneName) => isPanelName(name),
  tabAdd: () => true,
}
export type TabsEmits = typeof tabsEmits
export type TabsPanes = Record<number, TabsPaneContext>

export default defineComponent({
  name: 'Tabs',

  props: tabsProps,
  emits: tabsEmits,

  setup(props, { emit, slots, expose }) {
    const {
      children: panes,
      addChild: registerPane,
      removeChild: unregisterPane,
    } = useOrderedChildren<TabsPaneContext>(getCurrentInstance()!, 'TabPane')

    const instance = getCurrentInstance()!
    const nav$ = ref<TabNavInstance>()
    const currentName = ref<TabPaneName>(
      props.modelValue ?? props.activeName ?? '0',
    )

    useDeprecated(
      {
        scope: 'Tabs',
        type: 'Event',
        from: 'input',
        replacement: 'tab-change',
        version: '2.5.0',
        ref: 'https://cestc-aqyj.github.io/hongluan-ui/2x/#/zh-CN/component/tabs.html#tabs-events',
      },
      computed(() => isFunction(instance.vnode.props?.onInput)),
    )

    useDeprecated(
      {
        from: '"activeName"',
        replacement: '"model-value" or "v-model"',
        scope: 'Tabs',
        version: '2.5.0',
        ref: 'https://cestc-aqyj.github.io/hongluan-ui/2x/#/zh-CN/component/tabs.html#attributes',
        type: 'Attribute',
      },
      computed(() => !!props.activeName),
    )

    const { namespace } = useNamespace('tabs')

    const changeCurrentName = (value: TabPaneName) => {
      currentName.value = value
      /** @deprecated use `tab-change` instead */
      emit(INPUT_EVENT, value)
      emit(UPDATE_MODEL_EVENT, value)
      emit('tabChange', value)
    }

    const setCurrentName = async (value?: TabPaneName) => {
      // should do nothing.
      if (currentName.value === value || isUndefined(value)) return

      try {
        const canLeave = await props.beforeLeave?.(value, currentName.value)
        if (canLeave !== false) {
          changeCurrentName(value)

          // call exposed function, Vue doesn't support expose in typescript yet.
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-expect-error
          nav$.value?.removeFocus?.()
        }
      } catch {}
    }

    const handleTabClick = (
      tab: TabsPaneContext,
      tabName: TabPaneName,
      event: Event,
    ) => {
      if (tab.props.disabled) return
      setCurrentName(tabName)
      emit('tabClick', tab, event)
    }

    const handleTabRemove = (pane: TabsPaneContext, ev: Event) => {
      if (pane.props.disabled || isUndefined(pane.props.name)) return
      ev.stopPropagation()
      emit('edit', pane.props.name, 'remove')
      emit('tabRemove', pane.props.name)
    }

    const handleTabAdd = () => {
      emit('edit', undefined, 'add')
      emit('tabAdd')
    }

    watch(
      () => props.activeName,
      modelValue => setCurrentName(modelValue),
    )

    watch(
      () => props.modelValue,
      modelValue => setCurrentName(modelValue),
    )

    watch(currentName, async () => {
      await nextTick()
      // call exposed function, Vue doesn't support expose in typescript yet.
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      nav$.value?.scrollToActiveTab()
    })

    provide(tabsRootContextKey, {
      props,
      currentName,
      registerPane,
      unregisterPane,
    })

    expose({
      currentName,
    })

    return () => {
      const newButton =
        props.editable || props.addable ? (
          <div
            class={'tab-new'}
            tabindex="0"
            onClick={handleTabAdd}
            onKeydown={(ev: KeyboardEvent) => {
              if (ev.code === EVENT_CODE.enter) handleTabAdd()
            }}
          >
            <HlIcon>
              <SystemAdd />
            </HlIcon>
          </div>
        ) : null

      const header = (
        <div class={['tabs-header', `at-${props.tabPosition}`]}>
          {newButton}
          <TabNav
            ref={nav$}
            currentName={currentName.value}
            editable={props.editable}
            type={props.type}
            panes={panes.value}
            stretch={props.stretch}
            onTabClick={handleTabClick}
            onTabRemove={handleTabRemove}
          />
        </div>
      )

      const panels = (
        <div class={'tabs-content'}>{renderSlot(slots, 'default')}</div>
      )

      return (
        <div
          class={{
            [namespace.value]: true,
            'tabs-line': props.type === 'line',
            'tabs-button': props.type === 'button',
            'no-pane': !props.showPane,
            [`tabs-${props.tabPosition}`]: true,
          }}
          style={[
            props.paneHeight ? `--tabs-pane-height:${props.paneHeight}` : '',
            props.navHeight ? `--tabs-height:${props.navHeight}` : '',
            props.navPadding ? `--tabs-padding:${props.navPadding}` : '',
            props.gap ? `--tabs-gap:${props.gap}` : '',
          ]}
        >
          {...props.tabPosition !== 'bottom'
            ? [header, panels]
            : [panels, header]}
        </div>
      )
    }
  },
})
