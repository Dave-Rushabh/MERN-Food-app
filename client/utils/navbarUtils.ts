import { API_ENDPOINT } from './../constants/API_ENDPOINTS/api_endpoints';
import axios from 'axios';

export const getUserInfoByUserId = async (userId: any) => {
  try {
    const response = await axios({
      method: 'GET',
      url: `${API_ENDPOINT}/api/user/${userId}`,
    });
    const { data } = response;
    return data;
  } catch (error: any) {
    throw new Error(error?.response?.data?.message ?? error?.message);
  }
};
