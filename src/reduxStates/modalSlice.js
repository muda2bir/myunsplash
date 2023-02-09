import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: false,
};

export const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    toggleModalTo: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { toggleModalTo } = modalSlice.actions;
export default modalSlice.reducer;
