import axios from 'axios';

export const getRestaurantsUtilS = async (offset: number, sortBy: string) => {
  const resp = await axios({
    method: 'GET',
    url: `https://www.swiggy.com/dapi/restaurants/list/v5?lat=12.9351929&lng=77.62448069999999&offset=${offset}&sortBy=${sortBy}&pageType=SEE_ALL&page_type=DESKTOP_SEE_ALL_LISTING`,
  });

  const {
    data: { data },
  } = resp;

  return data;
};
