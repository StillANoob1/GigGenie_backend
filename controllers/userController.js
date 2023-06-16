const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const { errorHandlor } = require("../utils/errorHandlor");

exports.deleteUser= async(req,res)=>{
    try {
        
        const user = await User.findById(req.params.id);
    if(!user) return res.status(500).json({
        success:false,
        message:"User does not exists"
    })
    

    await User.findByIdAndDelete(req.params.id);
    res.status(200).json({
        success: true
    })

    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

// Get User

exports.getUser= async(req,res,next)=>{
    try {
        const user = await User.findById(req.params.id);
        if(!user) return next(errorHandlor(400,"User is Not Found"))
        res.status(200).send(user)

    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

// Fetch all users
exports.getAllUsers = async (req, res) => {
    try {
      const users = await User.find();
      if (users.length === 0) {
        return res.status(404).json({
          success: false,
          message: 'No users found',
        });
      }
      res.status(200).json({
        success: true,
        users: users,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };
  
  // Fetch seller users
  exports.getSellerUsers = async (req, res) => {
    try {
      const sellerUsers = await User.find({ isSeller: true });
      if (sellerUsers.length === 0) {
        return res.status(404).json({
          success: false,
          message: 'No seller users found',
        });
      }
      res.status(200).json({
        success: true,
        users: sellerUsers,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };
  
  // Fetch buyer users
  exports.getBuyerUsers = async (req, res) => {
    try {
      const buyerUsers = await User.find({ isSeller: false });
      if (buyerUsers.length === 0) {
        return res.status(404).json({
          success: false,
          message: 'No buyer users found',
        });
      }
      res.status(200).json({
        success: true,
        users: buyerUsers,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };
