const mongoose = require("mongoose");

const conversationSchema = new mongoose.Schema({
    id:{
        type:String,
        required:true
    },
    buyerId:{
        type:String,
        required:[true,"There Should be buyer Id"]
    },
    sellerId:{
        type:String,
        required:[true,"There Should be seller Id"]
    },
    readBySeller:{
        type:Boolean
    },
    readByBuyer:{
        type:Boolean
    },
    lastMessage:{
        type:String
    }
},{
    timestamps:true
})

module.exports = mongoose.model("Conversation",conversationSchema);