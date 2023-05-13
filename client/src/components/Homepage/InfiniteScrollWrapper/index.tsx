import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  GET_RESTAURANTS,
  UPDATE_OFFSET,
} from '../../../../redux/slice/homepageSlice';
import RestaurantCardsShimmer from '../RestaurantCards/RestaurantCardsShimmer';
import RestaurantCards from '../RestaurantCards';
import './index.css';

const InfiniteScrollWrapper = () => {
  const dispatch = useDispatch();
  // const [currentOffset, setCurrentOffset] = useState(0);
  const offsetToBeAdded = 16;
  const {
    isFetching,
    totalOpenRestaurants,
    data: allRestaurants,
    offset: currentOffset,
  } = useSelector((state: any) => state.homepageReducer.restaurantsCards);
  const { currentTab, isFetchOnlyVeg } = useSelector(
    (state: any) => state.homepageReducer.tabSelection
  );

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.pageYOffset + 1 >=
        document.documentElement.scrollHeight
      ) {
        if (!isFetching && currentOffset < totalOpenRestaurants) {
          dispatch(UPDATE_OFFSET(offsetToBeAdded));
        }
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isFetching, currentOffset, isFetchOnlyVeg]);

  useEffect(() => {
    if (isFetchOnlyVeg) {
      if (currentOffset < totalOpenRestaurants) {
        dispatch(
          GET_RESTAURANTS({ currentOffset, currentTab, isFetchOnlyVeg: true })
        );
      }
    } else {
      if (currentOffset <= totalOpenRestaurants) {
        dispatch(GET_RESTAURANTS({ currentOffset, currentTab }));
      }
    }
  }, [currentOffset, currentTab, isFetchOnlyVeg]);

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
