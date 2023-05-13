import { HOME_PAGE_TAB_SELECTORS } from './../../../constants/HOMEPAGE/index';
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  restaurantsCards: {
    data: [] as any,
    totalOpenRestaurants: null,
    isFetching: false,
    statusMsg: '',
  },
  tabSelection: {
    currentTab: HOME_PAGE_TAB_SELECTORS[0].sortBy,
  },
};

const homepageSlice = createSlice({
  name: 'HOMEPAGE_SLICE',
  initialState: initialState,
  reducers: {
    // handle fetching the restaurant cards
    GET_RESTAURANTS: (state, _action) => {
      state.restaurantsCards.isFetching = true;
    },
    GET_RESTAURANTS_SUCCESS: (state, action) => {
      const { cards, totalSize } = action.payload;
      state.restaurantsCards.isFetching = false;
      state.restaurantsCards.data = [...state.restaurantsCards.data, ...cards];
      state.restaurantsCards.totalOpenRestaurants = totalSize;
    },
    GET_RESTAURANTS_FAIL: state => {
      state.restaurantsCards.isFetching = false;
      state.restaurantsCards.statusMsg =
        'Oops ! Unable to fetch near by restaurants';
    },

    // handle tab selection
    CHANGE_TAB_SELECTION: (state, action) => {
      state.tabSelection.currentTab = action.payload;
      state.restaurantsCards.data = [];
    },
  },
});

export default homepageSlice.reducer;
export const {
  GET_RESTAURANTS,
  GET_RESTAURANTS_SUCCESS,
  GET_RESTAURANTS_FAIL,
  CHANGE_TAB_SELECTION,
} = homepageSlice.actions;
