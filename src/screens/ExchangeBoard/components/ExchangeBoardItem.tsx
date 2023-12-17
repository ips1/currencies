import { ForeignCurrency } from '../../../model/types.ts'
import React, { FC } from 'react'
import styled from 'styled-components/native'

export type ExchangeBoardItemProps = {
  foreignCurrency: ForeignCurrency
  localCurrencyCode: string
}

const ItemWrapper = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 10px;
  min-height: 50px;
`

const LeadingContainer = styled.View`
  display: flex;
  flex-direction: column;
`

const StyledText = styled.Text`
  color: ${(props) => props.theme.colors.foreground};
`

export const ExchangeBoardItem: FC<ExchangeBoardItemProps> = ({ foreignCurrency, localCurrencyCode }) => {
  return (
    <ItemWrapper>
      <LeadingContainer>
        <StyledText>
          {foreignCurrency.rate.amountLocal} {foreignCurrency.currencyCode}
        </StyledText>
        <StyledText>
          {foreignCurrency.countryName} ({foreignCurrency.currencyName})
        </StyledText>
      </LeadingContainer>

      <StyledText>
        {foreignCurrency.rate.amountForeign} {localCurrencyCode}
      </StyledText>
    </ItemWrapper>
  )
}
