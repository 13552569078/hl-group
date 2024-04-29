import {
  defineComponent,
  computed,
  ref,
  provide,
  inject,
  getCurrentInstance,
  watch,
  onMounted,
  onBeforeUnmount,
  withDirectives,
  Fragment,
  vShow,
  h,
  reactive,
} from 'vue'
import { useTimeoutFn } from '@vueuse/core'
import HlCollapseTransition from '@hongluan-ui/components/collapse-transition'
import HlTooltip from '@hongluan-ui/components/tooltip'
import { buildProps, definePropType, throwError } from '@hongluan-ui/utils'
import { SystemArrowRight } from '@hongluan-ui/components/system-icon'
import HlIcon from '@hongluan-ui/components/icon'
import { useNamespace } from '@hongluan-ui/hooks'
import useMenu from './use-menu'

import type { Placement } from '@hongluan-ui/components/popper'
import type { ExtractPropTypes, VNodeArrayChildren, CSSProperties } from 'vue'
import type { MenuProvider, SubMenuProvider } from './types'

export const subMenuProps = buildProps({
  index: {
    type: String,
    required: true,
  },
  showTimeout: {
    type: Number,
    default: 300,
  },
  hideTimeout: {
    type: Number,
    default: 300,
  },
  fallbackPlacements: {
    type: definePropType<Placement[]>(Array),
  },
  popperClass: String,
  disabled: Boolean,
  popperAppendToBody: {
    type: Boolean,
    default: undefined,
  },
  popperOffset: {
    type: Number,
    default: 0,
  },
} as const)
export type SubMenuProps = ExtractPropTypes<typeof subMenuProps>

