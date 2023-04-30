import {
  Drawer,
  DrawerBody,
  DrawerOverlay,
  DrawerContent,
  Accordion,
  DrawerFooter,
  Button,
} from '@chakra-ui/react';
import { MdOutlineKeyboardBackspace } from 'react-icons/md';
import './index.css';
import MenuAccordion from './menu-accordion';
import {
  DINING_OPTIONS,
  EVENT_OPTIONS,
  FOOD_ORDER_OPTIONS,
  MONEY_OPTIONS,
  MORE_OPTIONS,
  RESTAURANT_AWARD_OPTIONS,
} from '../../../../constants/NAVBAR/navbar_drawer_options';
import { handleLogout } from '../../../../utils/authUtils';
interface NavbarDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  btnRef: any;
}

const NavbarDrawer = ({ isOpen, onClose, btnRef }: NavbarDrawerProps) => {
  return (
    <>
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
        size="xs"
      >
        <DrawerOverlay />
        <DrawerContent>
          <div className="flex items-center h-8 px-4 justify-start my-4">
            <div
              className="w-12 px-2 py-1 rounded-md bg-slate-200 hover:cursor-pointer"
              onClick={onClose}
            >
              <MdOutlineKeyboardBackspace size={'1.8rem'} color={'#1d3557'} />
            </div>
          </div>
          <DrawerBody>
            <div className="drawer-body-container">
              <div className="accordion-container">
                <Accordion allowToggle>
                  <MenuAccordion
                    title="Food Orders"
                    menu={FOOD_ORDER_OPTIONS}
                  />
                  <MenuAccordion
                    title="Restaurant Awards 2023"
                    menu={RESTAURANT_AWARD_OPTIONS}
                  />
                  <MenuAccordion title="Dining" menu={DINING_OPTIONS} />
                  <MenuAccordion title="Events" menu={EVENT_OPTIONS} />
                  <MenuAccordion title="Money" menu={MONEY_OPTIONS} />
                  <MenuAccordion title="More" menu={MORE_OPTIONS} />
                </Accordion>
              </div>
            </div>
          </DrawerBody>
          <DrawerFooter>
            <Button
              onClick={() => {
                onClose();
                handleLogout();
                window.location.reload();
              }}
              variant="outline"
              bg="#33658a"
              _hover={{ bg: '#2f4858' }}
              color="white"
            >
              Logout
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default NavbarDrawer;
