import { createSlice } from "@reduxjs/toolkit";

// Initial state from localStorage
const loadCart = () => {
  try {
    const data = localStorage.getItem("cartItems");
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
};

const initialState = {
  items: loadCart(),
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const newItem = action.payload;
      const existingItem = state.items.find((item) => item.id === newItem.id);

      if (existingItem) {
        existingItem.quantity += 1; // 🔁 quantity ++
      } else {
        state.items.push({ ...newItem, quantity: 1 }); // ➕ first time
      }

      localStorage.setItem("cartItems", JSON.stringify(state.items)); // ✅ localStorage update
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter((item, i) => i !== action.payload);
      localStorage.setItem("cartItems", JSON.stringify(state.items)); // ✅ update here too
    },
    increaseQuantity: (state, action) => {

      const item = state.items.find((i) => i.id === action.payload);
      if (item) {
        item.quantity += 1;
        localStorage.setItem("cartItems", JSON.stringify(state.items)); // ✅ update here too
      }
    },
    decreaseQuantity: (state, action) => {
      
      const item = state.items.find((i) => i.id === action.payload);
      if (item) {
        if (item.quantity > 1) {
          item.quantity -= 1;
        } else {
          state.items = state.items.filter((i) => i.id !== action.payload);
        }
        localStorage.setItem("cartItems", JSON.stringify(state.items)); // ✅ update here too
      }
    },
    clearCart: (state,action) =>{
      state.items = []
      localStorage.setItem("cartItems", JSON.stringify([]));
    }
  },
});

export const {
  addToCart,
  removeFromCart,
  clearCart,
  increaseQuantity,
  decreaseQuantity,
} = cartSlice.actions;

export default cartSlice.reducer;
