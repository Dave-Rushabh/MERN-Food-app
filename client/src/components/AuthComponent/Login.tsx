import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useToast } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { Spinner } from '@chakra-ui/react';
import { AiFillEyeInvisible, AiFillEye } from 'react-icons/ai';
import { HANDLE_LOGIN } from '../../../redux/slice/authSlice';
import DOMPurify from 'dompurify';

const schema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string().required('Password is required'),
});

const initialValues = {
  email: '',
  password: '',
};

const Login = () => {
  const toast = useToast();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loginStatusMsg, isLoginSuccess, isLoggingInLoading } = useSelector(
    (state: any) => state.authReducer.login
  );
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (loginStatusMsg?.length) {
      if (isLoginSuccess) {
        toast({
          title: loginStatusMsg,
          status: 'success',
          duration: 6000,
          isClosable: true,
          position: 'top',
        });
        navigate('/');
      } else {
        toast({
          title: loginStatusMsg,
          status: 'error',
          duration: 6000,
          isClosable: true,
          position: 'top',
        });
      }
    }
  }, [loginStatusMsg]);

  return (
    <>
      <div className="max-w-lg login-form-wrapper">
        <Formik
          initialValues={initialValues}
          validationSchema={schema}
          onSubmit={async (values, { resetForm }) => {
            const sanitizedValues = {
              email: DOMPurify.sanitize(values.email),
              password: DOMPurify.sanitize(values.password),
            };
            dispatch(HANDLE_LOGIN(sanitizedValues));
            resetForm();
          }}
        >
          {({ touched, errors }) => (
            <Form>
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
                {isLoggingInLoading ? <Spinner size="md" /> : 'Login'}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
};

export default Login;
