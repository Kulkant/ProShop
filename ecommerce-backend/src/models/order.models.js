import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    orderItems: [
      {
        name: { type: String, required: true },
        qty: { type: Number, required: true },
        image: { type: String, required: true },
        price: { type: Number, required: true },
        product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
      },
    ],
    shippingAddress: {
      address: { type: String, required: true },
      city: { type: String, required: true },
      postalCode: { type: String, required: true },
      country: { type: String, required: true },
    },
    paymentMethod: { type: String, required: true },
    paymentResult: {
      id: { type: String },
      status: {
        type: String,
        default: "pending",
      },
      email: { type: String, lowercase: true, unqiue: true },
    },
    itemsPrice: { type: Number, default: 0.0, required: true },
    shippingPrice: { type: Number, default: 0.0, required: true },
    taxPrice: { type: Number, default: 0.0, required: true },
    totalPrice: { type: Number, default: 0.0, required: true },
    isPaid: { type: Boolean, default: false, required: true },
    paidAt: { type: Date, default: Date.now },
    isDelivered: { type: Boolean, default: false },
    deliverdAt: { type: Date },
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);

export default Order;
