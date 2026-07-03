import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "./slices/themeSlice";
import orderReducer from "./slices/orderSlice";
import productReducer from "./slices/productSlice";

const store = configureStore({
  reducer: {
    theme: themeReducer,
    orders: orderReducer,
    products: productReducer,
  },
});

export default store;
