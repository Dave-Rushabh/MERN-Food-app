import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './index.css';
import { HOME_PAGE_TAB_SELECTORS } from '../../../../constants/HOMEPAGE';
import { CHANGE_TAB_SELECTION } from '../../../../redux/slice/homepageSlice';
import { VscListFilter } from 'react-icons/vsc';
import VegSwitch from './VegSwitch';
import { useDisclosure } from '@chakra-ui/react';
import FiltersDrawer from './FiltersDrawer';

const TabSelector = () => {
  const { isFetching, totalOpenRestaurants } = useSelector(
    (state: any) => state.homepageReducer.restaurantsCards
  );
  const { currentTab } = useSelector(
    (state: any) => state.homepageReducer.tabSelection
  );

  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(CHANGE_TAB_SELECTION(HOME_PAGE_TAB_SELECTORS[0].sortBy));
    };
  }, []);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const iconRef = useRef(null);

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
              className={`tab ${currentTab === tab.sortBy && 'active-tab'}`}
              onClick={() => dispatch(CHANGE_TAB_SELECTION(tab.sortBy))}
            >
              {tab.name}
            </div>
          ))}
        </div>
        <div className="filters-section">
          <VegSwitch />
          <button className="filters-btn" onClick={onOpen}>
            Filters
            <VscListFilter style={{ fontSize: '1.2rem' }} />
          </button>
          {isOpen && (
            <FiltersDrawer
              isOpen={isOpen}
              onClose={onClose}
              iconRef={iconRef}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default TabSelector;
