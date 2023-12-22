

//  Manage routes/paths to ProductController 

// Import express 
import express  from "express";
import UserController from "./user.controller.js";
import {upload} from "../../features/middlewares/fileupload.middleware.js";
import UserModel from "./user.model.js";
// Initialize Express router 

const userRouter = express.Router()
const userController = new UserController();
// const upload = new upload();


// All the paths to controller methods. 


userRouter.post('/signup',(req,res)=>{
    userController.signUp(req,res);
})
userRouter.post('/signin',(req,res)=>{
    userController.signIn(req,res);
}
)


export default userRouter;