import findWorkspacePackages from '@pnpm/find-workspace-packages'
import { buildConfig } from '../build-info'
import { EP_PKG, EP_PREFIX } from './constants'
import { pkgRoot, projRoot } from './paths'
import type { Module } from '../build-info'
import type { ProjectManifest } from '@pnpm/types'

export const getWorkspacePackages = () => findWorkspacePackages(projRoot)
export const getWorkspaceNames = async (dir = projRoot) => {
  const pkgs = await findWorkspacePackages(projRoot)
  return pkgs
    .filter(pkg => pkg.dir.startsWith(dir))
    .map(pkg => pkg.manifest.name)
    .filter((name): name is string => !!name)
}

export const getPackageManifest = (pkgPath: string) => {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  return require(pkgPath) as ProjectManifest
}

export const getPackageDependencies = (pkgPath: string): string[] => {
  const manifest = getPackageManifest(pkgPath)
  const { dependencies } = manifest
  return Object.keys(dependencies ?? {})
}

export const pathRewriter = (module: Module) => {
  const config = buildConfig[module]

  return (id: string) => {
    id = id.replace(new RegExp(`${EP_PREFIX}/theme`, 'g'), EP_PKG + '/theme')
    // TODO: handle @hongluan-ui/icons
    id = id.replace(new RegExp(`${EP_PREFIX}/`, 'g'), `${config.bundle.path}/`)
    return id
  }
}

export const excludeFiles = (files: string[]) => {
  const excludes = ['node_modules', 'test', 'mock', 'gulpfile', 'dist']
  return files.filter(
    path => !excludes.some(exclude => path.includes(exclude)),
  )
}

/**
 * get package list (theme-chalk excluded)
 */
export const getDistPackages = async () =>
  (await getWorkspacePackages())
    .map(pkg => ({ name: pkg.manifest.name, dir: pkg.dir }))
    .filter(
      (pkg): pkg is { name: string; dir: string; } =>
        !!pkg.name &&
        !!pkg.dir &&
        pkg.name.startsWith(EP_PREFIX) &&
        pkg.dir.startsWith(pkgRoot) &&
        pkg.name !== `${EP_PREFIX}/theme`,
    )
