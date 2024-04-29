import { withInstall } from '@hongluan-ui/utils'
import Form from './src/form.vue'

export const HlForm = withInstall(Form)
export default HlForm

export * from './src/form'
export * from './src/form-item'

export type FormInstance = InstanceType<typeof Form>

