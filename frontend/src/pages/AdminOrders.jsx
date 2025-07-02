import React, { useEffect, useState } from "react";
import axios from "../api/axios";

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [users, setUsers] = useState([]); // <-- add this
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      const res = await axios.get("/orders");
      setOrders(res.data);
    } catch (err) {
      console.error("Failed to fetch orders", err);
    } finally {
      setLoading(false);
    }
  };

  const fetchUsers = async () => {
    try {
      const res = await axios.get("/users");
      setUsers(res.data);
    } catch (err) {
      console.error("Failed to fetch users", err);
    }
  };

  const cancelOrder = async (orderId) => {
    try {
      await axios.patch(`/orders/${orderId}`, { status: "Cancelled" });
      fetchOrders(); // refresh UI
    } catch (error) {
      console.error("Cancel failed", error);
    }
  };

  const deliverOrder = async (orderId) => {
    try {
      await axios.patch(`/orders/${orderId}`, {
        status: "Delivered",
        deliveredAt: new Date().toISOString(),
      });
      fetchOrders(); // refresh UI
    } catch (error) {
      console.error("Deliver failed", error);
    }
  };

  useEffect(() => {
    fetchOrders();
    fetchUsers();
  }, []);

  const getUserName = (userId) => {
    const user = users.find((u) => u.id === userId);
    return user ? user.name : "Unknown";
  };

  if (loading) return <div className="p-8 text-center">Loading...</div>;

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">🛠️ Admin Order Panel</h1>
      {orders.length === 0 ? (
        <div className="text-gray-600 text-center">No orders yet.</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left border-collapse">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-3 px-4 font-semibold text-gray-700">Order ID</th>
                <th className="py-3 px-4 font-semibold text-gray-700">User ID</th>
                <th className="py-3 px-4 font-semibold text-gray-700">User Name</th>
                <th className="py-3 px-4 font-semibold text-gray-700">Date</th>
                <th className="py-3 px-4 font-semibold text-gray-700">Total</th>
                <th className="py-3 px-4 font-semibold text-gray-700">Status</th>
                <th className="py-3 px-4 font-semibold text-gray-700">Items</th>
                <th className="py-3 px-4 font-semibold text-gray-700">Action</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id} className="border-b hover:bg-gray-50">
                  <td className="py-2 px-4">{order.id}</td>
                  <td className="py-2 px-4">{order.userId}</td>
                  <td className="py-2 px-4">{getUserName(order.userId)}</td>
                  <td className="py-2 px-4">
                    {new Date(order.date).toLocaleString()}
                  </td>
                  <td className="py-2 px-4 font-semibold text-green-700">
                    ₹{order.totalAmount}
                  </td>
                  <td className="py-2 px-4 text-blue-600">{order.status}</td>
                  <td className="py-2 px-4">
                    <ul className="list-disc pl-4">
                      {order.items.map((item, i) => (
                        <li key={i}>
                          {item.title} x {item.qty}{" "}
                          {item.size && <span>({item.size})</span>}
                        </li>
                      ))}
                    </ul>
                  </td>
                  <td className="py-2 px-4">
                    {order.status === "Pending" ? (
                      <div className="flex gap-2">
                        <button
                          onClick={() => cancelOrder(order.id)}
                          className="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={() => deliverOrder(order.id)}
                          className="px-3 py-1 text-sm bg-green-500 text-white rounded hover:bg-green-600"
                        >
                          Deliver
                        </button>
                      </div>
                    ) : (
                      <span className="text-gray-400">—</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminOrders;
