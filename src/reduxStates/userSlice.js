import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {
    id: "",
    name: "",
    email: "",
  },
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    currentUser: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { currentUser } = userSlice.actions;
export default userSlice.reducer;
