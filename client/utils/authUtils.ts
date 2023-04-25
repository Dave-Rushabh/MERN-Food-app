import { API_ENDPOINT } from './../constants/API_ENDPOINTS/api_endpoints';
import axios from 'axios';

export const isTokenAvailable = () =>
  sessionStorage.getItem('token') ? true : false;

export const setToken = (token: string) => {
  sessionStorage.setItem('token', token);
};

export const setUser = (user: any) => {
  sessionStorage.setItem('user', JSON.stringify(user));
};

export const getToken = () => sessionStorage.getItem('token');

export const handleSignUpUtils = async (values: any) => {
  try {
    const response = await axios({
      method: 'POST',
      url: `${API_ENDPOINT}/api/sign-up`,
      data: values,
    });
    const { data } = response;
    const { token, user } = data;
    setToken(token);
    setUser(user);
    return data;
  } catch (error: any) {
    throw new Error(error?.response?.data?.message ?? error?.message);
  }
};

export const handleLoginUtils = async (values: any) => {
  try {
    const response = await axios({
      method: 'POST',
      url: `${API_ENDPOINT}/api/login`,
      data: values,
    });
    const { data } = response;
    const { token, user } = data;
    setToken(token);
    setUser(user);
    return data;
  } catch (error: any) {
    throw new Error(error?.response?.data?.message ?? error?.message);
  }
};
