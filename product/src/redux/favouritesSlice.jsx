import { createSlice } from "@reduxjs/toolkit";

const favouritesSlice = createSlice({
  name: "favorites",
  initialState: {
    // to resolve refresh item empty
    items: JSON.parse(localStorage.getItem("favoriteItems")) || [],
  },
  reducers: {
    addToFavorites: (state, action) => {
      const item = action.payload;
      const existingItem = state.items.find((i) => i.id === item.id);
      if (existingItem) {
        // if item exits , remove it
        state.items = state.items.filter((i) => i.id !== item.id);
      } else {
        // otherwise add it
        state.items.push(item);
      }
      // const data = JSON.stringify(state.items);
      // console.log(JSON.parse(data));
      localStorage.setItem("favoriteItems", JSON.stringify(state.items));
    },
    removeFromFavorites: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
      localStorage.setItem("favoriteItems", JSON.stringify(state.items));
    },
  },
});

export const { addToFavorites, removeFromFavorites } = favouritesSlice.actions;
export default favouritesSlice.reducer;
