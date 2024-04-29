import {
  computed,
  defineComponent,
  getCurrentInstance,
  inject,
  nextTick,
  onMounted,
  onUpdated,
  ref,
  watch,
} from 'vue'
import { NOOP } from '@vue/shared'
import {
  useDocumentVisibility,
  useResizeObserver,
  useWindowFocus,
} from '@vueuse/core'
import {
  buildProps,
  capitalize,
  definePropType,
  mutable,
  throwError,
} from '@hongluan-ui/utils'
import { EVENT_CODE } from '@hongluan-ui/constants'
import HlIcon from '@hongluan-ui/components/icon'
import { SystemClose, SystemArrowLeft, SystemArrowRight } from '@hongluan-ui/components/system-icon'
import { tabsRootContextKey } from '@hongluan-ui/tokens'
import TabBar from './tab-bar.vue'
import type { CSSProperties, ExtractPropTypes } from 'vue'
import type { TabsPaneContext } from '@hongluan-ui/tokens'
import type { TabPaneName } from './tabs'

interface Scrollable {
  next?: boolean
  prev?: number
}
type KeyOfOffset = 'offsetWidth' | 'offsetHeight'

export const tabNavProps = buildProps({
  panes: {
    type: definePropType<TabsPaneContext[]>(Array),
    default: () => mutable([] as const),
  },
  currentName: {
    type: [String, Number],
    default: '',
  },
  editable: Boolean,
  type: {
    type: String,
    values: ['line', 'button', ''],
    default: '',
  },
  stretch: Boolean,
} as const)

export const tabNavEmits = {
  tabClick: (tab: TabsPaneContext, tabName: TabPaneName, ev: Event) =>
    ev instanceof Event,
  tabRemove: (tab: TabsPaneContext, ev: Event) => ev instanceof Event,
}

export type TabNavProps = ExtractPropTypes<typeof tabNavProps>
export type TabNavEmits = typeof tabNavEmits

