import {
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
} from '@chakra-ui/react';

import './index.css';

interface MenuAccordionProps {
  title: string;
  menu: any[];
}

const MenuAccordion = ({ title, menu }: MenuAccordionProps) => {
  return (
    <AccordionItem>
      <h2>
        <AccordionButton
          _expanded={{ bg: '#2f4858', color: 'white !important' }}
          style={{ fontWeight: 'bolder', color: '#2f4858' }}
        >
          <Box as="span" flex="1" textAlign="left">
            {title}
          </Box>
          <AccordionIcon />
        </AccordionButton>
      </h2>
      <AccordionPanel pb={4}>
        {menu.map(elem => (
          <div key={elem?.id} className="menu-item-accordion">
            {elem?.option_name}
          </div>
        ))}
      </AccordionPanel>
    </AccordionItem>
  );
};

export default MenuAccordion;
