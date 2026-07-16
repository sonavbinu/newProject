import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "./slices/themeSlice";
import orderReducer from "./slices/orderSlice";
import productReducer from "./slices/productSlice";
import storeReducer from "./slices/storeSlice";

const store = configureStore({
  reducer: {
    theme: themeReducer,
    orders: orderReducer,
    products: productReducer,
    store: storeReducer,
  },
});

export default store;
