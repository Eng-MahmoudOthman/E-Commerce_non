import { Router } from "express";
import * as productControl from "./product.controller.js";
import {uploadFields, uploadSingleFile } from "../../services/multer.Local.js";
import { validation } from "../../middleWare/validation.js";
import { addProductVal, updateProductVal } from "./product.validate.js";
import { allowTo, protectedRoutes } from "../authentication/auth.controller.js";



const router = Router();


//& Category :
router.route("/")
   .get(productControl.getAllProduct)
   .post(protectedRoutes , allowTo("admin") , uploadFields([
      {name:"imgCover" , maxCount:1} , 
      {name:"images" , maxCount:10} , 
   ]) , validation(addProductVal) ,   productControl.addProduct) ;

router.route("/:id")
   .delete(protectedRoutes , allowTo("admin") , productControl.deleteProductId)
   .put(protectedRoutes , allowTo("admin") , uploadFields([
      {name:"imgCover" , maxCount:1} , 
      {name:"images" , maxCount:10} , 
   ]) , validation(updateProductVal) , productControl.updateProductById)
   .get(productControl.getSingleProductById) ;
   
export default router ;