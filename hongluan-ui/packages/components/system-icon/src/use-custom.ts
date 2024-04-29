import { useGlobalConfig } from '@hongluan-ui/hooks'

function useCustomIcon(name: string) {

  const $HL = useGlobalConfig()
  return {
    CustomIcon: $HL.value.systemIcons?.[name],
  }
}

export { useCustomIcon }
