import { OneOf } from '../types/common.ts'

export const NavigationRoute = {
  ExchangeBoard: 'ExchangeBoard',
} as const
export type NavigationRoute = OneOf<typeof NavigationRoute>
