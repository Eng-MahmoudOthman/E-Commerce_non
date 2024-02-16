import Joi from "joi";


export const addUserVal = Joi.object({
   name:Joi.string().min(2).max(50).required().trim() ,
   email:Joi.string().email().required().trim() ,
   password:Joi.string().pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/).required() ,
   rePassword:Joi.valid(Joi.ref("password")).required() ,
   role:Joi.string().required().trim() ,
})



export const paramsIdVal = Joi.object({
   id:Joi.string().hex().length(24).required() 
})




export const updateUserVal = Joi.object({
   id:Joi.string().hex().length(24).required() ,

   name:Joi.string().min(2).max(50).trim() ,
   email:Joi.string().email().trim() ,
   role:Joi.string().valid("user" , "admin").optional() ,
   password:Joi.string().pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/) ,
   rePassword:Joi.valid(Joi.ref("password")) ,
   role:Joi.string().trim() ,
})