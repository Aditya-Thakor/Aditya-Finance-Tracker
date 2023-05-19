import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./slices/userSlice";
import transactionSlice from "./slices/transactionSlice";

const store = configureStore({
  reducer: {
    transactions: transactionSlice,
    users: userSlice,
  },
});

export default store;
