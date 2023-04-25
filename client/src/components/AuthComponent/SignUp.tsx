import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useToast } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { HANDLE_SIGN_UP } from '../../../redux/slice/authSlice';
import { Spinner } from '@chakra-ui/react';
import { AiFillEyeInvisible, AiFillEye } from 'react-icons/ai';

const schema = Yup.object().shape({
  username: Yup.string()
    .max(20, 'Username must be at most 20 characters')
    .matches(/^[a-zA-Z0-9]+$/, 'Username must not include special characters')
    .required('Username is required'),
  dateOfBirth: Yup.date()
    .max(new Date(), "Date of birth can't be in the future")
    .required('Date of birth is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  contactNo: Yup.string()
    .matches(/^\d{10}$/, 'Phone number must be of 10 digits')
    .required('Phone number is required'),
  password: Yup.string().required('Password is required'),
});

const initialValues = {
  username: '',
  dateOfBirth: '',
  email: '',
  contactNo: '',
  countryCode: '+91',
  password: '',
};

const SignUp = () => {
  const toast = useToast();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { signUpStatusMsg, isSignUpSuccess, isSigninUpLoading } = useSelector(
    (state: any) => state.authReducer.signUp
  );
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (signUpStatusMsg?.length) {
      if (isSignUpSuccess) {
        toast({
          title: signUpStatusMsg,
          status: 'success',
          duration: 6000,
          isClosable: true,
          position: 'top',
        });
        navigate('/');
      } else {
        toast({
          title: signUpStatusMsg,
          status: 'error',
          duration: 6000,
          isClosable: true,
          position: 'top',
        });
      }
    }
  }, [signUpStatusMsg]);

  return (
    <>
      <div className="max-w-lg">
        <Formik
          initialValues={initialValues}
          validationSchema={schema}
          onSubmit={async (values, { resetForm }) => {
            dispatch(HANDLE_SIGN_UP(values));
            resetForm();
          }}
        >
          {({ touched, errors }) => (
            <Form>
              <div className="mb-4">
                <label
                  className="block text-gray-700 font-bold mb-2"
                  htmlFor="username"
                >
                  User Name <span className="text-red-500">*</span>
                </label>
                <Field
                  type="text"
                  name="username"
                  id="username"
                  className={` appearance-none border-2 border-app_primary_light rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                    touched.username && errors.username ? 'border-red-500' : ''
                  }`}
                />
                <ErrorMessage
                  name="username"
                  component="p"
                  className="text-red-500 mt-1"
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 font-bold mb-2"
                  htmlFor="dateOfBirth"
                >
                  Date of Birth <span className="text-red-500">*</span>
                </label>
                <Field
                  type="date"
                  name="dateOfBirth"
                  id="dateOfBirth"
                  className={`appearance-none border-2 border-app_primary_light rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                    touched.dateOfBirth && errors.dateOfBirth
                      ? 'border-red-500'
                      : ''
                  }`}
                />
                <ErrorMessage
                  name="dateOfBirth"
                  component="p"
                  className="text-red-500 mt-1"
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 font-bold mb-2"
                  htmlFor="email"
                >
                  Email <span className="text-red-500">*</span>
                </label>
                <Field
                  type="email"
                  name="email"
                  id="email"
                  className={`appearance-none border-2 border-app_primary_light rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                    touched.email && errors.email ? 'border-red-500' : ''
                  }`}
                />
                <ErrorMessage
                  name="email"
                  component="p"
                  className="text-red-500 mt-1"
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 font-bold mb-2"
                  htmlFor="contactNo"
                >
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <div className="flex items-center">
                  <Field
                    type="text"
                    name="countryCode"
                    id="countryCode"
                    value="+91"
                    disabled
                    className={`appearance-none border-2 mr-2 border-app_primary_light rounded w-16 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
                  />

                  <Field
                    type="text"
                    name="contactNo"
                    id="contactNo"
                    className={`appearance-none border-2 border-app_primary_light rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                      touched.contactNo && errors.contactNo
                        ? 'border-red-500'
                        : ''
                    }`}
                  />
                </div>
                <ErrorMessage
                  name="contactNo"
                  component="p"
                  className="text-red-500 mt-1"
                />
                <ErrorMessage
                  name="countryCode"
                  component="p"
                  className="text-red-500 mt-1"
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 font-bold mb-2"
                  htmlFor="password"
                >
                  Password <span className="text-red-500">*</span>
                </label>
                <div className="flex items-center">
                  <div
                    onClick={() => setShowPassword(!showPassword)}
                    className={`appearance-none border-2 mr-2 hover:cursor-pointer border-app_primary_light flex justify-center rounded w-16 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
                  >
                    {showPassword ? (
                      <AiFillEye style={{ fontSize: '1.1rem' }} />
                    ) : (
                      <AiFillEyeInvisible style={{ fontSize: '1.1rem' }} />
                    )}
                  </div>
                  <Field
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    id="password"
                    className={`appearance-none border-2 border-app_primary_light rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                      touched.password && errors.password
                        ? 'border-red-500'
                        : ''
                    } focus:border-blue-500 focus:shadow-blue-outline`}
                  />
                </div>

                <ErrorMessage
                  name="password"
                  component="p"
                  className="text-red-500 mt-1"
                />
              </div>
              <button
                type="submit"
                className="bg-app_primary_light hover:bg-app_primary_dark w-36 h-12 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                {isSigninUpLoading ? <Spinner size="md" /> : 'Sign Up'}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
};

export default SignUp;
