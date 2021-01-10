import axios from 'axios';

const tich = axios.create({
  baseURL: `${process.env.REACT_APP_BASE_URL}`,
  headers: {
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
  },
  responseType: 'json',
});

export const signup = async ({
  email,
  password,
  password_confirmation,
}: {
  email: string;
  password: string;
  password_confirmation?: string;
}) => {
  return await tich.post('/auth', {
    email,
    password,
    password_confirmation,
  });
};

export const signin = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  return await tich.post('/auth/sign_in', {
    email,
    password,
  });
};

export const silentSignin = async () => {
  const uid = localStorage.getItem('uid') || '';
  const client = localStorage.getItem('client') || '';
  const accessToken = localStorage.getItem('access-token') || '';

  return await tich.get('/auth/validate_token', {
    headers: {
      'Content-Type': 'application/json',
      'X-Requested-With': 'XMLHttpRequest',
      Authorization: `Bearer ${accessToken}`,
    },
    params: {
      uid: uid,
      client: client,
      'access-token': accessToken,
    },
  });
};

export const omniAuthCallback = async (res: any) => {
  return await tich.post('/omniauth/google_oauth2/callback', {
    data: res,
  });
};
