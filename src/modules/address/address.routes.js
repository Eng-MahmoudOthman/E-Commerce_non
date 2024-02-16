import { Router } from "express";
import * as addressControl from "./address.controller.js";
import { validation } from "../../middleWare/validation.js";
import { allowTo, protectedRoutes } from "../authentication/auth.controller.js";
import { addAddressVal, paramVal } from "./address.validate.js";


const router = Router();



router.route("/")
   .get(protectedRoutes , allowTo("user") , addressControl.getLoggedUserAddress)
   .patch(protectedRoutes , allowTo("user") , validation(addAddressVal) , addressControl.addAddress) 

router.route("/:id")
   .delete(protectedRoutes , allowTo("user" , "admin")  ,validation(paramVal) , addressControl.deleteAddress)


export default router ;