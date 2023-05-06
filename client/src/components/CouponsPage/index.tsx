import CouponCard from './CouponCard';
import './index.css';

const CouponsPage = () => {
  return (
    <>
      <div className="offers-banner">
        <div className="offer-header">Hurry Up ! Grab the offers</div>
        <div className="offer-sub-header">before its too late ...</div>
      </div>
      <div className="coupons-container">
        <CouponCard />
      </div>
    </>
  );
};

export default CouponsPage;
