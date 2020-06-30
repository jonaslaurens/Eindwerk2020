import { configureStore } from '@reduxjs/toolkit';
import loginReducer, { loginName } from '../components/Login/slice';

export default configureStore({
  reducer: {
    [loginName]: loginReducer,
  },
});
