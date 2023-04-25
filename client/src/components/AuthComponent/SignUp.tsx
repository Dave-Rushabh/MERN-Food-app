import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { handleSignUp } from '../../../utils/authUtils';
import { useToast } from '@chakra-ui/react';

const schema = Yup.object().shape({
  username: Yup.string().required('User Name is required'),
  dateOfBirth: Yup.date().required('Date of birth is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  contactNo: Yup.string()
    .matches(/^\d{10}$/, 'Invalid phone number')
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

  return (
    <>
      <div className="max-w-lg">
        <h1 className="text-2xl font-bold mb-4">Sign Up</h1>
        <Formik
          initialValues={initialValues}
          validationSchema={schema}
          onSubmit={async (values, { resetForm }) => {
            const message = await handleSignUp(values);
            if (message) {
              toast({
                title: message,
                status: 'success',
                duration: 6000,
                isClosable: true,
                position: 'top',
              });
              navigate('/');
            }
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
                  className={` appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
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
                  className={`appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
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
                  className={`appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
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
                    className={`appearance-none border rounded w-16 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
                  />

                  <Field
                    type="text"
                    name="contactNo"
                    id="contactNo"
                    className={`appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
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
                <Field
                  type="password"
                  name="password"
                  id="password"
                  className={`appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                    touched.password && errors.password ? 'border-red-500' : ''
                  } focus:border-blue-500 focus:shadow-blue-outline`}
                />
                <ErrorMessage
                  name="password"
                  component="p"
                  className="text-red-500 mt-1"
                />
              </div>
              <button
                type="submit"
                className="bg-app_primary_light hover:bg-app_primary_dark text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Sign Up
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
};

export default SignUp;
