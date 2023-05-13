import { useEffect, useState } from 'react';
import './index.css';
import InfiniteScrollWrapper from './InfiniteScrollWrapper';
import TabSelector from './TabSelector';
import { MdOutlineArrowUpward } from 'react-icons/md';

const Homepage = () => {
  const [showScrollButton, setShowScrollButton] = useState(false);

  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const handleScroll = () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    setShowScrollButton(scrollTop > 0);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <TabSelector />
      <InfiniteScrollWrapper />
      {showScrollButton && (
        <button
          className="scroll-to-top-button"
          onClick={() => handleScrollToTop()}
        >
          <MdOutlineArrowUpward
            style={{ fontSize: '1.5rem' }}
            className="top-icon"
          />
        </button>
      )}
    </>
  );
};

export default Homepage;
