const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  gigId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Gig",
    required: [true, "There should be a gig ID"],
  },
  buyerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "There should be a buyer ID"],
  },
  sellerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "There should be a seller ID"],
  },
  img: {
    type: String,
    required: false,
  },
  title: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: false,
  },
  isCompleted: {
    type: Boolean,
    default: false,
  },
  payment_intent: {
    type: String,
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model("Order", orderSchema);
