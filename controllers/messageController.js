const Messages = require("../models/messageModel");
const Conversation = require("../models/conversationModel");

exports.createMessage= async(req,res,next)=>{
    try {
        const newMessage = new Messages({
            conversationId:req.body.conversationId,
            userId:req.userId,
            desc:req.body.desc
        })

        const savedMessage = await newMessage.save();
        const conversation = await Conversation.findOneAndUpdate({id:req.body.conversationId},{
            $set:{
                readBySeller: req.isSeller? true:false,
                readByBuyer:req.isSeller?false:true,
                lastMessage:req.body.desc
            }
        },{
            new:true
        });
        res.status(201).send(savedMessage);
    } catch (error) {
        res.status(400).json({
            success:false,
            message:error.message
        })
    }
}

//  Get Messages
exports.getMessages=async(req,res,next)=>{
    try {
        const messages = await Messages.find({conversationId:req.params.id});
        res.status(200).send(messages);
    } catch (error) {
        res.status(400).json({
            success:false,
            message:error.message
        })
    }
}