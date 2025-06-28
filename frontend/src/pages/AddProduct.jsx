import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "../api/axios";
import { useNavigate } from "react-router-dom";

const AddProduct = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const [preview, setPreview] = useState("");
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    const sizes = data.size.split(",").map((s) => s.trim());
    const newProduct = { ...data, size: sizes };

    try {
      await axios.post("/products", newProduct);
      alert("✅ Product added successfully!");
      reset();
      setPreview("");
      navigate("/products");
    } catch (error) {
      console.error("❌ Failed to add product", error);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 bg-white shadow-lg p-8 rounded-lg">
      <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">➕ Add New Product</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Title */}
        <div>
          <label className="block font-medium mb-1">Product Title</label>
          <input
            {...register("title", { required: "Title is required" })}
            placeholder="e.g. Black Hoodie"
            className="w-full px-4 py-2 border rounded outline-none focus:ring focus:ring-blue-300"
          />
          {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>}
        </div>

        {/* Price */}
        <div>
          <label className="block font-medium mb-1">Price (₹)</label>
          <input
            type="number"
            {...register("price", { required: "Price is required" })}
            placeholder="e.g. 499"
            className="w-full px-4 py-2 border rounded outline-none focus:ring focus:ring-blue-300"
          />
          {errors.price && <p className="text-red-500 text-sm mt-1">{errors.price.message}</p>}
        </div>

        {/* Image URL */}
        <div>
          <label className="block font-medium mb-1">Image URL</label>
          <input
            {...register("image", { required: "Image URL is required" })}
            placeholder="Paste image URL here"
            onChange={(e) => setPreview(e.target.value)}
            className="w-full px-4 py-2 border rounded outline-none focus:ring focus:ring-blue-300"
          />
          {preview && (
            <img
              src={preview}
              alt="Preview"
              className="mt-3 w-40 h-40 object-cover border rounded"
            />
          )}
          {errors.image && <p className="text-red-500 text-sm mt-1">{errors.image.message}</p>}
        </div>

        {/* Sizes */}
        <div>
          <label className="block font-medium mb-1">Sizes (comma-separated)</label>
          <input
            {...register("size", { required: "Size is required" })}
            placeholder="e.g. S, M, L, XL"
            className="w-full px-4 py-2 border rounded outline-none focus:ring focus:ring-blue-300"
          />
          {errors.size && <p className="text-red-500 text-sm mt-1">{errors.size.message}</p>}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Add Product
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
