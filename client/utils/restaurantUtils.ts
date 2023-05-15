import axios from 'axios';

export const fetchRestaurantDetailsByIdUtils = async (restaurantId: string) => {
  try {
    const {
      data: {
        data: { cards },
      },
    } = await axios({
      method: 'GET',
      url: `https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=12.9351929&lng=77.62448069999999&restaurantId=${restaurantId}&submitAction=ENTER`,
    });

    return cards;
  } catch (error: any) {
    throw new Error(error);
  }
};
