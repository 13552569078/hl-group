import MessageBox from './src/messageBox'
import type { App } from 'vue'
import type { SFCWithInstall } from '@hongluan-ui/utils'

const _MessageBox = MessageBox as SFCWithInstall<typeof MessageBox>

_MessageBox.install = (app: App) => {
  _MessageBox._context = app._context
  app.config.globalProperties.$msgbox = _MessageBox
  app.config.globalProperties.$messageBox = _MessageBox
  app.config.globalProperties.$alert = _MessageBox.alert
  app.config.globalProperties.$confirm = _MessageBox.confirm
}

export default _MessageBox
export const HlMessageBox = _MessageBox

export * from './src/message-box.type'
