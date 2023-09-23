import express from "express"

import { registerUser,loginUser,currentUser } from "../controllers/userController.js ";
import validateToken from "../middleware/validateTokenHandler.js";
const routers=express.Router();
routers.post('/register',registerUser)
routers.post('/login',loginUser)
routers.get('/current',validateToken, currentUser)
export default routers;