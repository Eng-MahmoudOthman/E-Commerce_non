import Joi from "joi" ;

export const addSubCategoryVal = Joi.object({
   name:Joi.string().required().min(2).max(300).trim() ,
   category:Joi.string().hex().length(24).required()  ,
   // createdBy:Joi.string().hex().length(24).required()  ,
})


export const paramVal = Joi.object({
   id:Joi.string().hex().length(24).required() ,
})



export const updateSubCategoryVal = Joi.object({
   name:Joi.string().required().trim().min(2).max(200) ,
   id:Joi.string().hex().length(24).required() 
})

