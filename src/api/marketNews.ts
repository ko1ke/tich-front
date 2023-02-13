import axios from 'axios';
import { MarketNewsQueryParams, NewsPage } from '../typings';
import { generateQueryString } from '../utils/query';

export const fetchMarketNews = async ({
  uid,
  token,
  params,
}: {
  uid: string;
  token: string;
  params: MarketNewsQueryParams;
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
  const url = `/news/markets?${generateQueryString(params)}`;
  return await client.get<NewsPage>(url);
};
