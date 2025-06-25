import { addToCart, removeFromCart } from "./cartSlice";
import { getSingleProduct } from "../../api/productsApi";

export const fetchAndAddToCart = (id) => async (dispatch) => {
  try {
    const product = await getSingleProduct(id);
    dispatch(addToCart(product));
  } catch (error) {
    console.error("Failed to add product to cart:", error);
  }
};

export const removeItemFromCart = (index) => (dispatch, getState) => {
  dispatch(removeFromCart(index));

  // Update localStorage manually after Redux update
  const updatedCart = getState().cart.items;
  console.log("Updated Cart:", updatedCart);

  localStorage.setItem("cartItems", JSON.stringify(updatedCart));
};
