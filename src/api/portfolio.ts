import axios from 'axios';

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
  sheet: any;
}) => {
  sheet.map((item) => (item['targetPrice'] = Number(item['targetPrice'])));
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
      sheet,
    },
  });
};
