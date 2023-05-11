import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GET_RESTAURANTS } from '../../../redux/slice/homepageSlice';
import { Spinner } from '@chakra-ui/react';
import RestaurantCards from './RestaurantCards';
import './index.css';

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
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '50vh',
          }}
        >
          <Spinner color="#33658a" size="lg" />
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
