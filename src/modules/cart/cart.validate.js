import Joi from "joi" ;

export const addCartVal = Joi.object({
   product:Joi.string().hex().length(24).required() ,
   // quantity:Joi.number()
   quantity:Joi.number().integer().options({convert:false})
})


export const paramsVal = Joi.object({
   id:Joi.string().hex().length(24).required() ,
})


export const updateQuantityVal = Joi.object({
   id:Joi.string().hex().length(24).required() ,
   quantity:Joi.number().integer().options({convert:false}).required() ,
})



// export const updateAddressVal= Joi.object({
//    id:Joi.string().hex().length(24).required() ,

//    street:Joi.string().min(2).max(100).trim() ,
//    phone:Joi.string().trim() ,
//    city:Joi.string().min(2).max(50).trim() ,
// })

