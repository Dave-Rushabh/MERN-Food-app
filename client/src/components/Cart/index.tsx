import { Link } from 'react-router-dom';
import { EMPTY_CART_IMG } from '../../../constants/CART_PAGE';
import './index.css';

const Cart = () => {
  return (
    <>
      <div className="empty-cart-wrapper">
        <div className="main-empty-header">Oops ! Your Cart is Empty</div>
        <div className="sub-empty-header">
          You can go to home page to view more restaurants
        </div>
        <div className="emprty-cart-img-wrapper">
          <img src={EMPTY_CART_IMG} alt="" />
        </div>
        <div>
          <Link to="/">
            <button className="empty-cart-redirection-btn">
              Explore Restaurants
            </button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Cart;
