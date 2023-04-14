const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
    conversationId:{
        type:String
    },
    userId:{
        type:String
    },
    desc:{
        type:String
    }
},{
    timestamps:true
})

module.exports = mongoose.model("Messages",messageSchema);