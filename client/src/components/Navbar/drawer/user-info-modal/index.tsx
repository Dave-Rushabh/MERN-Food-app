import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  Spinner,
} from '@chakra-ui/react';

interface UserInfoModalProps {
  isOpen: boolean;
  onClose: () => void;
  userData: object;
}

interface RenderUserInfoProps {
  userData: any;
}

const RenderUserInfo = ({ userData }: RenderUserInfoProps) => {
  function formatDate(dateString: string) {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear().toString();
    return `${day}-${month}-${year}`;
  }

  return (
    <>
      {userData ? (
        <div className="p-6 bg-white rounded-md border border-app_primary_dark mb-8">
          <div className="font-bold mb-2 text-app_primary_dark">User Name</div>
          <div className="mb-4">{userData['username']}</div>

          <div className="font-bold mb-2 text-app_primary_dark">Email</div>
          <div className="mb-4">{userData['email']}</div>

          <div className="font-bold mb-2 text-app_primary_dark">Contact</div>
          <div className="mb-4">
            <span className="mr-2">{userData['countryCode']}</span>
            <span>{userData['contactNo']}</span>
          </div>

          <div className="font-bold text-app_primary_dark">Date Of Birth</div>
          <div className="mb-4">{formatDate(userData['dateOfBirth'])}</div>
        </div>
      ) : (
        <Spinner />
      )}
    </>
  );
};

const UserInfoModal = ({ isOpen, onClose, userData }: UserInfoModalProps) => {
  return (
    <>
      <Modal blockScrollOnMount isOpen={isOpen} onClose={onClose} size="xl">
        <ModalContent>
          <ModalHeader className="text-app_primary_dark font-bold">
            Profile Details
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <RenderUserInfo {...{ userData }} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default UserInfoModal;
