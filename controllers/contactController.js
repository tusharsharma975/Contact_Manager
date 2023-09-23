import asyncHandler from "express-async-handler";
import contactModel from "../models/contactModel.js";
//@desc Get all Contacts
//@route GET/api/contacts

export const getContact = asyncHandler(async (req, res) => {
  const contacts = await contactModel.find({user_id:req.user.id});
  res.status(200).json(contacts);
});

export const createContact = asyncHandler(async (req, res) => {
  const { name, email, phone } = req.body;
  if (!name || !email || !phone) {
    res.status(400);
    throw new Error("All fields are mandatory");
  }
  const contact = await contactModel.create({
    name,
    email,
    phone,
    user_id:req.user.id
  });
  res.status(200).json(contact);
});
export const updateContact = asyncHandler(async (req, res) => {
  const contact = await contactModel.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("Contact not found");
  }
  if(contact.user_id.toString()!==req.user.id){
     res.status(403)
     throw new Error("User don't  have permission to update other user contacts")
  }
  const updatedContact = await contactModel.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.status(200).json(updatedContact);
});
export const deleteContact = asyncHandler(async (req, res) => {
  const contact = await contactModel.findById(req.params.id)
  if (!contact) {
    res.status(404);
    throw new Error("Contact not found");
  }
  if(contact.user_id.toString()!==req.user.id){
    res.status(403)
    throw new Error("User don't  have permission to delete other user contacts")
 }
  await contactModel.findByIdAndRemove(req.params.id); 
  res.status(200).json(contact);
});
export const getContactById = asyncHandler(async (req, res) => {
  const contact = await contactModel.findById(req.params.id);
  if (contact) res.status(200).json(contact);
  else {
    res.status(404);
    throw new Error("Contact not found");
  }
});
