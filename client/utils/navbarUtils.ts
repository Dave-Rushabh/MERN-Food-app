import { API_ENDPOINT } from './../constants/API_ENDPOINTS/api_endpoints';
import axios from 'axios';
import { getToken } from './authUtils';

interface updateUserInfoByUserIdUtilsParams {
  userId: string;
  userData: {
    contactNo: string;
    dateOfBirth: string;
    email: string;
    username: string;
  };
}

export const getUserInfoByUserIdUtils = async (userId: any) => {
  try {
    const response = await axios({
      method: 'GET',
      url: `${API_ENDPOINT}/api/user/${userId}`,
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });
    const { data } = response;
    return data;
  } catch (error: any) {
    throw new Error(error?.response?.data?.message ?? error?.message);
  }
};

export const updateUserInfoByUserIdUtils = async ({
  userId,
  userData,
}: updateUserInfoByUserIdUtilsParams) => {
  try {
    const response = await axios({
      method: 'PUT',
      url: `${API_ENDPOINT}/api/user/${userId}`,
      data: userData,
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });
    const { data } = response;

    // keep the session storage variable updated to avoid conflicts on page refresh
    const userString = sessionStorage.getItem('user');
    let user = userString ? JSON.parse(userString) : {};
    user.username = data.data.username;
    user.email = data.data.email;
    sessionStorage.setItem('user', JSON.stringify(user));

    return data;
  } catch (error: any) {
    throw new Error(error?.response?.data?.message ?? error?.message);
  }
};
