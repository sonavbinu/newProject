import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: JSON.parse(localStorage.getItem("products")) || [],
};

const products = createSlice({
  name: "products",
  initialState,
  reducers: {
    addProduct: (state, action) => {
      state.products.push(action.payload);

      localStorage.setItem("products", JSON.stringify(state.products));
    },
  },
});
