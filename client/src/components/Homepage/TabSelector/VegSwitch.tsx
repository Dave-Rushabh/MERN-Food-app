import { useDispatch, useSelector } from 'react-redux';
import { FETCH_ONLY_VEG_RESTAURANTS_TOGGLE } from '../../../../redux/slice/homepageSlice';

const VegSwitch = () => {
  const { isFetchOnlyVeg } = useSelector(
    (state: any) => state.homepageReducer.tabSelection
  );
  const dispatch = useDispatch();

  const handleToggle = () => {
    dispatch(FETCH_ONLY_VEG_RESTAURANTS_TOGGLE());
  };

  return (
    <>
      <div className="flex items-center">
        <span className="mr-2 text-app_primary_light text-lg font-semibold">
          Veg only
        </span>
        <input
          id="veg-switch"
          type="checkbox"
          className="hidden"
          checked={isFetchOnlyVeg}
          onChange={handleToggle}
        />
        <label
          htmlFor="veg-switch"
          className="flex items-center cursor-pointer"
        >
          <span
            className={`relative inline-block w-10 h-6 rounded-full ${
              isFetchOnlyVeg ? 'bg-app_primary_green' : 'bg-gray-400'
            }`}
          >
            <span
              className={`absolute top-1 left-1 w-4 h-4 rounded-full transition-transform ${
                isFetchOnlyVeg ? 'translate-x-full bg-white' : 'bg-white'
              }`}
              style={{ transition: 'transform 0.3s' }}
            ></span>
          </span>
        </label>
      </div>
    </>
  );
};

export default VegSwitch;
