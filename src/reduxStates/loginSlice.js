import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: false,
};

export const loginSlice = createSlice({
  name: "modalComponent",
  initialState,
  reducers: {
    loginState: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { loginState } = loginSlice.actions;
export default loginSlice.reducer;
