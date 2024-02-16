import multer from "multer" ;
import { AppError } from "../utilities/AppError.js";
import   {v4 as uuid}  from "uuid";


export const multerLocal = ()=>{

   //& Choose Place File Upload And File Name :
   const storage = multer.diskStorage({
      destination: function(req , file , cb){
         // console.log(file);
         cb(null , "Uploads/")
      } ,
      filename:function(req , file , cb){
         const uniqueName =  uuid() + file.originalname ;
         cb(null , uniqueName)
      }
   })

   //& Choose Type Media Uploaded :
   const fileFilter = (req , file , cb)=>{
      if(file.mimetype.startsWith("image")){
         cb(null , true)
      }else{
         cb(new AppError("Type Media Not valid  *image Only!" , 401) , false)
      }
   }
   const upload = multer({fileFilter:fileFilter , storage:storage}) ;
   return upload ;
}



export const uploadSingleFile = (fieldName)=>{
   return multerLocal().single(fieldName) ;
}


export const uploadArrayOfFiles = (fieldName)=>{
   return multerLocal().array(fieldName , 10) ;
}


export const uploadFields = (fields)=>{
   return multerLocal().fields(fields) ;
}