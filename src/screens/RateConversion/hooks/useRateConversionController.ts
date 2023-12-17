import { useState } from 'react'
import { Rate } from '../../../model/types.ts'

export const useRateConversionController = (rate: Rate) => {
  const [localValue, setLocalValue] = useState('')
  const [foreignValue, setForeignValue] = useState('')

  const handleLocalValueChange = (newLocalValue: string) => {
    setLocalValue(newLocalValue)

    const numericLocalValue = Number(newLocalValue)

    if (Number.isNaN(numericLocalValue)) {
      setForeignValue('Invalid input!')
      return
    }

    // TODO: Format
    setForeignValue(String((numericLocalValue * rate.amountLocal) / rate.amountForeign))
  }

  return { localValue, foreignValue, handleLocalValueChange }
}
