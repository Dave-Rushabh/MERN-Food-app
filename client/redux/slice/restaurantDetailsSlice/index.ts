import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  restaurant: {
    data: null,
    isFetchingRestaurantInfo: false,
  },
};

const restaurantDetailsSlice = createSlice({
  name: 'RESTAURANT_DETAILS_SLICE',
  initialState: initialState,
  reducers: {
    // fetch restaurant details
    FETCH_RESTAURANT_DETAILS: (state, _action) => {
      state.restaurant.isFetchingRestaurantInfo = true;
    },
    FETCH_RESTAURANT_DETAILS_SUCCESS: (state, action) => {
      state.restaurant.isFetchingRestaurantInfo = false;
      state.restaurant.data = action.payload;
    },
    FETCH_RESTAURANT_DETAILS_FAIL: state => {
      state.restaurant.isFetchingRestaurantInfo = false;
    },
  },
});

export default restaurantDetailsSlice.reducer;
export const {
  FETCH_RESTAURANT_DETAILS,
  FETCH_RESTAURANT_DETAILS_SUCCESS,
  FETCH_RESTAURANT_DETAILS_FAIL,
} = restaurantDetailsSlice.actions;
