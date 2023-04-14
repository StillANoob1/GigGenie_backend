const express = require("express");
const { createOrder, getOrders } = require("../controllers/orderController");
const { verifyToken } = require("../middleware/jwt");

const router = express.Router();

router.post("/:id",verifyToken,createOrder);

router.get("/", verifyToken, getOrders);

module.exports = router;