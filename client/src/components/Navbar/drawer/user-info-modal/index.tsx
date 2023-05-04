import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  Spinner,
} from '@chakra-ui/react';
import { useFormik } from 'formik';
import { useReducer } from 'react';
import * as Yup from 'yup';

interface UserInfoModalProps {
  isOpen: boolean;
  onClose: () => void;
  userData: object;
}

interface RenderUserInfoProps {
  userData: any;
}

interface EditUserInfoProps {
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

const EditUserInfo = ({ userData }: EditUserInfoProps) => {
  interface FormValues {
    username: string;
    contactno: string;
    email: string;
    dob: string;
  }

  const initialValues: FormValues = {
    username: userData?.username,
    contactno: userData?.contactNo,
    email: userData?.email,
    dob: new Date(userData?.dateOfBirth).toISOString().split('T')[0], // Convert date of birth to input date format
  };

  const validationSchema = Yup.object({
    username: Yup.string().required('Username is required'),
    contactno: Yup.string()
      .matches(/^\d{10}$/, 'Contact No must be a 10 digit number')
      .required('Contact No is required'),
    email: Yup.string()
      .email('Invalid email address')
      .matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, 'Invalid email address')
      .required('Email is required'),
    dob: Yup.date()
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
      // to do  : integrate API to update user info
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
            id="contactno"
            name="contactno"
            className="h-8 border-2 border-app_primary_light w-full mb-2 rounded-sm focus:outline-none pl-2"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.contactno}
          />
          {touched.contactno && errors.contactno && (
            <div className="text-red-500">{errors.contactno}</div>
          )}

          <div className="font-bold mb-2 text-app_primary_dark">
            Date Of Birth <span className="text-red-500">*</span>
          </div>
          <input
            type="date"
            id="dob"
            name="dob"
            className="h-8 border-2 border-app_primary_light w-full mb-2 rounded-sm focus:outline-none pl-2"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.dob}
          />
          {touched.dob && errors.dob && (
            <div className="text-red-500">{errors.dob}</div>
          )}

          <br />
          <button
            type="submit"
            value="Submit"
            className={`h-12 px-4 rounded-lg text-md font-semibold bg-app_primary_light text-white hover:bg-app_primary_dark mt-2 ${
              Object.keys(errors).length > 0 || !dirty
                ? 'opacity-50 cursor-not-allowed'
                : ''
            }`}
            disabled={Object.keys(errors).length > 0 || !dirty}
          >
            Update
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
          className={`h-8 w-20 mr-1 text-white ${
            selection.view
              ? 'bg-app_primary_light'
              : 'border-t-2 border-l-2 border-r-2 border-app_primary_light text-app_primary_light'
          }`}
        >
          View
        </button>
        <button
          onClick={() => dispatch({ type: 'ACTIVATE_EDIT' })}
          className={`h-8 w-20 text-white ${
            selection.edit
              ? 'bg-app_primary_light'
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
            {selection.edit && <EditUserInfo {...{ userData }} />}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default UserInfoModal;
