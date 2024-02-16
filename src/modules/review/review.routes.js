import { Router } from "express";
import * as reviewControl from "./review.controller.js";
import { validation } from "../../middleWare/validation.js";
import { allowTo, protectedRoutes } from "../authentication/auth.controller.js";
import { addReviewVal, paramVal, updateReviewVal } from "./review.validate.js";



//& Merge Params:
const router = Router();


//& Category :
router.route("/")
   .get(reviewControl.getAllReview)
   .post(protectedRoutes , allowTo("user") , validation(addReviewVal) , reviewControl.addReview) ;

router.route("/:id")
   .delete(protectedRoutes , allowTo("user" , "admin")  ,validation(paramVal) , reviewControl.checkDeleteReview , reviewControl.deleteReviewId)
   .put( protectedRoutes , allowTo("user") , validation(updateReviewVal) , reviewControl.updateReviewById)
   .get(validation(paramVal) , reviewControl.getSingleReviewById) ;

export default router ;