import { PREFIX } from '@hongluan-ui/constants'

export function usePrefix() {
  return { PREFIX, prefix: PREFIX.toLocaleLowerCase() }
}
