import { Router } from "express";
import * as AuthControl from "./auth.controller.js";
import { changePasswordVal, signInVal, signUpVal } from "./auth.validate.js";
import { validation } from "../../middleWare/validation.js";
import { emailExist } from "../../middleWare/emailExist.js";



const router  = Router() ; 



router.route("/signUp")
      .post(validation(signUpVal)  , emailExist , AuthControl.signUp) 

router.route("/signIn")
      .post(validation(signInVal)  , AuthControl.signIn) 

router.route("/changePassword")
      .patch(AuthControl.protectedRoutes , validation(changePasswordVal) , AuthControl.changePassword) 

export default router ;


