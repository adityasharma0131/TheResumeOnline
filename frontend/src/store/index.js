import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./slices/authSlice";
import alertReducer from "./slices/alertSlice";
import resumeReducer from "./slices/resumeSlice";
import templateReducer from "./slices/templateSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    alert: alertReducer,
    resume: resumeReducer,
    template: templateReducer,
  },
});

export default store;
