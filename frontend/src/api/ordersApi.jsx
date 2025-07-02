import axios from "../api/axios";

export const cancelOrderItem = async (orderId, productId) => {
  const res = await axios.get(`/orders/${orderId}`);
  const order = res.data;

  // Mark the matching item as cancelled
  const updatedItems = order.items.map((item) =>
    item.productId === productId ? { ...item, status: "Cancelled" } : item
  );

  // If all items are cancelled, change overall order status
  const allCancelled = updatedItems.every((item) => item.status === "Cancelled");

  const updatedOrder = {
    ...order,
    items: updatedItems,
    status: allCancelled ? "Cancelled" : order.status,
  };

  // PATCH request
  const patch = await axios.patch(`/orders/${orderId}`, updatedOrder);
  return patch.data;
};
