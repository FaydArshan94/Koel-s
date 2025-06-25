import { useSelector, useDispatch } from "react-redux";
import { removeItemFromCart } from "../store/features/CartActions";
import { clearCart, decreaseQuantity, increaseQuantity } from "../store/features/cartSlice";

const Cart = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  return (
    <div className="p-6">
      <h1 className="text-4xl text-center mb-4">🛒 Cart</h1>
      {cartItems.length === 0 ? (
        <p>No items in cart</p>
      ) : (
        <div className="p-6 max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl  font-bold">🛒 Your Cart</h1>
            <button
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
              onClick={()=> dispatch(clearCart())} // Functionality not implemented yet
              disabled={cartItems.length === 0}
            >
              Clear Cart
            </button>
          </div>

          {cartItems.length === 0 ? (
            <p className="text-gray-500">Your cart is empty.</p>
          ) : (
            <>
              {cartItems.map((item, index) => (
                <div
                  key={index}
                  className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6 border rounded-lg p-4 shadow-sm hover:shadow-md transition"
                >
                  <div className="flex items-center gap-4 w-full sm:w-2/3">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-24 h-24 object-cover rounded-md border"
                    />
                    <div>
                      <h2 className="text-lg font-semibold">{item.title}</h2>
                      <p className="text-gray-600 mt-1">₹{item.price}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <button
                          onClick={() => dispatch(decreaseQuantity(item.id))}
                          className="px-2 bg-gray-300 rounded"
                        >
                          −
                        </button>
                        <span>{item.quantity}</span>
                        <button
                          onClick={() => dispatch(increaseQuantity(item.id))}
                          className="px-2 bg-gray-300 rounded"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => dispatch(removeItemFromCart(index))}
                    className="text-red-600 font-medium hover:text-red-800 transition"
                  >
                    ❌ Remove
                  </button>
                </div>
              ))}
              {cartItems.length > 0 && (
                <div className="flex flex-col sm:flex-row justify-end items-end gap-2 mt-8">
                  <div className="bg-gray-100 rounded px-4 py-2 text-lg font-medium text-gray-700 shadow">
                    Total Items:{" "}
                    <span className="font-bold text-black">
                      {cartItems.reduce((sum, item) => sum + item.quantity, 0)}
                    </span>
                  </div>
                  <div className="bg-green-100 rounded px-4 py-2 text-lg font-semibold text-green-800 shadow">
                    Total: ₹
                    <span className="font-bold">
                      {cartItems.reduce(
                        (sum, item) => sum + item.price * item.quantity,
                        0
                      )}
                    </span>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default Cart;
