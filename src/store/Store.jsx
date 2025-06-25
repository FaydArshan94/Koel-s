import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./features/CartSlice";

// ✅ yeh hai default export
const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
});

export default store;
