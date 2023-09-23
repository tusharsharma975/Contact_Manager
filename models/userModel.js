import mongoose from "mongoose";
const userSchema=mongoose.Schema({
    username:{
        type:String,
        required:[true,"Please add the user name"],
    },
    email:{
        type:String,
        required:[true,"Please add the user email"],
        unique:[true,"Email already taken"],
    },
    password:{
        type:String,
        required:[true,"Please add the user password"],
    }
},
{
    timestamps:true,
}
)
export default mongoose.model("User",userSchema);