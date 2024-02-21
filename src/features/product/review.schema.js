import mongoose from "mongoose";


export const reviewShema = new mongoose.Schema({
    product:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Product'
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    rating:Number
})