import { createSlice } from "@reduxjs/toolkit";

// load initial state from local storage

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
  orderItems: loadInitialState(), //load from local storage
  status: "idle", // or pending , succeded failed
  error: null,
};

const checkoutSlice = createSlice({
  name: "checkout",
  initialState,
  reducers: {
    setUserInfo(state, action) {
      state.userInfo = { ...state.userInfo, ...action.payload };
    },
    addOrderItem(state, action) {
      state.orderItems.push(action.payload);
      localStorage.setItem(
        "checkOutProducts",
        JSON.stringify(state.orderItems)
      ); //save to local storage
    },
    removeOrderItem(state, action) {
      state.orderItems = state.orderItems.filter(
        (item) => item.id !== action.payload
      );
      localStorage.setItem(
        "checkOutProducts",
        JSON.stringify(state.orderItems)
      );
    },
    clearOrderItems(state) {
      state.orderItems = [];
      localStorage.removeItem("checkOutProducts"); //clear from local storage
    },
    setStatus(state, action) {
      state.status = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
    },
  },
});

export const {
  setUserInfo,
  addOrderItem,
  removeOrderItem,
  clearOrderItems,
  setStatus,
  setError,
} = checkoutSlice.actions;

export default checkoutSlice.reducer;
