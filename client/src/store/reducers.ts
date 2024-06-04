import { combineReducers } from '@reduxjs/toolkit';
import authSlice from './auth/authSlice';

const rootReducer = combineReducers({
  authorization: authSlice,
});

export default rootReducer;
