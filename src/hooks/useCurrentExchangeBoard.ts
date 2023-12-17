import { useQuery } from 'react-query'
import { QueryKeys } from '../queryKeys.ts'
import { fetchCurrentExchangeBoard } from '../api/centralBankExchangeRate/api.ts'
import { SupportedLocalCurrencyCode } from '../model/types.ts'

export const useCurrentExchangeBoard = (localCurrency: SupportedLocalCurrencyCode) =>
  useQuery([QueryKeys.CurrentExchangeBoard, localCurrency], () => fetchCurrentExchangeBoard(localCurrency), {
    // TODO: Figure out these times
    staleTime: Infinity,
    cacheTime: Infinity,
    // TODO: Add custom logger
    // TODO: Tweak the error logging
    onError: (error) =>
      console.error(`[useCurrentExchangeBoard]: Fetching current exchange board failed:`, JSON.stringify(error)),
  })
