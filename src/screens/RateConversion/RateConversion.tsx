import React, { FC } from 'react'
import { SafeAreaView } from 'react-native'
import styled from 'styled-components/native'
import { RateConversionNavigationProps } from '../../navigation/params.ts'
import { ExchangeBoardItem } from '../ExchangeBoard/components/ExchangeBoardItem.tsx'
import { CurrencyInput } from './components/CurrencyInput.tsx'
import { useRateConversionController } from './hooks/useRateConversionController.ts'

type RateConversionProps = RateConversionNavigationProps

const ConversionContainer = styled.View`
  padding: 10px;
  gap: 20px;
`

export const RateConversion: FC<RateConversionProps> = ({ route }) => {
  const { rate } = route.params.targetCurrency

  // TODO: Handle input error
  const { sourceValue, targetValue, handleSourceValueChange } = useRateConversionController(rate)

  return (
    <SafeAreaView>
      <ExchangeBoardItem
        targetCurrency={route.params.targetCurrency}
        sourceCurrencyCode={route.params.sourceCurrencyCode}
      />
      <ConversionContainer>
        <CurrencyInput
          value={sourceValue}
          maxLength={16}
          onChangeText={handleSourceValueChange}
          currencyCode={route.params.sourceCurrencyCode}
          autoFocus={true}
        />
        <CurrencyInput
          value={targetValue}
          showPlaceholder={false}
          editable={false}
          selectTextOnFocus={false}
          currencyCode={route.params.targetCurrency.currencyCode}
        />
      </ConversionContainer>
    </SafeAreaView>
  )
}
