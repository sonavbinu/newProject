import { createSlice } from "@reduxjs/toolkit";
import initialProducts from "../../Pages/Dashboard/MyProducts/InitialProducts";

const initialState = {
  categories: [
    {
      id: 1,
      name: "fruitsVegetables",
      products: initialProducts[0].products,
    },
    {
      id: 2,
      name: "dairyBreadEggs",
      products: [],
    },
    {
      id: 3,
      name: "snacksBiscuits",
      products: [],
    },
    {
      id: 4,
      name: "attaDalRice",
      products: [],
    },
    {
      id: 5,
      name: "dryFruitsMasala",
      products: [],
    },
    {
      id: 6,
      name: "teaCoffee",
      products: [],
    },
    {
      id: 7,
      name: "chocolatesDesserts",
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
        product.stock = Number(product.stock) + Number(quantity);
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
        product.stock = Math.max(0, Number(product.stock) - Number(quantity));
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
