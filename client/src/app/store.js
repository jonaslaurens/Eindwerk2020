import { configureStore } from '@reduxjs/toolkit';
import loginReducer, { loginName } from '../components/Login/slice';
import tableReducer, { tableName } from '../components/Table/slice';

export default configureStore({
  reducer: {
    [loginName]: loginReducer,
    [tableName]: tableReducer,
  },
});
