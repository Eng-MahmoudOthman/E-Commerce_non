import Joi from "joi" ;

export const addCouponVal = Joi.object({
   code:Joi.string().min(1).max(200).required().trim() ,
   discount:Joi.number().min(0).required() ,
   expired:Joi.date().required()
})


export const paramVal = Joi.object({
   id:Joi.string().hex().length(24).required() ,
})



export const updateCouponVal= Joi.object({
   id:Joi.string().hex().length(24).required() ,

   code:Joi.string().min(1).max(200).trim() ,
   discount:Joi.number().min(0) ,
   expired:Joi.date()
})

