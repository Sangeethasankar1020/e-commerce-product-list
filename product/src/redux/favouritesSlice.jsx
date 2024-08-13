import { createSlice } from "@reduxjs/toolkit";

const favouritesSlice = createSlice({
  name: "favorites",
  initialState: {
    items: [],
  },
  reducers: {
    addToFavorites: (state, action) => {
      const item = action.payload;
      console.log("checking");
      if (!state.items.find((i) => i.id === item.id)) {
        state.items.push(item);
      }
      const data = JSON.stringify(state.items);
      console.log(JSON.parse(data));
    },
    removeFromFavorites: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
  },
});

export const { addToFavorites, removeFromFavorites } = favouritesSlice.actions;
export default favouritesSlice.reducer;
