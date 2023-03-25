import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { NavLink, useNavigate,useParams } from 'react-router-dom';
import images from '../constants/images';
import { signup } from '../services/api';
import { signup as reduxSignUp } from '../redux/slices/auth';
import { toast } from 'react-toastify';
const SignUp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuth } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isAuth) {
      navigate('/dashboard');
    }
  }, [isAuth]);
  const initialValues = {
    username: '',
    password: '',
    email: '',
    firstName: '',
    lastName: '',
    confirmPassword: '',
    mobile: '',
  };
  const validationSchema = Yup.object({
    username: Yup.string().required('Username is required'),
    password: Yup.string().required('Password is required').min(8, 'Password must be 8 characters').matches(/(?=.*[0-9])/, 'Password must contain a number').matches(/(?=.*[a-z])/, 'Password must contain a lowercase letter').matches(/(?=.*[A-Z])/, 'Password must contain an uppercase letter'),
    email: Yup.string().required('Email is required').email('Email is invalid'),
    firstName: Yup.string().required('First Name is required'),
    lastName: Yup.string().required('Last Name is required'),
    confirmPassword: Yup.string().required('Confirm Password is required').oneOf([Yup.ref('password'), null], 'Passwords must match'),
    mobile: Yup.string().required('Mobile is required').min(10, 'Mobile must be 10 digits'),

  });
  const onSubmit = (values) => {
    signup(values).then((res) => {
      dispatch(reduxSignUp(res.data));
    toast.success('Signup Successful!');
    }).catch((err) => {
      console.log(err);
    })
  };

  return (
    <div className="flex  items-center  ">
      <div className="flex items-center lg:flex-row flex-col justify-center w-full  gap-10 ">
        <div className="flex flex-col items-center justify-center lg:w-1/2 w-full h-full">
          <img
            src={images.signup}
            alt="login"
            className="h-full w-full object-cover"
          />
        </div>
        <div className="flex flex-col items-center justify-center lg:w-1/2  w-full h-1/2 ">
          <div className="flex flex-col items-center justify-center w-full h-1/2">
            <h1 className="text-4xl font-bold underline text-blue-800 p-5 tracking-wide hover:tracking-widest hover:cursor-pointer">
              SignUp
            </h1>
          </div>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
            <Form className="flex flex-col items-center justify-center w-full h-1/2 gap-1">
              <div className="flex flex-col items-center justify-center w-full h-1/2">
                <label
                  htmlFor="username"
                  className="text-gray-500 text-xl text-bold text-blue-500"
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
                  className="text-red-500 text-lg"
                />
              </div>
              <div className="flex flex-col items-center justify-center w-full h-1/2">
                <label
                  htmlFor="password"
                  className="text-gray-500 text-xl text-bold text-blue-500"
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
                  className="text-red-500 text-lg"
                />
              </div>
              <div className="flex flex-col items-center justify-center w-full h-1/2">
                <label
                  htmlFor="confirmPassword"
                  className="text-gray-500 text-xl text-bold text-blue-500"
                >
                  Confirm Password
                </label>
                <Field
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  className="w-1/2 h-1/2 border-2 border-gray-500 rounded-lg p-2"
                />
                <ErrorMessage
                  name="confirmPassword"
                  component="div"
                  className="text-red-500 text-lg"
                />
              </div>
              <div className="flex flex-col items-center justify-center w-full h-1/2">
                <label
                  htmlFor="email"
                  className="text-gray-500 text-xl text-bold text-blue-500"
                >
                  Email
                </label>
                <Field
                  type="email"
                  name="email"
                  placeholder="Confirm Password"
                  className="w-1/2 h-1/2 border-2 border-gray-500 rounded-lg p-2"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-500 text-lg"
                />
              </div>
              <div className="flex flex-col items-center justify-center w-full h-1/2">
                <label
                  htmlFor="firstName"
                  className="text-gray-500 text-xl text-bold text-blue-500"
                >
                  First Name
                </label>
                <Field
                  type="text"
                  name="firstName"
                  placeholder="First Name"
                  className="w-1/2 h-1/2 border-2 border-gray-500 rounded-lg p-2"
                />
                <ErrorMessage
                  name="firstName"
                  component="div"
                  className="text-red-500 text-lg"
                />
              </div>
              <div className="flex flex-col items-center justify-center w-full h-1/2">
                <label
                  htmlFor="lastName"
                  className="text-gray-500 text-xl text-bold text-blue-500"
                >
                  Last Name
                </label>
                <Field
                  type="text"
                  name="lastName"
                  placeholder="Last Name"
                  className="w-1/2 h-1/2 border-2 border-gray-500 rounded-lg p-2"
                />
                <ErrorMessage
                  name="lastName"
                  component="div"
                  className="text-red-500 text-lg"
                />
              </div>
              <div className="flex flex-col items-center justify-center w-full h-1/2">
                <label
                  htmlFor="mobile"
                  className="text-gray-500 text-xl text-bold text-blue-500"
                >
                  Mobile Number
                </label>
                <Field
                  type="number"
                  name="mobile"
                  placeholder="Mobile Number"
                  className="w-1/2 h-1/2 border-2 border-gray-500 rounded-lg p-2"
                />
                <ErrorMessage
                  name="mobile"
                  component="div"
                  className="text-red-500 text-lg"
                />
              </div>
              <div className="flex flex-col items-center justify-center w-full h-1/2">
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded  w-1/2 align-middle"
                >
                  Sign Up
                </button>
              </div>
            </Form>
          </Formik>
          <NavLink to="/login" className="text-blue-500 text-xl">
            Already have an account? Login
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
