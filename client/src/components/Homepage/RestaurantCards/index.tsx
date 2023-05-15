import { useSelector } from 'react-redux';
import './index.css';
import { CLOUDINATY_IMG_URL } from '../../../../constants/HOMEPAGE';
import VegOrNonVegIndicator from './VegOrNonVegIndicator';
import { RiEBike2Fill } from 'react-icons/ri';
import { HiStar } from 'react-icons/hi';
import { BiTimeFive } from 'react-icons/bi';
import { GiKnifeFork } from 'react-icons/gi';
import { Link } from 'react-router-dom';

const RestaurantCards = () => {
  const { data: restaurantsCardsInfo } = useSelector(
    (state: any) => state.homepageReducer.restaurantsCards
  );

  const { isFetchOnlyVeg } = useSelector(
    (state: any) => state.homepageReducer.tabSelection
  );

  const { filtersInAPIPayload } = useSelector(
    (state: any) => state.homepageReducer.filtersList
  );

  const formatRatingsValue = (rating: number) => {
    if (rating >= 1000) {
      const suffixes = ['', 'k', 'M', 'B', 'T'];
      const suffixIndex = Math.floor(Math.log10(rating) / 3);
      const shortRating = (rating / Math.pow(1000, suffixIndex)).toFixed(1);
      return `${shortRating}${suffixes[suffixIndex]}`;
    }
    return rating.toString();
  };

  const formatDeliveryTime = (deliveryTime: number) => {
    const updatedTime = deliveryTime + 15;
    if (updatedTime >= 60) {
      const hours = Math.floor(updatedTime / 60);
      const minutes = updatedTime % 60;
      if (minutes === 0) {
        return `${hours} hr`;
      } else {
        return `${hours} hr ${minutes} min`;
      }
    } else {
      return `${updatedTime} mins`;
    }
  };

  return (
    <>
      {restaurantsCardsInfo.length ? (
        <>
          {restaurantsCardsInfo?.map((elem: any) => (
            <div key={elem.data.data.uuid} className="res-card-info">
              {elem.data.data?.aggregatedDiscountInfoV3?.header?.length <
                12 && (
                <div className="ribbon ribbon-top-left">
                  <span>
                    {elem.data.data?.aggregatedDiscountInfoV3?.header}
                  </span>
                </div>
              )}

              <div className="res-img-wrapper">
                <img
                  src={`${CLOUDINATY_IMG_URL}/${elem.data.data.cloudinaryImageId}`}
                  className="res-img"
                />
              </div>
              <div className="res-name">{elem.data.data.name}</div>
              <div className="m-1">
                {elem.data.data.cuisines.slice(0, 5)?.join(', ')}
              </div>

              <hr />

              <div className="veg-or-nonveg-with-cost-for-two-distance">
                {elem.data.data.veg ? (
                  <VegOrNonVegIndicator color="green" />
                ) : (
                  <VegOrNonVegIndicator color="red" />
                )}
                |
                <div className="cost">
                  &#8377; {elem.data.data.costForTwo / 100} for Two
                </div>
                |
                <div className="distance-indicator">
                  <div>
                    <RiEBike2Fill style={{ color: '#006d77' }} />
                  </div>
                  <div>{Math.ceil(elem.data.data.lastMileTravel)} km </div>
                </div>
              </div>

              <hr />

              <div className="ratings-delivery-time">
                <div className="flex items-center gap-1">
                  <div>
                    <HiStar style={{ fontSize: '1.5rem', color: '#588157' }} />
                  </div>
                  {elem.data.data.avgRating},
                  {formatRatingsValue(elem.data.data.totalRatings)}
                  &nbsp;ratings
                </div>
                |
                <div className="flex items-center gap-1">
                  <div>
                    <BiTimeFive
                      style={{ fontSize: '1.3rem', color: '#2f4858' }}
                    />
                  </div>
                  {formatDeliveryTime(elem.data.data.deliveryTime)} ETA
                </div>
              </div>

              <hr />

              <Link to={`/restaurant/${elem.data.data.id}`}>
                <button className="checkout-btn">
                  <span>
                    <GiKnifeFork />
                  </span>
                  Explore
                </button>
              </Link>
            </div>
          ))}
        </>
      ) : (
        <>
          {filtersInAPIPayload.length || isFetchOnlyVeg ? (
            <div className="text-2xl text-app_primary_orange font-semibold">
              oops ! No Restaurants Found ...
            </div>
          ) : null}
        </>
      )}
    </>
  );
};

export default RestaurantCards;
