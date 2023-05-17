import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: [],
  reducers: {
    addUsers: (state, action) => {
      void state.push(action.payload);
    },
  },
});

const { actions } = userSlice;

export default userSlice.reducer;
export const { addUsers } = actions;
