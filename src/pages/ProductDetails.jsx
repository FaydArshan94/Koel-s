import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getSingleProduct } from "../api/productsApi";
// import { fetchAndAddToCart } from "../store/features/CartActions";

// const dummyProduct = {
//   id: 1,
//   title: "Classic White T-Shirt",
//   description:
//     "A timeless classic. This white t-shirt is made from 100% organic cotton and fits perfectly for any occasion.",
//   price: 499,
//   image:
//     "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=400&q=80",
//   rating: 4.5,
//   reviews: 23,
//   sizes: ["S", "M", "L", "XL"],
//   inStock: true,
// };

const ProductDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const [product, setProduct] = useState(null);

  useEffect(() => {
    getSingleProduct
    (id)
      .then((data) => setProduct(data))
      .catch((err) => console.error("Product fetch error:", err));
  }, [id]);

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
              <h1 className="text-3xl font-extrabold mb-3 text-gray-900">{product.title}</h1>
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
                    className="inline-block border border-gray-300 px-3 py-1 rounded-full mx-1 text-sm font-medium bg-gray-100 hover:bg-black hover:text-white transition-colors cursor-pointer"
                  >
                    {size}
                  </span>
                ))}
              </div>
            </div>
            <button
            type="button"
                // onClick={()=> dispatch(fetchAndAddToCart(product.id))}
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
