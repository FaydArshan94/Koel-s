import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getSingleProduct } from "../api/productsApi";
import { updateuserCart } from "../store/users/userSlice";
import { updateuser } from "../api/userApi";

const ProductDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.user.currentUser);
  const [selectedSize, setSelectedSize] = useState("");
  const [product, setProduct] = useState(null);

  useEffect(() => {
    getSingleProduct(id)
      .then((data) => setProduct(data))
      .catch((err) => console.error("Product fetch error:", err));
  }, [id]);

  const addtoCart = async () => {
    if (!selectedSize) {
      alert("Please select a size");
      return;
    }

    try {
      const updatedCart = [...(currentUser.cart || [])];
      const existingIndex = updatedCart.findIndex(
       (i) => i.productId === product.id && i.size === selectedSize
      );

      if (existingIndex !== -1) {
        updatedCart[existingIndex] = {
          ...updatedCart[existingIndex],
          qty: updatedCart[existingIndex].qty + 1,
        };
      } else {
        updatedCart.push({ productId: product.id, size :selectedSize, qty: 1 });
      }

      const updatedUser = { ...currentUser, cart: updatedCart };

      const response = await updateuser(currentUser.id, updatedUser);
      dispatch(updateuserCart(response)); // ✅ use local updated user
      console.log("Product added to cart!");
    } catch (error) {
      console.error("Cart update failed", error);
    }
  };

  return (
    <div className="min-h-screen py-10">
      {product && (
        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl flex flex-col md:flex-row overflow-hidden">
          <img
            src={product.image}
            alt={product.title}
            className="w-full md:w-1/2 object-cover h-96 md:h-auto"
          />
          <div className="flex-1 p-8 flex flex-col justify-between">
            <div>
              <h1 className="text-3xl font-extrabold mb-3 text-gray-900">
                {product.title}
              </h1>
              <p className="text-gray-600 mb-6">{product.description}</p>
              <div className="flex items-center gap-2 mb-4">
                <span className="text-yellow-400 text-2xl">★</span>
                <span className="font-semibold text-lg">{product.rating}</span>
                <span className="text-gray-400 text-base">
                  ({product.reviews} reviews)
                </span>
              </div>
              <div className="mb-6">
                <span className="text-2xl font-bold text-green-700">
                  ₹{product.price}
                </span>
              </div>
              <div className="mb-6">
                <span className="font-semibold mr-2">Sizes:</span>
                {product.size.map((size) => (
                  <span
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`inline-block border border-gray-300 px-3 py-1 rounded-full mx-1 text-sm font-medium cursor-pointer transition-colors
                      ${selectedSize === size
                        ? "bg-black text-white border-black scale-110 shadow"
                        : "bg-gray-100 hover:bg-black hover:text-white"}
                    `}
                    style={{ transition: "all 0.2s" }}
                  >
                    {size}
                  </span>
                ))}
              </div>
            </div>
            <button
              type="button"
              onClick={addtoCart}
              className="mt-6 bg-gradient-to-r from-black to-gray-800 text-white px-8 py-3 rounded-lg shadow hover:from-gray-900 hover:to-black transition font-semibold text-lg"
            >
              Add to Cart
            </button>

            
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
