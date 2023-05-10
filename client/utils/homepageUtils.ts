import axios from 'axios';

export const getRestaurantsUtilS = async () => {
  const resp = await axios({
    method: 'GET',
    url: 'https://www.swiggy.com/dapi/restaurants/list/v5?lat=12.9715987&lng=77.5945627&page_type=DESKTOP_WEB_LISTING',
  });
  const {
    data: {
      data: { cards },
    },
  } = resp;

  const {
    data: { data: restauratsInfo },
  } = cards.find((elem: any) => elem?.cardType === 'seeAllRestaurants');

  return restauratsInfo;
};
