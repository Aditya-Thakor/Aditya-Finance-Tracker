import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { TransactionInterface } from "../../modals/transactions";

const initialState: TransactionInterface[] = [];

export const transactionsSlice = createSlice({
  name: "transactions",
  initialState,
  reducers: {
    addTransaction: (
      state,
      action: PayloadAction<TransactionInterface>
    ): void => void state.push(action.payload),

    deleteTransaction: (
      state,
      action: PayloadAction<number>
    ): TransactionInterface[] => {
      return state.filter(
        (transaction) => transaction.transactionId !== action.payload
      );
    },
  },
});

const { actions, reducer } = transactionsSlice;
export const { addTransaction, deleteTransaction } = actions;
export default reducer;
