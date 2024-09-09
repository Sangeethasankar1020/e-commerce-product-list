import { createSlice } from "@reduxjs/toolkit";

// Load initial state from local storage
const loadInitialState = () => {
  const savedOrderItems = localStorage.getItem("checkOutProducts");
  return savedOrderItems ? JSON.parse(savedOrderItems) : [];
};

const initialState = {
  userInfo: {
    name: "",
    address: "",
    paymentMethod: "",
    cardDetails: "",
  },
  orderItems: loadInitialState(),
  status: "idle",
  error: null,
};

const checkoutSlice = createSlice({
  name: "checkOutProducts",
  initialState: {
    orderItems: [],
  },
  reducers: {
    addOrderItem(state, action) {
      const item = action.payload;
      const existingItem = state.items.find((i) => i.id === item.id);

      if (existingItem) {
        existingItem.quantity += item.quantity;
      } else {
        state.items.push({ ...item, quantity: item.quantity });
      }
    },
    increaseQuantity(state, action) {
      const { id, quantity } = action.payload;
      const item = state.items.find((i) => i.id === id);
      if (item) {
        item.quantity += quantity;
      }
    },
    decreaseQuantity(state, action) {
      const { id, quantity } = action.payload;
      const item = state.items.find((i) => i.id === id);
      if (item) {
        item.quantity = Math.max(item.quantity - quantity, 0);
      }
    },
    removeOrderItem(state, action) {
      state.orderItems = state.orderItems.filter(
        (item) => item.id !== action.payload
      );
    },
    updateOrderItemQuantity(state, action) {
      const { id, quantity } = action.payload;
      const item = state.orderItems.find((item) => item.id === id);
      if (item) {
        item.quantity = quantity;
      }
    },
    clearOrderItems(state) {
      state.orderItems = [];
    },
  },
});

export const {
  addOrderItem,
  removeOrderItem,
  updateOrderItemQuantity,
  clearOrderItems,
  increaseQuantity,
  decreaseQuantity,
} = checkoutSlice.actions;

export default checkoutSlice.reducer;
