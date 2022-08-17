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

export const fetchFavoriteNews = async ({
  uid,
  token,
  params,
}: {
  uid: string;
  token: string;
  params: DataQueryParams;
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
  return await client.get(url);
};
