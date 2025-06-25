import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import { getAllProducts } from "../api/productsApi"; // 🟢 API call

const Products = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getAllProducts()
      .then((data) => setProducts(data))
      .catch((err) => console.error("Error fetching products:", err));

      
  }, []);

  return (
    <section className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          id={product.id} // 👈 for fetchAndAddToCart
          title={product.title}
          price={product.price}
          image={product.image}
        />
      ))}
    </section>
  );
};

export default Products;
