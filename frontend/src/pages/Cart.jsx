import { useSelector, useDispatch } from "react-redux";
import { updateuser } from "../api/userApi";
import { updateUserCart } from "../store/users/userActions";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getAllProducts } from "../api/productsApi";
import axiosInstance from "../api/axios";

const Cart = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.user.currentUser);
  const products = useSelector((state) => state.product.products);
  // const [loading, setLoading] = useState(true);

  const cartItems = currentUser?.cart || [];

  // useEffect(() => {
  //   if (products.length) {
  //     setLoading(false);
  //   }
  // }, [products]);

  //   useEffect(() => {
  //   if (!products.length) {
  //     dispatch(getAllProducts()); // ensure fresh data
  //   }
  // }, []);

  const syncCartToBackend = async (updatedCart) => {
    const updatedUser = { ...currentUser, cart: updatedCart };
    try {
      await updateuser(currentUser.id, updatedUser);
      dispatch(updateUserCart(updatedUser)); // sync to redux + localStorage
    } catch (error) {
      console.error("Failed to sync cart:", error);
    }
  };

  const clearCartBtn = () => {
    syncCartToBackend([]);
  };

  const handleQtyChange = (productId, size, type) => {
    const updatedCart = cartItems.map((item) => ({ ...item })); // ✅ deep copy

    const index = updatedCart.findIndex(
      (item) => item.productId === productId && item.size === size
    );

    if (index !== -1) {
      if (type === "increase") {
        updatedCart[index].qty += 1;
      } else if (type === "decrease") {
        if (updatedCart[index].qty === 1) {
          updatedCart.splice(index, 1);
        } else {
          updatedCart[index].qty -= 1;
        }
      } else if (type === "remove") {
        updatedCart.splice(index, 1);
      }

      syncCartToBackend(updatedCart);
    }
  };

  



const handlePlaceOrder = async () => {
  const orderItems = cartItems.map(item => {
    const product = products.find(p => p.id === item.productId);
    return {
      productId: item.productId,
      title: product?.title,
      price: product?.price,
      qty: item.qty,
      size: item.size,
      image: product?.image
    };
  });

  const order = {
    userId: currentUser.id,
    items: orderItems,
    totalAmount: orderItems.reduce((sum, i) => sum + i.qty * i.price, 0),
    status: "Pending",
    date: new Date().toISOString()
  };

  try {
    await axiosInstance.post("/orders", order);
    await syncCartToBackend([]); // clear cart
    alert("Order placed successfully!");
  } catch (error) {
    console.error("Order placement failed", error);
  }
};




  return (
    <div className="p-6">
      <h1 className="text-4xl text-center mb-4">🛒 Cart</h1>
      {cartItems.length === 0 ? (
        <p className="text-center">No items in cart</p>
      ) : (
        <div className="p-6 max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold">🛒 Your Cart</h1>
            <button
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
              onClick={clearCartBtn}
            >
              Clear Cart
            </button>
          </div>

          {cartItems.map(({ productId, qty, size }) => {
            const product = products.find((p) => p.id === productId);
            if (!product) return null;

            return (
              <div
                key={`${productId}-${size}`}
                className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6 border rounded-lg p-4 shadow-sm hover:shadow-md transition"
              >
                <div className="flex items-center gap-4 w-full sm:w-2/3">
                  <Link to={`/products/product-details/${product.id}`}>
                    <img
                      src={product.image}
                      alt={product.title}
                      className="w-24 h-24 object-cover rounded-md border"
                    />
                  </Link>
                  <div>
                    <div className="flex items-center gap-2">
                      <Link to={`/products/product-details/${product.id}`}>
                        <h2 className="text-lg font-semibold">
                          {product.title}
                        </h2>
                      </Link>
                      <h2 className="text-sm text-gray-600">Size: {size}</h2>
                    </div>
                    <p className="text-gray-600 mt-1">₹{product.price}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() =>
                          handleQtyChange(product.id, size, "decrease")
                        }
                        className="px-2 bg-gray-300 rounded"
                      >
                        −
                      </button>
                      <span>{qty}</span>
                      <button
                        onClick={() =>
                          handleQtyChange(product.id, size, "increase")
                        }
                        className="px-2 bg-gray-300 rounded"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => handleQtyChange(product.id, size, "remove")}
                  className="text-red-600 font-medium hover:text-red-800 transition"
                >
                  ❌ Remove
                </button>
              </div>
            );
          })}

          {/* Totals */}
          <div className="w-full flex items-center justify-between  ">
            <button
              className=" bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              onClick={handlePlaceOrder}
            >
              Place Order
            </button>

            <div className="flex flex-col  sm:flex-row justify-end items-end gap-2 ">
              <div className="bg-gray-100 rounded px-4 py-2 text-lg font-medium text-gray-700 shadow">
                Total Items:{" "}
                <span className="font-bold text-black">
                  {cartItems.reduce((sum, item) => sum + item.qty, 0)}
                </span>
              </div>
              <div className="bg-green-100 rounded px-4 py-2 text-lg font-semibold text-green-800 shadow">
                Total: ₹
                <span className="font-bold">
                  {cartItems.reduce((sum, item) => {
                    const product = products.find(
                      (p) => p.id === item.productId
                    );
                    return sum + (product ? product.price * item.qty : 0);
                  }, 0)}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
