import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  status: 'idle',
  error: null,
  token: null,
  isAuth: false,
  isAdmin: false,
};


export const  authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.status = 'idle';
      state.error = null;
      state.token = null;
      state.isAuth = false;
      state.isAdmin = false;
      localStorage.clear();
    },
    login: (state, action) => {
      state.user = action.payload.user;
      state.status = 'success';
      state.error = null;
      state.token = action.payload.token;
      state.isAuth = true;
      state.isAdmin = action.payload.user.isAdmin || false;
      localStorage.setItem('token', action.payload.token);
      localStorage.setItem('user', JSON.stringify(action.payload.user));
      localStorage.setItem('isAuth', true);
      localStorage.setItem('isAdmin', action.payload.user.isAdmin || false);
      localStorage.setItem('status', 'success');
    },

    signup: (state, action) => {
      state.user = action.payload.user;
      state.status = 'success';
      state.error = null;
      state.token = action.payload.token;
      state.isAuth = true;
      state.isAdmin = action.payload.user.isAdmin || false;
      localStorage.setItem('token', action.payload.token);
      localStorage.setItem('user', JSON.stringify(action.payload.user));
      localStorage.setItem('isAuth', true);
      localStorage.setItem('isAdmin', action.payload.user.isAdmin || false);
      localStorage.setItem('status', 'success');
    },
    updateUser: (state, action) => {
      state.user = action.payload;
      state.status = 'success';
      state.error = null;
      state.token = localStorage.getItem('token');
      state.isAuth = true;
      state.isAdmin = action.payload.isAdmin || false;
      localStorage.setItem('user', JSON.stringify(action.payload));
      localStorage.setItem('isAuth', true);
      localStorage.setItem('isAdmin', action.payload.isAdmin || false);
      localStorage.setItem('status', 'success');
    },
    deleteUser: (state, action) => {
      state.user = null;
      state.status = 'success';
      state.error = null;
      state.token = null;
      state.isAuth = false;
      state.isAdmin = false;
      localStorage.clear();
    },
    setError: (state, action) => {
      state.status = 'error';
      state.error = action.payload;
      localStorage.setItem('status', 'error');
      localStorage.setItem('error', action.payload);
    },
  }
});


export const { logout, login, signup, updateUser, deleteUser, setError } = authSlice.actions;

export default authSlice.reducer;


