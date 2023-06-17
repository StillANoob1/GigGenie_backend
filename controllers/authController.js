const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const { errorHandlor } = require("../utils/errorHandlor");

exports.register =async(req,res)=>{
    try {
        const newUser = new User({
            ...req.body
        });

        const user = await newUser.save();
        const token = user.generateToken(user);
        res.status(201).json({
            success:true,
            user,
            token
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success:false,
            message:error.message,
        })
    }
}

// login 
exports.login = async (req,res,next)=>{

    try {
        const { email, password}=req.body;
    if(!email || !password) return next(errorHandlor(501,"Please Enter Email and Password"))


    const user = await User.findOne({email:email});
    if(!user) return res.status(500).json({
        success:false,
        message:"Please Enter Valid Email Address"
    })
    const isMatch = await bcrypt.compare(password,user.password);
    if(!isMatch) return  res.status(500).json({
        success:false,
        message:"Password is incorrect"
    })
    
    const token = user.generateToken(user);

    res.cookie("accessToken",token,{
        httpOnly:true,
    }).status(200).json({
        success:true,
        user,
        token
        })

        
    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

//  Log out
exports.logout=async(req,res)=>{
   try {
    res.clearCookie("accessToken",{
        sameSite:"none",
        secure:true,
    }).status(200).json({
        success:true,
        message:"user has been logout"
    })
   } catch (error) {
    res.status(500).json({
        success:false,
        message:error.message
    })
   }
}

// admin login   

exports.adminLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return next(errorHandlor(501, "Please Enter Email and Password"));

    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return res.status(500).json({
        success: false,
        message: "Please Enter Valid Email Address",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(500).json({
        success: false,
        message: "Password is incorrect",
      });
    }

    if (user.role !== "admin") {
      return res.status(401).json({
        success: false,
        message: "Only admins are allowed to log in",
      });
    }

    const token = user.generateToken(user);

    res.cookie("accessToken", token, {
      httpOnly: true,
    }).status(200).json({
      success: true,
      user,
      token,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
