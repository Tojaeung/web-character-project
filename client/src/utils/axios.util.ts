import axios, { AxiosInstance, AxiosResponse, AxiosError } from 'axios';

const instance: AxiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,

  headers: {
    'Content-Type': 'application/json; charset=utf-8',
    Accept: 'application/json',
  },
  withCredentials: true,
  timeout: 10000,
});

instance.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  async (err: AxiosError) => {
    if (err.response?.data.status === 404) {
      window.location.href = '/not-found';
    }

    return Promise.reject(err);
  }
);

export default instance;
