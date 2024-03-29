import axios from 'axios';
import { User } from '../typings';

export const createUser = async ({ token }: { token: string }) => {
  const client = axios.create({
    baseURL: `${process.env.REACT_APP_BASE_URL}`,
    headers: {
      'Content-Type': 'application/json',
      'X-Requested-With': 'XMLHttpRequest',
      Authorization: `Bearer ${token}`,
      withCredentials: true,
    },
    responseType: 'json',
  });
  return await client.post<User>('/users');
};

export const rankUpUser = async ({
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
  return await client.put<User>('/users/rank_up');
};
