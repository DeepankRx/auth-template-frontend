import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import images from '../constants/images';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../redux/slices/auth';
import { GiHamburgerMenu } from 'react-icons/gi';
import Drawer from '../UI/Drawer';
const Navbar = () => {
  const { isAuth } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleButtonClick = () => {
    isAuth ? dispatch(logout()) : navigate('/login');
  };
  return (
    <div className="flex w-full justify-between items-center border-b-2 border-gray-500 bg-black">
      <div className="p-2">
        <NavLink to="/">
          <img
            src={images.logo}
            alt="logo"
            className="h-16 hover:opacity-75 hover:h-20"
          />
        </NavLink>
      </div>
      <div className="hidden md:flex">
        <ul className="flex items-center">
          <li className="mr-4">
            <NavLink
              to="/"
              className="text-gray-500 text-xl hover:text-sky-100"
            >
              Home
            </NavLink>
          </li>
          <li className="mr-4">
            <NavLink
              to="/about"
              className="text-gray-500 text-xl hover:text-sky-100"
            >
              About
            </NavLink>
          </li>
          <li className="mr-4">
            <NavLink
              to="/about"
              className="text-gray-500 text-xl hover:text-sky-100"
            >
              Contact
            </NavLink>
          </li>
          <li className="mr-4">
            <NavLink
              to="/about"
              className="text-gray-500 text-xl hover:text-sky-100"
            >
              Services
            </NavLink>
          </li>
          <li className="mr-4 flex items-center">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded  w-full align-middle"
              onClick={handleButtonClick}
            >
              {isAuth ? 'Logout' : 'Login'}
            </button>
          </li>
        </ul>
      </div>
      <div className="flex xl:hidden lg:hidden md:hidden items-center justify-around p-4">
          <Drawer />
        </div>
    </div>
  );
};

export default Navbar;
