const express = require("express");
const { deleteUser, getUser, getAllUsers, getSellerUsers, getBuyerUsers } = require("../controllers/userController");
const { verifyToken } = require("../middleware/jwt");

const router = express.Router();

router.delete("/delete/:id" ,deleteUser);
router.get("/:id", getUser);
router.get("/get/users",getAllUsers)
router.get("/get/sellers",getSellerUsers)
router.get("/get/buyers",getBuyerUsers)

module.exports = router;