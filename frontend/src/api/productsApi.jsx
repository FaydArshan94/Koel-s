import axios from "./axios";

export const getAllProducts = async () => {
  const response = await axios.get("/products");
  return response.data;
};

export const getSingleProduct = async (id) => {
  const response = await axios.get(`/products/${id}`);
  return response.data;
};

export const addProduct = async (product) => {
  const response = await axios.post("/products", product);
  return response.data;
};

export const deleteProduct = async (id) => {
  const response = await axios.delete(`/products/${id}`);
  return response.data;
};



 export const updateUsersWithEditedProduct = async (editedProduct) => {
    try {
      const res = await axios.get("/users");
      const users = res.data;

      const updatePromises = users.map((user) => {
        const updatedCart = (user.cart || []).map((item) => {
          if (item.productId === editedProduct.id) {
            return {
              ...item,
              // 🟡 Only update these fields
              title: editedProduct.title,
              price: editedProduct.price,
              image: editedProduct.image,
            };
          }
          return item;
        });

        // only update if cart changed
        const cartChanged =
          JSON.stringify(user.cart) !== JSON.stringify(updatedCart);

        if (cartChanged) {
          return axios.patch(`/users/${user.id}`, { cart: updatedCart });
        }

        return Promise.resolve();
      });

      await Promise.all(updatePromises);
      console.log("All user carts updated with edited product ✅");
    } catch (err) {
      console.error("Failed to sync edited product to carts", err);
    }
  };