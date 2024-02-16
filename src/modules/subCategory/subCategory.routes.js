import { Router } from "express";
import * as subCategoryControl from "./subCategory.controller.js";
import { validation } from "../../middleWare/validation.js";
import { addSubCategoryVal, paramVal, updateSubCategoryVal } from "./subCategory.validate.js";
import { allowTo, protectedRoutes } from "../authentication/auth.controller.js";



//& Merge Params:
const router = Router({mergeParams:true});


//& Category :
router.route("/")
   .get(subCategoryControl.getAllSubCategory)
   .post(protectedRoutes , allowTo("admin") , validation(addSubCategoryVal) , subCategoryControl.addSubCategory) ;

router.route("/:id")
   .delete(protectedRoutes , allowTo("admin") , validation(paramVal) , subCategoryControl.deleteSubCategoryId)
   .put( protectedRoutes , allowTo("admin") , validation(updateSubCategoryVal) , subCategoryControl.updateSubCategoryById)
   .get(validation(paramVal) , subCategoryControl.getSingleSubCategoryById) ;

export default router ;