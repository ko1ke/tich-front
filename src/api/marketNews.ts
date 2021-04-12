import axios from 'axios';

export interface DataQueryParams {
  page: number;
  keyword: string;
}

const generateQueryString = (obj: any): string => {
  return Object.keys(obj)
    .map((key) => `${key}=${obj[key]}`)
    .join('&');
};

export const fetchMarketNews = async ({
  params,
}: {
  params: DataQueryParams;
}) => {
  const client = axios.create({
    baseURL: `${process.env.REACT_APP_BASE_URL}`,
    headers: {
      'Content-Type': 'application/json',
      'X-Requested-With': 'XMLHttpRequest',
    },
    responseType: 'json',
  });
  const url = `/news/markets?${generateQueryString(params)}`;
  return await client.get(url);
};
