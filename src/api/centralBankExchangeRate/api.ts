import axios from 'axios'
import { ExchangeBoard, SupportedSourceCurrencyCode } from '../../model/types.ts'
import { EndpointForCurrency } from './endpoint.ts'
import { parseExchangeBoardText } from './parser.ts'

const BASE_URL =
  'https://www.cnb.cz/en/financial-markets/foreign-exchange-market/central-bank-exchange-rate-fixing/central-bank-exchange-rate-fixing'

const axiosInstance = axios.create({ baseURL: BASE_URL })

export const fetchCurrentExchangeBoard = async (
  sourceCurrency: SupportedSourceCurrencyCode,
): Promise<ExchangeBoard> => {
  const { data } = await axiosInstance.get<string>(EndpointForCurrency[sourceCurrency])
  console.log(`[fetchCurrentExchangeBoard]: Successfully fetched the data:\n${data}`)
  return parseExchangeBoardText(data)
}
