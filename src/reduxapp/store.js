import PasswordResetReducer from "@/reduxStates/PasswordResetSlice.js";
import modalComponentReducer from "@/reduxStates/modalComponentSlice.js";
import reRenderReducer from "@/reduxStates/reRenderSlice.js";
import searchReducer from "@/reduxStates/searchSlice.js";
import userReducer from "@/reduxStates/userSlice.js";
import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "../reduxStates/loginSlice.js";
import modalReducer from "../reduxStates/modalSlice.js";

export const store = configureStore({
  reducer: {
    modal: modalReducer,
    modalComponent: modalComponentReducer,
    loginState: loginReducer,
    currentUser: userReducer,
    reRender: reRenderReducer,
    searchQuery: searchReducer,
    passwordResetProcess: PasswordResetReducer,
  },
});
