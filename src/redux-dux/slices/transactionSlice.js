import { createSlice } from "@reduxjs/toolkit";

const transactionSlice = createSlice({
  name: "Transaction",
  initialState: [],
  reducers: {
    addTransaction: (state, action) => void state.push(action.payload),
    deleteTransaction: (state, action) => {
      return state.filter(
        (transactions) => transactions.transactionId !== action.payload
      );
    },
  },
});

const { actions } = transactionSlice;

export default transactionSlice.reducer;
export const {
  addTransaction,
  deleteTransaction,
  editTransaction,
  viewTransactions,
} = actions;
