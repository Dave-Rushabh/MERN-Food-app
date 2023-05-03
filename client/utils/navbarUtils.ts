import { API_ENDPOINT } from './../constants/API_ENDPOINTS/api_endpoints';
import axios from 'axios';
import { getToken } from './authUtils';

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
