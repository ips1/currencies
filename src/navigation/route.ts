import { OneOf } from '../types/common.ts'

export const NavigationRoute = {
  ExchangeBoard: 'ExchangeBoard',
  RateConversion: 'RateConversion',
} as const
export type NavigationRoute = OneOf<typeof NavigationRoute>
