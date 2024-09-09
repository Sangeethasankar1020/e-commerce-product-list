// stockSlice.js
import { createSlice } from "@reduxjs/toolkit";

const stockSlice = createSlice({
  name: "stock",
  initialState: {},
  reducers: {
    setStock: (state, action) => {
      const { productId, stock } = action.payload;
      state[productId] = { stock, count: 0 };
    },
    increaseStock: (state, action) => {
      const { productId, quantity } = action.payload;
      if (state[productId]) {
        state[productId].count += quantity;
      }
    },
    decreaseStock: (state, action) => {
      const { productId, quantity } = action.payload;
      if (state[productId] && state[productId].count > 0) {
        state[productId].count = Math.max(state[productId].count - quantity, 0);
      }
    },
  },
});

export const { setStock, increaseStock, decreaseStock } = stockSlice.actions;
export default stockSlice.reducer;
