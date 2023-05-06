import { useState } from 'react';
import { coupons } from '../../../../constants/COUPONS/index';

interface couponObject {
  id: number;
  code: string;
  discount: number;
  description: string;
}
import './index.css';

const CouponCard = () => {
  const [copySuccess, setCopySuccess] = useState<boolean>(false);
  const [currentId, setCurrentId] = useState<null | number>(null);

  function copyToClipboard(id: number, code: string) {
    navigator.clipboard.writeText(code);
    setCopySuccess(true);
    setCurrentId(id);
    setTimeout(() => {
      setCopySuccess(false);
      setCurrentId(null);
    }, 3000);
  }

  return (
    <>
      {coupons.map((coupon: couponObject) => (
        <div className="box" key={coupon.id}>
          <div className="ribbon ribbon-top-left">
            <span>{coupon.code}</span>
          </div>
          <div className="coupon-description">{coupon.description}</div>
          <button
            className="coupon-btn"
            onClick={() => copyToClipboard(coupon.id, coupon.code)}
          >
            {copySuccess && currentId === coupon.id ? 'Copied!' : 'Copy Code'}
          </button>
        </div>
      ))}
    </>
  );
};

export default CouponCard;
