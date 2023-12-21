export type Rate = {
  amountSource: number
  amountTarget: number
}

export type TargetCurrency = {
  countryName: string
  currencyName: string
  currencyCode: string
  rate: Rate
}

export type ExchangeBoard = {
  date: Date
  sequenceNo: number
  currencies: TargetCurrency[]
}

export type SupportedSourceCurrencyCode = 'CZK'
