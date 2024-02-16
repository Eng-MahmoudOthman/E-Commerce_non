import { Router } from "express";
import * as CartControl from "./cart.controller.js";
import { validation } from "../../middleWare/validation.js";
import { allowTo, protectedRoutes } from "../authentication/auth.controller.js";
import { addCartVal, paramsVal, updateQuantityVal } from "./cart.validate.js";


const router = Router();



router.route("/")
   .get(protectedRoutes , allowTo("user") , CartControl.getLoggedUserCart)
   .delete(protectedRoutes , allowTo("user")  , CartControl.ClearUserToCart) 
   .post(protectedRoutes , allowTo("user") , validation(addCartVal) , CartControl.addCart) 

router.route("/:id")
   .delete(protectedRoutes , allowTo("user" , "admin")  ,validation(paramsVal) , CartControl.removeItemToCart)
   .patch(protectedRoutes , allowTo("user" , "admin")  ,validation(updateQuantityVal) , CartControl.updateQuantity)

router.post("/applyCoupon" ,protectedRoutes , allowTo("user" , "admin")  , CartControl.applyCoupon)

export default router ;