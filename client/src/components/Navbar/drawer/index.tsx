import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  Button,
} from '@chakra-ui/react';
import { MdOutlineKeyboardBackspace } from 'react-icons/md';

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
            <div className="w-12 px-2 py-1 rounded-md bg-slate-200 hover:cursor-pointer">
              <MdOutlineKeyboardBackspace
                onClick={onClose}
                size={'1.8rem'}
                color={'#1d3557'}
              />
            </div>
          </div>
          <DrawerHeader className="text-app_primary_blue">
            Explore the world of Tesla
          </DrawerHeader>

          <DrawerBody></DrawerBody>

          <DrawerFooter>
            <Button variant="outline" onClick={onClose} as="button">
              Go Back
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default NavbarDrawer;
