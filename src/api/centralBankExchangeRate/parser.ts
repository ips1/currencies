import { ExchangeBoard, ForeignCurrency } from '../../model/types.ts'

const DELIMITER = '|'
const EXPECTED_LINE_PARTS = 5
const parseSingleCurrencyLine = (line: string): ForeignCurrency => {
  const lineParts = line.split(DELIMITER)
  if (lineParts.length != EXPECTED_LINE_PARTS) {
    throw new Error(
      `Unexpected number of line parts (${lineParts.length}) for line ${line}, expected ${EXPECTED_LINE_PARTS}`,
    )
  }

  const [countryName, currencyName, amountLocalPart, currencyCode, amountForeignPart] = lineParts

  const amountLocal = Number(amountLocalPart)
  const amountForeign = Number(amountForeignPart)

  if (!countryName || !currencyName || !currencyCode) {
    throw new Error(`Unexpected empty fields in line ${line}`)
  }

  if (Number.isNaN(amountLocal) || Number.isNaN(amountForeign)) {
    throw new Error(`Unexpected type the numeric fields in line ${line}`)
  }

  return {
    countryName,
    currencyName,
    currencyCode,
    rate: {
      amountLocal,
      amountForeign,
    },
  }
}

export const parseExchangeBoardText = (text: string): ExchangeBoard => {
  const [dateLine, _, ...currencyLines] = text.split('\n')

  if (!dateLine) {
    throw new Error('File does not contain the required header')
  }

  // Parse the header
  const [datePart, sequenceNoPart] = dateLine.split(' #')
  const sequenceNo = Number(sequenceNoPart)
  if (!datePart || !sequenceNo || Number.isNaN(sequenceNo)) {
    throw new Error(
      `The date line does not contain the required parts - datePart: ${datePart}, sequenceNo: ${sequenceNo}`,
    )
  }

  // TODO: Tweak the date parsing
  const date = new Date(datePart)

  const currencies = currencyLines.filter((line) => line).map((line) => parseSingleCurrencyLine(line))

  return {
    date,
    sequenceNo,
    currencies,
  }
}
