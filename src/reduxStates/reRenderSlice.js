import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: 0,
};

export const reRenderSlice = createSlice({
  name: "reRender",
  initialState,
  reducers: {
    reRender: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { reRender } = reRenderSlice.actions;
export default reRenderSlice.reducer;
