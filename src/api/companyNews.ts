import axios from 'axios';
import { NewsResponse, CompanyNewsQueryParams } from '../typings';

const generateQueryString = (obj: any): string => {
  return Object.keys(obj)
    .map((key) => `${key}=${obj[key]}`)
    .join('&');
};

export const fetchCompanyNews = async ({
  uid,
  token,
  params,
}: {
  uid: string;
  token: string;
  params: CompanyNewsQueryParams;
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
  const url = `/news/companies?${generateQueryString(params)}`;
  return await client.get<NewsResponse>(url);
};
