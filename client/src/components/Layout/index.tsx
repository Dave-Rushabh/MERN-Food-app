import { isTokenAvailable } from '../../../utils/authUtils';
import Navbar from '../Navbar';

const Layout = ({ children }: any) => {
  return (
    <>
      {isTokenAvailable() ? <Navbar /> : null}
      {children}
    </>
  );
};

export default Layout;
