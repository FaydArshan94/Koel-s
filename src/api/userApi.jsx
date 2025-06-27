import axios from "./axios";

export const createuser = async (user) => {
  const response = await axios.post("/users", user);
  return response.data;
};


export const updateuser = async (id, updatedUser) => {
  const response = await axios.patch(`/users/${id}`, updatedUser);
  return response.data;
};