const COMPONENT_NAME = 'SubMenu'
export default defineComponent({
  name: COMPONENT_NAME,
  props: subMenuProps,

  setup(props, { slots, expose }) {
    const instance = getCurrentInstance()!
    const { namespace } = useNamespace()
    const { indexPath, parentMenu } = useMenu(
      instance,
      computed(() => props.index),
    )

    // inject
    const rootMenu = inject<MenuProvider>('rootMenu')
    if (!rootMenu) throwError(COMPONENT_NAME, 'can not inject root menu')

    const subMenu = inject<SubMenuProvider>(`subMenu:${parentMenu.value?.uid}`)
    if (!subMenu) throwError(COMPONENT_NAME, 'can not inject sub menu')

    const items = ref<MenuProvider['items']>({})
    const subMenus = ref<MenuProvider['subMenus']>({})

    let timeout: (() => void) | undefined
    const mouseInChild = ref(false)
    const verticalTitleRef = ref<HTMLDivElement>()
    const vPopper = ref<InstanceType<typeof HlTooltip> | null>(null)

    // computed
    const currentPlacement = computed<Placement>(() =>
      mode.value === 'horizontal' && isFirstLevel.value
        ? 'bottom-start'
        : 'right-start',
    )
    // const subMenuTitleIcon = computed(() => {
    //   return (mode.value === 'horizontal' && isFirstLevel.value) ||
    //     (mode.value === 'vertical' && !rootMenu.finalCollapse)
    //     ? SystemArrowDown
    //     : SystemArrowRight
    // })
    const isFirstLevel = computed(() => {
      let isFirstLevel = true
      let parent = instance.parent
      while (parent && parent.type.name !== 'Menu') {
        if (['SubMenu', 'MenuItemGroup'].includes(parent.type.name!)) {
          isFirstLevel = false
          break
        } else {
          parent = parent.parent
        }
      }
      return isFirstLevel
    })
    const appendToBody = computed(() => {
      return props.popperAppendToBody === undefined
        ? isFirstLevel.value
        : Boolean(props.popperAppendToBody)
    })
    const menuTransitionName = computed(() =>
      rootMenu.finalCollapse ? 'zoom-in-left' : 'zoom-in-top',
    )
    const fallbackPlacements = computed<Placement[]>(() =>
      mode.value === 'horizontal' && isFirstLevel.value
        ? [
          'bottom-start',
          'bottom-end',
          'top-start',
          'top-end',
          'right-start',
          'left-start',
        ]
        : [
          'right-start',
          'left-start',
          'bottom-start',
          'bottom-end',
          'top-start',
          'top-end',
        ],
    )
    const opened = computed(() => rootMenu.openedMenus.includes(props.index))
    const active = computed(() => {
      let isActive = false

      Object.values(items.value).forEach(item => {
        if (item.active) {
          isActive = true
        }
      })

      Object.values(subMenus.value).forEach(subItem => {
        if (subItem.active) {
          isActive = true
        }
      })

      return isActive
    })

    const backgroundColor = computed(() => rootMenu.props.backgroundColor || '')
    const activeTextColor = computed(() => rootMenu.props.activeTextColor || '')
    const textColor = computed(() => rootMenu.props.textColor || '')
    const mode = computed(() => rootMenu.props.mode)
    const item = reactive({
      index: props.index,
      indexPath,
      active,
    })

    const titleStyle = computed<CSSProperties>(() => {
      if (mode.value !== 'horizontal') {
        return {
          color: textColor.value,
        }
      }
      return {
        borderBottomColor: active.value
          ? rootMenu.props.activeTextColor
            ? activeTextColor.value
            : ''
          : 'transparent',
        color: active.value ? activeTextColor.value : textColor.value,
      }
    })

    // methods
    const doDestroy = () =>
      vPopper.value?.popperRef?.popperInstanceRef?.destroy()

    const handleCollapseToggle = (value: boolean) => {
      if (!value) {
        doDestroy()
      }
    }

    const handleClick = () => {
      if (
        (rootMenu.props.menuTrigger === 'hover' &&
          rootMenu.props.mode === 'horizontal') ||
        (rootMenu.finalCollapse && rootMenu.props.mode === 'vertical') ||
        props.disabled
      )
        return

      rootMenu.handleSubMenuClick({
        index: props.index,
        indexPath: indexPath.value,
        active: active.value,
      })
    }

    const handleMouseenter = (
      event: MouseEvent | FocusEvent,
      showTimeout = props.showTimeout,
    ) => {
      if (event.type === 'focus') {
        return
      }
      if (
        (rootMenu.props.menuTrigger === 'click' &&
          rootMenu.props.mode === 'horizontal') ||
        (!rootMenu.finalCollapse && rootMenu.props.mode === 'vertical') ||
        props.disabled
      ) {
        return
      }
      subMenu.mouseInChild.value = true

      timeout?.()
      ;({ stop: timeout } = useTimeoutFn(() => {
        rootMenu.openMenu(props.index, indexPath.value)
      }, showTimeout))

      if (appendToBody.value) {
        parentMenu.value!.vnode.el?.dispatchEvent(new MouseEvent('mouseenter'))
      }
    }

    const handleMouseleave = (deepDispatch = false) => {
      if (
        (rootMenu.props.menuTrigger === 'click' &&
          rootMenu.props.mode === 'horizontal') ||
        (!rootMenu.finalCollapse && rootMenu.props.mode === 'vertical')
      ) {
        return
      }
      timeout?.()
      subMenu.mouseInChild.value = false
      ;({ stop: timeout } = useTimeoutFn(
        () =>
          !mouseInChild.value &&
          rootMenu.closeMenu(props.index, indexPath.value),
        props.hideTimeout,
      ))

      if (appendToBody.value && deepDispatch) {
        if (instance.parent?.type.name === 'SubMenu') {
          subMenu.handleMouseleave?.(true)
        }
      }
    }

    watch(
      () => rootMenu.finalCollapse,
      value => handleCollapseToggle(Boolean(value)),
    )

    // provide
    {
      const addSubMenu: SubMenuProvider['addSubMenu'] = item => {
        subMenus.value[item.index] = item
      }
      const removeSubMenu: SubMenuProvider['removeSubMenu'] = item => {
        delete subMenus.value[item.index]
      }
      provide<SubMenuProvider>(`subMenu:${instance.uid}`, {
        addSubMenu,
        removeSubMenu,
        handleMouseleave,
        mouseInChild,
      })
    }

    // expose
    expose({
      opened,
    })

    // lifecycle
    onMounted(() => {
      rootMenu.addSubMenu(item)
      subMenu.addSubMenu(item)
    })

    onBeforeUnmount(() => {
      subMenu.removeSubMenu(item)
      rootMenu.removeSubMenu(item)
    })

    return () => {
      const titleTag: VNodeArrayChildren = [
        slots.title?.(),
        slots.icon ? slots.icon?.({ opened: opened.value, collapse: rootMenu.finalCollapse }) : h(
          HlIcon,
          {
            class: ['menu-arrow'],
          },
          { default: () => h(SystemArrowRight) },
        ),
      ]

      // this render function is only used for bypass `Vue`'s compiler caused patching issue.
      // temporarily mark ElPopper as any due to type inconsistency.
      const child = rootMenu.isMenuPopup
        ? h(
          // TODO: correct popper's type.
          HlTooltip as any,
          {
            ref: vPopper,
            manualMode: true,
            visible: opened.value,
            offset: props.popperOffset,
            showArrow: false,
            persistent: true,
            popperClass: `${props.popperClass ?? ''} ${namespace.value}-menu-popper`,
            placement: currentPlacement.value,
            teleported: appendToBody.value,
            fallbackPlacements: fallbackPlacements.value,
            transition: menuTransitionName.value,
            gpuAcceleration: false,
          },
          {
            content: () =>
              h(
                'div',
                {
                  class: [`menu-${mode.value}`, props.popperClass],
                  onMouseenter: (evt: MouseEvent) =>
                    handleMouseenter(evt, 100),
                  onMouseleave: () => handleMouseleave(true),
                  onFocus: (evt: FocusEvent) => handleMouseenter(evt, 100),
                },
                [
                  h(
                    'ul',
                    {
                      class: [
                        namespace.value + '-menu menu-dropdown',
                        `popup-${currentPlacement.value}`,
                      ],
                    },
                    [slots.default?.()],
                  ),
                ],
              ),
            default: () =>
              h(
                'div',
                {
                  class: 'item-content',
                  style: [
                    titleStyle.value,
                    { backgroundColor: backgroundColor.value },
                  ],
                  onClick: handleClick,
                },
                titleTag,
              ),
          },
        )
        : h(Fragment, {}, [
          h(
            'div',
            {
              class: 'item-content',
              style: [
                titleStyle.value,
                { backgroundColor: backgroundColor.value },
              ],
              ref: verticalTitleRef,
              onClick: handleClick,
            },
            titleTag,
          ),
          h(
            HlCollapseTransition,
            {},
            {
              default: () =>
                withDirectives(
                  h(
                    'ul',
                    {
                      role: 'menu',
                      class: namespace.value + '-menu menu-inline',
                    },
                    [slots.default?.()],
                  ),
                  [[vShow, opened.value]],
                ),
            },
          ),
        ])
      return h(
        'li',
        {
          class: [
            `${namespace.value}-menu-item ${namespace.value}-sub-menu`,
            {
              'is-active': active.value,
              'is-opened': opened.value,
              'is-disabled': props.disabled,
            },
          ],
          role: 'menuitem',
          ariaHaspopup: true,
          ariaExpanded: opened.value,
          onMouseenter: handleMouseenter,
          onMouseleave: () => handleMouseleave(true),
          onFocus: handleMouseenter,
        },
        [child],
      )
    }
  },
})
