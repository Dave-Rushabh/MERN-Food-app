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

const RestaurantDetails = () => {
  const { restaurantId } = useParams();
  const dispatch = useDispatch();
  const { data, isFetchingRestaurantInfo } = useSelector(
    (state: any) => state.restaurantDetailsReducer.restaurant
  );

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
          <>{data?.length ? renderPrimaryRestaurantDetails(data) : null}</>
        )}
      </div>
    </>
  );
};

export default RestaurantDetails;
