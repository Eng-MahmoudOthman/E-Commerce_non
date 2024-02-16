import { Router } from "express";
import * as orderControl from "./order.controller.js";
import { validation } from "../../middleWare/validation.js";
import { allowTo, protectedRoutes } from "../authentication/auth.controller.js";
import { createCheckOutSessionVal, createOrderVal } from "./order.validate.js";


const router = Router();



router.route("/all")
   .get(protectedRoutes , allowTo("user") , orderControl.getAllOrders)
//    .delete(protectedRoutes , allowTo("user")  , orderControl.ClearUserToCart) 
//    .post(protectedRoutes , allowTo("user") , validation(addCartVal) , orderControl.addCart) 


router.route("/")
   .get(protectedRoutes , allowTo("user") , orderControl.getSpecificOrder)

router.route("/:id")
   // .delete(protectedRoutes , allowTo("user" , "admin")  ,validation(paramsVal) , orderControl.removeItemToCart)
   .post(protectedRoutes , allowTo("user" , "admin")  ,validation(createOrderVal) , orderControl.createCashOrder)

router.route("/checkOut/:id")
   .post(protectedRoutes , allowTo("user")  ,validation(createCheckOutSessionVal) , orderControl.createCheckOutSession)


export default router ;