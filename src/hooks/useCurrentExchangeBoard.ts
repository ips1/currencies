import { useQuery } from 'react-query'
import { fetchCurrentExchangeBoard } from '../api/centralBankExchangeRate/api.ts'
import { SupportedSourceCurrencyCode } from '../model/types.ts'
import { QueryKeys } from '../queryKeys.ts'

export const useCurrentExchangeBoard = (sourceCurrency: SupportedSourceCurrencyCode) =>
  useQuery([QueryKeys.CurrentExchangeBoard, sourceCurrency], () => fetchCurrentExchangeBoard(sourceCurrency), {
    // TODO: Figure out these times
    staleTime: Infinity,
    cacheTime: Infinity,
    // TODO: Add custom logger
    // TODO: Tweak the error logging
    onError: (error) =>
      console.error('[useCurrentExchangeBoard]: Fetching current exchange board failed:', JSON.stringify(error)),
  })
