import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { TransactionInterface } from "../../utils/const";

const initialState: TransactionInterface[] = [];

export const transactionsSlice = createSlice({
  name: "transactions",
  initialState,
  reducers: {
    addTransaction: (
      state: TransactionInterface[],
      action: PayloadAction<TransactionInterface>
    ): void => void state.push(action.payload),
  },
});

const { actions, reducer } = transactionsSlice;
export const { addTransaction } = actions;
export default reducer;
