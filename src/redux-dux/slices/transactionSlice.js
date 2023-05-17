import { createSlice } from "@reduxjs/toolkit";

const transactionSlice = createSlice({
  name: "Transaction",
  initialState: [],
  reducers: {
    addTransaction(state, action) {},
    viewTransactions(state, action) {},
    singleTransaction(state, action) {},
    editTransaction(state, action) {},
    deleteTransaction(state, action) {},
  },
});

export default transactionSlice.reducer;
