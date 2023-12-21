import { useState } from 'react'
import { Rate } from '../../../model/types.ts'
import { formatNumericValue } from '../../../util/format.ts'

const sanitizeText = (text: string): string => {
  // Due to locales that use comma as a decimal separator.
  return text.replaceAll(',', '.')
}

const getNumericValueFromInput = (text: string): number => Number(sanitizeText(text))

export const useRateConversionController = (rate: Rate) => {
  const [sourceValue, setSourceValue] = useState('')
  const [targetValue, setTargetValue] = useState('')

  const handleSourceValueChange = (newSourceValue: string) => {
    const numericSourceValue = getNumericValueFromInput(newSourceValue)

    if (Number.isNaN(numericSourceValue) || numericSourceValue < 0) {
      return
    }

    setSourceValue(newSourceValue)

    const newForeignValue = formatNumericValue((numericSourceValue * rate.amountSource) / rate.amountTarget)
    setTargetValue(newForeignValue)
  }

  return { sourceValue, targetValue, handleSourceValueChange }
}
