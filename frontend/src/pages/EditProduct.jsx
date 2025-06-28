import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useParams, useNavigate } from "react-router-dom";
import axios from "../api/axios";
import { useDispatch } from "react-redux";
import { getAllProducts, updateUsersWithEditedProduct } from "../api/productsApi";
import { setProducts } from "../store/product/productSlice";

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { register, handleSubmit, reset, setValue } = useForm();
  const dispatch = useDispatch();
  useEffect(() => {
    axios.get(`/products/${id}`).then((res) => {
      const product = res.data;
      setValue("title", product.title);
      setValue("price", product.price);
      setValue("image", product.image);
      setValue("size", product.size.join(", "));
    });
  }, [id, setValue]);

  const onsubmit = async (data) => {
    const updatedProduct = {
      ...data,
      id, // include product ID
      size: data.size.split(",").map((s) => s.trim()), // normalize sizes
    };

    try {
      await axios.patch(`/products/${id}`, updatedProduct); // update the product itself
      await updateUsersWithEditedProduct(updatedProduct); // sync user carts

      const products = await getAllProducts(); // ✅ Call API directly
      dispatch(setProducts(products)); // ✅ Update Redux manually

      navigate("/products"); // go back after success
    } catch (error) {
      console.error("Edit failed", error);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 bg-white shadow-lg p-8 rounded-lg">
      <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
        ✏️ Edit Product
      </h2>

      <form onSubmit={handleSubmit(onsubmit)} className="space-y-4">
        <input
          {...register("title")}
          className="w-full px-3 py-2 border rounded"
          placeholder="Title"
        />
        <input
          type="number"
          {...register("price")}
          className="w-full px-3 py-2 border rounded"
          placeholder="Price"
        />
        <input
          {...register("image")}
          className="w-full px-3 py-2 border rounded"
          placeholder="Image URL"
        />
        <input
          {...register("size")}
          className="w-full px-3 py-2 border rounded"
          placeholder="Sizes (comma separated)"
        />

        <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
          Update Product
        </button>
      </form>
    </div>
  );
};

export default EditProduct;
