const Conversation = require("../models/conversationModel");
const { errorHandlor } = require("../utils/errorHandlor");


//  create Conversation 
exports.createConversation=async(req,res,next)=>{
    try {
        const newConversation = new Conversation({
            id: req.isSeller? req.userId+req.body.to : req.body.to+req.userId,
            sellerId:req.isSeller? req.userId : req.body.to,
            buyerId:req.isSeller?req.body.to:req.userId,
            readBySeller:req.isSeller?true:false,
            readByBuyer:req.isSeller?false:true
        });

        const savedConversation = await newConversation.save();
        res.status(201).send(savedConversation)
    } catch (error) {
        res.status(401).json({
            success:false,
            message:error.message
        })
    }
}

//  Get Single Conversation

exports.getSingleConversation= async(req,res,next)=>{
    try {
        const conversation= await Conversation.findOne({id:req.params.id});
        if(!conversation) return next(errorHandlor(404,"Not Found"))
        res.status(200).send(conversation);
        
    } catch (error) {
        res.status(401).json({
            success:false,
            message:error.message
        })
    }
}

// Get All Conversation

exports.getConversations=async(req,res,next)=>{
    try {
        const conversations = await Conversation.find({
            ...( req.isSeller? { sellerId:req.userId } : { buyerId: req.userId })
        });

        if(conversations.length===0) return res.status(404).json({
            success:false,
            message:"You have no Message Please Make Oreder Then You can Able to Chat"
        })

        res.status(200).send(conversations);
    } catch (error) {
        res.status(401).json({
            success:false,
            message:error.message
        })
    }
}

// update conversation

exports.updateConversation= async(req,res,next)=>{
    try {  
        const updatedConversation = await Conversation.findOneAndUpdate({id:req.params.id},{
          
                ...( req.isSeller? { readBySeller:true }: { readByBuyer:true })
            
        });
    
        res.status(201).send(updatedConversation);
        
    } catch (error) {
        res.status(401).json({
            success:false,
            message:error.message
        })
    }
}