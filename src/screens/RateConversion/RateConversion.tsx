import React, { FC } from 'react'
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
  const { rate } = route.params.foreignCurrency

  // TODO: Handle input error
  const { localValue, foreignValue, handleLocalValueChange } = useRateConversionController(rate)

  return (
    <>
      <ExchangeBoardItem
        foreignCurrency={route.params.foreignCurrency}
        localCurrencyCode={route.params.localCurrencyCode}
      />
      <ConversionContainer>
        <CurrencyInput
          value={localValue}
          onChangeText={handleLocalValueChange}
          currencyCode={route.params.localCurrencyCode}
          autoFocus={true}
        />
        <CurrencyInput
          value={foreignValue}
          showPlaceholder={false}
          editable={false}
          selectTextOnFocus={false}
          currencyCode={route.params.foreignCurrency.currencyCode}
        />
      </ConversionContainer>
    </>
  )
}
