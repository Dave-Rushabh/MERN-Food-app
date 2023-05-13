import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GET_RESTAURANTS } from '../../../../redux/slice/homepageSlice';
import RestaurantCardsShimmer from '../RestaurantCards/RestaurantCardsShimmer';
import RestaurantCards from '../RestaurantCards';
import './index.css';

const InfiniteScrollWrapper = () => {
  const dispatch = useDispatch();
  const [currentOffset, setCurrentOffset] = useState(0);
  const offsetToBeAdded = 16;
  const { isFetching, data: allRestaurants } = useSelector(
    (state: any) => state.homepageReducer.restaurantsCards
  );

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.pageYOffset + 1 >=
        document.documentElement.scrollHeight
      ) {
        if (!isFetching) {
          setCurrentOffset(prevOffset => prevOffset + offsetToBeAdded);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isFetching]);

  useEffect(() => {
    dispatch(GET_RESTAURANTS(currentOffset));
  }, [currentOffset]);

  return (
    <>
      {isFetching && allRestaurants.length < 16 ? (
        <div className="shimmer-wrapper">
          {Array.from({ length: 16 }).map((_, idx) => (
            <RestaurantCardsShimmer key={idx.toString()} />
          ))}
        </div>
      ) : (
        <div className="res-card-wrapper">
          <RestaurantCards />
          {isFetching && allRestaurants.length >= 16 && (
            <>
              {Array.from({ length: 16 }).map((_, idx) => (
                <RestaurantCardsShimmer key={idx.toString()} />
              ))}
            </>
          )}
        </div>
      )}
    </>
  );
};

export default InfiniteScrollWrapper;