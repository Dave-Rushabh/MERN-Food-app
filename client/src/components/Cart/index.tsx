import { Link } from 'react-router-dom';
import { EMPTY_CART_IMG } from '../../../constants/CART_PAGE';
import './index.css';
import { useDispatch, useSelector } from 'react-redux';
import VegOrNonVegIndicator from '../Homepage/RestaurantCards/VegOrNonVegIndicator';
import { CLOUDINATY_IMG_URL_PREVIEW } from '../../../constants/HOMEPAGE';
import { HANDLE_ADD_OR_REMOVE_CART } from '../../../redux/slice/cartSlice';

const Cart = () => {
  const { data: cartInfo } = useSelector(
    (state: any) => state.cartDetailsReducer.cart
  );
  const dispatch = useDispatch();

  const getDeliveryChargeByRestaurant = (restaurantId: number | string) => {
    const restaurant = cartInfo.find(
      (elem: any) => elem.restaurantId === restaurantId
    );

    return restaurant.foodItems[0]['deliveryCharge'];
  };

  const getTotalValueByRestaurant = (restaurantId: number | string) => {
    const restaurant = cartInfo.find(
      (elem: any) => elem.restaurantId === restaurantId
    );

    const restaurantTotal =
      getDeliveryChargeByRestaurant(restaurant.restaurantId) +
      restaurant.foodItems.reduce(
        (acc: number, elem: any) => acc + elem.price * elem.qty,
        0
      );

    return restaurantTotal;
  };

  const getTotalCartValue = () =>
    cartInfo.reduce(
      (acc: number, elem: any) =>
        acc + getTotalValueByRestaurant(elem.restaurantId),
      0
    );

  const renderCartDetails = (elem: any, restaurantId: number | string) => {
    return (
      <>
        {elem.foodItems.map((elem: any) => (
          <div
            className="flex gap-4  my-2  info-wrapper border-b-2 border-app_primary_dark"
            key={elem.foodItemId}
          >
            <div className="left-side-info flex">
              <div className="flex flex-col gap-4 my-4 img-btn-wrapper">
                <div className="food-item-img-wrapper">
                  <img
                    src={`${CLOUDINATY_IMG_URL_PREVIEW}/${elem.imageId}`}
                    alt=""
                  />
                </div>
                <div className="flex justify-center mt-2 gap-1">
                  {elem?.qty >= 1 && (
                    <button
                      className="bg-app_primary_light px-4 py-2 text-white font-semibold text-lg"
                      onClick={() => {
                        dispatch(
                          HANDLE_ADD_OR_REMOVE_CART({
                            restaurantId: restaurantId,
                            flag: 'INCREMENT',
                            foodItemId: elem.foodItemId,
                          })
                        );
                      }}
                    >
                      +
                    </button>
                  )}

                  <button
                    className="text-lg bg-app_primary_green text-white w-full py-2 disabled:cursor-not-allowed"
                    onClick={() => {}}
                    disabled={elem?.qty >= 1}
                  >
                    {elem?.qty}
                  </button>
                  {elem?.qty >= 1 && (
                    <button
                      className="bg-app_primary_light px-4 py-2 text-white font-semibold text-lg"
                      onClick={() => {
                        dispatch(
                          HANDLE_ADD_OR_REMOVE_CART({
                            restaurantId: restaurantId,
                            flag: 'DECREMENT',
                            foodItemId: elem.foodItemId,
                          })
                        );
                      }}
                    >
                      -
                    </button>
                  )}
                </div>
              </div>
              <div className="my-2 gap-4 flex  pl-40 py-12 text-lg  text-gray-500 name-veg-wrapper">
                <div>
                  <VegOrNonVegIndicator color={elem.isVeg ? 'green' : 'red'} />
                </div>
                <div>{elem.foodItemName}</div>
              </div>
            </div>
            <div className="right-side-info">
              <div>Qty : {elem.qty}</div> |<div>Price : {elem.price}</div>
            </div>
          </div>
        ))}
      </>
    );
  };

  return (
    <>
      {!cartInfo.length ? (
        <div className="empty-cart-wrapper">
          <div className="main-empty-header">Oops ! Your Cart is Empty</div>
          <div className="sub-empty-header">
            You can go to home page to view more restaurants
          </div>
          <div className="emprty-cart-img-wrapper">
            <img src={EMPTY_CART_IMG} alt="" />
          </div>
          <div>
            <Link to="/">
              <button className="empty-cart-redirection-btn">
                Explore Restaurants
              </button>
            </Link>
          </div>
        </div>
      ) : (
        <div className="cart-info-wrapper">
          <div className="text-2xl font-bold text-app_primary_dark">
            Checkout Details
          </div>
          <hr className="h-1 bg-app_primary_yellow my-4" />
          <div className="flex justify-end gap-12 items-center">
            <div className="text-lg font-bold">
              Total Payable : &#8377; {getTotalCartValue()}
            </div>
            <button className="h-12 px-8 text-lg rounded-md text-white font-semibold bg-app_primary_light hover:bg-app_primary_dark">
              Checkout
            </button>
          </div>
          {cartInfo.map((elem: any) => (
            <div
              key={elem.restaurantId}
              className="flex flex-col border-2 p-4 shadow-md rounded-md my-8"
            >
              <div className="flex justify-between text-app_primary_dark">
                <div className=" text-xl font-bold">{elem.restaurantName}</div>
                <div className="text-lg text-gray-500">
                  Total Delivery Charge :{' '}
                  {getDeliveryChargeByRestaurant(elem.restaurantId)}
                </div>
              </div>
              {renderCartDetails(elem, elem.restaurantId)}
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default Cart;
