import "./env.js"
import express, { application } from 'express'
import swagger from 'swagger-ui-express' ;
import mongoose from "mongoose";

import  ProductRouter from './src/features/product/product.routes.js'
import  bodyParser from 'body-parser'
import userRouter from './src/features/user/user.routes.js';
import basicAuthorizer from './src/features/middlewares/basicAuth.middleware.js';
import jwtAuth from './src/features/middlewares/jwt.middleware.js';
import cartItemRouter from './src/features/cartItem/cartItem.routes.js';
import apiDocs from './swagger.json' assert{type:"json"};
import cors from 'cors' ;
import loggerMiddleware from './src/features/middlewares/logger.middleware.js';
import { ApplicationError } from './src/error-handler/applicationError.js';
import {connectToMongoDB} from './src/database/mongodb.js';
import orderRouter from "./src/features/order/order.routes.js";
import { connectUsingMongoose } from "./src/database/mongoose.cofig.js";
import likeRouter from "./src/features/like/likes.routes.js";

// create server 
const server = express();

// load all the encironment variable in application 

// cors policy configuration 
// server.use(cors());
// server.use((req,res,next)=>{
//   res.header('Access-Control-Allow-Origin','*');
//   res.header('Access-Control-Allow-Headers','*');
//   res.header('Access-Control-Allow-Methods','*');
//   // return ok for preflight request 
//   if(req.method == "OPTIONS"){
//     return res.sendStatus(200);
//   }
//   next();
// })
server.use(bodyParser.json());
// server.use('/api',swagger.serve,swagger.setup(apiDocs));
server.use(loggerMiddleware);

server.use('/api/orders',jwtAuth,orderRouter);


server.use(
    '/api/products',
    jwtAuth,
    ProductRouter
  );
server.use('/api/users',userRouter);
server.use('/api/likes',jwtAuth,likeRouter);
server.use('/api/cartItems',loggerMiddleware,jwtAuth,cartItemRouter);
// 2 default request handler 

server.get('/',(req,res)=>{
res.send("welcome to Ecommerce APIs");
})
// 3 error handle middleware 
server.use((err, req, res, next) => {
  console.log(err);
  if(err instanceof mongoose.Error.ValidationError){
    return res.status(400).send(err.message);
  }
  if (err instanceof ApplicationError) {
    return res.status(err.code).send(err.message);
  }

  // server errors.
  res
    .status(500)
    .send(
      'Something went wrong, please try later'
    );
});

// 4 middleware to handle 400 request 

server.use((req,res)=>{
  res.status(404).send("Api is not found");
  
})

server.listen(4000,()=>{
    console.log("server is working fine in 4000");
    // connectToMongoDB();

    connectUsingMongoose()
   

});
