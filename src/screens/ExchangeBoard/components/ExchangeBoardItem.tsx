import React, { FC } from 'react'
import styled from 'styled-components/native'
import { BaseText } from '../../../components/BaseText.tsx'
import { SecondaryText } from '../../../components/SecondaryText.tsx'
import { SupportedSourceCurrencyCode, TargetCurrency } from '../../../model/types.ts'
import { formatNumericValue } from '../../../util/format.ts'

export type ExchangeBoardItemProps = {
  targetCurrency: TargetCurrency
  sourceCurrencyCode: SupportedSourceCurrencyCode
}

const ItemWrapper = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 10px;
  min-height: 60px;
`

const LeadingContainer = styled.View`
  display: flex;
  flex-direction: column;
`

export const ExchangeBoardItem: FC<ExchangeBoardItemProps> = ({ targetCurrency, sourceCurrencyCode }) => {
  return (
    <ItemWrapper>
      <LeadingContainer>
        <BaseText>
          {formatNumericValue(targetCurrency.rate.amountTarget)} {targetCurrency.currencyCode}
        </BaseText>
        <SecondaryText>
          {targetCurrency.countryName} ({targetCurrency.currencyName})
        </SecondaryText>
      </LeadingContainer>

      <BaseText>
        {formatNumericValue(targetCurrency.rate.amountSource)} {sourceCurrencyCode}
      </BaseText>
    </ItemWrapper>
  )
}
