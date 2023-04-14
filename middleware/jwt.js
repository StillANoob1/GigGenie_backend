const jwt = require("jsonwebtoken");

exports.verifyToken= (req,res,next)=>{
    const token = req.headers.authorization;
    // console.log(token);
    // const token = req.cookies.accessToken;

    if(!token) return res.status(401).json({
        success:false,
        message:"you are not authenticated please login"
    })
    jwt.verify(token,process.env.SECRET_KEY,(err,payload)=>{
        if(err) return res.status(403).json({
            success:false,
            message:"Token has been expired"
        })
        req.userId=payload.id;
        req.isSeller=payload.isSeller;
        
        next();
    })
}