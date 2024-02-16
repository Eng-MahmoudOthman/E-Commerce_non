import { Router } from "express";
import * as UC from "./user.controller.js";
import { addUserVal, paramsIdVal, updateUserVal } from "./user.validate.js";
import { validation } from "../../middleWare/validation.js";
import { emailExist } from "../../middleWare/emailExist.js";
import { allowTo, protectedRoutes } from "../authentication/auth.controller.js";


const router  = Router() ; 



router.route("/")
      // .get(UC.getAllUser)
      .get(protectedRoutes ,  allowTo("admin") , UC.getAllUser)
      .post(protectedRoutes , allowTo("admin") , validation(addUserVal)  , emailExist ,UC.addUser) 

router.route("/:id")
      .get(UC.getSingleUser)
      // .get(protectedRoutes ,  allowTo("admin") , UC.getSingleUser)
      .put(protectedRoutes ,  allowTo("admin") , validation(updateUserVal)  , UC.updateUser) 
      .delete(protectedRoutes , allowTo("admin") , validation(paramsIdVal)  , UC.deleteUser)



export default router ;


