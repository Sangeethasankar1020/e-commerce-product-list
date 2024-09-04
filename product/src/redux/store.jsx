import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";
import favouritesReducer from "./favouritesSlice";
import productReducer from "./productSlice";
import checkOutReducer from "./checkoutSlice";

const store = configureStore({
  reducer: {
    cart: cartReducer,
    favorites: favouritesReducer,
    products: productReducer,
    checkOutProducts: checkOutReducer,
  },
});

export default store;
