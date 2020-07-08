import { configureStore } from '@reduxjs/toolkit';
import loginReducer, { loginName } from '../components/Login/loginSlice';
import tableReducer, { tableName } from '../components/Table/tableSlice';

export default configureStore({
  reducer: {
    [loginName]: loginReducer,
    [tableName]: tableReducer,
  },
});
