import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./slices/userSlice";
import transactionsSlice from "./slices/transactionsSlice";

export const store = configureStore({
  reducer: {
    users: userSlice,
    transactions: transactionsSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
