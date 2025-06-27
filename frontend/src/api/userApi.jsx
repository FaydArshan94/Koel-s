import axios from "./axios";



export const updateuser = async (id, updatedUser) => {
  const response = await axios.patch(`/users/${id}`, updatedUser);
  return response.data;
};
