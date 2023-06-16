const mongoose = require("mongoose");

const gigSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
      },
    category:String,
    title:{
        type:String,
        required:[true,"Please Enter Your Gig Title"]
    },
    desc:{
        type:String,
        required:[true,"Please Enter Your Gig Description"]
    },
    totalStars:{
        type:Number,
    },
    starNumber:{
        type:Number,
        default:0
    },
    cover:{
        type:String,
        required:[true,"Please Upload Cover image of your Gig"]
    },
    images:{
        type:[String],

    },
    shortTitle:{
        type:String
    },
    shortDesc:{
        type:String
    },
    deliveryTimes:{
        tytpe:Number
    },
    revisionNumber:{
        type:Number
    },
    price:{
        type:Number,
        required:[true,"Please Enter Your Gig Price"]
    },
    features:{
        type:[String]
    },
    sales:{
        type:Number,
        default:0,
    }

},
{
    timestamps:true
}
);

module.exports = mongoose.model("Gig",gigSchema);