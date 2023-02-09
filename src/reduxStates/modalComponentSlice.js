import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {
    component: "add_photo",
  },
};

export const modalComponentSlice = createSlice({
  name: "modalComponent",
  initialState,
  reducers: {
    setModalComponent: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setModalComponent } = modalComponentSlice.actions;
export default modalComponentSlice.reducer;
