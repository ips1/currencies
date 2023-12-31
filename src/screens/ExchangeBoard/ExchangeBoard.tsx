import React, { FC, useCallback } from 'react'
import { ActivityIndicator, Button, FlatList, SafeAreaView, TouchableHighlight } from 'react-native'
import styled, { useTheme } from 'styled-components/native'
import { BaseText } from '../../components/BaseText.tsx'
import { SecondaryText } from '../../components/SecondaryText.tsx'
import { useCurrentExchangeBoard } from '../../hooks/useCurrentExchangeBoard.ts'
import { SupportedSourceCurrencyCode, TargetCurrency } from '../../model/types.ts'
import { ExchangeBoardNavigationProps } from '../../navigation/params.ts'
import { NavigationRoute } from '../../navigation/route.ts'
import { ExchangeBoardItem } from './components/ExchangeBoardItem.tsx'

type ExchangeBoardProps = ExchangeBoardNavigationProps & {
  sourceCurrency: SupportedSourceCurrencyCode
}

const ListHeader = styled.View`
  padding: 10px;
`

const FullScreenWrapper = styled.SafeAreaView`
  flex: 1;
  justify-content: center;
  align-items: center;
`

export const ExchangeBoard: FC<ExchangeBoardProps> = ({ sourceCurrency, navigation }) => {
  const queryResult = useCurrentExchangeBoard(sourceCurrency)
  const theme = useTheme()

  const navigateToDetail = useCallback(
    (selectedCurrency: TargetCurrency) => {
      navigation.navigate(NavigationRoute.RateConversion, {
        targetCurrency: selectedCurrency,
        sourceCurrencyCode: sourceCurrency,
      })
    },
    [sourceCurrency, navigation],
  )

  if (queryResult.isLoading) {
    return (
      <FullScreenWrapper>
        <ActivityIndicator />
      </FullScreenWrapper>
    )
  }

  if (!queryResult.data) {
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
            <ExchangeBoardItem targetCurrency={item.item} sourceCurrencyCode={sourceCurrency} />
          </TouchableHighlight>
        )}
        ListHeaderComponent={
          <ListHeader>
            <SecondaryText>
              Exchange rates for {sourceCurrency} as of {queryResult.data.date} (#{queryResult.data.sequenceNo})
            </SecondaryText>
          </ListHeader>
        }
      />
    </SafeAreaView>
  )
}
