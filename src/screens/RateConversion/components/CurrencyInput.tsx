import React, { FC } from 'react'
import { TextInputProps } from 'react-native'
import styled from 'styled-components/native'
import { BaseText } from '../../../components/BaseText.tsx'

const StyledInput = styled.TextInput`
  color: ${(props) => props.theme.colors.text};
  background: ${(props) => props.theme.colors.inputBackground};
  flex-grow: 1;
  padding: 10px;
`

const InputContainer = styled.View`
  display: flex;
  border: 1px solid ${(props) => props.theme.colors.textSecondary};
  background: ${(props) => props.theme.colors.inputBackground};
  flex-direction: row;
  align-items: center;
  gap: 10px;
`

const CurrencyLabel = styled(BaseText)`
  padding: 10px;
`

type CurrencyInputProps = Omit<TextInputProps, 'placeholder' | 'keyboardType'> & {
  currencyCode: string
  showPlaceholder?: boolean
}

export const CurrencyInput: FC<CurrencyInputProps> = ({ currencyCode, showPlaceholder = true, ...props }) => {
  const placeholder = showPlaceholder ? `Enter amount in ${currencyCode}` : undefined

  return (
    <InputContainer>
      <StyledInput keyboardType="numeric" placeholder={placeholder} {...props} />
      <CurrencyLabel>{currencyCode}</CurrencyLabel>
    </InputContainer>
  )
}
