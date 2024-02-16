import { Router } from "express";
import * as categoryControl from "./category.controller.js";
import {uploadSingleFile } from "../../services/multer.Local.js";
import { validation } from "../../middleWare/validation.js";
import { addCategoryVal, updateCategoryVal } from "./category.validate.js";
import subCategoryRouter from "../subCategory/subCategory.routes.js"
import { allowTo, protectedRoutes } from "../authentication/auth.controller.js";




const router = Router();

router.use("/:category/subCategories" , subCategoryRouter)

//& Category :
router.route("/")
   .get(categoryControl.getAllCategory)
   .post(protectedRoutes , allowTo("admin"), uploadSingleFile("image") , validation(addCategoryVal) ,   categoryControl.addCategory) ;

router.route("/:id")
   .delete(protectedRoutes , allowTo("admin") ,categoryControl.deleteCategoryId)
   .put(protectedRoutes , allowTo("admin") , uploadSingleFile("image") , validation(updateCategoryVal) , categoryControl.updateCategoryById)
   .get(categoryControl.getSingleCategoryById) ;
   










   // router.put("/ChangeImageCategory/:categoryId"  , multerLocal().single("image") ,  categoryControl.ChangeImageCategory) ;
   // router.put("/updateCategoryByName"  , multerLocal().single("image")  , categoryControl.updateCategoryByName) ;
   // router.delete("/deleteCategoryName" , categoryControl.deleteCategoryName) ;
   // router.get("/searchCategoryAnyChar" , categoryControl.searchCategoryAnyChar) ;
// router.get("/" , categoryControl.getAllCategory) ;
// router.post("/"  , multerLocal().single("image") ,  categoryControl.addCategory) ;
// router.put("/:id"  , multerLocal().single("image") , categoryControl.updateCategoryById) ;
// router.delete("/:id" , categoryControl.deleteCategoryId) ;
// router.get("/searchCategoryFirstChar" , categoryControl.searchCategoryFirstChar) ;


export default router ;