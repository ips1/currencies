import React, { FC, useCallback } from 'react'
import { ActivityIndicator, Button, FlatList, SafeAreaView, TouchableHighlight } from 'react-native'
import styled, { useTheme } from 'styled-components/native'
import { BaseText } from '../../components/BaseText.tsx'
import { useCurrentExchangeBoard } from '../../hooks/useCurrentExchangeBoard.ts'
import { ForeignCurrency, SupportedLocalCurrencyCode } from '../../model/types.ts'
import { ExchangeBoardNavigationProps } from '../../navigation/params.ts'
import { NavigationRoute } from '../../navigation/route.ts'
import { ExchangeBoardItem } from './components/ExchangeBoardItem.tsx'

type ExchangeBoardProps = ExchangeBoardNavigationProps & {
  localCurrency: SupportedLocalCurrencyCode
}

const FullScreenWrapper = styled.SafeAreaView`
  flex: 1;
  justify-content: center;
  align-items: center;
`

export const ExchangeBoard: FC<ExchangeBoardProps> = ({ localCurrency, navigation }) => {
  const queryResult = useCurrentExchangeBoard(localCurrency)
  const theme = useTheme()

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
    return (
      <FullScreenWrapper>
        <ActivityIndicator />
      </FullScreenWrapper>
    )
  }

  if (!queryResult.data) {
    // TODO: Figure out & make error nicer
    // TODO: Retry initialization?
    return (
      <FullScreenWrapper>
        <BaseText>Unable to retrieve the rates data</BaseText>
        <Button title={'Retry'} onPress={() => queryResult.refetch()} />
      </FullScreenWrapper>
    )
  }

  return (
    <SafeAreaView>
      <FlatList
        data={queryResult.data.currencies}
        refreshing={queryResult.isRefetching}
        onRefresh={queryResult.refetch}
        renderItem={(item) => (
          <TouchableHighlight
            underlayColor={theme.colors.inputBackground}
            key={item.item.currencyCode}
            onPress={() => navigateToDetail(item.item)}
          >
            <ExchangeBoardItem foreignCurrency={item.item} localCurrencyCode={localCurrency} />
          </TouchableHighlight>
        )}
      />
    </SafeAreaView>
  )
}
