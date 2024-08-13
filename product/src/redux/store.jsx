import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";
import favouritesReducer from "./favouritesSlice";

const store = configureStore({
  reducer: {
    cart: cartReducer,
    favorites: favouritesReducer,
  },
});

export default store;
