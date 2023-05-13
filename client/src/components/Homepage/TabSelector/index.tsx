import { useDispatch, useSelector } from 'react-redux';
import './index.css';
import { HOME_PAGE_TAB_SELECTORS } from '../../../../constants/HOMEPAGE';
import { CHANGE_TAB_SELECTION } from '../../../../redux/slice/homepageSlice';

const TabSelector = () => {
  const { isFetching, totalOpenRestaurants } = useSelector(
    (state: any) => state.homepageReducer.restaurantsCards
  );
  const { currentTab } = useSelector(
    (state: any) => state.homepageReducer.tabSelection
  );

  const dispatch = useDispatch();

  return (
    <>
      <div className="tab-selectors-wrapper">
        <div className="total-avbl-res">
          {isFetching || totalOpenRestaurants === null
            ? 'Finding Restaurants ...'
            : ` ${totalOpenRestaurants} Restaurants`}
        </div>
        <div className="tab-selection">
          {HOME_PAGE_TAB_SELECTORS.map((tab: any) => (
            <div
              key={tab.id}
              className={`tab ${currentTab === tab.name && 'active-tab'}`}
              onClick={() => dispatch(CHANGE_TAB_SELECTION(tab.name))}
            >
              {tab.name}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default TabSelector;
