import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { NavLink, useNavigate } from 'react-router-dom';
import images from '../constants/images';
import { login } from '../redux/slices/auth';
import { login as loginApi } from '../services/api';
import { toast } from 'react-toastify';
const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const { isAuth } = useSelector((state) => state.auth);
  useEffect(() => {
    if (isAuth) {
      navigate('/dashboard');
    }
  }, [isAuth]);
  const initialValues = {
    username: '',
    password: '',
  };
  const validationSchema = Yup.object({
    username: Yup.string().required('Username is required'),
    password: Yup.string().required('Password is required'),
  });
  const onSubmit = (values) => {
    loginApi(values)
      .then((res) => {
        const { token, user, isAdmin, status } = res.data;
        dispatch(
          login({
            token,
            user,
            isAuth: true,
            isAdmin,
            status,
          })
        );
        toast.success('Login Successful!');
        navigate('/dashboard');
      })
      .catch((err) => {
        setError(err.response.data);
      });
  };

  return (
    <div className="flex  items-center  ">
      <div className="flex items-center lg:flex-row flex-col justify-center w-full  gap-10 ">
        <div className="flex flex-col items-center justify-center lg:w-1/2 w-full ">
          <img
            src={images.login}
            alt="login"
            className="h-96 w-96 lg:h-full lg:w-full md:h-full md:w-full"
          />
        </div>
        <div className="flex flex-col items-center justify-center lg:w-1/2  w-full h-1/2 gap-4">
          <div className="flex flex-col items-center justify-center w-full h-1/2">
            <h1 className="text-5xl font-bold underline text-blue-800 p-5 tracking-wide hover:tracking-widest hover:cursor-pointer">
              Login
            </h1>
          </div>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
            <Form className="flex flex-col items-center justify-center w-full h-1/2 gap-5">
              <div className="flex flex-col items-center justify-center w-full h-1/2">
                <label
                  htmlFor="username"
                  className="text-gray-500 text-3xl text-bold text-blue-500"
                >
                  Username
                </label>
                <Field
                  type="text"
                  name="username"
                  placeholder="Username"
                  className="w-1/2 h-1/2 border-2 border-gray-500 rounded-lg p-2"
                />
                <ErrorMessage
                  name="username"
                  component="div"
                  className="text-red-500 text-xl"
                />
              </div>
              <div className="flex flex-col items-center justify-center w-full h-1/2">
                <label
                  htmlFor="password"
                  className="text-gray-500 text-3xl text-bold text-blue-500"
                >
                  Password
                </label>
                <Field
                  type="password"
                  name="password"
                  placeholder="Password"
                  className="w-1/2 h-1/2 border-2 border-gray-500 rounded-lg p-2"
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-red-500 text-xl"
                />
              </div>
              <div className="flex flex-col items-center justify-center w-full h-1/2">
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded  w-1/2 align-middle"
                >
                  Login
                </button>
              </div>
            </Form>
          </Formik>
          <NavLink to="/signup" className="text-blue-500 text-2xl">
            Don't have an account? Register
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Login;
