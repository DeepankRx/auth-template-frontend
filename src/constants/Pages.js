import Login from '../components/Login';
import SignUp from '../components/SignUp';

const Pages = [
  {
    path: '/login',
    component: Login,
    name: 'Login',
    loginRequired: false,
    adminRequired: false,
  },
  {
    path: '/signup',
    component: SignUp,
    name: 'Signup',
    loginRequired: false,
    adminRequired: false,
  },
];

export { Pages };
