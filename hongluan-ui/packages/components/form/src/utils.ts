import { ensureArray } from '@hongluan-ui/utils'

import type { Arrayable } from '@hongluan-ui/utils'
import type { FormItemContext } from '@hongluan-ui/tokens'
import type { FormItemProp } from './form-item'

export const filterFields = (
  fields: FormItemContext[],
  props: Arrayable<FormItemProp>,
) => {
  const normalized = ensureArray(props)
  return normalized.length > 0
    ? fields.filter(field => field.prop && normalized.includes(field.prop))
    : fields
}
