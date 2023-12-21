import { useMemo, useState } from 'react'
import { Rate } from '../../../model/types.ts'
import { formatNumericValue } from '../../../util/format.ts'

const sanitizeText = (text: string): string => {
  // Due to locales that use comma as a decimal separator.
  return text.replaceAll(',', '.')
}

const getNumericValueFromInput = (text: string): number => Number(sanitizeText(text))

const isValidCurrencyAmount = (text: string): boolean => {
  const numericValue = getNumericValueFromInput(text)
  return !Number.isNaN(numericValue) && numericValue >= 0
}

export const useRateConversionController = (rate: Rate) => {
  const [sourceValue, setSourceValue] = useState('')

  const handleSourceValueChange = (newSourceValue: string) => {
    if (isValidCurrencyAmount(newSourceValue)) {
      setSourceValue(newSourceValue)
    }
  }

  const targetValue = useMemo(() => {
    const numericSourceValue = getNumericValueFromInput(sourceValue)
    return formatNumericValue((numericSourceValue * rate.amountSource) / rate.amountTarget)
  }, [rate.amountSource, rate.amountTarget, sourceValue])

  return { sourceValue, targetValue, handleSourceValueChange }
}
