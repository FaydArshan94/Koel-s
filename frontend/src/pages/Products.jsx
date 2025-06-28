import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import { setProducts } from "../store/product/productSlice";
import { getAllProducts } from "../api/productsApi"; // 🟢 API call
import { useDispatch, useSelector } from "react-redux";

const Products = () => {
  const dispatch = useDispatch();
  const [search, setSearch] = useState(""); // ✅ search state
  const [filtered, setFiltered] = useState([]);

  useEffect(() => {
    getAllProducts()
      .then((data) => {
        setProducts(data);
        setFiltered(data); // set initial filtered list
      })
      .catch((err) => console.error("Error fetching products:", err));
  }, []);

  const products = useSelector((state) => state.product.products);

  useEffect(() => {
    const lower = search.toLowerCase();
    const result = products.filter((p) =>
      p.title.toLowerCase().includes(lower)
    );
    setFiltered(result);
  }, [search, products]);

  return (
    <div className="p-6">
      {/* 🔍 Search Input */}
      <div className="mb-6 max-w-md mx-auto">
        <p className="text-sm text-gray-400">
          Showing {filtered.length} of {products.length} products
        </p>
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full border px-4 py-2 rounded shadow-sm focus:outline-none focus:ring focus:ring-blue-300"
        />
      </div>

      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filtered.length === 0 ? (
          <p className="text-gray-500 col-span-full text-center">
            No products found.
          </p>
        ) : (
          filtered.map((product) => (
            <ProductCard key={`${product.id}`} p={product} />
          ))
        )}
      </section>
    </div>
  );
};

export default Products;
