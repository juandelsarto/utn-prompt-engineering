import Order from "../models/orderModel.js";

// Create new order
export const createOrder = async (req, res) => {
  try {
    const { customer, payment, items, total } = req.body;

    // Only store last 4 digits of card number for reference
    const lastFourDigits = payment.cardNumber.slice(-4);

    const order = new Order({
      customer,
      payment: {
        cardNumber: "****", // Don't store complete card number
        lastFourDigits,
      },
      items,
      total,
    });

    const savedOrder = await order.save();

    res.status(201).json({
      success: true,
      data: savedOrder,
    });
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({
      success: false,
      error: "Error creating order",
    });
  }
};

// Get all orders
export const getOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("items.productId")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: orders,
    });
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({
      success: false,
      error: "Error fetching orders",
    });
  }
};

// Get single order
export const getOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate(
      "items.productId"
    );

    if (!order) {
      return res.status(404).json({
        success: false,
        error: "Order not found",
      });
    }

    res.status(200).json({
      success: true,
      data: order,
    });
  } catch (error) {
    console.error("Error fetching order:", error);
    res.status(500).json({
      success: false,
      error: "Error fetching order",
    });
  }
};

// Delete order
export const deleteOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        success: false,
        error: "Order not found",
      });
    }

    await order.deleteOne();

    res.status(200).json({
      success: true,
      message: "Order deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting order:", error);
    res.status(500).json({
      success: false,
      error: "Error deleting order",
    });
  }
};

// Update order status
export const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        success: false,
        error: "Order not found",
      });
    }

    order.status = status;
    await order.save();

    res.status(200).json({
      success: true,
      data: order,
    });
  } catch (error) {
    console.error("Error updating order status:", error);
    res.status(500).json({
      success: false,
      error: "Error updating order status",
    });
  }
};
