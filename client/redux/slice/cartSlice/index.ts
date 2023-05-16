import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cart: {
    data: [] as any,
  },
};

const cartDetailsSlice = createSlice({
  name: 'CART_DETAILS_SLICE',
  initialState: initialState,
  reducers: {
    // add item from a particular restaurant initially
    ADD_INITIAL_ITEM_IN_CART: (state, action) => {
      //   const { restaurantId } = action.payload;

      state.cart.data = [...state.cart.data, action.payload];
    },

    // handle further addition or removal after initial addition into the cart
    HANDLE_ADD_OR_REMOVE_CART: (state, action) => {
      const { restaurantId, flag, foodItemId } = action.payload;

      const existingRestaurant = state.cart.data.find(
        (elem: any) => elem?.restaurantId === restaurantId
      );

      const fooItemToMapInExistingRestaurant =
        existingRestaurant.foodItems.find(
          (elem: any) => elem.foodItemId === foodItemId
        );

      if (fooItemToMapInExistingRestaurant.qty > 0) {
        if (flag === 'INCREMENT') {
          fooItemToMapInExistingRestaurant.qty += 1;

          existingRestaurant.foodItems.splice(
            existingRestaurant.foodItems.findIndex(
              (elem: any) => elem.foodItemId === foodItemId
            ),
            1,
            fooItemToMapInExistingRestaurant
          );

          state.cart.data.splice(
            state.cart.data.findIndex(
              (elem: any) => elem.restaurantId === restaurantId
            ),
            1,
            existingRestaurant
          );
        } else {
          fooItemToMapInExistingRestaurant.qty -= 1;

          if (fooItemToMapInExistingRestaurant.qty === 0) {
            if (existingRestaurant.foodItems.length === 1) {
              state.cart.data.splice(
                state.cart.data.findIndex(
                  (elem: any) => elem.restaurantId === restaurantId
                ),
                1
              );
            }
          } else {
            existingRestaurant.foodItems.splice(
              existingRestaurant.foodItems.findIndex(
                (elem: any) => elem.foodItemId === foodItemId
              ),
              1,
              fooItemToMapInExistingRestaurant
            );

            state.cart.data.splice(
              state.cart.data.findIndex(
                (elem: any) => elem.restaurantId === restaurantId
              ),
              1,
              existingRestaurant
            );
          }
        }
      }
    },
  },
});

export default cartDetailsSlice.reducer;
export const { ADD_INITIAL_ITEM_IN_CART, HANDLE_ADD_OR_REMOVE_CART } =
  cartDetailsSlice.actions;
