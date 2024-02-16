import { Router } from "express";
import * as couponControl from "./coupon.controller.js";
import { validation } from "../../middleWare/validation.js";
import { allowTo, protectedRoutes } from "../authentication/auth.controller.js";
import { addCouponVal, paramVal, updateCouponVal } from "./coupon.validate.js";



//& Merge Params:
const router = Router();


//& Category :
router.route("/")
   .get(couponControl.getAllCoupon)
   .post(protectedRoutes , allowTo("user") , validation(addCouponVal) , couponControl.addCoupon) ;

router.route("/:id")
   .delete(protectedRoutes , allowTo("user" , "admin")  ,validation(paramVal) , couponControl.deleteCoupon)
   .put( protectedRoutes , allowTo("user") , validation(updateCouponVal) , couponControl.updateCoupon)
   .get(validation(paramVal) , couponControl.getSingleCoupon) ;

export default router ;