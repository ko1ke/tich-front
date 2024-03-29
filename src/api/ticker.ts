import axios from 'axios';
import type { Ticker } from '../typings';

export const fetchTickers = async () => {
  const client = axios.create({
    baseURL: `${process.env.REACT_APP_BASE_URL}`,
    headers: {
      'Content-Type': 'application/json',
      'X-Requested-With': 'XMLHttpRequest',
    },
    responseType: 'json',
  });
  const url = '/tickers';
  return await client.get<Ticker[]>(url);
};
