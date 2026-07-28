import { createSlice } from "@reduxjs/toolkit";

const loadCartFromStorage = () => {
  try {
    const saved = localStorage.getItem("cart");
    return saved ? JSON.parse(saved) : { storeId: null, items: [] };
  } catch {
    return { storeId: null, items: [] };
  }
};
const saveCartToStorage = (state) => {
  localStorage.setItem(
    "cart",
    JSON.stringify({ storeId: state.storeId, items: state.items }),
  );
};

const cartSlice = createSlice({
  name: "cart",
  initialState: loadCartFromStorage(),
  reducers: {
    addToCart: (state, action) => {
      const { storeId, product } = action.payload;

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
      saveCartToStorage(state);
    },
    incrementItem: (state, action) => {
      const item = state.items.find((i) => i.productId === action.payload);
      if (item && item.quantity < item.stock) item.quantity += 1;
      saveCartToStorage(state);
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
      saveCartToStorage(state);
    },
    removeItem: (state, action) => {
      state.items = state.items.filter((i) => i.productId !== action.payload);
      saveCartToStorage(state);
    },
    clearCart: (state) => {
      state.items = [];
      state.storeId = null;
      localStorage.removeItem("cart");
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
