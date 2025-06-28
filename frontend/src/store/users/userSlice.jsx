import { createSlice } from "@reduxjs/toolkit";

// Initial state from localStorage
const loadUsers = () => {
  try {
    const data = localStorage.getItem("users");
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
};

const initialState = {
  users: loadUsers(), // users array
  currentUser: JSON.parse(localStorage.getItem("currentUser")) || null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // registeruser: (state, action) => {
    //   state.users.push(action.payload);
    // },
    loginuser: (state, action) => {
      state.currentUser = action.payload;
      localStorage.setItem("currentUser", JSON.stringify(action.payload));
    },
    logoutuser: (state, action) => {
      state.currentUser = null;
      localStorage.removeItem("currentUser");
    },
    updateuserCart: (state, action) => {
      const updatedUser = action.payload;
      state.currentUser = updatedUser; // ✅ this was missing
      localStorage.setItem("currentUser", JSON.stringify(updatedUser));
    },
    clearCart: (state) => {
      if (state.currentUser) {
        const updatedUser = { ...state.currentUser, cart: [] };
        state.currentUser = updatedUser;
        localStorage.setItem("currentUser", JSON.stringify(updatedUser));
      }
    },
  },
});

export const { loginuser, logoutuser, updateuserCart, clearCart } =
  userSlice.actions;

export default userSlice.reducer;
