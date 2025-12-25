import Order from "../models/order.models.js";

export const addOrderItems = async (req, res) => {
  try {
    const {
      orderItems,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    } = req.body;

    if (orderItems && orderItems.length === 0) {
      return res.json({ message: "No order items" });
    }

    if (!req.user) {
      return res.status(401).json({ message: "User not found in request" });
    }

    const order = new Order({
      user: req.user._id,
      orderItems,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    });

    const createdOrder = await order.save();
    res.status(201).json(createdOrder);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: error.message });
  }
};

export const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate(
      "user",
      "name email"
    );

    if (order) {
      res.json(order);
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const updateOrderToPaid = async (req, res) => {
  console.log("Body received at Backend:", req.body);
  const order = await Order.findById(req.params.id);

  if (order) {
    (order.isPaid = true),
      (order.paidAt = Date.now()),
      (order.paymentResult = {
        id: req.body.id,
        status: req.body.status,
        email: req.body.payer.email_address,
      });

    const updatedOrder = await order.save();
    res.json(updatedOrder);
  } else {
    return res.status(404).json({ message: "Order not found!" });
  }
};

export const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.findById({ user: req.user._id }).sort({
      createdAt: -1,
    });
    res.json(orders);
  } catch (error) {
    return res
      .status(500)
      .json({ message: error.message || "Problem in fetching your users" });
  }
};
