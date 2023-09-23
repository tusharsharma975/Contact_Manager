import mongoose from "mongoose";
const connectDb=async()=>{
    try {
        const connect=await mongoose.connect("mongodb+srv://root:root@cluster0.dftd6tm.mongodb.net/mycontacts-backend?retryWrites=true&w=majority")
        console.log("Database connected:",connect.connection.host,
        connect.connection.name)
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}
export default connectDb;