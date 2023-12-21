import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { SupportedSourceCurrencyCode, TargetCurrency } from '../model/types.ts'
import { NavigationRoute } from './route.ts'

export type RateConversionRouteParams = {
  targetCurrency: TargetCurrency
  sourceCurrencyCode: SupportedSourceCurrencyCode
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
