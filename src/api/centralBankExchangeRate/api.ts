import axios from 'axios'
import { ExchangeBoard, SupportedLocalCurrencyCode } from '../../model/types.ts'
import { EndpointForCurrency } from './endpoint.ts'
import { parseExchangeBoardText } from './parser.ts'

const BASE_URL =
  'https://www.cnb.cz/en/financial-markets/foreign-exchange-market/central-bank-exchange-rate-fixing/central-bank-exchange-rate-fixing'

const axiosInstance = axios.create({ baseURL: BASE_URL })

// TODO: Add interface
export const fetchCurrentExchangeBoard = async (localCurrency: SupportedLocalCurrencyCode): Promise<ExchangeBoard> => {
  // TODO: Handle errors
  const { data } = await axiosInstance.get<string>(EndpointForCurrency[localCurrency])
  console.log(`[fetchCurrentExchangeBoard]: Successfully fetched the data:\n${data}`)
  return parseExchangeBoardText(data)
}
