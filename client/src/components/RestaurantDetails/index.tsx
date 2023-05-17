import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import './index.css';
import { useDispatch, useSelector } from 'react-redux';
import { FETCH_RESTAURANT_DETAILS } from '../../../redux/slice/restaurantDetailsSlice';
import { Spinner } from '@chakra-ui/react';
import { TfiHeart } from 'react-icons/tfi';
import { HiStar } from 'react-icons/hi';
import { RiEBike2Fill } from 'react-icons/ri';
import { BiTimeFive } from 'react-icons/bi';
import VegOrNonVegIndicator from '../Homepage/RestaurantCards/VegOrNonVegIndicator';
import { CLOUDINATY_IMG_URL_PREVIEW } from '../../../constants/HOMEPAGE';
import {
  ADD_INITIAL_ITEM_IN_CART,
  HANDLE_ADD_OR_REMOVE_CART,
} from '../../../redux/slice/cartSlice';

const renderPrimaryRestaurantDetails = (data: any[]) => {
  const objectToMap = data[0]['card']['card']['info'];

  const {
    name,
    cuisines,
    areaName,
    avgRatingString,
    totalRatingsString,
    costForTwoMessage,
    feeDetails: { totalFee },
    sla: { lastMileTravelString, slaString },
  } = objectToMap;

  return (
    <>
      <div className="primary-details-wrapper">
        <div className="name-heart-wrapper">
          <div className="text-3xl text-app_primary_light font-bold">
            {name}
          </div>
          <TfiHeart />
        </div>
        <div className="cuisines-area-ratings-wrapper">
          <div className="cuisines-area-wrapper">
            <div>{cuisines.join(', ')}</div>
            <div>
              {areaName}, {lastMileTravelString}
            </div>
          </div>
          <div className="ratings-wrapper">
            <div className="reting-info">
              <HiStar style={{ fontSize: '1.5rem', color: '#588157' }} />
              <div>{avgRatingString}</div>
            </div>
            <hr className="bg-app_primary_orange h-0.5 w-full my-2" />
            <div>{totalRatingsString}</div>
          </div>
        </div>
        {totalFee && (
          <div className="fee-details">
            <RiEBike2Fill style={{ color: '#006d77' }} />
            {lastMileTravelString} | &#8377;
            {totalFee / 100} delivery fee will apply{' '}
          </div>
        )}

        <hr className="w-full my-4" />

        <div className="primary-info-footer">
          <div className="flex gap-2 items-center">
            <BiTimeFive style={{ fontSize: '1.3rem', color: '#2f4858' }} />
            {slaString}
          </div>
          |<div>{costForTwoMessage}</div>
        </div>

        <hr className="w-full my-4" />
      </div>
    </>
  );
};

