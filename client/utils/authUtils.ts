import { API_ENDPOINT } from './../constants/API_ENDPOINTS/api_endpoints';
import axios from 'axios';

export const isTokenAvailable = () =>
  sessionStorage.getItem('token') ? true : false;

export const setToken = (token: string) => {
  sessionStorage.setItem('token', token);
};

export const getToken = () => sessionStorage.getItem('token');

export const handleSignUp = async (values: any) => {
  try {
    const response = await axios({
      method: 'POST',
      url: `${API_ENDPOINT}/api/sign-up`,
      data: values,
    });
    const {
      data: { token, message },
    } = response;
    setToken(token);
    return message;
  } catch (error) {
    console.log(error);
  }
};
