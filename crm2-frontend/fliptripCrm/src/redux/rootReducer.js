import { combineReducers } from "@reduxjs/toolkit";
import employeeReducer from "./features/employee/employeeSlice";
import authReducer from "./features/auth/authSlice";

const rootReducer = combineReducers({
  auth: authReducer,
  employee: employeeReducer,
});

export default rootReducer;
