import UserModel from "./user.model.js" ;
import jwt from 'jsonwebtoken' ;
// import UserRepository from "./user.repository_old.js";
import UserRepository from "./user.repository.js"
import bcrypt from 'bcrypt' ;

export default class UserController{
    constructor(){
        this.userRepository = new UserRepository();
    }

    async resetPassword(req,res,next){
        const {newPassword} = req.body;
        const hashedPassword =await  bcrypt.hash(newPassword,12);
        const userID = req.userID;
        try{
            await this.userRepository.resetPassword(userID,hashedPassword);
            res.status(200).send("password is updated")
        }
        catch(err){
            console.log(err);
            console.log("passing error to middleware");
            next(err);


        }

    }


    async signUp(req,res,next){
        const {name,email,password,type} = req.body;
        try{

               const hashedPassword =await  bcrypt.hash(password,12);
        const user=new UserModel(
            name,
            email,
            hashedPassword,
            // password,
            type
            
            );

        await this.userRepository.signUp(user);
        res.status(201).send(user)
        }
        catch(err){
            console.log(err)
            next(err) 
        }
     
    }
    


    async signIn(req,res,next){
        try{
        // 1 find user by email 
        const user = await this.userRepository.findByEmail(req.body.email);
        if(!user){
            return res.status(400).send("Incorrect Credentials");
        }
        else{
            // 2  compare password with hashed password  using bcrypt
            const result = await bcrypt.compare(req.body.password,user.password);
            if(result){
                // 3 create token 
                const token = jwt.sign({
                    userId:user._id,
                    email:user.email
                },
                process.env.JWT_SECRET,
                {
                    expiresIn:'15h',
                }
                )
                // 4 send token 
                return res.status(200).send(token)
            }
       
        else{

            return res.status(400).send("Incorrect Credentials");

        }
        
    }
}
        catch(err){
            console.log(err);
            return res.status(200).send("Something went wrong")  
        }
                
          
        }
}
