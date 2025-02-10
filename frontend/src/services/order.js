import axios from "axios";

const BASE_URL = "http://localhost:3568/api/mattress";

const createOrder = async (order) => {
  const response = await axios.post(`${BASE_URL}/order`, order);
  return response.data;
};

export default createOrder;
