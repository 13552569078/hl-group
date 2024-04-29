import { defineComponent, inject } from 'vue'
import { ROOT_PICKER_INJECTION_KEY } from '@hongluan-ui/tokens'
import { basicCellProps } from '../props/basic-cell'

export default defineComponent({
  name: 'DatePickerCell',
  props: basicCellProps,
  setup(props) {
    const { slots } = inject(ROOT_PICKER_INJECTION_KEY)!
    return () => {
      const { cell } = props
      if (slots.default) {
        const list = slots.default(cell).filter((item) => {
          return (
            item.patchFlag !== -2 && item.type.toString() !== 'Symbol(Comment)'
          )
        })
        if (list.length) {
          return list
        }
      }
      const text = (cell as any)?.text ?? ''
      return (
        <div class='date-table-cell'>
          <span class='date-table-cell-text'>{ text }</span>
        </div>
      )
    }
  },
})
