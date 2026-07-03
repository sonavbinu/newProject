import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "./slices/themeSlice";
import orderReducer from "./slices/orderSlice";

const store = configureStore({
  reducer: {
    theme: themeReducer,
    orders: orderReducer,
  },
});

export default store;
