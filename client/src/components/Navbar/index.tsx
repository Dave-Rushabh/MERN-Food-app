import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { GiHamburgerMenu } from 'react-icons/gi';
import NavbarDrawer from './drawer';
import { useDisclosure } from '@chakra-ui/react';
import './index.css';
import MenuItems from './menus/menuItem';

const Navbar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const iconRef = useRef();
  return (
    <>
      <div className="navbar-wrapper">
        <div className="nav-logo">
          <img src="../../../assets/logo.svg" alt="" />
          <div className="logo-title">
            <Link to={'/'}>Spice Station</Link>
          </div>
        </div>
        <div className="main-tabs">
          <MenuItems />
        </div>
        <div className="hamburger-menu-options">
          <GiHamburgerMenu className="hamburger-logo" onClick={onOpen} />
          <NavbarDrawer isOpen={isOpen} onClose={onClose} btnRef={iconRef} />
        </div>
      </div>
    </>
  );
};

export default Navbar;
