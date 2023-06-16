const express = require("express");
const { createOrder, getOrders, getAllOrders } = require("../controllers/orderController");
const { verifyToken } = require("../middleware/jwt");

const router = express.Router();

router.post("/:id",verifyToken,createOrder);

router.get("/", verifyToken, getOrders);

router.get("/get/all",getAllOrders)

module.exports = router;