const Gig = require("../models/gigModel");
const Order = require("../models/orderModel");

exports.createOrder=async(req,res,next)=>{
    try {
        if(req.isSeller){
            return res.status(401).json({
              success:false,
              message:"only Buyer can Create Orders or Buy Gigs"
            })
      }
        const gig = await Gig.findById({_id:req.params.id});
        const newOrder = new Order({
            gigId:gig._id,
            img:gig.cover,
            title:gig.title,
            buyerId:req.userId,
            sellerId:gig.userId,
            price:gig.price,
            payment_intent:"successfull Payment",
            isCompleted:true
        });
        

        const savedOrder = await newOrder.save();

        res.status(201).send(savedOrder);



    } catch (error) {
        res.status(400).json({
            success:false,
            message:error.message
        })
    }
}

//  Get Orders

exports.getOrders = async(req,res,next)=>{
    try {
        const allOrders = await Order.find({
            ...(req.isSeller? { sellerId:req.userId } : { buyerId:req.userId }),
            isCompleted:true
        });
        if(allOrders.length===0) return res.status(404).json({
            success:false,
            message:"please make Oredre First"
        })
        res.status(200).send(allOrders);
    } catch (error) {
        res.status(400).json({
            success:false,
            message:error.message
        })
    }
}