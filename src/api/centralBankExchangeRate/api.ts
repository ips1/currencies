import { ExchangeBoard } from '../../model/types.ts'
import axios from 'axios'
import { CentralBankExchangeRateApiEndpoints } from './endpoint.ts'
import { parseExchangeBoardText } from './parser.ts'

const BASE_URL =
  'https://www.cnb.cz/en/financial-markets/foreign-exchange-market/central-bank-exchange-rate-fixing/central-bank-exchange-rate-fixing'

const axiosInstance = axios.create({ baseURL: BASE_URL })

// TODO: Add interface
export const fetchCurrentExchangeBoard = async (): Promise<ExchangeBoard> => {
  // TODO: Handle errors
  const { data } = await axiosInstance.get<string>(CentralBankExchangeRateApiEndpoints.Daily)
  console.log(`[fetchCurrentExchangeBoard]: Successfully fetched the data:\n${data}`)
  return parseExchangeBoardText(data)
}
