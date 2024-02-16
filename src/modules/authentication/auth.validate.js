import Joi from "joi";


export const signUpVal = Joi.object({
   name:Joi.string().min(2).max(50).required().trim() ,
   email:Joi.string().email().required().trim() ,
   password:Joi.string().pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/).required() ,
   rePassword:Joi.valid(Joi.ref("password")).required() ,
})



export const paramsIdVal = Joi.object({
   id:Joi.string().hex().length(24).required() 
})




export const signInVal = Joi.object({
   email:Joi.string().email().trim() ,
   password:Joi.string().pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/) ,
})



export const changePasswordVal = Joi.object({
   // id:Joi.string().hex().length(24).required() ,

   oldPassword:Joi.string().pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/).required()  ,
   newPassword:Joi.string().pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/).required()  ,
   rePassword:Joi.valid(Joi.ref("newPassword")).required() ,
})