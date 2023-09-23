import express from "express";
import {getContact,createContact,updateContact,deleteContact,getContactById} from "../controllers/contactController.js";
import validateToken from "../middleware/validateTokenHandler.js";
const router=express.Router();
router.use(validateToken)
router.route("/").get(getContact)
router.route("/").post(createContact)
router.route("/:id").put(updateContact)
router.route("/:id").get(getContactById)
router.route("/:id").delete(deleteContact)
export default router;