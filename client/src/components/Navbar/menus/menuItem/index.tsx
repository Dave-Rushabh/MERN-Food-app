import './index.css';
import { NAVBAR_OPTIONS } from '../../../../../constants/NAVBAR/navbar_options';
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { IoLocationSharp } from 'react-icons/io5';

const MenuItems = () => {
  const { pathname } = useLocation();
  return (
    <>
      <div className="location-identifier">
        <div className="location-wrapper">
          <div>
            <IoLocationSharp />
          </div>
          <div className="text">Ahmedabad, Gujarat, India</div>
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
                <div>{elem.option}</div>
              </div>
            </Link>
          </React.Fragment>
        ))}
      </div>
    </>
  );
};

export default MenuItems;
