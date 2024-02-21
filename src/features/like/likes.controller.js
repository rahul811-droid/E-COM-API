import { LikeRepository } from "./likes.repository.js";


export default class LikeController{

    constructor(){

        this.likeRepository = new LikeRepository();
    }

    async getLikes(req,res,next){
        try{

            const {id,type} = req.query;
            const likes = await this.likeRepository.getLikes(type,id);
            return  res.status(200).send(likes)
        } catch(err){
    console.log(err);
    return res.status(400).send("Something went wrong");
   }  

    }




   async  likeItem(req,res){
    try{
        const {id,type} = req.body;
        if(type!='Product' && type!='Category'){
            return res.status(400).send("Invalid");

        }   
        if(type=='Product'){
            await this.likeRepository.likeProduct(req.userID,id);
        }
        else{
            await this.likeRepository.likeCategory(req.userID,id)
        }
    } 
    catch(err){
    console.log(err);
    return res.status(400).send("Something went wrong");
   }  

   res.status(201).send("likes is worked");
    }

}