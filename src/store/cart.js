import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: { items: [] },
  reducers: {
    addItem(state, action) {
      const existingCartItemIndex = state.items.findIndex(
        (item) => item.id === action.payload.id
      );
      if (existingCartItemIndex > -1) {
        const existingItem = state.items[existingCartItemIndex];
        state.items[existingCartItemIndex] = {
          ...existingItem,
          quantity: existingItem.quantity + 1,
        };
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
    },
    removeItem(state, action) {
      const existingCartItemIndex = state.items.findIndex(
        (item) => item.id === action.payload
      );
      const existingItem = state.items[existingCartItemIndex];
      if (existingItem.quantity === 1) {
        state.items.splice(existingCartItemIndex, 1);
      } else {
        state.items[existingCartItemIndex] = {
          ...existingItem,
          quantity: existingItem.quantity - 1,
        };
      }
    },
    clearCart(state) {
      state.items = [];
    },
  },
});

export default cartSlice.reducer;
export const cartActions = cartSlice.actions;
