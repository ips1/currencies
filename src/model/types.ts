export type Rate = {
  amountLocal: number
  amountForeign: number
}

export type ForeignCurrency = {
  countryName: string
  currencyName: string
  currencyCode: string // TODO: better type the currency
  rate: Rate
}

export type ExchangeBoard = {
  date: Date
  sequenceNo: number
  currencies: ForeignCurrency[]
}

export type SupportedLocalCurrencyCode = 'CZK'
