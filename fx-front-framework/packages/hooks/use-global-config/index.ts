import { getCurrentInstance } from 'vue'
import { getAllConfig } from '@fx-front-framework/utils/config'

import type { InstallOptions } from '@fx-front-framework/utils/config'

export function useGlobalConfig(): InstallOptions {
  const vm: any = getCurrentInstance()
  if ('$FX' in vm.proxy) {
    return vm.proxy.$FX
  }
  return getAllConfig()
}
