const express = require("express");
const { createReview, getReview, deleteReview } = require("../controllers/reviewController");
const { verifyToken } = require("../middleware/jwt");

const router = express.Router();

router.post("/",verifyToken, createReview);

router.get("/:id", getReview);

router.delete("/delete/:id", deleteReview);


module.exports = router;