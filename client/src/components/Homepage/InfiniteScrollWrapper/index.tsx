import { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  GET_RESTAURANTS,
  REMOVE_FILTERS_FROM_API_PAYLOAD,
  UPDATE_OFFSET,
} from '../../../../redux/slice/homepageSlice';
import RestaurantCardsShimmer from '../RestaurantCards/RestaurantCardsShimmer';
import RestaurantCards from '../RestaurantCards';
import './index.css';
import { BsSearch } from 'react-icons/bs';

const renderFilters = (filters: string[]) => {
  const dispatch = useDispatch();
  return (
    <>
      <div className="filters-wrapper-homepage">
        <div className="all-filters-wrapper flex items-center justify-between">
          <p className="font-bold mb-2 text-app_primary_dark">
            Applied Filters:
          </p>
          <div
            className=" mx-8 inline-flex items-center py-2 px-4 rounded-lg bg-app_primary_light text-white mb-2 mr-2 hover:bg-app_primary_dark"
            onClick={() => {}}
          >
            <span className="mr-2">Clear All Filters</span>
            <span
              className="hover:cursor-pointer font-bold"
              onClick={() => {
                dispatch(REMOVE_FILTERS_FROM_API_PAYLOAD([]));
              }}
            >
              X
            </span>
          </div>
        </div>

        <div className="flex flex-wrap">
          {filters.map(filter => (
            <div
              key={filter}
              className="inline-flex items-center py-2 px-4 rounded-lg bg-white border-2 border-app_primary_light text-app_primary_light mb-2 mr-2 hover:bg-app_primary_light hover:text-white"
              onClick={() => {}}
            >
              <span className="mr-2">{filter}</span>
              <span
                className="hover:cursor-pointer font-bold"
                onClick={() => {
                  dispatch(REMOVE_FILTERS_FROM_API_PAYLOAD(filter));
                }}
              >
                X
              </span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

const InfiniteScrollWrapper = () => {
  const searchBarRef = useRef<HTMLInputElement>(null);
  const dispatch = useDispatch();
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

  const { filtersInAPIPayload } = useSelector(
    (state: any) => state.homepageReducer.filtersList
  );

  const [searchValue, setSearchValue] = useState('');
  const [cardsArray, setCardsArray] = useState([]);
  const [showOnlySearchResults, setShowOnlySearchResults] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollableHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercentage = (window.pageYOffset / scrollableHeight) * 100;

      if (
        scrollPercentage >= 85 &&
        !isFetching &&
        currentOffset < totalOpenRestaurants &&
        totalOpenRestaurants - currentOffset > offsetToBeAdded &&
        !showOnlySearchResults
      ) {
        dispatch(UPDATE_OFFSET(offsetToBeAdded));
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [
    isFetching,
    currentOffset,
    isFetchOnlyVeg,
    filtersInAPIPayload,
    totalOpenRestaurants,
    showOnlySearchResults,
  ]);

  useEffect(() => {
    dispatch(
      GET_RESTAURANTS({
        currentOffset,
        currentTab,
        isFetchOnlyVeg,
        filters: filtersInAPIPayload,
      })
    );
  }, [currentOffset, currentTab, isFetchOnlyVeg, filtersInAPIPayload]);

  useEffect(() => {
    searchBarRef.current?.focus();
  }, []);

  useEffect(() => {
    if (searchValue.length) {
      const searchResults = allRestaurants.filter((elem: any) =>
        elem?.data?.data?.name
          ?.toLowerCase()
          ?.includes(searchValue?.toLowerCase())
      );

      setCardsArray(searchResults);
      if (searchResults.length) {
        setShowOnlySearchResults(true);
      }
    } else {
      setShowOnlySearchResults(false);
      setCardsArray([]);
    }
  }, [searchValue]);

  return (
    <>
      <div className="res-search-wrapper">
        <div>
          <BsSearch />
        </div>
        <input
          type="search"
          ref={searchBarRef}
          placeholder="Search Your Favorite Restaurants ...."
          className="res-searchbar"
          value={searchValue || ''}
          onChange={e => setSearchValue(e.target.value)}
        />
      </div>

      {filtersInAPIPayload?.length ? renderFilters(filtersInAPIPayload) : null}

      {isFetching && allRestaurants.length < 16 ? (
        <div className="shimmer-wrapper">
          {Array.from({ length: 16 }).map((_, idx) => (
            <RestaurantCardsShimmer key={idx.toString()} />
          ))}
        </div>
      ) : (
        <>
          <div className="res-card-wrapper">
            {searchValue.length && !cardsArray.length ? (
              <div className="text-2xl text-app_primary_orange font-semibold">
                oops ! No Restaurants Found ...
              </div>
            ) : (
              <RestaurantCards
                cardsArray={cardsArray}
                showOnlySearchResults={showOnlySearchResults}
              />
            )}
            {isFetching && allRestaurants.length >= 16 && (
              <>
                {Array.from({ length: 16 }).map((_, idx) => (
                  <RestaurantCardsShimmer key={idx.toString()} />
                ))}
              </>
            )}
          </div>
        </>
      )}
    </>
  );
};

export default InfiniteScrollWrapper;
