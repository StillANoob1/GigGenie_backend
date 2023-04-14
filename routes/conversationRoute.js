const express = require("express");
const { createConversation, getSingleConversation, getConversations, updateConversation } = require("../controllers/conversationController");
const { verifyToken } = require("../middleware/jwt");

const router = express.Router();

router.post("/",verifyToken,createConversation);

router.get("/single/:id",verifyToken,getSingleConversation);

router.get("/",verifyToken,getConversations);

router.put("/:id",verifyToken,updateConversation);

module.exports = router;