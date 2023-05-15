import { HOME_PAGE_TAB_SELECTORS } from './../../../constants/HOMEPAGE/index';
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  restaurantsCards: {
    data: [] as any,
    totalOpenRestaurants: null,
    isFetching: false,
    statusMsg: '',
    offset: 0,
  },
  filtersList: {
    isFetchingFilters: false,
    data: [],
    appliedFilters: [] as any,
    filtersInAPIPayload: [],
  },
  tabSelection: {
    currentTab: HOME_PAGE_TAB_SELECTORS[0].sortBy,
    isFetchOnlyVeg: false,
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
      state.restaurantsCards.offset = 0;
    },

    // handle veg switch actions
    FETCH_ONLY_VEG_RESTAURANTS_TOGGLE: state => {
      state.tabSelection.isFetchOnlyVeg = !state.tabSelection.isFetchOnlyVeg;
      state.restaurantsCards.data = [];
      state.restaurantsCards.offset = 0;
      state.tabSelection.currentTab = HOME_PAGE_TAB_SELECTORS[0].sortBy;
    },

    //handle offset addition
    UPDATE_OFFSET: (state, action) => {
      state.restaurantsCards.offset =
        state.restaurantsCards.offset + action.payload;
    },

    // handle filters fetching
    GET_FILTERS_LIST: state => {
      state.filtersList.isFetchingFilters = true;
    },
    GET_FILTERS_LIST_SUCCESS: (state, action) => {
      state.filtersList.isFetchingFilters = false;
      state.filtersList.data = action.payload;
    },
    GET_FILTERS_LIST_FAIL: state => {
      state.filtersList.isFetchingFilters = false;
    },

    // handle check / uncheck filters from filtersList
    ADD_CHECKED_FILTER_INTO_FILTERS_LIST: (state, action) => {
      state.filtersList.appliedFilters = [
        ...state.filtersList.appliedFilters,
        action.payload,
      ];
    },
    REMOVE_UNCHECKED_FILTER_INTO_FILTERS_LIST: (state, action) => {
      state.filtersList.appliedFilters =
        state.filtersList.appliedFilters.filter(
          (elem: any) => elem !== action.payload
        );
    },

    // handle apply button of filters
    ADD_FILTERS_TO_API_PAYLOAD: state => {
      state.filtersList.filtersInAPIPayload = state.filtersList.appliedFilters;
      state.restaurantsCards.data = [];
      state.restaurantsCards.offset = 0;
      state.tabSelection.currentTab = HOME_PAGE_TAB_SELECTORS[0].sortBy;
    },
    // handle remove filters button
    REMOVE_FILTERS_FROM_API_PAYLOAD: (state, action) => {
      if (action.payload.length) {
        state.filtersList.filtersInAPIPayload =
          state.filtersList.filtersInAPIPayload.filter(
            (elem: any) => elem !== action.payload
          );
        state.filtersList.appliedFilters =
          state.filtersList.appliedFilters.filter(
            (elem: any) => elem !== action.payload
          );
      } else {
        state.filtersList.filtersInAPIPayload = [];
        state.filtersList.appliedFilters = [];
      }
      state.restaurantsCards.offset = 0;
      state.restaurantsCards.data = [];
      state.tabSelection.currentTab = HOME_PAGE_TAB_SELECTORS[0].sortBy;
    },
  },
});

export default homepageSlice.reducer;
export const {
  GET_RESTAURANTS,
  GET_RESTAURANTS_SUCCESS,
  GET_RESTAURANTS_FAIL,
  CHANGE_TAB_SELECTION,
  FETCH_ONLY_VEG_RESTAURANTS_TOGGLE,
  UPDATE_OFFSET,
  GET_FILTERS_LIST,
  GET_FILTERS_LIST_SUCCESS,
  GET_FILTERS_LIST_FAIL,
  ADD_CHECKED_FILTER_INTO_FILTERS_LIST,
  REMOVE_UNCHECKED_FILTER_INTO_FILTERS_LIST,
  ADD_FILTERS_TO_API_PAYLOAD,
  REMOVE_FILTERS_FROM_API_PAYLOAD,
} = homepageSlice.actions;
