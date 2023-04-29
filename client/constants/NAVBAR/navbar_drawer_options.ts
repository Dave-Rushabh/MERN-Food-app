type FOOD_ORDER_OPTION = {
  id: string;
  option_name: string;
  slug: string;
};

type RESTAURANT_AWARD_OPTION = {
  id: string;
  option_name: string;
  slug: string;
};

type DINING_OPTION = {
  id: string;
  option_name: string;
  slug: string;
};

type EVENT_OPTION = {
  id: string;
  option_name: string;
  slug: string;
};

type MONEY_OPTION = {
  id: string;
  option_name: string;
  slug: string;
};

type MORE_OPTION = {
  id: string;
  option_name: string;
  slug: string;
};

export const FOOD_ORDER_OPTIONS: FOOD_ORDER_OPTION[] = [
  {
    id: 'FOOD_ORDER_OPTION_1',
    option_name: 'Your Orders',
    slug: 'your-orders',
  },
  {
    id: 'FOOD_ORDER_OPTION_2',
    option_name: 'Favorite Orders',
    slug: 'favourite-orders',
  },
  {
    id: 'FOOD_ORDER_OPTION_3',
    option_name: 'Address Book',
    slug: 'address-book',
  },
  {
    id: 'FOOD_ORDER_OPTION_4',
    option_name: 'Online Ordering Help',
    slug: 'online-ordering-help',
  },
];

export const RESTAURANT_AWARD_OPTIONS: RESTAURANT_AWARD_OPTION[] = [
  {
    id: 'RESTAURANT_AWARD_OPTION_1',
    option_name: 'Winning Restaurants',
    slug: 'winning-restaurants',
  },
];

export const DINING_OPTIONS: DINING_OPTION[] = [
  {
    id: 'DINING_OPTION_1',
    option_name: 'Your Transactions',
    slug: 'your-transactions',
  },
  {
    id: 'DINING_OPTION_2',
    option_name: 'Your Dining Rewards',
    slug: 'your-dining-rewards',
  },
  {
    id: 'DINING_OPTION_3',
    option_name: 'Your Slot Bookings',
    slug: 'your-slot-bookings',
  },
  {
    id: 'DINING_OPTION_4',
    option_name: 'Dining Help',
    slug: 'dining-help',
  },
  {
    id: 'DINING_OPTION_5',
    option_name: 'Slot Booking Help',
    slug: 'slot-booking-help',
  },
  {
    id: 'DINING_OPTION_6',
    option_name: 'FAQs',
    slug: 'faqs',
  },
];

export const EVENT_OPTIONS: EVENT_OPTION[] = [
  {
    id: 'EVENT_OPTION_1',
    option_name: 'Your Events Tickets',
    slug: 'your-events-tickets',
  },
  {
    id: 'EVENT_OPTION_2',
    option_name: 'Events Help',
    slug: 'events-help',
  },
  {
    id: 'EVENT_OPTION_3',
    option_name: 'FAQs',
    slug: 'faqs',
  },
];

export const MONEY_OPTIONS: MONEY_OPTION[] = [
  {
    id: 'MONEY_OPTION_1',
    option_name: 'Buy Gift Card',
    slug: 'buy-gift-card',
  },
  {
    id: 'MONEY_OPTION_2',
    option_name: 'Claim Gift Card',
    slug: 'claim-gift-card',
  },
  {
    id: 'MONEY_OPTION_3',
    option_name: 'Gift Card Order History',
    slug: 'gift-card-order-history',
  },
  {
    id: 'MONEY_OPTION_4',
    option_name: 'Spice Station Credits',
    slug: 'zomato-credits',
  },
  {
    id: 'MONEY_OPTION_5',
    option_name: 'Gift Cards Help',
    slug: 'gift-cards-help',
  },
  {
    id: 'MONEY_OPTION_6',
    option_name: 'Spice Station Wallet',
    slug: 'spice-station-wallet',
  },
];

export const MORE_OPTIONS: MORE_OPTION[] = [
  {
    id: 'MORE_OPTION_1',
    option_name: 'Choose Language',
    slug: 'choose-lanhuage',
  },
  {
    id: 'MORE_OPTION_2',
    option_name: 'About',
    slug: 'about',
  },
  {
    id: 'MORE_OPTION_3',
    option_name: 'Send Feedback',
    slug: 'send-feedback',
  },
];
