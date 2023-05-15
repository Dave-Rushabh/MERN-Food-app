import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import './index.css';
import { useDispatch } from 'react-redux';
import { FETCH_RESTAURANT_DETAILS } from '../../../redux/slice/restaurantDetailsSlice';

const RestaurantDetails = () => {
  const { restaurantId } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(FETCH_RESTAURANT_DETAILS(restaurantId));
  }, []);

  return (
    <>
      <div>RestaurantDetails</div>
    </>
  );
};

export default RestaurantDetails;
