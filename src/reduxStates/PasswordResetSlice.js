import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {
    passwordResetBoolean: false,
    passwordResetUserEmail: "",
  },
};

export const PasswordResetSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    passwordResetProcess: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { passwordResetProcess } = PasswordResetSlice.actions;
export default PasswordResetSlice.reducer;
