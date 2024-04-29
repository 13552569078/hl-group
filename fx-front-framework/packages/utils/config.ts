
// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface InstallOptions {
  visualized?: {
    basicPX: number
  }
}

let $FX = {} as InstallOptions

const setConfig = (option: InstallOptions): void => {
  $FX = option
}

const getConfig = (key: keyof InstallOptions): unknown => {
  return $FX[key]
}

const getAllConfig = (): InstallOptions => {
  return $FX
}

export {
  getConfig,
  getAllConfig,
  setConfig,
}
