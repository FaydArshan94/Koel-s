import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { updateuserCart } from "../store/users/userSlice";
import { updateuser } from "../api/userApi";
import axios from "axios";
import { deleteProduct } from "../api/productsApi";
import { getAllUsers, updateUserCart } from "../store/users/userActions";
import axiosInstance from "../api/axios";

const ProductCard = ({ p }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const currentUser = useSelector((state) => state.user.currentUser);

  const addtoCart = async () => {
    try {
      const updatedCart = [...(currentUser.cart || [])];
      const existingIndex = updatedCart.findIndex((i) => i.productId === p.id);

      if (existingIndex !== -1) {
        updatedCart[existingIndex] = {
          ...updatedCart[existingIndex],
          qty: updatedCart[existingIndex].qty + 1,
        };
      } else {
        updatedCart.push({ productId: p.id, qty: 1 });
      }

      const updatedUser = { ...currentUser, cart: updatedCart };

      const response = await updateuser(currentUser.id, updatedUser);
      dispatch(updateuserCart(response)); // ✅ use local updated user
      console.log("Product added to cart!");
    } catch (error) {
      console.error("Cart update failed", error);
    }
  };

  const handleDelete = async () => {
    const confirm = window.confirm(
      "Are you sure you want to delete this product?"
    );
    if (!confirm) return;

    try {
      // 1. Delete the product from the database
      await deleteProduct(p.id);

      // 2. Get all users from db
      const usersRes = await getAllUsers();
      
      
      

      // 3. Loop through users and remove product from their cart
      const updatePromises = usersRes.map((user) => {
        const filteredCart = (user.cart || []).filter(
          (item) => item.productId !== p.id
        );

        // only update if cart changed
        if (filteredCart.length !== (user.cart || []).length) {
          return axiosInstance.patch(`/users/${user.id}`, { cart: filteredCart });

        }

        return Promise.resolve(); // no need to update
      });

      // 4. Wait for all updates
      await Promise.all(updatePromises);

      alert("Product deleted & removed from all carts ✅");
      window.location.reload(); // optional, to refresh product list
    } catch (err) {
      console.error("Delete failed", err);
      alert("Something went wrong");
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      <Link to={`/products/product-details/${p.id}`}>
        <img
          src={p.image}
          alt={p.title}
          className="w-full h-80 object-cover object-top"
        />
      </Link>

      <div className="p-4">
        <h2 className="text-lg font-semibold">{p.title}</h2>
        <p className="text-gray-600 mt-1">₹{p.price}</p>

        <div className="flex items-center  gap-4">
          <button
            type="button"
            // onClick={click}
            onClick={addtoCart}
            className="mt-3 bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition"
          >
            Add to Cart
          </button>

          {currentUser?.isAdmin && (
            <div className="flex items-center mt-3 gap-4">
              <button
                onClick={() => navigate(`/edit-product/${p.id}`)}
                className="   bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition"
              >
                ✏️ Edit
              </button>
              <button
                onClick={handleDelete}
                className="   bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition"
              >
                🗑 Delete
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default React.memo(ProductCard);

// // ProductCard.jsx
// import React from "react";
// const ProductCard = () => {
//   return (
//     <button
//       type="button"
//       onClick={() => alert("ProductCard Button!")}
//       style={{ padding: 20, fontSize: 20 }}
//     >
//       ProductCard Button
//     </button>
//   );
// };
// export default ProductCard;
