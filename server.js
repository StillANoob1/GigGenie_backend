const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");

//  importing Routes
const userRoute = require("./routes/userRoute");
const authRoute = require("./routes/authRoute");
const gigRoute = require("./routes/gigRoute");
const messageRoute = require("./routes/messageRoute");
const orderRoute = require("./routes/orderRoute");
const conversationRoute = require("./routes/conversationRoute");
const reviewRoute = require("./routes/reviewRoute");



dotenv.config();

const app = express();
const port= process.env.PORT || 8000


const connect = ()=>{
    mongoose.connect(process.env.MONGO).then(()=>{
        console.log("database connected");
    }).catch((err)=>{
        console.log(err);
    })
}

app.use(cors({ origin:true , credentials:true }));
app.use(express.json());
app.use(cookieParser());

app.use("/api/users",userRoute);
app.use("/api/auth",authRoute)
app.use("/api/gigs",gigRoute);
app.use("/api/orders",orderRoute);
app.use("/api/conversations",conversationRoute);
app.use("/api/messages",messageRoute);
app.use("/api/reviews",reviewRoute);


app.use((err,req,res,next)=>{
    errStatusCode=err.statusCode || 500;
    errMessage = err.message || "something went wrong";

  return  res.status(errStatusCode).json({
        success:false,
        message:errMessage,
    })
})



app.listen(port,()=>{
    connect();
    console.log(`Server is listining at ${port}`);
})