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
    if(req.userId !== user._id.toString()) return res.status(500).json({
        success:false,
        message:"You can delete Only Your Id"
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
