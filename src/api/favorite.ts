import axios from 'axios';

export const createFavorite = async ({
  uid,
  token,
  newsId,
}: {
  uid: string;
  token: string;
  newsId: number;
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
  return await client.post('/favorites', {
    favorite: {
      news_id: newsId,
    },
  });
};

export const deleteFavorite = async ({
  uid,
  token,
  newsId,
}: {
  uid: string;
  token: string;
  newsId: number;
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
  return await client.delete(`/favorites/${newsId}`);
};
