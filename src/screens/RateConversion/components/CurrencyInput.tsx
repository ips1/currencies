import React, { FC } from 'react'
import { TextInputProps } from 'react-native'
import styled from 'styled-components/native'
import { BaseText } from '../../../components/BaseText.tsx'

const StyledInput = styled.TextInput`
  color: ${(props) => props.theme.colors.text};
  font-size: 20px;
  flex-grow: 1;
  padding-left: 10px;
`

const InputContainer = styled.View`
  display: flex;
  flex-direction: row;
  border-radius: 8px;
  background: ${(props) => props.theme.colors.inputBackground};
  align-items: center;
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
      <StyledInput
        maxLength={22}
        clearButtonMode="while-editing"
        keyboardType="numeric"
        placeholder={placeholder}
        {...props}
      />
      <CurrencyLabel>{currencyCode}</CurrencyLabel>
    </InputContainer>
  )
}
