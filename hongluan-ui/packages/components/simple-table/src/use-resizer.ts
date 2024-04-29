import { onBeforeUnmount, onMounted } from 'vue'

import type { Ref } from 'vue'
import type { ResizeOption } from './simple-table'

export interface ResizerCellElement extends HTMLTableCellElement {
  mouseDown: boolean
  oldX: number
  oldWidth: number
}

function useResizer(resize: boolean | ResizeOption, table: Ref<HTMLTableElement>) {
  const limitation = { min: 30, max: Number.MAX_SAFE_INTEGER, ...(typeof resize === 'boolean' ? {} : resize) }
  let tTH: ResizerCellElement

  function mousedownHanlder(this: ResizerCellElement, event: MouseEvent) {
    tTH = this
    if (event.offsetX > tTH.offsetWidth - 10) {
      tTH.mouseDown = true
      tTH.oldX = event.x
      tTH.oldWidth = tTH.offsetWidth
    }
  }
  function mouseupHanlder(this: ResizerCellElement) {
    if (!tTH) tTH = this
    tTH.mouseDown = false
    tTH.style.cursor = 'default'
  }
  function mousemoveHanlder(this: ResizerCellElement, event: MouseEvent) {
    if (tTH?.mouseDown === true) {
      tTH.style.cursor = 'col-resize'
      const newWidth = tTH.oldWidth + (event.x - tTH.oldX)
      if (newWidth >= limitation.min && newWidth <= limitation.max)
        tTH.style.width = newWidth + 'px'
    } else {
      this.style.cursor = event.offsetX >= this.offsetWidth - 10 ? 'col-resize' : 'default'
    }
  }

  const doResizer = (cb: (cell: HTMLTableCellElement) => void) => {
    for (let i = 0; i < table.value.tHead!.rows.length; i++) {
      for (let j = 0; j < table.value.tHead!.rows[i].cells.length; j++) {
        const cell = table.value.tHead!.rows[i].cells[j]
        cb(cell)
      }
    }
  }

  onMounted(() => {
    resize && doResizer((cell: HTMLTableCellElement) => {
      cell.addEventListener('mousedown', mousedownHanlder as any)
      cell.addEventListener('mouseup', mouseupHanlder)
      cell.addEventListener('mousemove', mousemoveHanlder as any)
    })
  })

  onBeforeUnmount(() => {
    resize && doResizer((cell: HTMLTableCellElement) => {
      cell.removeEventListener('mousedown', mousedownHanlder as any)
      cell.removeEventListener('mouseup', mouseupHanlder)
      cell.removeEventListener('mousemove', mousemoveHanlder as any)
    })
  })
}

export { useResizer }


