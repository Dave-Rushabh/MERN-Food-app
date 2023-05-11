import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GET_RESTAURANTS } from '../../../redux/slice/homepageSlice';
import RestaurantCards from './RestaurantCards';
import './index.css';
import RestaurantCardsShimmer from './RestaurantCards/RestaurantCardsShimmer';

const Homepage = () => {
  const dispatch = useDispatch();
  const { isFetching } = useSelector(
    (state: any) => state.homepageReducer.restaurantsCards
  );

  useEffect(() => {
    dispatch(GET_RESTAURANTS());
  }, []);

  return (
    <>
      {isFetching ? (
        <div className="shimmer-wrapper">
          {Array.from({ length: 15 }).map((_, idx) => (
            <RestaurantCardsShimmer idx={idx} />
          ))}
        </div>
      ) : (
        <div className="res-card-wrapper">
          <RestaurantCards />
        </div>
      )}
    </>
  );
};

export default Homepage;
