import axios from "axios";

const BASE_URL = "http://localhost:3568/api/orders";

export const createOrder = async (order) => {
  const response = await axios.post(BASE_URL, order);
  return response.data;
};

export const getOrders = async () => {
  const response = await axios.get(BASE_URL);
  return response.data;
};

export const updateOrderStatus = async ({ orderId, status }) => {
  const response = await axios.patch(`${BASE_URL}/${orderId}/status`, {
    status,
  });
  return response.data;
};

export async function getOrder(orderId) {
  const response = await fetch(`${BASE_URL}/${orderId}`);
  if (!response.ok) {
    throw new Error("Failed to fetch order details");
  }
  return response.json();
}
