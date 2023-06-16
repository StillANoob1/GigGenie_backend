const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:[true,"Please enter your Username"],
        unique:[true,"Username should be unique"]
    },
    email:{
        type:String,
        required:[true,"Please enter your Email"]
    },
    password:{
        type:String,
        required:[true,"Please enter your Password"]
    },
    img:{
        type:String,
        required:false
    },
    country:{
        type:String,
        required:false
    },
    desc:{
        type:String
    },
    phone:{
        type:String,
        required:false
    },
    isSeller:{
        type:Boolean,
        default:false
    },
    role: {
        type: String,
        default: "user"
    }

},{
    timestamps:true
});

userSchema.pre('save', async function (next) {
    if(this.isModified("password")){
        const password = await bcrypt.hash(this.password,5);
        this.password = password;
    }
    
    next();
})

userSchema.methods.generateToken=function(user){
    const token = jwt.sign({id:user._id,isSeller:user.isSeller},process.env.SECRET_KEY);
    return token;
}

module.exports = mongoose.model("User",userSchema);