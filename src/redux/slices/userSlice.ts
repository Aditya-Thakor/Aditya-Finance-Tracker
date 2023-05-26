import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { TRegister } from "../../modals/register";

const initialState: TRegister[] = [];

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    addUser: (state, action: PayloadAction<TRegister>) => {
      void state.push(action.payload);
    },
  },
});

const { actions, reducer } = userSlice;
export const { addUser } = actions;
export default reducer;
