import axios from 'axios';

export const createChip = async () => {
  const client = axios.create({
    baseURL: `${process.env.REACT_APP_BASE_URL}`,
    headers: {
      'Content-Type': 'application/json',
      'X-Requested-With': 'XMLHttpRequest',
      withCredentials: true,
    },
    responseType: 'json',
  });

  return await client.post('/chips');
};
