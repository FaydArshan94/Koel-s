import axios from "../../api/axios"; // Adjust the path if needed
import { loginuser, logoutuser } from "./userSlice";


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
