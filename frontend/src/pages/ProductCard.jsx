import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { updateuserCart } from "../store/users/userSlice";
import { updateuser } from "../api/userApi";



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

  // const click = ()=>{
  //   console.log("gg")
  // }

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      {/* <Link to={`/products/product-details/${id}`}> */}
      <img
        src={p.image}
        alt={p.title}
        className="w-full h-80 object-cover object-top"
      />
      {/* </Link> */}

      <div className="p-4">
        <h2 className="text-lg font-semibold">{p.title}</h2>
        <p className="text-gray-600 mt-1">₹{p.price}</p>
        <button
          type="button"
          // onClick={click}
          onClick={addtoCart}
          className="mt-3 bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition"
        >
          Add to Cart
        </button>
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