const COMPONENT_NAME = 'TabNav'
const TabNav = defineComponent({
  name: COMPONENT_NAME,
  props: tabNavProps,
  emits: tabNavEmits,
  setup(props, { expose, emit }) {
    const vm = getCurrentInstance()

    const rootTabs = inject(tabsRootContextKey)
    if (!rootTabs) throwError(COMPONENT_NAME, `<hl-tabs><tab-nav /></hl-tabs>`)

    const visibility = useDocumentVisibility()
    const focused = useWindowFocus()

    const navScroll$ = ref<HTMLDivElement>()
    const nav$ = ref<HTMLDivElement>()
    const el$ = ref<HTMLDivElement>()

    const scrollable = ref<false | Scrollable>(false)
    const navOffset = ref(0)
    const isFocus = ref(false)
    const focusable = ref(true)

    const sizeName = computed(() =>
      ['top', 'bottom'].includes(rootTabs.props.tabPosition)
        ? 'width'
        : 'height',
    )
    const navStyle = computed<CSSProperties>(() => {
      const dir = sizeName.value === 'width' ? 'X' : 'Y'
      return {
        transform: `translate${dir}(-${navOffset.value}px)`,
      }
    })

    const scrollPrev = () => {
      if (!navScroll$.value) return

      const containerSize =
        navScroll$.value[`offset${capitalize(sizeName.value)}` as KeyOfOffset]
      const currentOffset = navOffset.value

      if (!currentOffset) return

      const newOffset =
        currentOffset > containerSize ? currentOffset - containerSize : 0

      navOffset.value = newOffset
    }

    const scrollNext = () => {
      if (!navScroll$.value || !nav$.value) return

      const navSize = nav$.value[`offset${capitalize(sizeName.value)}` as KeyOfOffset]
      const containerSize =
        navScroll$.value[`offset${capitalize(sizeName.value)}` as KeyOfOffset]
      const currentOffset = navOffset.value

      if (navSize - currentOffset <= containerSize) return

      const newOffset =
        navSize - currentOffset > containerSize * 2
          ? currentOffset + containerSize
          : navSize - containerSize

      navOffset.value = newOffset
    }

    const scrollToActiveTab = async () => {
      const nav = nav$.value
      if (!scrollable.value || !el$.value || !navScroll$.value || !nav) return

      await nextTick()

      const activeTab = el$.value.querySelector('.is-active')
      if (!activeTab) return

      const navScroll = navScroll$.value
      const isHorizontal = ['top', 'bottom'].includes(
        rootTabs.props.tabPosition,
      )
      const activeTabBounding = activeTab.getBoundingClientRect()
      const navScrollBounding = navScroll.getBoundingClientRect()
      const maxOffset = isHorizontal
        ? nav.offsetWidth - navScrollBounding.width
        : nav.offsetHeight - navScrollBounding.height
      const currentOffset = navOffset.value
      let newOffset = currentOffset

      if (isHorizontal) {
        if (activeTabBounding.left < navScrollBounding.left) {
          newOffset =
            currentOffset - (navScrollBounding.left - activeTabBounding.left)
        }
        if (activeTabBounding.right > navScrollBounding.right) {
          newOffset =
            currentOffset + activeTabBounding.right - navScrollBounding.right
        }
      } else {
        if (activeTabBounding.top < navScrollBounding.top) {
          newOffset =
            currentOffset - (navScrollBounding.top - activeTabBounding.top)
        }
        if (activeTabBounding.bottom > navScrollBounding.bottom) {
          newOffset =
            currentOffset +
            (activeTabBounding.bottom - navScrollBounding.bottom)
        }
      }
      newOffset = Math.max(newOffset, 0)
      navOffset.value = Math.min(newOffset, maxOffset)
    }

    const update = () => {
      if (!nav$.value || !navScroll$.value) return

      const navSize = nav$.value[`offset${capitalize(sizeName.value)}` as KeyOfOffset]
      const containerSize =
        navScroll$.value[`offset${capitalize(sizeName.value)}` as KeyOfOffset]
      const currentOffset = navOffset.value

      if (containerSize < navSize) {
        const currentOffset = navOffset.value
        scrollable.value = scrollable.value || {}
        scrollable.value.prev = currentOffset
        scrollable.value.next = currentOffset + containerSize < navSize
        if (navSize - currentOffset < containerSize) {
          navOffset.value = navSize - containerSize
        }
      } else {
        scrollable.value = false
        if (currentOffset > 0) {
          navOffset.value = 0
        }
      }
    }

    const changeTab = (e: KeyboardEvent) => {
      const code = e.code

      const { up, down, left, right } = EVENT_CODE
      if (![up, down, left, right].includes(code)) return

      // 左右上下键更换tab
      const tabList: HTMLDivElement[] = Array.from(
        (e.currentTarget as HTMLDivElement).querySelectorAll<HTMLDivElement>(
          '[role=tab]:not(.is-disabled)',
        ),
      )
      const currentIndex = tabList.indexOf(e.target as HTMLDivElement)

      let nextIndex: number
      if (code === left || code === up) {
        // left
        if (currentIndex === 0) {
          // first
          nextIndex = tabList.length - 1
        } else {
          nextIndex = currentIndex - 1
        }
      } else {
        // right
        if (currentIndex < tabList.length - 1) {
          // not last
          nextIndex = currentIndex + 1
        } else {
          nextIndex = 0
        }
      }
      tabList[nextIndex].focus({ preventScroll: true }) // 改变焦点元素
      tabList[nextIndex].click() // 选中下一个tab
      setFocus()
    }

    const setFocus = () => {
      if (focusable.value) isFocus.value = true
    }
    const removeFocus = () => (isFocus.value = false)

    watch(visibility, visibility => {
      if (visibility === 'hidden') {
        focusable.value = false
      } else if (visibility === 'visible') {
        setTimeout(() => (focusable.value = true), 50)
      }
    })
    watch(focused, focused => {
      if (focused) {
        setTimeout(() => (focusable.value = true), 50)
      } else {
        focusable.value = false
      }
    })
    watch(
      () => props.panes,
      () => vm?.update(),
      { flush: 'post' },
    )

    useResizeObserver(el$, update)

    onMounted(() => setTimeout(() => scrollToActiveTab(), 0))
    onUpdated(() => update())

    expose({
      scrollToActiveTab,
      removeFocus,
    })

    return () => {
      const scrollBtn = scrollable.value
        ? [
          <span
            class={[
              'prev',
              scrollable.value.prev ? '' : 'is-disabled',
            ]}
            onClick={scrollPrev}
          >
            <HlIcon>
              <SystemArrowLeft />
            </HlIcon>
          </span>,
          <span
            class={[
              'next',
              scrollable.value.next ? '' : 'is-disabled',
            ]}
            onClick={scrollNext}
          >
            <HlIcon>
              <SystemArrowRight />
            </HlIcon>
          </span>,
        ]
        : null

      const tabs = props.panes.map((pane, index) => {
        const uid = pane.uid
        const disabled = pane.props.disabled
        const tabName = pane.props.name ?? pane.index ?? `${index}`
        const closable = !disabled && (pane.isClosable || props.editable)
        pane.index = `${index}`

        const btnClose = closable ? (
          <HlIcon
            class="tab-close"
            // `onClick` not exist when generate dts
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            onClick={(ev: MouseEvent) => emit('tabRemove', pane, ev)}
          >
            <SystemClose />
          </HlIcon>
        ) : null

        const tabLabelContent = pane.slots.label?.() || pane.props.label
        const tabindex = !disabled && pane.active ? 0 : -1

        return (
          <div
            ref={`tab-${uid}`}
            class={{
              'tabs-item': true,
              [`at-${rootTabs.props.tabPosition}`]: true,
              'is-active': pane.active,
              'is-disabled': disabled,
              'is-closable': closable,
              'is-focus': isFocus,
            }}
            id={`tab-${tabName}`}
            key={`tab-${uid}`}
            aria-controls={`pane-${tabName}`}
            role="tab"
            aria-selected={pane.active}
            tabindex={tabindex}
            onFocus={() => setFocus()}
            onBlur={() => removeFocus()}
            onClick={(ev: MouseEvent) => {
              removeFocus()
              emit('tabClick', pane, tabName, ev)
            }}
            onKeydown={(ev: KeyboardEvent) => {
              if (
                closable &&
                (ev.code === EVENT_CODE.delete ||
                  ev.code === EVENT_CODE.backspace)
              ) {
                emit('tabRemove', pane, ev)
              }
            }}
          >
            {...[tabLabelContent, btnClose]}
          </div>
        )
      })

      return (
        <div
          ref={el$}
          class={[
            'tabs-wrap',
            scrollable.value ? 'is-scrollable' : '',
            `at-${rootTabs.props.tabPosition}`,
          ]}
        >
          {scrollBtn}
          <div class={'tabs-scroll'} ref={navScroll$}>
            <div
              class={[
                'tabs-nav',
                `at-${rootTabs.props.tabPosition}`,
                props.stretch &&
                ['top', 'bottom'].includes(rootTabs.props.tabPosition)
                  ? 'is-stretch'
                  : '',
              ]}
              ref={nav$}
              style={navStyle.value}
              role="tablist"
              onKeydown={changeTab}
            >
              {...[
                props.type ? <TabBar tabs={[...props.panes]} /> : null,
                tabs,
              ]}
            </div>
          </div>
        </div>
      )
    }
  },
})

export type TabNavInstance = InstanceType<typeof TabNav>
export default TabNav
