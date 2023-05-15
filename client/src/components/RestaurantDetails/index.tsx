import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import './index.css';
import { useDispatch, useSelector } from 'react-redux';
import { FETCH_RESTAURANT_DETAILS } from '../../../redux/slice/restaurantDetailsSlice';

const renderPrimaryRestaurantDetails = (data: any[]) => {
  const objectToMap = data[0]['card']['card']['info'];

  return (
    <>
      <div className="primary-details-wrapper">
        <div>{objectToMap.name}</div>
        <div>{objectToMap.cuisines.join(', ')}</div>
        <div>{objectToMap.areaName}</div>
        <div>{objectToMap.sla.lastMileTravelString}</div>
        {objectToMap.feeDetails.totalFee && (
          <div>
            {objectToMap.sla.lastMileTravelString} | &#8377;
            {objectToMap.feeDetails.totalFee / 100} delivery fee will apply{' '}
          </div>
        )}
        <div>{objectToMap.avgRatingString}</div>
        <div>{objectToMap.totalRatingsString}</div>
        <div>{objectToMap.sla.slaString}</div>
        <div>{objectToMap.costForTwoMessage}</div>
      </div>
    </>
  );
};

const RestaurantDetails = () => {
  const { restaurantId } = useParams();
  const dispatch = useDispatch();
  const { data } = useSelector(
    (state: any) => state.restaurantDetailsReducer.restaurant
  );

  useEffect(() => {
    dispatch(FETCH_RESTAURANT_DETAILS(restaurantId));
  }, []);

  return (
    <>
      <div className="restaurant-details-wrapper">
        {data?.length ? renderPrimaryRestaurantDetails(data) : null}
      </div>
    </>
  );
};

export default RestaurantDetails;
