import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "../api/axios";
import { Link } from "react-router-dom";

const Orders = () => {
  const currentUser = useSelector((state) => state.user.currentUser);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get(`/orders?userId=${currentUser.id}`);
        setOrders(res.data.sort((a, b) => new Date(b.date) - new Date(a.date)));
      } catch {
        setOrders([]);
      }
    };

    if (currentUser) fetchOrders();
  }, [currentUser]);

  const formatDate = (date) =>
    new Date(date).toLocaleDateString("en-IN", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

  // Cancel the whole order
  const handleCancelOrder = async (orderId) => {
    try {
      // Update order status and all items' status to "Cancelled"
      const res = await axios.patch(`/orders/${orderId}`, {
        status: "Cancelled",
        cancelledAt: new Date().toISOString(),
        items: (orders.find((o) => o.id === orderId)?.items || []).map(item => ({
          ...item,
          status: "Cancelled"
        }))
      });
      setOrders((prev) =>
        prev.map((o) =>
          o.id === orderId
            ? { ...o, status: "Cancelled", cancelledAt: new Date().toISOString(), items: o.items.map(item => ({ ...item, status: "Cancelled" })) }
            : o
        )
      );
    } catch (error) {
      console.error("Failed to cancel order", error);
    }
  };

  // Calculate total price for an order
  const getOrderTotal = (order) =>
    order.items.reduce((sum, item) => sum + (item.price || 0), 0);

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6">
      <h1 className="text-2xl font-bold mb-6 text-center">📦 My Orders</h1>

      {orders.length === 0 ? (
        <p className="text-center text-gray-500">No orders found.</p>
      ) : (
        <div className="space-y-6 flex flex-col">
          {orders.map((order) => (
            <div key={order.id} className="rounded-md p-4 shadow-sm border">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                <div>
                  <span className="font-semibold">Order #{order.id}</span>
                  <span className="ml-4 text-gray-500 text-sm">
                    {formatDate(order.date)}
                  </span>
                </div>
                <div>
                  <span
                    className={
                      order.status === "Cancelled"
                        ? "text-red-600 font-semibold"
                        : order.status === "Pending"
                        ? "text-yellow-600 font-semibold"
                        : "text-green-600 font-semibold"
                    }
                  >
                    {order.status}
                  </span>
                  {order.cancelledAt && (
                    <span className="ml-2 text-xs text-red-500">
                      (Cancelled on {formatDate(order.cancelledAt)})
                    </span>
                  )}
                </div>
              </div>
              <div className="flex flex-wrap gap-4 mb-2">
                {order.items.map((item, idx) => (
                  <div key={idx} className="flex flex-col items-center w-28">
                    <Link to={`/orders/${order.id}`} state={{ product: item }}>
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-20 h-20 object-cover rounded border"
                      />
                    </Link>
                    <div className="text-xs font-semibold mt-1 line-clamp-1">{item.title}</div>
                    <div className="text-xs text-gray-500">₹{item.price}</div>
                    <div className="text-xs mt-1">
                      <span
                        className={
                          item.status === "Cancelled"
                            ? "text-red-500"
                            : item.status === "Pending"
                            ? "text-yellow-600"
                            : "text-green-600"
                        }
                      >
                        {item.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex justify-between items-center mt-2">
                <div className="font-bold text-lg">
                  Total: ₹
                  {order.items.reduce(
                    (sum, item) =>
                      sum + (item.price || 0) * (item.quantity || 1),
                    0
                  )}
                </div>
                {order.status !== "Cancelled" && (
                  <button
                    onClick={() => handleCancelOrder(order.id)}
                    className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
                  >
                    ✖ Cancel Order
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;
