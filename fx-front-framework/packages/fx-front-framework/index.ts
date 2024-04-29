import installer from './defaults'
export * from '@fx-front-framework/components'
export * from '@fx-front-framework/directives'
export * from '@fx-front-framework/hooks'
export * from '@fx-front-framework/tokens'
export * from '@fx-front-framework/utils'

export { default as makeInstaller } from './make-installer'
export { default } from './defaults'

export const install = installer.install
export const version = installer.version
