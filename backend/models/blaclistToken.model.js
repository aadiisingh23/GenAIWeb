import mongoose from "mongoose";

const blackListTokenSchema = new mongoose.Schema({
        token:{
            type:String,
            required:[true,"token is required for blacklist"]
        }
},{timestamps:true})

const tokenBlackListToken  = mongoose.model("tokenBlackListToken",blackListTokenSchema)
export default tokenBlackListToken