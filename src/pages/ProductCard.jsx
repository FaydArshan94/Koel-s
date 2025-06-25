import React from "react";
import { useDispatch } from "react-redux";
import { fetchAndAddToCart } from "../store/features/CartActions";
import { Link, useParams } from "react-router-dom";

const ProductCard = ({ id, title, price, image }) => {

  const dispatch = useDispatch();
  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      <Link to={`/products/product-details/${id}`} >
        <img
          src={image}
          alt={title}
          className="w-full h-80 object-cover object-top"
        />
      </Link>
      <div className="p-4">
        <h2 className="text-lg font-semibold">{title}</h2>
        <p className="text-gray-600 mt-1">₹{price}</p>
        <button
          onClick={() => dispatch(fetchAndAddToCart(id))}
          className="mt-3 bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
