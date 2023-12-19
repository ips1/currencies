import { useState } from 'react'
import { Rate } from '../../../model/types.ts'
import { formatNumericValue } from '../../../util/format.ts'

const sanitizeText = (text: string): string => {
  // Due to locales that use comma as a decimal separator.
  return text.replaceAll(',', '.')
}

const getNumericValueFromInput = (text: string): number => Number(sanitizeText(text))

export const useRateConversionController = (rate: Rate) => {
  const [localValue, setLocalValue] = useState('')
  const [foreignValue, setForeignValue] = useState('')

  const handleLocalValueChange = (newLocalValue: string) => {
    const numericLocalValue = getNumericValueFromInput(newLocalValue)

    if (Number.isNaN(numericLocalValue)) {
      return
    }

    setLocalValue(newLocalValue)

    const newForeignValue = formatNumericValue((numericLocalValue * rate.amountLocal) / rate.amountForeign)
    setForeignValue(newForeignValue)
  }

  return { localValue, foreignValue, handleLocalValueChange }
}
