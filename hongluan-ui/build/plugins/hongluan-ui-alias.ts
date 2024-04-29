import { EP_PKG, EP_PREFIX } from '../utils/constants'

import type { Plugin } from 'rollup'

export function HongluanUIAlias(): Plugin {
  const themeChalk = 'theme'
  const sourceThemeChalk = `${EP_PREFIX}/${themeChalk}` as const
  const bundleThemeChalk = `${EP_PKG}/${themeChalk}` as const

  return {
    name: 'hongluan-ui-alias-plugin',
    resolveId(id) {
      if (!id.startsWith(sourceThemeChalk)) return
      return {
        id: id.replaceAll(sourceThemeChalk, bundleThemeChalk),
        external: 'absolute',
      }
    },
  }
}
