import Joi from "joi" ;

export const addAddressVal = Joi.object({
   street:Joi.string().min(2).max(100).trim().required() ,
   phone:Joi.string().trim().required() ,
   city:Joi.string().min(2).max(50).trim().required() ,
})


export const paramVal = Joi.object({
   id:Joi.string().hex().length(24).required() ,
})



// export const updateAddressVal= Joi.object({
//    id:Joi.string().hex().length(24).required() ,

//    street:Joi.string().min(2).max(100).trim() ,
//    phone:Joi.string().trim() ,
//    city:Joi.string().min(2).max(50).trim() ,
// })

