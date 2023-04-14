const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
    desc:{
        type:String,
        required:[true,"please write your Review"]
    },
    gigId:{
        type:String,
        required:[true,"gigId should be required"]
    },
    userId:{
        type:String,
        required:[true,"userId should be required"]
    },
    star:{
        type:Number,
        default:0,
        enum:[1,2,3,4,5]
    },
   
},{
    timestamps:true
})

module.exports = mongoose.model("Review",reviewSchema);