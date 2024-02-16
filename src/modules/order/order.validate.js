import Joi from "joi" ;

export const createOrderVal = Joi.object({
   id:Joi.string().hex().length(24).required() ,

   shippingAddress:Joi.object({
      street:Joi.string().trim().required() ,
      city:Joi.string().trim().required() ,
      phone:Joi.string().trim().required() ,
   }).required() 
})


export const paramsVal = Joi.object({
   id:Joi.string().hex().length(24).required() ,
})


export const updateQuantityVal = Joi.object({
   id:Joi.string().hex().length(24).required() ,
   quantity:Joi.number().integer().options({convert:false}).required() ,
})



export const createCheckOutSessionVal= Joi.object({
   id:Joi.string().hex().length(24).required() ,

   shippingAddress:Joi.object({
      street:Joi.string() ,
      city:Joi.string() ,
      phone:Joi.string()
   })
})

