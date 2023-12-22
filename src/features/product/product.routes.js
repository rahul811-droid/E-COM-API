//  Manage routes/paths to ProductController 

// Import express 
import express  from "express";
import ProductController from "./product.controller.js";
import {upload} from "../../features/middlewares/fileupload.middleware.js";

// Initialize Express router 

const ProductRouter = express.Router()
const productController = new ProductController();
// const upload = new upload();


// All the paths to controller methods. 
// localhost/application/products 

// localhost:4000/api/products/filter?minPrice=10&maxPrice=20&Category1 

ProductRouter.get('/filter',(req,res)=>{productController.filterProducts(req,res)})
ProductRouter.post('/rate',(req,res,next)=>{productController.rateProduct(req,res,next)})

ProductRouter.get('/',(req,res)=>{productController.getAllProducts(req,res)});
ProductRouter.post('/',upload.single('imageUrl'),(req,res)=>{productController.addProduct(req,res)});
ProductRouter.get('/:id',(req,res)=>{productController.getOneProduct(req,res)});

export default ProductRouter;


