import axios from 'axios';
import { FavoriteNewsQueryParams, NewsResponse } from '../typings';
import { generateQueryString } from '../utils/query';

export const fetchFavoriteNews = async ({
  uid,
  token,
  params,
}: {
  uid: string;
  token: string;
  params: FavoriteNewsQueryParams;
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
  const url = `/news?${generateQueryString(params)}`;
  return await client.get<NewsResponse>(url);
};
