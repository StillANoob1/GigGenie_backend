const express = require("express");
const { createGig, deleteGig, getGig, getGigs, AllUserGigs } = require("../controllers/gigController");
const { verifyToken } = require("../middleware/jwt");

const router = express.Router();

router.post("/", verifyToken , createGig);
router.delete("/delete/:id", verifyToken , deleteGig);
router.get("/single/:id", getGig);
router.get("/", getGigs);
router.get("/mygigs", verifyToken,AllUserGigs);

module.exports = router;