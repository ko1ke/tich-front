import axios from 'axios';
import { PortfolioProps } from '../typings';

export const fetchPortfolios = async ({
  uid,
  token,
}: {
  uid: string;
  token: string;
}) => {
  const client = axios.create({
    baseURL: `${process.env.REACT_APP_BASE_URL}`,
    headers: {
      'Content-Type': 'application/json',
      'X-Requested-With': 'XMLHttpRequest',
      Authorization: `Bearer ${token}`,
      uid: uid,
      withCredentials: true,
    },
    responseType: 'json',
  });

  return await client.get('/portfolios');
};

export const createPortfolio = async ({
  uid,
  token,
  sheet,
}: {
  uid: string;
  token: string;
  sheet: PortfolioProps[];
}) => {
  const client = axios.create({
    baseURL: `${process.env.REACT_APP_BASE_URL}`,
    headers: {
      'Content-Type': 'application/json',
      'X-Requested-With': 'XMLHttpRequest',
      Authorization: `Bearer ${token}`,
      uid: uid,
      withCredentials: true,
    },
    responseType: 'json',
  });
  return await client.post('/portfolios', {
    portfolio: {
      sheet: sheet.map((item) => ({
        symbol: item['symbol'],
        targetPrice: Number(item['targetPrice']),
        note: item['note'],
      })),
    },
  });
};
