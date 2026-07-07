import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  categories: [
    {
      id: 1,
      name: "Fruits & Vegetables",
      products: [],
    },
    {
      id: 2,
      name: "Dairy,Bread & Eggs",
      products: [],
    },
    {
      id: 3,
      name: "Snacks & Biscuits",
      products: [],
    },
    {
      id: 4,
      name: "Atta, Dal & Rice",
      products: [],
    },
    {
      id: 5,
      name: "Dry Fruits & Masala",
      products: [],
    },
    {
      id: 6,
      name: "Tea,Coffee & More",
      products: [],
    },
    {
      id: 7,
      name: "Chocolate & Desserts",
      products: [],
    },
  ],
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    addProduct: (state, action) => {
      const { categoryId, product } = action.payload;

      const category = state.categories.find((cat) => cat.id === categoryId);
      if (category) {
        category.products.push({
          id: Date.now(),
          ...product,
        });
      }
    },
    editPrice(state, action) {
      const { categoryId, productId, newPrice } = action.payload;
      const category = state.categories.find((c) => c.id === categoryId);
      if (!category) return;
      const product = category.products.find((p) => p.id === productId);
      if (product) {
        product.price = Number(newPrice);
      }
    },
    addStock(state, action) {
      const { categoryId, productId, quantity } = action.payload;
      const category = state.categories.find((c) => c.id === categoryId);
      if (!category) return;

      const product = category.products.find((p) => p.id === productId);
      if (product) {
        product.quantity = Number(product.quantity) + Number(quantity);
      }
    },
    deleteProduct(state, action) {
      const { categoryId, productId } = action.payload;

      const category = state.categories.find((cat) => cat.id === categoryId);

      if (category) {
        category.products = category.products.filter(
          (product) => product.id !== productId,
        );
      }
    },

    minusStock(state, action) {
      const { categoryId, productId, quantity } = action.payload;

      const category = state.categories.find((c) => c.id === categoryId);
      if (!category) return;
      const product = category.products.find((p) => p.id === productId);
      if (product) {
        product.quantity = Math.max(
          0,
          Number(product.quantity) - Number(quantity),
        );
      }
    },

    updateProduct: (state, action) => {
      const { categoryId, productId, updateProduct } = action.payload;
      const category = state.categories.find((cat) => cat.id === categoryId);

      if (category) {
        const index = category.products.findIndex(
          (product) => product.id === productId,
        );

        if (index !== -1) {
          category.products[index] = {
            ...category.products[index],
            ...updateProduct,
          };
        }
      }
    },
  },
});

export const {
  addProduct,
  deleteProduct,
  updateProduct,
  editPrice,
  minusStock,
  addStock,
} = productSlice.actions;

export default productSlice.reducer;
