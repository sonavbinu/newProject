import { configureStore } from "@reduxjs/toolkit";
import customerAuthReducer from "./slices/customerAuthSlice";
import storeBrowseReducer from "./slices/storeBrowseSlice";
import cartReducer from "./slices/cartSlice";
import orderReducer from "./slices/orderSlice";

export const store = configureStore({
  reducer: {
    customerAuth: customerAuthReducer,
    storeBrowse: storeBrowseReducer,
    cart: cartReducer,
    order: orderReducer,
  },
});
