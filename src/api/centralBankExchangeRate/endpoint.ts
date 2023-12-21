import { SupportedSourceCurrencyCode } from '../../model/types.ts'
import { OneOf } from '../../types/common.ts'

export const CentralBankExchangeRateApiEndpoint = {
  Daily: 'daily.txt',
} as const
export type CentralBankExchangeRateApiEndpoint = OneOf<typeof CentralBankExchangeRateApiEndpoint>

export const EndpointForCurrency = {
  CZK: CentralBankExchangeRateApiEndpoint.Daily,
} as const satisfies Record<SupportedSourceCurrencyCode, CentralBankExchangeRateApiEndpoint>
