import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { ForeignCurrency, SupportedLocalCurrencyCode } from '../model/types.ts'
import { NavigationRoute } from './route.ts'

export type RateConversionRouteParams = {
  foreignCurrency: ForeignCurrency
  localCurrencyCode: SupportedLocalCurrencyCode
}

export type RateConversionNavigationProps = NativeStackScreenProps<
  RootStackParamList,
  typeof NavigationRoute.RateConversion
>

export type ExchangeBoardNavigationProps = NativeStackScreenProps<
  RootStackParamList,
  typeof NavigationRoute.ExchangeBoard
>

export type RootStackParamList = {
  [NavigationRoute.ExchangeBoard]: never
  [NavigationRoute.RateConversion]: RateConversionRouteParams
}
