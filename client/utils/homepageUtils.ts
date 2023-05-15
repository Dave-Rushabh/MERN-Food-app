import axios from 'axios';

// to be used when integrating filters API
// const filters = encodeURIComponent(
//   JSON.stringify({ CUISINES: ['Gujarati', 'Thai'] })
// );

interface getRestaurantsUtilSParams {
  offset: number;
  sortBy: string;
  isFetchOnlyVeg: boolean;
  filters: any[];
}

export const getRestaurantsUtilS = async (
  params: getRestaurantsUtilSParams
) => {
  const { offset, sortBy, isFetchOnlyVeg, filters } = params;

  if (!isFetchOnlyVeg && !filters?.length) {
    try {
      const resp = await axios({
        method: 'GET',
        url: `https://www.swiggy.com/dapi/restaurants/list/v5?lat=12.9351929&lng=77.62448069999999&offset=${offset}&sortBy=${sortBy}&pageType=SEE_ALL&page_type=DESKTOP_SEE_ALL_LISTING`,
      });

      const {
        data: { data },
      } = resp;

      return data;
    } catch (error: any) {
      throw new Error(error);
    }
  }

  if (isFetchOnlyVeg && !filters.length) {
    try {
      const vegFilter = encodeURIComponent(
        JSON.stringify({ SHOW_RESTAURANTS_WITH: ['Pure Veg'] })
      );
      const resp = await axios({
        method: 'GET',
        url: `https://www.swiggy.com/dapi/restaurants/list/v5?lat=12.9351929&lng=77.62448069999999&offset=${offset}&sortBy=${sortBy}&filters=${vegFilter}&pageType=SEE_ALL&page_type=DESKTOP_SEE_ALL_LISTING`,
      });

      const {
        data: { data },
      } = resp;

      return data;
    } catch (error: any) {
      throw new Error(error);
    }
  }

  if (isFetchOnlyVeg && filters.length) {
    try {
      const combinedFilter = encodeURIComponent(
        JSON.stringify({
          CUISINES: filters,
          SHOW_RESTAURANTS_WITH: ['Pure Veg'],
        })
      );

      const resp = await axios({
        method: 'GET',
        url: `https://www.swiggy.com/dapi/restaurants/list/v5?lat=12.9351929&lng=77.62448069999999&offset=${offset}&sortBy=${sortBy}&filters=${combinedFilter}&pageType=SEE_ALL&page_type=DESKTOP_SEE_ALL_LISTING`,
      });

      const {
        data: { data },
      } = resp;

      return data;
    } catch (error: any) {
      throw new Error(error);
    }
  }

  if (!isFetchOnlyVeg && filters.length) {
    try {
      const cuisinesFilter = encodeURIComponent(
        JSON.stringify({
          CUISINES: filters,
        })
      );

      const resp = await axios({
        method: 'GET',
        url: `https://www.swiggy.com/dapi/restaurants/list/v5?lat=12.9351929&lng=77.62448069999999&offset=${offset}&sortBy=${sortBy}&filters=${cuisinesFilter}&pageType=SEE_ALL&page_type=DESKTOP_SEE_ALL_LISTING`,
      });

      const {
        data: { data },
      } = resp;

      return data;
    } catch (error: any) {
      throw new Error(error);
    }
  }
};

export const getFiltersListUtils = async () => {
  try {
    const resp = await axios({
      method: 'GET',
      url: 'https://www.swiggy.com/dapi/restaurants/list/v5?lat=12.9351929&lng=77.62448069999999&sortBy=RELEVANCE&page_type=DESKTOP_WEB_LISTING',
    });

    const {
      data: {
        data: { filters },
      },
    } = resp;

    const [{ options }] = filters.filter(
      (elem: any) => elem?.key === 'CUISINES'
    );

    return options;
  } catch (error: any) {
    throw new Error(error);
  }
};
