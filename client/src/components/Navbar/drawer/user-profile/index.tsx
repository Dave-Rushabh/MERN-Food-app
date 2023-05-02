import { Button } from '@chakra-ui/react';
import './index.css';
import { FaUserCircle } from 'react-icons/fa';
import { Tooltip } from '@chakra-ui/react';

const UserProfile = () => {
  const user = sessionStorage.getItem('user');
  const label = user ? JSON.parse(user).username : '';
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
            onClick={() => {}}
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
