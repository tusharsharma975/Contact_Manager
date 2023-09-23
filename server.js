import express from "express";
import router from "./routes/contactRoutes.js";
import routers from "./routes/userRoutes.js"
import errorHandler from "./middleware/errorHandler.js";
import connectDb from "./config/dbConnection.js";
connectDb();
const app=express();
const port=5000
app.use(express.json()); 
app.use('/api/contacts',router)
app.use('/api/users',routers)
app.use(errorHandler)
app.listen(port,()=>{
    console.log(`Server listening on ${port}`)
})