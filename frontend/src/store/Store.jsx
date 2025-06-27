import { configureStore } from "@reduxjs/toolkit";
// import cartReducer from "./features/cartSlice";
import userReducer from "./users/userSlice";
import productReducer from "./product/productSlice";

// ✅ yeh hai default export
const store = configureStore({
  reducer: {
    product: productReducer,

    user: userReducer,
  },
});

export default store;
