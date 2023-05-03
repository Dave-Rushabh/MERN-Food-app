import { Button } from '@chakra-ui/react';
import './index.css';
import { FaUserCircle } from 'react-icons/fa';
import { Tooltip } from '@chakra-ui/react';
import {
  GET_USER_INFO,
  TOGGLE_USER_INFO_MODAL_VISIBILITY,
} from '../../../../../redux/slice/navbarSlice';
import { useDispatch } from 'react-redux';

const UserProfile = () => {
  const user = sessionStorage.getItem('user');
  const label = user ? JSON.parse(user).username : '';
  const userId = user ? JSON.parse(user).id : '';

  const dispatch = useDispatch();

  return (
    <>
      <div className="user-card ">
        <div className="avatar">
          <FaUserCircle style={{ fontSize: '3.5rem', color: '#d3d3d3' }} />
        </div>
        <div className="user-info">
          <div className="user-name">
            <Tooltip
              label={label}
              bg="#33658a"
              color="white"
              borderRadius="5px"
              fontSize="md"
              placement="left"
              hasArrow
              padding="0.5rem"
            >
              <span className="user-name-container-span">{label}</span>
            </Tooltip>
          </div>
          <Button
            onClick={() => {
              dispatch(GET_USER_INFO(userId));
              dispatch(TOGGLE_USER_INFO_MODAL_VISIBILITY());
            }}
            variant="outline"
            bg="#33658a"
            _hover={{ bg: '#2f4858' }}
            color="white"
            size="md"
          >
            View / Edit Profile
          </Button>
        </div>
      </div>
    </>
  );
};

export default UserProfile;
