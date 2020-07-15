import { configureStore } from '@reduxjs/toolkit';
import loginReducer, { loginName } from '../components/Login/loginSlice';
import tableReducer, { tableName } from '../components/Table/tableSlice';
import alertReducer, { alertName } from '../components/Alerter/AlertSlice';

export default configureStore({
  reducer: {
    [loginName]: loginReducer,
    [tableName]: tableReducer,
    [alertName]: alertReducer,
  },
});
