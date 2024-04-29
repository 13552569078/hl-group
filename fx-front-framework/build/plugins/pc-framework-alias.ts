import { EP_PKG, EP_PREFIX } from '../utils/constants'
import { getDistPackages } from '../utils/pkg'
import type { Plugin } from 'rollup'

export async function PCFrameworkAlias(): Promise<Plugin> {
  const pkgs = await getDistPackages()

  return {
    name: 'pc-framework-alias-plugin',
    resolveId(id, importer, options) {
      if (!id.startsWith(EP_PREFIX)) return

      const THEME_CHALK = `${EP_PREFIX}/theme`
      if (id.startsWith(THEME_CHALK)) {
        return {
          id: id.replace(new RegExp(THEME_CHALK, 'g'), `${EP_PKG}/theme`),
          external: 'absolute',
        }
      }

      let updatedId = id
      for (const pkg of pkgs) {
        if (id.startsWith(pkg.name))
          updatedId = updatedId.replace(pkg.name, pkg.dir)
      }
      return this.resolve(id, importer, { skipSelf: true, ...options })
    },
  }
}
