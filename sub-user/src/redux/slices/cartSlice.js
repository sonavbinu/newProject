import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    storeId: null,
    items: [], // { productId, productName, price, quantity, stock, image }
  },
  reducers: {
    addToCart: (state, action) => {
      const { storeId, product } = action.payload;

      // If cart has items from a different store, clear it first
      if (state.storeId && state.storeId !== storeId) {
        state.items = [];
      }
      state.storeId = storeId;

      const existing = state.items.find((i) => i.productId === product._id);
      if (existing) {
        if (existing.quantity < product.stock) {
          existing.quantity += 1;
        }
      } else {
        state.items.push({
          productId: product._id,
          productName: product.productName,
          price: product.price,
          discountType: product.discountType,
          discountValue: product.discountValue,
          quantity: 1,
          stock: product.stock,
          image: product.image,
        });
      }
    },
    incrementItem: (state, action) => {
      const item = state.items.find((i) => i.productId === action.payload);
      if (item && item.quantity < item.stock) item.quantity += 1;
    },
    decrementItem: (state, action) => {
      const item = state.items.find((i) => i.productId === action.payload);
      if (item) {
        item.quantity -= 1;
        if (item.quantity <= 0) {
          state.items = state.items.filter(
            (i) => i.productId !== action.payload,
          );
        }
      }
    },
    removeItem: (state, action) => {
      state.items = state.items.filter((i) => i.productId !== action.payload);
    },
    clearCart: (state) => {
      state.items = [];
      state.storeId = null;
    },
  },
});

export const {
  addToCart,
  incrementItem,
  decrementItem,
  removeItem,
  clearCart,
} = cartSlice.actions;
export default cartSlice.reducer;
