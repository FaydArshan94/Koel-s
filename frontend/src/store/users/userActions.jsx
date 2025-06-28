import axios from "../../api/axios"; // Adjust the path if needed
import { clearCart, loginuser, logoutuser,updateuserCart } from "./userSlice";




export const createuser = (user) => async (dispatch, getState) => {
  const response = await axios.post("/users", user);
  return response.data;
};

export const loginUser = (data) => async (dispatch, getState) => {
  try {
    const response = await axios.get(
      `/users?email=${data.email}&password=${data.password}`
    );

    const user = response.data[0]; // JSON server returns array

    if (!user) {
      throw new Error("Invalid email or password");
    }

    dispatch(loginuser(user));
    return user; // useful for redirection
  } catch (error) {
    throw new Error("Invalid email or password");
  }
};

export const logoutUser = () => (dispatch) => {
  dispatch(logoutuser());
};

// Clear Cart from both backend and redux
export const clearUserCart = (userId) => async (dispatch, getState) => {
  try {
    const updatedUser = { ...getState().user.currentUser, cart: [] };
    const response = await axios.patch(`/users/${userId}`, { cart: [] });

    dispatch(clearCart()); // updates Redux + localStorage
    console.log("✅ Cart cleared in database and store");
  } catch (error) {
    console.error("❌ Failed to clear cart:", error);
  }
};



export const updateUserCart = (updatedUser) => async (dispatch) => {
  try {
    const res = await axios.patch(`/users/${updatedUser.id}`, updatedUser);
    dispatch(updateuserCart(res.data));
  } catch (err) {
    console.error("Failed to sync cart with backend", err);
  }
};

export const getAllUsers = async () => {
  try {
    const response = await axios.get("/users");
    return response.data; // returns array of users
  } catch (error) {
    console.error("Failed to fetch users:", error);
    return [];
  }
};
