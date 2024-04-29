import installer from './defaults'
export * from '@hongluan-ui/constants'
export * from '@hongluan-ui/components'
export * from '@hongluan-ui/directives'
export * from '@hongluan-ui/hooks'
export * from '@hongluan-ui/tokens'

export * from './make-installer'

export const install = installer.install
export const version = installer.version
export default installer

export { default as dayjs } from 'dayjs'
