import React, { FC, useCallback } from 'react'
import { ActivityIndicator, FlatList, Text, TouchableHighlight } from 'react-native'
import { useCurrentExchangeBoard } from '../../hooks/useCurrentExchangeBoard.ts'
import { ForeignCurrency, SupportedLocalCurrencyCode } from '../../model/types.ts'
import { ExchangeBoardNavigationProps } from '../../navigation/params.ts'
import { NavigationRoute } from '../../navigation/route.ts'
import { ExchangeBoardItem } from './components/ExchangeBoardItem.tsx'

type ExchangeBoardProps = ExchangeBoardNavigationProps & {
  localCurrency: SupportedLocalCurrencyCode
}

export const ExchangeBoard: FC<ExchangeBoardProps> = ({ localCurrency, navigation }) => {
  const queryResult = useCurrentExchangeBoard(localCurrency)

  const navigateToDetail = useCallback(
    (selectedCurrency: ForeignCurrency) => {
      navigation.navigate(NavigationRoute.RateConversion, {
        foreignCurrency: selectedCurrency,
        localCurrencyCode: localCurrency,
      })
    },
    [localCurrency, navigation],
  )

  if (queryResult.isLoading) {
    return <ActivityIndicator />
  }

  if (!queryResult.data) {
    // TODO: Figure out & make error nicer
    // TODO: Retry initialization?
    const error = queryResult.error?.toString() ?? 'Unknown error'
    return <Text>{error}</Text>
  }

  return (
    <FlatList
      data={queryResult.data.currencies}
      refreshing={queryResult.isRefetching}
      onRefresh={queryResult.refetch}
      renderItem={(item) => (
        <TouchableHighlight key={item.item.currencyCode} onPress={() => navigateToDetail(item.item)}>
          <ExchangeBoardItem foreignCurrency={item.item} localCurrencyCode={localCurrency} />
        </TouchableHighlight>
      )}
    />
  )
}
