import { Router } from "express";
import * as wishListControl from "./wishList.controller.js";
import { validation } from "../../middleWare/validation.js";
import { allowTo, protectedRoutes } from "../authentication/auth.controller.js";
import { addToWishListVal, paramVal } from "./wishList.validate.js";


const router = Router();



router.route("/")
   .get(protectedRoutes , allowTo("user") , wishListControl.getLoggedUserWishList)
   .patch(protectedRoutes , allowTo("user") , validation(addToWishListVal) , wishListControl.addToWishList) 

router.route("/:id")
   .delete(protectedRoutes , allowTo("user" , "admin")  ,validation(paramVal) , wishListControl.deleteToWishList)


export default router ;