import { createProdMockServer } from 'vite-plugin-mock/es/createProdMockServer'
import { echartsMock, mapMock } from '../mock'

export const mockModules = [...mapMock, ...echartsMock]

export function setupProdMockServer() {
  createProdMockServer(mockModules)
}
