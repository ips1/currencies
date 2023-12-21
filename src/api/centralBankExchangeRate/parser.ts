import { ExchangeBoard, TargetCurrency } from '../../model/types.ts'

const DELIMITER = '|'
const EXPECTED_LINE_PARTS = 5
const parseSingleCurrencyLine = (line: string): TargetCurrency => {
  const lineParts = line.split(DELIMITER)
  if (lineParts.length !== EXPECTED_LINE_PARTS) {
    throw new Error(
      `Unexpected number of line parts (${lineParts.length}) for line ${line}, expected ${EXPECTED_LINE_PARTS}`,
    )
  }

  const [countryName, currencyName, amountTargetPart, currencyCode, amountSourcePart] = lineParts

  const amountSource = Number(amountSourcePart)
  const amountTarget = Number(amountTargetPart)

  if (!countryName || !currencyName || !currencyCode) {
    throw new Error(`Unexpected empty fields in line ${line}`)
  }

  if (Number.isNaN(amountSource) || Number.isNaN(amountTarget)) {
    throw new Error(`Unexpected type the numeric fields in line ${line}`)
  }

  return {
    countryName,
    currencyName,
    currencyCode,
    rate: {
      amountSource: amountSource,
      amountTarget: amountTarget,
    },
  }
}

export const parseExchangeBoardText = (text: string): ExchangeBoard => {
  const [dateLine, _, ...currencyLines] = text.split('\n')

  if (!dateLine) {
    throw new Error('File does not contain the required header')
  }

  // Parse the header
  const [date, sequenceNoPart] = dateLine.split(' #')
  const sequenceNo = Number(sequenceNoPart)
  if (!date || !sequenceNo || Number.isNaN(sequenceNo)) {
    throw new Error(`The date line does not contain the required parts - datePart: ${date}, sequenceNo: ${sequenceNo}`)
  }

  const currencies = currencyLines.filter((line) => line).map((line) => parseSingleCurrencyLine(line))

  return {
    date,
    sequenceNo,
    currencies,
  }
}
