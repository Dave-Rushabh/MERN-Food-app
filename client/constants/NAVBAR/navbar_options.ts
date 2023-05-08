import { ImHome } from 'react-icons/im';
import { BsInfoSquareFill } from 'react-icons/bs';
import { TfiHeadphoneAlt } from 'react-icons/tfi';
import { ImCart } from 'react-icons/im';
import { BsPencilSquare } from 'react-icons/bs';
import { IconType } from 'react-icons/lib';

interface NavbarOption {
  id: number;
  option: string;
  logo: IconType;
  route: string;
}

export const NAVBAR_OPTIONS: NavbarOption[] = [
  {
    id: 1,
    option: 'Home',
    logo: ImHome,
    route: '/',
  },
  {
    id: 2,
    option: 'About Us',
    logo: BsInfoSquareFill,
    route: '/about',
  },
  {
    id: 3,
    option: 'Feedbacks',
    logo: BsPencilSquare,
    route: '/feedbacks',
  },
  {
    id: 4,
    option: 'Online Order Help',
    logo: TfiHeadphoneAlt,
    route: '/help',
  },
  {
    id: 5,
    option: 'Cart',
    logo: ImCart,
    route: '/cart',
  },
];
