import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GET_RESTAURANTS } from '../../../redux/slice/homepageSlice';
import { Spinner } from '@chakra-ui/react';

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
      <div>Homepage</div>
      {isFetching && (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Spinner color="#33658a" size="lg" />
        </div>
      )}
    </>
  );
};

export default Homepage;
