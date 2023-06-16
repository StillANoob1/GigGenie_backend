const { errorHandlor } = require("../utils/errorHandlor");
const Gig = require("../models/gigModel");


exports.createGig = async (req, res, next) => {
    if (!req.isSeller) return next(errorHandlor(403, "User is not a seller"));
    const newGig = new Gig({
        userId: req.userId,
        ...req.body
    });

    try {
        const resultGig = await newGig.save();
        res.status(201).json({
            success: true,
            resultGig
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

//  Delete Single Gig

exports.deleteGig = async (req, res, next) => {
    try {
        const gig = await Gig.findById(req.params.id)
        if (!gig) return next(errorHandlor(500, "Gig not Found"));
       
        await Gig.findByIdAndDelete(req.params.id);
        res.status(201).json({
            success: true,
            message: "Gig has been deleted"
        })

    } catch (error) {
        res.status(501).json({
            success: false,
            message: error.message
        })
    }
}

//  GET gig

exports.getGig = async (req, res, next) => {
    try {
        const gig = await Gig.findById(req.params.id);
        if (!gig) return next(errorHandlor(500, "Gig not Found"));
        res.status(201).json({
            success: true,
            gig
        })

    } catch (error) {
        res.status(501).json({
            success: false,
            message: error,message
        })
    }
}

// Get All the Gigs 

exports.getGigs = async ( req,res,next )=>{
    const q = req.query;
    const filters = {
       ...(q.category && {category:{ $regex : q.category, $options:"i"}}),
       ...(q.search && {title: { $regex : q.search, $options:"i"}}),
       ...(( q.min || q.max )  && {price : { ...(q.min && { $gt:q.min }),...(q.max && {$lt:q.max}) }}),
       ...((q.userId) && {userId : q.userId})
    }
    try {
        const allGigs = await Gig.find(filters).sort({[q.sort]:-1}).populate('userId'); 
        res.status(200).json({
            allGigs
        })
    
    } catch (error) {
        res.status(501).json({
            success: false,
            message: error.message
        })
    }
}

//  all user Gigs

exports.AllUserGigs=async(req,res,next)=>{
    try {
        const allUserGigs = await Gig.find({userId:req.userId});
        
    if(allUserGigs.length===0) return res.status(404).json({
        success: false,
        message: "You have No Gig Please Create One"
    });
   
    res.status(200).send(allUserGigs);
        
    } catch (error) {
        res.status(501).json({
            success: false,
            message: error.message
        })
        
    }
}