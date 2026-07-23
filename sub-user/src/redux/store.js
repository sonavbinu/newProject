import { configureStore } from "@reduxjs/toolkit";
import customerAuthReducer from "./slices/customerAuthSlice";
import storeBrowseReducer from "./slices/storeBrowseSlice";

export const store = configureStore({
  reducer: {
    customerAuth: customerAuthReducer,
    storeBrowse: storeBrowseReducer,
  },
});
