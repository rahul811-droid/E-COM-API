import { ObjectId } from "mongodb";
import { getDB } from "../../database/mongodb.js";
import { ApplicationError } from "../../error-handler/applicationError.js";
import { productScehma } from "./product.schema.js";
import mongoose from "mongoose";
import { reviewShema } from "./review.schema.js";
import { categorySchema } from "./catagory.schema.js";


const ProductModel = mongoose.model("Product",productScehma);
const ReviewModel = mongoose.model("Review",reviewShema);
const CategoryModel = mongoose.model("Category",categorySchema);

class ProductRepository{

    constructor(){
        this.collection = "products";
    }
 
    async add(productData){
        // try{
        //     // 1 . Get the db.
        //     const db = getDB();
        //     const collection = db.collection(this.collection);
        //     await collection.insertOne(newProduct);
        //     return newProduct;
        // } 
        try{
            //1 Adding product 

            productData.categories=productData.category.split(',');
            console.log(productData);
            const newProduct = new ProductModel(productData);
            const savedProduct = await newProduct.save();

            // 2. Update categories.
            await CategoryModel.updateMany(
                {_id: {$in: productData.categories}},
                {$push: {products: new ObjectId(savedProduct._id)}}
            )
        }catch(err){
            console.log(err);
            throw new ApplicationError("Something went wrong with database", 500);    
        }
    }
    async getAll(){
        try{
            const db = getDB();
            const collection = db.collection(this.collection);
            const products = await collection.find().toArray();
            console.log(products);
            return products;
        } catch(err){
            console.log(err);
            throw new ApplicationError("Something went wrong with database", 500);
        }
    }

    async get(id){
        try{
            const db = getDB();
            const collection = db.collection(this.collection);
           
        return  await collection.findOne({_id: new ObjectId(id)});
        
        }catch(err){
            console.log(err);
            throw new ApplicationError("Something went wrong with database", 500);
        }
    }
// product should have min price specified and category 
    async filter(minPrice, categories){
        try{
            const db = getDB();
            const collection = db.collection(this.collection);
            let filterExpression={};
            if(minPrice){
                filterExpression.price = {$gte: parseFloat(minPrice)}
            }
            // if(maxPrice){
            //     filterExpression.price = {...filterExpression.price, $lte: parseFloat(maxPrice)}
            // }
            // categories  = JSON.parse(categories.replace(/'/g,'"'));
            console.log(categories)
            if(categories){
                filterExpression={$or:[{category:{$in:categories}},filterExpression]}
                // filterExpression.category=category;
                
            }
            
            return await collection.find(filterExpression).project({name:1,price:1,_id:0,ratings:{$slice:-1}}).toArray();
            
        }catch(err){
            console.log(err);
            throw new ApplicationError("Something went wrong with database", 500);
        }
    }

    async rate(userID, productID, rating){
        
        // try{
        //     const db = getDB();
        //     const collection = db.collection(this.collection);
        //     // 1 Find the product
        //     const product = await collection.findOne({_id:new ObjectId(productID)});
        //     // 2   Find the rating 
            
        //     // const userRating = await product?.ratings?.find(r=>{
        //     //    console.log(r.userID)
        //     //     r.userID == userID
        //     // })
        //     const userRating = await product?.ratings?.find(r=>r.userID.valueOf() == userID);

        //     console.log(userRating)
        //     if(userRating){
        //     // 3 update the rating 
        //         await collection.updateOne({
        //             _id:new ObjectId(productID),"ratings.userID":new ObjectId(userID)
        //         },{
        //             $set:{
        //                 "ratings.$.rating":rating
        //             }
        //         }
        //         )
        //     }
        //     else{

        //     await collection.updateOne({
        //         _id:new ObjectId(productID)
        //     },{
        //         $push: {ratings: {userID:new ObjectId(userID), rating}}
        //     })
        // }
        // }
        
       
            try{
                // 1. Check if product exists
                const productToUpdate = await ProductModel.find();

                console.log("productToUpdate",productToUpdate)

                if(!productToUpdate){
                    throw new Error("Product not found")
                }
        
                // Find the existing review
                const userReview = await ReviewModel.findOne({product: new ObjectId(productID), user: new ObjectId(userID)});
                if(userReview){
                    userReview.rating = rating;
                    await userReview.save();
                }else{
                    const newReview = new ReviewModel({
                        product: new ObjectId(productID),
                        user: new ObjectId(userID),
                        rating: rating
                    });
                    newReview.save();
                }
        
            }catch(err){
                console.log(err);
                throw new ApplicationError("Something went wrong with database", 500);    
            }
        }


    async averageProductPricePerCategory(){
        try{

            const db = getDB();
           return  await db.collection(this.collection).aggregate([
                {
                // stage 1 get avrage price per category 
                $group:{
                    _id:"$category",
                    averagePrice:{$avg:"$price"}
                }

                }
            ]).toArray();
        }
        catch(err){
            console.log(err);
            throw new ApplicationError("Something went wrong with database", 500);
        } 
    }
}

export default ProductRepository;