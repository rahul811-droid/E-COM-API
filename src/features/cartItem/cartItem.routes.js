
import express  from "express";
import CartItemController from "./cartItem.controller.js"
import {upload} from "../../features/middlewares/fileupload.middleware.js";

// Initialize Express router 

const cartItemRouter = express.Router()
const cartItemController = new CartItemController();
cartItemRouter.post('/',cartItemController.add);
cartItemRouter.get('/',cartItemController.get);
cartItemRouter.delete('/:id',cartItemController.delete);

export default cartItemRouter;