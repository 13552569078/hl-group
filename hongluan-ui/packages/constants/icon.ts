export const MessageTypeIconMap = {
  success: 'CircleCheck',
  info: 'Info',
  warning: 'Warning',
  danger: 'CircleError',
  error: 'CircleError',
}

export type MessageIconType = Extract<keyof typeof MessageTypeIconMap, string>
