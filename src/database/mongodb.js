
import { MongoClient } from "mongodb";
import dotenv from 'dotenv'


dotenv.config();
// const url = process.env.DB_URL ;
// const url ="mongodb://localhost:27017"
let client;
export  const connectToMongoDB = ()=>{
    MongoClient.connect(process.env.DB_URL)
    .then(clientInstance=>{
        client = clientInstance
        console.log("Mongodb is connected");
    })
    .catch(err=>{
        console.log(err)
    })

    
}
export const getDB=()=>{
    return client.db();
}