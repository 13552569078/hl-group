
import type { Directive, DirectiveBinding } from 'vue'

export interface DialogElement extends HTMLDivElement {
  __dragger__: {
    offsetX: number
    offsetY: number
    cursor: string
    moveHandler: (e: MouseEvent) => void
    upHandler: (e: MouseEvent) => void
    downHandler: (e: MouseEvent) => void
  }
}

const initDialogDragger = (dlg: DialogElement) => {
  const dragger = dlg.__dragger__
  const header = dlg.querySelector('.panel-header') as HTMLDivElement
  header.addEventListener('mousedown', dragger.downHandler)
  header.style.cursor = 'move'

  dragger.offsetX = 0
  dragger.offsetY = 0
}

const resetDialogDragger = (dlg: DialogElement) => {
  const dragger = dlg.__dragger__
  const header = dlg.querySelector('.panel-header') as HTMLDivElement
  header.removeEventListener('mousedown', dragger.downHandler)
  header.style.cursor = dragger.cursor
}

const DialogDragger: Directive = {
  beforeMount: (dlg: DialogElement, binding: DirectiveBinding) => {
    const header = dlg.querySelector('.panel-header') as HTMLDivElement
    dlg.__dragger__ = Object.assign({
      cursor: header.style.cursor,
      moveHandler: (e: MouseEvent) => {
        const dragger = dlg.__dragger__
        dlg.style.marginLeft = (e.pageX - dragger.offsetX) + 'px'
        dlg.style.marginTop = (e.pageY - dragger.offsetY) + 'px'
      },
      upHandler: () => {
        const dragger = dlg.__dragger__
        removeEventListener('mousemove', dragger.moveHandler)
        removeEventListener('mouseup', dragger.upHandler)
      },
      downHandler: (e: MouseEvent) => {
        const dragger = dlg.__dragger__
        dragger.offsetX = (e.pageX - dlg.offsetLeft)
        dragger.offsetY = (e.pageY - dlg.offsetTop)

        addEventListener('mousemove', dragger.moveHandler)
        addEventListener('mouseup', dragger.upHandler)
      },
    })

    if (!binding.value.canDrag) return

    initDialogDragger(dlg)
  },
  updated(dlg: DialogElement, binding: DirectiveBinding) {
    if (binding.value.canDrag) {
      initDialogDragger(dlg)
    } else {
      resetDialogDragger(dlg)
    }
    if (binding.value.showAs === 'drawer' || binding.value.placement === 'fullscreen') {
      dlg.style.removeProperty('margin-top')
      dlg.style.removeProperty('margin-left')
    }
  },
  beforeUnmount(dlg: DialogElement) {
    resetDialogDragger(dlg)
    dlg.__dragger__ = {} as any
  },
}

export { DialogDragger }