const renderRecommendedFoodItems = (
  data: any[],
  cartInfo: any[],
  addItemToTheCartInitially: (data: any) => void,
  handleFurtherAddOrRemoveOnCart: (data: any) => void,
  restaurantId: string | number | undefined
) => {
  const restaurantPrimaryInfoObj = data[0]['card']['card']['info'];

  const {
    name: restaurantName,
    feeDetails: { totalFee },
  } = restaurantPrimaryInfoObj;

  const recommendedFoodItems =
    data[2]['groupedCard']['cardGroupMap']['REGULAR']['cards'][1]['card'][
      'card'
    ];

  const { title, itemCards } = recommendedFoodItems;

  return (
    <>
      <div className="recommended-food-items-wrapper">
        <div className="text-lg font-bold text-app_primary_orange">{title}</div>
        <div className="food-items-wrapper">
          {itemCards.map(({ card: { info } }: { card: { info?: any } }) => {
            const {
              id,
              imageId,
              isVeg,
              name,
              price,
              defaultPrice,
              itemAttribute: { portionSize } = {} as any,
            } = info ?? {};

            const cartInfoOfCurrentFoodItem = cartInfo?.find(
              (elem: any) => elem.restaurantId === restaurantId
            );

            const currentFoodItemInfo =
              cartInfoOfCurrentFoodItem?.foodItems?.find(
                (elem: any) => elem.foodItemId === id
              );

            // logic for adding items into the cart

            const getInitialCartPayload = () => {
              const isRestaurantExistsInCart = cartInfo.find(
                (elem: any) => elem?.restaurantId === restaurantId
              );

              if (!isRestaurantExistsInCart) {
                return {
                  restaurantId: restaurantId,
                  restaurantName: restaurantName,
                  foodItems: [
                    {
                      foodItemId: id,
                      foodItemName: name,
                      imageId: imageId,
                      price: (price || defaultPrice) / 100,
                      deliveryCharge: totalFee / 100,
                      qty: 1,
                      isVeg,
                    },
                  ],
                };
              } else {
                return {
                  ...isRestaurantExistsInCart,
                  foodItems: [
                    ...isRestaurantExistsInCart.foodItems,
                    {
                      foodItemId: id,
                      foodItemName: name,
                      imageId: imageId,
                      price: (price || defaultPrice) / 100,
                      deliveryCharge: totalFee / 100,
                      qty: 1,
                      isVeg,
                    },
                  ],
                };
              }
            };

            return (
              <div className="food-item" key={id}>
                <div className="food-item-name-details-img-wrapper">
                  <div className="left-side-info-wrapper">
                    <VegOrNonVegIndicator color={isVeg ? 'green' : 'red'} />
                    <div className="text-lg">{name}</div>
                    <div className="text-gray-500">
                      &#8377;
                      {(price || defaultPrice) / 100}
                    </div>
                    <div className="text-gray-500">{portionSize}</div>
                  </div>
                  <div className="right-side-info-wrapper">
                    <div className="food-item-img-wrapper">
                      <img
                        src={`${CLOUDINATY_IMG_URL_PREVIEW}/${imageId}`}
                        alt={name}
                      />
                    </div>
                    <div className="flex justify-center mt-2 gap-1">
                      {currentFoodItemInfo?.qty >= 1 && (
                        <button
                          className="bg-app_primary_light px-4 py-2 text-white font-semibold text-lg"
                          onClick={() => {
                            handleFurtherAddOrRemoveOnCart({
                              restaurantId,
                              flag: 'INCREMENT',
                              foodItemId: id,
                            });
                          }}
                        >
                          +
                        </button>
                      )}

                      <button
                        className="text-lg bg-app_primary_green text-white w-full py-2 disabled:cursor-not-allowed"
                        onClick={() =>
                          addItemToTheCartInitially(getInitialCartPayload())
                        }
                        disabled={currentFoodItemInfo?.qty >= 1}
                      >
                        {currentFoodItemInfo?.qty >= 1
                          ? currentFoodItemInfo?.qty
                          : 'Add'}
                      </button>
                      {currentFoodItemInfo?.qty >= 1 && (
                        <button
                          className="bg-app_primary_light px-4 py-2 text-white font-semibold text-lg"
                          onClick={() => {
                            handleFurtherAddOrRemoveOnCart({
                              restaurantId,
                              flag: 'DECREMENT',
                              foodItemId: id,
                            });
                          }}
                        >
                          -
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

const RestaurantDetails = () => {
  const { restaurantId } = useParams();
  const dispatch = useDispatch();
  const { data, isFetchingRestaurantInfo } = useSelector(
    (state: any) => state.restaurantDetailsReducer.restaurant
  );
  const { data: cartInfo } = useSelector(
    (state: any) => state.cartDetailsReducer.cart
  );

  const addItemToTheCartInitially = (data: any) => {
    dispatch(ADD_INITIAL_ITEM_IN_CART(data));
  };

  const handleFurtherAddOrRemoveOnCart = (data: any) => {
    dispatch(HANDLE_ADD_OR_REMOVE_CART(data));
  };

  useEffect(() => {
    dispatch(FETCH_RESTAURANT_DETAILS(restaurantId));
  }, []);

  return (
    <>
      <div className="restaurant-details-wrapper">
        {isFetchingRestaurantInfo ? (
          <>
            <div className="details-loader">
              <Spinner />
              <div className="text-xl text-app_primary_light font-semibold">
                Fetching Restaurant Details ....{' '}
              </div>
            </div>
          </>
        ) : (
          <>
            {data?.length ? (
              <>
                {renderPrimaryRestaurantDetails(data)}
                {renderRecommendedFoodItems(
                  data,
                  cartInfo,
                  addItemToTheCartInitially,
                  handleFurtherAddOrRemoveOnCart,
                  restaurantId
                )}
              </>
            ) : null}
          </>
        )}
      </div>
    </>
  );
};

export default RestaurantDetails;
