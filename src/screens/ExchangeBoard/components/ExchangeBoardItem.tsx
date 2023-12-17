import React, { FC } from 'react'
import styled from 'styled-components/native'
import { BaseText } from '../../../components/BaseText.tsx'
import { SecondaryText } from '../../../components/SecondaryText.tsx'
import { ForeignCurrency, SupportedLocalCurrencyCode } from '../../../model/types.ts'

export type ExchangeBoardItemProps = {
  foreignCurrency: ForeignCurrency
  localCurrencyCode: SupportedLocalCurrencyCode
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

export const ExchangeBoardItem: FC<ExchangeBoardItemProps> = ({ foreignCurrency, localCurrencyCode }) => {
  return (
    <ItemWrapper>
      <LeadingContainer>
        <BaseText>
          {foreignCurrency.rate.amountForeign} {foreignCurrency.currencyCode}
        </BaseText>
        <SecondaryText>
          {foreignCurrency.countryName} ({foreignCurrency.currencyName})
        </SecondaryText>
      </LeadingContainer>

      <BaseText>
        {foreignCurrency.rate.amountLocal} {localCurrencyCode}
      </BaseText>
    </ItemWrapper>
  )
}
