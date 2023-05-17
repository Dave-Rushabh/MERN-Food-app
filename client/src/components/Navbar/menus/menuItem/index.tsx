import './index.css';
import { NAVBAR_OPTIONS } from '../../../../../constants/NAVBAR/navbar_options';
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { IoLocationSharp } from 'react-icons/io5';
import { useSelector } from 'react-redux';

const MenuItems = () => {
  const { pathname } = useLocation();

  const { data: cartInfo } = useSelector(
    (state: any) => state.cartDetailsReducer.cart
  );

  const getTotalCartQty = () => {
    return cartInfo.reduce((acc: number, elem: any) => {
      const internalSum = elem.foodItems.reduce(
        (acc: number, item: any) => acc + item.qty,
        0
      );

      return acc + internalSum;
    }, 0);
  };

  return (
    <>
      <div className="location-identifier">
        <div className="location-wrapper">
          <div>
            <IoLocationSharp />
          </div>
          <div className="text">Bengaluru, Karnataka, India</div>
        </div>
      </div>
      <div className="menus-wrapper">
        {NAVBAR_OPTIONS.map(elem => (
          <React.Fragment key={elem.id}>
            <Link to={elem.route}>
              <div
                className={`menu-item-container ${
                  pathname === elem.route && 'active'
                }`}
              >
                <div>
                  <elem.logo />
                </div>
                <div>
                  {elem.option === 'Cart' && cartInfo.length
                    ? getTotalCartQty()
                    : elem.option}
                </div>
              </div>
            </Link>
          </React.Fragment>
        ))}
      </div>
    </>
  );
};

export default MenuItems;
