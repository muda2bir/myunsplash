import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: "",
};

export const searchSlice = createSlice({
  name: "searchQuery",
  initialState,
  reducers: {
    searchQuery: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { searchQuery } = searchSlice.actions;
export default searchSlice.reducer;
