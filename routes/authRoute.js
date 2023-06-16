const express = require("express");
const { register, login, logout, adminLogin } = require("../controllers/authController");

const router = express.Router();

router.post("/register", register );
router.post("/login",login);
router.post("/login/admin",adminLogin);
router.post("/logout",logout); 

module.exports = router;