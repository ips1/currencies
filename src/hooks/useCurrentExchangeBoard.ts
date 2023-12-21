import { useQuery } from 'react-query'
import { fetchCurrentExchangeBoard } from '../api/centralBankExchangeRate/api.ts'
import { SupportedSourceCurrencyCode } from '../model/types.ts'
import { QueryKeys } from '../queryKeys.ts'

export const useCurrentExchangeBoard = (sourceCurrency: SupportedSourceCurrencyCode) =>
  useQuery([QueryKeys.CurrentExchangeBoard, sourceCurrency], () => fetchCurrentExchangeBoard(sourceCurrency), {
    staleTime: 60 * 60 * 1000,
    cacheTime: 120 * 60 * 1000,
    onError: (error) =>
      console.error('[useCurrentExchangeBoard]: Fetching current exchange board failed:', JSON.stringify(error)),
  })
