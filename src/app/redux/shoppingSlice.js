import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  productData: [],
  userInfo: null,
  orderData: [],
};

export const shoppingSlice = createSlice({
  name: "shopping",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const existingProduct = state.productData.find((prod) => {
        return prod._id === action.payload._id;
      });
      if (existingProduct) {
        existingProduct.quantity += action.payload.quantity;
      } else {
        state.productData.push(action.payload);
      }
    },
    removeFromCart: (state, action) => {
      state.productData = state.productData.filter(
        (prod) => prod._id !== action.payload._id
      );
    },
    increaseQuanByOne: (state, action) => {
      const existingProduct = state.productData.find(
        (prod) => prod._id === action.payload._id
      );
      existingProduct && existingProduct.quantity++;
    },
    decreaseQuanByOne: (state, action) => {
      const existingProduct = state.productData.find(
        (prod) => prod._id === action.payload._id
      );
      if (existingProduct?.quantity === 1) {
        existingProduct.quantity = 1;
      } else {
        existingProduct && existingProduct.quantity--;
      }
    },
    resetCart: (state) => {
      state.productData = [];
    },
    saveToOrder: (state, action) => {
      state.orderData = action.payload;
    },
    resetOrder: (state) => {
      state.orderData = [];
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  increaseQuanByOne,
  decreaseQuanByOne,
  resetCart,
  saveToOrder,
  resetOrder,
} = shoppingSlice.actions;

export default shoppingSlice.reducer;
