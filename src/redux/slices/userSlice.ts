import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface obj {
  username?: string;
  password?: string;
  email?: string;
  confirm?: string;
}

const initialState: obj[] = [];

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    addUser: (state: obj[], action: PayloadAction<obj>) => {
      void state.push(action.payload);
    },
  },
});

const { actions, reducer } = userSlice;
export const { addUser } = actions;
export default reducer;
