import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  restaurantsCards: {
    data: null,
    totalOpenRestaurants: null,
    isFetching: false,
    statusMsg: '',
  },
};

const homepageSlice = createSlice({
  name: 'HOMEPAGE_SLICE',
  initialState: initialState,
  reducers: {
    // handle fetching the restaurant cards
    GET_RESTAURANTS: state => {
      state.restaurantsCards.isFetching = true;
    },
    GET_RESTAURANTS_SUCCESS: (state, action) => {
      const { cards, totalSize } = action.payload;
      state.restaurantsCards.isFetching = false;
      state.restaurantsCards.data = cards;
      state.restaurantsCards.totalOpenRestaurants = totalSize;
    },
    GET_RESTAURANTS_FAIL: state => {
      state.restaurantsCards.isFetching = false;
      state.restaurantsCards.statusMsg =
        'Oops ! Unable to fetch near by restaurants';
    },
  },
});

export default homepageSlice.reducer;
export const {
  GET_RESTAURANTS,
  GET_RESTAURANTS_SUCCESS,
  GET_RESTAURANTS_FAIL,
} = homepageSlice.actions;
