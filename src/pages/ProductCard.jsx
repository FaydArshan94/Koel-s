import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { updateuserCart } from "../store/users/userSlice";
import { updateuser } from "../api/userApi";

const ProductCard = ({ id, title, price, image }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const currentUser = useSelector((state) => state.user.currentUser);
  useEffect(() => {
    window.addEventListener("beforeunload", () => {
      console.log("🔥 FULL PAGE RELOAD triggered");
    });
  }, []);
  const addtoCart = async () => {
    console.log("clicked Add to Cart");
    try {
      const updatedCart = [...(currentUser.cart || [])];
      const existingIndex = updatedCart.findIndex((i) => i.productId === id);

      if (existingIndex !== -1) {
        updatedCart[existingIndex] = {
          ...updatedCart[existingIndex],
          qty: updatedCart[existingIndex].qty + 1,
        };
      } else {
        updatedCart.push({ productId: id, qty: 1 });
      }

      const updatedUser = { ...currentUser, cart: updatedCart };

      await updateuser(updatedUser.id, updatedUser); // ✅ just update the server
      dispatch(updateuserCart(updatedUser)); // ✅ use local updated user
      console.log("Product added to cart!");
    } catch (error) {
      console.error("Cart update failed", error);
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      {/* <Link to={`/products/product-details/${id}`}> */}
      <img
        src={image}
        alt={title}
        className="w-full h-80 object-cover object-top"
      />
      {/* </Link> */}

      <div className="p-4">
        <h2 className="text-lg font-semibold">{title}</h2>
        <p className="text-gray-600 mt-1">₹{price}</p>
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault(); // this stops any default event like form submission
            e.stopPropagation(); // stops bubbling up to parent
            addtoCart(); // your actual function
          }}
          className="mt-3 bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default React.memo(ProductCard);
