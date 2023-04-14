
const Gig = require("../models/gigModel");
const Review = require("../models/reviewModel");
const { errorHandlor } = require("../utils/errorHandlor");

exports.createReview = async(req,res,next)=>{
    try {

        
        const newReview = new Review({
           
            userId:req.userId,
            star:req.body.star,
            gigId:req.body.gigId,
            desc:req.body.desc,
        })
        const existingReview = await Review.findOne({ gigId:req.body.gigId, userId:req.userId });
        if(existingReview){
            await Review.findOneAndUpdate({ gigId:req.body.gigId, userId:req.userId },{
                $set:{ star:req.body.star,desc:req.body.desc}
            },{
                new:true
            });

        }
        else{
            await newReview.save();
            const gig = await Gig.findByIdAndUpdate({_id:req.body.gigId},{
                $inc:{totalStars:req.body.star, starNumber: 1}
            });
    
            

        }

        res.status(201).json({
            success:true
        })

        
    } catch (error) {
    
        res.status(401).json({
            success:false,
            message:error.message
        })
    }
}

// Get Review

exports.getReview = async(req,res,next)=>{
    try {
        const gigId = req.params.id;
        const allReviews = await Review.find({gigId:gigId});
        // console.log(allReviews);
        if(allReviews.length === 0) return res.status(200).send("empty");

        res.status(200).send(allReviews);

        
    } catch (error) {
        res.status(401).json({
            success:false,
            message:error.message
        })
    }
}

// Delete review

exports.deleteReview= async(req,res,next)=>{
    try {
       const findReview = await Review.findById({_id:req.params.id});
       if(findReview.userId !== req.userId) return next(errorHandlor(500,"You can Delete only Your Review"));
       await Review.findOneAndDelete({_id:req.params.id})
        res.status(200).send("successfully deleted");
    } catch (error) {
        res.status(401).json({
            success:false,
            message:error.message
        })
        
    }
}