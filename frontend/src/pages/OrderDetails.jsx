import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "../api/axios";
import { motion } from "framer-motion";

const OrderDetails = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const product = location.state?.product;

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showTimeline, setShowTimeline] = useState(false);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const res = await axios.get(`/orders/${orderId}`);
        setOrder(res.data);
      } catch (err) {
        console.error("Order not found");
      } finally {
        setLoading(false);
      }
    };
    fetchOrder();
  }, [orderId]);

  if (loading) return <p className="p-6">Loading...</p>;
  if (!order) return <p className="p-6">Order not found</p>;

  const allTimelineSteps = [
    {
      title: "Order Confirmed",
      desc: `Order placed - Receipt #${order.id}`,
      date: new Date(order.date),
      status: "Confirmed",
    },
  ];

  if (order.status !== "Cancelled" && order.status !== "Delivered") {
    allTimelineSteps.push({
      title: "Processing",
      desc: "Your order is being processed.",
      date: new Date(order.date),
      status: "Processing",
    });
  }

  if (order.status === "Cancelled") {
    allTimelineSteps.push({
      title: "Cancelled",
      desc: "Order was cancelled.",
      date: new Date(order.cancelledAt || order.date),
      status: "Cancelled",
    });
  } else if (order.status === "Delivered") {
    allTimelineSteps.push({
      title: "Delivered",
      desc: "Products delivered",
      date: new Date(order.deliveredAt || order.date),
      status: "Delivered",
    });
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "Processing":
        return "bg-yellow-400 border-yellow-400 text-yellow-700";
      case "Cancelled":
        return "bg-red-500 border-red-500 text-red-700";
      case "Delivered":
        return "bg-green-500 border-green-500 text-green-700";
      default:
        return "bg-blue-500 border-blue-500 text-blue-700";
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow rounded">
      <button
        onClick={() => navigate("/orders")}
        className="mb-4 px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded text-gray-700 font-medium transition"
      >
        ← Back to Orders
      </button>

      <div className="mb-6">
        <h2 className="text-xl font-bold mb-2">Order #{order.id}</h2>
        <p className="text-gray-600 mb-1">
          Order Date: {new Date(order.date).toLocaleDateString()}
        </p>
        <p className="text-gray-600 mb-1">
          Status: <span className="font-semibold">{order.status}</span>
        </p>
      </div>

      <div className="mb-6">
        <h3 className="font-semibold mb-2 text-lg">Products in this Order:</h3>
        <ul className="divide-y">
          {order.items.map((item, idx) => (
            <li key={idx} className="py-4 flex gap-4 items-center">
              <img
                src={item.image}
                alt={item.title}
                className="w-20 h-20 object-cover rounded border"
              />
              <div className="flex-1">
                <h4 className="font-semibold text-md">{item.title}</h4>
                <p className="text-sm text-gray-500">
                  {item.size && `Size: ${item.size} `}
                  {item.color && `Color: ${item.color}`}
                </p>
                <p className="text-sm text-gray-500">₹{item.price}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="mb-8">
        {!showTimeline && (
          <button
            className="mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
            onClick={() => setShowTimeline(true)}
          >
            See Order Updates
          </button>
        )}

        {showTimeline && (
          <>
            <div
              className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
              onClick={() => setShowTimeline(false)}
            ></div>

            <div className="fixed inset-0 flex items-center justify-center z-50">
              <div className="bg-white w-[85%] rounded-lg shadow-lg p-6 max-w-md relative">
                <button
                  className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-xl"
                  onClick={() => setShowTimeline(false)}
                >
                  &times;
                </button>
                <h3 className="font-semibold mb-4 text-lg text-center">
                  Order Updates
                </h3>
                <div className="relative ml-6"> 
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: `${allTimelineSteps.length * 40}px` }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="absolute left-[-16.9px] top-5 w-0.5 bg-gray-300"
                  />
                  <ol className="relative z-10">
                    {allTimelineSteps.map((step, idx) => (
                      <motion.li
                        key={idx}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: idx * 0.5 }}
                        className="mb-8  relative"
                      >
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: idx * 0.5 }}
                          className={`absolute w-4 h-4 rounded-full -left-6 top-1.5 border-2 ${getStatusColor(step.status)}`}
                        ></motion.div>
                        <h4 className={`font-semibold ml-5  text-sm ${getStatusColor(step.status).split(" ")[2]}`}>
                          {step.title}
                        </h4>
                        <p className="text-xs  ml-5 text-gray-400">
                          {step.date.toLocaleDateString()}
                        </p>
                        <p className="text-sm  ml-5 text-gray-600">{step.desc}</p>
                      </motion.li>
                    ))}
                  </ol>
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      <div className="mt-4 text-center text-sm text-gray-500">
        💬 Chat with us
      </div>
    </div>
  );
};

export default OrderDetails;