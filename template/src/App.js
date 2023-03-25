import React,{useEffect} from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import {Pages} from './constants/Pages';
import {useSelector,useDispatch} from 'react-redux';
import { login } from './redux/slices/auth';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const App = () => {
  console.log(useSelector((state) => state));
  const dispatch = useDispatch();
  useEffect(() => {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    const isAuth = localStorage.getItem('isAuth');
    const isAdmin = localStorage.getItem('isAdmin');
    const status = localStorage.getItem('status');
    if (token && user && isAuth && isAdmin && status) {
      dispatch(
        login({
          token,
          user: JSON.parse(user),
          isAuth: JSON.parse(isAuth),
          isAdmin: JSON.parse(isAdmin),
          status,
        })
      );
    }
  }, []);
  const {isAuth} = useSelector((state) => state.auth);
  return (
    <Router>
      <ToastContainer />
      <Navbar />
      <Routes>
        {Pages.map((page) =>
          isAuth === page.loginRequired ? (
            <Route
              path={page.path}
              element={<page.component />}

              key={page.name}
            />
          ) : (
            <Route
              path={page.path}
              element={<page.component />}
              key={page.name}
            />
          )
        )}
      </Routes>
    </Router>
  );
};

export default App;
