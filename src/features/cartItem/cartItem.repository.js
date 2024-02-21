import { ObjectId } from "mongodb";
import { getDB } from "../../database/mongodb.js"
import { ApplicationError } from "../../error-handler/applicationError.js";

export default class CartItemRepository{
    constructor(){
        this.collection = "cartItems"
    }
    async add(productID,userID,quantity){
        
        try{
            const db = getDB();
            const collection = db.collection(this.collection);
            const id = await this.getNextCounter(db);
            console.log(id)
            // find the document 
            // either insert or update 
            // Insertion 
            await collection.updateOne({productID:new ObjectId(productID),userID:new ObjectId(userID)},
            {
                $setOnInsert:{_id:id},
                $inc:{
                quantity:quantity
            }},
            {upsert:true}
            )
        }
        catch(err){
            throw new ApplicationError("Something went wrong ", 500);
        } 
}
    async get(userID){
        try{
            const db = getDB();
            const collection = db.collection(this.collection);
            return await collection.find({userID:new ObjectId(userID)}).toArray();
        }
        catch(err){
            throw new ApplicationError("Something went wrong ", 500);
        } 
    }
    async delete(userID,cartItemID){
        try{
            const db = getDB();
            const collection= db.collection(this.collection);
            const result = await collection.deleteOne({_id:new ObjectId(cartItemID),userID:new ObjectId(userID)});
            return result.deletedCount>0

        } 
        catch(err){
            throw new ApplicationError("Something went wrong ", 500);
        } 
    }
    async getNextCounter(db){
        const resuluDocument = await db.collection("counters").findOneAndUpdate(
            { _id:'cartItemID'},
            {$inc:{value:1}},
            {returnDocument:'after'}
        )
        console.log(resuluDocument)
        return resuluDocument.value;
    }

}