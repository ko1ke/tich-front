import axios from 'axios';

export const fetchPortfolios = async ({ uid }: { uid: string }) => {
  const client = axios.create({
    baseURL: `${process.env.REACT_APP_BASE_URL}`,
    headers: {
      'Content-Type': 'application/json',
      'X-Requested-With': 'XMLHttpRequest',
      uid: uid,
      withCredentials: true,
    },
    responseType: 'json',
  });

  return await client.get('/portfolios');
};

export const createPortfolio = async ({
  uid,
  sheet,
}: {
  uid: string;
  sheet: any;
}) => {
  const client = axios.create({
    baseURL: `${process.env.REACT_APP_BASE_URL}`,
    headers: {
      'Content-Type': 'application/json',
      'X-Requested-With': 'XMLHttpRequest',
      uid: uid,
      withCredentials: true,
    },
    responseType: 'json',
  });
  return await client.post('/portfolios', {
    portfolio: {
      sheet: JSON.stringify(sheet),
    },
  });
};

// export const signin = async ({
//   email,
//   password,
// }: {
//   email: string;
//   password: string;
// }) => {
//   return await client.post('/auth/sign_in', {
//     email,
//     password,
//   });
// };
