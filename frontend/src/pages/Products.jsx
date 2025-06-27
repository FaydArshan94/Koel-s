import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import { setProducts } from "../store/product/productSlice";
import { getAllProducts } from "../api/productsApi"; // 🟢 API call
import { useDispatch, useSelector } from "react-redux";

const Products = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    getAllProducts().then((data) => dispatch(setProducts(data)));
  }, []);
  const products = useSelector((state) => state.product.products);


  return (
    <section className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {products.map((product) => (
        <ProductCard
        key={product.id}
         p={product}
        />
      ))}
    </section>
  );
};

export default Products;
