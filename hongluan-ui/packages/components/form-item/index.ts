import { withInstall } from '@hongluan-ui/utils'
import FormItem from '../form/src/form-item.vue'

export const HlFormItem = withInstall(FormItem)
export default HlFormItem

export type FormItemInstance = InstanceType<typeof FormItem>
