import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    username:{
        type:String,
        unique:[true,"username is already taken"],
        required:true
    },
    email:{
        type:String,
        unique:[true,"this email already exists"],
        required:true
    },
    password:{
        type:String,
        required:true
    },
},{timestamps:true})

const User = mongoose.model("User",userSchema)

export default User