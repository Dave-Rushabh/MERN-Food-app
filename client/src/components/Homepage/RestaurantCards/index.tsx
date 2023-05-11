import { useSelector } from 'react-redux';
import './index.css';
import { CLOUDINATY_IMG_URL } from '../../../../constants/HOMEPAGE';
import VegOrNonVegIndicator from './VegOrNonVegIndicator';
import { RiEBike2Fill } from 'react-icons/ri';
import { HiStar } from 'react-icons/hi';
import { BiTimeFive } from 'react-icons/bi';
import { GiKnifeFork } from 'react-icons/gi';

const RestaurantCards = () => {
  const { data: restaurantsCardsInfo } = useSelector(
    (state: any) => state.homepageReducer.restaurantsCards
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

  const generateDiscountCoupon = () => {
    const minPercentage = 10;
    const maxPercentage = 60;
    const randomNumber =
      Math.random() * (maxPercentage - minPercentage + 1) + minPercentage;
    const discountPercentage = Math.floor(randomNumber);
    const couponCode = `${discountPercentage}% off`;
    return couponCode;
  };

  return (
    <>
      {restaurantsCardsInfo?.map((elem: any) => (
        <div key={elem.data.uuid} className="res-card-info">
          {elem.data?.aggregatedDiscountInfo?.header && (
            <div className="ribbon ribbon-top-left">
              <span> {generateDiscountCoupon()}</span>
            </div>
          )}

          <div className="res-img-wrapper">
            <img
              src={`${CLOUDINATY_IMG_URL}/${elem.data.cloudinaryImageId}`}
              className="res-img"
            />
          </div>
          <div className="res-name">{elem.data.name}</div>
          <div className="m-1">{elem.data.cuisines.join(', ')}</div>

          <hr />

          <div className="veg-or-nonveg-with-cost-for-two-distance">
            {elem.data.veg ? (
              <VegOrNonVegIndicator color="green" />
            ) : (
              <VegOrNonVegIndicator color="red" />
            )}
            |
            <div className="cost">
              &#8377; {elem.data.costForTwo / 100} for Two
            </div>
            |
            <div className="distance-indicator">
              <div>
                <RiEBike2Fill style={{ color: '#006d77' }} />
              </div>
              <div>{Math.ceil(elem.data.lastMileTravel)} km </div>
            </div>
          </div>

          <hr />

          <div className="ratings-delivery-time">
            <div className="flex items-center gap-1">
              <div>
                <HiStar style={{ fontSize: '1.5rem', color: '#588157' }} />
              </div>
              {elem.data.avgRating},{formatRatingsValue(elem.data.totalRatings)}
              &nbsp;ratings
            </div>
            |
            <div className="flex items-center gap-1">
              <div>
                <BiTimeFive style={{ fontSize: '1.3rem', color: '#2f4858' }} />
              </div>
              {formatDeliveryTime(elem.data.deliveryTime)} ETA
            </div>
          </div>

          <hr />

          <button className="checkout-btn">
            <span>
              <GiKnifeFork />
            </span>
            Explore
          </button>
        </div>
      ))}
    </>
  );
};

export default RestaurantCards;
