import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  Spinner,
  useToast,
} from '@chakra-ui/react';
import { useFormik } from 'formik';
import { useReducer } from 'react';
import * as Yup from 'yup';
import {
  TOGGLE_IS_UPDATED,
  UPDATE_USER_INFO,
} from '../../../../../redux/slice/navbarSlice';
import { useDispatch, useSelector } from 'react-redux';
import { getUserId } from '../../../../../utils/authUtils';
import { useMemo, useEffect } from 'react';
interface UserInfoModalProps {
  isOpen: boolean;
  onClose: () => void;
  userData: object;
}

interface RenderUserInfoProps {
  userData: any;
}

interface UserInfoModalState {
  view: boolean;
  edit: boolean;
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
        <div className="p-6 bg-white rounded-md border border-app_primary_dark my-4">
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
        <div className="p-6 bg-white rounded-md border border-app_primary_dark my-4 flex items-center">
          <Spinner />
        </div>
      )}
    </>
  );
};

const EditUserInfo = ({ redirectToViewTab }: any) => {
  const dispatch = useDispatch();
  const toast = useToast();
  const {
    isUpdatingUserInfo,
    isUpdated,
    data: userData,
    updateMessage: { success, failure },
  } = useSelector((state: any) => state.navbarReducer.userInfo);

  useEffect(() => {
    if (!isUpdatingUserInfo && success?.length && isUpdated) {
      toast({
        title: success,
        status: 'success',
        duration: 6000,
        isClosable: true,
        position: 'top',
      });
      redirectToViewTab();
    }
    if (!isUpdatingUserInfo && failure?.length && isUpdated) {
      toast({
        title: failure,
        status: 'error',
        duration: 6000,
        isClosable: true,
        position: 'top',
      });
    }
    return () => {
      if (isUpdated) {
        dispatch(TOGGLE_IS_UPDATED(false));
      }
    };
  }, [isUpdatingUserInfo]);

  interface FormValues {
    username: string;
    contactNo: string;
    email: string;
    dateOfBirth: string;
  }

  const initialValues = useMemo(() => {
    return {
      username: userData?.username,
      contactNo: userData?.contactNo,
      email: userData?.email,
      dateOfBirth: new Date(userData?.dateOfBirth).toISOString().split('T')[0], // Convert date of birth to input date format
    };
  }, [userData]);

  const validationSchema = Yup.object({
    username: Yup.string().required('Username is required'),
    contactNo: Yup.string()
      .matches(/^\d{10}$/, 'Contact No must be a 10 digit number')
      .required('Contact No is required'),
    email: Yup.string()
      .email('Invalid email address')
      .matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, 'Invalid email address')
      .required('Email is required'),
    dateOfBirth: Yup.date()
      .max(new Date(), 'Date of Birth can not be in future')
      .required('Date of Birth is required'),
  });

  const {
    handleChange,
    handleBlur,
    handleSubmit,
    errors,
    touched,
    values,
    dirty,
  } = useFormik<FormValues>({
    initialValues,
    validationSchema,
    validateOnMount: true, // Validate the form when it's mounted
    validateOnBlur: true, // Validate the form when a field loses focus
    validateOnChange: true, // Validate the form when a field value changes
    onSubmit: values => {
      dispatch(UPDATE_USER_INFO({ userId: getUserId(), userData: values }));
    },
  });

  return (
    <>
      <div className="p-4 bg-white rounded-md border border-app_primary_dark my-4">
        <form onSubmit={handleSubmit}>
          <div className="font-bold mb-2 text-app_primary_dark">
            User Name <span className="text-red-500">*</span>
          </div>
          <input
            type="text"
            id="username"
            name="username"
            className="h-8 border-2 border-app_primary_light w-full mb-2 rounded-sm focus:outline-none pl-2"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.username}
          />
          {touched.username && errors.username && (
            <div className="text-red-500">{errors.username}</div>
          )}

          <div className="font-bold mb-2 text-app_primary_dark">
            Email <span className="text-red-500">*</span>
          </div>
          <input
            type="email"
            id="email"
            name="email"
            className="h-8 border-2 border-app_primary_light w-full mb-2 rounded-sm focus:outline-none pl-2"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.email}
          />
          {touched.email && errors.email && (
            <div className="text-red-500">{errors.email}</div>
          )}

          <div className="font-bold mb-2 text-app_primary_dark">
            Contact No <span className="text-red-500">*</span>
          </div>
          <input
            type="tel"
            id="contactNo"
            name="contactNo"
            className="h-8 border-2 border-app_primary_light w-full mb-2 rounded-sm focus:outline-none pl-2"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.contactNo}
          />
          {touched.contactNo && errors.contactNo && (
            <div className="text-red-500">{errors.contactNo}</div>
          )}

          <div className="font-bold mb-2 text-app_primary_dark">
            Date Of Birth <span className="text-red-500">*</span>
          </div>
          <input
            type="date"
            id="dateOfBirth"
            name="dateOfBirth"
            className="h-8 border-2 border-app_primary_light w-full mb-2 rounded-sm focus:outline-none pl-2"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.dateOfBirth}
          />
          {touched.dateOfBirth && errors.dateOfBirth && (
            <div className="text-red-500">{errors.dateOfBirth}</div>
          )}

          <br />
          <button
            type="submit"
            value="Submit"
            className={`h-12 w-24 px-4 rounded-lg text-md font-semibold bg-app_primary_light text-white hover:bg-app_primary_dark mt-2 ${
              Object.keys(errors).length > 0 || !dirty
                ? 'opacity-50 cursor-not-allowed'
                : ''
            }`}
            disabled={Object.keys(errors).length > 0 || !dirty}
          >
            {isUpdatingUserInfo ? <Spinner size="md" /> : 'Update'}
          </button>
        </form>
      </div>
    </>
  );
};

