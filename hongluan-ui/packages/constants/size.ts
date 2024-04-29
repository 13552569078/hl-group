export const COMPONENT_SIZES = ['xxxs', 'xxs', 'xs', 'sm', 'md', 'lg', 'xl', 'xxl', 'xxxl'] as const
export const COMPONENT_TYPES = ['link', 'primary', 'success', 'danger', 'warning', 'info'] as const

export type ComponentSize = typeof COMPONENT_SIZES[number]
export type ComponentType = typeof COMPONENT_TYPES[number]

