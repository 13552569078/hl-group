import { inject, computed, ref } from 'vue'
import { generateId, addClass } from '@hongluan-ui/utils'
import { EVENT_CODE } from '@hongluan-ui/constants'
import type { Nullable } from '@hongluan-ui/utils'
import type { IDropdownInstance } from './dropdown'

export const useDropdown = () => {
  const hlDropdown = inject<IDropdownInstance>('hlDropdown', {})
  const _hlDropdownSize = computed(() => hlDropdown?.dropdownSize)

  return {
    hlDropdown,
    _hlDropdownSize,
  }
}

export const initDropdownDomEvent = (
  dropdownChildren: any,
  triggerElm: HTMLElement,
  _instance: any,
) => {
  const menuItems = ref<Nullable<HTMLButtonElement[]>>(null)
  const menuItemsArray = ref<Nullable<HTMLElement[]>>(null)
  const dropdownElm = ref<Nullable<HTMLElement>>(null)
  const listId = ref(`dropdown-menu-${generateId()}`)
  dropdownElm.value = dropdownChildren?.subTree.el

  function removeTabindex() {
    triggerElm.setAttribute('tabindex', '-1')
    menuItemsArray.value?.forEach(item => {
      item.setAttribute('tabindex', '-1')
    })
  }

  function resetTabindex(ele: HTMLElement) {
    removeTabindex()
    ele?.setAttribute('tabindex', '0')
  }

  function handleTriggerKeyDown(ev: Event) {
    const code = (ev as KeyboardEvent).code
    if ([EVENT_CODE.up, EVENT_CODE.down].includes(code)) {
      removeTabindex()
      resetTabindex(menuItems.value![0])
      menuItems.value![0].focus()
      ev.preventDefault()
      ev.stopPropagation()
    } else if (code === EVENT_CODE.enter) {
      _instance.handleClick()
    } else if ([EVENT_CODE.tab, EVENT_CODE.esc].includes(code)) {
      _instance.hide()
    }
  }

  function handleItemKeyDown(ev: Event) {
    const code = (ev as KeyboardEvent).code
    const target = ev.target as HTMLElement
    const currentIndex = menuItemsArray.value!.indexOf(target)
    const max = menuItemsArray.value!.length - 1
    let nextIndex
    if ([EVENT_CODE.up, EVENT_CODE.down].includes(code)) {
      if (code === EVENT_CODE.up) {
        nextIndex = currentIndex !== 0 ? currentIndex - 1 : 0
      } else {
        nextIndex = currentIndex < max ? currentIndex + 1 : max
      }
      removeTabindex()
      resetTabindex(menuItems.value![nextIndex])
      menuItems.value![nextIndex].focus()
      ev.preventDefault()
      ev.stopPropagation()
    } else if (code === EVENT_CODE.enter) {
      triggerElmFocus()
      target.click()
      if (_instance.props.hideOnClick) {
        _instance.hide()
      }
    } else if ([EVENT_CODE.tab, EVENT_CODE.esc].includes(code)) {
      _instance.hide()
      triggerElmFocus()
    }
  }

  function initAria() {
    dropdownElm.value!.setAttribute('id', listId.value)
    triggerElm.setAttribute('aria-haspopup', 'list')
    triggerElm.setAttribute('aria-controls', listId.value)
    if (!_instance.props.split) {
      triggerElm.setAttribute('role', 'button')
      triggerElm.setAttribute('tabindex', _instance.props.tabindex)
      addClass(triggerElm, 'selfdefine')
    }
  }

  function initEvent() {
    triggerElm?.addEventListener('keydown', handleTriggerKeyDown)
    dropdownElm.value?.addEventListener('keydown', handleItemKeyDown, true)
  }

  function initDomOperation() {
    menuItems.value = dropdownElm.value!.querySelectorAll(
      "[tabindex='-1']",
    ) as unknown as HTMLButtonElement[]
    menuItemsArray.value = Array.from(menuItems.value)

    initEvent()
    initAria()
  }

  function triggerElmFocus() {
    triggerElm.focus()
  }

  initDomOperation()
}
