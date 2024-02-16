import Joi from "joi" ;

export const addCategoryVal = Joi.object({
   name:Joi.string().required().min(2).max(300).trim() ,
   image:Joi.object({
      fieldname:Joi.string().required(),
      originalname:Joi.string().required(),
      encoding: Joi.string().required() ,
      mimetype: Joi.string().valid("image/jpeg" , "image/jpg" ,"image/png" , "image/gif" ,"image/raw" ).required() ,
      destination: Joi.string().required() ,
      filename:Joi.string().required() ,
      path: Joi.string().required() ,
      size: Joi.number().max(+process.env.UPLOAD_IMAGE_SIZE).required() ,
   }).required() ,
   // createdBy:Joi.string().hex().length(24).required()  ,
})






export const paramVal = Joi.object({
   id:Joi.string().hex().length(24).required() ,
})



export const updateCategoryVal = Joi.object({
   name:Joi.string().required().trim().min(2).max(200) ,
   image:Joi.object({
      fieldname:Joi.string().required(),
      originalname:Joi.string().required(),
      encoding: Joi.string().required() ,
      mimetype: Joi.string().valid("image/jpeg" ,"image/png" , "image/gif" ,"image/raw").required() ,
      destination: Joi.string().required() ,
      filename:Joi.string().required() ,
      path: Joi.string().required() ,
      size: Joi.number().max(+process.env.UPLOAD_IMAGE_SIZE).required() ,
   }) ,
   id:Joi.string().hex().length(24).required()  ,
})



