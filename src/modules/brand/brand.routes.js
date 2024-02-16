import { Router } from "express";
import * as brandControl from "./brand.controller.js";
import {uploadSingleFile } from "../../services/multer.Local.js";
import { validation } from "../../middleWare/validation.js";
import { addBrandVal, paramVal, updateBrandVal } from "./brand.validate.js";
import { allowTo, protectedRoutes } from "../authentication/auth.controller.js";



const router = Router();


//& Category :
router.route("/")
   .get(brandControl.getAllBrand)
   .post(protectedRoutes , allowTo("admin") , uploadSingleFile("logo") , validation(addBrandVal) ,   brandControl.addBrand) ;

router.route("/:id")
   .delete(protectedRoutes , allowTo("admin") , validation(paramVal) , brandControl.deleteBrandId)
   .put(protectedRoutes , allowTo("admin") , uploadSingleFile("logo") , validation(updateBrandVal) , brandControl.updateBrandById)
   .get(validation(paramVal) , brandControl.getSingleBrandById) ;
   
   

export default router ;