const ViewOrEditSelector = ({ selection, dispatch }: any) => {
  return (
    <>
      <div className="btn-wrapper">
        <button
          onClick={() => dispatch({ type: 'ACTIVATE_VIEW' })}
          className={`h-8 w-20 mr-1 ${
            selection.view
              ? 'bg-app_primary_light text-white'
              : 'border-t-2 border-l-2 border-r-2 border-app_primary_light text-app_primary_light'
          }`}
        >
          View
        </button>
        <button
          onClick={() => dispatch({ type: 'ACTIVATE_EDIT' })}
          className={`h-8 w-20  ${
            selection.edit
              ? 'bg-app_primary_light text-white'
              : 'border-t-2 border-l-2 border-r-2 border-app_primary_light text-app_primary_light'
          }`}
        >
          Edit
        </button>
      </div>
      <div className="h-1 bg-app_primary_light"></div>
    </>
  );
};

const UserInfoModal = ({ isOpen, onClose, userData }: UserInfoModalProps) => {
  const handleSelection = (state: UserInfoModalState, action: any) => {
    switch (action.type) {
      case 'ACTIVATE_VIEW':
        return { ...state, view: true, edit: false };
      case 'ACTIVATE_EDIT':
        return { ...state, view: false, edit: true };
      default:
        return state;
    }
  };

  const [selection, dispatch] = useReducer(handleSelection, {
    view: true,
    edit: false,
  });

  const redirectToViewTab = () => {
    dispatch({ type: 'ACTIVATE_VIEW' });
  };

  return (
    <>
      <Modal blockScrollOnMount isOpen={isOpen} onClose={onClose} size="xl">
        <ModalContent>
          <ModalHeader className="text-app_primary_dark font-bold">
            Profile Details
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <ViewOrEditSelector {...{ selection, dispatch }} />
            {selection.view && <RenderUserInfo {...{ userData }} />}
            {selection.edit && (
              <EditUserInfo redirectToViewTab={redirectToViewTab} />
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default UserInfoModal;
