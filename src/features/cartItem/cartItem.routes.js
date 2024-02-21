
import express  from "express";
import CartItemController from "./cartItem.controller.js"
import {upload} from "../../features/middlewares/fileupload.middleware.js";

// Initialize Express router 

const cartItemRouter = express.Router()
const cartItemController = new CartItemController();
cartItemRouter.post('/',(req,res,next)=>{cartItemController.add(req,res,next)});
cartItemRouter.get('/',(req,res,next)=>{cartItemController.get(req,res,next)});
cartItemRouter.delete('/:id',(req,res,next)=>{cartItemController.delete(req,res,next)});

export default cartItemRouter;